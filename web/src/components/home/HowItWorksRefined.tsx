const STEPS = [
  { n: '01', h: '후원 신청', p: '정기 또는 일시 후원을 간편하게 신청합니다' },
  { n: '02', h: '아동 선정', p: '수술이 시급한 아이를 의료팀이 선정합니다' },
  { n: '03', h: '심장 수술', p: '파트너 병원에서 전문의가 수술합니다' },
  { n: '04', h: '건강한 미래', p: '회복 후 건강한 삶을 되찾습니다' },
];

export function HowItWorksRefined() {
  return (
    <section style={{ background: 'var(--paper)', padding: '88px 0' }}>
      <div className="ed-wrap">
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 56px' }}>
          <span className="ed-eyebrow" style={{ justifyContent: 'center' }}>
            How it works
          </span>
          <h2
            className="ed-display"
            style={{ fontSize: 'clamp(28px, 3.4vw, 40px)', marginTop: 16 }}
          >
            후원이 <em>생명</em>이 되기까지
          </h2>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'clamp(20px, 2.4vw, 36px)',
          }}
          className="hiw-ed-grid"
        >
          {STEPS.map((s, i) => (
            <div key={s.n} style={{ position: 'relative' }}>
              {/* 연결선 */}
              {i < STEPS.length - 1 && (
                <div
                  aria-hidden
                  className="hiw-line"
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: -18,
                    width: 36,
                    height: 1,
                    background: 'rgba(10,20,40,.15)',
                  }}
                />
              )}
              <div
                style={{
                  fontFamily: 'var(--font-mono-stack)',
                  fontSize: 11,
                  letterSpacing: '0.2em',
                  color: 'var(--rose-warm)',
                  marginBottom: 18,
                }}
              >
                {s.n}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display-stack)',
                  fontSize: 22,
                  fontWeight: 600,
                  color: 'var(--ink)',
                  marginBottom: 10,
                  letterSpacing: '-0.01em',
                }}
              >
                {s.h}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: 'var(--ink-mute)',
                  lineHeight: 1.7,
                  fontFamily: 'var(--font-body-stack)',
                }}
              >
                {s.p}
              </p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .hiw-ed-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .hiw-line { display: none !important; }
        }
      `}</style>
    </section>
  );
}
