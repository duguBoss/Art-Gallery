import { getByType } from '../content/kb';
import { useLang } from '../i18n/LanguageContext';
import { loc } from '../model';
import { AtlasView } from '../components/exhibition/AtlasView';
import { EntityLine } from '../components/common/EntityCard';
import { SectionHeading } from '../components/common/SectionHeading';

export function KnowledgePage() {
  const { t, u } = useLang();
  const materials = getByType('material');
  const techniques = getByType('technique');
  const concepts = getByType('concept').sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0));

  return (
    <div className="animate-fade-up">
      <header className="wrap pt-16 md:pt-24">
        <div className="eyebrow mb-4">Knowledge Atlas</div>
        <h1 className="text-display-lg">{t(loc('知识图谱', 'The Knowledge Atlas'))}</h1>
        <p className="mt-5 max-w-2xl text-xl leading-relaxed text-ink-soft">
          {t(loc('知识不是分类树，是一张网：十四个知识域、材料、技法与概念互相连接，每条边都可以双向漫游。',
            'Knowledge is not a classification tree but a web: fourteen domains, materials, techniques and concepts — every edge traversable both ways.'))}
        </p>
      </header>

      <section className="wrap mt-16">
        <AtlasView />
      </section>

      <section className="wrap mt-24">
        <SectionHeading eyebrow={u('type.concept')} title={t(loc('概念与原则', 'Concepts & principles'))} />
        <div>
          {concepts.map((c, i) => <EntityLine key={c.id} e={c} index={i} />)}
        </div>
      </section>

      <section className="wrap mt-24 grid gap-16 md:grid-cols-2">
        <div>
          <SectionHeading eyebrow={u('type.material')} title={t(loc('材料', 'Materials'))} />
          <div>
            {materials.map((m, i) => <EntityLine key={m.id} e={m} index={i} />)}
          </div>
        </div>
        <div>
          <SectionHeading eyebrow={u('type.technique')} title={t(loc('技法', 'Techniques'))} />
          <div>
            {techniques.map((q, i) => <EntityLine key={q.id} e={q} index={i} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
