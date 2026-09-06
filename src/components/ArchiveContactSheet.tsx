import React, { useState } from 'react';
import type { CinemaScene } from '../types/cinema';
import { playSpotlightClick } from '../utils/audio';

interface ArchiveContactSheetProps {
  scenes: CinemaScene[];
  onSelectScene: (sceneId: string) => void;
}

export const ArchiveContactSheet: React.FC<ArchiveContactSheetProps> = ({
  scenes,
  onSelectScene,
}) => {
  const [filter, setFilter] = useState<'all' | 'cyber' | 'brutalist' | 'editorial' | 'zen' | 'ghibli'>('all');
  const [sort, setSort] = useState<'scene' | 'duration' | 'title'>('scene');

  const filterOptions = [
    { id: 'all', label: 'ALL ARCHIVES' },
    { id: 'cyber', label: 'CYBER & NOCTURNAL' },
    { id: 'brutalist', label: 'MONUMENTAL ARCHITECTURE' },
    { id: 'editorial', label: 'SWISS EDITORIAL' },
    { id: 'zen', label: 'EASTERN ZEN' },
    { id: 'ghibli', label: 'HEALING CINEMA' },
  ];

  const filteredScenes = scenes.filter((s) => {
    if (filter === 'cyber') return s.id.includes('cyber') || s.cameraRig.mood.toLowerCase().includes('cyber');
    if (filter === 'brutalist') return s.id.includes('brutalist') || s.cameraRig.mood.toLowerCase().includes('brutalist');
    if (filter === 'editorial') return s.id.includes('editorial') || s.cameraRig.mood.toLowerCase().includes('editorial');
    if (filter === 'zen') return s.id.includes('zen') || s.cameraRig.mood.toLowerCase().includes('zen');
    if (filter === 'ghibli') return s.id.includes('ghibli') || s.cameraRig.mood.toLowerCase().includes('ghibli');
    return true;
  }).sort((a, b) => {
    if (sort === 'title') return a.title.localeCompare(b.title);
    if (sort === 'duration') return (b.durationSeconds || 0) - (a.durationSeconds || 0);
    return a.sceneNumber.localeCompare(b.sceneNumber);
  });

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-8 lg:py-12 text-[#F2F0E8]">
      {/* Editorial Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#F2F0E8]/10 pb-6 mb-8">
        <div>
          <div className="text-[11px] font-mono tracking-widest text-[#D8FF3E] uppercase mb-1">
            CONTACT SHEET // ARCHIVE INDEX
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight uppercase">
            CINEMATIC ARCHIVE
          </h2>
          <p className="text-xs text-[#8B887F] font-mono mt-1">
            {filteredScenes.length} / {scenes.length} SCENES LOADED · FILM CONTACT SHEET MODE
          </p>
        </div>

        {/* Filter Strip */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="text-[#8B887F] text-[10px] mr-1 hidden sm:inline">FILTER:</span>
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => {
                playSpotlightClick();
                setFilter(opt.id as any);
              }}
              className={`px-2.5 py-1 border transition-colors cursor-pointer ${
                filter === opt.id
                  ? 'border-[#D8FF3E] text-[#D8FF3E] bg-[#D8FF3E]/05 font-bold'
                  : 'border-[#F2F0E8]/10 text-[#8B887F] hover:text-[#F2F0E8] hover:border-[#F2F0E8]/30'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Film Contact Sheet Grid (No heavy cards, pure photographic tension) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {filteredScenes.map((scene, idx) => (
          <div
            key={scene.id}
            onClick={() => {
              playSpotlightClick();
              onSelectScene(scene.id);
            }}
            className="group cursor-pointer flex flex-col"
          >
            {/* Top Hairline & Index Number */}
            <div className="flex items-center justify-between text-[11px] font-mono text-[#8B887F] pb-2 border-b border-[#F2F0E8]/10">
              <span className="text-[#D8FF3E] font-bold group-hover:text-white transition-colors">
                {scene.sceneNumber}
              </span>
              <span className="truncate max-w-[180px] opacity-60">
                {scene.cameraRig.lens.split(' ')[0]}
              </span>
            </div>

            {/* Photographic Image Area with 150-250ms Hover Ease */}
            <div className="relative aspect-[16/10] bg-[#181815] border border-[#F2F0E8]/10 mt-2 overflow-hidden">
              <img
                src={scene.coverImage}
                alt={scene.title}
                className="w-full h-full object-cover transition-all duration-300 group-hover:scale-[1.025] group-hover:brightness-75"
                loading="lazy"
              />

              {/* Hover Overlay Reveal */}
              <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="self-end">
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-black/80 border border-[#D8FF3E] text-[#D8FF3E]">
                    VIEW SCENE
                  </span>
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-white uppercase">{scene.title}</div>
                  <div className="text-[10px] font-mono text-[#D8FF3E] mt-0.5">{scene.act}</div>
                </div>
              </div>
            </div>

            {/* Bottom Caption (Editorial Spec: Image and text separated without card wrapper) */}
            <div className="mt-2.5 flex items-baseline justify-between text-xs">
              <span className="font-medium text-[#F2F0E8] group-hover:text-[#D8FF3E] transition-colors">
                {scene.title}
              </span>
              <span className="text-[10px] font-mono text-[#8B887F] ml-2 shrink-0">
                {scene.durationSeconds || 24}s · 2.39:1
              </span>
            </div>
            <div className="text-[11px] text-[#8B887F] font-mono truncate mt-0.5">
              {scene.locationAndTime}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
