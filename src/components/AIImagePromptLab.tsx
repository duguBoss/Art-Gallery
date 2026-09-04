import React, { useState } from 'react';
import type { AIImageCase, PromptDeconstruction } from '../types/art';
import { Sparkles, Copy, Check, RotateCcw, Sliders, ExternalLink } from 'lucide-react';
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
      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-gray-200">
        <span className="text-xs font-semibold text-gray-400 mr-1 shrink-0">流派分类:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              playSpotlightClick();
              setSelectedCategory(cat);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            {cat === 'all' ? '全部风格' : cat}
          </button>
        ))}
      </div>

      {/* Main Grid: Left Style List + Right Customizer Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Case Thumbnails */}
        <div className="lg:col-span-4 space-y-3 order-2 lg:order-1">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider px-1">
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
                    active
                      ? 'bg-blue-50/60 border-blue-500 shadow-sm'
                      : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-100 border border-gray-200">
                    <img
                      src={c.imageUrl}
                      alt={c.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="w-full overflow-hidden text-left space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 border border-gray-200">
                        {c.badge}
                      </span>
                      <span className="text-xs font-bold text-gray-900 truncate">
                        {c.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
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
            <div className="rounded-2xl bg-white border border-gray-200 p-5 shadow-sm flex flex-col md:flex-row gap-6 items-center">
              <div className="relative w-full md:w-1/2 h-64 sm:h-72 rounded-xl overflow-hidden bg-gray-50 border border-gray-200 shrink-0">
                <img
                  src={activeCase.imageUrl}
                  alt={activeCase.title}
                  className="w-full h-full object-contain"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-white/90 backdrop-blur-sm text-blue-600 font-semibold text-[10px] border border-gray-200 shadow-sm">
                  {activeCase.badge}
                </span>
              </div>

              <div className="w-full md:w-1/2 space-y-3 text-left">
                <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
                  成图效果与流派解析
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {activeCase.title}
                </h2>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {activeCase.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeCase.tags?.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 border border-gray-200"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Prompt Deconstruction Bricks */}
            <div className="rounded-2xl bg-white border border-gray-200 p-6 space-y-5 shadow-sm text-left">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm font-bold text-gray-900">
                    提示词积木拆解与即时定制
                  </h3>
                </div>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>重置配方</span>
                </button>
              </div>

              {/* Modular Input Rows */}
              <div className="space-y-3.5">
                {/* 1. Subject */}
                <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-100 space-y-2">
                  <span className="text-xs font-bold text-blue-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>[核心主体 · Subject]</span>
                    <span className="text-[11px] text-gray-500 font-normal">(可随意替换你想要绘制的内容)</span>
                  </span>
                  <input
                    type="text"
                    value={customBlocks.subject}
                    onChange={(e) => setCustomBlocks({ ...customBlocks, subject: e.target.value })}
                    className="w-full bg-white border border-blue-200 rounded-lg px-3 py-2 text-xs text-gray-900 font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                  />
                  {/* Preset quick switches */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
                    <span className="text-[10px] text-gray-400 shrink-0">推荐主体:</span>
                    {subjectPresets.slice(0, 4).map((p, i) => (
                      <button
                        key={i}
                        onClick={() => setCustomBlocks({ ...customBlocks, subject: p })}
                        className="text-[10px] px-2 py-0.5 rounded bg-white border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-300 whitespace-nowrap cursor-pointer shadow-2xs"
                      >
                        {p.split(',')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Style */}
                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                  <span className="text-xs font-bold text-indigo-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span>[艺术流派基底 · Style]</span>
                  </span>
                  <input
                    type="text"
                    value={customBlocks.style}
                    onChange={(e) => setCustomBlocks({ ...customBlocks, style: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-800 font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* 3. Texture */}
                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                  <span className="text-xs font-bold text-amber-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>[材质纹理与微观细节 · Texture & Material]</span>
                  </span>
                  <input
                    type="text"
                    value={customBlocks.texture}
                    onChange={(e) => setCustomBlocks({ ...customBlocks, texture: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-800 font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* 4. Lighting & Mood */}
                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                  <span className="text-xs font-bold text-purple-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    <span>[光影明暗与色调氛围 · Lighting & Mood]</span>
                  </span>
                  <input
                    type="text"
                    value={customBlocks.lighting}
                    onChange={(e) => setCustomBlocks({ ...customBlocks, lighting: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-800 font-mono focus:outline-none focus:border-purple-500"
                  />
                </div>

                {/* 5. Composition & Parameters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>[视角构图 · Composition]</span>
                    </span>
                    <input
                      type="text"
                      value={customBlocks.composition}
                      onChange={(e) => setCustomBlocks({ ...customBlocks, composition: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-800 font-mono focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                    <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-gray-400" />
                      <span>[模型参数 · Parameters]</span>
                    </span>
                    <input
                      type="text"
                      value={customBlocks.parameters}
                      onChange={(e) => setCustomBlocks({ ...customBlocks, parameters: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-800 font-mono focus:outline-none focus:border-gray-500"
                    />
                  </div>
                </div>
              </div>

              {/* Assembled Prompt */}
              <div className="pt-3 border-t border-gray-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>即时拼装终极 Prompt (可直接运行在 Midjourney / Flux)</span>
                  </span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-all cursor-pointer shadow-sm"
                  >
                    {copiedPrompt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPrompt ? '已复制定制 Prompt!' : '一键复制 Prompt'}</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono text-gray-800 leading-relaxed select-all">
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