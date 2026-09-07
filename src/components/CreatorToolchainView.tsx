import React, { useMemo, useState } from 'react';
import { Box, Camera, Clapperboard, Code2, Figma, Image, Layers3, Play, Search, Sparkles, Wand2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { KNOWLEDGE_CATALOG } from '../data/knowledgeCatalog';

type Tool = { name:string; type:string; icon:React.ElementType; desc:string; descEn:string; domains:string[]; keywords:string[] };
const TOOLS:Tool[] = [
 {name:'Photoshop',type:'IMAGE',icon:Image,desc:'图像编辑、合成、修图与视觉制作。',descEn:'Image editing, compositing, retouching and visual production.',domains:['graphic-design','photography','ai-creation'],keywords:['PS','修图','合成']},
 {name:'Illustrator',type:'VECTOR',icon:Wand2,desc:'矢量图形、标志、插画与品牌视觉。',descEn:'Vector graphics, logos, illustration and identity.',domains:['graphic-design'],keywords:['AI','矢量','Logo']},
 {name:'Figma',type:'PRODUCT',icon:Figma,desc:'界面、原型、设计系统与协作。',descEn:'Interfaces, prototypes, design systems and collaboration.',domains:['ui-ux','graphic-design'],keywords:['UI','UX','原型']},
 {name:'Premiere Pro',type:'EDITING',icon:Clapperboard,desc:'视频剪辑、声音、字幕与交付。',descEn:'Video editing, sound, captions and delivery.',domains:['video-editing'],keywords:['PR','剪辑','视频']},
 {name:'After Effects',type:'MOTION',icon:Play,desc:'动态图形、文字动画、合成与视觉特效。',descEn:'Motion graphics, typography, compositing and VFX.',domains:['motion','video-editing'],keywords:['AE','动画','VFX']},
 {name:'DaVinci Resolve',type:'COLOR / EDIT',icon:Camera,desc:'剪辑、调色、声音与后期一体化工作流。',descEn:'Integrated editing, color, audio and finishing workflow.',domains:['video-editing','photography','audio'],keywords:['达芬奇','调色','Fairlight']},
 {name:'Blender',type:'3D',icon:Box,desc:'建模、材质、灯光、动画、模拟与渲染。',descEn:'Modeling, materials, lighting, animation, simulation and rendering.',domains:['3d','motion'],keywords:['3D','Geometry Nodes','Cycles']},
 {name:'Cinema 4D',type:'3D MOTION',icon:Layers3,desc:'产品视觉、动态图形、建模与渲染。',descEn:'Product visuals, motion graphics, modeling and rendering.',domains:['3d','motion'],keywords:['C4D','MoGraph','Redshift']},
 {name:'Houdini',type:'PROCEDURAL',icon:Code2,desc:'程序化建模、粒子、流体与复杂视觉模拟。',descEn:'Procedural modeling, particles, fluids and complex simulations.',domains:['3d','motion'],keywords:['程序化','粒子','模拟']},
 {name:'Substance 3D',type:'MATERIAL',icon:Sparkles,desc:'PBR 材质制作、纹理绘制与资产处理。',descEn:'PBR materials, texture painting and asset authoring.',domains:['3d'],keywords:['PBR','纹理','材质']},
];

export const CreatorToolchainView:React.FC=()=>{
 const {lang}=useLanguage(); const zh=lang==='zh'; const [q,setQ]=useState(''); const [filter,setFilter]=useState('ALL');
 const filtered=useMemo(()=>TOOLS.filter(t=>(filter==='ALL'||t.type===filter||t.domains.includes(filter))&&(!q||[t.name,t.type,t.desc,t.descEn,...t.keywords].join(' ').toLowerCase().includes(q.toLowerCase()))),[q,filter]);
 const filters=['ALL','IMAGE','PRODUCT','EDITING','MOTION','3D','MATERIAL'];
 return <section className="bg-[#0E0E0C] border-t border-[#F2F0E8]/10 text-[#F2F0E8]"><div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
  <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8"><div><div className="text-[10px] font-mono tracking-[.18em] text-[#D8FF3E]">03 // SOFTWARE & TOOLCHAIN</div><h2 className="text-4xl md:text-6xl font-black tracking-[-.04em] mt-3">{zh?'软件不是知识的终点。':'SOFTWARE IS NOT THE KNOWLEDGE.'}</h2><p className="text-sm text-[#8B887F] max-w-2xl leading-7 mt-4">{zh?'先理解原理，再选择工具实现。每个软件都连接回知识节点，而不是变成孤立的软件教程。':'Learn the principle first, then choose the tool. Every application links back to concepts instead of becoming an isolated tutorial library.'}</p></div><div className="font-mono text-[10px] text-[#77736B]">{KNOWLEDGE_CATALOG.length} KNOWLEDGE NODES → {TOOLS.length} TOOLCHAINS</div></div>
  <div className="mt-8 flex flex-col md:flex-row gap-3"><div className="relative flex-1 max-w-xl"><Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#77736B]"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder={zh?'搜索软件、能力或关键词…':'Search software, capabilities or keywords…'} className="w-full bg-[#171714] border border-[#F2F0E8]/10 pl-11 pr-4 py-3 text-sm outline-none focus:border-[#D8FF3E]"/></div><div className="flex gap-2 overflow-x-auto">{filters.map(f=><button key={f} onClick={()=>setFilter(f)} className={`px-3 py-2 text-[9px] font-mono border shrink-0 ${filter===f?'bg-[#D8FF3E] text-[#11110F] border-[#D8FF3E]':'border-[#F2F0E8]/10 text-[#77736B]'}`}>{f}</button>)}</div></div>
  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-px bg-[#F2F0E8]/10 border border-[#F2F0E8]/10 mt-8">{filtered.map(t=>{const Icon=t.icon;const count=KNOWLEDGE_CATALOG.filter(n=>n.software.some(s=>s.toLowerCase().includes(t.name.toLowerCase())||t.name==='After Effects'&&s==='After Effects'||t.name==='Premiere Pro'&&s==='Premiere')).length;return <article key={t.name} className="bg-[#0E0E0C] p-6 min-h-[250px] hover:bg-[#171714] transition-colors"><div className="flex justify-between"><div className="w-10 h-10 border border-[#F2F0E8]/10 flex items-center justify-center"><Icon className="w-4 h-4 text-[#D8FF3E]"/></div><span className="text-[9px] font-mono text-[#55534E]">{t.type}</span></div><h3 className="text-2xl font-bold mt-8">{t.name}</h3><p className="text-sm text-[#8B887F] leading-6 mt-2">{zh?t.desc:t.descEn}</p><div className="flex flex-wrap gap-1.5 mt-5">{t.keywords.map(k=><span key={k} className="px-2 py-1 border border-[#F2F0E8]/10 text-[9px] font-mono text-[#77736B]">{k}</span>)}</div><div className="mt-6 text-[9px] font-mono text-[#55534E]">{count} {zh?'关联知识节点':'LINKED KNOWLEDGE NODES'}</div></article>})}</div>
 </div></section>;
};
