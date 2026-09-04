import React, { useState, useMemo } from 'react';
import type { AtlasWork, MediumType } from '../types/atlas';
import { ATLAS_WORKS, STYLE_RULES } from '../data/visualAtlasData';
import { WorkDeconstructModal } from './WorkDeconstructModal';

interface DesignAtlasViewProps {
  initialAtomFilter?: string | null;
  initialStyleFilter?: string | null;
  onClearFilter?: () => void;
  onSelectAtom?: (atomName: string) => void;
  onSelectStyle?: (styleId: string) => void;
}

export const DesignAtlasView: React.FC<DesignAtlasViewProps> = ({
  initialAtomFilter,
  initialStyleFilter,
  onClearFilter,
  onSelectAtom,
  onSelectStyle,
}) => {
  const [selectedMedium, setSelectedMedium] = useState<MediumType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectingWork, setInspectingWork] = useState<AtlasWork | null>(null);

  const mediums: { id: MediumType | 'all'; label: string; icon: string }[] = [
    { id: 'all', label: '全部作品 (All Works)', icon: '🌐' },
    { id: 'web', label: 'Web 网页', icon: '💻' },
    { id: 'ui', label: 'UI 界面', icon: '📱' },
    { id: 'poster', label: '海报排版', icon: '📜' },
    { id: '3d', label: '3D 与空间', icon: '🧊' },
    { id: 'motion', label: '动态与视效', icon: '🎞️' },
  ];

  const filteredWorks = useMemo(() => {
    return ATLAS_WORKS.filter((work) => {
      const matchMed = selectedMedium === 'all' || work.medium === selectedMedium;
      const matchAtom = !initialAtomFilter || work.atoms.includes(initialAtomFilter);
      const matchStyle = !initialStyleFilter || work.primaryStyleId === initialStyleFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        work.title.toLowerCase().includes(q) ||
        work.titleEn.toLowerCase().includes(q) ||
        work.atoms.some((a) => a.toLowerCase().includes(q)) ||
        work.whyItWorks.composition.toLowerCase().includes(q);
      return matchMed && matchAtom && matchStyle && matchSearch;
    });
  }, [selectedMedium, initialAtomFilter, initialStyleFilter, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
            <span>LEVEL 04 · WORKS & KNOWLEDGE NETWORK</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">作品与知识探索网络</h2>
          <p className="text-xs sm:text-sm opacity-70 mt-1 max-w-xl">
            一个作品就是一个入口。点击任意作品即可开启多层构图骨架、色相光谱与视知觉原理解构。
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="搜索作品 / 原子 / 构图手法..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3.5 py-2 rounded-xl text-xs bg-white/5 border border-white/10 focus:border-indigo-400 focus:outline-none w-56 sm:w-64"
          />
          <div className="text-xs font-mono px-3 py-2 rounded-xl bg-white/5 border border-white/10 opacity-70">
            {filteredWorks.length} WORKS
          </div>
        </div>
      </div>

      {/* Active Filter Indicators (if filtered by Atom or Style) */}
      {(initialAtomFilter || initialStyleFilter) && (
        <div className="mb-6 p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs">
            <span className="font-mono text-indigo-300 font-bold">ACTIVE FILTER:</span>
            {initialAtomFilter && (
              <span className="px-3 py-1 rounded-full bg-indigo-600 text-white font-medium flex items-center gap-1.5 shadow-sm">
                <span>原子: {initialAtomFilter}</span>
              </span>
            )}
            {initialStyleFilter && (
              <span className="px-3 py-1 rounded-full bg-pink-600 text-white font-medium flex items-center gap-1.5 shadow-sm">
                <span>风格规则: {STYLE_RULES.find((s) => s.id === initialStyleFilter)?.name || initialStyleFilter}</span>
              </span>
            )}
          </div>

          <button
            onClick={onClearFilter}
            className="text-xs font-mono text-indigo-300 hover:text-white px-3 py-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            ✕ 清除过滤条件
          </button>
        </div>
      )}

      {/* Medium Type Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {mediums.map((m) => (
          <button
            key={m.id}
            onClick={() => setSelectedMedium(m.id)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
              selectedMedium === m.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-white/5 hover:bg-white/10 border border-white/10 opacity-75'
            }`}
          >
            <span>{m.icon}</span>
            <span>{m.label}</span>
          </button>
        ))}
      </div>

      {/* Works Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorks.map((work) => {
          const style = STYLE_RULES.find((s) => s.id === work.primaryStyleId);
          return (
            <div
              key={work.id}
              className="group rounded-2xl border overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:border-indigo-500/50"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              {/* Image Preview & Click to Deconstruct */}
              <div
                className="relative h-64 overflow-hidden bg-black/50 cursor-pointer"
                onClick={() => setInspectingWork(work)}
              >
                <img
                  src={work.coverImage}
                  alt={work.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Medium Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 text-[10px] font-mono font-bold rounded-full uppercase tracking-wider bg-black/60 text-white backdrop-blur-md border border-white/20">
                    {work.medium}
                  </span>
                  {style && (
                    <span className="px-2.5 py-1 text-[10px] font-mono font-medium rounded-full bg-indigo-500/80 text-white backdrop-blur-md shadow-sm">
                      {style.name.split('风格')[0]}
                    </span>
                  )}
                </div>

                {/* Hover Trigger Hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                  <span className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold font-mono shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    🔍 深度拆解此作品 (Deconstruct)
                  </span>
                </div>

                {/* Color Spectrum Swatches on Bottom Image */}
                <div className="absolute bottom-3 right-3 flex items-center -space-x-1">
                  {work.colorPalette.map((c, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 rounded-full border border-black/40 shadow-sm"
                      style={{ backgroundColor: c }}
                      title={c}
                    />
                  ))}
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 
                    onClick={() => setInspectingWork(work)}
                    className="text-base font-bold tracking-tight cursor-pointer hover:text-indigo-400 transition-colors"
                  >
                    {work.title}
                  </h3>
                  <p className="text-xs font-mono opacity-50 mb-3">{work.titleEn}</p>

                  {/* Aesthetic Brief */}
                  <p className="text-xs opacity-75 line-clamp-2 leading-relaxed font-sans mb-3">
                    {work.whyItWorks.composition}
                  </p>

                  {/* Visual Atoms Cloud */}
                  <div className="flex flex-wrap gap-1.5">
                    {work.atoms.map((atomName, idx) => (
                      <span
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectAtom?.(atomName);
                        }}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer border border-white/5 opacity-85"
                        title={`点击过滤包含【${atomName}】的所有案例`}
                      >
                        ⚛️ {atomName}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] opacity-50">
                    {work.authorOrSource || 'Art Atlas'}
                  </span>
                  <button
                    onClick={() => setInspectingWork(work)}
                    className="text-indigo-400 font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>开启拆解视窗</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep Deconstruction Modal */}
      <WorkDeconstructModal
        work={inspectingWork}
        isOpen={!!inspectingWork}
        onClose={() => setInspectingWork(null)}
        onSelectAtom={onSelectAtom}
        onSelectStyle={onSelectStyle}
      />
    </div>
  );
};
