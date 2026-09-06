import React, { useState } from 'react';
import { ArrowLeft, Copy, Check, Bookmark, Sparkles, Sliders, ChevronLeft, ChevronRight } from 'lucide-react';
import type { CinemaScene } from '../types/cinema';
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
    mood: [scene.cameraRig.mood.split(' ')[0], scene.cameraRig.mood.split('&')[1]?.trim() || 'Cinematic'].filter(Boolean),
    light: [scene.cameraRig.lighting.split(' ')[0], 'Directional', 'Volumetric'],
    camera: [scene.cameraRig.lens.split(' ')[0], 'Anamorphic T/1.8', 'Shallow DOF'],
    composition: [scene.behindTheScenes?.atomName || 'Negative Space', 'Rule of Thirds', '2.39:1 Cinema'],
    color: scene.colorPalette || ['#030712', '#06b6d4', '#f59e0b'],
  };

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
              className="p-1 hover:text-[#D8FF3E] transition-colors"
              title="Previous Scene"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                playSpotlightClick();
                onSelectScene(nextScene.id);
              }}
              className="p-1 hover:text-[#D8FF3E] transition-colors"
              title="Next Scene"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Monumental Hero Image Viewport */}
      <div className="relative w-full aspect-video max-h-[72vh] bg-[#181815] border border-[#F2F0E8]/15 overflow-hidden mb-12 shadow-2xl">
        <img
          src={scene.coverImage}
          alt={scene.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 border border-[#F2F0E8]/15 text-[11px] font-mono text-[#D8FF3E]">
          {scene.sceneNumber} · 2.39:1 CINEMATIC FRAME
        </div>
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
              <span>HOLLYWOOD SCRIPT CALL SHEET & PROMPT</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs text-[#D8FF3E] hover:underline cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'PROMPT COPIED' : 'COPY PROMPT'}</span>
              </button>
            </div>
            <pre className="text-xs text-[#F2F0E8] leading-relaxed whitespace-pre-wrap font-mono">
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
