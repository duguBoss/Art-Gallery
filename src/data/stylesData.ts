import type { ArtStyle, HallInfo } from '../types/art';

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
      positiveKeywords: ['Rusty Lake aesthetic', 'dark surrealism', 'vintage flat illustration', 'thick clean outlines', 'muted sepia tones', 'mysterious narrative symbolism'],
      negativeKeywords: ['neon bright colors', 'glossy 3D render', 'over-saturated'],
      parameters: '--ar 16:9 --stylize 250 --v 6.1',
    },
    creationTechniques: {
      medium: '数字板绘（模仿水粉与木版印染纸本）',
      brushwork: '硬边实心笔刷勾勒粗轮廓，大面积平涂后叠加上暗角与宣纸风化颗粒图层',
      lighting: '弱对比漫反射室内光，仅保留主体微弱单侧泛光，强调画面的平面戏剧感',
      composition: '中央轴对称或黄金分割居中排布，背景常为封闭墙面或复古壁纸花纹',
    },
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
      },
      {
        id: 'rl-04',
        title: '旧阁楼的占星遗物',
        year: '2024',
        description: '风化泛黄的羊皮星图与青铜罗盘在微弱烛光下静默，述说着未完的故事。',
        imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
        aspectRatio: 'landscape',
        tag: '静物构图'
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
    detailedDescription: 'VOX（Voxel Art）摒弃了传统 3D 复杂的平滑网格，完全由色彩缤纷的正方体单元拼砌而成。在现代光线追踪渲染引擎下，粗粒度的体素与拟真水面、发光霓虹、景深模糊碰撞出极度迷人的微缩模型（Diorama）魅力。',
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
      positiveKeywords: ['Voxel art', 'MagicaVoxel render', 'isometric 3D diorama', 'cubic micro blocks', 'volumetric raytracing glow', 'tilt-shift photography'],
      negativeKeywords: ['2D flat vector', 'smooth organic curves', 'low resolution blurry'],
      parameters: '--ar 16:9 --stylize 300 --v 6.1',
    },
    creationTechniques: {
      medium: 'MagicaVoxel / Blender 几何节点 / Qubicle',
      brushwork: '网格布尔加减运算、调色板索引逐块填色，赋予发光度与粗糙度',
      lighting: '环境光遮蔽（AO）+ 点光源辐射全局照明（GI），强化方块边缘切面明暗',
      composition: '等距斜 45 度视角（Isometric）或微距景深悬浮岛构图',
    },
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
      },
      {
        id: 'vox-03',
        title: '赛博体素微缩车站',
        year: '2024',
        description: '密布霓虹信号灯与发光轨道的未来体素列车站，展现精密机械美感。',
        imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
        aspectRatio: 'portrait',
        tag: '科幻构型'
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
    detailedDescription: '赛博朋克以高密度的巨型都市、繁复的飞线电缆、巨幅全息霓虹招牌、机械义体与阴郁连绵的雨夜倒影为鲜明特征，探讨科技飞速发展与人性孤独的张力。',
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
      positiveKeywords: ['Cyberpunk aesthetic', 'Blade Runner neon lighting', 'rainy reflective wet streets', 'cyan and magenta color grading', 'holographic displays'],
      negativeKeywords: ['sunny rural landscape', 'pastel vintage', 'minimalist white room'],
      parameters: '--ar 21:9 --style raw --v 6.1',
    },
    creationTechniques: {
      medium: '概念设计板绘 / 3D 贴图合成 (Cinema 4D + Octane / Unreal 5)',
      brushwork: '运用图层“颜色减淡”与“滤色”模式绘制高光溢出与霓虹电晕',
      lighting: '强光源多向交叉补光、边缘轮廓光（Rim Light）与雨雾体积光',
      composition: '超广角仰视透视强化建筑压迫感，或两点透视深邃街道延伸',
    },
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
      },
      {
        id: 'cp-03',
        title: '午夜霓虹天际线',
        year: '2023',
        description: '冷酷钢铁巨构在品红与青蓝激光照射下巍然耸立，呈现绝望而瑰丽的未来美学。',
        imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
        aspectRatio: 'landscape',
        tag: '巨构建筑'
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
      positiveKeywords: ['Chinese ink wash painting', 'Sumie oriental style', 'watercolor ink bleed on Xuan paper', 'Zen aesthetics', 'minimalist negative space', 'gold dust accents'],
      negativeKeywords: ['heavy oil impasto', 'plastic 3D', 'western baroque crowded'],
      parameters: '--ar 16:9 --stylize 400 --v 6.1',
    },
    creationTechniques: {
      medium: '水墨宣纸 / 数字化仿生毛笔笔刷（Procreate 墨汁扩散引擎）',
      brushwork: '中锋勾线、侧锋皴擦、破墨晕染与枯笔飞白',
      lighting: '非传统定向光，靠墨色浓淡与留白表现空间远近与光照虚实',
      composition: '对角线破局、一河两岸或大面积留白压角',
    },
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
      },
      {
        id: 'ink-03',
        title: '云岫溪山清远图',
        year: '2024',
        description: '大面积留白展现江南烟雨蒙蒙，墨分五色，气韵生动自然。',
        imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80',
        aspectRatio: 'landscape',
        tag: '水墨全景'
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
    detailedDescription: '吉卜力风格的核心魅力在于对自然界充满深情的敏锐捕捉：翻涌厚重的层状积雨云、随风起伏的碧绿草甸、老式木屋的温润木纹与阳光穿透树叶的丁达尔光斑。手工海报水粉的层次叠加，给予观众无与伦比的心灵治愈力。',
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
      positiveKeywords: ['Studio Ghibli art style', 'painted by Kazuo Oga', 'lush vibrant green hills', 'sculpted fluffy anime clouds', 'warm natural sunlight', 'watercolor poster color painted'],
      negativeKeywords: ['3D CGI plastic', 'dark gloomy horror', 'harsh neon photorealism'],
      parameters: '--ar 16:9 --stylize 350 --v 6.1',
    },
    creationTechniques: {
      medium: '传统海报水粉（Nicker Poster Color）/ 湿压湿水彩 / 赛璐珞手绘',
      brushwork: '平头排笔铺垫云朵与山峦大底色，干笔勾勒草叶细部高光',
      lighting: '柔和漫射阳光、树荫下的透光漫反射与冷暖光渐变',
      composition: '开阔纵深三分法构图，前景细密植物引向远景辽阔云海',
    },
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
      },
      {
        id: 'gh-03',
        title: '山间木屋的夕阳余晖',
        year: '2024',
        description: '暖橙色落日余晖洒在木屋水车与溪流上，微风轻拂，诗意盎然。',
        imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        aspectRatio: 'landscape',
        tag: '晨昏光影'
      }
    ],
    likesCount: 2540,
    featured: true,
  },
  {
    id: 'ukiyo-e-woodblock',
    title: '浮世绘木版画',
    englishTitle: 'Ukiyo-e Japanese Woodblock',
    roomNumber: 'ROOM 03 // NO. 02',
    hall: 'traditional-zen',
    era: '江户时代至近代新版画',
    badge: '木刻千重',
    quote: '“浮生若梦，当观涛生云灭；以刀代笔，刻就俗世与仙境的画卷。”',
    summary: '葛饰北斋与歌川广重式的平涂矿物色、木版雕刻刀痕套印肌理与动人心魄的流线构图。',
    detailedDescription: '浮世绘是日本江户时代的传统木刻版画艺术。以其波浪翻涌的戏剧性张力、普鲁士蓝的深邃渐变、以及对平民生活与自然风景的写意描绘，确立了世界艺术史上不朽的经典地位。',
    visualKeyFeatures: [
      '行云流水般优美的黑色木刻外轮廓线',
      '天然矿物与植物颜料平涂（著名的普鲁士蓝、雄黄、朱砂）',
      '版画特有的木纹肌理与套色微错位边缘（Register Shift）',
      '平面化装饰性极强的海浪、云朵、雪景与花草几何化表现',
      '极具冲击力的俯仰视戏剧性剪裁构图'
    ],
    colorPalette: [
      { name: '北斋普鲁士蓝', hex: '#1d3557' },
      { name: '朱红印章', hex: '#e63946' },
      { name: '木版桑皮白', hex: '#f1faee' },
      { name: '松针黛青', hex: '#457b9d' },
      { name: '泥金云霞', hex: '#d4a373' },
    ],
    promptKeywords: {
      mjPrompt: 'Traditional Japanese Ukiyo-e woodblock print, in the style of Hokusai and Hiroshige, majestic ocean waves crashing with foam, Mount Fuji in distance, Prussian blue and vermilion color palette, wood grain paper texture, bold black outlines, ancient Edo period masterpiece --ar 16:9 --v 6.1',
      positiveKeywords: ['Ukiyo-e woodblock print', 'Katsushika Hokusai style', 'Utagawa Hiroshige aesthetic', 'Prussian blue gradient', 'crisp woodcut carving outlines'],
      negativeKeywords: ['3D CGI render', 'modern photorealism', 'western oil impasto'],
      parameters: '--ar 16:9 --stylize 350 --v 6.1',
    },
    creationTechniques: {
      medium: '木版套色印刷 / 和纸 / 现代矢量版画线稿',
      brushwork: '雕版木刀线条雕刻、马连（Baren）手工压印造成的微弱颗粒与晕色（Bokashi）',
      lighting: '去阴影平涂光感，依赖色彩明度渐变表现天空与水体深度',
      composition: '超强前景遮挡对比（如隔着大浪看远山），平面装饰性张力',
    },
    representativeWorks: [
      {
        id: 'uk-01',
        title: '神奈川冲之惊涛',
        year: '2023',
        description: '巨浪爪牙般拍打，舟船在千重雪浪中从容穿行，远景富士山静穆。',
        imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
        aspectRatio: 'landscape',
        tag: '木刻版画'
      },
      {
        id: 'uk-02',
        title: '东海道之雪晴晚霞',
        year: '2024',
        description: '白雪覆盖的松林与远山在落日朱红映照下静谧无声，呈现绝美东瀛冬景。',
        imageUrl: 'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1200&q=80',
        aspectRatio: 'landscape',
        tag: '江户名所'
      }
    ],
    likesCount: 2105,
    featured: true,
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
    detailedDescription: '粘土定格风（Claymation Style）脱胎于经典手工泥塑定格动画。在现代 3D 渲染技术加持下，完美复刻了油粘土特有的指纹压痕、微小划痕与次表面散射（SSS 胶质透光感），展现出治愈、呆萌的艺术魅力。',
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
      mjPrompt: 'Cute claymation characters in a cozy handmade miniature living room, Plasticine clay texture with visible fingerprints, stop motion animation aesthetic, warm soft studio lighting, subsurface scattering, macro tilt-shift photography, tactile, playful, masterpiece 3D --ar 16:9 --v 6.1',
      positiveKeywords: ['Claymation art style', 'Plasticine clay material', 'visible subtle fingerprints texture', 'warm tactile handmade', 'subsurface scattering clay'],
      negativeKeywords: ['hard metallic surface', 'sharp polygons', 'flat vector graphic'],
      parameters: '--ar 16:9 --stylize 320 --v 6.1',
    },
    creationTechniques: {
      medium: 'Blender 雕刻 / ZBrush / 物理粘土定格摄影',
      brushwork: 'Clay 笔刷雕刻基本形体，贴图添加凹凸指纹与粗糙度噪波图层',
      lighting: '三点柔光箱布光，增强边缘透光红润感与微距浅景深',
      composition: '微距微缩模型舞台构图，聚焦可爱角色的互动瞬间',
    },
    representativeWorks: [
      {
        id: 'clay-01',
        title: '黏土森林的小聚餐',
        year: '2024',
        description: '几只圆滚滚的泥塑小动物围坐在木桩旁分享软糯的黏土浆果，温馨呆萌。',
        imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',
        aspectRatio: 'landscape',
        tag: '黏土定格'
      },
      {
        id: 'clay-02',
        title: '温暖手工泥塑小镇',
        year: '2024',
        description: '揉捏出柔和曲面的泥塑房屋与小花坛，带有清晰的手工指纹肌理。',
        imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
        aspectRatio: 'square',
        tag: '童趣雕塑'
      }
    ],
    likesCount: 1720,
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
      mjPrompt: 'Iconic Bauhaus exhibition poster, Walter Gropius and Wassily Kandinsky style, abstract geometric constructivism, primary colors red blue yellow black, clean grid layout, diagonal typography, vintage 1920s print texture, museum quality graphic design --ar 4:5 --v 6.1',
      positiveKeywords: ['Bauhaus movement poster', 'Constructivism abstract shapes', 'Primary colors red yellow blue', 'Strict grid alignment', 'clean geometric composition'],
      negativeKeywords: ['ornate rococo flourish', 'organic messy brushwork', 'neon lighting'],
      parameters: '--ar 4:5 --stylize 180 --v 6.1',
    },
    creationTechniques: {
      medium: '丝网印刷 / 矢量图形 / 瑞士网格系统',
      brushwork: '绝对精准的几何切割、实心色块平压与胶印半色调网点（Halftone）',
      lighting: '纯平面扁平构成，无真实物理光影，依靠色块对比产生前后空间层次',
      composition: '瑞士国际主义网格法则、对角线动感平衡、强烈的留白控制',
    },
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
    id: 'memphis-pop',
    title: '孟菲斯设计与几何波普',
    englishTitle: 'Memphis & Bold Pop',
    roomNumber: 'ROOM 04 // NO. 01',
    hall: 'modern-geometry',
    era: '1980s 意大利先锋设计运动',
    badge: '狂想撞色',
    quote: '“设计不应该只有冷冰冰的功能主义，让我们用跳跃的色彩与几何狂欢！”',
    summary: '打破常规的波普撞色、斑马纹波点与不对称几何狂欢，充满乐观主义与幽默感。',
    detailedDescription: '孟菲斯设计将波普艺术的不羁、装饰艺术的几何与塑料饰面板的大胆色彩熔于一炉，创造出充满趣味性、鲜艳夺目且极具辨识度的视觉符号。',
    visualKeyFeatures: [
      '高饱和度对比撞色（粉红、柠檬黄、薄荷绿、天蓝、群青）',
      '标志性几何纹理：斑马波浪线（Squiggles）、波点阵列、三角形切片',
      '反传统的不对称结构与打破常规的物体造型组合',
      '清晰黑实线勾边与纯色块面平涂',
      '充满活力、童心与后现代主义的幽默狂欢'
    ],
    colorPalette: [
      { name: '电光柠檬', hex: '#ffee55' },
      { name: '火烈鸟粉', hex: '#ff6b8b' },
      { name: '薄荷苏打', hex: '#4ecdc4' },
      { name: '皇家群青', hex: '#2e3192' },
      { name: '漆黑波点', hex: '#1a1a1a' },
    ],
    promptKeywords: {
      mjPrompt: 'Vibrant 1980s Memphis design movement art piece, bold geometric shapes, squiggles patterns, high contrast neon pastel colors, playful asymmetry, clean vector pop art lines, Ettore Sottsass aesthetic, studio product layout --ar 16:9 --v 6.1',
      positiveKeywords: ['Memphis design pattern', '80s bold geometric shapes', 'playful bright color blocking', 'squiggles and dots texture', 'pop art aesthetic'],
      negativeKeywords: ['dark gothic gloomy', 'monochrome boring', 'muddy sepia'],
      parameters: '--ar 16:9 --stylize 200 --v 6.1',
    },
    creationTechniques: {
      medium: '矢量插画 / 3D 渲染 (Illustrator + Spline / Blender)',
      brushwork: '纯粹矢量几何布尔路径，无渐变平涂或明暗强烈的赛璐珞阴影',
      lighting: '均匀无影漫射光或 45 度投影硬边阴影（Hard Shadow）',
      composition: '几何形状层叠散落、自由重力构图与戏剧性不对称',
    },
    representativeWorks: [
      {
        id: 'mem-01',
        title: '米兰 1981 狂想曲',
        year: '2024',
        description: '交错的柠檬黄圆台、波浪条纹拱门与粉红几何体构筑的先锋空间。',
        imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
        aspectRatio: 'landscape',
        tag: '空间波普'
      }
    ],
    likesCount: 1150,
  },
  {
    id: 'dark-gothic-baroque',
    title: '暗黑哥特与古典巴洛克',
    englishTitle: 'Dark Gothic & Baroque Splendor',
    roomNumber: 'ROOM 01 // NO. 02',
    hall: 'surreal-mystery',
    era: '中世纪哥特到 17 世纪巴洛克华丽暗黑',
    badge: '华丽阴郁',
    quote: '“在繁复交织的黑蔷薇与尖顶大教堂之下，静听管风琴的深沉长鸣。”',
    summary: '尖拱飞扶壁、繁复金银丝镂空雕花、彩绘玻璃冷光与卡拉瓦乔式明暗对照法。',
    detailedDescription: '在强烈的卡拉瓦乔式暗色明暗对照法下，金色镂空蕾丝、幽暗大理石圣殿、暗红丝绒与神秘荆棘构筑出一种极具仪式感与戏剧张力的美学体验。',
    visualKeyFeatures: [
      '极度繁复的巴洛克金银丝卷草纹饰（Filigree & Acanthus）',
      '哥特式尖肋拱顶、花窗玻璃折射冷光与十字架修道院场景',
      '极端强烈的戏剧性明暗对比（Chiaroscuro），主体从深沉黑幕中被单束冷光照亮',
      '暗黑华丽材质：深红天鹅绒、风化黑曜石、古董银器与干枯黑玫瑰',
      '神圣、庄严、隐秘且略带颓废的贵族戏剧感'
    ],
    colorPalette: [
      { name: '深渊墨黑', hex: '#0a0a0d' },
      { name: '暗夜血红', hex: '#5e0b1b' },
      { name: '古董镏金', hex: '#c69214' },
      { name: '冷月银辉', hex: '#9ea3b0' },
      { name: '彩窗冷青', hex: '#16425b' },
    ],
    promptKeywords: {
      mjPrompt: 'Epic dark gothic baroque cathedral interior, ornate gold filigree details, dramatic Chiaroscuro lighting, single beam of moonlit cold light through stained glass, dark crimson velvet, black roses, hauntingly beautiful and cinematic, hyperdetailed 8k --ar 16:9 --v 6.1',
      positiveKeywords: ['Dark gothic aesthetic', 'Baroque intricate architecture', 'Chiaroscuro Caravaggio lighting', 'gold filigree ornamentation', 'stained glass moonlight'],
      negativeKeywords: ['bright flat cartoon', 'simple minimalist pastel', 'cute chibi'],
      parameters: '--ar 16:9 --stylize 380 --v 6.1',
    },
    creationTechniques: {
      medium: '古典油画技法（罩染法 Glazing）/ 高精 3D 雕花',
      brushwork: '深色底漆打底，一层层半透明油彩叠加微光，极度细腻的高光精修',
      lighting: '单侧聚光灯（Key Light），强光照亮局部焦点，背景彻底隐入漆黑暗部',
      composition: '庄严肃穆的古典金字塔式或对称教堂轴线构图',
    },
    representativeWorks: [
      {
        id: 'dg-01',
        title: '暗夜大圣堂的圣咏',
        year: '2024',
        description: '月光穿透巨大的哥特彩绘玻璃窗，照亮大理石祭坛上的纯金雕花圣器。',
        imageUrl: 'https://images.unsplash.com/photo-1515549832467-8783363e19b6?auto=format&fit=crop&w=1200&q=80',
        aspectRatio: 'landscape',
        tag: '大教堂古典'
      }
    ],
    likesCount: 1640,
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
      mjPrompt: 'Abstract transparent liquid glass sculpture floating in clean studio, fluid curves, chromatic rainbow dispersion, realistic caustics light refractions, frosted acrylic texture, soft minimalist pastel gradient background, Octane render 8k --ar 16:9 --v 6.1',
      positiveKeywords: ['Glassmorphism 3D render', 'transparent liquid glass fluid', 'chromatic rainbow light dispersion', 'caustics patterns', 'frosted translucent acrylic'],
      negativeKeywords: ['dirty opaque matte', 'flat sketch', 'rustic grunge'],
      parameters: '--ar 16:9 --stylize 300 --v 6.1',
    },
    creationTechniques: {
      medium: 'Cinema 4D + Redshift / Octane / Blender Cycles',
      brushwork: '高精曲面流体动力学模拟（RealFlow），物理玻璃材质开启色散与焦散计算',
      lighting: 'HDR 高动态范围环境贴图发光板，勾勒出玻璃物体周围极其精致的白色反光边缘',
      composition: '中心悬浮抽象形态，留白极多，呼吸感十足',
    },
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
