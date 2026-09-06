import React, { useState, useRef } from 'react';
import type { CinemaScene } from '../types/cinema';
import { playSpotlightClick } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';

interface VisualConstellationViewProps {
  scenes: CinemaScene[];
  onSelectScene: (sceneId: string) => void;
}

interface LanguageNode {
  id: string;
  labelEn: string;
  labelZh: string;
  category: 'MOOD' | 'LIGHT' | 'OPTICS' | 'COMPOSITION' | 'COLOR';
  descriptionZh: string;
  descriptionEn: string;
  x: number;
  y: number;
  connectedNodeIds: string[];
  sceneIds: string[];
}

export const VisualConstellationView: React.FC<VisualConstellationViewProps> = ({
  scenes,
  onSelectScene,
}) => {
  const { lang, t } = useLanguage();
  const [filter, setFilter] = useState<'ALL' | 'MOOD' | 'LIGHT' | 'OPTICS' | 'COMPOSITION'>('ALL');
  const [activeNodeId, setActiveNodeId] = useState<string>('node-low-key');
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);

  const [nodes, setNodes] = useState<LanguageNode[]>([
    {
      id: 'node-melancholy',
      labelEn: 'MELANCHOLIC NOCTURNE',
      labelZh: '蓝调忧郁夜色',
      category: 'MOOD',
      descriptionZh: '雨夜与霓虹浸润下的迷离孤寂，利用冷暖极端色相制造心理距离。',
      descriptionEn: 'Nocturnal isolation soaked in neon rain, using extreme chromatic contrast to build psychological alienation.',
      x: 20,
      y: 28,
      connectedNodeIds: ['node-low-key', 'node-anamorphic', 'node-cyan-amber'],
      sceneIds: [scenes[0]?.id].filter(Boolean),
    },
    {
      id: 'node-low-key',
      labelEn: 'LOW-KEY VOLUMETRIC RIM',
      labelZh: '低调反差轮廓光',
      category: 'LIGHT',
      descriptionZh: '大面积暗调仅以边缘轮廓光勾勒形体，建立极端反差与雕塑质感。',
      descriptionEn: 'Deep low-key shadow sculpted solely by volumetric rim lighting, carving heroic contrast and texture.',
      x: 36,
      y: 44,
      connectedNodeIds: ['node-melancholy', 'node-anamorphic', 'node-negative-space'],
      sceneIds: [scenes[0]?.id, scenes[3]?.id].filter(Boolean),
    },
    {
      id: 'node-anamorphic',
      labelEn: 'ANAMORPHIC 35MM / 2.39:1',
      labelZh: '变形宽银幕 35MM / 2.39:1',
      category: 'OPTICS',
      descriptionZh: '好莱坞宽银幕变形镜头独有的椭圆焦外光斑与水平耀斑条纹。',
      descriptionEn: 'Hollywood vintage anamorphic lens characteristics: oval bokeh, horizontal flare, and organic distortion.',
      x: 52,
      y: 26,
      connectedNodeIds: ['node-melancholy', 'node-low-key', 'node-monolith'],
      sceneIds: [scenes[0]?.id, scenes[3]?.id].filter(Boolean),
    },
    {
      id: 'node-monolith',
      labelEn: 'MONUMENTAL SCALE SHOCK',
      labelZh: '巨构比例震慑',
      category: 'COMPOSITION',
      descriptionZh: '微观人类体量（5%）与宏伟混凝土巨构（95%）的极端尺度碰撞。',
      descriptionEn: 'Extreme scale dissonance: 5% miniature human figure juxtaposed against 95% brutalist monolith.',
      x: 74,
      y: 35,
      connectedNodeIds: ['node-anamorphic', 'node-god-ray', 'node-symmetry'],
      sceneIds: [scenes[1]?.id].filter(Boolean),
    },
    {
      id: 'node-god-ray',
      labelEn: 'CATHEDRAL GOD RAY',
      labelZh: '大教堂神圣光柱',
      category: 'LIGHT',
      descriptionZh: '单一高角度穿透性直射光柱，伴随悬浮微粒形成神圣几何切面。',
      descriptionEn: 'Singular high-angle collimated shaft of sunlight, intersecting architectural atmospheric dust.',
      x: 82,
      y: 65,
      connectedNodeIds: ['node-monolith', 'node-negative-space'],
      sceneIds: [scenes[1]?.id].filter(Boolean),
    },
    {
      id: 'node-negative-space',
      labelEn: 'NEGATIVE SPACE 78%',
      labelZh: '负空间留白 78%',
      category: 'COMPOSITION',
      descriptionZh: '大面积留白给予观者视线充分的停泊之所，赋予版面呼吸生命。',
      descriptionEn: 'High negative space granting visual breathing room, evoking Japanese Ma and Swiss modernist balance.',
      x: 48,
      y: 72,
      connectedNodeIds: ['node-low-key', 'node-diffuse', 'node-god-ray'],
      sceneIds: [scenes[2]?.id].filter(Boolean),
    },
    {
      id: 'node-diffuse',
      labelEn: '100% DIFFUSE WINDOW LIGHT',
      labelZh: '100% 柔和漫射天光',
      category: 'LIGHT',
      descriptionZh: '柔和北向天光，零硬阴影，呈现如画报触感般的有机灰阶过渡。',
      descriptionEn: 'Soft northern daylight without specular harshness, rendering velvet editorial greyscale falloff.',
      x: 24,
      y: 70,
      connectedNodeIds: ['node-negative-space', 'node-melancholy'],
      sceneIds: [scenes[2]?.id].filter(Boolean),
    },
    {
      id: 'node-symmetry',
      labelEn: 'ONE-POINT SYMMETRY',
      labelZh: '严苛单点透视对称',
      category: 'COMPOSITION',
      descriptionZh: '库布里克式严苛单点透视中心消失点，消除余赘，建立冰冷理性。',
      descriptionEn: 'Kubrickian centered one-point perspective converging at optical horizon, enforcing clinical order.',
      x: 66,
      y: 60,
      connectedNodeIds: ['node-monolith', 'node-negative-space'],
      sceneIds: [scenes[5]?.id || scenes[1]?.id].filter(Boolean),
    },
    {
      id: 'node-cyan-amber',
      labelEn: 'CYAN & AMBER CONTRAST',
      labelZh: '青冷与琥珀暖色反差',
      category: 'COLOR',
      descriptionZh: '好莱坞经典冷暖色相极差，冷调背景拉升空间深度，暖调前景锁定视线。',
      descriptionEn: 'Classic cinema chromatic polarity: cyan background receding spatial depth, warm amber foreground locking gaze.',
      x: 38,
      y: 18,
      connectedNodeIds: ['node-melancholy', 'node-anamorphic'],
      sceneIds: [scenes[0]?.id, scenes[3]?.id].filter(Boolean),
    },
  ]);

  const containerRef = useRef<HTMLDivElement>(null);

  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[0];
  const matchingScenes = scenes.filter((s) => activeNode.sceneIds.includes(s.id));

  const handlePointerDown = (nodeId: string) => {
    setDraggingNodeId(nodeId);
    setActiveNodeId(nodeId);
    playSpotlightClick();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingNodeId || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(5, Math.min(95, Math.round(((e.clientX - rect.left) / rect.width) * 100)));
    const y = Math.max(10, Math.min(90, Math.round(((e.clientY - rect.top) / rect.height) * 100)));

    setNodes((prev) =>
      prev.map((n) => (n.id === draggingNodeId ? { ...n, x, y } : n))
    );
  };

  const handlePointerUp = () => {
    setDraggingNodeId(null);
  };

  const visibleNodes = filter === 'ALL' ? nodes : nodes.filter((n) => n.category === filter);

  const filterButtons: { key: 'ALL' | 'MOOD' | 'LIGHT' | 'OPTICS' | 'COMPOSITION'; label: string }[] = [
    { key: 'ALL', label: t('lang.filterAll') },
    { key: 'MOOD', label: t('lang.filterMood') },
    { key: 'LIGHT', label: t('lang.filterLight') },
    { key: 'OPTICS', label: t('lang.filterOptics') },
    { key: 'COMPOSITION', label: t('lang.filterComposition') },
  ];

  const activeLabel = lang === 'zh' ? activeNode.labelZh : activeNode.labelEn;

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-8 lg:py-12 text-[#F2F0E8]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#F2F0E8]/10 pb-6 mb-8 gap-4">
        <div>
          <div className="text-[11px] font-mono tracking-widest text-[#D8FF3E] uppercase mb-1">
            {t('lang.desk')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight uppercase">
            {t('lang.title')}
          </h2>
          <p className="text-xs text-[#8B887F] font-mono mt-1">
            {t('lang.subtitle')}
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          <span className="text-[10px] text-[#8B887F] mr-1 hidden sm:inline">{lang === 'zh' ? '分类筛选:' : 'FILTER:'}</span>
          {filterButtons.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => {
                playSpotlightClick();
                setFilter(key);
              }}
              className={`px-2.5 py-1 border transition-colors cursor-pointer ${
                filter === key
                  ? 'border-[#D8FF3E] text-[#D8FF3E] bg-[#D8FF3E]/10 font-bold'
                  : 'border-[#F2F0E8]/10 text-[#8B887F] hover:text-[#F2F0E8]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Constellation Canvas with Drag Physics */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="relative w-full aspect-[21/9] min-h-[420px] bg-[#141412] border border-[#F2F0E8]/10 overflow-hidden mb-8 select-none cursor-crosshair touch-none"
      >
        {/* Hairline Grid Coordinate Background */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(242,240,232,0.06)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        {/* Top Info Banner */}
        <div className="absolute top-3 left-4 text-[10px] font-mono text-[#8B887F] pointer-events-none">
          {t('lang.dragBanner')}
        </div>

        {/* SVG Relationship Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {nodes.map((node) =>
            node.connectedNodeIds.map((targetId) => {
              const targetNode = nodes.find((n) => n.id === targetId);
              if (!targetNode) return null;
              const isHighlighted = node.id === activeNodeId || targetNode.id === activeNodeId;
              return (
                <line
                  key={`${node.id}-${targetId}`}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${targetNode.x}%`}
                  y2={`${targetNode.y}%`}
                  stroke={isHighlighted ? '#D8FF3E' : 'rgba(242,240,232,0.12)'}
                  strokeWidth={isHighlighted ? '1.5' : '1'}
                  strokeDasharray={isHighlighted ? 'none' : '3,3'}
                  className="transition-all duration-150"
                />
              );
            })
          )}
        </svg>

        {/* Interactive Constellation Nodes */}
        {visibleNodes.map((node) => {
          const isActive = node.id === activeNodeId;
          const nodeLabel = lang === 'zh' ? node.labelZh : node.labelEn;
          return (
            <div
              key={node.id}
              onPointerDown={() => handlePointerDown(node.id)}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing group flex flex-col items-center z-10"
            >
              {/* Node Center Dot */}
              <div
                className={`w-4 h-4 rounded-full border transition-all duration-200 flex items-center justify-center ${
                  isActive
                    ? 'border-[#D8FF3E] bg-[#D8FF3E] scale-125 ring-4 ring-[#D8FF3E]/20'
                    : 'border-[#F2F0E8]/40 bg-[#11110F] group-hover:border-[#D8FF3E]'
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#11110F]' : 'bg-[#F2F0E8]'}`} />
              </div>

              {/* Node Label */}
              <div className={`mt-2 px-2.5 py-1 border text-[10px] font-mono tracking-wider uppercase transition-colors whitespace-nowrap ${
                isActive
                  ? 'border-[#D8FF3E] text-[#D8FF3E] bg-[#11110F] shadow-lg'
                  : 'border-[#F2F0E8]/10 text-[#8B887F] bg-[#11110F]/90 group-hover:text-[#F2F0E8] group-hover:border-[#F2F0E8]/30'
              }`}>
                <span className="opacity-50 mr-1">{node.category}:</span>
                <span className="font-bold">{nodeLabel}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Node Deconstruction Card */}
      <div className="border border-[#F2F0E8]/15 bg-[#161614] p-6 mb-8 font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F2F0E8]/10 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2 py-0.5 bg-[#D8FF3E] text-[#11110F] font-bold">
              {activeNode.category}
            </span>
            <span className="text-sm font-bold text-[#F2F0E8] uppercase tracking-wider">
              {activeLabel}
            </span>
          </div>
          <div className="text-xs text-[#8B887F]">
            {t('lang.relationalTension', { count: activeNode.connectedNodeIds.length })}
          </div>
        </div>
        <p className="text-xs text-[#8B887F] font-sans leading-relaxed">
          {lang === 'zh' ? activeNode.descriptionZh : activeNode.descriptionEn}
        </p>
      </div>

      {/* Connected Scenes under Active Node */}
      <div>
        <div className="flex items-center justify-between text-xs font-mono border-b border-[#F2F0E8]/10 pb-2 mb-6">
          <span className="text-[#8B887F]">
            {t('lang.correlatedScenes', { label: activeLabel, count: matchingScenes.length })}
          </span>
          <span className="text-[#D8FF3E]">{t('lang.clickToStudy')}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matchingScenes.map((scene) => (
            <div
              key={scene.id}
              onClick={() => {
                playSpotlightClick();
                onSelectScene(scene.id);
              }}
              className="group border border-[#F2F0E8]/10 bg-[#141412] p-3 cursor-pointer hover:border-[#D8FF3E] transition-all duration-200"
            >
              <div className="aspect-[16/10] overflow-hidden mb-3 relative bg-[#181815]">
                <img
                  src={scene.coverImage}
                  alt={lang === 'zh' ? scene.title : (scene.titleEn || scene.title)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 text-[10px] font-mono text-[#D8FF3E]">
                  {scene.sceneNumber}
                </div>
              </div>
              <div className="font-medium text-sm text-[#F2F0E8] group-hover:text-[#D8FF3E] transition-colors">
                {lang === 'zh' ? scene.title : (scene.titleEn || scene.title)}
              </div>
              <div className="text-xs font-mono text-[#8B887F] truncate mt-1">
                {scene.cameraRig.lens}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
