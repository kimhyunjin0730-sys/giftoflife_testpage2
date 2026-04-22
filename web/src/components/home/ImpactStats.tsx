const ITEMS = [
  { v: '50', l: '년의 역사' },
  { v: '33,000+', l: '치료받은 아이들' },
  { v: '81', l: '개국 활동' },
  { v: '97%', l: '수술 성공률' },
];

export function ImpactStats() {
  return (
    <div
      style={{
        background: 'var(--bg2)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '32px 0',
      }}
    >
      <div className="wrap">
        <div
          className="impact-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, textAlign: 'center' }}
        >
          {ITEMS.map((it, i) => (
            <div
              key={it.l}
              style={{
                padding: '16px 8px',
                borderRight: i < ITEMS.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              <div
                style={{
                  fontFamily: "'Libre Bodoni', serif",
                  fontSize: 30,
                  fontWeight: 700,
                  color: 'var(--blue)',
                  marginBottom: 4,
                }}
              >
                {it.v}
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500 }}>{it.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
