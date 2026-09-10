import { timeline } from '../../content/kb';
import type { Entity } from '../../content/kb';
import { useLang } from '../../i18n/LanguageContext';
import { Link, entityPath } from '../../router/router';

const fmtYear = (y: number) => (y < 0 ? `${Math.abs(y)} BCE` : y < 1000 ? `${y}` : `${y}`);

/**
 * Horizontal timeline (master plan §12 / §17). Works and buildings with
 * dates are placed along one scrollable axis; eras are labelled above.
 */
export function TimelineView({ filter, limit = 24 }: { filter?: (e: Entity) => boolean; limit?: number }) {
  const { t } = useLang();
  const entries = timeline(filter).slice(0, limit);
  const min = entries[0]?.year ?? -500;
  const max = entries[entries.length - 1]?.year ?? 2000;
  const span = Math.max(max - min, 1);

  return (
    <div className="overflow-x-auto pb-4">
      <div className="relative min-w-[900px] px-2">
        {/* axis */}
        <div className="relative h-px bg-ink/25" />
        <div className="relative h-56">
          {entries.map(({ entity, year }, i) => {
            const pct = ((year - min) / span) * 100;
            const up = i % 2 === 0;
            return (
              <div
                key={entity.id}
                className="absolute top-0 w-40 -translate-x-1/2"
                style={{ left: `${pct}%` }}
              >
                <div className={`absolute left-1/2 h-10 w-px bg-ink/20 ${up ? 'top-28' : 'top-12'}`} />
                <div className={`absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cinnabar ${up ? 'top-[9.6rem]' : 'top-[2.6rem]'}`} />
                <Link
                  to={entityPath(entity)}
                  className={`group absolute left-1/2 w-40 -translate-x-1/2 text-center ${up ? 'top-0' : 'top-16'}`}
                >
                  <div className="font-mono text-[11px] text-ink-mute tabular">{fmtYear(year)}</div>
                  <div className="mt-1 font-serif text-lg leading-tight transition-colors group-hover:text-cinnabar-deep">
                    {t(entity.name)}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
