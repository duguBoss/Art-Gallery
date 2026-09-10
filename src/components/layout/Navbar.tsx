import { useState } from 'react';
import { Menu, X, Search, Shuffle } from 'lucide-react';
import { Link, useRouter } from '../../router/router';
import { useLang } from '../../i18n/LanguageContext';
import type { UiKey } from '../../i18n/ui';
import { LangSwitcher } from '../common/LangSwitcher';
import { randomEntity } from '../../content/kb';

const NAV: { to: string; key: UiKey }[] = [
  { to: '/gallery', key: 'nav.gallery' },
  { to: '/learn', key: 'nav.learn' },
  { to: '/explore', key: 'nav.explore' },
  { to: '/knowledge', key: 'nav.knowledge' },
  { to: '/styles', key: 'nav.styles' },
  { to: '/artists', key: 'nav.artists' },
  { to: '/practice', key: 'nav.practice' },
  { to: '/products', key: 'nav.products' },
  { to: '/support', key: 'nav.support' },
  { to: '/about', key: 'nav.about' },
];

export function Navbar() {
  const { u } = useLang();
  const { route, navigate } = useRouter();
  const [open, setOpen] = useState(false);

  const surprise = () => {
    const e = randomEntity(x => x.type !== 'domain' && x.type !== 'period' && !!x.summary);
    navigate(e.type === 'exhibition' ? `/exhibition/${e.slug}` : `/entity/${e.type}/${e.slug}`);
  };

  const isActive = (to: string) => route.path === to || route.path.startsWith(to + '/');

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/90 backdrop-blur-sm">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        {/* Wordmark */}
        <Link to="/" className="flex shrink-0 items-baseline gap-2">
          <span className="font-serif text-2xl font-semibold leading-none tracking-tight">视觉图志</span>
          <span className="hidden font-mono text-[10px] uppercase tracking-eyebrow text-ink-mute sm:inline">
            Visual Atlas
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-5 lg:flex">
          {NAV.map(n => (
            <Link
              key={n.to}
              to={n.to}
              className={`text-[13px] transition-colors ${
                isActive(n.to) ? 'font-semibold text-ink' : 'text-ink-soft hover:text-ink'
              }`}
            >
              {u(n.key)}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <button
            onClick={() => navigate('/search')}
            className="flex items-center gap-2 border border-ink/15 px-3 py-1.5 text-xs text-ink-mute transition-colors hover:border-ink/40 hover:text-ink"
            aria-label={u('nav.search')}
          >
            <Search size={13} />
            <span className="hidden md:inline">{u('nav.search')}</span>
            <span className="hidden font-mono text-[10px] text-ink-faint md:inline">⌘K</span>
          </button>
          <button
            onClick={surprise}
            className="hidden items-center gap-1.5 text-xs text-ink-soft transition-colors hover:text-cinnabar-deep md:flex"
            title={u('nav.surprise')}
          >
            <Shuffle size={13} />
            {u('nav.surprise')}
          </button>
          <LangSwitcher compact />
          <button
            className="lg:hidden"
            onClick={() => setOpen(o => !o)}
            aria-label="menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-ink/10 bg-paper lg:hidden">
          <div className="wrap grid grid-cols-2 gap-x-6 gap-y-1 py-4">
            {NAV.map(n => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="border-b border-paper-edge py-2.5 font-serif text-xl"
              >
                {u(n.key)}
              </Link>
            ))}
            <button
              onClick={() => { setOpen(false); surprise(); }}
              className="col-span-2 mt-2 flex items-center gap-2 text-left font-serif text-xl text-cinnabar-deep"
            >
              <Shuffle size={16} /> {u('nav.surprise')}
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
