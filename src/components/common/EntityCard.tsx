import type { Entity } from '../../content/kb';
import { getById } from '../../content/kb';
import { useLang } from '../../i18n/LanguageContext';
import type { UiKey } from '../../i18n/ui';
import { Link, entityPath } from '../../router/router';

/**
 * Editorial entity cards — deliberately NOT a uniform card grid (§20):
 * three layouts chosen by context. "line" is a typographic index row,
 * "figure" leads with an image, "text" is a pure editorial block.
 */

const TYPE_KEY: Record<string, UiKey> = {
  work: 'type.work', building: 'type.building', object: 'type.object',
  person: 'type.person', style: 'type.style', period: 'type.period',
  place: 'type.place', culture: 'type.culture', material: 'type.material',
  technique: 'type.technique', concept: 'type.concept', lesson: 'type.lesson',
  practice: 'type.practice', product: 'type.product', exhibition: 'type.exhibition',
  domain: 'type.domain', journey: 'type.journey',
};

export const typeLabelOf = (type: string, u: (k: UiKey) => string): string =>
  u(TYPE_KEY[type] ?? 'type.work');

export function EntityFigure({ e, index, tall }: { e: Entity; index?: number; tall?: boolean }) {
  const { t, u } = useLang();
  return (
    <Link to={entityPath(e)} className="group block">
      {e.image ? (
        <div className={`overflow-hidden bg-paper-deep ${tall ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
          <img
            src={e.image.url}
            alt={t(e.image.caption) || t(e.name)}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-museum group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <div className="flex aspect-[4/3] items-end border border-paper-edge bg-paper-deep p-5">
          <span className="font-serif text-4xl leading-none text-ink/30">{t(e.name).slice(0, 1)}</span>
        </div>
      )}
      <div className="mt-4">
        <div className="eyebrow mb-1.5">
          {index !== undefined && <span className="mr-2 tabular">{String(index + 1).padStart(2, '0')}</span>}
          {typeLabelOf(e.type, u)}
        </div>
        <h3 className="font-serif text-2xl leading-tight transition-colors group-hover:text-cinnabar-deep">
          {t(e.name)}
        </h3>
        {e.summary && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">{t(e.summary)}</p>}
      </div>
    </Link>
  );
}

/** Typographic index row — the "museum wall label" look. */
export function EntityLine({ e, index, meta }: { e: Entity; index?: number; meta?: string }) {
  const { t, u } = useLang();
  return (
    <Link
      to={entityPath(e)}
      className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 border-b border-paper-edge py-5 md:grid-cols-[3.5rem_1fr_auto] md:py-6"
    >
      <span className="index-num tabular">{index !== undefined ? String(index + 1).padStart(2, '0') : '·'}</span>
      <span>
        <span className="block font-serif text-2xl leading-tight transition-colors group-hover:text-cinnabar-deep md:text-3xl">
          {t(e.name)}
        </span>
        {e.tagline && <span className="mt-1 block text-sm text-ink-mute">{t(e.tagline)}</span>}
      </span>
      <span className="eyebrow text-right">{meta ?? typeLabelOf(e.type, u)}</span>
    </Link>
  );
}

export function EntityText({ e }: { e: Entity }) {
  const { t, u } = useLang();
  return (
    <Link to={entityPath(e)} className="group block border-t border-ink/15 pt-5">
      <div className="eyebrow mb-2">{typeLabelOf(e.type, u)}</div>
      <h3 className="font-serif text-2xl leading-snug transition-colors group-hover:text-cinnabar-deep">
        {t(e.name)}
      </h3>
      {e.summary && <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t(e.summary)}</p>}
    </Link>
  );
}

/** Inline chip linking to an entity. */
export function EntityChip({ id, label }: { id: string; label?: string }) {
  const { t } = useLang();
  const e = getById(id);
  if (!e) return null;
  return (
    <Link to={entityPath(e)} className="chip">
      {label ?? t(e.name)}
    </Link>
  );
}
