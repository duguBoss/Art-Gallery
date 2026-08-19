import React, { useState } from 'react';
import type { ArtStyle, Artwork } from '../types/art';
import { ZoomIn, Heart, Eye } from 'lucide-react';
import { playSpotlightClick, playGalleryBell } from '../utils/audio';

interface ArtworkWallProps {
  styles: ArtStyle[];
  onInspectArtwork: (art: Artwork, style: ArtStyle) => void;
  onSelectStyle: (style: ArtStyle) => void;
}

export const ArtworkWall: React.FC<ArtworkWallProps> = ({
  styles,
  onInspectArtwork,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const allArtworks = React.useMemo(() => {
    const list: { artwork: Artwork; style: ArtStyle }[] = [];
    styles.forEach((s) => {
      s.representativeWorks.forEach((w) => {
        list.push({ artwork: w, style: s });
      });
    });
    return list;
  }, [styles]);

  const tags = React.useMemo(() => {
    const set = new Set<string>();
    allArtworks.forEach(({ artwork, style }) => {
      if (artwork.tag) set.add(artwork.tag);
      set.add(style.badge);
    });
    return ['all', ...Array.from(set)];
  }, [allArtworks]);

  const filteredArtworks = React.useMemo(() => {
    if (selectedTag === 'all') return allArtworks;
    return allArtworks.filter(
      ({ artwork, style }) =>
        artwork.tag === selectedTag || style.badge === selectedTag
    );
  }, [allArtworks, selectedTag]);

  const toggleLike = (e: React.MouseEvent, artId: string) => {
    e.stopPropagation();
    playSpotlightClick();
    setLikedMap((prev) => ({ ...prev, [artId]: !prev[artId] }));
  };

  return (
    <section className="py-10 md:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gallery-800">
        <div>
          <div className="text-xs font-mono tracking-widest text-gold-400 uppercase flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-gold-400" />
            <span>MASTER ART WALL · 全景画作长廊</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-black text-gallery-100 mt-1">
            沉浸式画作大图博览
          </h2>
          <p className="text-xs md:text-sm text-gallery-400 mt-1 max-w-xl">
            跨越流派与时空的视觉盛宴。点击任意画作即可放大高清鉴赏与深度审美解析。
          </p>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {tags.slice(0, 8).map((tag) => {
            const active = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => {
                  playSpotlightClick();
                  setSelectedTag(tag);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-sans whitespace-nowrap transition-all cursor-pointer ${
                  active
                    ? 'bg-gold-500 text-gallery-950 font-bold shadow-glow-gold'
                    : 'bg-gallery-900 border border-gallery-800 text-gallery-300 hover:text-white hover:border-gold-500/40'
                }`}
              >
                {tag === 'all' ? '全部画作' : tag}
              </button>
            );
          })}
        </div>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 mt-8">
        {filteredArtworks.map(({ artwork, style }) => {
          const isLiked = !!likedMap[artwork.id];

          return (
            <div
              key={artwork.id}
              onClick={() => {
                playGalleryBell(480);
                onInspectArtwork(artwork, style);
              }}
              className="group relative break-inside-avoid rounded-2xl overflow-hidden bg-gallery-900 border border-gallery-800/90 hover:border-gold-500/60 shadow-lg hover:shadow-gallery transition-all duration-500 cursor-pointer flex flex-col"
            >
              <div className="relative overflow-hidden bg-gallery-950">
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  loading="lazy"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-gallery-950 via-transparent to-black/30 opacity-60 group-hover:opacity-30 transition-opacity" />

                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="text-[10px] font-mono tracking-wider text-gold-300 px-2 py-0.5 rounded-full bg-gallery-950/85 border border-gold-500/30 backdrop-blur-md">
                    {style.title}
                  </span>
                  {artwork.tag && (
                    <span className="text-[10px] font-sans text-gallery-200 px-2 py-0.5 rounded-full bg-gallery-950/85 border border-gallery-700 backdrop-blur-md">
                      {artwork.tag}
                    </span>
                  )}
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="px-4 py-2 rounded-full bg-gallery-950/90 border border-gold-500/50 text-gold-300 text-xs font-serif font-semibold flex items-center gap-2 shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>点击进入画作鉴赏</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gallery-900 border-t border-gallery-800 flex items-center justify-between gap-3">
                <div className="overflow-hidden">
                  <h3 className="text-sm font-serif font-bold text-gallery-100 group-hover:text-gold-300 transition-colors truncate">
                    {artwork.title}
                  </h3>
                  <p className="text-xs text-gallery-400 line-clamp-1 mt-0.5 font-sans">
                    {artwork.description}
                  </p>
                </div>

                <button
                  onClick={(e) => toggleLike(e, artwork.id)}
                  className={`p-2 rounded-full border shrink-0 transition-all cursor-pointer ${
                    isLiked
                      ? 'bg-accent-crimson border-accent-crimson text-white'
                      : 'bg-gallery-950 border-gallery-700 text-gallery-400 hover:text-accent-crimson'
                  }`}
                  title="收藏画作"
                >
                  <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};