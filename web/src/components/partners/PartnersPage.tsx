'use client';

import { useLang } from '@/i18n/LangProvider';
import { CORPORATE, HOSPITALS, ORGS, PARTNERS_TEXT } from '@/data/partners';

export function PartnersPage() {
  const { lang } = useLang();

  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 1100 }}>
        {/* 타이틀 */}
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div className="eyebrow">Partners</div>
          <h1 style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 32, fontWeight: 700, color: 'var(--navy)', margin: '14px 0' }}>
            {PARTNERS_TEXT.title[lang]}
          </h1>
          <div style={{ width: 50, height: 3, background: 'var(--blue)', margin: '0 auto 18px' }} />
          <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8, maxWidth: 640, margin: '0 auto' }}>
            {PARTNERS_TEXT.sub[lang]}
          </p>
        </div>

        {/* 기업 파트너 */}
        <Section
          title={PARTNERS_TEXT.corpH[lang]}
          desc={PARTNERS_TEXT.corpDesc[lang]}
          accent="var(--blue)"
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {CORPORATE.map((p) => (
              <LogoCell key={p.name} {...p} />
            ))}
          </div>
        </Section>

        {/* 병원 파트너 */}
        <Section
          title={PARTNERS_TEXT.hospitalsH[lang]}
          desc={PARTNERS_TEXT.hospitalsDesc[lang]}
          accent="var(--green)"
        >
          <div style={{
            background: '#fff',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r2)',
            padding: '28px 24px',
            boxShadow: 'var(--sh)',
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, alignItems: 'center' }}>
              {HOSPITALS.map((h, i) => (
                <a
                  key={h.name}
                  href={h.url ?? '#'}
                  target="_blank"
                  rel="noopener"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px 24px',
                    borderRight: i < HOSPITALS.length - 1 ? '1px solid var(--border)' : 'none',
                    transition: 'background 0.2s ease',
                  }}
                >
                  <img src={h.logo} alt={h.name} style={{ maxHeight: 72, maxWidth: '100%', objectFit: 'contain' }} />
                </a>
              ))}
            </div>
          </div>
        </Section>

        {/* 함께하는 파트너 */}
        <Section
          title={PARTNERS_TEXT.orgsH[lang]}
          desc={PARTNERS_TEXT.orgsDesc[lang]}
          accent="var(--gold)"
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: 18,
          }}>
            {ORGS.map((o) => (
              <LogoCell key={o.name} name={o.name} logo={o.logo} />
            ))}
          </div>
        </Section>
      </div>
    </section>
  );
}

function Section({ title, desc, accent, children }: {
  title: string;
  desc: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 60 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
        <div style={{ width: 4, height: 32, background: accent, borderRadius: 2 }} />
        <h2 style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 26, fontWeight: 700, color: 'var(--navy)' }}>
          {title}
        </h2>
      </div>
      <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 22 }}>{desc}</p>
      {children}
    </div>
  );
}

function LogoCell({ name, logo, url }: { name: string; logo: string; url?: string | null }) {
  const cell = (
    <div style={{
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 'var(--r2)',
      padding: '32px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 120,
      boxShadow: 'var(--sh)',
      transition: 'box-shadow 0.3s ease, transform 0.3s ease',
    }}>
      <img src={logo} alt={name} style={{ maxHeight: 60, maxWidth: '100%', objectFit: 'contain' }}
        onError={(e) => { (e.currentTarget.parentElement!).textContent = name; }}
      />
    </div>
  );
  return url ? <a href={url} target="_blank" rel="noopener">{cell}</a> : cell;
}
