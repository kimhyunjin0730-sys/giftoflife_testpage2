import Link from 'next/link';

const LINKS = [
  { href: '/about', label: '소개' },
  { href: '/children', label: '우리 아이들' },
  { href: '/news', label: '뉴스 & 소식' },
  { href: '/donate', label: '후원하기' },
  { href: '/contact', label: '문의하기' },
  { href: '/notices', label: '공지사항' },
];

export function Footer() {
  return (
    <footer
      className="ft"
      style={{
        background: '#0f172a',
        color: 'rgba(255,255,255,.78)',
        marginTop: 80,
      }}
    >
      <div
        className="ft-top"
        style={{
          maxWidth: 'var(--max)',
          margin: '0 auto',
          padding: '56px 24px 32px',
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr 1fr',
          gap: 48,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <strong
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: '#fff',
                fontFamily: "'Libre Bodoni', serif",
                letterSpacing: '-.02em',
              }}
            >
              gift of life
            </strong>
            <span style={{ fontSize: 11, letterSpacing: 1, color: '#94a3b8' }}>KOREA</span>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.8, color: 'rgba(255,255,255,.6)' }}>
            사단법인 생명의 선물 코리아<br />
            Gift of Life International Korea
          </p>
          <p style={{ fontSize: 12, lineHeight: 1.8, color: 'rgba(255,255,255,.5)', marginTop: 10 }}>
            서울특별시 (주소 등록 필요)<br />
            대표 전화: 02-0000-0000<br />
            이메일: contact@goli.kr
          </p>
        </div>

        <div className="ft-links">
          <h4
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: '#fff',
              letterSpacing: 1,
              textTransform: 'uppercase',
              marginBottom: 14,
            }}
          >
            바로가기
          </h4>
          <ul style={{ listStyle: 'none', display: 'grid', gap: 8 }}>
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  style={{ fontSize: 13, color: 'rgba(255,255,255,.7)' }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="ft-social">
          <h4
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: '#fff',
              letterSpacing: 1,
              textTransform: 'uppercase',
              marginBottom: 14,
            }}
          >
            소셜
          </h4>
          <ul style={{ listStyle: 'none', display: 'grid', gap: 8, fontSize: 13 }}>
            <li><a href="#" style={{ color: 'rgba(255,255,255,.7)' }}>Facebook</a></li>
            <li><a href="#" style={{ color: 'rgba(255,255,255,.7)' }}>Instagram</a></li>
            <li><a href="#" style={{ color: 'rgba(255,255,255,.7)' }}>YouTube</a></li>
          </ul>
        </div>
      </div>

      <div
        className="ft-bot"
        style={{
          borderTop: '1px solid rgba(255,255,255,.08)',
          padding: '20px 24px',
          textAlign: 'center',
          fontSize: 12,
          color: 'rgba(255,255,255,.4)',
        }}
      >
        © 2026 Gift of Life International Korea. All rights reserved.
      </div>
    </footer>
  );
}
