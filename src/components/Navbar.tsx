import React from 'react';
import { Search, Sliders, Globe } from 'lucide-react';
import { playSpotlightClick } from '../utils/audio';
import type { AtlasTab } from '../types/visualAtlas';
import { useLanguage } from '../context/LanguageContext';

export type MainViewType = 'cinema' | 'atoms' | 'principles' | 'styles' | 'mediums' | 'motion' | 'atlas' | 'shapes-lab';

interface NavbarProps {
  currentTab: AtlasTab;
  onSelectTab: (tab: AtlasTab) => void;
  onOpenCommandPalette: () => void;
  onOpenCMS: () => void;
  savedDossierCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenCommandPalette,
  onOpenCMS,
  savedDossierCount = 0,
}) => {
  const { lang, toggleLang, t } = useLanguage();

  const tabs: { id: AtlasTab; num: string; labelKey: string }[] = [
    { id: 'index', num: '01', labelKey: 'nav.index' },
    { id: 'archive', num: '02', labelKey: 'nav.archive' },
    { id: 'language', num: '03', labelKey: 'nav.language' },
    { id: 'dossiers', num: '04', labelKey: 'nav.dossiers' },
    { id: 'lab', num: '05', labelKey: 'nav.lab' },
    { id: 'about', num: '06', labelKey: 'nav.about' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#F2F0E8]/10 bg-[#11110F]/95 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-14 flex items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div 
          onClick={() => {
            playSpotlightClick();
            onSelectTab('index');
          }}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-2.5 h-2.5 bg-[#D8FF3E] rotate-45 group-hover:rotate-90 transition-transform duration-300" />
          <div>
            <div className="font-bold tracking-[0.14em] text-sm uppercase text-[#F2F0E8]">
              {t('nav.title')}
            </div>
            <div className="text-[9px] font-mono tracking-wider text-[#8B887F] uppercase hidden md:block">
              {t('nav.subtitle')}
            </div>
          </div>
        </div>

        {/* Center: Swiss Editorial Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7 font-mono text-xs">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  playSpotlightClick();
                  onSelectTab(tab.id);
                }}
                className={`flex items-center gap-1.5 transition-colors cursor-pointer py-1 border-b ${
                  isActive
                    ? 'border-[#D8FF3E] text-[#D8FF3E] font-bold'
                    : 'border-transparent text-[#8B887F] hover:text-[#F2F0E8]'
                }`}
              >
                <span className="tracking-wider">{t(tab.labelKey)}</span>
                {tab.id === 'dossiers' && savedDossierCount > 0 && (
                  <span className="ml-1 text-[9px] px-1 bg-[#D8FF3E] text-[#11110F] font-bold">
                    {savedDossierCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Tools: Language Switcher, ⌘K Command Trigger & CMS Entry */}
        <div className="flex items-center gap-2.5 font-mono text-xs">
          {/* Bilingual Language Switcher */}
          <button
            onClick={() => {
              playSpotlightClick();
              toggleLang();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 border border-[#F2F0E8]/15 hover:border-[#D8FF3E] text-[#8B887F] hover:text-[#D8FF3E] transition-colors cursor-pointer text-xs"
            title="Switch Language / 切换语言 (中 / EN)"
          >
            <Globe className="w-3.5 h-3.5 text-[#D8FF3E]" />
            <span className="font-bold tracking-wider">{lang === 'zh' ? 'EN' : '中文'}</span>
          </button>

          {/* Quick ⌘K Search Trigger */}
          <button
            onClick={() => {
              playSpotlightClick();
              onOpenCommandPalette();
            }}
            className="flex items-center gap-2 px-2.5 py-1 border border-[#F2F0E8]/15 hover:border-[#D8FF3E] text-[#8B887F] hover:text-[#F2F0E8] transition-colors cursor-pointer text-xs"
            title="Press ⌘K or Ctrl+K to search"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t('nav.search')}</span>
            <kbd className="text-[10px] px-1 bg-white/10 text-[#F2F0E8] rounded">⌘K</kbd>
          </button>

          {/* Admin CMS Trigger */}
          <button
            onClick={() => {
              playSpotlightClick();
              onOpenCMS();
            }}
            className="p-1.5 border border-[#F2F0E8]/10 hover:border-[#F2F0E8]/30 text-[#8B887F] hover:text-[#F2F0E8] transition-colors cursor-pointer"
            title={t('nav.curator')}
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Strip */}
      <div className="md:hidden flex items-center justify-around border-t border-[#F2F0E8]/10 px-2 py-2 font-mono text-[10px]">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                playSpotlightClick();
                onSelectTab(tab.id);
              }}
              className={`transition-colors px-1.5 py-0.5 ${isActive ? 'text-[#D8FF3E] font-bold border-b border-[#D8FF3E]' : 'text-[#8B887F]'}`}
            >
              {t(tab.labelKey).split(' ')[1] || t(tab.labelKey)}
            </button>
          );
        })}
      </div>
    </header>
  );
};
