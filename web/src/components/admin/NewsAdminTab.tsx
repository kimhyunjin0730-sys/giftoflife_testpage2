'use client';

import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase';

type Row = {
  id: number;
  title_ko: string | null;
  cat_ko: string | null;
  date: string | null;
  created_at: string;
};

export function NewsAdminTab() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const sb = getSupabase();
    sb.from('news_posts').select('id,title_ko,cat_ko,date,created_at').order('created_at', { ascending: false })
      .then(({ data, error }) => { if (error) setErr(error.message); setRows((data as Row[] | null) ?? []); });
  }, []);

  if (rows === null) return <p style={{ color: 'var(--muted)' }}>Loading…</p>;

  return (
    <div>
      {err && <p style={{ color: '#991b1b', fontSize: 13, marginBottom: 10 }}>⚠️ {err}</p>}
      <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 14 }}>
        뉴스 {rows.length}건 — CRUD UI 는 이 탭에서 향후 확장 예정.
      </p>
      <div style={{ overflowX: 'auto', border: '1px solid var(--border)', borderRadius: 'var(--r2)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
          <thead>
            <tr style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
              <th style={th}>ID</th>
              <th style={th}>제목</th>
              <th style={th}>카테고리</th>
              <th style={th}>날짜</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ ...td, color: 'var(--muted)' }}>#{r.id}</td>
                <td style={td}>{r.title_ko ?? '—'}</td>
                <td style={{ ...td, fontSize: 12 }}>{r.cat_ko ?? '—'}</td>
                <td style={{ ...td, color: 'var(--muted)' }}>{r.date ?? r.created_at?.slice(0, 10)}</td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={4} style={{ ...td, textAlign: 'center', padding: '30px', color: 'var(--muted)' }}>뉴스가 없습니다.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const th: React.CSSProperties = { padding: '12px 14px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase' };
const td: React.CSSProperties = { padding: '12px 14px', fontSize: 13 };
