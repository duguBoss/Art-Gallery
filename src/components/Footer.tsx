import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
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

    // Reset after 1.5 seconds if 3 clicks not reached
    setTimeout(() => setClickCount(0), 1500);
  };

  return (
    <footer className="border-t border-gallery-800/80 bg-gallery-950 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-black tracking-widest text-base text-gallery-100">
                ART GALLERY
              </span>
              <span className="text-[10px] font-mono text-gold-400 px-2 py-0.5 rounded bg-gold-500/10 border border-gold-500/20">
                全球艺术风格典藏馆
              </span>
            </div>
            <p className="text-xs text-gallery-400 mt-1">
              以画廊沉浸美学呈现人类多元艺术创作流派与 AI 视觉生成提示词
            </p>
          </div>

          {/* GitHub Actions CI/CD Badge */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gallery-900 border border-gallery-800">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div className="text-left">
              <div className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>GITHUB ACTIONS ACTIVE</span>
              </div>
              <div className="text-[11px] text-gallery-400">每次代码提交自动更新构建与部署</div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gallery-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gallery-400 font-mono">
          {/* Secret Easter Egg: Click 3 times to open vault */}
          <div 
            onClick={handleSecretClick}
            className="cursor-default select-none transition-colors hover:text-gallery-300"
            title=""
          >
            © 2026 Art Gallery. Open Source under MIT License.
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/duguBoss/Art-Gallery.git"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold-300 transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>GitHub Repository</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};