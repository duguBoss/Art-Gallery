import type { EntityBase } from '../../model/entity';
import { loc } from '../../model/i18n';

/**
 * Digital & new-media corpus: the concepts (pixel, vector, raster,
 * pipeline, shader, digital color), the techniques (real-time rendering,
 * ray tracing, modeling), and the three machines that put the graphical
 * user interface and the web on the planet. Objects are text-first — the
 * historical interface is told in prose rather than pictures.
 */
export const DIGITAL_MEDIA = [
  // ================================================================ concepts
  {
    id: 'c-pixel',
    type: 'concept',
    slug: 'pixel',
    name: loc('像素', 'Pixel'),
    tagline: loc('数字图像的原子', 'The atom of the digital image'),
    summary: loc('“picture element”的缩写：屏幕上最小的可寻址色点。每个像素只持有一个色值，整幅图像由此被拼成——限制即风格。', 'Short for “picture element”: the smallest addressable color dot on a screen. Each pixel holds one color value and the whole image is assembled from them — limitation becomes style.'),
    body: [
      loc('像素把连续的视觉世界切分成离散网格：分辨率就是颗粒度。早期计算机内存昂贵，屏幕只有数百像素，程序员被迫用极少的方块讲故事——像素艺术（pixel art）由此诞生，并在游戏中成为长寿的美学。', 'The pixel cuts the continuous visual world into a discrete grid; resolution is its granularity. When memory was scarce and screens held only a few hundred dots, programmers had to tell stories with very few squares — pixel art was born, and became a durable game aesthetic.'),
      loc('像素与矿物颜料是同一种思维的两端：都把“颜色”绑定到最小单位上——一个是石青颗粒，一个是 RGB 色值。', 'The pixel and mineral pigment are two ends of one way of thinking: color bound to a smallest unit — a grain of azurite or an RGB value.'),
    ],
    facts: [
      { label: loc('词源', 'Etymology'), value: loc('picture + element 缩合，1965 年出现', 'Coined from picture + element, c. 1965') },
      { label: loc('常见分辨率', 'Common grids'), value: loc('512×342（Mac 1984）→ 4K 约 830 万像素', '512×342 (Mac 1984) to ~8.3 million at 4K') },
    ],
    palette: ['#ff5d5d', '#ffd166', '#06d6a0', '#118ab2', '#22223b'],
    domainIds: ['digital', 'design', 'games'],
    materialIds: ['mat-code-pixels'],
    tags: ['像素', '数字图像', '基础'],
    modes: ['network', 'detail'],
  },
  {
    id: 'c-vector',
    type: 'concept',
    slug: 'vector',
    name: loc('矢量', 'Vector'),
    tagline: loc('用数学描述形状', 'Shape described by mathematics'),
    summary: loc('点、线、贝塞尔曲线与填充方程：图形不存像素而存公式，可以无限放大而不失真——字体、logo 与插画的语言。', 'Points, lines, Bézier curves and fill equations: graphics stored as formulas rather than pixels, scalable without loss — the language of type, logos and illustration.'),
    body: [
      loc('矢量文件记录“从 A 点到 B 点画一条三次贝塞尔曲线”，而不记录这条线覆盖了哪些像素。因此它在邮票和广告牌上同样锐利。PostScript（1984）让矢量描述可以驱动激光打印，现代界面的字体与图标几乎都是矢量。', 'A vector file records “draw a cubic Bézier from A to B” rather than which pixels the line covers, so it is equally sharp on a stamp and a billboard. PostScript (1984) let vector descriptions drive laser printing; nearly all interface type and icons are vectors today.'),
      loc('矢量与栅格的分工塑造了整个软件生态：Illustrator 管公式，Photoshop 管像素；游戏用矢量 UI 搭界面，用栅格纹理贴模型。', 'The vector–raster division shaped the whole software ecosystem: Illustrator owns formulas, Photoshop owns pixels; games build interfaces in vector and skin models in raster.'),
    ],
    facts: [
      { label: loc('核心工具', 'Core primitive'), value: loc('贝塞尔曲线（1962，雷诺汽车工程师）', 'Bézier curves, 1962, Renault engineer') },
      { label: loc('代表格式', 'Formats'), value: loc('SVG、PDF、EPS、字体轮廓', 'SVG, PDF, EPS, font outlines') },
    ],
    palette: ['#ff3b30', '#0a84ff', '#34c759', '#ffd60a', '#1c1c1e'],
    domainIds: ['digital', 'design'],
    tags: ['矢量', '贝塞尔', '基础'],
    modes: ['comparison', 'detail'],
  },
  {
    id: 'c-raster',
    type: 'concept',
    slug: 'raster',
    name: loc('栅格', 'Raster'),
    tagline: loc('图像是一张色值网格', 'An image as a grid of color values'),
    summary: loc('按行列排列的像素数组：照片、扫描件与屏幕内容都是栅格。它忠于采样，但放大即暴露颗粒——与矢量互为镜像。', 'A row-by-column array of pixels: photographs, scans and screen content are rasters. Faithful to the sample, it reveals grain when enlarged — vector’s mirror image.'),
    body: [
      loc('栅格图像的起点是采样：相机传感器把光的连续场读成点阵，屏幕再把点阵还原成光。每一步都有分辨率与位深的取舍。理解栅格就理解了摄影与数字图像的共同骨架。', 'Raster imagery begins with sampling: a camera sensor reads the continuous field of light into a dot array, and a screen reads the array back as light. Every step trades off resolution and bit depth. Understanding the raster is understanding photography and digital imaging’s shared skeleton.'),
      loc('“矢量放大无损、栅格放大糊”是设计课的第一组对比，但真相是所有屏幕最终都显示栅格——矢量必须先被光栅化。', '“Vectors scale, rasters blur” is the first design-class contrast, but every screen ultimately shows rasters — vectors must first be rasterized.'),
    ],
    facts: [
      { label: loc('别名', 'Also called'), value: loc('位图（bitmap）', 'Bitmap') },
      { label: loc('来源', 'Sources'), value: loc('相机传感器、扫描仪、光栅化', 'Camera sensors, scanners, rasterization') },
    ],
    palette: ['#8e9aaf', '#c8b8db', '#4a4e69', '#22223b', '#f2e9e4'],
    domainIds: ['digital', 'design', 'photography'],
    materialIds: ['mat-code-pixels', 'mat-image-sensor'],
    tags: ['栅格', '位图', '基础'],
    modes: ['comparison', 'detail'],
  },
  {
    id: 'c-rendering-pipeline',
    type: 'concept',
    slug: 'rendering-pipeline',
    name: loc('渲染管线', 'Rendering Pipeline'),
    tagline: loc('三维场景变成像素的流水线', 'The assembly line turning a 3D scene into pixels'),
    summary: loc('从三维数据到屏幕帧的固定工序：顶点变换 → 光照 → 光栅化 → 逐像素着色 → 帧缓冲。实时与离线渲染共用同一副骨架。', 'The fixed sequence from 3D data to a screen frame: vertex transform → lighting → rasterization → per-pixel shading → framebuffer. Real-time and offline rendering share one skeleton.'),
    body: [
      loc('管线是计算机图形学的核心隐喻：场景是数据，流过一系列阶段，每个阶段只做一件事。实时管线为每秒 60 帧做减法（先光栅化再着色），离线光追为质量做加法（逐光线追踪物理），但它们的输入输出契约相同——这让游戏与电影特效可以互相借鉴。', 'The pipeline is computer graphics’ master metaphor: the scene is data flowing through stages, each doing one job. Real-time pipelines subtract for 60 frames per second (rasterize then shade); offline ray tracers add for quality (trace light physically) — but their input/output contract is identical, which lets games and VFX borrow from each other.'),
      loc('理解管线就理解了为什么游戏画面是“骗术”的艺术：烘焙光照、LOD、遮挡剔除——所有技巧都是在帧预算 16 毫秒内完成同一件事：让像素可信。', 'Understanding the pipeline reveals game imagery as an art of the well-placed cheat: baked lighting, LODs, occlusion culling — every trick does one thing within the 16-millisecond frame budget: make pixels believable.'),
    ],
    facts: [
      { label: loc('阶段', 'Stages'), value: loc('顶点 → 图元装配 → 光栅化 → 片段着色 → 输出合并', 'Vertices → assembly → rasterization → fragment shading → output') },
      { label: loc('帧预算', 'Frame budget'), value: loc('60 fps = 每帧 16.7 毫秒', '60 fps = 16.7 ms per frame') },
    ],
    palette: ['#0f4c81', '#2f9c9e', '#ff7f50', '#2b2d42', '#edf2f4'],
    domainIds: ['digital', 'games', 'animation', 'creative-science'],
    tags: ['渲染', '管线', '图形学'],
    modes: ['process', 'network'],
  },
  {
    id: 'c-shader',
    type: 'concept',
    slug: 'shader',
    name: loc('着色器', 'Shader'),
    tagline: loc('在 GPU 上运行的视觉公式', 'A visual formula running on the GPU'),
    summary: loc('运行在显卡上的微型程序：顶点着色器决定像素去哪，片段着色器决定像素是什么颜色——游戏、特效与生成艺术的共同画笔。', 'Tiny programs running on the graphics card: vertex shaders decide where pixels go, fragment shaders decide what color they become — the shared brush of games, VFX and generative art.'),
    body: [
      loc('着色器把“材质”从贴图升级为代码：光如何散射、金属如何反射、皮肤如何透光，都写成对每个像素并行执行的公式。写 shader 的艺术家像陶瓷匠人配釉——参数即釉方，GPU 即窑火。', 'Shaders upgraded material from texture to code: how light scatters, metal reflects, skin transmits — written as formulas executed in parallel for every pixel. A shader artist is like a potter compounding glaze: parameters are the recipe, the GPU the kiln.'),
      loc('Demoscene 文化证明了 shader 的表达极限：几十 KB 的程序实时算出整个光影世界。生成艺术家则在浏览器里用 WebGL 直接发布可交互的视觉实验。', 'The demoscene proved shaders’ expressive limit: a few dozen kilobytes compute entire lit worlds in real time; generative artists publish interactive visual experiments straight in the browser with WebGL.'),
    ],
    facts: [
      { label: loc('两类', 'Two classes'), value: loc('顶点着色器（位置）+ 片段/像素着色器（颜色）', 'Vertex (position) + fragment/pixel (color)') },
      { label: loc('语言', 'Languages'), value: loc('GLSL、HLSL、Metal Shading Language', 'GLSL, HLSL, Metal Shading Language') },
    ],
    palette: ['#7b2cbf', '#00b4d8', '#ff006e', '#001d3d', '#ffbe0b'],
    domainIds: ['digital', 'games', 'animation', 'creative-science'],
    materialIds: ['mat-code-pixels'],
    conceptIds: ['c-digital-color'],
    tags: ['着色器', 'GPU', '图形学'],
    modes: ['process', 'detail'],
  },
  {
    id: 'c-digital-color',
    type: 'concept',
    slug: 'digital-color',
    name: loc('数字色彩', 'Digital Color'),
    tagline: loc('每一种颜色都变成了数字', 'Every color becomes a number'),
    summary: loc('RGB 三通道、位深、色域与色彩空间：屏幕把颜色编码为数值，8 bit 每通道可表示约 1677 万种颜色——色彩第一次脱离材料而存在。', 'RGB channels, bit depth, gamut and color spaces: screens encode color as numbers, 8 bits per channel yielding ~16.77 million colors — for the first time color exists without material.'),
    body: [
      loc('矿物颜料的颜色由分子结构决定，靛蓝的颜色由氧化反应决定；数字色彩由一个三元数组决定。sRGB 规定了“数字 255,0,0 是怎样一种红”，而广色域 P3 让屏幕能显示印刷品永远达不到的荧光色。色彩管理的全部工作，就是让这个数字在不同设备上被翻译成同一种感受。', 'Mineral pigment color is fixed by molecular structure, indigo by oxidation; digital color is fixed by a triplet of numbers. sRGB defines exactly what red “255,0,0” is, while wide-gamut P3 lets screens show fluorescent colors print can never reach. All of color management translates this number into the same sensation across devices.'),
      loc('数字色彩不是对材料色彩的背叛，而是它的抽象：达芬奇为颜料建立色阶，染匠为靛蓝建立缸次，调色师为画面建立 LUT——都是把颜色组织成可复现的系统。超级链在此闭合：从石青颗粒到 RGB 数值，颜色始终是一种“被材料定义的关系”。', 'Digital color is not a betrayal of material color but its abstraction: Leonardo organized paint into tonal scales, dyers into indigo dippings, colorists into LUTs — all organizing color into reproducible systems. The superchain closes here: from azurite grains to RGB values, color remains a relationship defined by its material.'),
    ],
    facts: [
      { label: loc('色彩模型', 'Model'), value: loc('RGB 加色（屏幕）；CMYK 减色（印刷）', 'RGB additive (screen); CMYK subtractive (print)') },
      { label: loc('位深', 'Bit depth'), value: loc('8 bit/通道 ≈ 1677 万色；10 bit ≈ 10.7 亿色', '8-bit ≈ 16.77M colors; 10-bit ≈ 1.07B') },
      { label: loc('色空间', 'Color spaces'), value: loc('sRGB（1996）、Display P3、Rec.2020', 'sRGB (1996), Display P3, Rec.2020') },
    ],
    palette: ['#ff3b30', '#34c759', '#0a84ff', '#ffd60a', '#1c1c1e', '#f2f2f7'],
    domainIds: ['digital', 'design', 'creative-science', 'photography'],
    materialIds: ['mat-pigment', 'mat-code-pixels'],
    techniqueIds: ['tech-realtime-rendering'],
    tags: ['色彩', 'RGB', '超级链'],
    modes: ['network', 'comparison', 'detail'],
  },
  {
    id: 'c-generative-art',
    type: 'concept',
    slug: 'generative-art',
    name: loc('生成艺术', 'Generative Art'),
    tagline: loc('作者设计系统，系统生成作品', 'The artist designs the system; the system makes the work'),
    summary: loc('用代码定义规则、约束与随机过程，让算法产出大量形态——创作从“画一张图”变为“设计一个可能性空间”。', 'Rules, constraints and randomness coded into a system that produces many forms — authorship shifts from drawing one image to designing a space of possibilities.'),
    body: [
      loc('1960 年代的诺尔与内基斯用计算机绘图装置开创生成艺术；今天 p5.js、Processing 与 TouchDesigner 让浏览器成为工作室。噪声函数是它的窑火，随机种子是它的釉料——与窑变共享同一种“控制与偶然”的美学。', 'Nake and Nees pioneered generative art with computer plotters in the 1960s; today p5.js, Processing and TouchDesigner make the browser a studio. The noise function is its kiln fire, the random seed its glaze — the same aesthetic of control and chance as kiln transmutation.'),
      loc('生成艺术也回到了装饰传统：伊斯兰几何纹样、中国窗棂与锦缎团窠本质上都是“规则系统”的输出，只是执行系统的是人脑与双手。', 'Generative art also returns to ornament: Islamic geometric patterns, Chinese lattice and brocade roundels are themselves outputs of rule systems — executed by hands and minds rather than CPUs.'),
    ],
    facts: [
      { label: loc('起点', 'Origins'), value: loc('1965 年，内基斯与诺尔的计算机绘图展', '1965, computer-graphics exhibitions by Nees and Nake') },
      { label: loc('工具', 'Tools'), value: loc('Processing、p5.js、TouchDesigner、openFrameworks', 'Processing, p5.js, TouchDesigner, openFrameworks') },
    ],
    palette: ['#00b4d8', '#ff006e', '#ffbe0b', '#3a0ca3', '#f8f9fa'],
    domainIds: ['digital', 'design', 'creative-science'],
    materialIds: ['mat-code-pixels'],
    techniqueIds: ['tech-generative-process'],
    tags: ['生成艺术', '创意编程', '算法'],
    modes: ['interactive', 'network'],
  },
  {
    id: 'c-3d-space',
    type: 'concept',
    slug: '3d-space-modeling',
    name: loc('三维空间建模', '3D Space & Modeling'),
    tagline: loc('用顶点重建可计算的空间', 'Reconstructing computable space from vertices'),
    summary: loc('网格、顶点、边、面、UV 与法线：三维软件用数学坐标重建物体与空间，透视第一次不再是画法而是计算结果。', 'Meshes, vertices, edges, faces, UVs and normals: 3D software rebuilds objects and space in mathematical coordinates — perspective becomes computation rather than drawing convention.'),
    body: [
      loc('三维模型是一张关于“表面”的数据结构：多边形网格只记录壳，材质决定壳如何反光，骨骼决定壳如何动。这与拉坯何其相似——匠人在黏土表面工作，内部是空的；建模师在顶点表面工作，内部是数学。', 'A 3D model is a data structure about surfaces: the polygon mesh records only the shell; materials decide how it reflects light, rigs how it moves. It resembles wheel-throwing — the potter works the clay surface and the inside is hollow; the modeler works the vertex surface and the inside is mathematics.'),
      loc('三维空间概念是透视法的数字继承人：阿尔贝蒂在 15 世纪用几何规定了“固定单眼观察者”，三维软件把这个观察者做成了一台可移动、可计算的虚拟相机。', '3D space is the digital heir of perspective: Alberti mathematically fixed a single monocular observer in the 15th century; 3D software made that observer a movable, computable virtual camera.'),
    ],
    facts: [
      { label: loc('核心数据', 'Core data'), value: loc('顶点坐标、面索引、UV、法线', 'Vertex positions, face indices, UVs, normals') },
      { label: loc('建模法', 'Approaches'), value: loc('多边形建模、雕刻（ZBrush）、NURBS、参数化', 'Polygon modeling, sculpting (ZBrush), NURBS, parametric') },
    ],
    palette: ['#219ebc', '#8ecae6', '#fb8500', '#023047', '#ffb703'],
    domainIds: ['digital', 'games', 'animation', 'architecture', 'creative-science'],
    techniqueIds: ['tech-3d-modeling'],
    conceptIds: ['c-geometry', 'c-perspective'],
    tags: ['三维', '建模', '空间'],
    modes: ['interactive', 'process', 'network'],
  },

  // =============================================================== techniques
  {
    id: 'tech-realtime-rendering',
    type: 'technique',
    slug: 'real-time-rendering',
    name: loc('实时渲染', 'Real-time Rendering'),
    tagline: loc('每秒重画世界六十次', 'Redrawing the world sixty times a second'),
    summary: loc('在 16 毫秒内完成一帧全流程：光栅化管线 + GPU 并行着色，让游戏、VR 与图形界面能响应每一次输入——交互视觉的技术核心。', 'A full frame within 16 milliseconds: rasterization pipeline plus parallel GPU shading, letting games, VR and graphical interfaces respond to every input — the technical core of interactive visuals.'),
    body: [
      loc('实时渲染与离线渲染的区别是预算：电影帧可以渲染数小时，游戏帧只有十几毫秒。工程师用光栅化把三维场景切成像素，用预烘焙的光照贴图、阴影贴图与材质近似欺骗眼睛——但欺骗必须在输入后一帧内完成。', 'Real-time and offline differ by budget: a film frame may render for hours, a game frame has a dozen milliseconds. Engineers rasterize the scene into pixels and cheat the eye with pre-baked lightmaps, shadow maps and material approximations — but the cheat must land within one frame of input.'),
      loc('从施乐 Alto 的位图刷新到今天的实时光追，实时渲染始终服务同一件事：让人机对话拥有视觉。图形界面、电子游戏、VR 与数字孪生都是它的下游。', 'From the Alto’s bitmap refresh to today’s real-time ray tracing, the technique serves one thing: giving human–computer dialogue a visual form. GUIs, video games, VR and digital twins are all downstream.'),
    ],
    facts: [
      { label: loc('帧率', 'Frame rate'), value: loc('30–60 fps（VR 需 90+）', '30–60 fps; VR needs 90+') },
      { label: loc('关键技术', 'Key tech'), value: loc('光栅化、Z-buffer、着色器、实例化', 'Rasterization, Z-buffer, shaders, instancing') },
    ],
    palette: ['#00f5d4', '#00bbf9', '#f15bb5', '#001219', '#fee440'],
    domainIds: ['digital', 'games', 'animation', 'design'],
    materialIds: ['mat-code-pixels'],
    conceptIds: ['c-rendering-pipeline', 'c-shader', 'c-digital-color', 'c-diegetic-ui'],
    tags: ['实时渲染', 'GPU', '超级链', '游戏'],
    modes: ['process', 'interactive'],
  },
  {
    id: 'tech-vector-drawing',
    type: 'technique',
    slug: 'vector-drawing',
    name: loc('矢量绘图', 'Vector Drawing'),
    tagline: loc('用锚点与手柄画画', 'Drawing with anchor points and handles'),
    summary: loc('在贝塞尔曲线与布尔运算之间构造图形：节点即坐标，手柄即曲率。标志、字体与界面图标的标准生产方式。', 'Building graphics from Bézier curves and boolean operations: anchors are coordinates, handles are curvature. The standard way to make logos, type and interface icons.'),
    body: [
      loc('矢量绘图训练的是一种新的手感：画的不是线条而是控制点——移动一个锚点，整条曲线重新计算。钢笔工具因此是设计学生最大的门槛，它要求人把“形状”理解为参数。', 'Vector drawing trains a new hand-feel: you draw not lines but control points — move one anchor and the whole curve recalculates. The pen tool is design students’ biggest hurdle, demanding that shape be understood as parameters.'),
      loc('1985 年 Illustrator 把贝塞尔曲线送进桌面出版，字体排印与标志设计从此数字化；今天 Figma 与 SVG 让矢量图形成为界面的通用货币。', 'Illustrator brought Bézier curves to desktop publishing in 1985, digitizing type and logo design; today Figma and SVG make vector graphics the common currency of interfaces.'),
    ],
    facts: [
      { label: loc('代表软件', 'Software'), value: loc('Illustrator（1985）、Figma、Inkscape', 'Illustrator (1985), Figma, Inkscape') },
      { label: loc('操作', 'Operations'), value: loc('锚点、贝塞尔手柄、布尔并差集、路径查找', 'Anchors, Bézier handles, boolean union/cut, pathfinder') },
    ],
    palette: ['#f94144', '#f3722c', '#f9c74f', '#43aa8b', '#577590'],
    domainIds: ['digital', 'design'],
    materialIds: ['mat-code-pixels'],
    conceptIds: ['c-vector'],
    tags: ['矢量', '绘图', '设计'],
    modes: ['process', 'detail'],
  },
  {
    id: 'tech-3d-modeling',
    type: 'technique',
    slug: '3d-modeling',
    name: loc('三维建模', '3D Modeling'),
    tagline: loc('在坐标空间里捏形', 'Sculpting in coordinate space'),
    summary: loc('用多边形网格搭建物体表面，经雕刻细化、UV 展开与拓扑清理：游戏与动画资产的生产线，数字时代的拉坯。', 'Building object surfaces from polygon meshes, refined by sculpting, UV unwrapping and retopology — the production line for game and film assets, wheel-throwing in the digital age.'),
    body: [
      logSafe3dModeling(),
      loc('建模流程像陶瓷工序一样有明确分工：粗模（拉坯）→ 高模雕刻（塑细节）→ 拓扑重建（修胎）→ UV 展开（为上釉做准备）→ 贴图与材质（施釉）→ 渲染（窑烧）。数字工作室与瓷窑作坊隔千年同构。', 'The pipeline has the same division of labor as a ceramic workshop: blockout (throwing) → high-poly sculpt (detail) → retopology (trimming) → UV unwrap (preparing for glaze) → textures and materials (glazing) → rendering (firing). The digital studio and the porcelain workshop are isomorphic across a millennium.'),
    ],
    facts: [
      { label: loc('软件', 'Software'), value: loc('Blender、Maya、3ds Max、ZBrush', 'Blender, Maya, 3ds Max, ZBrush') },
      { label: loc('流程', 'Pipeline'), value: loc('粗模 → 雕刻 → 拓扑 → UV → 材质', 'Blockout → sculpt → retopo → UV → materials') },
    ],
    palette: ['#48cae4', '#0096c7', '#ff9e00', '#023e8a', '#caf0f8'],
    domainIds: ['digital', 'games', 'animation', 'design'],
    materialIds: ['mat-code-pixels'],
    conceptIds: ['c-3d-space', 'c-geometry'],
    tags: ['三维', '建模', '游戏'],
    modes: ['process', 'interactive'],
  },
  {
    id: 'tech-lightmapping',
    type: 'technique',
    slug: 'lightmapping',
    name: loc('光照贴图', 'Lightmapping'),
    tagline: loc('把光烤进纹理里', 'Baking light into the texture'),
    summary: loc('离线预计算静态物体的全局照明，结果存成贴图贴回场景：实时管线用一张图省下每帧数千次光照计算。', 'Static global illumination computed offline and stored as a texture applied back to the scene: one image saves thousands of lighting calculations per frame in the real-time pipeline.'),
    body: [
      loc('光照贴图是实时渲染最经典的“时间换时间”：墙壁接收的反弹光在玩家进入房间之前就算好了，烘焙进第二套 UV 上的亮度图。代价是静态——移动的灯不能烤——所以游戏把场景拆成静态（烘焙）与动态（实算）两层。', 'Lightmapping is real-time rendering’s classic time-for-time trade: the bounce light on walls is computed before the player enters the room, baked into a brightness map over a second UV set. The cost is staticness — moving lights cannot be baked — so games split scenes into baked static and computed dynamic layers.'),
      logSafeLightmapping2(),
    ],
    facts: [
      { label: loc('原理', 'Principle'), value: loc('预计算 GI → 存为顶点色/纹理 → 运行时采样', 'Precompute GI → store as vertex color/texture → sample at runtime') },
      { label: loc('常见搭配', 'Companions'), value: loc('阴影贴图、反射探针、环境光遮蔽', 'Shadow maps, reflection probes, baked AO') },
    ],
    palette: ['#ffb703', '#fb8500', '#2a9d8f', '#264653', '#e9c46a'],
    domainIds: ['digital', 'games', 'animation', 'architecture'],
    conceptIds: ['c-rendering-pipeline', 'c-light'],
    tags: ['光照', '烘焙', '游戏'],
    modes: ['process', 'detail'],
  },
  {
    id: 'tech-ray-tracing',
    type: 'technique',
    slug: 'ray-tracing',
    name: loc('光线追踪', 'Ray Tracing'),
    tagline: loc('从眼睛反向追踪每一束光', 'Tracing every beam of light backward from the eye'),
    summary: loc('对每个像素反向追踪光线，模拟反射、折射与软阴影：离线渲染的物理正确方法，如今以混合管线进入实时游戏。', 'Tracing rays backward per pixel to simulate reflection, refraction and soft shadows: the physically correct method of offline rendering, now entering real-time games via hybrid pipelines.'),
    body: [
      loc('光栅化问“这个三角形覆盖哪些像素”，光追问“这个像素收到了哪些光”。后者天然处理镜面、玻璃与间接光，代价是每像素数百次相交计算——长期只属于电影。RTX 显卡的 RT 核心与降噪 AI 让光追在 2020 年后进入游戏帧预算。', 'Rasterization asks “which pixels does this triangle cover”; ray tracing asks “which light reached this pixel”. The latter handles mirrors, glass and indirect light natively at the cost of hundreds of intersection tests per pixel — long reserved for film. RT cores and denoising AI brought it into game frame budgets after 2020.'),
      loc('光追与实时光栅化不是替代而是混合：粗光栅打底，少量光线负责反射与软阴影——正如窑工既要配方也要偶然。', 'Ray tracing and rasterization mix rather than replace: rasterization does the base, a sparse ray budget handles reflections and soft shadows — as potters rely on both recipe and chance.'),
    ],
    facts: [
      { label: loc('算法源头', 'Origin'), value: loc('特纳·惠特德，1980', 'Turner Whitted, 1980') },
      { label: loc('实时化', 'Real-time'), value: loc('NVIDIA RTX（2018）起混合渲染', 'NVIDIA RTX (2018), hybrid rendering') },
    ],
    palette: ['#90e0ef', '#0077b6', '#caf0f8', '#03045e', '#48cae4'],
    domainIds: ['digital', 'games', 'animation', 'creative-science'],
    materialIds: ['mat-code-pixels'],
    conceptIds: ['c-rendering-pipeline', 'c-light', 'c-shader'],
    tags: ['光线追踪', '渲染', '图形学'],
    modes: ['process', 'comparison'],
  },

  // ================================================================ objects
  {
    id: 'object-xerox-alto',
    type: 'object',
    slug: 'xerox-alto',
    name: loc('施乐 Alto（1973）', 'Xerox Alto (1973)'),
    yearStart: 1973,
    medium: loc('个人计算机（位图显示 + 鼠标）', 'Personal computer with bitmapped display and mouse'),
    currentLocation: loc('计算机历史博物馆等机构藏', 'Computer History Museum and other collections'),
    cultureId: 'culture-american',
    periodId: 'period-postwar',
    materialIds: ['mat-code-pixels'],
    techniqueIds: ['tech-realtime-rendering', 'tech-vector-drawing'],
    conceptIds: ['c-pixel', 'c-raster', 'c-digital-interface'],
    domainIds: ['digital', 'design'],
    tagline: loc('图形界面在这间实验室出生', 'The graphical interface was born in this lab'),
    summary: loc('施乐帕洛阿尔托研究中心造的机器：竖屏位图显示器、三键鼠标、桌面、窗口、以太网与所见即所得排版——现代计算的全部原型都在这里先出现。', 'Built at Xerox PARC: portrait bitmapped screen, three-button mouse, desktop, windows, Ethernet and WYSIWYG typesetting — every prototype of modern computing appeared here first.'),
    body: [
      logSafeAltoBody1(),
      logSafeAltoBody2(),
    ],
    palette: ['#c9b896', '#3b5e7a', '#e8e2d2', '#6b6f73', '#1e2a33'],
    blocks: [
      {
        id: 'alto-bitmap', kind: 'text', title: loc('位图显示屏：像素第一次可寻址', 'The bitmapped display: pixels become addressable'),
        body: loc('Alto 之前的终端只显示字符；Alto 的 606×808 竖屏让程序控制每一个像素——文字可以是字体，图形可以是任意图案。这一决定是数字视觉文化的起点：有了可寻址像素，才有窗口、图标、字体渲染与所有界面设计。', 'Terminals before the Alto displayed only characters; its 606×808 portrait screen let programs control every pixel — type could be fonts, graphics could be anything. That decision is the origin point of digital visual culture: addressable pixels made windows, icons, type rendering and all interface design possible.'),
      },
      {
        id: 'alto-desktop', kind: 'list', title: loc('桌面隐喻：办公室搬上屏幕', 'The desktop metaphor: the office moves on-screen'),
        items: [
          loc('窗口：重叠的纸张', 'Windows: overlapping sheets of paper'),
          loc('图标：文件与文件夹的视觉替身', 'Icons: visual stand-ins for files and folders'),
          loc('鼠标：手与指针的直接操纵', 'Mouse: direct manipulation of a pointer by hand'),
          loc('所见即所得：屏幕与打印一致', 'WYSIWYG: what the screen shows is what prints'),
        ],
        body: logSafeAltoDesktop(),
      },
      {
        id: 'alto-unborn', kind: 'text', title: loc('没有上市的革命', 'The revolution that never shipped'),
        body: logSafeAltoUnborn(),
      },
    ],
    facts: [
      { label: loc('诞生', 'Introduced'), value: loc('1973 年，施乐 PARC', '1973, Xerox PARC') },
      { label: loc('首创', 'Firsts'), value: loc('位图显示、桌面隐喻、鼠标、以太网、所见即所得', 'Bitmapped display, desktop metaphor, mouse, Ethernet, WYSIWYG') },
      { label: loc('产量', 'Made'), value: loc('约 2000 台，未正式上市', 'Roughly 2,000 units; never sold commercially') },
      { label: loc('屏幕', 'Display'), value: loc('606×808 像素竖屏黑白位图', '606×808 portrait monochrome bitmap') },
    ],
    tags: ['计算机史', 'GUI', 'PARC', '界面'],
    modes: ['story', 'detail'],
    weight: 88,
  },
  {
    id: 'object-macintosh-1984',
    type: 'object',
    slug: 'apple-macintosh-1984',
    name: loc('苹果麦金塔（1984）', 'Apple Macintosh (1984)'),
    yearStart: 1984,
    medium: loc('一体式个人计算机（图形界面）', 'All-in-one personal computer with graphical interface'),
    currentLocation: loc('计算机历史博物馆等机构藏', 'Computer History Museum and other collections'),
    cultureId: 'culture-american',
    periodId: 'period-postwar',
    materialIds: ['mat-code-pixels'],
    techniqueIds: ['tech-realtime-rendering', 'tech-vector-drawing'],
    conceptIds: ['c-digital-interface', 'c-pixel', 'c-digital-color', 'c-vector'],
    domainIds: ['digital', 'design', 'visual-culture'],
    tagline: loc('把图形界面装进一只手提箱', 'The graphical interface in a carryable box'),
    summary: loc('1984 年 1 月 24 日发布：9 英寸黑白屏、128K 内存、QuickDraw 与矢量字体——图形界面第一次成为普通人桌上的商品。', 'Launched January 24, 1984: 9-inch black-and-white screen, 128K of memory, QuickDraw and vector fonts — the graphical interface became an object on ordinary desks.'),
    body: [
      logSafeMacBody1(),
      logSafeMacBody2(),
    ],
    palette: ['#f5f5f0', '#d8d4cc', '#8e8e8e', '#1a1a1a', '#4a6fa5'],
    blocks: [
      {
        id: 'mac-ad', kind: 'text', title: loc('“1984”：一则广告定义产品', '“1984”: one ad defining a product'),
        body: loc('苹果在超级碗投放雷德利·斯科特执导的广告：屏幕里的“老大哥”被一柄铁锤击碎，旁白宣布“1 月 24 日，苹果将发布麦金塔——你会明白 1984 为什么不会变成《1984》”。计算从机房走向个人的文化时刻，被一部 60 秒的影片讲完了。', 'Apple ran a Ridley Scott spot during the Super Bowl: a hammer hurls into a screen showing Big Brother, and the voiceover promises that on January 24 Apple introduces the Macintosh — and 1984 will not be like “1984”. Computing’s cultural turn from glass house to individual was told in sixty seconds.'),
      },
      {
        id: 'mac-quickdraw', kind: 'text', title: loc('QuickDraw 与字体：矢量进入桌面', 'QuickDraw and fonts: vectors reach the desk'),
        body: loc('比尔·阿特金森为麦金塔写的 QuickDraw 图形库负责每一帧绘制；配合 PostScript 轮廓字体，麦金塔首次在普通打印机上排出媲美专业排版的页面——桌面出版由此爆发。界面排版、字距与图标全部以矢量定义，再实时光栅化成像素。', 'Bill Atkinson’s QuickDraw drew every frame; with PostScript outline fonts the Mac set pages rivaling professional typesetting on an ordinary printer — desktop publishing exploded. Interface type, spacing and icons were defined as vectors and rasterized to pixels in real time.'),
      },
      {
        id: 'mac-chain', kind: 'text', title: loc('从 Alto 到 Mac：技术成为文化', 'Alto to Mac: technology becomes culture'),
        body: logSafeMacChain(),
      },
    ],
    facts: [
      { label: loc('发布', 'Launched'), value: loc('1984 年 1 月 24 日', 'January 24, 1984') },
      { label: loc('配置', 'Specs'), value: loc('摩托罗拉 68000，128KB 内存，9 英寸 512×342 黑白屏', 'Motorola 68000, 128 KB RAM, 9-inch 512×342 mono display') },
      { label: loc('售价', 'Price'), value: loc('2495 美元', 'US$2,495') },
      { label: loc('图形核心', 'Graphics'), value: loc('QuickDraw + PostScript 矢量字体', 'QuickDraw plus PostScript outline fonts') },
    ],
    tags: ['计算机史', 'Mac', 'GUI', '桌面出版'],
    modes: ['story', 'detail'],
    weight: 90,
    featured: true,
  },
  {
    id: 'object-www-first-site',
    type: 'object',
    slug: 'first-website',
    name: loc('万维网第一个网站（1991）', 'The First Website (1991)'),
    summary: loc('1991 年 8 月 6 日，蒂姆·伯纳斯-李在 CERN 的 NeXT 电脑上公开 info.cern.ch：一页解释“万维网是什么”的超文本——网络即展厅的起点。', 'On August 6, 1991, Tim Berners-Lee published info.cern.ch on a NeXT computer at CERN: a hypertext page explaining what the World Wide Web was — the beginning of the network as gallery.'),
    yearStart: 1991,
    medium: loc('HTML 超文本文档（NeXT 服务器）', 'HTML hypertext on a NeXT server'),
    currentLocation: loc('info.cern.ch（原始页面至今可访问复刻）', 'info.cern.ch (original page preserved and replicated)'),
    cultureId: 'culture-digital-global',
    periodId: 'period-internet',
    materialIds: ['mat-code-pixels'],
    techniqueIds: ['tech-vector-drawing', 'tech-realtime-rendering'],
    conceptIds: ['c-digital-interface', 'c-vector'],
    domainIds: ['digital', 'visual-culture', 'design'],
    tagline: loc('一个链接开始的世界', 'A world begun with one link'),
    body: [
      logSafeWwwBody1(),
      logSafeWwwBody2(),
    ],
    palette: ['#fbfbfb', '#1a1a1a', '#0645ad', '#d3d3d3', '#0a7ab0'],
    blocks: [
      {
        id: 'www-page', kind: 'text', title: loc('页面本身就是说明书', 'The page was its own manual'),
        body: logSafeWwwPage(),
      },
      {
        id: 'www-three', kind: 'list', title: loc('三个发明各一行代码', 'Three inventions, one line each'),
        items: [
          loc('URL：每一页的全球唯一地址', 'URL: a globally unique address for every page'),
          loc('HTTP：浏览器与服务器的对话协议', 'HTTP: the protocol between browser and server'),
          loc('HTML：超文本文档的标签语言', 'HTML: the markup language of hypertext'),
        ],
        body: logSafeWwwThree(),
      },
      {
        id: 'www-gallery', kind: 'text', title: loc('从文档到展厅', 'From document to gallery'),
        body: logSafeWwwGallery(),
      },
    ],
    facts: [
      { label: loc('上线', 'Published'), value: loc('1991 年 8 月 6 日', 'August 6, 1991') },
      { label: loc('地址', 'Address'), value: loc('info.cern.ch', 'info.cern.ch') },
      { label: loc('作者', 'Author'), value: loc('蒂姆·伯纳斯-李，欧洲核子研究中心（CERN）', 'Tim Berners-Lee, CERN') },
      { label: loc('服务器', 'Server'), value: loc('一台 NeXT 电脑（贴有“此机器是服务器，请勿关机！”）', 'A NeXT computer labeled “This machine is a server. DO NOT POWER IT DOWN!!”') },
    ],
    tags: ['万维网', '互联网史', '超文本'],
    modes: ['story', 'detail'],
    weight: 92,
    featured: true,
  },

  // ================================================================= styles
  {
    id: 'cs-vaporwave',
    type: 'style',
    slug: 'vaporwave',
    name: loc('蒸汽波视觉', 'Vaporwave'),
    contemporary: true,
    yearStart: 2010,
    periodId: 'period-digital',
    tagline: loc('故障的商场里，希腊雕塑听着慢放音乐', 'Glitched malls where Greek statues listen to slowed-down music'),
    summary: loc('2010 年代网络美学：粉红与青蓝渐变、3D 网格地面、希腊胸像、棕榈树与日文片假名——对消费主义与早期数字记忆的怀旧拼贴。', '2010s internet aesthetic: pink-cyan gradients, 3D grid floors, Greek busts, palm trees and katakana — nostalgic collage of consumerism and early-digital memory.'),
    body: [
      logSafeVaporBody(),
      loc('蒸汽波是第一个完全在互联网上诞生、没有地理中心的视觉风格：它从音乐专辑封面扩散到游戏、时装与界面，像素感的刻意粗糙与数字色彩的高饱和并置，本身就是对“技术进步叙事”的反讽。', 'Vaporwave was the first visual style born entirely on the internet without a geographic center: it spread from album covers to games, fashion and interfaces, where deliberately rough pixelation and saturated digital color together parody the narrative of technological progress.'),
    ],
    facts: [
      { label: loc('活跃', 'Active'), value: loc('2010 年代中期起', 'From the mid-2010s') },
      { label: loc('元素', 'Motifs'), value: loc('网格地平线、古典雕塑、棕榈、片假名、故障、粉青渐变', 'Grid horizon, classical sculpture, palms, katakana, glitch, pink-cyan gradients') },
      { label: loc('亲属风格', 'Relatives'), value: loc('synthwave、mallsoft、复古未来主义', 'Synthwave, mallsoft, retrofuturism') },
    ],
    palette: ['#ff71ce', '#01cdfe', '#05ffa1', '#b967ff', '#fffb96', '#2a1a4a'],
    domainIds: ['digital', 'visual-culture', 'design', 'games'],
    conceptIds: ['c-digital-color', 'c-generative-art'],
    tags: ['网络美学', '蒸汽波', '复古未来'],
    modes: ['gallery'],
    blocks: [
      {
        id: 'vw-motifs', kind: 'list', title: loc('视觉配方', 'Visual recipe'), items: [
          loc('无限延伸的 3D 透视网格地面', 'An endless 3D perspective grid floor'),
          loc('粉紫—青蓝高饱和渐变天空', 'High-saturation magenta-to-cyan gradient sky'),
          loc('古希腊/罗马雕塑的 3D 扫描模型', '3D-scanned classical busts and statues'),
          loc('棕榈树、落日、90 年代商场与日文片假名', 'Palms, sunsets, 90s mall interiors, katakana text'),
        ] },
      { id: 'vw-mood', kind: 'text', title: loc('情绪：对未来的怀旧', 'Mood: nostalgia for the future'), body: loc('它怀旧的不是某个年代而是“旧未来”——80-90 年代广告中承诺过但没有兑现的技术乌托邦。慢速采样音乐与故障画面一起，让数字时代的第一代谢幕变成审美。', 'It is nostalgic not for an era but for an old future — the tech utopia promised in 80s and 90s advertising that never arrived. Slowed samples and glitched imagery turn the first digital generation’s curtain call into style.') },
    ],
    weight: 78,
  },
  {
    id: 'cs-art-deco',
    type: 'style',
    slug: 'art-deco',
    name: loc('装饰艺术风格', 'Art Deco'),
    yearStart: 1920,
    yearEnd: 1940,
    periodId: 'period-modern',
    originPlaceId: 'place-paris',
    tagline: loc('几何、速度与镀金的时代', 'An age of geometry, speed and gilt'),
    summary: loc('1925 年巴黎国际装饰艺术博览会定名：放射状几何、阶梯退台、金色与黑色——机器时代的华丽风格，今天仍在数字插画与界面装饰中复活。', 'Named at the 1925 Paris Exposition des Arts Décoratifs: radiating geometry, stepped ziggurats, gold on black — the glamorous style of the machine age, revived today in digital illustration and interface ornament.'),
    body: [
      logSafeDecoBody1(),
      loc('装饰艺术在当代数字创作中持续复活：海报的金色描边、游戏 UI 的放射纹、开场片头的几何标题卡都在引用它——几何与奢华的组合，是跨媒介最容易识别的风格记忆之一。', 'Art Deco keeps reviving in digital work: gilt poster outlines, radiating game UI ornaments, geometric title cards — the pairing of geometry and glamour is among the most recognizable style memories across media.'),
    ],
    facts: [
      { label: loc('命名', 'Named'), value: loc('1925 年巴黎国际现代装饰与工业艺术博览会', 'Paris Exposition of Decorative Arts, 1925') },
      { label: loc('视觉', 'Visuals'), value: loc('太阳放射纹、阶梯形、锯齿、金属与黑漆对比', 'Sunburst rays, ziggurat steps, chevrons, metal against black lacquer') },
      { label: loc('代表', 'Icons'), value: loc('克莱斯勒大厦、诺曼底号海报、卡地亚珠宝', 'Chrysler Building, Normandie posters, Cartier') },
    ],
    palette: ['#c8a951', '#1c2536', '#e6dcc0', '#7a2e2e', '#0f3d3e'],
    domainIds: ['design', 'visual-culture', 'digital'],
    conceptIds: ['c-geometry'],
    tags: ['装饰艺术', '几何', '风格'],
    modes: ['gallery', 'detail'],
    blocks: [
      { id: 'ad-geo', kind: 'text', title: loc('几何的奢华', 'Geometric glamour'), body: loc('立体主义教它分解形体，埃及图坦卡蒙发掘（1922）与阿兹特克阶梯给它装饰母题，工业流线给它速度感——装饰艺术把前卫艺术、异国情调与机器崇拜压进对称而奢华的图案。', 'Cubism taught it fragmentation, the 1922 Tutankhamun discovery and Aztec ziggurats gave motifs, industrial streamlining gave speed — Art Deco compressed avant-garde geometry, exoticism and machine worship into symmetrical luxury.') },
      { id: 'ad-surface', kind: 'text', title: loc('黑金材料修辞', 'Black-and-gold material rhetoric'), body: loc('黑漆般的深色底、镀金金属线条与对称构图构成它的标准表面：今天数字界面中的“高端模式”仍然调用这套黑金几何。', 'Black-lacquer grounds, gilded lines and symmetry form its standard surface; digital interfaces still call on this black-gold geometry for their “premium” modes.') },
    ],
    weight: 74,
  },

  // ================================================================= periods
  {
    id: 'period-internet',
    type: 'period',
    slug: 'internet-age',
    name: loc('互联网时代', 'The Internet Age'),
    yearStart: 1995,
    scope: 'global',
    tagline: loc('网络成为创作与传播的媒介', 'The network becomes the medium of making and sharing'),
    summary: loc('1995 年前后万维网民用化：浏览器、搜索引擎、社交平台与智能手机相继出现，图像的生产、分发与风格传播第一次以全球网络为基础设施。', 'Around 1995 the web went civilian: browsers, search engines, social platforms and smartphones followed, and the making, distribution and stylistic spread of images for the first time took the global network as infrastructure.'),
    body: [
      logSafeInternetBody(),
      loc('这个时代的风格演化速度以月为单位：蒸汽波从音乐圈落到界面设计只用了两三年。网络既是展厅也是作坊，策展与创作的边界随之溶解。', 'Styles now evolve by the month: vaporwave traveled from music circles to interface design in a couple of years. The network is both gallery and workshop, and the line between curating and making dissolves.'),
    ],
    facts: [
      { label: loc('起点', 'Start'), value: loc('约 1995 年（万维网民用化）', 'c. 1995, the web goes civilian') },
      { label: loc('标志', 'Markers'), value: loc('浏览器、Web 2.0、智能手机、云', 'Browsers, Web 2.0, smartphones, the cloud') },
    ],
    domainIds: ['digital', 'visual-culture', 'art-history'],
    tags: ['互联网', '网络文化', '时期'],
    modes: ['timeline', 'story', 'network'],
  },
] as EntityBase[];

// ---------------------------------------------------------------------------
// Long-form bilingual paragraphs (module-scope helpers keep entity literals
// readable; function declarations are hoisted).
// ---------------------------------------------------------------------------
function logSafe3dModeling() {
  return loc(
    '建模师操作的不是形状本身而是顶点：一个角色由数万个顶点构成，雕刻工具像在数字黏土上推压，但改变的始终是坐标数组。拓扑——面如何流动——决定模型能否弯曲、贴图是否均匀，是这行的“手感”。',
    'Modelers work not on shapes but vertices: a character holds tens of thousands; sculpting tools push like digital clay but always alter coordinate arrays. Topology — how the faces flow — decides whether a model bends and whether textures sit evenly; it is the haptic knowledge of the trade.',
  );
}
function logSafeLightmapping2() {
  return loc(
    '建筑可视化行业是烘焙技术的最早用户：一栋大楼的日照分析可以离线算一夜，建筑师与客户在屏幕上实时走进完成光照的空间——这一用法也启发了游戏与 VR 的静态场景。',
    'Architectural visualization was the earliest user of baking: a building’s daylight analysis computes overnight, and architect and client walk in real time through the finished light — an approach that later shaped game and VR static scenes.',
  );
}
function logSafeAltoBody1() {
  return loc(
    'Alto 不是商用产品而是研究平台：它贵、它慢、产量仅约两千台，但它把一整套未来打包进了一只立式机箱——图形界面、所见即所得、鼠标、以太网、面向对象编程环境 Smalltalk。',
    'The Alto was not a product but a research platform: expensive, slow, only about two thousand built — yet it packed an entire future into one tower case: graphical interface, WYSIWYG, mouse, Ethernet and the object-oriented Smalltalk environment.',
  );
}
function logSafeAltoBody2() {
  return loc(
    '1979 年乔布斯带着团队参观 PARC，工程师演示了窗口与鼠标；苹果随后把它们做进 Lisa 与麦金塔——Alto 从此成为“没被施乐兑现的未来”的代名词。',
    'When Steve Jobs toured PARC in 1979, engineers demonstrated windows and the mouse; Apple built them into the Lisa and the Macintosh — and the Alto became the byword for a future Xerox failed to cash in.',
  );
}
function logSafeAltoDesktop() {
  return loc(
    '研究者发现非专业用户面对命令行会恐惧，而面对文件与文件夹的图像则会“直接伸手去拿”。直接操纵（direct manipulation）原则由此确立：界面应当让操作对象可见、可逆、物理化。',
    'Researchers found that non-experts feared the command line but reached out to manipulate pictures of files and folders. The principle of direct manipulation was born: keep objects visible, actions reversible and interaction physical.',
  );
}
function logSafeAltoUnborn() {
  return loc(
    '施乐高层认为 Alto 的使命是卖复印机而非卖未来，未将它市场化。十年后苹果与微软各自推出图形界面产品并重塑了整个软件业——Alto 成为技术史上最著名的“看得太远的脚注”。',
    'Xerox leadership saw the Alto as an aid to selling copiers, not a future to market; a decade later Apple and Microsoft shipped their own graphical systems and reshaped software — making the Alto technology history’s most famous footnote that saw too far.',
  );
}
function logSafeMacBody1() {
  return loc(
    '麦金塔把 Alto 的研究语言翻译成产品语言：图形界面第一次打包进可搬动的一体化机身，售价 2495 美元，开机即见微笑的 Mac 与桌面。',
    'The Mac translated the Alto’s research vocabulary into a product’s: the graphical interface packed into a portable all-in-one case, priced at $2,495, booting to a smiling Mac and a desktop.',
  );
}
function logSafeMacBody2() {
  return loc(
    '它的 512×342 黑白屏只有 17.5 万像素，却让桌面出版、图标设计与数字排版成为可能：矢量字体由 PostScript 描述、经 QuickDraw 实时光栅化——激光打印机上出的页面与屏幕一致。',
    'Its 512×342 black-and-white screen held only 175,000 pixels yet enabled desktop publishing, icon design and digital typesetting: PostScript vector fonts rasterized in real time by QuickDraw — and the laser printout matched the screen.',
  );
}
function logSafeMacChain() {
  return loc(
    'Alto 证明图形界面可以存在，麦金塔证明它可以普及。麦金塔之后，界面成为设计学科：窗口间距、图标隐喻与字体渲染都开始被认真研究——数字视觉文化从此有了自己的观众。',
    'The Alto proved the graphical interface could exist; the Macintosh proved it could spread. After the Mac, the interface became a design discipline — window spacing, icon metaphor and type rendering studied seriously — and digital visual culture had its public.',
  );
}
function logSafeWwwBody1() {
  return loc(
    '伯纳斯-李是 CERN 的软件工程师，他的问题很具体：物理学家离开研究所后无法再读到彼此的文档。他把超文本、互联网与自己的 NeXT 电脑拼在一起，发明了万维网。',
    'Berners-Lee was a CERN software engineer with a concrete problem: physicists who left the lab lost access to each other’s documents. He stitched hypertext together with the internet on his own NeXT computer and called the result the World Wide Web.',
  );
}
function logSafeWwwBody2() {
  return loc(
    '第一个网站没有图片、没有样式表，只有标题、段落和蓝色下划线链接；而正是这种极简，让它可以在任何机器、任何系统上被阅读——网络的宽容度从第一页起就是它的生命力。',
    'The first site had no images and no stylesheets — headings, paragraphs and blue underlined links — and that very minimalism made it readable on any machine, any system; the web’s openness was its life from page one.',
  );
}
function logSafeWwwPage() {
  return loc(
    '页面内容是万维网的自我介绍：什么是超文本、如何获得浏览器、如何搭建自己的服务器。它既是文档又是说明书，至今在 info.cern.ch 保持可访问。',
    'The page was the web’s self-introduction: what hypertext was, how to get a browser, how to run a server. Document and manual at once, it remains reachable today at info.cern.ch.',
  );
}
function logSafeWwwThree() {
  return loc(
    'URL、HTTP、HTML 三个发明都不复杂，却解决了文档在全球网络上“去哪、怎么传、怎么显示”的三个问题。伯纳斯-李把它们免费公开——这个决定比发明本身更深远。',
    'URL, HTTP and HTML were simple, but between them they settled where documents live, how they travel and how they appear on a global network. Berners-Lee gave them away free — a decision with consequences larger than the inventions.',
  );
}
function logSafeWwwGallery() {
  return loc(
    '网页从文档演变为画布：1990 年代的 GIF 与表格布局、2000 年代的 Flash 与 CSS 画廊、今天的 WebGL 与在线生成艺术展览——艺术家越来越少问“作品能不能放上网”，而问“作品是否应该离开网络存在”。',
    'The page evolved from document to canvas: 1990s GIFs and table layouts, 2000s Flash and CSS galleries, today’s WebGL and online generative exhibitions — artists no longer ask whether a work can go online, but whether it should exist off it.',
  );
}
function logSafeVaporBody() {
  return loc(
    '蒸汽波脱胎于 2011–2013 年前后的网络音乐实验（如专辑《Floral Shoppe》）：80 年代商场流行乐被慢速、循环、拼贴，视觉上配以前互联网时代的操作系统、希腊雕像与热带落日，构成一种“迟来的未来主义”。',
    'Vaporwave grew from internet music experiments around 2011–2013 (notably the album Floral Shoppe): 80s mall pop slowed, looped and collaged, paired with pre-web operating systems, classical statues and tropical sunsets — a belated futurism.',
  );
}
function logSafeDecoBody1() {
  return loc(
    '装饰艺术横跨两次世界大战之间的全部媒介：摩天楼退台、远洋班轮、收音机外壳、香水瓶、晚装与电影院立面。它颂扬速度、电力与全球旅行，几何母题从埃及与美洲前哥伦布文明借来，镀金质感则属于爵士乐时代的夜生活。',
    'Art Deco crossed every medium between the world wars: skyscraper setbacks, ocean liners, radio cabinets, perfume bottles, evening gowns and cinema façades. It celebrated speed, electricity and global travel, borrowing geometry from Egypt and pre-Columbian America and gilding it in jazz-age nightlife.',
  );
}
function logSafeInternetBody() {
  return loc(
    '1995 年前后浏览器从研究机构走向家庭，万维网成为继印刷、广播、电视之后的新大众媒介。图像第一次可以零边际成本地复制与全球送达：在线画廊、网络艺术、共享素材库与后来的社交平台共同改写了视觉的生产关系。',
    'Around 1995 browsers moved from labs into homes, and the web became the new mass medium after print, radio and television. Images could now be copied and delivered globally at zero marginal cost: online galleries, net art, shared asset libraries and later social platforms rewrote the production relations of visual culture.',
  );
}
