'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { DEFAULT_LANG, LANGS, type Lang } from './types';
import { t as translate } from './dictionaries';

type LangContextValue = {
  lang: Lang;
  setLang: (next: Lang) => void;
  t: (key: string) => string;
};

const LangContext = createContext<LangContextValue | null>(null);
const STORAGE_KEY = 'gol_lang';

function detectInitialLang(): Lang {
  if (typeof window === 'undefined') return DEFAULT_LANG;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && (LANGS as readonly string[]).includes(saved)) return saved as Lang;
  } catch {}
  const browser = (navigator.language || 'ko').toLowerCase();
  if (browser.startsWith('zh')) return 'zh';
  if (browser.startsWith('ko')) return 'ko';
  return 'en';
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    setLangState(detectInitialLang());
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try { window.localStorage.setItem(STORAGE_KEY, next); } catch {}
    document.documentElement.lang = next === 'ko' ? 'ko' : next === 'zh' ? 'zh' : 'en';
  }, []);

  const t = useCallback((key: string) => translate(lang, key), [lang]);

  const value = useMemo<LangContextValue>(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const v = useContext(LangContext);
  if (!v) throw new Error('useLang must be used within <LangProvider>');
  return v;
}
