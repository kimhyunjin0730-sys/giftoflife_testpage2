import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createServerSupabase } from '@/lib/supabase-server';
import { DEFAULT_NEWS, rowToNewsItem, type NewsItem } from '@/data/news-defaults';

type Params = { id: string };

export const revalidate = 60;

async function fetchNewsItem(id: string): Promise<NewsItem | null> {
  // 로컬 기본 데이터 우선 (id 가 'local-*' 인 경우)
  const local = DEFAULT_NEWS.find((n) => String(n.id) === id);
  if (local) return local;

  try {
    const sb = createServerSupabase();
    const { data, error } = await sb.from('news_posts').select('*').eq('id', id).maybeSingle();
    if (error || !data) return null;
    return rowToNewsItem(data as Record<string, unknown>);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await params;
  const item = await fetchNewsItem(id);
  if (!item) return { title: '뉴스' };
  return {
    title: item.title.ko,
    description: item.desc.ko,
    openGraph: {
      title: item.title.ko,
      description: item.desc.ko,
      images: item.img ? [{ url: item.img }] : undefined,
    },
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const item = await fetchNewsItem(id);
  if (!item) notFound();

  return (
    <article className="section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <Link href="/news" style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 18, display: 'inline-block' }}>
          ← 뉴스 목록
        </Link>

        <div style={{ marginBottom: 20 }}>
          <span style={{
            display: 'inline-block',
            padding: '5px 12px',
            borderRadius: 999,
            background: 'var(--blue-lt)',
            color: 'var(--blue)',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 0.4,
            marginBottom: 12,
          }}>{item.cat.ko}</span>
          <h1 style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 32, fontWeight: 700, color: 'var(--navy)', lineHeight: 1.3, marginBottom: 10 }}>
            {item.title.ko}
          </h1>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>{item.date}</div>
        </div>

        {item.img && (
          <div style={{ borderRadius: 'var(--r2)', overflow: 'hidden', marginBottom: 28, boxShadow: 'var(--sh)' }}>
            <img src={item.img} alt={item.title.ko} style={{ width: '100%', display: 'block' }} />
          </div>
        )}

        <div style={{ fontSize: 16, color: 'var(--text)', lineHeight: 2 }}>
          <p style={{ marginBottom: 18 }}>{item.desc.ko}</p>
        </div>

        {item.url && (
          <div style={{ marginTop: 32, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener"
              className="btn-ghost"
              style={{ fontSize: 14 }}
            >
              원문 보기 →
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
