-- ═══════════════════════════════════════════════════════════════════════
-- 누락된 4개 테이블 추가: notices / news_posts / contact_messages / members
-- 기존 코드(index.html) 가 이미 sb.from('notices')... 등을 호출하므로
-- 테이블만 만들면 즉시 동작합니다.
-- 작성일: 2026-04-29
-- ═══════════════════════════════════════════════════════════════════════

-- ───────────────────────────────────────────────────────────────────────
-- 1) notices — 공지사항 (공지 + 일반 게시물 겸용)
-- ───────────────────────────────────────────────────────────────────────
create table if not exists public.notices (
  id uuid primary key default gen_random_uuid(),
  title_ko text not null,
  title_en text,
  title_zh text,
  content_ko text,
  content_en text,
  content_zh text,
  author_ko text default '운영사무국',
  author_en text default 'Admin',
  author_zh text default '运营办公室',
  category text default 'notice',
  is_notice boolean default true,
  is_new boolean default false,
  views integer default 0,
  date date default current_date,
  published boolean default true,
  created_at timestamptz default now()
);

create index if not exists idx_notices_published_date
  on public.notices (published, date desc);

alter table public.notices enable row level security;

drop policy if exists "notices_read_published" on public.notices;
create policy "notices_read_published" on public.notices
  for select using (published = true);

drop policy if exists "notices_write_anon" on public.notices;
create policy "notices_write_anon" on public.notices
  for all using (true) with check (true);

-- ───────────────────────────────────────────────────────────────────────
-- 2) news_posts — 뉴스
-- ───────────────────────────────────────────────────────────────────────
create table if not exists public.news_posts (
  id uuid primary key default gen_random_uuid(),
  cat_ko text,
  cat_en text,
  cat_zh text,
  title_ko text not null,
  title_en text,
  title_zh text,
  desc_ko text,
  desc_en text,
  desc_zh text,
  img text,
  url text,
  date date default current_date,
  created_at timestamptz default now()
);

create index if not exists idx_news_posts_date
  on public.news_posts (date desc);

alter table public.news_posts enable row level security;

drop policy if exists "news_read_all" on public.news_posts;
create policy "news_read_all" on public.news_posts
  for select using (true);

drop policy if exists "news_write_anon" on public.news_posts;
create policy "news_write_anon" on public.news_posts
  for all using (true) with check (true);

-- ───────────────────────────────────────────────────────────────────────
-- 3) contact_messages — 문의
-- ───────────────────────────────────────────────────────────────────────
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  lang text default 'ko',
  status text default 'unread' check (status in ('unread', 'read', 'replied', 'archived')),
  created_at timestamptz default now()
);

create index if not exists idx_contact_messages_status_date
  on public.contact_messages (status, created_at desc);

alter table public.contact_messages enable row level security;

drop policy if exists "contacts_insert_anon" on public.contact_messages;
create policy "contacts_insert_anon" on public.contact_messages
  for insert with check (true);

drop policy if exists "contacts_read_anon" on public.contact_messages;
create policy "contacts_read_anon" on public.contact_messages
  for select using (true);

drop policy if exists "contacts_update_anon" on public.contact_messages;
create policy "contacts_update_anon" on public.contact_messages
  for update using (true) with check (true);

-- ───────────────────────────────────────────────────────────────────────
-- 4) members — 회원 (Auth 와 별개 fallback 저장)
-- ───────────────────────────────────────────────────────────────────────
create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  phone text,
  grade text default 'supporter',
  lang text default 'ko',
  firebase_uid text,
  created_at timestamptz default now()
);

create index if not exists idx_members_email
  on public.members (email);

alter table public.members enable row level security;

drop policy if exists "members_insert_anon" on public.members;
create policy "members_insert_anon" on public.members
  for insert with check (true);

drop policy if exists "members_read_anon" on public.members;
create policy "members_read_anon" on public.members
  for select using (true);

drop policy if exists "members_update_anon" on public.members;
create policy "members_update_anon" on public.members
  for update using (true) with check (true);

-- ═══════════════════════════════════════════════════════════════════════
-- 주의: 위 RLS 정책은 anon 키에 모든 권한 허용 — 정적 사이트 + 클라이언트
-- 측 admin 인증 패턴에 맞춤. 운영 강화 시 admin 전용 정책으로 교체 권장.
-- ═══════════════════════════════════════════════════════════════════════
