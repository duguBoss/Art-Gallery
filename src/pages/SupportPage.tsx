import { Coffee, BookOpen, Megaphone, Heart } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';
import { loc } from '../model';

const WAYS = [
  {
    icon: Coffee,
    title: loc('请编辑喝杯咖啡', 'Buy the editors a coffee'),
    body: loc('一次性捐赠或每月一杯咖啡。所有收入用于图片版权核查与内容撰写。',
      'One-off or a coffee a month. Funds go to image rights research and writing.'),
    cta: loc('捐赠（即将接入）', 'Donate (coming soon)'),
  },
  {
    icon: BookOpen,
    title: loc('买一件创作者产品', 'Buy a creator product'),
    body: loc('模板、色卡与提示词图鉴——你省下时间，图谱获得收入，两不相欠。',
      'Templates, swatches and prompt atlases — you save time, the atlas earns.'),
    cta: loc('去商店', 'Visit the shop'),
    to: '/products',
  },
  {
    icon: Megaphone,
    title: loc('允许广告，或不允许', 'Ads, or no ads'),
    body: loc('广告只出现在章节之间且明确标注。你也可以完全屏蔽——阅读体验不会因此降级。',
      'Ads appear only between sections, clearly labeled. Block them freely — the experience never degrades.'),
    cta: loc('我们从不做内插广告', 'We never run in-content ads'),
  },
  {
    icon: Heart,
    title: loc('把它分享给一个人', 'Share it with one person'),
    body: loc('最可持续的支持：把一篇你觉得“原来如此”的条目发给一个正在创作的朋友。',
      'The most sustainable support: forward one entry that made you say “so that’s how it works.”'),
    cta: loc('复制网址就是最好的支持', 'Copying the URL is enough'),
  },
];

export function SupportPage() {
  const { t } = useLang();
  return (
    <div className="animate-fade-up">
      <header className="wrap pt-16 md:pt-24">
        <div className="eyebrow mb-4 text-cinnabar">Support</div>
        <h1 className="text-display-lg">
          {t(loc('让知识保持免费', 'Keep knowledge free'))}
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink-soft">
          {t(loc('这是一个没有融资、没有付费墙、没有追踪器的项目。它能持续，只因为读者选择让它持续。',
            'No venture money, no paywalls, no trackers. This project continues only because readers choose to make it continue.'))}
        </p>
      </header>

      <section className="wrap mt-16 grid gap-px border border-paper-edge bg-paper-edge md:grid-cols-2">
        {WAYS.map((w, i) => {
          const Icon = w.icon;
          return (
            <div key={i} className="flex flex-col bg-paper p-8 md:p-10">
              <Icon size={26} strokeWidth={1.4} className="text-cinnabar" />
              <h2 className="mt-5 font-serif text-3xl">{t(w.title)}</h2>
              <p className="mt-3 flex-1 leading-relaxed text-ink-soft">{t(w.body)}</p>
              {w.to ? (
                <a href={'#' + w.to} className="btn-ghost mt-6 self-start">{t(w.cta)} →</a>
              ) : (
                <button className="btn-ghost mt-6 self-start cursor-default">{t(w.cta)}</button>
              )}
            </div>
          );
        })}
      </section>

      <section className="wrap mt-16">
        <p className="max-w-measure text-sm leading-relaxed text-ink-mute">
          {t(loc('透明承诺：本项目所有内容在 GitHub 上以内容即代码的方式维护——每一次编辑都是一次 git commit，每一次发布都是一次公开构建。没有 admin 面板，没有暗箱。',
            'Transparency commitment: all content is maintained as code on GitHub — every edit a commit, every release a public build. No admin panel, no black box.'))}
        </p>
      </section>
    </div>
  );
}
