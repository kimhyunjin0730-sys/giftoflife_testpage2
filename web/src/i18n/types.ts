export type Lang = 'ko' | 'en' | 'zh';
export const LANGS: readonly Lang[] = ['ko', 'en', 'zh'] as const;
export const DEFAULT_LANG: Lang = 'ko';

export type Dict = Record<string, string | string[]>;
