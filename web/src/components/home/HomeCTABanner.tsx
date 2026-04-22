import Link from 'next/link';

export function HomeCTABanner() {
  return (
    <section
      className="section"
      style={{
        background: 'linear-gradient(135deg, #f2a0b0 0%, #e8728a 60%, #d4607a 100%)',
        color: '#fff',
      }}
    >
      <div className="wrap" style={{ textAlign: 'center', padding: '64px 24px' }}>
        <h2
          className="sec-ttl"
          style={{
            color: '#fff',
            fontFamily: "'Libre Bodoni', serif",
            fontSize: 'clamp(28px, 4vw, 44px)',
          }}
        >
          당신의 후원이 한 아이의 심장을 구합니다
        </h2>
        <p style={{ marginTop: 16, fontSize: 16, color: 'rgba(255,255,255,.92)', lineHeight: 1.8 }}>
          매월 정기 후원 또는 일시 후원으로 함께해 주세요.
        </p>
        <div
          style={{
            marginTop: 28,
            display: 'flex',
            gap: 12,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Link
            href="/donate?type=monthly"
            className="uni-btn-primary"
            style={{ background: '#fff', color: '#d4607a' }}
          >
            정기 후원
          </Link>
          <Link href="/donate" className="uni-btn-ghost">
            일시 후원 →
          </Link>
        </div>
      </div>
    </section>
  );
}
