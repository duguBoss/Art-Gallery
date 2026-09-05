import type { CinemaScene } from '../types/cinema';

export const DEFAULT_CINEMA_SCENES: CinemaScene[] = [
  {
    id: 'scene-cyber-rain-01',
    sceneNumber: 'SCENE 01',
    act: 'ACT I · 迷离夜幕 (ATMOSPHERE)',
    title: '雨夜东京：深渊霓虹漫步',
    titleEn: 'Tokyo Rainy Night: Wandering the Electric Abyss',
    locationAndTime: 'TOKYO SHIBUYA ALLEYWAY · 02:45 AM · LIGHT DRIZZLE',
    scriptPrompt: `[SCENE START]
EXT. NARROW SHINJUKU ALLEY - CONTINUOUS NIGHT
Raindrops shatter on wet asphalt like fallen constellations. 
A lone silhouette in a heavy trench coat walks slowly away from camera.
Amber lantern flares clash against electric cyan holographic billboards overhead.
Steam whispers from iron grates. The city breathes in slow cinematic rhythm.
[CAMERA: SLOW DOLLY IN 35MM T/1.8 --ar 16:9 --v 6.1 --stylize 350]`,
    cameraRig: {
      lens: 'Cooke Anamorphic /i Full Frame 35mm T/1.8',
      shutter: '1/48 sec (180° Shutter Angle) at 24.000 fps',
      lighting: 'Low-Key Volumetric Cyan Rim + Warm Amber Practical Glow',
      mood: 'Melancholic Cyber Dystopia & Poetic Neon Solitude',
      movement: 'Slow Smooth Dolly Forward along Z-axis (Speed: 0.15m/s)',
    },
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=85',
    colorPalette: ['#030712', '#06b6d4', '#f43f5e', '#a855f7'],
    accentColor: '#06b6d4',
    durationSeconds: 24,
    behindTheScenes: {
      atomId: 'atom-cold-warm-clash',
      atomName: '冷暖对撞',
      principleName: '对比 (Contrast)',
      styleName: '赛博朋克与暗调未来',
      whyItWorks: '利用超过 150° 的冷青与暖琥珀色相极差，在雨水潮湿倒影中建立深邃的景深纵深，剥离主体与嘈杂背景。',
    },
  },
  {
    id: 'scene-brutalist-02',
    sceneNumber: 'SCENE 02',
    act: 'ACT II · 宏伟静穆 (SCALE SHOCK)',
    title: '纪念碑谷：粗野混凝土巨构',
    titleEn: 'The Concrete Monolith: Architecture of Solitude',
    locationAndTime: 'GEOMETRIC BRUTALIST INTERIOR · 06:15 AM · OVERCAST',
    scriptPrompt: `[SCENE START]
INT. VAST CONCRETE ROTUNDA - MORNING DUSK
Massive fluted pillars rise 40 meters into pure architectural shadow.
A singular skylight pierces the ceiling, casting a cathedral-like God Ray down to center floor.
A micro-scaled figure stands motionless at the ray intersection.
Pure silence. The weight of geometry overwhelms the human frame.
[CAMERA: 24MM ULTRA-WIDE LOW ANGLE PUSH-IN --ar 16:9 --v 6.1 --raw]`,
    cameraRig: {
      lens: 'Arri Signature Prime 24mm T/1.8 Large Format',
      shutter: '1/48 sec at 24fps · Pure RAW Digital Negative',
      lighting: 'Single Source High-Angle God Ray with Atmospheric Dust Motes',
      mood: 'Monumental Reverence, Austere Brutalism & Spatial Silence',
      movement: 'Slow Architectural Push from Wide Establishing to Medium Frame',
    },
    coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
    colorPalette: ['#18181b', '#71717a', '#a1a1aa', '#f4f4f5'],
    accentColor: '#94a3b8',
    durationSeconds: 28,
    behindTheScenes: {
      atomId: 'atom-giant-title-tiny-subject',
      atomName: '超大标题 + 极小主体',
      principleName: '比例与尺度 (Proportion & Scale)',
      styleName: '粗野主义与反设计',
      whyItWorks: '微观人类体量（5%）与宏伟建筑截面（95%）形成极端尺度震慑（Scale Shock），唤起观者的神圣敬畏感。',
    },
  },
  {
    id: 'scene-editorial-03',
    sceneNumber: 'SCENE 03',
    act: 'ACT III · 画报诗性 (POETRY OF SPACE)',
    title: '静谧呼吸：艺术季刊的诗意留白',
    titleEn: 'Silent Editorial: The Negative Space Composition',
    locationAndTime: 'NATURAL DAYLIGHT ATELIER · 03:20 PM · SOFT DIFFUSE',
    scriptPrompt: `[SCENE START]
INT. MINIMALIST PARISIAN ART ATELIER - AFTERNOON
White linen drapery gently floats in afternoon breeze.
An exquisite classical marble fragment rests on natural aged oak surface.
Extreme negative space occupies 78% of the composition.
High-contrast serif typography quietly reveals itself like words in a poem.
[CAMERA: 50MM MACRO EYE-LEVEL TILT-SHIFT --ar 16:9 --v 6.1]`,
    cameraRig: {
      lens: 'Leitz Summilux-C 50mm T/1.4 Cine Prime',
      shutter: '1/48 sec · Warm Natural North-Facing Daylight',
      lighting: '100% Diffuse Window Light, Zero Fill, Organic Shadow Falloff',
      mood: 'Literary Luxury, Meditative Breath & Tactile Paper Texture',
      movement: 'Extremely Slow Horizontal Pan (Truck Right x: -2% to +2%)',
    },
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1600&q=85',
    colorPalette: ['#fafaf9', '#1c1917', '#78716c', '#b45309'],
    accentColor: '#d97706',
    durationSeconds: 22,
    behindTheScenes: {
      atomId: 'atom-negative-space',
      atomName: '极致负空间 / 留白',
      principleName: '平衡与韵律 (Balance & Rhythm)',
      styleName: '杂志画报编辑风',
      whyItWorks: '大面积留白给予观者视线充分的停泊之所，细微的纸张噪点与典雅高对比衬线赋予版面呼吸生命。',
    },
  },
  {
    id: 'scene-liquid-chrome-04',
    sceneNumber: 'SCENE 04',
    act: 'ACT IV · 液态超现实 (SURREAL MORPH)',
    title: '液态金属：千禧拓扑流体折射',
    titleEn: 'Liquid Chrome: Iridescent Spatial Reflection',
    locationAndTime: 'VOID EXHIBITION CHAMBER · TIME UNDEFINED · ZERO-G',
    scriptPrompt: `[SCENE START]
INT. INFINITE VOID SPACE - ZERO GRAVITY
A suspended fluid chrome torus gently twists and expands in mid-air.
Holographic pink and electric violet light reflect across its mirrored liquid surface.
Refracted caustics ripple across imaginary glass floor.
The metal pulses like an organic heartbeat, defying gravity and Euclidean geometry.
[CAMERA: 360 ORBIT AROUND TOPOLOGICAL CENTER --ar 16:9 --v 6.1]`,
    cameraRig: {
      lens: 'Angenieux Optimo Ultra 12x Zoom at 85mm T/2.8',
      shutter: '1/60 sec at 60fps for Smooth 2.5x Slow-Motion Retime',
      lighting: 'Dual 360° Studio Softboxes with Chromatic Iridescence Shader',
      mood: 'Y2K Cyber Optimism, Sensual Fluidity & Future High-Tech Marvel',
      movement: 'Continuous Floating 3D Orbit Track around Central Mass',
    },
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85',
    colorPalette: ['#0f172a', '#38bdf8', '#c084fc', '#f43f5e'],
    accentColor: '#c084fc',
    durationSeconds: 30,
    behindTheScenes: {
      atomId: 'atom-frosted-glassmorphism',
      atomName: '磨砂毛玻璃微质感',
      principleName: '动势与导向 (Movement)',
      styleName: 'Y2K 与流动金属未来主义',
      whyItWorks: '流体高光在三维旋转中产生源源不断的动态张力，镀铬镜面反射周围色阶，形成高度戏剧性的未来质感。',
    },
  },
];
