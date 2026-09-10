import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, Shuffle } from 'lucide-react';
import { search, randomEntity } from '../../content/kb';
import type { EntityType } from '../../model';
import { useLang } from '../../i18n/LanguageContext';
import type { UiKey } from '../../i18n/ui';
import { useRouter, entityPath } from '../../router/router';
import { typeLabelOf } from '../common/EntityCard';

const GROUP_ORDER: EntityType[] = ['work', 'building', 'object', 'person', 'style', 'concept', 'material', 'technique', 'place', 'period', 'lesson', 'practice', 'exhibition', 'product', 'domain'];

export function CommandPalette() {
  const { t, u, lang } = useLang();
  const { navigate } = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(o => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30);
  }, [open]);

  const hits = useMemo(() => search(q, lang, { limit: 30 }), [q, lang]);
  const groups = useMemo(() => {
    const map = new Map<EntityType, typeof hits>();
    for (const h of hits) {
      const arr = map.get(h.entity.type) ?? [];
      arr.push(h);
      map.set(h.entity.type, arr);
    }
    return GROUP_ORDER.filter(type => map.has(type)).map(type => ({ type, items: map.get(type)! }));
  }, [hits]);

  const go = (path: string) => {
    setOpen(false);
    setQ('');
    navigate(path);
  };

  const surprise = () => {
    const e = randomEntity(x => x.type !== 'domain' && !!x.summary);
    go(entityPath(e));
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-ink/30 backdrop-blur-[2px]" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-2xl border border-ink/20 bg-paper shadow-2xl">
        <div className="flex items-center gap-3 border-b border-paper-edge px-5 py-4">
          <Search size={16} className="text-ink-mute" />
          <input
            ref={inputRef}
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder={u('nav.searchHint')}
            className="w-full bg-transparent text-lg outline-none placeholder:text-ink-faint"
          />
          <button onClick={surprise} className="flex items-center gap-1.5 text-xs text-ink-mute hover:text-cinnabar-deep" title={u('nav.surprise')}>
            <Shuffle size={13} /> {u('nav.surprise')}
          </button>
        </div>
        <div className="max-h-[55vh] overflow-y-auto py-2">
          {q.length === 0 && (
            <p className="px-5 py-8 text-center text-sm text-ink-mute">
              {t({ zh: '试试“光”“几何”“浮世绘”或“大卫”', en: 'Try “light”, “geometry”, “ukiyo-e” or “David”' })}
            </p>
          )}
          {groups.map(g => (
            <div key={g.type} className="py-1">
              <div className="px-5 py-1.5 text-[10px] uppercase tracking-eyebrow text-ink-mute">
                {typeLabelOf(g.type, u as (k: UiKey) => string)}
              </div>
              {g.items.slice(0, 6).map(h => (
                <button
                  key={h.entity.id}
                  onClick={() => go(entityPath(h.entity))}
                  className="flex w-full items-baseline justify-between gap-4 px-5 py-2.5 text-left hover:bg-paper-deep"
                >
                  <span className="font-serif text-lg">{t(h.entity.name)}</span>
                  {h.entity.summary && (
                    <span className="line-clamp-1 flex-1 text-right text-xs text-ink-mute">{t(h.entity.summary)}</span>
                  )}
                </button>
              ))}
            </div>
          ))}
          {q.length > 0 && hits.length === 0 && (
            <p className="px-5 py-8 text-center text-sm text-ink-mute">
              {t({ zh: '没有找到——试试另一个词，或随便看看', en: 'Nothing found — try another word or Surprise Me' })}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between border-t border-paper-edge px-5 py-2.5 text-[11px] text-ink-faint">
          <span className="font-mono">ESC {lang === 'zh' ? '关闭' : 'close'}</span>
          <span className="font-mono">⌘K / Ctrl+K</span>
        </div>
      </div>
    </div>
  );
}
