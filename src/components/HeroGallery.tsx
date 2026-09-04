import React from 'react';
import type { MainViewType } from './Navbar';

interface HeroGalleryProps {
  currentView: MainViewType;
}

export const HeroGallery: React.FC<HeroGalleryProps> = ({ currentView }) => {
  return (
    <section
      className="border-b py-6 sm:py-8 transition-colors duration-300"
      style={{
        backgroundColor: 'var(--bg-page-subtle)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-1.5 text-left">
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider"
              style={{
                backgroundColor: 'var(--tag-bg)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--tag-text)',
              }}
            >
              {currentView === 'atoms' 
                ? 'VISUAL ATOMS · 视觉基础原子库' 
                : currentView === 'styles'
                ? 'STYLE MATRIX · 风格规则矩阵'
                : currentView === 'motion'
                ? 'MOTION & CAMERA · 动态镜头实验室'
                : currentView === 'atlas'
                ? 'DESIGN ATLAS · 作品知识网络'
                : 'BOOK OF SHAPES · 算法海报工坊'}
            </span>
            <span className="text-[11px] font-mono hidden sm:inline" style={{ color: 'var(--accent)' }}>
              {currentView === 'atoms' 
                ? '◆ 构图 · 色彩 · 排版 · 光影 · 材质' 
                : currentView === 'styles'
                ? '◆ 规则方程 · 组合美学'
                : currentView === 'motion'
                ? '◆ 运镜推拉 · 遮罩转场 · 时序分镜'
                : currentView === 'atlas'
                ? '◆ 一个作品 = 一个入口'
                : '◆ 参考 Nikolaj Sokolowski · 纯粹矢量数学'}
            </span>
          </div>

          <h1
            className="text-2xl sm:text-3xl font-serif font-black tracking-tight"
            style={{ color: 'var(--text-main)' }}
          >
            {currentView === 'atoms'
              ? '视觉设计图鉴 · 底层材料解构'
              : currentView === 'styles'
              ? '视觉风格图谱 · 规则方程矩阵'
              : currentView === 'motion'
              ? '动态与镜头语言 · 电影分镜时序'
              : currentView === 'atlas'
              ? '设计知识网络 · 多维交叉探索'
              : '形态之书 · 纯粹生成式矢量数学工坊'}
          </h1>
          
          <p
            className="text-xs sm:text-sm max-w-3xl leading-relaxed font-sans"
            style={{ color: 'var(--text-muted)' }}
          >
            {currentView === 'atoms'
              ? '深入探究画面为何成立，解构色彩对撞、负空间留白、极端尺度与丁达尔体积光等核心原子。'
              : currentView === 'styles'
              ? '风格不是标签，而是一组规则方程。探索瑞士国际、粗野主义、赛博朋克与杂志画报的构成逻辑。'
              : currentView === 'motion'
              ? '将视频拆解为镜头推拉摇移、转场遮罩与动作时序，让动态设计真正有体系。'
              : currentView === 'atlas'
              ? '一个作品就是一个入口，跨越 Web、UI、海报、3D 与动态，多维探索视觉灵感。'
              : '参考 Nikolaj Sokolowski Book of Shapes，通过算法参数即时生成具有高审美价值的几何向量艺术。'}
          </p>
        </div>
      </div>
    </section>
  );
};