import { PRACTICES } from '../content/kb';
import { useLang } from '../i18n/LanguageContext';
import { loc } from '../model';
import { EntityLine } from '../components/common/EntityCard';

const KIND_LABEL: Record<string, { zh: string; en: string }> = {
  lighting: { zh: '光影', en: 'Lighting' },
  constraint: { zh: '约束', en: 'Constraint' },
  comparison: { zh: '对比', en: 'Comparison' },
  color: { zh: '色彩', en: 'Color' },
  composition: { zh: '构图', en: 'Composition' },
  observation: { zh: '观察', en: 'Observation' },
  'cross-style': { zh: '跨风格', en: 'Cross-style' },
  storyboard: { zh: '分镜', en: 'Storyboard' },
};

export function PracticePage() {
  const { t } = useLang();
  const items = PRACTICES.slice().sort((a, b) => (a.difficulty ?? 1) - (b.difficulty ?? 1));

  return (
    <div className="animate-fade-up">
      <header className="wrap pt-16 md:pt-24">
        <div className="eyebrow mb-4">Practice</div>
        <h1 className="text-display-lg">{t(loc('把手弄脏', 'Get your hands dirty'))}</h1>
        <p className="mt-5 max-w-2xl text-xl leading-relaxed text-ink-soft">
          {t(loc('视觉判断力是练出来的：十分钟到半小时一个练习，全部可以今天完成，全部免费。',
            'Visual judgment is trained: ten-to-thirty-minute exercises, all completable today, all free.'))}
        </p>
      </header>
      <section className="wrap mt-14 pb-8">
        <div>
          {items.map((p, i) => (
            <EntityLine
              key={p.id}
              e={p}
              index={i}
              meta={`${p.minutes}′ · ${t(loc(KIND_LABEL[p.kind]?.zh ?? '', KIND_LABEL[p.kind]?.en ?? p.kind))}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
