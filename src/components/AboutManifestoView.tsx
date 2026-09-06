import React from 'react';
import { ArrowDown, ShieldAlert, Sparkles, Compass, CheckCircle2 } from 'lucide-react';
import { playSpotlightClick } from '../utils/audio';

interface AboutManifestoViewProps {
  onExploreArchive: () => void;
}

export const AboutManifestoView: React.FC<AboutManifestoViewProps> = ({
  onExploreArchive,
}) => {
  const systemFlow = [
    { label: 'LIGHT', desc: 'Photons, shadows, volumetric falloff, key-to-fill ratios.' },
    { label: 'COLOR', desc: 'Hue contrast, temperature separation, organic film emulsion.' },
    { label: 'SPACE', desc: 'Negative space, proportion shock, architectural perspective.' },
    { label: 'CAMERA', desc: 'Optics, focal compression, anamorphic distortion, shutter angle.' },
    { label: 'MOVEMENT', desc: 'Cinematic cadence, dollies, tracking momentum, stasis.' },
    { label: 'EMOTION', desc: 'Subconscious resonance, literary melancholy, sublime awe.' },
  ];

  const antiAiRules = [
    'NO purple-blue gradients or neon chromatic aberration.',
    'NO glassmorphism, floating blurred cards, or 3D blobs.',
    'NO generic Pinterest-style masonry image dump.',
    'NO fake telemetry HUD dashboards without semantic purpose.',
    'STRICT Swiss 12-column grid and hairline borders (0.14 opacity).',
    'Aesthetic restrained palette: #11110F Darkroom Canvas + #D8FF3E Acid Chartreuse.',
  ];

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-12 lg:py-20 text-[#F2F0E8] animate-fadeIn">
      {/* Top Banner */}
      <div className="border-b border-[#F2F0E8]/10 pb-6 mb-12">
        <div className="text-[11px] font-mono tracking-widest text-[#D8FF3E] uppercase mb-1">
          06 // MANIFESTO & AESTHETIC CONSTITUTION
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight uppercase">
          WHY THIS EXISTS
        </h1>
        <p className="text-sm font-mono text-[#8B887F] mt-2 max-w-xl">
          A declaration against the trivialization of cinematic images in the era of automated generation.
        </p>
      </div>

      {/* Monumental Manifesto Core */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-[#F2F0E8]/10 pb-16 mb-16">
        <div className="lg:col-span-6 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F2F0E8] leading-tight">
            Images are not just pictures.<br />
            <span className="text-[#D8FF3E]">They are systems.</span>
          </h2>

          <p className="text-base text-[#8B887F] leading-relaxed font-sans">
            普通的数字图库往往停留在“漂亮卡片”的被动浏览中。观者在无限滚动的瀑布流中迷失，却从未真正理解一张画面为何能在神经突触间激发战栗。
          </p>
          <p className="text-base text-[#8B887F] leading-relaxed font-sans">
            <strong>VISUAL ATLAS</strong> 建立于一个笃定信念：每一幅打动人心的电影杰作，都是由光线角度、光学焦段、几何网格与色彩极差精确构筑的语言体系。只有解构这种语法，创作者才能跨越平庸，创作出拥有永恒张力的作品。
          </p>

          <div className="pt-4">
            <button
              onClick={() => {
                playSpotlightClick();
                onExploreArchive();
              }}
              className="px-6 py-3.5 bg-[#D8FF3E] text-[#11110F] text-xs font-mono font-bold uppercase tracking-wider hover:bg-white transition-colors cursor-pointer"
            >
              DISCOVER THE ARCHIVE →
            </button>
          </div>
        </div>

        {/* Vertical System Flow Pipeline */}
        <div className="lg:col-span-6 border border-[#F2F0E8]/15 bg-[#141412] p-8 font-mono space-y-4">
          <div className="text-xs text-[#D8FF3E] uppercase tracking-widest border-b border-[#F2F0E8]/10 pb-2">
            THE ANATOMY OF CINEMA SYNTAX
          </div>

          <div className="space-y-4 pt-2">
            {systemFlow.map((step, idx) => (
              <div key={step.label} className="flex items-start gap-4 group">
                <div className="text-xs text-[#D8FF3E] font-bold shrink-0 pt-0.5">
                  0{idx + 1}
                </div>
                <div className="space-y-0.5">
                  <div className="text-sm font-bold text-[#F2F0E8] tracking-wider uppercase group-hover:text-[#D8FF3E] transition-colors">
                    {step.label}
                  </div>
                  <div className="text-xs text-[#8B887F] font-sans">
                    {step.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#F2F0E8]/10 text-center text-xs text-[#D8FF3E] font-bold tracking-widest">
            ↓ RESULT: VISUAL ATLAS
          </div>
        </div>
      </div>

      {/* The Anti-AI Design Constitution */}
      <div className="border border-[#F2F0E8]/15 bg-[#161614] p-8 lg:p-12 space-y-8">
        <div className="flex items-center gap-3 border-b border-[#F2F0E8]/10 pb-4">
          <ShieldAlert className="w-5 h-5 text-[#D8FF3E]" />
          <div>
            <div className="text-xs font-mono text-[#D8FF3E] uppercase">ANTI-AI-DESIGN CONSTITUTION</div>
            <h3 className="text-2xl font-bold uppercase tracking-tight text-[#F2F0E8]">
              DESIGN PRINCIPLES & RESTRAINT
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          {antiAiRules.map((rule, idx) => (
            <div key={idx} className="flex items-start gap-3 border border-[#F2F0E8]/10 p-4 bg-[#11110F]">
              <CheckCircle2 className="w-4 h-4 text-[#D8FF3E] shrink-0 mt-0.5" />
              <span className="text-[#8B887F] leading-relaxed">
                {rule}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-[#F2F0E8]/10 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-[#8B887F] gap-2">
          <span>CURATED BY VISUAL ARCHITECTS & CINEMATOGRAPHERS</span>
          <span className="text-[#D8FF3E]">SWISS EDITORIAL SYSTEM · 2026</span>
        </div>
      </div>
    </div>
  );
};
