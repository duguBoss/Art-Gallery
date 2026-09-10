import type { Entity } from '../../content/kb';
import { useLang } from '../../i18n/LanguageContext';
import { Link, entityPath } from '../../router/router';

/** Side-by-side comparison (master plan §12 comparison mode). */
export function CompareView({ a, b }: { a: Entity; b: Entity }) {
  const { t } = useLang();
  const cols = [a, b];
  return (
    <div className="grid gap-px border border-paper-edge bg-paper-edge md:grid-cols-2">
      {cols.map(e => (
        <Link key={e.id} to={entityPath(e)} className="group block bg-paper p-6 md:p-10">
          {e.image && (
            <div className="overflow-hidden bg-paper-deep">
              <img
                src={e.image.url}
                alt={t(e.image.caption) || t(e.name)}
                loading="lazy"
                className="max-h-80 w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
          )}
          <h3 className="mt-6 font-serif text-3xl leading-tight transition-colors group-hover:text-cinnabar-deep">
            {t(e.name)}
          </h3>
          {e.tagline && <p className="mt-1 text-sm italic text-ink-mute">{t(e.tagline)}</p>}
          {e.summary && <p className="mt-4 leading-relaxed text-ink-soft">{t(e.summary)}</p>}
          {e.facts && (
            <dl className="mt-6">
              {e.facts.slice(0, 4).map((f, i) => (
                <div key={i} className="fact-row">
                  <dt>{t(f.label)}</dt>
                  <dd>{t(f.value)}</dd>
                </div>
              ))}
            </dl>
          )}
        </Link>
      ))}
    </div>
  );
}
