import React, { useState } from 'react';
import type { DesignPrinciple } from '../types/atlas';
import { DESIGN_PRINCIPLES } from '../data/visualAtlasData';

interface DesignPrinciplesViewProps {
  onExplorePrincipleInWorks: (principleName: string) => void;
}

export const DesignPrinciplesView: React.FC<DesignPrinciplesViewProps> = ({
  onExplorePrincipleInWorks,
}) => {
  const [selectedPrinciple, setSelectedPrinciple] = useState<DesignPrinciple>(DESIGN_PRINCIPLES[0]);
  const [comparisonMode, setComparisonMode] = useState<'after' | 'before'>('after');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
      {/* Intro Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
            <span>THE BRIDGE · DESIGN PRINCIPLES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">十大设计原则实验室</h2>
          <p className="text-xs sm:text-sm opacity-70 mt-1 max-w-2xl">
            设计原则是连接底层“材料（原子）”与上层“风格”的桥梁。它回答了核心问题：<span className="text-indigo-400 font-semibold">“设计师是如何组织画面的？”</span>
          </p>
        </div>
      </div>

      {/* Main Principle Interactive Spotlight Card */}
      <div 
        className="rounded-3xl border overflow-hidden mb-12 shadow-2xl transition-all"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left: Visual Stage with Before/After Toggle */}
          <div className="lg:col-span-6 relative min-h-[320px] lg:min-h-[440px] overflow-hidden bg-black/80 flex flex-col justify-between p-6">
            {/* Background Visual */}
            <img
              src={selectedPrinciple.sampleVisualUrl}
              alt={selectedPrinciple.name}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                comparisonMode === 'before' ? 'grayscale contrast-75 brightness-75 blur-[1px]' : 'scale-105'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Top Bar: Before / After Mode Switch */}
            <div className="relative z-10 flex items-center justify-between">
              <span
                className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest text-white shadow-sm"
                style={{ backgroundColor: selectedPrinciple.accentColor }}
              >
                PRINCIPLE FOCUS
              </span>

              {/* Before/After Toggle Pill */}
              <div className="flex items-center p-1 rounded-full bg-black/60 border border-white/20 backdrop-blur-md text-xs">
                <button
                  onClick={() => setComparisonMode('before')}
                  className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                    comparisonMode === 'before'
                      ? 'bg-red-500/80 text-white font-bold'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  平庸反例 (Before)
                </button>
                <button
                  onClick={() => setComparisonMode('after')}
                  className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                    comparisonMode === 'after'
                      ? 'bg-emerald-500/80 text-white font-bold'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  升华质感 (After)
                </button>
              </div>
            </div>

            {/* Bottom Title & Scenario Description */}
            <div className="relative z-10">
              <h3 className="text-3xl font-black text-white tracking-tight flex items-baseline gap-3">
                <span>{selectedPrinciple.name}</span>
                <span className="text-base font-mono text-white/60">{selectedPrinciple.nameEn}</span>
              </h3>

              {/* Dynamic Before / After Callout Box */}
              <div 
                className={`mt-3 p-3.5 rounded-xl border backdrop-blur-md transition-all text-xs leading-relaxed ${
                  comparisonMode === 'before'
                    ? 'bg-red-950/40 border-red-500/30 text-red-200'
                    : 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
                }`}
              >
                <div className="font-mono text-[10px] font-bold uppercase mb-1">
                  {comparisonMode === 'before' ? '⚠️ 缺乏此原则时的常见平庸痛点' : '✨ 运用此原则后的设计升华'}
                </div>
                <p>
                  {comparisonMode === 'before'
                    ? selectedPrinciple.beforeAfterScenario.before
                    : selectedPrinciple.beforeAfterScenario.after}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Principle Mechanics & Core Question */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Core Question */}
              <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <div className="text-[10px] font-mono text-indigo-400 font-bold uppercase mb-1">
                  核心组织命题 (Core Organization Question)
                </div>
                <p className="text-sm font-semibold text-indigo-200 leading-snug">
                  “{selectedPrinciple.coreQuestion}”
                </p>
              </div>

              {/* Definition */}
              <div>
                <h4 className="text-xs font-mono uppercase opacity-50 mb-1">设计学定义与本质</h4>
                <p className="text-xs sm:text-sm opacity-85 leading-relaxed font-sans">{selectedPrinciple.definition}</p>
              </div>

              {/* Practical Mechanics Checklist */}
              <div>
                <h4 className="text-xs font-mono uppercase opacity-50 mb-2">落地技法清单 (Execution Mechanics)</h4>
                <div className="space-y-2">
                  {selectedPrinciple.mechanics.map((m, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/5 border border-white/5 text-xs">
                      <span className="w-4 h-4 rounded-full bg-indigo-600/30 text-indigo-400 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="opacity-90">{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={() => onExplorePrincipleInWorks(selectedPrinciple.name)}
              className="w-full py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
            >
              <span>查看在各媒介作品中如何运用【{selectedPrinciple.name}】</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid of All 10 Design Principles */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold tracking-tight">十大原则全景矩阵 (All 10 Principles)</h3>
        <span className="text-xs font-mono opacity-50">点击切换上方深度实验室</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {DESIGN_PRINCIPLES.map((pr, idx) => {
          const isSelected = selectedPrinciple.id === pr.id;
          return (
            <div
              key={pr.id}
              onClick={() => setSelectedPrinciple(pr)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-500/15 shadow-md shadow-indigo-500/10 translate-y-[-2px]'
                  : 'bg-white/5 border-white/10 hover:border-white/25 hover:bg-white/10'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 opacity-70">
                    #{String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pr.accentColor }} />
                </div>
                <h4 className="font-bold text-sm tracking-tight">{pr.name}</h4>
                <p className="text-[11px] font-mono opacity-50 mb-2">{pr.nameEn}</p>
                <p className="text-[11px] opacity-75 line-clamp-2 leading-relaxed">{pr.definition}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
                <span className="text-indigo-400 font-semibold">深入拆解</span>
                <span className="opacity-40">→</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
