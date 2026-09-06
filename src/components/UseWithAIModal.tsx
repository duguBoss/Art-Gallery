import React, { useState } from 'react';
import { X, Copy, Check, Sparkles, Terminal, ExternalLink, Bot, Cpu } from 'lucide-react';
import { playSpotlightClick, playSuccessChime } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';

interface UseWithAIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AITarget = 'gemini' | 'claude' | 'chatgpt' | 'kimi' | 'deepseek';
type AIPurpose = 'learn' | 'prompt' | 'storyboard' | 'audit';

export const UseWithAIModal: React.FC<UseWithAIModalProps> = ({ isOpen, onClose }) => {
  const { lang, t } = useLanguage();
  const [targetAI, setTargetAI] = useState<AITarget>('gemini');
  const [purpose, setPurpose] = useState<AIPurpose>('learn');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const aiOptions: { id: AITarget; name: string; tag: string }[] = [
    { id: 'gemini', name: 'Google Gemini', tag: '3.8 Flash / Pro' },
    { id: 'claude', name: 'Anthropic Claude', tag: '3.7 Sonnet' },
    { id: 'chatgpt', name: 'OpenAI ChatGPT', tag: 'GPT-4o' },
    { id: 'kimi', name: 'Moonshot Kimi', tag: 'K1.5' },
    { id: 'deepseek', name: 'DeepSeek', tag: 'R1 / V3' },
  ];

  const purposeOptions: { id: AIPurpose; labelZh: string; labelEn: string; descZh: string; descEn: string }[] = [
    {
      id: 'learn',
      labelZh: '01 学习视觉语言体系',
      labelEn: '01 Learn Visual Design Syntax',
      descZh: '让 AI 学习本站的构图比例、主暗光影、光学焦段与色彩对撞规律',
      descEn: 'Train AI to extract underlying composition, lighting ratios, optics, and color harmony'
    },
    {
      id: 'prompt',
      labelZh: '02 生成好莱坞生产级提示词',
      labelEn: '02 Generate Industrial Prompts',
      descZh: '基于 Visual DNA 自动为 Midjourney / FLUX 生成精准物理光学参数',
      descEn: 'Synthesize production-grade optical prompts for Midjourney v6.1 & FLUX.1'
    },
    {
      id: 'storyboard',
      labelZh: '03 构建四幕影视分镜故事板',
      labelEn: '03 Construct 4-Beat Storyboard',
      descZh: '依据视听律动规划 Establishing → Reveal → Encounter → Resolution 序列',
      descEn: 'Plan cinematic cadence from environmental tension to emotional resolution'
    },
    {
      id: 'audit',
      labelZh: '04 视觉美学审计与解构',
      labelEn: '04 Aesthetic Audit & Deconstruction',
      descZh: '按照瑞士网格与电影宪章对用户上传的参考图进行客观美学审计',
      descEn: 'Audit reference images against Swiss grid, negative space ratio, and lighting vectors'
    },
  ];

  const generatePrompt = () => {
    const siteUrl = 'https://duguboss.github.io/Art-Gallery/';
    const llmsUrl = 'https://duguboss.github.io/Art-Gallery/llms.txt';
    const jsonUrl = 'https://duguboss.github.io/Art-Gallery/visual-knowledge.json';

    if (purpose === 'learn') {
      return `[SYSTEM INSTRUCTION: VISUAL DESIGN KNOWLEDGE AGENT]
Please read and study the cinematic aesthetic language system and visual ontology from:
${siteUrl}
Knowledge Manifest (llms.txt): ${llmsUrl}
Structured JSON Ontology: ${jsonUrl}

Core User Journey: SEE → DECODE → CONNECT → COLLECT → CREATE.
Methodology:
1. Extract visual DNA dimensions: Mood, Light (key-to-fill ratios, volumetric falloff), Color (chromatic temperature separation), Camera Optics (focal compression, shutter angle), and Composition (negative space %, geometric balance).
2. Adhere to the Swiss Modernist editorial grid (#11110F darkroom canvas, zero purple-blue gradients or card-clutter).
3. Act as my Senior Art Director and Cinematographer. Based on this knowledge framework, guide me through designing visual masterworks.`;
    }

    if (purpose === 'prompt') {
      return `[SYSTEM INSTRUCTION: HOLLYWOOD PROMPT ARCHITECT]
Access the Visual Atlas knowledge engine at ${siteUrl} (Manifest: ${llmsUrl}).
Reference the visual DNA models (e.g. Cooke Anamorphic 35mm, Low-Key Volumetric Rim 1:8, Negative Space 78%, Cyan & Amber Contrast).

Task:
I want to create a cinematic master shot for [ENTER PROJECT THEME HERE].
Synthesize a production-ready prompt tailored for Midjourney v6.1 (--ar 2.39:1 --style raw) and FLUX.1 [dev], strictly avoiding AI cliches (no oversaturated purple blobs or generic neon halos). Include exact camera lens, lighting vectors, and color grading palette.`;
    }

    if (purpose === 'storyboard') {
      return `[SYSTEM INSTRUCTION: CINEMATIC STORYBOARD DIRECTOR]
Refer to the 4-beat rhythm framework of Visual Atlas (${siteUrl}/#lab):
Beat 1 (01 ESTABLISHING): Environmental scale and tension
Beat 2 (02 REVEAL): Structural scale shock (5% Human vs 95% Brutalist Architecture)
Beat 3 (03 ENCOUNTER): Intimate focal depth & claustrophobia
Beat 4 (04 RESOLUTION): Contemplative stasis & negative space poetry

Generate a complete cinematic call sheet and storyboard sequence for [ENTER STORY SCENARIO HERE].`;
    }

    return `[SYSTEM INSTRUCTION: AESTHETIC AUDITOR & DECONSTRUCTOR]
Using the Visual Atlas 5-Mode HUD Analysis System from ${siteUrl}:
Audit the aesthetic quality of [DESCRIBE IMAGE OR PASTE REFERENCE].
Deconstruct across:
1. Composition (Rule of thirds intersection, Fibonacci ratio, negative space percentage)
2. Lighting Vector (Direction, key-to-fill ratio, falloff law, diffusion quality)
3. Chromatic Harmony (Palette hex codes, temperature contrast)
4. Optical Syntax (Focal length, anamorphic distortion, depth of field)
5. Anti-AI-Design Compliance (Does it violate genuine art direction restraint?)`;
  };

  const currentPrompt = generatePrompt();

  const handleCopy = () => {
    navigator.clipboard.writeText(currentPrompt);
    setCopied(true);
    playSuccessChime();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-3xl bg-[#141412] border border-[#F2F0E8]/20 shadow-2xl overflow-hidden text-[#F2F0E8] font-mono flex flex-col max-h-[90vh]"
        style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.95)' }}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F2F0E8]/10 bg-[#11110F]">
          <div className="flex items-center gap-2 text-xs">
            <Cpu className="w-4 h-4 text-[#D8FF3E]" />
            <span className="text-[#D8FF3E] font-bold">AIO / GEO // USE WITH AI</span>
            <span className="text-[#8B887F] hidden sm:inline">· AI 智能体视觉知识调用</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:text-[#D8FF3E] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Target AI Selector */}
          <div>
            <div className="text-[10px] text-[#8B887F] uppercase tracking-wider mb-2">
              01 // {lang === 'zh' ? '选择调用的 AI 目标' : 'SELECT TARGET AI'}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {aiOptions.map((ai) => (
                <button
                  key={ai.id}
                  onClick={() => { playSpotlightClick(); setTargetAI(ai.id); }}
                  className={`p-2 border text-left transition-colors cursor-pointer ${
                    targetAI === ai.id
                      ? 'border-[#D8FF3E] bg-[#D8FF3E]/10 text-[#D8FF3E]'
                      : 'border-[#F2F0E8]/10 hover:border-[#F2F0E8]/30 text-[#8B887F]'
                  }`}
                >
                  <div className="font-bold">{ai.name}</div>
                  <div className="text-[9px] opacity-70 mt-0.5">{ai.tag}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Purpose Selector */}
          <div>
            <div className="text-[10px] text-[#8B887F] uppercase tracking-wider mb-2">
              02 // {lang === 'zh' ? '选择调用的任务目的' : 'SELECT AGENT PURPOSE'}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {purposeOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => { playSpotlightClick(); setPurpose(opt.id); }}
                  className={`p-3 border text-left transition-colors cursor-pointer flex flex-col justify-between ${
                    purpose === opt.id
                      ? 'border-[#D8FF3E] bg-[#D8FF3E]/10 text-[#D8FF3E]'
                      : 'border-[#F2F0E8]/10 hover:border-[#F2F0E8]/30 text-[#8B887F]'
                  }`}
                >
                  <div className="font-bold text-xs text-[#F2F0E8]">
                    {lang === 'zh' ? opt.labelZh : opt.labelEn}
                  </div>
                  <div className="text-[10px] text-[#8B887F] font-sans mt-1">
                    {lang === 'zh' ? opt.descZh : opt.descEn}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Generated Machine-Ready Prompt */}
          <div>
            <div className="flex items-center justify-between text-[10px] text-[#8B887F] uppercase mb-2">
              <span className="text-[#D8FF3E] font-bold">
                {lang === 'zh' ? '已生成的 AI 指令与知识库链接' : 'SYNTHESIZED AI PROMPT WITH KNOWLEDGE URL'}
              </span>
              <span>READY FOR COPY</span>
            </div>
            <div className="bg-[#0E0E0C] border border-[#F2F0E8]/15 p-4 rounded-none text-xs leading-relaxed text-[#F2F0E8] whitespace-pre-wrap select-all max-h-48 overflow-y-auto">
              {currentPrompt}
            </div>
          </div>

          {/* Direct Knowledge Base Endpoints */}
          <div className="border border-[#F2F0E8]/10 bg-[#161614] p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px]">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#D8FF3E]" />
              <span className="text-[#8B887F]">AI RAW ENDPOINTS:</span>
            </div>
            <div className="flex items-center gap-4 text-[10px]">
              <a 
                href="./llms.txt" 
                target="_blank" 
                rel="noreferrer"
                className="text-[#D8FF3E] hover:underline flex items-center gap-1"
              >
                <span>/llms.txt</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a 
                href="./llms-full.txt" 
                target="_blank" 
                rel="noreferrer"
                className="text-[#D8FF3E] hover:underline flex items-center gap-1"
              >
                <span>/llms-full.txt</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a 
                href="./visual-knowledge.json" 
                target="_blank" 
                rel="noreferrer"
                className="text-[#D8FF3E] hover:underline flex items-center gap-1"
              >
                <span>/visual-knowledge.json</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#F2F0E8]/10 bg-[#11110F] flex items-center justify-between gap-4">
          <div className="text-[10px] text-[#8B887F]">
            {lang === 'zh' ? '将此指令发送给 AI 即可让其调用本站视觉知识库' : 'Paste this instruction into your AI to leverage the Visual Atlas knowledge'}
          </div>
          <button
            onClick={handleCopy}
            className="px-5 py-2.5 bg-[#D8FF3E] text-[#11110F] font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-white transition-colors cursor-pointer shrink-0"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? (lang === 'zh' ? '已复制指令' : 'PROMPT COPIED') : (lang === 'zh' ? '一键复制 AI 调用指令' : 'COPY AI PROMPT')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
