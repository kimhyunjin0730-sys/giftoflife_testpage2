'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/i18n/LangProvider';
import { KIDS } from '@/data/kids';

const INTERVAL_MS = 7000;

export function HeroSlider() {
  const { lang, t } = useLang();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % KIDS.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const kid = KIDS[idx];
  const nameOf = (k: (typeof KIDS)[number]) =>
    typeof k.name === 'string' ? k.name : k.name[lang] ?? k.name.ko;

  return (
    <section style={wrap}>
      {KIDS.map((k, i) => {
        const bg = k.heroImg ?? k.img;
        return (
          <div
            key={k.id}
            style={{
              ...slide,
              backgroundImage: `url('${bg}')`,
              opacity: i === idx ? 1 : 0,
            }}
            aria-hidden={i !== idx}
          />
        );
      })}
      <div style={overlay} />

      <div className="wrap" style={content}>
        <div style={eyebrow}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--blue)' }} />
          {kid.country[lang] ?? kid.country.ko} · {kid.age[lang] ?? kid.age.ko} · {nameOf(kid)}
        </div>
        <h1
          style={h1}
          dangerouslySetInnerHTML={{ __html: t('hero_h').replace('<span class="accent">', '<span style="color:var(--blue)">') }}
        />
        <p style={para}>{t('hero_p')}</p>
        <div style={{ display: 'flex', gap: 14, marginTop: 28, flexWrap: 'wrap' }}>
          <Link href="/donate" className="btn-primary">{t('donate_btn')}</Link>
          <Link href="/children" className="btn-ghost" style={{ background: 'rgba(255,255,255,0.8)' }}>
            {t('hero_more')} →
          </Link>
        </div>

        <div style={dots}>
          {KIDS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={`slide ${i + 1}`}
              style={{
                width: i === idx ? 28 : 8,
                height: 8,
                borderRadius: 999,
                background: i === idx ? 'var(--blue)' : 'rgba(255, 255, 255, 0.7)',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const wrap: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  minHeight: '560px',
  overflow: 'hidden',
  color: '#fff',
};

const slide: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  transition: 'opacity 1.2s ease',
};

const overlay: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  background: 'linear-gradient(120deg, rgba(15, 23, 42, 0.65) 0%, rgba(15, 23, 42, 0.35) 55%, rgba(15, 23, 42, 0.2) 100%)',
};

const content: React.CSSProperties = {
  position: 'relative',
  zIndex: 2,
  padding: '96px 24px 88px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: 16,
};

const eyebrow: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
  padding: '7px 16px',
  borderRadius: 999,
  border: '1px solid rgba(255,255,255,0.3)',
  background: 'rgba(0,0,0,0.24)',
  fontSize: 12.5,
  fontWeight: 600,
  letterSpacing: 0.3,
};

const h1: React.CSSProperties = {
  fontFamily: "'Libre Bodoni', serif",
  fontSize: 'clamp(32px, 5.5vw, 56px)',
  fontWeight: 700,
  lineHeight: 1.15,
  maxWidth: 880,
};

const para: React.CSSProperties = {
  fontSize: 16,
  lineHeight: 1.75,
  color: 'rgba(255,255,255,0.92)',
  maxWidth: 640,
};

const dots: React.CSSProperties = {
  marginTop: 32,
  display: 'flex',
  gap: 8,
  alignItems: 'center',
};
