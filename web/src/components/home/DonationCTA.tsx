import Link from 'next/link';

export function DonationCTA() {
  return (
    <div className="dw-wrap">
      <div className="dw-in">
        <div className="dw-copy">
          <h3>
            <span /> <span>후원하기</span>
          </h3>
          <p>당신의 관심이 선천성 심장병 어린이에게 새 생명을 선물합니다.</p>
        </div>
        <div className="dw-form" style={{ justifyContent: 'flex-end' }}>
          <a
            href="https://online.mrm.or.kr/oytvcb5"
            target="_blank"
            rel="noopener noreferrer"
            className="dw-go"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}
          >
            <span>일반 후원</span>
            <span style={{ fontSize: 16, lineHeight: 1 }}>↗</span>
          </a>
          <Link
            href="/donate"
            className="dw-go"
            style={{
              background: 'var(--navy)',
              color: '#fff',
              border: 0,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              textDecoration: 'none',
            }}
          >
            <span>로타리 회원 후원</span>
            <span style={{ fontSize: 16, lineHeight: 1 }}>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
