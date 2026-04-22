import { createClient } from '@supabase/supabase-js';

/**
 * Server Component / Route Handler 용 Supabase 클라이언트.
 * - 브라우저 컨텍스트 없음 (세션 persist 불필요)
 * - anon key 만 사용 → RLS 가 public read 를 허용한 테이블만 읽을 수 있음
 * - 쓰기가 필요한 작업은 Service Role key + 별도 헬퍼로 처리 (아직 미구현)
 */
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://wpeaskqbozozzcqytoyd.supabase.co';
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndwZWFza3Fib3pvenpjcXl0b3lkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyMzczODksImV4cCI6MjA4OTgxMzM4OX0.CgYiS6FohJc9B6velW_tacb-3p18AodIIGEsuxtEM5g';

export function createServerSupabase() {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
