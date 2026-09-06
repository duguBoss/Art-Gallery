import React, { useState, useEffect } from 'react';
import { ArrowRight, Film, Eye, Sparkles } from 'lucide-react';
import type { CinemaScene } from '../types/cinema';
import { playSpotlightClick } from '../utils/audio';

interface OpeningSequenceViewProps {
  featuredScene: CinemaScene;
  totalScenesCount: number;
  onStudyScene: (sceneId: string) => void;
  onExploreArchive: () => void;
}

export const OpeningSequenceView: React.FC<OpeningSequenceViewProps> = ({
  featuredScene,
  totalScenesCount,
  onStudyScene,
  onExploreArchive,
}) => {
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    // 0.0s black, 0.3s line, 0.8s image, 1.2s text reveal
    const t1 = setTimeout(() => setStage(1), 250);
    const t2 = setTimeout(() => setStage(2), 600);
    const t3 = setTimeout(() => setStage(3), 1000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-8 lg:py-16 text-[#F2F0E8]">
      {/* Editorial Top Status Line */}
      <div className={`flex items-center justify-between text-xs font-mono tracking-widest text-[#8B887F] border-b border-[#F2F0E8]/10 pb-4 mb-8 transition-opacity duration-700 ${stage >= 1 ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center gap-3">
          <span className="text-[#D8FF3E] font-bold">ARCHIVE 001 // 2026 EDITION</span>
          <span className="opacity-30">/</span>
          <span>THE CINEMA & AESTHETIC LANGUAGE SYSTEM</span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span>{totalScenesCount} CURATED SCENES</span>
          <span className="opacity-30">/</span>
          <span className="text-[#D8FF3E]">SWISS EDITORIAL GRID</span>
        </div>
      </div>

      {/* Asymmetrical 12-Column Hero Grid (5 Cols Left Text, 7 Cols Right Image) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column (5 Cols): Monumental Structural Typography */}
        <div className={`lg:col-span-5 flex flex-col justify-between space-y-6 transition-all duration-1000 ${stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div>
            <div className="text-[11px] font-mono tracking-[0.2em] text-[#D8FF3E] uppercase mb-2">
              AESTHETIC DECONSTRUCTION
            </div>
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-[#F2F0E8] leading-[0.95] uppercase">
              VISUAL<br />
              LANGUAGE<br />
              <span className="text-[#8B887F] font-normal">SYSTEM</span>
            </h1>
          </div>

          <p className="text-sm sm:text-base text-[#8B887F] leading-relaxed font-sans max-w-md">
            摒弃平庸图库与卡片堆砌。这里是一个探索“图像为何动人”的视觉文献库——解构好莱坞镜头、光影比例、色彩色相与 AI 创作提示词。
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={() => {
                playSpotlightClick();
                onStudyScene(featuredScene.id);
              }}
              className="px-6 py-3.5 bg-[#D8FF3E] text-[#11110F] text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white transition-colors cursor-pointer"
            >
              <span>STUDY THIS SCENE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                playSpotlightClick();
                onExploreArchive();
              }}
              className="px-6 py-3.5 border border-[#F2F0E8]/20 hover:border-[#D8FF3E] hover:text-[#D8FF3E] text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer text-center"
            >
              EXPLORE ARCHIVE ({totalScenesCount})
            </button>
          </div>

          {/* Research Metric Strip */}
          <div className="pt-6 border-t border-[#F2F0E8]/10 grid grid-cols-3 gap-4 text-left font-mono">
            <div>
              <div className="text-[10px] text-[#8B887F]">FEATURED</div>
              <div className="text-xs text-[#D8FF3E] font-bold mt-0.5">{featuredScene.sceneNumber}</div>
            </div>
            <div>
              <div className="text-[10px] text-[#8B887F]">ASPECT</div>
              <div className="text-xs text-[#F2F0E8] font-bold mt-0.5">2.39:1 CINEMA</div>
            </div>
            <div>
              <div className="text-[10px] text-[#8B887F]">OPTICS</div>
              <div className="text-xs text-[#F2F0E8] font-bold mt-0.5 truncate max-w-[120px]">
                {featuredScene.cameraRig.lens.split(' ')[0]}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): Monumental Cinematic Visual */}
        <div className={`lg:col-span-7 transition-all duration-1000 ${stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div 
            onClick={() => {
              playSpotlightClick();
              onStudyScene(featuredScene.id);
            }}
            className="group relative w-full aspect-video bg-[#181815] border border-[#F2F0E8]/15 overflow-hidden cursor-pointer"
          >
            <img
              src={featuredScene.coverImage}
              alt={featuredScene.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.025] filter group-hover:brightness-95"
            />
            
            {/* Minimalist View Indicator Overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="px-4 py-2 border border-[#D8FF3E] bg-[#11110F]/90 text-[#D8FF3E] text-xs font-mono font-bold tracking-widest uppercase">
                DECONSTRUCT SCENE →
              </span>
            </div>

            {/* Bottom Floating Metadata Strip */}
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 to-transparent flex items-end justify-between text-xs font-mono">
              <div>
                <div className="text-[#D8FF3E] font-bold">{featuredScene.sceneNumber} · {featuredScene.title}</div>
                <div className="text-[#8B887F] text-[11px] mt-0.5">{featuredScene.locationAndTime}</div>
              </div>
              <div className="hidden sm:block text-right text-[#8B887F] text-[11px]">
                <div>{featuredScene.cameraRig.lens}</div>
                <div className="text-[#F2F0E8]">{featuredScene.cameraRig.mood}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
