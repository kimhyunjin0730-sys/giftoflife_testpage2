import Link from 'next/link';

const NEWS = [
  {
    id: 1,
    cat: '소식',
    title: '말라위 페이즐리 어린이, 한국에서 수술 성공',
    desc: '11,000km를 날아온 4세 페이즐리가 무사히 심장 수술을 마쳤습니다.',
    img: '/images/kids/paisleigh-malawi.jpg',
  },
  {
    id: 2,
    cat: '활동',
    title: '볼리비아 코차밤바 의료 미션 완료',
    desc: '이번 주 볼리비아에서 어린이들의 심장 수술이 진행되었습니다.',
    img: '/images/kids/danna-bolivia.jpg',
  },
  {
    id: 3,
    cat: '소식',
    title: '말라위 라힘 어린이, 인도 도착',
    desc: '세 살배기 라힘이 인도 파트너 병원에서 수술을 받습니다.',
    img: '/images/kids/rahim-malawi.jpg',
  },
];

const NOTICES = [
  { id: 1, no: 12, title: '5월 자선 음악회 안내 — 국립극장', dt: '2026-04-22', cnt: 124 },
  { id: 2, no: 11, title: '2026년 1분기 기부금 사용 보고서', dt: '2026-04-10', cnt: 287 },
  { id: 3, no: 10, title: '로타리 회원 모집 (5월~)', dt: '2026-04-05', cnt: 198 },
  { id: 4, no: 9, title: '연간 보고서 2025 발간', dt: '2026-03-28', cnt: 412 },
  { id: 5, no: 8, title: '신규 파트너 병원 등록 안내', dt: '2026-03-20', cnt: 95 },
];

export function NewsSection() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="layout2">
          <div className="main-col">
            <div className="sec-hd">
              <div>
                <h2 className="sec-ttl">최근 뉴스</h2>
                <p className="sec-sub">생명의 선물 코리아의 활동과 어린이들의 소식</p>
              </div>
              <Link href="/news" className="sec-more">
                더 보기 →
              </Link>
            </div>
            <div className="ng" id="homeNews">
              {NEWS.map((n) => (
                <article key={n.id} className="nc">
                  <div className="nc-img">
                    <img src={n.img} alt={n.title} loading="lazy" />
                    <span className="nc-cat">{n.cat}</span>
                  </div>
                  <div className="nc-body">
                    <h3 className="nc-ttl">{n.title}</h3>
                    <p className="nc-desc">{n.desc}</p>
                    <div className="nc-more">자세히 보기 →</div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="sidebar">
            <div className="sb-box">
              <div className="sb-ttl">공지사항</div>
              <table className="ntbl">
                <tbody>
                  {NOTICES.map((nt) => (
                    <tr key={nt.id}>
                      <td className="num">{nt.no}</td>
                      <td>
                        <Link href={`/notices/${nt.id}`}>{nt.title}</Link>
                      </td>
                      <td className="dt">{nt.dt.slice(5)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
