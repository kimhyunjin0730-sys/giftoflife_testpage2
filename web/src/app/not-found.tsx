import Link from 'next/link';

export const metadata = {
  title: '페이지를 찾을 수 없음 — Gift of Life Korea',
  description: '요청하신 페이지가 존재하지 않습니다.',
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        background: '#faf7f0',
        fontFamily: "'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 440,
          width: '100%',
          textAlign: 'center',
          background: '#fff',
          borderRadius: 14,
          padding: '48px 32px',
          border: '1px solid #e5e2da',
          boxShadow: '0 6px 20px rgba(15,23,42,.06)',
        }}
      >
        <div
          style={{
            fontFamily: 'Times New Roman, Georgia, serif',
            fontSize: 72,
            fontWeight: 600,
            color: '#e8728a',
            lineHeight: 1,
            marginBottom: 12,
            letterSpacing: '-0.02em',
          }}
        >
          404
        </div>
        <h1
          style={{
            fontSize: 22,
            color: '#0a1428',
            margin: '0 0 12px',
            fontWeight: 600,
          }}
        >
          페이지를 찾을 수 없습니다
        </h1>
        <p
          style={{
            fontSize: 14,
            color: '#5b6478',
            lineHeight: 1.7,
            margin: '0 0 24px',
          }}
        >
          요청하신 페이지가 이동되었거나 존재하지 않습니다.<br />
          홈으로 돌아가서 다시 시도해 주세요.
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            padding: '12px 32px',
            background: '#e8728a',
            color: '#fff',
            borderRadius: 9999,
            textDecoration: 'none',
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          홈으로 돌아가기
        </Link>
        <div style={{ marginTop: 32, fontSize: 12, color: '#94a3b8' }}>
          문의: <a href="mailto:golikorea@naver.com" style={{ color: '#e8728a' }}>golikorea@naver.com</a>
        </div>
      </div>
    </main>
  );
}
