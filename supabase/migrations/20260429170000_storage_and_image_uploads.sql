-- ═══════════════════════════════════════════════════════════════════════
-- Storage 버킷 (news-images) + notices.image_url 컬럼 추가
-- 관리자 페이지에서 뉴스/공지 작성·수정 시 이미지 직접 업로드 지원
-- 작성일: 2026-04-29
-- ═══════════════════════════════════════════════════════════════════════

-- 1) storage 버킷 생성
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'news-images',
  'news-images',
  true,
  10485760, -- 10 MB
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- 2) storage RLS 정책 — 누구나 읽기, anon/authenticated 모두 쓰기
drop policy if exists "news_images_public_read" on storage.objects;
create policy "news_images_public_read" on storage.objects
  for select using (bucket_id = 'news-images');

drop policy if exists "news_images_anon_insert" on storage.objects;
create policy "news_images_anon_insert" on storage.objects
  for insert with check (bucket_id = 'news-images');

drop policy if exists "news_images_anon_update" on storage.objects;
create policy "news_images_anon_update" on storage.objects
  for update using (bucket_id = 'news-images') with check (bucket_id = 'news-images');

drop policy if exists "news_images_anon_delete" on storage.objects;
create policy "news_images_anon_delete" on storage.objects
  for delete using (bucket_id = 'news-images');

-- 3) notices 테이블에 image_url 컬럼 추가 (이미지 첨부 가능)
alter table public.notices
  add column if not exists image_url text;
