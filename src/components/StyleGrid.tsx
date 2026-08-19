import React from 'react';
import { ArtStyle, HallCategory, HallInfo } from '../types/art';
import { StyleCard } from './StyleCard';
import { EXHIBITION_HALLS } from '../data/stylesData';
import { playSpotlightClick, playGalleryBell } from '../utils/audio';

interface StyleGridProps {
  styles: ArtStyle[];
  selectedHall: HallCategory;
  onSelectHall: (hall: HallCategory) => void;
  onSelectStyle: (style: ArtStyle) => void;
  searchQuery: string;
}

export const StyleGrid: React.FC<StyleGridProps> = ({
  styles,
  selectedHall,
  onSelectHall,
  onSelectStyle,
  searchQuery,
}) => {
  const currentHallInfo = EXHIBITION_HALLS.find(h => h.id === selectedHall) || EXHIBITION_HALLS[0];

  return (
    <section id="exhibition-halls" className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Exhibition Hall Tabs Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-gallery-800">
          <div>
            <div className="text-xs font-mono tracking-widest text-gold-400 uppercase">
              EXHIBITION GALLERIES · 分馆巡礼
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gallery-100 mt-1">
              {currentHallInfo.name}
            </h2>
            <p className="text-xs md:text-sm text-gallery-400 mt-1 max-w-xl">
              {currentHallInfo.description}
            </p>
          </div>

          {/* Hall Tab Switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {EXHIBITION_HALLS.map((hall) => {
              const active = selectedHall === hall.id;
              return (
                <button
                  key={hall.id}
                  onClick={() => {
                    playSpotlightClick();
                    playGalleryBell(500);
                    onSelectHall(hall.id);
                  }}
                  className={`px-3.5 py-2 rounded-full text-xs font-sans whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? 'bg-gold-500 text-gallery-950 font-bold shadow-glow-gold'
                      : 'bg-gallery-900 border border-gallery-700/80 text-gallery-300 hover:text-white hover:border-gold-500/40'
                  }`}
                >
                  {hall.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Results Filter Banner if searching */}
        {searchQuery && (
          <div className="mt-6 p-3.5 rounded-lg bg-gallery-900/60 border border-gold-500/30 flex items-center justify-between">
            <span className="text-xs text-gallery-300">
              正在搜索关键词: <strong className="text-gold-300">“{searchQuery}”</strong>（共找到 {styles.length} 个流派）
            </span>
          </div>
        )}

        {/* Gallery Placard Grid */}
        {styles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8">
            {styles.map((style) => (
              <StyleCard key={style.id} style={style} onSelect={onSelectStyle} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gallery-900/40 rounded-2xl border border-gallery-800 mt-8">
            <div className="w-12 h-12 mx-auto rounded-full bg-gallery-800 flex items-center justify-center text-gallery-400 mb-3">
              🏛️
            </div>
            <h3 className="text-base font-serif font-bold text-gallery-200">暂未收录该流派作品</h3>
            <p className="text-xs text-gallery-400 mt-1 max-w-sm mx-auto">
              您可以尝试更换搜索词，或点击右上角“投稿”为本馆推荐该流派。
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
