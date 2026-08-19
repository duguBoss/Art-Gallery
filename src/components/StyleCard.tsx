import React, { useState } from 'react';
import { Eye, Heart, Sparkles, Copy, Check, ArrowUpRight } from 'lucide-react';
import { ArtStyle } from '../types/art';
import { playSpotlightClick, playSuccessChime, playGalleryBell } from '../utils/audio';

interface StyleCardProps {
  style: ArtStyle;
  onSelect: (style: ArtStyle) => void;
}

export const StyleCard: React.FC<StyleCardProps> = ({ style, onSelect }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(style.likesCount);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSpotlightClick();
    if (isLiked) {
      setLikes(l => l - 1);
      setIsLiked(false);
    } else {
      setLikes(l => l + 1);
      setIsLiked(true);
    }
  };

  const handleQuickCopyPrompt = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(style.promptKeywords.mjPrompt);
    playSuccessChime();
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const firstWork = style.representativeWorks[0];

  return (
    <div
      onClick={() => {
        playGalleryBell(460);
        onSelect(style);
      }}
      className="group relative rounded-xl bg-gallery-900 border border-gallery-800 hover:border-gold-500/50 transition-all duration-500 hover:shadow-gallery cursor-pointer flex flex-col overflow-hidden"
    >
      {/* Top Artwork Showcase Frame */}
      <div className="relative h-60 w-full overflow-hidden bg-gallery-950">
        <img
          src={firstWork?.imageUrl}
          alt={style.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Ambient Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gallery-900 via-transparent to-black/40 opacity-70 group-hover:opacity-40 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="text-[10px] font-mono tracking-wider text-gold-300 px-2 py-0.5 rounded-full bg-gallery-950/80 border border-gold-500/30 backdrop-blur-sm">
            {style.roomNumber}
          </span>
          <span className="text-[10px] font-sans font-medium text-gallery-200 px-2.5 py-0.5 rounded-full bg-gallery-950/80 border border-gallery-700 backdrop-blur-sm">
            {style.badge}
          </span>
        </div>

        {/* Hover Quick Actions */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleQuickCopyPrompt}
            className="p-2 rounded-full bg-gallery-950/90 border border-gold-500/40 text-gold-300 hover:bg-gold-500 hover:text-gallery-950 transition-all shadow-lg"
            title="一键复制 Midjourney 提示词"
          >
            {copiedPrompt ? <Check className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handleLike}
            className={`p-2 rounded-full border transition-all shadow-lg ${
              isLiked 
                ? 'bg-accent-crimson border-accent-crimson text-white' 
                : 'bg-gallery-950/90 border-gallery-700 text-gallery-300 hover:text-accent-crimson'
            }`}
            title="收藏此流派"
          >
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Exhibition Placard Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="text-[11px] font-mono text-gallery-400 tracking-wider">
            {style.era}
          </div>
          <h3 className="text-lg font-serif font-bold text-gallery-100 group-hover:text-gold-300 transition-colors mt-0.5">
            {style.title}
          </h3>
          <p className="text-xs text-gallery-400 font-sans tracking-wide">
            {style.englishTitle}
          </p>
          <p className="text-xs text-gallery-300 leading-relaxed line-clamp-2 mt-2.5">
            {style.summary}
          </p>
        </div>

        {/* Color Swatch Preview & Inspect Trigger */}
        <div className="pt-3 border-t border-gallery-800/80 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {style.colorPalette.slice(0, 4).map((c, idx) => (
              <span
                key={idx}
                className="w-4 h-4 rounded-full border border-gallery-700"
                style={{ backgroundColor: c.hex }}
                title={`${c.name}: ${c.hex}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-1 text-xs font-serif text-gold-400 group-hover:text-gold-300 group-hover:translate-x-1 transition-all">
            <span>进入展厅</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
