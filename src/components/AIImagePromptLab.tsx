import React, { useState } from 'react';
import type { AIImageCase, PromptDeconstruction } from '../types/art';
import { Sparkles, Copy, Check, RotateCcw, Sliders } from 'lucide-react';
import { playSpotlightClick, playSuccessChime } from '../utils/audio';

interface AIImagePromptLabProps {
  imageCases: AIImageCase[];
}

export const AIImagePromptLab: React.FC<AIImagePromptLabProps> = ({ imageCases }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeCase, setActiveCase] = useState<AIImageCase>(imageCases[0] || null);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Customized prompt blocks state
  const [customBlocks, setCustomBlocks] = useState<PromptDeconstruction>(
    imageCases[0]?.promptBlocks || {
      subject: '',
      style: '',
      texture: '',
      lighting: '',
      composition: '',
      parameters: '',
      negative: '',
    }
  );

  // Quick subject presets
  const subjectPresets = [
    'miniature Japanese ramen izakaya street corner',
    'cyberpunk neon noodle stall with hovering robot chef',
    'ancient mysterious grandfather clock with floating black cube',
    'solitary wooden boat drifting on a vast misty lake',
    'chubby cute clay creature having afternoon tea in forest',
    'rustic cozy cottage with spinning watermill and sunflowers',
  ];

  const categories = ['all', ...Array.from(new Set(imageCases.map((c) => c.category)))];

  const filteredCases = selectedCategory === 'all'
    ? imageCases
    : imageCases.filter((c) => c.category === selectedCategory);

  const handleSelectCase = (c: AIImageCase) => {
    playSpotlightClick();
    setActiveCase(c);
    setCustomBlocks({ ...c.promptBlocks });
  };

  const assembledPrompt = React.useMemo(() => {
    if (!customBlocks) return '';
    const parts = [
      customBlocks.subject,
      customBlocks.style,
      customBlocks.texture,
      customBlocks.lighting,
      customBlocks.composition,
      customBlocks.parameters,
    ].filter(Boolean);
    return parts.join(', ');
  }, [customBlocks]);

  const handleCopy = () => {
    playSpotlightClick();
    navigator.clipboard.writeText(assembledPrompt);
    playSuccessChime();
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleReset = () => {
    if (!activeCase) return;
    playSpotlightClick();
    setCustomBlocks({ ...activeCase.promptBlocks });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Category Filter Pills */}
      <div
        className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none border-b transition-colors"
        style={{ borderColor: 'var(--border-subtle)' }}
      >
        <span className="text-xs font-semibold mr-1 shrink-0" style={{ color: 'var(--text-muted)' }}>
          流派分类:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              playSpotlightClick();
              setSelectedCategory(cat);
            }}
            className="px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer border"
            style={{
              backgroundColor: selectedCategory === cat ? 'var(--pill-active-bg)' : 'var(--bg-card)',
              borderColor: selectedCategory === cat ? 'var(--pill-active-bg)' : 'var(--border-subtle)',
              color: selectedCategory === cat ? 'var(--pill-active-text)' : 'var(--text-main)',
            }}
          >
            {cat === 'all' ? '全部风格案例' : cat}
          </button>
        ))}
      </div>

      {/* Main Grid: Left Style List + Right Customizer Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Style Cases List */}
        <div className="lg:col-span-4 space-y-3 order-2 lg:order-1">
          <div className="text-xs font-bold uppercase tracking-wider px-1 text-left" style={{ color: 'var(--text-muted)' }}>
            收录风格案例 ({filteredCases.length})
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 max-h-[750px] overflow-y-auto pr-1">
            {filteredCases.map((c) => {
              const active = activeCase?.id === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => handleSelectCase(c)}
                  className={`group rounded-xl border p-3 cursor-pointer transition-all duration-200 flex gap-3 items-center ${
                    active ? 'ring-2' : 'hover:opacity-90'
                  }`}
                  style={{
                    backgroundColor: active ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                    borderColor: active ? 'var(--accent)' : 'var(--border-subtle)',
                  }}
                >
                  <div
                    className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border"
                    style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-page)' }}
                  >
                    <img
                      src={c.imageUrl}
                      alt={c.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="w-full overflow-hidden text-left space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="text-[10px] font-medium px-1.5 py-0.5 rounded border"
                        style={{
                          backgroundColor: 'var(--tag-bg)',
                          borderColor: 'var(--border-subtle)',
                          color: 'var(--tag-text)',
                        }}
                      >
                        {c.badge}
                      </span>
                      <span className="text-xs font-bold truncate" style={{ color: 'var(--text-main)' }}>
                        {c.title}
                      </span>
                    </div>
                    <p className="text-[11px] line-clamp-2 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      {c.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interactive Studio */}
        {activeCase && (
          <div className="lg:col-span-8 space-y-6 order-1 lg:order-2">
            {/* Top Showcase: Image + Info */}
            <div
              className="rounded-2xl border p-5 shadow-xs flex flex-col md:flex-row gap-6 items-center transition-colors"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <div
                className="relative w-full md:w-1/2 h-64 sm:h-72 rounded-xl overflow-hidden border shrink-0"
                style={{
                  backgroundColor: 'var(--bg-page)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                <img
                  src={activeCase.imageUrl}
                  alt={activeCase.title}
                  className="w-full h-full object-contain"
                />
                <span
                  className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full backdrop-blur-md font-semibold text-[10px] border shadow-xs"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--accent)',
                  }}
                >
                  {activeCase.badge}
                </span>
              </div>

              <div className="w-full md:w-1/2 space-y-3 text-left">
                <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                  成图效果与流派档案
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-black" style={{ color: 'var(--text-main)' }}>
                  {activeCase.title}
                </h2>
                <p className="text-xs leading-relaxed font-sans" style={{ color: 'var(--text-muted)' }}>
                  {activeCase.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeCase.tags?.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded-md border"
                      style={{
                        backgroundColor: 'var(--tag-bg)',
                        borderColor: 'var(--border-subtle)',
                        color: 'var(--tag-text)',
                      }}
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Prompt Deconstruction Bricks */}
            <div
              className="rounded-2xl border p-6 space-y-5 shadow-xs text-left transition-colors"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border-subtle)' }}>
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                  <h3 className="text-sm font-bold" style={{ color: 'var(--text-main)' }}>
                    提示词积木拆解与即时定制
                  </h3>
                </div>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 text-xs transition-colors cursor-pointer hover:opacity-75"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>重置配方</span>
                </button>
              </div>

              {/* Modular Input Rows */}
              <div className="space-y-3.5">
                {/* 1. Subject */}
                <div
                  className="p-3.5 rounded-xl border space-y-2"
                  style={{
                    backgroundColor: 'var(--bg-page-subtle)',
                    borderColor: 'var(--accent-border)',
                  }}
                >
                  <span className="text-xs font-bold flex items-center gap-1.5" style={{ color: 'var(--accent)' }}>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
                    <span>[核心主体 · Subject]</span>
                    <span className="text-[11px] font-normal" style={{ color: 'var(--text-muted)' }}>
                      (可随意替换你想要绘制的内容，实时组装)
                    </span>
                  </span>
                  <input
                    type="text"
                    value={customBlocks.subject}
                    onChange={(e) => setCustomBlocks({ ...customBlocks, subject: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-xs font-mono focus:outline-none transition-all"
                    style={{
                      backgroundColor: 'var(--bg-input)',
                      borderColor: 'var(--border-strong)',
                      color: 'var(--text-main)',
                    }}
                  />
                  {/* Preset quick switches */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
                    <span className="text-[10px] shrink-0" style={{ color: 'var(--text-muted)' }}>
                      推荐主体:
                    </span>
                    {subjectPresets.slice(0, 4).map((p, i) => (
                      <button
                        key={i}
                        onClick={() => setCustomBlocks({ ...customBlocks, subject: p })}
                        className="text-[10px] px-2 py-0.5 rounded border whitespace-nowrap cursor-pointer hover:opacity-80"
                        style={{
                          backgroundColor: 'var(--bg-card)',
                          borderColor: 'var(--border-subtle)',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {p.split(',')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Style */}
                <div
                  className="p-3.5 rounded-xl border space-y-1"
                  style={{
                    backgroundColor: 'var(--bg-page-subtle)',
                    borderColor: 'var(--border-subtle)',
                  }}
                >
                  <span className="text-xs font-bold flex items-center gap-1.5" style={{ color: 'var(--text-main)' }}>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
                    <span>[艺术流派基底 · Style]</span>
                  </span>
                  <input
                    type="text"
                    value={customBlocks.style}
                    onChange={(e) => setCustomBlocks({ ...customBlocks, style: e.target.value })}
                    className="w-full border rounded-lg px-3 py-1.5 text-xs font-mono focus:outline-none"
                    style={{
                      backgroundColor: 'var(--bg-input)',
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--text-main)',
                    }}
                  />
                </div>

                {/* 3. Texture */}
                <div
                  className="p-3.5 rounded-xl border space-y-1"
                  style={{
                    backgroundColor: 'var(--bg-page-subtle)',
                    borderColor: 'var(--border-subtle)',
                  }}
                >
                  <span className="text-xs font-bold flex items-center gap-1.5" style={{ color: 'var(--text-main)' }}>
                    <span className="w-2 h-2 rounded-full opacity-60" style={{ backgroundColor: 'var(--accent)' }} />
                    <span>[材质纹理与微观细节 · Texture & Material]</span>
                  </span>
                  <input
                    type="text"
                    value={customBlocks.texture}
                    onChange={(e) => setCustomBlocks({ ...customBlocks, texture: e.target.value })}
                    className="w-full border rounded-lg px-3 py-1.5 text-xs font-mono focus:outline-none"
                    style={{
                      backgroundColor: 'var(--bg-input)',
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--text-main)',
                    }}
                  />
                </div>

                {/* 4. Lighting */}
                <div
                  className="p-3.5 rounded-xl border space-y-1"
                  style={{
                    backgroundColor: 'var(--bg-page-subtle)',
                    borderColor: 'var(--border-subtle)',
                  }}
                >
                  <span className="text-xs font-bold flex items-center gap-1.5" style={{ color: 'var(--text-main)' }}>
                    <span className="w-2 h-2 rounded-full opacity-60" style={{ backgroundColor: 'var(--accent)' }} />
                    <span>[光影明暗与色调氛围 · Lighting & Mood]</span>
                  </span>
                  <input
                    type="text"
                    value={customBlocks.lighting}
                    onChange={(e) => setCustomBlocks({ ...customBlocks, lighting: e.target.value })}
                    className="w-full border rounded-lg px-3 py-1.5 text-xs font-mono focus:outline-none"
                    style={{
                      backgroundColor: 'var(--bg-input)',
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--text-main)',
                    }}
                  />
                </div>

                {/* 5. Composition & Parameters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    className="p-3.5 rounded-xl border space-y-1"
                    style={{
                      backgroundColor: 'var(--bg-page-subtle)',
                      borderColor: 'var(--border-subtle)',
                    }}
                  >
                    <span className="text-xs font-bold" style={{ color: 'var(--text-main)' }}>
                      [视角构图 · Composition]
                    </span>
                    <input
                      type="text"
                      value={customBlocks.composition}
                      onChange={(e) => setCustomBlocks({ ...customBlocks, composition: e.target.value })}
                      className="w-full border rounded-lg px-3 py-1.5 text-xs font-mono focus:outline-none"
                      style={{
                        backgroundColor: 'var(--bg-input)',
                        borderColor: 'var(--border-subtle)',
                        color: 'var(--text-main)',
                      }}
                    />
                  </div>

                  <div
                    className="p-3.5 rounded-xl border space-y-1"
                    style={{
                      backgroundColor: 'var(--bg-page-subtle)',
                      borderColor: 'var(--border-subtle)',
                    }}
                  >
                    <span className="text-xs font-bold" style={{ color: 'var(--text-main)' }}>
                      [模型参数 · Parameters]
                    </span>
                    <input
                      type="text"
                      value={customBlocks.parameters}
                      onChange={(e) => setCustomBlocks({ ...customBlocks, parameters: e.target.value })}
                      className="w-full border rounded-lg px-3 py-1.5 text-xs font-mono focus:outline-none"
                      style={{
                        backgroundColor: 'var(--bg-input)',
                        borderColor: 'var(--border-subtle)',
                        color: 'var(--text-main)',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Assembled Prompt */}
              <div className="pt-3 border-t space-y-3" style={{ borderColor: 'var(--border-subtle)' }}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold flex items-center gap-1.5" style={{ color: 'var(--text-main)' }}>
                    <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
                    <span>即时拼装终极 Prompt (可直接运行在 Midjourney / Flux)</span>
                  </span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer shadow-sm hover:opacity-90"
                    style={{
                      backgroundColor: 'var(--accent)',
                      color: '#FFFFFF',
                    }}
                  >
                    {copiedPrompt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPrompt ? '已复制定制 Prompt!' : '一键复制 Prompt'}</span>
                  </button>
                </div>

                <div
                  className="p-4 rounded-xl border text-xs font-mono leading-relaxed select-all"
                  style={{
                    backgroundColor: 'var(--bg-page-subtle)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-main)',
                  }}
                >
                  {assembledPrompt}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};