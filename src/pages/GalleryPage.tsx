import { useState } from 'react';
import { getByType } from '../content/kb';
import type { WorkEntity } from '../model/entity';
import { useLang } from '../i18n/LanguageContext';
import { loc } from '../model';
import { GalleryWall } from '../components/exhibition/GalleryWall';

const FILTERS = [
  { id: 'all', label: loc('全部', 'All') },
  { id: 'work', label: loc('绘画与雕塑', 'Painting & sculpture') },
  { id: 'building', label: loc('建筑', 'Architecture') },
  { id: 'object', label: loc('物品设计', 'Objects') },
] as const;

export function GalleryPage() {
  const { t } = useLang();
  const [filter, setFilter] = useState<string>('all');
  const all = getByType<WorkEntity>('work')
    .concat(getByType<WorkEntity>('building'))
    .concat(getByType<WorkEntity>('object'))
    .filter(e => filter === 'all' || e.type === filter)
    .sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0));

  return (
    <div className="animate-fade-up">
      <header className="wrap pt-16 md:pt-24">
        <div className="eyebrow mb-4">Gallery</div>
        <h1 className="text-display-lg">{t(loc('展厅', 'The Gallery'))}</h1>
        <p className="mt-5 max-w-2xl text-xl leading-relaxed text-ink-soft">
          {t(loc('不是网格，是一面沙龙式展墙：绘画、雕塑、建筑与物品按策展重量悬挂。',
            'Not a grid — a salon wall: paintings, sculpture, architecture and objects hung by curatorial weight.'))}
        </p>
        <div className="mt-10 flex flex-wrap gap-2 border-b border-ink/15 pb-8">
          {FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`border px-5 py-2 text-sm transition-colors ${
                filter === f.id
                  ? 'border-ink bg-ink text-paper'
                  : 'border-paper-edge text-ink-soft hover:border-ink/40'
              }`}
            >
              {t(f.label)}
            </button>
          ))}
        </div>
      </header>
      <div className="wrap mt-12 pb-8">
        <GalleryWall items={all} />
      </div>
    </div>
  );
}
