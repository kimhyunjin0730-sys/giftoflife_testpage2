'use client';

import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase';

type Row = {
  id: number;
  title_ko: string | null;
  is_notice: boolean;
  published: boolean;
  views: number;
  date: string | null;
};

export function NoticesAdminTab() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const sb = getSupabase();
    sb.from('notices').select('id,title_ko,is_notice,published,views,date').order('date', { ascending: false })
      .then(({ data, error }) => { if (error) setErr(error.message); setRows((data as Row[] | null) ?? []); });
  }, []);

  async function togglePublish(id: number, next: boolean) {
    const sb = getSupabase();
    await sb.from('notices').update({ published: next }).eq('id', id);
    setRows((rs) => rs?.map((r) => (r.id === id ? { ...r, published: next } : r)) ?? null);
  }

  if (rows === null) return <p style={{ color: 'var(--muted)' }}>Loading…</p>;

  return (
    <div>
      {err && <p style={{ color: '#991b1b', fontSize: 13, marginBottom: 10 }}>⚠️ {err}</p>}
      <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 14 }}>
        공지 {rows.length}건 — 발행 토글만 우선 지원. 작성/편집은 향후 추가.
      </p>
      <div style={{ overflowX: 'auto', border: '1px solid var(--border)', borderRadius: 'var(--r2)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
          <thead>
            <tr style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
              <th style={th}>ID</th>
              <th style={th}>제목</th>
              <th style={th}>유형</th>
              <th style={th}>조회</th>
              <th style={th}>날짜</th>
              <th style={th}>발행</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ ...td, color: 'var(--muted)' }}>#{r.id}</td>
                <td style={td}>{r.title_ko ?? '—'}</td>
                <td style={{ ...td, fontSize: 12 }}>{r.is_notice ? '공지' : '일반'}</td>
                <td style={{ ...td, color: 'var(--muted)' }}>{r.views}</td>
                <td style={{ ...td, color: 'var(--muted)' }}>{r.date ?? '—'}</td>
                <td style={td}>
                  <button
                    onClick={() => togglePublish(r.id, !r.published)}
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      padding: '5px 12px',
                      borderRadius: 999,
                      background: r.published ? '#ecfdf5' : '#f1f5f9',
                      color: r.published ? '#065f46' : 'var(--muted)',
                      border: `1px solid ${r.published ? '#a7f3d0' : 'var(--border)'}`,
                    }}
                  >
                    {r.published ? '게시 중' : '숨김'}
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={6} style={{ ...td, textAlign: 'center', padding: '30px', color: 'var(--muted)' }}>공지가 없습니다.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const th: React.CSSProperties = { padding: '12px 14px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase' };
const td: React.CSSProperties = { padding: '12px 14px', fontSize: 13 };
