import React, { useState } from 'react';
import { playGalleryBell } from '../utils/audio';

interface FooterProps {
  onSecretTrigger?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSecretTrigger }) => {
  const [clickCount, setClickCount] = useState(0);

  const handleSecretClick = () => {
    setClickCount((prev) => {
      const next = prev + 1;
      if (next >= 3) {
        playGalleryBell(880);
        onSecretTrigger?.();
        return 0;
      }
      return next;
    });

    setTimeout(() => setClickCount(0), 1500);
  };

  return (
    <footer
      className="border-t py-8 mt-12 transition-colors duration-300"
      style={{
        backgroundColor: 'var(--bg-page-subtle)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="font-serif font-black text-sm" style={{ color: 'var(--text-main)' }}>
                万象视听灵感工坊 (Art & Motion AI)
              </span>
              <span
                className="text-[10px] font-medium px-2 py-0.5 rounded-full border"
                style={{
                  backgroundColor: 'var(--tag-bg)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--tag-text)',
                }}
              >
                先锋美学实验室
              </span>
            </div>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
              AI 视觉提示词积木拆解 · 影视多步骤生成工作流
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-dim)' }}>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent)' }} />
            <span>自适应艺术氛围渲染引擎已就绪</span>
          </div>
        </div>

        <div
          className="pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono"
          style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-dim)' }}
        >
          <div
            onClick={handleSecretClick}
            className="cursor-default select-none transition-colors hover:opacity-80"
            title=""
          >
            © 2026 Art Gallery. Open Source under MIT License.
          </div>
          <div>
            <a
              href="https://github.com/duguBoss/Art-Gallery.git"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              style={{ color: 'var(--text-muted)' }}
            >
              GitHub Repository
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};