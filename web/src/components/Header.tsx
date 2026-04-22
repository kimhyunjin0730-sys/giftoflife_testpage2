'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const NAV = [
  { href: '/', label: '홈' },
  { href: '/about', label: '소개' },
  { href: '/partners', label: '파트너스' },
  { href: '/children', label: '우리 아이들' },
  { href: '/news', label: '뉴스 & 소식' },
  { href: '/activities', label: '우리의 활동' },
  { href: '/donate', label: '후원하기' },
  { href: '/contact', label: '문의하기' },
];

export function Header() {
  const pathname = usePathname();
  const [mobOpen, setMobOpen] = useState(false);

  useEffect(() => {
    setMobOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname?.startsWith(href);

  return (
    <>
      <header className="site-hdr">
        <div className="hdr-in">
          <Link href="/" className="logo" aria-label="홈">
            <Image
              src="/gift_of_life_logo.svg"
              alt="Gift of Life"
              width={36}
              height={36}
              priority
            />
            <span className="logo-name" id="logo-name">gift of life</span>
          </Link>

          <nav className="site-nav" aria-label="주 메뉴">
            <ul className="nav-ul">
              {NAV.map((it) => (
                <li key={it.href} className={isActive(it.href) ? 'act' : ''}>
                  <Link href={it.href}>{it.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hdr-btns">
            <Link href="/mypage" className="btn-hdr-outline" id="btnMy">
              내 정보
            </Link>
            <Link href="/login" className="btn-hdr-fill" id="btnLogin">
              로그인
            </Link>
            <button
              type="button"
              className="ham"
              id="hamBtn"
              aria-label="모바일 메뉴 열기"
              onClick={() => setMobOpen(true)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`mob-wrap${mobOpen ? ' open' : ''}`}
        id="mobWrap"
        aria-hidden={!mobOpen}
      >
        <div className="mob-bg" onClick={() => setMobOpen(false)} />
        <aside className="mob-panel" role="dialog" aria-label="모바일 메뉴">
          <div className="mob-hdr">
            <div className="mob-logo">
              <strong>gift of life</strong>
            </div>
            <button
              type="button"
              className="mob-x"
              aria-label="닫기"
              onClick={() => setMobOpen(false)}
            >
              ×
            </button>
          </div>
          {NAV.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="mob-item"
              onClick={() => setMobOpen(false)}
            >
              {it.label}
            </Link>
          ))}
          <Link href="/donate" className="mob-cta" onClick={() => setMobOpen(false)}>
            지금 후원하기
          </Link>
        </aside>
      </div>
    </>
  );
}
