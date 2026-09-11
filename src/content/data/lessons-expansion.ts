import type { LessonEntity, PracticeEntity } from '../../model/entity';
import { loc } from '../../model/i18n';

/**
 * Lessons phase-2 expansion — covers missing levels, adds DAG + difficulty + outcomes.
 */
export const LESSONS_EXPANSION: LessonEntity[] = [
  // ===============================================================
  // L0 — Awareness (phase 2 new)
  // ===============================================================
  {
    id: 'lesson-what-is-seeing',
    type: 'lesson', slug: 'what-is-seeing',
    path: 'awareness', order: 1, durationMin: 12, difficulty: 1,
    name: loc('什么是视觉：大脑替你做了什么判断', 'What is seeing: what your brain decides for you'),
    summary: loc('你以为自己在"看世界"，其实你的大脑在 300ms 内已经替你做完了第一波判断。', 'You think you see the world — your brain finished its first judgment wave in 300ms.'),
    outcomes: [
      loc('能说出三种视觉自动判断', 'Name three visual auto-judgments'),
      loc('能在自己身上捕捉第一眼反应', 'Catch first-glance reaction in yourself'),
      loc('理解视觉心理学与设计的关系', 'See visual psych → design relationship'),
    ],
    keyPrinciples: [
      loc('视觉判断先于理性思考 200-300ms', 'Visual judgment precedes reason by 200-300ms'),
      loc('好感判断主要由色彩、对称性与面部特征驱动', 'Appeal is driven by color, symmetry and faces'),
      loc('看见自动判断是所有视觉训练的第一步', 'Noticing auto-judgment is first skill'),
    ],
    steps: [
      { title: loc('观察', 'Observe'), body: loc('打开首页，用秒表算：从页面出现到你意识到"好不好看"用了几秒？', 'Open homepage and time: how long until "good-looking"?') },
      { title: loc('解释', 'Explain'), body: loc('大脑在视觉皮层 V1-V5 区并行处理色彩、运动、形状，同时杏仁核启动情绪反应——这一切在理性参与之前完成。', 'V1–V5 process color, motion, shape in parallel while amygdala fires — before reason joins.') },
      { title: loc('练习', 'Try'), body: loc('看三张完全陌生的界面/海报，记录每第一张的 3 秒内感受。', 'Look at three unfamiliar images; record 3-second feeling for each.') },
    ],
    conceptIds: ['c-visual-cognition'],
    domainIds: ['creative-science'],
  },
  {
    id: 'lesson-learn-to-see',
    type: 'lesson', slug: 'learn-to-see',
    path: 'awareness', order: 2, durationMin: 15, difficulty: 1,
    name: loc('学会观看：暂停自动反应', 'Learn to see: pause the auto-reaction'),
    summary: loc('观看不是瞬间判断——而是可以放慢、拆开、重复的过程。', 'Looking is not instant judgment — it is slowable, decomposable, repeatable.'),
    outcomes: [
      loc('能进行 3 分钟慢看', 'Slow-look 3 minutes'),
      loc('区分反应与事实', 'Separate reaction and fact'),
      loc('建立先看后评习惯', 'Look-first judge-second habit'),
    ],
    keyPrinciples: [
      loc('三分钟法则：任何作品值得三分钟不评价观看', 'Three-minute rule: any work deserves 3 non-judgmental minutes'),
      loc('先记录事实再谈感受', 'Record facts first, then feelings'),
      loc('慢看能力是可训练的肌肉', 'Slow-looking is a trainable muscle'),
    ],
    steps: [
      { title: loc('练习', 'Try'), body: loc('选一张你"已经看过但从没好好看过"的作品。设置三分钟倒计时。只回答"我看到什么"，不回答"我觉得好不好"。', 'Pick a work you know but never looked at. Three minutes. Only "what do I see" — never "do I like it".') },
      { title: loc('深化', 'Go deeper'), body: loc('三分钟之后，再问：哪一个细节是我第一分钟没有注意到的？那通常是作品的关键。', 'After three: what detail did I miss? Usually the key.') },
    ],
    workIds: ['work-mona-lisa', 'work-great-wave'],
    domainIds: ['creative-science', 'art-history'],
    prerequisiteIds: ['lesson-what-is-seeing'],
  },

  // ===============================================================
  // L2 — Language (补足)
  // ===============================================================
  {
    id: 'lesson-visual-hierarchy',
    type: 'lesson', slug: 'visual-hierarchy',
    path: 'language', order: 1, durationMin: 16, difficulty: 2,
    name: loc('视觉层级：眼睛按你的剧本移动', 'Hierarchy: the eye follows your script'),
    summary: loc('让读者先看标题再读正文的秘密不是字号，而是层级对比。', 'Making "title → body → footnote" doesn’t come from font size — it comes from contrast layers.'),
    outcomes: [
      loc('能画出 3-5 层视觉层级图', 'Map 3–5 hierarchy layers'),
      loc('能用四种工具建立层级', 'Use four tools for hierarchy'),
      loc('区分主导/次主导/从属层', 'Identify dominant/sub-dominant/subordinate'),
    ],
    keyPrinciples: [
      loc('层级是对比度，不是字号差', 'Hierarchy is contrast, not size difference'),
      loc('每层之间 3:1 到 5:1 对比度', '3:1 to 5:1 contrast between layers'),
      loc('同一层内元素应该有相似重量', 'Same-layer elements share visual weight'),
    ],
    conceptIds: ['dp-hierarchy', 'atom-swiss-grid'],
    domainIds: ['creative-science', 'design'],
    prerequisiteIds: ['lesson-composition', 'lesson-color'],
  },
  {
    id: 'lesson-contrast',
    type: 'lesson', slug: 'contrast',
    path: 'language', order: 2, durationMin: 14, difficulty: 2,
    name: loc('对比：张力的来源', 'Contrast: the source of tension'),
    summary: loc('明暗、大小、粗细、疏密、冷暖、动静——对比是所有张力的底层机制。', 'Value, size, weight, density, temperature, motion — contrast is all tension’s mechanism.'),
    outcomes: [
      loc('找 3+ 对比类型', 'Find 3+ contrast types'),
      loc('说清高/低对比的情绪', 'High/low contrast moods'),
      loc('用对比造焦点或舒缓', 'Focus or soothe with contrast'),
    ],
    conceptIds: ['dp-contrast', 'atom-cold-warm-clash'],
    domainIds: ['creative-science'],
    prerequisiteIds: ['lesson-color'],
  },
  {
    id: 'lesson-balance-emptiness',
    type: 'lesson', slug: 'balance-and-emptiness',
    path: 'language', order: 5, durationMin: 15, difficulty: 2,
    name: loc('平衡与留白：空即是力', 'Balance and emptiness: void as force'),
    summary: loc('留白不是没用上的空间——它是主动力。非对称平衡让画面活着。', 'Emptiness is not unused space — it is active force. Asymmetric balance makes images live.'),
    outcomes: [
      loc('区分对称/非对称平衡', 'Symmetric vs asymmetric'),
      loc('说清 ma 与 composition 的不同', 'Ma vs composition difference'),
      loc('用 60/30/10 控留白', '60/30/10 emptiness control'),
    ],
    conceptIds: ['dp-balance', 'atom-negative-space'],
    workIds: ['work-great-wave', 'work-mondrian-composition'],
    domainIds: ['creative-science', 'design'],
    prerequisiteIds: ['lesson-composition'],
  },
  {
    id: 'lesson-grid',
    type: 'lesson', slug: 'grid',
    path: 'language', order: 6, durationMin: 13, difficulty: 2,
    name: loc('网格：看不见的秩序', 'Grid: invisible order'),
    summary: loc('从报纸到瑞士风格到现代界面——网格是让复杂内容保持清晰的隐形骨架。', 'From newspapers to Swiss to modern UI — the grid is the invisible skeleton keeping complexity clear.'),
    outcomes: [
      loc('能还原网格系统', 'Reverse-engineer any grid'),
      loc('能设计自己的网格', 'Design custom grid'),
      loc('懂什么时候打破网格', 'Know when to break'),
    ],
    conceptIds: ['atom-swiss-grid', 'dp-alignment'],
    domainIds: ['creative-science', 'design'],
    prerequisiteIds: ['lesson-typography'],
  },

  // ===============================================================
  // L3 — Disciplines (补足)
  // ===============================================================
  {
    id: 'lesson-read-photo',
    type: 'lesson', slug: 'reading-photography',
    path: 'disciplines', order: 3, durationMin: 18, difficulty: 2,
    name: loc('如何阅读一张照片', 'Reading a photograph'),
    summary: loc('银盐颗粒、焦平面、快门速度——每张照片都是技术选择的总和。', 'Silver grain, focal plane, shutter — every photo is sum of technical choices.'),
    outcomes: [
      loc('区分三种分析框架', 'Three analysis frames'),
      loc('说清两种瞬间的差异', 'Decisive vs composed moment'),
      loc('识别主要技术选择', 'Identify key tech choices'),
    ],
    workIds: ['work-migrant-mother'],
    domainIds: ['photography'],
    prerequisiteIds: ['lesson-light', 'lesson-composition'],
  },
  {
    id: 'lesson-read-film',
    type: 'lesson', slug: 'reading-film',
    path: 'disciplines', order: 4, durationMin: 20, difficulty: 2,
    name: loc('如何阅读一段电影', 'Reading a film sequence'),
    summary: loc('景别、镜头运动、剪辑节奏——电影是时间维度上的视觉语言。', 'Shot scale, camera movement, rhythm — film is visual language in time.'),
    outcomes: [
      loc('识别基本景别', 'Identify shot scales'),
      loc('说清长镜头vs蒙太奇', 'Long take vs montage'),
      loc('逐镜头分析 10 分钟', 'Shot-by-shot 10min analysis'),
    ],
    workIds: ['work-blade-runner'],
    domainIds: ['film'],
    prerequisiteIds: ['lesson-light', 'lesson-narrative'],
  },
  {
    id: 'lesson-read-animation',
    type: 'lesson', slug: 'reading-animation',
    path: 'disciplines', order: 5, durationMin: 16, difficulty: 2,
    name: loc('如何阅读一段动画', 'Reading animation'),
    summary: loc('动画不是简化的电影——它的运动规律和角色设计有独立语法。', 'Animation is not simplified film — it has its own grammar of motion.'),
    outcomes: [
      loc('说出 4 个关键动画原则', '4 key animation principles'),
      loc('分析逐帧vs关键帧差异', 'Frame-by-frame vs keyframe'),
      loc('识别运动夸张', 'Spot exaggeration'),
    ],
    workIds: ['work-spirited-away'],
    domainIds: ['animation'],
    prerequisiteIds: ['lesson-composition', 'lesson-rhythm'],
  },
  {
    id: 'lesson-read-game',
    type: 'lesson', slug: 'reading-video-game',
    path: 'disciplines', order: 6, durationMin: 18, difficulty: 3,
    name: loc('如何阅读一款游戏', 'Reading a video game'),
    summary: loc('游戏的叙事不是被讲出来的——它是被玩出来的。', 'Game narrative is not told — it is played.'),
    outcomes: [
      loc('识别环境叙事', 'Spot env storytelling'),
      loc('说清两种 UI 边界', 'Diegetic vs non-diegetic'),
      loc('分析游戏 UI 层级', 'Analyze game UI hierarchy'),
    ],
    workIds: ['work-shadow-colossus', 'work-monument-valley'],
    domainIds: ['games'],
    prerequisiteIds: ['lesson-read-film', 'lesson-visual-hierarchy'],
  },
  {
    id: 'lesson-read-product',
    type: 'lesson', slug: 'reading-product',
    path: 'disciplines', order: 7, durationMin: 15, difficulty: 2,
    name: loc('如何阅读一个工业产品', 'Reading an industrial product'),
    summary: loc('形式追随功能不是口号——好产品的每个形态决定都可以追溯到使用场景。', 'Form follows function is not a slogan — every shape traces back to use.'),
    outcomes: [
      loc('拆解 3-5 个设计决定', '3-5 design decisions'),
      loc('说清 ergonomics 角色', 'Ergonomics role'),
      loc('对比两个产品哲学', 'Compare two product philosophies'),
    ],
    workIds: ['object-dieter-rams-tp1'],
    domainIds: ['industrial'],
    prerequisiteIds: ['lesson-form', 'lesson-material'],
  },

  // ===============================================================
  // L5 — Practice (phase 2 new)
  // ===============================================================
  {
    id: 'lesson-from-looking-to-making',
    type: 'lesson', slug: 'from-looking-to-making',
    path: 'practice', order: 1, durationMin: 22, difficulty: 3,
    name: loc('从看转向做：观看者成为创作者', 'From looking to making'),
    summary: loc('当你尝试自己做一件类似的——所有曾经看不懂的设计决定突然变清晰。', 'When you try "making something similar" — unclear choices become transparent.'),
    outcomes: [
      loc('拆解为可重做的子任务', 'Decompose into sub-tasks'),
      loc('说出 3 个"做了才懂"的细节', '3 post-making insights'),
      loc('建立拆→做→比→录循环', 'Decompose-redo-compare-log'),
    ],
    keyPrinciples: [
      loc('动手是最深的学习方式', 'Making is the deepest learning'),
      loc('拆解→重做→对比→记录四步循环', 'Decompose → redo → compare → log'),
      loc('做得像不是目标，理解为什么才是', 'Resemblance not goal; understanding why is'),
    ],
    workIds: ['work-mondrian-composition'],
    domainIds: ['creative-science'],
    prerequisiteIds: ['lesson-read-a-work', 'lesson-balance-emptiness'],
  },
  {
    id: 'lesson-dismantle-recombine',
    type: 'lesson', slug: 'dismantle-and-recombine',
    path: 'practice', order: 2, durationMin: 20, difficulty: 3,
    name: loc('拆解与重组：你的第一个风格实验', 'Dismantle and recombine: your first style experiment'),
    summary: loc('取 A 的构图、B 的色彩、C 的材质——重组出一件属于你但不是你的作品。', 'Take A’s composition, B’s color, C’s material — recombine into something yours but not yours.'),
    outcomes: [
      loc('选 3 个不同风格参考点', '3 refs from 3 styles'),
      loc('区分继承vs创造', 'Inheritance vs creation'),
      loc('完成重组并记录', 'Recombine + decision log'),
    ],
    domainIds: ['creative-science', 'design'],
    prerequisiteIds: ['lesson-from-looking-to-making', 'lesson-contrast'],
    recommendedNextIds: ['lesson-ukiyoe-ui', 'lesson-architecture-game'],
  },

  // ===============================================================
  // L6 — Cross (phase 2 new)
  // ===============================================================
  {
    id: 'lesson-ukiyoe-ui',
    type: 'lesson', slug: 'ukiyoe-meets-ui',
    path: 'cross', order: 1, durationMin: 22, difficulty: 4,
    name: loc('浮世绘 × UI：鸟瞰透视从版画到手机', 'Ukiyo-e × UI: bird’s-eye from prints to phones'),
    summary: loc('葛饰北斋的鸟瞰→包豪斯的扁平化→瑞士网格→iOS 界面——200 年跨学科旅行。', 'Hokusai’s bird’s-eye → Bauhaus flatness → Swiss grid → iOS — 200-year journey.'),
    outcomes: [
      loc('讲清 200 年演化链', 'Trace 200-year chain'),
      loc('在现代 UI 找浮世绘遗产', 'Find ukiyo-e in modern UI'),
      loc('完成浮世绘 UI 练习', 'Complete ukiyo-e UI exercise'),
    ],
    movementIds: ['movement-ukiyo-e', 'movement-bauhaus', 'cs-swiss'],
    workIds: ['work-great-wave'],
    domainIds: ['digital', 'design', 'visual-culture'],
    prerequisiteIds: ['lesson-modern-shatter', 'lesson-grid', 'lesson-dismantle-recombine'],
  },
  {
    id: 'lesson-architecture-game',
    type: 'lesson', slug: 'architecture-meets-game-space',
    path: 'cross', order: 2, durationMin: 24, difficulty: 4,
    name: loc('建筑 × 游戏空间：虚拟漫游从帕拉第奥到《塞尔达》', 'Architecture × game space: virtual promenade from Palladio to Zelda'),
    summary: loc('帕拉第奥的对称府邸→柯布西耶的建筑漫步→《塞尔达》的谜题空间——空间叙事的跨媒介史。', 'Palladian symmetry → Corbusier promenade → Zelda puzzle spaces — cross-media spatial narrative.'),
    outcomes: [
      loc('对比建筑/游戏空间体验', 'Compare arch vs game space'),
      loc('说清流线在两者中的工作方式', 'Circulation in both'),
      loc('设计迷你谜题空间', 'Design mini puzzle space'),
    ],
    workIds: ['building-villa-savoye', 'work-shadow-colossus'],
    domainIds: ['architecture', 'games'],
    prerequisiteIds: ['lesson-read-architecture', 'lesson-read-game', 'lesson-space'],
  },
  {
    id: 'lesson-film-light-rendering',
    type: 'lesson', slug: 'film-light-meets-3d-rendering',
    path: 'cross', order: 3, durationMin: 22, difficulty: 5,
    name: loc('电影光 × 3D 渲染：从维托里奥到实时光追', 'Film light × 3D rendering: from Vittorio to real-time ray tracing'),
    summary: loc('卡拉瓦乔的明暗对照→斯托拉罗的调色板→《银翼杀手 2049》→实时光线追踪——光的语言跨越四百年。', 'Caravaggio chiaroscuro → Storaro → Blade Runner 2049 → RT ray tracing — 400-year light language.'),
    outcomes: [
      loc('讲清 400 年光链', 'Trace 400-year light chain'),
      loc('说清两种布光核心差异', 'Core lighting difference'),
      loc('复现电影级布光', 'Reproduce film lighting'),
    ],
    workIds: ['work-calling-matthew', 'work-blade-runner'],
    domainIds: ['film', 'digital', 'creative-science'],
    prerequisiteIds: ['lesson-light', 'lesson-read-film', 'lesson-dismantle-recombine'],
  },
];

// ===============================================================
// New practices (补足到 14+)
// ===============================================================
export const PRACTICES_EXPANSION: PracticeEntity[] = [
  {
    id: 'practice-decompose-hierarchy',
    type: 'practice', slug: 'decompose-hierarchy',
    kind: 'analysis',
    minutes: 15, difficulty: 1,
    name: loc('拆解一张海报的层级', 'Decompose a poster’s hierarchy'),
    summary: loc('给一张你觉得好的海报画出层级草图。', 'Map the hierarchy of a poster you judge "good".'),
    brief: loc('打开任意一张设计良好的海报或杂志封面。写下第一眼→第二眼→第三眼→最后看到什么。画出视觉重量对比。', 'Open any well-designed poster. Jot first→second→third→last. Sketch weight layers.'),
    domainIds: ['creative-science', 'design'],
  },
  {
    id: 'practice-three-minute-look',
    type: 'practice', slug: 'three-minute-look',
    kind: 'observation',
    minutes: 10, difficulty: 1,
    name: loc('三分钟看画', 'Three-minute look'),
    summary: loc('三分钟不评价地看一张画——训练慢看能力。', 'Three minutes non-judgmental looking.'),
    brief: loc('选一张你已经知道的名画。三分钟内只记录"我看到什么"，不说"好不好"。然后对比看前和看后的印象差。', 'Pick a famous work. Three minutes, only "what do I see". Compare before/after.'),
    workIds: ['work-mona-lisa'],
    domainIds: ['creative-science'],
  },
  {
    id: 'practice-reverse-grid',
    type: 'practice', slug: 'reverse-engineer-grid',
    kind: 'analysis',
    minutes: 12, difficulty: 2,
    name: loc('反推一个界面的网格', 'Reverse-engineer an interface grid'),
    summary: loc('找一个信息清晰的界面截图，画出它背后的网格系统。', 'Find a clear UI screenshot; draw its underlying grid.'),
    brief: loc('用 Figma/PS/GIMP 打开截图拉辅助线：边界、列分界、对齐线。画完之后：什么对齐了网格？什么故意打破了？理由是什么？', 'Open in Figma/PS/GIMP, drop guides. After: what snaps? What breaks? Why?'),
    domainIds: ['creative-science', 'design', 'digital'],
  },
  {
    id: 'practice-light-photo',
    type: 'practice', slug: 'light-in-photography',
    kind: 'analysis',
    minutes: 10, difficulty: 2,
    name: loc('一张照片的光源分析', 'Light source in a photograph'),
    summary: loc('找一张你喜欢的人像照，分析光源方向、硬度和色温。', 'Pick a portrait; analyze light direction, hardness, temperature.'),
    brief: loc('5 分钟回答：光从哪来？硬光还是柔光？色温偏暖还是偏冷？主光补光比例大概多少？', 'In 5 minutes: where is light? Hard or soft? Warm or cool? Key-to-fill ratio?'),
    domainIds: ['photography', 'creative-science'],
  },
  {
    id: 'practice-cross-style-recombine',
    type: 'practice', slug: 'cross-style-recombine',
    kind: 'cross-style',
    minutes: 30, difficulty: 3,
    name: loc('跨风格重组练习', 'Cross-style recombination'),
    summary: loc('取三个不同风格参考点，重组出一件小作品。', 'Take three style refs, recombine into one small work.'),
    brief: loc('选构图参考（如蒙德里安格子）、色彩参考（如高更南太平洋）、质感参考（如粗野主义混凝土）。创作一个 200×200 作品。写下继承了什么、加了什么。', 'Comp ref (Mondrian), color ref (Gauguin), material ref (brutalist). Make a 200×200 work. Log inheritance vs additions.'),
    domainIds: ['creative-science', 'design'],
  },
  {
    id: 'practice-architecture-circulation',
    type: 'practice', slug: 'architecture-circulation',
    kind: 'analysis',
    minutes: 15, difficulty: 2,
    name: loc('画一张建筑流线图', 'Draw an architecture circulation map'),
    summary: loc('选一座公共建筑，画一张"人怎么流"的图。', 'Pick a public building; draw its circulation.'),
    brief: loc('在草图上标出入口、通道、转角、停留点。然后画你的"理想流线"——如果重新设计你会怎么引导人？', 'Sketch: entry, paths, turns, stops. Then draw "ideal circulation" — how would you redirect people?'),
    domainIds: ['architecture'],
  },
];
