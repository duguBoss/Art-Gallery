import React, { useState } from 'react';
import { Sparkles, Shapes, Film, Atom, Compass, LayoutGrid, Scale, Layers, Clapperboard, Settings, ChevronDown } from 'lucide-react';
import { playSpotlightClick } from '../utils/audio';
import { ThemeSwitcher } from './ThemeSwitcher';
import type { GalleryTheme } from '../types/theme';

export type MainViewType = 'cinema' | 'atoms' | 'principles' | 'styles' | 'mediums' | 'motion' | 'atlas' | 'shapes-lab';

interface NavbarProps {
  currentView: MainViewType;
  onSwitchView: (view: MainViewType) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  currentTheme: GalleryTheme;
  onSelectTheme: (theme: GalleryTheme) => void;
  onOpenCMS: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onSwitchView,
  currentTheme,
  onSelectTheme,
  onOpenCMS,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navTabs: { id: MainViewType; label: string; shortLabel: string; num: string }[] = [
    { id: 'cinema', label: '电影分镜', shortLabel: '分镜', num: '00' },
    { id: 'atoms', label: '视觉材料', shortLabel: '材料', num: '01' },
    { id: 'principles', label: '设计原则', shortLabel: '原则', num: '02' },
    { id: 'styles', label: '风格规则', shortLabel: '风格', num: '03' },
    { id: 'mediums', label: '四大媒介', shortLabel: '媒介', num: '04' },
    { id: 'motion', label: '动态镜头', shortLabel: '镜头', num: '05' },
    { id: 'atlas', label: '作品图鉴', shortLabel: '图鉴', num: '06' },
    { id: 'shapes-lab', label: '算法工坊', shortLabel: '工坊', num: '07' },
  ];

  const activeTab = navTabs.find((t) => t.id === currentView) || navTabs[0];

  return (
    <header
      className="sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-colors duration-300"
      style={{
        backgroundColor: 'rgba(5, 5, 8, 0.85)',
        borderColor: 'rgba(255, 255, 255, 0.08)',
      }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand: Museum Editorial Typography */}
        <div 
          className="flex items-center gap-2.5 shrink-0 cursor-pointer group"
          onClick={() => onSwitchView('cinema')}
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center border border-white/10 shadow-sm transition-transform group-hover:scale-105"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--bg-card)',
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-display font-bold tracking-[0.14em] text-xs sm:text-sm uppercase text-white">
              VISUAL ATLAS
            </span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border tracking-wider uppercase hidden md:inline-block bg-white/[0.04] border-white/10 text-amber-300/80">
              8K CINEMA
            </span>
          </div>
        </div>

        {/* Center: Desktop Segmented Navigation (Zero Scrollbars, Pure Luxury) */}
        <nav className="hidden xl:flex items-center p-0.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md">
          {navTabs.map((tab) => {
            const isActive = currentView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  playSpotlightClick();
                  onSwitchView(tab.id);
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-white/20 text-white font-medium shadow-sm border border-white/20'
                    : 'text-white/50 hover:text-white hover:bg-white/[0.06] border border-transparent'
                }`}
              >
                <span className="text-[9px] font-mono opacity-40">{tab.num}</span>
                <span className="font-sans text-[11px] tracking-tight">{tab.shortLabel}</span>
              </button>
            );
          })}
        </nav>

        {/* Center: Compact Dropdown for Medium Screens */}
        <div className="xl:hidden relative">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/15 bg-white/[0.05] text-white/90 text-xs font-medium hover:bg-white/10 transition-all"
          >
            <span className="text-[10px] font-mono text-amber-400">{activeTab.num}</span>
            <span>{activeTab.label}</span>
            <ChevronDown className="w-3 h-3 opacity-60 ml-0.5" />
          </button>

          {mobileMenuOpen && (
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 rounded-xl bg-black/95 border border-white/15 shadow-2xl p-1.5 z-50 backdrop-blur-2xl animate-fadeIn">
              {navTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    playSpotlightClick();
                    onSwitchView(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors ${
                    currentView === tab.id
                      ? 'bg-amber-400/15 text-amber-300 font-semibold'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className="text-[10px] font-mono opacity-40">{tab.num}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Tools: Theme Switcher & CMS Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              playSpotlightClick();
              onOpenCMS();
            }}
            className="px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-mono font-medium border border-white/10 flex items-center gap-1.5 transition-all hover:bg-white/10 shrink-0 whitespace-nowrap text-white/80"
            title="打开策展运维后台"
          >
            <Settings className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline text-[11px]">策展后台</span>
          </button>

          <div className="shrink-0">
            <ThemeSwitcher currentTheme={currentTheme} onSelectTheme={onSelectTheme} />
          </div>
        </div>
      </div>
    </header>
  );
};
