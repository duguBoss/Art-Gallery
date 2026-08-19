import React from 'react';
import { X, Sparkles, Check, ChevronDown, BookOpen } from 'lucide-react';
import type { Artwork, ArtStyle } from '../types/art';
import { playSpotlightClick, playSuccessChime } from '../utils/audio';

interface LightboxProps {
  artwork: Artwork | null;
  style: ArtStyle | null;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ artwork, style, onClose }) => {
  const [showPromptFootnote, setShowPromptFootnote] = React.useState(false);
  const [copiedPrompt, setCopiedPrompt] = React.useState(false);

  if (!artwork || !style) return null;

  const handleCopyPrompt = () => {
    playSpotlightClick();
    navigator.clipboard.writeText(style.promptKeywords.mjPrompt);
    playSuccessChime();
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-3 md:p-8 animate-fadeIn overflow-y-auto">
      <div className="absolute top-4 right-4 z-20 flex items-center gap-3">
        <button
          onClick={() => {
            playSpotlightClick();
            onClose();
          }}
          className="p-2.5 rounded-full bg-gallery-900/90 border border-gallery-700 text-gallery-300 hover:text-white hover:border-gold-500/60 transition-all cursor-pointer shadow-lg"
          title="关闭鉴赏 (Esc)"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="max-w-6xl w-full max-h-[92vh] flex flex-col items-center justify-center my-auto">
        <div className="relative w-full rounded-2xl overflow-hidden border-2 border-gold-500/30 shadow-gallery-lg bg-gallery-950 p-3 md:p-4 flex flex-col lg:flex-row gap-6">
          <div className="flex-1 relative max-h-[68vh] flex items-center justify-center rounded-xl overflow-hidden bg-black/60 p-1">
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              className="w-full h-auto max-h-[66vh] object-contain rounded shadow-2xl"
            />
          </div>

          <div className="lg:w-80 w-full flex flex-col justify-between space-y-4 text-left border-t lg:border-t-0 lg:border-l border-gallery-800/80 pt-4 lg:pt-0 lg:pl-5">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-gold-400 px-2 py-0.5 rounded bg-gold-500/10 border border-gold-500/20">
                  {style.roomNumber}
                </span>
                <span className="text-xs font-serif text-gallery-400">
                  {style.title} · {artwork.year}
                </span>
              </div>

              <h2 className="text-xl md:text-2xl font-serif font-black text-gallery-100">
                {artwork.title}
              </h2>

              <blockquote className="text-xs font-serif italic text-gold-300 border-l-2 border-gold-500/60 pl-3 leading-relaxed">
                {style.quote}
              </blockquote>

              <div className="space-y-1.5 pt-2">
                <span className="text-[11px] font-mono text-gallery-400 uppercase tracking-wider flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-gold-400" />
                  <span>画作赏析与艺术解读:</span>
                </span>
                <p className="text-xs text-gallery-300 leading-relaxed font-sans">
                  {artwork.description}
                </p>
              </div>

              <div className="pt-2">
                <span className="text-[11px] font-mono text-gallery-400 block mb-1.5">流派色调基因:</span>
                <div className="flex items-center gap-1.5">
                  {style.colorPalette.map((c, i) => (
                    <span
                      key={i}
                      className="w-5 h-5 rounded-full border border-gallery-700 shadow-inner"
                      style={{ backgroundColor: c.hex }}
                      title={`${c.name}: ${c.hex}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-gallery-800/80">
              <button
                onClick={() => setShowPromptFootnote(!showPromptFootnote)}
                className="text-[11px] font-mono text-gallery-400 hover:text-gold-300 flex items-center justify-between w-full transition-colors cursor-pointer py-1"
              >
                <span>✨ 创作者 AI 提示词参考 (点击展开)</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showPromptFootnote ? 'rotate-180' : ''}`} />
              </button>

              {showPromptFootnote && (
                <div className="mt-2 p-2.5 rounded-lg bg-gallery-900 border border-gallery-800 space-y-2 animate-fadeIn">
                  <div className="text-[10px] font-mono text-gallery-300 select-all line-clamp-3">
                    {style.promptKeywords.mjPrompt}
                  </div>
                  <button
                    onClick={handleCopyPrompt}
                    className="w-full py-1.5 rounded bg-gold-500/20 border border-gold-500/40 text-gold-300 hover:bg-gold-500 hover:text-gallery-950 font-mono text-[10px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                  >
                    {copiedPrompt ? <Check className="w-3 h-3 text-emerald-400" /> : <Sparkles className="w-3 h-3" />}
                    <span>{copiedPrompt ? '已复制 Prompt' : '一键复制 Prompt'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};