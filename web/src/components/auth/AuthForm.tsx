'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getSupabase } from '@/lib/supabase';
import { useLang } from '@/i18n/LangProvider';

type Mode = 'login' | 'signup';
type Status = { kind: 'idle' } | { kind: 'pending' } | { kind: 'error'; msg: string };

export function AuthForm({ mode: initialMode }: { mode: Mode }) {
  const router = useRouter();
  const { lang } = useLang();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  const L = {
    login: { ko: '로그인', en: 'Login', zh: '登录' },
    signup: { ko: '회원가입', en: 'Sign Up', zh: '注册' },
    email: { ko: '이메일', en: 'Email', zh: '邮箱' },
    password: { ko: '비밀번호', en: 'Password', zh: '密码' },
    name: { ko: '성명', en: 'Name', zh: '姓名' },
    phone: { ko: '연락처', en: 'Phone', zh: '电话' },
    submit: { ko: '로그인', en: 'Sign in', zh: '登录' },
    submitSignup: { ko: '가입하기', en: 'Create account', zh: '创建账户' },
    switchToSignup: { ko: '계정이 없으신가요? 회원가입', en: 'No account? Sign up', zh: '没有账户？注册' },
    switchToLogin: { ko: '이미 회원이신가요? 로그인', en: 'Already a member? Log in', zh: '已是会员？登录' },
    forgot: { ko: '비밀번호를 잊으셨나요?', en: 'Forgot password?', zh: '忘记密码？' },
    checkEmail: { ko: '이메일을 확인해 주세요. 인증 링크를 보내드렸습니다.', en: 'Please check your inbox — we sent a verification link.', zh: '请查收邮箱，我们已发送验证链接。' },
  } as const;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ kind: 'pending' });
    const sb = getSupabase();

    if (mode === 'login') {
      const { error } = await sb.auth.signInWithPassword({ email, password });
      if (error) {
        setStatus({ kind: 'error', msg: error.message });
        return;
      }
      setStatus({ kind: 'idle' });
      router.push('/mypage');
      router.refresh();
    } else {
      const { error } = await sb.auth.signUp({
        email,
        password,
        options: {
          data: { name, phone },
          emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/login` : undefined,
        },
      });
      if (error) {
        setStatus({ kind: 'error', msg: error.message });
        return;
      }
      setStatus({ kind: 'error', msg: L.checkEmail[lang] });
    }
  }

  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 440 }}>
        <header style={{ textAlign: 'center', marginBottom: 32 }}>
          <div className="eyebrow">Account</div>
          <h1 style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 32, fontWeight: 700, color: 'var(--navy)', margin: '10px 0' }}>
            {mode === 'login' ? L.login[lang] : L.signup[lang]}
          </h1>
        </header>

        <form onSubmit={handleSubmit} style={formStyle}>
          {mode === 'signup' && (
            <>
              <Field label={L.name[lang]} required>
                <input required value={name} onChange={(e) => setName(e.target.value)} style={inp} autoComplete="name" />
              </Field>
              <Field label={L.phone[lang]}>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} style={inp} autoComplete="tel" />
              </Field>
            </>
          )}

          <Field label={L.email[lang]} required>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inp}
              autoComplete={mode === 'login' ? 'email' : 'new-email'}
            />
          </Field>

          <Field label={L.password[lang]} required>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inp}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              minLength={6}
            />
          </Field>

          <button type="submit" className="btn-primary" disabled={status.kind === 'pending'} style={{ width: '100%', marginTop: 4 }}>
            {status.kind === 'pending'
              ? '…'
              : mode === 'login' ? L.submit[lang] : L.submitSignup[lang]}
          </button>

          {status.kind === 'error' && (
            <div style={{
              marginTop: 14,
              padding: '12px 14px',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#991b1b',
              borderRadius: 'var(--r)',
              fontSize: 13,
            }}>⚠️ {status.msg}</div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 18, fontSize: 13 }}>
            <button
              type="button"
              onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setStatus({ kind: 'idle' }); }}
              style={{ color: 'var(--blue)', fontWeight: 600 }}
            >
              {mode === 'login' ? L.switchToSignup[lang] : L.switchToLogin[lang]}
            </button>
            {mode === 'login' && (
              <Link href="/forgot" style={{ color: 'var(--muted)' }}>{L.forgot[lang]}</Link>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--navy)', marginBottom: 6 }}>
        {label}{required && <span style={{ color: '#e11d48', marginLeft: 2 }}>*</span>}
      </label>
      {children}
    </div>
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
