const STATS: { v: string; l: string }[] = [
  { v: '₩18.6억', l: '누적 모금액' },
  { v: '130만', l: '매년 CHD 출생아' },
  { v: '93%', l: '치료 못 받는 비율' },
  { v: '47,599', l: '목표 회원 수' },
];

export function HomeStats() {
  return (
    <section className="stats-bar" aria-label="주요 지표">
      {STATS.map((s) => (
        <div key={s.l} className="stat-i">
          <span className="stat-v">{s.v}</span>
          <span className="stat-l">{s.l}</span>
        </div>
      ))}
    </section>
  );
}
