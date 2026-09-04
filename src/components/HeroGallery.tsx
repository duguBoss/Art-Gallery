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
              {currentView === 'image-lab' 
                ? 'CURATED ART SALON · 艺术流派典藏展' 
                : currentView === 'shapes-lab'
                ? 'BOOK OF SHAPES · 算法几何灵感工坊'
                : 'CINEMATIC MOTION STUDIO · 影视分镜放映厅'}
            </span>
            <span className="text-[11px] font-mono hidden sm:inline" style={{ color: 'var(--accent)' }}>
              {currentView === 'image-lab' 
                ? '◆ 空间实体透视 · 3D 画作反光' 
                : currentView === 'shapes-lab'
                ? '◆ 参考 Nikolaj Sokolowski · 纯粹矢量数学'
                : '◆ 工业级多镜头连贯生成流'}
            </span>
          </div>

          <h1
            className="text-2xl sm:text-3xl font-serif font-black tracking-tight"
            style={{ color: 'var(--text-main)' }}
          >
            {currentView === 'image-lab'
              ? '万象视听 · 殿堂级空间艺术画廊'
              : currentView === 'shapes-lab'
              ? '形态之书 · 纯粹生成式矢量数学工坊'
              : '光影流转 · 影视级 AI 视频分步制作工程'}
          </h1>
          
          <p
            className="text-xs sm:text-sm max-w-3xl leading-relaxed font-sans"
            style={{ color: 'var(--text-muted)' }}
          >
            {currentView === 'image-lab'
              ? '汇聚东方水墨、微缩体素、赛博霓虹与包豪斯等十三大标志性流派。通过空间画框与 3D 物理光泽呈现，支持一键电影级自动漫步巡礼与积木咒语解构。'
              : currentView === 'shapes-lab'
              ? '参考 Nikolaj Sokolowski 的 Book of Shapes 经典生成式几何算法 —— 特鲁歇方圆迷宫、布罗克曼同心弧、脉冲星波形山脊与莫尔频纹。实时微调参数、导出纯净 SVG 矢量文件，或一键挂载至 3D 虚拟展厅中央光影艺术装置。'
              : '解构好莱坞大片与先锋短片的工业化生产管线。从核心角色定妆、物理运镜控制到胶片级调色插帧，让高质量 AI 影像制作有章可循。'}
          </p>
        </div>
      </div>
    </section>
  );
};