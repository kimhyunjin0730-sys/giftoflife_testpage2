'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from '@/lib/useSession';
import { getSupabase } from '@/lib/supabase';
import { useLang } from '@/i18n/LangProvider';

type Donation = {
  id: string;
  created_at: string;
  amount: number;
  donation_type?: string | null;
  status?: string | null;
};

export function MyPage() {
  const router = useRouter();
  const { user, loading } = useSession();
  const { lang } = useLang();
  const [donations, setDonations] = useState<Donation[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace('/login');
      return;
    }
    const sb = getSupabase();
    sb.from('donations')
      .select('id,created_at,amount,donation_type,status')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) setError(error.message);
        setDonations(data ?? []);
      });
  }, [user, loading, router]);

  async function handleLogout() {
    const sb = getSupabase();
    await sb.auth.signOut();
    router.push('/');
    router.refresh();
  }

  if (loading || !user) {
    return (
      <section className="section">
        <div className="wrap" style={{ maxWidth: 640, textAlign: 'center', padding: '80px 24px' }}>
          <p style={{ color: 'var(--muted)' }}>Loading…</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 720 }}>
        <header style={{ textAlign: 'center', marginBottom: 36 }}>
          <div className="eyebrow">My Page</div>
          <h1 style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 32, fontWeight: 700, color: 'var(--navy)', margin: '10px 0' }}>
            {lang === 'en' ? 'My Donation' : lang === 'zh' ? '我的捐款' : '나의 후원'}
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 14 }}>{user.email}</p>
        </header>

        <section style={card}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--navy)', marginBottom: 18 }}>
            {lang === 'en' ? 'Donation History' : lang === 'zh' ? '捐款记录' : '후원 내역'}
          </h2>
          {error && <p style={{ color: '#991b1b', fontSize: 13, marginBottom: 12 }}>⚠️ {error}</p>}
          {donations === null ? (
            <p style={{ color: 'var(--muted)', fontSize: 14 }}>Loading…</p>
          ) : donations.length === 0 ? (
            <p style={{ color: 'var(--muted)', fontSize: 14, textAlign: 'center', padding: '20px 0' }}>
              {lang === 'en'
                ? 'No donations yet.'
                : lang === 'zh'
                  ? '暂无捐款记录。'
                  : '아직 후원 내역이 없습니다.'}
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {donations.map((d) => (
                <div key={d.id} style={donRow}>
                  <div>
                    <div style={{ fontSize: 13, color: 'var(--muted)' }}>{new Date(d.created_at).toLocaleDateString()}</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--navy)' }}>
                      ₩ {d.amount?.toLocaleString?.() ?? d.amount}
                    </div>
                  </div>
                  <span style={{
                    fontSize: 12,
                    padding: '4px 10px',
                    borderRadius: 999,
                    background: d.status === 'confirmed' ? '#ecfdf5' : '#fef3c7',
                    color: d.status === 'confirmed' ? '#065f46' : '#92400e',
                    fontWeight: 600,
                  }}>
                    {d.status ?? 'pending'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
          <Link href="/donate" className="btn-primary" style={{ flex: 1 }}>
            {lang === 'en' ? 'New Donation' : lang === 'zh' ? '新捐款' : '새 후원하기'}
          </Link>
          <button onClick={handleLogout} className="btn-ghost" style={{ flex: 1 }}>
            {lang === 'en' ? 'Log out' : lang === 'zh' ? '退出登录' : '로그아웃'}
          </button>
        </div>
      </div>
    </section>
  );
}

const card: React.CSSProperties = {
  background: '#fff',
  border: '1px solid var(--border)',
  borderRadius: 'var(--r2)',
  padding: 28,
  boxShadow: 'var(--sh)',
};

const donRow: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '14px 16px',
  background: 'var(--bg2)',
  borderRadius: 'var(--r)',
};
