import React, { useState } from 'react';
import { X, Palette, Copy, Check } from 'lucide-react';
import { ArtStyle } from '../types/art';
import { playSpotlightClick, playSuccessChime } from '../utils/audio';

interface PaletteInspectorModalProps {
  styles: ArtStyle[];
  isOpen: boolean;
  onClose: () => void;
}

export const PaletteInspectorModal: React.FC<PaletteInspectorModalProps> = ({
  styles,
  isOpen,
  onClose,
}) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyHex = (hex: string) => {
    playSpotlightClick();
    navigator.clipboard.writeText(hex);
    playSuccessChime();
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-gallery-950 border border-gold-500/40 rounded-2xl shadow-gallery-lg overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gallery-800 bg-gallery-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-gallery-100">
                全馆艺术色谱矩阵 (Master Color Palettes)
              </h2>
              <p className="text-xs text-gallery-400">汇聚各大流派核心色彩基因，点击色块一键复制 HEX 代码</p>
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
          {copiedHex && (
            <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono text-center animate-bounce">
              ✓ 已复制色值: {copiedHex}
            </div>
          )}

          <div className="space-y-4">
            {styles.map((style) => (
              <div key={style.id} className="p-4 rounded-xl bg-gallery-900 border border-gallery-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-gold-400 px-1.5 py-0.5 rounded bg-gold-500/10">
                      {style.roomNumber}
                    </span>
                    <h3 className="text-sm font-serif font-bold text-gallery-200">{style.title}</h3>
                  </div>
                  <span className="text-xs text-gallery-400 font-sans">{style.badge}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {style.colorPalette.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleCopyHex(color.hex)}
                      className="p-2 rounded-lg bg-gallery-950 border border-gallery-800/80 hover:border-gold-500 flex items-center gap-2.5 transition-all text-left group cursor-pointer"
                    >
                      <span
                        className="w-5 h-5 rounded border border-white/20 group-hover:scale-110 transition-transform shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div className="overflow-hidden">
                        <div className="text-[10px] font-sans text-gallery-300 truncate">{color.name}</div>
                        <div className="text-[10px] font-mono text-gallery-400">{color.hex}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
