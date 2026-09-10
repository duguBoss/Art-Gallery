import { LESSONS } from '../content/kb';
import type { LessonEntity } from '../model/entity';
import { useLang } from '../i18n/LanguageContext';
import { loc, type L10n } from '../model';
import { Link } from '../router/router';

const PATHS: { id: LessonEntity['path']; name: L10n; lead: L10n }[] = [
  {
    id: 'foundations',
    name: loc('视觉基础', 'Visual Foundations'),
    lead: loc('色彩、构图、形态、空间、光、材料、排版、节奏、叙事——九门所有门类共享的底层功夫。',
      'Color, composition, form, space, light, material, typography, rhythm, narrative — the shared fundamentals.'),
  },
  {
    id: 'history',
    name: loc('艺术史', 'Art History'),
    lead: loc('不是年代背诵，是理解每一次风格突变在回答什么问题。',
      'Not dates to memorize — understanding the question each rupture answered.'),
  },
  {
    id: 'disciplines',
    name: loc('创作学科', 'Creative disciplines'),
    lead: loc('如何阅读建筑，以及在 AI 时代如何保有视觉判断力。',
      'How to read a building — and how to keep visual judgment in the AI age.'),
  },
];

export function LearnPage() {
  const { t, u } = useLang();

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

      <div className="wrap mt-16 space-y-20">
        {PATHS.map(path => {
          const lessons = LESSONS.filter(l => l.path === path.id).sort((a, b) => a.order - b.order);
          return (
            <section key={path.id}>
              <div className="mb-8 border-b border-ink/15 pb-6">
                <div className="eyebrow mb-2">
                  {path.id === 'foundations' ? '01' : path.id === 'history' ? '02' : '03'} · Path
                </div>
                <h2 className="font-serif text-4xl">{t(path.name)}</h2>
                <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-soft">{t(path.lead)}</p>
              </div>
              <div className="space-y-0">
                {lessons.map((l, i) => (
                  <Link key={l.id} to={`/entity/lesson/${l.slug}`}
                    className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-5 border-b border-paper-edge py-7 md:grid-cols-[4rem_1fr_10rem_auto]">
                    <span className="index-num tabular">{String(i + 1).padStart(2, '0')}</span>
                    <span>
                      <span className="block font-serif text-2xl leading-tight transition-colors group-hover:text-cinnabar-deep md:text-3xl">
                        {t(l.name)}
                      </span>
                      <span className="mt-1.5 block text-sm text-ink-mute">{t(l.summary)}</span>
                    </span>
                    <span className="hidden text-sm text-ink-mute md:block">{l.durationMin} {u('common.minutes')}</span>
                    <span className="eyebrow text-right">→</span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
