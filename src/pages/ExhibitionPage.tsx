import { findBySlug, getById } from '../content/kb';
import type { ExhibitionEntity } from '../model/entity';
import { useLang } from '../i18n/LanguageContext';
import { Link } from '../router/router';
import { EntityFigure, EntityLine } from '../components/common/EntityCard';

export function ExhibitionPage({ slug }: { slug: string }) {
  const { t, u } = useLang();
  const ex = findBySlug(slug, 'exhibition') as ExhibitionEntity | undefined;

  if (!ex) {
    return (
      <div className="wrap py-32 text-center">
        <p className="font-serif text-4xl">404</p>
        <Link to="/" className="link-editorial mt-4 inline-block">← {u('nav.home')}</Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-up">
      {/* hero */}
      <header className="wrap pt-14 md:pt-20">
        <div className="eyebrow mb-4">{u('type.exhibition')}</div>
        <h1 className="text-display-lg max-w-4xl text-balance">{t(ex.name)}</h1>
        {ex.tagline && <p className="mt-4 font-serif text-2xl italic text-ink-soft">{t(ex.tagline)}</p>}
        <p className="mt-6 max-w-measure text-xl leading-relaxed text-ink-soft">{t(ex.summary)}</p>
        {ex.image && (
          <div className="mt-12 overflow-hidden bg-paper-deep">
            <img src={ex.image.url} alt="" className="max-h-[55vh] w-full object-cover" />
          </div>
        )}
      </header>

      {/* sections */}
      <div className="wrap mt-20 space-y-24">
        {ex.sections.map((s, i) => {
          const entities = s.entityIds
            .map(id => getById(id))
            .filter((x): x is NonNullable<typeof x> => !!x);
          const visual = entities.filter(e => !!e.image);
          return (
            <section key={s.id}>
              <div className="mb-8 grid gap-4 border-b border-ink/15 pb-6 md:grid-cols-12">
                <div className="md:col-span-8">
                  <div className="index-num mb-2 tabular">{String(i + 1).padStart(2, '0')}</div>
                  <h2 className="font-serif text-3xl md:text-4xl">{t(s.title)}</h2>
                  {s.lead && <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-soft">{t(s.lead)}</p>}
                </div>
                {s.narrative && (
                  <p className="border-l-2 border-cinnabar pl-5 text-base italic leading-relaxed text-ink-soft md:col-span-4">
                    {t(s.narrative)}
                  </p>
                )}
              </div>
              {visual.length >= 2 ? (
                <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                  {entities.map((e, j) => (
                    <EntityFigure key={e.id} e={e} index={j} />
                  ))}
                </div>
              ) : (
                <div>
                  {entities.map((e, j) => (
                    <EntityLine key={e.id} e={e} index={j} />
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
