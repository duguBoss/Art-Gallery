import type { EntityBase } from '../../model/entity';
import { loc } from '../../model/i18n';

/**
 * Visual-culture expansion — the image languages of shared public and
 * networked life: emoji, memes, wayfinding, and the diagram that made
 * a city legible. The Beck map is a copyright transit graphic, so it is
 * documented text-first (no image); its palette is still authored.
 */
export const VISUAL_CULTURE_EXTRA: EntityBase[] = [
  {
    id: 'c-emoji',
    type: 'concept',
    slug: 'emoji',
    name: loc('Emoji：全球通用的最小图像语言', 'Emoji: the World’s Smallest Universal Image Language'),
    tagline: loc('一个字符大小的图像', 'Images at the size of a character'),
    summary: loc(
      '绘文字（えもじ）把图像压缩到字符尺寸：无需翻译、跨语言可读，既是标点也是表情，成为数字时代第一种真正全球流通的图形文字。',
      'Emoji compress images to the size of a character: translation-free, legible across languages, at once punctuation and facial expression — the first truly global graphic writing of the digital age.'),
    body: [
      loc(
        '视觉机制上，emoji 是为极小尺寸与跨平台环境设计的象形符号：轮廓高度简化、色块饱和、特征夸张，缩到 16 像素仍可辨认——这与交通标志、地铁导视和儿童画的“可读性优先”原则同源。1999 年，日本电信工程师栗田穣崇为 NTT DoCoMo 的 i-mode 手机设计了 176 个 12×12 像素的表情与天气图标，初衷是让短信在小屏上更有温度。',
        'Visually, emoji are pictograms engineered for tiny size and cross-platform use: radically simplified outlines, saturated color fields, exaggerated features — legible even at 16 pixels. Their principle of readability-first is shared with traffic signage, transit diagrams and children’s drawing. In 1999 the Japanese telecom engineer Shigetaka Kurita designed 176 icons at 12×12 pixels for NTT DoCoMo’s i-mode phones, giving text messages warmth on small screens.',
      ),
      loc(
        '2010 年 emoji 被收入 Unicode 国际字符标准后，它从日本功能机文化一跃成为全球基础设施：它不再是“图片”，而是“字符”，任何系统都能显示。它的文化位置介于标点与文字之间——😂 标记语气、🙏 横跨“祈祷/感谢/拜托”多重含义、某些蔬果符号在不同语境中获得了反讽性的第二生命。它证明在语言碎片化的网络里，图像重新承担起通用语（lingua franca）的古老功能。',
        'When emoji entered the Unicode standard in 2010 they leapt from Japanese feature-phone culture into global infrastructure: not “pictures” but characters, renderable on any system. Culturally they sit between punctuation and writing — 😓 marks tone, 🙏 spans prayer/thanks/please, and certain produce gained ironic second lives. They show that in a network of fragmented languages, images resume the ancient office of a lingua franca.',
      ),
    ],
    domainIds: ['visual-culture', 'digital'],
    facts: [
      { label: loc('设计者', 'Designer'), value: loc('栗田穣崇（NTT DoCoMo）', 'Shigetaka Kurita (NTT DoCoMo)') },
      { label: loc('起源', 'Origin'), value: loc('1999 年，176 个 12×12 像素图标', '1999; 176 icons at 12×12 pixels') },
      { label: loc('标准化', 'Standardized'), value: loc('2010 年收入 Unicode 标准', 'Included in Unicode, 2010') },
    ],
    palette: ['#ffd43b', '#ff6b6b', '#51cf66', '#339af0', '#f8f9fa'],
    tags: ['表情符号', '数字语言', '日本'],
    modes: ['story', 'detail'],
  },
  {
    id: 'c-meme',
    type: 'concept',
    slug: 'internet-meme',
    name: loc('模因：网络图像的复制与变异', 'Meme: Replication and Mutation of the Networked Image'),
    tagline: loc('人人皆可参与的图像进化', 'Image evolution anyone can edit'),
    summary: loc(
      '道金斯 1976 年提出“模因”作为文化复制单位；互联网把它变成图像的日常繁殖方式——同一模板被成千上万次改写，复制、变异与选择在几小时内完成。',
      'Dawkins coined “meme” in 1976 as a unit of cultural replication; the internet made it the daily reproduction mode of images — one template rewritten tens of thousands of times, with copying, mutation and selection completed in hours.'),
    body: [
      loc(
        '视觉机制上，网络模因依赖“模板识别”：一个固定构图（分心男友的三人物关系、震惊猫的大字配文）提供语法，替换的文字与图像产生新句子。可读性来自格式的高度稳定，笑点来自共享语境与预期违背——这与民间谚语、连环漫画和广告模仿（parody）是同一种修辞，只是速度被网络提升了万倍。',
        'Visually, internet memes rely on template recognition: a fixed composition — the three-figure relation of Distracted Boyfriend, the caption grammar of a reaction cat — supplies syntax, while swapped text and images produce new utterances. Legibility comes from format stability; the joke from shared context and violated expectation. This is the rhetoric of proverbs, comic strips and advertising parody, accelerated by the network by orders of magnitude.',
      ),
      loc(
        '文化位置上，模因是互联网的民间艺术：它不需要画廊许可，任何人都可以用下一次变异参与进化。传播的选择压力由转发、点赞与平台算法执行——不适应情绪的模板在几小时内消失，成功的模板进入集体图像库（如 Pepe、Doge），并反过来被营销号与政治宣传收编。模因因此是观察时代情绪最灵敏的仪表盘。',
        'Culturally, memes are the folk art of the internet: no gallery’s permission is needed, and anyone enters the evolution through the next mutation. Selection is performed by shares, likes and platform algorithms — templates that fail the emotional moment vanish within hours, successful ones enter the collective image library (Pepe, Doge) and are in turn co-opted by brand accounts and political messaging. The meme is the most sensitive gauge of a period’s mood.',
      ),
    ],
    domainIds: ['visual-culture', 'digital'],
    facts: [
      { label: loc('术语', 'Term'), value: loc('理查德·道金斯《自私的基因》（1976）', 'Richard Dawkins, The Selfish Gene (1976)') },
      { label: loc('机制', 'Mechanism'), value: loc('复制 → 变异 → 环境选择', 'Replication → variation → selection') },
      { label: loc('典型形态', 'Typical form'), value: loc('图像宏（image macro）：模板图 + 配文', 'Image macro: template image + caption') },
    ],
    tags: ['网络文化', '图像复制', '民间艺术'],
    modes: ['story', 'network'],
  },
  {
    id: 'c-wayfinding',
    type: 'concept',
    slug: 'wayfinding',
    name: loc('导视系统：公共空间的图形语言', 'Wayfinding: the Graphic Language of Public Space'),
    tagline: loc('陌生人也能读懂的城市', 'A city legible to strangers'),
    summary: loc(
      '人如何确定自己在哪、该往哪去——导视设计用色彩、符号与地图把空间翻译成可执行的决策：机场、医院、地铁的指路系统是现代图形设计最大尺度的实践。',
      'How people know where they are and which way to go — wayfinding translates space into executable decisions through color, symbol and map; signage systems for airports, hospitals and subways are graphic design practiced at urban scale.'),
    body: [
      loc(
        '视觉机制上，导视系统工作在移动与分心的条件下：它必须在一瞥、一抬头之间被读懂。因此它依赖一套层级语法——颜色编码（每条地铁线一种色）、标准化图形符号（1974 年美国 AIGA 为交通部设计的 50 个公共符号，从男女厕所到行李提取）、无衬线字体与节点标志。设计师关心的不是美观，而是“决策点”：人在哪个岔路口会犹豫，信息就必须出现在那个点上。',
        'Visually, wayfinding operates under movement and distraction: it must be grasped in a glance, on the move. It therefore relies on hierarchical grammar — color coding (one hue per transit line), standardized pictograms (the 50 AIGA public symbols designed for the US Department of Transportation in 1974, from restrooms to baggage claim), sans-serif lettering and landmarking. The designer studies not beauty but decision points: where a person hesitates at a fork, information must appear.',
      ),
      loc(
        '它的理论起点是凯文·林奇 1960 年的《城市意象》：人们靠道路、边界、区域、节点与地标五种要素在脑中绘制认知地图。好的导视不装饰空间，而是放大这五种要素——贝克的伦敦地铁图是最纯粹的范例：它放弃地理真实，只保留乘客真正需要的拓扑关系。导视是图形设计与公共服务的交点：当一个语言不通的外国人能独自抵达目的地，设计就成功了。',
        'Its theoretical root is Kevin Lynch’s The Image of the City (1960): people navigate by five elements — paths, edges, districts, nodes and landmarks. Good wayfinding does not decorate space but amplifies those elements; Harry Beck’s London Underground map is the purest example, abandoning geographic truth for the topology passengers actually need. Wayfinding is where graphic design meets public service: when a stranger with no shared language reaches the destination unaided, the design works.',
      ),
    ],
    domainIds: ['visual-culture', 'design'],
    conceptIds: ['atom-swiss-grid'],
    facts: [
      { label: loc('理论起点', 'Theory'), value: loc('凯文·林奇《城市意象》（1960）', 'Kevin Lynch, The Image of the City (1960)') },
      { label: loc('符号标准', 'Symbol set'), value: loc('AIGA/美国交通部公共符号（1974，50 个）', 'AIGA/US DOT public symbols (1974, 50 marks)') },
      { label: loc('五要素', 'Five elements'), value: loc('道路、边界、区域、节点、地标', 'Paths, edges, districts, nodes, landmarks') },
    ],
    tags: ['信息设计', '公共空间', '符号'],
    modes: ['detail', 'process'],
  },
  {
    id: 'object-beck-tube-map',
    type: 'object',
    slug: 'beck-london-underground-map-1931',
    name: loc('贝克伦敦地铁图（1931）', 'Beck’s London Underground Map (1931)'),
    yearStart: 1931,
    medium: loc('彩色套印便携地图（平版印刷）', 'Color-printed pocket map (lithograph)'),
    tagline: loc('一张不按比例的地图，反而最准', 'The map that tells the truth by breaking scale'),
    summary: loc(
      '电气制图员哈里·贝克把地铁画成电路图：站点等距、线路只走垂直、水平与 45 度斜线、地理距离被抹平——乘客需要的是连接关系，不是地表真相。',
      'Electrical draftsman Harry Beck drew the Underground like a circuit diagram: stations equally spaced, lines running vertically, horizontally or at 45 degrees, geographic distance abolished — passengers need connections, not surface truth.'),
    body: [
      loc(
        '1931 年，29 岁的亨利·查尔斯·贝克（Harry Beck）在伦敦地铁信号办公室做电气制图。当时的地图片追求地理准确，市中心密如蛛网、郊区大片空白，乘客根本读不清换乘关系。贝克利用业余时间画了一张“不守规矩”的图：他把弯曲的线路拉直成横线、竖线与 45 度斜线，站点间距按视觉节奏而非实际距离排开，泰晤士河留作唯一的地理锚点。',
        'In 1931 Henry Charles Beck, 29, was an electrical draftsman in the London Underground’s signals office. Existing maps chased geographic accuracy, a tangled knot in the center and empty margins beyond, leaving interchange relations unreadable. In his spare time Beck drew an unruly alternative: crooked lines straightened into horizontals, verticals and 45-degree diagonals; stations spaced by visual rhythm rather than distance; the River Thames kept as the sole geographic anchor.',
      ),
      loc(
        '地铁当局起初拒绝：“不按比例的地图没人看得懂。”1933 年他们印了 750 份试销，结果一抢而空——乘客用脚证明：在地下，人只关心“坐几站、在哪换、往哪个方向”。这张图此后九十年只作细节调整，成为世界上被模仿最多的信息设计：纽约、东京、巴黎的地铁图都能看见它的基因。',
        'The Underground initially refused it: a map without scale would confuse people. In 1933 they printed 750 copies as a trial; they vanished immediately. Passengers proved with their feet that underground, only three questions matter: how many stops, where to change, which direction. Nine decades on the map survives with minor revisions — the most imitated piece of information design in the world, its genes visible in the transit maps of New York, Tokyo and Paris.',
      ),
    ],
    conceptIds: ['c-wayfinding', 'atom-swiss-grid'],
    periodId: 'period-modern',
    domainIds: ['visual-culture', 'design'],
    facts: [
      { label: loc('设计师', 'Designer'), value: loc('哈里·贝克（Harry Beck，1902–1974），地铁信号办公室制图员', 'Harry Beck (1902–1974), Underground signals draftsman') },
      { label: loc('设计年份', 'Designed'), value: loc('1931（1933 年首次印发试销）', '1931 (first trial printing, 1933)') },
      { label: loc('发行方', 'Publisher'), value: loc('伦敦客运局（London Transport）', 'London Transport') },
      { label: loc('试印量', 'Trial print run'), value: loc('750 份，迅速售罄', '750 copies, sold out at once') },
    ],
    blocks: [
      { id: 'bk-topology', kind: 'text', title: loc('拓扑学替代地理学', 'Topology replaces geography'), body: loc('地铁乘客看不见地面风景，只与网络发生关系：站点是节点，线路是边，换乘是连接。贝克大胆抹除距离与方位，只保留连接关系——这是数学家“拓扑变换”（拉伸不改变结构）的直觉实现。', 'The underground passenger sees no streetscape, only the network: stations as nodes, lines as edges, interchanges as connections. Beck erased distance and compass direction, keeping only connections — an intuitive realization of the mathematical topology in which stretching preserves structure.') },
      { id: 'bk-diagonal', kind: 'text', title: loc('45 度的秩序', 'The discipline of 45 degrees'), body: loc('所有线路只允许水平、垂直与 45 度斜线，站点沿线路等距排布。规则极少，因此网络再复杂也呈现为一张安静、可扫描的图——瑞士网格“信息即工程”的精神在此提前到来。', 'Lines run only horizontally, vertically or at 45 degrees, stations evenly spaced along them. With so few rules the most tangled network reads as a calm, scannable diagram — the Swiss-grid spirit of information-as-engineering arriving early.') },
      { id: 'bk-color', kind: 'text', title: loc('颜色是线路的名字', 'Color as the name of a line'), body: loc('每条线路一种高饱和色：中央线红、北线黑、区域线绿。颜色在折叠的小图上先于文字被识别，换乘站则用同心圆标记——在拥挤车厢里一瞥就能做出决策。', 'Each line gets one saturated hue: Central red, Northern black, District green. Color is recognized before text on a folded sheet, interchanges marked with concentric circles — decisions made in a single glance in a crowded carriage.') },
      { id: 'bk-legacy', kind: 'text', title: loc('被模仿九十年', 'Imitated for ninety years'), body: loc('从悉尼到莫斯科，现代地铁图都是贝克的后代；它与瑞士排版、AIGA 公共符号共同构成现代导视的三件套。它教给设计师的教训至今有效：先问使用者在那个情境下需要什么，再决定地图的“真相”是什么。', 'From Sydney to Moscow, modern transit maps descend from Beck; together with Swiss typography and the AIGA symbols they form the trinity of modern wayfinding. Its lesson endures: ask what the user needs in the situation, then decide which “truth” the map should tell.') },
    ],
    palette: ['#f7f4ea', '#e3262e', '#0072ce', '#111111', '#00a651', '#ffd329'],
    tags: ['信息设计', '地铁图', '伦敦'],
    modes: ['detail', 'comparison', 'archive'],
    weight: 82,
  } as EntityBase,
];
