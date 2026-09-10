import { getByType } from '../content/kb';
import type { StyleEntity } from '../model/entity';
import { useLang } from '../i18n/LanguageContext';
import { loc } from '../model';
import { EntityFigure, EntityLine } from '../components/common/EntityCard';
import { SectionHeading } from '../components/common/SectionHeading';

export function StylesPage() {
  const { t } = useLang();
  const movements = getByType<StyleEntity>('movement').sort((a, b) => (a.yearStart ?? 0) - (b.yearStart ?? 0));
  const contemporary = getByType<StyleEntity>('style').sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0));

  return (
    <div className="animate-fade-up">
      <header className="wrap pt-16 md:pt-24">
        <div className="eyebrow mb-4">Styles</div>
        <h1 className="text-display-lg">{t(loc('风格', 'Styles & movements'))}</h1>
        <p className="mt-5 max-w-2xl text-xl leading-relaxed text-ink-soft">
          {t(loc('上半区是历史流派——它们彼此回应、反叛、继承；下半区是今天创作者正在使用的视觉风格，每一个都连着自己的历史源头。',
            'Historical movements above — answering, rebelling, inheriting. Contemporary creator styles below, each linked back to its roots.'))}
        </p>
      </header>

      <section className="wrap mt-16">
        <SectionHeading
          eyebrow={t(loc('历史流派', 'Historical movements'))}
          title={t(loc('一部互相回应的历史', 'A history of replies'))}
        />
        <div>
          {movements.map((m, i) => (
            <EntityLine key={m.id} e={m} index={i}
              meta={m.yearStart ? `${m.yearStart}${m.yearEnd ? `–${m.yearEnd}` : '–'}` : undefined} />
          ))}
        </div>
      </section>

      <section className="wrap mt-24">
        <SectionHeading
          eyebrow={t(loc('当代创作者风格', 'Contemporary creator styles'))}
          title={t(loc('今天正在被使用的视觉语言', 'Visual languages in use today'))}
        />
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {contemporary.map((s, i) => <EntityFigure key={s.id} e={s} index={i} />)}
        </div>
      </section>
    </div>
  );
}
