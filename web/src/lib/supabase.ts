import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase 브라우저 클라이언트 (싱글톤).
 *
 * 환경변수:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 *
 * 현재는 기존 index.html 에 하드코딩되어 있는 값을 그대로 사용.
 * 배포 시 Vercel 대시보드에 env 로 이관 권장.
 */
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://wpeaskqbozozzcqytoyd.supabase.co';
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndwZWFza3Fib3pvenpjcXl0b3lkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyMzczODksImV4cCI6MjA4OTgxMzM4OX0.CgYiS6FohJc9B6velW_tacb-3p18AodIIGEsuxtEM5g';

let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (_client) return _client;
  _client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: true, autoRefreshToken: true },
  });
  return _client;
}
