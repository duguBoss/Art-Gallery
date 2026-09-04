import React from 'react';
import { Sparkles, Shapes, Film, Atom, Compass, LayoutGrid } from 'lucide-react';
import { playSpotlightClick } from '../utils/audio';
import { ThemeSwitcher } from './ThemeSwitcher';
import type { GalleryTheme } from '../types/theme';

export type MainViewType = 'atoms' | 'styles' | 'motion' | 'atlas' | 'shapes-lab';

interface NavbarProps {
  currentView: MainViewType;
  onSwitchView: (view: MainViewType) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  currentTheme: GalleryTheme;
  onSelectTheme: (theme: GalleryTheme) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onSwitchView,
  searchQuery,
  onSearchChange,
  currentTheme,
  onSelectTheme,
}) => {
  const navTabs: { id: MainViewType; label: string; icon: React.ReactNode }[] = [
    { id: 'atoms', label: '视觉原子', icon: <Atom className="w-3.5 h-3.5" /> },
    { id: 'styles', label: '风格规则', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'motion', label: '动态与镜头', icon: <Film className="w-3.5 h-3.5" /> },
    { id: 'atlas', label: '作品图鉴', icon: <LayoutGrid className="w-3.5 h-3.5" /> },
    { id: 'shapes-lab', label: '算法工坊', icon: <Shapes className="w-3.5 h-3.5 text-amber-400" /> },
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
          onClick={() => onSwitchView('atoms')}
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
                Visual Design Atlas
              </span>
            </div>
            <p className="text-[11px] font-sans hidden md:block" style={{ color: 'var(--text-muted)' }}>
              看见 · 理解 · 拆解 · 重构
            </p>
          </div>
        </div>

        {/* View Switcher Tabs (Center Pill) */}
        <div
          className="flex items-center p-1 rounded-full border shadow-inner overflow-x-auto max-w-full"
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
                className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-sans font-bold transition-all cursor-pointer whitespace-nowrap"
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

        {/* Right Tools: Artistic Atmosphere Theme Switcher */}
        <div className="flex items-center gap-3">
          <ThemeSwitcher currentTheme={currentTheme} onSelectTheme={onSelectTheme} />
        </div>
      </div>
    </header>
  );
};
