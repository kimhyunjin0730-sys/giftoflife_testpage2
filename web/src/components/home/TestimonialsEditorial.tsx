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

export function TestimonialsEditorial() {
  return (
    <section style={{ background: 'var(--paper)', padding: '88px 0' }}>
      <div className="ed-wrap">
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 56px' }}>
          <span className="ed-eyebrow" style={{ justifyContent: 'center' }}>
            Stories
          </span>
          <h2
            className="ed-display"
            style={{ fontSize: 'clamp(28px, 3.4vw, 40px)', marginTop: 16 }}
          >
            <em>후원자</em>의 이야기
          </h2>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(20px, 2.5vw, 32px)',
          }}
          className="testi-ed-grid"
        >
          {TESTIS.map((t) => (
            <figure
              key={t.name}
              style={{
                background: '#fff',
                border: '1px solid rgba(10,20,40,.07)',
                borderRadius: 8,
                padding: 'clamp(28px, 3vw, 40px)',
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <blockquote className="ed-quote" style={{ margin: 0, marginBottom: 28, flex: 1 }}>
                {t.txt}
              </blockquote>
              <figcaption style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background:
                      'linear-gradient(135deg, var(--rose-warm), var(--gold))',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-display-stack)',
                    fontWeight: 600,
                    fontSize: 16,
                    flexShrink: 0,
                  }}
                >
                  {t.ava}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: 'var(--ink)',
                      letterSpacing: '-0.005em',
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono-stack)',
                      fontSize: 10.5,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--ink-mute)',
                      marginTop: 3,
                    }}
                  >
                    {t.role}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 880px) {
          .testi-ed-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
