'use client';

import { useLang } from '@/i18n/LangProvider';
import { INTRO } from '@/data/about';

export function IntroSection() {
  const { lang } = useLang();
  const eyebrow = lang === 'en' ? 'About Gift of Life' : lang === 'zh' ? '关于生命礼物' : '단체 소개';

  return (
    <>
      {/* 타이틀 섹션 */}
      <section className="section">
        <div className="wrap" style={{ maxWidth: 900, textAlign: 'center' }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>{eyebrow}</div>
          <h1 style={h1Style}>{INTRO.heading[lang].split('\n').map((l, i) => <span key={i}>{l}<br /></span>)}</h1>
          <div style={{ width: 50, height: 3, background: 'var(--blue)', margin: '20px auto' }} />
          <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9 }}>{INTRO.sub[lang]}</p>
        </div>
      </section>

      {/* 네트워크 설명 */}
      <section style={{ background: '#f1f5f9', padding: '56px 0', borderBlock: '1px solid var(--border)' }}>
        <div className="wrap" style={{ maxWidth: 1100 }}>
          <div style={grid2}>
            <div style={{ position: 'relative', borderRadius: 'var(--r2)', overflow: 'hidden', boxShadow: 'var(--sh)' }}>
              <img src="/소개-이미지블루.png" alt="Gift of Life"
                onError={(e) => { (e.target as HTMLImageElement).src = '/images/kids/paisleigh-malawi.jpg'; }}
                style={{ width: '100%', display: 'block', borderRadius: 'var(--r2)' }} />
              <div style={{
                position: 'absolute', bottom: 18, left: 18, right: 18,
                background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
                borderRadius: 'var(--r)', padding: '13px 18px', border: '1px solid var(--border)',
              }}>
                <p style={{ fontSize: 12.5, color: 'var(--navy)', fontWeight: 600, margin: 0 }}>
                  {INTRO.networkBadge[lang]}
                </p>
              </div>
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: 13 }}>Gift of Life International</div>
              <h2 style={h2Style}>
                {INTRO.networkH[lang].split('\n').map((l, i) => <span key={i}>{l}<br /></span>)}
              </h2>
              <p style={paraStyle}>{INTRO.networkP1[lang]}</p>
              <p style={paraStyle}>{INTRO.networkP2[lang]}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 통계 3개 */}
      <section style={{ padding: '44px 0' }}>
        <div className="wrap">
          <div style={statsGrid}>
            {INTRO.stats.map((s) => (
              <div key={s.v} style={statCell}>
                <span style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 36, fontWeight: 700, color: 'var(--navy)', display: 'block' }}>{s.v}</span>
                <span style={{ fontSize: 13, color: 'var(--muted)', marginTop: 6, display: 'block' }}>{s.l[lang]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 프로그램 카드 3개 */}
      <section style={{ background: 'var(--bg2)', padding: '56px 0' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="eyebrow">Our Programs</div>
            <h2 style={{ ...h2Style, marginTop: 14, fontSize: 'clamp(22px,3vw,32px)' }}>
              {lang === 'en' ? 'What We Do' : lang === 'zh' ? '我们的工作' : '우리가 하는 일'}
            </h2>
            <div style={{ width: 50, height: 3, background: 'var(--blue)', margin: '14px auto' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}>
            {INTRO.programs.map((p) => (
              <article key={p.sub} style={cardStyle}>
                <div style={{ height: 5, background: `linear-gradient(90deg, ${p.accent}, var(--blue2))` }} />
                <img src={p.img} alt={p.h[lang]} style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }} />
                <div style={{ padding: 24 }}>
                  <div className="eyebrow" style={{ marginBottom: 8, color: p.accent }}>{p.sub}</div>
                  <h3 style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 18, fontWeight: 700, color: 'var(--navy)', marginBottom: 12, lineHeight: 1.35 }}>
                    {p.h[lang]}
                  </h3>
                  <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.85 }}>{p.p[lang]}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

const h1Style: React.CSSProperties = {
  fontFamily: "'Libre Bodoni', serif",
  fontSize: 32,
  fontWeight: 700,
  color: 'var(--navy)',
};
const h2Style: React.CSSProperties = {
  fontFamily: "'Libre Bodoni', serif",
  fontSize: 'clamp(20px, 2.6vw, 30px)',
  fontWeight: 700,
  color: 'var(--navy)',
  lineHeight: 1.35,
  marginBottom: 18,
};
const paraStyle: React.CSSProperties = {
  fontSize: 14.5,
  color: 'var(--text)',
  lineHeight: 2,
  marginBottom: 14,
};
const grid2: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 44,
  alignItems: 'center',
};
const statsGrid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 18,
};
const statCell: React.CSSProperties = {
  textAlign: 'center',
  padding: '28px 16px',
  background: '#fff',
  border: '1px solid var(--border)',
  borderRadius: 'var(--r2)',
  boxShadow: 'var(--sh)',
};
const cardStyle: React.CSSProperties = {
  background: '#fff',
  border: '1px solid var(--border)',
  borderRadius: 'var(--r2)',
  overflow: 'hidden',
  boxShadow: 'var(--sh)',
};
