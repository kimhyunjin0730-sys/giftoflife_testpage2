'use client';

import { useLang } from '@/i18n/LangProvider';

const STATS = [
  { v: '₩18.6억', label: { ko: '누적 모금액', en: 'Total Raised', zh: '累计募款' } },
  { v: '130만', label: { ko: '매년 CHD 출생아', en: 'CHD Births / Year', zh: '每年新生 CHD 患儿' } },
  { v: '93%', label: { ko: '치료 못 받는 비율', en: 'Without Treatment', zh: '未接受治疗比率' } },
  { v: '47,599', label: { ko: '목표 회원 수', en: 'Membership Goal', zh: '会员目标' } },
];

export function HomeStats() {
  const { lang } = useLang();

  return (
    <section className="section">
      <div className="wrap" style={grid}>
        {STATS.map((s) => (
          <div key={s.v} style={card}>
            <div style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 40, fontWeight: 700, color: 'var(--navy)', marginBottom: 6 }}>
              {s.v}
            </div>
            <div style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 600, letterSpacing: 0.3 }}>
              {s.label[lang] ?? s.label.ko}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const grid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: 18,
};

const card: React.CSSProperties = {
  background: '#fff',
  border: '1px solid var(--border)',
  borderRadius: 'var(--r2)',
  padding: '32px 24px',
  textAlign: 'center',
  boxShadow: 'var(--sh)',
};
