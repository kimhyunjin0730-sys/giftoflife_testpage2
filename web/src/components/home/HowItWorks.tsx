const STEPS = [
  { n: 1, h: '후원 신청', p: '정기 또는 일시 후원을 간편하게 신청합니다' },
  { n: 2, h: '아동 선정', p: '수술이 시급한 아이를 의료팀이 선정합니다' },
  { n: 3, h: '심장 수술', p: '파트너 병원에서 전문의가 수술합니다' },
  { n: 4, h: '건강한 미래', p: '회복 후 건강한 삶을 되찾습니다' },
];

export function HowItWorks() {
  return (
    <div style={{ background: '#fff', padding: '36px 0' }} id="homeHowItWorks">
      <div className="wrap">
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <h2 style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 26, fontWeight: 700, color: 'var(--navy)' }}>
            후원이 생명이 되기까지
          </h2>
        </div>
        <div className="hiw-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {STEPS.map((s) => (
            <div
              key={s.n}
              style={{
                textAlign: 'center',
                padding: '22px 16px',
                background: 'var(--bg2)',
                borderRadius: 'var(--r2)',
                border: '1px solid var(--border)',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  background: 'linear-gradient(135deg, #fce4ec, #f8bbd0)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 17,
                  margin: '0 auto 12px',
                  fontWeight: 700,
                  color: '#d4607a',
                }}
              >
                {s.n}
              </div>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)', marginBottom: 6 }}>{s.h}</h4>
              <p style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.6 }}>{s.p}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
