import React, { useState, useEffect } from 'react';
import type { MainViewType } from './Navbar';
import { CHAPTER_LIST } from './ChapterDock';

interface VisualGuidanceRailProps {
  currentView: MainViewType;
  onSelectChapter: (id: MainViewType) => void;
}

export const VisualGuidanceRail: React.FC<VisualGuidanceRailProps> = ({
  currentView,
  onSelectChapter,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const currentScroll = window.scrollY || document.documentElement.scrollTop;
        const progress = Math.min(Math.max(currentScroll / docHeight, 0), 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeIdx = CHAPTER_LIST.findIndex((c) => c.id === currentView);

  return (
    <aside
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center select-none pointer-events-auto transition-all duration-300"
      aria-label="视觉引导光轨导航"
    >
      {/* Precision HUD Metadata Header */}
      <div className={`mb-3 flex flex-col items-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-40'}`}>
        <span className="text-[9px] font-mono tracking-[0.25em] text-white/50 uppercase">
          RAIL
        </span>
        <span className="text-[10px] font-mono font-bold text-amber-300">
          {Math.round(scrollProgress * 100)}%
        </span>
      </div>

      {/* Main Optical Glass Fiber Rail Track */}
      <div className="relative w-1.5 h-64 sm:h-80 rounded-full bg-white/10 backdrop-blur-md overflow-hidden p-0.5 flex flex-col justify-start">
        {/* Active Laser Core Filling Rail */}
        <div
          className="w-full rounded-full bg-gradient-to-b from-amber-400 via-amber-200 to-amber-500 transition-all duration-150 relative shadow-[0_0_12px_rgba(251,191,36,0.8)]"
          style={{ height: `${Math.max(scrollProgress * 100, 3)}%` }}
        >
          {/* Leading Edge Glowing Plasma Orb */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_14px_#fbbf24] animate-pulse" />
        </div>
      </div>

      {/* 8 Discrete Tier Spatial Anchors */}
      <div className="absolute top-9 bottom-9 -left-2.5 right-0 flex flex-col justify-between pointer-events-none">
        {CHAPTER_LIST.map((chapter, idx) => {
          const isActive = idx === activeIdx;
          const isPassed = idx < activeIdx;

          return (
            <div
              key={chapter.id}
              onClick={() => onSelectChapter(chapter.id)}
              className="group pointer-events-auto flex items-center gap-3 cursor-pointer py-1"
            >
              {/* Tick Bead */}
              <div
                className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 flex items-center justify-center ${
                  isActive
                    ? 'border-amber-300 bg-amber-400 shadow-[0_0_10px_#f59e0b] scale-125'
                    : isPassed
                    ? 'border-white/40 bg-white/30'
                    : 'border-white/15 bg-black/40 group-hover:border-white/50 group-hover:scale-110'
                }`}
              >
                {isActive && <div className="w-1 h-1 rounded-full bg-black" />}
              </div>

              {/* Hover Flyout Label (Apple-style pill tag) */}
              <div
                className={`flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/85 backdrop-blur-xl border border-white/15 shadow-2xl transition-all duration-300 whitespace-nowrap ${
                  isHovered || isActive
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-3 pointer-events-none'
                }`}
              >
                <span className="text-[10px] font-mono text-amber-300 font-semibold">
                  {chapter.num}
                </span>
                <span className="text-xs font-sans text-white/90 font-medium">
                  {chapter.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Downward Gravity Beam Arrow */}
      <div className="mt-3 flex flex-col items-center opacity-30 group-hover:opacity-80 transition-opacity">
        <span className="w-0.5 h-4 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </aside>
  );
};
