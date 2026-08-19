import React from 'react';
import { ArrowUpRight, Heart } from 'lucide-react';
import type { ArtStyle } from '../types/art';
import { playSpotlightClick, playGalleryBell } from '../utils/audio';

interface StyleCardProps {
  style: ArtStyle;
  onSelect: (style: ArtStyle) => void;
}

export const StyleCard: React.FC<StyleCardProps> = ({ style, onSelect }) => {
  const [isLiked, setIsLiked] = React.useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSpotlightClick();
    setIsLiked(!isLiked);
  };

  const primaryWork = style.representativeWorks[0];
  const secondaryWorks = style.representativeWorks.slice(1, 3);

  return (
    <div
      onClick={() => {
        playGalleryBell(460);
        onSelect(style);
      }}
      className="group relative rounded-2xl bg-gallery-900 border border-gallery-800 hover:border-gold-500/50 transition-all duration-500 hover:shadow-gallery cursor-pointer flex flex-col overflow-hidden"
    >
      <div className="relative w-full overflow-hidden bg-gallery-950 p-2.5 space-y-2">
        <div className="relative h-56 rounded-xl overflow-hidden">
          <img
            src={primaryWork?.imageUrl}
            alt={style.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gallery-950 via-transparent to-black/30 opacity-60 group-hover:opacity-30 transition-opacity" />

          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
            <span className="text-[10px] font-mono tracking-wider text-gold-300 px-2 py-0.5 rounded-full bg-gallery-950/85 border border-gold-500/30 backdrop-blur-sm">
              {style.roomNumber}
            </span>
            <span className="text-[10px] font-sans font-medium text-gallery-200 px-2.5 py-0.5 rounded-full bg-gallery-950/85 border border-gallery-700 backdrop-blur-sm">
              {style.badge}
            </span>
          </div>

          <button
            onClick={handleLike}
            className={`absolute bottom-2.5 right-2.5 p-2 rounded-full border transition-all shadow-lg cursor-pointer ${
              isLiked
                ? 'bg-accent-crimson border-accent-crimson text-white'
                : 'bg-gallery-950/85 border-gallery-700 text-gallery-300 hover:text-accent-crimson'
            }`}
            title="收藏该流派"
          >
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {secondaryWorks.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {secondaryWorks.map((work) => (
              <div key={work.id} className="relative h-20 rounded-lg overflow-hidden border border-gallery-800/80">
                <img
                  src={work.imageUrl}
                  alt={work.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute bottom-1 left-1 right-1 text-[9px] font-sans text-gallery-200 bg-gallery-950/80 px-1 py-0.5 rounded truncate backdrop-blur-xs">
                  {work.title}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

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
            <span>浏览流派画展</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
};