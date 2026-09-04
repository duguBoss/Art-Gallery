import React, { useState } from 'react';
import type { AtlasWork } from '../types/atlas';
import { VISUAL_ATOMS, STYLE_RULES } from '../data/visualAtlasData';

interface WorkDeconstructModalProps {
  work: AtlasWork | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectAtom?: (atomName: string) => void;
  onSelectStyle?: (styleId: string) => void;
}

type DeconstructTab = 'artwork' | 'composition-grid' | 'palette' | 'atoms' | 'rebuild';

export const WorkDeconstructModal: React.FC<WorkDeconstructModalProps> = ({
  work,
  isOpen,
  onClose,
  onSelectAtom,
  onSelectStyle,
}) => {
  const [activeTab, setActiveTab] = useState<DeconstructTab>('artwork');
  const [copied, setCopied] = useState(false);

  if (!isOpen || !work) return null;

  const styleObj = STYLE_RULES.find((s) => s.id === work.primaryStyleId);

  const handleCopyPrompt = () => {
    if (work.rebuildGuide.promptTips) {
      navigator.clipboard.writeText(work.rebuildGuide.promptTips);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl overflow-hidden border shadow-2xl transition-all"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-subtle)',
          color: 'var(--text-main)',
        }}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 text-xs font-mono font-medium rounded-full uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              {work.medium.toUpperCase()}
            </span>
            <div>
              <h2 className="text-lg font-bold tracking-tight">{work.title}</h2>
              <p className="text-xs font-mono opacity-60">{work.titleEn}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl transition-colors hover:bg-white/10 text-white/70 hover:text-white"
            title="关闭窗口 (ESC)"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 py-2.5 border-b bg-black/20 text-xs overflow-x-auto" style={{ borderColor: 'var(--border-subtle)' }}>
          <span className="text-xs opacity-50 mr-2 font-mono uppercase">Deconstruct View:</span>
          {[
            { id: 'artwork', label: '完整作品 (Full Artwork)', icon: '🖼️' },
            { id: 'composition-grid', label: '构图与骨架 (Composition Grid)', icon: '📐' },
            { id: 'palette', label: '调色盘与光影 (Palette & Light)', icon: '🎨' },
            { id: 'atoms', label: '视觉原子 (Visual Atoms)', icon: '⚛️' },
            { id: 'rebuild', label: '重构指南 (Rebuild & Code)', icon: '🛠️' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as DeconstructTab)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'opacity-70 hover:opacity-100 hover:bg-white/5'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left / Main Stage: Visual Preview */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center min-h-[340px] rounded-xl overflow-hidden relative bg-black/40 border border-white/10 p-2">
            {/* Visual Container */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-lg">
              <img
                src={work.coverImage}
                alt={work.title}
                className="max-h-[500px] w-auto max-w-full object-contain rounded-md shadow-lg transition-transform duration-500"
              />

              {/* Overlay: Composition Grid (if active) */}
              {activeTab === 'composition-grid' && (
                <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 border-2 border-indigo-500/60 bg-indigo-500/5 backdrop-blur-[1px]">
                  <div className="border-r border-b border-indigo-400/50 relative">
                    <span className="absolute bottom-1 right-1 text-[10px] font-mono text-indigo-300 bg-black/60 px-1 rounded">1/3</span>
                  </div>
                  <div className="border-r border-b border-indigo-400/50"></div>
                  <div className="border-b border-indigo-400/50"></div>
                  <div className="border-r border-b border-indigo-400/50"></div>
                  <div className="border-r border-b border-indigo-400/60 bg-indigo-500/10 flex items-center justify-center">
                    <span className="text-[10px] font-mono text-indigo-200 bg-black/80 px-1.5 py-0.5 rounded border border-indigo-400/50">Golden Anchor</span>
                  </div>
                  <div className="border-b border-indigo-400/50"></div>
                  <div className="border-r border-indigo-400/50"></div>
                  <div className="border-r border-indigo-400/50"></div>
                  <div></div>
                  {/* Diagonal Dynamic Line */}
                  <svg className="absolute inset-0 w-full h-full stroke-pink-500/50 stroke-1 stroke-dasharray-4">
                    <line x1="0" y1="0" x2="100%" y2="100%" />
                    <line x1="0" y1="100%" x2="100%" y2="0" />
                  </svg>
                </div>
              )}
            </div>

            {/* Quick Palette Bar on Stage Bottom */}
            <div className="w-full flex items-center justify-between mt-3 px-3 py-2 rounded-lg bg-black/50 border border-white/5 text-xs">
              <span className="opacity-60 font-mono text-[11px]">Dominant Spectrum:</span>
              <div className="flex items-center gap-1.5">
                {work.colorPalette.map((col, idx) => (
                  <div
                    key={idx}
                    className="w-5 h-5 rounded-full border border-white/20 shadow-inner group relative cursor-pointer"
                    style={{ backgroundColor: col }}
                    title={`Color: ${col}`}
                    onClick={() => navigator.clipboard.writeText(col)}
                  >
                    <span className="opacity-0 group-hover:opacity-100 absolute bottom-6 left-1/2 -translate-x-1/2 bg-black text-[10px] px-1.5 py-0.5 rounded text-white pointer-events-none font-mono">
                      {col}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Stage: Detailed Knowledge Breakdown Panel */}
          <div className="lg:col-span-5 flex flex-col gap-4 text-sm">
            {/* Style Rule Affiliation */}
            {styleObj && (
              <div 
                className="p-4 rounded-xl border transition-all cursor-pointer hover:border-indigo-400/60"
                style={{ backgroundColor: 'var(--bg-card-hover)', borderColor: 'var(--border-subtle)' }}
                onClick={() => {
                  onSelectStyle?.(styleObj.id);
                  onClose();
                }}
              >
                <div className="flex items-center justify-between text-xs opacity-70 mb-1">
                  <span className="font-mono uppercase">Style Matrix Rule</span>
                  <span className="text-indigo-400 hover:underline">查看此风格图谱 →</span>
                </div>
                <div className="font-bold text-base text-indigo-400">{styleObj.name}</div>
                <p className="text-xs opacity-70 mt-1">{styleObj.aestheticMood}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {styleObj.equation.slice(0, 3).map((eq, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/5 font-mono opacity-80 border border-white/5">
                      + {eq}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Content for Tabs */}
            {activeTab === 'artwork' && (
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <h4 className="font-semibold text-xs text-indigo-300 uppercase tracking-wider mb-1">构图原理 (Why It Works: Composition)</h4>
                  <p className="text-xs leading-relaxed opacity-85">{work.whyItWorks.composition}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <h4 className="font-semibold text-xs text-amber-300 uppercase tracking-wider mb-1">光影与色彩 (Light & Color)</h4>
                  <p className="text-xs leading-relaxed opacity-85">{work.whyItWorks.lightAndColor}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <h4 className="font-semibold text-xs text-emerald-300 uppercase tracking-wider mb-1">空间律动 (Space & Rhythm)</h4>
                  <p className="text-xs leading-relaxed opacity-85">{work.whyItWorks.spaceAndRhythm}</p>
                </div>
              </div>
            )}

            {activeTab === 'composition-grid' && (
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-3">
                <h4 className="font-bold text-sm text-indigo-300">📐 画面几何架构拆解</h4>
                <p className="text-xs opacity-80 leading-relaxed">
                  {work.whyItWorks.composition}
                </p>
                <div className="border-t border-white/10 pt-3">
                  <div className="text-xs font-semibold text-white/90 mb-1">构图几何要点：</div>
                  <ul className="text-xs space-y-1.5 opacity-75 list-disc list-inside">
                    <li>三分法则 (Rule of Thirds) 核心焦点锚定</li>
                    <li>对角线牵引运动势能 (Diagonal Tension)</li>
                    <li>呼吸空间比率：留白面积显著高于信息实体</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'palette' && (
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-3">
                <h4 className="font-bold text-sm text-amber-300">🎨 色相光谱与光影配方</h4>
                <p className="text-xs opacity-80 leading-relaxed">
                  {work.whyItWorks.lightAndColor}
                </p>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {work.colorPalette.map((hex, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-black/40 border border-white/5">
                      <div className="w-6 h-6 rounded-md shadow" style={{ backgroundColor: hex }} />
                      <div className="text-[11px] font-mono">
                        <div>{hex}</div>
                        <span className="opacity-50 text-[9px]">{i === 0 ? 'Primary' : i === 1 ? 'Secondary' : 'Accent'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'atoms' && (
              <div className="space-y-2">
                <div className="text-xs font-mono opacity-60">点击任意视觉原子，跨媒介漫游相同美学法则：</div>
                <div className="flex flex-col gap-2">
                  {work.atoms.map((atomName, idx) => {
                    const matchedAtom = VISUAL_ATOMS.find((a) => a.name === atomName);
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          onSelectAtom?.(atomName);
                          onClose();
                        }}
                        className="p-3 rounded-xl border bg-white/5 hover:bg-white/10 transition-all cursor-pointer flex items-center justify-between group"
                        style={{ borderColor: matchedAtom?.accentColor ? `${matchedAtom.accentColor}40` : 'var(--border-subtle)' }}
                      >
                        <div>
                          <div className="font-semibold text-xs flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: matchedAtom?.accentColor || '#6366f1' }} />
                            <span>{atomName}</span>
                            {matchedAtom && <span className="text-[10px] font-mono opacity-50">({matchedAtom.nameEn})</span>}
                          </div>
                          {matchedAtom && (
                            <p className="text-[11px] opacity-70 mt-1 line-clamp-1">{matchedAtom.formula}</p>
                          )}
                        </div>
                        <span className="text-xs text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">探索此原子 →</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'rebuild' && (
              <div className="space-y-3">
                {work.rebuildGuide.cssSnippet && (
                  <div className="p-3.5 rounded-xl bg-black/50 border border-white/10">
                    <div className="flex items-center justify-between text-xs font-mono text-indigo-300 mb-1.5">
                      <span>CSS CORE PRINCIPLE</span>
                    </div>
                    <pre className="text-[11px] font-mono p-2 rounded bg-black/60 overflow-x-auto text-emerald-300 border border-white/5">
                      {work.rebuildGuide.cssSnippet}
                    </pre>
                  </div>
                )}

                <div className="p-3.5 rounded-xl bg-black/50 border border-white/10">
                  <div className="flex items-center justify-between text-xs font-mono text-amber-300 mb-1.5">
                    <span>AI PROMPT & PARAMETERS</span>
                    <button
                      onClick={handleCopyPrompt}
                      className="px-2 py-0.5 text-[10px] rounded bg-white/10 hover:bg-white/20 transition-colors text-white"
                    >
                      {copied ? '✓ 已复制' : '复制 Prompt'}
                    </button>
                  </div>
                  <p className="text-xs font-mono opacity-85 leading-relaxed bg-black/60 p-2.5 rounded border border-white/5">
                    {work.rebuildGuide.promptTips}
                  </p>
                </div>

                <div className="text-[11px] opacity-60 font-mono">
                  推荐生产工具：{work.rebuildGuide.tools.join(' · ')}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
