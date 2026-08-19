import React from 'react';
import { EXHIBITION_HALLS } from '../data/stylesData';
import type { ArtStyle, HallCategory } from '../types/art';
import { StyleCard } from './StyleCard';
import { Eye, Cpu, Compass, Boxes, Sparkles, LayoutGrid } from 'lucide-react';
import { playSpotlightClick } from '../utils/audio';

interface StyleGridProps {
  styles: ArtStyle[];
  selectedHall: HallCategory;
  onSelectHall: (hall: HallCategory) => void;
  onSelectStyle: (style: ArtStyle) => void;
  searchQuery: string;
}

const HALL_ICONS: Record<string, React.FC<{ className?: string }>> = {
  LayoutGrid,
  Eye,
  Cpu,
  Compass,
  Boxes,
  Sparkles,
};

export const StyleGrid: React.FC<StyleGridProps> = ({
  styles,
  selectedHall,
  onSelectHall,
  onSelectStyle,
  searchQuery,
}) => {
  const currentHallInfo = EXHIBITION_HALLS.find((h) => h.id === selectedHall) || EXHIBITION_HALLS[0];

  return (
    <section className="py-10 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Museum Hall Selection Navigation Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gallery-800">
        <div>
          <div className="text-xs font-mono tracking-widest text-gold-400 uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
            <span>EXHIBITION GALLERIES · 分馆巡礼</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-black text-gallery-100 mt-1">
            {currentHallInfo.name}
          </h2>
          <p className="text-xs md:text-sm text-gallery-400 mt-1 max-w-xl">
            {currentHallInfo.description}
          </p>
        </div>

        {/* Hall Filter Tabs Styled as Museum Archway Badges */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {EXHIBITION_HALLS.map((hall) => {
            const Icon = HALL_ICONS[hall.iconName] || LayoutGrid;
            const active = selectedHall === hall.id;

            return (
              <button
                key={hall.id}
                onClick={() => {
                  playSpotlightClick();
                  onSelectHall(hall.id);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-serif transition-all whitespace-nowrap cursor-pointer border ${
                  active
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-gallery-950 font-bold border-gold-400 shadow-glow-gold'
                    : 'bg-gallery-900 border-gallery-800 text-gallery-300 hover:text-white hover:border-gold-500/40'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-gallery-950' : 'text-gold-400'}`} />
                <span>{hall.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Styles Grid Cards */}
      {styles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8">
          {styles.map((style) => (
            <StyleCard
              key={style.id}
              style={style}
              onSelect={onSelectStyle}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gallery-900/40 rounded-2xl border border-gallery-800 my-8">
          <p className="text-base text-gallery-300 font-serif">未检索到与 “{searchQuery}” 匹配的艺术流派藏品</p>
          <p className="text-xs text-gallery-400 mt-1">请尝试搜索其他流派名称、画作名称或美学关键词</p>
        </div>
      )}
    </section>
  );
};