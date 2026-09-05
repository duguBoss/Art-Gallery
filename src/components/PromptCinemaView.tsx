import React, { useState, useEffect } from 'react';
import type { CinemaScene } from '../types/cinema';
import { 
  Play, Pause, ChevronLeft, ChevronRight, Maximize2, Minimize2, 
  Copy, Check, Film, Camera, Sparkles, Layers, Sliders, Volume2, VolumeX 
} from 'lucide-react';
import { playSpotlightClick, playSuccessChime } from '../utils/audio';

interface PromptCinemaViewProps {
  scenes: CinemaScene[];
  onOpenCMS?: () => void;
  onExploreAtom?: (atomName: string) => void;
  onExplorePrinciple?: (principleName: string) => void;
}

type ShotStage = 'atmosphere' | 'script' | 'camera' | 'bts' | 'final';

export const PromptCinemaView: React.FC<PromptCinemaViewProps> = ({
  scenes,
  onOpenCMS,
  onExploreAtom,
  onExplorePrinciple,
}) => {
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [currentStage, setCurrentStage] = useState<ShotStage>('atmosphere');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isCinemaMode, setIsCinemaMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [playbackSeconds, setPlaybackSeconds] = useState(0);
  const [isPureFrame, setIsPureFrame] = useState(false);

  const activeScene = scenes[currentSceneIdx] || scenes[0];

  // Stage sequence
  const stageSequence: { id: ShotStage; label: string; timeOffset: number }[] = [
    { id: 'atmosphere', label: '01 建立镜头 (Atmosphere)', timeOffset: 0 },
    { id: 'script', label: '02 剧本档案 (Script)', timeOffset: 6 },
    { id: 'camera', label: '03 光学参数 (Camera Rig)', timeOffset: 12 },
    { id: 'bts', label: '04 幕后解构 (Atoms & BTS)', timeOffset: 18 },
    { id: 'final', label: '05 最终成片 (Final Frame)', timeOffset: 24 },
  ];

  // Auto timeline progress simulation
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setPlaybackSeconds((prev) => {
          const maxSec = activeScene.durationSeconds || 24;
          if (prev >= maxSec) {
            // Loop to next scene or restart
            return 0;
          }
          return prev + 0.5;
        });
      }, 500);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, activeScene]);

  // Sync stage with playback seconds
  useEffect(() => {
    const maxSec = activeScene.durationSeconds || 24;
    const stageDuration = maxSec / 5;
    const stageIdx = Math.min(4, Math.floor(playbackSeconds / stageDuration));
    setCurrentStage(stageSequence[stageIdx].id);
  }, [playbackSeconds, activeScene]);

  const handleNextScene = () => {
    playSpotlightClick();
    setCurrentSceneIdx((prev) => (prev + 1) % scenes.length);
    setPlaybackSeconds(0);
  };

  const handlePrevScene = () => {
    playSpotlightClick();
    setCurrentSceneIdx((prev) => (prev - 1 + scenes.length) % scenes.length);
    setPlaybackSeconds(0);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(activeScene.scriptPrompt);
    setCopiedPrompt(true);
    playSuccessChime();
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className={`w-full transition-all duration-500 ${isCinemaMode ? 'fixed inset-0 z-50 bg-black flex items-center justify-center p-0' : 'max-w-7xl mx-auto px-4 sm:px-8 py-8'}`}>
      {/* Non-Cinema Mode: Header Banner */}
      {!isCinemaMode && (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-indigo-400 uppercase mb-1">
              <Film className="w-3.5 h-3.5" />
              <span>PROMPT CINEMA · 电影分镜漫游厅</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              网页即电影 · 随手截图即大片
            </h2>
            <p className="text-xs sm:text-sm opacity-70 mt-1 max-w-xl font-sans leading-relaxed">
              摒弃传统卡片排布，以 16:9 电影画幅与分镜镜头推进，将 AI 提示词包装为好莱坞级摄制通告单。
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCinemaMode(true)}
              className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>纯净放映/录屏模式 (16:9)</span>
            </button>
            {onOpenCMS && (
              <button
                onClick={onOpenCMS}
                className="px-3.5 py-2 rounded-xl text-xs font-mono bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-1.5 transition-colors"
                title="打开全站运维管理后台"
              >
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                <span>运维后台</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* 16:9 CINEMA VIEWPORT (Flagship Canvas) */}
      <div 
        className={`relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden border shadow-2xl transition-all duration-500 bg-black flex flex-col justify-between ${
          isCinemaMode ? 'h-full max-h-screen rounded-none border-none' : 'border-white/10'
        }`}
        style={{
          boxShadow: `0 25px 60px -15px ${activeScene.accentColor}25`,
        }}
      >
        {/* Background Visual Layer with Subtle Cinema Motion */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src={activeScene.coverImage}
            alt={activeScene.title}
            className={`w-full h-full object-cover transition-all duration-1000 ${
              currentStage === 'atmosphere'
                ? 'scale-105 contrast-105'
                : currentStage === 'camera'
                ? 'scale-110 -translate-x-2'
                : currentStage === 'bts'
                ? 'scale-100 brightness-75 blur-[1px]'
                : 'scale-100'
            }`}
          />
          {/* Subtle Organic Film Grain & Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60 pointer-events-none" />
          <div className="absolute inset-0 film-grain pointer-events-none opacity-40" />
          <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none" />
        </div>

        {/* ARRI / RED Director Monitor Viewfinder Safe Frame & Optical HUD */}
        <div className="absolute inset-3 sm:inset-6 border border-white/[0.08] pointer-events-none z-10 flex flex-col justify-between select-none">
          {/* Top HUD */}
          <div className="flex justify-between items-center text-[9px] font-mono tracking-widest text-white/40 uppercase p-2 sm:p-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>REC 24.00 FPS</span>
              <span className="text-white/20">|</span>
              <span>4K DCI · 2.39:1</span>
            </div>
            <div className="flex items-center gap-2">
              <span>TC 00:{playbackSeconds < 10 ? '0' : ''}{Math.floor(playbackSeconds)}:18:04</span>
            </div>
          </div>

          {/* Center Subtle Crosshair */}
          <div className="self-center text-white/20 text-xs font-mono font-light select-none pointer-events-none">
            +
          </div>

          {/* Bottom HUD */}
          <div className="flex justify-between items-center text-[9px] font-mono tracking-widest text-white/40 uppercase p-2 sm:p-3">
            <div className="flex items-center gap-2">
              <span>ISO 800</span>
              <span className="text-white/20">|</span>
              <span>5600K</span>
              <span className="text-white/20">|</span>
              <span>{activeScene.cameraRig.lens}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>BAT 98%</span>
              <span className="text-white/20">|</span>
              <span>PRORES 4444XQ</span>
            </div>
          </div>
        </div>

        {/* TOP CINEMA HUD (Scene Timecode & Slate) */}
        <div className="relative z-20 px-6 py-4 flex items-center justify-between text-xs font-mono text-white/80 border-b border-white/10 backdrop-blur-md bg-black/40">
          <div className="flex items-center gap-3">
            <span 
              className="px-2.5 py-0.5 rounded text-[11px] font-black uppercase tracking-wider text-black font-mono shadow-sm"
              style={{ backgroundColor: activeScene.accentColor }}
            >
              {activeScene.sceneNumber}
            </span>
            <span className="text-white/60 hidden sm:inline">•</span>
            <span className="text-white/80 font-bold uppercase tracking-wide truncate max-w-[280px] sm:max-w-none">
              {activeScene.act}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-white/50 text-[11px] hidden md:inline font-mono">
              LOCATION: {activeScene.locationAndTime}
            </span>

            {/* Pure Frame / Inspector Toggle */}
            <button
              onClick={() => setIsPureFrame(!isPureFrame)}
              className={`px-3 py-1 rounded-full text-[10px] font-mono border transition-all ${
                isPureFrame 
                  ? 'bg-amber-400/20 border-amber-400 text-amber-300 font-bold' 
                  : 'bg-white/5 border-white/15 text-white/70 hover:text-white hover:bg-white/10'
              }`}
              title="切换显示或隐藏文字档案卡，欣赏纯净电影画面"
            >
              {isPureFrame ? '● 查看档案' : '○ 纯净原画'}
            </button>

            {isCinemaMode && (
              <button
                onClick={() => setIsCinemaMode(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="退出纯净模式 (ESC)"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* CENTER CINEMATIC CONTENT STAGE (Reacting to Current Shot Stage) */}
        {!isPureFrame && (
        <div className="relative z-20 flex-1 flex flex-col justify-center px-6 sm:px-16 py-6 max-w-4xl">
          {/* STAGE 1: ATMOSPHERE (Establishing Title & Big Typography) */}
          {currentStage === 'atmosphere' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-amber-300 uppercase">
                <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: activeScene.accentColor }} />
                <span>SCENE FOCUS · ESTABLISHING ATMOSPHERE</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal text-white tracking-tight leading-tight drop-shadow-2xl">
                {activeScene.title}
              </h1>
              <p className="text-sm sm:text-lg font-serif italic text-white/75 max-w-2xl leading-relaxed">
                {activeScene.titleEn}
              </p>
              <div className="pt-2 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-mono border border-white/10 text-white/80">
                  {activeScene.cameraRig.movement}
                </span>
              </div>
            </div>
          )}

          {/* STAGE 2: SCRIPT & PROMPT (Hollywood Call Sheet / Script Style) */}
          {currentStage === 'script' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-300">
                  <Film className="w-3.5 h-3.5" />
                  <span>PRODUCTION SCRIPT & PROMPT BREAKDOWN</span>
                </div>
                <button
                  onClick={handleCopyPrompt}
                  className="px-3 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs font-mono flex items-center gap-1.5 transition-all shadow-md"
                >
                  {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPrompt ? '已复制剧本' : '复制拍摄提示词'}</span>
                </button>
              </div>

              {/* Film Script Styled Container */}
              <div className="p-5 sm:p-6 rounded-2xl bg-black/75 border border-white/20 backdrop-blur-xl shadow-2xl font-mono text-xs sm:text-sm text-white/90 leading-relaxed overflow-y-auto max-h-[260px] scrollbar-thin">
                <pre className="whitespace-pre-wrap font-mono text-white/95 leading-relaxed tracking-wide">
                  {activeScene.scriptPrompt}
                </pre>
              </div>
            </div>
          )}

          {/* STAGE 3: CAMERA RIG & OPTICS */}
          {currentStage === 'camera' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
                <Camera className="w-3.5 h-3.5" />
                <span>OPTICAL RIG & CINEMATOGRAPHY SPECS</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-xl bg-black/70 border border-white/15 backdrop-blur-md">
                  <span className="text-[10px] font-mono text-white/50 uppercase">LENS & APERTURE</span>
                  <p className="text-sm font-bold text-white mt-1 font-mono">{activeScene.cameraRig.lens}</p>
                </div>
                <div className="p-4 rounded-xl bg-black/70 border border-white/15 backdrop-blur-md">
                  <span className="text-[10px] font-mono text-white/50 uppercase">SHUTTER & CADENCE</span>
                  <p className="text-sm font-bold text-white mt-1 font-mono">{activeScene.cameraRig.shutter}</p>
                </div>
                <div className="p-4 rounded-xl bg-black/70 border border-white/15 backdrop-blur-md">
                  <span className="text-[10px] font-mono text-white/50 uppercase">LIGHTING RATIO</span>
                  <p className="text-xs sm:text-sm font-semibold text-white/90 mt-1">{activeScene.cameraRig.lighting}</p>
                </div>
                <div className="p-4 rounded-xl bg-black/70 border border-white/15 backdrop-blur-md">
                  <span className="text-[10px] font-mono text-white/50 uppercase">MOOD & PSYCHOLOGY</span>
                  <p className="text-xs sm:text-sm font-semibold text-white/90 mt-1">{activeScene.cameraRig.mood}</p>
                </div>
              </div>
            </div>
          )}

          {/* STAGE 4: BTS & DESIGN ATOM DECONSTRUCTION */}
          {currentStage === 'bts' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center gap-2 text-xs font-mono text-pink-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>BEHIND THE SCENES · 视觉原子与原则解构</span>
              </div>

              <div className="p-5 rounded-2xl bg-black/80 border border-white/20 backdrop-blur-xl space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span 
                    onClick={() => onExploreAtom?.(activeScene.behindTheScenes.atomName)}
                    className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-600/30 text-indigo-300 border border-indigo-400/40 cursor-pointer hover:bg-indigo-600 hover:text-white transition-colors"
                  >
                    ⚛️ 原子: {activeScene.behindTheScenes.atomName}
                  </span>
                  <span 
                    onClick={() => onExplorePrinciple?.(activeScene.behindTheScenes.principleName.split(' ')[0])}
                    className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-600/30 text-emerald-300 border border-emerald-400/40 cursor-pointer hover:bg-emerald-600 hover:text-white transition-colors"
                  >
                    ⚖️ 原则: {activeScene.behindTheScenes.principleName}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-pink-600/20 text-pink-300 border border-pink-400/30">
                    🏛️ 风格: {activeScene.behindTheScenes.styleName}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-sans pt-1">
                  {activeScene.behindTheScenes.whyItWorks}
                </p>
              </div>
            </div>
          )}

          {/* STAGE 5: FINAL FRAME & SPECTRUM */}
          {currentStage === 'final' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-300">
                <Check className="w-3.5 h-3.5" />
                <span>FINAL CINEMATIC RENDER COMPLETED</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {activeScene.title}
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-white/60">COLOR SPECTRUM:</span>
                <div className="flex items-center gap-1.5">
                  {activeScene.colorPalette.map((c, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 rounded-full border border-white/20 shadow-md"
                      style={{ backgroundColor: c }}
                      title={c}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        )}

        {/* BOTTOM FILM TIMELINE CONTROLLER (The Scrubber) */}
        <div className="relative z-20 px-6 py-3.5 border-t border-white/10 backdrop-blur-xl bg-black/60 flex flex-col gap-2">
          {/* Top Controls Row */}
          <div className="flex items-center justify-between text-xs font-mono text-white/80">
            {/* Left: Playback controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevScene}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="上一分镜"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center gap-1.5 shadow"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
              </button>
              <button
                onClick={handleNextScene}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="下一分镜"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <span className="text-indigo-400 font-bold ml-2">
                00:{String(Math.floor(playbackSeconds)).padStart(2, '0')} / 00:{String(activeScene.durationSeconds || 24).padStart(2, '0')}
              </span>
            </div>

            {/* Right: Stage pills */}
            <div className="hidden sm:flex items-center gap-1">
              {stageSequence.map((stg) => (
                <button
                  key={stg.id}
                  onClick={() => {
                    setCurrentStage(stg.id);
                    setPlaybackSeconds(stg.timeOffset);
                  }}
                  className={`px-2.5 py-1 rounded text-[10px] font-mono transition-all ${
                    currentStage === stg.id
                      ? 'bg-white text-black font-bold shadow'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {stg.id.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Scrubber Progress Bar */}
          <div 
            className="relative w-full h-2 rounded-full bg-white/10 cursor-pointer overflow-hidden group"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
              setPlaybackSeconds(pct * (activeScene.durationSeconds || 24));
            }}
          >
            <div
              className="h-full rounded-full transition-all duration-100"
              style={{
                width: `${(playbackSeconds / (activeScene.durationSeconds || 24)) * 100}%`,
                backgroundColor: activeScene.accentColor || '#6366f1',
              }}
            />
          </div>
        </div>
      </div>

      {/* Quick Scene Switcher Strip Below Player */}
      {!isCinemaMode && (
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs font-mono opacity-60 mb-2">
            <span>SCENE ROSTER · 分镜序列 ({scenes.length} SHOTS)</span>
            <span>点击立即切换分镜</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {scenes.map((sc, idx) => {
              const isSelected = idx === currentSceneIdx;
              return (
                <div
                  key={sc.id}
                  onClick={() => {
                    setCurrentSceneIdx(idx);
                    setPlaybackSeconds(0);
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                    isSelected
                      ? 'bg-indigo-600/20 border-indigo-500 shadow-md'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <img
                    src={sc.coverImage}
                    alt={sc.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="overflow-hidden">
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/10 font-bold" style={{ color: sc.accentColor }}>
                      {sc.sceneNumber}
                    </span>
                    <h4 className="text-xs font-bold truncate mt-0.5">{sc.title}</h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
