import React from 'react';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, ExternalLink, Layers3, Sparkles, Wrench } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getKnowledgeDomain, getKnowledgeNode, getNodesByDomain } from '../data/knowledgeStore';

interface Props { nodeId: string; onBack: () => void; onOpenNode: (id: string) => void; }

export const KnowledgeDetailView: React.FC<Props> = ({ nodeId, onBack, onOpenNode }) => {
  const { lang } = useLanguage();
  const isZh = lang === 'zh';
  const node = getKnowledgeNode(nodeId);
  if (!node) return <section className="min-h-screen bg-[#11110F] text-[#F2F0E8] p-10"><button onClick={onBack} className="font-mono text-sm text-[#D8FF3E]">← BACK</button><h1 className="text-4xl font-black mt-8">Knowledge not found.</h1></section>;
  const domain = getKnowledgeDomain(node.domainId);
  const siblings = getNodesByDomain(node.domainId).filter((item) => item.id !== node.id).slice(0, 4);
  const title = isZh ? node.title : node.titleEn;
  const summary = isZh ? node.summary : node.summaryEn;
  const level = node.level === 'beginner' ? (isZh ? '入门' : 'BEGINNER') : node.level === 'intermediate' ? (isZh ? '进阶' : 'INTERMEDIATE') : (isZh ? '高级' : 'ADVANCED');

  return <section className="min-h-screen bg-[#11110F] text-[#F2F0E8]">
    <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-10 lg:py-16">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[.14em] text-[#8B887F] hover:text-[#D8FF3E] uppercase"><ArrowLeft className="w-3.5 h-3.5"/> {isZh ? '返回知识百科' : 'Back to knowledge'}</button>
      <div className="grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-20 mt-10">
        <article>
          <div className="flex flex-wrap gap-2 text-[10px] font-mono uppercase"><span className="text-[#D8FF3E]">{domain ? (isZh ? domain.name : domain.nameEn) : node.domainId}</span><span className="text-[#55534E]">/</span><span className="text-[#8B887F]">{level}</span></div>
          <h1 className="text-5xl md:text-7xl lg:text-[7rem] leading-[.86] tracking-[-.055em] font-black mt-5">{title}</h1>
          <p className="text-lg md:text-xl leading-8 text-[#B5B1A8] max-w-3xl mt-8">{summary}</p>

          <div className="mt-12 border-y border-[#F2F0E8]/10 py-10">
            <div className="flex items-center gap-2 text-[10px] font-mono text-[#D8FF3E] uppercase"><BookOpen className="w-4 h-4"/> {isZh ? '一句话理解' : 'In one sentence'}</div>
            <p className="text-2xl md:text-3xl font-semibold leading-snug mt-4 max-w-3xl">{isZh ? `先理解「${title}」解决什么问题，再决定使用什么软件实现。` : `Understand what ${title} solves before choosing the software that implements it.`}</p>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-px bg-[#F2F0E8]/10 border border-[#F2F0E8]/10">
            {[
              { icon: CheckCircle2, label: isZh ? '核心原理' : 'CORE PRINCIPLE', text: isZh ? `${title}不是孤立技巧，它与视觉目标、信息层级和观看方式相关。` : `${title} is not an isolated trick; it connects to visual goals, hierarchy and how people perceive work.` },
              { icon: Sparkles, label: isZh ? '什么时候用' : 'WHEN TO USE', text: isZh ? `当你需要更明确地控制画面、节奏或信息表达时，它会成为一个可复用的决策工具。` : `Use it when you need more deliberate control over image, rhythm or information.` },
              { icon: Layers3, label: isZh ? '实践方法' : 'PRACTICE', text: isZh ? '先做一个小实验，再比较前后差异，最后把判断标准记录下来。' : 'Run a small experiment, compare the result, then record the criteria behind your decision.' },
              { icon: Wrench, label: isZh ? '实现方式' : 'IMPLEMENTATION', text: node.software.length ? node.software.join(' · ') : (isZh ? '可用多种创作工具实现' : 'Can be implemented with multiple creative tools') },
            ].map(({ icon: Icon, label, text }) => <div key={label} className="bg-[#11110F] p-7 min-h-[190px]"><Icon className="w-4 h-4 text-[#D8FF3E]"/><div className="text-[10px] font-mono text-[#8B887F] mt-8">{label}</div><p className="text-sm leading-6 mt-2 text-[#D8D5CB]">{text}</p></div>)}
          </div>

          <div className="mt-14">
            <div className="text-[10px] font-mono text-[#D8FF3E]">RELATED KNOWLEDGE</div>
            <div className="grid sm:grid-cols-2 gap-2 mt-4">{siblings.map((item) => <button key={item.id} onClick={() => onOpenNode(item.id)} className="text-left border border-[#F2F0E8]/10 p-5 hover:border-[#D8FF3E]/40 group"><div className="text-lg font-bold">{isZh ? item.title : item.titleEn}</div><div className="text-xs text-[#8B887F] mt-2 line-clamp-2">{isZh ? item.summary : item.summaryEn}</div><ArrowRight className="w-4 h-4 text-[#55534E] mt-5 group-hover:text-[#D8FF3E] group-hover:translate-x-1 transition-all"/></button>)}</div>
          </div>
        </article>

        <aside className="lg:pt-12">
          <div className="lg:sticky lg:top-24 space-y-3">
            <div className="border border-[#F2F0E8]/10 p-6"><div className="text-[10px] font-mono text-[#8B887F]">NODE</div><div className="font-mono text-sm text-[#D8FF3E] mt-2">{node.slug}</div><div className="text-[10px] text-[#8B887F] mt-5">{isZh ? '标签' : 'TAGS'}</div><div className="flex flex-wrap gap-1.5 mt-2">{node.tags.map((tag) => <span key={tag} className="px-2 py-1 border border-[#F2F0E8]/10 text-[9px] font-mono text-[#8B887F]">{tag}</span>)}</div></div>
            <div className="border border-[#D8FF3E]/20 bg-[#D8FF3E]/5 p-6"><div className="text-[10px] font-mono text-[#D8FF3E]">NEXT</div><h3 className="text-xl font-bold mt-2">{isZh ? '把知识变成实践' : 'Turn knowledge into practice'}</h3><p className="text-xs leading-5 text-[#8B887F] mt-3">{isZh ? '下一步可以进入创作实验室，或使用对应工具。' : 'Move into the Lab or use a related creator tool next.'}</p><button className="mt-5 inline-flex items-center gap-2 text-[10px] font-mono text-[#F2F0E8]">{isZh ? '进入实验室' : 'OPEN LAB'} <ExternalLink className="w-3 h-3"/></button></div>
          </div>
        </aside>
      </div>
    </div>
  </section>;
};
