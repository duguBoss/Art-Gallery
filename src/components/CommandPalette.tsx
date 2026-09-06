import React, { useState, useEffect } from 'react';
import { Search, ArrowRight, X } from 'lucide-react';
import type { CinemaScene } from '../types/cinema';
import type { AtlasTab } from '../types/visualAtlas';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  scenes: CinemaScene[];
  onSelectScene: (sceneId: string) => void;
  onNavigateTab: (tab: AtlasTab) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  scenes,
  onSelectScene,
  onNavigateTab,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredScenes = scenes.filter((s) => {
    const q = query.toLowerCase();
    return (
      s.title.toLowerCase().includes(q) ||
      s.titleEn.toLowerCase().includes(q) ||
      s.sceneNumber.toLowerCase().includes(q) ||
      s.cameraRig.mood.toLowerCase().includes(q) ||
      s.cameraRig.lighting.toLowerCase().includes(q) ||
      s.cameraRig.lens.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-md">
      <div 
        className="w-full max-w-2xl rounded-none border border-[#F2F0E8]/20 bg-[#141412] shadow-2xl overflow-hidden text-[#F2F0E8]"
        style={{
          boxShadow: '0 30px 60px rgba(0, 0, 0, 0.9)',
        }}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#F2F0E8]/10 gap-3">
          <Search className="w-4 h-4 text-[#8B887F]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search scenes, visual DNA, camera rig, or press ESC..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-[#F2F0E8] placeholder-[#8B887F] font-mono"
          />
          <button 
            onClick={onClose}
            className="p-1 hover:text-[#D8FF3E] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Commands & Navigation */}
        <div className="p-3 border-b border-[#F2F0E8]/10 flex flex-wrap gap-2 text-xs font-mono text-[#8B887F]">
          <span className="opacity-60">JUMP TO:</span>
          <button 
            onClick={() => { onNavigateTab('index'); onClose(); }}
            className="px-2 py-0.5 border border-[#F2F0E8]/15 hover:border-[#D8FF3E] hover:text-[#D8FF3E] transition-colors"
          >
            01 INDEX
          </button>
          <button 
            onClick={() => { onNavigateTab('archive'); onClose(); }}
            className="px-2 py-0.5 border border-[#F2F0E8]/15 hover:border-[#D8FF3E] hover:text-[#D8FF3E] transition-colors"
          >
            02 ARCHIVE
          </button>
          <button 
            onClick={() => { onNavigateTab('language'); onClose(); }}
            className="px-2 py-0.5 border border-[#F2F0E8]/15 hover:border-[#D8FF3E] hover:text-[#D8FF3E] transition-colors"
          >
            03 LANGUAGE
          </button>
          <button 
            onClick={() => { onNavigateTab('dossiers'); onClose(); }}
            className="px-2 py-0.5 border border-[#F2F0E8]/15 hover:border-[#D8FF3E] hover:text-[#D8FF3E] transition-colors"
          >
            04 DOSSIERS
          </button>
          <button 
            onClick={() => { onNavigateTab('lab'); onClose(); }}
            className="px-2 py-0.5 border border-[#F2F0E8]/15 hover:border-[#D8FF3E] hover:text-[#D8FF3E] transition-colors"
          >
            05 LAB
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-[#F2F0E8]/05">
          {filteredScenes.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-[#8B887F]">
              NO CORRESPONDING VISUAL ARCHIVE FOUND
            </div>
          ) : (
            filteredScenes.map((scene) => (
              <div
                key={scene.id}
                onClick={() => {
                  onSelectScene(scene.id);
                  onClose();
                }}
                className="p-3 flex items-center justify-between hover:bg-[#1C1C18] cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-black shrink-0 overflow-hidden border border-[#F2F0E8]/10">
                    <img 
                      src={scene.coverImage} 
                      alt={scene.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#D8FF3E]">{scene.sceneNumber}</span>
                      <span className="text-xs font-medium text-[#F2F0E8] group-hover:text-[#D8FF3E] transition-colors">
                        {scene.title}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#8B887F] font-mono truncate max-w-md">
                      {scene.cameraRig.lens} · {scene.cameraRig.mood}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#8B887F] group-hover:text-[#D8FF3E] transition-transform group-hover:translate-x-1" />
              </div>
            ))
          )}
        </div>

        <div className="px-4 py-2 bg-[#0E0E0C] border-t border-[#F2F0E8]/10 flex items-center justify-between text-[10px] font-mono text-[#8B887F]">
          <span>USE ↑ ↓ TO NAVIGATE · ENTER TO SELECT</span>
          <span>VISUAL ATLAS 2026</span>
        </div>
      </div>
    </div>
  );
};
