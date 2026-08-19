import React, { useState } from 'react';
import { X, Sparkles, Copy, Check, Palette, BookOpen, Layers, Lightbulb, ZoomIn, Share2 } from 'lucide-react';
import { ArtStyle, Artwork } from '../types/art';
import { playSpotlightClick, playSuccessChime } from '../utils/audio';

interface StyleDetailModalProps {
  style: ArtStyle | null;
  onClose: () => void;
  onInspectArtwork: (art: Artwork, style: ArtStyle) => void;
}

export const StyleDetailModal: React.FC<StyleDetailModalProps> = ({
  style,
  onClose,
  onInspectArtwork,
}) => {
  const [activeTab, setActiveTab] = useState<'works' | 'prompts' | 'techniques' | 'story'>('works');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!style) return null;

  const handleCopyHex = (hex: string) => {
    playSpotlightClick();
    navigator.clipboard.writeText(hex);
    playSuccessChime();
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  const handleCopyPrompt = (text: string) => {
    playSpotlightClick();
    navigator.clipboard.writeText(text);
    playSuccessChime();
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleShare = () => {
    playSpotlightClick();
    navigator.clipboard.writeText(window.location.href);
    playSuccessChime();
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-gallery-950 border border-gold-500/40 rounded-2xl shadow-gallery-lg overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Header Bar */}
        <div className="p-5 sm:p-6 border-b border-gallery-800 bg-gallery-900/90 flex items-start justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-mono font-semibold text-gold-400 px-2 py-0.5 rounded bg-gold-500/10 border border-gold-500/20">
                {style.roomNumber}
              </span>
              <span className="text-xs font-mono text-gallery-400">{style.era}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-gallery-100 mt-1">
              {style.title}
            </h2>
            <p className="text-xs sm:text-sm text-gallery-400 font-sans">{style.englishTitle}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-full bg-gallery-800 border border-gallery-700 text-gallery-300 hover:text-white transition-all cursor-pointer"
              title="复制当前流派分享链接"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                playSpotlightClick();
                onClose();
              }}
              className="p-2.5 rounded-full bg-gallery-800 border border-gallery-700 text-gallery-300 hover:text-white hover:border-gold-500/60 transition-all cursor-pointer"
              title="关闭 (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 pb-2 border-b border-gallery-800 bg-gallery-900/50 shrink-0 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('works')}
            className={`px-4 py-2 rounded-lg text-xs font-serif font-bold transition-all cursor-pointer ${
              activeTab === 'works'
                ? 'bg-gold-500 text-gallery-950 shadow-sm'
                : 'text-gallery-400 hover:text-gallery-200'
            }`}
          >
            🖼️ 典藏画作与鉴赏
          </button>
          <button
            onClick={() => setActiveTab('prompts')}
            className={`px-4 py-2 rounded-lg text-xs font-serif font-bold transition-all cursor-pointer ${
              activeTab === 'prompts'
                ? 'bg-gold-500 text-gallery-950 shadow-sm'
                : 'text-gallery-400 hover:text-gallery-200'
            }`}
          >
            ✨ AI 创作提示词配方
          </button>
          <button
            onClick={() => setActiveTab('techniques')}
            className={`px-4 py-2 rounded-lg text-xs font-serif font-bold transition-all cursor-pointer ${
              activeTab === 'techniques'
                ? 'bg-gold-500 text-gallery-950 shadow-sm'
                : 'text-gallery-400 hover:text-gallery-200'
            }`}
          >
            📐 技法与光影材质拆解
          </button>
          <button
            onClick={() => setActiveTab('story')}
            className={`px-4 py-2 rounded-lg text-xs font-serif font-bold transition-all cursor-pointer ${
              activeTab === 'story'
                ? 'bg-gold-500 text-gallery-950 shadow-sm'
                : 'text-gallery-400 hover:text-gallery-200'
            }`}
          >
            📜 流派渊源与哲学
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Quote & Color Swatches Header */}
          <div className="p-4 rounded-xl bg-gallery-900/80 border border-gallery-800 space-y-4">
            <blockquote className="text-xs sm:text-sm font-serif italic text-gold-300 leading-relaxed">
              {style.quote}
            </blockquote>

            {/* Interactive Color Palette Swatches */}
            <div className="pt-3 border-t border-gallery-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-gallery-400">特征提取色卡 (点击一键复制 HEX):</span>
                {copiedHex && (
                  <span className="text-xs text-emerald-400 font-mono animate-pulse">
                    已复制 {copiedHex}!
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {style.colorPalette.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCopyHex(color.hex)}
                    className="p-2 rounded-lg bg-gallery-950 border border-gallery-800 hover:border-gold-500/50 flex items-center gap-2.5 transition-all text-left group/swatch cursor-pointer"
                  >
                    <span
                      className="w-6 h-6 rounded-md border border-white/20 shadow-inner group-hover/swatch:scale-110 transition-transform shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="overflow-hidden">
                      <div className="text-[11px] font-sans font-medium text-gallery-200 truncate">{color.name}</div>
                      <div className="text-[10px] font-mono text-gallery-400">{color.hex}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* TAB 1: Representative Artworks */}
          {activeTab === 'works' && (
            <div className="space-y-4">
              <h3 className="text-sm font-serif font-bold text-gallery-200 flex items-center gap-2">
                <Layers className="w-4 h-4 text-gold-400" />
                <span>精选代表画作 (点击图片进入全屏灯箱高清鉴赏)</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {style.representativeWorks.map((work) => (
                  <div
                    key={work.id}
                    onClick={() => {
                      playSpotlightClick();
                      onInspectArtwork(work, style);
                    }}
                    className="group/work relative rounded-xl overflow-hidden border border-gallery-800 bg-gallery-900 p-2 cursor-pointer hover:border-gold-500/60 transition-all shadow-md"
                  >
                    <div className="relative h-56 rounded-lg overflow-hidden bg-gallery-950">
                      <img
                        src={work.imageUrl}
                        alt={work.title}
                        className="w-full h-full object-cover group-hover/work:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/work:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white">
                        <ZoomIn className="w-6 h-6 text-gold-300" />
                        <span className="text-xs font-serif">全屏鉴赏</span>
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="text-sm font-serif font-bold text-gallery-100">{work.title}</h4>
                      <p className="text-xs text-gallery-400 mt-1 line-clamp-2">{work.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: AI Prompt Recipe */}
          {activeTab === 'prompts' && (
            <div className="space-y-6">
              {/* Full MJ Prompt Box */}
              <div className="p-4 rounded-xl bg-gallery-900 border border-gold-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-gold-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>Midjourney / Stable Diffusion 官方推荐提示词</span>
                  </span>
                  <button
                    onClick={() => handleCopyPrompt(style.promptKeywords.mjPrompt)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold-500 text-gallery-950 font-mono font-bold text-xs hover:bg-gold-400 transition-all cursor-pointer"
                  >
                    {copiedPrompt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPrompt ? '已复制' : '一键复制完整 Prompt'}</span>
                  </button>
                </div>
                <div className="p-3 rounded-lg bg-gallery-950 font-mono text-xs text-gallery-300 leading-relaxed border border-gallery-800 select-all">
                  {style.promptKeywords.mjPrompt}
                </div>
              </div>

              {/* Keyword Tags Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gallery-900 border border-gallery-800 space-y-2.5">
                  <h4 className="text-xs font-mono font-bold text-accent-emerald">正向风格关键词 (Positive Tags):</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {style.promptKeywords.positiveKeywords.map((tag, idx) => (
                      <span
                        key={idx}
                        onClick={() => handleCopyPrompt(tag)}
                        className="px-2.5 py-1 rounded-md bg-gallery-950 border border-gallery-700 text-gallery-300 text-xs font-mono hover:border-accent-emerald cursor-pointer"
                        title="点击复制"
                      >
                        +{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gallery-900 border border-gallery-800 space-y-2.5">
                  <h4 className="text-xs font-mono font-bold text-accent-crimson">负向过滤关键词 (Negative Tags):</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {style.promptKeywords.negativeKeywords.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-gallery-950 border border-gallery-800 text-gallery-400 text-xs font-mono"
                      >
                        -{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Techniques & Lighting */}
          {activeTab === 'techniques' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-gallery-900 border border-gallery-800 space-y-2">
                <span className="text-xs font-mono text-gold-400">🎨 媒介与材质 (Medium & Materials)</span>
                <p className="text-xs text-gallery-300 leading-relaxed font-sans">
                  {style.creationTechniques.medium}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gallery-900 border border-gallery-800 space-y-2">
                <span className="text-xs font-mono text-accent-cyan">🖌️ 笔触与肌理 (Brushwork & Texture)</span>
                <p className="text-xs text-gallery-300 leading-relaxed font-sans">
                  {style.creationTechniques.brushwork}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gallery-900 border border-gallery-800 space-y-2">
                <span className="text-xs font-mono text-accent-amber">💡 光影与明暗 (Lighting & Shadows)</span>
                <p className="text-xs text-gallery-300 leading-relaxed font-sans">
                  {style.creationTechniques.lighting}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gallery-900 border border-gallery-800 space-y-2">
                <span className="text-xs font-mono text-accent-violet">📐 空间构图法则 (Composition & Space)</span>
                <p className="text-xs text-gallery-300 leading-relaxed font-sans">
                  {style.creationTechniques.composition}
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: Story & Evolution */}
          {activeTab === 'story' && (
            <div className="p-5 rounded-xl bg-gallery-900 border border-gallery-800 space-y-4">
              <h3 className="text-base font-serif font-bold text-gallery-100">流派发源与艺术美学解构</h3>
              <p className="text-xs sm:text-sm text-gallery-300 leading-relaxed font-sans">
                {style.detailedDescription}
              </p>

              <div className="pt-3 border-t border-gallery-800 space-y-2">
                <h4 className="text-xs font-mono font-semibold text-gold-400">视觉特征要素总览:</h4>
                <ul className="space-y-1.5">
                  {style.visualKeyFeatures.map((feat, idx) => (
                    <li key={idx} className="text-xs text-gallery-300 flex items-start gap-2">
                      <span className="text-gold-500 font-mono">0{idx + 1}.</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
