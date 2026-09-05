import React from 'react';
import type { MainViewType } from './Navbar';

interface VisualJourneyHeroProps {
  currentTab: MainViewType;
  onSelectTab: (tab: MainViewType) => void;
}

export const VisualJourneyHero: React.FC<VisualJourneyHeroProps> = ({
  currentTab,
  onSelectTab,
}) => {
  const steps: {
    level: string;
    title: string;
    titleEn: string;
    tab: MainViewType;
    desc: string;
  }[] = [
    {
      level: '00',
      title: '电影分镜',
      titleEn: 'Prompt Cinema',
      tab: 'cinema',
      desc: '16:9 电影画幅 · 制作通告单 · 运镜分层解析',
    },
    {
      level: '01',
      title: '视觉材料',
      titleEn: 'Visual Atoms',
      tab: 'atoms',
      desc: '色彩对撞 · 负空间 · 极端尺度 · 丁达尔光',
    },
    {
      level: '02',
      title: '设计原则',
      titleEn: 'Principles (Bridge)',
      tab: 'principles',
      desc: '对比 · 平衡 · 层级 · 节奏 · 比例 · 动势',
    },
    {
      level: '03',
      title: '风格规则',
      titleEn: 'Style Equations',
      tab: 'styles',
      desc: '瑞士国际 · 粗野主义 · 赛博朋克 · 杂志编辑',
    },
    {
      level: '04',
      title: '四大媒介',
      titleEn: 'The 4 Mediums',
      tab: 'mediums',
      desc: 'Image 平面 · Interface 界面 · Space 3D · Motion 影视',
    },
    {
      level: '05',
      title: '动态与镜头',
      titleEn: 'Motion & Camera',
      tab: 'motion',
      desc: '运镜调度 · 遮罩转场 · 秒级时序分镜标注',
    },
    {
      level: '06',
      title: '作品图鉴',
      titleEn: 'Works & Deconstruct',
      tab: 'atlas',
      desc: '多维交叉 · 构图网格 · 一个作品=一个入口',
    },
    {
      level: '07',
      title: '重构工坊',
      titleEn: 'Generative Studio',
      tab: 'shapes-lab',
      desc: 'Book of Shapes 算法几何海报生成',
    },
  ];

  return (
    <section className="relative overflow-hidden border-b py-10 px-4 sm:px-8 transition-colors" style={{ borderColor: 'var(--border-subtle)' }}>
      {/* Background Subtle Museum Vignette */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-amber-500/[0.03] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Editorial Subtitle & Main Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2.5 text-[10px] font-mono tracking-[0.25em] text-amber-300/80 uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>THE ARCHIVE // VISUAL DESIGN & CINEMA LANGUAGE</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-white/95 leading-tight">
              看见 · 理解 · 拆解 · 重构
            </h1>
            <p className="mt-2.5 text-xs sm:text-sm text-white/60 max-w-2xl font-sans font-light leading-relaxed">
              <span className="font-serif italic text-white/80 mr-1.5">“Every Frame Tells a Story, Every Pixel Follows a Law.”</span>
              从底层基础材料出发，经由十大设计原则组织，演化为风格方程，跨越四大媒介与时间动态，形成互联互通的视觉知识图谱。
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase border border-white/10 bg-white/[0.02] text-white/60">
              ONE WORK = ONE GATEWAY
            </span>
            <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase border border-white/10 bg-white/[0.02] text-white/60">
              MEDIUM ≠ STYLE
            </span>
          </div>
        </div>

        {/* The 8-Step Visual Journey Path Roadmap (Refined Minimalist Editorial Cards) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 pt-2">
          {steps.map((step) => {
            const isActive = currentTab === step.tab;
            return (
              <div
                key={step.level}
                onClick={() => onSelectTab(step.tab)}
                className={`group relative p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden ${
                  isActive
                    ? 'bg-white/[0.08] border-amber-400/60 shadow-lg shadow-black/40 translate-y-[-2px]'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.05]'
                }`}
              >
                {/* Step Top Bar: Sleek Numeral */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[11px] font-mono font-bold tracking-widest ${isActive ? 'text-amber-300' : 'text-white/40 group-hover:text-white/70'}`}>
                    {step.level}
                  </span>
                  <div className={`w-1.5 h-1.5 rounded-full transition-all ${isActive ? 'bg-amber-400 scale-110' : 'bg-white/10 group-hover:bg-white/30'}`} />
                </div>

                {/* Title & Desc */}
                <div>
                  <h3 className={`text-xs font-semibold tracking-tight transition-colors ${isActive ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
                    {step.title}
                  </h3>
                  <p className="text-[9px] font-mono text-white/40 tracking-wider uppercase mb-1.5">{step.titleEn}</p>
                  <p className="text-[11px] text-white/50 group-hover:text-white/70 line-clamp-2 leading-relaxed font-sans font-light">{step.desc}</p>
                </div>

                {/* Active Indicator Line */}
                <div 
                  className={`mt-3 h-0.5 w-full rounded-full transition-all ${
                    isActive ? 'bg-amber-400/90' : 'bg-transparent group-hover:bg-white/10'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
