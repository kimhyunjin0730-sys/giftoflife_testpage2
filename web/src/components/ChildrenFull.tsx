'use client';

import { useLang } from '@/i18n/LangProvider';
import { KIDS } from '@/data/kids';
import type { Kid } from '@/data/kids';
import Link from 'next/link';

export function ChildrenFull() {
  const { lang, t } = useLang();

  const nameOf = (k: Kid) =>
    typeof k.name === 'string' ? k.name : (k.name[lang] ?? k.name.ko);

  const treatedLabel = lang === 'en' ? 'Treated' : lang === 'zh' ? '已治疗' : '치료 완료';
  const progressLabel = lang === 'en' ? 'In Progress' : lang === 'zh' ? '进行中' : '진행 중';

  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 1080 }}>
        {/* 페이지 헤더 */}
        <header style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="eyebrow">Our Children</div>
          <h1 style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 36, fontWeight: 700, color: 'var(--navy)', margin: '12px 0' }}>
            {lang === 'en'
              ? 'Stories of Little Hearts'
              : lang === 'zh'
                ? '小小心脏的故事'
                : '작은 심장들의 이야기'}
          </h1>
          <div style={{ width: 50, height: 3, background: 'var(--blue)', margin: '16px auto' }} />
          <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8, maxWidth: 640, margin: '0 auto' }}>
            {lang === 'en'
              ? 'In operating rooms, hospital hallways, and on flights across continents — the love you share lives on in the lives of these children.'
              : lang === 'zh'
                ? '在手术室里，在医院走廊里，在跨越大陆的飞机上——您分享的爱，正延续在这些孩子的人生里。'
                : '수술실에서, 병원 복도에서, 먼 대륙을 건너온 비행기 안에서 — 여러분이 나눠 준 사랑은 아이들의 삶이 되어 지금도 이어지고 있습니다.'}
          </p>
        </header>

        {/* 카드 리스트 */}
        <div style={grid}>
          {KIDS.map((k) => (
            <article key={k.id} style={card}>
              <div style={{ position: 'relative', aspectRatio: '4 / 3', overflow: 'hidden', background: '#eef2ff' }}>
                <img
                  src={k.img}
                  alt={nameOf(k)}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span style={{
                  position: 'absolute',
                  top: 14,
                  left: 14,
                  padding: '5px 12px',
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#fff',
                  background: k.status === 'recovered' ? 'var(--green)' : 'var(--blue)',
                  letterSpacing: 0.4,
                }}>
                  {k.status === 'recovered' ? treatedLabel : progressLabel}
                </span>
              </div>

              <div style={{ padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 28 }}>{k.flag}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 16 }}>{nameOf(k)}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--muted)' }}>
                      {k.country[lang] ?? k.country.ko} · {k.age[lang] ?? k.age.ko}
                    </div>
                    {k.hospital && (
                      <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                        🏥 {k.hospital[lang] ?? k.hospital.ko}
                      </div>
                    )}
                  </div>
                </div>

                <p style={{ fontSize: 13.5, color: 'var(--text)', lineHeight: 1.8, marginBottom: 14 }}>
                  {k.story[lang] ?? k.story.ko}
                </p>

                {/* 영상 embed (있는 경우) */}
                {k.video && (
                  <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: 8, overflow: 'hidden', marginBottom: 16 }}>
                    <iframe
                      src={k.video}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      title={nameOf(k)}
                    />
                  </div>
                )}

                {/* Progress bar for waiting kids */}
                {k.status === 'waiting' ? (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>
                      <span>
                        {lang === 'en' ? 'Funding Progress' : lang === 'zh' ? '筹款进度' : '모금 현황'}
                      </span>
                      <span>${k.raised.toLocaleString()} / ${k.goal.toLocaleString()}</span>
                    </div>
                    <div style={{ background: '#e2e8f0', height: 8, borderRadius: 4, overflow: 'hidden', marginBottom: 12 }}>
                      <div style={{
                        width: `${Math.min((k.raised / k.goal) * 100, 100)}%`,
                        height: '100%',
                        background: 'var(--blue)',
                      }} />
                    </div>
                    <Link href="/donate" className="btn-primary" style={{ width: '100%' }}>
                      {t('donate_btn')}
                    </Link>
                  </>
                ) : (
                  <div style={{
                    textAlign: 'center',
                    padding: '10px 14px',
                    background: '#ecfdf5',
                    color: '#065f46',
                    borderRadius: 'var(--r)',
                    fontSize: 13,
                    fontWeight: 600,
                  }}>
                    ✔ {treatedLabel}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const grid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
  gap: 26,
};

const card: React.CSSProperties = {
  background: '#fff',
  border: '1px solid var(--border)',
  borderRadius: 'var(--r2)',
  overflow: 'hidden',
  boxShadow: 'var(--sh)',
};
