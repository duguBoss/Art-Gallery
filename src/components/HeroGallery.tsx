import React from 'react';
import { Compass, Sparkles, Layers, ShieldCheck, Flame, ArrowRight } from 'lucide-react';
import { ArtStyle } from '../types/art';
import { playGalleryBell, playSpotlightClick } from '../utils/audio';

interface HeroGalleryProps {
  featuredStyles: ArtStyle[];
  onSelectStyle: (style: ArtStyle) => void;
  onOpenTour: () => void;
  onJumpToHall: (hallId: string) => void;
}

export const HeroGallery: React.FC<HeroGalleryProps> = ({
  featuredStyles,
  onSelectStyle,
  onOpenTour,
  onJumpToHall,
}) => {
  const currentFeatured = featuredStyles[0] || null;

  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-14 md:pb-24 border-b border-gallery-800/60">
      {/* Museum Ambient Beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-gold-500/10 via-gold-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Curator Introduction */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-gallery-900/90 border border-gold-500/30 text-gold-300 text-xs font-mono tracking-wide">
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
              <span>PERMANENT EXHIBITION · 永久艺术典藏展</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black tracking-tight text-gallery-100 leading-[1.15]">
              探索灵感边界，<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-300 via-gold-400 to-amber-200">
                步入艺术创作的万象殿堂
              </span>
            </h1>

            <p className="text-sm md:text-base text-gallery-300 leading-relaxed font-sans max-w-2xl">
              本画廊专为创作者、设计师与艺术探索者打造，收录涵盖 <strong>VOX 体素</strong>、<strong>锈湖手绘暗黑叙事</strong>、<strong>赛博朋克</strong>、<strong>东方水墨</strong>、<strong>包豪斯构成</strong> 等经典与先锋艺术流派。提供全景色谱提取、AI 提示词配方与技法解构。
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  playGalleryBell(520);
                  onOpenTour();
                }}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-gallery-950 font-serif font-bold text-sm tracking-wide shadow-glow-gold hover:from-gold-400 hover:to-gold-500 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>漫步沉浸展厅</span>
              </button>

              <button
                onClick={() => {
                  playSpotlightClick();
                  const target = document.getElementById('exhibition-halls');
                  target?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-gallery-900/90 border border-gallery-700 text-gallery-200 hover:text-gold-300 hover:border-gold-500/50 text-sm font-sans font-medium transition-all cursor-pointer"
              >
                <Layers className="w-4 h-4" />
                <span>浏览各馆藏画廊</span>
              </button>
            </div>

            {/* Gallery Stats / Attributes */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gallery-800/80 max-w-lg">
              <div>
                <div className="text-xl md:text-2xl font-mono font-bold text-gold-400">12+</div>
                <div className="text-[11px] text-gallery-400 mt-0.5">精选艺术流派</div>
              </div>
              <div>
                <div className="text-xl md:text-2xl font-mono font-bold text-accent-cyan">100%</div>
                <div className="text-[11px] text-gallery-400 mt-0.5">AI 提示词提取</div>
              </div>
              <div>
                <div className="text-xl md:text-2xl font-mono font-bold text-accent-emerald">CI/CD</div>
                <div className="text-[11px] text-gallery-400 mt-0.5">GitHub 自动更新</div>
              </div>
            </div>
          </div>

          {/* Right Column: Curator's Spotlight Artwork */}
          {currentFeatured && (
            <div className="lg:col-span-5">
              <div className="relative group">
                {/* Golden Glow frame */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-gold-500/40 via-transparent to-accent-violet/30 blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative rounded-xl overflow-hidden bg-gallery-900 border border-gold-500/30 p-3 shadow-gallery-lg">
                  {/* Spotlight Banner */}
                  <div className="flex items-center justify-between pb-3 px-1 border-b border-gallery-800">
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-gold-400" />
                      <span className="text-xs font-serif font-semibold text-gold-300 tracking-wider">策展人本期焦点</span>
                    </div>
                    <span className="text-[10px] font-mono text-gallery-400">{currentFeatured.roomNumber}</span>
                  </div>

                  {/* Artwork Preview */}
                  <div 
                    onClick={() => {
                      playGalleryBell(480);
                      onSelectStyle(currentFeatured);
                    }}
                    className="mt-3 relative h-64 md:h-72 rounded-lg overflow-hidden cursor-pointer group/art"
                  >
                    <img
                      src={currentFeatured.representativeWorks[0]?.imageUrl}
                      alt={currentFeatured.title}
                      className="w-full h-full object-cover group-hover/art:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gallery-950 via-gallery-950/30 to-transparent opacity-80 group-hover/art:opacity-60 transition-opacity" />

                    {/* Bottom Floating Badge */}
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

                  {/* Palette Swatches Bar */}
                  <div className="mt-3 pt-2.5 flex items-center justify-between border-t border-gallery-800/80 px-1">
                    <span className="text-[11px] text-gallery-400 font-mono">特征色盘提取</span>
                    <div className="flex items-center gap-1.5">
                      {currentFeatured.colorPalette.slice(0, 5).map((color, idx) => (
                        <span
                          key={idx}
                          className="w-5 h-5 rounded-full border border-gallery-700 shadow-inner hover:scale-125 transition-transform cursor-pointer"
                          style={{ backgroundColor: color.hex }}
                          title={`${color.name}: ${color.hex}`}
                        />
                      ))}
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
