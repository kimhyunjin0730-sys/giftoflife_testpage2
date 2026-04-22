'use client';

import Link from 'next/link';
import { useLang } from '@/i18n/LangProvider';
import { KIDS } from '@/data/kids';

const HEADINGS = {
  heart: { ko: '작은 심장들의 이야기', en: 'Stories of Little Hearts', zh: '小小心脏的故事' },
  earth: { ko: '지구 살리기', en: 'Save the Earth', zh: '拯救地球' },
  cases: { ko: '수술 성공 사례', en: 'Surgery Success Stories', zh: '手术成功案例' },
  eyebrow: { ko: '우리의 활동', en: 'Our Work', zh: '我们的活动' },
  heartSub: {
    ko: '수술실에서, 병원 복도에서, 먼 대륙을 건너온 비행기 안에서 — 여러분이 나눠 준 사랑은 아이들의 삶이 되어 지금도 이어지고 있습니다.',
    en: 'In operating rooms, hospital hallways, and on flights across continents — the love you share lives on in the lives of these children.',
    zh: '在手术室里，在医院走廊里，在跨越大陆的飞机上——您分享的爱，正延续在这些孩子的人生里。',
  },
  earthDesc: {
    ko: '전 지구적 환경 보호 캠페인 플랫폼 — 준비 중입니다.',
    en: 'Global environmental protection campaign platform — coming soon.',
    zh: '全球环境保护运动平台——敬请期待。',
  },
  casesDesc: {
    ko: '성공적인 심장 수술을 받아 건강한 삶을 되찾은 아이들의 이야기.',
    en: 'Stories of children who regained a healthy life through successful heart surgery.',
    zh: '通过成功的心脏手术重获健康生活的孩子们的故事。',
  },
};

export function ActivitiesPage() {
  const { lang } = useLang();

  const treatedKids = KIDS.filter((k) => k.status === 'recovered').slice(0, 3);
  const nameOf = (k: (typeof KIDS)[number]) =>
    typeof k.name === 'string' ? k.name : (k.name[lang] ?? k.name.ko);

  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 1080 }}>
        <header style={{ textAlign: 'center', marginBottom: 40 }}>
          <div className="eyebrow">{HEADINGS.eyebrow[lang]}</div>
          <h1 style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 36, fontWeight: 700, color: 'var(--navy)', margin: '12px 0' }}>
            {lang === 'en' ? 'Our Work' : lang === 'zh' ? '我们的活动' : '우리의 활동'}
          </h1>
          <div style={{ width: 50, height: 3, background: 'var(--blue)', margin: '16px auto 0' }} />
        </header>

        {/* ① 심장병 어린이 구호 */}
        <Section
          id="heart"
          title={HEADINGS.heart[lang]}
          desc={HEADINGS.heartSub[lang]}
          accent="var(--blue)"
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {KIDS.slice(0, 4).map((k) => (
              <article key={k.id} style={miniCard}>
                <img src={k.img} alt={nameOf(k)} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} loading="lazy" />
                <div style={{ padding: 16 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)' }}>{k.flag} {nameOf(k)}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                    {k.country[lang] ?? k.country.ko}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div style={{ marginTop: 20, textAlign: 'center' }}>
            <Link href="/children" className="btn-ghost" style={{ fontSize: 14 }}>
              {lang === 'en' ? 'See all stories' : lang === 'zh' ? '查看全部故事' : '전체 이야기 보기'} →
            </Link>
          </div>
        </Section>

        {/* ② 지구 살리기 */}
        <Section
          id="earth"
          title={HEADINGS.earth[lang]}
          desc={HEADINGS.earthDesc[lang]}
          accent="var(--green)"
        >
          <div style={{
            background: '#f0fdf4',
            border: '1px dashed #a7f3d0',
            borderRadius: 'var(--r2)',
            padding: '60px 32px',
            textAlign: 'center',
            color: '#065f46',
          }}>
            🌱 {lang === 'en' ? 'Coming soon' : lang === 'zh' ? '敬请期待' : '준비 중입니다'}
          </div>
        </Section>

        {/* ③ 수술 성공 사례 */}
        <Section
          id="cases"
          title={HEADINGS.cases[lang]}
          desc={HEADINGS.casesDesc[lang]}
          accent="var(--gold)"
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 22 }}>
            {treatedKids.map((k) => (
              <article key={k.id} style={caseCard}>
                <img
                  src={k.img}
                  alt={nameOf(k)}
                  style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover' }}
                  loading="lazy"
                />
                <div style={{ padding: 22 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 22 }}>{k.flag}</span>
                    <strong style={{ fontSize: 15, color: 'var(--navy)' }}>{nameOf(k)}</strong>
                  </div>
                  {k.hospital && (
                    <div style={{ fontSize: 12.5, color: 'var(--muted)', marginBottom: 8 }}>
                      🏥 {k.hospital[lang] ?? k.hospital.ko}
                    </div>
                  )}
                  <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>
                    {(k.story[lang] ?? k.story.ko).slice(0, 140)}…
                  </p>
                  <div style={{
                    marginTop: 12,
                    fontSize: 12,
                    fontWeight: 700,
                    color: 'var(--green)',
                  }}>
                    ✔ {lang === 'en' ? 'Surgery Success' : lang === 'zh' ? '手术成功' : '수술 성공'}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>
      </div>
    </section>
  );
}

function Section({ id, title, desc, accent, children }: {
  id: string;
  title: string;
  desc: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div id={id} style={{ marginBottom: 64 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
        <div style={{ width: 4, height: 32, background: accent, borderRadius: 2 }} />
        <h2 style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 26, fontWeight: 700, color: 'var(--navy)' }}>
          {title}
        </h2>
      </div>
      <p style={{ fontSize: 14.5, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 22 }}>{desc}</p>
      {children}
    </div>
  );
}

const miniCard: React.CSSProperties = {
  background: '#fff',
  border: '1px solid var(--border)',
  borderRadius: 'var(--r2)',
  overflow: 'hidden',
  boxShadow: 'var(--sh)',
};

const caseCard: React.CSSProperties = {
  background: '#fff',
  border: '1px solid var(--border)',
  borderRadius: 'var(--r2)',
  overflow: 'hidden',
  boxShadow: 'var(--sh)',
};
