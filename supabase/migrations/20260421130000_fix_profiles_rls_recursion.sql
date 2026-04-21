-- ════════════════════════════════════════════════════════════════════════════
-- FIX · RLS infinite recursion on profiles (2026-04-21 긴급 핫픽스)
-- ────────────────────────────────────────────────────────────────────────────
-- 원인: "profiles: admin select all" 정책이 EXISTS (SELECT ... FROM profiles ...)
--       서브쿼리를 포함 → 정책 평가 → 서브쿼리 SELECT → 또 정책 평가 → 무한 재귀
-- 해결: SECURITY DEFINER 함수로 RLS 우회하여 role 체크 + 정책 재작성
-- ════════════════════════════════════════════════════════════════════════════

-- ── 1. admin 여부 확인 헬퍼 (RLS 우회) ───────────────────────────────────────
create or replace function public.is_admin(uid uuid default auth.uid())
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = uid and role = 'admin'
  );
$$;

grant execute on function public.is_admin(uuid) to anon, authenticated;

comment on function public.is_admin is
  '현재 세션이 admin인지 확인 · SECURITY DEFINER로 RLS 우회하여 정책 재귀 방지';


-- ── 2. 기존 문제 정책 삭제 ──────────────────────────────────────────────────
drop policy if exists "profiles: admin select all"   on public.profiles;
drop policy if exists "profiles: self update basic"  on public.profiles;
drop policy if exists "donations: admin select all"  on public.donations;


-- ── 3. 재귀 없는 새 정책 ────────────────────────────────────────────────────
-- profiles: admin은 전체 조회
create policy "profiles: admin select all"
  on public.profiles for select
  using (public.is_admin());

-- profiles: 자기 기본정보는 수정 가능 (role/verified_* 변경은 아래 트리거가 차단)
create policy "profiles: self update basic"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- donations: admin은 전체 조회
create policy "donations: admin select all"
  on public.donations for select
  using (public.is_admin());


-- ── 4. role/verified 변경 방지 트리거 (WITH CHECK 서브쿼리 대체) ────────────
-- admin이 아닌 사용자가 자기 프로필 UPDATE 시 role·verified_at·verified_by를
-- 바꾸려 하면 예외 발생. admin이면 자유롭게 변경 가능(admin_verify_rotary 경로)
create or replace function public.prevent_self_role_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- admin은 제약 없음
  if public.is_admin(auth.uid()) then
    return NEW;
  end if;

  if NEW.role is distinct from OLD.role then
    raise exception 'role 변경 권한 없음 (admin 전용)';
  end if;
  if NEW.verified_at is distinct from OLD.verified_at then
    raise exception 'verified_at 변경 권한 없음';
  end if;
  if NEW.verified_by is distinct from OLD.verified_by then
    raise exception 'verified_by 변경 권한 없음';
  end if;

  return NEW;
end;
$$;

drop trigger if exists profiles_prevent_role_change on public.profiles;
create trigger profiles_prevent_role_change
  before update on public.profiles
  for each row execute function public.prevent_self_role_change();


-- ── 5. 검증: admin 조회 테스트 ──────────────────────────────────────────────
-- 실행 후 아래 쿼리로 무한 재귀 에러 없이 정상 반환되는지 확인:
--   select id, email, role from public.profiles limit 5;
-- ════════════════════════════════════════════════════════════════════════════
