import type { Entity, Neighbor } from '../../content/kb';
import { findBySlug, neighborGroups, SOURCES_BY_ID, getById, prerequisitesOf, recommendedNextOf, learningLevel } from '../../content/kb';
import type { LessonEntity, PracticeEntity, ProductEntity, DomainEntity, JourneyEntity } from '../../model/entity';
import { loc } from '../../model';
import { useLang } from '../../i18n/LanguageContext';
import { Link, entityPath } from '../../router/router';
import { DetailAnalysis } from '../exhibition/DetailAnalysis';
import { NetworkGraph } from '../exhibition/NetworkGraph';
import { Glyph } from '../common/Glyph';
import { typeLabelOf } from '../common/EntityCard';
import type { UiKey } from '../../i18n/ui';

function yearLabel(e: Entity): string {
  const w = e as { yearStart?: number; yearEnd?: number; birthYear?: number; deathYear?: number };
  if (w.yearStart !== undefined) {
    const y = (n: number) => (n < 0 ? `公元前 ${Math.abs(n)}` : `${n}`);
    return w.yearEnd && w.yearEnd !== w.yearStart ? `${y(w.yearStart)}–${y(w.yearEnd)}` : y(w.yearStart);
  }
  if (w.birthYear !== undefined) return `${w.birthYear}–${w.deathYear ?? ''}`;
  return '';
}

function NeighborClusters({ id }: { id: string }) {
  const { t, lang, u } = useLang();
  const groups = neighborGroups(id, lang);
  if (groups.length === 0) return null;
  return (
    <div className="space-y-8">
      <h3 className="eyebrow border-b border-paper-edge pb-3">{u('common.related')}</h3>
      {groups.map(g => (
        <div key={g.label}>
          <div className="mb-3 text-sm font-semibold text-ink">{g.label}</div>
          <div className="flex flex-wrap gap-2">
            {g.items.slice(0, 12).map((n: Neighbor) => (
              <Link key={n.entity.id + n.type + n.dir} to={entityPath(n.entity)} className="chip">
                {t(n.entity.name)}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Sources({ ids }: { ids?: string[] }) {
  const { u } = useLang();
  if (!ids?.length) return null;
  return (
    <div className="border-t border-paper-edge pt-4">
      <div className="eyebrow mb-2">{u('common.sources')}</div>
      <ul className="space-y-1.5 text-sm">
        {ids.map(id => {
          const s = SOURCES_BY_ID.get(id);
          if (!s) return null;
          return (
            <li key={id}>
              {s.url ? (
                <a href={s.url} target="_blank" rel="noreferrer" className="link-editorial">{s.label}</a>
              ) : (
                <span className="text-ink-soft">{s.label}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Type-specific bodies
// ---------------------------------------------------------------------------
function LessonBody({ e }: { e: LessonEntity }) {
  const { t, u } = useLang();
  const level = learningLevel(e.path);
  const prerequisites = prerequisitesOf(e.id);
  const next = recommendedNextOf(e.id);
  const dots = (n: number, max: number) => `${'●'.repeat(n)}${'○'.repeat(max - n)}`;
  return (
    <article>
      <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-ink-mute">
        <span className="chip">
          L{level.index} · {t(level.name)}
        </span>
        {e.durationMin && <span className="chip">{e.durationMin} {u('common.minutes')}</span>}
        {e.difficulty !== undefined && (
          <span className="chip" aria-label={u('common.difficulty')}>
            {u('common.difficulty')} <span className="tracking-[0.2em] text-cinnabar">{dots(e.difficulty, 5)}</span>
          </span>
        )}
      </div>

      {prerequisites.length > 0 && (
        <div className="mb-10">
          <h3 className="eyebrow mb-3">{u('lesson.prerequisites')}</h3>
          <div className="flex flex-wrap gap-2">
            {prerequisites.map(p => (
              <Link key={p.id} to={entityPath(p)} className="chip">
                {t(p.name)}
              </Link>
            ))}
          </div>
        </div>
      )}

      {e.steps && (
        <ol className="space-y-10">
          {e.steps.map((s, i) => (
            <li key={i} className="grid gap-3 md:grid-cols-[4rem_1fr]">
              <span className="font-serif text-5xl leading-none text-ink/15 tabular">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="font-serif text-2xl">{t(s.title)}</h3>
                <p className="mt-2 max-w-measure text-lg leading-relaxed text-ink-soft">{t(s.body)}</p>
              </div>
            </li>
          ))}
        </ol>
      )}
      {e.keyPrinciples && (
        <div className="mt-14 border-t border-ink/15 pt-8">
          <h3 className="eyebrow mb-5">关键原则 · Key principles</h3>
          <ul className="space-y-3">
            {e.keyPrinciples.map((p, i) => (
              <li key={i} className="flex gap-4 font-serif text-xl leading-snug">
                <span className="text-cinnabar">—</span> {t(p)}
              </li>
            ))}
          </ul>
        </div>
      )}
      {e.outcomes && e.outcomes.length > 0 && (
        <div className="mt-14 border-t border-ink/15 pt-8">
          <h3 className="eyebrow mb-5">{u('lesson.outcomes')}</h3>
          <ul className="space-y-3">
            {e.outcomes.map((o, i) => (
              <li key={i} className="flex gap-4 text-lg leading-relaxed text-ink-soft">
                <span className="text-cinnabar">✓</span> {t(o)}
              </li>
            ))}
          </ul>
        </div>
      )}
      {next.length > 0 && (
        <div className="mt-14 border-t border-ink/15 pt-8">
          <h3 className="eyebrow mb-5">{u('lesson.next')}</h3>
          <div className="flex flex-wrap gap-2">
            {next.map(n => (
              <Link key={n.id} to={entityPath(n)} className="chip">
                {t(n.name)} →
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

/** Journey = an ordered editorial thread of stops (master plan §14b). */
function JourneyBody({ e }: { e: JourneyEntity }) {
  const { t, u } = useLang();
  return (
    <article>
      <h2 className="eyebrow mb-10">{u('journey.stops')}</h2>
      <ol className="relative space-y-14 border-l border-ink/20 pl-8 md:pl-12">
        {e.stops.map((stop, i) => {
          const entities = stop.entityIds.map(id => getById(id)).filter((x): x is Entity => !!x);
          return (
            <li key={stop.id} className="relative">
              <span
                className="absolute -left-[2.35rem] top-1 flex h-7 w-7 items-center justify-center rounded-full border border-ink/30 bg-paper text-xs tabular md:-left-[3.35rem]"
                style={e.accent ? { borderColor: e.accent, color: e.accent } : undefined}
              >
                {i + 1}
              </span>
              <h3 className="font-serif text-2xl leading-snug md:text-3xl">{t(stop.title)}</h3>
              {stop.lead && <p className="mt-2 max-w-measure text-lg italic leading-relaxed text-ink-soft">{t(stop.lead)}</p>}
              {stop.narrative && (
                <p className="mt-4 max-w-measure text-lg leading-relaxed text-ink-soft">{t(stop.narrative)}</p>
              )}
              {entities.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {entities.map(en => (
                    <Link key={en.id} to={entityPath(en)} className="chip">
                      {t(en.name)}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </article>
  );
}

function PracticeBody({ e }: { e: PracticeEntity }) {
  const { t, u } = useLang();
  return (
    <article>
      <div className="mb-8 flex flex-wrap gap-3">
        <span className="chip">{e.minutes} {u('common.minutes')}</span>
        <span className="chip">{u('common.difficulty')} {'●'.repeat(e.difficulty ?? 1)}{'○'.repeat(3 - (e.difficulty ?? 1))}</span>
      </div>
      <h3 className="eyebrow mb-3">任务 · Brief</h3>
      <p className="max-w-measure text-lg leading-relaxed text-ink">{t(e.brief)}</p>
      {e.prompts && (
        <div className="mt-8 space-y-3">
          <h3 className="eyebrow">提示 · Prompts</h3>
          {e.prompts.map((p, i) => (
            <p key={i} className="flex gap-3 border-l-2 border-ink/20 pl-4 text-base leading-relaxed text-ink-soft">
              <span className="index-num">{i + 1}</span> {t(p)}
            </p>
          ))}
        </div>
      )}
    </article>
  );
}

function ProductBody({ e }: { e: ProductEntity }) {
  const { t } = useLang();
  return (
    <article>
      <div className="flex items-baseline gap-4 border-b border-ink/15 pb-6">
        <span className="font-serif text-5xl text-ink">¥{e.priceCny}</span>
        <span className="text-sm text-ink-mute">≈ ${e.priceUsd}</span>
      </div>
      {e.includes && (
        <div className="mt-6">
          <h3 className="eyebrow mb-4">包含 · Includes</h3>
          <ul className="space-y-2.5">
            {e.includes.map((it, i) => (
              <li key={i} className="flex gap-3 text-base text-ink-soft">
                <span className="text-cinnabar">✓</span> {t(it)}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-8 flex flex-wrap gap-3">
        {e.compatibility && <span className="chip">{t(e.compatibility)}</span>}
        {e.license && <span className="chip">{t(e.license)}</span>}
      </div>
      <a href={e.purchaseUrl ?? '#'} className="btn-primary mt-8">
        {t(e.category)} · 获取 →
      </a>
      <p className="mt-6 max-w-measure border-l-2 border-sage pl-4 text-sm leading-relaxed text-ink-mute">
        {t(e.body?.[0] ?? { zh: '', en: '' })}
      </p>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------
export function EntityPage({ type, slug }: { type: string; slug: string }) {
  const { t, u, lang } = useLang();
  const entity = findBySlug(slug, type as Entity['type']);

  if (!entity) {
    return (
      <div className="wrap py-32 text-center">
        <p className="font-serif text-4xl">404</p>
        <Link to="/" className="link-editorial mt-4 inline-block">← {u('nav.home')}</Link>
      </div>
    );
  }

  const isLesson = entity.type === 'lesson';
  const isPractice = entity.type === 'practice';
  const isProduct = entity.type === 'product';
  const isDomain = entity.type === 'domain';
  const isJourney = entity.type === 'journey';
  const hasBlocks = !!entity.blocks?.length;

  return (
    <div className="animate-fade-up">
      {/* ------------------------------------------------ hero header */}
      <header className="wrap pt-14 md:pt-20">
        <div className="grid gap-10 md:grid-cols-12 md:gap-14">
          <div className={entity.image ? 'md:col-span-7' : 'md:col-span-10'}>
            <div className="eyebrow mb-4 flex items-center gap-3">
              <span>{typeLabelOf(entity.type, u as (k: UiKey) => string)}</span>
              {yearLabel(entity) && <>
                <span className="h-px w-6 bg-ink/25" />
                <span className="tabular">{yearLabel(entity)}</span>
              </>}
            </div>
            <h1 className="text-display-lg text-balance">{t(entity.name)}</h1>
            {entity.tagline && <p className="mt-4 font-serif text-2xl italic text-ink-soft">{t(entity.tagline)}</p>}
            {entity.summary && <p className="mt-6 max-w-measure text-xl leading-relaxed text-ink-soft">{t(entity.summary)}</p>}
          </div>

          {/* hero image for portrait works */}
          {entity.image && (entity.image.ratio === 'portrait' || entity.type === 'person') && (
            <div className="md:col-span-5">
              <div className="overflow-hidden bg-paper-deep">
                <img src={entity.image.url} alt={t(entity.image.caption) || t(entity.name)} className="w-full object-cover" />
              </div>
            </div>
          )}
        </div>

        {entity.image && entity.image.ratio !== 'portrait' && entity.type !== 'person' && (
          <div className="mt-12 overflow-hidden bg-paper-deep">
            <img src={entity.image.url} alt={t(entity.image.caption) || t(entity.name)} className="max-h-[60vh] w-full object-cover" />
          </div>
        )}
      </header>

      {/* ------------------------------------------------ body + rail */}
      <div className="wrap mt-16 grid gap-14 md:grid-cols-12 md:gap-16">
        <main className="md:col-span-8">
          {entity.body && !isLesson && !isPractice && !isProduct && (
            <div className="mb-14 space-y-5">
              {entity.body.map((p, i) => (
                <p key={i} className="max-w-measure text-lg leading-relaxed text-ink-soft">{t(p)}</p>
              ))}
            </div>
          )}

          {hasBlocks && <DetailAnalysis blocks={entity.blocks!} />}
          {isLesson && <LessonBody e={entity as LessonEntity} />}
          {isPractice && <PracticeBody e={entity as PracticeEntity} />}
          {isProduct && <ProductBody e={entity as ProductEntity} />}

          {isDomain && <DomainBody e={entity as unknown as DomainEntity} />}
          {isJourney && <JourneyBody e={entity as JourneyEntity} />}

          {/* graph for core cultural entities */}
          {(entity.type === 'work' || entity.type === 'building' || entity.type === 'person' || entity.type === 'style') && (
            <div className="mt-20">
              <h3 className="eyebrow mb-6">{t(loc('关系星团', 'Relation constellation'))}</h3>
              <NetworkGraph center={entity} />
            </div>
          )}
        </main>

        {/* right rail */}
        <aside className="space-y-10 md:col-span-4">
          {entity.facts && entity.facts.length > 0 && (
            <div>
              <h3 className="eyebrow mb-2">{u('common.facts')}</h3>
              <dl>
                {entity.facts.map((f, i) => (
                  <div key={i} className="fact-row">
                    <dt>{t(f.label)}</dt>
                    <dd>{t(f.value)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
          <NeighborClusters id={entity.id} />
          <Sources ids={entity.sources} />
        </aside>
      </div>
    </div>
  );
}

function DomainBody({ e }: { e: DomainEntity }) {
  const { t } = useLang();
  return (
    <div>
      {e.body?.map((p, i) => (
        <p key={i} className="mb-5 max-w-measure text-lg leading-relaxed text-ink-soft">{t(p)}</p>
      ))}
      <h3 className="eyebrow mt-10 mb-5">
        {t({ zh: '下辖学科', en: 'Disciplines' })}
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {e.disciplines.map(d => (
          <div key={d.id} className="flex items-center gap-3 border border-paper-edge bg-paper-card px-4 py-3">
            <Glyph name={e.glyph} size={16} className="shrink-0" />
            <span className="font-serif text-lg">{t(d.name)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
