import React, { useState } from 'react';
import { ArrowLeft, Copy, Check, Bookmark, Sliders, ChevronLeft, ChevronRight, Eye, Grid, Palette, Camera, Sun, Sparkles } from 'lucide-react';
import type { CinemaScene } from '../types/cinema';
import type { AnalysisMode } from '../types/visualAtlas';
import { playSpotlightClick, playSuccessChime } from '../utils/audio';

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
  const [copied, setCopied] = useState(false);
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

  // Related scenes sharing mood or optics
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
          <span>RETURN TO ARCHIVE</span>
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
              title="Previous Scene"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                playSpotlightClick();
                onSelectScene(nextScene.id);
              }}
              className="p-1 hover:text-[#D8FF3E] transition-colors cursor-pointer"
              title="Next Scene"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Analysis Mode Toolbar (As demanded in Section 六 of Blueprint) */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#8B887F] uppercase mr-1">ANALYSIS HUD:</span>
          {[
            { mode: 'overview', label: '01 MASTER', icon: Eye },
            { mode: 'composition', label: '02 COMPOSITION', icon: Grid },
            { mode: 'color', label: '03 COLOR SWATCHES', icon: Palette },
            { mode: 'camera', label: '04 OPTICAL HUD', icon: Camera },
            { mode: 'light', label: '05 LIGHTING VECTOR', icon: Sun },
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
          STATE: <span className="text-[#D8FF3E] font-bold uppercase">{analysisMode} DECONSTRUCTION ACTIVE</span>
        </div>
      </div>

      {/* Monumental Hero Image Viewport with Dynamic Analysis Overlays */}
      <div className="relative w-full aspect-video max-h-[72vh] bg-[#181815] border border-[#F2F0E8]/15 overflow-hidden mb-12 shadow-2xl select-none">
        <img
          src={scene.coverImage}
          alt={scene.title}
          className={`w-full h-full object-cover transition-all duration-500 ${
            analysisMode === 'color' ? 'filter brightness-90 saturate-125' : ''
          }`}
        />

        {/* Top Header Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-black/85 border border-[#F2F0E8]/15 text-[11px] font-mono text-[#D8FF3E] z-20">
          {scene.sceneNumber} · {scene.act.split('·')[0].trim()}
        </div>

        {/* ANALYSIS OVERLAY: 02 COMPOSITION (Rule of Thirds, Center-weighted, Negative space) */}
        {analysisMode === 'composition' && (
          <div className="absolute inset-0 z-10 pointer-events-none animate-fadeIn">
            {/* Rule of Thirds Lines */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
              <div className="border-r border-b border-[#D8FF3E]/40" />
              <div className="border-r border-b border-[#D8FF3E]/40" />
              <div className="border-b border-[#D8FF3E]/40" />
              <div className="border-r border-b border-[#D8FF3E]/40" />
              {/* Central Power Point */}
              <div className="border-r border-b border-[#D8FF3E]/40 relative flex items-center justify-center">
                <div className="w-4 h-4 rounded-full border border-[#D8FF3E] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D8FF3E]" />
                </div>
              </div>
              <div className="border-b border-[#D8FF3E]/40" />
              <div className="border-r border-[#D8FF3E]/40" />
              <div className="border-r border-[#D8FF3E]/40" />
              <div />
            </div>

            {/* Rule of Thirds Telemetry Tags */}
            <div className="absolute top-4 right-4 bg-[#11110F]/90 border border-[#D8FF3E] p-3 font-mono text-[11px] text-[#F2F0E8] space-y-1">
              <div className="text-[#D8FF3E] font-bold">COMPOSITION AUDIT:</div>
              <div>• RULE OF THIRDS: INTERSECTING SUBJECT</div>
              <div>• HARMONIC RATIO: GOLDEN SECTION (1:1.618)</div>
              <div>• NEGATIVE SPACE RATIO: 64% AUDIENCE REST</div>
              <div>• PERSPECTIVE: {scene.behindTheScenes?.atomName || 'CENTER-WEIGHTED'}</div>
            </div>
          </div>
        )}

        {/* ANALYSIS OVERLAY: 03 COLOR (Swatches pinned directly on screen) */}
        {analysisMode === 'color' && (
          <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end pointer-events-none animate-fadeIn bg-black/30">
            <div className="bg-[#11110F]/95 border border-[#F2F0E8]/20 p-4 max-w-xl space-y-3 font-mono">
              <div className="text-xs text-[#D8FF3E] font-bold flex items-center justify-between">
                <span>CHROMATIC HARMONY EXTRACTION</span>
                <span className="text-[10px] text-[#8B887F]">HIGH CONTRAST SPECTRUM</span>
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
                COLOR THEORY: {scene.behindTheScenes?.whyItWorks || 'Color grading relies on temperature contrast to separate key elements.'}
              </div>
            </div>
          </div>
        )}

        {/* ANALYSIS OVERLAY: 04 OPTICAL HUD (Hollywood Viewfinder Overlay) */}
        {analysisMode === 'camera' && (
          <div className="absolute inset-0 z-10 pointer-events-none p-8 flex flex-col justify-between font-mono text-xs animate-fadeIn">
            {/* Safe Action Box Framing */}
            <div className="absolute inset-6 border border-[#D8FF3E]/30" />
            <div className="absolute inset-12 border border-[#D8FF3E]/15" />

            {/* Top Viewfinder Metadata */}
            <div className="relative z-10 flex items-center justify-between text-[#D8FF3E]">
              <div className="px-2 py-1 bg-black/80 border border-[#D8FF3E]/40">
                FPS: 24.000 // SHUTTER: 180.0°
              </div>
              <div className="px-2 py-1 bg-black/80 border border-[#D8FF3E]/40">
                OPTICS: {scene.cameraRig.lens}
              </div>
            </div>

            {/* Center Framing Reticle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border border-[#D8FF3E]/60 flex items-center justify-center">
                <div className="w-2 h-2 bg-[#D8FF3E]" />
              </div>
            </div>

            {/* Bottom Viewfinder Metadata */}
            <div className="relative z-10 flex items-center justify-between text-[#F2F0E8]">
              <div className="px-2 py-1 bg-black/80 border border-[#F2F0E8]/20 text-[11px]">
                RIG TRACK: {scene.cameraRig.movement}
              </div>
              <div className="px-2 py-1 bg-black/80 border border-[#F2F0E8]/20 text-[11px] text-[#D8FF3E]">
                RAW DIGITAL NEGATIVE // ISO 800
              </div>
            </div>
          </div>
        )}

        {/* ANALYSIS OVERLAY: 05 LIGHTING VECTOR */}
        {analysisMode === 'light' && (
          <div className="absolute inset-0 z-10 pointer-events-none p-6 flex items-start justify-end font-mono animate-fadeIn">
            <div className="bg-[#11110F]/95 border border-[#D8FF3E] p-4 max-w-sm space-y-2 text-xs">
              <div className="text-[#D8FF3E] font-bold">LIGHTING MAP & DIRECTION:</div>
              <div className="text-[#F2F0E8] text-[11px] leading-relaxed">
                {scene.cameraRig.lighting}
              </div>
              <div className="pt-2 border-t border-[#F2F0E8]/10 grid grid-cols-2 gap-2 text-[10px] text-[#8B887F]">
                <div>KEY/FILL RATIO: <span className="text-[#F2F0E8]">1:8 (Low-Key)</span></div>
                <div>FALLOFF: <span className="text-[#F2F0E8]">Inverse-Square</span></div>
                <div>ATMOSPHERE: <span className="text-[#F2F0E8]">Volumetric Haze</span></div>
                <div>DIFFUSION: <span className="text-[#F2F0E8]">Organic</span></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Two-Column Editorial Breakdown (Left: Script & Optics / Right: Visual DNA) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-[#F2F0E8]/10 pt-8">
        {/* Left Column (7 Cols): Hollywood Script & Narrative */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <div className="text-[11px] font-mono tracking-widest text-[#D8FF3E] uppercase mb-1">
              {scene.act}
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F2F0E8] uppercase">
              {scene.title}
            </h1>
            <div className="text-sm font-mono text-[#8B887F] mt-2">
              {scene.titleEn} · {scene.locationAndTime}
            </div>
          </div>

          {/* Hollywood Call Sheet & Script Prompt */}
          <div className="border border-[#F2F0E8]/10 bg-[#161614] p-5 space-y-3 font-mono">
            <div className="flex items-center justify-between text-xs text-[#8B887F] border-b border-[#F2F0E8]/10 pb-2">
              <span>HOLLYWOOD SCRIPT CALL SHEET & PRODUCTION PROMPT</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs text-[#D8FF3E] hover:underline cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'PROMPT COPIED' : 'COPY PROMPT'}</span>
              </button>
            </div>
            <pre className="text-xs text-[#F2F0E8] leading-relaxed whitespace-pre-wrap font-mono select-all">
              {scene.scriptPrompt}
            </pre>
          </div>

          {/* Camera Rig Optics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs border-t border-[#F2F0E8]/10 pt-6">
            <div>
              <div className="text-[10px] text-[#8B887F]">OPTICAL LENS</div>
              <div className="text-[#F2F0E8] mt-1 font-medium">{scene.cameraRig.lens}</div>
            </div>
            <div>
              <div className="text-[10px] text-[#8B887F]">SHUTTER & FPS</div>
              <div className="text-[#F2F0E8] mt-1 font-medium">{scene.cameraRig.shutter}</div>
            </div>
            <div>
              <div className="text-[10px] text-[#8B887F]">CAMERA MOVEMENT</div>
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
              <span>{isSavedInDossier ? 'SAVED IN DOSSIER' : 'ADD TO DOSSIER'}</span>
            </button>

            <button
              onClick={() => {
                playSpotlightClick();
                onOpenInLab(scene);
              }}
              className="px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider bg-white/10 hover:bg-[#D8FF3E] hover:text-[#11110F] text-[#F2F0E8] transition-colors cursor-pointer flex items-center gap-2"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>REMIX IN VISUAL LAB</span>
            </button>
          </div>

          {/* Related Scenes Strip Sharing Visual Principles */}
          {relatedScenes.length > 0 && (
            <div className="pt-8 border-t border-[#F2F0E8]/10 space-y-4">
              <div className="text-xs font-mono text-[#8B887F] uppercase tracking-wider">
                EXPLORE CORRELATED SCENES SHARING VISUAL PRINCIPLES:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedScenes.map((rel) => (
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
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="text-[10px] font-mono text-[#D8FF3E]">{rel.sceneNumber}</div>
                    <div className="text-xs font-medium text-[#F2F0E8] truncate">{rel.title}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (5 Cols): VISUAL DNA (The Core Interactive System) */}
        <div className="lg:col-span-5 space-y-6 border-t lg:border-t-0 lg:border-l border-[#F2F0E8]/10 lg:pl-10">
          <div>
            <div className="text-[11px] font-mono tracking-widest text-[#D8FF3E] uppercase mb-1">
              AESTHETIC DECONSTRUCTION
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-[#F2F0E8] uppercase">
              VISUAL DNA
            </h2>
            <p className="text-xs text-[#8B887F] font-mono mt-1">
              Click any DNA token to explore all scenes sharing that visual principle.
            </p>
          </div>

          {/* DNA Section: MOOD */}
          <div className="border-t border-[#F2F0E8]/10 pt-3">
            <div className="text-[10px] font-mono text-[#8B887F] uppercase mb-2">01 // MOOD GENOME</div>
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
            <div className="text-[10px] font-mono text-[#8B887F] uppercase mb-2">02 // LIGHTING GEOMETRY</div>
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
            <div className="text-[10px] font-mono text-[#8B887F] uppercase mb-2">03 // COLOR SPECTRUM</div>
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
            <div className="text-[10px] font-mono text-[#8B887F] uppercase mb-2">04 // OPTICAL SYNTAX</div>
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

          {/* DNA Section: COMPOSITION & BTS THEORY */}
          <div className="border-t border-[#F2F0E8]/10 pt-3">
            <div className="text-[10px] font-mono text-[#8B887F] uppercase mb-2">05 // COMPOSITION PRINCIPLE</div>
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
              <div className="text-xs font-sans text-[#8B887F] leading-relaxed border-l-2 border-[#D8FF3E] pl-3 py-1">
                {scene.behindTheScenes.whyItWorks}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
