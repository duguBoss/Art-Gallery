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
[CAMERA: SLOW DOLLY IN 35MM T/1.8 --ar 2.39:1 --v 6.1 --stylize 350]`,
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
[CAMERA: 50MM MACRO EYE-LEVEL TILT-SHIFT --ar 4:3 --v 6.1]`,
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
    id: 'scene-dune-desert-04',
    sceneNumber: 'SCENE 04',
    act: 'ACT IV · 浩瀚荒原 (SUBLIME HORIZON)',
    title: '香料黄昏：阿卜拉吉斯无垠沙海',
    titleEn: 'Spice Sunset: Endless Dunes of Arrakis',
    locationAndTime: 'DEEP DESERT SECTOR 4 · 05:40 PM · GOLDEN DUST HAZE',
    scriptPrompt: `[SCENE START]
EXT. VAST DESERT CREST - GOLDEN DUSK
Waves of monolithic ochre sand dunes stretch beyond the curved planetary horizon.
Wind whips microscopic mica dust into shimmering atmospheric ribbons.
A solitary desert ornithopter casts a needle-thin shadow across the ridge.
Deep monochromatic amber and copper warmth saturates the dynamic spectrum.
[CAMERA: 65MM IMAX LARGE FORMAT WIDE ANGLE --ar 2.39:1 --v 6.1 --stylize 400]`,
    cameraRig: {
      lens: 'Panavision Ultra Vista 65mm Anamorphic T/2.0',
      shutter: '1/96 sec (90° Shutter Angle) for Hyper-Crisp Sand Particles',
      lighting: 'Low Sun Grazing Angle at 15° with Dense Atmospheric Haze',
      mood: 'Cosmic Solitude, Overwhelming Sublime & Epic Austerity',
      movement: 'Aerial Slow Tracking Shot Following Ridge Line',
    },
    coverImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=85',
    colorPalette: ['#451a03', '#9a3412', '#ea580c', '#fdba74'],
    accentColor: '#ea580c',
    durationSeconds: 32,
    behindTheScenes: {
      atomId: 'atom-atmospheric-perspective',
      atomName: '空气透视与颗粒质感',
      principleName: '深度与层次 (Depth & Atmosphere)',
      styleName: '史诗科幻与自然崇高',
      whyItWorks: '近景沙脊的极致锐度与远景因空气漫反射带来的低对比度，在 2.39:1 画幅中铺陈出吞噬人类尺度的宏大气魄。',
    },
  },
  {
    id: 'scene-wkw-nostalgia-05',
    sceneNumber: 'SCENE 05',
    act: 'ACT V · 暧昧幽闭 (CHROMATIC NOSTALGIA)',
    title: '花样年华：狭长回廊的绿意与暗红',
    titleEn: 'In the Mood: Emerald Shadows and Crimson Seduction',
    locationAndTime: 'OLD HONG KONG APARTMENT HALLWAY · 10:30 PM · HUMID NIGHT',
    scriptPrompt: `[SCENE START]
INT. NARROW GREEN-TILED RESIDENTIAL CORRIDOR - NIGHT
A lone woman in an embroidered vintage cheongsam pauses under flickering fluorescent tube.
Deep saturated jade green tiles reflect faint crimson lacquer door trims.
The air is thick with cigarette smoke and unuttered memories.
Camera peers through wooden door frames, voyeuristic and intimate.
[CAMERA: 50MM EYE-LEVEL SHALLOW DOF --ar 1.85:1 --v 6.1 --stylize 280]`,
    cameraRig: {
      lens: 'Zeiss Master Prime 50mm T/1.3',
      shutter: '1/36 sec (240° Shutter Angle) for Expressive Motion Blur',
      lighting: 'Single Overhead Sodium Vapor Practical + Subtle Bounce Fill',
      mood: 'Intimate Nostalgia, Repressed Longing & Somber Elegance',
      movement: 'Slight Handheld Breathing with Subconscious Foreground Occlusion',
    },
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=85',
    colorPalette: ['#022c22', '#065f46', '#991b1b', '#fef08a'],
    accentColor: '#059669',
    durationSeconds: 26,
    behindTheScenes: {
      atomId: 'atom-frame-within-frame',
      atomName: '框中之框 (Frame within Frame)',
      principleName: '构图遮挡 (Framing & Occlusion)',
      styleName: '王家卫式暧昧与复古东方',
      whyItWorks: '前景走廊门框的物理切割，迫使观者视线聚焦于局促空间中的人物眼神，将幽闭压抑转化为极富张力的电影情绪。',
    },
  },
  {
    id: 'scene-kubrick-space-06',
    sceneNumber: 'SCENE 06',
    act: 'ACT VI · 绝对理性 (ONE-POINT PERSPECTIVE)',
    title: '太空漫游：单点透视无限光室',
    titleEn: 'Odyssey Void: Monolithic One-Point Perspective',
    locationAndTime: 'DISCOVERY ONE RECOVERY CHAMBER · ZERO TIME · PURE WHITE',
    scriptPrompt: `[SCENE START]
INT. PURE SYMMETRICAL SCI-FI CORRIDOR - UNKNOWN CYCLE
A mathematically perfect hexagonal tunnel of glowing white acrylic floor panels.
Single-point vanishing perspective leads directly to an ominous crimson circular sensor eye.
Zero shadows. Total aseptic perfection.
The composition is split exactly 50/50 along the central vertical axis.
[CAMERA: 18MM ULTRA-WIDE SYMMETRICAL LOCKED-OFF --ar 2.20:1 --v 6.1 --style raw]`,
    cameraRig: {
      lens: 'Kinoptik Tegea 9.8mm T/1.9 Symmetrical Prime',
      shutter: '1/48 sec at 24.000 fps · Locked Master Tripod',
      lighting: 'Full Ceiling Seamless Diffuse Soft Light, Zero Shadows',
      mood: 'Clinical Isolation, Artificial Intelligence Domination & Cosmic Dread',
      movement: 'Absolute Stationary Lock-Off (Zero Drift, Pure Symmetrical Anchor)',
    },
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85',
    colorPalette: ['#ffffff', '#e2e8f0', '#94a3b8', '#dc2626'],
    accentColor: '#dc2626',
    durationSeconds: 36,
    behindTheScenes: {
      atomId: 'atom-one-point-symmetry',
      atomName: '严苛单点透视',
      principleName: '对称与几何 (Symmetry & Geometry)',
      styleName: '库布里克式理性冷酷',
      whyItWorks: '中心消失点将观者注意力如同激光束般强行锁定，消除一切多余情感，展现出令人不安的崇高科技秩序。',
    },
  },
  {
    id: 'scene-tarkovsky-water-07',
    sceneNumber: 'SCENE 07',
    act: 'ACT VII · 诗学停顿 (MEDITATIVE EMBED)',
    title: '潜行者之境：沉没水泽与时间回声',
    titleEn: 'The Stalker Zone: Submerged Relics and Flowing Time',
    locationAndTime: 'DECOMMISSIONED HYDRO-ZONE · 06:40 AM · DENSE MIST',
    scriptPrompt: `[SCENE START]
INT. FLOODED ABANDONED GENERATOR HALL - MORNING
Clear shallow green water slowly ripples over decaying ceramic tiles and rusted coins.
A single shaft of pale morning mist illuminates floating autumn leaves.
Time has slowed to a complete philosophical standstill.
The reflections on the water surface blur the boundary between sky and decay.
[CAMERA: SLOW 10-MINUTE CONTINUOUS TRACKING CRANE --ar 4:3 --v 6.1]`,
    cameraRig: {
      lens: 'LOMO Standard Speed 35mm T/2.0 Soviet Prime',
      shutter: '1/48 sec on Kodak 5247 35mm Film Stock Emulation',
      lighting: 'Low Contrast Ambient Overcast + Specular Water Caustics',
      mood: 'Spiritual Contemplation, Post-Apocalyptic Reverie & Melancholy',
      movement: 'Ultra-Slow Top-Down Vertical Tracking Crane (0.05m/s)',
    },
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85',
    colorPalette: ['#0f172a', '#1e293b', '#334155', '#64748b'],
    accentColor: '#38bdf8',
    durationSeconds: 40,
    behindTheScenes: {
      atomId: 'atom-poetic-slowness',
      atomName: '雕刻时光与物质诗意',
      principleName: '节奏与停留 (Rhythm & Stasis)',
      styleName: '塔可夫斯基长镜头美学',
      whyItWorks: '水面、残骸与流淌的光线将物理空间转变为精神空间，给予观者长久审视画面材质与时间流逝的沉浸力量。',
    },
  },
  {
    id: 'scene-liquid-chrome-08',
    sceneNumber: 'SCENE 08',
    act: 'ACT VIII · 液态超现实 (SURREAL MORPH)',
    title: '液态金属：千禧拓扑流体折射',
    titleEn: 'Liquid Chrome: Iridescent Spatial Reflection',
    locationAndTime: 'VOID EXHIBITION CHAMBER · TIME UNDEFINED · ZERO-G',
    scriptPrompt: `[SCENE START]
INT. INFINITE VOID SPACE - ZERO GRAVITY
A suspended fluid chrome torus gently twists and expands in mid-air.
Holographic pink and electric violet light reflect across its mirrored liquid surface.
Refracted caustics ripple across imaginary glass floor.
The metal pulses like an organic heartbeat, defying gravity and Euclidean geometry.
[CAMERA: 360 ORBIT AROUND TOPOLOGICAL CENTER --ar 1:1 --v 6.1]`,
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
