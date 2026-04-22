'use client';

import Link from 'next/link';
import { useLang } from '@/i18n/LangProvider';
import { GROWTH } from '@/data/about';

export function GrowthSection() {
  const { lang, t } = useLang();

  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 900 }}>
        {/* 타이틀 */}
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>Our Growth</div>
          <h1 style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 32, fontWeight: 700, color: 'var(--navy)', marginBottom: 14 }}>
            {lang === 'en' ? 'The Growth of Gift of Life' : lang === 'zh' ? '生命礼物的发展历程' : 'Gift of Life의 발전'}
          </h1>
          <div style={{ width: 50, height: 3, background: 'var(--blue)', margin: '0 auto 18px' }} />
          <p style={{ fontSize: 16, color: 'var(--muted)' }}>{GROWTH.subtitle[lang]}</p>
        </div>

        {/* 본문 + 영상 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36, marginBottom: 48, alignItems: 'center' }}>
          <div>
            <div style={{ position: 'relative', paddingBottom: '56.25%', borderRadius: 'var(--r2)', overflow: 'hidden', boxShadow: 'var(--sh2)' }}>
              <iframe
                src="https://www.youtube.com/embed/beIoD4hbZSg"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                allowFullScreen
                title="Gift of Life Growth"
                loading="lazy"
              />
            </div>
          </div>
          <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 2 }}>
            {GROWTH.paras.map((p, i) => (
              <p key={i} style={{ marginBottom: 14 }}>{p[lang]}</p>
            ))}
          </div>
        </div>

        {/* 통계 배너 */}
        <div style={{
          background: '#f1f5f9',
          border: '1px solid var(--border)',
          borderRadius: 'var(--r2)',
          padding: '44px 36px',
          marginBottom: 36,
        }}>
          <h3 style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 26, color: 'var(--navy)', textAlign: 'center', marginBottom: 10 }}>
            {GROWTH.statsH[lang]}
          </h3>
          <p style={{ color: 'var(--muted)', textAlign: 'center', marginBottom: 36, fontSize: 14 }}>
            {GROWTH.statsSub[lang]}
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 0,
            background: '#fff',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r2)',
            overflow: 'hidden',
            boxShadow: 'var(--sh)',
          }}>
            {GROWTH.stats.map((s, i) => (
              <div key={i} style={{
                padding: '22px 18px',
                textAlign: 'center',
                borderRight: (i + 1) % 3 !== 0 ? '1px solid var(--border)' : 'none',
                borderBottom: i < GROWTH.stats.length - 3 ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 26, fontWeight: 700, color: 'var(--gold)', marginBottom: 6 }}>
                  {s.v}
                </div>
                <p style={{ color: 'var(--muted)', fontSize: 12, lineHeight: 1.55 }}>{s.l[lang]}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{
          background: 'linear-gradient(135deg, var(--blue), var(--blue2))',
          borderRadius: 'var(--r2)',
          padding: '44px 40px',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(232, 114, 138, 0.3)',
        }}>
          <h3 style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 12 }}>
            {GROWTH.ctaH[lang]}
          </h3>
          <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.82)', lineHeight: 1.85, maxWidth: 480, margin: '0 auto 24px' }}>
            {GROWTH.ctaP[lang]}
          </p>
          <Link href="/donate" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '14px 40px',
            background: '#fff',
            color: 'var(--blue)',
            borderRadius: 'var(--r2)',
            fontSize: 15,
            fontWeight: 700,
          }}>
            {t('donate_btn')}
          </Link>
        </div>
      </div>
    </section>
  );
}
