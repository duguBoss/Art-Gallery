import React, { useState } from 'react';
import type { ArtStyle, Artwork } from '../types/art';
import { ZoomIn, ChevronLeft, ChevronRight, Compass, Sparkles, BookOpen, Video, Info } from 'lucide-react';
import { playMuseumFootstep, playGalleryBell, playSpotlightClick } from '../utils/audio';

interface SpatialGalleryRoomProps {
  styles: ArtStyle[];
  onInspectArtwork: (art: Artwork, style: ArtStyle) => void;
  onSelectStyle: (style: ArtStyle) => void;
  onOpenTour: () => void;
  onOpenScenarios: () => void;
}

export const SpatialGalleryRoom: React.FC<SpatialGalleryRoomProps> = ({
  styles,
  onInspectArtwork,
  onSelectStyle,
  onOpenTour,
  onOpenScenarios,
}) => {
  const [activeStyleIndex, setActiveStyleIndex] = useState(0);
  const [activeWorkIndex, setActiveWorkIndex] = useState(0);

  const currentStyle = styles[activeStyleIndex] || styles[0];
  const currentWork = currentStyle?.representativeWorks[activeWorkIndex] || currentStyle?.representativeWorks[0];

  const handleNextWork = () => {
    playMuseumFootstep();
    if (activeWorkIndex < currentStyle.representativeWorks.length - 1) {
      setActiveWorkIndex(activeWorkIndex + 1);
    } else {
      setActiveWorkIndex(0);
    }
  };

  const handlePrevWork = () => {
    playMuseumFootstep();
    if (activeWorkIndex > 0) {
      setActiveWorkIndex(activeWorkIndex - 1);
    } else {
      setActiveWorkIndex(currentStyle.representativeWorks.length - 1);
    }
  };

  const handleSwitchRoom = (idx: number) => {
    playMuseumFootstep();
    setActiveStyleIndex(idx);
    setActiveWorkIndex(0);
  };

  if (!currentStyle || !currentWork) return null;

  return (
    <section className="relative w-full overflow-hidden bg-[#0c0d10] py-8 sm:py-12 border-b border-gallery-800">
      {/* Grand Museum Arch Title Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-gold-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-gold-400 shadow-glow-gold" />
            <span>AUTHENTIC MUSEUM HALL · 实体展厅实景漫步</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-black text-gallery-100 mt-1">
            {currentStyle.title} 专属主展厅
          </h2>
          <p className="text-xs sm:text-sm text-gallery-400 font-sans mt-0.5">
            {currentStyle.era} · {currentStyle.roomNumber}
          </p>
        </div>

        {/* Gallery Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              playGalleryBell(500);
              onOpenScenarios();
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gallery-900 border border-accent-violet/40 text-accent-violet hover:bg-accent-violet/10 text-xs font-serif font-bold transition-all cursor-pointer shadow-md"
          >
            <Video className="w-3.5 h-3.5" />
            <span>查看 9大场景实战赋能</span>
          </button>

          <button
            onClick={() => {
              playGalleryBell(520);
              onOpenTour();
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold-500 text-gallery-950 hover:bg-gold-400 font-serif text-xs font-bold transition-all cursor-pointer shadow-glow-gold"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>全屏虚拟漫步</span>
          </button>
        </div>
      </div>

      {/* Museum Room Switcher Tabs (Styled as Wing Doors) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {styles.map((style, idx) => {
            const active = activeStyleIndex === idx;
            return (
              <button
                key={style.id}
                onClick={() => handleSwitchRoom(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-serif transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 border ${
                  active
                    ? 'bg-gradient-to-b from-gallery-800 to-gallery-900 border-gold-500 text-gold-300 shadow-glow-gold/20 font-bold scale-[1.02]'
                    : 'bg-gallery-950/80 border-gallery-800/80 text-gallery-400 hover:text-gallery-200 hover:border-gallery-700'
                }`}
              >
                <span className="font-mono text-[10px] text-gold-400/80">0{idx + 1}</span>
                <span>{style.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* THE SPATIAL 3D EXHIBITION ROOM CANVAS */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden museum-wall-texture border-2 border-gallery-800/80 shadow-2xl p-4 sm:p-8 md:p-12 min-h-[560px] flex flex-col justify-between">
          {/* Ceiling Track Spotlight Source */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 spotlight-beam pointer-events-none z-10" />

          {/* Ceiling Light Track Bar */}
          <div className="absolute top-0 left-8 right-8 h-2 bg-gradient-to-r from-transparent via-gallery-800 to-transparent flex items-center justify-around z-20">
            <span className="w-4 h-3 bg-gallery-700 rounded-b shadow-md" />
            <span className="w-4 h-3 bg-gold-500 rounded-b shadow-glow-gold" />
            <span className="w-4 h-3 bg-gallery-700 rounded-b shadow-md" />
          </div>

          {/* MAIN EXHIBITION WALL STAGE */}
          <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center my-auto">
            {/* Left/Center: Framed Masterpiece Hanging on the Museum Wall */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center">
              {/* The 3D Frame */}
              <div 
                onClick={() => {
                  playGalleryBell(500);
                  onInspectArtwork(currentWork, currentStyle);
                }}
                className="group relative cursor-pointer transform hover:scale-[1.01] transition-transform duration-500 max-w-full"
              >
                {/* Frame Outer Shell */}
                <div className="museum-frame-gold rounded-xl p-3 sm:p-5 bg-[#17130e] border border-gold-600/40 relative">
                  {/* Inner Mat Card (装裱卡纸) */}
                  <div className="bg-[#f2ece1] p-2 sm:p-4 rounded shadow-inner border border-stone-300">
                    <div className="relative overflow-hidden rounded bg-black max-h-[380px] sm:max-h-[440px] flex items-center justify-center shadow-md">
                      <img
                        src={currentWork.imageUrl}
                        alt={currentWork.title}
                        className="w-full h-auto max-h-[420px] object-contain group-hover:scale-105 transition-transform duration-700"
                      />
                      
                      {/* Zoom Hover Shield */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <div className="px-4 py-2 rounded-full bg-gallery-950/90 border border-gold-500 text-gold-300 text-xs font-serif font-bold flex items-center gap-2 shadow-2xl">
                          <ZoomIn className="w-4 h-4" />
                          <span>点击全屏超清鉴赏</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Frame Top Wire Hanging Hook Detail */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-3 bg-gold-600 rounded-t shadow" />
                </div>

                {/* Wall Cast Shadow */}
                <div className="w-full h-6 bg-black/80 blur-xl mt-4 rounded-full" />
              </div>

              {/* Painting Navigation Controls */}
              <div className="flex items-center justify-between w-full max-w-md mt-4 px-2">
                <button
                  onClick={handlePrevWork}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gallery-900/90 border border-gallery-700 text-gallery-300 hover:text-white hover:border-gold-500 text-xs font-sans transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>上一幅藏品</span>
                </button>

                <div className="flex items-center gap-1.5">
                  {currentStyle.representativeWorks.map((_, i) => (
                    <span
                      key={i}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        activeWorkIndex === i ? 'bg-gold-500 scale-125 shadow-glow-gold' : 'bg-gallery-700'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNextWork}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gallery-900/90 border border-gallery-700 text-gallery-300 hover:text-white hover:border-gold-500 text-xs font-sans transition-all cursor-pointer"
                >
                  <span>下一幅藏品</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Authentic Museum Brass Placard & Curatorial Critique */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              {/* Museum Brass Placard (铜质展签) */}
              <div className="relative rounded-xl p-5 sm:p-6 bg-gradient-to-br from-[#1a1712] to-[#120f0a] border-2 border-gold-600/50 shadow-2xl space-y-4">
                {/* 4 Brass Screw Studs in Corners */}
                <span className="absolute top-2 left-2 w-2 h-2 rounded-full bg-gold-400 shadow-inner" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gold-400 shadow-inner" />
                <span className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-gold-400 shadow-inner" />
                <span className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-gold-400 shadow-inner" />

                <div className="border-b border-gold-600/30 pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-gold-400 uppercase">
                      EXHIBITION PLACARD · 典藏展签
                    </span>
                    <span className="text-[10px] font-mono text-gallery-400">{currentStyle.roomNumber}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-black text-gallery-100 mt-1">
                    {currentWork.title}
                  </h3>
                  <div className="text-xs font-sans text-gold-300 mt-0.5">
                    {currentStyle.title} · {currentWork.year} 年
                  </div>
                </div>

                {/* Curator Quote & Aesthetics */}
                <div className="space-y-2">
                  <blockquote className="text-xs font-serif italic text-gallery-300 leading-relaxed border-l-2 border-gold-500 pl-3">
                    {currentStyle.quote}
                  </blockquote>
                  <p className="text-xs text-gallery-300 leading-relaxed font-sans pt-1">
                    {currentWork.description}
                  </p>
                </div>

                {/* Applied Commercial Video Scenario Badge */}
                {currentStyle.appliedScenarios?.[0] && (
                  <div className="p-3 rounded-lg bg-gallery-950/80 border border-gold-500/20 space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-gold-400 font-semibold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>🎬 推荐赋能场景：{currentStyle.appliedScenarios[0].scenarioName}</span>
                    </div>
                    <p className="text-[11px] text-gallery-400 line-clamp-2">
                      {currentStyle.appliedScenarios[0].useCase}
                    </p>
                  </div>
                )}

                {/* Enter Salon Action */}
                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {currentStyle.colorPalette.slice(0, 4).map((c, i) => (
                      <span
                        key={i}
                        className="w-4 h-4 rounded-full border border-gallery-700"
                        style={{ backgroundColor: c.hex }}
                        title={`${c.name}: ${c.hex}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      playGalleryBell(460);
                      onSelectStyle(currentStyle);
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-gold-500/20 border border-gold-500/50 text-gold-300 hover:bg-gold-500 hover:text-gallery-950 font-serif text-xs font-bold transition-all cursor-pointer"
                  >
                    研读流派全部策展档案 →
                  </button>
                </div>
              </div>

              {/* Museum Visitor Hint */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gallery-950/60 border border-gallery-800 text-[11px] text-gallery-400">
                <Info className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span>漫步提示：可使用下方缩略展架快速挑选画作，或点击画作放大全屏赏析。</span>
              </div>
            </div>
          </div>

          {/* Museum Wooden Parquet Floor Reflection */}
          <div className="relative mt-8 pt-4 border-t border-gallery-800/60 flex items-center justify-between text-xs text-gallery-400 font-mono">
            <span>MUSEUM WING A · NORTH CORRIDOR</span>
            <span>GALLERY AMBIENT TEMPERATURE: 21°C · HUMIDITY: 50%</span>
          </div>
        </div>
      </div>
    </section>
  );
};