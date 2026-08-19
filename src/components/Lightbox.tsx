import React from 'react';
import { X, Sparkles, Check } from 'lucide-react';
import { Artwork, ArtStyle } from '../types/art';
import { playSpotlightClick, playSuccessChime } from '../utils/audio';

interface LightboxProps {
  artwork: Artwork | null;
  style: ArtStyle | null;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ artwork, style, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!artwork || !style) return null;

  const handleCopyPrompt = () => {
    playSpotlightClick();
    navigator.clipboard.writeText(style.promptKeywords.mjPrompt);
    playSuccessChime();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-8">
      {/* Top action bar */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-3">
        <button
          onClick={handleCopyPrompt}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gallery-900/80 border border-gold-500/30 text-gold-300 hover:bg-gold-500/20 text-xs font-mono transition-all"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Sparkles className="w-3.5 h-3.5" />}
          <span>{copied ? '已复制 AI 提示词' : '复制此画风 Midjourney 提示词'}</span>
        </button>
        <button
          onClick={() => {
            playSpotlightClick();
            onClose();
          }}
          className="p-2.5 rounded-full bg-gallery-800/80 border border-gallery-700 text-gallery-300 hover:text-white hover:border-gold-500/50 transition-all cursor-pointer"
          title="关闭 (Esc)"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="max-w-6xl w-full max-h-[90vh] flex flex-col items-center justify-center">
        {/* Frame & Artwork */}
        <div className="relative rounded-lg overflow-hidden border-2 border-gold-500/30 shadow-2xl bg-gallery-950 p-2 md:p-3">
          <div className="relative max-h-[70vh] overflow-hidden rounded">
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              className="w-full h-auto max-h-[70vh] object-contain rounded shadow-inner"
            />
          </div>

          {/* Exhibition Placard at bottom */}
          <div className="mt-3 pt-3 border-t border-gallery-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3 px-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-gold-500 tracking-wider px-2 py-0.5 rounded bg-gold-500/10 border border-gold-500/20">
                  {style.roomNumber}
                </span>
                <span className="text-xs text-gallery-400 font-serif">{style.title} · {artwork.year}</span>
              </div>
              <h3 className="text-base md:text-lg font-serif font-bold text-gallery-100 mt-0.5">{artwork.title}</h3>
              <p className="text-xs text-gallery-400 mt-0.5 max-w-2xl">{artwork.description}</p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[11px] font-mono text-gallery-400">馆藏编号: #{artwork.id.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
