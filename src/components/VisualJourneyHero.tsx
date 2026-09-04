import React from 'react';

export type AtlasNavTab = 'journey' | 'atoms' | 'styles' | 'motion' | 'atlas' | 'shapes-lab';

interface VisualJourneyHeroProps {
  currentTab: AtlasNavTab;
  onSelectTab: (tab: AtlasNavTab) => void;
}

export const VisualJourneyHero: React.FC<VisualJourneyHeroProps> = ({
  currentTab,
  onSelectTab,
}) => {
  const steps = [
    {
      level: '01',
      title: '视觉原子',
      titleEn: 'Visual Atoms',
      tab: 'atoms' as AtlasNavTab,
      desc: '色彩对撞 · 负空间 · 尺度反差 · 丁达尔光',
      icon: '⚛️',
    },
    {
      level: '02',
      title: '风格规则',
      titleEn: 'Style Equations',
      tab: 'styles' as AtlasNavTab,
      desc: '瑞士国际 · 粗野主义 · 赛博朋克 · 杂志编辑',
      icon: '🏛️',
    },
    {
      level: '03',
      title: '动态与镜头',
      titleEn: 'Motion & Camera',
      tab: 'motion' as AtlasNavTab,
      desc: '缓推运镜 · 遮罩转场 · 时序分镜标注',
      icon: '🎬',
    },
    {
      level: '04',
      title: '作品知识网络',
      titleEn: 'Works & Deconstruct',
      tab: 'atlas' as AtlasNavTab,
      desc: '多维交叉 · 构图骨架 · 一个作品=一个入口',
      icon: '🌐',
    },
    {
      level: '05',
      title: '重构生成工坊',
      titleEn: 'Rebuild & Studio',
      tab: 'shapes-lab' as AtlasNavTab,
      desc: 'Book of Shapes · 算法海报生成与导出',
      icon: '✨',
    },
  ];

  return (
    <section className="relative overflow-hidden border-b py-10 px-4 sm:px-8 transition-colors" style={{ borderColor: 'var(--border-subtle)' }}>
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Editorial Subtitle & Main Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-indigo-400 uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <span>VISUAL DESIGN ATLAS · 视觉设计图鉴</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              看见 · 理解 · 拆解 · 重构
            </h1>
            <p className="mt-2 text-sm sm:text-base opacity-70 max-w-2xl font-sans leading-relaxed">
              摒弃传统分类堆砌，从底层材料到风格规则方程、动态镜头语言，构筑可交互探索的视觉知识网络。
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono opacity-50">Core Philosophy:</span>
            <span className="px-3 py-1.5 rounded-full text-xs font-mono font-medium border bg-white/5" style={{ borderColor: 'var(--border-subtle)' }}>
              一个作品 = 一个入口
            </span>
          </div>
        </div>

        {/* The 5-Step Visual Journey Path Roadmap */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          {steps.map((step) => {
            const isActive = currentTab === step.tab;
            return (
              <div
                key={step.level}
                onClick={() => onSelectTab(step.tab)}
                className={`group relative p-4 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden ${
                  isActive
                    ? 'bg-indigo-600/15 border-indigo-500/80 shadow-lg shadow-indigo-500/10 translate-y-[-2px]'
                    : 'bg-white/5 border-white/10 hover:border-indigo-400/40 hover:bg-white/10'
                }`}
              >
                {/* Step Top Bar */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/10 opacity-75">
                    LEVEL {step.level}
                  </span>
                  <span className="text-lg">{step.icon}</span>
                </div>

                {/* Title & Desc */}
                <div>
                  <h3 className={`text-sm font-bold tracking-tight transition-colors ${isActive ? 'text-indigo-400' : 'group-hover:text-indigo-300'}`}>
                    {step.title}
                  </h3>
                  <p className="text-[11px] font-mono opacity-50 mb-2">{step.titleEn}</p>
                  <p className="text-xs opacity-75 line-clamp-2 leading-relaxed font-sans">{step.desc}</p>
                </div>

                {/* Active Indicator Line */}
                <div 
                  className={`mt-4 h-0.5 w-full rounded-full transition-all ${
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
