'use client';

import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase';

type Row = {
  id: string;
  created_at: string;
  amount: number;
  donation_type: string | null;
  status: string | null;
  donor_email: string | null;
  donor_name: string | null;
};

export function DonationsTab() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  async function load() {
    const sb = getSupabase();
    const { data, error } = await sb.from('donations')
      .select('id,created_at,amount,donation_type,status,donor_email,donor_name')
      .order('created_at', { ascending: false });
    if (error) setErr(error.message);
    setRows((data as Row[] | null) ?? []);
  }
  useEffect(() => { load(); }, []);

  async function confirm(r: Row) {
    setBusy(r.id);
    const sb = getSupabase();
    const next = r.status === 'confirmed' ? 'pending' : 'confirmed';
    await sb.from('donations').update({ status: next }).eq('id', r.id);
    setBusy(null);
    load();
  }

  if (rows === null) return <p style={{ color: 'var(--muted)' }}>Loading…</p>;

  const total = rows.filter((r) => r.status === 'confirmed').reduce((s, r) => s + (r.amount || 0), 0);

  return (
    <div>
      {err && <p style={{ color: '#991b1b', fontSize: 13, marginBottom: 10 }}>⚠️ {err}</p>}
      <div style={{ display: 'flex', gap: 20, marginBottom: 14, fontSize: 13, color: 'var(--muted)' }}>
        <span>총 <strong>{rows.length}</strong>건</span>
        <span>확인 완료 합계 <strong>₩{total.toLocaleString()}</strong></span>
      </div>
      <div style={{ overflowX: 'auto', border: '1px solid var(--border)', borderRadius: 'var(--r2)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
          <thead>
            <tr style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
              <th style={th}>날짜</th>
              <th style={th}>이름</th>
              <th style={th}>이메일</th>
              <th style={th}>타입</th>
              <th style={{ ...th, textAlign: 'right' }}>금액</th>
              <th style={th}>상태</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ ...td, color: 'var(--muted)' }}>{r.created_at?.slice(0, 10) ?? '—'}</td>
                <td style={td}>{r.donor_name ?? '—'}</td>
                <td style={{ ...td, fontSize: 12 }}>{r.donor_email ?? '—'}</td>
                <td style={{ ...td, fontSize: 12 }}>{r.donation_type ?? 'general'}</td>
                <td style={{ ...td, textAlign: 'right', fontWeight: 600 }}>₩ {r.amount?.toLocaleString?.() ?? r.amount}</td>
                <td style={td}>
                  <button
                    onClick={() => confirm(r)}
                    disabled={busy === r.id}
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      padding: '5px 12px',
                      borderRadius: 999,
                      background: r.status === 'confirmed' ? '#ecfdf5' : '#fef3c7',
                      color: r.status === 'confirmed' ? '#065f46' : '#92400e',
                      border: `1px solid ${r.status === 'confirmed' ? '#a7f3d0' : '#fde68a'}`,
                      cursor: busy === r.id ? 'wait' : 'pointer',
                    }}
                  >
                    {busy === r.id ? '...' : r.status === 'confirmed' ? '✓ 확인' : '대기'}
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={6} style={{ ...td, textAlign: 'center', padding: '30px', color: 'var(--muted)' }}>후원 내역이 없습니다.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const th: React.CSSProperties = { padding: '12px 14px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase' };
const td: React.CSSProperties = { padding: '12px 14px', fontSize: 13 };
