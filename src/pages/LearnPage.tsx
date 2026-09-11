import { useState } from 'react';
import { LEARNING_LEVELS, lessonsByLevel, journeys } from '../content/kb';
import type { Entity } from '../content/kb';
import type { JourneyEntity } from '../model/entity';
import { loc, type L10n } from '../model';
import { useLang } from '../i18n/LanguageContext';
import { Link, entityPath } from '../router/router';
import type { UiKey } from '../i18n/ui';

/**
 * Learn navigator — master plan §14.
 * Not a course marketplace: a seven-level capability ladder (model/learning.ts),
 * five intent doors that drop the visitor onto the right rung, and an
 * editorial section of cross-discipline learning journeys.
 */

const GUIDE_DOORS: { target: string; title: UiKey; desc: UiKey }[] = [
  { target: 'level-awareness', title: 'learn.guide.beginner', desc: 'learn.guide.beginnerDesc' },
  { target: 'level-language', title: 'learn.guide.design', desc: 'learn.guide.designDesc' },
  { target: 'lesson-read-photo', title: 'learn.guide.photo', desc: 'learn.guide.photoDesc' },
  { target: 'lesson-read-film', title: 'learn.guide.film', desc: 'learn.guide.filmDesc' },
  { target: 'lesson-ai-literacy', title: 'learn.guide.ai', desc: 'learn.guide.aiDesc' },
];

function LessonRow({ e, index, highlighted }: { e: Entity; index: number; highlighted: boolean }) {
  const { t, u } = useLang();
  const difficulty = (e as { difficulty?: number }).difficulty;
  return (
    <div
      id={e.id}
      className={`scroll-mt-28 transition-colors duration-700 ${highlighted ? 'bg-cinnabar/5 ring-1 ring-inset ring-cinnabar/40' : ''}`}
    >
      <Link
        to={entityPath(e)}
        className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-5 border-b border-paper-edge py-7 md:grid-cols-[4rem_1fr_12rem_auto]"
      >
        <span className="index-num tabular">{String(index + 1).padStart(2, '0')}</span>
        <span>
          <span className="block font-serif text-2xl leading-tight transition-colors group-hover:text-cinnabar-deep md:text-3xl">
            {t(e.name)}
          </span>
          {e.summary && <span className="mt-1.5 block text-sm text-ink-mute">{t(e.summary)}</span>}
        </span>
        <span className="hidden items-center gap-3 text-sm text-ink-mute md:flex">
          {difficulty !== undefined && (
            <span className="tracking-[0.2em] text-cinnabar/70" aria-label={u('common.difficulty')}>
              {'●'.repeat(difficulty)}{'○'.repeat(5 - difficulty)}
            </span>
          )}
          <span className="tabular">{(e as { durationMin?: number }).durationMin} {u('common.minutes')}</span>
        </span>
        <span className="eyebrow text-right">→</span>
      </Link>
    </div>
  );
}

function JourneyRow({ j, index }: { j: JourneyEntity; index: number }) {
  const { t } = useLang();
  return (
    <Link to={entityPath(j)} className="group block border-t border-ink/15 pt-8">
      <div className="grid gap-4 md:grid-cols-[5rem_1fr_14rem] md:items-baseline md:gap-10">
        <span className="index-num tabular">{String(index + 1).padStart(2, '0')}</span>
        <span>
          <span className="mb-2 flex items-center gap-3">
            {j.accent && <span className="inline-block h-2.5 w-2.5" style={{ backgroundColor: j.accent }} />}
            <span className="eyebrow">{j.stops.length} {t({ zh: '站', en: 'stops' } as L10n)}</span>
          </span>
          <span className="block font-serif text-2xl leading-snug transition-colors group-hover:text-cinnabar-deep md:text-4xl">
            {t(j.name)}
          </span>
          {j.tagline && <span className="mt-2 block text-base text-ink-mute">{t(j.tagline)}</span>}
        </span>
        <span className="eyebrow hidden text-right md:block">
          {t({ zh: '踏上旅程', en: 'Begin journey' } as L10n)} →
        </span>
      </div>
    </Link>
  );
}

export function LearnPage() {
  const { t, u } = useLang();
  const [flashId, setFlashId] = useState<string | null>(null);

  const jumpTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setFlashId(id);
    window.setTimeout(() => setFlashId(cur => (cur === id ? null : cur)), 2000);
  };

  return (
    <div className="animate-fade-up">
      <header className="wrap pt-16 md:pt-24">
        <div className="eyebrow mb-4">Learn</div>
        <h1 className="text-display-lg">{t(loc('像逛博物馆一样学习', 'Learn like wandering a museum'))}</h1>
        <p className="mt-5 max-w-2xl text-xl leading-relaxed text-ink-soft">
          {t(loc('没有课程市场、没有付费墙、没有完课压力。每一课都从观看真实作品开始，以一个小练习结束。',
            'No course marketplace, no paywalls, no completion pressure. Every lesson starts with real looking and ends with a small exercise.'))}
        </p>
        <p className="mt-4 font-serif text-xl italic text-cinnabar">{u('common.knowledgeFree')}</p>
      </header>

      {/* ------------------------------------------------ intent doors */}
      <section className="wrap mt-16">
        <h2 className="eyebrow mb-4">{u('learn.guideTitle')}</h2>
        <p className="mb-8 max-w-2xl text-lg leading-relaxed text-ink-soft">{u('learn.guideLead')}</p>
        <div className="grid gap-px border border-paper-edge bg-paper-edge sm:grid-cols-2 lg:grid-cols-5">
          {GUIDE_DOORS.map(door => (
            <button
              key={door.target}
              type="button"
              onClick={() => jumpTo(door.target)}
              className="group bg-paper-card px-6 py-7 text-left transition-colors hover:bg-paper-deep"
            >
              <span className="block font-serif text-2xl leading-tight transition-colors group-hover:text-cinnabar-deep">
                {u(door.title)}
              </span>
              <span className="mt-2 block text-sm text-ink-mute">{u(door.desc)}</span>
              <span className="eyebrow mt-4 block opacity-0 transition-opacity group-hover:opacity-100">↓</span>
            </button>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------ the ladder */}
      <section className="wrap mt-24">
        <div className="mb-12 max-w-2xl">
          <h2 className="font-serif text-4xl md:text-5xl">{u('learn.ladderTitle')}</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{u('learn.ladderLead')}</p>
        </div>

        <div className="space-y-16">
          {LEARNING_LEVELS.map(level => {
            const lessons = lessonsByLevel(level.id);
            if (lessons.length === 0) return null;
            return (
              <section key={level.id} id={`level-${level.id}`} className="scroll-mt-24">
                <div className="mb-6 grid gap-3 border-b border-ink/15 pb-6 md:grid-cols-[5rem_18rem_1fr] md:items-end md:gap-10">
                  <span className="font-serif text-6xl leading-none text-ink/20 tabular">
                    L{level.index}
                  </span>
                  <h3 className="font-serif text-3xl md:text-4xl">{t(level.name)}</h3>
                  <p className="text-base leading-relaxed text-ink-mute md:pb-1">{t(level.lead)}</p>
                </div>
                <div>
                  {lessons.map((l, i) => (
                    <LessonRow key={l.id} e={l} index={i} highlighted={flashId === l.id} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------ journeys */}
      <section className="wrap mt-28 mb-24">
        <div className="mb-12 max-w-2xl">
          <div className="eyebrow mb-3">{u('type.journey')}</div>
          <h2 className="font-serif text-4xl md:text-5xl">{u('learn.journeysTitle')}</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{u('learn.journeysLead')}</p>
        </div>
        <div className="space-y-8">
          {journeys().map((j, i) => (
            <JourneyRow key={j.id} j={j as JourneyEntity} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
