import React, { useState } from 'react';
import type { MediumCategoryInfo, MediumType } from '../types/atlas';
import { MEDIUM_CATEGORIES } from '../data/visualAtlasData';

interface MediumMatrixViewProps {
  onExploreMediumInWorks: (medium: MediumType) => void;
}

export const MediumMatrixView: React.FC<MediumMatrixViewProps> = ({
  onExploreMediumInWorks,
}) => {
  const [selectedMedium, setSelectedMedium] = useState<MediumCategoryInfo>(MEDIUM_CATEGORIES[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
      {/* Intro Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
            <span>DIMENSION 04 · THE 4 MEDIUMS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">四大表现媒介矩阵</h2>
          <p className="text-xs sm:text-sm opacity-70 mt-1 max-w-2xl">
            <span className="text-indigo-400 font-semibold">“媒介 ≠ 风格”。</span>这是理解视觉体系的关键。同一种瑞士国际或赛博朋克风格，在海报、Web、3D 与电影中有截然不同的媒介物理法则与设计诉求。
          </p>
        </div>
      </div>

      {/* Featured Medium Hero Card */}
      <div 
        className="rounded-3xl border overflow-hidden mb-12 shadow-2xl transition-all"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Banner Image */}
          <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-[420px] overflow-hidden bg-black/60">
            <img
              src={selectedMedium.bannerImage}
              alt={selectedMedium.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/90 via-black/40 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-white/20 text-white backdrop-blur-sm border border-white/20 uppercase tracking-widest">
                ACTIVE MEDIUM DOMAIN
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-2 tracking-tight">
                {selectedMedium.name}
              </h3>
              <p className="text-xs font-mono text-white/70 mt-0.5">{selectedMedium.nameEn}</p>
            </div>
          </div>

          {/* Medium Details */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <div className="text-[11px] font-mono text-indigo-400 font-bold uppercase mb-1">
                  媒介核心命题 (Medium Essence)
                </div>
                <h4 className="text-lg font-bold tracking-tight">{selectedMedium.headline}</h4>
                <p className="text-xs sm:text-sm opacity-80 leading-relaxed mt-1 font-sans">{selectedMedium.description}</p>
              </div>

              {/* Subcategories Branching */}
              <div>
                <h4 className="text-xs font-mono uppercase opacity-50 mb-2">细分领域谱系 (Sub-branches)</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedMedium.subcategories.map((sub, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono opacity-90">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              {/* Design Considerations */}
              <div>
                <h4 className="text-xs font-mono uppercase opacity-50 mb-2">该媒介特有的设计考量 (Core Constraints)</h4>
                <div className="space-y-1.5">
                  {selectedMedium.designConsiderations.map((c, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs opacity-80">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={() => {
                const mapToMedium: Record<string, MediumType> = {
                  image: 'poster',
                  interface: 'web',
                  space: '3d',
                  motion: 'motion',
                };
                onExploreMediumInWorks(mapToMedium[selectedMedium.id] || 'poster');
              }}
              className="w-full py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
            >
              <span>进入【{selectedMedium.name}】作品专属展厅</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid of All 4 Mediums */}
      <h3 className="text-lg font-bold mb-4 tracking-tight">四大媒介谱系 (The 4 Pillars)</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MEDIUM_CATEGORIES.map((med) => {
          const isSelected = selectedMedium.id === med.id;
          return (
            <div
              key={med.id}
              onClick={() => setSelectedMedium(med)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/10'
                  : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 opacity-70 uppercase font-bold text-indigo-300">
                    MEDIUM
                  </span>
                  {isSelected && <span className="text-xs font-mono text-indigo-400">● 选中</span>}
                </div>
                <h4 className="font-bold text-base tracking-tight">{med.name}</h4>
                <p className="text-xs font-mono opacity-50 mb-2">{med.nameEn}</p>
                <p className="text-xs opacity-75 line-clamp-2 leading-relaxed">{med.headline}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono opacity-70">
                <span>包含 {med.subcategories.length} 个子领域</span>
                <span className="text-indigo-400">切换 →</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
