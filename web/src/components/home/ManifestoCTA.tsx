import Link from 'next/link';

export function ManifestoCTA() {
  return (
    <section
      style={{
        background: 'var(--ink)',
        color: 'var(--paper)',
        padding: 'clamp(72px, 9vw, 128px) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 배경 - 미세한 로즈 글로우 */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(1100px 500px at 80% 20%, rgba(232,114,138,.16), transparent 60%), radial-gradient(900px 400px at 10% 80%, rgba(212,165,116,.10), transparent 65%)',
          pointerEvents: 'none',
        }}
      />
      <div className="ed-wrap" style={{ position: 'relative' }}>
        <div style={{ maxWidth: 760 }}>
          <span
            className="ed-eyebrow"
            style={{ color: 'rgba(255,255,255,.55)' }}
          >
            Take Action
          </span>
          <h2
            className="ed-display"
            style={{
              fontSize: 'clamp(34px, 4.6vw, 60px)',
              color: 'var(--paper)',
              marginTop: 22,
              marginBottom: 24,
              wordBreak: 'keep-all',
            }}
          >
            여러분의 참여로<br />
            <em style={{ color: '#f5b1be' }}>누군가의 내일</em>이 시작됩니다
          </h2>
          <p
            className="ed-lede"
            style={{
              color: 'rgba(255,255,255,.72)',
              marginBottom: 40,
              maxWidth: '52ch',
            }}
          >
            작은 후원이 모여 선천성 심장병 어린이에게 새로운 생명을 선물합니다.
            가장 아름다운 선물, 생명을 함께 나누어 주세요.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link
              href="/donate?type=monthly"
              className="ed-btn"
              style={{
                background: 'var(--paper)',
                color: 'var(--ink)',
                borderColor: 'var(--paper)',
              }}
            >
              정기 후원하기 <span className="arrow">→</span>
            </Link>
            <Link
              href="/donate"
              className="ed-btn ed-btn-ghost"
              style={{
                color: 'var(--paper)',
                borderColor: 'rgba(255,255,255,.32)',
              }}
            >
              일시 후원하기 <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
