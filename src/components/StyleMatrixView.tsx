import React, { useState } from 'react';
import type { StyleRuleEquation } from '../types/atlas';
import { STYLE_RULES } from '../data/visualAtlasData';

interface StyleMatrixViewProps {
  onExploreStyleInWorks: (styleId: string) => void;
}

export const StyleMatrixView: React.FC<StyleMatrixViewProps> = ({
  onExploreStyleInWorks,
}) => {
  const [selectedStyle, setSelectedStyle] = useState<StyleRuleEquation>(STYLE_RULES[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
      {/* Intro Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
            <span>LEVEL 02 · STYLE RULES EQUATIONS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">风格规则图谱与方程</h2>
          <p className="text-xs sm:text-sm opacity-70 mt-1 max-w-2xl">
            风格不是一个随意的标签，而是一组严密的视觉规则方程。当不同的视觉原子依照特定法则结合，就孕育出独一无二的设计语言。
          </p>
        </div>
      </div>

      {/* Featured Style Highlight Banner */}
      <div 
        className="rounded-3xl border overflow-hidden mb-12 shadow-2xl transition-all"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Visual Banner */}
          <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-[420px] overflow-hidden bg-black/60">
            <img
              src={selectedStyle.bannerImage}
              alt={selectedStyle.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-white/20 text-white backdrop-blur-sm border border-white/20 uppercase tracking-widest">
                ACTIVE EQUATION
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-2 tracking-tight">
                {selectedStyle.name}
              </h3>
              <p className="text-xs font-mono text-white/70 mt-0.5">{selectedStyle.nameEn}</p>
            </div>
          </div>

          {/* Equation Breakdown Details */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Equation Box */}
              <div>
                <div className="text-[11px] font-mono text-indigo-400 font-bold uppercase mb-2">
                  风格规则方程 (Style Rule Equation)
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {selectedStyle.equation.map((part, idx) => (
                    <React.Fragment key={idx}>
                      <span className="px-3 py-1.5 rounded-xl bg-white/10 text-xs font-mono font-medium border border-white/10">
                        {part}
                      </span>
                      {idx < selectedStyle.equation.length - 1 && (
                        <span className="text-indigo-400 font-black text-sm">+</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Aesthetic Mood & Philosophy */}
              <div>
                <h4 className="text-xs font-mono uppercase opacity-50 mb-1">美学意境与情绪 (Mood)</h4>
                <p className="text-sm font-medium leading-relaxed">{selectedStyle.aestheticMood}</p>
              </div>

              {/* Historical Context */}
              <div>
                <h4 className="text-xs font-mono uppercase opacity-50 mb-1">历史渊源与哲学 (Context)</h4>
                <p className="text-xs opacity-80 leading-relaxed font-sans">{selectedStyle.historicalContext}</p>
              </div>

              {/* Color Palette & Recommended Fonts */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/10">
                <div>
                  <h5 className="text-[11px] font-mono opacity-60 mb-2">经典基准色系</h5>
                  <div className="flex items-center gap-2">
                    {selectedStyle.colorPalette.map((col, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-lg border border-white/20 shadow"
                        style={{ backgroundColor: col }}
                        title={col}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-[11px] font-mono opacity-60 mb-1.5">标杆字体推荐</h5>
                  <div className="text-xs font-mono opacity-80">
                    {selectedStyle.recommendedTypefaces.join(' / ')}
                  </div>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={() => onExploreStyleInWorks(selectedStyle.id)}
              className="w-full py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
            >
              <span>查看此风格在各媒介中的完整作品案例</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid of All Styles in System */}
      <h3 className="text-lg font-bold mb-4 tracking-tight">图谱矩阵全览 (Explore All Equations)</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STYLE_RULES.map((style) => {
          const isSelected = selectedStyle.id === style.id;
          return (
            <div
              key={style.id}
              onClick={() => setSelectedStyle(style)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-500/10 shadow-md'
                  : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 opacity-70 uppercase">
                    RULE SET
                  </span>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />}
                </div>
                <h4 className="font-bold text-sm">{style.name}</h4>
                <p className="text-[11px] font-mono opacity-50 mb-3">{style.nameEn}</p>
                <div className="space-y-1">
                  {style.equation.slice(0, 3).map((eq, i) => (
                    <div key={i} className="text-[11px] font-mono opacity-75 truncate">
                      • {eq}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-indigo-400 font-mono text-[11px]">切换详情</span>
                <div className="flex -space-x-1">
                  {style.colorPalette.slice(0, 3).map((c, i) => (
                    <div key={i} className="w-3.5 h-3.5 rounded-full border border-black/40" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
