import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { L10n, Lang } from '../model';
import { tr as trModel } from '../model';
import { ui, type UiKey } from './ui';

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** Translate a content L10n into the current language. */
  t: (l: L10n | undefined) => string;
  /** Translate a UI chrome string. */
  u: (key: UiKey) => string;
}

const Ctx = createContext<LangCtx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('zh');
  const t = useCallback((l: L10n | undefined) => (l ? trModel(l, lang) : ''), [lang]);
  const u = useCallback((key: UiKey) => ui(key, lang), [lang]);
  return <Ctx.Provider value={{ lang, setLang, t, u }}>{children}</Ctx.Provider>;
}

export function useLang(): LangCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error('useLang must be used within LanguageProvider');
  return c;
}
