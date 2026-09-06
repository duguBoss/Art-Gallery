import React, { useState } from 'react';
import { ArrowLeft, Copy, Check, Bookmark, Sliders, ChevronLeft, ChevronRight, Eye, Grid, Palette, Camera, Sun, Sparkles } from 'lucide-react';
import type { CinemaScene } from '../types/cinema';
import type { AnalysisMode } from '../types/visualAtlas';
import { playSpotlightClick, playSuccessChime } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';
import { getAtomsForScene } from '../data/canonicalKnowledgeGraph';

interface SceneDetailViewProps {
  scene: CinemaScene;
  allScenes: CinemaScene[];
  onBack: () => void;
  onSelectScene: (sceneId: string) => void;
  onExploreTag: (tag: string, category: string) => void;
  onOpenInLab: (scene: CinemaScene) => void;
  onSaveToDossier: (scene: CinemaScene) => void;
  isSavedInDossier?: boolean;
}

export const SceneDetailView: React.FC<SceneDetailViewProps> = ({
  scene,
  allScenes,
  onBack,
  onSelectScene,
  onExploreTag,
  onOpenInLab,
  onSaveToDossier,
  isSavedInDossier = false,
}) => {
  const { lang, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [dnaViewMode, setDnaViewMode] = useState<'human' | 'json'>('human');
  const [copiedJson, setCopiedJson] = useState(false);
  const [analysisMode, setAnalysisMode] = useState<AnalysisMode>('overview');

  const currentIdx = allScenes.findIndex((s) => s.id === scene.id);
  const prevScene = allScenes[(currentIdx - 1 + allScenes.length) % allScenes.length];
  const nextScene = allScenes[(currentIdx + 1) % allScenes.length];

  const handleCopy = () => {
    navigator.clipboard.writeText(scene.scriptPrompt);
    setCopied(true);
    playSuccessChime();
    setTimeout(() => setCopied(false), 2000);
  };

  const displayTitle = lang === 'en' ? (scene.titleEn || scene.title) : scene.title;
  const displayPrevTitle = lang === 'en' ? (prevScene.titleEn || prevScene.title) : prevScene.title;
  const displayNextTitle = lang === 'en' ? (nextScene.titleEn || nextScene.title) : nextScene.title;

  const canonicalAtoms = getAtomsForScene(scene.id);

  // Extract Visual DNA tags
  const visualDna = {
    mood: [
      scene.cameraRig.mood.split(' ')[0],
      scene.cameraRig.mood.split('&')[1]?.trim() || 'Cinematic Solitude',
      scene.behindTheScenes?.styleName?.split(' ')[0] || 'Atmospheric',
    ].filter(Boolean),
    light: [
      scene.cameraRig.lighting.split(' ')[0],
      'Directional Key',
      scene.cameraRig.lighting.includes('Low-Key') ? 'Low-Key Falloff' : 'Natural Ambient',
    ],
    camera: [
      scene.cameraRig.lens.split(' ')[0] + ' ' + (scene.cameraRig.lens.split(' ')[1] || ''),
      scene.cameraRig.shutter.split(' ')[0] || '1/48s 180°',
      scene.cameraRig.movement.split(' ')[0] || 'Controlled Track',
    ],
    composition: [
      scene.behindTheScenes?.atomName || 'Negative Space',
      scene.behindTheScenes?.principleName?.split(' ')[0] || 'Visual Tension',
      'Cinema Ratio',
    ],
    color: scene.colorPalette || ['#030712', '#06b6d4', '#f59e0b', '#dc2626'],
  };

  const relatedScenes = allScenes.filter(
    (s) => s.id !== scene.id && (
      s.cameraRig.mood.split(' ')[0] === visualDna.mood[0] ||
      s.cameraRig.lens.split(' ')[0] === scene.cameraRig.lens.split(' ')[0] ||
      s.behindTheScenes?.principleName === scene.behindTheScenes?.principleName
    )
  ).slice(0, 3);

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-8 text-[#F2F0E8] animate-fadeIn">
      {/* Top Header Navigation Line */}
      <div className="flex items-center justify-between border-b border-[#F2F0E8]/10 pb-4 mb-8 text-xs font-mono">
        <button
          onClick={() => {
            playSpotlightClick();
            onBack();
          }}
          className="flex items-center gap-2 text-[#8B887F] hover:text-[#D8FF3E] transition-colors cursor-pointer uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t('scene.return')}</span>
        </button>

        <div className="flex items-center gap-4">
          <span className="text-[#D8FF3E] font-bold">
            {scene.sceneNumber} / {allScenes.length.toString().padStart(2, '0')}
          </span>
          <span className="opacity-30">|</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                playSpotlightClick();
                onSelectScene(prevScene.id);
              }}
              className="p-1 hover:text-[#D8FF3E] transition-colors cursor-pointer"
              title={displayPrevTitle}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                playSpotlightClick();
                onSelectScene(nextScene.id);
              }}
              className="p-1 hover:text-[#D8FF3E] transition-colors cursor-pointer"
              title={displayNextTitle}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Analysis Mode Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#8B887F] uppercase mr-1">{t('scene.hudLabel')}</span>
          {[
            { mode: 'overview', label: t('scene.modeOverview'), icon: Eye },
            { mode: 'composition', label: t('scene.modeComposition'), icon: Grid },
            { mode: 'color', label: t('scene.modeColor'), icon: Palette },
            { mode: 'camera', label: t('scene.modeCamera'), icon: Camera },
            { mode: 'light', label: t('scene.modeLight'), icon: Sun },
          ].map(({ mode, label, icon: Icon }) => (
            <button
              key={mode}
              onClick={() => {
                playSpotlightClick();
                setAnalysisMode(mode as AnalysisMode);
              }}
              className={`px-3 py-1.5 border flex items-center gap-1.5 transition-colors cursor-pointer ${
                analysisMode === mode
                  ? 'border-[#D8FF3E] bg-[#D8FF3E] text-[#11110F] font-bold'
                  : 'border-[#F2F0E8]/15 bg-[#141412] text-[#8B887F] hover:text-[#F2F0E8] hover:border-[#F2F0E8]/30'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        <div className="text-[11px] text-[#8B887F]">
          {t('scene.stateLabel')} <span className="text-[#D8FF3E] font-bold uppercase">{t('scene.stateActive', { mode: analysisMode.toUpperCase() })}</span>
        </div>
      </div>

      {/* Monumental Hero Image Viewport with Dynamic Analysis Overlays */}
      <div className="relative w-full aspect-video max-h-[72vh] bg-[#181815] border border-[#F2F0E8]/15 overflow-hidden mb-12 shadow-2xl select-none">
        <img
          src={scene.coverImage}
          alt={displayTitle}
          className={`w-full h-full object-cover transition-all duration-500 ${
            analysisMode === 'color' ? 'filter brightness-90 saturate-125' : ''
          }`}
        />

        {/* Top Header Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-black/85 border border-[#F2F0E8]/15 text-[11px] font-mono text-[#D8FF3E] z-20">
          {scene.sceneNumber} · {scene.act.split('·')[0].trim()}
        </div>

        {/* ANALYSIS OVERLAY: 02 COMPOSITION */}
        {analysisMode === 'composition' && (
          <div className="absolute inset-0 z-10 pointer-events-none animate-fadeIn">
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
              <div className="border-r border-b border-[#D8FF3E]/40" />
              <div className="border-r border-b border-[#D8FF3E]/40" />
              <div className="border-b border-[#D8FF3E]/40" />
              <div className="border-r border-b border-[#D8FF3E]/40" />
              <div className="border-r border-b border-[#D8FF3E]/40 relative flex items-center justify-center">
                <div className="w-4 h-4 rounded-full border border-[#D8FF3E] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D8FF3E]" />
                </div>
              </div>
              <div className="border-b border-[#D8FF3E]/40" />
              <div className="border-r border-b border-[#D8FF3E]/40" />
              <div className="border-r border-b border-[#D8FF3E]/40" />
              <div />
            </div>

            <div className="absolute top-4 right-4 bg-[#11110F]/90 border border-[#D8FF3E] p-3 font-mono text-[11px] text-[#F2F0E8] space-y-1">
              <div className="text-[#D8FF3E] font-bold">{t('scene.auditTitle')}</div>
              <div>{t('scene.auditRuleOfThirds')}</div>
              <div>{t('scene.auditHarmonic')}</div>
              <div>{t('scene.auditNegative')}</div>
              <div>{t('scene.auditPerspective')} {scene.behindTheScenes?.atomName || 'CENTER-WEIGHTED'}</div>
            </div>
          </div>
        )}

        {/* ANALYSIS OVERLAY: 03 COLOR */}
        {analysisMode === 'color' && (
          <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end pointer-events-none animate-fadeIn bg-black/30">
            <div className="bg-[#11110F]/95 border border-[#F2F0E8]/20 p-4 max-w-xl space-y-3 font-mono">
              <div className="text-xs text-[#D8FF3E] font-bold flex items-center justify-between">
                <span>{t('scene.colorTitle')}</span>
                <span className="text-[10px] text-[#8B887F]">{t('scene.colorSpectrum')}</span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {visualDna.color.map((hex, idx) => (
                  <div key={hex} className="space-y-1">
                    <div
                      className="h-10 w-full border border-white/20 shadow-inner"
                      style={{ backgroundColor: hex }}
                    />
                    <div className="text-[11px] text-[#F2F0E8] font-bold">{hex}</div>
                    <div className="text-[9px] text-[#8B887F]">NODE {idx + 1}</div>
                  </div>
                ))}
              </div>
              <div className="text-[11px] text-[#8B887F] pt-2 border-t border-[#F2F0E8]/10">
                {t('scene.colorTheory')} {scene.behindTheScenes?.whyItWorks || 'Color grading relies on temperature contrast to separate key elements.'}
              </div>
            </div>
          </div>
        )}

        {/* ANALYSIS OVERLAY: 04 OPTICAL HUD */}
        {analysisMode === 'camera' && (
          <div className="absolute inset-0 z-10 pointer-events-none p-8 flex flex-col justify-between font-mono text-xs animate-fadeIn">
            <div className="absolute inset-6 border border-[#D8FF3E]/30" />
            <div className="absolute inset-12 border border-[#D8FF3E]/15" />

            <div className="relative z-10 flex items-center justify-between text-[#D8FF3E]">
              <div className="px-2 py-1 bg-black/80 border border-[#D8FF3E]/40">
                {t('scene.fpsLabel')}
              </div>
              <div className="px-2 py-1 bg-black/80 border border-[#D8FF3E]/40">
                {t('scene.opticsLabel')} {scene.cameraRig.lens}
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border border-[#D8FF3E]/60 flex items-center justify-center">
                <div className="w-2 h-2 bg-[#D8FF3E]" />
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[#F2F0E8]">
              <div className="px-2 py-1 bg-black/80 border border-[#F2F0E8]/20 text-[11px]">
                {t('scene.trackLabel')} {scene.cameraRig.movement}
              </div>
              <div className="px-2 py-1 bg-black/80 border border-[#F2F0E8]/20 text-[11px] text-[#D8FF3E]">
                {t('scene.rawLabel')}
              </div>
            </div>
          </div>
        )}

        {/* ANALYSIS OVERLAY: 05 LIGHTING VECTOR */}
        {analysisMode === 'light' && (
          <div className="absolute inset-0 z-10 pointer-events-none p-6 flex items-start justify-end font-mono animate-fadeIn">
            <div className="bg-[#11110F]/95 border border-[#D8FF3E] p-4 max-w-sm space-y-2 text-xs">
              <div className="text-[#D8FF3E] font-bold">{t('scene.lightMapTitle')}</div>
              <div className="text-[#F2F0E8] text-[11px] leading-relaxed">
                {scene.cameraRig.lighting}
              </div>
              <div className="pt-2 border-t border-[#F2F0E8]/10 grid grid-cols-2 gap-2 text-[10px] text-[#8B887F]">
                <div>{t('scene.keyFillRatio')}</div>
                <div>{t('scene.falloff')}</div>
                <div>{t('scene.atmosphere')}</div>
                <div>{t('scene.diffusion')}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Two-Column Editorial Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-[#F2F0E8]/10 pt-8">
        {/* Left Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <div className="text-[11px] font-mono tracking-widest text-[#D8FF3E] uppercase mb-1">
              {scene.act}
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F2F0E8] uppercase">
              {displayTitle}
            </h1>
            <div className="text-sm font-mono text-[#8B887F] mt-2">
              {scene.titleEn} · {scene.locationAndTime}
            </div>
          </div>

          {/* Call Sheet & Prompt */}
          <div className="border border-[#F2F0E8]/10 bg-[#161614] p-5 space-y-3 font-mono">
            <div className="flex items-center justify-between text-xs text-[#8B887F] border-b border-[#F2F0E8]/10 pb-2">
              <span>{t('scene.callSheetTitle')}</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs text-[#D8FF3E] hover:underline cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? t('scene.copied') : t('scene.copyPrompt')}</span>
              </button>
            </div>
            <pre className="text-xs text-[#F2F0E8] leading-relaxed whitespace-pre-wrap font-mono select-all">
              {scene.scriptPrompt}
            </pre>
          </div>

          {/* Camera Optics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs border-t border-[#F2F0E8]/10 pt-6">
            <div>
              <div className="text-[10px] text-[#8B887F]">{t('scene.lensHeader')}</div>
              <div className="text-[#F2F0E8] mt-1 font-medium">{scene.cameraRig.lens}</div>
            </div>
            <div>
              <div className="text-[10px] text-[#8B887F]">{t('scene.shutterHeader')}</div>
              <div className="text-[#F2F0E8] mt-1 font-medium">{scene.cameraRig.shutter}</div>
            </div>
            <div>
              <div className="text-[10px] text-[#8B887F]">{t('scene.movementHeader')}</div>
              <div className="text-[#F2F0E8] mt-1 font-medium">{scene.cameraRig.movement}</div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => {
                playSpotlightClick();
                onSaveToDossier(scene);
              }}
              className={`px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider border flex items-center gap-2 transition-colors cursor-pointer ${
                isSavedInDossier
                  ? 'border-[#D8FF3E] bg-[#D8FF3E] text-[#11110F]'
                  : 'border-[#F2F0E8]/20 hover:border-[#D8FF3E] hover:text-[#D8FF3E]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{isSavedInDossier ? t('scene.savedInDossier') : t('scene.addToDossier')}</span>
            </button>

            <button
              onClick={() => {
                playSpotlightClick();
                onOpenInLab(scene);
              }}
              className="px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider bg-white/10 hover:bg-[#D8FF3E] hover:text-[#11110F] text-[#F2F0E8] transition-colors cursor-pointer flex items-center gap-2"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{t('scene.remixInLab')}</span>
            </button>
          </div>

          {/* Related Scenes Strip */}
          {relatedScenes.length > 0 && (
            <div className="pt-8 border-t border-[#F2F0E8]/10 space-y-4">
              <div className="text-xs font-mono text-[#8B887F] uppercase tracking-wider">
                {t('scene.correlatedTitle')}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedScenes.map((rel) => {
                  const relTitle = lang === 'en' ? (rel.titleEn || rel.title) : rel.title;
                  return (
                    <div
                      key={rel.id}
                      onClick={() => {
                        playSpotlightClick();
                        onSelectScene(rel.id);
                      }}
                      className="group border border-[#F2F0E8]/10 p-2 bg-[#141412] cursor-pointer hover:border-[#D8FF3E] transition-colors"
                    >
                      <div className="aspect-[16/10] overflow-hidden mb-2">
                        <img
                          src={rel.coverImage}
                          alt={relTitle}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="text-[10px] font-mono text-[#D8FF3E]">{rel.sceneNumber}</div>
                      <div className="text-xs font-medium text-[#F2F0E8] truncate">{relTitle}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (5 Cols): VISUAL DNA */}
        <div className="lg:col-span-5 space-y-6 border-t lg:border-t-0 lg:border-l border-[#F2F0E8]/10 lg:pl-10">
          <div>
            <div className="text-[11px] font-mono tracking-widest text-[#D8FF3E] uppercase mb-1">
              AESTHETIC DECONSTRUCTION
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-[#F2F0E8] uppercase">
              {t('scene.dnaTitle')}
            </h2>
            <p className="text-xs text-[#8B887F] font-mono mt-1">
              {t('scene.dnaSubtitle')}
            </p>
          </div>

          {/* Format View Toggle */}
          <div className="flex items-center justify-between border-t border-[#F2F0E8]/10 pt-3">
            <span className="text-[10px] font-mono text-[#8B887F] uppercase">
              {lang === 'zh' ? '呈现格式 / FORMAT:' : 'VIEW FORMAT:'}
            </span>
            <div className="flex items-center gap-1 font-mono text-[10px]">
              <button
                onClick={() => {
                  playSpotlightClick();
                  setDnaViewMode('human');
                }}
                className={`px-2.5 py-1 border transition-colors cursor-pointer ${
                  dnaViewMode === 'human'
                    ? 'border-[#D8FF3E] text-[#D8FF3E] bg-[#D8FF3E]/10 font-bold'
                    : 'border-[#F2F0E8]/10 text-[#8B887F] hover:text-[#F2F0E8]'
                }`}
              >
                HUMAN
              </button>
              <button
                onClick={() => {
                  playSpotlightClick();
                  setDnaViewMode('json');
                }}
                className={`px-2.5 py-1 border transition-colors cursor-pointer ${
                  dnaViewMode === 'json'
                    ? 'border-[#D8FF3E] text-[#D8FF3E] bg-[#D8FF3E]/10 font-bold'
                    : 'border-[#F2F0E8]/10 text-[#8B887F] hover:text-[#F2F0E8]'
                }`}
              >
                AI JSON
              </button>
            </div>
          </div>

          {dnaViewMode === 'json' ? (
            /* MACHINE-READABLE JSON VIEW (FOR AI AGENTS & RESEARCHERS) */
            <div className="space-y-3 font-mono text-xs animate-fadeIn">
              <div className="flex items-center justify-between text-[10px] text-[#8B887F]">
                <span className="text-[#D8FF3E]">MACHINE-READABLE VISUAL ONTOLOGY</span>
                <button
                  onClick={() => {
                    const sceneJson = JSON.stringify({
                      id: scene.id,
                      sceneNumber: scene.sceneNumber,
                      title: scene.title,
                      titleEn: scene.titleEn,
                      aspectRatio: "2.39:1",
                      visualDNA: visualDna,
                      cameraRig: scene.cameraRig,
                      lightingVector: {
                        type: scene.cameraRig.lighting,
                        ratio: "8:1 (Chiaroscuro Falloff)",
                        keyAngle: "45° Rim / Volumetric"
                      },
                      compositionAudit: {
                        atom: scene.behindTheScenes?.atomName,
                        principle: scene.behindTheScenes?.principleName,
                        style: scene.behindTheScenes?.styleName,
                        rationale: scene.behindTheScenes?.whyItWorks
                      },
                      colorPalette: scene.colorPalette,
                      productionPrompt: scene.scriptPrompt
                    }, null, 2);
                    navigator.clipboard.writeText(sceneJson);
                    setCopiedJson(true);
                    playSuccessChime();
                    setTimeout(() => setCopiedJson(false), 2000);
                  }}
                  className="px-2 py-0.5 border border-[#D8FF3E] text-[#D8FF3E] hover:bg-[#D8FF3E] hover:text-[#11110F] text-[9px] font-bold uppercase transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedJson ? (lang === 'zh' ? '已复制 JSON' : 'JSON COPIED') : (lang === 'zh' ? '复制标准 JSON' : 'COPY JSON')}</span>
                </button>
              </div>

              <pre className="p-4 bg-[#0E0E0C] border border-[#F2F0E8]/10 text-[11px] text-[#F2F0E8] leading-relaxed overflow-x-auto select-all max-h-96">
                {JSON.stringify({
                  "@context": "https://duguboss.github.io/Art-Gallery/llms.txt",
                  "@type": "VisualKnowledgeAtom",
                  "id": scene.id,
                  "sceneNumber": scene.sceneNumber,
                  "title": scene.title,
                  "titleEn": scene.titleEn,
                  "aspectRatio": "2.39:1",
                  "visualDNA": visualDna,
                  "cameraRig": scene.cameraRig,
                  "lightingVector": {
                    type: scene.cameraRig.lighting,
                    ratio: "8:1 (Chiaroscuro Falloff)",
                    keyAngle: "45° Rim / Volumetric"
                  },
                  "compositionAudit": {
                    atom: scene.behindTheScenes?.atomName,
                    principle: scene.behindTheScenes?.principleName,
                    style: scene.behindTheScenes?.styleName,
                    rationale: scene.behindTheScenes?.whyItWorks
                  },
                  "colorPalette": scene.colorPalette,
                  "productionPrompt": scene.scriptPrompt
                }, null, 2)}
              </pre>
            </div>
          ) : (
            /* HUMAN VISUAL INTERACTIVE VIEW */
            <>
              {/* DNA Section: MOOD */}
              <div className="border-t border-[#F2F0E8]/10 pt-3">
                <div className="text-[10px] font-mono text-[#8B887F] uppercase mb-2">{t('scene.dnaMood')}</div>
                <div className="flex flex-wrap gap-2">
                  {visualDna.mood.map((m) => (
                    <button
                      key={m}
                      onClick={() => onExploreTag(m, 'mood')}
                      className="px-3 py-1 bg-[#181815] border border-[#F2F0E8]/15 hover:border-[#D8FF3E] hover:text-[#D8FF3E] text-xs font-mono transition-colors cursor-pointer"
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* DNA Section: LIGHT */}
              <div className="border-t border-[#F2F0E8]/10 pt-3">
                <div className="text-[10px] font-mono text-[#8B887F] uppercase mb-2">{t('scene.dnaLight')}</div>
                <div className="flex flex-wrap gap-2">
                  {visualDna.light.map((l) => (
                    <button
                      key={l}
                      onClick={() => onExploreTag(l, 'light')}
                      className="px-3 py-1 bg-[#181815] border border-[#F2F0E8]/15 hover:border-[#D8FF3E] hover:text-[#D8FF3E] text-xs font-mono transition-colors cursor-pointer"
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* DNA Section: COLOR PALETTE */}
              <div className="border-t border-[#F2F0E8]/10 pt-3">
                <div className="text-[10px] font-mono text-[#8B887F] uppercase mb-2">{t('scene.dnaColor')}</div>
                <div className="flex items-center gap-2">
                  {visualDna.color.map((hex) => (
                    <div key={hex} className="group relative flex items-center gap-1.5 font-mono text-[11px] text-[#8B887F]">
                      <div
                        className="w-5 h-5 border border-[#F2F0E8]/20 cursor-pointer hover:scale-110 transition-transform"
                        style={{ backgroundColor: hex }}
                        onClick={() => onExploreTag(hex, 'color')}
                        title={hex}
                      />
                      <span>{hex}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* DNA Section: CAMERA */}
              <div className="border-t border-[#F2F0E8]/10 pt-3">
                <div className="text-[10px] font-mono text-[#8B887F] uppercase mb-2">{t('scene.dnaCamera')}</div>
                <div className="flex flex-wrap gap-2">
                  {visualDna.camera.map((c) => (
                    <button
                      key={c}
                      onClick={() => onExploreTag(c, 'camera')}
                      className="px-3 py-1 bg-[#181815] border border-[#F2F0E8]/15 hover:border-[#D8FF3E] hover:text-[#D8FF3E] text-xs font-mono transition-colors cursor-pointer"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* DNA Section: COMPOSITION */}
              <div className="border-t border-[#F2F0E8]/10 pt-3">
                <div className="text-[10px] font-mono text-[#8B887F] uppercase mb-2">{t('scene.dnaComposition')}</div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {visualDna.composition.map((comp) => (
                    <button
                      key={comp}
                      onClick={() => onExploreTag(comp, 'composition')}
                      className="px-3 py-1 bg-[#181815] border border-[#F2F0E8]/15 hover:border-[#D8FF3E] hover:text-[#D8FF3E] text-xs font-mono transition-colors cursor-pointer"
                    >
                      {comp}
                    </button>
                  ))}
                </div>
                {scene.behindTheScenes && (
                  <div className="text-xs font-sans text-[#8B887F] leading-relaxed border-l-2 border-[#D8FF3E] pl-3 py-1 mb-3">
                    {scene.behindTheScenes.whyItWorks}
                  </div>
                )}

                {/* Canonical Knowledge Atoms */}
                {canonicalAtoms.length > 0 && (
                  <div className="border-t border-[#D8FF3E]/20 bg-[#D8FF3E]/5 p-3 mt-2">
                    <div className="text-[10px] font-mono text-[#D8FF3E] uppercase font-bold mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" />
                      <span>{lang === 'zh' ? '关联视觉本体构件' : 'LINKED KNOWLEDGE ATOMS'}</span>
                    </div>
                    <div className="space-y-2">
                      {canonicalAtoms.map((atom) => (
                        <div key={atom.id} className="text-xs border border-[#F2F0E8]/10 p-2 bg-[#11110F]">
                          <div className="flex items-center justify-between text-[9px] font-mono mb-0.5">
                            <span className="text-[#D8FF3E] uppercase font-bold">{atom.category}</span>
                            <span className="text-[#8B887F]">{atom.id}</span>
                          </div>
                          <div className="font-bold text-xs text-[#F2F0E8]">
                            {atom.name[lang === 'zh' ? 'zh-CN' : lang] || atom.name.en}
                          </div>
                          <div className="text-[11px] text-[#8B887F] mt-0.5">
                            {atom.definition[lang === 'zh' ? 'zh-CN' : lang] || atom.definition.en}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
