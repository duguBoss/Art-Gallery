import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';
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

  return (
    <div className="relative inline-block" ref={containerRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all cursor-pointer shadow-xs text-xs font-medium"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-subtle)',
          color: 'var(--text-main)',
        }}
        title="切换艺术画廊氛围美学"
      >
        <span
          className="w-2.5 h-2.5 rounded-full shrink-0 border"
          style={{
            backgroundColor: activeOption.previewColor,
            borderColor: activeOption.accentColor,
          }}
        />
        <span className="font-semibold">{activeOption.name}</span>
        <Palette className="w-3.5 h-3.5 opacity-60" />
      </button>

      {/* Floating Menu Popover */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-64 rounded-2xl p-2 shadow-xl border z-50 animate-fadeIn space-y-1.5 text-left"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-strong)',
          }}
        >
          <div
            className="px-2.5 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider border-b pb-1.5"
            style={{
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-muted)',
            }}
          >
            🏛️ 艺术馆氛围主题 (Gallery Mood)
          </div>

          <div className="space-y-1">
            {THEME_OPTIONS.map((opt) => {
              const isSelected = opt.id === currentTheme;
              return (
                <div
                  key={opt.id}
                  onClick={() => handleChoose(opt.id)}
                  className={`p-2 rounded-xl cursor-pointer transition-all flex items-center justify-between gap-3 ${
                    isSelected ? 'ring-1' : 'hover:opacity-80'
                  }`}
                  style={{
                    backgroundColor: isSelected ? 'var(--bg-page)' : 'transparent',
                    borderColor: 'var(--border-subtle)',
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    {/* Dual Color Swatch Dot */}
                    <div className="relative w-5 h-5 rounded-full border overflow-hidden shrink-0 shadow-2xs" style={{ borderColor: 'var(--border-subtle)' }}>
                      <div className="absolute inset-0 w-1/2" style={{ backgroundColor: opt.previewColor }} />
                      <div className="absolute inset-y-0 right-0 w-1/2" style={{ backgroundColor: opt.accentColor }} />
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold" style={{ color: 'var(--text-main)' }}>
                          {opt.name}
                        </span>
                        <span
                          className="text-[9px] px-1.5 py-0.2 rounded-full border"
                          style={{
                            backgroundColor: 'var(--tag-bg)',
                            borderColor: 'var(--border-subtle)',
                            color: 'var(--tag-text)',
                          }}
                        >
                          {opt.badge}
                        </span>
                      </div>
                      <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                        {opt.inspiration}
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--accent)' }} />
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