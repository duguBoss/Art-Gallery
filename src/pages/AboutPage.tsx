import { useLang } from '../i18n/LanguageContext';
import { loc } from '../model';

const PRINCIPLES = [
  loc('知识永远免费。你可以付费购买产品与服务，但永远不需要为知识付费。',
    'Knowledge is always free. You may pay for products and services — never for knowledge itself.'),
  loc('内容决定呈现。每个学科用它自己的叙事结构，而不是套进统一模板。',
    'Content determines presentation. Every discipline gets its own narrative structure, never a uniform template.'),
  loc('关系是一等数据。分类树无法表达“受影响于”“脱胎于”“形成对照”——图谱可以。',
    'Relations are first-class data. A classification tree cannot express influence, emergence or contrast — a graph can.'),
  loc('事实必须有出处。每一张事实图片都可追溯到原始机构。',
    'Facts must be sourced. Every factual image traces back to its owning institution.'),
  loc('内容即代码。编辑 = git commit，发布 = 公开构建。没有 admin 面板。',
    'Content as code. Editing is a git commit; publishing is a public build. No admin panel.'),
];

const SIGHTS = [
  { en: 'Museum', zh: '博物馆' },
  { en: 'Encyclopedia', zh: '百科' },
  { en: 'Atlas', zh: '图谱' },
  { en: 'Archive', zh: '档案馆' },
  { en: 'Visual lab', zh: '视觉实验室' },
  { en: 'Learning system', zh: '学习系统' },
  { en: 'Creator toolbox', zh: '创作工具箱' },
];

export function AboutPage() {
  const { t } = useLang();
  return (
    <div className="animate-fade-up">
      <header className="wrap pt-16 md:pt-24">
        <div className="eyebrow mb-4">About</div>
        <h1 className="text-display-lg max-w-4xl text-balance">
          {t(loc('视觉图志是一座博物馆、一部百科、一本地图集、一个档案馆、一间实验室、一套学习系统和一只工具箱。',
            'The Visual Atlas is a museum, an encyclopedia, an atlas, an archive, a visual lab, a learning system and a toolbox.'))}
        </h1>
      </header>

      <section className="wrap mt-14">
        <div className="flex flex-wrap gap-3 border-y border-ink/15 py-8">
          {SIGHTS.map(s => (
            <span key={s.en} className="border border-ink/20 px-4 py-2 font-serif text-xl">
              {t(loc(s.zh, s.en))}
            </span>
          ))}
        </div>
      </section>

      <section className="wrap mt-16 grid gap-14 md:grid-cols-12">
        <div className="md:col-span-7">
          <h2 className="font-serif text-3xl">{t(loc('它不是什么', 'What it is not'))}</h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-soft">
            <p>{t(loc('不是 SaaS 仪表盘，不是课程市场，不是 AI 落地页，也不是灵感瀑布流。',
              'Not a SaaS dashboard, not a course marketplace, not an AI landing page, not an infinite inspiration feed.'))}</p>
            <p>{t(loc('它相信：当你真正理解一幅画为什么好，你就同时学会了布光、调色、排版与评判 AI 生成物——因为这些本来就是同一件事。',
              'It believes that understanding why a painting works teaches lighting, grading, typography and AI judgment at once — because they are the same thing.'))}</p>
          </div>
        </div>
        <div className="md:col-span-5">
          <h2 className="eyebrow mb-5">{t(loc('工作原则', 'Working principles'))}</h2>
          <ol className="space-y-5">
            {PRINCIPLES.map((p, i) => (
              <li key={i} className="flex gap-4 border-b border-paper-edge pb-5">
                <span className="font-serif text-3xl leading-none text-ink/25 tabular">{String(i + 1).padStart(2, '0')}</span>
                <p className="text-base leading-relaxed text-ink-soft">{t(p)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap mt-20">
        <div className="border border-ink bg-ink p-8 text-paper md:p-12">
          <h2 className="font-serif text-3xl">{t(loc('资料与致谢', 'Sources & credits'))}</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-paper/70">
            {t(loc('事实作品图片来自 Wikimedia Commons 及其原始收藏机构（卢浮宫、佛罗伦萨美术学院、MoMA、包豪斯德绍基金会等），版权归原机构所有。氛围插画由生成式工具创作。文字内容以 CC BY-SA 4.0 开放。',
              'Factual artwork images come from Wikimedia Commons and their owning institutions (the Louvre, Galleria dell’Accademia, MoMA, Stiftung Bauhaus Dessau and others); rights remain with those institutions. Atmospheric illustrations are generative. Text is released under CC BY-SA 4.0.'))}
          </p>
        </div>
      </section>
    </div>
  );
}
