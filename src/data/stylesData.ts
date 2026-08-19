import type { ArtStyle, HallInfo, VideoScenarioInfo } from '../types/art';

export const VIDEO_SCENARIOS: VideoScenarioInfo[] = [
  {
    id: 'all',
    code: 'ALL',
    name: '全部商业场景',
    enName: 'All Scenarios',
    description: '全景探索艺术美学在各大影视、商业视频与前沿数字内容中的应用。',
    iconName: 'Clapperboard',
    recommendedStyles: [],
  },
  {
    id: 'brand-film',
    code: '1.1',
    name: '品牌大片与影视内容',
    enName: 'Brand Films & Cinema',
    description: '高奢品牌大片、东方文旅宣传片、电影级质感短片、汽车概念影片。',
    iconName: 'Film',
    recommendedStyles: ['ink-wash', 'dark-gothic-baroque', 'cyberpunk-neon'],
  },
  {
    id: 'visual-packaging',
    code: '1.2',
    name: '视觉创意与内容包装',
    enName: 'Visual Branding & Packaging',
    description: '科技发布会开场、音乐节主视觉、先锋潮流栏目与频道动态包装。',
    iconName: 'Tv',
    recommendedStyles: ['liquid-glassmorphism', 'memphis-pop', 'vaporwave-retro'],
  },
  {
    id: 'motion-graphics',
    code: '1.3',
    name: '动态图形、MG动画、AE特效',
    enName: 'Motion Graphics & VFX',
    description: '扁平概念MG动效、HUD科技界面、转场特效与信息可视化。',
    iconName: 'Activity',
    recommendedStyles: ['bauhaus-modern', 'low-poly-geometric', 'memphis-pop'],
  },
  {
    id: 'ar-creative',
    code: '1.4',
    name: 'AR现实增强创意视频',
    enName: 'AR & Spatial Video',
    description: '街景AR空间特效、虚实交互短视频、Apple Vision Pro 空间视频创意。',
    iconName: 'Eye',
    recommendedStyles: ['vox-pixel', 'low-poly-geometric', 'liquid-glassmorphism'],
  },
  {
    id: 'ai-narrative',
    code: '1.5',
    name: 'AI 剧情内容创作',
    enName: 'AI Narrative & Drama',
    description: 'Sora / Runway AI 生成悬疑微电影、互动剧集、超现实叙事短剧。',
    iconName: 'Sparkles',
    recommendedStyles: ['rusty-lake', 'dark-gothic-baroque', 'cyberpunk-neon'],
  },
  {
    id: 'product-ecommerce',
    code: '1.6',
    name: '产品与电商营销',
    enName: 'Product & Commercial Marketing',
    description: '潮玩爆款展示、母婴/食品温馨治愈广告、3C数码质感渲染短视频。',
    iconName: 'ShoppingBag',
    recommendedStyles: ['claymation-3d', 'liquid-glassmorphism', 'memphis-pop'],
  },
  {
    id: 'game-experience',
    code: '1.7',
    name: '数字体验与游戏创意',
    enName: 'Gaming & Digital Experience',
    description: '独立游戏世界观美术、元宇宙场景搭建、交互式网页与沉浸展项。',
    iconName: 'Gamepad2',
    recommendedStyles: ['vox-pixel', 'rusty-lake', 'cyberpunk-neon', 'ukiyo-e-woodblock'],
  },
  {
    id: 'industrial-robot',
    code: '1.8',
    name: '硬件、实体工业、具身智能演示',
    enName: 'Industrial & Robotics Demo',
    description: '人形机器人演示、新能源汽车架构、半导体精密工业与硬核科技展示。',
    iconName: 'Cpu',
    recommendedStyles: ['bauhaus-modern', 'cyberpunk-neon', 'low-poly-geometric'],
  },
  {
    id: 'stylized-animation',
    code: '1.9',
    name: '动画与风格化影像',
    enName: 'Stylized Animation & Anime',
    description: '治愈手绘动画、原创动画短片、国风二次元MV、实验艺术影像。',
    iconName: 'Palette',
    recommendedStyles: ['ghibli-watercolor', 'ukiyo-e-woodblock', 'claymation-3d'],
  },
];

export const EXHIBITION_HALLS: HallInfo[] = [
  {
    id: 'all',
    name: '全馆博览',
    enName: 'All Exhibition Halls',
    description: '漫步于整座艺术画廊，纵览人类艺术探索从古典大师到数字先锋的视觉万象。',
    iconName: 'LayoutGrid',
    themeColor: '#d4a327',
  },
  {
    id: 'surreal-mystery',
    name: '暗黑悬疑与超现实厅',
    enName: 'Hall of Surreal Mystery',
    description: '收录锈湖、暗黑哥特、神秘学手稿等充满象征隐喻与潜意识梦境的视觉流派。',
    iconName: 'Eye',
    themeColor: '#e11d48',
  },
  {
    id: 'digital-future',
    name: '数字体素与赛博未来厅',
    enName: 'Hall of Cyber & Voxel',
    description: '收录 VOX 3D体素、像素艺术、赛博朋克霓虹、蒸汽波等数字时代先锋美学。',
    iconName: 'Cpu',
    themeColor: '#06b6d4',
  },
  {
    id: 'traditional-zen',
    name: '东方意境与古典版画厅',
    enName: 'Hall of Oriental Zen & Classics',
    description: '收录水墨丹青、浮世绘木版画等沉淀东方哲思与平涂构图的传世经典。',
    iconName: 'Compass',
    themeColor: '#10b981',
  },
  {
    id: 'modern-geometry',
    name: '几何构成与现代波普厅',
    enName: 'Hall of Modernism & Memphis',
    description: '收录包豪斯理性极简、孟菲斯反叛波普、低多边形折纸等结构与色彩交响。',
    iconName: 'Boxes',
    themeColor: '#f59e0b',
  },
  {
    id: 'whimsical-3d',
    name: '治愈手绘与趣味3D厅',
    enName: 'Hall of Whimsical & Stylized 3D',
    description: '收录吉卜力水彩童话、粘土定格雕塑、液态琉璃透光等温润治愈的艺术风格。',
    iconName: 'Sparkles',
    themeColor: '#8b5cf6',
  },
];

export const ART_STYLES: ArtStyle[] = [
  {
    id: 'rusty-lake',
    title: '锈湖手绘暗黑叙事',
    englishTitle: 'Rusty Lake Surreal Mystery',
    roomNumber: 'ROOM 01 // NO. 01',
    hall: 'surreal-mystery',
    era: '当代独立艺术 / 心理悬疑超现实',
    badge: '怪诞隐喻',
    quote: '“记忆不仅是过去的钥匙，也是通往锈湖彼岸的永恒大门。”',
    summary: '以荷兰黄金时代画风为骨架，结合大卫·林奇式超现实隐喻与复古剪纸感硬边手绘，营造出令人着迷的怪诞、宁静与不祥之美。',
    detailedDescription: '锈湖风格巧妙融合了 17 世纪荷兰静物画的沉静构图与 20 世纪超现实主义的潜意识符号。画面具有清晰硬朗的黑色手绘轮廓线、复古羊皮纸般的低饱和暗调、动物面具人物、老式钟摆、黑色方块与充满戏剧张力的轴对称密闭空间。',
    visualKeyFeatures: [
      '粗细均匀的复古黑色手绘勾线与平面剪纸感',
      '低饱和暗调大地色（暗棕、苔藓绿、锈血红、哑灰）',
      '诡异而优雅的对称室内陈设与古典家具构图',
      '具象化心理符号：黑色方块、鸟头绅士、鹿角与旧留声机',
      '静态画面中弥漫的悬疑、孤独与诗意戏剧感'
    ],
    colorPalette: [
      { name: '锈湖深潭', hex: '#1c2421' },
      { name: '枯木古棕', hex: '#3d2b1f' },
      { name: '腐绿松石', hex: '#4f5d52' },
      { name: '干涸锈血', hex: '#7a3b34' },
      { name: '风化古卷', hex: '#d6c9b3' },
    ],
    promptKeywords: {
      mjPrompt: 'A surreal atmospheric room scene, in Rusty Lake art style, dark vintage paper texture, muted earthy color palette, crisp black hand-drawn line art, mysterious occult symbolism, David Lynch aesthetic, symmetry, eerie elegance, cinematic lighting --ar 16:9 --v 6.1',
      positiveKeywords: ['Rusty Lake aesthetic', 'dark surrealism', 'vintage flat illustration', 'thick clean outlines', 'muted sepia tones'],
      negativeKeywords: ['neon bright colors', 'glossy 3D render', 'over-saturated'],
      parameters: '--ar 16:9 --stylize 250 --v 6.1',
    },
    creationTechniques: {
      medium: '数字板绘（模仿水粉与木版印染纸本）',
      brushwork: '硬边实心笔刷勾勒粗轮廓，大面积平涂后叠加上暗角与宣纸风化颗粒图层',
      lighting: '弱对比漫反射室内光，仅保留主体微弱单侧泛光，强调画面的平面戏剧感',
      composition: '中央轴对称或黄金分割居中排布，背景常为封闭墙面或复古壁纸花纹',
    },
    appliedScenarios: [
      {
        scenarioId: 'ai-narrative',
        scenarioName: '1.5 AI 剧情内容创作',
        useCase: '适用于 AI 心理悬疑微电影、密室解谜剧情短剧、独立悬疑小说视觉化。',
        cameraAdvice: '固定机位对称居中构图，极慢速推拉镜头配合老旧留声机音效，强化不安与定格感。',
      },
      {
        scenarioId: 'game-experience',
        scenarioName: '1.7 数字体验与游戏创意',
        useCase: '解谜冒险游戏、互动沉浸式交互网页、剧本杀先导视觉片。',
        cameraAdvice: '两点透视正视视角，强调道具与环境的点击互动与平面剪纸层叠感。',
      }
    ],
    representativeWorks: [
      {
        id: 'rl-01',
        title: '长廊深处的悬浮黑方块',
        year: '2024',
        artist: 'Curator Gallery Curation',
        description: '密闭的复古壁纸房间中，漂浮着散发微光的黑色立方体，猫头鹰守候在古老钟摆旁，凝固了时空。',
        imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
        aspectRatio: 'landscape',
        tag: '空间叙事'
      },
      {
        id: 'rl-02',
        title: '湖畔磨坊与幽暗水影',
        year: '2023',
        description: '雾气弥漫的深绿水面与静止不动的复古小木屋，倒影深沉，散发着冷峻肃穆的神秘美学。',
        imageUrl: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=1200&q=80',
        aspectRatio: 'portrait',
        tag: '自然秘境'
      },
      {
        id: 'rl-03',
        title: '剧院中的乌鸦面具绅士',
        year: '2024',
        description: '身着复古维多利亚燕尾服的乌鸦面具人物，手持白兰地酒杯端坐于红天鹅绒帷幕前。',
        imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
        aspectRatio: 'square',
        tag: '人物肖像'
      }
    ],
    likesCount: 1420,
    featured: true,
  },
  {
    id: 'vox-pixel',
    title: 'VOX 体素与 3D 像素雕塑',
    englishTitle: 'VOX & 3D Voxel Diorama',
    roomNumber: 'ROOM 02 // NO. 01',
    hall: 'digital-future',
    era: '数字当代 / 3D 微缩箱庭',
    badge: '立体像素',
    quote: '“用最纯粹的立方体微粒，搭建一个充满光影呼吸的微缩宇宙。”',
    summary: '将 2D 经典像素升维至 3D 体素空间，结合 MagicaVoxel 物理光追与等距透视，打造精致赛博箱庭与立体雕塑。',
    detailedDescription: 'VOX（Voxel Art）完全由色彩缤纷的正方体单元拼砌而成。在现代光线追踪渲染引擎下，粗粒度的体素与拟真水面、发光霓虹、景深模糊碰撞出极度迷人的微缩模型（Diorama）魅力。',
    visualKeyFeatures: [
      '严格基于 3D 正方体网格单元构筑的实体与场景',
      '等轴正交视角（Isometric Orthographic）或微距倾斜移轴',
      '自发光体素（Emissive Voxels）与夜景霓虹发光倒影',
      '玩具模型般的精致触感与玻璃/水面折射物理材质',
      '兼具复古 8-bit 情怀与次时代 3D 光追质感'
    ],
    colorPalette: [
      { name: '体素暗夜', hex: '#0e111a' },
      { name: '电光青蓝', hex: '#00f2fe' },
      { name: '霓虹洋红', hex: '#fe0979' },
      { name: '暖阳琉璃', hex: '#ffb300' },
      { name: '基石冰灰', hex: '#546e7a' },
    ],
    promptKeywords: {
      mjPrompt: 'Detailed 3D voxel art diorama, MagicaVoxel style, isometric view, miniature cyberpunk street with glowing lanterns and food stall, ray tracing volumetric lighting, soft ambient occlusion, cute detailed voxel blocks, 8k render, Octane render --ar 16:9 --v 6.1',
      positiveKeywords: ['Voxel art', 'MagicaVoxel render', 'isometric 3D diorama', 'cubic micro blocks', 'volumetric raytracing glow'],
      negativeKeywords: ['2D flat vector', 'smooth organic curves'],
      parameters: '--ar 16:9 --stylize 300 --v 6.1',
    },
    creationTechniques: {
      medium: 'MagicaVoxel / Blender 几何节点 / Qubicle',
      brushwork: '网格布尔加减运算、调色板索引逐块填色，赋予发光度与粗糙度',
      lighting: '环境光遮蔽（AO）+ 点光源辐射全局照明（GI），强化方块边缘切面明暗',
      composition: '等距斜 45 度视角（Isometric）或微距景深悬浮岛构图',
    },
    appliedScenarios: [
      {
        scenarioId: 'ar-creative',
        scenarioName: '1.4 AR现实增强创意视频',
        useCase: '在真实街景上空投影悬浮的 3D 体素建筑岛屿、可爱的像素怪兽游荡。',
        cameraAdvice: '手持微晃镜头跟随真实视角，体素模型带有物理阴影投射于地面，虚实交错。',
      },
      {
        scenarioId: 'game-experience',
        scenarioName: '1.7 数字体验与游戏创意',
        useCase: '沙盒游戏宣传片、元宇宙虚拟地块展示、等轴策略游戏开场动画。',
        cameraAdvice: '斜 45 度等轴旋转运镜（Turntable Camera），景深虚化边缘突出微距沙盘感。',
      }
    ],
    representativeWorks: [
      {
        id: 'vox-01',
        title: '体素雨夜街角居酒屋',
        year: '2024',
        artist: 'Block Master Studio',
        description: '悬浮在虚空中的体素日式小馆，泛着暖黄光芒的灯笼与透亮的雨水积水，细节拉满。',
        imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
        aspectRatio: 'landscape',
        tag: '微缩建筑'
      },
      {
        id: 'vox-02',
        title: '云端方块浮空浮岛',
        year: '2023',
        description: '完全由立方体砖石砌成的飞空艇泊位与体素瀑布，如梦似幻。',
        imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        aspectRatio: 'square',
        tag: '奇幻场景'
      }
    ],
    likesCount: 1890,
    featured: true,
  },
  {
    id: 'cyberpunk-neon',
    title: '赛博朋克与霓虹废土',
    englishTitle: 'Cyberpunk & Neon Dystopia',
    roomNumber: 'ROOM 02 // NO. 02',
    hall: 'digital-future',
    era: '科幻未来主义 / 80s 至今',
    badge: '霓虹未来',
    quote: '“高科技，低生活。在雨夜的沥青路面上，倒映着全息广告的永昼。”',
    summary: '高对比度青蓝与品红霓虹、潮湿雨夜反光、密集摩天义体都市与全息投影构筑的视觉风暴。',
    detailedDescription: '以高密度的巨型都市、繁复的飞线电缆、巨幅全息霓虹招牌、机械义体与阴郁连绵的雨夜倒影为鲜明特征，探讨科技飞速发展与人性孤独的张力。',
    visualKeyFeatures: [
      '品红（Magenta）与青色（Cyan）的强烈互补色冷暖光比',
      '沥青地面潮湿积水的全息倒影与光斑光晕（Bokeh）',
      '高密度建筑立面：管道、空调外机、汉字/片假名发光招牌',
      '机械义体改装、全息发光界面与机能风服饰',
      '薄雾中穿梭的飞行汽车与赛博都市天际线'
    ],
    colorPalette: [
      { name: '深渊沥青', hex: '#080811' },
      { name: '赛博电青', hex: '#00f6ff' },
      { name: '激光品红', hex: '#ff007f' },
      { name: '警告高亮黄', hex: '#ffe600' },
      { name: '暗影紫罗兰', hex: '#3d0c5a' },
    ],
    promptKeywords: {
      mjPrompt: 'Cinematic wide shot of a bustling cyberpunk street at rainy night, towering skyscrapers covered in massive holographic advertisements, vivid neon magenta and cyan lighting, wet asphalt reflections, dense flying vehicles, Blade Runner 2049 aesthetic, photorealistic, 8k resolution --ar 21:9 --v 6.1',
      positiveKeywords: ['Cyberpunk aesthetic', 'Blade Runner neon lighting', 'rainy reflective wet streets', 'cyan and magenta color grading'],
      negativeKeywords: ['sunny rural landscape', 'pastel vintage'],
      parameters: '--ar 21:9 --style raw --v 6.1',
    },
    creationTechniques: {
      medium: '概念设计板绘 / 3D 贴图合成 (Cinema 4D + Octane / Unreal 5)',
      brushwork: '运用图层“颜色减淡”与“滤色”模式绘制高光溢出与霓虹电晕',
      lighting: '强光源多向交叉补光、边缘轮廓光（Rim Light）与雨雾体积光',
      composition: '超广角仰视透视强化建筑压迫感，或两点透视深邃街道延伸',
    },
    appliedScenarios: [
      {
        scenarioId: 'brand-film',
        scenarioName: '1.1 品牌大片与影视内容',
        useCase: '科技旗舰手机、电竞外设、新能源汽车“夜行者”概念广告大片。',
        cameraAdvice: '超广角低机位快速穿梭运镜，雨夜光轨拉丝与镜头光晕（Anamorphic Lens Flare）。',
      },
      {
        scenarioId: 'industrial-robot',
        scenarioName: '1.8 硬件工业与具身智能演示',
        useCase: '未来机械装甲、仿生机械义肢、自动驾驶穿梭机产品展示。',
        cameraAdvice: '微距特写精密齿轮与电缆接头，冷蓝轮廓光勾勒金属硬朗结构。',
      }
    ],
    representativeWorks: [
      {
        id: 'cp-01',
        title: '霓虹雨夜第 9 区',
        year: '2024',
        description: '繁密高楼间穿梭的光轨与雨幕中伫立的机能风侦探，光影交融。',
        imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
        aspectRatio: 'landscape',
        tag: '都市景观'
      },
      {
        id: 'cp-02',
        title: '全息义体工坊',
        year: '2024',
        description: '机械臂与全息蓝图交错的发光工作台，充满硬核工业质感。',
        imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
        aspectRatio: 'square',
        tag: '机械概念'
      }
    ],
    likesCount: 2310,
    featured: true,
  },
  {
    id: 'ink-wash',
    title: '水墨丹青与东方写意',
    englishTitle: 'Ink Wash & Oriental Zen',
    roomNumber: 'ROOM 03 // NO. 01',
    hall: 'traditional-zen',
    era: '传统东方美学 / 宋明以降至当代新水墨',
    badge: '水墨留白',
    quote: '“计白当黑，无画处皆成妙境。于笔墨浓淡干湿之间，纳万顷烟波。”',
    summary: '宣纸渗化的自然肌理、浓淡干湿焦五色之变，讲究气韵生动与大面积意境留白。',
    detailedDescription: '水墨画是东方古典视觉艺术的最高峰。运用毛笔在生宣纸上的渗墨效应，一笔落定即蕴含轻重徐疾、虚实相生。现代新水墨更结合了当代设计构图与微光渲染，呈现出空灵、幽远的高级美感。',
    visualKeyFeatures: [
      '大面积呼吸感留白（Negative Space）与虚实相生',
      '水墨“五色”：焦、浓、重、淡、清的丰富层次与边缘水痕',
      '枯笔飞白、墨分五色、金泥勾勒与矿物石青石绿点缀',
      '高远、深远、平远的古典散点透视空间感',
      '诗意物象：松、竹、孤舟、远山烟雨、仙鹤、枯石'
    ],
    colorPalette: [
      { name: '玄墨焦黑', hex: '#161616' },
      { name: '烟雨淡墨', hex: '#737a82' },
      { name: '生宣素白', hex: '#f0ece1' },
      { name: '石青幽矿', hex: '#264e5a' },
      { name: '泥金点染', hex: '#c59d49' },
    ],
    promptKeywords: {
      mjPrompt: 'Traditional Chinese ink wash painting, ethereal misty mountains with lonely pine tree and flying cranes, sweeping minimalist brush strokes, extensive negative space, rice paper bleeding texture, delicate gold foil accents, Zen tranquility, poetic masterpiece --ar 16:9 --v 6.1',
      positiveKeywords: ['Chinese ink wash painting', 'Sumie oriental style', 'watercolor ink bleed on Xuan paper', 'Zen aesthetics'],
      negativeKeywords: ['heavy oil impasto', 'plastic 3D'],
      parameters: '--ar 16:9 --stylize 400 --v 6.1',
    },
    creationTechniques: {
      medium: '水墨宣纸 / 数字化仿生毛笔笔刷（Procreate 墨汁扩散引擎）',
      brushwork: '中锋勾线、侧锋皴擦、破墨晕染与枯笔飞白',
      lighting: '非传统定向光，靠墨色浓淡与留白表现空间远近与光照虚实',
      composition: '对角线破局、一河两岸或大面积留白压角',
    },
    appliedScenarios: [
      {
        scenarioId: 'brand-film',
        scenarioName: '1.1 品牌大片与影视内容',
        useCase: '高端国潮品牌、茶叶与中式美学酒店、中国地理文旅宣传片。',
        cameraAdvice: '极度舒缓的水平移镜与慢门长曝光，水墨随风扩散粒子动效，留白呼吸感。',
      },
      {
        scenarioId: 'stylized-animation',
        scenarioName: '1.9 动画与风格化影像',
        useCase: '国风二次元动画短片、武侠动作短片意境段落。',
        cameraAdvice: '快慢刀光剑影与墨滴飞溅定格，虚实交错产生诗意张力。',
      }
    ],
    representativeWorks: [
      {
        id: 'ink-01',
        title: '烟波孤舟远岫图',
        year: '2024',
        description: '远山如黛，一叶扁舟在万顷烟波中静止，极具禅宗空灵意蕴。',
        imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
        aspectRatio: 'landscape',
        tag: '山水意境'
      },
      {
        id: 'ink-02',
        title: '松风水月苍古吟',
        year: '2023',
        description: '古松苍劲盘曲，金泥细笔勾勒松针微光，浓淡墨色相映成趣。',
        imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=1200&q=80',
        aspectRatio: 'portrait',
        tag: '花木清赏'
      }
    ],
    likesCount: 1960,
    featured: true,
  },
  {
    id: 'ghibli-watercolor',
    title: '吉卜力手绘与水彩治愈',
    englishTitle: 'Ghibli Watercolor & Pastoral Fantasy',
    roomNumber: 'ROOM 05 // NO. 01',
    hall: 'whimsical-3d',
    era: '现代日本动画手绘黄金时代',
    badge: '治愈光影',
    quote: '“每一朵夏天翻滚的积雨云深处，都藏着一个未被发现的飞空之国。”',
    summary: '翠绿山野、澎湃积雨云、柔和晨昏日光与温润手绘水彩胶片质感。',
    detailedDescription: '吉卜力风格的核心魅力在于对自然界充满深情的敏锐捕捉：翻涌厚重的层状积雨云、随风起伏的碧绿草甸、老式木屋的温润木纹与阳光穿透树叶的丁达尔光斑。',
    visualKeyFeatures: [
      '标志性的“吉卜力云”：层次分明、体积庞大且富有雕塑感的积雨云',
      '明亮通透的自然色谱：丰茂草绿、澄澈天蓝、暖橙夕阳与纯白',
      '海报水粉（Nicker Poster Color）手绘厚涂质感与颗粒胶片感',
      '生机勃勃的微小细节：路边野花、青苔瓦片、晾晒的衣物',
      '温暖诗意的丁达尔光线与怀旧乡野人情味'
    ],
    colorPalette: [
      { name: '吉卜力草甸绿', hex: '#3b7a57' },
      { name: '夏日晴空蓝', hex: '#4a90e2' },
      { name: '积雨云白', hex: '#fdfbf7' },
      { name: '黄昏暖橙', hex: '#f39c12' },
      { name: '老木屋棕', hex: '#5d4037' },
    ],
    promptKeywords: {
      mjPrompt: 'A breathtaking scenic landscape in Studio Ghibli anime style, painted by Hayao Miyazaki and Kazuo Oga, lush rolling green hills, blooming wildflowers, massive fluffy cumulus clouds in bright blue sky, cozy wooden cottage with watermill, soft warm daylight, watercolor and poster color texture, masterpiece --ar 16:9 --v 6.1',
      positiveKeywords: ['Studio Ghibli art style', 'painted by Kazuo Oga', 'lush green hills', 'fluffy anime clouds'],
      negativeKeywords: ['3D CGI plastic', 'dark gloomy horror'],
      parameters: '--ar 16:9 --stylize 350 --v 6.1',
    },
    creationTechniques: {
      medium: '传统海报水粉（Nicker Poster Color）/ 湿压湿水彩 / 赛璐珞手绘',
      brushwork: '平头排笔铺垫云朵与山峦大底色，干笔勾勒草叶细部高光',
      lighting: '柔和漫射阳光、树荫下的透光漫反射与冷暖光渐变',
      composition: '开阔纵深三分法构图，前景细密植物引向远景辽阔云海',
    },
    appliedScenarios: [
      {
        scenarioId: 'stylized-animation',
        scenarioName: '1.9 动画与风格化影像',
        useCase: '夏日治愈微电影、温暖成长向短剧、田园慢生活纪录短片。',
        cameraAdvice: '自然微风吹拂草甸的摇镜（Pan Shot），阳光穿透云层的丁达尔光柱特效。',
      },
      {
        scenarioId: 'product-ecommerce',
        scenarioName: '1.6 产品与电商营销',
        useCase: '绿色有机食品、户外露营装备、儿童绘本与温情品牌广告。',
        cameraAdvice: '阳光洒在木桌野餐篮的暖调浅景深镜头，烘托纯真天然氛围。',
      }
    ],
    representativeWorks: [
      {
        id: 'gh-01',
        title: '风起时的夏日积雨云',
        year: '2024',
        description: '微风拂过无垠草甸，巨大的白色城堡状积雨云在湛蓝晴空中升腾，充满生命力。',
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        aspectRatio: 'landscape',
        tag: '夏日云海'
      },
      {
        id: 'gh-02',
        title: '森林深处的绣球花站台',
        year: '2023',
        description: '被古老藤蔓与绣球花包围的旧铁轨小站，晨雾如纱，温润宁静。',
        imageUrl: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80',
        aspectRatio: 'portrait',
        tag: '乡野怀旧'
      }
    ],
    likesCount: 2540,
    featured: true,
  },
  {
    id: 'bauhaus-modern',
    title: '包豪斯极简与构成主义',
    englishTitle: 'Bauhaus & Modern Constructivism',
    roomNumber: 'ROOM 04 // NO. 02',
    hall: 'modern-geometry',
    era: '1920s 现代设计起源',
    badge: '理性美学',
    quote: '“形式追随功能。在最纯粹的原色与线条中，找寻永恒的理性秩序。”',
    summary: '红黄蓝三原色、严谨网格构成、极简无衬线排版与工业机械的理性秩序之美。',
    detailedDescription: '包豪斯开创了现代工业设计与视觉传达的基石。强调彻底去除繁琐的古典装饰，通过圆、三角、正方形三种基础几何，搭配红、黄、蓝三原色与黑白网格，创造出跨越百年的理性与永恒美学。',
    visualKeyFeatures: [
      '严格的基础几何形态：圆、正方形、等边三角形',
      '三原色（红、黄、蓝）与中性黑白灰的高纯度秩序搭配',
      '现代主义网格系统（Grid System）与动态斜向排版',
      '去装饰化、纯净的工业线条与功能性构件展示',
      '无衬线字体与包豪斯经典海报视觉语言'
    ],
    colorPalette: [
      { name: '包豪斯正红', hex: '#df2935' },
      { name: '原色柠檬黄', hex: '#f7b05b' },
      { name: '钴蓝纯粹', hex: '#1c448e' },
      { name: '工业深炭', hex: '#1d1e2c' },
      { name: '本白画布', hex: '#f7f4ea' },
    ],
    promptKeywords: {
      mjPrompt: 'Iconic Bauhaus exhibition poster, Walter Gropius and Wassily Kandinsky style, abstract geometric constructivism, primary colors red blue yellow black, clean grid layout, diagonal typography --ar 4:5 --v 6.1',
      positiveKeywords: ['Bauhaus movement poster', 'Constructivism abstract shapes', 'Primary colors red yellow blue'],
      negativeKeywords: ['ornate rococo flourish'],
      parameters: '--ar 4:5 --stylize 180 --v 6.1',
    },
    creationTechniques: {
      medium: '丝网印刷 / 矢量图形 / 瑞士网格系统',
      brushwork: '绝对精准的几何切割、实心色块平压与胶印半色调网点（Halftone）',
      lighting: '纯平面扁平构成，无真实物理光影，依靠色块对比产生前后空间层次',
      composition: '瑞士国际主义网格法则、对角线动感平衡、强烈的留白控制',
    },
    appliedScenarios: [
      {
        scenarioId: 'motion-graphics',
        scenarioName: '1.3 动态图形、MG动画、AE特效',
        useCase: '企业品牌宣传片MG转场、UI交互动效演示、信息图表动态可视化。',
        cameraAdvice: '正交无透视扁平动画，红黄蓝几何图形缩放形变与斜向排版无缝转场。',
      },
      {
        scenarioId: 'industrial-robot',
        scenarioName: '1.8 硬件工业与具身智能演示',
        useCase: '精密结构爆炸图、工业流水线自动化概念、现代建筑方案展示。',
        cameraAdvice: '轴测图（Axonometric）视角的机械拆解与装配线框动画。',
      }
    ],
    representativeWorks: [
      {
        id: 'bh-01',
        title: '魏玛 1923 构成宣言',
        year: '2023',
        description: '三原色几何块面与斜向排版构筑的经典现代主义海报，理性纯粹。',
        imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80',
        aspectRatio: 'portrait',
        tag: '平面构成'
      }
    ],
    likesCount: 1680,
  },
  {
    id: 'claymation-3d',
    title: '粘土定格与童趣雕塑',
    englishTitle: 'Claymation & Stylized Clay 3D',
    roomNumber: 'ROOM 05 // NO. 02',
    hall: 'whimsical-3d',
    era: '传统定格动画到现代 3D 材质模拟',
    badge: '温暖手工',
    quote: '“每一枚黏土上微小的手工指纹，都是创作者留在时间里的温度。”',
    summary: '柔软有弹性的黏土表面、手工按压的微弱指纹肌理、温暖柔光与定格动画的可爱生命力。',
    detailedDescription: '粘土定格风（Claymation Style）脱胎于经典手工泥塑定格动画。在现代 3D 渲染技术加持下，完美复刻了油粘土特有的指纹压痕、微小划痕与次表面散射（SSS 胶质透光感）。',
    visualKeyFeatures: [
      '具有微弱次表面散射（Subsurface Scattering）的油泥胶质温润感',
      '雕塑表面随机分布的微小指纹印记与手工揉捏凹凸',
      '圆润柔软的形体塑造，边缘避免锐利棱角',
      '定格动画特有的纯真呆萌角色神态与手工小道具',
      '暖调摄影棚柔光箱与大光圈微距浅景深'
    ],
    colorPalette: [
      { name: '赤陶土红', hex: '#d96b43' },
      { name: '奶油黏土', hex: '#f4ebd9' },
      { name: '牛油果绿', hex: '#7ca982' },
      { name: '芥末暖黄', hex: '#e9b44c' },
      { name: '石板蓝泥', hex: '#597081' },
    ],
    promptKeywords: {
      mjPrompt: 'Cute claymation characters in a cozy handmade miniature living room, Plasticine clay texture with visible fingerprints, stop motion animation aesthetic --ar 16:9 --v 6.1',
      positiveKeywords: ['Claymation art style', 'Plasticine clay material', 'visible subtle fingerprints'],
      negativeKeywords: ['hard metallic surface', 'sharp polygons'],
      parameters: '--ar 16:9 --stylize 320 --v 6.1',
    },
    creationTechniques: {
      medium: 'Blender 雕刻 / ZBrush / 物理粘土定格摄影',
      brushwork: 'Clay 笔刷雕刻基本形体，贴图添加凹凸指纹与粗糙度噪波图层',
      lighting: '三点柔光箱布光，增强边缘透光红润感与微距浅景深',
      composition: '微距微缩模型舞台构图，聚焦可爱角色的互动瞬间',
    },
    appliedScenarios: [
      {
        scenarioId: 'product-ecommerce',
        scenarioName: '1.6 产品与电商营销',
        useCase: '盲盒潮玩开箱、母婴洗护、休闲零食、文创周边的破圈爆款广告。',
        cameraAdvice: '定格动画特有的 12 帧/秒微顿挫感，微距特写手捏质感与软糯回弹。',
      },
      {
        scenarioId: 'stylized-animation',
        scenarioName: '1.9 动画与风格化影像',
        useCase: '趣味短视频短剧、治愈系儿童故事、搞怪幽默微动画。',
        cameraAdvice: '摄影棚暖色顶光，角色眨眼与动作带有定格偶剧的俏皮节奏。',
      }
    ],
    representativeWorks: [
      {
        id: 'clay-01',
        title: '黏土森林的小聚餐',
        year: '2024',
        description: '几只圆滚滚的泥塑小动物围坐在木桩旁分享软糯的黏土浆果，温馨呆萌。',
        imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',
        aspectRatio: 'landscape',
        tag: '黏土定格'
      }
    ],
    likesCount: 1720,
    featured: true,
  },
  {
    id: 'liquid-glassmorphism',
    title: '液态玻璃拟物与透光 3D',
    englishTitle: 'Liquid Glassmorphism & Caustics',
    roomNumber: 'ROOM 05 // NO. 03',
    hall: 'whimsical-3d',
    era: '现代数字前沿 / UI & 3D 材质革命',
    badge: '琉璃光华',
    quote: '“光线穿透磨砂与流动的水晶，在空间中折射出曼妙的彩虹焦散。”',
    summary: '亚克力半透明折射、真实的焦散水波光斑、液态流体与色散光谱的现代高级质感。',
    detailedDescription: '利用物理光追引擎模拟光线穿透厚玻璃、流体水晶时的折射率（IOR）、彩虹色散（Chromatic Dispersion）与水底焦散（Caustics），呈现出极度通透、前卫且令人心醉的纯净美感。',
    visualKeyFeatures: [
      '高精度折射（IOR 1.45~1.52）与内部半透明毛玻璃模糊',
      '彩虹光谱色散（Chromatic Dispersion）边缘光彩',
      '光线穿透曲面时产生的真实焦散水波纹（Caustics Light Patterns）',
      '流动的水滴、液态金属水银与悬浮几何水晶',
      '极致通透、未来纯净感与当代高奢极简质感'
    ],
    colorPalette: [
      { name: '琉璃色散紫', hex: '#8a4fff' },
      { name: '冰透水晶蓝', hex: '#00e5ff' },
      { name: '极光柔粉', hex: '#ff77e9' },
      { name: '液态银辉', hex: '#e8edf3' },
      { name: '暗曜石透镜', hex: '#11141a' },
    ],
    promptKeywords: {
      mjPrompt: 'Abstract transparent liquid glass sculpture floating in clean studio, fluid curves, chromatic rainbow dispersion --ar 16:9 --v 6.1',
      positiveKeywords: ['Glassmorphism 3D render', 'transparent liquid glass fluid', 'chromatic rainbow dispersion'],
      negativeKeywords: ['dirty opaque matte'],
      parameters: '--ar 16:9 --stylize 300 --v 6.1',
    },
    creationTechniques: {
      medium: 'Cinema 4D + Redshift / Octane / Blender Cycles',
      brushwork: '高精曲面流体动力学模拟（RealFlow），物理玻璃材质开启色散与焦散计算',
      lighting: 'HDR 高动态范围环境贴图发光板，勾勒出玻璃物体周围极其精致的白色反光边缘',
      composition: '中心悬浮抽象形态，留白极多，呼吸感十足',
    },
    appliedScenarios: [
      {
        scenarioId: 'visual-packaging',
        scenarioName: '1.2 视觉创意与内容包装',
        useCase: '苹果/高端数码发布会 UI 动效、护肤品精油透光广告、高奢香水先导片。',
        cameraAdvice: '极慢镜头环绕旋转，捕捉光线穿透水晶曲面时的彩虹焦散水波纹。',
      },
      {
        scenarioId: 'product-ecommerce',
        scenarioName: '1.6 产品与电商营销',
        useCase: '水晶质感美妆、透明探索版数码产品、高奢珠宝首饰展示。',
        cameraAdvice: '强白光侧逆光照明，折射出璀璨纯净的高光耀斑。',
      }
    ],
    representativeWorks: [
      {
        id: 'lg-01',
        title: '流光水晶旋律',
        year: '2024',
        description: '在无重力空间中曲折流动的透明玻璃缎带，折射出璀璨的彩虹色散光晕。',
        imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80',
        aspectRatio: 'landscape',
        tag: '流体透光'
      }
    ],
    likesCount: 1570,
    featured: true,
  }
];
