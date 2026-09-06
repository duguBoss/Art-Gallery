import React from 'react';
import type { CinemaScene } from '../types/cinema';
import { playSpotlightClick } from '../utils/audio';
import { Bookmark, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

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
  const { lang, t } = useLanguage();
  const savedScenes = allScenes.filter((s) => savedSceneIds.includes(s.id));

  const curatedDossiers = [
    {
      id: 'dossier-01',
      num: 'DOSSIER 01',
      title: lang === 'zh' ? 'LONELINESS IN BLUE (蓝调孤独)' : 'LONELINESS IN BLUE',
      desc: lang === 'zh'
        ? '雨夜、低调布光、青色与琥珀色反差、风衣剪影的孤独漫步。'
        : 'Nocturnal rain, low-key lighting, cyan & amber contrast, solitary trench-coat figures.',
      sceneCount: 24,
      tags: ['CYBER', 'LOW-KEY', 'ANAMORPHIC', 'RAIN'],
    },
    {
      id: 'dossier-02',
      num: 'DOSSIER 02',
      title: lang === 'zh' ? 'MONOLITHIC BRUTALISM (粗野巨构)' : 'MONOLITHIC BRUTALISM',
      desc: lang === 'zh'
        ? '凹槽混凝土巨柱、极端尺度震慑（5% 人类 vs 95% 建筑体量）、单一神圣大教堂光柱。'
        : 'Fluted concrete pillars, extreme scale shock (5% human vs 95% architecture), single cathedral God Rays.',
      sceneCount: 18,
      tags: ['BRUTALISM', 'SCALE-SHOCK', 'GOD-RAY', 'RAW'],
    },
    {
      id: 'dossier-03',
      num: 'DOSSIER 03',
      title: lang === 'zh' ? 'POETRY OF WHITE SPACE (留白诗性)' : 'POETRY OF WHITE SPACE',
      desc: lang === 'zh'
        ? '78% 极致留白、北向柔和漫射天光、高反差衬线字体与版面呼吸感。'
        : '78% negative space, north-facing soft window light, high-contrast serif typography.',
      sceneCount: 12,
      tags: ['EDITORIAL', 'NEGATIVE-SPACE', 'SWISS-GRID'],
    },
  ];

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-8 lg:py-12 text-[#F2F0E8]">
      {/* Header */}
      <div className="border-b border-[#F2F0E8]/10 pb-6 mb-8">
        <div className="text-[11px] font-mono tracking-widest text-[#D8FF3E] uppercase mb-1">
          {t('dossier.tag')}
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight uppercase">
          {t('dossier.title')}
        </h2>
        <p className="text-xs text-[#8B887F] font-mono mt-1">
          {t('dossier.subtitle')}
        </p>
      </div>

      {/* User Personal Saved Dossier Section */}
      <div className="mb-14 bg-[#141412] border border-[#F2F0E8]/10 p-6">
        <div className="flex items-center justify-between border-b border-[#F2F0E8]/10 pb-3 mb-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-[#D8FF3E]">
            <Bookmark className="w-4 h-4" />
            <span className="font-bold">{t('dossier.myTitle')}</span>
          </div>
          <span className="text-[#8B887F]">{t('dossier.scenesCount', { count: savedScenes.length })}</span>
        </div>

        {savedScenes.length === 0 ? (
          <div className="py-8 text-center text-xs font-mono text-[#8B887F]">
            {t('dossier.empty')}
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
                    alt={lang === 'zh' ? scene.title : (scene.titleEn || scene.title)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-3 flex items-center justify-between text-xs font-mono">
                  <div>
                    <div className="text-[#D8FF3E]">{scene.sceneNumber}</div>
                    <div className="font-medium text-[#F2F0E8] truncate max-w-[160px]">
                      {lang === 'zh' ? scene.title : (scene.titleEn || scene.title)}
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveFromDossier(scene.id)}
                    className="text-[10px] text-[#8B887F] hover:text-red-400 border border-[#F2F0E8]/10 px-2 py-0.5"
                  >
                    {t('dossier.remove')}
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
          {lang === 'zh' ? '精选大师研究案卷' : 'MASTER ARCHIVE DOSSIERS'}
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
                  <span className="text-[#8B887F]">{dos.sceneCount} {lang === 'zh' ? '部关联分镜' : 'SCENES'}</span>
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
                  <span>{t('dossier.open')}</span>
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
