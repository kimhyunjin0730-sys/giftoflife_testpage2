import Link from 'next/link';

const NEWS = [
  {
    id: 1,
    cat: '소식',
    title: '말라위 페이즐리, 한국에서 새 심장을 얻다',
    desc: '11,000km를 날아온 4세 페이즐리가 무사히 심장 수술을 마쳤습니다.',
    img: '/images/kids/paisleigh-malawi.jpg',
    date: '2026.04.18',
  },
  {
    id: 2,
    cat: '활동',
    title: '볼리비아 코차밤바 의료 미션 완료',
    desc: '이번 주 볼리비아에서 어린이들의 심장 수술이 진행되었습니다.',
    img: '/images/kids/danna-bolivia.jpg',
    date: '2026.04.12',
  },
  {
    id: 3,
    cat: '소식',
    title: '말라위 라힘, 인도 파트너 병원에 도착',
    desc: '세 살배기 라힘이 인도 파트너 병원에서 수술을 받습니다.',
    img: '/images/kids/rahim-malawi.jpg',
    date: '2026.04.05',
  },
];

const NOTICES = [
  { no: 12, title: '5월 자선 음악회 안내 — 국립극장', dt: '04.22' },
  { no: 11, title: '2026년 1분기 기부금 사용 보고서', dt: '04.10' },
  { no: 10, title: '로타리 회원 모집 (5월~)', dt: '04.05' },
  { no: 9, title: '연간 보고서 2025 발간', dt: '03.28' },
  { no: 8, title: '신규 파트너 병원 등록 안내', dt: '03.20' },
];

export function NewsEditorial() {
  return (
    <section
      style={{
        background: 'var(--paper-2)',
        padding: '88px 0',
        borderTop: '1px solid rgba(10,20,40,.06)',
      }}
    >
      <div className="ed-wrap">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 2.2fr) minmax(0, 1fr)',
            gap: 'clamp(28px, 4vw, 56px)',
            alignItems: 'flex-start',
          }}
          className="news-ed-grid"
        >
          {/* 좌측 — 뉴스 그리드 */}
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginBottom: 32,
                gap: 16,
                flexWrap: 'wrap',
              }}
            >
              <div>
                <span className="ed-eyebrow">Latest Stories</span>
                <h2
                  className="ed-display"
                  style={{ fontSize: 'clamp(28px, 3.4vw, 40px)', marginTop: 14 }}
                >
                  최신 <em>소식</em>
                </h2>
              </div>
              <Link
                href="/news"
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
                더 보기 →
              </Link>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 'clamp(16px, 2vw, 24px)',
              }}
              className="news-card-grid"
            >
              {NEWS.map((n) => (
                <article key={n.id} className="ed-card">
                  <div className="img-frame aspect-landscape">
                    <img src={n.img} alt={n.title} loading="lazy" />
                  </div>
                  <div className="ed-card-body">
                    <div className="ed-card-meta">
                      {n.cat} · {n.date}
                    </div>
                    <h3
                      className="ed-card-title"
                      style={{ fontSize: 18, lineHeight: 1.25 }}
                    >
                      {n.title}
                    </h3>
                    <p
                      className="ed-card-desc"
                      style={{
                        fontSize: 13,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {n.desc}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* 우측 — 공지사항 */}
          <aside>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginBottom: 32,
                gap: 16,
              }}
            >
              <div>
                <span className="ed-eyebrow">Notices</span>
                <h2
                  className="ed-display"
                  style={{ fontSize: 'clamp(24px, 2.8vw, 32px)', marginTop: 14 }}
                >
                  공지사항
                </h2>
              </div>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {NOTICES.map((nt) => (
                <li
                  key={nt.no}
                  style={{
                    padding: '16px 0',
                    borderTop: '1px solid rgba(10,20,40,.1)',
                    display: 'grid',
                    gridTemplateColumns: '36px 1fr auto',
                    gap: 12,
                    alignItems: 'baseline',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono-stack)',
                      fontSize: 11,
                      letterSpacing: '0.1em',
                      color: 'var(--ink-mute)',
                    }}
                  >
                    {String(nt.no).padStart(2, '0')}
                  </span>
                  <Link
                    href={`/notices/${nt.no}`}
                    style={{
                      fontFamily: 'var(--font-body-stack)',
                      fontSize: 14,
                      color: 'var(--ink)',
                      textDecoration: 'none',
                      lineHeight: 1.4,
                    }}
                  >
                    {nt.title}
                  </Link>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono-stack)',
                      fontSize: 10.5,
                      color: 'var(--ink-mute)',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {nt.dt}
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .news-ed-grid {
            grid-template-columns: 1fr !important;
          }
          .news-card-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 540px) {
          .news-card-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
