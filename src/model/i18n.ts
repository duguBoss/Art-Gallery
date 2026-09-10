/**
 * Localization primitives.
 *
 * Per master plan §26, language is data-aware: every knowledge field is a
 * localized value rather than a hard-coded string. Chinese and English are
 * authored for all seed content; Japanese / Korean fields are optional and
 * fall back gracefully until translated.
 */
export type Lang = 'zh' | 'en' | 'ja' | 'ko';

export const LANGS: { code: Lang; label: string; enLabel: string }[] = [
  { code: 'zh', label: '中文', enLabel: 'Chinese' },
  { code: 'en', label: 'English', enLabel: 'English' },
  { code: 'ja', label: '日本語', enLabel: 'Japanese' },
  { code: 'ko', label: '한국어', enLabel: 'Korean' },
];

export interface L10n {
  zh: string;
  en: string;
  ja?: string;
  ko?: string;
}

/** Construct a localized field with required zh/en and optional ja/ko. */
export const loc = (zh: string, en: string, rest?: { ja?: string; ko?: string }): L10n => ({
  zh,
  en,
  ...rest,
});

const FALLBACK_ORDER: Record<Lang, Lang[]> = {
  zh: ['zh', 'en'],
  en: ['en', 'zh'],
  ja: ['ja', 'en', 'zh'],
  ko: ['ko', 'en', 'zh'],
};

/** Resolve a localized value for a language, falling back across languages. */
export function tr(text: L10n | undefined | null, lang: Lang): string {
  if (!text) return '';
  for (const candidate of FALLBACK_ORDER[lang]) {
    const value = text[candidate];
    if (value && value.trim().length > 0) return value;
  }
  return text.zh;
}

/** Resolve with a custom fallback value when nothing exists. */
export function trOr(text: L10n | undefined | null, lang: Lang, fallback: string): string {
  const resolved = tr(text, lang);
  return resolved || fallback;
}
