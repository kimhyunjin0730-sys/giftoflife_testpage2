import Link from 'next/link';

export function DonationCTA() {
  return (
    <section className="dw-wrap" aria-label="후원하기">
      <div className="dw-in">
        <div className="dw-copy">
          <h3>
            <span aria-hidden>♥</span> 후원하기
          </h3>
          <p>당신의 관심이 선천성 심장병 어린이에게 새 생명을 선물합니다.</p>
        </div>
        <div className="dw-form">
          <Link href="/donate" className="uni-btn-primary">
            일반 후원 ↗
          </Link>
          <Link href="/donate?type=rotary" className="uni-btn-ghost" style={{ background: '#0f172a', color: '#fff', border: 'none' }}>
            로타리 회원 후원 →
          </Link>
        </div>
      </div>
    </section>
  );
}
