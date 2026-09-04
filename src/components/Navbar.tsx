import React from 'react';
import { Sparkles, Search, Film, Image as ImageIcon } from 'lucide-react';
import { playSpotlightClick } from '../utils/audio';

export type MainViewType = 'image-lab' | 'video-lab';

interface NavbarProps {
  currentView: MainViewType;
  onSwitchView: (view: MainViewType) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onSwitchView,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-sans font-black tracking-tight text-base text-gray-900">
                万象视听灵感
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 font-medium">
                Art & AI Lab
              </span>
            </div>
            <p className="text-[11px] text-gray-500 font-sans hidden sm:block">
              图片提示词拆解 · 视频分步工作流
            </p>
          </div>
        </div>

        {/* View Switcher Tabs (Center Pill) */}
        <div className="flex items-center p-1 rounded-full bg-gray-100 border border-gray-200 shadow-inner">
          <button
            onClick={() => {
              playSpotlightClick();
              onSwitchView('image-lab');
            }}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-sans font-bold transition-all cursor-pointer ${
              currentView === 'image-lab'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>🎨 图片风格提示词</span>
          </button>

          <button
            onClick={() => {
              playSpotlightClick();
              onSwitchView('video-lab');
            }}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-sans font-bold transition-all cursor-pointer ${
              currentView === 'video-lab'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>🎬 视频分步工作流</span>
          </button>
        </div>

        {/* Global Search */}
        <div className="hidden md:flex items-center max-w-xs w-full relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="搜索风格或工具，如 VOX, 锈湖..."
            className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500 transition-all"
          />
        </div>
      </div>
    </header>
  );
};