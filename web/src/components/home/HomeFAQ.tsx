const FAQS = [
  {
    q: '후원금은 어떻게 사용되나요?',
    a: '후원금의 95% 이상이 소아 심장 수술비, 항공료, 체류비 등 아동 치료에 직접 사용됩니다. 연간 사용 내역을 투명하게 공개합니다.',
  },
  {
    q: '정기 후원은 언제든 해지할 수 있나요?',
    a: '네, 언제든지 자유롭게 중단하거나 금액을 변경하실 수 있습니다.',
  },
  {
    q: '기부금 영수증이 발급되나요?',
    a: '네, 공익법인으로 연말정산 시 기부금 세액공제를 받으실 수 있습니다.',
  },
  {
    q: '수술 한 건에 비용이 얼마나 드나요?',
    a: '아동 한 명의 심장 수술에 약 $12,000이 필요합니다. 수술비, 항공료, 숙박비, 사후관리가 포함됩니다.',
  },
];

export function HomeFAQ() {
  return (
    <div
      style={{
        background: 'var(--bg2)',
        borderTop: '1px solid var(--border)',
        padding: '36px 0',
      }}
    >
      <div className="wrap">
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h2 style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 26, fontWeight: 700, color: 'var(--navy)' }}>
            자주 묻는 질문
          </h2>
        </div>
        <div
          id="homeFaq"
          style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 10 }}
        >
          {FAQS.map((it) => (
            <details
              key={it.q}
              style={{
                background: '#fff',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r)',
                overflow: 'hidden',
              }}
            >
              <summary
                style={{
                  padding: '14px 20px',
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--navy)',
                  cursor: 'pointer',
                  listStyle: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>{it.q}</span>
                <span style={{ color: 'var(--muted)', fontSize: 16, flexShrink: 0, marginLeft: 12 }}>+</span>
              </summary>
              <div
                style={{ padding: '0 20px 14px', fontSize: 13.5, color: 'var(--text)', lineHeight: 1.8 }}
              >
                {it.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
