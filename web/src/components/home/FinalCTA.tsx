'use client';

import Link from 'next/link';
import { useLang } from '@/i18n/LangProvider';

export function FinalCTA() {
  const { lang } = useLang();

  return (
    <section style={{
      padding: '80px 24px',
      background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy2) 50%, var(--blue) 100%)',
      color: '#fff',
    }}>
      <div className="wrap" style={{ maxWidth: 760, textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          padding: '6px 16px',
          borderRadius: 999,
          background: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.25)',
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: 1.5,
          marginBottom: 26,
          textTransform: 'uppercase',
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff' }} />
          Join Us
        </div>

        <h2 style={{
          fontFamily: "'Libre Bodoni', serif",
          fontSize: 'clamp(28px, 4vw, 44px)',
          fontWeight: 700,
          lineHeight: 1.2,
          marginBottom: 20,
        }}>
          {lang === 'en'
            ? 'Your participation starts someone\'s tomorrow'
            : lang === 'zh'
              ? '您的参与开启某个人的明天'
              : '여러분의 참여로 누군가의 내일이 시작됩니다'}
        </h2>
        <p style={{
          fontSize: 16,
          color: 'rgba(255,255,255,0.82)',
          lineHeight: 1.85,
          maxWidth: 580,
          margin: '0 auto 36px',
        }}>
          {lang === 'en'
            ? 'Small donations come together to give children with congenital heart disease a new life. Share the most beautiful gift — the gift of life.'
            : lang === 'zh'
              ? '一份份小小的捐款汇聚在一起，为先天性心脏病儿童带来新生。请分享最美好的礼物——生命的礼物。'
              : '작은 후원이 모여 선천성 심장병 어린이에게 새로운 생명을 선물합니다. 가장 아름다운 선물, \'생명\'을 나누어 주세요.'}
        </p>

        <div style={{ display: 'inline-flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/donate" style={{
            padding: '14px 32px',
            background: '#fff',
            color: 'var(--navy)',
            borderRadius: 999,
            fontSize: 15,
            fontWeight: 700,
            boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
          }}>
            {lang === 'en' ? 'Donate monthly' : lang === 'zh' ? '每月捐款' : '정기 후원하기'}
          </Link>
          <Link href="/donate" style={{
            padding: '14px 32px',
            background: 'transparent',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.35)',
            borderRadius: 999,
            fontSize: 15,
            fontWeight: 700,
          }}>
            {lang === 'en' ? 'Donate once' : lang === 'zh' ? '一次性捐款' : '일시 후원하기'}
          </Link>
        </div>
      </div>
    </section>
  );
}
