import type { Metadata } from 'next';
import { createServerSupabase } from '@/lib/supabase-server';
import { DEFAULT_NOTICES, rowToNotice, type NoticeRow } from '@/data/notices';
import { NoticesTable } from '@/components/notices/NoticesTable';

export const metadata: Metadata = {
  title: '공지사항',
  description: '생명의 선물 코리아 공지사항 및 알림.',
};

export const revalidate = 60;

async function fetchNotices(): Promise<NoticeRow[]> {
  try {
    const sb = createServerSupabase();
    const { data, error } = await sb
      .from('notices')
      .select('*')
      .eq('published', true)
      .order('is_notice', { ascending: false })
      .order('date', { ascending: false })
      .limit(50);
    if (error || !data?.length) return DEFAULT_NOTICES;
    return data.map((r) => rowToNotice(r as Record<string, unknown>));
  } catch {
    return DEFAULT_NOTICES;
  }
}

export default async function NoticesPage() {
  const items = await fetchNotices();

  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 960 }}>
        <header style={{ textAlign: 'center', marginBottom: 44 }}>
          <div className="eyebrow">Notices</div>
          <h1 style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 36, fontWeight: 700, color: 'var(--navy)', margin: '12px 0' }}>
            공지사항
          </h1>
          <div style={{ width: 50, height: 3, background: 'var(--blue)', margin: '16px auto 0' }} />
        </header>

        <NoticesTable items={items} />
      </div>
    </section>
  );
}
