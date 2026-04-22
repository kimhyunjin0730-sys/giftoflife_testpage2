import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createServerSupabase } from '@/lib/supabase-server';
import { DEFAULT_NOTICES, rowToNotice, type NoticeRow } from '@/data/notices';

type Params = { id: string };
export const revalidate = 60;

async function fetchNotice(id: string): Promise<NoticeRow | null> {
  const local = DEFAULT_NOTICES.find((n) => String(n.id) === id);
  if (local) return local;
  try {
    const sb = createServerSupabase();
    const { data } = await sb.from('notices').select('*').eq('id', id).maybeSingle();
    if (!data) return null;
    return rowToNotice(data as Record<string, unknown>);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await params;
  const n = await fetchNotice(id);
  if (!n) return { title: '공지사항' };
  return { title: n.title.ko, description: n.content.ko.slice(0, 120) };
}

export default async function NoticeDetailPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const n = await fetchNotice(id);
  if (!n) notFound();

  return (
    <article className="section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <Link href="/notices" style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 18, display: 'inline-block' }}>
          ← 공지사항 목록
        </Link>

        <div style={{ marginBottom: 20 }}>
          {n.isNotice && (
            <span style={{
              display: 'inline-block',
              padding: '4px 12px',
              borderRadius: 999,
              background: 'var(--blue)',
              color: '#fff',
              fontSize: 11,
              fontWeight: 700,
              marginBottom: 12,
            }}>공지</span>
          )}
          <h1 style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 28, fontWeight: 700, color: 'var(--navy)', lineHeight: 1.3, marginBottom: 10 }}>
            {n.title.ko}
          </h1>
          <div style={{ display: 'flex', gap: 18, fontSize: 13, color: 'var(--muted)' }}>
            <span>{n.author.ko}</span>
            <span>{n.date}</span>
            <span>조회 {n.views}</span>
          </div>
        </div>

        <div style={{
          padding: '28px 24px',
          background: '#fff',
          border: '1px solid var(--border)',
          borderRadius: 'var(--r2)',
          fontSize: 15,
          color: 'var(--text)',
          lineHeight: 2,
          whiteSpace: 'pre-wrap',
          boxShadow: 'var(--sh)',
        }}>
          {n.content.ko}
        </div>
      </div>
    </article>
  );
}
