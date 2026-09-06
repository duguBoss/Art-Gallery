import React, { useState } from 'react';
import { Sparkles, Copy, Check, Terminal, FileCode, Cpu, Layers, ExternalLink, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CANONICAL_KNOWLEDGE_ATOMS, ONTOLOGY_CATEGORIES, CANONICAL_KNOWLEDGE_GRAPH } from '../data/canonicalKnowledgeGraph';
import { DEFAULT_CINEMA_SCENES } from '../data/cinemaDefaultScenes';
import { playSuccessChime, playSpotlightClick } from '../utils/audio';

type AIEngine = 'midjourney' | 'flux' | 'sdxl' | 'gpt4o';

export const AIKnowledgeCockpit: React.FC = () => {
  const { lang, t } = useLanguage();
  const [selectedEngine, setSelectedEngine] = useState<AIEngine>('midjourney');
  const [selectedAtomId, setSelectedAtomId] = useState<string>(CANONICAL_KNOWLEDGE_ATOMS[0].id);
  const [selectedSceneId, setSelectedSceneId] = useState<string>(DEFAULT_CINEMA_SCENES[0].id);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const activeAtom = CANONICAL_KNOWLEDGE_ATOMS.find(a => a.id === selectedAtomId) || CANONICAL_KNOWLEDGE_ATOMS[0];
  const activeScene = DEFAULT_CINEMA_SCENES.find(s => s.id === selectedSceneId) || DEFAULT_CINEMA_SCENES[0];

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    playSuccessChime();
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Generate model-specific prompt combining active atom and scene
  const getCompiledPrompt = (engine: AIEngine): string => {
    const scenePromptBase = activeScene.scriptPrompt.split('\n')[2] || activeScene.titleEn;
    const atomToken = activeAtom.promptTokens[engine === 'gpt4o' ? 'midjourney' : engine];

    switch (engine) {
      case 'midjourney':
        return `/imagine prompt: ${scenePromptBase}, ${atomToken}, shot on Cooke Anamorphic 35mm, cinematic volumetric lighting, 8k resolution --ar 2.39:1 --v 6.1 --stylize 350`;
      case 'flux':
        return `Cinematic master shot: ${scenePromptBase}. ${activeAtom.promptTokens.flux}. Color palette calibrated: ${activeScene.colorPalette.join(', ')}. Authentic 35mm film grain, 8k raw negative.`;
      case 'sdxl':
        return `(masterpiece:1.2), (photorealistic:1.3), ${scenePromptBase}, ${activeAtom.promptTokens.sdxl}, cinematic lighting, anamorphic lens flare, shallow depth of field, 8k UHD`;
      case 'gpt4o':
        return `You are an elite Hollywood Director of Photography and Visual Semiotician. Analyze or construct a visual scene using the following Visual Atlas parameters:\n- Concept ID: ${activeAtom.id}\n- Visual Theory: ${activeAtom.definition.en}\n- Key Signifiers: ${activeAtom.visualSignifiers.join(', ')}\n- Camera Rig: ${activeScene.cameraRig.lens} | ${activeScene.cameraRig.lighting}`;
    }
  };

  const compiledPrompt = getCompiledPrompt(selectedEngine);

  return (
    <div className="w-full bg-[#11110F] text-[#F2F0E8] min-h-screen py-8 px-6 lg:px-12 font-sans selection:bg-[#D8FF3E] selection:text-[#11110F]">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Top Header & Swiss Metadata */}
        <div className="border-b border-[#F2F0E8]/10 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs text-[#D8FF3E] mb-2 tracking-widest uppercase">
              <Sparkles className="w-4 h-4" />
              <span>{t('ai.tag')}</span>
              <span className="text-[#F2F0E8]/30">|</span>
              <span className="text-[#8B887F]">ONTOLOGY ENGINE v2.0</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold tracking-tight uppercase">
              {t('ai.title')}
            </h1>
            <p className="mt-2 text-[#8B887F] text-sm lg:text-base max-w-2xl">
              {t('ai.subtitle')}
            </p>
          </div>

          {/* Quick Machine Specs Counter */}
          <div className="flex items-center gap-4 font-mono text-xs border border-[#F2F0E8]/10 p-3 bg-[#1A1A18]">
            <div>
              <div className="text-[#8B887F]">KNOWLEDGE NODES</div>
              <div className="text-lg font-bold text-[#D8FF3E]">{CANONICAL_KNOWLEDGE_ATOMS.length}</div>
            </div>
            <div className="w-px h-8 bg-[#F2F0E8]/10" />
            <div>
              <div className="text-[#8B887F]">RELATIONAL EDGES</div>
              <div className="text-lg font-bold text-[#F2F0E8]">{CANONICAL_KNOWLEDGE_GRAPH.edges.length}</div>
            </div>
            <div className="w-px h-8 bg-[#F2F0E8]/10" />
            <div>
              <div className="text-[#8B887F]">STATUS</div>
              <div className="text-xs text-emerald-400 flex items-center gap-1 font-bold">
                <ShieldCheck className="w-3 h-3" /> READY
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid: Left Controls & Right Code Generation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Visual Atom & Scene Selector (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Category / Atom Matrix */}
            <div className="border border-[#F2F0E8]/15 bg-[#161614] p-5">
              <div className="font-mono text-xs text-[#D8FF3E] tracking-wider uppercase mb-3 flex items-center justify-between">
                <span>01 // SELECT CANONICAL ATOM</span>
                <span className="text-[#8B887F]">{CANONICAL_KNOWLEDGE_ATOMS.length} ATOMS</span>
              </div>

              <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                {CANONICAL_KNOWLEDGE_ATOMS.map((atom) => {
                  const isSelected = atom.id === selectedAtomId;
                  const atomName = atom.name[lang === 'zh' ? 'zh-CN' : lang] || atom.name.en;
                  return (
                    <button
                      key={atom.id}
                      onClick={() => {
                        playSpotlightClick();
                        setSelectedAtomId(atom.id);
                      }}
                      className={`w-full text-left p-3 border transition-all cursor-pointer flex flex-col gap-1 ${
                        isSelected
                          ? 'border-[#D8FF3E] bg-[#D8FF3E]/10 text-[#F2F0E8]'
                          : 'border-[#F2F0E8]/10 bg-[#1A1A18] hover:border-[#F2F0E8]/30 text-[#8B887F]'
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-[10px]">
                        <span className="text-[#D8FF3E] uppercase">{atom.category}</span>
                        <span className="text-[#8B887F] text-[9px]">{atom.id}</span>
                      </div>
                      <div className="font-bold text-sm text-[#F2F0E8]">{atomName}</div>
                      <div className="text-xs text-[#8B887F] line-clamp-1">
                        {atom.definition[lang === 'zh' ? 'zh-CN' : lang] || atom.definition.en}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Target Cinema Scene Link */}
            <div className="border border-[#F2F0E8]/15 bg-[#161614] p-5">
              <div className="font-mono text-xs text-[#D8FF3E] tracking-wider uppercase mb-3 flex items-center justify-between">
                <span>02 // TARGET CINEMA SCENE</span>
                <span className="text-[#8B887F]">SCENE: {activeScene.sceneNumber}</span>
              </div>

              <select
                value={selectedSceneId}
                onChange={(e) => {
                  playSpotlightClick();
                  setSelectedSceneId(e.target.value);
                }}
                className="w-full bg-[#11110F] border border-[#F2F0E8]/20 text-[#F2F0E8] p-2.5 font-mono text-xs focus:border-[#D8FF3E] focus:outline-none cursor-pointer"
              >
                {DEFAULT_CINEMA_SCENES.map((scene) => (
                  <option key={scene.id} value={scene.id}>
                    {scene.sceneNumber} · {lang === 'en' ? scene.titleEn : scene.title}
                  </option>
                ))}
              </select>

              <div className="mt-3 p-3 bg-[#11110F] border border-[#F2F0E8]/10 font-mono text-[11px] text-[#8B887F] space-y-1">
                <div><span className="text-[#D8FF3E]">OPTICS:</span> {activeScene.cameraRig.lens}</div>
                <div><span className="text-[#D8FF3E]">LIGHTING:</span> {activeScene.cameraRig.lighting}</div>
                <div><span className="text-[#D8FF3E]">MOOD:</span> {activeScene.cameraRig.mood}</div>
              </div>
            </div>

          </div>

          {/* Right Column: AI Engine Selector, Prompt Output & Knowledge Exporters (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Engine Tabs */}
            <div className="border border-[#F2F0E8]/15 bg-[#161614] p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-[#D8FF3E] tracking-wider uppercase">
                  03 // SELECT GENERATION MODEL SPEC
                </span>
                <span className="text-[10px] font-mono text-[#8B887F]">CALIBRATED SYNTAX</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                {(['midjourney', 'flux', 'sdxl', 'gpt4o'] as AIEngine[]).map((engine) => {
                  const isSelected = selectedEngine === engine;
                  const labels: Record<AIEngine, string> = {
                    midjourney: 'Midjourney v6.1',
                    flux: 'Flux.1 Pro',
                    sdxl: 'Stable Diffusion XL',
                    gpt4o: 'LLM Vision Agent'
                  };
                  return (
                    <button
                      key={engine}
                      onClick={() => {
                        playSpotlightClick();
                        setSelectedEngine(engine);
                      }}
                      className={`py-2 px-3 font-mono text-xs border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#D8FF3E] bg-[#D8FF3E] text-[#11110F] font-bold shadow-[0_0_15px_rgba(216,255,62,0.3)]'
                          : 'border-[#F2F0E8]/15 bg-[#11110F] text-[#8B887F] hover:text-[#F2F0E8]'
                      }`}
                    >
                      {labels[engine]}
                    </button>
                  );
                })}
              </div>

              {/* Compiled Prompt Display */}
              <div className="relative">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#F2F0E8]/10 text-xs font-mono text-[#8B887F]">
                  <span className="flex items-center gap-1.5 text-[#D8FF3E]">
                    <Terminal className="w-3.5 h-3.5" />
                    COMPILED PRODUCTION PROMPT
                  </span>
                  <button
                    onClick={() => handleCopy('prompt', compiledPrompt)}
                    className="flex items-center gap-1 px-3 py-1 bg-[#D8FF3E] text-[#11110F] font-mono text-xs font-bold hover:bg-white transition-colors cursor-pointer"
                  >
                    {copiedKey === 'prompt' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'prompt' ? 'COPIED TO CLIPBOARD' : 'COPY PROMPT'}</span>
                  </button>
                </div>

                <pre className="p-4 bg-[#0E0E0C] border border-[#F2F0E8]/10 font-mono text-xs text-[#F2F0E8] leading-relaxed whitespace-pre-wrap break-words min-h-[120px] select-all">
                  {compiledPrompt}
                </pre>
              </div>
            </div>

            {/* Machine Endpoints: llms.txt, llms-full.txt, visual-knowledge.json */}
            <div className="border border-[#F2F0E8]/15 bg-[#161614] p-6">
              <div className="font-mono text-xs text-[#D8FF3E] tracking-wider uppercase mb-4 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  04 // MACHINE-READABLE ENDPOINTS (LLM DIRECT INGESTION)
                </span>
                <span className="text-[10px] text-emerald-400">ONLINE</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* llms.txt */}
                <div className="p-4 bg-[#11110F] border border-[#F2F0E8]/10 flex flex-col justify-between">
                  <div>
                    <div className="font-mono font-bold text-xs text-[#F2F0E8] flex items-center gap-1.5">
                      <FileCode className="w-3.5 h-3.5 text-[#D8FF3E]" />
                      /llms.txt
                    </div>
                    <p className="text-[11px] text-[#8B887F] mt-1.5">
                      Standardized LLM index outlining site taxonomy and ontology.
                    </p>
                  </div>
                  <a
                    href="llms.txt"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-[11px] font-mono text-[#D8FF3E] hover:underline"
                  >
                    <span>OPEN SPEC</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* llms-full.txt */}
                <div className="p-4 bg-[#11110F] border border-[#F2F0E8]/10 flex flex-col justify-between">
                  <div>
                    <div className="font-mono font-bold text-xs text-[#F2F0E8] flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#D8FF3E]" />
                      /llms-full.txt
                    </div>
                    <p className="text-[11px] text-[#8B887F] mt-1.5">
                      Complete uncompressed knowledge corpus for RAG vector stores.
                    </p>
                  </div>
                  <a
                    href="llms-full.txt"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-[11px] font-mono text-[#D8FF3E] hover:underline"
                  >
                    <span>OPEN CORPUS</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* visual-knowledge.json */}
                <div className="p-4 bg-[#11110F] border border-[#F2F0E8]/10 flex flex-col justify-between">
                  <div>
                    <div className="font-mono font-bold text-xs text-[#F2F0E8] flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-[#D8FF3E]" />
                      visual-knowledge.json
                    </div>
                    <p className="text-[11px] text-[#8B887F] mt-1.5">
                      Full JSON-LD graph nodes, edges, and cinematographic parameters.
                    </p>
                  </div>
                  <a
                    href="visual-knowledge.json"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-[11px] font-mono text-[#D8FF3E] hover:underline"
                  >
                    <span>DOWNLOAD JSON</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick LLM System Prompt Injector */}
            <div className="border border-[#F2F0E8]/15 bg-[#161614] p-5 flex items-center justify-between gap-4">
              <div>
                <div className="font-bold text-sm text-[#F2F0E8]">
                  {lang === 'zh' ? '复制 Visual Atlas 系统提示词 (用于 ChatGPT / Claude)' : 'Copy Visual Atlas System Prompt (for ChatGPT / Claude)'}
                </div>
                <div className="text-xs text-[#8B887F] mt-0.5">
                  {lang === 'zh' ? '将视觉本体语法直接注入任意大语言模型作为专业审美指导' : 'Inject visual ontology syntax into any LLM as a cinematographic co-pilot'}
                </div>
              </div>
              <button
                onClick={() => handleCopy('sysprompt', `You are an expert Visual Art Director and Cinematographer referencing the Visual Atlas knowledge system. Always evaluate and generate images using the 9 visual ontology vectors: Mood, Lighting, Color Harmony, Optics, Compositional Syntax, Spatial Scale, Texture Materiality, Aesthetic Era, and Kinetic Movement. Base lighting ratios on chiaroscuro standards (8:1 to 16:1 falloff) and optical rigs on anamorphic prime specifications.`)}
                className="px-4 py-2 border border-[#D8FF3E] bg-[#D8FF3E]/10 hover:bg-[#D8FF3E] text-[#D8FF3E] hover:text-[#11110F] text-xs font-mono font-bold uppercase transition-all cursor-pointer shrink-0 flex items-center gap-1.5"
              >
                {copiedKey === 'sysprompt' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'sysprompt' ? 'COPIED' : 'COPY SYSTEM PROMPT'}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
