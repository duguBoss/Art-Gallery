import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Compass, Sparkles, Copy, Check } from 'lucide-react';
import { ArtStyle } from '../types/art';
import { playGalleryBell, playSpotlightClick, playSuccessChime } from '../utils/audio';

interface VirtualTourModalProps {
  styles: ArtStyle[];
  isOpen: boolean;
  onClose: () => void;
  onSelectStyle: (style: ArtStyle) => void;
}

export const VirtualTourModal: React.FC<VirtualTourModalProps> = ({
  styles,
  isOpen,
  onClose,
  onSelectStyle,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, styles.length]);

  if (!isOpen || styles.length === 0) return null;

  const currentStyle = styles[currentIndex] || styles[0];
  const currentWork = currentStyle.representativeWorks[0];

  const handleNext = () => {
    playSpotlightClick();
    playGalleryBell(500 + currentIndex * 20);
    setCurrentIndex((prev) => (prev + 1) % styles.length);
  };

  const handlePrev = () => {
    playSpotlightClick();
    playGalleryBell(480);
    setCurrentIndex((prev) => (prev - 1 + styles.length) % styles.length);
  };

  const handleCopyPrompt = () => {
    playSpotlightClick();
    navigator.clipboard.writeText(currentStyle.promptKeywords.mjPrompt);
    playSuccessChime();
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8 animate-fadeIn">
      {/* Top Controls */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gallery-900/90 border border-gold-500/40 text-gold-300 text-xs font-mono">
          <Compass className="w-3.5 h-3.5 animate-spin text-gold-400" />
          <span>VIRTUAL MUSEUM TOUR · 展厅漫步巡礼模式 ({currentIndex + 1} / {styles.length})</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden md:inline text-xs text-gallery-400 font-mono">支持键盘 [←] [→] 切换展厅</span>
          <button
            onClick={() => {
              playSpotlightClick();
              onClose();
            }}
            className="p-2.5 rounded-full bg-gallery-900 border border-gallery-700 text-gallery-300 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Tour Showcase Container */}
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center gap-8 z-10 pt-12 pb-6">
        {/* Left: Huge Framed Artwork */}
        <div className="flex-1 w-full relative rounded-2xl overflow-hidden border-2 border-gold-500/40 bg-gallery-950 p-2 shadow-gallery-lg">
          <div className="relative h-[45vh] lg:h-[65vh] rounded-xl overflow-hidden">
            <img
              src={currentWork?.imageUrl}
              alt={currentStyle.title}
              className="w-full h-full object-cover rounded shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gallery-950 via-transparent to-transparent opacity-60" />
          </div>
        </div>

        {/* Right: Curated Spec Placard */}
        <div className="lg:w-96 w-full space-y-5 text-left">
          <div>
            <span className="text-xs font-mono text-gold-400 px-2 py-0.5 rounded bg-gold-500/10 border border-gold-500/20">
              {currentStyle.roomNumber}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-white mt-2">
              {currentStyle.title}
            </h2>
            <p className="text-xs font-mono text-gallery-400">{currentStyle.englishTitle}</p>
          </div>

          <blockquote className="text-xs font-serif italic text-gold-300 border-l-2 border-gold-500 pl-3 leading-relaxed">
            {currentStyle.quote}
          </blockquote>

          <p className="text-xs text-gallery-300 leading-relaxed font-sans">
            {currentStyle.summary}
          </p>

          {/* Color swatches */}
          <div className="pt-2">
            <span className="text-[11px] font-mono text-gallery-400 block mb-2">特征色盘提取:</span>
            <div className="flex items-center gap-2">
              {currentStyle.colorPalette.map((c, i) => (
                <span
                  key={i}
                  className="w-6 h-6 rounded-full border border-gallery-700 shadow-inner"
                  style={{ backgroundColor: c.hex }}
                  title={`${c.name}: ${c.hex}`}
                />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 flex flex-col gap-2.5">
            <button
              onClick={handleCopyPrompt}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gold-500 text-gallery-950 font-serif font-bold text-xs hover:bg-gold-400 transition-all cursor-pointer shadow-glow-gold/40"
            >
              {copiedPrompt ? <Check className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              <span>{copiedPrompt ? '已复制 AI 提示词' : '复制此画风 Midjourney Prompt'}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onSelectStyle(currentStyle);
              }}
              className="w-full py-2.5 rounded-xl bg-gallery-900 border border-gallery-700 text-gallery-200 hover:text-gold-300 hover:border-gold-500/50 font-sans text-xs transition-all cursor-pointer"
            >
              查看深度解构展厅
            </button>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-gallery-800">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gallery-900 border border-gallery-700 text-gallery-300 hover:text-white cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-xs">上一展位</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gold-500/20 border border-gold-500/40 text-gold-300 hover:bg-gold-500/30 cursor-pointer"
            >
              <span className="text-xs">下一展位</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
