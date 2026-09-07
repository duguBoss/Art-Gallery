import React from 'react';
import { Search, Sparkles } from 'lucide-react';
import { playSpotlightClick } from '../utils/audio';
import type { AtlasTab } from '../types/visualAtlas';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps { currentTab: AtlasTab; onSelectTab: (tab: AtlasTab) => void; onOpenCommandPalette: () => void; onOpenAI: () => void; savedDossierCount?: number; }

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab, onOpenCommandPalette, onOpenAI, savedDossierCount = 0 }) => {
  const { lang, setLang } = useLanguage(); const isZh = lang === 'zh';
  const tabs: { id: AtlasTab; label: string }[] = [
    { id: 'index', label: isZh ? '首页' : 'HOME' }, { id: 'knowledge', label: isZh ? '知识百科' : 'KNOWLEDGE' },
    { id: 'archive', label: isZh ? '灵感档案' : 'ARCHIVE' }, { id: 'tools', label: isZh ? '工具' : 'TOOLS' },
    { id: 'lab', label: isZh ? '创作实验室' : 'LAB' }, { id: 'language', label: isZh ? '知识星图' : 'GRAPH' },
    { id: 'dossiers', label: isZh ? `收藏${savedDossierCount ? ` ${savedDossierCount}` : ''}` : `SAVED${savedDossierCount ? ` ${savedDossierCount}` : ''}` }, { id: 'ai', label: 'AI' },
  ];
  return <header className="sticky top-0 z-40 w-full border-b border-[#F2F0E8]/10 bg-[#11110F]/95 backdrop-blur-md">
    <div className="max-w-[1440px] mx-auto px-5 lg:px-10 min-h-14 flex items-center justify-between gap-4">
      <button onClick={() => { playSpotlightClick(); onSelectTab('index'); }} className="flex items-center gap-3 cursor-pointer select-none group shrink-0 text-left"><div className="w-2.5 h-2.5 bg-[#D8FF3E] rotate-45 group-hover:rotate-90 transition-transform"/><div><div className="font-bold tracking-[.14em] text-sm uppercase text-[#F2F0E8]">VISUAL ATLAS</div><div className="text-[9px] font-mono tracking-wider text-[#8B887F] uppercase hidden lg:block">CREATOR KNOWLEDGE ENCYCLOPEDIA</div></div></button>
      <nav className="hidden lg:flex items-center gap-4 xl:gap-5 font-mono text-[10px]">{tabs.map(tab=><button key={tab.id} onClick={()=>{playSpotlightClick();onSelectTab(tab.id)}} className={`py-2 border-b transition-colors ${currentTab===tab.id?'border-[#D8FF3E] text-[#D8FF3E] font-bold':'border-transparent text-[#8B887F] hover:text-[#F2F0E8]'}`}>{tab.label}</button>)}</nav>
      <div className="flex items-center gap-2 font-mono text-xs"><button onClick={()=>{playSpotlightClick();onOpenAI()}} className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 border border-[#D8FF3E]/40 bg-[#D8FF3E]/10 text-[#D8FF3E] font-bold"><Sparkles className="w-3.5 h-3.5"/>AI</button><div className="hidden sm:flex items-center border border-[#F2F0E8]/15 bg-[#161614] text-[11px]">{(['zh','en','ja','ko'] as const).map(l=><button key={l} onClick={()=>{playSpotlightClick();setLang(l)}} className={`px-2 py-1 ${lang===l?'bg-[#D8FF3E] text-[#11110F] font-bold':'text-[#8B887F]'}`}>{l==='zh'?'中':l.toUpperCase()}</button>)}</div><button onClick={()=>{playSpotlightClick();onOpenCommandPalette()}} className="flex items-center gap-2 px-2.5 py-1.5 border border-[#F2F0E8]/15 text-[#8B887F] hover:text-[#F2F0E8]"><Search className="w-3.5 h-3.5"/><span className="hidden xl:inline">{isZh?'搜索':'SEARCH'}</span><kbd className="text-[10px] px-1 bg-white/10">⌘K</kbd></button></div>
    </div>
    <div className="lg:hidden flex items-center gap-1 overflow-x-auto border-t border-[#F2F0E8]/10 px-3 py-2 font-mono text-[10px]">{tabs.map(tab=><button key={tab.id} onClick={()=>onSelectTab(tab.id)} className={`shrink-0 px-2.5 py-1 ${currentTab===tab.id?'text-[#D8FF3E] font-bold border-b border-[#D8FF3E]':'text-[#8B887F]'}`}>{tab.label}</button>)}</div>
  </header>;
};
