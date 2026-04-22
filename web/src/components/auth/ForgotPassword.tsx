'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { getSupabase } from '@/lib/supabase';
import { useLang } from '@/i18n/LangProvider';
import type { Lang } from '@/i18n/types';

type Status = { kind: 'idle' } | { kind: 'pending' } | { kind: 'ok' } | { kind: 'error'; msg: string };

const T = {
  h: { ko: '비밀번호 찾기', en: 'Forgot Password', zh: '找回密码' } as Record<Lang, string>,
  sub: {
    ko: '가입 시 사용한 이메일을 입력하시면 비밀번호 재설정 링크를 보내드립니다.',
    en: 'Enter the email you signed up with. We will send a reset link.',
    zh: '请输入注册邮箱，我们将发送密码重置链接。',
  } as Record<Lang, string>,
  email: { ko: '이메일', en: 'Email', zh: '邮箱' } as Record<Lang, string>,
  submit: { ko: '재설정 링크 전송', en: 'Send reset link', zh: '发送重置链接' } as Record<Lang, string>,
  ok: {
    ko: '이메일을 확인해 주세요. 비밀번호 재설정 링크를 보내드렸습니다.',
    en: 'Please check your inbox — we sent a password reset link.',
    zh: '请查收邮箱，我们已发送密码重置链接。',
  } as Record<Lang, string>,
  backLogin: { ko: '로그인으로 돌아가기', en: 'Back to login', zh: '返回登录' } as Record<Lang, string>,
};

export function ForgotPassword() {
  const { lang } = useLang();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ kind: 'pending' });
    try {
      const sb = getSupabase();
      const redirectTo =
        typeof window !== 'undefined' ? `${window.location.origin}/login` : undefined;
      const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo });
      if (error) {
        setStatus({ kind: 'error', msg: error.message });
        return;
      }
      setStatus({ kind: 'ok' });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Network error';
      setStatus({ kind: 'error', msg });
    }
  }

  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 440 }}>
        <header style={{ textAlign: 'center', marginBottom: 32 }}>
          <div className="eyebrow">Account</div>
          <h1 style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 32, fontWeight: 700, color: 'var(--navy)', margin: '10px 0' }}>
            {T.h[lang]}
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.7 }}>{T.sub[lang]}</p>
        </header>

        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--navy)', marginBottom: 6 }}>
              {T.email[lang]}<span style={{ color: '#e11d48', marginLeft: 2 }}>*</span>
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inp}
              autoComplete="email"
            />
          </div>

          <button type="submit" className="btn-primary" disabled={status.kind === 'pending'} style={{ width: '100%' }}>
            {status.kind === 'pending' ? '…' : T.submit[lang]}
          </button>

          {status.kind === 'ok' && (
            <div style={alertOk}>✅ {T.ok[lang]}</div>
          )}
          {status.kind === 'error' && (
            <div style={alertErr}>⚠️ {status.msg}</div>
          )}

          <div style={{ marginTop: 18, textAlign: 'center' }}>
            <Link href="/login" style={{ color: 'var(--blue)', fontSize: 13, fontWeight: 600 }}>
              ← {T.backLogin[lang]}
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

const formStyle: React.CSSProperties = {
  background: '#fff',
  border: '1px solid var(--border)',
  borderRadius: 'var(--r2)',
  padding: 32,
  boxShadow: 'var(--sh)',
};

const inp: React.CSSProperties = {
  width: '100%',
  border: '1px solid var(--border)',
  borderRadius: 'var(--r)',
  padding: '12px 14px',
  fontSize: 14.5,
  color: 'var(--text)',
  background: '#fff',
  outline: 'none',
};

const alertOk: React.CSSProperties = {
  marginTop: 16,
  padding: '12px 14px',
  background: '#ecfdf5',
  border: '1px solid #a7f3d0',
  color: '#065f46',
  borderRadius: 'var(--r)',
  fontSize: 13,
};

const alertErr: React.CSSProperties = {
  marginTop: 16,
  padding: '12px 14px',
  background: '#fef2f2',
  border: '1px solid #fecaca',
  color: '#991b1b',
  borderRadius: 'var(--r)',
  fontSize: 13,
};
