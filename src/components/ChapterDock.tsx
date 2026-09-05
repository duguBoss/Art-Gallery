import React, { useState } from 'react';
import type { MainViewType } from './Navbar';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { playSpotlightClick } from '../utils/audio';

export const CHAPTER_LIST: { id: MainViewType; num: string; title: string; titleEn: string; desc: string }[] = [
  { id: 'cinema', num: '00', title: '电影分镜', titleEn: 'Prompt Cinema', desc: '16:9 电影画幅 · 制作通告单 · 运镜分层解析' },
  { id: 'atoms', num: '01', title: '视觉材料', titleEn: 'Visual Atoms', desc: '色彩对撞 · 负空间 · 极端尺度 · 丁达尔光' },
  { id: 'principles', num: '02', title: '设计原则', titleEn: 'Principles (Bridge)', desc: '对比 · 平衡 · 层级 · 节奏 · 比例 · 动势' },
  { id: 'styles', num: '03', title: '风格规则', titleEn: 'Style Equations', desc: '瑞士国际 · 粗野主义 · 赛博朋克 · 杂志编辑' },
  { id: 'mediums', num: '04', title: '四大媒介', titleEn: 'The 4 Mediums', desc: 'Image 平面 · Interface 界面 · Space 3D · Motion 影视' },
  { id: 'motion', num: '05', title: '动态镜头', titleEn: 'Motion & Camera', desc: '运镜调度 · 遮罩转场 · 秒级时序分镜标注' },
  { id: 'atlas', num: '06', title: '作品图鉴', titleEn: 'Works & Deconstruct', desc: '多维交叉 · 构图网格 · 一个作品=一个入口' },
  { id: 'shapes-lab', num: '07', title: '重构工坊', titleEn: 'Generative Studio', desc: 'Book of Shapes 算法几何海报生成' },
];

interface ChapterDockProps {
  currentView: MainViewType;
  onSwitchView: (view: MainViewType) => void;
}

export const ChapterDock: React.FC<ChapterDockProps> = ({
  currentView,
  onSwitchView,
}) => {
  const [hoveredChapter, setHoveredChapter] = useState<string | null>(null);

  const currentIdx = CHAPTER_LIST.findIndex((c) => c.id === currentView);
  const activeChapter = CHAPTER_LIST[currentIdx] || CHAPTER_LIST[0];

  const handlePrev = () => {
    if (currentIdx > 0) {
      playSpotlightClick();
      onSwitchView(CHAPTER_LIST[currentIdx - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIdx < CHAPTER_LIST.length - 1) {
      playSpotlightClick();
      onSwitchView(CHAPTER_LIST[currentIdx + 1].id);
    }
  };

  return (
    <nav 
      className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-2 select-none"
      aria-label="展厅翻页切换控制器"
    >
      {/* Up Button */}
      <button
        onClick={handlePrev}
        disabled={currentIdx === 0}
        className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
          currentIdx === 0
            ? 'border-white/5 text-white/20 cursor-not-allowed opacity-40'
            : 'border-white/10 bg-black/50 text-white/70 hover:text-white hover:border-amber-400/50 hover:bg-black/80 shadow-md'
        }`}
        title="上一展厅 (PageUp / ↑)"
      >
        <ChevronUp className="w-3.5 h-3.5" />
      </button>

      {/* Chapters Scrubber Strip */}
      <div className="relative py-3 px-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl flex flex-col items-center gap-2.5 shadow-2xl">
        {CHAPTER_LIST.map((chapter, idx) => {
          const isActive = currentView === chapter.id;
          return (
            <div
              key={chapter.id}
              className="relative flex items-center"
              onMouseEnter={() => setHoveredChapter(chapter.id)}
              onMouseLeave={() => setHoveredChapter(null)}
            >
              {/* Tooltip Placard */}
              {hoveredChapter === chapter.id && (
                <div className="absolute right-7 py-1 px-3 rounded-lg border border-white/15 bg-black/90 backdrop-blur-xl text-right whitespace-nowrap shadow-xl pointer-events-none animate-fadeIn">
                  <div className="text-[9px] font-mono tracking-[0.2em] text-amber-300/80 uppercase">
                    CHAPTER {chapter.num}
                  </div>
                  <div className="text-xs font-serif text-white font-medium">
                    {chapter.title}
                  </div>
                </div>
              )}

              {/* Indicator Dot / Pill */}
              <button
                onClick={() => {
                  playSpotlightClick();
                  onSwitchView(chapter.id);
                }}
                className={`transition-all duration-300 rounded-full flex items-center justify-center cursor-pointer ${
                  isActive
                    ? 'w-4 h-7 bg-amber-400 text-black font-mono font-black text-[9px] shadow-lg shadow-amber-400/30'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/60'
                }`}
                title={`跳转至 ${chapter.num} · ${chapter.title}`}
              >
                {isActive ? chapter.num : null}
              </button>
            </div>
          );
        })}
      </div>

      {/* Down Button */}
      <button
        onClick={handleNext}
        disabled={currentIdx === CHAPTER_LIST.length - 1}
        className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
          currentIdx === CHAPTER_LIST.length - 1
            ? 'border-white/5 text-white/20 cursor-not-allowed opacity-40'
            : 'border-white/10 bg-black/50 text-white/70 hover:text-white hover:border-amber-400/50 hover:bg-black/80 shadow-md'
        }`}
        title="下一展厅 (PageDown / ↓)"
      >
        <ChevronDown className="w-3.5 h-3.5" />
      </button>

      {/* Floating Counter Badge */}
      <div className="mt-1 text-[9px] font-mono tracking-widest text-white/40 uppercase">
        {String(currentIdx + 1).padStart(2, '0')}/08
      </div>
    </nav>
  );
};
