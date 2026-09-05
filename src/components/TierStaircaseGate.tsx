import React from 'react';
import type { MainViewType } from './Navbar';
import { CHAPTER_LIST } from './ChapterDock';
import { ChevronDown, ArrowUpRight } from 'lucide-react';

interface TierStaircaseGateProps {
  stepIndex: number; // 1 to 7
  title: string;
  titleEn?: string;
  subtitle?: string;
  desc?: string;
  elevationMeters: number;
  onAscend?: () => void;
}

export const TierStaircaseGate: React.FC<TierStaircaseGateProps> = ({
  stepIndex,
  title,
  titleEn,
  subtitle,
  desc,
  elevationMeters,
  onAscend,
}) => {
  const displayEn = titleEn || subtitle || 'Architectural Tier';
  const displayDesc = desc || subtitle || '';
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 my-20 select-none">
      <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] via-black/40 to-transparent p-6 sm:p-10 overflow-hidden backdrop-blur-xl shadow-2xl">
        {/* Subtle Ascending Glow Beam */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
          <div>
            {/* Step Badge & Altitude Elevation */}
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40 tracking-wider uppercase">
                ▲ STEP 0{stepIndex} OF 07
              </span>
              <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase">
                ELEVATION +{elevationMeters}M // 空间阶梯攀升
              </span>
            </div>

            {/* Title */}
            <h2 
              onClick={onAscend}
              className={`text-2xl sm:text-4xl font-serif font-normal text-white/95 tracking-tight flex items-center gap-3 ${onAscend ? 'cursor-pointer hover:text-amber-300 transition-colors' : ''}`}
            >
              <span>登上第 {stepIndex} 级台阶 · {title}</span>
              <ArrowUpRight className="w-6 h-6 text-amber-400 opacity-80 hidden sm:inline" />
            </h2>
            {displayEn && (
              <p className="text-xs sm:text-sm font-mono text-amber-200/60 uppercase tracking-wider mt-1">
                {displayEn}
              </p>
            )}
            {displayDesc && (
              <p className="text-xs sm:text-sm text-white/60 font-sans font-light mt-2 max-w-2xl leading-relaxed">
                {displayDesc}
              </p>
            )}
          </div>

          {/* 8-Tier Visual Staircase Graphic */}
          <div className="flex items-end gap-1.5 p-3 rounded-2xl bg-white/[0.03] border border-white/10 self-start md:self-end">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((tier) => {
              const isCurrent = tier === stepIndex;
              const isPast = tier < stepIndex;
              const height = (tier + 1) * 5 + 8; // Escalating heights: 8px to 48px
              return (
                <div key={tier} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-3.5 sm:w-4 rounded-sm transition-all duration-500 ${
                      isCurrent
                        ? 'bg-amber-400 shadow-lg shadow-amber-400/50 scale-105'
                        : isPast
                        ? 'bg-white/40'
                        : 'bg-white/10'
                    }`}
                    style={{ height: `${height}px` }}
                    title={`第 0${tier} 级台阶`}
                  />
                  <span className={`text-[8px] font-mono ${isCurrent ? 'text-amber-300 font-bold' : 'text-white/30'}`}>
                    0{tier}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Downward Scroll Cue */}
        <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/40">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>继续向下滚动，步入展厅深处</span>
          </span>
          <span className="flex items-center gap-1 text-white/30">
            <span>SCROLL DOWN CONTINUOUSLY</span>
            <ChevronDown className="w-3 h-3 animate-bounce" />
          </span>
        </div>
      </div>
    </div>
  );
};
