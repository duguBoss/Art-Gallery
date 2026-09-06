import React from 'react';
import type { CinemaScene } from '../types/cinema';
import { playSpotlightClick } from '../utils/audio';
import { Bookmark, ArrowRight, Folder } from 'lucide-react';

interface DossiersViewProps {
  savedSceneIds: string[];
  allScenes: CinemaScene[];
  onSelectScene: (sceneId: string) => void;
  onRemoveFromDossier: (sceneId: string) => void;
}

export const DossiersView: React.FC<DossiersViewProps> = ({
  savedSceneIds,
  allScenes,
  onSelectScene,
  onRemoveFromDossier,
}) => {
  const savedScenes = allScenes.filter((s) => savedSceneIds.includes(s.id));

  const curatedDossiers = [
    {
      id: 'dossier-01',
      num: 'DOSSIER 01',
      title: 'LONELINESS IN BLUE (蓝调孤独)',
      desc: 'Nocturnal rain, low-key lighting, cyan & amber contrast, solitary trench-coat figures.',
      sceneCount: 24,
      tags: ['CYBER', 'LOW-KEY', 'ANAMORPHIC', 'RAIN'],
    },
    {
      id: 'dossier-02',
      num: 'DOSSIER 02',
      title: 'MONOLITHIC BRUTALISM (粗野巨构)',
      desc: 'Fluted concrete pillars, extreme scale shock (5% human vs 95% architecture), single cathedral God Rays.',
      sceneCount: 18,
      tags: ['BRUTALISM', 'SCALE-SHOCK', 'GOD-RAY', 'RAW'],
    },
    {
      id: 'dossier-03',
      num: 'DOSSIER 03',
      title: 'POETRY OF WHITE SPACE (留白诗性)',
      desc: '78% negative space, north-facing soft window light, high-contrast serif typography.',
      sceneCount: 12,
      tags: ['EDITORIAL', 'NEGATIVE-SPACE', 'SWISS-GRID'],
    },
  ];

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-8 lg:py-12 text-[#F2F0E8]">
      {/* Header */}
      <div className="border-b border-[#F2F0E8]/10 pb-6 mb-8">
        <div className="text-[11px] font-mono tracking-widest text-[#D8FF3E] uppercase mb-1">
          RESEARCH NOTEBOOK // DOSSIER ARCHIVE
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight uppercase">
          CURATED DOSSIERS
        </h2>
        <p className="text-xs text-[#8B887F] font-mono mt-1">
          Digital research portfolios grouping film scenes, optic syntax, and visual DNA notes.
        </p>
      </div>

      {/* User Personal Saved Dossier Section */}
      <div className="mb-14 bg-[#141412] border border-[#F2F0E8]/10 p-6">
        <div className="flex items-center justify-between border-b border-[#F2F0E8]/10 pb-3 mb-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-[#D8FF3E]">
            <Bookmark className="w-4 h-4" />
            <span className="font-bold">MY ACTIVE RESEARCH DOSSIER</span>
          </div>
          <span className="text-[#8B887F]">{savedScenes.length} SAVED SCENES</span>
        </div>

        {savedScenes.length === 0 ? (
          <div className="py-8 text-center text-xs font-mono text-[#8B887F]">
            NO SCENES SAVED YET. BROWSE ARCHIVE AND CLICK &quot;ADD TO DOSSIER&quot; TO CURATE YOUR PERSONAL RESEARCH.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {savedScenes.map((scene) => (
              <div
                key={scene.id}
                className="group relative border border-[#F2F0E8]/10 bg-[#181815] overflow-hidden"
              >
                <div
                  onClick={() => onSelectScene(scene.id)}
                  className="aspect-video cursor-pointer overflow-hidden"
                >
                  <img
                    src={scene.coverImage}
                    alt={scene.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-3 flex items-center justify-between text-xs font-mono">
                  <div>
                    <div className="text-[#D8FF3E]">{scene.sceneNumber}</div>
                    <div className="font-medium text-[#F2F0E8] truncate max-w-[160px]">{scene.title}</div>
                  </div>
                  <button
                    onClick={() => onRemoveFromDossier(scene.id)}
                    className="text-[10px] text-[#8B887F] hover:text-red-400 border border-[#F2F0E8]/10 px-2 py-0.5"
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Curated Pre-built Academic Research Dossiers */}
      <div>
        <div className="text-xs font-mono text-[#8B887F] uppercase mb-4 tracking-wider">
          MASTER ARCHIVE DOSSIERS
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {curatedDossiers.map((dos) => (
            <div
              key={dos.id}
              className="border border-[#F2F0E8]/10 bg-[#161614] p-6 flex flex-col justify-between hover:border-[#D8FF3E] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#D8FF3E] mb-2">
                  <span>{dos.num}</span>
                  <span className="text-[#8B887F]">{dos.sceneCount} SCENES</span>
                </div>
                <h3 className="text-lg font-bold text-[#F2F0E8] uppercase tracking-tight">
                  {dos.title}
                </h3>
                <p className="text-xs text-[#8B887F] leading-relaxed mt-2 font-sans">
                  {dos.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#F2F0E8]/10">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {dos.tags.map((t) => (
                    <span key={t} className="text-[9px] font-mono px-1.5 py-0.5 border border-[#F2F0E8]/10 text-[#8B887F]">
                      {t}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => {
                    playSpotlightClick();
                    if (allScenes[0]) onSelectScene(allScenes[0].id);
                  }}
                  className="w-full py-2 border border-[#D8FF3E] text-[#D8FF3E] hover:bg-[#D8FF3E] hover:text-[#11110F] text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>STUDY DOSSIER</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
