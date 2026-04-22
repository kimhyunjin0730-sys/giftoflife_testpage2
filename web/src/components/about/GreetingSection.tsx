'use client';

import Link from 'next/link';
import { useLang } from '@/i18n/LangProvider';
import { GREETING } from '@/data/about';

export function GreetingSection() {
  const { lang, t } = useLang();
  const signLabel = lang === 'en' ? 'President' : lang === 'zh' ? '主席' : '의장';

  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 860 }}>
        {/* 타이틀 */}
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>Greeting</div>
          <h1 style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 32, fontWeight: 700, color: 'var(--navy)', marginBottom: 14 }}>
            {lang === 'en' ? 'Message from President' : lang === 'zh' ? '主席欢迎辞' : '인사말'}
          </h1>
          <div style={{ width: 50, height: 3, background: 'var(--blue)', margin: '0 auto' }} />
        </div>

        {/* 인용구 */}
        <div style={{
          background: 'var(--blue-lt)',
          borderLeft: '4px solid var(--blue)',
          padding: '30px 36px',
          borderRadius: 'var(--r2)',
          marginBottom: 36,
        }}>
          <p style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 20, fontStyle: 'italic', color: 'var(--navy)', lineHeight: 1.8, marginBottom: 10 }}>
            {GREETING.quote1[lang]}
          </p>
          <p style={{ fontSize: 14.5, color: 'var(--muted)', fontStyle: 'italic', lineHeight: 1.7 }}>
            {GREETING.quote2[lang]}
          </p>
        </div>

        {/* 의장 인사 카드 */}
        <div style={{
          background: '#fff',
          border: '1px solid var(--border)',
          borderRadius: 'var(--r2)',
          padding: 36,
          boxShadow: 'var(--sh)',
          marginBottom: 40,
        }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', marginBottom: 16, whiteSpace: 'pre-line' }}>
            {GREETING.hello[lang]}
          </p>
          <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 2, marginBottom: 16 }}>{GREETING.shortP1[lang]}</p>
          <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 2, marginBottom: 28 }}>{GREETING.shortP2[lang]}</p>
          <div style={{
            textAlign: 'right',
            fontSize: 14,
            color: 'var(--muted)',
            borderTop: '1px solid var(--border)',
            paddingTop: 16,
          }}>
            {signLabel} &nbsp;<strong style={{ color: 'var(--navy)' }}>
              {GREETING.sign[lang].replace(signLabel, '').trim()}
            </strong>
          </div>
        </div>

        {/* YouTube 영상 */}
        <div style={{ marginBottom: 44 }}>
          <div style={{
            position: 'relative',
            paddingBottom: '56.25%',
            borderRadius: 'var(--r2)',
            overflow: 'hidden',
            boxShadow: 'var(--sh2)',
          }}>
            <iframe
              src="https://www.youtube.com/embed/JFdr2Npy9fQ"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              allowFullScreen
              title={GREETING.videoCap[lang]}
              loading="lazy"
            />
          </div>
          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--muted)', marginTop: 10 }}>
            {GREETING.videoCap[lang]}
          </p>
        </div>

        {/* 사진 + 본문 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36, alignItems: 'start', marginBottom: 48 }}>
          <div>
            <img
              src="/images/about/greeting-lee-ali-dono.jpg"
              alt={GREETING.photoCap[lang]}
              loading="lazy"
              style={{ width: '100%', borderRadius: 'var(--r2)', boxShadow: 'var(--sh2)', aspectRatio: '4 / 3', objectFit: 'cover' }}
            />
            <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--muted)', marginTop: 10 }}>
              {GREETING.photoCap[lang]}
            </p>
          </div>
          <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 2.1 }}>
            {GREETING.longParas.slice(0, 3).map((p, i) => (
              <p key={i} style={{ marginBottom: 22, textIndent: '1em' }}>{p[lang]}</p>
            ))}
          </div>
        </div>

        {/* 본문 계속 */}
        <div style={{
          background: '#fff',
          border: '1px solid var(--border)',
          borderRadius: 'var(--r2)',
          padding: '36px 40px',
          boxShadow: 'var(--sh)',
          marginBottom: 40,
        }}>
          {GREETING.longParas.slice(3).map((p, i) => (
            <p key={i} style={{ fontSize: 15, color: 'var(--text)', lineHeight: 2.1, marginBottom: 24, textIndent: '1em' }}>
              {p[lang]}
            </p>
          ))}
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
            {GREETING.ctaH[lang]}
          </h3>
          <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.82)', lineHeight: 1.85, maxWidth: 480, margin: '0 auto 24px' }}>
            {GREETING.ctaP[lang]}
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
            boxShadow: '0 4px 18px rgba(0,0,0,0.15)',
          }}>
            {t('donate_btn')}
          </Link>
        </div>
      </div>
    </section>
  );
}
