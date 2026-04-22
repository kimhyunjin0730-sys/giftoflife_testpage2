'use client';

import { useLang } from '@/i18n/LangProvider';
import { HOSPITALS, ORGS } from '@/data/partners';

export function PartnersStrip() {
  const { lang } = useLang();
  const logos = [...HOSPITALS, ...ORGS.slice(0, 6)];

  return (
    <section className="section" style={{ background: '#fff', paddingTop: 40, paddingBottom: 40 }}>
      <div className="wrap">
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div className="eyebrow" style={{ color: 'var(--muted)' }}>
            {lang === 'en' ? 'Our Partners' : lang === 'zh' ? '我们的合作伙伴' : '함께하는 파트너'}
          </div>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 28,
          alignItems: 'center',
          justifyItems: 'center',
        }}>
          {logos.map((p) => (
            <img
              key={p.name}
              src={p.logo}
              alt={p.name}
              style={{
                maxHeight: 48,
                maxWidth: '100%',
                objectFit: 'contain',
                opacity: 0.75,
                filter: 'grayscale(20%)',
                transition: 'opacity 0.25s ease, filter 0.25s ease',
              }}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
