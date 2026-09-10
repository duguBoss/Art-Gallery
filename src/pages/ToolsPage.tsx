import { getByType } from '../content/kb';
import type { PracticeEntity } from '../model/entity';
import { useLang } from '../i18n/LanguageContext';
import { loc } from '../model';
import { Link } from '../router/router';
import { EntityLine } from '../components/common/EntityCard';
import { SectionHeading } from '../components/common/SectionHeading';

export function ToolsPage() {
  const { t } = useLang();
  const techniques = getByType('technique');
  const prompts = getByType<PracticeEntity>('practice').filter(p => ['prompt', 'cross-style'].includes(p.kind));

  return (
    <div className="animate-fade-up">
      <header className="wrap pt-16 md:pt-24">
        <div className="eyebrow mb-4">Tools</div>
        <h1 className="text-display-lg">{t(loc('创作者工具箱', 'The creator’s toolbox'))}</h1>
        <p className="mt-5 max-w-2xl text-xl leading-relaxed text-ink-soft">
          {t(loc('工具分两层：底层是可迁移的技法知识（永远免费），上层是为你省时间的文件与模板（在商店）。先懂，再买。',
            'Two layers: transferable technique knowledge underneath — free forever; time-saving files and templates above — in the shop. Understand first, then buy.'))}
        </p>
      </header>

      <section className="wrap mt-16">
        <SectionHeading
          eyebrow={t(loc('知识层', 'Knowledge layer'))}
          title={t(loc('技法是最耐用的工具', 'Technique is the most durable tool'))}
        />
        <div>{techniques.map((q, i) => <EntityLine key={q.id} e={q} index={i} />)}</div>
      </section>

      <section className="wrap mt-20">
        <SectionHeading
          eyebrow={t(loc('练习层', 'Practice layer'))}
          title={t(loc('AI 创作实验', 'AI creation labs'))}
        />
        <div>{prompts.map((p, i) => <EntityLine key={p.id} e={p} index={i} />)}</div>
      </section>

      <section className="wrap mt-20">
        <div className="flex flex-col items-start justify-between gap-6 border border-ink/20 bg-paper-deep p-8 md:flex-row md:items-center md:p-10">
          <div>
            <h2 className="font-serif text-3xl">{t(loc('文件层：省时间的模板', 'File layer: templates that save hours'))}</h2>
            <p className="mt-2 text-ink-soft">{t(loc('海报网格、色卡图鉴、提示词图鉴、动效曲线。', 'Poster grids, swatch atlas, prompt atlas, motion curves.'))}</p>
          </div>
          <Link to="/products" className="btn-primary shrink-0">{t(loc('去创作者商店', 'Go to the shop'))} →</Link>
        </div>
      </section>
    </div>
  );
}
