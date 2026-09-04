import React, { useState } from 'react';
import type { AIVideoWorkflow } from '../types/art';
import { Film, Copy, Check, ChevronRight, CheckCircle2, Sparkles, Layers } from 'lucide-react';
import { playSpotlightClick, playSuccessChime } from '../utils/audio';

interface AIVideoWorkflowLabProps {
  workflows: AIVideoWorkflow[];
}

export const AIVideoWorkflowLab: React.FC<AIVideoWorkflowLabProps> = ({ workflows }) => {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Workflow Tabs */}
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
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                active
                  ? 'bg-indigo-50/70 border-indigo-500 shadow-sm ring-1 ring-indigo-500'
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-xs'
              }`}
            >
              <div className="space-y-1.5 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                    {wf.badge}
                  </span>
                  <span className="text-[11px] text-gray-500 font-mono">
                    共 {wf.steps?.length || wf.totalSteps} 步
                  </span>
                </div>
                <h3 className={`text-sm font-bold ${active ? 'text-indigo-950' : 'text-gray-900'}`}>
                  {wf.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                  {wf.summary}
                </p>
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-gray-400">难度：{wf.difficulty}</span>
                <span className="text-indigo-600 font-semibold flex items-center gap-1">
                  <span>查看执行步骤</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ACTIVE WORKFLOW MAIN STAGE */}
      <div className="rounded-2xl bg-white border border-gray-200 p-6 sm:p-8 space-y-8 shadow-sm text-left">
        {/* Header summary */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-200">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 text-xs font-semibold">
                {activeWorkflow.category}
              </span>
              <span className="text-xs text-gray-500">
                难度：{activeWorkflow.difficulty} · 包含 {activeWorkflow.steps.length} 核心步骤
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {activeWorkflow.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-2xl leading-relaxed">
              {activeWorkflow.summary}
            </p>
          </div>

          {/* Tools stack */}
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1.5 shrink-0">
            <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              🛠️ 推荐工具链 (Tools Chain):
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {activeWorkflow.toolsChain?.map((tool, i) => (
                <span
                  key={i}
                  className="text-xs px-2.5 py-1 rounded-md bg-white border border-gray-200 text-gray-800 shadow-2xs font-medium"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* STEP BY STEP TIMELINE */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600" />
            <h3 className="text-base font-bold text-gray-900">
              分步执行时间轴 (Step-by-Step Pipeline)
            </h3>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-gray-200">
            {activeWorkflow.steps.map((step, idx) => {
              const isCopied = copiedStepIndex === idx;

              return (
                <div key={idx} className="relative pl-12 sm:pl-14 group">
                  {/* Step Number Badge */}
                  <div className="absolute left-1 top-0 w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-sm z-10">
                    {step.stepNumber}
                  </div>

                  {/* Step Card */}
                  <div className="p-5 sm:p-6 rounded-xl bg-gray-50/70 border border-gray-200 space-y-3.5 shadow-2xs hover:border-gray-300 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200/80 pb-2.5">
                      <div>
                        <span className="text-[10px] font-mono text-indigo-600 font-bold uppercase tracking-wider">
                          STAGE 0{step.stepNumber}
                        </span>
                        <h4 className="text-base font-bold text-gray-900 mt-0.5">
                          {step.stepTitle}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <span className="text-xs text-gray-500">使用工具:</span>
                        <span className="px-2.5 py-1 rounded-md bg-white border border-gray-200 text-gray-800 text-xs font-semibold shadow-2xs">
                          {step.toolUsed}
                        </span>
                      </div>
                    </div>

                    {/* Purpose */}
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-gray-600">🎯 本步执行目的:</span>
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                        {step.purpose}
                      </p>
                    </div>

                    {/* Step Prompt Box */}
                    <div className="p-3.5 rounded-xl bg-white border border-gray-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-indigo-700 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                          <span>本步骤专用提示词 / 参数:</span>
                        </span>
                        <button
                          onClick={() => handleCopyStepPrompt(step.stepPrompt, idx)}
                          className="flex items-center gap-1 px-3 py-1 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 text-xs font-bold transition-all cursor-pointer"
                        >
                          {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          <span>{isCopied ? '已复制' : '复制 Prompt'}</span>
                        </button>
                      </div>

                      <div className="text-xs font-mono text-gray-800 leading-relaxed select-all">
                        {step.stepPrompt}
                      </div>

                      {step.parameters && (
                        <div className="pt-2 border-t border-gray-100 text-xs text-gray-500 font-mono">
                          <span className="font-semibold text-gray-700">推荐参数：</span> {step.parameters}
                        </div>
                      )}
                    </div>

                    {/* Key techniques */}
                    {step.keyTechniques && step.keyTechniques.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <span className="text-xs font-semibold text-gray-700">
                          💡 核心实战技巧与避坑指南:
                        </span>
                        <ul className="space-y-1">
                          {step.keyTechniques.map((tech, tIdx) => (
                            <li key={tIdx} className="text-xs text-gray-600 flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
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