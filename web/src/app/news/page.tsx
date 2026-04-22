import type { Metadata } from 'next';
import { createServerSupabase } from '@/lib/supabase-server';
import { DEFAULT_NEWS, rowToNewsItem, type NewsItem } from '@/data/news-defaults';
import { NewsGrid } from '@/components/news/NewsGrid';

export const metadata: Metadata = {
  title: '뉴스 & 소식',
  description: '생명의 선물 코리아의 최근 활동과 후원 캠페인 소식.',
};

// ISR — 60초마다 백그라운드 재생성 (뉴스는 실시간성보다 캐시 성능 우선)
export const revalidate = 60;

async function fetchNews(): Promise<NewsItem[]> {
  try {
    const sb = createServerSupabase();
    const { data, error } = await sb
      .from('news_posts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(24);
    if (error || !data?.length) return DEFAULT_NEWS;
    return data.map(rowToNewsItem);
  } catch {
    return DEFAULT_NEWS;
  }
}

export default async function NewsPage() {
  const items = await fetchNews();

  return (
    <section className="section">
      <div className="wrap">
        <header style={{ textAlign: 'center', marginBottom: 44 }}>
          <div className="eyebrow">News &amp; Stories</div>
          <h1 style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 36, fontWeight: 700, color: 'var(--navy)', margin: '12px 0' }}>
            뉴스 &amp; 소식
          </h1>
          <div style={{ width: 50, height: 3, background: 'var(--blue)', margin: '16px auto 0' }} />
        </header>

        <NewsGrid items={items} />
      </div>
    </section>
  );
}
