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
        <div className="space-y-1 text-left">
          <div
            className="inline-block text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full border"
            style={{
              backgroundColor: 'var(--tag-bg)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--tag-text)',
            }}
          >
            {currentView === 'image-lab' ? 'IMAGE PROMPT LAB · 提示词工程' : 'MOTION PIPELINE · 分步影视工作流'}
          </div>
          <h1
            className="text-2xl sm:text-3xl font-serif font-black tracking-tight"
            style={{ color: 'var(--text-main)' }}
          >
            {currentView === 'image-lab'
              ? 'AI 图像风格展示与积木式提示词拆解'
              : 'AI 视频分步生成工作流 · 第一步干啥，第二步干啥'}
          </h1>
          <p
            className="text-xs sm:text-sm max-w-3xl leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            {currentView === 'image-lab'
              ? '探索各类经典与前沿图像风格。成图由核心主体、风格基底、材质、光影与构图模块化组合而成，你可以自由替换任意积木，一键复制专属 Prompt！'
              : '复杂的高质量 AI 视频不是一蹴而就的黑盒。我们将其拆解为清晰连贯的执行步骤，每步标注所用工具、运动提示词与实战技巧，轻松照着做大片！'}
          </p>
        </div>
      </div>
    </section>
  );
};