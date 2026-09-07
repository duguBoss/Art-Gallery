import React, { useMemo, useState } from 'react';
import { ArrowRight, BookOpen, Camera, Clapperboard, Cuboid, Layers3, MousePointer2, Palette, PenTool, Play, Search, Sparkles, Wand2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface KnowledgeDomain {
  id: string;
  icon: React.ElementType;
  zh: string;
  en: string;
  descZh: string;
  descEn: string;
  count: number;
  topics: string[];
  level: string;
}

const DOMAINS: KnowledgeDomain[] = [
  { id: 'visual-foundations', icon: Palette, zh: '视觉基础', en: 'Visual Foundations', descZh: '构图、色彩、字体、版式、视觉层级与设计原理。', descEn: 'Composition, color, typography, layout, hierarchy and core design principles.', count: 72, topics: ['构图', '色彩', '字体', '网格'], level: '01' },
  { id: 'graphic-design', icon: PenTool, zh: '平面设计', en: 'Graphic Design', descZh: '从信息组织到品牌视觉，把设计原则转化为实际作品。', descEn: 'Turn visual principles into posters, identities, editorial systems and real work.', count: 64, topics: ['品牌', '海报', '编辑设计', '信息图'], level: '02' },
  { id: 'ui-ux', icon: MousePointer2, zh: 'UI / UX', en: 'UI / UX', descZh: '界面、交互、信息架构、设计系统与产品体验。', descEn: 'Interfaces, interaction, information architecture, design systems and product experience.', count: 58, topics: ['界面', '交互', '设计系统', '可用性'], level: '03' },
  { id: 'photography', icon: Camera, zh: '摄影', en: 'Photography', descZh: '曝光、镜头、光线、构图、色彩与摄影语言。', descEn: 'Exposure, optics, lighting, composition, color and photographic language.', count: 66, topics: ['曝光', '镜头', '光线', '构图'], level: '04' },
  { id: 'video-editing', icon: Clapperboard, zh: '视频与剪辑', en: 'Video & Editing', descZh: '镜头语言、叙事、节奏、剪辑、调色、声音与短视频。', descEn: 'Shot language, narrative, pacing, editing, color, sound and short-form video.', count: 84, topics: ['镜头', '节奏', '剪辑', '调色'], level: '05' },
  { id: 'motion', icon: Play, zh: '动态设计 / AE', en: 'Motion / After Effects', descZh: '动画原理、时间、缓动、图形动画、合成与视觉特效。', descEn: 'Animation principles, timing, easing, motion graphics, compositing and effects.', count: 76, topics: ['动画原理', '缓动', '文字动画', '合成'], level: '06' },
  { id: '3d', icon: Cuboid, zh: '3D 设计', en: '3D Design', descZh: '建模、材质、灯光、摄影机、动画、模拟与渲染。', descEn: 'Modeling, materials, lighting, cameras, animation, simulation and rendering.', count: 92, topics: ['建模', '材质', '灯光', '渲染'], level: '07' },
  { id: 'ai-creation', icon: Sparkles, zh: 'AI 创作', en: 'AI Creation', descZh: 'Prompt、图像、视频、工作流、模型能力与 AI 辅助创作。', descEn: 'Prompting, image, video, workflows, model capabilities and AI-assisted creation.', count: 88, topics: ['Prompt', '图像', '视频', '工作流'], level: '08' },
  { id: 'audio', icon: Layers3, zh: '声音与视听', en: 'Audio & Sound', descZh: '音乐、音效、混音、声音叙事与视频听觉设计。', descEn: 'Music, sound effects, mixing, sonic storytelling and audiovisual design.', count: 44, topics: ['音乐', '音效', '混音', '声音叙事'], level: '09' },
];

const PATHS = [
  { zh: '零基础视觉设计', en: 'Visual Design from Zero', descZh: '从视觉元素到完整版式，建立设计思维。', descEn: 'Build design thinking from visual elements to complete layouts.', steps: 8 },
  { zh: '短视频创作者', en: 'Short-form Creator', descZh: '从脚本、镜头到剪辑、声音与发布。', descEn: 'From script and shots to editing, sound and publishing.', steps: 10 },
  { zh: 'AE 动态设计入门', en: 'Motion Design with AE', descZh: '理解动画原理，再进入 After Effects 实现。', descEn: 'Learn motion principles first, then implement them in After Effects.', steps: 9 },
  { zh: '3D 视觉创作', en: '3D Visual Creator', descZh: '从空间、材质和灯光建立 3D 画面。', descEn: 'Build 3D scenes through space, materials and lighting.', steps: 11 },
];

export const KnowledgeHubView: React.FC = () => {
  const { lang } = useLanguage();
  const isZh = lang === 'zh';
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState<'all' | 'beginner' | 'advanced'>('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DOMAINS.filter((d) => {
      const haystack = [d.zh, d.en, d.descZh, d.descEn, ...d.topics].join(' ').toLowerCase();
      const matchesQuery = !q || haystack.includes(q);
      const matchesLevel = level === 'all' || (level === 'beginner' ? Number(d.level) <= 5 : Number(d.level) >= 6);
      return matchesQuery && matchesLevel;
    });
  }, [query, level]);

  return (
    <section className="min-h-screen bg-[#11110F] text-[#F2F0E8]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 lg:py-20">
        <div className="border-b border-[#F2F0E8]/15 pb-10 lg:pb-14">
          <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono tracking-[0.18em] text-[#D8FF3E] uppercase">
            <span>00 // Knowledge</span><span className="text-[#8B887F]">/</span><span className="text-[#8B887F]">Creator Encyclopedia</span>
          </div>
          <div className="grid lg:grid-cols-[1.35fr_.65fr] gap-10 items-end mt-5">
            <div>
              <h1 className="text-5xl md:text-7xl lg:text-[7.5rem] leading-[.86] font-black tracking-[-0.06em] uppercase max-w-5xl">
                {isZh ? <>创作者<br /><span className="text-[#D8FF3E]">知识百科</span></> : <>CREATOR<br /><span className="text-[#D8FF3E]">ENCYCLOPEDIA</span></>}
              </h1>
            </div>
            <div className="max-w-md text-sm leading-7 text-[#B5B1A8]">
              {isZh ? '从设计、摄影、视频、剪辑、动态、3D 到 AI，把“是什么、为什么、怎么做、用什么实现”连接成一张可持续生长的知识地图。' : 'A living map of visual creation — connecting what it is, why it works, how to make it, and which tools can implement it across design, photo, video, motion, 3D and AI.'}
              <div className="mt-6 flex items-center gap-2 text-[10px] font-mono text-[#F2F0E8] uppercase"><BookOpen className="w-4 h-4 text-[#D8FF3E]" /> {isZh ? '知识 → 案例 → 实践 → 工具' : 'Knowledge → Cases → Practice → Tools'}</div>
            </div>
          </div>
        </div>

        <div className="py-8 border-b border-[#F2F0E8]/10 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B887F]" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={isZh ? '搜索领域、知识、软件或关键词…' : 'Search domains, concepts, software or topics…'} className="w-full bg-[#171714] border border-[#F2F0E8]/15 pl-11 pr-4 py-3.5 text-sm outline-none focus:border-[#D8FF3E] transition-colors" />
          </div>
          <div className="flex gap-2 font-mono text-[10px] uppercase">
            {(['all', 'beginner', 'advanced'] as const).map((item) => (
              <button key={item} onClick={() => setLevel(item)} className={`px-4 py-2 border transition-colors ${level === item ? 'bg-[#D8FF3E] text-[#11110F] border-[#D8FF3E]' : 'border-[#F2F0E8]/15 text-[#8B887F] hover:text-[#F2F0E8]'}`}>
                {item === 'all' ? (isZh ? '全部' : 'ALL') : item === 'beginner' ? (isZh ? '入门' : 'BEGINNER') : (isZh ? '进阶' : 'ADVANCED')}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-10 flex items-end justify-between">
          <div><span className="text-[10px] font-mono text-[#D8FF3E]">01</span><h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-2">{isZh ? '知识领域' : 'Knowledge Domains'}</h2></div>
          <span className="text-[10px] font-mono text-[#8B887F]">{filtered.length.toString().padStart(2, '0')} / {DOMAINS.length.toString().padStart(2, '0')}</span>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-px bg-[#F2F0E8]/10 mt-6 border border-[#F2F0E8]/10">
          {filtered.map((domain) => {
            const Icon = domain.icon;
            return (
              <article key={domain.id} className="bg-[#11110F] p-6 lg:p-7 min-h-[300px] group hover:bg-[#181815] transition-colors relative overflow-hidden">
                <div className="flex items-start justify-between"><div className="w-10 h-10 border border-[#F2F0E8]/15 flex items-center justify-center"><Icon className="w-4 h-4 text-[#D8FF3E]" /></div><span className="text-[10px] font-mono text-[#55534E]">{domain.level}</span></div>
                <h3 className="text-2xl font-bold mt-10 tracking-tight">{isZh ? domain.zh : domain.en}</h3>
                <p className="text-sm leading-6 text-[#8B887F] mt-3 max-w-sm">{isZh ? domain.descZh : domain.descEn}</p>
                <div className="flex flex-wrap gap-1.5 mt-6">{domain.topics.map((topic) => <span key={topic} className="px-2 py-1 text-[9px] font-mono border border-[#F2F0E8]/10 text-[#77736B]">{topic}</span>)}</div>
                <div className="absolute bottom-5 right-6 flex items-center gap-2 text-[10px] font-mono text-[#8B887F] group-hover:text-[#D8FF3E] transition-colors"><span>{domain.count} {isZh ? '知识节点' : 'nodes'}</span><ArrowRight className="w-3.5 h-3.5 -translate-x-1 group-hover:translate-x-0 transition-transform" /></div>
              </article>
            );
          })}
        </div>

        <div className="mt-20 grid lg:grid-cols-[.8fr_1.2fr] gap-8 items-start">
          <div className="lg:sticky lg:top-24"><span className="text-[10px] font-mono text-[#D8FF3E]">02 // LEARNING PATHS</span><h2 className="text-4xl md:text-6xl font-black tracking-[-0.04em] mt-3">{isZh ? '从零开始，按路径学习。' : 'Learn by path, not by chance.'}</h2><p className="text-sm text-[#8B887F] leading-6 mt-5 max-w-md">{isZh ? '百科负责覆盖，学习路径负责组织。用户不需要知道该搜索什么，也能从基础一路走到实际创作。' : 'The encyclopedia provides coverage; learning paths provide order. Beginners should not need to know what to search for.'}</p></div>
          <div className="space-y-2">
            {PATHS.map((path, i) => <div key={path.en} className="border border-[#F2F0E8]/10 p-5 md:p-6 hover:border-[#D8FF3E]/40 transition-colors group"><div className="flex items-start justify-between gap-4"><div className="flex gap-5"><span className="font-mono text-[10px] text-[#D8FF3E] mt-1">0{i + 1}</span><div><h3 className="text-xl md:text-2xl font-bold">{isZh ? path.zh : path.en}</h3><p className="text-sm text-[#8B887F] mt-2">{isZh ? path.descZh : path.descEn}</p></div></div><ArrowRight className="w-5 h-5 text-[#8B887F] group-hover:text-[#D8FF3E] group-hover:translate-x-1 transition-all" /></div><div className="mt-5 text-[10px] font-mono text-[#55534E]">{path.steps} {isZh ? 'STEPS' : 'STEPS'}</div></div>)}
          </div>
        </div>

        <div className="mt-20 border border-[#D8FF3E]/20 bg-[#D8FF3E]/5 p-7 md:p-10 flex flex-col md:flex-row gap-6 md:items-center justify-between">
          <div><div className="text-[10px] font-mono text-[#D8FF3E]">KNOWLEDGE GRAPH</div><h2 className="text-2xl md:text-4xl font-bold mt-2">{isZh ? '知识不是孤岛。' : 'Knowledge is not an island.'}</h2><p className="text-sm text-[#8B887F] mt-2">{isZh ? '每个概念都连接原理、案例、软件、工具和相关知识。' : 'Every concept connects principles, cases, software, tools and related ideas.'}</p></div><button className="shrink-0 px-5 py-3 bg-[#D8FF3E] text-[#11110F] text-xs font-bold font-mono flex items-center gap-2">{isZh ? '探索知识关系' : 'EXPLORE KNOWLEDGE GRAPH'} <Wand2 className="w-4 h-4" /></button>
        </div>
      </div>
    </section>
  );
};
