import React from 'react';
import type { MainViewType } from './Navbar';
import { CHAPTER_LIST } from './ChapterDock';
import { ChevronLeft, ChevronRight, Play, Maximize2 } from 'lucide-react';
import { playSpotlightClick } from '../utils/audio';

interface SlideControlBarProps {
  currentView: MainViewType;
  onSwitchView: (view: MainViewType) => void;
}

export const SlideControlBar: React.FC<SlideControlBarProps> = ({
  currentView,
  onSwitchView,
}) => {
  const currentIdx = Math.max(0, CHAPTER_LIST.findIndex((c) => c.id === currentView));
  const activeChapter = CHAPTER_LIST[currentIdx] || CHAPTER_LIST[0];

  const handlePrev = () => {
    if (currentIdx > 0) {
      playSpotlightClick();
      onSwitchView(CHAPTER_LIST[currentIdx - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIdx < CHAPTER_LIST.length - 1) {
      playSpotlightClick();
      onSwitchView(CHAPTER_LIST[currentIdx + 1].id);
    }
  };

  return (
    <nav 
      aria-label="PPT 幻灯片导航栏"
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 select-none max-w-4xl w-[92vw] sm:w-auto"
    >
      <div className="flex items-center justify-between sm:justify-center gap-2 sm:gap-5 px-3.5 sm:px-6 py-2 rounded-full bg-black/85 backdrop-blur-2xl border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.8)]">
        {/* Previous Slide Button */}
        <button
          onClick={handlePrev}
          disabled={currentIdx === 0}
          className={`p-1.5 sm:px-3 sm:py-1 rounded-full border text-xs font-mono flex items-center gap-1 transition-all ${
            currentIdx === 0
              ? 'opacity-30 border-white/5 cursor-not-allowed text-white/40'
              : 'border-white/15 hover:border-amber-400/50 bg-white/[0.04] hover:bg-amber-400/10 text-white/80 hover:text-amber-300'
          }`}
          title="上一页 PPT (↑ / ← / PageUp)"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">上一页</span>
        </button>

        {/* 8-Slide Keynote Segmented Dots */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {CHAPTER_LIST.map((chapter, idx) => {
            const isActive = idx === currentIdx;
            return (
              <button
                key={chapter.id}
                onClick={() => {
                  playSpotlightClick();
                  onSwitchView(chapter.id);
                }}
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-6 sm:w-8 h-2 bg-amber-400 shadow-[0_0_10px_#f59e0b]'
                    : 'w-2 h-2 bg-white/25 hover:bg-white/60'
                }`}
                title={`跳转至第 0${idx + 1} 页：${chapter.title}`}
              />
            );
          })}
        </div>

        {/* Next Slide Button */}
        <button
          onClick={handleNext}
          disabled={currentIdx === CHAPTER_LIST.length - 1}
          className={`p-1.5 sm:px-3 sm:py-1 rounded-full border text-xs font-mono flex items-center gap-1 transition-all ${
            currentIdx === CHAPTER_LIST.length - 1
              ? 'opacity-30 border-white/5 cursor-not-allowed text-white/40'
              : 'border-white/15 hover:border-amber-400/50 bg-white/[0.04] hover:bg-amber-400/10 text-white/80 hover:text-amber-300'
          }`}
          title="下一页 PPT (↓ / → / Space / PageDown)"
        >
          <span className="hidden sm:inline">下一页</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        {/* Slide Counter HUD */}
        <div className="hidden md:flex items-center gap-2 pl-3 border-l border-white/15 text-[11px] font-mono">
          <span className="text-amber-300 font-bold">
            0{currentIdx + 1}
          </span>
          <span className="text-white/30">/</span>
          <span className="text-white/50">08</span>
          <span className="text-white/60 ml-1 font-sans text-xs font-light">
            {activeChapter.title}
          </span>
          <span className="text-[9px] text-white/30 ml-1">
            [滚轮 / 空格键翻页]
          </span>
        </div>
      </div>
    </nav>
  );
};
