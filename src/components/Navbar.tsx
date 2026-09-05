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
  const navTabs: { id: MainViewType; label: string; icon: React.ReactNode }[] = [
    { id: 'cinema', label: '电影分镜', icon: <Clapperboard className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'atoms', label: '视觉材料', icon: <Atom className="w-3.5 h-3.5" /> },
    { id: 'principles', label: '设计原则', icon: <Scale className="w-3.5 h-3.5 text-emerald-400" /> },
    { id: 'styles', label: '风格规则', icon: <Compass className="w-3.5 h-3.5 text-indigo-400" /> },
    { id: 'mediums', label: '四大媒介', icon: <Layers className="w-3.5 h-3.5 text-pink-400" /> },
    { id: 'motion', label: '动态镜头', icon: <Film className="w-3.5 h-3.5 text-cyan-400" /> },
    { id: 'atlas', label: '作品图鉴', icon: <LayoutGrid className="w-3.5 h-3.5 text-yellow-400" /> },
    { id: 'shapes-lab', label: '算法工坊', icon: <Shapes className="w-3.5 h-3.5 text-purple-400" /> },
  ];

  return (
    <header
      className="sticky top-0 z-40 w-full border-b backdrop-blur-md transition-all duration-300"
      style={{
        backgroundColor: 'var(--bg-page-subtle)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div 
          className="flex items-center gap-3 shrink-0 cursor-pointer"
          onClick={() => onSwitchView('cinema')}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--bg-card)',
            }}
          >
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="font-serif font-black tracking-tight text-base" style={{ color: 'var(--text-main)' }}>
                视觉设计图鉴
              </span>
              <span
                className="text-[10px] font-mono px-2 py-0.5 rounded-full border font-medium hidden sm:inline-block"
                style={{
                  backgroundColor: 'var(--tag-bg)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--tag-text)',
                }}
              >
                Prompt Cinema
              </span>
            </div>
            <p className="text-[11px] font-sans hidden md:block" style={{ color: 'var(--text-muted)' }}>
              电影分镜 · 视觉原子 · 设计原则 · 摄制通告单
            </p>
          </div>
        </div>

        {/* View Switcher Tabs (Center Pill) */}
        <div
          className="flex items-center p-1 rounded-full border shadow-inner overflow-x-auto max-w-full scrollbar-none"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-subtle)',
          }}
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
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans font-bold transition-all cursor-pointer whitespace-nowrap"
                style={{
                  backgroundColor: isActive ? 'var(--pill-active-bg)' : 'transparent',
                  color: isActive ? 'var(--pill-active-text)' : 'var(--text-muted)',
                }}
              >
                {tab.icon}
                <span>{tab.label}</span>
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
