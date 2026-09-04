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
                active ? 'ring-2' : 'hover:opacity-90'
              }`}
              style={{
                backgroundColor: active ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                borderColor: active ? 'var(--accent)' : 'var(--border-subtle)',
              }}
            >
              <div className="space-y-1.5 text-left">
                <div className="flex items-center justify-between">
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full border"
                    style={{
                      backgroundColor: 'var(--tag-bg)',
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--tag-text)',
                    }}
                  >
                    {wf.badge}
                  </span>
                  <span className="text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>
                    共 {wf.steps?.length || wf.totalSteps} 步
                  </span>
                </div>
                <h3 className="text-sm font-bold" style={{ color: 'var(--text-main)' }}>
                  {wf.title}
                </h3>
                <p className="text-xs line-clamp-2 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {wf.summary}
                </p>
              </div>

              <div className="pt-2 border-t flex items-center justify-between text-xs" style={{ borderColor: 'var(--border-subtle)' }}>
                <span className="text-[11px]" style={{ color: 'var(--text-dim)' }}>
                  难度：{wf.difficulty}
                </span>
                <span className="font-semibold flex items-center gap-1" style={{ color: 'var(--accent)' }}>
                  <span>查看执行步骤</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ACTIVE WORKFLOW MAIN STAGE */}
      <div
        className="rounded-2xl border p-6 sm:p-8 space-y-8 shadow-xs text-left transition-colors"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        {/* Header summary */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span
                className="px-2.5 py-0.5 rounded-full border text-xs font-semibold"
                style={{
                  backgroundColor: 'var(--accent-light)',
                  borderColor: 'var(--accent-border)',
                  color: 'var(--accent)',
                }}
              >
                {activeWorkflow.category}
              </span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                难度：{activeWorkflow.difficulty} · 包含 {activeWorkflow.steps.length} 核心步骤
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-black" style={{ color: 'var(--text-main)' }}>
              {activeWorkflow.title}
            </h2>
            <p className="text-xs sm:text-sm max-w-2xl leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {activeWorkflow.summary}
            </p>
          </div>

          {/* Tools stack */}
          <div
            className="p-4 rounded-xl border space-y-1.5 shrink-0"
            style={{
              backgroundColor: 'var(--bg-page-subtle)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              🛠️ 推荐工具链 (Tools Stack):
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {activeWorkflow.toolsChain?.map((tool, i) => (
                <span
                  key={i}
                  className="text-xs px-2.5 py-1 rounded-md border font-medium"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-main)',
                  }}
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
            <Layers className="w-4 h-4" style={{ color: 'var(--accent)' }} />
            <h3 className="text-base font-bold" style={{ color: 'var(--text-main)' }}>
              分步执行时间轴 (Step-by-Step Pipeline)
            </h3>
          </div>

          <div
            className="space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5"
            style={{ '--tw-before-bg': 'var(--border-strong)' } as any}
          >
            {activeWorkflow.steps.map((step, idx) => {
              const isCopied = copiedStepIndex === idx;

              return (
                <div key={idx} className="relative pl-12 sm:pl-14 group">
                  {/* Step Number Badge */}
                  <div
                    className="absolute left-1 top-0 w-8 h-8 rounded-full font-bold text-sm flex items-center justify-center shadow-xs z-10"
                    style={{
                      backgroundColor: 'var(--accent)',
                      color: '#FFFFFF',
                    }}
                  >
                    {step.stepNumber}
                  </div>

                  {/* Step Card */}
                  <div
                    className="p-5 sm:p-6 rounded-xl border space-y-3.5 shadow-2xs hover:opacity-95 transition-all"
                    style={{
                      backgroundColor: 'var(--bg-page-subtle)',
                      borderColor: 'var(--border-subtle)',
                    }}
                  >
                    <div
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-2.5"
                      style={{ borderColor: 'var(--border-subtle)' }}
                    >
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                          STAGE 0{step.stepNumber}
                        </span>
                        <h4 className="text-base font-bold mt-0.5" style={{ color: 'var(--text-main)' }}>
                          {step.stepTitle}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                          使用工具:
                        </span>
                        <span
                          className="px-2.5 py-1 rounded-md border text-xs font-semibold"
                          style={{
                            backgroundColor: 'var(--bg-card)',
                            borderColor: 'var(--border-subtle)',
                            color: 'var(--text-main)',
                          }}
                        >
                          {step.toolUsed}
                        </span>
                      </div>
                    </div>

                    {/* Purpose */}
                    <div className="space-y-1">
                      <span className="text-xs font-semibold" style={{ color: 'var(--text-main)' }}>
                        🎯 本步执行目的:
                      </span>
                      <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                        {step.purpose}
                      </p>
                    </div>

                    {/* Step Prompt Box */}
                    <div
                      className="p-3.5 rounded-xl border space-y-2"
                      style={{
                        backgroundColor: 'var(--bg-card)',
                        borderColor: 'var(--border-subtle)',
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold flex items-center gap-1.5" style={{ color: 'var(--accent)' }}>
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>本步骤专用提示词 / 参数:</span>
                        </span>
                        <button
                          onClick={() => handleCopyStepPrompt(step.stepPrompt, idx)}
                          className="flex items-center gap-1 px-3 py-1 rounded-lg border text-xs font-bold transition-all cursor-pointer hover:opacity-85"
                          style={{
                            backgroundColor: 'var(--accent-light)',
                            borderColor: 'var(--accent-border)',
                            color: 'var(--accent)',
                          }}
                        >
                          {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          <span>{isCopied ? '已复制' : '复制 Prompt'}</span>
                        </button>
                      </div>

                      <div className="text-xs font-mono leading-relaxed select-all" style={{ color: 'var(--text-main)' }}>
                        {step.stepPrompt}
                      </div>

                      {step.parameters && (
                        <div className="pt-2 border-t text-xs font-mono" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                          <span className="font-semibold" style={{ color: 'var(--text-main)' }}>推荐参数：</span> {step.parameters}
                        </div>
                      )}
                    </div>

                    {/* Key techniques */}
                    {step.keyTechniques && step.keyTechniques.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <span className="text-xs font-semibold" style={{ color: 'var(--text-main)' }}>
                          💡 核心实战技巧与避坑指南:
                        </span>
                        <ul className="space-y-1">
                          {step.keyTechniques.map((tech, tIdx) => (
                            <li key={tIdx} className="text-xs flex items-start gap-2" style={{ color: 'var(--text-muted)' }}>
                              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
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