'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { KIDS } from '@/data/kids';

const SLIDE_MS = 5000;

export function HeroSlider() {
  const [idx, setIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = KIDS.length;

  const startTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIdx((i) => (i + 1) % total);
    }, SLIDE_MS);
  }, [total]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [idx, startTimer]);

  const goPrev = () => setIdx((i) => (i - 1 + total) % total);
  const goNext = () => setIdx((i) => (i + 1) % total);

  return (
    <section className="uni-hero" id="heroSlider" aria-label="히어로 슬라이더">
      {KIDS.map((kid, i) => (
        <div key={kid.id} className={`slide${i === idx ? ' active' : ''}`}>
          <div
            className={`slide-bg${i === idx ? ' ken' : ''}`}
            style={{ backgroundImage: `url(${kid.img})` }}
          />
          <div className="slide-ov" />
        </div>
      ))}

      <div className="uni-hero-content">
        <div className="uni-hero-left">
          <span className="uni-eyebrow">
            <span className="dot" />
            해외 파트너 사례 · 뉴스 보도
          </span>
          <h1 className="uni-hero-h">
            모든 아이는 심장을 고칠 <span className="accent">권리</span>가 있습니다
          </h1>
          <p className="uni-hero-p">
            매년 135만 명의 아이들이 선천성 심장병을 안고 태어납니다. 93%는 수술을 받지 못합니다. 당신의 후원이 그 숫자를 바꿉니다.
          </p>
          <div className="uni-hero-btns">
            <Link href="/donate" className="uni-btn-primary">
              후원하기
            </Link>
            <Link href="/children" className="uni-btn-ghost">
              어린이 이야기 →
            </Link>
          </div>
        </div>
      </div>

      <div className="uni-dots" role="tablist" aria-label="슬라이드 인디케이터">
        {KIDS.map((kid, i) => (
          <button
            key={kid.id}
            type="button"
            className={`uni-dot${i === idx ? ' active' : ''}`}
            aria-label={`슬라이드 ${i + 1}`}
            aria-selected={i === idx}
            onClick={() => setIdx(i)}
          />
        ))}
      </div>

      <div className="uni-nav">
        <button type="button" className="uni-nav-btn" aria-label="이전" onClick={goPrev}>
          ‹
        </button>
        <button type="button" className="uni-nav-btn" aria-label="다음" onClick={goNext}>
          ›
        </button>
      </div>

      <div className="uni-timebar">
        <div
          key={idx}
          className="uni-timefill"
          style={{ width: '100%' }}
        />
      </div>
    </section>
  );
}
