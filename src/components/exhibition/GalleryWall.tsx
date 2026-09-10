import type { Entity } from '../../content/kb';
import { useLang } from '../../i18n/LanguageContext';
import { Link, entityPath } from '../../router/router';

const RATIOS = ['aspect-[3/4]', 'aspect-[4/5]', 'aspect-[4/3]', 'aspect-[4/5]', 'aspect-[3/4]', 'aspect-[4/3]'];

/**
 * Asymmetric full-bleed image wall (master plan §16). Not a uniform
 * 3-col grid: a hanging salon of varied ratios via CSS columns,
 * like pictures hung on a museum wall.
 */
export function GalleryWall({ items }: { items: Entity[] }) {
  const { t } = useLang();
  return (
    <div className="columns-2 gap-4 md:columns-3 md:gap-6 [&>*]:mb-6">
      {items.map((e, i) => (
        <Link key={e.id} to={entityPath(e)} className="group block break-inside-avoid">
          {e.image ? (
            <div className={`overflow-hidden bg-paper-deep ${RATIOS[i % RATIOS.length]}`}>
              <img
                src={e.image.url}
                alt={t(e.image.caption) || t(e.name)}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-museum group-hover:scale-[1.04]"
              />
            </div>
          ) : (
            <div className={`flex items-end border border-paper-edge bg-paper-deep p-5 ${RATIOS[i % RATIOS.length]}`}>
              <span className="font-serif text-5xl text-ink/25">{t(e.name).slice(0, 1)}</span>
            </div>
          )}
          <div className="mt-3 flex items-baseline justify-between gap-3">
            <span className="font-serif text-xl leading-tight transition-colors group-hover:text-cinnabar-deep">
              {t(e.name)}
            </span>
            <span className="index-num shrink-0 tabular">{String(i + 1).padStart(2, '0')}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
