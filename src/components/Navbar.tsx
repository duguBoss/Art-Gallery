import React from 'react';
import { Sparkles, Shapes, Film, Atom, Compass, LayoutGrid, Scale, Layers, Clapperboard, Settings } from 'lucide-react';
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
  searchQuery,
  onSearchChange,
  currentTheme,
  onSelectTheme,
  onOpenCMS,
}) => {
  const navTabs: { id: MainViewType; label: string; num: string; icon: React.ReactNode }[] = [
    { id: 'cinema', label: '电影分镜', num: '00', icon: <Clapperboard className="w-3.5 h-3.5 opacity-80" /> },
    { id: 'atoms', label: '视觉材料', num: '01', icon: <Atom className="w-3.5 h-3.5 opacity-80" /> },
    { id: 'principles', label: '设计原则', num: '02', icon: <Scale className="w-3.5 h-3.5 opacity-80" /> },
    { id: 'styles', label: '风格规则', num: '03', icon: <Compass className="w-3.5 h-3.5 opacity-80" /> },
    { id: 'mediums', label: '四大媒介', num: '04', icon: <Layers className="w-3.5 h-3.5 opacity-80" /> },
    { id: 'motion', label: '动态镜头', num: '05', icon: <Film className="w-3.5 h-3.5 opacity-80" /> },
    { id: 'atlas', label: '作品图鉴', num: '06', icon: <LayoutGrid className="w-3.5 h-3.5 opacity-80" /> },
    { id: 'shapes-lab', label: '算法工坊', num: '07', icon: <Shapes className="w-3.5 h-3.5 opacity-80" /> },
  ];

  return (
    <header
      className="sticky top-0 z-40 w-full border-b backdrop-blur-xl transition-all duration-300"
      style={{
        backgroundColor: 'var(--bg-page-subtle)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand: Museum Editorial Typography */}
        <div 
          className="flex items-center gap-3.5 shrink-0 cursor-pointer group"
          onClick={() => onSwitchView('cinema')}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 shadow-sm transition-transform group-hover:scale-105"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--bg-card)',
            }}
          >
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold tracking-[0.16em] text-sm uppercase text-white/95">
                VISUAL ATLAS
              </span>
              <span
                className="text-[9px] font-mono px-2 py-0.5 rounded-full border tracking-widest uppercase hidden sm:inline-block bg-white/[0.04] border-white/10 text-amber-300/80"
              >
                PROMPT CINEMA
              </span>
            </div>
            <p className="text-[10px] font-mono tracking-wider opacity-40 hidden md:block">
              镜头叙事 · 视觉原子 · 设计原则 · 好莱坞通告单
            </p>
          </div>
        </div>

        {/* View Switcher Tabs (Center Minimalist Pill) */}
        <div
          className="flex items-center p-1 rounded-full border shadow-inner overflow-x-auto max-w-full scrollbar-none bg-black/40 border-white/10"
        >
          {navTabs.map((tab) => {
            const isActive = currentView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  playSpotlightClick();
                  onSwitchView(tab.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-white/15 text-white font-semibold shadow-sm border border-white/15'
                    : 'text-white/50 hover:text-white/90 hover:bg-white/5 border border-transparent'
                }`}
              >
                <span className="text-[9px] font-mono opacity-40">{tab.num}</span>
                {tab.icon}
                <span className="font-sans text-[11px] tracking-wide">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Tools: Artistic Atmosphere Theme Switcher & CMS Button */}
        <div className="flex items-center gap-2.5">
          {/* Explicit Curator CMS Entry */}
          <button
            onClick={() => {
              playSpotlightClick();
              onOpenCMS();
            }}
            className="px-3 py-1.5 rounded-full text-xs font-mono font-medium border flex items-center gap-1.5 transition-all hover:bg-white/10"
            style={{
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-main)',
            }}
            title="打开策展运维管理后台 (支持新增与导出)"
          >
            <Settings className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">策展后台</span>
          </button>

          <ThemeSwitcher currentTheme={currentTheme} onSelectTheme={onSelectTheme} />
        </div>
      </div>
    </header>
  );
};
