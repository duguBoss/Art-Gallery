import { useEffect, useCallback } from 'react';
import type { Language } from '../context/LanguageContext';

export type AtlasRouteTab =
  | 'index'
  | 'archive'
  | 'constellation'
  | 'dossiers'
  | 'lab'
  | 'about'
  | 'ai';

export interface AtlasRouteState {
  locale: Language;
  tab: AtlasRouteTab;
  sceneId?: string;
  atomId?: string;
}

export function parseHash(hash: string): Partial<AtlasRouteState> {
  const clean = hash.replace(/^#\/?/, '');
  if (!clean) return {};

  const parts = clean.split('/').filter(Boolean);
  if (parts.length === 0) return {};

  let locale: Language | undefined;
  const first = parts[0];
  if (first === 'zh' || first === 'zh-CN') locale = 'zh';
  else if (first === 'en') locale = 'en';
  else if (first === 'ja') locale = 'ja';
  else if (first === 'ko') locale = 'ko';

  const tabIndex = locale ? 1 : 0;
  const tabCandidate = parts[tabIndex] as AtlasRouteTab | undefined;

  let tab: AtlasRouteTab = 'index';
  if (tabCandidate && ['index', 'archive', 'constellation', 'dossiers', 'lab', 'about', 'ai'].includes(tabCandidate)) {
    tab = tabCandidate;
  }

  const paramIndex = tabIndex + 1;
  const param = parts[paramIndex];

  return {
    locale,
    tab,
    sceneId: tab === 'index' && param?.startsWith('scene-') ? param : undefined,
    atomId: tab === 'constellation' && param ? param : undefined
  };
}

export function buildRouteHash(state: { locale: Language; tab: AtlasRouteTab; sceneId?: string; atomId?: string }): string {
  const loc = state.locale === 'zh' ? 'zh-CN' : state.locale;
  if (state.sceneId && state.tab === 'index') {
    return `#/${loc}/scene/${state.sceneId}`;
  }
  if (state.atomId && state.tab === 'constellation') {
    return `#/${loc}/constellation/${state.atomId}`;
  }
  return `#/${loc}/${state.tab}`;
}

export function useAtlasRouter(
  currentLocale: Language,
  currentTab: AtlasRouteTab,
  currentSceneId: string | null,
  onNavigate: (state: Partial<AtlasRouteState>) => void
) {
  // Sync state to URL hash
  const syncToHash = useCallback(() => {
    const hash = buildRouteHash({
      locale: currentLocale,
      tab: currentTab,
      sceneId: currentSceneId || undefined
    });
    if (window.location.hash !== hash) {
      window.history.replaceState(null, '', hash);
    }
  }, [currentLocale, currentTab, currentSceneId]);

  useEffect(() => {
    syncToHash();
  }, [syncToHash]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const parsed = parseHash(window.location.hash);
      onNavigate(parsed);
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial parse on load if hash exists
    if (window.location.hash) {
      handleHashChange();
    }
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [onNavigate]);
}
