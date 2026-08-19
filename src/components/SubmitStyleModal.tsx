import React, { useState } from 'react';
import { X, Send, Sparkles, Check } from 'lucide-react';
import { playSpotlightClick, playSuccessChime } from '../utils/audio';

interface SubmitStyleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubmitStyleModal: React.FC<SubmitStyleModalProps> = ({ isOpen, onClose }) => {
  const [styleName, setStyleName] = useState('');
  const [description, setDescription] = useState('');
  const [sampleLink, setSampleLink] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSpotlightClick();
    playSuccessChime();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setStyleName('');
      setDescription('');
      setSampleLink('');
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-lg bg-gallery-950 border border-gold-500/40 rounded-2xl shadow-gallery-lg overflow-hidden my-auto p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-gallery-800 pb-4">
          <div className="flex items-center gap-2.5">
            <Send className="w-5 h-5 text-gold-400" />
            <h2 className="text-lg font-serif font-bold text-gallery-100">推荐与投稿艺术流派</h2>
          </div>
          <button
            onClick={() => {
              playSpotlightClick();
              onClose();
            }}
            className="p-2 rounded-full bg-gallery-800 text-gallery-300 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-base font-serif font-bold text-gallery-100">感谢您的艺术推荐！</h3>
            <p className="text-xs text-gallery-400">
              画廊策展团队已收到您的投稿提案，审核通过后将收录至永久展厅并自动部署。
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gallery-300">流派名称 (如: 蒸汽朋克, 极简水彩, 毕加索立体主义)</label>
              <input
                required
                type="text"
                value={styleName}
                onChange={(e) => setStyleName(e.target.value)}
                placeholder="输入艺术风格名称..."
                className="w-full p-2.5 rounded-lg bg-gallery-900 border border-gallery-700 text-gallery-100 text-xs focus:outline-none focus:border-gold-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gallery-300">风格特征描述与代表艺术家</label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="简述该风格的视觉特点、笔触、配色或代表作品..."
                className="w-full p-2.5 rounded-lg bg-gallery-900 border border-gallery-700 text-gallery-100 text-xs focus:outline-none focus:border-gold-500 resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gallery-300">参考作品图片链接 / Midjourney Prompt (选填)</label>
              <input
                type="text"
                value={sampleLink}
                onChange={(e) => setSampleLink(e.target.value)}
                placeholder="https://... 或 关键词"
                className="w-full p-2.5 rounded-lg bg-gallery-900 border border-gallery-700 text-gallery-100 text-xs focus:outline-none focus:border-gold-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-gallery-950 font-serif font-bold text-xs hover:from-gold-400 hover:to-gold-500 transition-all cursor-pointer shadow-glow-gold/30 flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>投递至画廊策展部</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
