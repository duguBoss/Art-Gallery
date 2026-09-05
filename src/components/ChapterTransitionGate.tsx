import React from 'react';
import type { MainViewType } from './Navbar';
import { CHAPTER_LIST } from './ChapterDock';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { playSpotlightClick } from '../utils/audio';

interface ChapterTransitionGateProps {
  currentView: MainViewType;
  onSwitchView: (view: MainViewType) => void;
}

export const ChapterTransitionGate: React.FC<ChapterTransitionGateProps> = ({
  currentView,
  onSwitchView,
}) => {
  const currentIdx = CHAPTER_LIST.findIndex((c) => c.id === currentView);
  const currentChapter = CHAPTER_LIST[currentIdx] || CHAPTER_LIST[0];
  const nextChapter = CHAPTER_LIST[currentIdx + 1] || null;
  const prevChapter = CHAPTER_LIST[currentIdx - 1] || null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 mt-16 mb-8 select-none">
      <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent p-6 sm:p-10 overflow-hidden backdrop-blur-sm">
        {/* Subtle Decorative Ambient Beam */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-96 h-24 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          {/* Current Chapter Completed Status */}
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase mb-1">
              <span>EXHIBITION TIMELINE</span>
              <span>•</span>
              <span>{currentChapter.num} / 07 COMPLETED</span>
            </div>
            <h4 className="text-base sm:text-lg font-serif font-medium text-white/90">
              当前展厅：{currentChapter.title}
            </h4>
            <p className="text-xs text-white/50 font-sans font-light mt-0.5">
              {currentChapter.desc}
            </p>
          </div>

          {/* Action Buttons: Next Chapter Deck Flip */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
            {prevChapter && (
              <button
                onClick={() => {
                  playSpotlightClick();
                  onSwitchView(prevChapter.id);
                }}
                className="px-4 py-3 rounded-2xl border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.06] text-xs font-mono text-white/70 hover:text-white transition-all flex items-center gap-2"
                title={`返回 ${prevChapter.num} · ${prevChapter.title}`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{prevChapter.title}</span>
                <span className="md:hidden">上一展厅</span>
              </button>
            )}

            {nextChapter ? (
              <button
                onClick={() => {
                  playSpotlightClick();
                  onSwitchView(nextChapter.id);
                }}
                className="group flex-1 sm:flex-initial px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-serif font-bold text-xs sm:text-sm tracking-wide shadow-xl shadow-amber-400/20 transition-all flex items-center justify-center gap-3 cursor-pointer hover:scale-[1.02]"
              >
                <span>下一展厅 // {nextChapter.num} · {nextChapter.title}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            ) : (
              <button
                onClick={() => {
                  playSpotlightClick();
                  onSwitchView('cinema');
                }}
                className="px-6 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-mono text-xs sm:text-sm transition-all flex items-center gap-2"
              >
                <span>返回展映起点 (00 电影分镜)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
