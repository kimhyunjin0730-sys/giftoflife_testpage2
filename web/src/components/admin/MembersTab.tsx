'use client';

import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase';

type Member = {
  id: string;
  email: string | null;
  name: string | null;
  role: string | null;
  verified_at: string | null;
  rotary_club: string | null;
  created_at: string;
};

export function MembersTab({ filter }: { filter: 'all' | 'rotary' }) {
  const [members, setMembers] = useState<Member[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  async function load() {
    const sb = getSupabase();
    let q = sb.from('profiles').select('id,email,name,role,verified_at,rotary_club,created_at').order('created_at', { ascending: false });
    if (filter === 'rotary') q = q.eq('role', 'rotary');
    const { data, error } = await q;
    if (error) setError(error.message);
    setMembers((data as Member[] | null) ?? []);
  }

  async function toggleVerify(m: Member) {
    setBusy(m.id);
    const sb = getSupabase();
    const newVerifiedAt = m.verified_at ? null : new Date().toISOString();
    const newRole = newVerifiedAt ? 'rotary' : 'public';
    const { error } = await sb.from('profiles').update({ verified_at: newVerifiedAt, role: newRole }).eq('id', m.id);
    setBusy(null);
    if (error) {
      alert('업데이트 실패: ' + error.message);
      return;
    }
    load();
  }

  if (members === null) return <p style={{ color: 'var(--muted)' }}>Loading…</p>;

  return (
    <div>
      {error && <p style={{ color: '#991b1b', fontSize: 13, marginBottom: 10 }}>⚠️ {error}</p>}
      <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 14 }}>
        총 <strong>{members.length}</strong>명
      </p>
      <div style={{ overflowX: 'auto', border: '1px solid var(--border)', borderRadius: 'var(--r2)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
          <thead>
            <tr style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
              <th style={th}>이메일</th>
              <th style={th}>이름</th>
              <th style={th}>역할</th>
              <th style={th}>로타리 클럽</th>
              <th style={th}>인증일</th>
              <th style={th}>가입일</th>
              <th style={th}>액션</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={td}>{m.email}</td>
                <td style={td}>{m.name ?? '—'}</td>
                <td style={td}>
                  <span style={roleBadge(m.role)}>{m.role ?? 'public'}</span>
                </td>
                <td style={td}>{m.rotary_club ?? '—'}</td>
                <td style={td}>{m.verified_at ? m.verified_at.slice(0, 10) : '—'}</td>
                <td style={{ ...td, color: 'var(--muted)' }}>{m.created_at?.slice(0, 10) ?? '—'}</td>
                <td style={td}>
                  <button
                    onClick={() => toggleVerify(m)}
                    disabled={busy === m.id}
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      padding: '6px 14px',
                      borderRadius: 999,
                      background: m.verified_at ? '#fef2f2' : 'var(--blue-lt)',
                      color: m.verified_at ? '#991b1b' : 'var(--blue)',
                      border: `1px solid ${m.verified_at ? '#fecaca' : 'var(--blue-mid)'}`,
                      cursor: busy === m.id ? 'wait' : 'pointer',
                    }}
                  >
                    {busy === m.id ? '...' : m.verified_at ? '해제' : '인증'}
                  </button>
                </td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr><td colSpan={7} style={{ ...td, textAlign: 'center', color: 'var(--muted)', padding: '30px' }}>회원이 없습니다.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const th: React.CSSProperties = { padding: '12px 14px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.4 };
const td: React.CSSProperties = { padding: '12px 14px', fontSize: 13, verticalAlign: 'middle' };
const roleBadge = (r: string | null): React.CSSProperties => ({
  display: 'inline-block',
  padding: '3px 10px',
  borderRadius: 999,
  fontSize: 11,
  fontWeight: 700,
  background: r === 'admin' ? '#fef3c7' : r === 'rotary' ? 'var(--blue-lt)' : '#f1f5f9',
  color: r === 'admin' ? '#92400e' : r === 'rotary' ? 'var(--blue)' : 'var(--muted)',
});
