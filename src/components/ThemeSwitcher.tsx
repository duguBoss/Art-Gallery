import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Check, Flame, Droplets, Zap, Crown, Sun } from 'lucide-react';
import { THEME_OPTIONS, type GalleryTheme } from '../types/theme';
import { playSpotlightClick, playSuccessChime } from '../utils/audio';

interface ThemeSwitcherProps {
  currentTheme: GalleryTheme;
  onSelectTheme: (theme: GalleryTheme) => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  currentTheme,
  onSelectTheme,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeOption = THEME_OPTIONS.find((t) => t.id === currentTheme) || THEME_OPTIONS[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChoose = (t: GalleryTheme) => {
    playSpotlightClick();
    onSelectTheme(t);
    setIsOpen(false);
    playSuccessChime();
  };

  const getSceneIcon = (id: GalleryTheme) => {
    switch (id) {
      case 'cozy-night':
        return <Flame className="w-3.5 h-3.5 text-amber-500 shrink-0" />;
      case 'zen-mist':
        return <Droplets className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
      case 'cyber-neon':
        return <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />;
      case 'grand-salon':
        return <Crown className="w-3.5 h-3.5 text-yellow-500 shrink-0" />;
      case 'ghibli-breeze':
        return <Sun className="w-3.5 h-3.5 text-sky-500 shrink-0" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
    }
  };

  return (
    <div className="relative inline-block" ref={containerRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all duration-300 cursor-pointer shadow-xs text-xs font-medium hover:scale-[1.02]"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-strong)',
          color: 'var(--text-main)',
          boxShadow: `0 0 15px ${activeOption.glowColor}`,
        }}
        title="切换场景化美学主题 (如：夜晚灯光下的温馨场景)"
      >
        {getSceneIcon(activeOption.id)}
        <span className="font-serif font-bold">{activeOption.name}</span>
        <span 
          className="text-[10px] font-mono px-1.5 py-0.5 rounded-full border hidden sm:inline"
          style={{
            backgroundColor: 'var(--tag-bg)',
            borderColor: 'var(--border-subtle)',
            color: 'var(--tag-text)',
          }}
        >
          {activeOption.badge}
        </span>
      </button>

      {/* Floating Menu Popover */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl p-2.5 shadow-2xl border z-50 animate-placard-slide space-y-2 text-left backdrop-blur-xl"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-strong)',
          }}
        >
          <div
            className="px-2 py-1 flex items-center justify-between border-b pb-2"
            style={{
              borderColor: 'var(--border-subtle)',
            }}
          >
            <span className="text-[11px] font-mono font-bold tracking-wider uppercase" style={{ color: 'var(--text-muted)' }}>
              🎭 沉浸场景化主题 (Scenarios)
            </span>
            <span className="text-[10px] font-mono" style={{ color: 'var(--accent)' }}>
              5 大意境
            </span>
          </div>

          <div className="space-y-1.5">
            {THEME_OPTIONS.map((opt) => {
              const isSelected = opt.id === currentTheme;
              return (
                <div
                  key={opt.id}
                  onClick={() => handleChoose(opt.id)}
                  className={`p-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-between gap-3 ${
                    isSelected ? 'ring-2 scale-[1.01]' : 'hover:opacity-85'
                  }`}
                  style={{
                    backgroundColor: isSelected ? 'var(--bg-page-subtle)' : 'transparent',
                    borderColor: isSelected ? 'var(--accent)' : 'var(--border-subtle)',
                  }}
                >
                  <div className="flex items-start gap-2.5">
                    {/* Scene Icon Badge */}
                    <div 
                      className="w-8 h-8 rounded-xl flex items-center justify-center border shrink-0 mt-0.5 shadow-2xs"
                      style={{
                        backgroundColor: opt.previewColor,
                        borderColor: isSelected ? opt.accentColor : 'var(--border-subtle)',
                      }}
                    >
                      {getSceneIcon(opt.id)}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-serif font-bold" style={{ color: 'var(--text-main)' }}>
                          {opt.name}
                        </span>
                        <span
                          className="text-[9px] font-mono px-1.5 py-0.2 rounded-full border"
                          style={{
                            backgroundColor: 'var(--tag-bg)',
                            borderColor: 'var(--border-subtle)',
                            color: 'var(--tag-text)',
                          }}
                        >
                          {opt.badge}
                        </span>
                      </div>
                      <div className="text-[11px] font-medium" style={{ color: 'var(--accent)' }}>
                        {opt.sceneTitle}
                      </div>
                      <p className="text-[10px] leading-tight line-clamp-1" style={{ color: 'var(--text-muted)' }}>
                        {opt.atmosphere}
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 shrink-0" style={{ color: 'var(--accent)' }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};