'use client';

import Link from 'next/link';
import { useLang } from '@/i18n/LangProvider';
import type { NoticeRow } from '@/data/notices';

export function NoticesTable({ items }: { items: NoticeRow[] }) {
  const { lang } = useLang();

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--r2)', overflow: 'hidden', background: '#fff' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
            <th style={{ ...th, width: 70 }}>No.</th>
            <th style={th}>{lang === 'en' ? 'Title' : lang === 'zh' ? '标题' : '제목'}</th>
            <th style={{ ...th, width: 120, textAlign: 'center' }}>{lang === 'en' ? 'Date' : lang === 'zh' ? '日期' : '날짜'}</th>
            <th style={{ ...th, width: 80, textAlign: 'center' }}>{lang === 'en' ? 'Views' : lang === 'zh' ? '浏览' : '조회'}</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ padding: '40px 24px', textAlign: 'center', color: 'var(--muted)' }}>
                {lang === 'en' ? 'No notices yet.' : lang === 'zh' ? '暂无公告。' : '공지사항이 없습니다.'}
              </td>
            </tr>
          ) : (
            items.map((n) => (
              <tr key={n.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ ...td, textAlign: 'center' }}>
                  {n.isNotice ? (
                    <span style={noticeBadge}>{lang === 'en' ? 'Notice' : lang === 'zh' ? '公告' : '공지'}</span>
                  ) : (
                    <span style={{ color: 'var(--muted)', fontSize: 13 }}>{n.no}</span>
                  )}
                </td>
                <td style={td}>
                  <Link href={`/notices/${n.id}`} style={{ color: 'var(--navy)', fontWeight: 600, fontSize: 14 }}>
                    {n.title[lang] ?? n.title.ko}
                    {n.isNew && <span style={newBadge}>NEW</span>}
                  </Link>
                </td>
                <td style={{ ...td, textAlign: 'center', fontSize: 13, color: 'var(--muted)' }}>{n.date}</td>
                <td style={{ ...td, textAlign: 'center', fontSize: 13, color: 'var(--muted)' }}>{n.views}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

const th: React.CSSProperties = {
  padding: '14px 16px',
  textAlign: 'left',
  fontSize: 12,
  fontWeight: 700,
  color: 'var(--muted)',
  letterSpacing: 0.4,
  textTransform: 'uppercase',
};
const td: React.CSSProperties = { padding: '14px 16px' };
const noticeBadge: React.CSSProperties = {
  display: 'inline-block',
  padding: '2px 10px',
  borderRadius: 999,
  background: 'var(--blue)',
  color: '#fff',
  fontSize: 11,
  fontWeight: 700,
};
const newBadge: React.CSSProperties = {
  marginLeft: 8,
  padding: '1px 7px',
  borderRadius: 4,
  background: '#fef3c7',
  color: '#92400e',
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: 0.4,
};
