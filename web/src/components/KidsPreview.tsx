'use client';

import Link from 'next/link';
import { useLang } from '@/i18n/LangProvider';
import { KIDS } from '@/data/kids';

export function KidsPreview() {
  const { lang, t } = useLang();
  const preview = KIDS.slice(0, 3);

  const nameOf = (k: (typeof KIDS)[number]) =>
    typeof k.name === 'string' ? k.name : k.name[lang] ?? k.name.ko;

  return (
    <section className="section" style={{ background: 'var(--bg2)' }}>
      <div className="wrap">
        <div style={head}>
          <div>
            <div className="eyebrow">Our Children</div>
            <h2 style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 32, fontWeight: 700, color: 'var(--navy)', marginTop: 8 }}>
              {lang === 'en' ? 'Stories of Little Hearts' : lang === 'zh' ? '小小心脏的故事' : '작은 심장들의 이야기'}
            </h2>
          </div>
          <Link href="/children" style={{ color: 'var(--blue)', fontWeight: 600, fontSize: 14 }}>
            {t('more')} →
          </Link>
        </div>

        <div style={grid}>
          {preview.map((k) => (
            <article key={k.id} style={card}>
              <div style={{ position: 'relative', aspectRatio: '4 / 3', overflow: 'hidden', background: '#eef2ff' }}>
                <img
                  src={k.img}
                  alt={nameOf(k)}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span style={badge(k.status)}>
                  {k.status === 'recovered'
                    ? (lang === 'en' ? 'Treated' : lang === 'zh' ? '已治疗' : '치료 완료')
                    : (lang === 'en' ? 'In Progress' : lang === 'zh' ? '进行中' : '진행 중')}
                </span>
              </div>
              <div style={{ padding: 22 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 10 }}>
                  <span style={{ fontSize: 24 }}>{k.flag}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 15 }}>{nameOf(k)}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--muted)' }}>
                      {k.country[lang] ?? k.country.ko} · {k.age[lang] ?? k.age.ko}
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>
                  {(k.story[lang] ?? k.story.ko).slice(0, 110)}…
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const head: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  marginBottom: 28,
};

const grid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 22,
};

const card: React.CSSProperties = {
  background: '#fff',
  borderRadius: 'var(--r2)',
  overflow: 'hidden',
  border: '1px solid var(--border)',
  boxShadow: 'var(--sh)',
};

const badge = (s: 'recovered' | 'waiting'): React.CSSProperties => ({
  position: 'absolute',
  top: 12,
  left: 12,
  padding: '5px 11px',
  borderRadius: 999,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: 0.4,
  color: '#fff',
  background: s === 'recovered' ? 'var(--green)' : 'var(--blue)',
});
