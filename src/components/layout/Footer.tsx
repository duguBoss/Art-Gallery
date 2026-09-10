import { Code2, Heart } from 'lucide-react';
import { Link } from '../../router/router';
import { useLang } from '../../i18n/LanguageContext';
import { LangSwitcher } from '../common/LangSwitcher';

export function Footer() {
  const { u } = useLang();
  return (
    <footer className="mt-24 border-t border-ink/15 bg-paper-deep">
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        {/* Philosophy */}
        <div>
          <div className="font-serif text-3xl">视觉图志</div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">
            {u('home.heroLead')}
          </p>
          <p className="mt-6 flex items-center gap-2 text-xs text-ink-mute">
            <Heart size={12} className="text-cinnabar" />
            {u('footer.tagline')}
          </p>
        </div>

        {/* Explore */}
        <div>
          <div className="eyebrow mb-4">{u('footer.philosophy')}</div>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/knowledge" className="link-editorial">{u('nav.knowledge')}</Link></li>
            <li><Link to="/explore" className="link-editorial">{u('nav.explore')}</Link></li>
            <li><Link to="/learn" className="link-editorial">{u('nav.learn')}</Link></li>
            <li><Link to="/about" className="link-editorial">{u('nav.about')}</Link></li>
          </ul>
        </div>

        {/* Support & sources */}
        <div>
          <div className="eyebrow mb-4">{u('footer.support')}</div>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/support" className="link-editorial">{u('nav.support')}</Link></li>
            <li><Link to="/products" className="link-editorial">{u('nav.products')}</Link></li>
            <li>
              <a href="https://commons.wikimedia.org/" target="_blank" rel="noreferrer" className="link-editorial">
                Wikimedia Commons
              </a>
            </li>
            <li>
              <a href="https://github.com/" target="_blank" rel="noreferrer" className="link-editorial inline-flex items-center gap-1.5">
                <Code2 size={13} /> {u('footer.github')}
              </a>
            </li>
          </ul>
        </div>

        {/* Language */}
        <div>
          <div className="eyebrow mb-4">{u('footer.language')}</div>
          <LangSwitcher />
          <p className="mt-6 text-xs leading-relaxed text-ink-mute">{u('footer.legal')}</p>
        </div>
      </div>
      <div className="border-t border-ink/10">
        <div className="wrap flex flex-col items-start justify-between gap-2 py-5 text-[11px] text-ink-mute md:flex-row md:items-center">
          <span className="font-mono">© {new Date().getFullYear()} Visual Atlas — knowledge free, forever.</span>
          <span className="font-mono">Content as code · git commit → build → publish</span>
        </div>
      </div>
    </footer>
  );
}
