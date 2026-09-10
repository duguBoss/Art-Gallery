import { useLang } from '../../i18n/LanguageContext';
import type { Lang } from '../../model';

const LANGS: { id: Lang; label: string }[] = [
  { id: 'zh', label: '中文' },
  { id: 'en', label: 'EN' },
];

export function LangSwitcher({ compact }: { compact?: boolean }) {
  const { lang, setLang } = useLang();
  return (
    <div className={`flex items-center ${compact ? 'gap-1' : 'gap-2'}`}>
      {LANGS.map((l, i) => (
        <span key={l.id} className="flex items-center gap-1">
          {i > 0 && <span className="text-ink-faint">/</span>}
          <button
            onClick={() => setLang(l.id)}
            className={`text-xs tracking-wide transition-colors ${
              lang === l.id ? 'text-ink font-semibold' : 'text-ink-mute hover:text-ink'
            }`}
          >
            {l.label}
          </button>
        </span>
      ))}
    </div>
  );
}
