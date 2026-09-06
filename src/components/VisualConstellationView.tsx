import React, { useState } from 'react';
import type { CinemaScene } from '../types/cinema';
import { playSpotlightClick } from '../utils/audio';

interface VisualConstellationViewProps {
  scenes: CinemaScene[];
  onSelectScene: (sceneId: string) => void;
}

interface LanguageNode {
  id: string;
  label: string;
  category: 'MOOD' | 'LIGHT' | 'OPTICS' | 'COMPOSITION';
  x: number; // percentage
  y: number; // percentage
  connectedNodeIds: string[];
  sceneIds: string[];
}

export const VisualConstellationView: React.FC<VisualConstellationViewProps> = ({
  scenes,
  onSelectScene,
}) => {
  const [activeNodeId, setActiveNodeId] = useState<string>('node-low-key');

  const nodes: LanguageNode[] = [
    { id: 'node-melancholy', label: 'MELANCHOLIC', category: 'MOOD', x: 22, y: 28, connectedNodeIds: ['node-low-key', 'node-anamorphic', 'node-blue'], sceneIds: [scenes[0]?.id].filter(Boolean) },
    { id: 'node-low-key', label: 'LOW-KEY LIGHTING', category: 'LIGHT', x: 38, y: 45, connectedNodeIds: ['node-melancholy', 'node-anamorphic', 'node-negative-space'], sceneIds: [scenes[0]?.id, scenes[1]?.id].filter(Boolean) },
    { id: 'node-anamorphic', label: 'ANAMORPHIC 35MM', category: 'OPTICS', x: 55, y: 30, connectedNodeIds: ['node-melancholy', 'node-low-key', 'node-monolith'], sceneIds: [scenes[0]?.id].filter(Boolean) },
    { id: 'node-monolith', label: 'MONUMENTAL SCALE', category: 'COMPOSITION', x: 74, y: 38, connectedNodeIds: ['node-anamorphic', 'node-god-ray'], sceneIds: [scenes[1]?.id].filter(Boolean) },
    { id: 'node-god-ray', label: 'CATHEDRAL GOD RAY', category: 'LIGHT', x: 82, y: 65, connectedNodeIds: ['node-monolith', 'node-negative-space'], sceneIds: [scenes[1]?.id].filter(Boolean) },
    { id: 'node-negative-space', label: 'NEGATIVE SPACE 78%', category: 'COMPOSITION', x: 48, y: 72, connectedNodeIds: ['node-low-key', 'node-diffuse', 'node-god-ray'], sceneIds: [scenes[2]?.id].filter(Boolean) },
    { id: 'node-diffuse', label: 'DIFFUSE NORTH LIGHT', category: 'LIGHT', x: 26, y: 70, connectedNodeIds: ['node-negative-space', 'node-melancholy'], sceneIds: [scenes[2]?.id].filter(Boolean) },
  ];

  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[0];
  const matchingScenes = scenes.filter((s) => activeNode.sceneIds.includes(s.id));

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-8 lg:py-12 text-[#F2F0E8]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#F2F0E8]/10 pb-6 mb-8 gap-4">
        <div>
          <div className="text-[11px] font-mono tracking-widest text-[#D8FF3E] uppercase mb-1">
            RESEARCH DESK // VISUAL CONSTELLATION
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight uppercase">
            VISUAL LANGUAGE MAP
          </h2>
          <p className="text-xs text-[#8B887F] font-mono mt-1">
            An interactive gravitation network showing how mood, light, optics, and geometry form cinema grammar.
          </p>
        </div>
        <div className="text-right text-xs font-mono text-[#8B887F]">
          ACTIVE NODE: <span className="text-[#D8FF3E] font-bold">{activeNode.label}</span> ({activeNode.category})
        </div>
      </div>

      {/* Interactive Constellation Canvas */}
      <div className="relative w-full aspect-[21/9] min-h-[380px] bg-[#141412] border border-[#F2F0E8]/10 overflow-hidden mb-10 select-none">
        {/* Hairline Grid Coordinate Background */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(242,240,232,0.06)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

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
                  className="transition-all duration-300"
                />
              );
            })
          )}
        </svg>

        {/* Interactive Constellation Nodes */}
        {nodes.map((node) => {
          const isActive = node.id === activeNodeId;
          return (
            <div
              key={node.id}
              onClick={() => {
                playSpotlightClick();
                setActiveNodeId(node.id);
              }}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group flex flex-col items-center z-10"
            >
              {/* Node Center Dot */}
              <div
                className={`w-4 h-4 rounded-full border transition-all duration-300 flex items-center justify-center ${
                  isActive
                    ? 'border-[#D8FF3E] bg-[#D8FF3E] scale-125'
                    : 'border-[#F2F0E8]/40 bg-[#11110F] group-hover:border-[#D8FF3E]'
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#11110F]' : 'bg-[#F2F0E8]'}`} />
              </div>

              {/* Node Label */}
              <div className={`mt-2 px-2 py-0.5 border text-[10px] font-mono tracking-wider uppercase transition-colors whitespace-nowrap ${
                isActive
                  ? 'border-[#D8FF3E] text-[#D8FF3E] bg-[#11110F]'
                  : 'border-[#F2F0E8]/10 text-[#8B887F] bg-[#11110F]/90 group-hover:text-[#F2F0E8] group-hover:border-[#F2F0E8]/30'
              }`}>
                <span className="opacity-50 mr-1">{node.category}:</span>
                <span className="font-bold">{node.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Connected Scenes under Active Node */}
      <div>
        <div className="flex items-center justify-between text-xs font-mono border-b border-[#F2F0E8]/10 pb-2 mb-6">
          <span className="text-[#8B887F]">
            CONNECTED SCENES EXPOSING [{activeNode.label}]: {matchingScenes.length}
          </span>
          <span className="text-[#D8FF3E]">CLICK SCENE TO STUDY VISUAL DNA →</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matchingScenes.map((scene) => (
            <div
              key={scene.id}
              onClick={() => {
                playSpotlightClick();
                onSelectScene(scene.id);
              }}
              className="group cursor-pointer border border-[#F2F0E8]/10 hover:border-[#D8FF3E] bg-[#141412] p-3 flex gap-4 transition-colors"
            >
              <div className="w-28 h-20 bg-black shrink-0 overflow-hidden border border-[#F2F0E8]/10">
                <img
                  src={scene.coverImage}
                  alt={scene.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="flex flex-col justify-between font-mono text-xs">
                <div>
                  <div className="text-[10px] text-[#D8FF3E]">{scene.sceneNumber}</div>
                  <div className="font-medium text-[#F2F0E8] mt-0.5">{scene.title}</div>
                </div>
                <div className="text-[10px] text-[#8B887F] truncate max-w-[200px]">
                  {scene.cameraRig.lens}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
