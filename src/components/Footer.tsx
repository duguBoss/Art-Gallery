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

    setTimeout(() => setClickCount(0), 1500);
  };

  return (
    <footer className="border-t border-gray-200 bg-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-gray-900">
                万象视听灵感工坊 (Art & Motion AI)
              </span>
              <span className="text-[10px] font-medium text-blue-600 px-2 py-0.5 rounded-full bg-blue-50 border border-blue-100">
                开源美学实验室
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              AI 视觉提示词积木拆解 · 影视多步骤生成工作流
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>GitHub Actions 持续自动部署</span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400 font-mono">
          <div
            onClick={handleSecretClick}
            className="cursor-default select-none transition-colors hover:text-gray-600"
            title=""
          >
            © 2026 Art Gallery. Open Source under MIT License.
          </div>
          <div>
            <a
              href="https://github.com/duguBoss/Art-Gallery.git"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-700 transition-colors"
            >
              GitHub Repository
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};