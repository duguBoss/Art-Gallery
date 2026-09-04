import React, { useState } from 'react';
import type { AIVideoWorkflow, VideoWorkflowStep } from '../types/art';
import { Film, Sparkles, Copy, Check, ArrowRight, Layers, Sliders, Video, CheckCircle2, ChevronRight, Wrench } from 'lucide-react';
import { playSpotlightClick, playSuccessChime } from '../utils/audio';

interface AIVideoWorkflowLabProps {
  workflows: AIVideoWorkflow[];
  onOpenAdmin: () => void;
}

export const AIVideoWorkflowLab: React.FC<AIVideoWorkflowLabProps> = ({
  workflows,
  onOpenAdmin,
}) => {
  const [activeWorkflowId, setActiveWorkflowId] = useState<string>(workflows[0]?.id || '');
  const [copiedStepIndex, setCopiedStepIndex] = useState<number | null>(null);

  const activeWorkflow = workflows.find((w) => w.id === activeWorkflowId) || workflows[0];

  const handleCopyStepPrompt = (prompt: string, idx: number) => {
    playSpotlightClick();
    navigator.clipboard.writeText(prompt);
    playSuccessChime();
    setCopiedStepIndex(idx);
    setTimeout(() => setCopiedStepIndex(null), 2000);
  };

  if (!activeWorkflow) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gallery-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-violet/10 border border-accent-violet/30 text-accent-violet text-xs font-mono tracking-wider uppercase mb-2">
            <Film className="w-3.5 h-3.5" />
            <span>AI VIDEO PIPELINE STUDIO · 多步骤影视与动效工作流工坊</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-black text-gallery-100">
            分步式视频生成工作流 · 第一步是干啥，第二步是干啥
          </h2>
          <p className="text-xs sm:text-sm text-gallery-400 mt-1 max-w-2xl font-sans">
            AI 视频不是一蹴而就的黑盒。我们将其拆解为清晰的链式步骤（资产生成 ➔ 运镜与微动 ➔ 节奏与后期），每个步骤都有专属提示词与核心技巧，小白也能照着做出大片！
          </p>
        </div>
      </div>

      {/* Top Workflow Switcher Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {workflows.map((wf) => {
          const active = wf.id === activeWorkflow.id;
          return (
            <div
              key={wf.id}
              onClick={() => {
                playSpotlightClick();
                setActiveWorkflowId(wf.id);
              }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                active
                  ? 'bg-gradient-to-br from-gallery-900 via-[#191322] to-gallery-950 border-accent-violet shadow-glow-gold/20 scale-[1.01]'
                  : 'bg-gallery-950 border-gallery-800 hover:border-gallery-700 hover:bg-gallery-900/60'
              }`}
            >
              <div className="space-y-2 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent-violet/20 border border-accent-violet/30 text-accent-violet font-semibold">
                    {wf.badge}
                  </span>
                  <span className="text-[11px] font-mono text-gallery-400">
                    共 {wf.steps?.length || wf.totalSteps} 个执行步骤
                  </span>
                </div>
                <h3 className={`text-base font-serif font-bold ${active ? 'text-gold-300' : 'text-gallery-200'}`}>
                  {wf.title}
                </h3>
                <p className="text-xs text-gallery-400 line-clamp-2 leading-relaxed">
                  {wf.summary}
                </p>
              </div>

              <div className="pt-2 border-t border-gallery-800/80 flex items-center justify-between text-xs">
                <span className="font-mono text-[10px] text-gallery-400">难度：{wf.difficulty}</span>
                <span className="text-gold-400 flex items-center gap-1 font-serif font-semibold">
                  <span>查看全流程步骤</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ACTIVE WORKFLOW MAIN STAGE */}
      <div className="rounded-3xl bg-gallery-950 border border-gallery-800 p-6 sm:p-8 space-y-8 shadow-2xl text-left">
        {/* Workflow Title & Overview */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gallery-800">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/30 text-xs font-mono font-bold">
                {activeWorkflow.category}
              </span>
              <span className="text-xs font-mono text-gallery-400">
                难度系数：{activeWorkflow.difficulty} · 包含 {activeWorkflow.steps.length} 核心步骤
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-black text-gallery-100">
              {activeWorkflow.title}
            </h3>
            <p className="text-xs sm:text-sm text-gallery-300 max-w-3xl leading-relaxed">
              {activeWorkflow.summary}
            </p>
          </div>

          {/* Tools Chain Pills */}
          <div className="p-4 rounded-xl bg-gallery-900 border border-gallery-800 space-y-2 shrink-0">
            <div className="text-[11px] font-mono text-gold-400 uppercase tracking-wider">
              🛠️ 核心工具链 (Tools Stack):
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {activeWorkflow.toolsChain?.map((tool, i) => (
                <span key={i} className="text-xs font-mono px-2 py-1 rounded bg-gallery-950 border border-gallery-700 text-gallery-200">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* STEP-BY-STEP PIPELINE TIMELINE */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-gold-400" />
            <h4 className="text-lg font-serif font-bold text-gallery-100">
              分步管线执行看板 (Step-by-Step Pipeline)
            </h4>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-0 before:left-6 before:w-0.5 before:bg-gradient-to-b before:from-gold-500 before:via-accent-violet before:to-transparent">
            {activeWorkflow.steps.map((step, idx) => {
              const isCopied = copiedStepIndex === idx;

              return (
                <div key={idx} className="relative pl-14 sm:pl-16 group">
                  {/* Step Number Dot Badge */}
                  <div className="absolute left-2.5 top-0 w-8 h-8 rounded-full bg-gradient-to-br from-gold-500 to-amber-600 text-gallery-950 font-mono font-black text-sm flex items-center justify-center shadow-glow-gold z-10">
                    {step.stepNumber}
                  </div>

                  {/* Step Card Content */}
                  <div className="p-5 sm:p-7 rounded-2xl bg-gallery-900/90 border border-gallery-800 group-hover:border-gold-500/50 transition-all duration-300 space-y-4 shadow-xl">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gallery-800 pb-3">
                      <div>
                        <div className="text-[11px] font-mono text-gold-400 font-semibold tracking-wider">
                          STAGE 0{step.stepNumber} // 阶段执行目标
                        </div>
                        <h5 className="text-lg font-serif font-black text-gallery-100 mt-0.5">
                          {step.stepTitle}
                        </h5>
                      </div>

                      {/* Tool Used Badge */}
                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <span className="text-[11px] font-mono text-gallery-400">使用工具:</span>
                        <span className="px-3 py-1 rounded-lg bg-gallery-950 border border-accent-cyan/40 text-accent-cyan font-mono text-xs font-bold shadow-sm">
                          {step.toolUsed}
                        </span>
                      </div>
                    </div>

                    {/* Purpose */}
                    <div className="space-y-1">
                      <span className="text-xs font-mono text-gallery-400">🎯 本步执行目的:</span>
                      <p className="text-xs sm:text-sm text-gallery-200 leading-relaxed font-sans">
                        {step.purpose}
                      </p>
                    </div>

                    {/* Step Prompt Box with 1-Click Copy */}
                    <div className="p-4 rounded-xl bg-black/80 border border-gold-500/30 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono text-gold-400 font-bold flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>本步骤专用提示词 / 参数配方:</span>
                        </span>
                        <button
                          onClick={() => handleCopyStepPrompt(step.stepPrompt, idx)}
                          className="flex items-center gap-1 px-3 py-1 rounded-lg bg-gold-500/20 border border-gold-500/40 text-gold-300 hover:bg-gold-500 hover:text-gallery-950 font-mono text-[11px] font-bold transition-all cursor-pointer"
                        >
                          {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{isCopied ? '已复制' : '一键复制 Prompt'}</span>
                        </button>
                      </div>

                      <div className="text-xs font-mono text-gallery-200 leading-relaxed select-all">
                        {step.stepPrompt}
                      </div>

                      {step.parameters && (
                        <div className="pt-2 border-t border-gallery-800 text-[11px] font-mono text-gallery-400">
                          <span className="text-gold-400 font-semibold">推荐运行参数：</span> {step.parameters}
                        </div>
                      )}
                    </div>

                    {/* Key Technical Tips */}
                    {step.keyTechniques && step.keyTechniques.length > 0 && (
                      <div className="space-y-2 pt-1">
                        <span className="text-xs font-mono text-accent-violet font-semibold">
                          💡 核心实战技巧与避坑指南:
                        </span>
                        <ul className="space-y-1.5">
                          {step.keyTechniques.map((tech, tIdx) => (
                            <li key={tIdx} className="text-xs text-gallery-300 flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                              <span>{tech}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};