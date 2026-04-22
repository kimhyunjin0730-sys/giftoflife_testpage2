'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/useSession';
import { getSupabase } from '@/lib/supabase';
import { MembersTab } from './MembersTab';
import { NewsAdminTab } from './NewsAdminTab';
import { NoticesAdminTab } from './NoticesAdminTab';
import { DonationsTab } from './DonationsTab';

type Tab = 'members' | 'rotary' | 'news' | 'notices' | 'donations';

const TABS: { id: Tab; label: string }[] = [
  { id: 'members', label: '회원 관리' },
  { id: 'rotary', label: '로타리 인증' },
  { id: 'news', label: '뉴스 관리' },
  { id: 'notices', label: '공지 관리' },
  { id: 'donations', label: '후원 관리' },
];

export function AdminPanel() {
  const router = useRouter();
  const { user, loading } = useSession();
  const [role, setRole] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);
  const [tab, setTab] = useState<Tab>('members');

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace('/login');
      return;
    }
    const sb = getSupabase();
    sb.from('profiles').select('role').eq('id', user.id).maybeSingle().then(({ data }) => {
      setRole((data?.role as string | undefined) ?? 'public');
      setChecking(false);
    });
  }, [user, loading, router]);

  if (loading || checking) {
    return (
      <section className="section">
        <div className="wrap" style={{ maxWidth: 640, textAlign: 'center', padding: '80px 24px' }}>
          <p style={{ color: 'var(--muted)' }}>Loading…</p>
        </div>
      </section>
    );
  }

  if (role !== 'admin') {
    return (
      <section className="section">
        <div className="wrap" style={{ maxWidth: 640, textAlign: 'center', padding: '80px 24px' }}>
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: 'var(--r2)',
            padding: '28px 24px',
            color: '#991b1b',
          }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>권한이 없습니다</h2>
            <p style={{ fontSize: 14 }}>관리자 계정으로 로그인해 주세요.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 1100 }}>
        <header style={{ marginBottom: 28 }}>
          <div className="eyebrow">Admin</div>
          <h1 style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 32, fontWeight: 700, color: 'var(--navy)', margin: '10px 0' }}>
            관리자 패널
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 13 }}>{user?.email}</p>
        </header>

        {/* 탭 */}
        <nav style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--border)', marginBottom: 28, overflowX: 'auto' }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: '12px 20px',
                fontSize: 14,
                fontWeight: tab === t.id ? 700 : 500,
                color: tab === t.id ? 'var(--navy)' : 'var(--muted)',
                borderBottom: `3px solid ${tab === t.id ? 'var(--blue)' : 'transparent'}`,
                whiteSpace: 'nowrap',
                background: 'transparent',
              }}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {/* 탭 컨텐츠 */}
        {tab === 'members' && <MembersTab filter="all" />}
        {tab === 'rotary' && <MembersTab filter="rotary" />}
        {tab === 'news' && <NewsAdminTab />}
        {tab === 'notices' && <NoticesAdminTab />}
        {tab === 'donations' && <DonationsTab />}
      </div>
    </section>
  );
}
