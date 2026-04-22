'use client';

import Link from 'next/link';
import { useLang } from '@/i18n/LangProvider';
import { DEFAULT_NEWS } from '@/data/news-defaults';

export function NewsPreview() {
  const { lang, t } = useLang();
  const preview = DEFAULT_NEWS.slice(0, 3);

  return (
    <section className="section" style={{ background: 'var(--bg2)' }}>
      <div className="wrap">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div className="eyebrow">Latest News</div>
            <h2 style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 32, fontWeight: 700, color: 'var(--navy)', marginTop: 8 }}>
              {lang === 'en' ? 'Latest News & Stories' : lang === 'zh' ? '最新动态' : '최신 소식'}
            </h2>
          </div>
          <Link href="/news" style={{ color: 'var(--blue)', fontWeight: 600, fontSize: 14 }}>
            {t('more')} →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 22 }}>
          {preview.map((n) => (
            <Link key={n.id} href={`/news/${n.id}`} style={{ textDecoration: 'none' }}>
              <article style={card}>
                <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
                  <img src={n.img} alt={n.title[lang] ?? n.title.ko} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={catBadge}>{n.cat[lang] ?? n.cat.ko}</span>
                </div>
                <div style={{ padding: 20 }}>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>{n.date}</div>
                  <h3 style={{ fontSize: 15.5, fontWeight: 700, color: 'var(--navy)', lineHeight: 1.4, marginBottom: 8 }}>
                    {n.title[lang] ?? n.title.ko}
                  </h3>
                  <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
                    {(n.desc[lang] ?? n.desc.ko).slice(0, 85)}…
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const card: React.CSSProperties = {
  background: '#fff',
  border: '1px solid var(--border)',
  borderRadius: 'var(--r2)',
  overflow: 'hidden',
  boxShadow: 'var(--sh)',
  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
  height: '100%',
};

const catBadge: React.CSSProperties = {
  position: 'absolute',
  top: 12,
  left: 12,
  padding: '4px 10px',
  borderRadius: 999,
  fontSize: 10.5,
  fontWeight: 700,
  color: '#fff',
  background: 'rgba(15,23,42,0.78)',
  backdropFilter: 'blur(6px)',
  letterSpacing: 0.4,
};
