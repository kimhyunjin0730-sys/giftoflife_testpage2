'use client';

import Link from 'next/link';
import { useLang } from '@/i18n/LangProvider';
import { MISSION } from '@/data/about';

export function MissionSection() {
  const { lang, t } = useLang();

  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 900 }}>
        {/* 타이틀 */}
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>Missions</div>
          <h1 style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 32, fontWeight: 700, color: 'var(--navy)', marginBottom: 14 }}>
            {MISSION.heading[lang]}
          </h1>
          <div style={{ width: 50, height: 3, background: 'var(--blue)', margin: '0 auto 20px' }} />
          <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, maxWidth: 760, margin: '0 auto' }}>
            {MISSION.intro[lang]}
          </p>
        </div>

        {/* 카드 3개 */}
        {MISSION.cards.map((card) => (
          <article key={card.hEn} style={{
            background: '#fff',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r2)',
            overflow: 'hidden',
            marginBottom: 28,
            boxShadow: 'var(--sh)',
          }}>
            <div style={{ height: 4, background: `linear-gradient(90deg, ${card.accent}, var(--blue2))` }} />
            <div style={{ padding: 36 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 20,
                paddingBottom: 16,
                borderBottom: '1px solid var(--border)',
              }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: 'var(--blue-lt)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  flexShrink: 0,
                }}>{card.icon}</div>
                <h3 style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 22, color: 'var(--blue)', lineHeight: 1.2 }}>
                  {card.hEn} <span style={{ fontSize: 18, color: 'var(--navy)' }}>{card.hKo[lang]}</span>
                </h3>
              </div>
              <img
                src={card.img}
                alt={card.hEn}
                loading="lazy"
                style={{ width: '100%', borderRadius: 'var(--r2)', marginBottom: 20, display: 'block', aspectRatio: '16/9', objectFit: 'cover' }}
              />
              <p style={{ fontSize: 14.5, color: 'var(--text)', lineHeight: 2 }}>{card.p[lang]}</p>
            </div>
          </article>
        ))}

        {/* 활동 영상 */}
        <div style={{ marginBottom: 44, marginTop: 44 }}>
          <h4 style={{
            fontFamily: "'Libre Bodoni', serif",
            fontWeight: 700,
            fontSize: 20,
            color: 'var(--navy)',
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <span style={{ width: 4, height: 24, background: 'var(--blue)', borderRadius: 2, display: 'inline-block' }} />
            {lang === 'en' ? 'Activity Videos' : lang === 'zh' ? '活动视频' : '활동 영상'}
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {MISSION.videos.map((v, i) => (
              <div key={i}>
                <div style={{
                  background: 'var(--navy)',
                  color: 'var(--gold)',
                  fontWeight: 700,
                  fontSize: 12,
                  padding: '7px 12px',
                  borderRadius: 'var(--r) var(--r) 0 0',
                  textAlign: 'center',
                }}>
                  {v.country[lang]}
                </div>
                <div style={{
                  position: 'relative',
                  paddingBottom: '56.25%',
                  overflow: 'hidden',
                  borderRadius: '0 0 var(--r) var(--r)',
                  boxShadow: 'var(--sh)',
                }}>
                  <iframe
                    src={v.embed}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                    allowFullScreen
                    title={v.country[lang]}
                    loading="lazy"
                  />
                </div>
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
            {MISSION.ctaH[lang]}
          </h3>
          <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.82)', lineHeight: 1.85, maxWidth: 480, margin: '0 auto 24px' }}>
            {MISSION.ctaP[lang]}
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
