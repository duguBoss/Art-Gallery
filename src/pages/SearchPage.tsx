import { useMemo, useState } from 'react';
import { Search, Shuffle } from 'lucide-react';
import { search, randomEntity } from '../content/kb';
import type { EntityType } from '../model';
import { useLang } from '../i18n/LanguageContext';
import type { UiKey } from '../i18n/ui';
import { Link, useRouter, entityPath } from '../router/router';
import { typeLabelOf, EntityLine } from '../components/common/EntityCard';

const GROUP_ORDER: EntityType[] = ['work', 'building', 'object', 'person', 'style', 'concept', 'material', 'technique', 'place', 'period', 'lesson', 'practice', 'exhibition', 'product', 'domain'];

export function SearchPage() {
  const { t, u, lang } = useLang();
  const { navigate } = useRouter();
  const [q, setQ] = useState('');

  const hits = useMemo(() => search(q, lang, { limit: 60 }), [q, lang]);
  const groups = useMemo(() => {
    const map = new Map<EntityType, typeof hits>();
    for (const h of hits) {
      const arr = map.get(h.entity.type) ?? [];
      arr.push(h);
      map.set(h.entity.type, arr);
    }
    return GROUP_ORDER.filter(type => map.has(type)).map(type => ({ type, items: map.get(type)! }));
  }, [hits]);

  return (
    <div className="animate-fade-up">
      <header className="wrap pt-16 md:pt-24">
        <div className="eyebrow mb-4">Search</div>
        <h1 className="font-serif text-4xl md:text-5xl">{u('nav.searchHint')}</h1>
        <div className="mt-8 flex items-center gap-3 border-b-2 border-ink pb-4">
          <Search size={20} className="text-ink-mute" />
          <input
            autoFocus
            value={q}
            onChange={e => setQ(e.target.value)}
            className="w-full bg-transparent font-serif text-3xl outline-none placeholder:text-ink-faint md:text-4xl"
            placeholder={u('nav.search')}
          />
          <button
            onClick={() => {
              const e = randomEntity(x => x.type !== 'domain' && !!x.summary);
              navigate(entityPath(e));
            }}
            className="flex shrink-0 items-center gap-1.5 text-sm text-ink-mute hover:text-cinnabar-deep"
          >
            <Shuffle size={14} /> {u('nav.surprise')}
          </button>
        </div>
      </header>

      <section className="wrap mt-12 pb-16">
        {q.length === 0 && (
          <div className="border border-paper-edge bg-paper-card p-8">
            <p className="font-serif text-2xl text-ink-soft">
              {t({ zh: '知识图谱里有作品、人物、建筑、概念、材料、技法、课程、练习与策展——输入任意关键词开始。', en: 'The atlas holds works, people, buildings, concepts, materials, techniques, lessons, exercises and exhibitions — type anything.' })}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['光', '几何', '浮世绘', 'light', 'perspective', '包豪斯'].map(s => (
                <button key={s} onClick={() => setQ(s)} className="chip">{s}</button>
              ))}
            </div>
          </div>
        )}
        {groups.map(g => (
          <div key={g.type} className="mt-10">
            <div className="eyebrow mb-2">{typeLabelOf(g.type, u as (k: UiKey) => string)} · {g.items.length}</div>
            {g.items.map((h, i) => <EntityLine key={h.entity.id} e={h.entity} index={i} />)}
          </div>
        ))}
        {q.length > 0 && hits.length === 0 && (
          <p className="py-16 text-center font-serif text-2xl text-ink-mute">
            {t({ zh: '没有找到。也许它正等待被写进图谱——', en: 'Nothing found. Perhaps it is waiting to be written into the atlas —' })}
            <Link to="/about" className="link-editorial ml-2">{t({ zh: '内容即代码', en: 'content as code' })}</Link>
          </p>
        )}
      </section>
    </div>
  );
}
