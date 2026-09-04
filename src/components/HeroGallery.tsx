import React from 'react';
import { Compass, Flame, ArrowRight, Building2, Image as ImageIcon, Film, Sparkles } from 'lucide-react';
import type { ArtStyle } from '../types/art';
import type { MainViewType } from './Navbar';
import { playGalleryBell, playSpotlightClick } from '../utils/audio';

interface HeroGalleryProps {
  featuredStyles: ArtStyle[];
  onSelectStyle: (style: ArtStyle) => void;
  onOpenTour: () => void;
  onSwitchView: (view: MainViewType) => void;
}

export const HeroGallery: React.FC<HeroGalleryProps> = ({
  featuredStyles,
  onSelectStyle,
  onOpenTour,
  onSwitchView,
}) => {
  const currentFeatured = featuredStyles[0] || null;

  return (
    <section className="relative overflow-hidden pt-8 pb-12 md:pt-10 md:pb-14 border-b border-gallery-800/60">
      {/* Warm Ambient Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[380px] bg-gradient-to-b from-gold-500/15 via-accent-violet/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gallery-900/90 border border-gold-500/30 text-gold-300 text-xs font-mono tracking-wide shadow-md">
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
              <span>AI PROMPT & MOTION WORKFLOW LAB · 视听灵感工坊</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black tracking-tight text-gallery-100 leading-[1.15]">
              用提示词雕琢万象，<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-300 via-gold-400 to-amber-200">
                从静态图像积木到多步骤视频生成
              </span>
            </h1>

            <p className="text-sm md:text-base text-gallery-300 leading-relaxed font-sans max-w-2xl">
              为 AI 创作者量身打造的<strong>提示词工程与工作流灵感库</strong>。支持<strong>主体/风格/材质/光影积木式拆解与实时定制</strong>，并将复杂的 AI 视频制作拆解为清晰的链式管线（第一步是干啥，第二步是干啥），管理员可在后台随心录入与维护！
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => {
                  playSpotlightClick();
                  onSwitchView('image-lab');
                  const target = document.getElementById('exhibition-content');
                  target?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-gallery-950 font-serif font-bold text-sm tracking-wide shadow-glow-gold hover:from-gold-400 hover:to-gold-500 transition-all cursor-pointer"
              >
                <ImageIcon className="w-4 h-4" />
                <span>🎨 探索图像提示词拆解</span>
              </button>

              <button
                onClick={() => {
                  playSpotlightClick();
                  onSwitchView('video-lab');
                  const target = document.getElementById('exhibition-content');
                  target?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-accent-violet/20 to-purple-600/20 border border-accent-violet text-white hover:bg-accent-violet/30 text-sm font-sans font-bold transition-all cursor-pointer shadow-md"
              >
                <Film className="w-4 h-4 text-accent-violet" />
                <span>🎬 查看分步视频工作流</span>
              </button>

              <button
                onClick={() => {
                  playSpotlightClick();
                  onSwitchView('spatial');
                  const target = document.getElementById('exhibition-content');
                  target?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-gallery-900 border border-gallery-700 text-gallery-300 hover:text-white text-sm font-sans transition-all cursor-pointer"
              >
                <Building2 className="w-4 h-4 text-gold-400" />
                <span>🏛️ 实体美学展厅</span>
              </button>
            </div>
          </div>

          {currentFeatured && (
            <div className="lg:col-span-5">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-gold-500/40 via-transparent to-accent-violet/30 blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative rounded-2xl overflow-hidden bg-gallery-900 border border-gold-500/30 p-4 shadow-gallery-lg">
                  <div className="flex items-center justify-between pb-2.5 px-1 border-b border-gallery-800">
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-gold-400" />
                      <span className="text-xs font-serif font-semibold text-gold-300 tracking-wider">本期焦点风格案例</span>
                    </div>
                    <span className="text-[10px] font-mono text-gallery-400">{currentFeatured.roomNumber}</span>
                  </div>

                  <div 
                    onClick={() => {
                      playGalleryBell(480);
                      onSelectStyle(currentFeatured);
                    }}
                    className="mt-3 relative h-64 md:h-72 rounded-xl overflow-hidden cursor-pointer group/art museum-frame-gold p-2 bg-[#19140f]"
                  >
                    <div className="w-full h-full rounded overflow-hidden relative">
                      <img
                        src={currentFeatured.representativeWorks[0]?.imageUrl}
                        alt={currentFeatured.title}
                        className="w-full h-full object-cover group-hover/art:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gallery-950 via-gallery-950/30 to-transparent opacity-80 group-hover/art:opacity-60 transition-opacity" />

                      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                        <div>
                          <span className="text-[10px] font-mono text-gold-400 px-2 py-0.5 rounded bg-gallery-950/80 border border-gold-500/30">
                            {currentFeatured.badge}
                          </span>
                          <h3 className="text-lg font-serif font-bold text-white mt-1.5">{currentFeatured.title}</h3>
                          <p className="text-xs text-gallery-300 font-sans line-clamp-1">{currentFeatured.englishTitle}</p>
                        </div>
                        <div className="p-2 rounded-full bg-gold-500 text-gallery-950 group-hover/art:scale-110 transition-transform shadow-lg">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};