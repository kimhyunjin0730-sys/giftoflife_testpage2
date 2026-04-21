-- ════════════════════════════════════════════════════════════════════════════
-- Member authentication + Role-based identification (Gift of Life Korea 위성클럽)
-- 2026-04-21 · 역할: public / rotary / admin
-- ════════════════════════════════════════════════════════════════════════════

-- ─── 1. profiles 테이블 ──────────────────────────────────────────────────────
create table if not exists public.profiles (
  id                 uuid primary key references auth.users(id) on delete cascade,
  email              text unique not null,
  name               text,
  phone              text,
  role               text not null default 'public'
                     check (role in ('public','rotary','admin')),
  rotary_club        text,                               -- 예: '한수로타리클럽'
  rotary_member_id   text,                               -- 내부 회원번호(있을 시)
  verified_at        timestamptz,                        -- 로타리 회원 인증 시각
  verified_by        uuid references auth.users(id),     -- 인증 처리한 관리자
  lang               text default 'ko' check (lang in ('ko','en','zh')),
  marketing_opt_in   boolean default false,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

comment on table  public.profiles          is '로그인 사용자 프로필 · auth.users 1:1';
comment on column public.profiles.role     is 'public(익명/일반) · rotary(인증된 위성클럽 회원) · admin(관리자)';
comment on column public.profiles.verified_at is 'rotary 인증 처리 시각. null이면 아직 미인증';

create index if not exists profiles_role_idx on public.profiles(role);
create index if not exists profiles_verified_idx on public.profiles(verified_at) where verified_at is not null;


-- ─── 2. 가입 시 profiles 자동 생성 트리거 ─────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- ─── 3. updated_at 자동 갱신 ─────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();


-- ─── 4. Row Level Security ───────────────────────────────────────────────────
alter table public.profiles enable row level security;

-- 자기 프로필 조회
drop policy if exists "profiles: self select" on public.profiles;
create policy "profiles: self select"
  on public.profiles for select
  using (auth.uid() = id);

-- 관리자는 전체 조회
drop policy if exists "profiles: admin select all" on public.profiles;
create policy "profiles: admin select all"
  on public.profiles for select
  using (
    exists (select 1 from public.profiles p
            where p.id = auth.uid() and p.role = 'admin')
  );

-- 자기 프로필의 기본 정보만 수정 가능 (role/verified_* 제외)
drop policy if exists "profiles: self update basic" on public.profiles;
create policy "profiles: self update basic"
  on public.profiles for update
  using (auth.uid() = id)
  with check (
    auth.uid() = id
    -- role/verified_at/verified_by는 클라이언트가 직접 못 건드림.
    -- 바꾸려면 아래 admin_* 함수 사용.
    and role = (select role from public.profiles where id = auth.uid())
    and (verified_at is not distinct from (select verified_at from public.profiles where id = auth.uid()))
    and (verified_by is not distinct from (select verified_by from public.profiles where id = auth.uid()))
  );


-- ─── 5. 헬퍼 함수: 현재 사용자 로타리 여부 ──────────────────────────────────
create or replace function public.is_rotary_member(uid uuid default auth.uid())
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = uid
      and role in ('rotary','admin')
      and verified_at is not null
  );
$$;

comment on function public.is_rotary_member is
  '클라이언트에서 rpc("is_rotary_member")로 호출해 로타리 전용 계좌 노출 여부 판단';

grant execute on function public.is_rotary_member(uuid) to anon, authenticated;


-- ─── 6. 관리자 전용: 로타리 회원 인증 / 해제 ─────────────────────────────────
create or replace function public.admin_verify_rotary(
  target_id  uuid,
  club_name  text default null,
  member_id  text default null
)
returns public.profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  caller_role text;
  result      public.profiles;
begin
  select role into caller_role from public.profiles where id = auth.uid();
  if caller_role is distinct from 'admin' then
    raise exception 'Only admins can verify Rotary members';
  end if;

  update public.profiles
     set role             = 'rotary',
         rotary_club      = coalesce(club_name, rotary_club, '한수로타리클럽'),
         rotary_member_id = coalesce(member_id, rotary_member_id),
         verified_at      = now(),
         verified_by      = auth.uid()
   where id = target_id
  returning * into result;

  return result;
end;
$$;

create or replace function public.admin_revoke_rotary(target_id uuid)
returns public.profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  caller_role text;
  result      public.profiles;
begin
  select role into caller_role from public.profiles where id = auth.uid();
  if caller_role is distinct from 'admin' then
    raise exception 'Only admins can revoke Rotary status';
  end if;

  update public.profiles
     set role        = 'public',
         verified_at = null,
         verified_by = null
   where id = target_id
  returning * into result;

  return result;
end;
$$;

grant execute on function public.admin_verify_rotary(uuid, text, text) to authenticated;
grant execute on function public.admin_revoke_rotary(uuid)              to authenticated;


-- ─── 7. donations 테이블에 user/channel 컬럼 보강 (없으면 생성) ──────────────
create table if not exists public.donations (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now()
);

alter table public.donations add column if not exists user_id     uuid references auth.users(id);
alter table public.donations add column if not exists channel     text check (channel in ('mrm','rotary_transfer','wire','manual'));
alter table public.donations add column if not exists amount      numeric;
alter table public.donations add column if not exists currency    text default 'KRW';
alter table public.donations add column if not exists donor_name  text;
alter table public.donations add column if not exists donor_email text;
alter table public.donations add column if not exists donor_phone text;
alter table public.donations add column if not exists status      text default 'recorded'
  check (status in ('recorded','confirmed','refunded','void'));
alter table public.donations add column if not exists note        text;

create index if not exists donations_user_idx    on public.donations(user_id);
create index if not exists donations_channel_idx on public.donations(channel);
create index if not exists donations_created_idx on public.donations(created_at desc);

alter table public.donations enable row level security;

drop policy if exists "donations: self select" on public.donations;
create policy "donations: self select"
  on public.donations for select
  using (auth.uid() = user_id);

drop policy if exists "donations: admin select all" on public.donations;
create policy "donations: admin select all"
  on public.donations for select
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- 본인이 자기 후원 내역은 기록 가능 (우리가 매뉴얼로 찍을 때만 의미)
drop policy if exists "donations: self insert" on public.donations;
create policy "donations: self insert"
  on public.donations for insert
  with check (auth.uid() = user_id);


-- ─── 8. 부트스트랩: 첫 관리자 지정 (수동 1회) ───────────────────────────────
-- 아래 함수는 '어떤 인증도 없이' 특정 이메일을 admin으로 승격시킵니다.
-- **반드시 최초 1회만** Supabase SQL Editor에서 실행하고, 실행 후 함수는 DROP 하세요.
create or replace function public._bootstrap_first_admin(admin_email text)
returns public.profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  already_admin_count int;
  target              public.profiles;
begin
  select count(*) into already_admin_count from public.profiles where role = 'admin';
  if already_admin_count > 0 then
    raise exception '이미 admin이 존재합니다. 이 함수는 최초 부트스트랩 전용입니다.';
  end if;

  update public.profiles
     set role = 'admin',
         verified_at = now()
   where email = admin_email
  returning * into target;

  if target.id is null then
    raise exception '해당 이메일로 가입된 사용자가 없습니다: %', admin_email;
  end if;

  return target;
end;
$$;

-- ════════════════════════════════════════════════════════════════════════════
-- 운영 절차 (최초 1회)
--   1) Supabase Auth 에서 본인(김현진) 계정으로 가입 또는 기존 계정 확인
--   2) SQL Editor 에서 다음 실행:
--        select public._bootstrap_first_admin('kim.hyunjin@jinnhyun.com');
--   3) 확인:
--        select id, email, role from public.profiles where role = 'admin';
--   4) 보안을 위해 부트스트랩 함수 제거:
--        drop function public._bootstrap_first_admin(text);
--   5) 이후 로타리 회원 인증은:
--        select public.admin_verify_rotary('<target-uuid>', '한수로타리클럽', 'MEMBER-001');
-- ════════════════════════════════════════════════════════════════════════════
