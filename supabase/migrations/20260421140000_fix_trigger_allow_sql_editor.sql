-- ════════════════════════════════════════════════════════════════════════════
-- FIX · prevent_self_role_change 트리거가 SQL Editor bootstrap 차단하던 문제
-- 2026-04-21
-- ────────────────────────────────────────────────────────────────────────────
-- 증상: Supabase SQL Editor에서 _bootstrap_first_admin() 실행 시
--       "role 변경 권한 없음 (admin 전용)" 에러로 실패
-- 원인: SQL Editor는 auth.uid() = null (로그인 세션 없음) → is_admin() = false
--       트리거가 '비admin의 role 변경 시도'로 판단해서 차단
-- 해결: auth.uid() IS NULL 케이스 허용
--       (SQL Editor는 postgres 슈퍼유저로 실행되므로 이미 RLS 전체 우회)
--       (REST anon 요청은 RLS "self update basic" 정책이 먼저 차단하므로 안전)
-- ════════════════════════════════════════════════════════════════════════════

create or replace function public.prevent_self_role_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- SQL Editor (postgres 슈퍼유저 · auth.uid() null) 또는 admin은 자유 변경 허용
  if auth.uid() is null or public.is_admin(auth.uid()) then
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
