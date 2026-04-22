const ITEMS = [
  { v: '50', unit: '+', l: '년의 역사' },
  { v: '33,000', unit: '+', l: '치료받은 아이들' },
  { v: '81', unit: '', l: '개국 활동' },
  { v: '97', unit: '%', l: '수술 성공률' },
];

export function ImpactStatsRefined() {
  return (
    <section
      style={{
        background: 'var(--paper-2)',
        padding: '64px 0',
        borderTop: '1px solid rgba(10,20,40,.06)',
        borderBottom: '1px solid rgba(10,20,40,.06)',
      }}
    >
      <div className="ed-wrap">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'clamp(20px, 3vw, 56px)',
            textAlign: 'left',
          }}
          className="impact-ed-grid"
        >
          {ITEMS.map((it, i) => (
            <div
              key={it.l}
              style={{
                paddingLeft: i > 0 ? 'clamp(16px, 2vw, 32px)' : 0,
                borderLeft: i > 0 ? '1px solid rgba(10,20,40,.1)' : 'none',
              }}
              className="impact-ed-cell"
            >
              <span className="ed-num" style={{ color: 'var(--rose-warm)' }}>
                {it.v}
                {it.unit && (
                  <span
                    style={{
                      fontSize: '0.55em',
                      verticalAlign: '0.45em',
                      marginLeft: 2,
                      color: 'var(--ink-mute)',
                      fontWeight: 500,
                    }}
                  >
                    {it.unit}
                  </span>
                )}
              </span>
              <span className="ed-num-label">{it.l}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .impact-ed-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px !important;
          }
          .impact-ed-cell {
            border-left: none !important;
            padding-left: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
