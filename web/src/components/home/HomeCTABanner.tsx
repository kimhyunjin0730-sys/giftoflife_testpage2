import Link from 'next/link';

export function HomeCTABanner() {
  return (
    <div style={{ background: '#fff', padding: '32px 0' }}>
      <div className="wrap">
        <div
          style={{
            background: 'linear-gradient(135deg, #f2a0b0, #e8728a)',
            borderRadius: 'var(--r3)',
            padding: '40px 36px',
            textAlign: 'center',
            color: '#fff',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 24px 64px rgba(232,114,138,.15)',
          }}
        >
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2
              style={{
                fontSize: 'clamp(26px, 3.5vw, 42px)',
                fontWeight: 800,
                letterSpacing: '-.02em',
                marginBottom: 16,
                lineHeight: 1.3,
                wordBreak: 'keep-all',
              }}
            >
              여러분의 참여로 누군가의 내일이 시작됩니다
            </h2>
            <p
              style={{
                fontSize: 16,
                color: 'rgba(255,255,255,.85)',
                maxWidth: 560,
                margin: '0 auto 32px',
                lineHeight: 1.8,
                fontWeight: 300,
              }}
            >
              작은 후원이 모여 선천성 심장병 어린이에게 새로운 생명을 선물합니다. 가장 아름다운 선물, &lsquo;생명&rsquo;을 나누어 주세요.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href="/donate"
                style={{
                  padding: '14px 36px',
                  background: '#fff',
                  color: '#d4607a',
                  border: 'none',
                  borderRadius: 9999,
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(0,0,0,.08)',
                  textDecoration: 'none',
                }}
              >
                정기 후원하기
              </Link>
              <Link
                href="/donate"
                style={{
                  padding: '14px 36px',
                  background: 'rgba(255,255,255,.2)',
                  backdropFilter: 'blur(8px)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,.35)',
                  borderRadius: 9999,
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}
              >
                일시 후원하기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
