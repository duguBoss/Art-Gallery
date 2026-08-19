import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Compass, Palette, Send, Search, LayoutGrid, Image as ImageIcon } from 'lucide-react';
import { toggleAmbientSound, playSpotlightClick } from '../utils/audio';

interface NavbarProps {
  currentView: 'wall' | 'styles';
  onSwitchView: (view: 'wall' | 'styles') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenMixer: () => void;
  onOpenPalette: () => void;
  onOpenSubmit: () => void;
  onOpenTour: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onSwitchView,
  searchQuery,
  onSearchChange,
  onOpenMixer,
  onOpenPalette,
  onOpenSubmit,
  onOpenTour,
}) => {
  const [isAudioOn, setIsAudioOn] = useState(false);

  const handleAudioToggle = () => {
    playSpotlightClick();
    const state = toggleAmbientSound();
    setIsAudioOn(state);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gallery-800/80 bg-gallery-950/85 backdrop-blur-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 shrink-0">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gallery-800 to-gallery-900 border border-gold-500/40 p-2 flex items-center justify-center shadow-glow-gold/20 group-hover:border-gold-400 transition-all duration-300">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-gold-400 fill-current opacity-90" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-black tracking-widest text-lg text-gallery-100 group-hover:text-gold-300 transition-colors">
                  ART GALLERY
                </span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-gold-500/10 text-gold-400 border border-gold-500/20">
                  万象艺术画廊
                </span>
              </div>
              <p className="text-[11px] text-gallery-400 tracking-wider font-sans">
                艺术创作流派与视觉美学博览馆
              </p>
            </div>
          </a>
        </div>

        <div className="hidden lg:flex items-center p-1 rounded-full bg-gallery-900 border border-gallery-800">
          <button
            onClick={() => {
              playSpotlightClick();
              onSwitchView('wall');
            }}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-serif font-bold transition-all cursor-pointer ${
              currentView === 'wall'
                ? 'bg-gold-500 text-gallery-950 shadow-glow-gold/30'
                : 'text-gallery-300 hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>🖼️ 全景画墙博览</span>
          </button>

          <button
            onClick={() => {
              playSpotlightClick();
              onSwitchView('styles');
            }}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-serif font-bold transition-all cursor-pointer ${
              currentView === 'styles'
                ? 'bg-gold-500 text-gallery-950 shadow-glow-gold/30'
                : 'text-gallery-300 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>🏛️ 流派主题展厅</span>
          </button>
        </div>

        <div className="hidden md:flex flex-1 max-w-xs relative">
          <Search className="w-4 h-4 text-gallery-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="搜索流派与画作，如 VOX, 锈湖..."
            className="w-full pl-9 pr-3 py-1.5 bg-gallery-900 border border-gallery-700/80 rounded-full text-xs text-gallery-200 placeholder-gallery-400 focus:outline-none focus:border-gold-500/60 transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              playSpotlightClick();
              onOpenTour();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-gold-600/20 to-gold-500/10 border border-gold-500/40 text-gold-300 hover:border-gold-400 hover:text-gold-200 text-xs font-sans font-medium transition-all cursor-pointer"
            title="开启沉浸式展厅漫步巡礼"
          >
            <Compass className="w-3.5 h-3.5 animate-pulse" />
            <span className="hidden sm:inline">沉浸漫游</span>
          </button>

          <button
            onClick={() => {
              playSpotlightClick();
              onOpenPalette();
            }}
            className="p-2.5 rounded-full bg-gallery-900 border border-gallery-700 text-gallery-300 hover:text-gold-300 hover:border-gold-500/40 text-xs transition-all cursor-pointer"
            title="全馆色谱基因"
          >
            <Palette className="w-4 h-4 text-accent-cyan" />
          </button>

          <button
            onClick={() => {
              playSpotlightClick();
              onOpenMixer();
            }}
            className="p-2.5 rounded-full bg-gallery-900 border border-gallery-700 text-gallery-300 hover:text-gold-300 hover:border-gold-500/40 text-xs transition-all cursor-pointer"
            title="风格灵感碰撞器"
          >
            <Sparkles className="w-4 h-4 text-accent-violet" />
          </button>

          <button
            onClick={handleAudioToggle}
            className={`p-2.5 rounded-full border transition-all cursor-pointer ${
              isAudioOn 
                ? 'bg-gold-500/20 border-gold-500 text-gold-300 shadow-glow-gold/30' 
                : 'bg-gallery-900 border-gallery-700 text-gallery-400 hover:text-gallery-200'
            }`}
            title={isAudioOn ? '关闭展厅白噪音' : '开启展厅沉浸环境音'}
          >
            {isAudioOn ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              playSpotlightClick();
              onOpenSubmit();
            }}
            className="p-2.5 rounded-full bg-gallery-900 border border-gallery-700 text-gallery-400 hover:text-gold-300 transition-all cursor-pointer"
            title="推荐新艺术流派"
          >
            <Send className="w-4 h-4" />
          </button>

          <a
            href="https://github.com/duguBoss/Art-Gallery.git"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-gallery-900 border border-gallery-700 text-gallery-400 hover:text-white transition-all"
            title="GitHub 源码"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
        </div>
      </div>

      <div className="lg:hidden px-4 pb-3 flex flex-col gap-2">
        <div className="flex items-center justify-center p-1 rounded-full bg-gallery-900 border border-gallery-800">
          <button
            onClick={() => onSwitchView('wall')}
            className={`flex-1 py-1 rounded-full text-xs font-serif font-bold transition-all ${
              currentView === 'wall'
                ? 'bg-gold-500 text-gallery-950'
                : 'text-gallery-300'
            }`}
          >
            🖼️ 全景画墙
          </button>
          <button
            onClick={() => onSwitchView('styles')}
            className={`flex-1 py-1 rounded-full text-xs font-serif font-bold transition-all ${
              currentView === 'styles'
                ? 'bg-gold-500 text-gallery-950'
                : 'text-gallery-300'
            }`}
          >
            🏛️ 流派展厅
          </button>
        </div>
      </div>
    </header>
  );
};