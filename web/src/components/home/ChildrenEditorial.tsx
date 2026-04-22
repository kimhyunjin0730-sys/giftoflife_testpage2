import Link from 'next/link';
import { KIDS } from '@/data/kids';

const num = (n: number) => n.toLocaleString('ko-KR');

export function ChildrenEditorial() {
  const list = KIDS.slice(0, 6);
  return (
    <section style={{ background: 'var(--paper)', padding: '88px 0' }}>
      <div className="ed-wrap">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 40,
            gap: 24,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <span className="ed-eyebrow">Our Children</span>
            <h2
              className="ed-display"
              style={{
                fontSize: 'clamp(32px, 4vw, 48px)',
                marginTop: 16,
              }}
            >
              지금 우리의 도움을 <em>기다리는 아이들</em>
            </h2>
          </div>
          <Link
            href="/children"
            style={{
              fontFamily: 'var(--font-mono-stack)',
              fontSize: 11,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--ink)',
              borderBottom: '1px solid var(--ink)',
              paddingBottom: 4,
              textDecoration: 'none',
            }}
          >
            전체 보기 →
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(20px, 2.5vw, 32px)',
          }}
          className="kids-ed-grid"
        >
          {list.map((k) => {
            const name = typeof k.name === 'string' ? k.name : k.name.ko;
            const pct = Math.min(100, Math.round((k.raised / k.goal) * 100));
            return (
              <article key={k.id} className="ed-card">
                <div className="img-frame aspect-portrait">
                  <img src={k.img} alt={name} loading="lazy" />
                </div>
                <div className="ed-card-body">
                  <div className="ed-card-meta">
                    {k.country.ko} · {k.age.ko} · {k.status === 'recovered' ? 'RECOVERED' : 'WAITING'}
                  </div>
                  <h3 className="ed-card-title">{name}</h3>
                  <p className="ed-card-desc" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {k.story.ko}
                  </p>

                  {/* 진행 바 */}
                  <div style={{ marginTop: 'auto', paddingTop: 8 }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontFamily: 'var(--font-mono-stack)',
                        fontSize: 10.5,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'var(--ink-mute)',
                        marginBottom: 6,
                      }}
                    >
                      <span>모금 {pct}%</span>
                      <span>${num(k.raised)} / ${num(k.goal)}</span>
                    </div>
                    <div
                      style={{
                        height: 3,
                        background: 'rgba(10,20,40,.08)',
                        borderRadius: 2,
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${pct}%`,
                          background:
                            k.status === 'recovered'
                              ? 'var(--sage)'
                              : 'var(--rose-warm)',
                          transition: 'width 1.4s var(--ease-quart)',
                        }}
                      />
                    </div>

                    {k.status === 'waiting' ? (
                      <Link
                        href={`/donate?kid=${k.id}`}
                        style={{
                          display: 'block',
                          marginTop: 14,
                          textAlign: 'center',
                          padding: '12px',
                          background: 'var(--ink)',
                          color: 'var(--paper)',
                          borderRadius: 4,
                          fontFamily: 'var(--font-body-stack)',
                          fontSize: 13,
                          fontWeight: 600,
                          textDecoration: 'none',
                          letterSpacing: '-0.005em',
                          transition: 'background .4s var(--ease-quart)',
                        }}
                      >
                        후원하기
                      </Link>
                    ) : (
                      <div
                        style={{
                          marginTop: 14,
                          textAlign: 'center',
                          padding: '12px',
                          color: 'var(--sage)',
                          borderTop: '1px solid var(--sage-soft)',
                          fontFamily: 'var(--font-mono-stack)',
                          fontSize: 11,
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                        }}
                      >
                        ✓ 수술 완료 · 감사합니다
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .kids-ed-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 560px) {
          .kids-ed-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
