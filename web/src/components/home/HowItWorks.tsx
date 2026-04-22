'use client';

import { useLang } from '@/i18n/LangProvider';

const STEPS = [
  {
    h: { ko: '후원 신청', en: 'Donate', zh: '捐款申请' },
    p: { ko: '정기 또는 일시 후원을 간편하게 신청합니다', en: 'Easily start a one-time or monthly donation', zh: '轻松开始一次性或每月捐款' },
    icon: '01',
  },
  {
    h: { ko: '아동 선정', en: 'Child Selected', zh: '选定儿童' },
    p: { ko: '수술이 시급한 아이를 의료팀이 선정합니다', en: 'Medical team selects a child in urgent need', zh: '医疗团队选定急需手术的儿童' },
    icon: '02',
  },
  {
    h: { ko: '심장 수술', en: 'Heart Surgery', zh: '心脏手术' },
    p: { ko: '파트너 병원에서 전문의가 수술합니다', en: 'Specialists operate at partner hospitals', zh: '合作医院的专家进行手术' },
    icon: '03',
  },
  {
    h: { ko: '건강한 미래', en: 'Healthy Future', zh: '健康未来' },
    p: { ko: '회복 후 건강한 삶을 되찾습니다', en: 'The child recovers and returns to a healthy life', zh: '孩子康复后重获健康生活' },
    icon: '04',
  },
];

export function HowItWorks() {
  const { lang } = useLang();

  return (
    <section className="section" style={{ background: '#fff' }}>
      <div className="wrap">
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div className="eyebrow">How It Works</div>
          <h2 style={h2}>
            {lang === 'en' ? 'How Your Donation Saves Lives'
              : lang === 'zh' ? '您的捐款如何拯救生命'
              : '후원이 생명이 되기까지'}
          </h2>
          <div style={{ width: 50, height: 3, background: 'var(--blue)', margin: '14px auto 0' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, position: 'relative' }}>
          {STEPS.map((s, i) => (
            <div key={s.icon} style={{ ...stepCard, animationDelay: `${i * 100}ms` }}>
              <div style={iconBadge}>{s.icon}</div>
              <h3 style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 18, fontWeight: 700, color: 'var(--navy)', margin: '14px 0 8px' }}>
                {s.h[lang]}
              </h3>
              <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.75 }}>{s.p[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const h2: React.CSSProperties = {
  fontFamily: "'Libre Bodoni', serif",
  fontSize: 'clamp(24px, 3.2vw, 34px)',
  fontWeight: 700,
  color: 'var(--navy)',
  margin: '10px 0',
};

const stepCard: React.CSSProperties = {
  background: '#fff',
  border: '1px solid var(--border)',
  borderRadius: 'var(--r2)',
  padding: '28px 24px',
  textAlign: 'center',
  position: 'relative',
  boxShadow: 'var(--sh)',
};

const iconBadge: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 56,
  height: 56,
  borderRadius: '50%',
  background: 'linear-gradient(135deg, var(--blue), var(--blue2))',
  color: '#fff',
  fontFamily: "'Libre Bodoni', serif",
  fontSize: 20,
  fontWeight: 700,
  letterSpacing: -0.5,
};
