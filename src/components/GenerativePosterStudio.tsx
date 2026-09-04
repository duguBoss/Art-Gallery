import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  SHAPE_CATALOG, 
  generateShapeSvg, 
  type ShapeCategory, 
  type ShapeConfig 
} from '../utils/shapeGenerators';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  Shuffle, 
  RotateCw, 
  Sliders, 
  Code, 
  Maximize2,
  Play,
  Pause,
  Wand2,
  ExternalLink,
  Volume2,
  VolumeX
} from 'lucide-react';
import { playSpotlightClick, playSuccessChime } from '../utils/audio';
import { THEME_OPTIONS, type GalleryTheme } from '../types/theme';

interface GenerativePosterStudioProps {
  currentTheme: GalleryTheme;
  onSelectTheme: (theme: GalleryTheme) => void;
}

type AspectRatio = '3:4' | '1:1' | '16:9';

const POSTER_THEME_PALETTES: Record<GalleryTheme, {
  name: string;
  enAtmosphere: string;
  formula: string;
  bg: string;
  paperTexture: string;
  primary: string;
  accent: string;
  border: string;
  textColor: string;
  subtextColor: string;
}> = {
  'cozy-night': {
    name: '暖夜孔版 · 温暖声场',
    enAtmosphere: 'WARM RISOGRAPH & ACOUSTIC RESONANCE',
    formula: 'z(x, t) = A · exp(-x²/2σ²) · cos(ωt + φ)',
    bg: '#18120E',
    paperTexture: 'radial-gradient(ellipse at 50% 30%, #2A1D16 0%, #16100C 100%)',
    primary: '#E07A5F',
    accent: '#F2CC8F',
    border: 'rgba(224, 122, 95, 0.25)',
    textColor: '#FDFBF7',
    subtextColor: '#C4A48A',
  },
  'zen-mist': {
    name: '空山墨痕 · 东方水墨',
    enAtmosphere: 'ZEN WABI-SABI & BAMBOO WATERMARKS',
    formula: 'r(θ) = R₀ + Σ aₖ cos(kθ + ψₖ)',
    bg: '#111714',
    paperTexture: 'radial-gradient(ellipse at 50% 20%, #19241E 0%, #0F1512 100%)',
    primary: '#52B788',
    accent: '#D8F3DC',
    border: 'rgba(82, 183, 136, 0.25)',
    textColor: '#E8F5EE',
    subtextColor: '#8BAA99',
  },
  'cyber-neon': {
    name: '酸性全息 · 赛博光栅',
    enAtmosphere: 'CYBER ACID GRAPHICS & CRT INTERFERENCE',
    formula: 'I(x, y) = cos(k₁·r) + cos(k₂·R_θ·r)',
    bg: '#050811',
    paperTexture: 'radial-gradient(ellipse at 50% 50%, #0D162B 0%, #04060C 100%)',
    primary: '#00F0FF',
    accent: '#FF007F',
    border: 'rgba(0, 240, 255, 0.3)',
    textColor: '#E0F7FA',
    subtextColor: '#64B5F6',
  },
  'grand-salon': {
    name: '卢浮殿堂 · 神圣几何',
    enAtmosphere: 'CLASSICAL ARCHITECTURAL SACRED GEOMETRY',
    formula: 'Φ = (1 + √5) / 2 ≈ 1.6180339887...',
    bg: '#1A140F',
    paperTexture: 'radial-gradient(ellipse at 50% 30%, #291E16 0%, #140E0A 100%)',
    primary: '#DFB15B',
    accent: '#FAF0CA',
    border: 'rgba(223, 177, 91, 0.3)',
    textColor: '#FFFBF2',
    subtextColor: '#C9AF8A',
  },
  'ghibli-breeze': {
    name: '云海晴风 · 柔性流线',
    enAtmosphere: 'ORGANIC VECTOR FLOW & SUMMER BREEZE',
    formula: '∇ × v = ω(x, y, t)',
    bg: '#0E1719',
    paperTexture: 'radial-gradient(ellipse at 50% 20%, #162529 0%, #0B1314 100%)',
    primary: '#3A86FF',
    accent: '#80ED99',
    border: 'rgba(58, 134, 255, 0.25)',
    textColor: '#F0F9FF',
    subtextColor: '#7BB3CD',
  },
};

export const GenerativePosterStudio: React.FC<GenerativePosterStudioProps> = ({
  currentTheme,
  onSelectTheme,
}) => {
  const [selectedShapeId, setSelectedShapeId] = useState<ShapeCategory>('joy-division');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('3:4');

  const [density, setDensity] = useState<number>(7);
  const [strokeWidth, setStrokeWidth] = useState<number>(1.8);
  const [variance, setVariance] = useState<number>(0.55);
  const [rotation, setRotation] = useState<number>(0);
  const [seed, setSeed] = useState<number>(1919);

  const [isAutoMorph, setIsAutoMorph] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isFullscreenPoster, setIsFullscreenPoster] = useState<boolean>(false);

  const [copiedSvg, setCopiedSvg] = useState<boolean>(false);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);
  const [downloadedPoster, setDownloadedPoster] = useState<boolean>(false);

  const audioCtxRef = useRef<AudioContext | null>(null);

  const playParamTone = (freq = 440) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch (e) {
      // silent
    }
  };

  const themePalette = POSTER_THEME_PALETTES[currentTheme];
  const currentShapeDef = useMemo(() => {
    return SHAPE_CATALOG.find((s) => s.id === selectedShapeId) || SHAPE_CATALOG[0];
  }, [selectedShapeId]);

  const currentConfig: ShapeConfig = useMemo(() => {
    return {
      type: selectedShapeId,
      density,
      strokeWidth,
      variance,
      rotation,
      colorScheme: themePalette.primary,
      accentColor: themePalette.accent,
      bgColor: 'transparent',
      seed,
    };
  }, [selectedShapeId, density, strokeWidth, variance, rotation, themePalette, seed]);

  const svgContent = useMemo(() => {
    return generateShapeSvg(currentConfig, 800);
  }, [currentConfig]);

  useEffect(() => {
    if (!isAutoMorph) return;

    let animFrame: number;
    let t = 0;

    const loop = () => {
      t += 0.02;
      const dynamicVariance = 0.3 + 0.45 * (Math.sin(t * 0.8) * 0.5 + 0.5);
      setVariance(Number(dynamicVariance.toFixed(3)));
      setRotation((prev) => (prev + 0.25) % 360);
      animFrame = requestAnimationFrame(loop);
    };

    animFrame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrame);
  }, [isAutoMorph]);

  const handleMutate = () => {
    playSpotlightClick();
    const newSeed = Math.floor(Math.random() * 10000);
    setSeed(newSeed);
    setVariance(Number((0.2 + Math.random() * 0.65).toFixed(2)));
    setRotation(Math.floor(Math.random() * 12) * 30);
    playParamTone(520 + (newSeed % 8) * 45);
  };

  const handleCopySvg = () => {
    playSuccessChime();
    navigator.clipboard.writeText(svgContent);
    setCopiedSvg(true);
    setTimeout(() => setCopiedSvg(false), 2000);
  };

  const handleDownloadSvg = () => {
    playSuccessChime();
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `book-of-shapes-${selectedShapeId}-${currentTheme}-${seed}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloadedPoster(true);
    setTimeout(() => setDownloadedPoster(false), 2500);
  };

  const handleCopyPrompt = () => {
    playSuccessChime();
    const ratioStr = aspectRatio === '3:4' ? '3:4' : aspectRatio === '16:9' ? '16:9' : '1:1';
    const prompt = `${currentShapeDef.suggestedPrompt}, minimalist Swiss poster layout, mathematical Bauhaus typography, crisp vector linework, stroke width ${strokeWidth}px, density ${density}, color palette: ${themePalette.name} (${themePalette.primary} on ${themePalette.bg}), Book of Shapes by Nikolaj Sokolowski --ar ${ratioStr} --v 6.0`;
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="w-full min-h-screen py-6 px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in transition-colors duration-500">
      {/* 1. TOP EDITORIAL TOOLBAR */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-2xl flex items-center justify-center border shadow-lg"
            style={{ 
              backgroundColor: themePalette.bg, 
              borderColor: themePalette.border,
              color: themePalette.primary,
              boxShadow: `0 0 20px ${themePalette.border}`
            }}
          >
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="font-serif font-black text-lg tracking-tight" style={{ color: themePalette.textColor }}>
                形态之书 · 生成设计台
              </span>
              <span 
                className="text-[10px] font-mono px-2 py-0.5 rounded-full border font-bold uppercase"
                style={{ 
                  backgroundColor: `${themePalette.primary}18`,
                  borderColor: themePalette.border,
                  color: themePalette.primary
                }}
              >
                BOOK OF SHAPES STUDIO
              </span>
            </div>
            <p className="text-xs font-mono opacity-60" style={{ color: themePalette.subtextColor }}>
              纯粹数学矢量生成器 · 瑞士现代主义平面海报 · 视频演示展示台
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/40 backdrop-blur-xl border border-white/15 shadow-inner">
            {THEME_OPTIONS.map((opt) => {
              const isCur = opt.id === currentTheme;
              const p = POSTER_THEME_PALETTES[opt.id];
              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    playSpotlightClick();
                    onSelectTheme(opt.id);
                    playParamTone(580);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-serif transition-all cursor-pointer flex items-center gap-1.5 ${
                    isCur 
                      ? 'bg-white/20 text-white font-bold shadow-md border border-white/30' 
                      : 'text-stone-400 hover:text-white hover:bg-white/10'
                  }`}
                  style={{ color: isCur ? p.primary : undefined }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.primary }} />
                  <span>{opt.name}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-full border transition-all cursor-pointer ${
              soundEnabled ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-black/40 text-stone-500 border-white/10'
            }`}
            title={soundEnabled ? '已开启参数反馈音效' : '已静音'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* 2. MAIN SPLIT STAGE */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: INTERACTIVE POSTER */}
        <div className="lg:col-span-7 flex flex-col items-center gap-4">
          <div 
            className={`w-full rounded-3xl p-6 sm:p-10 border shadow-2xl relative overflow-hidden transition-all duration-500 ${
              isFullscreenPoster ? 'fixed inset-4 z-50 p-12 flex items-center justify-center' : ''
            }`}
            style={{
              background: themePalette.paperTexture,
              borderColor: themePalette.border,
              boxShadow: `0 30px 60px rgba(0,0,0,0.8), 0 0 50px ${themePalette.border}`,
            }}
          >
            <div 
              className="absolute -right-16 -top-16 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-20 transition-all duration-700"
              style={{ backgroundColor: themePalette.primary }}
            />

            <div 
              className={`w-full mx-auto flex flex-col justify-between border transition-all duration-500 rounded-2xl p-6 sm:p-8 backdrop-blur-sm relative z-10 ${
                aspectRatio === '3:4' ? 'max-w-[480px] aspect-[3/4]' : aspectRatio === '1:1' ? 'max-w-[500px] aspect-square' : 'max-w-full aspect-[16/9]'
              }`}
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.45)',
                borderColor: themePalette.border,
              }}
            >
              <span className="absolute top-2 left-2 text-[10px] font-mono opacity-40 select-none" style={{ color: themePalette.primary }}>┌</span>
              <span className="absolute top-2 right-2 text-[10px] font-mono opacity-40 select-none" style={{ color: themePalette.primary }}>┐</span>
              <span className="absolute bottom-2 left-2 text-[10px] font-mono opacity-40 select-none" style={{ color: themePalette.primary }}>└</span>
              <span className="absolute bottom-2 right-2 text-[10px] font-mono opacity-40 select-none" style={{ color: themePalette.primary }}>┘</span>

              <div className="space-y-2 border-b pb-4 text-left" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <div className="flex items-center justify-between text-[10px] font-mono tracking-widest uppercase">
                  <span className="font-bold flex items-center gap-1.5" style={{ color: themePalette.primary }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: themePalette.primary }} />
                    BOOK OF SHAPES · {currentShapeDef.categoryTag}
                  </span>
                  <span className="opacity-60" style={{ color: themePalette.subtextColor }}>
                    NO. {seed} / FORMULA
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight" style={{ color: themePalette.textColor }}>
                    {currentShapeDef.name}
                  </h2>
                  <span className="text-xs font-mono tracking-wider opacity-70" style={{ color: themePalette.subtextColor }}>
                    {currentShapeDef.enName}
                  </span>
                </div>

                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[10px] font-mono opacity-50 px-2 py-0.5 rounded border" style={{ borderColor: 'rgba(255,255,255,0.1)', color: themePalette.subtextColor }}>
                    f(x, t): {themePalette.formula}
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-widest opacity-40" style={{ color: themePalette.primary }}>
                    SWISS MODERNISM
                  </span>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center p-4 relative my-auto">
                <div 
                  className="w-full h-full max-h-[360px] flex items-center justify-center transition-transform duration-300"
                  dangerouslySetInnerHTML={{ __html: svgContent }}
                />
              </div>

              <div className="border-t pt-4 space-y-2.5 text-left" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <div className="flex items-center justify-between text-[10px] font-mono opacity-70" style={{ color: themePalette.subtextColor }}>
                  <span>DENSITY: {density}</span>
                  <span>STROKE: {strokeWidth}PX</span>
                  <span>CHAOS: {(variance * 100).toFixed(0)}%</span>
                  <span>ROT: {rotation}°</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: themePalette.primary }} title="Primary" />
                    <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: themePalette.accent }} title="Accent" />
                    <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: themePalette.bg }} title="Background" />
                    <span className="text-[10px] font-mono ml-1.5 opacity-60" style={{ color: themePalette.subtextColor }}>
                      {themePalette.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono tracking-widest opacity-40" style={{ color: themePalette.textColor }}>
                      ||| | |||| | |||
                    </span>
                    <span className="text-[9px] font-mono opacity-50 px-1.5 py-0.5 rounded border border-white/10" style={{ color: themePalette.primary }}>
                      GEN·VEC 2026
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {isFullscreenPoster && (
              <button
                onClick={() => setIsFullscreenPoster(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-black/70 border border-white/20 text-white cursor-pointer z-50 hover:bg-black"
              >
                ✕ 退出演示模式
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between w-full max-w-[480px] gap-2 px-2">
            <div className="flex items-center gap-1 p-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15">
              {(['3:4', '1:1', '16:9'] as AspectRatio[]).map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    playSpotlightClick();
                    setAspectRatio(r);
                  }}
                  className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all cursor-pointer ${
                    aspectRatio === r ? 'bg-white/20 text-white font-bold' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {r === '3:4' ? '📐 3:4 经典海报' : r === '1:1' ? '🔲 1:1 胶片方构' : '🖥️ 16:9 影视横幅'}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFullscreenPoster(!isFullscreenPoster)}
                className="p-2 rounded-xl bg-black/40 hover:bg-white/10 border border-white/15 text-stone-300 hover:text-white transition-all cursor-pointer"
                title="全屏演示投影 (适合视频录制)"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SYNTH CONTROLLER */}
        <div className="lg:col-span-5 space-y-6">
          <div 
            className="p-6 rounded-3xl border shadow-xl space-y-6 backdrop-blur-xl relative text-left"
            style={{
              backgroundColor: 'rgba(15, 12, 10, 0.75)',
              borderColor: themePalette.border,
            }}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4" style={{ color: themePalette.primary }} />
                <h3 className="font-serif font-bold text-sm text-white">
                  生成参数合成器 (Generative Synth)
                </h3>
              </div>

              <button
                onClick={() => {
                  playSpotlightClick();
                  setIsAutoMorph(!isAutoMorph);
                  if (!isAutoMorph) playParamTone(640);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-lg ${
                  isAutoMorph
                    ? 'bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.5)] animate-pulse'
                    : 'bg-white/10 text-stone-300 border-white/20 hover:bg-white/15'
                }`}
                title="开启自动动态演化：图形平滑流转演变，极度适合录屏演示展示"
              >
                {isAutoMorph ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isAutoMorph ? '动态演化中...' : '🎬 自动演化演示'}</span>
              </button>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-stone-400">细分密度 / 网格粒度 (Subdivisions)</span>
                <span className="font-bold text-white">{density}</span>
              </div>
              <input
                type="range"
                min="2"
                max="12"
                step="1"
                value={density}
                onChange={(e) => {
                  setDensity(Number(e.target.value));
                  playParamTone(380 + Number(e.target.value) * 35);
                }}
                className="w-full accent-amber-500 cursor-pointer h-1.5 bg-stone-800 rounded-lg"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-stone-400">线条磅数 / 描边粗细 (Stroke Weight)</span>
                <span className="font-bold text-white">{strokeWidth}px</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5.0"
                step="0.2"
                value={strokeWidth}
                onChange={(e) => {
                  setStrokeWidth(Number(e.target.value));
                  playParamTone(420 + Number(e.target.value) * 30);
                }}
                className="w-full accent-amber-500 cursor-pointer h-1.5 bg-stone-800 rounded-lg"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-stone-400">混沌扰动 / 振幅波长 (Chaos Factor)</span>
                <span className="font-bold text-white">{(variance * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.02"
                value={variance}
                onChange={(e) => {
                  setVariance(Number(e.target.value));
                  playParamTone(440 + Number(e.target.value) * 120);
                }}
                className="w-full accent-amber-500 cursor-pointer h-1.5 bg-stone-800 rounded-lg"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-stone-400">几何旋转角 (Spatial Rotation)</span>
                <span className="font-bold text-white">{rotation}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                step="15"
                value={rotation}
                onChange={(e) => {
                  setRotation(Number(e.target.value));
                  playParamTone(360 + (Number(e.target.value) / 360) * 200);
                }}
                className="w-full accent-amber-500 cursor-pointer h-1.5 bg-stone-800 rounded-lg"
              />
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleMutate}
                className="flex-1 py-2.5 px-4 rounded-xl font-sans text-xs font-bold flex items-center justify-center gap-2 border border-white/20 bg-white/10 hover:bg-white/15 text-white transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md"
              >
                <Shuffle className="w-4 h-4 text-amber-400" />
                <span>🎲 突变随机种子 (#{seed})</span>
              </button>

              <button
                onClick={() => {
                  playSpotlightClick();
                  setRotation(0);
                  setVariance(0.5);
                }}
                className="p-2.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white transition-all cursor-pointer"
                title="归位"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* AI Prompt Synthesizer Box */}
          <div 
            className="p-6 rounded-3xl border shadow-xl space-y-4 backdrop-blur-xl text-left"
            style={{
              backgroundColor: 'rgba(15, 12, 10, 0.75)',
              borderColor: themePalette.border,
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-purple-400" />
                <h4 className="font-serif font-bold text-sm text-white">
                  AI 提示词积木转换 (Prompt Recipe)
                </h4>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-purple-500/30 text-purple-300 bg-purple-500/10">
                Midjourney / Flux
              </span>
            </div>

            <p className="text-xs leading-relaxed text-stone-400">
              已根据当前算法模型与参数，生成适配 Midjourney / SD 的高精度设计咒语：
            </p>

            <div 
              className="p-3.5 rounded-xl border font-mono text-[11px] leading-relaxed break-words bg-black/50 border-white/15 text-stone-200 select-all"
            >
              {currentShapeDef.suggestedPrompt}, minimalist Swiss poster layout, mathematical Bauhaus typography, crisp vector linework, stroke width {strokeWidth}px, density {density}, color palette: {themePalette.name} ({themePalette.primary} on {themePalette.bg}), Book of Shapes by Nikolaj Sokolowski --ar {aspectRatio === '3:4' ? '3:4' : aspectRatio === '16:9' ? '16:9' : '1:1'} --v 6.0
            </div>

            <button
              onClick={handleCopyPrompt}
              className="w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              style={{
                backgroundColor: copiedPrompt ? '#10B981' : themePalette.primary,
                color: '#120F0C',
              }}
            >
              {copiedPrompt ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
              <span>{copiedPrompt ? 'AI 咒语已复制到剪贴板！' : '🪄 一键复制完整 AI 绘图咒语'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleCopySvg}
              className="py-3 px-4 rounded-2xl font-mono text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border-white/20 text-white hover:scale-105 active:scale-95"
            >
              {copiedSvg ? <Check className="w-4 h-4 text-emerald-400" /> : <Code className="w-4 h-4" />}
              <span>{copiedSvg ? 'SVG 已复制' : '复制 SVG 代码'}</span>
            </button>

            <button
              onClick={handleDownloadSvg}
              className="py-3 px-4 rounded-2xl font-mono text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-2 border-white/20 text-white hover:scale-105 active:scale-95"
              style={{
                backgroundColor: `${themePalette.primary}25`,
                borderColor: themePalette.border,
                color: themePalette.primary,
              }}
            >
              {downloadedPoster ? <Check className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4" />}
              <span>{downloadedPoster ? '已导出！' : '下载 .SVG 矢量海报'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM CAROUSEL: 8 ALGORITHMIC PARADIGMS */}
      <div className="max-w-7xl mx-auto space-y-4 pt-6 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 text-left">
          <div>
            <h3 className="text-lg font-serif font-black text-white">
              八大算法几何范式名录 (Generative Paradigms)
            </h3>
            <p className="text-xs text-stone-400">
              源于 Book of Shapes 开源数学图谱，点击立即载入生成设计台
            </p>
          </div>
          <a
            href="https://bookofshapes.com"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-mono text-stone-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            参考 Nikolaj Sokolowski 原作 <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {SHAPE_CATALOG.map((shape) => {
            const isSelected = shape.id === selectedShapeId;
            const thumbConfig: ShapeConfig = {
              type: shape.id,
              density: shape.defaultConfig.density || 6,
              strokeWidth: 1.8,
              variance: shape.defaultConfig.variance || 0.5,
              rotation: 0,
              colorScheme: isSelected ? themePalette.primary : '#94A3B8',
              accentColor: isSelected ? themePalette.accent : '#F8FAFC',
              bgColor: 'transparent',
              seed: 42,
            };
            const thumbSvg = generateShapeSvg(thumbConfig, 140);

            return (
              <button
                key={shape.id}
                onClick={() => {
                  playSpotlightClick();
                  setSelectedShapeId(shape.id);
                  if (shape.defaultConfig.density) setDensity(shape.defaultConfig.density);
                  if (shape.defaultConfig.strokeWidth) setStrokeWidth(shape.defaultConfig.strokeWidth);
                  if (shape.defaultConfig.variance) setVariance(shape.defaultConfig.variance);
                  playParamTone(480);
                }}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col gap-2 group text-left ${
                  isSelected 
                    ? 'ring-2 ring-amber-400 scale-[1.03] shadow-xl' 
                    : 'hover:border-white/30 hover:bg-white/5 opacity-75 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: isSelected ? 'rgba(0, 0, 0, 0.65)' : 'rgba(0, 0, 0, 0.35)',
                  borderColor: isSelected ? themePalette.primary : 'rgba(255,255,255,0.1)',
                }}
              >
                <div 
                  className="w-full aspect-square rounded-xl overflow-hidden flex items-center justify-center p-2 bg-black/40 border border-white/10 shadow-inner group-hover:scale-105 transition-transform"
                  dangerouslySetInnerHTML={{ __html: thumbSvg }}
                />

                <div className="space-y-0.5">
                  <span className="font-serif font-bold text-xs text-white block truncate">
                    {shape.name}
                  </span>
                  <span className="text-[10px] font-mono text-stone-400 block truncate uppercase">
                    {shape.categoryTag}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
