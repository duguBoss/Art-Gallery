import type { JourneyEntity } from '../../model/entity';
import { loc } from '../../model/i18n';

/**
 * Cross-discipline learning journeys — master plan §14b (phase 2).
 * Seven ordered threads mixing concepts, works and lessons, each
 * traversing one super-chain or one cross-discipline axis.
 */
export const JOURNEYS: JourneyEntity[] = [
  // ===============================================================
  // 1 — 光的旅行
  // ===============================================================
  {
    id: 'journey-light',
    type: 'journey', slug: 'light-journey',
    name: loc('光的旅行：从卡拉瓦乔到实时光追', 'The light journey: from Caravaggio to real-time ray tracing'),
    tagline: loc('一条横贯绘画、建筑、摄影、电影、3D 的线索', 'One thread across painting, architecture, photography, film and 3D'),
    summary: loc('光是所有视觉的媒介。沿着光的超级链走四百年：卡拉瓦乔的明暗对照→维托里奥·斯托拉罗的调色板→《银翼杀手》的霓虹雨→实时光线追踪。', 'Light is the medium behind every image. Four centuries along the light super-chain: Caravaggio chiaroscuro → Storaro palettes → Blade Runner neon rain → real-time ray tracing.'),
    body: [loc('这条旅程不是"艺术史课"——它是一次"追光"。你会看到同一种光如何在不同介质中被重新发明：油画里是罩染，建筑里是天光，照片里是快门，电影里是布光，3D 里是物理模拟。', 'This journey is not art history — it is a light chase. See how one light is reinvented in each medium: glazes in oil, skylight in architecture, shutter in photography, lighting in film, physics simulation in 3D.')],
    accent: '#f4d840',
    palette: ['#f4d840', '#c03028', '#1a1a1a', '#2a4a8c'],
    domainIds: ['arts', 'architecture', 'photography', 'film', 'digital', 'creative-science'],
    conceptIds: ['c-light'],
    tags: ['光', '超级链', '跨学科'],
    sources: [],
    weight: 92,
    featured: true,
    stops: [
      {
        id: 'l-start',
        title: loc('起点：卡拉瓦乔与明暗对照法', 'Start: Caravaggio and chiaroscuro'),
        lead: loc('一束光从右上打入黑暗，马太的脸被"指名"——光即叙事。', 'A beam enters dark from upper right; Matthew’s face is "named" — light as narrative.'),
        entityIds: ['work-calling-matthew', 'person-caravaggio', 'tech-chiaroscuro', 'c-light'],
      },
      {
        id: 'l-architecture',
        title: loc('建筑：光的容器', 'Architecture: vessel of light'),
        lead: loc('包豪斯玻璃车间——整面幕墙把建筑变成光的容器。', 'Bauhaus workshop — the whole curtain makes the building a vessel.'),
        entityIds: ['building-bauhaus-dessau', 'lesson-light', 'lesson-read-architecture'],
      },
      {
        id: 'l-photo',
        title: loc('摄影：快门决定的瞬间', 'Photography: the shutter’s instant'),
        lead: loc('快门速度 + 光圈 + 感光度 = 曝光三角——摄影用光的语法。', 'Shutter + aperture + ISO = exposure triangle — photography’s light grammar.'),
        entityIds: ['lesson-read-photo', 'mat-film-silver', 'lesson-what-is-seeing'],
      },
      {
        id: 'l-film',
        title: loc('电影：光的导演', 'Film: director of light'),
        lead: loc('《银翼杀手 2049》的霓虹雨——电影用光不是记录，是"导演"情绪。', 'Blade Runner 2049 neon rain — film lighting doesn’t record; it directs emotion.'),
        entityIds: ['work-blade-runner', 'c-cinematography', 'lesson-read-film'],
      },
      {
        id: 'l-3d',
        title: loc('3D：光的物理模拟', '3D: physics simulation of light'),
        lead: loc('光线追踪 = 模拟真实光子。这条路从离线渲染走到了实时。', 'Ray tracing = simulating real photons. This path went from offline to real-time.'),
        entityIds: ['tech-realtime-rendering', 'work-journey-game', 'lesson-film-light-rendering'],
      },
    ],
  },

  // ===============================================================
  // 2 — 色彩：从颜料到像素
  // ===============================================================
  {
    id: 'journey-color',
    type: 'journey', slug: 'color-journey',
    name: loc('色彩的旅行：从矿石颜料到数字色深', 'The color journey: from mineral pigments to digital color depth'),
    tagline: loc('颜料→油料→银盐→传感器→像素——材料的演化决定了色彩的边界', 'Pigment → oil → silver → sensor → pixels — material evolution defines color boundaries'),
    summary: loc('为什么古埃及壁画只有 6 种颜色？因为他们只有 6 种矿物。为什么印象派突然变得明亮？因为他们有了新的合成颜料。为什么你的手机能显示 1600 万色？因为像素。', 'Why did Egyptian murals have only 6 colors? Six minerals. Why did Impressionism suddenly brighten? New synthetic pigments. Why can your phone show 16 million? Pixels.'),
    accent: '#e02828',
    palette: ['#e02828', '#f0a040', '#f4d840', '#3070a8'],
    domainIds: ['arts', 'photography', 'digital', 'creative-science'],
    tags: ['色彩', '材料', '超级链'],
    sources: [],
    weight: 85,
    stops: [
      {
        id: 'c-pigment',
        title: loc('矿石颜料：手磨出来的色彩', 'Mineral pigments: hand-ground color'),
        lead: loc('赭石、群青、胭脂虫——每种颜色都是一场矿物或昆虫的狩猎。', 'Ochre, ultramarine, cochineal — each color was a hunt for mineral or insect.'),
        entityIds: ['mat-pigment', 'lesson-color'],
      },
      {
        id: 'c-oil',
        title: loc('油画颜料：慢干的革命', 'Oil paint: the slow-dry revolution'),
        lead: loc('蛋彩快干不可改，油画慢干可罩染——深度因此诞生。', 'Tempera dries fast and can’t be altered; oil dries slow and glazes — depth is born.'),
        entityIds: ['mat-oil-paint', 'work-starry-night', 'work-mona-lisa'],
      },
      {
        id: 'c-photo',
        title: loc('银盐胶片：卤化银的化学反应', 'Silver film: halide chemistry'),
        lead: loc('胶片的色彩不是被"记录"的——它是被"化学显影"的。', 'Film color is not "recorded" — it is "chemically developed".'),
        entityIds: ['mat-film-silver', 'lesson-read-photo'],
      },
      {
        id: 'c-sensor',
        title: loc('图像传感器：光→电信号', 'Image sensor: light → electrical signal'),
        lead: loc('每个像素是一个光子计数器。色彩从化学反应变成了数学计算。', 'Each pixel is a photon counter. Color moved from chemistry to mathematics.'),
        entityIds: ['mat-image-sensor', 'mat-code-pixels'],
      },
      {
        id: 'c-digital',
        title: loc('数字色彩：1600 万的边界', 'Digital color: the 16-million boundary'),
        lead: loc('sRGB / P3 / Display P3——数字色彩的边界是显示器的色域。', 'sRGB / P3 / Display P3 — digital color’s boundary is the display gamut.'),
        entityIds: ['c-digital-color', 'product-swatch-atlas'],
      },
    ],
  },

  // ===============================================================
  // 3 — 几何
  // ===============================================================
  {
    id: 'journey-geometry',
    type: 'journey', slug: 'geometry-journey',
    name: loc('几何的旅行：从帕特农神庙到苹果界面', 'The geometry journey: from Parthenon to Apple interfaces'),
    tagline: loc('几何是所有视觉的底层语言——从神庙柱子到手机图标', 'Geometry is vision’s underlying language — from temple columns to phone icons'),
    summary: loc('帕特农神庙的黄金比例→文艺复兴的透视→立体主义的碎面→蒙德里安的正交线→包豪斯的工业设计→瑞士网格→iOS 扁平化——2500 年几何的简化与重来。', 'Parthenon golden ratio → Renaissance perspective → Cubist facets → Mondrian orthogonals → Bauhaus industrial design → Swiss grid → iOS flat — 2500 years of geometric simplification and restart.'),
    accent: '#303a8c',
    palette: ['#303a8c', '#e02828', '#f4d840', '#1a1a1a'],
    domainIds: ['architecture', 'arts', 'design', 'digital', 'art-history'],
    tags: ['几何', '超级链', '跨学科'],
    sources: [],
    weight: 90,
    featured: true,
    stops: [
      {
        id: 'g-parthenon',
        title: loc('起点：帕特农神庙', 'Start: the Parthenon'),
        lead: loc('柱距、角柱加粗、线条微凸——这座庙是一整套视错觉工程。', 'Column spacing, thickened corner columns, bowed lines — this temple is an optical engineering system.'),
        entityIds: ['building-parthenon', 'period-classical'],
      },
      {
        id: 'g-renaissance',
        title: loc('文艺复兴：透视的诞生', 'Renaissance: perspective is born'),
        lead: loc('布鲁内莱斯基的镜子实验——画面第一次成为可测量的空间。', 'Brunelleschi’s mirror — picture becomes measurable space for the first time.'),
        entityIds: ['movement-renaissance', 'lesson-renaissance-humanism', 'c-perspective'],
      },
      {
        id: 'g-cubism',
        title: loc('立体主义：打碎透视', 'Cubism: shattering perspective'),
        lead: loc('毕加索把多视点压进一个平面——透视不再是唯一真理。', 'Picasso compresses multiple viewpoints into one plane — perspective is no longer the only truth.'),
        entityIds: ['movement-cubism', 'work-demoiselles', 'lesson-modern-shatter'],
      },
      {
        id: 'g-grid',
        title: loc('包豪斯→瑞士：网格即秩序', 'Bauhaus → Swiss: grid is order'),
        lead: loc('蒙德里安的正交线→包豪斯的工业设计→瑞士学派的网格系统——秩序从艺术变成了工具。', 'Mondrian orthogonals → Bauhaus industrial design → Swiss grid — order becomes a tool.'),
        entityIds: ['movement-bauhaus', 'atom-swiss-grid', 'cs-swiss', 'lesson-grid'],
      },
      {
        id: 'g-ui',
        title: loc('终点：数字界面', 'End: digital interfaces'),
        lead: loc('苹果 HIG 的 8pt 栅格、Material Design 的 Material You——几何回到了每个人的口袋。', 'Apple HIG 8pt grid, Material Design — geometry in every pocket.'),
        entityIds: ['c-digital-interface', 'lesson-ai-literacy'],
      },
    ],
  },

  // ===============================================================
  // 4 — 空间
  // ===============================================================
  {
    id: 'journey-space',
    type: 'journey', slug: 'space-journey',
    name: loc('空间的旅行：从教堂到游戏', 'The space journey: from cathedrals to games'),
    tagline: loc('空间不是"空的"——它是被人设计出来的体验', 'Space is not "empty" — it is a designed experience'),
    summary: loc('线性透视vs鸟瞰视角vs流线——不同文明和时代用不同的语法组织空间。', 'Linear perspective vs bird’s-eye vs circulation — each civilization and era organizes space with its own grammar.'),
    accent: '#4f7a6a',
    palette: ['#4f7a6a', '#e8d9b0', '#1a1a1a'],
    domainIds: ['architecture', 'games', 'art-history', 'creative-science'],
    tags: ['空间', '建筑', '游戏'],
    sources: [],
    weight: 80,
    stops: [
      {
        id: 's-europe',
        title: loc('欧洲：单点透视', 'Europe: single-point perspective'),
        lead: loc('文艺复兴把观看者置于世界中心——所有线向一点会聚。', 'Renaissance puts viewer at center — all lines converge to one point.'),
        entityIds: ['c-perspective', 'lesson-space', 'work-last-supper'],
      },
      {
        id: 's-asia',
        title: loc('亚洲：移动视点', 'Asia: moving viewpoint'),
        lead: loc('浮世绘的鸟瞰、中国长卷的移步换景——没有灭点，用眼睛移动制造空间。', 'Ukiyo-e bird’s-eye, Chinese handscroll moving viewpoint — no vanishing point, space through eye movement.'),
        entityIds: ['work-great-wave', 'movement-ukiyo-e', 'lesson-ukiyoe-ui'],
      },
      {
        id: 's-modern',
        title: loc('现代建筑：流线', 'Modern architecture: circulation'),
        lead: loc('萨伏伊别墅的坡道、流水别墅的瀑布——空间被体验，不被观看。', 'Villa Savoye ramp, Fallingwater waterfall — space is experienced, not viewed.'),
        entityIds: ['building-villa-savoye', 'building-fallingwater', 'lesson-read-architecture'],
      },
      {
        id: 's-game',
        title: loc('游戏：交互空间', 'Games: interactive space'),
        lead: loc('《塞尔达》的谜题房间、《纪念碑谷》的不可能几何——空间变成了谜题本身。', 'Zelda puzzle rooms, Monument Valley impossible geometry — space is the puzzle.'),
        entityIds: ['work-shadow-colossus', 'work-monument-valley', 'lesson-architecture-game'],
      },
      {
        id: 's-crossover',
        title: loc('交叉：浮世绘的鸟瞰如何到达 UI', 'Crossover: ukiyo-e bird’s-eye reaches UI'),
        lead: loc('从葛饰北斋到 iOS 的扁平化——200 年几何线索的终点是你的手机。', 'From Hokusai to iOS flat design — the 200-year geometric thread ends in your phone.'),
        entityIds: ['movement-ukiyo-e', 'lesson-ukiyoe-ui', 'c-digital-interface'],
      },
    ],
  },

  // ===============================================================
  // 5 — 叙事
  // ===============================================================
  {
    id: 'journey-narrative',
    type: 'journey', slug: 'narrative-journey',
    name: loc('叙事的旅行：从单幅画到交互故事', 'The narrative journey: from single paintings to interactive stories'),
    tagline: loc('一张画选哪一秒来暗示前因后果', 'Which second does one image pick to imply before and after'),
    summary: loc('《大卫》选出剑前一秒，《圣马太蒙召》选手指点出的一秒——未完成的瞬间让观众补完故事。然后是电影的 24 帧、动画的 12 原则、游戏的环境叙事。', 'David picks the pre-sling second, The Calling the pointing instant — unresolved moments make viewers complete the story. Then 24fps film, 12 animation principles, game environmental storytelling.'),
    accent: '#a05028',
    palette: ['#a05028', '#c0c0c0', '#1a1a1a'],
    domainIds: ['arts', 'film', 'animation', 'games', 'visual-culture'],
    tags: ['叙事', '故事', '跨学科'],
    sources: [],
    weight: 88,
    stops: [
      {
        id: 'n-painting',
        title: loc('单幅画：哪一秒？', 'Single painting: which second?'),
        lead: loc('最好的叙事瞬间是"将要发生"——让你在脑中补完。', 'The strongest narrative instant is "about to happen" — you complete it in your head.'),
        entityIds: ['work-david', 'work-calling-matthew', 'lesson-narrative', 'c-sublime', 'dp-movement'],
      },
      {
        id: 'n-series',
        title: loc('浮世绘系列：旅行即叙事', 'Ukiyo-e series: travel as narrative'),
        lead: loc('36 个富士山 = 36 个旅行瞬间——重复的山，变化的人间。', '36 Fujis = 36 travel instants — the mountain repeats, the human world changes.'),
        entityIds: ['work-great-wave', 'movement-ukiyo-e'],
      },
      {
        id: 'n-film',
        title: loc('电影：24 帧/秒', 'Film: 24fps'),
        lead: loc('每秒 24 张静止画面被大脑拼成运动——电影叙事的物理基础。', '24 still images per second stitched into motion by the brain — film narrative’s physical base.'),
        entityIds: ['lesson-read-film', 'work-blade-runner'],
      },
      {
        id: 'n-animation',
        title: loc('动画：运动即表演', 'Animation: motion as performance'),
        lead: loc('迪斯尼 12 原则——挤压与拉伸、预期、次级运动——动画让物体"演"出性格。', 'Disney 12 principles — squash & stretch, anticipation, secondary motion — animation makes objects "act".'),
        entityIds: ['lesson-read-animation', 'work-spirited-away'],
      },
      {
        id: 'n-game',
        title: loc('游戏：你就是叙事者', 'Games: you are the narrator'),
        lead: loc('环境叙事 = 场景替人物讲故事。你走过每一个空间，自己拼凑完整故事。', 'Environmental storytelling = scenes tell the story for characters. You walk each space, assembling the narrative yourself.'),
        entityIds: ['lesson-read-game', 'work-shadow-colossus'],
      },
    ],
  },

  // ===============================================================
  // 6 — 材料
  // ===============================================================
  {
    id: 'journey-material',
    type: 'journey', slug: 'material-journey',
    name: loc('材料的旅行：从大理石到像素', 'The material journey: from marble to pixels'),
    tagline: loc('每种材料都定义了"完成"是什么', 'Every material defines what "finished" means'),
    summary: loc('《大卫》的半光泽是大理石的馈赠，《星月夜》的厚涂是颜料的挑衅，游戏的多边形是算力的限制——材料既是约束也是灵感。', 'David’s semi-polish is marble’s gift; Starry Night’s impasto is paint’s provocation; game polygons are compute limits — material is both constraint and inspiration.'),
    accent: '#6a5440',
    palette: ['#6a5440', '#e8d9b0', '#c0c0c0', '#1a1a1a'],
    domainIds: ['arts', 'craft', 'digital', 'photography'],
    tags: ['材料', '工艺', '数字'],
    sources: [],
    weight: 82,
    stops: [
      {
        id: 'marble',
        title: loc('大理石：半透明的皮肤', 'Marble: translucent skin'),
        lead: loc('米开朗基罗说他只是把大卫从大理石里解放出来——半透明性让皮肤能反光。', 'Michelangelo said he only freed David from marble — translucency lets skin reflect light.'),
        entityIds: ['mat-marble', 'work-david', 'lesson-material'],
      },
      {
        id: 'oil',
        title: loc('油画颜料：厚涂与罩染', 'Oil paint: impasto and glaze'),
        lead: loc('厚涂（Van Gogh）= 颜料的身体感；罩染（Renaissance）= 光穿过色层的深度。', 'Impasto (Van Gogh) = paint’s body; glaze (Renaissance) = light-through-color depth.'),
        entityIds: ['mat-oil-paint', 'work-starry-night', 'work-mona-lisa'],
      },
      {
        id: 'ceramic',
        title: loc('陶瓷：烧制即命运', 'Ceramic: firing is destiny'),
        lead: loc('陶土 + 釉 + 窑 = 不可预测的化学反应。陶艺的魅力在于接受意外。', 'Clay + glaze + kiln = unpredictable chemistry. Ceramics charm is accepting accident.'),
        entityIds: ['mat-ceramic', 'lesson-composition'],
      },
      {
        id: 'digital',
        title: loc('像素：数字材料的脾气', 'Pixels: digital material’s temper'),
        lead: loc('像素是均匀的、可复制的、0 和 1 的——它定义了扁平、锐利、无限缩放。', 'Pixels are uniform, replicable, 0s and 1s — they define flat, sharp, infinitely scalable.'),
        entityIds: ['mat-code-pixels', 'c-digital-color', 'lesson-from-looking-to-making'],
      },
      {
        id: 'm-crossover',
        title: loc('交叉：数字材料回到物理', 'Crossover: digital material returns to physical'),
        lead: loc('3D 打印 = 像素变回物质；AR = 数字材料覆盖物理表面。材料的边界在溶解。', '3D printing = pixels become matter again; AR = digital overlays physical surfaces. Material borders dissolve.'),
        entityIds: ['tech-realtime-rendering', 'product-motion-pack', 'lesson-dismantle-recombine'],
      },
    ],
  },

  // ===============================================================
  // 7 — 节奏
  // ===============================================================
  {
    id: 'journey-rhythm',
    type: 'journey', slug: 'rhythm-journey',
    name: loc('节奏的旅行：从神庙柱列到动效曲线', 'The rhythm journey: from temple columns to motion curves'),
    tagline: loc('静态画面里的节拍——眼睛跟着节奏呼吸', 'A beat in still images — the eye breathes with rhythm'),
    summary: loc('帕特农神庙柱列等距但角柱加粗——视觉渐强。瑞士网格的 12 栏是沉默的节奏。迪斯尼动画的 12 原则里"节奏"是核心。动效曲线让界面会呼吸。', 'Parthenon colonnade equal-spacing but thickened corner columns — visual crescendo. Swiss 12-col grid is silent rhythm. Disney 12 principles center rhythm. Motion curves let interfaces breathe.'),
    accent: '#7a3b34',
    palette: ['#7a3b34', '#e8d9b0', '#1a1a1a', '#c0c0c0'],
    domainIds: ['architecture', 'design', 'animation', 'digital', 'film'],
    tags: ['节奏', '音乐性', '动效'],
    sources: [],
    weight: 78,
    stops: [
      {
        id: 'temple',
        title: loc('神庙柱列：渐强', 'Temple colonnade: crescendo'),
        lead: loc('帕特农的柱距相等，但角柱加粗、末间收窄——眼睛感到"渐强"。', 'Parthenon columns equally spaced, but corner columns thicker, end bays tighter — eye feels crescendo.'),
        entityIds: ['building-parthenon', 'lesson-rhythm'],
      },
      {
        id: 'grid',
        title: loc('瑞士网格：沉默的节奏', 'Swiss grid: silent rhythm'),
        lead: loc('12 栏 × 8px 栅格——网格本身没有节奏，但你的眼睛在其中找到了。', '12-col × 8px grid — the grid itself has no rhythm, but your eye finds one in it.'),
        entityIds: ['atom-swiss-grid', 'cs-swiss', 'lesson-grid'],
      },
      {
        id: 'animation',
        title: loc('动画节奏：12 原则中的节拍', 'Animation rhythm: beat in the 12 principles'),
        lead: loc('挤压与拉伸、预期、跟随与重叠——动画的节奏让物体"活"起来。', 'Squash & stretch, anticipation, follow-through — animation rhythm makes objects "live".'),
        entityIds: ['lesson-read-animation', 'work-spirited-away'],
      },
      {
        id: 'motion',
        title: loc('动效曲线：界面的呼吸', 'Motion curves: interface’s breath'),
        lead: loc('Framer Motion 的 24 条缓动曲线——ease-out 表示开始快、结束慢，像呼吸。', '24 Framer Motion easing curves — ease-out means start fast, end slow, like breathing.'),
        entityIds: ['product-motion-pack', 'dp-rhythm'],
      },
      {
        id: 'r-connect',
        title: loc('联结：节奏贯穿所有媒介', 'Connection: rhythm runs through every medium'),
        lead: loc('从神庙柱列的等距张力，到动效曲线的呼吸——节奏让静态和动态的东西都活起来。', 'From colonnade spacing tension to motion curve breathing — rhythm animates both static and dynamic things.'),
        entityIds: ['lesson-rhythm', 'cs-editorial', 'lesson-grid'],
      },
    ],
  },
];
