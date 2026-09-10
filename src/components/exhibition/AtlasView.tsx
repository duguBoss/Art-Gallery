import { DOMAINS } from '../../content/kb';
import type { DomainEntity } from '../../model/entity';
import { useLang } from '../../i18n/LanguageContext';
import { Glyph } from '../common/Glyph';
import { Link, entityPath } from '../../router/router';

/**
 * The knowledge atlas — the 14 domains as an editorial index
 * (master plan §10 / §17). Each row carries its own accent color and
 * glyph: content determines presentation.
 */
export function AtlasView() {
  const { t } = useLang();
  return (
    <div className="border-t border-ink/15">
      {DOMAINS.map((d: DomainEntity, i) => (
        <Link
          key={d.id}
          to={entityPath(d)}
          className="group grid grid-cols-[2.5rem_3rem_1fr_auto] items-center gap-4 border-b border-paper-edge py-6 transition-colors hover:bg-paper-card md:grid-cols-[4rem_4rem_1fr_12rem_auto] md:gap-8 md:py-8"
        >
          <span className="index-num tabular">{String(i + 1).padStart(2, '0')}</span>
          <span
            className="flex h-12 w-12 items-center justify-center border transition-transform duration-500 group-hover:scale-110"
            style={{ borderColor: d.accent, color: d.accent }}
          >
            <Glyph name={d.glyph} size={22} />
          </span>
          <span>
            <span className="block font-serif text-2xl leading-tight transition-colors group-hover:text-cinnabar-deep md:text-4xl">
              {t(d.name)}
            </span>
            <span className="mt-1.5 line-clamp-1 block text-sm text-ink-mute md:line-clamp-2">
              {t(d.summary)}
            </span>
          </span>
          <span className="hidden text-xs text-ink-mute md:block">
            {d.disciplines.slice(0, 3).map(x => t(x.name)).join(' · ')}
          </span>
          <span className="eyebrow text-right">{d.disciplines.length} →</span>
        </Link>
      ))}
    </div>
  );
}
