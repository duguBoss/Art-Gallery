import React, { useState, useEffect } from 'react';
import type { MotionLanguageItem, MotionCategory } from '../types/atlas';
import { MOTION_ITEMS } from '../data/visualAtlasData';

export const MotionCameraLab: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<MotionLanguageItem>(MOTION_ITEMS[0]);
  const [selectedCat, setSelectedCat] = useState<MotionCategory | 'all'>('all');
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackProgress, setPlaybackProgress] = useState(0); // 0 to 100

  const categories: { id: MotionCategory | 'all'; label: string; icon: string }[] = [
    { id: 'all', label: '全部动态 (All Motion)', icon: '⚡' },
    { id: 'camera', label: '镜头语言 (Camera)', icon: '🎥' },
    { id: 'transition', label: '转场语言 (Transition)', icon: '🔄' },
    { id: 'motion', label: '基础运动 (Motion)', icon: '💨' },
    { id: 'spatial', label: '空间与视差 (Spatial)', icon: '🌐' },
    { id: 'effects', label: '特效与噪点 (Effects)', icon: '✨' },
  ];

  const filteredItems = MOTION_ITEMS.filter((item) => {
    return selectedCat === 'all' || item.category === selectedCat;
  });

  // Timeline playback simulation loop
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlaybackProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 1.25;
        });
      }, 80);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  // Determine which keyframe event is currently active
  const currentEventIdx = Math.min(
    Math.floor((playbackProgress / 100) * selectedItem.timelineEvents.length),
    selectedItem.timelineEvents.length - 1
  );
  const currentActiveEvent = selectedItem.timelineEvents[currentEventIdx];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
      {/* Intro Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
            <span>LEVEL 03 · MOTION & CAMERA LAB</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">动态与镜头语言实验室</h2>
          <p className="text-xs sm:text-sm opacity-70 mt-1 max-w-2xl">
            视频不应按类型粗糙分类，而应拆解为镜头推拉摇移、转场遮罩、物理缓动与时序分镜。在此直观体验动态分镜标注体系。
          </p>
        </div>

        {/* Timeline Control Status */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2 shadow"
          >
            <span>{isPlaying ? '⏸ 暂停时序' : '▶ 播放时序'}</span>
          </button>
          <button
            onClick={() => setPlaybackProgress(0)}
            className="px-3 py-2 rounded-xl text-xs font-mono bg-white/5 hover:bg-white/10 border border-white/10"
          >
            重置 00:00
          </button>
        </div>
      </div>

      {/* Interactive Motion Cinema Stage & Timeline Inspector */}
      <div 
        className="rounded-3xl border overflow-hidden shadow-2xl mb-12"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left: Interactive Animated Visual Stage */}
          <div className="lg:col-span-7 bg-black/80 relative min-h-[360px] flex items-center justify-center p-8 overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
            {/* Ambient Background Grid */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* Simulated Animated Object reacting to playbackProgress and item type */}
            <div className="relative z-10 w-full max-w-md flex flex-col items-center justify-center">
              {/* Dynamic Camera Simulation Frame */}
              <div 
                className="w-64 h-64 sm:w-72 sm:h-72 rounded-2xl border-2 border-indigo-400/80 bg-gradient-to-br from-indigo-950/60 to-purple-950/40 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden transition-all duration-300"
                style={{
                  transform:
                    selectedItem.demoAnimationType === 'push-in'
                      ? `scale(${1 + (playbackProgress / 100) * 0.45}) translateZ(0)`
                      : selectedItem.demoAnimationType === 'orbit'
                      ? `rotateY(${(playbackProgress / 100) * 360}deg)`
                      : selectedItem.demoAnimationType === 'tracking-shot'
                      ? `translateX(${((playbackProgress - 50) / 50) * 40}px)`
                      : selectedItem.demoAnimationType === 'elastic-bounce'
                      ? `scale(${0.7 + Math.sin((playbackProgress / 100) * Math.PI) * 0.4})`
                      : 'none',
                  filter:
                    selectedItem.demoAnimationType === 'glitch' && (playbackProgress > 40 && playbackProgress < 60)
                      ? 'contrast(200%) hue-rotate(90deg) invert(20%)'
                      : 'none',
                }}
              >
                {/* HUD Camera Crosshairs */}
                <div className="flex justify-between items-start text-[10px] font-mono text-indigo-300 opacity-80">
                  <span>[REC] 4K RAW 60FPS</span>
                  <span>F/1.8 · 35mm</span>
                </div>

                <div className="text-center">
                  <div className="text-xs font-mono text-indigo-400 font-bold mb-1">
                    {selectedItem.category.toUpperCase()}
                  </div>
                  <h4 className="text-xl font-black text-white tracking-tight">{selectedItem.name}</h4>
                  <p className="text-xs font-mono opacity-60 mt-0.5">{selectedItem.nameEn}</p>
                </div>

                <div className="flex justify-between items-end text-[10px] font-mono text-white/60">
                  <span>CURVE: {selectedItem.rhythmCurve?.split(' ')[0] || 'Ease-InOut'}</span>
                  <span className="text-indigo-400 font-bold">{Math.round(playbackProgress)}%</span>
                </div>
              </div>

              {/* Real-time Subtitle of Active Keyframe Event */}
              <div className="mt-4 px-4 py-2 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-center max-w-sm">
                <span className="text-indigo-400 font-bold mr-2">[{currentActiveEvent.time}]</span>
                <span className="text-white font-semibold mr-2">{currentActiveEvent.action}:</span>
                <span className="opacity-75">{currentActiveEvent.detail}</span>
              </div>
            </div>
          </div>

          {/* Right: Motion Timeline Inspector */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase">
                  TIMELINE DECONSTRUCTION
                </span>
                <h3 className="text-xl font-black tracking-tight mt-2">{selectedItem.name}</h3>
                <p className="text-xs opacity-75 mt-1 leading-relaxed">{selectedItem.description}</p>
              </div>

              {/* Aesthetic & Narrative Purpose */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                <div className="text-[10px] font-mono text-amber-400 font-bold uppercase mb-1">
                  镜头美学与叙事目的 (Aesthetic Purpose)
                </div>
                <p className="text-xs opacity-85 leading-relaxed font-sans">{selectedItem.aestheticPurpose}</p>
              </div>

              {/* Detailed Keyframe Timeline Events List */}
              <div className="space-y-2">
                <div className="text-xs font-mono opacity-50 uppercase">时序动作切片 (Keyframe Beats)</div>
                <div className="space-y-2">
                  {selectedItem.timelineEvents.map((evt, idx) => {
                    const isCurrent = currentEventIdx === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          setPlaybackProgress((idx / selectedItem.timelineEvents.length) * 100);
                        }}
                        className={`p-2.5 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between ${
                          isCurrent
                            ? 'bg-indigo-600 text-white border-indigo-400 shadow-sm'
                            : 'bg-white/5 border-white/5 opacity-70 hover:opacity-100 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-[11px] font-bold px-1.5 py-0.5 rounded bg-black/40">
                            {evt.time}
                          </span>
                          <span className="font-bold">{evt.action}</span>
                        </div>
                        <span className="text-[11px] opacity-85 truncate max-w-[180px]">{evt.detail}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Timeline Progress Scrub Bar */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex justify-between text-[11px] font-mono opacity-60 mb-2">
                <span>00:00 START</span>
                <span className="text-indigo-400 font-bold">TIMELINE PROGRESS</span>
                <span>00:08 RESOLUTION</span>
              </div>
              <div 
                className="w-full h-2 rounded-full bg-white/10 relative cursor-pointer overflow-hidden"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                  setPlaybackProgress(pct);
                }}
              >
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all duration-75"
                  style={{ width: `${playbackProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCat(c.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
              selectedCat === c.id
                ? 'bg-indigo-600 text-white shadow'
                : 'bg-white/5 hover:bg-white/10 border border-white/10 opacity-75'
            }`}
          >
            <span>{c.icon}</span>
            <span>{c.label}</span>
          </button>
        ))}
      </div>

      {/* Motion Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => {
          const isSelected = selectedItem.id === item.id;
          return (
            <div
              key={item.id}
              onClick={() => {
                setSelectedItem(item);
                setPlaybackProgress(0);
              }}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/10'
                  : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 opacity-70 uppercase font-bold text-indigo-300">
                    {item.category}
                  </span>
                  {isSelected && <span className="text-xs font-mono text-indigo-400">● 正在演示</span>}
                </div>
                <h4 className="font-bold text-base tracking-tight">{item.name}</h4>
                <p className="text-xs font-mono opacity-50 mb-2">{item.nameEn}</p>
                <p className="text-xs opacity-75 line-clamp-2 leading-relaxed">{item.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono opacity-60">
                <span>分镜数: {item.timelineEvents.length} KEYFRAMES</span>
                <span className="text-indigo-400">加载至主控台 →</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
