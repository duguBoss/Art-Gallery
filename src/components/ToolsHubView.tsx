import React from 'react';
import { Calculator, Palette, Ratio, WandSparkles, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const TOOLS = [
  { icon: Ratio, zh: '画幅比例计算器', en: 'Aspect Ratio Calculator', descZh: '快速换算 16:9、9:16、4:3、1:1 等常用画幅。', descEn: 'Convert common ratios such as 16:9, 9:16, 4:3 and 1:1.' },
  { icon: Palette, zh: '配色工具', en: 'Color Tools', descZh: '从色相关系到互补色、类似色和视觉对比。', descEn: 'Explore complementary, analogous and high-contrast color relationships.' },
  { icon: Calculator, zh: '摄影计算器', en: 'Photography Calculators', descZh: '景深、曝光、焦段与画面参数计算。', descEn: 'Depth of field, exposure, focal length and framing calculations.' },
  { icon: WandSparkles, zh: 'AI Prompt 工具', en: 'AI Prompt Tools', descZh: '把视觉目标拆成主体、镜头、光线、色彩和构图参数。', descEn: 'Turn a visual goal into subject, optics, lighting, color and composition parameters.' },
];

export const ToolsHubView: React.FC = () => {
  const { lang } = useLanguage();
  const isZh = lang === 'zh';
  return <section className="min-h-screen bg-[#11110F] text-[#F2F0E8]"><div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-14 lg:py-20"><div className="text-[10px] font-mono tracking-[.18em] text-[#D8FF3E]">03 // TOOLS</div><h1 className="text-5xl md:text-7xl lg:text-[8rem] font-black tracking-[-.06em] leading-[.86] mt-4">{isZh ? <>创作<br/><span className="text-[#D8FF3E]">工具箱</span></> : <>CREATOR<br/><span className="text-[#D8FF3E]">TOOLS</span></>}</h1><p className="max-w-2xl text-[#8B887F] leading-7 mt-8">{isZh ? '把知识变成可以立即使用的工具。这里会持续加入设计、摄影、视频、3D 与 AI 创作工具。' : 'Turn knowledge into practical tools. The hub will grow across design, photography, video, 3D and AI creation.'}</p><div className="grid md:grid-cols-2 xl:grid-cols-4 gap-px bg-[#F2F0E8]/10 border border-[#F2F0E8]/10 mt-14">{TOOLS.map(({ icon: Icon, zh, en, descZh, descEn }, i) => <article key={en} className="bg-[#11110F] p-7 min-h-[280px] group hover:bg-[#181815] transition-colors"><div className="flex justify-between"><Icon className="w-5 h-5 text-[#D8FF3E]"/><span className="text-[10px] font-mono text-[#55534E]">0{i+1}</span></div><h2 className="text-2xl font-bold mt-12">{isZh ? zh : en}</h2><p className="text-sm text-[#8B887F] leading-6 mt-3">{isZh ? descZh : descEn}</p><div className="mt-8 flex items-center gap-2 text-[10px] font-mono text-[#8B887F] group-hover:text-[#D8FF3E]">{isZh ? '即将开放' : 'COMING SOON'}<ArrowUpRight className="w-3.5 h-3.5"/></div></article>)}</div></div></section>;
};
