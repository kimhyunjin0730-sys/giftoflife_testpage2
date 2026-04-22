'use client';

import Link from 'next/link';
import { useLang } from '@/i18n/LangProvider';

const LINKS = [
  { key: 'nav_home', href: '/' },
  { key: 'nav_about', href: '/about' },
  { key: 'nav_partners', href: '/partners' },
  { key: 'nav_children', href: '/children' },
  { key: 'nav_news', href: '/news' },
  { key: 'nav_activities', href: '/activities' },
  { key: 'nav_donate', href: '/donate' },
  { key: 'nav_contact', href: '/contact' },
];

export function Footer() {
  const { t } = useLang();

  return (
    <footer style={wrap}>
      <div className="wrap" style={grid}>
        <div>
          <div style={{ fontFamily: "'Libre Bodoni', serif", fontSize: 18, fontWeight: 700, color: 'var(--navy)', marginBottom: 14 }}>
            생명의 <em style={{ color: 'var(--blue)', fontStyle: 'normal' }}>선물</em> 코리아
          </div>
          <p style={{ fontStyle: 'italic', color: '#475569', fontSize: 12.5, lineHeight: 1.95, marginBottom: 14, maxWidth: 230 }}>
            {t('footer_tagline')}
          </p>
          <div style={{ color: '#64748b', fontSize: 12.5, lineHeight: 2.3 }}>
            e. golikorea@naver.com
            <br />m. 010-9985-5328
            <br />w. www.golikorea.or.kr
            <br />l. {t('footer_contact_address')}
          </div>
        </div>

        <div>
          <div style={ttl}>{t('ft_links')}</div>
          <ul style={{ listStyle: 'none' }}>
            {LINKS.map((item) => (
              <li key={item.key}>
                <Link href={item.href} style={linkStyle}>
                  <span style={{ color: 'var(--blue)', marginRight: 5 }}>›</span>{t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div style={ttl}>{t('ft_related')}</div>
          <ul style={{ listStyle: 'none' }}>
            <li><a href="https://giftoflifeinternational.org" target="_blank" rel="noopener" style={linkStyle}><span style={{ color: 'var(--blue)', marginRight: 5 }}>›</span>Gift of Life International</a></li>
            <li><a href="https://rotary.org" target="_blank" rel="noopener" style={linkStyle}><span style={{ color: 'var(--blue)', marginRight: 5 }}>›</span>Rotary International</a></li>
            <li><a href="#" style={linkStyle}><span style={{ color: 'var(--blue)', marginRight: 5 }}>›</span>로타리 3640지구</a></li>
          </ul>
        </div>
      </div>

      <div style={bot}>
        <div className="wrap" style={{ color: '#94a3b8', fontSize: 12, padding: '16px 24px' }}>
          {t('ft_cp')}
        </div>
      </div>
    </footer>
  );
}

const wrap: React.CSSProperties = {
  background: '#f1f5f9',
  marginTop: 64,
};

const grid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1.8fr 1fr 1fr',
  gap: 36,
  padding: '50px 24px 38px',
  borderBottom: '1px solid #e2e8f0',
};

const ttl: React.CSSProperties = {
  color: '#64748b',
  fontWeight: 700,
  fontSize: 11,
  marginBottom: 16,
  paddingBottom: 8,
  borderBottom: '1px solid #e2e8f0',
  letterSpacing: 0.3,
  textTransform: 'uppercase',
};

const linkStyle: React.CSSProperties = {
  color: '#475569',
  fontSize: 13,
  display: 'block',
  padding: '3px 0',
  transition: 'color 0.2s ease',
};

const bot: React.CSSProperties = {
  maxWidth: 'var(--max)',
  margin: '0 auto',
};
