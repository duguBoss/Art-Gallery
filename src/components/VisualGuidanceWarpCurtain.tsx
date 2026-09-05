import React, { useEffect, useState } from 'react';
import type { MainViewType } from './Navbar';
import { CHAPTER_LIST } from './ChapterDock';

interface VisualGuidanceWarpCurtainProps {
  isWarping: boolean;
  targetView: MainViewType;
}

export const VisualGuidanceWarpCurtain: React.FC<VisualGuidanceWarpCurtainProps> = ({
  isWarping,
  targetView,
}) => {
  const [showHUD, setShowHUD] = useState(false);

  useEffect(() => {
    if (isWarping) {
      setShowHUD(true);
      const timer = setTimeout(() => setShowHUD(false), 650);
      return () => clearTimeout(timer);
    }
  }, [isWarping]);

  if (!isWarping && !showHUD) return null;

  const targetChapter = CHAPTER_LIST.find((c) => c.id === targetView) || CHAPTER_LIST[0];

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden">
      {/* 1. Concentric Expanding Optical Iris Rings */}
      <div className="absolute w-48 h-48 rounded-full border border-amber-400/40 animate-iris-bloom" />
      <div className="absolute w-96 h-96 rounded-full border border-white/20 animate-iris-bloom [animation-delay:100ms]" />
      <div className="absolute w-[600px] h-[600px] rounded-full border border-amber-300/15 animate-iris-bloom [animation-delay:200ms]" />

      {/* 2. Central Anamorphic Laser Horizon Flare */}
      <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-amber-300/60 to-transparent blur-[1px] animate-pulse" />
      <div className="absolute w-[2px] h-full bg-gradient-to-b from-transparent via-white/40 to-transparent blur-[1px]" />

      {/* 3. Radial Spatial Warp Glow Burst */}
      <div className="absolute inset-0 bg-radial-vignette opacity-70" />

      {/* 4. Apple-Grade Teleportation HUD Cue */}
      <div className="relative z-10 flex flex-col items-center justify-center p-6 rounded-3xl bg-black/60 backdrop-blur-2xl border border-white/20 shadow-2xl animate-placard-slide">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span className="text-[10px] font-mono tracking-[0.3em] text-amber-300 uppercase">
            VISUAL WARP TRANSITION
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-serif text-white font-medium tracking-tight">
          {targetChapter.num} · {targetChapter.title}
        </h3>
        <p className="text-xs font-mono text-white/50 mt-1">
          ELEVATION +{targetChapter.elevationMeters}M // 空间引力定焦
        </p>
      </div>
    </div>
  );
};
