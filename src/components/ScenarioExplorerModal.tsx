import React, { useState } from 'react';
import { X, Clapperboard, Film, Tv, Activity, Eye, Sparkles, ShoppingBag, Gamepad2, Cpu, Palette, ArrowRight } from 'lucide-react';
import { VIDEO_SCENARIOS } from '../data/stylesData';
import type { ArtStyle, VideoScenarioId } from '../types/art';
import { playSpotlightClick, playGalleryBell } from '../utils/audio';

interface ScenarioExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
  styles: ArtStyle[];
  onSelectStyle: (style: ArtStyle) => void;
}

const ICONS_MAP: Record<string, React.FC<{ className?: string }>> = {
  Clapperboard,
  Film,
  Tv,
  Activity,
  Eye,
  Sparkles,
  ShoppingBag,
  Gamepad2,
  Cpu,
  Palette,
};

export const ScenarioExplorerModal: React.FC<ScenarioExplorerModalProps> = ({
  isOpen,
  onClose,
  styles,
  onSelectStyle,
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<VideoScenarioId>('brand-film');

  if (!isOpen) return null;

  const currentScenario = VIDEO_SCENARIOS.find((s) => s.id === selectedScenarioId) || VIDEO_SCENARIOS[1];

  // Find styles that are recommended or applied to this scenario
  const matchingStyles = styles.filter((style) => {
    const isRecommended = currentScenario.recommendedStyles.includes(style.id);
    const hasApplication = style.appliedScenarios?.some((app) => app.scenarioId === selectedScenarioId);
    return isRecommended || hasApplication;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-gallery-950 border border-gold-500/40 rounded-2xl shadow-gallery-lg overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-gallery-800 bg-gallery-900/90 flex items-start justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-gold-500/10 text-gold-400 border border-gold-500/20">
                SCENARIOS & AESTHETICS · 场景赋能矩阵
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-gallery-100 mt-1">
              🎬 艺术流派 × 商业视频与创意应用
            </h2>
            <p className="text-xs sm:text-sm text-gallery-400 font-sans mt-0.5">
              探索经典与先锋艺术流派如何成为 9 大商业视频场景的美学基因与视觉灵魂。
            </p>
          </div>

          <button
            onClick={() => {
              playSpotlightClick();
              onClose();
            }}
            className="p-2.5 rounded-full bg-gallery-800 border border-gallery-700 text-gallery-300 hover:text-white hover:border-gold-500/60 transition-all cursor-pointer"
            title="关闭 (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          {/* Left: 9 Scenarios List */}
          <div className="md:col-span-4 border-r border-gallery-800 bg-gallery-950/60 p-3 sm:p-4 overflow-y-auto space-y-1.5">
            <span className="text-[11px] font-mono text-gallery-400 uppercase tracking-wider block px-2 mb-2">
              9 大实战应用场景:
            </span>
            {VIDEO_SCENARIOS.filter((s) => s.id !== 'all').map((sc) => {
              const Icon = ICONS_MAP[sc.iconName] || Film;
              const active = selectedScenarioId === sc.id;

              return (
                <button
                  key={sc.id}
                  onClick={() => {
                    playSpotlightClick();
                    setSelectedScenarioId(sc.id);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                    active
                      ? 'bg-gold-500/15 border-gold-500/60 text-gold-300 shadow-sm'
                      : 'bg-gallery-900/50 border-gallery-800/80 text-gallery-300 hover:bg-gallery-900 hover:text-gallery-100 hover:border-gallery-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold text-gold-400">{sc.code}</span>
                    <div>
                      <div className="text-xs font-serif font-bold text-gallery-100 group-hover:text-gold-300 transition-colors">
                        {sc.name}
                      </div>
                      <div className="text-[10px] text-gallery-400 truncate max-w-[170px]">{sc.enName}</div>
                    </div>
                  </div>
                  <Icon className={`w-4 h-4 ${active ? 'text-gold-400' : 'text-gallery-400 group-hover:text-gallery-300'}`} />
                </button>
              );
            })}
          </div>

          {/* Right: Detailed Scenario Breakdown & Empowering Artworks */}
          <div className="md:col-span-8 p-5 sm:p-6 overflow-y-auto space-y-6 bg-gallery-900/30">
            {/* Scenario Header Info */}
            <div className="p-5 rounded-2xl bg-gallery-900 border border-gallery-800 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-gold-500 text-gallery-950">
                  SCENARIO {currentScenario.code}
                </span>
                <h3 className="text-xl font-serif font-black text-gallery-100">{currentScenario.name}</h3>
              </div>
              <p className="text-xs sm:text-sm text-gallery-300 leading-relaxed font-sans">
                {currentScenario.description}
              </p>
            </div>

            {/* Matching Art Styles & Advice */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase text-gold-400 tracking-wider">
                🌟 推荐赋能美学流派与落地指导 ({matchingStyles.length} 个流派匹配):
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {matchingStyles.map((style) => {
                  const specificApp = style.appliedScenarios?.find((a) => a.scenarioId === selectedScenarioId);

                  return (
                    <div
                      key={style.id}
                      onClick={() => {
                        playGalleryBell(460);
                        onClose();
                        onSelectStyle(style);
                      }}
                      className="group p-4 rounded-xl bg-gallery-900 border border-gallery-800 hover:border-gold-500/50 transition-all cursor-pointer flex flex-col justify-between space-y-3 hover:shadow-gallery"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-[10px] font-mono text-gallery-400">{style.roomNumber}</div>
                          <h5 className="text-sm font-serif font-bold text-gallery-100 group-hover:text-gold-300 transition-colors">
                            {style.title}
                          </h5>
                          <span className="text-[10px] text-gallery-400 font-sans">{style.badge}</span>
                        </div>
                        <img
                          src={style.representativeWorks[0]?.imageUrl}
                          alt={style.title}
                          className="w-12 h-12 rounded-lg object-cover border border-gallery-700 group-hover:scale-105 transition-transform"
                        />
                      </div>

                      {specificApp ? (
                        <div className="text-[11px] text-gallery-300 space-y-1 bg-gallery-950 p-2.5 rounded-lg border border-gallery-800/80">
                          <div className="text-gold-400 font-sans font-medium">💡 实战用例:</div>
                          <p className="line-clamp-2 text-gallery-300">{specificApp.useCase}</p>
                          <div className="text-accent-cyan font-sans font-medium pt-1">🎥 运镜指导:</div>
                          <p className="line-clamp-2 text-gallery-400">{specificApp.cameraAdvice}</p>
                        </div>
                      ) : (
                        <p className="text-[11px] text-gallery-400 line-clamp-2 bg-gallery-950 p-2.5 rounded-lg border border-gallery-800/80">
                          {style.summary}
                        </p>
                      )}

                      <div className="flex items-center justify-between text-xs text-gold-400 pt-1">
                        <span>查看该流派画展</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};