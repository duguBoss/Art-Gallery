import React, { useState } from 'react';
import type { CinemaScene } from '../types/cinema';
import { Copy, Check, Bookmark, Sparkles, RefreshCw } from 'lucide-react';
import { playSpotlightClick, playSuccessChime } from '../utils/audio';

interface VisualLabViewProps {
  initialScene?: CinemaScene;
  onSavePromptToDossier?: (promptText: string) => void;
}

export const VisualLabView: React.FC<VisualLabViewProps> = ({
  initialScene,
  onSavePromptToDossier,
}) => {
  const [mood, setMood] = useState('Melancholic Dystopia');
  const [light, setLight] = useState('Low-Key Volumetric Rim');
  const [camera, setCamera] = useState('Cooke Anamorphic 35mm T/1.8');
  const [composition, setComposition] = useState('Negative Space 70%');
  const [color, setColor] = useState('Electric Cyan & Warm Amber Contrast');
  const [aspect, setAspect] = useState('--ar 16:9');
  const [copied, setCopied] = useState(false);

  const moodOptions = ['Melancholic Dystopia', 'Monumental Austere Brutalism', 'Poetic Editorial Silence', 'Eastern Misty Zen', 'Healing Ghibli Summer'];
  const lightOptions = ['Low-Key Volumetric Rim', 'Cathedral Single-Source God Ray', '100% Diffuse North Window Light', 'Neon Wet Reflections', 'Golden Sunset Flare'];
  const cameraOptions = ['Cooke Anamorphic 35mm T/1.8', 'Arri Signature Prime 24mm Wide', 'Leitz Summilux-C 50mm Prime', 'Hasselblad 80mm Medium Format'];
  const compositionOptions = ['Negative Space 70%', 'Centered Scale Shock (5% Human vs 95% Wall)', 'Rule of Thirds Horizon', 'Layered Foreground Bokeh'];
  const colorOptions = ['Electric Cyan & Warm Amber Contrast', 'Monochrome Architectural Grayscale', 'Warm Linen & Aged Oak', 'Deep Jade & Ink Stone'];

  const generatedPrompt = `[SCENE] Master cinematic visual production. ${mood}. ${light}. ${composition}. Optical capture: ${camera}. Color grading: ${color}. Photorealistic cinema frame, natural organic film grain, ultra-high dynamic range ${aspect} --v 6.1 --stylize 300`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    playSuccessChime();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-8 lg:py-12 text-[#F2F0E8]">
      {/* Header */}
      <div className="border-b border-[#F2F0E8]/10 pb-6 mb-8">
        <div className="text-[11px] font-mono tracking-widest text-[#D8FF3E] uppercase mb-1">
          HOLLYWOOD PROMPT ENGINE // CREATIVE LABORATORY
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight uppercase">
          VISUAL LAB
        </h2>
        <p className="text-xs text-[#8B887F] font-mono mt-1">
          Synthesize aesthetic genome tokens into precise cinematic AI production prompts.
        </p>
      </div>

      {/* Mixer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column (7 Cols): Parameter Controls */}
        <div className="lg:col-span-7 space-y-6">
          <div className="text-xs font-mono text-[#D8FF3E] uppercase tracking-wider">
            WHAT ARE YOU CREATING? // PARAMETERS
          </div>

          {/* MOOD */}
          <div>
            <label className="text-[10px] font-mono text-[#8B887F] uppercase block mb-2">01 // MOOD GENOME</label>
            <div className="flex flex-wrap gap-2">
              {moodOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { playSpotlightClick(); setMood(opt); }}
                  className={`px-3 py-1.5 border text-xs font-mono transition-colors cursor-pointer ${
                    mood === opt
                      ? 'border-[#D8FF3E] bg-[#D8FF3E] text-[#11110F] font-bold'
                      : 'border-[#F2F0E8]/15 bg-[#141412] text-[#F2F0E8] hover:border-[#F2F0E8]/40'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* LIGHT */}
          <div>
            <label className="text-[10px] font-mono text-[#8B887F] uppercase block mb-2">02 // LIGHTING GEOMETRY</label>
            <div className="flex flex-wrap gap-2">
              {lightOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { playSpotlightClick(); setLight(opt); }}
                  className={`px-3 py-1.5 border text-xs font-mono transition-colors cursor-pointer ${
                    light === opt
                      ? 'border-[#D8FF3E] bg-[#D8FF3E] text-[#11110F] font-bold'
                      : 'border-[#F2F0E8]/15 bg-[#141412] text-[#F2F0E8] hover:border-[#F2F0E8]/40'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* OPTICS */}
          <div>
            <label className="text-[10px] font-mono text-[#8B887F] uppercase block mb-2">03 // OPTICAL SYNTAX (LENS)</label>
            <div className="flex flex-wrap gap-2">
              {cameraOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { playSpotlightClick(); setCamera(opt); }}
                  className={`px-3 py-1.5 border text-xs font-mono transition-colors cursor-pointer ${
                    camera === opt
                      ? 'border-[#D8FF3E] bg-[#D8FF3E] text-[#11110F] font-bold'
                      : 'border-[#F2F0E8]/15 bg-[#141412] text-[#F2F0E8] hover:border-[#F2F0E8]/40'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* COMPOSITION */}
          <div>
            <label className="text-[10px] font-mono text-[#8B887F] uppercase block mb-2">04 // COMPOSITION & RATIO</label>
            <div className="flex flex-wrap gap-2">
              {compositionOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { playSpotlightClick(); setComposition(opt); }}
                  className={`px-3 py-1.5 border text-xs font-mono transition-colors cursor-pointer ${
                    composition === opt
                      ? 'border-[#D8FF3E] bg-[#D8FF3E] text-[#11110F] font-bold'
                      : 'border-[#F2F0E8]/15 bg-[#141412] text-[#F2F0E8] hover:border-[#F2F0E8]/40'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* COLOR */}
          <div>
            <label className="text-[10px] font-mono text-[#8B887F] uppercase block mb-2">05 // COLOR PALETTE</label>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { playSpotlightClick(); setColor(opt); }}
                  className={`px-3 py-1.5 border text-xs font-mono transition-colors cursor-pointer ${
                    color === opt
                      ? 'border-[#D8FF3E] bg-[#D8FF3E] text-[#11110F] font-bold'
                      : 'border-[#F2F0E8]/15 bg-[#141412] text-[#F2F0E8] hover:border-[#F2F0E8]/40'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (5 Cols): Synthesized Result & Production Terminal */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-[#161614] border border-[#F2F0E8]/10 p-6">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#8B887F] border-b border-[#F2F0E8]/10 pb-3 mb-4">
              <span className="text-[#D8FF3E]">SYNTHESIZED HOLLYWOOD PROMPT</span>
              <span>READY TO RENDER</span>
            </div>

            <div className="bg-[#11110F] border border-[#F2F0E8]/10 p-4 font-mono text-xs text-[#F2F0E8] leading-relaxed whitespace-pre-wrap select-all">
              {generatedPrompt}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-[11px] font-mono text-[#8B887F]">
              <div className="border-l border-[#D8FF3E] pl-2">
                <div>ESTIMATED STYLIZE</div>
                <div className="text-[#F2F0E8] mt-0.5">300 (Cinematic Focus)</div>
              </div>
              <div className="border-l border-[#F2F0E8]/20 pl-2">
                <div>COLOR BALANCE</div>
                <div className="text-[#F2F0E8] mt-0.5">Complementary Contrast</div>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-[#F2F0E8]/10">
            <button
              onClick={handleCopy}
              className="w-full py-3 bg-[#D8FF3E] text-[#11110F] text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'PROMPT COPIED TO CLIPBOARD' : 'COPY SYNTHESIZED PROMPT'}</span>
            </button>

            {onSavePromptToDossier && (
              <button
                onClick={() => onSavePromptToDossier(generatedPrompt)}
                className="w-full py-3 border border-[#F2F0E8]/20 hover:border-[#D8FF3E] hover:text-[#D8FF3E] text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Bookmark className="w-4 h-4" />
                <span>SAVE PROMPT TO DOSSIER</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
