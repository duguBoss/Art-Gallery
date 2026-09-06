import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'zh' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const translations: Record<Language, Record<string, string>> = {
  zh: {
    // Navbar
    'nav.index': '01 序幕索引',
    'nav.archive': '02 胶片印样',
    'nav.language': '03 视觉星图',
    'nav.dossiers': '04 研究案卷',
    'nav.lab': '05 创作工坊',
    'nav.about': '06 存在宣言',
    'nav.search': '全局检索',
    'nav.searchPlaceholder': '按 ⌘K 或 Ctrl+K 搜索',
    'nav.curator': '策展后台',
    'nav.title': 'VISUAL ATLAS',
    'nav.subtitle': '电影与美学语言系统',

    // 01 Index / Hero
    'hero.edition': '档案编号 001 // 2026 典藏版',
    'hero.systemSubtitle': '电影与美学语言系统',
    'hero.curatedCount': '部大师分镜',
    'hero.grid': '瑞士国际排版网格',
    'hero.tagline': '美学解构',
    'hero.titleLine1': '视觉语言',
    'hero.titleLine2': '解构系统',
    'hero.description': '摒弃平庸图库与卡片堆砌。这里是一个探索“图像为何动人”的视觉文献库——解构好莱坞镜头、光影比例、色彩色相与 AI 创作提示词。',
    'hero.studyScene': '解构此分镜',
    'hero.exploreArchive': '浏览完整档案',
    'hero.featured': '精选分镜',
    'hero.aspectRatio': '画幅比例',
    'hero.optics': '光学镜头',
    'hero.enterDeconstruction': '进入分镜深度解构 →',
    'hero.readyMoveCursor': '分析就绪 // 移动光标探索画面',
    'hero.hoverHint': '研习图像 // 悬停进行解构',
    'hero.subjectDetected': '主体锁定 · 宽银幕剪影',
    'hero.lightSource': '光源测绘 · 体积青光与实用暖光',
    'hero.negativeSpace': '负空间留白 · %pct%% 编辑平衡',
    'hero.focalDepth': '焦点深度 · 变形定焦镜头 T/1.8',
    'hero.cursor': '光标坐标',

    // 02 Archive
    'archive.tag': '胶片印样 // 档案索引',
    'archive.title': '电影分镜档案馆',
    'archive.status': '已载入 %count% / %total% 部电影分镜 · 胶片印样模式',
    'archive.filterLabel': '筛选:',
    'archive.filterAll': '全部档案',
    'archive.filterCyber': '赛博暗夜',
    'archive.filterBrutalist': '粗野巨构',
    'archive.filterEditorial': '画报诗性',
    'archive.filterZen': '东方水墨',
    'archive.filterGhibli': '治愈晴风',
    'archive.viewScene': '检视分镜',

    // 03 Scene Detail
    'scene.return': '返回档案馆',
    'scene.hudLabel': '分析 HUD:',
    'scene.modeOverview': '01 大师画幅',
    'scene.modeComposition': '02 构图法则',
    'scene.modeColor': '03 色彩色谱',
    'scene.modeCamera': '04 光学取景框',
    'scene.modeLight': '05 光影流向',
    'scene.stateLabel': '状态:',
    'scene.stateActive': '%mode% 解构激活',
    'scene.auditTitle': '构图审计:',
    'scene.auditRuleOfThirds': '• 三分法则: 人物视觉重心穿透',
    'scene.auditHarmonic': '• 黄金分割: 1:1.618 比例极值',
    'scene.auditNegative': '• 负空间占比: 64% 观者停泊留白',
    'scene.auditPerspective': '• 透视结构:',
    'scene.colorTitle': '色相对比提取',
    'scene.colorSpectrum': '高动态色阶范围',
    'scene.colorTheory': '色彩原理:',
    'scene.fpsLabel': 'FPS: 24.000 // 快门角: 180.0°',
    'scene.opticsLabel': '光学系统:',
    'scene.trackLabel': '运镜轨道:',
    'scene.rawLabel': 'RAW 数字底片 // ISO 800',
    'scene.lightMapTitle': '光线流向与空间测绘:',
    'scene.keyFillRatio': '主暗比: 1:8 (低调沉郁)',
    'scene.falloff': '衰减: 反平方定律',
    'scene.atmosphere': '氛围: 丁达尔体积雾',
    'scene.diffusion': '漫射: 有机柔光',
    'scene.callSheetTitle': '好莱坞制作通告单与提示词',
    'scene.copyPrompt': '复制提示词',
    'scene.copied': '已复制到剪贴板',
    'scene.lensHeader': '光学镜头',
    'scene.shutterHeader': '快门与帧率',
    'scene.movementHeader': '摄影机运动',
    'scene.addToDossier': '存入研究案卷',
    'scene.savedInDossier': '已存入案卷',
    'scene.remixInLab': '在实验室重混',
    'scene.correlatedTitle': '探索共享相同美学法则的相关分镜:',
    'scene.dnaTitle': 'VISUAL DNA 视觉基因',
    'scene.dnaSubtitle': '点击任意基因标签，穿透探索共享该视觉法则的全部镜头。',
    'scene.dnaMood': '01 // 情绪基因',
    'scene.dnaLight': '02 // 光影几何',
    'scene.dnaColor': '03 // 色彩色谱',
    'scene.dnaCamera': '04 // 光学句法',
    'scene.dnaComposition': '05 // 构图法则',

    // 04 Language
    'lang.desk': '研究台 // 视觉星图引力场',
    'lang.title': '视觉语言星图',
    'lang.subtitle': '一个交互式引力网络，展示情绪、光影、光学与构图如何形成电影语法。拖拽节点可重构张力关系。',
    'lang.activeNode': '激活节点:',
    'lang.filterAll': '全部节点',
    'lang.filterMood': '情绪',
    'lang.filterLight': '光影',
    'lang.filterOptics': '光学',
    'lang.filterComposition': '构图',
    'lang.dragBanner': '交互式引力场 // 拖动节点重排语法关系',
    'lang.relationalTension': '关系张力: %count% 个关联语法节点',
    'lang.correlatedScenes': '体现 [%label%] 的相关分镜: %count% 部',
    'lang.clickToStudy': '点击分镜研习视觉 DNA →',

    // 05 Dossiers
    'dossier.tag': '研究档案 // 个人文献室',
    'dossier.title': '研究案卷集',
    'dossier.subtitle': '以数字研究册而非平庸文件夹呈现的美学典藏。',
    'dossier.myTitle': '个人策展研究案卷',
    'dossier.mySubtitle': '由创作者在研习过程中收藏的电影分镜与提示词。',
    'dossier.empty': '当前案卷暂无分镜。请在档案馆或场景页点击“存入研究案卷”。',
    'dossier.open': '展开案卷',
    'dossier.remove': '移出案卷',
    'dossier.scenesCount': '%count% 个分镜',

    // 06 Lab
    'lab.tag': '创作工坊 // 好莱坞工作台',
    'lab.title': '视觉实验室',
    'lab.subtitle': '将美学基因合成工业级 AI 生产提示词、摄影指导通告单与四幕故事板。',
    'lab.toolPrompt': '01 提示词生成器',
    'lab.toolShot': '02 镜头构建器',
    'lab.toolStoryboard': '03 故事板序列',
    'lab.aspectRatio': '画幅比例:',
    'lab.targetEngine': '目标 AI 引擎语法',
    'lab.readyToRender': '可直接渲染',
    'lab.copySynthesized': '复制合成提示词',
    'lab.savePromptToDossier': '保存提示词到案卷',
    'lab.shotArch': '摄影指导机位设置 // 镜头架构',
    'lab.directorCall': '导演摄影通告单',
    'lab.copyCallSheet': '复制通告单',
    'lab.timeline': '4 幕电影叙事节奏序列',
    'lab.timelineDesc': '利用场景间的反差与节奏跨度建立视听张力。',
    'lab.exportStoryboard': '导出故事板剧本',
    'lab.keyScene': '关键场景',
    'lab.opticalRig': '光学机位',
    'lab.directorNote': '导演阐述',

    // 07 About
    'about.tag': '06 // 存在宣言与美学宪法',
    'about.title': '存在之由',
    'about.subtitle': '在自动化生成的时代，抵制对电影画面平庸化消耗的一份声明。',
    'about.h1': '图像不仅仅是画面。',
    'about.h2': '它们是精密的系统。',
    'about.p1': '普通的数字图库往往停留在“漂亮卡片”的被动浏览中。观者在无限滚动的瀑布流中迷失，却从未真正理解一张画面为何能在神经突触间激发战栗。',
    'about.p2': 'VISUAL ATLAS 建立于一个笃定信念：每一幅打动人心的电影杰作，都是由光线角度、光学焦段、几何网格与色彩极差精确构筑的语言体系。只有解构这种语法，创作者才能跨越平庸，创作出拥有永恒张力的作品。',
    'about.discoverArchive': '探索分镜档案 →',
    'about.anatomy': '电影语言解构层级',
    'about.step1': '光子、阴影、体积衰减与主暗反差比。',
    'about.step2': '色相极差、色温隔离与有机胶片乳胶质感。',
    'about.step3': '负空间留白、尺度震慑与建筑单点透视。',
    'about.step4': '光学焦段、焦外光斑、变形宽银幕畸变与快门角。',
    'about.step5': '电影律动、平移推拉、运动动量与静止。',
    'about.step6': '潜意识共鸣、文学性孤寂与崇高敬畏。',
    'about.constitution': '反 AI 设计宪章',
    'about.principlesTitle': '设计原则与审美克制',
    'about.curatedBy': '由视觉架构师与电影摄影师联合策划',
    'about.swissEdition': '瑞士国际排版系统 · 2026',

    // Command Palette
    'cmd.placeholder': '搜索分镜、视觉 DNA、摄影机参数，或按 ESC...',
    'cmd.jumpTo': '跳转至:',
    'cmd.noResults': '未检索到匹配的视觉档案',

    // Footer
    'footer.edition': '// 2026 典藏档案版',
    'footer.loop': '看 → 拆 → 关联 → 收藏 → 创作',
    'footer.cms': '策展管理后台',
  },
  en: {
    // Navbar
    'nav.index': '01 INDEX',
    'nav.archive': '02 ARCHIVE',
    'nav.language': '03 LANGUAGE',
    'nav.dossiers': '04 DOSSIERS',
    'nav.lab': '05 LAB',
    'nav.about': '06 ABOUT',
    'nav.search': 'SEARCH',
    'nav.searchPlaceholder': 'Press ⌘K or Ctrl+K to search',
    'nav.curator': 'CURATOR CMS',
    'nav.title': 'VISUAL ATLAS',
    'nav.subtitle': 'THE CINEMA & AESTHETIC LANGUAGE SYSTEM',

    // 01 Index / Hero
    'hero.edition': 'ARCHIVE 001 // 2026 EDITION',
    'hero.systemSubtitle': 'THE CINEMA & AESTHETIC LANGUAGE SYSTEM',
    'hero.curatedCount': 'CURATED SCENES',
    'hero.grid': 'SWISS EDITORIAL GRID',
    'hero.tagline': 'AESTHETIC DECONSTRUCTION',
    'hero.titleLine1': 'VISUAL',
    'hero.titleLine2': 'LANGUAGE SYSTEM',
    'hero.description': 'Reject generic card galleries and masonry dumps. An interactive visual research archive deconstructing cinematic masterworks, lighting ratios, color palettes, optical rigs, and production prompts.',
    'hero.studyScene': 'STUDY THIS SCENE',
    'hero.exploreArchive': 'EXPLORE ARCHIVE',
    'hero.featured': 'FEATURED',
    'hero.aspectRatio': 'ASPECT RATIO',
    'hero.optics': 'OPTICS',
    'hero.enterDeconstruction': 'ENTER SCENE DECONSTRUCTION →',
    'hero.readyMoveCursor': 'ANALYSIS READY // MOVE CURSOR',
    'hero.hoverHint': 'STUDY THE IMAGE // HOVER TO DECONSTRUCT',
    'hero.subjectDetected': 'SUBJECT DETECTED · ANAMORPHIC SILHOUETTE',
    'hero.lightSource': 'LIGHT SOURCE · VOLUMETRIC CYAN RIM & PRACTICAL GLOW',
    'hero.negativeSpace': 'NEGATIVE SPACE · %pct%% EDITORIAL BALANCE',
    'hero.focalDepth': 'FOCAL DEPTH · COOKE 35MM ANAMORPHIC T/1.8',
    'hero.cursor': 'CURSOR',

    // 02 Archive
    'archive.tag': 'CONTACT SHEET // ARCHIVE INDEX',
    'archive.title': 'CINEMATIC ARCHIVE',
    'archive.status': '%count% / %total% SCENES LOADED · FILM CONTACT SHEET MODE',
    'archive.filterLabel': 'FILTER:',
    'archive.filterAll': 'ALL ARCHIVES',
    'archive.filterCyber': 'CYBER & NOCTURNAL',
    'archive.filterBrutalist': 'MONUMENTAL',
    'archive.filterEditorial': 'SWISS EDITORIAL',
    'archive.filterZen': 'EASTERN ZEN',
    'archive.filterGhibli': 'HEALING CINEMA',
    'archive.viewScene': 'VIEW SCENE',

    // 03 Scene Detail
    'scene.return': 'RETURN TO ARCHIVE',
    'scene.hudLabel': 'ANALYSIS HUD:',
    'scene.modeOverview': '01 MASTER',
    'scene.modeComposition': '02 COMPOSITION',
    'scene.modeColor': '03 COLOR SWATCHES',
    'scene.modeCamera': '04 OPTICAL HUD',
    'scene.modeLight': '05 LIGHTING VECTOR',
    'scene.stateLabel': 'STATE:',
    'scene.stateActive': '%mode% DECONSTRUCTION ACTIVE',
    'scene.auditTitle': 'COMPOSITION AUDIT:',
    'scene.auditRuleOfThirds': '• RULE OF THIRDS: INTERSECTING SUBJECT',
    'scene.auditHarmonic': '• HARMONIC RATIO: GOLDEN SECTION (1:1.618)',
    'scene.auditNegative': '• NEGATIVE SPACE RATIO: 64% AUDIENCE REST',
    'scene.auditPerspective': '• PERSPECTIVE STRUCTURE:',
    'scene.colorTitle': 'CHROMATIC HARMONY EXTRACTION',
    'scene.colorSpectrum': 'HIGH CONTRAST SPECTRUM',
    'scene.colorTheory': 'COLOR THEORY:',
    'scene.fpsLabel': 'FPS: 24.000 // SHUTTER: 180.0°',
    'scene.opticsLabel': 'OPTICS:',
    'scene.trackLabel': 'RIG TRACK:',
    'scene.rawLabel': 'RAW DIGITAL NEGATIVE // ISO 800',
    'scene.lightMapTitle': 'LIGHTING MAP & DIRECTION:',
    'scene.keyFillRatio': 'KEY/FILL RATIO: 1:8 (Low-Key)',
    'scene.falloff': 'FALLOFF: Inverse-Square',
    'scene.atmosphere': 'ATMOSPHERE: Volumetric Haze',
    'scene.diffusion': 'DIFFUSION: Organic',
    'scene.callSheetTitle': 'HOLLYWOOD SCRIPT CALL SHEET & PROMPT',
    'scene.copyPrompt': 'COPY PROMPT',
    'scene.copied': 'PROMPT COPIED TO CLIPBOARD',
    'scene.lensHeader': 'OPTICAL LENS',
    'scene.shutterHeader': 'SHUTTER & FPS',
    'scene.movementHeader': 'CAMERA MOVEMENT',
    'scene.addToDossier': 'ADD TO DOSSIER',
    'scene.savedInDossier': 'SAVED IN DOSSIER',
    'scene.remixInLab': 'REMIX IN VISUAL LAB',
    'scene.correlatedTitle': 'EXPLORE CORRELATED SCENES SHARING VISUAL PRINCIPLES:',
    'scene.dnaTitle': 'VISUAL DNA DECONSTRUCTION',
    'scene.dnaSubtitle': 'Click any DNA token to explore all scenes sharing that visual principle.',
    'scene.dnaMood': '01 // MOOD GENOME',
    'scene.dnaLight': '02 // LIGHTING GEOMETRY',
    'scene.dnaColor': '03 // COLOR SPECTRUM',
    'scene.dnaCamera': '04 // OPTICAL SYNTAX',
    'scene.dnaComposition': '05 // COMPOSITION PRINCIPLE',

    // 04 Language
    'lang.desk': 'RESEARCH DESK // VISUAL CONSTELLATION',
    'lang.title': 'VISUAL LANGUAGE MAP',
    'lang.subtitle': 'An interactive gravitational network showing how mood, light, optics, and geometry form cinema grammar. Drag nodes to reshape relational tension.',
    'lang.activeNode': 'ACTIVE NODE:',
    'lang.filterAll': 'ALL NODES',
    'lang.filterMood': 'MOOD',
    'lang.filterLight': 'LIGHT',
    'lang.filterOptics': 'OPTICS',
    'lang.filterComposition': 'COMPOSITION',
    'lang.dragBanner': 'INTERACTIVE GRAVITATION FIELD // DRAG NODES TO REORGANIZE',
    'lang.relationalTension': 'RELATIONAL TENSION: %count% CONNECTED GRAMMAR NODES',
    'lang.correlatedScenes': 'CORRELATED SCENES EMBODYING [%label%]: %count%',
    'lang.clickToStudy': 'CLICK SCENE TO STUDY VISUAL DNA →',

    // 05 Dossiers
    'dossier.tag': 'RESEARCH DOSSIERS // PRIVATE ARCHIVE',
    'dossier.title': 'RESEARCH DOSSIERS',
    'dossier.subtitle': 'Curated visual research dossiers in digital notebook format, not a generic folder UI.',
    'dossier.myTitle': 'MY RESEARCH DOSSIER',
    'dossier.mySubtitle': 'Curated scenes and production prompts collected by researcher.',
    'dossier.empty': 'No scenes collected yet. Click "Add to Dossier" on any scene to collect.',
    'dossier.open': 'OPEN DOSSIER',
    'dossier.remove': 'REMOVE',
    'dossier.scenesCount': '%count% SCENES',

    // 06 Lab
    'lab.tag': 'CREATIVE SUITE // HOLLYWOOD WORKBENCH',
    'lab.title': 'VISUAL LAB',
    'lab.subtitle': 'Synthesize aesthetic genomes into industrial-grade production prompts, camera specifications, and narrative storyboards.',
    'lab.toolPrompt': '01 PROMPT GENERATOR',
    'lab.toolShot': '02 SHOT BUILDER',
    'lab.toolStoryboard': '03 STORYBOARD',
    'lab.aspectRatio': 'ASPECT RATIO:',
    'lab.targetEngine': 'TARGET AI ENGINE SYNTAX',
    'lab.readyToRender': 'READY TO RENDER',
    'lab.copySynthesized': 'COPY SYNTHESIZED PROMPT',
    'lab.savePromptToDossier': 'SAVE PROMPT TO DOSSIER',
    'lab.shotArch': "DIRECTOR'S CAMERA SETUP // SHOT ARCHITECTURE",
    'lab.directorCall': 'DIRECTOR CALL SHEET',
    'lab.copyCallSheet': 'COPY SHOT CALL SHEET',
    'lab.timeline': '4-BEAT CINEMATIC TIMELINE SEQUENCE',
    'lab.timelineDesc': 'Establish dramatic tension from scene to scene using contrast and rhythmic staging.',
    'lab.exportStoryboard': 'EXPORT STORYBOARD',
    'lab.keyScene': 'KEY SCENE',
    'lab.opticalRig': 'OPTICAL RIG',
    'lab.directorNote': "DIRECTOR'S NOTE",

    // 07 About
    'about.tag': '06 // MANIFESTO & AESTHETIC CONSTITUTION',
    'about.title': 'WHY THIS EXISTS',
    'about.subtitle': 'A declaration against the trivialization of cinematic images in the era of automated generation.',
    'about.h1': 'Images are not just pictures.',
    'about.h2': 'They are systems.',
    'about.p1': 'Traditional digital galleries remain trapped in passive browsing of "pretty cards." Viewers get lost in endless masonry feeds without ever understanding why an image evokes awe in the synapses.',
    'about.p2': 'VISUAL ATLAS is built on a steadfast conviction: every moving cinematic masterpiece is a precise language system constructed of lighting angles, optical focal lengths, geometric grids, and chromatic contrast. Only by deconstructing this syntax can creators transcend mediocrity.',
    'about.discoverArchive': 'DISCOVER THE ARCHIVE →',
    'about.anatomy': 'THE ANATOMY OF CINEMA SYNTAX',
    'about.step1': 'Photons, shadows, volumetric falloff, key-to-fill ratios.',
    'about.step2': 'Hue contrast, temperature separation, organic film emulsion.',
    'about.step3': 'Negative space, proportion shock, architectural perspective.',
    'about.step4': 'Optics, focal compression, anamorphic distortion, shutter angle.',
    'about.step5': 'Cinematic cadence, dollies, tracking momentum, stasis.',
    'about.step6': 'Subconscious resonance, literary melancholy, sublime awe.',
    'about.constitution': 'ANTI-AI-DESIGN CONSTITUTION',
    'about.principlesTitle': 'DESIGN PRINCIPLES & RESTRAINT',
    'about.curatedBy': 'CURATED BY VISUAL ARCHITECTS & CINEMATOGRAPHERS',
    'about.swissEdition': 'SWISS EDITORIAL SYSTEM · 2026',

    // Command Palette
    'cmd.placeholder': 'Search scenes, visual DNA, camera rig, or press ESC...',
    'cmd.jumpTo': 'JUMP TO:',
    'cmd.noResults': 'NO CORRESPONDING VISUAL ARCHIVE FOUND',

    // Footer
    'footer.edition': '// 2026 ARCHIVE EDITION',
    'footer.loop': 'SEE → DECODE → CONNECT → COLLECT → CREATE',
    'footer.cms': 'CURATOR CMS',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('visual_atlas_lang');
      return saved === 'en' || saved === 'zh' ? saved : 'zh';
    } catch {
      return 'zh';
    }
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('visual_atlas_lang', newLang);
    } catch {}
  };

  const toggleLang = () => {
    setLang(lang === 'zh' ? 'en' : 'zh');
  };

  const t = (key: string, params?: Record<string, string | number>): string => {
    let text = translations[lang]?.[key] || translations['zh']?.[key] || key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(new RegExp(`%${k}%`, 'g'), String(v));
      });
    }
    return text;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
