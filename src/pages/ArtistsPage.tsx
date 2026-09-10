import { getByType } from '../content/kb';
import type { PersonEntity } from '../model/entity';
import { useLang } from '../i18n/LanguageContext';
import { loc } from '../model';
import { EntityFigure } from '../components/common/EntityCard';

export function ArtistsPage() {
  const { t } = useLang();
  const people = getByType<PersonEntity>('person').sort((a, b) => (a.birthYear ?? 0) - (b.birthYear ?? 0));

  return (
    <div className="animate-fade-up">
      <header className="wrap pt-16 md:pt-24">
        <div className="eyebrow mb-4">Artists</div>
        <h1 className="text-display-lg">{t(loc('艺术家与建筑师', 'Artists & architects'))}</h1>
        <p className="mt-5 max-w-2xl text-xl leading-relaxed text-ink-soft">
          {t(loc('十三位改变了视觉语言的人。他们不是孤立的天才——点进任意一位，看他师从谁、反驳谁、又被谁继承。',
            'Thirteen people who changed visual language — not isolated geniuses. Open any profile to see whom they learned from, refuted, and inspired.'))}
        </p>
      </header>
      <section className="wrap mt-16 pb-8">
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {people.map((p, i) => <EntityFigure key={p.id} e={p} index={i} tall />)}
        </div>
      </section>
    </div>
  );
}
