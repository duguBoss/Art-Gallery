import { createContext, useContext, useEffect, useState, useCallback, type ReactNode, type MouseEvent } from 'react';
import type { Entity } from '../content/kb';

/**
 * Minimal hash router (no dependency, GitHub Pages safe).
 * Routes:
 *   /                         home
 *   /gallery /learn /explore /knowledge /styles /artists
 *   /practice /tools /products /support /about /search
 *   /exhibition/:slug
 *   /entity/:type/:slug
 */

export interface Route {
  path: string;          // e.g. "/entity/work/david"
  segments: string[];    // ["entity","work","david"]
  query: URLSearchParams;
}

const parse = (): Route => {
  const raw = window.location.hash.replace(/^#/, '') || '/';
  const [pathPart, queryPart] = raw.split('?');
  const segments = pathPart.split('/').filter(Boolean);
  return { path: '/' + segments.join('/'), segments, query: new URLSearchParams(queryPart ?? '') };
};

interface RouterCtx {
  route: Route;
  navigate: (to: string) => void;
}

const Ctx = createContext<RouterCtx | null>(null);

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(parse);

  useEffect(() => {
    const onHash = () => {
      setRoute(parse());
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = useCallback((to: string) => {
    const target = '#' + (to.startsWith('/') ? to : '/' + to);
    if (window.location.hash === target) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = target;
    }
  }, []);

  return <Ctx.Provider value={{ route, navigate }}>{children}</Ctx.Provider>;
}

export function useRouter(): RouterCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error('useRouter must be used within RouterProvider');
  return c;
}

// ---------------------------------------------------------------------------
// Path helpers
// ---------------------------------------------------------------------------
export const entityPath = (e: Entity): string =>
  e.type === 'exhibition' ? `/exhibition/${e.slug}` : `/entity/${e.type}/${e.slug}`;

export const homePath = '/';

export function Link({
  to,
  className,
  children,
  onClick,
  ...rest
}: {
  to: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick'>) {
  const { navigate } = useRouter();
  const handle = (ev: MouseEvent<HTMLAnchorElement>) => {
    if (ev.metaKey || ev.ctrlKey) return;
    ev.preventDefault();
    onClick?.();
    navigate(to);
  };
  return (
    <a href={'#' + to} className={className} onClick={handle} {...rest}>
      {children}
    </a>
  );
}
