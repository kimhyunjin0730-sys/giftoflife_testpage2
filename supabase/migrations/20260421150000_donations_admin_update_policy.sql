-- ════════════════════════════════════════════════════════════════════════════
-- donations 테이블 · admin 전용 UPDATE/DELETE 정책 추가 (2026-04-21)
-- ────────────────────────────────────────────────────────────────────────────
-- 배경: 로타리 회원이 후원 페이지(Channel B)에서 신청 폼을 제출하면
--       channel='rotary_transfer', status='recorded'로 INSERT됨.
--       회계담당자(admin)가 통장에서 입금 확인 후 status='confirmed'로 변경 필요.
--       기존 RLS는 SELECT만 있어서 admin이 UPDATE 못 함 → 정책 추가.
-- ════════════════════════════════════════════════════════════════════════════

-- 1) admin은 모든 donations 행을 UPDATE 가능
drop policy if exists "donations: admin update" on public.donations;
create policy "donations: admin update"
  on public.donations for update
  using (public.is_admin())
  with check (public.is_admin());

-- 2) admin은 모든 donations 행을 DELETE 가능
drop policy if exists "donations: admin delete" on public.donations;
create policy "donations: admin delete"
  on public.donations for delete
  using (public.is_admin());

-- ────────────────────────────────────────────────────────────────────────────
-- 검증:
--   1) admin 계정으로 로그인한 상태에서 사이트 admin 페이지 → 💳 후원 관리 탭
--   2) 신청된 row 옆 [✅] 버튼 클릭 → status='confirmed'로 변경 확인
--   3) Supabase SQL Editor에서:
--        select id, donor_name, amount, status from public.donations
--          where channel='rotary_transfer' order by created_at desc;
-- ════════════════════════════════════════════════════════════════════════════
