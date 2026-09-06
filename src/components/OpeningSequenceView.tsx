import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Crosshair } from 'lucide-react';
import type { CinemaScene } from '../types/cinema';
import { playSpotlightClick } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';

interface OpeningSequenceViewProps {
  featuredScene: CinemaScene;
  totalScenesCount: number;
  onStudyScene: (sceneId: string) => void;
  onExploreArchive: () => void;
}

export const OpeningSequenceView: React.FC<OpeningSequenceViewProps> = ({
  featuredScene,
  totalScenesCount,
  onStudyScene,
  onExploreArchive,
}) => {
  const { lang, t } = useLanguage();
  const [stage, setStage] = useState<number>(0);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [inspectionTag, setInspectionTag] = useState<string>('');
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInspectionTag(t('hero.readyMoveCursor'));
    const t1 = setTimeout(() => setStage(1), 250);
    const t2 = setTimeout(() => setStage(2), 600);
    const t3 = setTimeout(() => setStage(3), 1000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [lang]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, Math.round(((e.clientX - rect.left) / rect.width) * 100)));
    const y = Math.max(0, Math.min(100, Math.round(((e.clientY - rect.top) / rect.height) * 100)));
    setMousePos({ x, y });

    // Subtle 3D tilt (max 2.5 degrees)
    const tiltX = ((y - 50) / 50) * -2.5;
    const tiltY = ((x - 50) / 50) * 2.5;
    setTilt({ x: tiltX, y: tiltY });

    // Dynamic Contextual Detection based on image coordinates
    if (x > 35 && x < 65 && y > 30 && y < 75) {
      setInspectionTag(t('hero.subjectDetected'));
    } else if (y < 35 && (x > 40 || x < 30)) {
      setInspectionTag(t('hero.lightSource'));
    } else if (x < 30 || x > 75 || y > 75) {
      const negPct = Math.round(30 + ((Math.abs(x - 50) + Math.abs(y - 50)) / 100) * 45);
      setInspectionTag(t('hero.negativeSpace', { pct: negPct }));
    } else {
      setInspectionTag(t('hero.focalDepth'));
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setInspectionTag(t('hero.hoverHint'));
  };

  const displayTitle = lang === 'en' ? (featuredScene.titleEn || featuredScene.title) : featuredScene.title;

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-8 lg:py-16 text-[#F2F0E8]">
      {/* Editorial Top Status Line */}
      <div className={`flex items-center justify-between text-xs font-mono tracking-widest text-[#8B887F] border-b border-[#F2F0E8]/10 pb-4 mb-8 transition-opacity duration-700 ${stage >= 1 ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center gap-3">
          <span className="text-[#D8FF3E] font-bold">{t('hero.edition')}</span>
          <span className="opacity-30">/</span>
          <span>{t('hero.systemSubtitle')}</span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span>{totalScenesCount} {t('hero.curatedCount')}</span>
          <span className="opacity-30">/</span>
          <span className="text-[#D8FF3E]">{t('hero.grid')}</span>
        </div>
      </div>

      {/* Asymmetrical 12-Column Hero Grid (5 Cols Left Text, 7 Cols Right Image) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column (5 Cols): Monumental Structural Typography */}
        <div className={`lg:col-span-5 flex flex-col justify-between space-y-6 transition-all duration-1000 ${stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div>
            <div className="text-[11px] font-mono tracking-[0.2em] text-[#D8FF3E] uppercase mb-2">
              {t('hero.tagline')}
            </div>
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-[#F2F0E8] leading-[0.95] uppercase">
              {t('hero.titleLine1')}<br />
              <span className="text-[#8B887F] font-normal">{t('hero.titleLine2')}</span>
            </h1>
          </div>

          <p className="text-sm sm:text-base text-[#8B887F] leading-relaxed font-sans max-w-md">
            {t('hero.description')}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={() => {
                playSpotlightClick();
                onStudyScene(featuredScene.id);
              }}
              className="px-6 py-3.5 bg-[#D8FF3E] text-[#11110F] text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white transition-colors cursor-pointer"
            >
              <span>{t('hero.studyScene')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                playSpotlightClick();
                onExploreArchive();
              }}
              className="px-6 py-3.5 border border-[#F2F0E8]/20 hover:border-[#D8FF3E] hover:text-[#D8FF3E] text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer text-center"
            >
              {t('hero.exploreArchive')} ({totalScenesCount})
            </button>
          </div>

          {/* Research Metric Strip */}
          <div className="pt-6 border-t border-[#F2F0E8]/10 grid grid-cols-3 gap-4 text-left font-mono">
            <div>
              <div className="text-[10px] text-[#8B887F]">{t('hero.featured')}</div>
              <div className="text-xs text-[#D8FF3E] font-bold mt-0.5">{featuredScene.sceneNumber}</div>
            </div>
            <div>
              <div className="text-[10px] text-[#8B887F]">{t('hero.aspectRatio')}</div>
              <div className="text-xs text-[#F2F0E8] font-bold mt-0.5">2.39:1 CINEMA</div>
            </div>
            <div>
              <div className="text-[10px] text-[#8B887F]">{t('hero.optics')}</div>
              <div className="text-xs text-[#F2F0E8] font-bold mt-0.5 truncate max-w-[120px]">
                {featuredScene.cameraRig.lens.split(' ')[0]}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): Monumental Cinematic Visual with Interactive Research Inspection */}
        <div className={`lg:col-span-7 transition-all duration-1000 ${stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div 
            ref={containerRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => {
              playSpotlightClick();
              onStudyScene(featuredScene.id);
            }}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
            }}
            className="group relative w-full aspect-video bg-[#181815] border border-[#F2F0E8]/15 overflow-hidden cursor-crosshair shadow-2xl"
          >
            <img
              src={featuredScene.coverImage}
              alt={displayTitle}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.025] filter group-hover:brightness-90"
            />

            {/* Research Crosshair overlay following mouse */}
            {isHovered && (
              <>
                <div
                  className="absolute left-0 right-0 border-t border-[#D8FF3E]/30 pointer-events-none transition-all duration-75"
                  style={{ top: `${mousePos.y}%` }}
                />
                <div
                  className="absolute top-0 bottom-0 border-l border-[#D8FF3E]/30 pointer-events-none transition-all duration-75"
                  style={{ left: `${mousePos.x}%` }}
                />
                <div
                  className="absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 border border-[#D8FF3E] pointer-events-none flex items-center justify-center transition-all duration-75"
                  style={{ left: `${mousePos.x}%`, top: `${mousePos.y}%` }}
                >
                  <div className="w-1 h-1 bg-[#D8FF3E]" />
                </div>
              </>
            )}

            {/* Top Telemetry Inspection Banner */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono pointer-events-none">
              <div className="px-2.5 py-1 bg-[#11110F]/90 border border-[#F2F0E8]/20 text-[#D8FF3E] flex items-center gap-2">
                <Crosshair className="w-3 h-3 text-[#D8FF3E] animate-pulse" />
                <span>{inspectionTag}</span>
              </div>
              <div className="px-2.5 py-1 bg-[#11110F]/90 border border-[#F2F0E8]/20 text-[#F2F0E8] font-mono">
                {t('hero.cursor')} X {mousePos.x.toString().padStart(3, '0')} Y {mousePos.y.toString().padStart(3, '0')}
              </div>
            </div>

            {/* Center Call to Action on Hover */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
              <span className="px-5 py-2.5 border border-[#D8FF3E] bg-[#11110F]/90 text-[#D8FF3E] text-xs font-mono font-bold tracking-widest uppercase">
                {t('hero.enterDeconstruction')}
              </span>
            </div>

            {/* Bottom Floating Metadata Strip */}
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/95 via-black/80 to-transparent flex items-end justify-between text-xs font-mono pointer-events-none">
              <div>
                <div className="text-[#D8FF3E] font-bold">{featuredScene.sceneNumber} · {displayTitle}</div>
                <div className="text-[#8B887F] text-[11px] mt-0.5">{featuredScene.locationAndTime}</div>
              </div>
              <div className="hidden sm:block text-right text-[#8B887F] text-[11px]">
                <div>{featuredScene.cameraRig.lens}</div>
                <div className="text-[#F2F0E8]">{featuredScene.cameraRig.mood}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
