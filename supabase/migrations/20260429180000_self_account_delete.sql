-- ═══════════════════════════════════════════════════════════════════════
-- 회원 자체 탈퇴 함수 (개인정보보호법 — 가입자가 직접 탈퇴 가능해야)
-- 보안: security definer 로 만들되 함수 내에서 auth.uid() 검증 → 자기 자신만 삭제
-- 작성일: 2026-04-29
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.delete_my_account()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  caller_id uuid;
  caller_email text;
begin
  -- 1) 호출자 (로그인 사용자) 확인
  caller_id := auth.uid();
  if caller_id is null then
    raise exception '인증되지 않은 사용자입니다. (auth.uid is null)';
  end if;

  -- 2) profiles 의 정보 회수 (members 매칭용)
  select email into caller_email from public.profiles where id = caller_id;

  -- 3) 후원 기록은 보존 (회계법상 5년) — user_id 만 NULL 처리하여 익명화
  update public.donations
     set user_id = null,
         donor_name = coalesce(donor_name, '(탈퇴 회원)'),
         donor_email = null,
         donor_phone = null,
         note = coalesce(note, '') || ' [탈퇴 처리 ' || to_char(now(), 'YYYY-MM-DD') || ']'
   where user_id = caller_id;

  -- 4) members 테이블 (Auth fallback) 삭제
  if caller_email is not null then
    delete from public.members where email = caller_email;
  end if;

  -- 5) profiles 삭제
  delete from public.profiles where id = caller_id;

  -- 6) auth.users 삭제 (CASCADE 로 profiles 가 자동 삭제되지만 명시적으로)
  delete from auth.users where id = caller_id;
end;
$$;

comment on function public.delete_my_account() is
  '로그인된 사용자가 본인 계정을 영구 삭제. 후원 기록은 익명화 후 보존(회계 5년).';

grant execute on function public.delete_my_account() to authenticated;
