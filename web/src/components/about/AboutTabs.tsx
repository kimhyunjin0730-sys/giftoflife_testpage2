'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ABOUT_TABS } from '@/data/about';
import { useLang } from '@/i18n/LangProvider';

export function AboutTabs() {
  const { lang } = useLang();
  const path = usePathname();

  return (
    <nav style={wrap}>
      <div className="wrap" style={inner}>
        {ABOUT_TABS.map((tab) => {
          const href = tab.id === 'intro' ? '/about' : `/about/${tab.id}`;
          const active = path === href || (tab.id === 'intro' && path === '/about');
          return (
            <Link
              key={tab.id}
              href={href}
              style={{
                ...tabLink,
                color: active ? 'var(--navy)' : 'var(--muted)',
                borderBottomColor: active ? 'var(--blue)' : 'transparent',
                fontWeight: active ? 700 : 500,
              }}
            >
              {tab.label[lang] ?? tab.label.ko}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

const wrap: React.CSSProperties = {
  background: '#fff',
  borderBottom: '1px solid var(--border)',
  position: 'sticky',
  top: 64,
  zIndex: 10,
};

const inner: React.CSSProperties = {
  display: 'flex',
  gap: 0,
  overflowX: 'auto',
  padding: '0 24px',
};

const tabLink: React.CSSProperties = {
  padding: '14px 20px',
  fontSize: 14,
  borderBottom: '3px solid transparent',
  whiteSpace: 'nowrap',
  transition: 'color 0.2s ease, border-color 0.2s ease',
};
