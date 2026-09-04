import React, { useState, useMemo } from 'react';
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
  Layers, 
  ExternalLink,
  Wand2,
  Maximize2
} from 'lucide-react';
import { playSpotlightClick, playSuccessChime } from '../utils/audio';
import type { GalleryTheme } from '../types/theme';

interface BookOfShapesStudioProps {
  currentTheme?: GalleryTheme;
  onProjectToGallery?: (svgMarkup: string, title: string) => void;
  onNavigateToGallery?: () => void;
}

const COLOR_PALETTES = [
  { id: 'cozy', name: '暖夜琥珀', stroke: '#E07A5F', accent: '#F2CC8F', bg: '#1A1410' },
  { id: 'zen', name: '空山新竹', stroke: '#52B788', accent: '#D8F3DC', bg: '#121A15' },
  { id: 'cyber', name: '赛博电霓', stroke: '#00F0FF', accent: '#FF007F', bg: '#060913' },
  { id: 'louvre', name: '殿堂金叶', stroke: '#DFB15B', accent: '#FAF0CA', bg: '#1C150F' },
  { id: 'ghibli', name: '夏日晴空', stroke: '#3A86FF', accent: '#80ED99', bg: '#0F1A1C' },
  { id: 'mono', name: '包豪斯极黑', stroke: '#F8FAFC', accent: '#94A3B8', bg: '#030712' },
  { id: 'neon', name: '深空极光', stroke: '#A855F7', accent: '#EC4899', bg: '#0A0614' },
];

export const BookOfShapesStudio: React.FC<BookOfShapesStudioProps> = ({
  currentTheme = 'cozy-night',
  onProjectToGallery,
  onNavigateToGallery,
}) => {
  // Selected category & shape
  const [selectedShapeId, setSelectedShapeId] = useState<ShapeCategory>('quarter-arc-truchet');
  const [activeTag, setActiveTag] = useState<string>('all');

  // Parametric controls
  const [density, setDensity] = useState<number>(6);
  const [strokeWidth, setStrokeWidth] = useState<number>(2);
  const [variance, setVariance] = useState<number>(0.5);
  const [rotation, setRotation] = useState<number>(0);
  const [seed, setSeed] = useState<number>(42);

  // Palette
  const [activePalette, setActivePalette] = useState(COLOR_PALETTES[0]);

  // Copy feedbacks
  const [copiedSvg, setCopiedSvg] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [projectedSuccess, setProjectedSuccess] = useState(false);

  // Current shape definition
  const currentShapeDef = useMemo(() => {
    return SHAPE_CATALOG.find((s) => s.id === selectedShapeId) || SHAPE_CATALOG[0];
  }, [selectedShapeId]);

  // Combined config
  const currentConfig: ShapeConfig = useMemo(() => {
    return {
      type: selectedShapeId,
      density,
      strokeWidth,
      variance,
      rotation,
      colorScheme: activePalette.stroke,
      accentColor: activePalette.accent,
      bgColor: activePalette.bg,
      seed,
    };
  }, [selectedShapeId, density, strokeWidth, variance, rotation, activePalette, seed]);

  // Generated SVG markup
  const svgMarkup = useMemo(() => {
    return generateShapeSvg(currentConfig, 600);
  }, [currentConfig]);

  // Filtered shapes catalog
  const filteredShapes = useMemo(() => {
    if (activeTag === 'all') return SHAPE_CATALOG;
    return SHAPE_CATALOG.filter((s) => s.categoryTag === activeTag);
  }, [activeTag]);

  // Shuffle / Mutate
  const handleMutate = () => {
    playSpotlightClick();
    setSeed(Math.floor(Math.random() * 10000));
    setVariance(Number((0.2 + Math.random() * 0.7).toFixed(2)));
    setRotation(Math.floor(Math.random() * 8) * 45);
  };

  // Copy SVG
  const handleCopySvg = () => {
    playSuccessChime();
    navigator.clipboard.writeText(svgMarkup);
    setCopiedSvg(true);
    setTimeout(() => setCopiedSvg(false), 2200);
  };

  // Download SVG file
  const handleDownloadSvg = () => {
    playSuccessChime();
    const blob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `book-of-shapes-${selectedShapeId}-${seed}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Copy AI Prompt
  const handleCopyPrompt = () => {
    playSuccessChime();
    const prompt = `${currentShapeDef.suggestedPrompt}, vector linework, stroke width ${strokeWidth}px, density ${density}, color palette ${activePalette.name} (${activePalette.stroke} on ${activePalette.bg}), mathematically precise generative SVG art, by Nikolaj Sokolowski Book of Shapes --v 6.0 --ar 1:1`;
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2200);
  };

  // Project into 3D Gallery
  const handleProject = () => {
    if (onProjectToGallery) {
      playSuccessChime();
      onProjectToGallery(svgMarkup, currentShapeDef.name);
      setProjectedSuccess(true);
      setTimeout(() => setProjectedSuccess(false), 2500);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div 
        className="rounded-3xl p-6 sm:p-8 border shadow-xl relative overflow-hidden backdrop-blur-md"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full opacity-15 pointer-events-none blur-3xl"
          style={{ backgroundColor: activePalette.stroke }}
        />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide border flex items-center gap-1.5"
                style={{
                  backgroundColor: 'var(--tag-bg)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--accent)',
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Book of Shapes · 算法几何灵感
              </span>
              <a 
                href="https://bookofshapes.com" 
                target="_blank" 
                rel="noreferrer"
                className="text-xs font-mono text-muted hover:underline flex items-center gap-1 transition-opacity opacity-70 hover:opacity-100"
              >
                参考 Nikolaj Sokolowski 原作 <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <h1 className="text-2xl sm:text-4xl font-serif font-black tracking-tight" style={{ color: 'var(--text-main)' }}>
              形态之书 · 纯粹矢量数学工坊
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              解构 8 类经典生成式几何算法 —— 从 18 世纪特鲁歇迷宫到瑞士布罗克曼同心弧、PSR 脉冲波形与利萨如谐振。
              实时微调参数、一键导出纯净无瑕的 SVG 矢量代码，并可无缝挂载至 3D 虚拟展厅投影画廊或提取为 AI 绘图咒语。
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleMutate}
              className="px-4 py-2.5 rounded-xl font-sans text-xs font-bold flex items-center gap-2 border shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
              style={{
                backgroundColor: 'var(--bg-input)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-main)',
              }}
            >
              <Shuffle className="w-4 h-4 text-amber-500" />
              <span>🎲 随机突变 (Mutate)</span>
            </button>

            {onProjectToGallery && (
              <button
                onClick={handleProject}
                className="px-4 py-2.5 rounded-xl font-sans text-xs font-bold flex items-center gap-2 shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
                style={{
                  backgroundColor: 'var(--accent)',
                  color: 'var(--bg-card)',
                }}
              >
                {projectedSuccess ? <Check className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                <span>{projectedSuccess ? '已投射至 3D 展厅！' : '🖼️ 挂入 3D 展厅投影'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Studio Grid: Left Canvas Preview, Right Parametric Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 7 Cols: Interactive SVG Stage */}
        <div className="lg:col-span-7 space-y-4">
          <div 
            className="rounded-3xl p-6 sm:p-8 border shadow-2xl relative overflow-hidden flex flex-col items-center justify-center transition-all duration-300"
            style={{
              backgroundColor: activePalette.bg,
              borderColor: 'var(--border-subtle)',
              minHeight: '480px',
            }}
          >
            {/* Ambient Back Glow */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none blur-2xl transition-colors duration-500"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${activePalette.stroke}, transparent 70%)`
              }}
            />

            {/* Rendered SVG Canvas */}
            <div 
              className="w-full max-w-[460px] aspect-square relative z-10 shadow-inner rounded-2xl flex items-center justify-center"
              dangerouslySetInnerHTML={{ __html: svgMarkup }}
            />

            {/* Overlay Watermark Badges */}
            <div className="absolute bottom-4 left-6 z-20 flex items-center gap-3">
              <span className="text-[11px] font-mono tracking-widest uppercase opacity-70" style={{ color: activePalette.stroke }}>
                {currentShapeDef.enName}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded border opacity-60" style={{ borderColor: activePalette.stroke, color: activePalette.stroke }}>
                #{seed} · {currentShapeDef.categoryTag}
              </span>
            </div>

            <div className="absolute bottom-4 right-6 z-20 flex items-center gap-2">
              <button
                onClick={handleCopySvg}
                className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium backdrop-blur-md border flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                style={{
                  backgroundColor: 'rgba(0,0,0,0.45)',
                  borderColor: 'rgba(255,255,255,0.15)',
                  color: '#ffffff',
                }}
              >
                {copiedSvg ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Code className="w-3.5 h-3.5" />}
                <span>{copiedSvg ? 'SVG 已复制' : '复制 SVG 代码'}</span>
              </button>

              <button
                onClick={handleDownloadSvg}
                className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium backdrop-blur-md border flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                style={{
                  backgroundColor: 'rgba(0,0,0,0.45)',
                  borderColor: 'rgba(255,255,255,0.15)',
                  color: '#ffffff',
                }}
              >
                <Download className="w-3.5 h-3.5" />
                <span>下载 .svg</span>
              </button>
            </div>
          </div>

          {/* Design Philosophy Card */}
          <div 
            className="p-5 rounded-2xl border space-y-2.5 backdrop-blur-md"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold tracking-wide uppercase opacity-70" style={{ color: 'var(--accent)' }}>
                {currentShapeDef.designPhilosophy}
              </span>
              <span className="text-[11px] font-sans px-2 py-0.5 rounded-full border" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                数学与几何算法
              </span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-main)' }}>
              {currentShapeDef.description}
            </p>
          </div>
        </div>

        {/* Right 5 Cols: Controls & AI Prompt Bridge */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Sliders Control Panel */}
          <div 
            className="p-6 rounded-3xl border shadow-lg space-y-6 backdrop-blur-md"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                <h3 className="font-serif font-bold text-sm" style={{ color: 'var(--text-main)' }}>
                  生成参数微调 (Parameters)
                </h3>
              </div>
              <button 
                onClick={handleMutate}
                className="text-[11px] font-mono text-muted hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCw className="w-3 h-3" /> 重置种子
              </button>
            </div>

            {/* Density */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span style={{ color: 'var(--text-muted)' }}>网格密度 / 采样细分 (Density)</span>
                <span className="font-mono font-bold" style={{ color: 'var(--text-main)' }}>{density}</span>
              </div>
              <input 
                type="range" 
                min="2" 
                max="10" 
                step="1"
                value={density}
                onChange={(e) => setDensity(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Stroke Width */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span style={{ color: 'var(--text-muted)' }}>线条磅数 (Stroke Width)</span>
                <span className="font-mono font-bold" style={{ color: 'var(--text-main)' }}>{strokeWidth}px</span>
              </div>
              <input 
                type="range" 
                min="0.5" 
                max="5.0" 
                step="0.5"
                value={strokeWidth}
                onChange={(e) => setStrokeWidth(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Variance / Chaos */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span style={{ color: 'var(--text-muted)' }}>混沌度 / 振幅扰动 (Chaos)</span>
                <span className="font-mono font-bold" style={{ color: 'var(--text-main)' }}>{(variance * 100).toFixed(0)}%</span>
              </div>
              <input 
                type="range" 
                min="0.0" 
                max="1.0" 
                step="0.05"
                value={variance}
                onChange={(e) => setVariance(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Rotation */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span style={{ color: 'var(--text-muted)' }}>几何旋转 (Rotation)</span>
                <span className="font-mono font-bold" style={{ color: 'var(--text-main)' }}>{rotation}°</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="360" 
                step="15"
                value={rotation}
                onChange={(e) => setRotation(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Color Palette Selector */}
            <div className="space-y-2.5 pt-2 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                艺术场景色彩映射 (Color Mood)
              </span>
              <div className="grid grid-cols-4 gap-2">
                {COLOR_PALETTES.map((pal) => (
                  <button
                    key={pal.id}
                    onClick={() => {
                      playSpotlightClick();
                      setActivePalette(pal);
                    }}
                    className={`p-2 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-[11px] cursor-pointer ${
                      activePalette.id === pal.id ? 'ring-2 ring-amber-500 scale-105' : 'opacity-70 hover:opacity-100'
                    }`}
                    style={{
                      backgroundColor: pal.bg,
                      borderColor: 'rgba(255,255,255,0.15)',
                      color: pal.stroke,
                    }}
                  >
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pal.stroke }} />
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: pal.accent }} />
                    </div>
                    <span className="truncate w-full text-center text-[10px] font-sans font-medium">{pal.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* AI Prompt Synthesizer Box */}
          <div 
            className="p-6 rounded-3xl border shadow-lg space-y-4 backdrop-blur-md"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-purple-400" />
                <h4 className="font-serif font-bold text-sm" style={{ color: 'var(--text-main)' }}>
                  AI 提示词积木转换 (Prompt Bridge)
                </h4>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border" style={{ borderColor: 'var(--border-subtle)', color: 'var(--accent)' }}>
                Midjourney / Flux 适用
              </span>
            </div>

            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              将当前 Book of Shapes 几何参数转换为高精度的 AI 绘图咒语，完美复刻瑞士国际主义与现代算法艺术美学：
            </p>

            <div 
              className="p-3.5 rounded-xl border font-mono text-[11px] leading-relaxed break-words relative select-all"
              style={{
                backgroundColor: 'var(--bg-input)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-main)',
              }}
            >
              {currentShapeDef.suggestedPrompt}, vector linework, stroke width {strokeWidth}px, density {density}, palette {activePalette.name} ({activePalette.stroke} on {activePalette.bg}), mathematically precise generative SVG art, by Nikolaj Sokolowski Book of Shapes --v 6.0
            </div>

            <button
              onClick={handleCopyPrompt}
              className="w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'var(--bg-card)',
              }}
            >
              {copiedPrompt ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedPrompt ? '提示词已复制到剪贴板！' : '🪄 复制完整 AI 绘图咒语'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Catalog Selector Strip */}
      <div className="space-y-4 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-serif font-bold" style={{ color: 'var(--text-main)' }}>
              算法形态名录 (Generative Shapes Catalog)
            </h3>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              涵盖网格、同心圆、波形、流线、晶格与干涉 8 大核心数学范式
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-full border"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            {['all', 'grid', 'radial', 'noise', 'flow', 'isometric', 'distortion'].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  playSpotlightClick();
                  setActiveTag(tag);
                }}
                className={`px-3 py-1 rounded-full text-xs font-mono uppercase transition-all cursor-pointer ${
                  activeTag === tag ? 'bg-amber-500 text-black font-bold shadow' : 'opacity-60 hover:opacity-100'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Catalog Grid Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {filteredShapes.map((shape) => {
            const isSelected = shape.id === selectedShapeId;
            const thumbConfig: ShapeConfig = {
              type: shape.id,
              density: shape.defaultConfig.density || 6,
              strokeWidth: 1.8,
              variance: shape.defaultConfig.variance || 0.5,
              rotation: 0,
              colorScheme: isSelected ? activePalette.stroke : '#94A3B8',
              accentColor: isSelected ? activePalette.accent : '#F8FAFC',
              bgColor: isSelected ? activePalette.bg : '#090D16',
              seed: 42,
            };
            const thumbSvg = generateShapeSvg(thumbConfig, 160);

            return (
              <div
                key={shape.id}
                onClick={() => {
                  playSpotlightClick();
                  setSelectedShapeId(shape.id);
                  if (shape.defaultConfig.density) setDensity(shape.defaultConfig.density);
                  if (shape.defaultConfig.strokeWidth) setStrokeWidth(shape.defaultConfig.strokeWidth);
                  if (shape.defaultConfig.variance) setVariance(shape.defaultConfig.variance);
                }}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col gap-3 group ${
                  isSelected 
                    ? 'ring-2 ring-amber-500 shadow-xl scale-[1.02]' 
                    : 'hover:border-amber-500/50 hover:bg-black/20'
                }`}
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: isSelected ? 'var(--accent)' : 'var(--border-subtle)',
                }}
              >
                <div 
                  className="w-full aspect-square rounded-xl overflow-hidden flex items-center justify-center p-2 shadow-inner"
                  style={{ backgroundColor: thumbConfig.bgColor }}
                  dangerouslySetInnerHTML={{ __html: thumbSvg }}
                />

                <div className="space-y-1 text-left">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-xs" style={{ color: 'var(--text-main)' }}>
                      {shape.name}
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border uppercase opacity-60" style={{ borderColor: 'var(--border-subtle)' }}>
                      {shape.categoryTag}
                    </span>
                  </div>
                  <p className="text-[11px] font-mono truncate opacity-60" style={{ color: 'var(--text-muted)' }}>
                    {shape.enName}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
