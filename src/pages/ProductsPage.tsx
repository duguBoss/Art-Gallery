import { PRODUCTS } from '../content/kb';
import { useLang } from '../i18n/LanguageContext';
import { loc } from '../model';
import { Link } from '../router/router';

export function ProductsPage() {
  const { t } = useLang();
  return (
    <div className="animate-fade-up">
      <header className="wrap pt-16 md:pt-24">
        <div className="eyebrow mb-4">Creator Products</div>
        <h1 className="text-display-lg">{t(loc('创作者商店', 'The creator’s shop'))}</h1>
        <p className="mt-5 max-w-2xl text-xl leading-relaxed text-ink-soft">
          {t(loc('这里不卖知识——知识在图谱里永远免费。这里卖的是把知识变成文件、清单与模板的那十个小时。',
            'We do not sell knowledge — it stays free in the atlas. We sell the ten hours of turning that knowledge into files, checklists and templates.'))}
        </p>
      </header>

      <section className="wrap mt-14 grid gap-8 md:grid-cols-2">
        {PRODUCTS.map(p => (
          <Link key={p.id} to={`/entity/product/${p.slug}`}
            className="group flex flex-col border border-paper-edge bg-paper-card p-8 transition-colors hover:border-ink/50">
            <div className="flex items-baseline justify-between">
              <span className="eyebrow">{t(p.category)}</span>
              <span className="font-serif text-3xl">¥{p.priceCny}</span>
            </div>
            <h2 className="mt-4 font-serif text-3xl leading-tight transition-colors group-hover:text-cinnabar-deep">
              {t(p.name)}
            </h2>
            <p className="mt-3 flex-1 leading-relaxed text-ink-soft">{t(p.summary)}</p>
            <ul className="mt-6 space-y-2 border-t border-paper-edge pt-5 text-sm text-ink-soft">
              {p.includes?.slice(0, 3).map((it, i) => (
                <li key={i} className="flex gap-2"><span className="text-cinnabar">✓</span> {t(it)}</li>
              ))}
            </ul>
            <span className="mt-6 text-sm font-medium text-ink underline decoration-ink-faint underline-offset-4 group-hover:decoration-ink">
              {t(loc('查看详情', 'View details'))} →
            </span>
          </Link>
        ))}
      </section>

      <section className="wrap mt-20">
        <div className="border border-paper-edge bg-paper-deep p-8 md:p-10">
          <p className="pull-quote">
            {t(loc('知识 = 免费 · 产品 = 省时间 · 支持 = 捐赠 · 广告 = 可选。四条腿，没有一条是付费墙。',
              'Knowledge free · Products save time · Support by donation · Ads optional. Four legs — none of them a paywall.'))}
          </p>
        </div>
      </section>
    </div>
  );
}
