'use client';

import { useState } from 'react';

const FAQS = [
  {
    q: '후원금은 어떻게 사용되나요?',
    a: '후원금의 95% 이상이 소아 심장 수술비, 항공료, 체류비 등 아동 치료에 직접 사용됩니다. 연간 사용 내역을 투명하게 공개합니다.',
  },
  {
    q: '정기 후원은 언제든 해지할 수 있나요?',
    a: '네, 언제든지 자유롭게 중단하거나 금액을 변경하실 수 있습니다.',
  },
  {
    q: '기부금 영수증이 발급되나요?',
    a: '네, 공익법인으로 연말정산 시 기부금 세액공제를 받으실 수 있습니다.',
  },
  {
    q: '수술 한 건에 비용이 얼마나 드나요?',
    a: '아동 한 명의 심장 수술에 약 $12,000이 필요합니다. 수술비, 항공료, 숙박비, 사후관리가 포함됩니다.',
  },
];

export function FAQEditorial() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section
      style={{
        background: 'var(--paper-2)',
        padding: '88px 0',
        borderTop: '1px solid rgba(10,20,40,.06)',
      }}
    >
      <div className="ed-wrap" style={{ maxWidth: 880 }}>
        <div style={{ marginBottom: 48 }}>
          <span className="ed-eyebrow">FAQ</span>
          <h2
            className="ed-display"
            style={{ fontSize: 'clamp(28px, 3.4vw, 40px)', marginTop: 16 }}
          >
            자주 묻는 <em>질문</em>
          </h2>
        </div>
        <div>
          {FAQS.map((it, i) => {
            const isOpen = open === i;
            return (
              <div
                key={it.q}
                style={{
                  borderTop: '1px solid rgba(10,20,40,.12)',
                  borderBottom: i === FAQS.length - 1 ? '1px solid rgba(10,20,40,.12)' : 'none',
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    padding: '24px 0',
                    display: 'grid',
                    gridTemplateColumns: '40px 1fr 24px',
                    gap: 16,
                    alignItems: 'baseline',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body-stack)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono-stack)',
                      fontSize: 11,
                      letterSpacing: '0.16em',
                      color: 'var(--ink-mute)',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-display-stack)',
                      fontSize: 'clamp(17px, 1.6vw, 21px)',
                      fontWeight: 500,
                      color: 'var(--ink)',
                      letterSpacing: '-0.005em',
                    }}
                  >
                    {it.q}
                  </span>
                  <span
                    aria-hidden
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      border: '1px solid var(--ink)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 14,
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                      transition: 'transform .4s var(--ease-quart)',
                      color: 'var(--ink)',
                      lineHeight: 1,
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  style={{
                    overflow: 'hidden',
                    maxHeight: isOpen ? 200 : 0,
                    transition: 'max-height .5s var(--ease-quart), padding .5s var(--ease-quart)',
                    paddingBottom: isOpen ? 24 : 0,
                    paddingLeft: 56,
                    paddingRight: 40,
                  }}
                >
                  <p
                    style={{
                      fontSize: 14.5,
                      lineHeight: 1.8,
                      color: 'var(--ink-mute)',
                      maxWidth: 64 + 'ch',
                    }}
                  >
                    {it.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
