import React, { useState } from 'react';
import { ChevronDown, ArrowUpRight, Aperture, Compass } from 'lucide-react';
import { playSpotlightClick } from '../utils/audio';

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
  const [isHovered, setIsHovered] = useState(false);
  const displayEn = titleEn || subtitle || 'Architectural Tier';
  const displayDesc = desc || subtitle || '';

  const handleAscendClick = () => {
    playSpotlightClick();
    if (onAscend) onAscend();
  };

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full max-w-7xl mx-auto px-4 sm:px-8 my-20 select-none relative"
    >
      {/* 1. Visual Continuity Guidance Rail - Vertical Central Laser Thread */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[1.5px] h-16 bg-gradient-to-b from-transparent via-amber-400/40 to-amber-400" />

      {/* 2. Main Architectural Chamber Capsule */}
      <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] via-black/50 to-transparent p-6 sm:p-10 overflow-hidden backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] transition-all duration-500 hover:border-amber-400/30">
        {/* Ambient Top Light Flare */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-28 bg-gradient-to-b from-amber-400/15 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          {/* Left Block: Step Meta & Narrative Typography */}
          <div className="flex-1">
            {/* Step Badge & Altitude Elevation */}
            <div className="flex items-center flex-wrap gap-3 mb-3">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40 tracking-wider uppercase flex items-center gap-1.5 shadow-[0_0_12px_rgba(245,158,11,0.3)]">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping" />
                ▲ STEP 0{stepIndex} OF 07
              </span>
              <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase flex items-center gap-1.5">
                <Compass className="w-3 h-3 text-amber-400/70" />
                ELEVATION +{elevationMeters}M // 空间阶梯攀升
              </span>
            </div>

            {/* Title with Interactive Ascension */}
            <h2 
              onClick={handleAscendClick}
              className={`text-2xl sm:text-4xl font-serif font-normal text-white tracking-tight flex items-center gap-3 transition-colors ${
                onAscend ? 'cursor-pointer hover:text-amber-300 group' : ''
              }`}
            >
              <span>登上第 {stepIndex} 级台阶 · {title}</span>
              <ArrowUpRight className="w-6 h-6 text-amber-400 opacity-80 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform inline" />
            </h2>

            {displayEn && (
              <p className="text-xs sm:text-sm font-mono text-amber-200/60 uppercase tracking-wider mt-1.5">
                {displayEn}
              </p>
            )}
            {displayDesc && (
              <p className="text-xs sm:text-sm text-white/65 font-sans font-light mt-2.5 max-w-2xl leading-relaxed">
                {displayDesc}
              </p>
            )}
          </div>

          {/* Right Block: Apple-Grade Concentric Cine Aperture & Staircase Graphic */}
          <div className="flex items-center gap-6 self-start lg:self-center">
            {/* Morphing Cine Aperture Portal Anchor (Visual Focus Anchor) */}
            <div 
              onClick={handleAscendClick}
              className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-white/15 bg-white/[0.02] backdrop-blur-md flex items-center justify-center transition-all duration-700 ${
                onAscend ? 'cursor-pointer hover:border-amber-400 hover:scale-105' : ''
              }`}
              title="点击激发全息折跃"
            >
              {/* Rotating Outer Cine Ring */}
              <div className={`absolute inset-0 rounded-full border border-dashed border-amber-400/30 transition-transform duration-1000 ${isHovered ? 'rotate-180 scale-110' : 'rotate-0'}`} />
              
              {/* Inner Optical Core */}
              <div className="relative flex flex-col items-center justify-center text-center">
                <Aperture className={`w-7 h-7 sm:w-8 sm:h-8 text-amber-300 transition-transform duration-500 ${isHovered ? 'rotate-90 text-amber-200 scale-110' : ''}`} />
                <span className="text-[8px] font-mono text-white/40 tracking-wider mt-1 uppercase">
                  T{stepIndex}.0
                </span>
              </div>
            </div>

            {/* 8-Tier Visual Staircase Graphic */}
            <div className="flex items-end gap-1.5 p-3 rounded-2xl bg-white/[0.03] border border-white/10">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((tier) => {
                const isCurrent = tier === stepIndex;
                const isPast = tier < stepIndex;
                const height = (tier + 1) * 5 + 8; // Escalating heights: 8px to 48px
                return (
                  <div key={tier} className="flex flex-col items-center gap-1">
                    <div
                      className={`w-3 sm:w-3.5 rounded-sm transition-all duration-500 ${
                        isCurrent
                          ? 'bg-amber-400 shadow-lg shadow-amber-400/60 scale-110'
                          : isPast
                          ? 'bg-white/40'
                          : 'bg-white/10'
                      }`}
                      style={{ height: `${height}px` }}
                      title={`第 0${tier} 级台阶`}
                    />
                    <span className={`text-[7px] font-mono ${isCurrent ? 'text-amber-300 font-bold' : 'text-white/30'}`}>
                      0{tier}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Downward Scroll Guidance Bar */}
        <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/40">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>平滑向下滑动 · 穿过光圈步入展厅深处</span>
          </span>
          <button
            onClick={handleAscendClick}
            className="flex items-center gap-1.5 text-amber-300/70 hover:text-amber-300 transition-colors uppercase tracking-widest"
          >
            <span>ASCEND TIER // 阶梯折跃</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </div>
      </div>

      {/* 3. Visual Continuity Guidance Rail - Bottom Laser Thread Leading In */}
      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[1.5px] h-16 bg-gradient-to-b from-amber-400 via-amber-400/30 to-transparent" />
    </div>
  );
};
