import React, { useState } from 'react';
import type { CinemaScene } from '../types/cinema';
import type { LabEngine } from '../types/visualAtlas';
import { Copy, Check, Bookmark, Sparkles, Sliders, Film, Download } from 'lucide-react';
import { playSpotlightClick, playSuccessChime } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';

interface VisualLabViewProps {
  initialScene?: CinemaScene;
  allScenes?: CinemaScene[];
  onSavePromptToDossier?: (promptText: string) => void;
}

type LabSubTool = 'prompt' | 'shot' | 'storyboard';

export const VisualLabView: React.FC<VisualLabViewProps> = ({
  initialScene,
  allScenes = [],
  onSavePromptToDossier,
}) => {
  const { lang, t } = useLanguage();
  const [activeTool, setActiveTool] = useState<LabSubTool>('prompt');
  const [engine, setEngine] = useState<LabEngine>('midjourney');

  // Prompt Generator State
  const [mood, setMood] = useState('Melancholic Dystopia');
  const [light, setLight] = useState('Low-Key Volumetric Rim');
  const [camera, setCamera] = useState('Cooke Anamorphic 35mm T/1.8');
  const [composition, setComposition] = useState('Negative Space 70%');
  const [color, setColor] = useState('Electric Cyan & Warm Amber Contrast');
  const [aspect, setAspect] = useState('2.39:1');
  const [copied, setCopied] = useState(false);

  // Shot Builder State
  const [shotScale, setShotScale] = useState('Wide Establishing Shot');
  const [cameraMovement, setCameraMovement] = useState('Slow Smooth Dolly Forward');
  const [cameraAngle, setCameraAngle] = useState('Low Angle 15°');
  const [lightingSetup, setLightingSetup] = useState('Cathedral Single-Source God Ray');

  // Storyboard State
  const storyboardBeats = [
    { 
      id: 'beat-1', 
      act: '01 ESTABLISHING', 
      scene: lang === 'zh' ? '雨夜东京：深渊霓虹漫步' : 'Tokyo Rain: Neon Nocturne Walk', 
      lens: 'Cooke 35mm Anamorphic', 
      note: lang === 'zh' ? '全景环境张力与孤独沉溺' : 'Wide environmental tension and solitude' 
    },
    { 
      id: 'beat-2', 
      act: '02 REVEAL', 
      scene: lang === 'zh' ? '纪念碑谷：粗野混凝土巨构' : 'Monument Valley: Brutalist Monolith', 
      lens: 'Arri 24mm Ultra-Wide', 
      note: lang === 'zh' ? '极端体量对比与崇高敬畏' : 'Monumental scale shock and awe' 
    },
    { 
      id: 'beat-3', 
      act: '03 ENCOUNTER', 
      scene: lang === 'zh' ? '花样年华：狭长回廊的绿意与暗红' : 'In the Mood: Green Corridor & Deep Rouge', 
      lens: 'Zeiss 50mm Prime', 
      note: lang === 'zh' ? '亲密幽闭的情绪压抑与试探' : 'Intimate emotional claustrophobia' 
    },
    { 
      id: 'beat-4', 
      act: '04 RESOLUTION', 
      scene: lang === 'zh' ? '潜行者之境：沉没水泽与时间回声' : 'Stalker Zone: Submerged Murmur & Silence', 
      lens: 'LOMO 35mm Vintage', 
      note: lang === 'zh' ? '诗性冥想与静止凝视' : 'Poetic meditation and stasis' 
    },
  ];

  const moodOptions = ['Melancholic Dystopia', 'Monumental Austere Brutalism', 'Poetic Editorial Silence', 'Eastern Misty Zen', 'Chromatic Nostalgia', 'Cosmic Sublime'];
  const lightOptions = ['Low-Key Volumetric Rim', 'Cathedral Single-Source God Ray', '100% Diffuse North Window Light', 'Neon Wet Reflections', 'Low Grazing Sunset Flare'];
  const cameraOptions = ['Cooke Anamorphic 35mm T/1.8', 'Arri Signature Prime 24mm Wide', 'Leitz Summilux-C 50mm Prime', 'Panavision 65mm Ultra Vista', 'LOMO 35mm Soviet Prime'];
  const compositionOptions = ['Negative Space 70%', 'Centered Scale Shock (5% Human vs 95% Wall)', 'Rule of Thirds Horizon', 'Frame within Frame Occlusion', 'Pure Symmetrical Vanishing Point'];
  const colorOptions = ['Electric Cyan & Warm Amber Contrast', 'Monochrome Architectural Grayscale', 'Warm Linen & Aged Oak', 'Deep Emerald & Vermilion Lacquer', 'Arrakis Ochre & Copper Monochromatic'];

  // Engine tailored generation
  const buildEnginePrompt = () => {
    if (engine === 'midjourney') {
      return `A cinematic master shot, ${mood}. ${light}. ${composition}. Optical capture on ${camera}. Color grading ${color}. 35mm film grain, photorealistic cinematography --ar ${aspect} --v 6.1 --style raw --stylize 320`;
    }
    if (engine === 'flux') {
      return `Cinematic 35mm still frame, ${mood.toLowerCase()}, ${light.toLowerCase()}, photographed on ${camera}, ${composition.toLowerCase()}, palette of ${color.toLowerCase()}, authentic photographic grain, ultra-high dynamic range, natural skin textures, 8k resolution.`;
    }
    if (engine === 'veo') {
      return `[VIDEO GENERATION] Cinematic tracking camera movement, ${mood}. Lighting: ${light}. Optical style: ${camera}. Composition: ${composition}. Seamless organic camera drift, 24fps motion cadence, hyperrealistic lighting interaction.`;
    }
    if (engine === 'gemini') {
      return `Visual Art Direction Brief: Construct a cinematic frame featuring ${mood}. The lighting scheme employs ${light} with a ${composition}. Color palette emphasizes ${color}. Render with the optical characteristics of a ${camera}.`;
    }
    return `masterpiece, cinematic visual production, ${mood}, ${light}, ${composition}, ${camera}, ${color}, ultra-detailed, 8k, raw photographic quality`;
  };

  const generatedPrompt = buildEnginePrompt();

  const generatedShotCall = `[HOLLYWOOD CINEMATOGRAPHER SHOT SPECIFICATION]
SHOT SCALE: ${shotScale.toUpperCase()}
CAMERA RIG: ${camera.toUpperCase()}
MOVEMENT: ${cameraMovement.toUpperCase()}
ANGLE: ${cameraAngle.toUpperCase()}
LIGHTING: ${lightingSetup.toUpperCase()}
ATMOSPHERE: ${mood.toUpperCase()}
COLOR GRADE: ${color.toUpperCase()}
DELIVERY FORMAT: 4K DCI FLAT 24.000 FPS RAW (180° SHUTTER ANGLE)`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    playSuccessChime();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-8 lg:py-12 text-[#F2F0E8]">
      {/* Top Header */}
      <div className="border-b border-[#F2F0E8]/10 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono tracking-widest text-[#D8FF3E] uppercase mb-1">
            {t('lab.tag')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight uppercase">
            {t('lab.title')}
          </h2>
          <p className="text-xs text-[#8B887F] font-mono mt-1">
            {t('lab.subtitle')}
          </p>
        </div>

        {/* Sub-tool Switcher Tabs */}
        <div className="flex items-center gap-2 font-mono text-xs">
          {[
            { id: 'prompt', label: t('lab.toolPrompt'), icon: Sparkles },
            { id: 'shot', label: t('lab.toolShot'), icon: Sliders },
            { id: 'storyboard', label: t('lab.toolStoryboard'), icon: Film },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                playSpotlightClick();
                setActiveTool(id as LabSubTool);
              }}
              className={`px-3 py-1.5 border flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTool === id
                  ? 'border-[#D8FF3E] bg-[#D8FF3E] text-[#11110F] font-bold'
                  : 'border-[#F2F0E8]/15 bg-[#141412] text-[#8B887F] hover:text-[#F2F0E8]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* SUB-TOOL 01: PROMPT GENERATOR */}
      {activeTool === 'prompt' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Parameter Controls */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between text-xs font-mono text-[#D8FF3E] uppercase tracking-wider border-b border-[#F2F0E8]/10 pb-2">
              <span>{lang === 'zh' ? '美学基因参数' : 'GENOME PARAMETERS'}</span>
              <div className="flex items-center gap-2 text-[10px] text-[#8B887F]">
                <span>{lang === 'zh' ? '画幅:' : 'ASPECT:'}</span>
                {['2.39:1', '16:9', '4:3', '1:1'].map((ar) => (
                  <button
                    key={ar}
                    onClick={() => setAspect(ar)}
                    className={`px-2 py-0.5 border ${aspect === ar ? 'border-[#D8FF3E] text-[#D8FF3E]' : 'border-[#F2F0E8]/15 text-[#8B887F]'}`}
                  >
                    {ar}
                  </button>
                ))}
              </div>
            </div>

            {/* MOOD */}
            <div>
              <label className="text-[10px] font-mono text-[#8B887F] uppercase block mb-2">
                01 // {lang === 'zh' ? '情绪基调基因' : 'MOOD GENOME'}
              </label>
              <div className="flex flex-wrap gap-2">
                {moodOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { playSpotlightClick(); setMood(opt); }}
                    className={`px-3 py-1.5 border text-xs font-mono transition-colors cursor-pointer ${
                      mood === opt
                        ? 'border-[#D8FF3E] bg-[#D8FF3E] text-[#11110F] font-bold'
                        : 'border-[#F2F0E8]/15 bg-[#141412] text-[#F2F0E8] hover:border-[#F2F0E8]/40'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* LIGHT */}
            <div>
              <label className="text-[10px] font-mono text-[#8B887F] uppercase block mb-2">
                02 // {lang === 'zh' ? '光影几何布光' : 'LIGHTING GEOMETRY'}
              </label>
              <div className="flex flex-wrap gap-2">
                {lightOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { playSpotlightClick(); setLight(opt); }}
                    className={`px-3 py-1.5 border text-xs font-mono transition-colors cursor-pointer ${
                      light === opt
                        ? 'border-[#D8FF3E] bg-[#D8FF3E] text-[#11110F] font-bold'
                        : 'border-[#F2F0E8]/15 bg-[#141412] text-[#F2F0E8] hover:border-[#F2F0E8]/40'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* OPTICS */}
            <div>
              <label className="text-[10px] font-mono text-[#8B887F] uppercase block mb-2">
                03 // {lang === 'zh' ? '光学句法 (摄影镜头)' : 'OPTICAL SYNTAX (LENS)'}
              </label>
              <div className="flex flex-wrap gap-2">
                {cameraOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { playSpotlightClick(); setCamera(opt); }}
                    className={`px-3 py-1.5 border text-xs font-mono transition-colors cursor-pointer ${
                      camera === opt
                        ? 'border-[#D8FF3E] bg-[#D8FF3E] text-[#11110F] font-bold'
                        : 'border-[#F2F0E8]/15 bg-[#141412] text-[#F2F0E8] hover:border-[#F2F0E8]/40'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* COMPOSITION */}
            <div>
              <label className="text-[10px] font-mono text-[#8B887F] uppercase block mb-2">
                04 // {lang === 'zh' ? '构图比例与网格' : 'COMPOSITION & RATIO'}
              </label>
              <div className="flex flex-wrap gap-2">
                {compositionOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { playSpotlightClick(); setComposition(opt); }}
                    className={`px-3 py-1.5 border text-xs font-mono transition-colors cursor-pointer ${
                      composition === opt
                        ? 'border-[#D8FF3E] bg-[#D8FF3E] text-[#11110F] font-bold'
                        : 'border-[#F2F0E8]/15 bg-[#141412] text-[#F2F0E8] hover:border-[#F2F0E8]/40'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* COLOR */}
            <div>
              <label className="text-[10px] font-mono text-[#8B887F] uppercase block mb-2">
                05 // {lang === 'zh' ? '色彩方案' : 'COLOR PALETTE'}
              </label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { playSpotlightClick(); setColor(opt); }}
                    className={`px-3 py-1.5 border text-xs font-mono transition-colors cursor-pointer ${
                      color === opt
                        ? 'border-[#D8FF3E] bg-[#D8FF3E] text-[#11110F] font-bold'
                        : 'border-[#F2F0E8]/15 bg-[#141412] text-[#F2F0E8] hover:border-[#F2F0E8]/40'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Synthesized Result & Production Terminal */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-[#161614] border border-[#F2F0E8]/10 p-6">
            <div>
              {/* Engine Switcher */}
              <div className="text-[10px] font-mono text-[#8B887F] uppercase mb-2">
                {t('lab.targetEngine')}
              </div>
              <div className="flex flex-wrap gap-1.5 pb-4 border-b border-[#F2F0E8]/10 mb-4">
                {[
                  { id: 'midjourney', label: 'MIDJOURNEY V6' },
                  { id: 'flux', label: 'FLUX.1 [DEV]' },
                  { id: 'veo', label: 'RUNWAY / VEO (VIDEO)' },
                  { id: 'gemini', label: 'GEMINI / PROSE' },
                ].map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => {
                      playSpotlightClick();
                      setEngine(id as LabEngine);
                    }}
                    className={`px-2.5 py-1 text-[10px] font-mono border transition-colors cursor-pointer ${
                      engine === id
                        ? 'border-[#D8FF3E] text-[#D8FF3E] bg-[#11110F] font-bold'
                        : 'border-[#F2F0E8]/10 text-[#8B887F] hover:text-[#F2F0E8]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-[#8B887F] pb-2 mb-2">
                <span className="text-[#D8FF3E]">
                  {lang === 'zh' ? '好莱坞级合成提示词' : 'SYNTHESIZED HOLLYWOOD PROMPT'}
                </span>
                <span>{t('lab.readyToRender')}</span>
              </div>

              <div className="bg-[#11110F] border border-[#F2F0E8]/10 p-4 font-mono text-xs text-[#F2F0E8] leading-relaxed whitespace-pre-wrap select-all min-h-[140px]">
                {generatedPrompt}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-[11px] font-mono text-[#8B887F]">
                <div className="border-l border-[#D8FF3E] pl-2">
                  <div>ENGINE TARGET</div>
                  <div className="text-[#F2F0E8] mt-0.5 uppercase">{engine}</div>
                </div>
                <div className="border-l border-[#F2F0E8]/20 pl-2">
                  <div>COLOR TEMPERATURE</div>
                  <div className="text-[#F2F0E8] mt-0.5">High Dynamic Balance</div>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#F2F0E8]/10">
              <button
                onClick={() => handleCopy(generatedPrompt)}
                className="w-full py-3 bg-[#D8FF3E] text-[#11110F] text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? (lang === 'zh' ? '已复制到剪贴板' : 'PROMPT COPIED TO CLIPBOARD') : t('lab.copySynthesized')}</span>
              </button>

              {onSavePromptToDossier && (
                <button
                  onClick={() => onSavePromptToDossier(generatedPrompt)}
                  className="w-full py-3 border border-[#F2F0E8]/20 hover:border-[#D8FF3E] hover:text-[#D8FF3E] text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Bookmark className="w-4 h-4" />
                  <span>{t('lab.savePromptToDossier')}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TOOL 02: SHOT BUILDER */}
      {activeTool === 'shot' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-mono text-[#D8FF3E] uppercase tracking-wider border-b border-[#F2F0E8]/10 pb-2">
              {t('lab.shotArch')}
            </div>

            {/* SHOT SCALE */}
            <div>
              <label className="text-[10px] font-mono text-[#8B887F] uppercase block mb-2">
                01 // {lang === 'zh' ? '景别尺度' : 'SHOT SCALE'}
              </label>
              <div className="flex flex-wrap gap-2">
                {['Extreme Wide Establishing', 'Wide Shot', 'Medium Full Shot', 'Close-Up Portrait', 'Extreme Macro Detail'].map((scale) => (
                  <button
                    key={scale}
                    onClick={() => { playSpotlightClick(); setShotScale(scale); }}
                    className={`px-3 py-1.5 border text-xs font-mono transition-colors cursor-pointer ${
                      shotScale === scale ? 'border-[#D8FF3E] bg-[#D8FF3E] text-[#11110F] font-bold' : 'border-[#F2F0E8]/15 bg-[#141412] text-[#F2F0E8]'
                    }`}
                  >
                    {scale}
                  </button>
                ))}
              </div>
            </div>

            {/* CAMERA MOVEMENT */}
            <div>
              <label className="text-[10px] font-mono text-[#8B887F] uppercase block mb-2">
                02 // {lang === 'zh' ? '摄影机运镜' : 'CAMERA MOVEMENT'}
              </label>
              <div className="flex flex-wrap gap-2">
                {['Static Master Lock-Off', 'Slow Smooth Dolly Forward', 'Lateral Tracking Pan', 'Fluid Steadicam Breathing', 'Top-Down Crane Retract'].map((mov) => (
                  <button
                    key={mov}
                    onClick={() => { playSpotlightClick(); setCameraMovement(mov); }}
                    className={`px-3 py-1.5 border text-xs font-mono transition-colors cursor-pointer ${
                      cameraMovement === mov ? 'border-[#D8FF3E] bg-[#D8FF3E] text-[#11110F] font-bold' : 'border-[#F2F0E8]/15 bg-[#141412] text-[#F2F0E8]'
                    }`}
                  >
                    {mov}
                  </button>
                ))}
              </div>
            </div>

            {/* CAMERA ANGLE */}
            <div>
              <label className="text-[10px] font-mono text-[#8B887F] uppercase block mb-2">
                03 // {lang === 'zh' ? '机位仰角与透视' : 'CAMERA ANGLE & ELEVATION'}
              </label>
              <div className="flex flex-wrap gap-2">
                {['Low Angle 15° (Monumental)', 'Neutral Eye Level', 'High Angle 45°', 'Dutch Cant 10° (Psychological)', 'Overhead God-View 90°'].map((ang) => (
                  <button
                    key={ang}
                    onClick={() => { playSpotlightClick(); setCameraAngle(ang); }}
                    className={`px-3 py-1.5 border text-xs font-mono transition-colors cursor-pointer ${
                      cameraAngle === ang ? 'border-[#D8FF3E] bg-[#D8FF3E] text-[#11110F] font-bold' : 'border-[#F2F0E8]/15 bg-[#141412] text-[#F2F0E8]'
                    }`}
                  >
                    {ang}
                  </button>
                ))}
              </div>
            </div>

            {/* LIGHTING SETUP */}
            <div>
              <label className="text-[10px] font-mono text-[#8B887F] uppercase block mb-2">
                04 // {lang === 'zh' ? '布光配置' : 'LIGHTING RIG'}
              </label>
              <div className="flex flex-wrap gap-2">
                {['Cathedral Single-Source God Ray', 'Low-Key Volumetric Cyan Rim', '100% Diffuse Window Daylight', 'Sodium Vapor Overhead Practical'].map((light) => (
                  <button
                    key={light}
                    onClick={() => { playSpotlightClick(); setLightingSetup(light); }}
                    className={`px-3 py-1.5 border text-xs font-mono transition-colors cursor-pointer ${
                      lightingSetup === light ? 'border-[#D8FF3E] bg-[#D8FF3E] text-[#11110F] font-bold' : 'border-[#F2F0E8]/15 bg-[#141412] text-[#F2F0E8]'
                    }`}
                  >
                    {light}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#161614] border border-[#F2F0E8]/10 p-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="text-xs font-mono text-[#D8FF3E] border-b border-[#F2F0E8]/10 pb-3 mb-4">
                {t('lab.directorCall')}
              </div>
              <pre className="bg-[#11110F] border border-[#F2F0E8]/10 p-4 font-mono text-xs text-[#F2F0E8] leading-relaxed whitespace-pre-wrap select-all">
                {generatedShotCall}
              </pre>
            </div>
            <button
              onClick={() => handleCopy(generatedShotCall)}
              className="w-full py-3 bg-[#D8FF3E] text-[#11110F] text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? (lang === 'zh' ? '通告单已复制' : 'COPIED TO CLIPBOARD') : t('lab.copyCallSheet')}</span>
            </button>
          </div>
        </div>
      )}

      {/* SUB-TOOL 03: STORYBOARD SEQUENCER */}
      {activeTool === 'storyboard' && (
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-[#F2F0E8]/10 pb-4">
            <div>
              <div className="text-xs font-mono text-[#D8FF3E] uppercase">{t('lab.timeline')}</div>
              <div className="text-[11px] font-mono text-[#8B887F] mt-0.5">
                {t('lab.timelineDesc')}
              </div>
            </div>
            <button
              onClick={() => {
                const sbText = storyboardBeats.map((b) => `[${b.act}] ${b.scene} | Optics: ${b.lens} | Note: ${b.note}`).join('\n');
                handleCopy(sbText);
              }}
              className="px-4 py-2 bg-[#D8FF3E] text-[#11110F] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-white transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t('lab.exportStoryboard')}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {storyboardBeats.map((beat, index) => (
              <div key={beat.id} className="border border-[#F2F0E8]/15 bg-[#141412] p-5 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono border-b border-[#F2F0E8]/10 pb-2">
                  <span className="text-[#D8FF3E] font-bold">{beat.act}</span>
                  <span className="text-[#8B887F]">BEAT 0{index + 1}</span>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#8B887F] uppercase">{t('lab.keyScene')}</div>
                  <div className="text-sm font-bold text-[#F2F0E8] mt-1">{beat.scene}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#8B887F] uppercase">{t('lab.opticalRig')}</div>
                  <div className="text-xs font-mono text-[#8B887F] mt-1">{beat.lens}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#8B887F] uppercase">{t('lab.directorNote')}</div>
                  <div className="text-xs font-mono text-[#D8FF3E] mt-1 italic">"{beat.note}"</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
