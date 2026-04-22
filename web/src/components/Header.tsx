'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/i18n/LangProvider';
import { LangSwitcher } from './LangSwitcher';

const NAV = [
  { key: 'nav_home', href: '/' },
  { key: 'nav_about', href: '/about' },
  { key: 'nav_partners', href: '/partners' },
  { key: 'nav_children', href: '/children' },
  { key: 'nav_news', href: '/news' },
  { key: 'nav_activities', href: '/activities' },
  { key: 'nav_donate', href: '/donate' },
  { key: 'nav_contact', href: '/contact' },
];

export function Header() {
  const { t } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header style={headerStyle}>
      <div className="wrap" style={innerStyle}>
        <Link href="/" style={logoStyle}>
          <span style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 22, fontWeight: 700, color: 'var(--navy)' }}>
            gift <em style={{ color: 'var(--blue)', fontStyle: 'normal' }}>of life</em>
          </span>
          <span style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: 1 }}>KOREA</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hdr-nav" style={navStyle}>
          {NAV.map((item) => (
            <Link key={item.key} href={item.href} style={navLinkStyle}>
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <LangSwitcher />
          <Link href="/login" className="hdr-login" style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)', padding: '8px 14px' }}>
            {t('login')}
          </Link>
          <Link href="/donate" className="btn-primary hdr-donate" style={{ padding: '10px 22px', fontSize: 14 }}>
            {t('donate_btn')}
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="hdr-burger"
            style={burgerStyle}
          >
            <span style={burgerBar(mobileOpen, 0)} />
            <span style={burgerBar(mobileOpen, 1)} />
            <span style={burgerBar(mobileOpen, 2)} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="hdr-drawer" style={drawerStyle}>
          <div className="wrap" style={{ padding: '14px 24px 22px' }}>
            {NAV.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                style={drawerLink}
              >
                {t(item.key)}
              </Link>
            ))}
            <div style={{ display: 'flex', gap: 10, marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                style={{ flex: 1, padding: '11px 14px', textAlign: 'center', border: '1px solid var(--border)', borderRadius: 999, fontSize: 14, fontWeight: 600, color: 'var(--navy)' }}
              >
                {t('login')}
              </Link>
              <Link
                href="/donate"
                onClick={() => setMobileOpen(false)}
                className="btn-primary"
                style={{ flex: 1, padding: '11px 14px', fontSize: 14 }}
              >
                {t('donate_btn')}
              </Link>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .hdr-nav { display: none !important; }
          .hdr-login { display: none !important; }
          .hdr-donate { display: none !important; }
          .hdr-burger { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}

const headerStyle: React.CSSProperties = {
  position: 'sticky',
  top: 0,
  zIndex: 50,
  background: 'rgba(255, 255, 255, 0.92)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid var(--border)',
};

const innerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 24,
  padding: '14px 24px',
};

const logoStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  lineHeight: 1.1,
};

const navStyle: React.CSSProperties = {
  display: 'flex',
  gap: 22,
  fontSize: 14,
  fontWeight: 600,
};

const navLinkStyle: React.CSSProperties = {
  color: 'var(--navy)',
  transition: 'color 0.2s ease',
};

const burgerStyle: React.CSSProperties = {
  display: 'none',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: 40,
  height: 40,
  gap: 4,
  borderRadius: 8,
  border: '1px solid var(--border)',
  background: '#fff',
  padding: 0,
};

const burgerBar = (open: boolean, i: number): React.CSSProperties => {
  const base: React.CSSProperties = {
    display: 'block',
    width: 18,
    height: 2,
    background: 'var(--navy)',
    borderRadius: 2,
    transition: 'transform 0.25s ease, opacity 0.2s ease',
  };
  if (!open) return base;
  if (i === 0) return { ...base, transform: 'translateY(6px) rotate(45deg)' };
  if (i === 1) return { ...base, opacity: 0 };
  return { ...base, transform: 'translateY(-6px) rotate(-45deg)' };
};

const drawerStyle: React.CSSProperties = {
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  background: '#fff',
  borderBottom: '1px solid var(--border)',
  boxShadow: '0 12px 24px rgba(15, 23, 42, 0.08)',
};

const drawerLink: React.CSSProperties = {
  display: 'block',
  padding: '12px 10px',
  fontSize: 15,
  fontWeight: 600,
  color: 'var(--navy)',
  borderBottom: '1px solid var(--bg2)',
};
