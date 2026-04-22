'use client';

import Link from 'next/link';
import { useLang } from '@/i18n/LangProvider';
import type { NewsItem } from '@/data/news-defaults';

export function NewsGrid({ items }: { items: NewsItem[] }) {
  const { lang, t } = useLang();

  return (
    <div style={grid}>
      {items.map((n) => {
        const card = (
          <article style={cardStyle}>
            <div style={{ position: 'relative', aspectRatio: '16 / 10', overflow: 'hidden', background: '#eef2ff' }}>
              <img
                src={n.img}
                alt={n.title[lang] ?? n.title.ko}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span style={catBadge}>{n.cat[lang] ?? n.cat.ko}</span>
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>{n.date}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', lineHeight: 1.4, marginBottom: 10 }}>
                {n.title[lang] ?? n.title.ko}
              </h3>
              <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 12 }}>
                {n.desc[lang] ?? n.desc.ko}
              </p>
              <span style={{ color: 'var(--blue)', fontSize: 13, fontWeight: 600 }}>
                {t('more')} →
              </span>
            </div>
          </article>
        );
        return n.url ? (
          <a key={n.id} href={n.url} target="_blank" rel="noopener" style={{ textDecoration: 'none' }}>{card}</a>
        ) : (
          <Link key={n.id} href={`/news/${n.id}`} style={{ textDecoration: 'none' }}>{card}</Link>
        );
      })}
    </div>
  );
}

const grid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: 22,
};

const cardStyle: React.CSSProperties = {
  background: '#fff',
  border: '1px solid var(--border)',
  borderRadius: 'var(--r2)',
  overflow: 'hidden',
  boxShadow: 'var(--sh)',
  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
  cursor: 'pointer',
  height: '100%',
};

const catBadge: React.CSSProperties = {
  position: 'absolute',
  top: 12,
  left: 12,
  padding: '4px 11px',
  borderRadius: 999,
  fontSize: 11,
  fontWeight: 700,
  color: '#fff',
  background: 'rgba(15, 23, 42, 0.78)',
  backdropFilter: 'blur(6px)',
  letterSpacing: 0.4,
};
