import Link from 'next/link';

/**
 * 마이그레이션 과도기 스텁 페이지.
 * 최종 이관 전까지 레거시 index.html 의 해당 섹션을 iframe 으로 보여주거나
 * 이 스텁으로 "준비 중" 을 노출해 둘 수 있음.
 */
export function PageStub({
  title,
  subtitle,
  legacyPath,
}: {
  title: string;
  subtitle?: string;
  legacyPath?: string;
}) {
  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 720, textAlign: 'center', padding: '40px 24px' }}>
        <div className="eyebrow">Migration in progress</div>
        <h1 style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 36, fontWeight: 700, color: 'var(--navy)', margin: '12px 0' }}>
          {title}
        </h1>
        {subtitle && <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>{subtitle}</p>}
        <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
          이 페이지는 Next.js 로 이관 중입니다. 당분간 레거시 사이트를 이용해 주세요.
        </p>
        {legacyPath && (
          <a
            href={legacyPath}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 22px',
              borderRadius: 999,
              background: 'var(--navy)',
              color: '#fff',
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            레거시 페이지 열기 →
          </a>
        )}
        <div style={{ marginTop: 28 }}>
          <Link href="/" style={{ color: 'var(--blue)', fontSize: 13, fontWeight: 600 }}>← 홈으로</Link>
        </div>
      </div>
    </section>
  );
}
