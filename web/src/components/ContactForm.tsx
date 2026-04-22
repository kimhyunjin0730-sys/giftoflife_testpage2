'use client';

import { useState, type FormEvent } from 'react';
import { useLang } from '@/i18n/LangProvider';

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'ok' } | { kind: 'error'; msg: string };

export function ContactForm() {
  const { t } = useLang();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ kind: 'sending' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, subject, message, consent }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setStatus({ kind: 'error', msg: data.error ?? `요청 실패 (HTTP ${res.status})` });
        return;
      }
      setStatus({ kind: 'ok' });
      setName(''); setEmail(''); setPhone(''); setSubject(''); setMessage(''); setConsent(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : '네트워크 오류';
      setStatus({ kind: 'error', msg });
    }
  }

  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 720 }}>
        <header style={{ textAlign: 'center', marginBottom: 32 }}>
          <div className="eyebrow">Contact</div>
          <h1 style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 36, fontWeight: 700, color: 'var(--navy)', margin: '10px 0' }}>
            {t('contact_h')}
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 14.5, lineHeight: 1.7 }}>{t('contact_sub')}</p>
        </header>

        <form onSubmit={handleSubmit} style={formStyle}>
          <Field label={t('contact_name')} required>
            <input value={name} onChange={(e) => setName(e.target.value)} required style={inp} autoComplete="name" />
          </Field>
          <Field label={t('contact_email')} required>
            <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" style={inp} autoComplete="email" />
          </Field>
          <Field label={t('contact_phone')}>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" style={inp} autoComplete="tel" />
          </Field>
          <Field label={t('contact_subject')}>
            <input value={subject} onChange={(e) => setSubject(e.target.value)} style={inp} />
          </Field>
          <Field label={t('contact_message')} required>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={6} style={{ ...inp, resize: 'vertical' }} />
          </Field>

          <label style={consentStyle}>
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} style={{ transform: 'scale(1.1)' }} />
            {t('contact_consent')}
          </label>

          <button type="submit" className="btn-primary" disabled={status.kind === 'sending'} style={{ width: '100%', marginTop: 8 }}>
            {status.kind === 'sending' ? '전송 중…' : t('contact_submit')}
          </button>

          {status.kind === 'ok' && <div style={alertOk}>✅ {t('contact_success')}</div>}
          {status.kind === 'error' && <div style={alertErr}>⚠️ {status.msg}</div>}
        </form>
      </div>
    </section>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 18 }}>
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

const consentStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '14px 16px',
  background: 'var(--blue-lt)',
  borderRadius: 'var(--r)',
  fontSize: 13.5,
  color: 'var(--navy)',
  marginBottom: 18,
};

const alertOk: React.CSSProperties = {
  marginTop: 16,
  padding: '14px 16px',
  background: '#ecfdf5',
  border: '1px solid #a7f3d0',
  color: '#065f46',
  borderRadius: 'var(--r)',
  fontSize: 13.5,
};

const alertErr: React.CSSProperties = {
  marginTop: 16,
  padding: '14px 16px',
  background: '#fef2f2',
  border: '1px solid #fecaca',
  color: '#991b1b',
  borderRadius: 'var(--r)',
  fontSize: 13.5,
};
