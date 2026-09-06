import React from 'react';
import { Compass, ArrowDown, ChevronDown } from 'lucide-react';
import { playSpotlightClick } from '../utils/audio';

interface StageHeaderHUDProps {
  stepIndex: number;
  title: string;
  titleEn: string;
  desc: string;
  elevationMeters: number;
  onNextScreen?: () => void;
}

export const StageHeaderHUD: React.FC<StageHeaderHUDProps> = ({
  stepIndex,
  title,
  titleEn,
  desc,
  elevationMeters,
  onNextScreen,
}) => {
  return (
    <header className="w-full max-w-7xl mx-auto mb-6 select-none">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
        {/* Left Side: Step Badge, Elevation & Titles */}
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40 tracking-wider uppercase flex items-center gap-1.5 shadow-[0_0_10px_rgba(245,158,11,0.25)]">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping" />
              ▲ SCREEN 0{stepIndex} / 07
            </span>
            <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase flex items-center gap-1">
              <Compass className="w-3 h-3 text-amber-400/70" />
              ELEVATION +{elevationMeters}M // 空间台阶
            </span>
          </div>

          <h2 className="text-xl sm:text-3xl font-serif font-normal text-white tracking-tight flex items-center gap-3">
            <span>{title}</span>
            <span className="text-xs sm:text-sm font-mono text-amber-200/60 uppercase tracking-widest font-light">
              {titleEn}
            </span>
          </h2>
          <p className="text-xs text-white/60 font-sans font-light mt-1 max-w-2xl line-clamp-1">
            {desc}
          </p>
        </div>

        {/* Right Side: 8-Step Equalizer & Quick Advance Button */}
        <div className="flex items-center gap-4">
          <div className="flex items-end gap-1 p-2 rounded-xl bg-white/[0.03] border border-white/10">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((tier) => {
              const isCurrent = tier === stepIndex;
              const isPast = tier < stepIndex;
              const height = (tier + 1) * 3 + 8;
              return (
                <div key={tier} className="flex flex-col items-center gap-0.5">
                  <div
                    className={`w-2.5 sm:w-3 rounded-xs transition-all duration-500 ${
                      isCurrent
                        ? 'bg-amber-400 shadow-md shadow-amber-400/60 scale-110'
                        : isPast
                        ? 'bg-white/40'
                        : 'bg-white/10'
                    }`}
                    style={{ height: `${height}px` }}
                  />
                  <span className={`text-[6px] font-mono ${isCurrent ? 'text-amber-300 font-bold' : 'text-white/30'}`}>
                    0{tier}
                  </span>
                </div>
              );
            })}
          </div>

          {onNextScreen && stepIndex < 7 && (
            <button
              onClick={() => {
                playSpotlightClick();
                onNextScreen();
              }}
              className="px-3 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 hover:bg-amber-400/20 text-[10px] font-mono text-amber-300 flex items-center gap-1.5 transition-all hover:scale-105"
              title="滚动鼠标或点击切换下一屏"
            >
              <span>下一屏</span>
              <ChevronDown className="w-3 h-3 animate-bounce" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
