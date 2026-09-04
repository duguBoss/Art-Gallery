import React, { useState } from 'react';
import type { AIImageCase, PromptDeconstruction } from '../types/art';
import { Sparkles, Copy, Check, RotateCcw, Filter, Eye, Layers, Sliders, ExternalLink } from 'lucide-react';
import { playSpotlightClick, playSuccessChime } from '../utils/audio';

interface AIImagePromptLabProps {
  imageCases: AIImageCase[];
  onOpenAdmin: () => void;
}

export const AIImagePromptLab: React.FC<AIImagePromptLabProps> = ({
  imageCases,
  onOpenAdmin,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeCase, setActiveCase] = useState<AIImageCase>(imageCases[0] || null);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Customized prompt blocks state for the currently active case
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

  // Quick subject suggestions
  const subjectPresets = [
    'miniature Japanese ramen izakaya street corner',
    'cyberpunk neon noodle stall with hovering robot chef',
    'ancient mysterious grandfather clock with floating black cube',
    'solitary wooden boat drifting on a vast misty lake',
    'chubby cute clay creature having afternoon tea in forest',
    'rustic cozy cottage with spinning watermill and sunflowers',
    'glass acrylic transparent headphone sculpture with rainbow light',
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

  // Re-assemble the customized full prompt dynamically
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
    setTimeout(() => setCopiedPrompt(false), 2200);
  };

  const handleResetToOriginal = () => {
    if (!activeCase) return;
    playSpotlightClick();
    setCustomBlocks({ ...activeCase.promptBlocks });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gallery-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-mono tracking-wider uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI PROMPT ENGINEERING LAB · 提示词工程与积木拆解实验室</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-black text-gallery-100">
            所见即所得 · 提示词结构拆解与互动定制
          </h2>
          <p className="text-xs sm:text-sm text-gallery-400 mt-1 max-w-2xl font-sans">
            每张惊艳的成图均由结构化提示词积木（主体、风格基底、材质、光影、构图）精细驱动。你可以替换任意模块，一键组装你的专属 Prompt！
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playSpotlightClick();
                setSelectedCategory(cat);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-sans whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gold-500 text-gallery-950 font-bold shadow-glow-gold'
                  : 'bg-gallery-900 border border-gallery-800 text-gallery-300 hover:text-white hover:border-gold-500/40'
              }`}
            >
              {cat === 'all' ? '全部风格案例' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Studio: Left Cases Strip + Right Interactive Customizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image Cases Selector List */}
        <div className="lg:col-span-4 space-y-3 order-2 lg:order-1">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-mono text-gallery-400 tracking-wider">
              精选风格案例 ({filteredCases.length})
            </span>
            <button
              onClick={onOpenAdmin}
              className="text-xs font-mono text-gold-400 hover:text-gold-300 underline cursor-pointer"
            >
              + 后台录入新案例
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-3 max-h-[780px] overflow-y-auto pr-1">
            {filteredCases.map((c) => {
              const active = activeCase?.id === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => handleSelectCase(c)}
                  className={`group relative rounded-xl overflow-hidden border p-2 cursor-pointer transition-all duration-300 flex flex-col lg:flex-row gap-3 items-center ${
                    active
                      ? 'bg-gallery-900/90 border-gold-500 shadow-glow-gold/20'
                      : 'bg-gallery-950 border-gallery-800 hover:border-gallery-700 hover:bg-gallery-900/40'
                  }`}
                >
                  <div className="relative w-full lg:w-28 h-24 rounded-lg overflow-hidden shrink-0 bg-black">
                    <img
                      src={c.imageUrl}
                      alt={c.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-1 left-1 text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/80 text-gold-300 border border-gold-500/20">
                      {c.badge}
                    </span>
                  </div>

                  <div className="w-full overflow-hidden text-left space-y-1">
                    <h4 className={`text-xs font-serif font-bold truncate ${active ? 'text-gold-300' : 'text-gallery-200 group-hover:text-white'}`}>
                      {c.title}
                    </h4>
                    <p className="text-[11px] text-gallery-400 line-clamp-2 leading-relaxed">
                      {c.description}
                    </p>
                    <div className="flex items-center gap-1 pt-0.5">
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-gallery-900 text-gallery-400 border border-gallery-800">
                        {c.category}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interactive Prompt Deconstructor Studio */}
        {activeCase && (
          <div className="lg:col-span-8 space-y-6 order-1 lg:order-2">
            {/* Top Showcase Banner (The Result Image) */}
            <div className="relative rounded-2xl overflow-hidden bg-gallery-950 border border-gallery-800 shadow-2xl p-4 sm:p-6 flex flex-col md:flex-row gap-6 items-center">
              {/* Image Preview with Zoom */}
              <div className="relative w-full md:w-1/2 h-64 sm:h-72 rounded-xl overflow-hidden bg-black border border-gold-500/20 shadow-inner group/preview shrink-0">
                <img
                  src={activeCase.imageUrl}
                  alt={activeCase.title}
                  className="w-full h-full object-contain group-hover/preview:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-gallery-950/90 text-gold-400 border border-gold-500/40 text-[10px] font-mono font-semibold">
                    {activeCase.badge}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-gallery-900/90 text-gallery-300 border border-gallery-700 text-[10px] font-mono">
                    {activeCase.category}
                  </span>
                </div>
              </div>

              {/* Case Details */}
              <div className="w-full md:w-1/2 space-y-3 text-left">
                <div className="text-[11px] font-mono text-gold-400 tracking-wider">
                  AI 生成成品视觉与风格档案
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-black text-gallery-100">
                  {activeCase.title}
                </h3>
                <p className="text-xs text-gallery-300 leading-relaxed font-sans">
                  {activeCase.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeCase.tags?.map((t, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-gallery-900 text-gallery-300 border border-gallery-800">
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="pt-2 text-[11px] text-gallery-400 font-mono">
                  录入作者：{activeCase.author || '策展部'} · 更新：{activeCase.createdDate}
                </div>
              </div>
            </div>

            {/* Prompt Deconstruction Blocks (Modular Building Bricks) */}
            <div className="rounded-2xl bg-gallery-900 border border-gallery-800 p-5 sm:p-7 space-y-5 shadow-xl">
              <div className="flex items-center justify-between border-b border-gallery-800 pb-3">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-gold-400" />
                  <h4 className="text-base font-serif font-bold text-gallery-100">
                    提示词积木式拆解与定制
                  </h4>
                </div>
                <button
                  onClick={handleResetToOriginal}
                  className="flex items-center gap-1 text-xs font-mono text-gallery-400 hover:text-gold-300 transition-colors cursor-pointer"
                  title="恢复预设原版"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>恢复原版配方</span>
                </button>
              </div>

              {/* Modular Input Rows */}
              <div className="space-y-4 text-left">
                {/* 1. Subject (Customizable text input with quick switch presets) */}
                <div className="p-3.5 rounded-xl bg-gallery-950 border border-gold-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-gold-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-gold-400" />
                      <span>[核心主体 · Subject]</span>
                      <span className="text-[10px] text-gallery-400 font-normal font-sans">(可自由修改内容，实时替换生成)</span>
                    </span>
                  </div>
                  <input
                    type="text"
                    value={customBlocks.subject}
                    onChange={(e) => setCustomBlocks({ ...customBlocks, subject: e.target.value })}
                    className="w-full bg-gallery-900 border border-gallery-700/80 rounded-lg px-3 py-2 text-xs text-gallery-100 font-mono focus:outline-none focus:border-gold-500 transition-all"
                    placeholder="例如: a cozy ramen shop at rainy night, floating black cube..."
                  />
                  {/* Preset quick switches */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    <span className="text-[10px] font-mono text-gallery-400 shrink-0">快捷换词:</span>
                    {subjectPresets.slice(0, 4).map((p, i) => (
                      <button
                        key={i}
                        onClick={() => setCustomBlocks({ ...customBlocks, subject: p })}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-gallery-900 border border-gallery-800 text-gallery-300 hover:text-gold-300 hover:border-gold-500/40 whitespace-nowrap cursor-pointer"
                      >
                        {p.split(',')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Style Base */}
                <div className="p-3.5 rounded-xl bg-gallery-950 border border-gallery-800 space-y-1.5">
                  <span className="text-xs font-mono font-bold text-accent-cyan flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent-cyan" />
                    <span>[艺术流派基底 · Style]</span>
                  </span>
                  <input
                    type="text"
                    value={customBlocks.style}
                    onChange={(e) => setCustomBlocks({ ...customBlocks, style: e.target.value })}
                    className="w-full bg-gallery-900 border border-gallery-700/80 rounded-lg px-3 py-1.5 text-xs text-gallery-200 font-mono focus:outline-none focus:border-accent-cyan transition-all"
                  />
                </div>

                {/* 3. Texture & Material */}
                <div className="p-3.5 rounded-xl bg-gallery-950 border border-gallery-800 space-y-1.5">
                  <span className="text-xs font-mono font-bold text-accent-amber flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent-amber" />
                    <span>[材质纹理与微观细节 · Texture & Material]</span>
                  </span>
                  <input
                    type="text"
                    value={customBlocks.texture}
                    onChange={(e) => setCustomBlocks({ ...customBlocks, texture: e.target.value })}
                    className="w-full bg-gallery-900 border border-gallery-700/80 rounded-lg px-3 py-1.5 text-xs text-gallery-200 font-mono focus:outline-none focus:border-accent-amber transition-all"
                  />
                </div>

                {/* 4. Lighting & Color Mood */}
                <div className="p-3.5 rounded-xl bg-gallery-950 border border-gallery-800 space-y-1.5">
                  <span className="text-xs font-mono font-bold text-accent-violet flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent-violet" />
                    <span>[光影明暗与色调氛围 · Lighting & Mood]</span>
                  </span>
                  <input
                    type="text"
                    value={customBlocks.lighting}
                    onChange={(e) => setCustomBlocks({ ...customBlocks, lighting: e.target.value })}
                    className="w-full bg-gallery-900 border border-gallery-700/80 rounded-lg px-3 py-1.5 text-xs text-gallery-200 font-mono focus:outline-none focus:border-accent-violet transition-all"
                  />
                </div>

                {/* 5. Composition & Parameters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-gallery-950 border border-gallery-800 space-y-1.5">
                    <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>[视角构图 · Composition]</span>
                    </span>
                    <input
                      type="text"
                      value={customBlocks.composition}
                      onChange={(e) => setCustomBlocks({ ...customBlocks, composition: e.target.value })}
                      className="w-full bg-gallery-900 border border-gallery-700/80 rounded-lg px-3 py-1.5 text-xs text-gallery-200 font-mono focus:outline-none focus:border-emerald-400 transition-all"
                    />
                  </div>

                  <div className="p-3.5 rounded-xl bg-gallery-950 border border-gallery-800 space-y-1.5">
                    <span className="text-xs font-mono font-bold text-gallery-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-gallery-400" />
                      <span>[模型参数 · Parameters]</span>
                    </span>
                    <input
                      type="text"
                      value={customBlocks.parameters}
                      onChange={(e) => setCustomBlocks({ ...customBlocks, parameters: e.target.value })}
                      className="w-full bg-gallery-900 border border-gallery-700/80 rounded-lg px-3 py-1.5 text-xs text-gallery-200 font-mono focus:outline-none focus:border-gold-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Final Assembled Prompt Display */}
              <div className="pt-3 border-t border-gallery-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-gold-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>实时拼装终极 Prompt (可在 Midjourney / WebUI 直接运行)</span>
                  </span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-gallery-950 font-serif font-bold text-xs shadow-glow-gold hover:from-gold-400 hover:to-gold-500 transition-all cursor-pointer"
                  >
                    {copiedPrompt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPrompt ? '已复制定制 Prompt!' : '一键复制终极 Prompt'}</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-black/80 border border-gold-500/40 text-xs font-mono text-gallery-200 leading-relaxed select-all">
                  {assembledPrompt}
                </div>

                {/* Negative Prompt if exists */}
                {customBlocks.negative && (
                  <div className="p-3 rounded-lg bg-gallery-950 border border-gallery-800 text-[11px] font-mono text-gallery-400 flex items-start gap-2">
                    <span className="text-accent-crimson font-bold shrink-0">负向屏蔽词:</span>
                    <span>{customBlocks.negative}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};