'use client';

import { useLang } from '@/i18n/LangProvider';
import { LANGS, type Lang } from '@/i18n/types';

const LABELS: Record<Lang, string> = { ko: 'KO', en: 'EN', zh: '中' };

export function LangSwitcher() {
  const { lang, setLang } = useLang();
  return (
    <div style={wrap}>
      {LANGS.map((l) => {
        const active = lang === l;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            style={{
              ...btn,
              background: active ? 'var(--navy)' : 'transparent',
              color: active ? '#fff' : 'var(--muted)',
            }}
            aria-pressed={active}
          >
            {LABELS[l]}
          </button>
        );
      })}
    </div>
  );
}

const wrap: React.CSSProperties = {
  display: 'inline-flex',
  gap: 2,
  padding: 3,
  borderRadius: 999,
  border: '1px solid var(--border)',
};

const btn: React.CSSProperties = {
  padding: '6px 12px',
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: 0.5,
  transition: 'background 0.2s ease, color 0.2s ease',
};
