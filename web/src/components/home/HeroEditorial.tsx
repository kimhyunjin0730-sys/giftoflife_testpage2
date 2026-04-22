'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { KIDS } from '@/data/kids';

const SLIDE_MS = 6500;

export function HeroEditorial() {
  const [idx, setIdx] = useState(0);
  const tref = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = KIDS.length;

  useEffect(() => {
    if (tref.current) clearTimeout(tref.current);
    tref.current = setTimeout(() => setIdx((i) => (i + 1) % total), SLIDE_MS);
    return () => {
      if (tref.current) clearTimeout(tref.current);
    };
  }, [idx, total]);

  const kid = KIDS[idx];
  const name = typeof kid.name === 'string' ? kid.name : kid.name.ko;

  return (
    <section
      style={{
        background: 'var(--paper)',
        paddingTop: 56,
        paddingBottom: 72,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="ed-wrap">
        {/* 챕터 마크 */}
        <div className="ed-chapter ed-rise">
          <span>Vol. 01 — Spring 2026</span>
          <strong>Manifesto</strong>
        </div>

        {/* 본 헤로 그리드 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)',
            gap: 'clamp(28px, 4vw, 64px)',
            alignItems: 'center',
          }}
          className="hero-ed-grid"
        >
          {/* 좌측 — 텍스트 */}
          <div>
            <span className="ed-eyebrow ed-rise" data-d="1">
              해외 파트너 사례 · 뉴스 보도
            </span>

            <h1
              className="ed-display ed-rise"
              data-d="2"
              style={{
                fontSize: 'clamp(38px, 5.4vw, 72px)',
                marginTop: 22,
                marginBottom: 28,
                wordBreak: 'keep-all',
              }}
            >
              모든 아이는<br />
              <em>심장을 고칠</em><br />
              권리가 있습니다
            </h1>

            <p className="ed-lede ed-rise" data-d="3" style={{ marginBottom: 36 }}>
              매년 135만 명의 아이들이 선천성 심장병을 안고 태어납니다.
              그중 93%는 평생 수술을 받지 못합니다. 당신의 후원이
              한 아이의 숨결을 바꿉니다.
            </p>

            <div
              className="ed-rise"
              data-d="4"
              style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
            >
              <Link href="/donate" className="ed-btn">
                지금 후원하기 <span className="arrow">→</span>
              </Link>
              <Link href="/children" className="ed-btn ed-btn-ghost">
                어린이 이야기 <span className="arrow">→</span>
              </Link>
            </div>

            {/* 미니 메타 */}
            <div
              className="ed-rise"
              data-d="5"
              style={{
                marginTop: 48,
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                fontFamily: 'var(--font-mono-stack)',
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--ink-mute)',
              }}
            >
              <span style={{ width: 28, height: 1, background: 'rgba(10,20,40,.2)' }} />
              <span>Featured · {name} · {kid.country.ko}</span>
            </div>
          </div>

          {/* 우측 — 이미지 (잘림 없이 적정 크기) */}
          <div className="ed-rise" data-d="3" style={{ position: 'relative' }}>
            <div className="img-frame aspect-hero">
              <img
                src={kid.img}
                alt={`${name} — ${kid.country.ko}`}
                loading="eager"
              />
            </div>

            {/* 슬라이드 인디케이터 */}
            <div
              style={{
                marginTop: 16,
                display: 'flex',
                gap: 6,
                alignItems: 'center',
              }}
            >
              {KIDS.map((k, i) => (
                <button
                  key={k.id}
                  type="button"
                  aria-label={`슬라이드 ${i + 1}`}
                  onClick={() => setIdx(i)}
                  style={{
                    width: i === idx ? 32 : 12,
                    height: 3,
                    border: 'none',
                    background: i === idx ? 'var(--ink)' : 'rgba(10,20,40,.18)',
                    borderRadius: 999,
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'all .4s var(--ease-quart)',
                  }}
                />
              ))}
              <span
                style={{
                  marginLeft: 'auto',
                  fontFamily: 'var(--font-mono-stack)',
                  fontSize: 11,
                  letterSpacing: '0.14em',
                  color: 'var(--ink-mute)',
                }}
              >
                {String(idx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .hero-ed-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
