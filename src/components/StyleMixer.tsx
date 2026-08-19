import React, { useState } from 'react';
import { X, Sparkles, Wand2, Copy, Check, ArrowRight, Shuffle } from 'lucide-react';
import { ArtStyle, StyleMixResult } from '../types/art';
import { playSpotlightClick, playSuccessChime, playGalleryBell } from '../utils/audio';

interface StyleMixerProps {
  styles: ArtStyle[];
  isOpen: boolean;
  onClose: () => void;
}

export const StyleMixer: React.FC<StyleMixerProps> = ({ styles, isOpen, onClose }) => {
  const [styleAId, setStyleAId] = useState<string>(styles[0]?.id || '');
  const [styleBId, setStyleBId] = useState<string>(styles[1]?.id || '');
  const [mixResult, setMixResult] = useState<StyleMixResult | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  if (!isOpen) return null;

  const styleA = styles.find(s => s.id === styleAId) || styles[0];
  const styleB = styles.find(s => s.id === styleBId) || styles[1];

  const handleMix = () => {
    playGalleryBell(600);
    playSpotlightClick();

    const hybridTitle = `${styleA.title.slice(0, 2)}·${styleB.title.slice(0, 2)} 融合幻境`;
    const hybridEnTitle = `${styleA.englishTitle.split(' ')[0]} × ${styleB.englishTitle.split(' ')[0]} Fusion Aesthetic`;
    const combinedPrompt = `A visionary concept art fusing ${styleA.englishTitle} with ${styleB.englishTitle}, ${styleA.promptKeywords.positiveKeywords.slice(0, 3).join(', ')}, merged with ${styleB.promptKeywords.positiveKeywords.slice(0, 3).join(', ')}, masterpiece, unique hybrid style, 8k --ar 16:9 --v 6.1`;

    const combinedPalette = [
      ...styleA.colorPalette.slice(0, 3),
      ...styleB.colorPalette.slice(0, 2),
    ];

    setMixResult({
      styleA,
      styleB,
      hybridTitle,
      hybridEnTitle,
      conceptDescription: `将「${styleA.title}」的${styleA.visualKeyFeatures[0] || '核心构成'}，与「${styleB.title}」的${styleB.visualKeyFeatures[1] || '标志性色调'}进行跨次元结合，碰撞出兼具哲学深度与视觉张力的新概念美学。`,
      hybridPrompt: combinedPrompt,
      combinedPalette,
      curatorNotes: `建议在 AI 绘图或设计创作中，先以 ${styleA.title} 搭建空间构图骨架，再以 ${styleB.title} 的材质与光影进行局部渲染。`,
    });
  };

  const handleRandomMix = () => {
    playSpotlightClick();
    if (styles.length < 2) return;
    const idx1 = Math.floor(Math.random() * styles.length);
    let idx2 = Math.floor(Math.random() * styles.length);
    while (idx2 === idx1) {
      idx2 = Math.floor(Math.random() * styles.length);
    }
    setStyleAId(styles[idx1].id);
    setStyleBId(styles[idx2].id);
  };

  const handleCopyPrompt = () => {
    if (!mixResult) return;
    playSpotlightClick();
    navigator.clipboard.writeText(mixResult.hybridPrompt);
    playSuccessChime();
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-gallery-950 border border-gold-500/40 rounded-2xl shadow-gallery-lg overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gallery-800 bg-gallery-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-accent-violet/10 border border-accent-violet/30 text-accent-violet">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-gallery-100">
                风格灵感炼金炉 (Style Alchemist)
              </h2>
              <p className="text-xs text-gallery-400">跨流派美学碰撞与混合 AI Prompt 灵感生成器</p>
            </div>
          </div>
          <button
            onClick={() => {
              playSpotlightClick();
              onClose();
            }}
            className="p-2.5 rounded-full bg-gallery-800 border border-gallery-700 text-gallery-300 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Selectors Row */}
          <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
            {/* Style A */}
            <div className="md:col-span-5 p-4 rounded-xl bg-gallery-900 border border-gallery-800 space-y-3">
              <label className="text-xs font-mono font-semibold text-gold-400">母本风格 01 (Style Alpha):</label>
              <select
                value={styleAId}
                onChange={(e) => setStyleAId(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-gallery-950 border border-gallery-700 text-gallery-100 text-sm focus:outline-none focus:border-gold-500 cursor-pointer"
              >
                {styles.map(s => (
                  <option key={s.id} value={s.id}>{s.title} ({s.badge})</option>
                ))}
              </select>
              <p className="text-xs text-gallery-400 line-clamp-2">{styleA.summary}</p>
            </div>

            {/* Mixer Trigger */}
            <div className="md:col-span-1 flex flex-col items-center justify-center gap-2">
              <button
                onClick={handleRandomMix}
                className="p-2 rounded-full bg-gallery-800 border border-gallery-700 text-gallery-300 hover:text-gold-300 cursor-pointer"
                title="随机抽取两种流派"
              >
                <Shuffle className="w-4 h-4" />
              </button>
            </div>

            {/* Style B */}
            <div className="md:col-span-5 p-4 rounded-xl bg-gallery-900 border border-gallery-800 space-y-3">
              <label className="text-xs font-mono font-semibold text-accent-cyan">母本风格 02 (Style Beta):</label>
              <select
                value={styleBId}
                onChange={(e) => setStyleBId(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-gallery-950 border border-gallery-700 text-gallery-100 text-sm focus:outline-none focus:border-accent-cyan cursor-pointer"
              >
                {styles.map(s => (
                  <option key={s.id} value={s.id}>{s.title} ({s.badge})</option>
                ))}
              </select>
              <p className="text-xs text-gallery-400 line-clamp-2">{styleB.summary}</p>
            </div>
          </div>

          {/* Fusion Button */}
          <div className="text-center pt-2">
            <button
              onClick={handleMix}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-accent-violet via-purple-600 to-gold-500 text-white font-serif font-bold text-sm tracking-wider shadow-lg hover:opacity-90 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <Wand2 className="w-4 h-4" />
              <span>开始融合炼金</span>
            </button>
          </div>

          {/* Result Card */}
          {mixResult && (
            <div className="p-5 rounded-xl bg-gradient-to-br from-gallery-900 to-gallery-950 border border-gold-500/40 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-gallery-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono text-gold-400 uppercase tracking-wider">HYBRID CONCEPT // 融合产物</span>
                  <h3 className="text-xl font-serif font-bold text-gallery-100 mt-0.5">{mixResult.hybridTitle}</h3>
                  <span className="text-xs font-mono text-gallery-400">{mixResult.hybridEnTitle}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {mixResult.combinedPalette.map((c, i) => (
                    <span
                      key={i}
                      className="w-5 h-5 rounded-full border border-gallery-700 shadow-inner"
                      style={{ backgroundColor: c.hex }}
                      title={`${c.name}: ${c.hex}`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gallery-300 leading-relaxed font-sans">
                {mixResult.conceptDescription}
              </p>

              {/* Hybrid Prompt */}
              <div className="p-4 rounded-lg bg-gallery-950 border border-gallery-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-gold-400 font-semibold">生成混合 AI 提示词 (Midjourney / SD):</span>
                  <button
                    onClick={handleCopyPrompt}
                    className="flex items-center gap-1 px-3 py-1 rounded bg-gold-500 text-gallery-950 font-mono text-xs font-bold hover:bg-gold-400 transition-all cursor-pointer"
                  >
                    {copiedPrompt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPrompt ? '已复制' : '复制 Prompt'}</span>
                  </button>
                </div>
                <div className="font-mono text-xs text-gallery-300 leading-relaxed select-all">
                  {mixResult.hybridPrompt}
                </div>
              </div>

              {/* Curator Advice */}
              <div className="text-xs text-gallery-400 italic bg-gallery-900/60 p-3 rounded border-l-2 border-gold-500">
                💡 策展人建议: {mixResult.curatorNotes}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
