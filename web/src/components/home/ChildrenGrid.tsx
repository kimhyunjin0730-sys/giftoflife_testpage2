import Link from 'next/link';
import { KIDS } from '@/data/kids';

const num = (n: number) => n.toLocaleString('ko-KR');

export function ChildrenGrid() {
  const list = KIDS.slice(0, 6);
  return (
    <section className="section">
      <div className="wrap">
        <div className="sec-hd">
          <div>
            <h2 className="sec-ttl">우리 아이들</h2>
            <p className="sec-sub">선천성 심장병 어린이들의 이야기와 회복 과정을 만나보세요.</p>
          </div>
          <Link href="/children" className="sec-more">
            더 보기 →
          </Link>
        </div>
        <div className="cg" id="homeKids">
          {list.map((k) => {
            const name = typeof k.name === 'string' ? k.name : k.name.ko;
            const country = k.country.ko;
            const age = k.age.ko;
            const story = k.story.ko;
            const pct = Math.min(100, Math.round((k.raised / k.goal) * 100));
            return (
              <article key={k.id} className="cc">
                <div className="cc-img">
                  <img src={k.img} alt={name} loading="lazy" />
                  <span className={`cc-st ${k.status}`}>
                    {k.status === 'recovered' ? 'RECOVERED' : 'WAITING'}
                  </span>
                </div>
                <div className="cc-body">
                  <h3 className="cc-nm">{name}</h3>
                  <div className="cc-meta">
                    {k.flag} {country} · {age}
                  </div>
                  <p className="cc-story">{story}</p>
                  <div className="cc-prog-row">
                    <span>모금 진행</span>
                    <span>
                      {num(k.raised)} / {num(k.goal)} USD
                    </span>
                  </div>
                  <div className="cc-track">
                    <div className={`cc-fill ${k.status}`} style={{ width: `${pct}%` }} />
                  </div>
                  {k.status === 'recovered' ? (
                    <div className="cc-done">✓ 수술 완료 — 따뜻한 마음에 감사드립니다</div>
                  ) : (
                    <Link href={`/donate?kid=${k.id}`} className="cc-btn">
                      후원하기
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
