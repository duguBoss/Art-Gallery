import React from 'react';
import type { MainViewType } from './Navbar';
import { CHAPTER_LIST } from './ChapterDock';
import { Aperture, Radio, Cpu, ShieldCheck, Zap } from 'lucide-react';

interface InstaSpecsHUDProps {
  currentView: MainViewType;
}

const STAGE_SPECS: Record<MainViewType, { label: string; badge: string; tag: string; fps: string }> = {
  cinema: { label: '8K 360° CINEMATIC', badge: 'DUAL 1/1.3" CMOS', tag: 'ANAMORPHIC 16:9', fps: '30FPS 10-BIT' },
  atoms: { label: 'AI NANO MATERIALS', badge: 'COLOR ENGINE V3', tag: 'TYNDALL RAY TRACING', fps: 'RAW COLOR' },
  principles: { label: 'FLOWSTATE STABLE', badge: '10-AXIS GYROSCOPE', tag: 'HORIZON LOCK 360°', fps: 'ACTIVE EIS' },
  styles: { label: 'AESTHETIC MATRIX', badge: 'PARAMETRIC EQ', tag: 'SWISS / CYBERPUNK', fps: 'ALGO RENDER' },
  mediums: { label: '4-MEDIUM MATRIX', badge: 'CROSS-DIMENSION', tag: 'IMAGE·UI·SPACE·MOTION', fps: 'QUAD-CAPTURE' },
  motion: { label: 'BULLET TIME 120FPS', badge: 'DYNAMIC TIME-SHIFT', tag: 'PREDICTIVE FOCUS', fps: '120FPS 5.7K' },
  atlas: { label: 'DECONSTRUCT GRAPH', badge: 'NEURAL ATLAS', tag: 'MULTI-ENTRY WORKS', fps: 'VECTOR GRAPH' },
  'shapes-lab': { label: 'GENERATIVE STUDIO', badge: 'GPU ACCELERATED', tag: 'HIGH-RES SVG/PNG', fps: 'INFINITY RES' },
};

export const InstaSpecsHUD: React.FC<InstaSpecsHUDProps> = ({ currentView }) => {
  const currentIdx = Math.max(0, CHAPTER_LIST.findIndex((c) => c.id === currentView));
  const activeChapter = CHAPTER_LIST[currentIdx] || CHAPTER_LIST[0];
  const specs = STAGE_SPECS[currentView] || STAGE_SPECS.cinema;

  return (
    <div className="fixed inset-0 pointer-events-none z-20 select-none overflow-hidden text-white">
      {/* 1. Four-Corner Camera Viewfinder Framing Lines (Insta360 8K 取景器框线) */}
      <div className="absolute top-20 left-4 sm:left-8 w-6 h-6 border-t-2 border-l-2 border-amber-400/50" />
      <div className="absolute top-20 right-4 sm:right-8 w-6 h-6 border-t-2 border-r-2 border-amber-400/50" />
      <div className="absolute bottom-20 left-4 sm:left-8 w-6 h-6 border-b-2 border-l-2 border-amber-400/50" />
      <div className="absolute bottom-20 right-4 sm:right-8 w-6 h-6 border-b-2 border-r-2 border-amber-400/50" />

      {/* 2. Top-Left: Camera System & Live Tally Status (影石超旗舰机身标识) */}
      <div className="absolute top-20 left-12 flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]" />
          <span className="text-[10px] font-mono tracking-[0.2em] font-bold text-white uppercase">
            INSTA-X ARCHIVE // LIVE
          </span>
        </div>
        <span className="text-[10px] font-mono text-white/40 hidden md:inline">
          FOV: 360° DUAL-CAM
        </span>
      </div>

      {/* 3. Top-Right: Insta360 Signature Hardware Specs Pills (影石硬核科技参数矩阵) */}
      <div className="absolute top-20 right-12 hidden sm:flex items-center gap-2.5">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/40 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.25)]">
          <Zap className="w-3 h-3 text-amber-400 animate-bounce" />
          <span className="text-[10px] font-mono font-bold tracking-wider">
            {specs.label}
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/15 text-white/80">
          <Cpu className="w-3 h-3 text-white/60" />
          <span className="text-[10px] font-mono font-medium">
            {specs.badge}
          </span>
        </div>

        <div className="px-2.5 py-1 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/60">
          {specs.fps}
        </div>
      </div>

      {/* 4. Center Subtle Horizon Level & Crosshairs (全景水准仪对焦线) */}
      <div className="absolute top-1/2 left-4 sm:left-12 -translate-y-1/2 flex flex-col gap-1 opacity-20">
        <span className="w-4 h-[1px] bg-white" />
        <span className="w-8 h-[1px] bg-amber-400" />
        <span className="w-4 h-[1px] bg-white" />
      </div>

      <div className="absolute top-1/2 right-4 sm:right-12 -translate-y-1/2 flex flex-col items-end gap-1 opacity-20">
        <span className="w-4 h-[1px] bg-white" />
        <span className="w-8 h-[1px] bg-amber-400" />
        <span className="w-4 h-[1px] bg-white" />
      </div>

      {/* 5. Bottom Status Ticker (360 空间角度指示) */}
      <div className="absolute bottom-20 left-12 hidden lg:flex items-center gap-4 text-[10px] font-mono text-white/40">
        <span>ISO AUTO</span>
        <span>•</span>
        <span>SHUTTER 1/250</span>
        <span>•</span>
        <span>COLOR: FLAT 10-BIT</span>
        <span>•</span>
        <span className="text-amber-400/80">
          STAGE 0{currentIdx + 1} OF 08 · {activeChapter.title}
        </span>
      </div>
    </div>
  );
};
