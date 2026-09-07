import { useEffect, useCallback } from 'react';
import type { Language } from '../context/LanguageContext';

export type AtlasRouteTab = 'index' | 'archive' | 'knowledge' | 'constellation' | 'dossiers' | 'lab' | 'tools' | 'about' | 'ai';
export interface AtlasRouteState { locale: Language; tab: AtlasRouteTab; sceneId?: string; atomId?: string; knowledgeId?: string; }

export function parseHash(hash: string): Partial<AtlasRouteState> {
  const clean=hash.replace(/^#\/?/,''); if(!clean)return{}; const parts=clean.split('/').filter(Boolean); let locale:Language|undefined; const first=parts[0];
  if(first==='zh'||first==='zh-CN')locale='zh';else if(first==='en')locale='en';else if(first==='ja')locale='ja';else if(first==='ko')locale='ko';
  const tabIndex=locale?1:0; const candidate=parts[tabIndex] as AtlasRouteTab|undefined; const valid:AtlasRouteTab[]=['index','archive','knowledge','constellation','dossiers','lab','tools','about','ai']; const tab=candidate&&valid.includes(candidate)?candidate:'index'; const param=parts[tabIndex+1];
  return{locale,tab,sceneId:tab==='index'&&param?param:undefined,atomId:tab==='constellation'&&param?param:undefined,knowledgeId:tab==='knowledge'&&param?param:undefined};
}
export function parseLocation(): Partial<AtlasRouteState> { const match=window.location.pathname.match(/\/knowledge\/([^/]+)\/?$/); if(match)return{tab:'knowledge',knowledgeId:decodeURIComponent(match[1])}; return parseHash(window.location.hash); }
export function buildRouteUrl(state:{locale:Language;tab:AtlasRouteTab;sceneId?:string;atomId?:string;knowledgeId?:string}){const loc=state.locale==='zh'?'zh-CN':state.locale;const base=import.meta.env.BASE_URL.replace(/\/$/,'');if(state.knowledgeId&&state.tab==='knowledge')return `${base}/knowledge/${encodeURIComponent(state.knowledgeId)}/`;if(state.sceneId&&state.tab==='index')return `#/${loc}/scene/${state.sceneId}`;if(state.atomId&&state.tab==='constellation')return `#/${loc}/constellation/${state.atomId}`;return `#/${loc}/${state.tab}`;}
export function useAtlasRouter(currentLocale:Language,currentTab:AtlasRouteTab,currentSceneId:string|null,currentKnowledgeId:string|null,onNavigate:(state:Partial<AtlasRouteState>)=>void){const sync=useCallback(()=>{const target=buildRouteUrl({locale:currentLocale,tab:currentTab,sceneId:currentSceneId||undefined,knowledgeId:currentKnowledgeId||undefined});if(target.startsWith('#')){if(window.location.hash!==target)window.history.replaceState(null,'',target)}else if(window.location.pathname!==target){window.history.replaceState(null,'',target)}},[currentLocale,currentTab,currentSceneId,currentKnowledgeId]);useEffect(()=>{sync()},[sync]);useEffect(()=>{const h=()=>onNavigate(parseLocation());window.addEventListener('hashchange',h);window.addEventListener('popstate',h);return()=>{window.removeEventListener('hashchange',h);window.removeEventListener('popstate',h)}},[onNavigate]);}
