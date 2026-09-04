import React, { useState, useEffect, useRef } from 'react';
import type { AIImageCase } from '../types/art';
import { 
  Copy, Check, Play, Pause, Maximize2, X, ChevronLeft, ChevronRight, 
  Compass, Info, ArrowUpRight, Sliders 
} from 'lucide-react';
import { playSpotlightClick, playSuccessChime, playMuseumFootstep, playGalleryBell } from '../utils/audio';

interface CinematicGalleryStageProps {
  imageCases: AIImageCase[];
}

export const CinematicGalleryStage: React.FC<CinematicGalleryStageProps> = ({ imageCases }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Video Recording: Auto Tour Mode
  const [isAutoTour, setIsAutoTour] = useState(false);
  const [tourProgress, setTourProgress] = useState(0);
  
  // Interactive 3D Perspective Tilt on Mouse Move
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  // Modals & Drawers
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedColorHex, setCopiedColorHex] = useState<string | null>(null);

  const categories = ['all', ...Array.from(new Set(imageCases.map((c) => c.category)))];

  const filteredCases = selectedCategory === 'all'
    ? imageCases
    : imageCases.filter((c) => c.category === selectedCategory);

  const activeCase = filteredCases[currentIndex] || filteredCases[0] || imageCases[0];

  // Auto Tour Timer (5s per artwork for cinematic showreel recording)
  useEffect(() => {
    if (!isAutoTour || filteredCases.length <= 1) {
      setTourProgress(0);
      return;
    }

    const intervalMs = 50;
    const totalDurationMs = 5000;
    const stepIncrement = (intervalMs / totalDurationMs) * 100;

    const timer = setInterval(() => {
      setTourProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((idx) => (idx + 1) % filteredCases.length);
          playGalleryBell(480 + ((currentIndex + 1) % filteredCases.length) * 15);
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isAutoTour, filteredCases.length, currentIndex]);

  // Keyboard Navigation: Space for Auto Tour, Left/Right for Switch, Esc for Close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'Space') {
        e.preventDefault();
        setIsAutoTour((prev) => !prev);
        playSpotlightClick();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        setIsLightboxOpen(false);
        setIsDrawerOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredCases.length]);

  // Mouse 3D Tilt calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleNext = () => {
    playMuseumFootstep();
    setCurrentIndex((prev) => (prev + 1) % filteredCases.length);
    setTourProgress(0);
  };

  const handlePrev = () => {
    playMuseumFootstep();
    setCurrentIndex((prev) => (prev - 1 + filteredCases.length) % filteredCases.length);
    setTourProgress(0);
  };

  const handleSelectCase = (idx: number) => {
    playMuseumFootstep();
    setCurrentIndex(idx);
    setTourProgress(0);
  };

  const handleCopyPrompt = () => {
    if (!activeCase) return;
    playSpotlightClick();
    navigator.clipboard.writeText(activeCase.fullPrompt || '');
    playSuccessChime();
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2200);
  };

  const handleCopyColor = (hex: string) => {
    playSpotlightClick();
    navigator.clipboard.writeText(hex);
    playSuccessChime();
    setCopiedColorHex(hex);
    setTimeout(() => setCopiedColorHex(null), 2000);
  };

  const extractedColors = [
    { name: '主调', hex: '#1F2421' },
    { name: '中阶', hex: '#6B705C' },
    { name: '点睛', hex: '#D4A373' },
    { name: '高光', hex: '#FAEDCD' },
    { name: '基底', hex: '#CCD5AE' },
  ];

  if (!activeCase) return null;

  return (
    <div className="w-full transition-colors duration-300">
      {/* 1. Cinematic Control & Atmosphere Bar */}
      <div 
        className="border-b py-3 px-4 sm:px-8 flex flex-wrap items-center justify-between gap-4 transition-colors"
        style={{
          backgroundColor: 'var(--bg-page-subtle)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        {/* Left: Gallery Room Metadata */}
        <div className="flex items-center gap-3 text-left">
          <span 
            className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border font-bold uppercase tracking-wider"
            style={{
              backgroundColor: 'var(--tag-bg)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--tag-text)',
            }}
          >
            ROOM {String(currentIndex + 1).padStart(2, '0')} // {String(filteredCases.length).padStart(2, '0')}
          </span>
          <span className="text-xs font-serif font-bold hidden sm:inline" style={{ color: 'var(--text-main)' }}>
            殿堂级艺术流派全景展厅
          </span>
          <span className="text-[11px] font-mono hidden md:inline" style={{ color: 'var(--text-muted)' }}>
            · 3D 物理光泽 · 专为高清视频录制演示设计
          </span>
        </div>

        {/* Right: Screen-Recording Video Demo Controls */}
        <div className="flex items-center gap-2.5">
          {/* Auto Tour Toggle Button (录屏神级功能) */}
          <button
            onClick={() => {
              playSpotlightClick();
              setIsAutoTour((prev) => !prev);
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-sans font-bold border transition-all cursor-pointer shadow-xs"
            style={{
              backgroundColor: isAutoTour ? 'var(--accent)' : 'var(--bg-card)',
              borderColor: isAutoTour ? 'var(--accent)' : 'var(--border-strong)',
              color: isAutoTour ? '#FFFFFF' : 'var(--text-main)',
            }}
            title="快捷键：按空格键暂停/开始"
          >
            {isAutoTour ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>暂停巡礼 (Space)</span>
                <span className="w-2 h-2 rounded-full bg-red-400 animate-ping inline-block ml-0.5" />
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                <span>自动漫步巡礼</span>
              </>
            )}
          </button>

          {/* Fullscreen Lightbox Button */}
          <button
            onClick={() => {
              playSpotlightClick();
              setIsLightboxOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans border transition-all cursor-pointer"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-main)',
            }}
            title="超清全屏鉴赏"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">全屏超清</span>
          </button>

          {/* Open Curator Drawer */}
          <button
            onClick={() => {
              playSpotlightClick();
              setIsDrawerOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans font-bold border transition-all cursor-pointer"
            style={{
              backgroundColor: 'var(--pill-active-bg)',
              borderColor: 'var(--pill-active-bg)',
              color: 'var(--pill-active-text)',
            }}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Prompt 配方</span>
          </button>
        </div>
      </div>

      {/* Auto Tour Progress Indicator Line */}
      {isAutoTour && (
        <div className="w-full h-1 bg-black/10 overflow-hidden">
          <div 
            className="h-full transition-all duration-75 ease-linear"
            style={{
              width: `${tourProgress}%`,
              backgroundColor: 'var(--accent)',
            }}
          />
        </div>
      )}

      {/* 2. Main Exhibition Stage (3D Tilt Artwork + Museum Placard) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left / Center Stage: 3D Tilting Museum Frame (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* Hanging Hook Detail */}
            <div 
              className="w-5 h-4 rounded-t-sm shadow-sm -mb-1 z-10"
              style={{ backgroundColor: 'var(--border-strong)' }}
            />

            {/* 3D Interactive Framed Canvas */}
            <div
              ref={frameRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-[620px] rounded-2xl p-4 sm:p-6 transition-transform duration-150 ease-out cursor-zoom-in group select-none shadow-2xl"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '3px solid var(--border-strong)',
                transform: isHovered
                  ? `perspective(1200px) rotateY(${tilt.x * 14}deg) rotateX(${-tilt.y * 14}deg) scale3d(1.02, 1.02, 1.02)`
                  : 'perspective(1200px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)',
              }}
              onClick={() => setIsLightboxOpen(true)}
            >
              {/* Inner Museum Mat Card (装裱象牙白卡纸) */}
              <div 
                className="p-3 sm:p-5 rounded-xl border shadow-inner transition-colors duration-300"
                style={{
                  backgroundColor: 'var(--bg-page-subtle)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                {/* Artwork Viewport with Ken Burns breathing animation when Auto Tour is on */}
                <div className="relative overflow-hidden rounded-lg bg-black/5 aspect-[16/10] sm:aspect-[16/10] flex items-center justify-center shadow-md">
                  <img
                    src={activeCase.imageUrl}
                    alt={activeCase.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      isAutoTour ? 'scale-105 transition-all duration-[5000ms]' : 'group-hover:scale-105'
                    }`}
                  />

                  {/* Specular Light Reflection Sheen (物理反光) */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                    style={{
                      opacity: isHovered ? 0.35 : 0.05,
                      background: `linear-gradient(${120 + tilt.x * 60}deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.1) 40%, rgba(0,0,0,0) 70%)`,
                      mixBlendMode: 'overlay',
                    }}
                  />

                  {/* Top Left Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span 
                      className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full backdrop-blur-md shadow-md border"
                      style={{
                        backgroundColor: 'var(--bg-card)',
                        borderColor: 'var(--border-subtle)',
                        color: 'var(--accent)',
                      }}
                    >
                      {activeCase.badge} · {activeCase.category}
                    </span>
                  </div>

                  {/* Hover Zoom Shield */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div 
                      className="px-4 py-2 rounded-full backdrop-blur-md text-xs font-serif font-bold flex items-center gap-2 shadow-2xl border"
                      style={{
                        backgroundColor: 'var(--bg-card)',
                        borderColor: 'var(--border-subtle)',
                        color: 'var(--text-main)',
                      }}
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>点击全屏超清鉴赏</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Four Corner Brass Studs */}
              <span className="absolute top-2.5 left-2.5 w-1.5 h-1.5 rounded-full bg-stone-400 shadow-xs" />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-stone-400 shadow-xs" />
              <span className="absolute bottom-2.5 left-2.5 w-1.5 h-1.5 rounded-full bg-stone-400 shadow-xs" />
              <span className="absolute bottom-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-stone-400 shadow-xs" />
            </div>

            {/* Realistic Drop Shadow on Wall */}
            <div className="w-4/5 h-6 bg-black/15 blur-xl mt-3 rounded-full" />

            {/* Stepper Controls (Previous / Next Artwork) */}
            <div className="flex items-center justify-between w-full max-w-[480px] mt-4 px-2">
              <button
                onClick={handlePrev}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans border transition-all cursor-pointer shadow-xs hover:opacity-85"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-main)',
                }}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>上一幅流派</span>
              </button>

              {/* Progress Dots */}
              <div className="flex items-center gap-1.5">
                {filteredCases.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectCase(i)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      currentIndex === i ? 'w-6' : 'w-1.5 opacity-40'
                    }`}
                    style={{
                      backgroundColor: currentIndex === i ? 'var(--accent)' : 'var(--text-muted)',
                    }}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans border transition-all cursor-pointer shadow-xs hover:opacity-85"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-main)',
                }}
              >
                <span>下一幅流派</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Stage: Authentic Museum Placard (5 Cols) */}
          <div className="lg:col-span-5 text-left space-y-5">
            {/* Museum Placard Box */}
            <div
              className="relative rounded-2xl p-6 sm:p-8 border shadow-xl space-y-5 transition-colors duration-300"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-strong)',
              }}
            >
              {/* Corner Fastener Studs */}
              <span className="absolute top-3 left-3 w-2 h-2 rounded-full border border-black/10 bg-stone-300 shadow-inner" />
              <span className="absolute top-3 right-3 w-2 h-2 rounded-full border border-black/10 bg-stone-300 shadow-inner" />
              <span className="absolute bottom-3 left-3 w-2 h-2 rounded-full border border-black/10 bg-stone-300 shadow-inner" />
              <span className="absolute bottom-3 right-3 w-2 h-2 rounded-full border border-black/10 bg-stone-300 shadow-inner" />

              {/* Placard Header */}
              <div className="border-b pb-4 space-y-2" style={{ borderColor: 'var(--border-subtle)' }}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-widest font-bold uppercase" style={{ color: 'var(--accent)' }}>
                    MUSEUM PLACARD · 典藏展签
                  </span>
                  <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
                    ROOM {String(currentIndex + 1).padStart(2, '0')}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight" style={{ color: 'var(--text-main)' }}>
                  {activeCase.title}
                </h2>

                <div className="flex items-center gap-2 text-xs font-sans" style={{ color: 'var(--text-muted)' }}>
                  <span>{activeCase.category}</span>
                  <span>·</span>
                  <span>{activeCase.badge}</span>
                  <span>·</span>
                  <span className="font-mono text-[11px]">{activeCase.createdDate || '2026 典藏'}</span>
                </div>
              </div>

              {/* Curator Critique & Aesthetics Quote */}
              <blockquote 
                className="text-xs sm:text-sm font-serif italic leading-relaxed border-l-2 pl-3.5 py-0.5"
                style={{
                  borderColor: 'var(--accent)',
                  color: 'var(--text-main)',
                }}
              >
                "{activeCase.description}"
              </blockquote>

              {/* Style Tags */}
              <div className="flex flex-wrap gap-1.5">
                {activeCase.tags?.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md border"
                    style={{
                      backgroundColor: 'var(--tag-bg)',
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--tag-text)',
                    }}
                  >
                    #{t}
                  </span>
                ))}
              </div>

              {/* Color Palette Extraction Swatches */}
              <div className="pt-2 border-t space-y-2" style={{ borderColor: 'var(--border-subtle)' }}>
                <div className="flex items-center justify-between text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>
                  <span>🎨 流派色彩基因 (点击复制 HEX)</span>
                  {copiedColorHex && (
                    <span className="text-emerald-500 font-bold">已复制 {copiedColorHex}!</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {extractedColors.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => handleCopyColor(c.hex)}
                      className="w-7 h-7 rounded-full border shadow-xs hover:scale-110 transition-transform cursor-pointer relative group"
                      style={{ backgroundColor: c.hex, borderColor: 'var(--border-strong)' }}
                      title={`${c.name}: ${c.hex}`}
                    >
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[9px] font-mono px-1.5 py-0.5 rounded bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
                        {c.hex}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons: 1-Click Copy Prompt & Open Recipe Drawer */}
              <div className="pt-4 border-t flex flex-col sm:flex-row items-center gap-3" style={{ borderColor: 'var(--border-subtle)' }}>
                {/* One-Click Copy Full Prompt */}
                <button
                  onClick={handleCopyPrompt}
                  className="w-full sm:flex-1 py-2.5 px-4 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                  style={{
                    backgroundColor: copiedPrompt ? '#10B981' : 'var(--pill-active-bg)',
                    color: 'var(--pill-active-text)',
                  }}
                >
                  {copiedPrompt ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>已复制完整 Prompt！</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>一键复制 Prompt</span>
                    </>
                  )}
                </button>

                {/* Inspect Recipe Details */}
                <button
                  onClick={() => {
                    playSpotlightClick();
                    setIsDrawerOpen(true);
                  }}
                  className="w-full sm:w-auto py-2.5 px-4 rounded-xl border text-xs font-sans font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 hover:opacity-85"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border-strong)',
                    color: 'var(--text-main)',
                  }}
                >
                  <Sliders className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                  <span>拆解配方</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </button>
              </div>
            </div>

            {/* Video Recording Pro-Tip */}
            <div 
              className="p-3 rounded-xl border text-[11px] leading-relaxed flex items-center gap-2.5"
              style={{
                backgroundColor: 'var(--bg-page-subtle)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-muted)',
              }}
            >
              <Info className="w-4 h-4 shrink-0" style={{ color: 'var(--accent)' }} />
              <span>
                <strong>录屏演示技巧：</strong> 点击顶部「自动漫步巡礼」即可开启 5 秒自动镜头轮播；鼠标悬停画作即可演示 3D 物理反光与视差。
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Curated Horizontal Exhibition Rack (画作缩略漫步展架) */}
      <div 
        className="border-t py-6 px-4 sm:px-8 transition-colors"
        style={{
          backgroundColor: 'var(--bg-page-subtle)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Header & Category Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4" style={{ color: 'var(--accent)' }} />
              <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-main)' }}>
                流派画卷长廊 ({filteredCases.length})
              </h3>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    playSpotlightClick();
                    setSelectedCategory(cat);
                    setCurrentIndex(0);
                  }}
                  className="px-3 py-1 rounded-full text-[11px] font-sans font-medium whitespace-nowrap transition-all cursor-pointer border"
                  style={{
                    backgroundColor: selectedCategory === cat ? 'var(--pill-active-bg)' : 'var(--bg-card)',
                    borderColor: selectedCategory === cat ? 'var(--pill-active-bg)' : 'var(--border-subtle)',
                    color: selectedCategory === cat ? 'var(--pill-active-text)' : 'var(--text-muted)',
                  }}
                >
                  {cat === 'all' ? '全部流派' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Horizontal Exhibition Scrollbar */}
          <div className="flex items-center gap-4 overflow-x-auto pb-3 pt-1 scrollbar-none">
            {filteredCases.map((c, idx) => {
              const active = idx === currentIndex;
              return (
                <div
                  key={c.id}
                  onClick={() => handleSelectCase(idx)}
                  className={`group shrink-0 w-48 sm:w-56 rounded-xl border p-2.5 transition-all duration-200 cursor-pointer text-left ${
                    active ? 'ring-2 scale-[1.02] shadow-md' : 'hover:opacity-90 shadow-xs'
                  }`}
                  style={{
                    backgroundColor: active ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                    borderColor: active ? 'var(--accent)' : 'var(--border-subtle)',
                  }}
                >
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden border mb-2 bg-black/10" style={{ borderColor: 'var(--border-subtle)' }}>
                    <img
                      src={c.imageUrl}
                      alt={c.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span 
                      className="absolute top-1.5 left-1.5 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded backdrop-blur-md border shadow-xs"
                      style={{
                        backgroundColor: 'var(--bg-card)',
                        borderColor: 'var(--border-subtle)',
                        color: 'var(--text-main)',
                      }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold truncate" style={{ color: 'var(--accent)' }}>
                        {c.badge}
                      </span>
                      <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
                        {c.category}
                      </span>
                    </div>
                    <div className="text-xs font-bold truncate" style={{ color: 'var(--text-main)' }}>
                      {c.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Curator Recipe & Prompt Slide-Out Drawer (高奢策展档案抽屉) */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-fadeIn">
          {/* Backdrop click to close */}
          <div className="flex-1" onClick={() => setIsDrawerOpen(false)} />

          {/* Drawer Body */}
          <div 
            className="w-full max-w-xl h-full overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl text-left border-l transition-colors"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-main)',
            }}
          >
            {/* Drawer Top Header */}
            <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                <h2 className="text-lg font-serif font-black" style={{ color: 'var(--text-main)' }}>
                  策展档案与 AI 提示词积木拆解
                </h2>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 rounded-full border hover:opacity-75 transition-opacity cursor-pointer"
                style={{ borderColor: 'var(--border-subtle)' }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Artwork Mini Card */}
            <div 
              className="p-4 rounded-xl border flex items-center gap-4"
              style={{
                backgroundColor: 'var(--bg-page-subtle)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <img
                src={activeCase.imageUrl}
                alt={activeCase.title}
                className="w-20 h-20 object-cover rounded-lg border shadow-xs shrink-0"
                style={{ borderColor: 'var(--border-subtle)' }}
              />
              <div className="space-y-1">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border" style={{ backgroundColor: 'var(--tag-bg)', borderColor: 'var(--border-subtle)', color: 'var(--tag-text)' }}>
                  {activeCase.badge} · {activeCase.category}
                </span>
                <h3 className="text-sm font-bold">{activeCase.title}</h3>
                <p className="text-xs line-clamp-2" style={{ color: 'var(--text-muted)' }}>
                  {activeCase.description}
                </p>
              </div>
            </div>

            {/* Complete Prompt Copy Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-main)' }}>
                  完整提示词 (Full Prompt)
                </span>
                <button
                  onClick={handleCopyPrompt}
                  className="flex items-center gap-1 text-xs font-bold cursor-pointer hover:opacity-80 transition-opacity"
                  style={{ color: 'var(--accent)' }}
                >
                  {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPrompt ? '已复制！' : '一键复制'}</span>
                </button>
              </div>
              <div 
                className="p-3.5 rounded-xl border font-mono text-xs leading-relaxed select-all"
                style={{
                  backgroundColor: 'var(--bg-input)',
                  borderColor: 'var(--border-strong)',
                  color: 'var(--text-main)',
                }}
              >
                {activeCase.fullPrompt}
              </div>
            </div>

            {/* Prompt Deconstruction Bricks */}
            {activeCase.promptBlocks && (
              <div className="space-y-3.5 pt-2 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  模块化提示词积木解析 (Prompt Blocks)
                </h4>

                {/* 1. Subject */}
                <div className="p-3 rounded-lg border space-y-1" style={{ backgroundColor: 'var(--bg-page-subtle)', borderColor: 'var(--border-subtle)' }}>
                  <div className="text-[11px] font-bold" style={{ color: 'var(--accent)' }}>
                    [1. 核心主体 · Subject]
                  </div>
                  <div className="text-xs font-mono">{activeCase.promptBlocks.subject}</div>
                </div>

                {/* 2. Style */}
                <div className="p-3 rounded-lg border space-y-1" style={{ backgroundColor: 'var(--bg-page-subtle)', borderColor: 'var(--border-subtle)' }}>
                  <div className="text-[11px] font-bold" style={{ color: 'var(--accent)' }}>
                    [2. 艺术基底 · Style Base]
                  </div>
                  <div className="text-xs font-mono">{activeCase.promptBlocks.style}</div>
                </div>

                {/* 3. Texture */}
                <div className="p-3 rounded-lg border space-y-1" style={{ backgroundColor: 'var(--bg-page-subtle)', borderColor: 'var(--border-subtle)' }}>
                  <div className="text-[11px] font-bold" style={{ color: 'var(--accent)' }}>
                    [3. 材质与笔触 · Texture]
                  </div>
                  <div className="text-xs font-mono">{activeCase.promptBlocks.texture}</div>
                </div>

                {/* 4. Lighting */}
                <div className="p-3 rounded-lg border space-y-1" style={{ backgroundColor: 'var(--bg-page-subtle)', borderColor: 'var(--border-subtle)' }}>
                  <div className="text-[11px] font-bold" style={{ color: 'var(--accent)' }}>
                    [4. 光影氛围 · Lighting]
                  </div>
                  <div className="text-xs font-mono">{activeCase.promptBlocks.lighting}</div>
                </div>

                {/* 5. Composition */}
                <div className="p-3 rounded-lg border space-y-1" style={{ backgroundColor: 'var(--bg-page-subtle)', borderColor: 'var(--border-subtle)' }}>
                  <div className="text-[11px] font-bold" style={{ color: 'var(--accent)' }}>
                    [5. 构图视角 · Composition]
                  </div>
                  <div className="text-xs font-mono">{activeCase.promptBlocks.composition}</div>
                </div>

                {/* 6. Parameters */}
                <div className="p-3 rounded-lg border space-y-1" style={{ backgroundColor: 'var(--bg-page-subtle)', borderColor: 'var(--border-subtle)' }}>
                  <div className="text-[11px] font-bold" style={{ color: 'var(--accent)' }}>
                    [6. 模型参数 · Parameters]
                  </div>
                  <div className="text-xs font-mono">{activeCase.promptBlocks.parameters}</div>
                </div>

                {/* Negative */}
                {activeCase.promptBlocks.negative && (
                  <div className="p-3 rounded-lg border space-y-1" style={{ backgroundColor: 'var(--bg-page-subtle)', borderColor: 'var(--border-subtle)' }}>
                    <div className="text-[11px] font-bold text-red-500">
                      [负向关键词 · Negative]
                    </div>
                    <div className="text-xs font-mono opacity-80">{activeCase.promptBlocks.negative}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. Fullscreen Lightbox Modal (全屏高清鉴赏) */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8 animate-fadeIn">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-5 right-5 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-50"
            title="关闭全屏 (Esc)"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-6xl w-full max-h-[90vh] flex flex-col items-center justify-center">
            <img
              src={activeCase.imageUrl}
              alt={activeCase.title}
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border border-white/20"
            />
            <div className="mt-4 text-center space-y-1 text-white">
              <h3 className="text-xl font-serif font-black">{activeCase.title}</h3>
              <p className="text-xs opacity-70 font-sans">{activeCase.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
