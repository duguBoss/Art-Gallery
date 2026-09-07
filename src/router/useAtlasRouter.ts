import { useEffect, useCallback } from 'react';
import type { Language } from '../context/LanguageContext';

export type AtlasRouteTab = 'index' | 'archive' | 'knowledge' | 'constellation' | 'dossiers' | 'lab' | 'tools' | 'about' | 'ai';
export interface AtlasRouteState { locale: Language; tab: AtlasRouteTab; sceneId?: string; atomId?: string; knowledgeId?: string; }

export function parseHash(hash: string): Partial<AtlasRouteState> {
  const clean = hash.replace(/^#\/?/, ''); if (!clean) return {};
  const parts = clean.split('/').filter(Boolean); let locale: Language | undefined;
  const first = parts[0];
  if (first === 'zh' || first === 'zh-CN') locale = 'zh'; else if (first === 'en') locale = 'en'; else if (first === 'ja') locale = 'ja'; else if (first === 'ko') locale = 'ko';
  const tabIndex = locale ? 1 : 0; const tabCandidate = parts[tabIndex] as AtlasRouteTab | undefined;
  const validTabs: AtlasRouteTab[] = ['index','archive','knowledge','constellation','dossiers','lab','tools','about','ai'];
  const tab = tabCandidate && validTabs.includes(tabCandidate) ? tabCandidate : 'index'; const param = parts[tabIndex + 1];
  return { locale, tab, sceneId: tab === 'index' && param ? param : undefined, atomId: tab === 'constellation' && param ? param : undefined, knowledgeId: tab === 'knowledge' && param ? param : undefined };
}

export function buildRouteHash(state: { locale: Language; tab: AtlasRouteTab; sceneId?: string; atomId?: string; knowledgeId?: string }): string {
  const loc = state.locale === 'zh' ? 'zh-CN' : state.locale;
  if (state.sceneId && state.tab === 'index') return `#/${loc}/scene/${state.sceneId}`;
  if (state.atomId && state.tab === 'constellation') return `#/${loc}/constellation/${state.atomId}`;
  if (state.knowledgeId && state.tab === 'knowledge') return `#/${loc}/knowledge/${state.knowledgeId}`;
  return `#/${loc}/${state.tab}`;
}

export function useAtlasRouter(currentLocale: Language, currentTab: AtlasRouteTab, currentSceneId: string | null, currentKnowledgeId: string | null, onNavigate: (state: Partial<AtlasRouteState>) => void) {
  const syncToHash = useCallback(() => {
    const hash = buildRouteHash({ locale: currentLocale, tab: currentTab, sceneId: currentSceneId || undefined, knowledgeId: currentKnowledgeId || undefined });
    if (window.location.hash !== hash) window.history.replaceState(null, '', hash);
  }, [currentLocale, currentTab, currentSceneId, currentKnowledgeId]);
  useEffect(() => { syncToHash(); }, [syncToHash]);
  useEffect(() => { const handleHashChange = () => onNavigate(parseHash(window.location.hash)); window.addEventListener('hashchange', handleHashChange); if (window.location.hash) handleHashChange(); return () => window.removeEventListener('hashchange', handleHashChange); }, [onNavigate]);
}
