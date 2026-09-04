import React, { useState, useMemo } from 'react';
import type { VisualDimension, VisualAtom } from '../types/atlas';
import { VISUAL_ATOMS } from '../data/visualAtlasData';

interface VisualAtomsViewProps {
  onExploreAtomInWorks: (atomName: string) => void;
}

export const VisualAtomsView: React.FC<VisualAtomsViewProps> = ({
  onExploreAtomInWorks,
}) => {
  const [selectedDimension, setSelectedDimension] = useState<VisualDimension | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const dimensions: { id: VisualDimension | 'all'; label: string; icon: string }[] = [
    { id: 'all', label: '全部材料 (All Atoms)', icon: '✨' },
    { id: 'color', label: '色彩 (Color)', icon: '🎨' },
    { id: 'composition', label: '构图 (Composition)', icon: '📐' },
    { id: 'typography', label: '排版与字体 (Type)', icon: '🔤' },
    { id: 'light', label: '光影 (Light)', icon: '💡' },
    { id: 'texture', label: '材质与质感 (Texture)', icon: '🧱' },
  ];

  const filteredAtoms = useMemo(() => {
    return VISUAL_ATOMS.filter((atom) => {
      const matchDim = selectedDimension === 'all' || atom.dimension === selectedDimension;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        atom.name.toLowerCase().includes(q) ||
        atom.nameEn.toLowerCase().includes(q) ||
        atom.formula.toLowerCase().includes(q) ||
        atom.tags.some((t) => t.toLowerCase().includes(q));
      return matchDim && matchSearch;
    });
  }, [selectedDimension, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
      {/* Intro Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
            <span>LEVEL 01 · VISUAL ATOMS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">视觉基础原子库</h2>
          <p className="text-xs sm:text-sm opacity-70 mt-1 max-w-xl">
            这是最底层的“材料”。解构画面成立的底层物理规律：色彩冷暖、极端尺度、负空间呼吸感与光影透视。
          </p>
        </div>

        {/* Search & Stats */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="搜索原子 / 规律 / 关键词..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3.5 py-2 rounded-xl text-xs bg-white/5 border border-white/10 focus:border-indigo-400 focus:outline-none w-56 sm:w-64"
          />
          <div className="text-xs font-mono px-3 py-2 rounded-xl bg-white/5 border border-white/10 opacity-70">
            {filteredAtoms.length} ATOMS
          </div>
        </div>
      </div>

      {/* Dimension Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {dimensions.map((d) => (
          <button
            key={d.id}
            onClick={() => setSelectedDimension(d.id)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
              selectedDimension === d.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-white/5 hover:bg-white/10 border border-white/10 opacity-80'
            }`}
          >
            <span>{d.icon}</span>
            <span>{d.label}</span>
          </button>
        ))}
      </div>

      {/* Atom Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAtoms.map((atom: VisualAtom) => (
          <div
            key={atom.id}
            className="group rounded-2xl border overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:border-indigo-500/40"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            {/* Visual Thumbnail & Dimension Header */}
            <div className="relative h-48 overflow-hidden bg-black/40">
              <img
                src={atom.sampleVisualUrl}
                alt={atom.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Tag Badge */}
              <div className="absolute top-3 left-3">
                <span
                  className="px-2.5 py-1 text-[10px] font-mono font-semibold rounded-full uppercase tracking-wider shadow-sm text-white"
                  style={{ backgroundColor: atom.accentColor }}
                >
                  {atom.dimension.toUpperCase()}
                </span>
              </div>

              {/* Title on Overlay */}
              <div className="absolute bottom-3 left-4 right-4">
                <h3 className="text-lg font-bold text-white tracking-tight">{atom.name}</h3>
                <p className="text-xs font-mono text-white/70">{atom.nameEn}</p>
              </div>
            </div>

            {/* Card Body: Formula & Principle */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                {/* Visual Formula Equation */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[10px] font-mono text-indigo-400 font-bold uppercase mb-1">
                    视觉材料公式 (Visual Formula)
                  </div>
                  <p className="text-xs font-sans font-medium leading-relaxed opacity-90">
                    {atom.formula}
                  </p>
                </div>

                {/* Description & Principle */}
                <div>
                  <h4 className="text-[11px] font-semibold opacity-60 uppercase mb-1">视知觉原理</h4>
                  <p className="text-xs opacity-80 leading-relaxed font-sans">
                    {atom.principle}
                  </p>
                </div>
              </div>

              {/* Tags & Action Link */}
              <div className="pt-3 border-t border-white/10">
                <div className="flex flex-wrap gap-1 mb-3">
                  {atom.tags.slice(0, 4).map((tag, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 opacity-70 border border-white/5">
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => onExploreAtomInWorks(atom.name)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-center transition-all bg-indigo-500/10 text-indigo-400 hover:bg-indigo-600 hover:text-white border border-indigo-500/20 flex items-center justify-center gap-2"
                >
                  <span>探索应用此原子的作品案例</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
