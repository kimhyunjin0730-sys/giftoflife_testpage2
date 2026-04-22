const STATS = [
  { v: '₩18.6', unit: '억', l: '누적 모금액' },
  { v: '130', unit: '만', l: '매년 CHD 출생아' },
  { v: '93', unit: '%', l: '치료 못 받는 비율' },
  { v: '47,599', unit: '', l: '누적 수술 성공' },
];

export function StatsRow() {
  return (
    <section
      style={{
        background: 'var(--paper)',
        padding: '48px 0',
        borderTop: '1px solid rgba(10,20,40,.08)',
        borderBottom: '1px solid rgba(10,20,40,.08)',
      }}
    >
      <div className="ed-wrap">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'clamp(20px, 3vw, 48px)',
          }}
          className="stats-row-grid"
        >
          {STATS.map((s, i) => (
            <div
              key={s.l}
              style={{
                paddingLeft: i > 0 ? 'clamp(16px, 2vw, 32px)' : 0,
                borderLeft: i > 0 ? '1px solid rgba(10,20,40,.08)' : 'none',
              }}
              className="stats-row-cell"
            >
              <span className="ed-num">
                {s.v}
                {s.unit && (
                  <span
                    style={{
                      fontSize: '0.45em',
                      marginLeft: 4,
                      color: 'var(--rose-warm)',
                      verticalAlign: '0.42em',
                      fontWeight: 600,
                    }}
                  >
                    {s.unit}
                  </span>
                )}
              </span>
              <span className="ed-num-label">{s.l}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .stats-row-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px !important;
          }
          .stats-row-cell {
            border-left: none !important;
            padding-left: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
