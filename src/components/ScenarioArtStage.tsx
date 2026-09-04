import React, { useState, useEffect, useRef } from 'react';
import type { AIImageCase } from '../types/art';
import { 
  Sparkles, Copy, Check, Play, Pause, Maximize2, X, ChevronLeft, ChevronRight, 
  Flame, Droplets, Zap, Crown, Volume2, VolumeX, Sliders, ArrowUpRight, Compass
} from 'lucide-react';
import { playSpotlightClick, playSuccessChime, playMuseumFootstep, playGalleryBell, toggleAmbientSound } from '../utils/audio';

// 4 Living Scenario Environments
export type ScenarioId = 'cozy-night' | 'zen-mist' | 'cyber-neon' | 'grand-salon';

interface ScenarioConfig {
  id: ScenarioId;
  name: string;
  enName: string;
  badge: string;
  subtitle: string;
  atmosphereDesc: string;
  bgImage: string;
  themeColor: string;
  accentGlow: string;
  frameStyle: string;
  matColor: string;
  placardBg: string;
  placardBorder: string;
  soundType: 'hearth' | 'rain' | 'cyber' | 'hall';
}

interface ScenarioArtStageProps {
  imageCases: AIImageCase[];
}

export const ScenarioArtStage: React.FC<ScenarioArtStageProps> = ({ imageCases }) => {
  const basePath = import.meta.env.BASE_URL;

  const SCENARIOS: Record<ScenarioId, ScenarioConfig> = {
    'cozy-night': {
      id: 'cozy-night',
      name: '暖夜微光',
      enName: 'Warm Night Hearth',
      badge: '温馨居所',
      subtitle: '夜晚灯光下的温馨木屋场景',
      atmosphereDesc: '窗外细雨敲窗 · 琥珀壁炉柴火轻响 · 暖黄油灯与热红茶',
      bgImage: `${basePath}scenes/cozy_hearth.jpg`,
      themeColor: '#E07A5F',
      accentGlow: 'rgba(224, 122, 95, 0.4)',
      frameStyle: 'border-4 border-[#3D291D] shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-[#2A1C14]',
      matColor: 'bg-[#F2E8DC]/95 border-[#C8B8A6]',
      placardBg: 'bg-[#18110D]/85 backdrop-blur-xl',
      placardBorder: 'border-amber-500/30',
      soundType: 'hearth',
    },
    'zen-mist': {
      id: 'zen-mist',
      name: '空山新雨',
      enName: 'Misty Rain Zen',
      badge: '东方禅茶',
      subtitle: '水墨烟雨与青石幽亭',
      atmosphereDesc: '空山竹雨 · 宋式青瓷凝结晨露 · 宣纸自然渗墨与空灵留白',
      bgImage: `${basePath}scenes/oriental_zen.jpg`,
      themeColor: '#52B788',
      accentGlow: 'rgba(82, 183, 136, 0.35)',
      frameStyle: 'border-4 border-[#222E28] shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-[#17221C]',
      matColor: 'bg-[#EAE5DC]/90 border-[#A3B899]',
      placardBg: 'bg-[#0E1712]/85 backdrop-blur-xl',
      placardBorder: 'border-emerald-500/30',
      soundType: 'rain',
    },
    'cyber-neon': {
      id: 'cyber-neon',
      name: '赛博雨夜',
      enName: 'Neon Cyber Alley',
      badge: '全息街町',
      subtitle: '银翼杀手霓虹冷雨与深夜拉面摊',
      atmosphereDesc: '湿漉沥青 · 全息水波倒影 · 荧光青蓝与洋红光雾穿透夜空',
      bgImage: `${basePath}scenes/cyber_neon.jpg`,
      themeColor: '#00F0FF',
      accentGlow: 'rgba(0, 240, 255, 0.4)',
      frameStyle: 'border-4 border-[#0F2238] shadow-[0_20px_60px_rgba(0,240,255,0.25)] bg-[#0A1626]',
      matColor: 'bg-[#070D18]/95 border-[#00F0FF]/40',
      placardBg: 'bg-[#050C1A]/85 backdrop-blur-xl',
      placardBorder: 'border-cyan-400/40',
      soundType: 'cyber',
    },
    'grand-salon': {
      id: 'grand-salon',
      name: '永恒殿堂',
      enName: 'Grand Louvre Salon',
      badge: '卢浮画廊',
      subtitle: '古典卢浮宫巴洛克鎏金沙龙',
      atmosphereDesc: '水晶吊灯倒影 · 人字拼木地板微光 · 卡拉瓦乔戏剧明暗',
      bgImage: `${basePath}scenes/louvre_hall.jpg`,
      themeColor: '#D4AF37',
      accentGlow: 'rgba(212, 175, 55, 0.45)',
      frameStyle: 'border-4 border-[#5E4820] shadow-[0_25px_60px_rgba(0,0,0,0.85)] bg-[#3A2D15]',
      matColor: 'bg-[#F9F5EC]/95 border-[#D4AF37]/50',
      placardBg: 'bg-[#22170D]/85 backdrop-blur-xl',
      placardBorder: 'border-yellow-500/40',
      soundType: 'hall',
    },
  };

  const [activeScenario, setActiveScenario] = useState<ScenarioId>('cozy-night');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Video Demo: Auto Tour Mode
  const [isAutoTour, setIsAutoTour] = useState(false);
  const [tourProgress, setTourProgress] = useState(0);

  // Transition & Animation
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  // 3D Perspective Tilt
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  // Modals & Drawers
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedColorHex, setCopiedColorHex] = useState<string | null>(null);
  const [ambientPlaying, setAmbientPlaying] = useState(false);

  const currentScenario = SCENARIOS[activeScenario];

  const categories = ['all', ...Array.from(new Set(imageCases.map((c) => c.category)))];

  const filteredCases = selectedCategory === 'all'
    ? imageCases
    : imageCases.filter((c) => c.category === selectedCategory);

  const activeCase = filteredCases[currentIndex] || filteredCases[0] || imageCases[0];

  // Auto Tour Timer
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
          triggerTransition((currentIndex + 1) % filteredCases.length);
          playGalleryBell(480 + ((currentIndex + 1) % filteredCases.length) * 15);
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isAutoTour, filteredCases.length, currentIndex]);

  // Keyboard Navigation: Space for Auto Tour, Left/Right for Switch, F for Fullscreen, Esc for Close
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
      } else if (e.key === 'f' || e.key === 'F') {
        setIsLightboxOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsLightboxOpen(false);
        setIsDrawerOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredCases.length, currentIndex]);

  const triggerTransition = (newIdx: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(newIdx);
      setAnimationKey((prev) => prev + 1);
      setIsTransitioning(false);
    }, 180);
    setTourProgress(0);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x, y });
  };

  const handleNext = () => {
    playMuseumFootstep();
    triggerTransition((currentIndex + 1) % filteredCases.length);
  };

  const handlePrev = () => {
    playMuseumFootstep();
    triggerTransition((currentIndex - 1 + filteredCases.length) % filteredCases.length);
  };

  const handleSelectCase = (idx: number) => {
    playMuseumFootstep();
    triggerTransition(idx);
  };

  const handleSwitchScenario = (scId: ScenarioId) => {
    playSpotlightClick();
    playSuccessChime();
    setActiveScenario(scId);
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

  const handleToggleAmbient = () => {
    const newState = toggleAmbientSound();
    setAmbientPlaying(newState);
  };

  const extractedColors = [
    { name: '主色', hex: currentScenario.themeColor },
    { name: '琥珀', hex: '#D4A373' },
    { name: '暗影', hex: '#2B1E16' },
    { name: '高光', hex: '#FAEDCD' },
    { name: '基底', hex: '#6B705C' },
  ];

  if (!activeCase) return null;

  return (
    <section className="relative w-full min-h-[92vh] overflow-hidden text-white transition-all duration-700 select-none flex flex-col justify-between">
      
      {/* =========================================================================
          LAYER 1: LIVING SCENARIO BACKGROUND WITH ARTISTIC VIGNETTE BLEND
          真实场景作为底色与空间，羽化融合到页面，整个页面美得跟画一样
          ========================================================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Scenario Background Photo with Ken Burns slow breath */}
        <img
          src={currentScenario.bgImage}
          alt={currentScenario.name}
          className="w-full h-full object-cover object-center scale-105 transition-all duration-1000 filter brightness-[0.75] contrast-[1.08]"
          style={{
            animation: 'kenBurnsSlow 20s ease-in-out infinite alternate',
          }}
        />

        {/* Feathered Dark Vignette Edge Blend (让边缘如油画般自然晕开融入，绝无生硬方框) */}
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0.15) 0%, rgba(10,8,6,0.65) 60%, rgba(5,3,2,0.96) 95%)`,
          }}
        />

        {/* Dynamic Light Source Flare (针对夜晚暖灯场景：真实温暖壁炉烛火光斑) */}
        <div 
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            background: `radial-gradient(circle at 65% 55%, ${currentScenario.accentGlow} 0%, rgba(0,0,0,0) 65%)`,
            mixBlendMode: 'screen',
            animation: activeScenario === 'cozy-night' ? 'warmPulse 4s ease-in-out infinite' : 'none',
          }}
        />

        {/* Rain and Atmosphere Mist overlay */}
        <div 
          className="absolute inset-0 opacity-25 pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      {/* =========================================================================
          LAYER 2: SCENARIO SELECTION DOCK & CINEMATIC RECORDING CONTROLS
          ========================================================================= */}
      <div className="relative z-20 px-4 sm:px-8 pt-5 pb-3 flex flex-wrap items-center justify-between gap-4">
        
        {/* Left: Interactive 4 Scenario Mood Switcher Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl">
          {(Object.keys(SCENARIOS) as ScenarioId[]).map((scKey) => {
            const sc = SCENARIOS[scKey];
            const isSelected = activeScenario === scKey;
            return (
              <button
                key={scKey}
                onClick={() => handleSwitchScenario(scKey)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-serif font-bold transition-all duration-300 cursor-pointer ${
                  isSelected 
                    ? 'shadow-lg scale-[1.03] text-black font-extrabold' 
                    : 'text-stone-300 hover:text-white hover:bg-white/10'
                }`}
                style={{
                  backgroundColor: isSelected ? sc.themeColor : 'transparent',
                }}
              >
                {scKey === 'cozy-night' && <Flame className="w-3.5 h-3.5 shrink-0" />}
                {scKey === 'zen-mist' && <Droplets className="w-3.5 h-3.5 shrink-0" />}
                {scKey === 'cyber-neon' && <Zap className="w-3.5 h-3.5 shrink-0" />}
                {scKey === 'grand-salon' && <Crown className="w-3.5 h-3.5 shrink-0" />}
                <span>{sc.name}</span>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-black/70 animate-pulse ml-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Video Recording Controls (Auto Tour, Lightbox, Sound) */}
        <div className="flex items-center gap-2.5">
          {/* Ambient Soundscape Toggle */}
          <button
            onClick={handleToggleAmbient}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs font-sans transition-all cursor-pointer hover:bg-white/15"
            style={{
              color: ambientPlaying ? currentScenario.themeColor : '#D6D3D1',
              borderColor: ambientPlaying ? currentScenario.themeColor : 'rgba(255,255,255,0.15)',
            }}
            title="展厅情境音效 (柴火/雨滴/禅意)"
          >
            {ambientPlaying ? <Volume2 className="w-3.5 h-3.5 animate-bounce" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{ambientPlaying ? '情境音效开启' : '静音'}</span>
          </button>

          {/* Auto Tour Toggle */}
          <button
            onClick={() => {
              playSpotlightClick();
              setIsAutoTour((prev) => !prev);
            }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-sans font-bold shadow-xl transition-all cursor-pointer hover:scale-105 active:scale-95"
            style={{
              backgroundColor: isAutoTour ? '#DC2626' : currentScenario.themeColor,
              color: isAutoTour ? '#FFFFFF' : '#14100D',
              boxShadow: `0 0 25px ${currentScenario.accentGlow}`,
            }}
            title="快捷键：按空格键 Space 开始/暂停"
          >
            {isAutoTour ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>暂停巡礼 (Space)</span>
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
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
            className="p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-stone-300 hover:text-white hover:bg-white/15 transition-all cursor-pointer"
            title="超清全屏鉴赏 (F)"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Auto Tour Flowing Progress Line */}
      {isAutoTour && (
        <div className="relative z-30 w-full h-1 bg-black/40 overflow-hidden">
          <div 
            className="h-full transition-all duration-75 ease-linear"
            style={{
              width: `${tourProgress}%`,
              backgroundColor: currentScenario.themeColor,
              boxShadow: `0 0 12px ${currentScenario.themeColor}`,
            }}
          />
        </div>
      )}

      {/* =========================================================================
          LAYER 3: MAIN SCENARIO STAGE (3D FLOATING CANVAS + INTEGRATED PLACARD)
          ========================================================================= */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-10 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left / Center: 3D Tilting Museum Painting on Wall (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* Top Frame Brass Suspension Ring Detail */}
            <div className="w-6 h-3.5 rounded-t-sm bg-stone-400 shadow-md -mb-1 z-20 border border-stone-600/40" />

            {/* 3D Physical Art Frame */}
            <div
              key={`canvas-${animationKey}`}
              ref={frameRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => {
                setIsHovered(false);
                setTilt({ x: 0, y: 0 });
              }}
              onClick={() => setIsLightboxOpen(true)}
              className={`relative w-full max-w-[620px] rounded-2xl p-4 sm:p-5 transition-all duration-300 ease-out cursor-zoom-in group select-none ${
                currentScenario.frameStyle
              } ${isTransitioning ? 'opacity-30 scale-[0.98]' : 'animate-curtain-sweep'}`}
              style={{
                transform: isHovered && !isTransitioning
                  ? `perspective(1200px) rotateY(${tilt.x * 16}deg) rotateX(${-tilt.y * 16}deg) scale3d(1.025, 1.025, 1.025)`
                  : 'perspective(1200px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)',
              }}
            >
              {/* Inner Museum Mat Card (象牙白装裱卡纸) */}
              <div className={`p-3 sm:p-4 rounded-xl border shadow-inner transition-colors duration-500 ${currentScenario.matColor}`}>
                
                {/* Artwork Viewport with Ken Burns breathing effect */}
                <div className="relative overflow-hidden rounded-lg bg-black/40 aspect-[16/10] flex items-center justify-center shadow-2xl">
                  <img
                    src={activeCase.imageUrl}
                    alt={activeCase.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      isAutoTour ? 'animate-ken-burns' : 'group-hover:scale-105'
                    }`}
                  />

                  {/* Specular Light Reflection Glare (玻璃高光流转) */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                    style={{
                      opacity: isHovered ? 0.35 : 0.08,
                      background: `linear-gradient(${120 + tilt.x * 60}deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.15) 35%, rgba(0,0,0,0) 70%)`,
                      mixBlendMode: 'overlay',
                    }}
                  />

                  {/* Style Tag Floating Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span 
                      className="text-[10px] font-mono font-bold px-3 py-1 rounded-full backdrop-blur-md shadow-lg border border-white/20 flex items-center gap-1.5"
                      style={{
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        color: currentScenario.themeColor,
                      }}
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{activeCase.badge} · {activeCase.category}</span>
                    </span>
                  </div>

                  {/* Hover Zoom Shield */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="px-4 py-2 rounded-full backdrop-blur-md bg-black/80 text-white text-xs font-serif font-bold flex items-center gap-2 shadow-2xl border border-white/20">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>全屏超清赏析 (F)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 Corner Brass Rivet Studs */}
              <span className="absolute top-2.5 left-2.5 w-2 h-2 rounded-full bg-amber-400/80 shadow-xs" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-amber-400/80 shadow-xs" />
              <span className="absolute bottom-2.5 left-2.5 w-2 h-2 rounded-full bg-amber-400/80 shadow-xs" />
              <span className="absolute bottom-2.5 right-2.5 w-2 h-2 rounded-full bg-amber-400/80 shadow-xs" />
            </div>

            {/* Wall Cast Shadow */}
            <div className="w-4/5 h-6 bg-black/60 blur-xl mt-3 rounded-full" />

            {/* Artwork Navigation Arrows */}
            <div className="flex items-center justify-between w-full max-w-[480px] mt-4 px-2">
              <button
                onClick={handlePrev}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-stone-300 hover:text-white text-xs font-sans transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-lg"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>上一幅 (←)</span>
              </button>

              {/* Dot Indicators */}
              <div className="flex items-center gap-1.5 max-w-[180px] overflow-hidden">
                {filteredCases.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectCase(i)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      currentIndex === i ? 'w-6 bg-white' : 'w-1.5 bg-white/30'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-stone-300 hover:text-white text-xs font-sans transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-lg"
              >
                <span>下一幅 (→)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Integrated Museum Placard (5 Cols) - Blends into the scene */}
          <div key={`placard-${animationKey}`} className="lg:col-span-5 text-left space-y-4 animate-placard-slide">
            
            {/* Frosted Atmospheric Placard Card */}
            <div
              className={`relative rounded-2xl p-6 sm:p-7 border shadow-2xl space-y-4 transition-all duration-500 ${currentScenario.placardBg} ${currentScenario.placardBorder}`}
            >
              {/* Corner Studs */}
              <span className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-amber-400/80 shadow-xs" />
              <span className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-amber-400/80 shadow-xs" />
              <span className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-amber-400/80 shadow-xs" />
              <span className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-amber-400/80 shadow-xs" />

              {/* Placard Header */}
              <div className="border-b border-white/15 pb-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-widest font-bold uppercase" style={{ color: currentScenario.themeColor }}>
                    EXHIBITION PLACARD · 典藏展签
                  </span>
                  <span className="text-[10px] font-mono text-stone-400">
                    ROOM {String(currentIndex + 1).padStart(2, '0')} // {activeCase.category}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-white drop-shadow-md">
                  {activeCase.title}
                </h2>

                <p className="text-xs font-mono text-stone-300">
                  {currentScenario.subtitle} · {activeCase.createdDate || '2026 典藏'}
                </p>
              </div>

              {/* Curator Quote & Aesthetics */}
              <blockquote className="text-xs sm:text-sm font-serif italic text-stone-200 leading-relaxed border-l-2 pl-3.5 py-0.5 border-amber-400/60">
                "{activeCase.description}"
              </blockquote>

              {/* Style Tags */}
              <div className="flex flex-wrap gap-1.5">
                {activeCase.tags?.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/10 border border-white/15 text-stone-200"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              {/* Extracted Color Palette */}
              <div className="pt-2 border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
                  <span>🎨 场景色彩基因 (点击提取 HEX)</span>
                  {copiedColorHex && (
                    <span className="text-emerald-400 font-bold">已复制 {copiedColorHex}!</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {extractedColors.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => handleCopyColor(c.hex)}
                      className="w-7 h-7 rounded-full border border-white/20 shadow-md hover:scale-125 transition-transform cursor-pointer relative group active:scale-95"
                      style={{ backgroundColor: c.hex }}
                      title={`${c.name}: ${c.hex}`}
                    >
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[9px] font-mono px-1.5 py-0.5 rounded bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg z-30">
                        {c.hex}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons: 1-Click Copy & Open Recipe Drawer */}
              <div className="pt-3 border-t border-white/15 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={handleCopyPrompt}
                  className="w-full sm:flex-1 py-2.5 px-4 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-98"
                  style={{
                    backgroundColor: copiedPrompt ? '#10B981' : currentScenario.themeColor,
                    color: '#14100D',
                  }}
                >
                  {copiedPrompt ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span className="text-white">已复制完整 Prompt！</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>一键复制 Prompt</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    playSpotlightClick();
                    setIsDrawerOpen(true);
                  }}
                  className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-sans font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 hover:scale-105 active:scale-95"
                >
                  <Sliders className="w-4 h-4" style={{ color: currentScenario.themeColor }} />
                  <span>拆解配方</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </button>
              </div>
            </div>

            {/* Atmosphere Hint */}
            <div className="p-3 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 text-[11px] text-stone-300 leading-relaxed flex items-center gap-2.5 shadow-lg">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: currentScenario.themeColor }} />
              <span>
                <strong>当前情境：</strong> {currentScenario.atmosphereDesc}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          LAYER 4: BOTTOM FILMSTRIP EXHIBITION RACK
          ========================================================================= */}
      <div className="relative z-20 border-t border-white/10 bg-black/60 backdrop-blur-xl py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          {/* Header & Category Filter Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4" style={{ color: currentScenario.themeColor }} />
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-200">
                流派画卷长廊 ({filteredCases.length} 藏品收录)
              </h3>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    playSpotlightClick();
                    setSelectedCategory(cat);
                    setCurrentIndex(0);
                  }}
                  className={`px-3 py-1 rounded-full text-[11px] font-sans font-medium whitespace-nowrap transition-all cursor-pointer border ${
                    selectedCategory === cat
                      ? 'text-black font-bold shadow-md'
                      : 'bg-white/5 border-white/10 text-stone-400 hover:text-white hover:bg-white/10'
                  }`}
                  style={{
                    backgroundColor: selectedCategory === cat ? currentScenario.themeColor : undefined,
                    borderColor: selectedCategory === cat ? currentScenario.themeColor : undefined,
                  }}
                >
                  {cat === 'all' ? '全部流派' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Horizontal Miniature Rack */}
          <div className="flex items-center gap-3.5 overflow-x-auto pb-2 scrollbar-none">
            {filteredCases.map((c, idx) => {
              const active = idx === currentIndex;
              return (
                <div
                  key={c.id}
                  onClick={() => handleSelectCase(idx)}
                  className={`group shrink-0 w-44 sm:w-52 rounded-xl border p-2 transition-all duration-300 cursor-pointer text-left bg-black/60 backdrop-blur-md ${
                    active 
                      ? 'ring-2 scale-[1.03] shadow-2xl' 
                      : 'border-white/10 hover:border-white/30 hover:opacity-90'
                  }`}
                  style={{
                    borderColor: active ? currentScenario.themeColor : undefined,
                  }}
                >
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-white/10 mb-1.5 bg-black/40">
                    <img
                      src={c.imageUrl}
                      alt={c.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <span className="absolute top-1.5 left-1.5 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-md text-white border border-white/20">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold truncate" style={{ color: currentScenario.themeColor }}>
                        {c.badge}
                      </span>
                      <span className="text-[10px] font-mono text-stone-400">
                        {c.category}
                      </span>
                    </div>
                    <div className="text-xs font-bold truncate text-white">
                      {c.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* =========================================================================
          LAYER 5: PROMPT RECIPE SLIDE-OUT DRAWER
          ========================================================================= */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="flex-1" onClick={() => setIsDrawerOpen(false)} />

          <div 
            className="w-full max-w-xl h-full overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl text-left border-l border-white/15 bg-[#14100D]/95 backdrop-blur-2xl animate-placard-slide text-stone-200"
          >
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5" style={{ color: currentScenario.themeColor }} />
                <h2 className="text-lg font-serif font-black text-white">
                  策展档案与 AI 提示词积木拆解
                </h2>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 rounded-full border border-white/15 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Artwork Mini Card */}
            <div className="p-4 rounded-xl border border-white/10 bg-white/5 flex items-center gap-4">
              <img
                src={activeCase.imageUrl}
                alt={activeCase.title}
                className="w-20 h-20 object-cover rounded-lg border border-white/20 shadow-md shrink-0"
              />
              <div className="space-y-1">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-amber-300">
                  {activeCase.badge} · {activeCase.category}
                </span>
                <h3 className="text-sm font-bold text-white">{activeCase.title}</h3>
                <p className="text-xs text-stone-400 line-clamp-2">
                  {activeCase.description}
                </p>
              </div>
            </div>

            {/* Full Prompt Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-300">
                  完整提示词 (Full Prompt)
                </span>
                <button
                  onClick={handleCopyPrompt}
                  className="flex items-center gap-1 text-xs font-bold cursor-pointer hover:opacity-80 transition-opacity"
                  style={{ color: currentScenario.themeColor }}
                >
                  {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPrompt ? '已复制！' : '一键复制'}</span>
                </button>
              </div>
              <div className="p-3.5 rounded-xl border border-white/15 bg-black/60 font-mono text-xs leading-relaxed select-all text-stone-200">
                {activeCase.fullPrompt}
              </div>
            </div>

            {/* Deconstruction Blocks */}
            {activeCase.promptBlocks && (
              <div className="space-y-3 pt-2 border-t border-white/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  模块化提示词积木解析 (Prompt Blocks)
                </h4>

                <div className="p-3 rounded-lg border border-white/10 bg-white/5 space-y-1">
                  <div className="text-[11px] font-bold" style={{ color: currentScenario.themeColor }}>
                    [1. 核心主体 · Subject]
                  </div>
                  <div className="text-xs font-mono text-stone-300">{activeCase.promptBlocks.subject}</div>
                </div>

                <div className="p-3 rounded-lg border border-white/10 bg-white/5 space-y-1">
                  <div className="text-[11px] font-bold" style={{ color: currentScenario.themeColor }}>
                    [2. 艺术基底 · Style Base]
                  </div>
                  <div className="text-xs font-mono text-stone-300">{activeCase.promptBlocks.style}</div>
                </div>

                <div className="p-3 rounded-lg border border-white/10 bg-white/5 space-y-1">
                  <div className="text-[11px] font-bold" style={{ color: currentScenario.themeColor }}>
                    [3. 材质与笔触 · Texture]
                  </div>
                  <div className="text-xs font-mono text-stone-300">{activeCase.promptBlocks.texture}</div>
                </div>

                <div className="p-3 rounded-lg border border-white/10 bg-white/5 space-y-1">
                  <div className="text-[11px] font-bold" style={{ color: currentScenario.themeColor }}>
                    [4. 光影氛围 · Lighting]
                  </div>
                  <div className="text-xs font-mono text-stone-300">{activeCase.promptBlocks.lighting}</div>
                </div>

                <div className="p-3 rounded-lg border border-white/10 bg-white/5 space-y-1">
                  <div className="text-[11px] font-bold" style={{ color: currentScenario.themeColor }}>
                    [5. 构图视角 · Composition]
                  </div>
                  <div className="text-xs font-mono text-stone-300">{activeCase.promptBlocks.composition}</div>
                </div>

                <div className="p-3 rounded-lg border border-white/10 bg-white/5 space-y-1">
                  <div className="text-[11px] font-bold" style={{ color: currentScenario.themeColor }}>
                    [6. 模型参数 · Parameters]
                  </div>
                  <div className="text-xs font-mono text-stone-300">{activeCase.promptBlocks.parameters}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          LAYER 6: FULLSCREEN LIGHTBOX
          ========================================================================= */}
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
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border border-white/20 animate-curtain-sweep"
            />
            <div className="mt-4 text-center space-y-1 text-white">
              <h3 className="text-xl font-serif font-black">{activeCase.title}</h3>
              <p className="text-xs opacity-70 font-sans">{activeCase.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
