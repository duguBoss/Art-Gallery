import React from 'react';
import { Sparkles, Search, Film, Image as ImageIcon, Shapes } from 'lucide-react';
import { playSpotlightClick } from '../utils/audio';
import { ThemeSwitcher } from './ThemeSwitcher';
import type { GalleryTheme } from '../types/theme';

export type MainViewType = 'image-lab' | 'shapes-lab' | 'video-lab';

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
        <div className="flex items-center gap-3 shrink-0">
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
                万象视听灵感
              </span>
              <span
                className="text-[10px] font-mono px-2 py-0.5 rounded-full border font-medium"
                style={{
                  backgroundColor: 'var(--tag-bg)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--tag-text)',
                }}
              >
                Art & Motion AI
              </span>
            </div>
            <p className="text-[11px] font-sans hidden sm:block" style={{ color: 'var(--text-muted)' }}>
              提示词积木拆解 · 形态之书矢量 · 视频分步工作流
            </p>
          </div>
        </div>

        {/* View Switcher Tabs (Center Pill) */}
        <div
          className="flex items-center p-1 rounded-full border shadow-inner"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-subtle)',
          }}
        >
          <button
            onClick={() => {
              playSpotlightClick();
              onSwitchView('shapes-lab');
            }}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-sans font-bold transition-all cursor-pointer"
            style={{
              backgroundColor: currentView === 'shapes-lab' ? 'var(--pill-active-bg)' : 'transparent',
              color: currentView === 'shapes-lab' ? 'var(--pill-active-text)' : 'var(--text-muted)',
            }}
          >
            <Shapes className="w-3.5 h-3.5 text-amber-500" />
            <span>📐 算法海报设计台</span>
          </button>

          <button
            onClick={() => {
              playSpotlightClick();
              onSwitchView('image-lab');
            }}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-sans font-bold transition-all cursor-pointer"
            style={{
              backgroundColor: currentView === 'image-lab' ? 'var(--pill-active-bg)' : 'transparent',
              color: currentView === 'image-lab' ? 'var(--pill-active-text)' : 'var(--text-muted)',
            }}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>🎨 风格灵感典藏</span>
          </button>

          <button
            onClick={() => {
              playSpotlightClick();
              onSwitchView('video-lab');
            }}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-sans font-bold transition-all cursor-pointer"
            style={{
              backgroundColor: currentView === 'video-lab' ? 'var(--pill-active-bg)' : 'transparent',
              color: currentView === 'video-lab' ? 'var(--pill-active-text)' : 'var(--text-muted)',
            }}
          >
            <Film className="w-3.5 h-3.5" />
            <span>🎬 视频分步工作流</span>
          </button>
        </div>

        {/* Right Tools: Search + Theme Switcher */}
        <div className="flex items-center gap-3">
          {/* Global Search */}
          <div className="hidden md:flex items-center max-w-[200px] w-full relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="搜索风格或工具..."
              className="w-full pl-8 pr-3 py-1.5 rounded-full text-xs focus:outline-none transition-all border"
              style={{
                backgroundColor: 'var(--bg-input)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-main)',
              }}
            />
          </div>

          {/* Artistic Mood Switcher */}
          <ThemeSwitcher currentTheme={currentTheme} onSelectTheme={onSelectTheme} />
        </div>
      </div>
    </header>
  );
};