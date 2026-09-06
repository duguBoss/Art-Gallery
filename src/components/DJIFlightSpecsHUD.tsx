import React from 'react';
import type { MainViewType } from './Navbar';
import { CHAPTER_LIST } from './ChapterDock';
import { Camera, Radio, BatteryCharging, Compass, Crosshair, Wind, Eye } from 'lucide-react';
import { playSpotlightClick } from '../utils/audio';

export type DJIFocalLength = '24mm' | '70mm' | '166mm';

interface DJIFlightSpecsHUDProps {
  currentView: MainViewType;
  focalLength: DJIFocalLength;
  onSelectFocalLength: (focal: DJIFocalLength) => void;
}

export const DJIFlightSpecsHUD: React.FC<DJIFlightSpecsHUDProps> = ({
  currentView,
  focalLength,
  onSelectFocalLength,
}) => {
  const currentIdx = Math.max(0, CHAPTER_LIST.findIndex((c) => c.id === currentView));
  const activeChapter = CHAPTER_LIST[currentIdx] || CHAPTER_LIST[0];

  const handleFocalClick = (focal: DJIFocalLength) => {
    playSpotlightClick();
    onSelectFocalLength(focal);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-20 select-none overflow-hidden text-white font-mono">
      {/* 1. DJI Professional Flight Framing Bracket Markers (大疆航拍取景器标线) */}
      <div className="absolute top-20 left-4 sm:left-8 w-6 h-6 border-t-2 border-l-2 border-amber-400/50" />
      <div className="absolute top-20 right-4 sm:right-8 w-6 h-6 border-t-2 border-r-2 border-amber-400/50" />
      <div className="absolute bottom-20 left-4 sm:left-8 w-6 h-6 border-b-2 border-l-2 border-amber-400/50" />
      <div className="absolute bottom-20 right-4 sm:right-8 w-6 h-6 border-b-2 border-r-2 border-amber-400/50" />

      {/* 2. Top-Left: DJI O3+ Transmission & GNSS Satellite Link (大疆 O3+ 图传遥测) */}
      <div className="absolute top-20 left-12 flex items-center gap-2.5">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15">
          <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
          <span className="text-[10px] font-bold text-white tracking-wider">
            DJI O3+ // 15KM FHD
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/10 text-[10px] text-white/70">
          <span>GPS 28</span>
          <span>•</span>
          <span className="text-amber-300">HNCS 10-BIT D-LOG M</span>
        </div>
      </div>

      {/* 3. Top-Right: Hasselblad Triple-Camera Focal Switcher (大疆哈苏三摄系统一键切换) */}
      <div className="absolute top-20 right-12 flex items-center gap-2 pointer-events-auto">
        {/* 24mm Hasselblad Main Lens */}
        <button
          onClick={() => handleFocalClick('24mm')}
          className={`flex items-center gap-1 px-3 py-1 rounded-full border text-[10px] font-bold tracking-wider transition-all ${
            focalLength === '24mm'
              ? 'border-amber-400 bg-amber-400/20 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.35)] scale-105'
              : 'border-white/15 bg-black/60 text-white/70 hover:border-white/40 hover:text-white'
          }`}
          title="哈苏 4/3 CMOS 24mm 广角主摄 (f/2.8)"
        >
          <Camera className="w-3 h-3" />
          <span>1x 24mm</span>
        </button>

        {/* 70mm Medium Telephoto Lens */}
        <button
          onClick={() => handleFocalClick('70mm')}
          className={`flex items-center gap-1 px-3 py-1 rounded-full border text-[10px] font-bold tracking-wider transition-all ${
            focalLength === '70mm'
              ? 'border-amber-400 bg-amber-400/20 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.35)] scale-105'
              : 'border-white/15 bg-black/60 text-white/70 hover:border-white/40 hover:text-white'
          }`}
          title="70mm 中长焦相机 (3x 光学变焦, f/2.8)"
        >
          <span>3x 70mm</span>
        </button>

        {/* 166mm Telephoto Lens */}
        <button
          onClick={() => handleFocalClick('166mm')}
          className={`hidden sm:flex items-center gap-1 px-3 py-1 rounded-full border text-[10px] font-bold tracking-wider transition-all ${
            focalLength === '166mm'
              ? 'border-amber-400 bg-amber-400/20 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.35)] scale-105'
              : 'border-white/15 bg-black/60 text-white/70 hover:border-white/40 hover:text-white'
          }`}
          title="166mm 长焦相机 (7x 光学变焦, f/3.4)"
        >
          <span>7x 166mm</span>
        </button>
      </div>

      {/* 4. Center Subtle Optical Reticle / Crosshair (大疆电影级对焦十字线) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 pointer-events-none">
        <Crosshair className="w-10 h-10 text-amber-400" />
      </div>

      {/* 5. Bottom-Left: Flight Telemetry & Battery (大疆动力电池与飞行遥测) */}
      <div className="absolute bottom-20 left-12 hidden lg:flex items-center gap-4 text-[10px] text-white/50">
        <div className="flex items-center gap-1 text-emerald-400">
          <BatteryCharging className="w-3.5 h-3.5" />
          <span className="font-bold">98% (43 MINS)</span>
        </div>
        <span>•</span>
        <span>ALT: 120M</span>
        <span>•</span>
        <span>SPEED: 15M/S</span>
        <span>•</span>
        <span className="text-white/80">ISO 100 · 1/8000s · f/2.8</span>
      </div>

      {/* 6. Bottom-Right: 3-Axis Mechanical Gimbal Pitch HUD (三轴机械增稳云台俯仰角) */}
      <div className="absolute bottom-20 right-12 hidden lg:flex items-center gap-2 text-[10px] text-white/50">
        <Compass className="w-3 h-3 text-amber-400" />
        <span>GIMBAL PITCH: -15.0°</span>
        <span>•</span>
        <span className="text-amber-300/80 uppercase">
          STAGE 0{currentIdx + 1} / 08 · {activeChapter.title}
        </span>
      </div>
    </div>
  );
};
