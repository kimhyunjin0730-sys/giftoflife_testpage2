'use client';

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

  return (
    <header style={headerStyle}>
      <div className="wrap" style={innerStyle}>
        <Link href="/" style={logoStyle}>
          <span style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 22, fontWeight: 700, color: 'var(--navy)' }}>
            gift <em style={{ color: 'var(--blue)', fontStyle: 'normal' }}>of life</em>
          </span>
          <span style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: 1 }}>KOREA</span>
        </Link>

        <nav style={navStyle}>
          {NAV.map((item) => (
            <Link key={item.key} href={item.href} style={navLinkStyle}>
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <LangSwitcher />
          <Link href="/login" style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)', padding: '8px 14px' }}>
            {t('login')}
          </Link>
          <Link href="/donate" className="btn-primary" style={{ padding: '10px 22px', fontSize: 14 }}>
            {t('donate_btn')}
          </Link>
        </div>
      </div>
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
