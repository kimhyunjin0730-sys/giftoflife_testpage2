const TESTIS = [
  {
    txt: '매달 커피 한 잔 값으로 아이의 심장을 고칠 수 있다는 걸 알고 망설임 없이 시작했습니다.',
    ava: '김',
    name: '김서연',
    role: '정기 후원 2년차',
  },
  {
    txt: '수술 후 건강해진 아이의 사진을 받았을 때의 감동은 말로 표현할 수 없었습니다.',
    ava: '박',
    name: '박지훈',
    role: '일시 후원자',
  },
  {
    txt: '회사 동료들과 함께 단체 후원을 시작했는데, 의미 있는 일을 함께 한다는 자부심이 생겼습니다.',
    ava: '이',
    name: '이하은',
    role: '기업 파트너',
  },
];

export function Testimonials() {
  return (
    <div style={{ background: '#fff', padding: '36px 0' }} id="homeTestimonials">
      <div className="wrap">
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h2 style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 26, fontWeight: 700, color: 'var(--navy)' }}>
            후원자 이야기
          </h2>
        </div>
        <div className="testi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {TESTIS.map((t) => (
            <div
              key={t.name}
              style={{
                background: 'var(--bg2)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r2)',
                padding: 22,
              }}
            >
              <div
                style={{
                  fontSize: 28,
                  color: 'var(--blue)',
                  opacity: 0.3,
                  fontFamily: 'Georgia, serif',
                  lineHeight: 1,
                  marginBottom: 10,
                }}
              >
                &ldquo;
              </div>
              <p style={{ fontSize: 13.5, color: 'var(--text)', lineHeight: 1.8, marginBottom: 14 }}>{t.txt}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    background: 'linear-gradient(135deg, #e8728a, #f2a0b0)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  {t.ava}
                </div>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--navy)' }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
