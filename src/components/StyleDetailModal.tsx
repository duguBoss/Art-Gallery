import React, { useState } from 'react';
import { X, Layers, ZoomIn, Share2, ChevronDown, Sparkles, Check, Clapperboard, Video } from 'lucide-react';
import type { ArtStyle, Artwork } from '../types/art';
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
  const [activeTab, setActiveTab] = useState<'gallery' | 'critique' | 'scenarios' | 'techniques'>('gallery');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [showPromptBox, setShowPromptBox] = useState(false);
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

  const handleShare = () => {
    playSpotlightClick();
    navigator.clipboard.writeText(window.location.href);
    playSuccessChime();
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyPrompt = () => {
    playSpotlightClick();
    navigator.clipboard.writeText(style.promptKeywords.mjPrompt);
    playSuccessChime();
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-gallery-950 border border-gold-500/40 rounded-2xl shadow-gallery-lg overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="p-5 sm:p-6 border-b border-gallery-800 bg-gallery-900/90 flex items-start justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-mono font-semibold text-gold-400 px-2 py-0.5 rounded bg-gold-500/10 border border-gold-500/20">
                {style.roomNumber}
              </span>
              <span className="text-xs font-mono text-gallery-400">{style.era}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-gallery-100 mt-1">
              {style.title} 专题画展
            </h2>
            <p className="text-xs sm:text-sm text-gallery-400 font-sans">{style.englishTitle}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-full bg-gallery-800 border border-gallery-700 text-gallery-300 hover:text-white transition-all cursor-pointer"
              title="分享展厅链接"
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

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 px-6 pt-3 pb-2 border-b border-gallery-800 bg-gallery-900/50 shrink-0 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-2 rounded-lg text-xs font-serif font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'gallery'
                ? 'bg-gold-500 text-gallery-950 shadow-sm'
                : 'text-gallery-400 hover:text-gallery-200'
            }`}
          >
            🖼️ 专题画作大展 ({style.representativeWorks.length}幅精选)
          </button>
          <button
            onClick={() => setActiveTab('scenarios')}
            className={`px-4 py-2 rounded-lg text-xs font-serif font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'scenarios'
                ? 'bg-gold-500 text-gallery-950 shadow-sm'
                : 'text-gallery-400 hover:text-gold-300'
            }`}
          >
            <Clapperboard className="w-3.5 h-3.5" />
            <span>🎬 商业视频与场景赋能</span>
          </button>
          <button
            onClick={() => setActiveTab('critique')}
            className={`px-4 py-2 rounded-lg text-xs font-serif font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'critique'
                ? 'bg-gold-500 text-gallery-950 shadow-sm'
                : 'text-gallery-400 hover:text-gallery-200'
            }`}
          >
            📜 流派美学与深度赏析
          </button>
          <button
            onClick={() => setActiveTab('techniques')}
            className={`px-4 py-2 rounded-lg text-xs font-serif font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'techniques'
                ? 'bg-gold-500 text-gallery-950 shadow-sm'
                : 'text-gallery-400 hover:text-gallery-200'
            }`}
          >
            📐 技法与光影材质剖析
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Aesthetic Quote & Color Moods Banner */}
          <div className="p-4 rounded-xl bg-gallery-900/80 border border-gallery-800 space-y-4">
            <blockquote className="text-xs sm:text-sm font-serif italic text-gold-300 leading-relaxed">
              {style.quote}
            </blockquote>

            <div className="pt-3 border-t border-gallery-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-gallery-400">流派专属色彩谱系:</span>
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

          {/* TAB 1: Visual Exhibition Gallery */}
          {activeTab === 'gallery' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {style.representativeWorks.map((work) => (
                  <div
                    key={work.id}
                    onClick={() => {
                      playSpotlightClick();
                      onInspectArtwork(work, style);
                    }}
                    className="group/work relative rounded-xl overflow-hidden border border-gallery-800 bg-gallery-900 p-2.5 cursor-pointer hover:border-gold-500/60 transition-all shadow-md flex flex-col justify-between"
                  >
                    <div className="relative h-60 rounded-lg overflow-hidden bg-gallery-950">
                      <img
                        src={work.imageUrl}
                        alt={work.title}
                        className="w-full h-full object-cover group-hover/work:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/work:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white">
                        <ZoomIn className="w-6 h-6 text-gold-300" />
                        <span className="text-xs font-serif font-semibold">全屏高清鉴赏</span>
                      </div>

                      {work.tag && (
                        <span className="absolute top-2 left-2 text-[10px] font-mono text-gallery-200 bg-gallery-950/80 px-2 py-0.5 rounded border border-gallery-700">
                          {work.tag}
                        </span>
                      )}
                    </div>
                    <div className="pt-3 px-1">
                      <h4 className="text-sm font-serif font-bold text-gallery-100 group-hover/work:text-gold-300 transition-colors">
                        {work.title}
                      </h4>
                      <p className="text-xs text-gallery-400 mt-1 line-clamp-2">{work.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Commercial Video & Creative Scenarios */}
          {activeTab === 'scenarios' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gallery-900 border border-gold-500/30">
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-gold-400" />
                  <h3 className="text-sm font-serif font-bold text-gallery-100">
                    该艺术流派在 9 大商业场景中的实战落地价值
                  </h3>
                </div>
                <p className="text-xs text-gallery-400 mt-1 font-sans">
                  艺术是最高级的内容包装。将此流派的美学基因注入视频创作，可让作品具备极高的风格辨识度与情感穿透力。
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {style.appliedScenarios?.map((app, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-gallery-900 border border-gallery-800 space-y-2.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-gold-500/20 border border-gold-500/30 text-gold-300 font-mono text-xs font-bold">
                        {app.scenarioName}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[11px] font-mono text-gallery-400">💡 推荐落地项目/用例:</div>
                      <p className="text-xs text-gallery-200 leading-relaxed font-sans">{app.useCase}</p>
                    </div>

                    <div className="space-y-1 pt-1 border-t border-gallery-800/80">
                      <div className="text-[11px] font-mono text-accent-cyan">🎥 镜头与动态美学建议:</div>
                      <p className="text-xs text-gallery-300 leading-relaxed font-sans">{app.cameraAdvice}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Critique */}
          {activeTab === 'critique' && (
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

          {/* TAB 4: Techniques */}
          {activeTab === 'techniques' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-gallery-900 border border-gallery-800 space-y-2">
                <span className="text-xs font-mono text-gold-400">🎨 媒介与画布材质</span>
                <p className="text-xs text-gallery-300 leading-relaxed font-sans">
                  {style.creationTechniques.medium}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gallery-900 border border-gallery-800 space-y-2">
                <span className="text-xs font-mono text-accent-cyan">🖌️ 笔触与构线肌理</span>
                <p className="text-xs text-gallery-300 leading-relaxed font-sans">
                  {style.creationTechniques.brushwork}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gallery-900 border border-gallery-800 space-y-2">
                <span className="text-xs font-mono text-accent-amber">💡 空间光影与明暗</span>
                <p className="text-xs text-gallery-300 leading-relaxed font-sans">
                  {style.creationTechniques.lighting}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gallery-900 border border-gallery-800 space-y-2">
                <span className="text-xs font-mono text-accent-violet">📐 空间构图法则</span>
                <p className="text-xs text-gallery-300 leading-relaxed font-sans">
                  {style.creationTechniques.composition}
                </p>
              </div>
            </div>
          )}

          {/* Collapsible Prompt Tool */}
          <div className="pt-2">
            <button
              onClick={() => setShowPromptBox(!showPromptBox)}
              className="text-xs font-mono text-gallery-400 hover:text-gold-300 flex items-center justify-between w-full p-3 rounded-lg bg-gallery-900/60 border border-gallery-800 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>AI 创作者参考配方与关键词 (点击展开)</span>
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showPromptBox ? 'rotate-180' : ''}`} />
            </button>

            {showPromptBox && (
              <div className="mt-3 p-4 rounded-xl bg-gallery-900 border border-gallery-800 space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-gold-400">Midjourney / SD 推荐 Prompt:</span>
                  <button
                    onClick={handleCopyPrompt}
                    className="flex items-center gap-1 px-3 py-1 rounded bg-gold-500 text-gallery-950 font-mono text-xs font-bold hover:bg-gold-400 transition-all cursor-pointer"
                  >
                    {copiedPrompt ? <Check className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
                    <span>{copiedPrompt ? '已复制' : '复制 Prompt'}</span>
                  </button>
                </div>
                <div className="p-3 rounded-lg bg-gallery-950 font-mono text-xs text-gallery-300 leading-relaxed select-all">
                  {style.promptKeywords.mjPrompt}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};