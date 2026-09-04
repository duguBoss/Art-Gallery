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
    icon: string;
  }[] = [
    {
      level: '01',
      title: '视觉材料',
      titleEn: 'Visual Atoms',
      tab: 'atoms',
      desc: '色彩对撞 · 负空间 · 极端尺度 · 丁达尔光',
      icon: '⚛️',
    },
    {
      level: '02',
      title: '设计原则',
      titleEn: 'Principles (Bridge)',
      tab: 'principles',
      desc: '对比 · 平衡 · 层级 · 节奏 · 比例 · 动势',
      icon: '⚖️',
    },
    {
      level: '03',
      title: '风格规则',
      titleEn: 'Style Equations',
      tab: 'styles',
      desc: '瑞士国际 · 粗野主义 · 赛博朋克 · 杂志编辑',
      icon: '🏛️',
    },
    {
      level: '04',
      title: '四大媒介',
      titleEn: 'The 4 Mediums',
      tab: 'mediums',
      desc: 'Image 平面 · Interface 界面 · Space 3D · Motion 影视',
      icon: '🖼️',
    },
    {
      level: '05',
      title: '动态与镜头',
      titleEn: 'Motion & Camera',
      tab: 'motion',
      desc: '运镜调度 · 遮罩转场 · 秒级时序分镜标注',
      icon: '🎬',
    },
    {
      level: '06',
      title: '作品图鉴',
      titleEn: 'Works & Deconstruct',
      tab: 'atlas',
      desc: '多维交叉 · 构图网格 · 一个作品=一个入口',
      icon: '🌐',
    },
    {
      level: '07',
      title: '重构工坊',
      titleEn: 'Generative Studio',
      tab: 'shapes-lab',
      desc: 'Book of Shapes 算法几何海报生成',
      icon: '✨',
    },
  ];

  return (
    <section className="relative overflow-hidden border-b py-8 px-4 sm:px-8 transition-colors" style={{ borderColor: 'var(--border-subtle)' }}>
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Editorial Subtitle & Main Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-indigo-400 uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <span>VISUAL DESIGN ATLAS · 视觉设计全维知识体系</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              看见 · 理解 · 拆解 · 重构
            </h1>
            <p className="mt-2 text-xs sm:text-sm opacity-75 max-w-2xl font-sans leading-relaxed">
              从底层基础原子出发，经由十大设计原则组织，演化为风格方程，跨越四大媒介与七维动态时序，形成互联互通的视觉知识图谱。
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium border bg-white/5" style={{ borderColor: 'var(--border-subtle)' }}>
              一个作品 = 一个入口
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium border bg-white/5" style={{ borderColor: 'var(--border-subtle)' }}>
              媒介 ≠ 风格
            </span>
          </div>
        </div>

        {/* The 7-Step Visual Journey Path Roadmap */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 pt-2">
          {steps.map((step) => {
            const isActive = currentTab === step.tab;
            return (
              <div
                key={step.level}
                onClick={() => onSelectTab(step.tab)}
                className={`group relative p-3 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden ${
                  isActive
                    ? 'bg-indigo-600/15 border-indigo-500/80 shadow-lg shadow-indigo-500/10 translate-y-[-2px]'
                    : 'bg-white/5 border-white/10 hover:border-indigo-400/40 hover:bg-white/10'
                }`}
              >
                {/* Step Top Bar */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/10 opacity-75">
                    L{step.level}
                  </span>
                  <span className="text-base">{step.icon}</span>
                </div>

                {/* Title & Desc */}
                <div>
                  <h3 className={`text-xs font-bold tracking-tight transition-colors ${isActive ? 'text-indigo-400' : 'group-hover:text-indigo-300'}`}>
                    {step.title}
                  </h3>
                  <p className="text-[10px] font-mono opacity-50 mb-1">{step.titleEn}</p>
                  <p className="text-[11px] opacity-75 line-clamp-2 leading-tight font-sans">{step.desc}</p>
                </div>

                {/* Active Indicator Line */}
                <div 
                  className={`mt-3 h-0.5 w-full rounded-full transition-all ${
                    isActive ? 'bg-indigo-500' : 'bg-transparent group-hover:bg-white/20'
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
