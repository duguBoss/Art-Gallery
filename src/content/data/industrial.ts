import type { EntityBase } from '../../model/entity';
import { loc } from '../../model/i18n';

/**
 * Industrial design corpus — functionalism, from Braun to Apple.
 *
 * The objects documented here are copyright contemporary product designs;
 * per house policy they are deliberately text-first (no image fields).
 * Palettes are still authored so color exploration works. Entities carrying
 * person-/object-/style-specific fields use an `as EntityBase` assertion
 * because this is a mixed-type corpus exported under the shared base type.
 */
export const INDUSTRIAL: EntityBase[] = [
  // ================================================================== 人物
  {
    id: 'person-rams',
    type: 'person',
    slug: 'dieter-rams',
    name: loc('迪特·拉姆斯', 'Dieter Rams'),
    birthYear: 1932,
    birthPlaceId: 'place-dessau',
    occupation: loc('工业设计师 · 博朗设计主管', 'Industrial designer · Braun design director'),
    tagline: loc('少，却更好', 'Less, but better'),
    summary: loc(
      '他在博朗四十年把收音机、唱机与电动牙刷做成功能主义的道德典范，晚年发现自己的设计在苹果的产品线里重生。',
      'At Braun for forty years he made radios, record players and shavers into moral exemplars of functionalism — then watched his language re-emerge at Apple.',
    ),
    body: [
      loc(
        '拉姆斯 1955 年加入博朗，深受乌尔姆设计学院“设计是系统工程”的影响。他反对年度改款与装饰性造型，把“好设计”归纳为十条原则：创新、实用、美观、易懂、克制、诚实、耐用、细致、环保，以及“尽可能少的设计”。',
        'Rams joined Braun in 1955, shaped by the Ulm School’s view of design as systems engineering. Rejecting annual restyling and ornament, he codified good design into ten principles: innovative, useful, aesthetic, understandable, unobtrusive, honest, long-lasting, thorough, environmentally friendly — and as little design as possible.',
      ),
      loc(
        '他与汉斯·古格洛特合作的 SK4 唱机以白色金属机身与透明盖被戏称为“白雪公主之棺”，却成为后世消费电子的形态范本。乔纳森·艾维曾公开以拉姆斯为精神导师，iPod 的转轮里有 T3 收音机的影子。',
        'His SK4 record player with Hans Gugelot — white metal body, transparent lid, nicknamed “Snow White’s coffin” — became the formal template for consumer electronics. Jonathan Ive openly claimed Rams as his influence; the iPod wheel echoes the T3 radio’s dial.',
      ),
    ],
    cultureId: 'culture-germanic',
    domainIds: ['industrial', 'design'],
    conceptIds: ['c-less-but-better', 'c-ten-good-design', 'c-form-follows-function'],
    facts: [
      { label: loc('生卒', 'Born'), value: loc('1932 年生于威斯巴登', 'Born 1932, Wiesbaden') },
      { label: loc('任职', 'Career'), value: loc('博朗 1955–1995', 'Braun, 1955–1995') },
      { label: loc('信条', 'Motto'), value: loc('少，却更好（Weniger, aber besser）', 'Less, but better') },
    ],
    tags: ['功能主义', '博朗', '好设计十原则'],
    modes: ['story', 'network'],
    weight: 88,
  } as EntityBase,
  {
    id: 'person-eames',
    type: 'person',
    slug: 'charles-and-ray-eames',
    name: loc('查尔斯与蕾·伊姆斯', 'Charles & Ray Eames'),
    birthYear: 1907,
    deathYear: 1988,
    occupation: loc('设计师组合 · 家具、建筑与展览', 'Design partnership · furniture, architecture, exhibitions'),
    tagline: loc('用最少的，为最多的人，做最好的', 'The best for the most for the least'),
    summary: loc(
      '一对夫妻搭档把二战的胶合板成型技术变成贴合脊背的椅子，也把“设计是一种生活方式”演示给整个战后美国。',
      'A husband-and-wife partnership who turned wartime plywood-molding technology into chairs that fit the spine — and demonstrated to postwar America that design is a way of living.',
    ),
    body: [
      loc(
        '查尔斯·伊姆斯（1907–1978，建筑师）与蕾·伊姆斯（1912–1988，画家出身）在洛杉矶的工作室像一个永不打烊的实验室：胶合板热压、玻璃纤维壳体、网格住宅、多屏幻灯片与展览设计都从这里产出。他们拒绝“设计师风格”，相信问题本身会给出形式。',
        'Charles Eames (1907–1978, architect) and Ray Eames (1912–1988, trained as a painter) ran their Los Angeles studio as a never-closing laboratory: molded plywood, fiberglass shells, the gridded Eames House, multi-screen slideshows and exhibitions. They refused a “designer style”, trusting the problem to supply the form.',
      ),
      loc(
        '1946 年的 LCW 木椅把一块胶合板压成同时承受坐姿与呼吸的双曲面，橡胶减震件让硬木学会了柔软。《建筑评论》称它为“20 世纪最好的椅子设计”——它的技术与伦理同样影响了拉姆斯与北欧家具。',
        'The 1946 LCW bent plywood into a double curve that accepts both posture and breath, while rubber shock mounts taught hard wood to flex. Architectural Review called it “the best chair design of the 20th century”; its technology and ethics shaped both Rams and Nordic furniture.',
      ),
    ],
    cultureId: 'culture-american',
    domainIds: ['industrial', 'design', 'craft'],
    conceptIds: ['c-ergonomics', 'c-form-follows-function', 'c-modularity'],
    facts: [
      { label: loc('搭档', 'Partnership'), value: loc('查尔斯 1907–1978 / 蕾 1912–1988', 'Charles 1907–1978 / Ray 1912–1988') },
      { label: loc('基地', 'Base'), value: loc('洛杉矶伊姆斯工作室（1943 起）', 'Eames Office, Los Angeles (from 1943)') },
      { label: loc('制造商', 'Manufacturer'), value: loc('Herman Miller', 'Herman Miller') },
    ],
    tags: ['胶合板', '美国家具', '系统设计'],
    modes: ['story', 'network'],
    weight: 86,
  } as EntityBase,
  {
    id: 'person-sottsass',
    type: 'person',
    slug: 'ettore-sottsass',
    name: loc('埃托雷·索特萨斯', 'Ettore Sottsass'),
    birthYear: 1917,
    deathYear: 2007,
    occupation: loc('建筑师 · 设计师 · 孟菲斯集团创始人', 'Architect · designer · founder of Memphis'),
    tagline: loc('给机器一点情欲', 'Give machines some eroticism'),
    summary: loc(
      '他设计了鲜红的 Valentine 打字机，又在 64 岁那年创立孟菲斯集团，用斑点、层压板与歪斜的书架向“形式追随功能”开火。',
      'He designed the bright red Valentine typewriter, then at 64 founded the Memphis Group, firing speckled laminates and tilting bookshelves at the dogma of form follows function.',
    ),
    body: [
      loc(
        '索特萨斯出身奥地利建筑家庭，在意大利北部成长。1958 年起他为好利获得（Olivetti）做设计顾问，把办公机器从灰色工具变成有情绪的随身物：红色的 Valentine 打字机可以带去沙滩，它首先是一件生活方式道具，其次才是机器。',
        'Raised in Italy in an Austrian architectural family, Sottsass consulted for Olivetti from 1958, turning office machines from grey tools into emotional companions: the red Valentine could be taken to the beach — a lifestyle prop first, a machine second.',
      ),
      loc(
        '1981 年，他在米兰的客厅里与一群年轻设计师创立孟菲斯（Memphis）：塑料层压板、撞色几何图案、故意不稳定的书架，宣告设计不必道歉地提供愉悦。这是对拉姆斯式清教功能主义最响亮的欧洲反叛。',
        'In 1981, in a Milan living room, he co-founded Memphis with young designers: plastic laminates, clashing geometric patterns and deliberately unstable shelves declared that design could offer pleasure without apology — Europe’s loudest rebellion against Rams-style puritan functionalism.',
      ),
    ],
    cultureId: 'culture-italian',
    domainIds: ['industrial', 'design'],
    conceptIds: ['c-ergonomics', 'c-form-follows-function'],
    facts: [
      { label: loc('生卒', 'Lifespan'), value: loc('1917–2007', '1917–2007') },
      { label: loc('顾问', 'Consultancy'), value: loc('好利获得 Olivetti（1958 起）', 'Olivetti (from 1958)') },
      { label: loc('创立', 'Founded'), value: loc('孟菲斯集团，1981 年于米兰', 'Memphis Group, Milan, 1981') },
    ],
    tags: ['孟菲斯', '反设计', '好利获得'],
    modes: ['story', 'network'],
    weight: 80,
  } as EntityBase,
  {
    id: 'person-morita',
    type: 'person',
    slug: 'akio-morita',
    name: loc('盛田昭夫', 'Akio Morita'),
    birthYear: 1921,
    deathYear: 1999,
    birthPlaceId: 'place-edo',
    placeId: 'place-edo',
    occupation: loc('企业家 · 索尼联合创始人', 'Entrepreneur · Sony co-founder'),
    tagline: loc('先做出产品，再唤醒需求', 'Build the product first; the need follows'),
    summary: loc(
      '米酒商家庭出身的他把东京通信工业做成“索尼”，并用一台没有录音功能、没有外放的随身听，定义了“个人音频”这个品类。',
      'Born to a sake-brewing family, he built Tokyo Tsushin Kogyo into “Sony” and defined the category of personal audio with a player that could neither record nor play out loud.',
    ),
    body: [
      loc(
        '1946 年盛田昭夫与井深大在战后废墟中创立东京通信工业，1958 年改名索尼（SONY）。他坚持用全球可发音的品牌名、坚持晶体管小型化，让日本制造从“廉价仿造”翻转为“精密小巧”的同义词。',
        'In 1946 Morita and Masaru Ibuka founded Tokyo Tsushin Kogyo in postwar ruins, renaming it Sony in 1958. He insisted on a globally pronounceable brand name and on transistor miniaturization, turning “Made in Japan” from cheap imitation into a synonym for precision compactness.',
      ),
      loc(
        '1979 年的 Walkman 起初遭到工程师反对：不能录音、不能外放，违反“功能越多越好”的惯例。盛田押注的是“场景”——年轻人想把音乐带上街。TPS-L2 甚至保留两个耳机孔，因为他相信音乐本该共享。',
        'The 1979 Walkman was opposed by engineers: it could neither record nor play aloud, violating the “more features is better” rule. Morita was selling a scenario — young people taking music into the street. The TPS-L2 even kept two headphone jacks, because he believed music should be shared.',
      ),
    ],
    cultureId: 'culture-japanese',
    domainIds: ['industrial', 'design'],
    conceptIds: ['c-ergonomics', 'c-modularity'],
    facts: [
      { label: loc('生卒', 'Lifespan'), value: loc('1921–1999', '1921–1999') },
      { label: loc('创立', 'Founded'), value: loc('东京通信工业（1946）/ 索尼（1958）', 'Tokyo Tsushin Kogyo (1946) / Sony (1958)') },
      { label: loc('代表作', 'Signature product'), value: loc('Walkman TPS-L2（1979）', 'Walkman TPS-L2 (1979)') },
    ],
    tags: ['索尼', '随身听', '日本制造'],
    modes: ['story'],
    weight: 82,
  } as EntityBase,
  {
    id: 'person-ive',
    type: 'person',
    slug: 'jonathan-ive',
    name: loc('乔纳森·艾维', 'Jonathan Ive'),
    birthYear: 1967,
    occupation: loc('工业设计师 · 苹果首席设计官', 'Industrial designer · Apple Chief Design Officer'),
    tagline: loc('把拉姆斯的原则装进整块铝', 'Rams’s principles, carved from a block of aluminum'),
    summary: loc(
      '伦敦出生的设计师在苹果库比蒂诺把 iMac、iPod 与 iPhone 做成亿万人手中的极简物件，证明软件时代的工业设计依然能决定公司命运。',
      'The London-born designer made the iMac, iPod and iPhone into minimalist objects held by billions, proving that industrial design still decides a company’s fate in the software age.',
    ),
    body: [
      loc(
        '艾维 1992 年加入苹果，1997 年乔布斯回归后主导设计团队。iMac G3 的糖果色半透明塑料让电脑第一次有了情绪；随后他转向极端克制——iPod 的白色、MacBook 的一体成型铝合金、iPhone 正面唯一的圆形 Home 键。',
        'Ive joined Apple in 1992 and led design after Jobs’s 1997 return. The candy-colored translucent iMac G3 gave computers emotion; then he turned to extreme restraint — the iPod’s whiteness, the MacBook’s unibody aluminum, the iPhone’s single round Home button.',
      ),
      loc(
        '他多次承认自己的参照系是迪特·拉姆斯：相似不是巧合，而是同一套“少而更好”原则在半个世纪后的材料实现。2019 年他离开苹果创立 LoveFrom，但他留下的设计语言已经成为消费电子的默认底色。',
        'He repeatedly named Dieter Rams as his reference: the resemblance is not coincidence but the same “less, but better” principles realized in the materials of a later half-century. He left Apple in 2019 to found LoveFrom, but his visual language remains the default of consumer electronics.',
      ),
    ],
    domainIds: ['industrial', 'design'],
    conceptIds: ['c-less-but-better', 'c-ten-good-design', 'c-universal-design'],
    facts: [
      { label: loc('出生', 'Born'), value: loc('1967 年生于伦敦', 'Born 1967, London') },
      { label: loc('任职', 'Career'), value: loc('苹果 1992–2019，后创立 LoveFrom', 'Apple 1992–2019; later LoveFrom') },
      { label: loc('代表作', 'Key works'), value: loc('iMac / iPod / iPhone / iPad', 'iMac / iPod / iPhone / iPad') },
    ],
    tags: ['苹果', '极简设计', '一体成型'],
    modes: ['story', 'network'],
    weight: 85,
  } as EntityBase,

  // ================================================================== 物品
  {
    id: 'object-braun-sk4',
    type: 'object',
    slug: 'braun-sk4-phonosuper',
    name: loc('博朗 SK4 电唱机', 'Braun SK4 “Phonosuper” Record Player'),
    yearStart: 1956,
    medium: loc('涂漆钢板机身、亚克力透明盖与木质侧板', 'Painted steel body, transparent acrylic lid, wooden side panels'),
    tagline: loc('“白雪公主之棺”', '“Snow White’s coffin”'),
    summary: loc(
      '白色金属机身、透明亚克力盖、严格网格排列的旋钮——它让家用电器第一次看起来像实验室仪器，也像一件克制的家具。',
      'White metal body, transparent acrylic lid, knobs on a strict grid — the first home appliance to look like laboratory equipment and, at once, like restrained furniture.',
    ),
    body: [
      loc(
        '1956 年，拉姆斯与乌尔姆设计学院的汉斯·古格洛特联手设计 SK4。当时的电唱机普遍是包裹织物的木盒子，像一件要藏起来的家具；他们反其道而行：机身涂成白漆金属，唱盘盖用透明亚克力，内部机械坦然可见。',
        'In 1956 Rams and Hans Gugelot of the Ulm School designed the SK4. Record players then were fabric-covered wooden boxes, furniture to be hidden away. They inverted the habit: white-lacquered metal body, a transparent acrylic lid, the mechanism openly visible.',
      ),
      loc(
        '销售部门最初嫌弃它太冷，戏称“白雪公主之棺”；这个绰号反而成为设计史上最著名的昵称之一。SK4 确立了博朗此后三十年的形式语法：正交的面、中性的色、按功能分区的控制界面。',
        'Sales staff found it cold and nicknamed it “Snow White’s coffin” — a joke that became one of design history’s most famous monikers. The SK4 fixed Braun’s grammar for three decades: orthogonal planes, neutral color, controls zoned by function.',
      ),
    ],
    creatorIds: ['person-rams'],
    materialIds: ['mat-steel-glass', 'mat-wood'],
    conceptIds: ['c-ten-good-design', 'c-less-but-better', 'c-form-follows-function'],
    cultureId: 'culture-germanic',
    periodId: 'period-postwar',
    domainIds: ['industrial', 'design'],
    facts: [
      { label: loc('设计师', 'Designers'), value: loc('迪特·拉姆斯与汉斯·古格洛特', 'Dieter Rams & Hans Gugelot') },
      { label: loc('年份', 'Year'), value: loc('1956', '1956') },
      { label: loc('制造商', 'Manufacturer'), value: loc('博朗 Braun（德国克龙贝格）', 'Braun, Kronberg, Germany') },
      { label: loc('昵称', 'Nickname'), value: loc('白雪公主之棺', 'Snow White’s coffin') },
    ],
    blocks: [
      { id: 'sk4-lid', kind: 'text', title: loc('透明盖：让机械坦然可见', 'The transparent lid: mechanism on display'), body: loc('传统唱机用织物木盖藏起唱盘。SK4 的亚克力盖把旋转的唱片与唱臂变成观看对象——诚实原则的物质化：不掩饰结构，也不装饰结构。', 'Fabric lids hid the turntable. The SK4’s acrylic lid turns the spinning record and tonearm into something to watch — the principle of honesty made material: structure neither concealed nor decorated.') },
      { id: 'sk4-grid', kind: 'text', title: loc('控制界面即排版', 'The control panel as typography'), body: loc('旋钮、按键与刻度按模数网格对齐，标签使用无衬线字体。界面像一张瑞士排版海报：每个控件的位置都由它与手部、视线的关系决定。', 'Knobs, keys and scales align on a modular grid with sans-serif labels. The panel reads like a Swiss poster: every control sited according to its relation to hand and eye.') },
      { id: 'sk4-white', kind: 'text', title: loc('白色金属的立场', 'White metal as a stance'), body: loc('白漆钢板与浅木侧板去掉了“客厅家具”的符号负担，让机器获得仪器般的中立感。白色此后成为消费电子“诚实技术”的默认色，直到 2001 年的 iPod。', 'White lacquer and pale wood strip away the signs of “living-room furniture”, giving the machine the neutrality of an instrument. White became the default color of honest consumer technology — until the iPod in 2001.') },
      { id: 'sk4-lineage', kind: 'text', title: loc('半世纪的回声', 'An echo across fifty years'), body: loc('苹果设计团队曾把 SK4 与 iPod 并置陈列。透明盖之于唱机，正如玻璃屏幕之于手机：技术不再假装是别的东西，它以自己的结构示人。', 'Apple’s design team once displayed the SK4 beside the iPod. The transparent lid is to the record player what the glass screen is to the phone: technology ceases to pretend to be something else and presents its own structure.') },
    ],
    palette: ['#f4f3ee', '#e3e1d8', '#161616', '#9a9a94', '#c9c7bd'],
    tags: ['博朗', '功能主义', '电唱机'],
    modes: ['detail', 'material', 'comparison'],
    weight: 84,
  } as EntityBase,
  {
    id: 'object-braun-t3',
    type: 'object',
    slug: 'braun-t3-pocket-radio',
    name: loc('博朗 T3 袖珍收音机', 'Braun T3 Pocket Radio'),
    yearStart: 1958,
    medium: loc('模压塑料外壳', 'Molded plastic shell'),
    tagline: loc('掌心的网格', 'A grid in the palm'),
    summary: loc(
      '晶体管让收音机可以握在手里，拉姆斯用一只圆形调谐窗和一排克制的按键，为“掌上电子”写下第一套界面语法。',
      'The transistor put radio in the palm; Rams answered with a circular tuning window and a restrained row of keys — the first interface grammar for handheld electronics.',
    ),
    body: [
      loc(
        'T3 是最早的晶体管袖珍收音机之一。拉姆斯没有让缩小的机器模仿大型木壳收音机，而是重新从口袋与手掌出发：圆形调谐窗对应拇指的旋转动作，扬声器格栅以等距圆孔排列，频率刻度大到一瞥可读。',
        'The T3 was among the earliest transistor pocket radios. Rather than shrinking a wooden tabletop set, Rams started from pocket and palm: a circular tuning window for the rotating thumb, a grille of equidistant holes, and a frequency scale legible at a glance.',
      ),
      loc(
        '它的浅灰塑料机身几乎取消了“造型”，只保留比例与节奏。四十三年后，iPod 的白色外壳与圆形转轮被评论界直接读作 T3 的转世——拉姆斯本人也认同这一谱系。',
        'Its pale-grey plastic shell nearly abolishes “styling”, leaving proportion and rhythm. Forty-three years later the iPod’s white body and circular wheel were read by critics as the T3 reincarnated — a lineage Rams himself acknowledged.',
      ),
    ],
    creatorIds: ['person-rams'],
    materialIds: ['mat-abs-plastic'],
    conceptIds: ['c-ten-good-design', 'c-less-but-better', 'c-ergonomics'],
    cultureId: 'culture-germanic',
    periodId: 'period-postwar',
    domainIds: ['industrial', 'design'],
    facts: [
      { label: loc('设计师', 'Designer'), value: loc('迪特·拉姆斯', 'Dieter Rams') },
      { label: loc('年份', 'Year'), value: loc('1958', '1958') },
      { label: loc('制造商', 'Manufacturer'), value: loc('博朗 Braun', 'Braun') },
      { label: loc('器件', 'Technology'), value: loc('晶体管袖珍机型', 'Transistor pocket radio') },
    ],
    blocks: [
      { id: 't3-palm', kind: 'text', title: loc('从手掌反推形态', 'Form inferred from the palm'), body: loc('器件小型化之后，设计的约束从“元件体积”变成“人体尺度”。机身宽度等于手掌宽度，重量落在拇指与食指之间——形态由握持方式反推。', 'Once components shrank, the constraint moved from part volume to human scale. The body is palm-width, weighted between thumb and forefinger — form inferred backward from the grip.') },
      { id: 't3-dial', kind: 'text', title: loc('圆形调谐窗', 'The circular dial'), body: loc('调谐是旋转动作，控件就做成圆形；频率刻度沿圆周展开，转动时窗口中的红线给出精确反馈。动作、控件与反馈三者同构。', 'Tuning is rotation, so the control is a circle; the frequency scale runs around it and a red line gives precise feedback. Action, control and feedback are isomorphic.') },
      { id: 't3-restraint', kind: 'text', title: loc('没有造型的造型', 'Styling without styling'), body: loc('机身没有任何装饰线与徽标姿态，只有等距格栅与一个深色圆形。拉姆斯说不引人注目（unobtrusive）是好设计的义务——工具应在需要时出现，在不需要时消失。', 'No decorative lines or logo gestures — only an equidistant grille and one dark circle. To be unobtrusive is an obligation: a tool appears when needed and disappears when not.') },
    ],
    palette: ['#f2f0e9', '#dcd8cd', '#232323', '#a8a294'],
    tags: ['博朗', '晶体管', '界面'],
    modes: ['detail', 'material', 'comparison'],
    weight: 80,
  } as EntityBase,
  {
    id: 'object-eames-lcw',
    type: 'object',
    slug: 'eames-lcw-chair',
    name: loc('伊姆斯 LCW 休闲木椅', 'Eames LCW (Lounge Chair Wood)'),
    yearStart: 1946,
    medium: loc('热压成型多层胶合板，橡胶减震件连接', 'Molded laminated plywood with rubber shock mounts'),
    tagline: loc('一块学会弯腰的木板', 'A plank that learned to bend'),
    summary: loc(
      '二战的飞机胶合板技术在战后变成一把椅子：整块座面弯成贴合脊背的双曲面，用四个橡胶减震件轻轻落在四条木腿上。',
      'Wartime aircraft plywood became a chair in peacetime: the seat and back bent into spine-fitting double curves, resting on four wooden legs via rubber shock mounts.',
    ),
    body: [
      loc(
        '战争期间，伊姆斯夫妇为海军开发夹板成型担架与滑翔机部件，掌握了把多层薄木胶合后热压成复杂曲面的技术。1946 年的 LCW 把这项技术民用化：座面与靠背各自是一片连续曲面，没有榫卯、没有雕刻，只有压出来的形状。',
        'During the war the Eameses developed molded-plywood splints and glider parts for the Navy, mastering laminated wood heat-pressed into compound curves. The 1946 LCW civilianized the technique: seat and back are each one continuous curve — no joinery, no carving, only pressed shape.',
      ),
      loc(
        '曲面与木腿之间的黑色橡胶减震件是神来之笔：硬木获得了弹性，坐姿变化时椅子微微“呼吸”。它低价、可堆叠、耐用，被《建筑评论》称为“20 世纪最好的椅子设计”。',
        'The black rubber shock mounts between shell and legs are the masterstroke: hardwood gains elasticity, and the chair breathes slightly as the sitter moves. Inexpensive, stackable and durable, it was named “the best chair design of the 20th century” by Architectural Review.',
      ),
    ],
    creatorIds: ['person-eames'],
    materialIds: ['mat-wood'],
    conceptIds: ['c-ergonomics', 'c-form-follows-function'],
    cultureId: 'culture-american',
    periodId: 'period-modern',
    domainIds: ['industrial', 'design', 'craft'],
    facts: [
      { label: loc('设计师', 'Designers'), value: loc('查尔斯与蕾·伊姆斯', 'Charles & Ray Eames') },
      { label: loc('年份', 'Year'), value: loc('1946', '1946') },
      { label: loc('制造商', 'Manufacturer'), value: loc('Evans Products，后由 Herman Miller 接续', 'Evans Products; later Herman Miller') },
      { label: loc('荣誉', 'Honor'), value: loc('《建筑评论》“20 世纪最佳椅子设计”', 'Architectural Review: “best chair design of the 20th century”') },
    ],
    blocks: [
      { id: 'lcw-curve', kind: 'text', title: loc('双曲面贴合身体', 'The double curve fits the body'), body: loc('平板只能顶住脊背一点；双曲面在腰椎、肩胛与大腿后侧同时承接。伊姆斯夫妇用全身石膏模型研究坐姿，让木材记住身体的形状。', 'A flat board presses the spine at one point; a double curve supports lumbar, shoulders and thighs at once. The Eameses studied seated posture with full-body plaster casts, making wood remember the body’s shape.') },
      { id: 'lcw-rubber', kind: 'text', title: loc('橡胶减震件', 'Rubber shock mounts'), body: loc('曲面壳体不直接拧在木腿上，而由四个黑色橡胶件转接——震动被吸收，结构有了容错间隙。最硬的材料组合出最柔软的坐姿。', 'The shell is not bolted to the legs but joined through four black rubber mounts: vibration absorbed, tolerance gaps built in. The hardest materials compose the softest seat.') },
      { id: 'lcw-industry', kind: 'text', title: loc('军工技术的民用化', 'Military technology, civilian use'), body: loc('热压胶合板本为飞机与担架开发。战后技术溢出到家具，是“形式追随功能”最具体的版本：不是美学口号，而是工艺转移。', 'Heat-pressed plywood was developed for aircraft and splints. Its postwar spill into furniture is form-follows-function at its most concrete: not an aesthetic slogan but craft transfer.') },
      { id: 'lcw-democracy', kind: 'text', title: loc('为大多数人的好设计', 'Good design for the many'), body: loc('LCW 定价面向普通家庭，而非博物馆藏家。伊姆斯夫妇的信条“用最少的、为最多的人、做最好的”，预告了北欧“民主化设计”与宜家逻辑。', 'The LCW was priced for ordinary homes, not museum collectors. The Eames creed — “the best for the most for the least” — prefigured Nordic democratic design and the IKEA logic.') },
    ],
    palette: ['#a06a3c', '#c89b6a', '#7c4f2b', '#e2d4b8', '#33271d'],
    tags: ['胶合板', '伊姆斯', '椅子'],
    modes: ['detail', 'material', 'comparison'],
    weight: 82,
  } as EntityBase,
  {
    id: 'object-valentine-typewriter',
    type: 'object',
    slug: 'olivetti-valentine-typewriter',
    name: loc('好利获得 Valentine 打字机', 'Olivetti Valentine Typewriter'),
    yearStart: 1969,
    medium: loc('红色注塑 ABS 塑料机身，配套同色手提箱', 'Red injection-molded ABS body with matching carrying case'),
    tagline: loc('带去沙滩的打字机', 'A typewriter for the beach'),
    summary: loc(
      '一台鲜红的打字机，配同色塑料手提箱：索特萨斯把办公机器变成反文化时代的随身道具，让功能主义第一次脸红。',
      'A bright red typewriter in a matching plastic case: Sottsass turned office equipment into a counterculture accessory — and made functionalism blush for the first time.',
    ),
    body: [
      loc(
        '1969 年，好利获得推出 Valentine：全红 ABS 塑料机身、红色色带、同色手提箱，广告里它出现在沙滩与涂鸦墙前。索特萨斯说它“不是为办公室学生设计的，而是为诗人”——机械书写第一次拥有了波普身份。',
        'In 1969 Olivetti launched the Valentine: an all-red ABS body, red ribbon and matching case, advertised on beaches and against graffiti walls. Sottsass said it was “not for office clerks but for poets” — mechanical writing acquired a pop identity for the first time.',
      ),
      loc(
        '它的机械结构并不新奇，甚至刻意简单（没有小写切换等便利功能）；革命性在于态度：塑料不再是“廉价的代用品”，而是可以饱和着色、可以情绪化的正当材料。它随即进入 MoMA 永久收藏，也成为孟菲斯十年后那场反叛的先声。',
        'Its mechanics were conventional, even deliberately basic; the revolution was attitude. Plastic ceased to mean “cheap substitute” and became a legitimate material capable of saturated color and emotion. It entered MoMA’s permanent collection and prefigured the Memphis revolt a decade later.',
      ),
    ],
    creatorIds: ['person-sottsass'],
    materialIds: ['mat-abs-plastic'],
    conceptIds: ['c-ergonomics', 'c-form-follows-function'],
    cultureId: 'culture-italian',
    periodId: 'period-postwar',
    domainIds: ['industrial', 'design'],
    facts: [
      { label: loc('设计师', 'Designer'), value: loc('埃托雷·索特萨斯（与 Perry King 合作）', 'Ettore Sottsass (with Perry King)') },
      { label: loc('年份', 'Year'), value: loc('1969', '1969') },
      { label: loc('制造商', 'Manufacturer'), value: loc('好利获得 Olivetti（意大利）', 'Olivetti, Italy') },
      { label: loc('收藏', 'Collection'), value: loc('纽约现代艺术博物馆（MoMA）永久收藏', 'Permanent collection, MoMA, New York') },
    ],
    blocks: [
      { id: 'val-red', kind: 'text', title: loc('红色即立场', 'Red as position'), body: loc('博朗的中立色宣告“我是工具”；Valentine 的饱和红宣告“我是态度”。同一套注塑工艺，两种现代性：一种追求消失，一种追求出场。', 'Braun’s neutrals declare “I am a tool”; the Valentine’s saturated red declares “I am an attitude”. One molding process, two modernisms — one seeks disappearance, the other presence.') },
      { id: 'val-case', kind: 'text', title: loc('手提箱：把产品变成道具', 'The case: product as prop'), body: loc('同色塑料箱让打字机可以像吉他一样斜挎出门。产品定义里第一次写入“使用场景的浪漫想象”——它卖的不是打字功能，而是诗人的身份。', 'The matching case lets the typewriter be slung like a guitar. For the first time a romantic scenario was written into the product spec: it sold not typing but the identity of poet.') },
      { id: 'val-plastic', kind: 'text', title: loc('塑料的正名', 'Plastic vindicated'), body: loc('ABS 坚固、可注塑、可整体着色，本是工程材料；Valentine 证明它也是情感材料。材料等级制（木与金属高贵、塑料廉价）从此松动。', 'ABS is tough, moldable and color-through — an engineering material; the Valentine proved it an emotional one too. The hierarchy that ranked wood and metal above plastic never fully recovered.') },
      { id: 'val-anti', kind: 'text', title: loc('对功能主义的温柔反叛', 'A gentle revolt against functionalism'), body: loc('它依然好用、便携、结构诚实，但装饰性的色彩与姿态公然违抗“中立克制”的教条。孟菲斯的斑点层压板，在这台红色机器里已埋下种子。', 'It remained usable, portable and structurally honest, yet its decorative color defied the dogma of neutral restraint. Memphis’s speckled laminates were already seeded in this red machine.') },
    ],
    palette: ['#d71920', '#f3efe6', '#1b1b1b', '#c6bfae'],
    tags: ['好利获得', '波普', '塑料'],
    modes: ['detail', 'material', 'comparison'],
    weight: 80,
  } as EntityBase,
  {
    id: 'object-walkman',
    type: 'object',
    slug: 'sony-walkman-tps-l2',
    name: loc('索尼 Walkman TPS-L2', 'Sony Walkman TPS-L2'),
    yearStart: 1979,
    medium: loc('蓝银金属与塑料机身，配立体声耳机', 'Blue-and-silver metal and plastic body with stereo headphones'),
    tagline: loc('把立体声戴上街', 'Take stereo to the street'),
    summary: loc(
      '不能录音、不能外放、只能一个人（或两个人）听——这台违反工程常识的减法产品，创造了“个人随身音频”这个百亿市场。',
      'It could not record, could not play aloud, and served one listener (or two). A product that defied engineering common sense — and invented the billion-dollar category of personal portable audio.',
    ),
    body: [
      loc(
        '1979 年 7 月 1 日发售的 TPS-L2 是首款 Walkman：蓝银双色机身、两个耳机孔、一对轻便耳机。工程师反对删减录音与外放功能，盛田昭夫坚持——他观察到年轻人想在户外共享立体声音乐，而不是在家独自守着音响。',
        'Released 1 July 1979, the TPS-L2 was the first Walkman: blue-and-silver body, two headphone jacks, lightweight earphones. Engineers fought to keep recording and speakers; Akio Morita insisted — he had watched young people wanting stereo outdoors, not sitting at home systems.',
      ),
      loc(
        'Walkman 的真正发明是“个人声音空间”：戴上耳机，城市退居背景，街道成为私人电影的配乐。它改变了通勤、慢跑与地铁礼仪，也让“为场景做减法”成为日本消费电子的方法论。',
        'The Walkman’s real invention was personal acoustic space: put on headphones and the city recedes, the street becomes a private film score. It changed commuting, jogging and subway etiquette — and made “subtraction for a scenario” the method of Japanese consumer electronics.',
      ),
    ],
    creatorIds: ['person-morita'],
    materialIds: ['mat-anodized-aluminum', 'mat-abs-plastic'],
    conceptIds: ['c-ergonomics', 'c-modularity'],
    cultureId: 'culture-japanese',
    periodId: 'period-postwar',
    domainIds: ['industrial', 'design'],
    facts: [
      { label: loc('制造商', 'Manufacturer'), value: loc('索尼 Sony', 'Sony') },
      { label: loc('年份', 'Year'), value: loc('1979 年 7 月 1 日', '1 July 1979') },
      { label: loc('型号', 'Model'), value: loc('TPS-L2，首款 Walkman', 'TPS-L2, the first Walkman') },
      { label: loc('特点', 'Feature'), value: loc('双耳机孔、无外放、无录音', 'Two headphone jacks; no speaker, no recording') },
    ],
    blocks: [
      { id: 'wm-subtract', kind: 'text', title: loc('减法即创新', 'Subtraction as innovation'), body: loc('在“功能越多越好”的年代，Walkman 主动删掉录音与喇叭。少掉的功能逼出了新品类：设备不再以参数竞争，而以使用场景定义。', 'In an age of more-features-is-better, the Walkman deleted recording and speakers. The missing functions forced a new category: devices defined not by specs but by scenario.') },
      { id: 'wm-body', kind: 'text', title: loc('佩戴决定机身', 'Wearability decides the body'), body: loc('机身夹在腰间或握在手中，重量必须低于一瓶水；按键位置由戴耳机时的盲操作决定。耳机不是附件，而是产品形态的起点。', 'Clipped to a belt or held in hand, it had to weigh less than a bottle of water; keys were placed for blind operation while wearing headphones. The earphones were not an accessory but the starting point of form.') },
      { id: 'wm-modular', kind: 'text', title: loc('电池、磁带与耳机的模块', 'Modules: batteries, cassette, headphones'), body: loc('五号电池供电、标准磁带、可换耳机——机身是一个把通用模块组织起来的最小平台。可更换模块让设备寿命跟随电池而非整机。', 'AA batteries, standard cassettes, replaceable headphones — the body was a minimal platform organizing generic modules. Swappable parts let the device outlast its battery.') },
      { id: 'wm-space', kind: 'text', title: loc('私人声音气泡', 'The private sound bubble'), body: loc('耳机在公共空间里切出一个私人声场，地铁车厢从此可以是音乐厅。这是“通用设计”之前的个性化：技术适应人的生活节奏，而非相反。', 'Headphones carve a private sound field from public space; the subway car could become a concert hall. Personalization before the term: technology adapting to the rhythm of life.') },
    ],
    palette: ['#2e4d7b', '#d6d9e0', '#101216', '#8d97a6', '#f1f1ef'],
    tags: ['索尼', '随身听', '个人音频'],
    modes: ['detail', 'material', 'comparison'],
    weight: 84,
  } as EntityBase,
  {
    id: 'object-ipod',
    type: 'object',
    slug: 'apple-ipod-2001',
    name: loc('苹果 iPod（2001）', 'Apple iPod (2001)'),
    yearStart: 2001,
    medium: loc('高光聚碳酸酯正面，不锈钢抛光背板', 'Glossy polycarbonate front, polished stainless-steel back'),
    tagline: loc('一千首歌，装进口袋', '1,000 songs in your pocket'),
    summary: loc(
      '一块白色正面、一个圆形转轮：iPod 把复杂的数字音乐库压缩成一次拇指操作，让“少而更好”在数字时代复活。',
      'A white face and one circular wheel: the iPod compressed a complex digital library into a single thumb’s motion, reviving “less, but better” for the digital age.',
    ),
    body: [
      loc(
        '2001 年 10 月，苹果推出首款 iPod：5GB 硬盘可存约一千首歌，正面只有一块小屏与一个圆形 Click Wheel。乔布斯的口号是“把一千首歌装进口袋”——参数之外，真正的革命是交互：选歌、快进、调音量全部由拇指在转轮上完成。',
        'In October 2001 Apple introduced the first iPod: a 5GB drive holding roughly a thousand songs, a face with one small screen and one circular Click Wheel. “1,000 songs in your pocket,” ran the slogan — but beyond specs, the revolution was interaction: browsing, fast-forward and volume all under one thumb.')
      ,
      loc(
        '白色耳机线成为一代人的城市景观；抛光不锈钢背板像一面小镜子，与博朗 T3 的克制谱系清晰可辨。iPod 证明：在功能爆炸的数字时代，界面减法比功能加法更能创造忠诚。',
        'The white earbud cables became a generation’s cityscape; the polished steel back was a pocket mirror, its lineage to the Braun T3 unmistakable. The iPod proved that in an age of feature explosion, interface subtraction builds more loyalty than feature addition.',
      ),
    ],
    creatorIds: ['person-ive'],
    materialIds: ['mat-abs-plastic'],
    conceptIds: ['c-less-but-better', 'c-ten-good-design', 'c-ergonomics'],
    cultureId: 'culture-american',
    periodId: 'period-contemporary',
    domainIds: ['industrial', 'design', 'digital'],
    facts: [
      { label: loc('设计师', 'Design lead'), value: loc('乔纳森·艾维领导的苹果设计团队', 'Apple design team led by Jonathan Ive') },
      { label: loc('年份', 'Year'), value: loc('2001', '2001') },
      { label: loc('制造商', 'Manufacturer'), value: loc('苹果 Apple', 'Apple') },
      { label: loc('口号', 'Slogan'), value: loc('一千首歌，装进口袋', '1,000 songs in your pocket') },
    ],
    blocks: [
      { id: 'ipod-wheel', kind: 'text', title: loc('一个转轮取代四十个按钮', 'One wheel instead of forty buttons'), body: loc('竞品的 MP3 播放器布满按键与层级菜单；Click Wheel 把旋转与按压合并为一种手势：转动是浏览，按下是选择。T3 收音机的圆形调谐窗在五十年后被重新发明。', 'Rival MP3 players bristled with keys and nested menus; the Click Wheel fused rotation and press into one gesture — scroll to browse, press to choose. The T3’s circular dial reinvented fifty years on.') },
      { id: 'ipod-white', kind: 'text', title: loc('白色作为技术中立色', 'White as technological neutrality'), body: loc('白色机身与白色耳机在黑色电子世界里几乎刺眼。白色引用了博朗仪器式的中立，也把耳机线变成城市中可见的部落标记。', 'The white body and white earbuds were almost jarring in a world of black electronics. White quotes Braun’s instrumental neutrality — and turned the earbud cable into a visible urban tribal mark.') },
      { id: 'ipod-pocket', kind: 'text', title: loc('从设备到口袋尺度', 'From device to pocket scale'), body: loc('硬盘机本是桌面设备；iPod 把它缩到牛仔裤口袋大小，边角弧度由掌心取出的动作决定。尺度再一次由身体而非元件定义。', 'Hard-drive players were desktop gear; the iPod shrank one to jeans-pocket scale, its corner radii set by the motion of drawing it from a pocket. Scale defined once again by the body, not the components.') },
    ],
    palette: ['#f5f5f7', '#ffffff', '#d3d3d8', '#1d1d1f', '#e9e9ee'],
    tags: ['苹果', 'MP3', '交互'],
    modes: ['detail', 'material', 'comparison'],
    weight: 88,
  } as EntityBase,
  {
    id: 'object-iphone',
    type: 'object',
    slug: 'apple-iphone-2007',
    name: loc('苹果 iPhone（2007）', 'Apple iPhone (2007)'),
    yearStart: 2007,
    medium: loc('阳极氧化铝与玻璃机身，多点触控屏幕', 'Anodized aluminum and glass body with multi-touch display'),
    tagline: loc('一块玻璃，重新发明手机', 'One piece of glass that reinvented the phone'),
    summary: loc(
      '乔布斯在发布会上说它是“iPod、电话、互联网通讯器”三合一：实体键盘消失，整块屏幕成为随时变形的界面，工业设计从此让位于软件。',
      'Jobs introduced it as three devices — “an iPod, a phone, an internet communicator”: the physical keyboard vanished and the whole screen became a shape-shifting interface, ceding industrial design’s throne to software.',
    ),
    body: [
      loc(
        '2007 年 1 月 9 日发布、6 月 29 日发售的第一代 iPhone，正面只有一块 3.5 英寸多点触控屏幕与一颗 Home 键。它删除了当时智能手机的标配：实体键盘、手写笔、可换电池。所有按钮按需在玻璃上出现——形态第一次由软件动态生成。',
        'Announced 9 January and released 29 June 2007, the first iPhone had one 3.5-inch multi-touch screen and a single Home button. It deleted the smartphone staples: physical keyboard, stylus, swappable battery. Buttons now appear on glass as needed — form generated dynamically by software for the first time.',
      ),
      loc(
        '对工业设计而言，iPhone 是分水岭：机身被极简到一块材料，差异转入图标、动效与手势。它也是“通用设计”的意外推进者——屏幕界面可以为视障、听障与老年用户重排，灵活性远超实体按键，但代价是可维修性下降与计划废止的新形态。',
        'For industrial design the iPhone was a watershed: the body reduced to a single slab, difference migrated to icons, motion and gesture. It also advanced universal design unexpectedly — a screen can reflow for blind, deaf or elderly users as buttons never could — at the cost of repairability and a new face of planned obsolescence.',
      ),
    ],
    creatorIds: ['person-ive'],
    materialIds: ['mat-anodized-aluminum'],
    conceptIds: ['c-digital-interface', 'c-less-but-better', 'c-universal-design'],
    cultureId: 'culture-american',
    periodId: 'period-contemporary',
    domainIds: ['industrial', 'design', 'digital'],
    facts: [
      { label: loc('设计师', 'Design lead'), value: loc('乔纳森·艾维领导的苹果设计团队', 'Apple design team led by Jonathan Ive') },
      { label: loc('年份', 'Year'), value: loc('2007（1 月发布 / 6 月发售）', '2007 (announced Jan / released Jun)') },
      { label: loc('制造商', 'Manufacturer'), value: loc('苹果 Apple', 'Apple') },
      { label: loc('三合一', 'Three in one'), value: loc('iPod、电话、互联网通讯器', 'iPod, phone, internet communicator') },
    ],
    blocks: [
      { id: 'ip-glass', kind: 'text', title: loc('玻璃取代键盘', 'Glass replaces the keyboard'), body: loc('固定键盘只能服务一种功能；多点触控玻璃让同一面在拨号时是键盘、拍照时是取景器、阅读时是书页。硬件做减法，软件做加法——实体控件的“诚实”让位于界面的“通用”。', 'A fixed keyboard serves one function; multi-touch glass becomes a keypad, a viewfinder or a page as needed. Hardware subtracts, software adds — the honesty of physical controls yields to the universality of the interface.') },
      { id: 'ip-slab', kind: 'text', title: loc('一块材料的极致', 'The apotheosis of the slab'), body: loc('阳极氧化铝背盖与整面玻璃让机身接近一张黑镜子，Home 键是唯一的物理标点。拉姆斯“尽可能少的设计”在此遇到边界：再减下去，设备将只剩屏幕。', 'Anodized aluminum back and a full glass face make the body near a black mirror, the Home button its only physical punctuation. Rams’s “as little design as possible” meets its limit: subtract further and only a screen remains.') },
      { id: 'ip-access', kind: 'text', title: loc('通用设计的意外红利', 'An unexpected universal-design dividend'), body: loc('屏幕可以放大字体、朗读内容、用震动替代提示音——软件的可塑性让残障适配从“特殊版本”变成系统设置。路缘坡效应惠及所有人：旁白、字幕、单手模式人人可用。', 'Screens enlarge type, read aloud, replace chimes with vibration — software plasticity turns accessibility from a special edition into a system setting. The curb-cut effect benefits everyone: VoiceOver, captions and one-handed mode for all.') },
      { id: 'ip-cost', kind: 'text', title: loc('极简的代价', 'The price of minimalism'), body: loc('密封的一体化机身让电池与屏幕难以更换，维修成本逼近换新——“耐用”原则遭遇商业逻辑。极简形态与计划废止的张力，成为此后十年消费电子的核心争议。', 'The sealed unibody makes battery and screen replacement uneconomic, steering repair toward replacement — the long-lasting principle colliding with commerce. The tension between minimal form and planned obsolescence defines the decade that follows.') },
    ],
    palette: ['#111114', '#1d1d20', '#c4c6cc', '#f5f5f7', '#2c2c31'],
    tags: ['苹果', '智能手机', '多点触控'],
    modes: ['detail', 'material', 'comparison'],
    weight: 90,
  } as EntityBase,

  // ================================================================== 概念
  {
    id: 'c-ergonomics',
    type: 'concept',
    slug: 'ergonomics',
    name: loc('人机工程学', 'Ergonomics'),
    tagline: loc('让物适应身体，而非身体适应物', 'Make the object fit the body, not the body the object'),
    summary: loc(
      '研究人体尺度、动作与感知如何规定器物形态：椅子的弧度、握柄的粗细、按键的间距，都从身体的统计学而来。',
      'The study of how human scale, motion and perception prescribe form: the curve of a chair, the girth of a grip, the spacing of keys — all derived from the statistics of the body.'),
    body: [
      loc(
        '人机工程学在二战中成熟：飞行员的误读与误触促使工程师把座舱仪表按视线与动作重新布局。战后它进入民用设计——伊姆斯夫妇用全身石膏模型研究坐姿，拉姆斯让旋钮对准拇指，索尼让随身听轻过一瓶水。它的道德立场与通用设计相通：设计的起点不是风格，而是有限而多样的人体。',
        'Ergonomics matured in WWII, when pilot errors drove engineers to lay out cockpit instruments by sightline and reach. It entered civilian design after the war: the Eameses studied posture with full-body casts, Rams aimed knobs at the thumb, Sony made the Walkman lighter than a bottle of water. Its ethical stance parallels universal design: the starting point is not style but the finite, varied human body.',
      ),
    ],
    domainIds: ['industrial', 'design', 'craft'],
    conceptIds: ['c-universal-design'],
    facts: [
      { label: loc('关键词', 'Keywords'), value: loc('人体测量、握持、可达性、反馈', 'Anthropometry, grip, reach, feedback') },
      { label: loc('成熟时期', 'Matured'), value: loc('二战座舱研究 → 战后民用设计', 'WWII cockpit research → postwar civilian design') },
    ],
    tags: ['人体尺度', '交互', '功能主义'],
    modes: ['detail', 'comparison'],
  },
  {
    id: 'c-ten-good-design',
    type: 'concept',
    slug: 'ten-principles-of-good-design',
    name: loc('好设计十原则', 'Ten Principles of Good Design'),
    tagline: loc('拉姆斯的十条戒律', 'Rams’s ten commandments'),
    summary: loc(
      '迪特·拉姆斯在 1970–80 年代把“好设计”归纳为十条标准，从创新到“尽可能少的设计”，成为功能主义的世俗伦理。',
      'Dieter Rams codified good design into ten criteria through the 1970s–80s, from “innovative” to “as little design as possible” — functionalism’s secular ethics.'),
    body: [
      loc(
        '十原则不是美学风格，而是一份自问清单：它是否创新？是否实用？是否美观？是否让产品易懂？是否克制？是否诚实？是否耐用？是否细致到最后一个细节？是否环保？以及——是否做到了尽可能少？拉姆斯强调，这些原则随技术演进而更新，但“设计为使用者负责”的内核不变。',
        'The ten principles are not a style but a checklist of self-interrogation: Is it innovative? Useful? Aesthetic? Does it make the product understandable? Is it unobtrusive? Honest? Long-lasting? Thorough down to the last detail? Environmentally friendly? And — is it as little design as possible? Rams stressed that the principles evolve with technology while the core — responsibility to the user — does not.',
      ),
    ],
    creatorIds: ['person-rams'],
    domainIds: ['industrial', 'design'],
    blocks: [
      { id: 'tg-list', kind: 'list', title: loc('十条标准', 'The ten criteria'), items: [
        loc('好设计是创新的', 'Good design is innovative'),
        loc('好设计使产品有用', 'Good design makes a product useful'),
        loc('好设计是美的', 'Good design is aesthetic'),
        loc('好设计使产品易懂', 'Good design makes a product understandable'),
        loc('好设计是克制的', 'Good design is unobtrusive'),
        loc('好设计是诚实的', 'Good design is honest'),
        loc('好设计是耐用的', 'Good design is long-lasting'),
        loc('好设计贯彻到每个细节', 'Good design is thorough down to the last detail'),
        loc('好设计关心环境', 'Good design is environmentally friendly'),
        loc('好设计是尽可能少的设计', 'Good design is as little design as possible'),
      ] },
    ],
    facts: [
      { label: loc('提出者', 'Author'), value: loc('迪特·拉姆斯（博朗时期逐步成型）', 'Dieter Rams (developed across his Braun years)') },
      { label: loc('数量', 'Count'), value: loc('十条', 'Ten') },
    ],
    tags: ['功能主义', '设计伦理', '博朗'],
    modes: ['detail', 'editorial'],
  },
  {
    id: 'c-form-follows-function',
    type: 'concept',
    slug: 'form-follows-function',
    name: loc('形式追随功能', 'Form Follows Function'),
    tagline: loc('现代主义的第一句口号', 'Modernism’s first slogan'),
    summary: loc(
      '路易斯·沙利文 1896 年为摩天楼提出的信条，经包豪斯成为现代设计正统：外形应由用途决定，装饰是多余的罪。',
      'Coined by Louis Sullivan for the skyscraper in 1896 and made orthodoxy by the Bauhaus: shape should be dictated by use, and ornament is redundant sin.'),
    body: [
      loc(
        '这句话的原意是浪漫的——沙利文认为建筑应像自然万物一样，让内在生命“生发”出外形。包豪斯与德意志制造联盟把它工程化：材料、结构与用途被理性编排，红蓝椅、博朗电器与伊姆斯椅子都是注脚。然而 1960 年代末起，索特萨斯的红色打字机与孟菲斯集团反问：愉悦、身份与情感难道不是功能？这场辩论至今没有结束——iPhone 的“功能”显然包含了它给人的感觉。',
        'The original intent was romantic — Sullivan believed a building, like nature, should let its inner life “send forth” its shape. The Bauhaus and Werkbund engineered it into orthodoxy: materials, structure and use rationally composed; the Red-Blue Chair, Braun appliances and Eames chairs are its footnotes. From the late 1960s, however, Sottsass’s red typewriter and Memphis asked: are pleasure, identity and emotion not functions too? The debate is unresolved — the iPhone’s “function” plainly includes how it feels.',
      ),
    ],
    domainIds: ['industrial', 'design', 'architecture'],
    facts: [
      { label: loc('出处', 'Origin'), value: loc('路易斯·沙利文，《高层办公楼艺术上的思考》（1896）', 'Louis Sullivan, “The Tall Office Building Artistically Considered” (1896)') },
    ],
    tags: ['现代主义', '包豪斯', '功能主义'],
    modes: ['detail', 'network'],
  },
  {
    id: 'c-planned-obsolescence',
    type: 'concept',
    slug: 'planned-obsolescence',
    name: loc('计划废止', 'Planned Obsolescence'),
    tagline: loc('为死亡而设计', 'Designed for death'),
    summary: loc(
      '通过寿命限制、潮流更替或软件断更，让产品在物理损坏之前就“显得过时”——大规模生产时代的核心商业逻辑，也是好设计十原则的对立面。',
      'Limiting lifespan, cycling fashion or cutting software updates so a product feels obsolete before it breaks — the central commercial logic of mass production, and the nemesis of the ten principles.'),
    body: [
      loc(
        '1920 年代，通用汽车以年度换色击败福特单一黑色 T 型车，“有计划的废止”从暗策略变成显理论：1932 年纽约地产商伯纳德·伦敦甚至在小册子中建议把废止制度化以走出萧条。它有三种面孔——功能失效（易损件）、样式过时（新款更好看）、心理过时（身份变化）。',
        'In the 1920s General Motors beat Ford’s single-black Model T with annual color changes, and planned obsolescence moved from tacit strategy to explicit theory: in a 1932 pamphlet Bernard London even proposed legislating obsolescence to end the Depression. It wears three faces — functional failure (perishable parts), stylistic obsolescence (the new model looks better) and psychological obsolescence (changed identity).',
      ),
      loc(
        '时装的季节性更替是它最古老的形态；智能手机的一体化密封与系统断更是它最新的形态。拉姆斯的“耐用”原则、北欧家具的世代相传、以及当代的维修权运动，都是对同一件事的抵抗：好物件应当配得上长久的陪伴。',
        'Fashion’s seasonal turnover is its oldest face; the sealed smartphone and dropped software updates are its newest. Rams’s longevity principle, Nordic furniture built for generations and today’s right-to-repair movement all resist the same thing: good objects should deserve long companionship.',
      ),
    ],
    domainIds: ['industrial', 'design', 'fashion'],
    conceptIds: ['c-less-but-better'],
    facts: [
      { label: loc('三种形态', 'Three forms'), value: loc('功能失效 / 样式过时 / 心理过时', 'Functional / stylistic / psychological') },
      { label: loc('早期案例', 'Early case'), value: loc('通用汽车年度改款对抗福特 T 型车', 'GM annual restyling vs. Ford Model T') },
    ],
    tags: ['消费社会', '设计伦理', '维修权'],
    modes: ['story', 'comparison'],
  },
  {
    id: 'c-modularity',
    type: 'concept',
    slug: 'modularity',
    name: loc('模块化', 'Modularity'),
    tagline: loc('把整体拆成可替换的部分', 'Wholes as replaceable parts'),
    summary: loc(
      '用标准化、可互换的部件组织产品：电池、磁带、耳机、乐高积木——模块让制造、维修与升级各自独立，是系统化设计的基础。',
      'Organizing products around standardized, interchangeable units — batteries, cassettes, headphones, Lego bricks — so manufacture, repair and upgrade become independent acts. The basis of systems design.'),
    body: [
      loc(
        '模块化的前身是可互换零件：19 世纪的步枪零件第一次不必手工配修。20 世纪它成为产品哲学：Walkman 用五号电池与标准磁带把寿命分散到可更换模块；伊姆斯的系统家具用统一连接件组合桌架与隔板；宜家的平板包装让用户成为最后一道装配工序。',
        'Modularity descends from interchangeable parts: 19th-century rifle components first needed no hand-fitting. In the 20th century it became a product philosophy: the Walkman dispersed lifespan into replaceable AAs and standard cassettes; Eames systems furniture mated legs and shelves with universal connectors; IKEA flat packs made the user the final assembly station.',
      ),
      loc(
        '模块化与计划性废止暗中对抗又彼此依赖：标准化零件延长寿命，接口的频繁换代又制造新的不兼容。今天的 Fairphone 与框架电脑把“可维修”重新作为卖点，说明模块不仅是工程方法，也是一种价值表态。',
        'Modularity both resists and enables planned obsolescence: standardized parts extend life, while frequent interface changes create fresh incompatibility. Today’s Fairphones and framework computers sell repairability outright — proof that the module is not only engineering but a values statement.',
      ),
    ],
    domainIds: ['industrial', 'design', 'architecture'],
    conceptIds: ['c-ergonomics'],
    facts: [
      { label: loc('前身', 'Antecedent'), value: loc('19 世纪可互换零件（军工制造）', '19th-century interchangeable parts (arms manufacture)') },
      { label: loc('案例', 'Cases'), value: loc('Walkman 电池磁带 / 系统家具 / 平板包装', 'Walkman batteries & cassettes / systems furniture / flat packs') },
    ],
    tags: ['系统设计', '标准化', '可维修'],
    modes: ['detail', 'process'],
  },
  {
    id: 'c-less-but-better',
    type: 'concept',
    slug: 'less-but-better',
    name: loc('少而更好', 'Less, but Better'),
    tagline: loc('少做，做得更好（Weniger, aber besser）', 'Less, but better (Weniger, aber besser)'),
    summary: loc(
      '拉姆斯的座右铭：少不是简陋，而是删去一切不为使用者服务的东西之后留下的精确。它与“极简风格”无关，而与判断有关。',
      'Rams’s motto: less is not austerity but the precision left after removing everything that does not serve the user. It is not a minimalist style but a discipline of judgment.'),
    body: [
      loc(
        '“少而更好”常被误读为视觉极简，拉姆斯本人反复纠正：它的反面不是装饰，而是粗心。T3 收音机删掉喇叭网的多余线条，是因为那些线条对使用者毫无贡献；iPod 删掉四十个按钮，是因为转轮一只拇指就能完成所有操作。减法的标准始终是人，不是风格史。',
        '“Less, but better” is often misread as visual minimalism; Rams kept correcting that its opposite is not ornament but carelessness. The T3 dropped grille lines because they did nothing for the user; the iPod dropped forty buttons because one wheel served the whole thumb. The criterion of subtraction is always the person, never style history.',
      ),
      loc(
        '这条原则在博朗与苹果之间形成跨代对话：相似的白色、圆形控件与克制比例不是抄袭，而是同一伦理在不同技术条件下的收敛解。它也提醒后来者：少下来的部分必须更好——廉价的“极简”只是少，不是更好。',
        'The principle forms a cross-generational dialogue between Braun and Apple: the shared whiteness, circular controls and restrained proportions are not copying but convergent solutions of one ethic under different technologies. It warns successors, too: what remains after subtraction must be better — cheap minimalism is merely less, not better.',
      ),
    ],
    creatorIds: ['person-rams'],
    domainIds: ['industrial', 'design'],
    facts: [
      { label: loc('提出者', 'Author'), value: loc('迪特·拉姆斯', 'Dieter Rams') },
      { label: loc('原文', 'Original'), value: loc('Weniger, aber besser（德语）', 'Weniger, aber besser (German)') },
    ],
    tags: ['功能主义', '极简', '设计伦理'],
    modes: ['detail', 'comparison'],
  },
  {
    id: 'c-universal-design',
    type: 'concept',
    slug: 'universal-design',
    name: loc('通用设计', 'Universal Design'),
    tagline: loc('为所有人的设计，一开始就如此', 'Design for everyone, from the start'),
    summary: loc(
      '产品与环境应无需改造即可被最广泛的人群使用——不论年龄、能力与情境。它不是事后的“无障碍版本”，而是一开始就把多样性写进约束。',
      'Products and environments usable by the widest range of people without adaptation — regardless of age, ability or context. Not an after-the-fact “accessible version” but diversity written into the constraints from the start.'),
    body: [
      loc(
        '通用设计 1990 年代由美国北卡罗来纳州立大学定型为七原则：公平使用、灵活使用、简单直观、信息可感知、容错、省力、尺度可达。它的经典证据是“路缘坡效应”：为轮椅设置的斜坡，推婴儿车、拉行李箱的人同样受益。',
        'Universal Design was formalized in the 1990s at North Carolina State University as seven principles: equitable use, flexibility, simple and intuitive use, perceptible information, tolerance for error, low physical effort, and size/space for approach. Its signature evidence is the curb-cut effect: a ramp for wheelchairs equally serves strollers and luggage.',
      ),
      loc(
        '软件时代，通用设计获得前所未有的杠杆：iPhone 的旁白、字幕与放大显示不是特殊机型，而是同一系统的设置项——这正是实体按键时代做不到的。好的通用设计隐形于日常：没有人会注意到一扇好推开的门。',
        'In the software age universal design gained unprecedented leverage: VoiceOver, captions and zoom are not special models but system settings — impossible in the era of fixed buttons. Good universal design is invisible in daily life: nobody notices a door that opens easily.',
      ),
    ],
    domainIds: ['industrial', 'design'],
    conceptIds: ['c-ergonomics'],
    facts: [
      { label: loc('七原则', 'Seven principles'), value: loc('公平、灵活、直观、可感知、容错、省力、可达', 'Equitable, flexible, intuitive, perceptible, tolerant, low-effort, accessible') },
      { label: loc('效应', 'Effect'), value: loc('路缘坡效应：为少数人的设计惠及所有人', 'Curb-cut effect: design for the few benefits everyone') },
    ],
    tags: ['无障碍', '包容性', '设计伦理'],
    modes: ['detail', 'story'],
  },

  // ================================================================== 材料
  {
    id: 'mat-abs-plastic',
    type: 'material',
    slug: 'abs-plastic',
    name: loc('ABS 塑料', 'ABS Plastic'),
    summary: loc(
      '丙烯腈-丁二烯-苯乙烯共聚物：坚固、抗冲击、可整体着色与注塑成型，是战后消费电子与玩具的当家材料。',
      'Acrylonitrile-butadiene-styrene: tough, impact-resistant, color-through and injection-moldable — the workhorse material of postwar consumer electronics and toys.'),
    body: [
      loc(
        'ABS 于 1940 年代末工业化：三种组分分工明确——丙烯腈耐化学腐蚀、丁二烯提供抗冲击韧性、苯乙烯赋予光泽与易加工性。它可以在注塑机里一次成型复杂壳体并染透内外，刮不露白，因此特别适合色彩宣言：Valentine 的鲜红、乐高积木的五色、博朗的浅灰，都是同一种材料的不同语气。',
        'ABS industrialized in the late 1940s: its three components divide labor — acrylonitrile resists chemicals, butadiene supplies impact toughness, styrene gives gloss and flow. It molds complex shells in one shot and colors through, so scratches never show white — ideal for color statements: the Valentine’s red, Lego’s palette and Braun’s pale grey are one material in different voices.',
      ),
    ],
    domainIds: ['industrial', 'design', 'craft'],
    facts: [
      { label: loc('工艺', 'Process'), value: loc('注塑成型，颜色可染透材料', 'Injection molding; color-through pigmentation') },
      { label: loc('代表用途', 'Signature uses'), value: loc('打字机壳体、收音机、乐高积木、家电外壳', 'Typewriter and radio shells, Lego bricks, appliance casings') },
    ],
    palette: ['#f2f0ea', '#d81e05', '#232323', '#c9c4b8'],
    tags: ['塑料', '注塑', '大众材料'],
    modes: ['material', 'process'],
  },
  {
    id: 'mat-anodized-aluminum',
    type: 'material',
    slug: 'anodized-aluminum',
    name: loc('阳极氧化铝', 'Anodized Aluminum'),
    summary: loc(
      '经电解氧化处理的铝材：表面生成坚硬多孔的氧化层，可着色、耐腐蚀，轻盈而有金属凉感——随身听与苹果一体机的表皮。',
      'Electrolytically oxidized aluminum: a hard, porous oxide layer that takes dye and resists corrosion — light, cool to the touch, the skin of the Walkman and the Apple unibody.'),
    body: [
      loc(
        '阳极氧化把铝件作为阳极浸入电解液通电，表面生长出比基体更硬的氧化铝膜；微孔可以吸附染料再封孔，于是金属有了不脱落的颜色。它比钢轻三倍，散热良好，表面细微的拉丝纹理成为高端消费电子的共同触觉：Walkman 的银蓝机身、MacBook 的一体成型外壳，都依赖这道工艺。',
        'Anodizing makes the aluminum part the anode in an electrolytic bath, growing an oxide film harder than the substrate; its pores absorb dye before sealing, giving metal color that cannot flake. A third the weight of steel and excellent at shedding heat, its fine brushed texture became the shared touch of premium electronics — the Walkman’s silver-blue body and the MacBook unibody both depend on it.',
      ),
    ],
    domainIds: ['industrial', 'design'],
    facts: [
      { label: loc('工艺', 'Process'), value: loc('电解阳极氧化，氧化膜可染色封孔', 'Electrolytic anodizing; dyed and sealed oxide film') },
      { label: loc('特性', 'Properties'), value: loc('轻量、高硬度、耐腐蚀、可着色', 'Lightweight, hard, corrosion-resistant, colorable') },
    ],
    palette: ['#c9ccd2', '#8f949e', '#e8eaee', '#3a3d44'],
    tags: ['金属', '表面处理', '消费电子'],
    modes: ['material', 'process'],
  },

  // ================================================================== 风格
  {
    id: 'cs-scandinavian',
    type: 'style',
    slug: 'scandinavian-minimalism',
    name: loc('斯堪的纳维亚极简', 'Scandinavian Minimalism'),
    yearStart: 1954,
    periodId: 'period-postwar',
    cultureId: 'culture-scandinavian',
    contemporary: false,
    tagline: loc('白桦木、白光与为所有人的美', 'Birch, white light and beauty for everyone'),
    summary: loc(
      '北欧现代主义把德式功能理性放进柔软的白桦木与漫长冬夜的白光里：克制但不冷，民主但不廉价——宜家是它的通俗版，雅各布森是它的高端版。',
      'Nordic modernism wrapped German functional reason in soft birch and the white light of long winters: restrained but not cold, democratic but not cheap — IKEA its vernacular edition, Jacobsen its haute edition.'),
    body: [
      loc(
        '1954–1957 年“斯堪的纳维亚设计”巡展登陆北美，把丹麦、瑞典、芬兰的战后设计推向世界：阿尔瓦·阿尔托的弯曲胶合木、汉斯·韦格纳的圈椅、阿尔内·雅各布森的蛋椅与蚂蚁椅。它继承功能主义对结构诚实的要求，却拒绝仪器式的冷感——浅色木材、羊毛织物、圆角与哑光表面让现代主义适合有孩子、有预算的普通家庭。',
        'The “Design in Scandinavia” tour reached North America in 1954–57, launching postwar Danish, Swedish and Finnish design worldwide: Alvar Aalto’s bent plywood, Hans Wegner’s Wishbone and Round chairs, Arne Jacobsen’s Egg and Ant chairs. It inherits functionalism’s structural honesty but rejects instrumental coldness — pale wood, wool, rounded edges and matte finishes make modernism viable for ordinary homes with children and budgets.',
      ),
      loc(
        '它的伦理底色是社会民主：好设计不应是博物馆藏品，而应通过工业化与平板包装进入公寓。与拉姆斯的“十原则”相比，北欧极简多了一层对材料温度与日常仪式的尊重——少，但要宜居。',
        'Its ethical base is social democracy: good design belongs not in museums but in apartments, via industrialization and flat packs. Compared with Rams’s ten principles, Nordic minimalism adds respect for material warmth and daily ritual — less, but livable.',
      ),
    ],
    materialIds: ['mat-wood'],
    conceptIds: ['c-form-follows-function', 'c-less-but-better', 'c-ergonomics'],
    domainIds: ['design', 'industrial', 'craft'],
    facts: [
      { label: loc('代表设计师', 'Key designers'), value: loc('阿尔托（芬兰）/ 雅各布森、韦格纳（丹麦）', 'Aalto (FI) / Jacobsen, Wegner (DK)') },
      { label: loc('关键词', 'Keywords'), value: loc('浅桦木、白光、圆角、民主化', 'Birch, white light, rounded corners, democratic') },
      { label: loc('走向大众', 'Mass channel'), value: loc('宜家 IKEA（1943 年创立于瑞典）', 'IKEA (founded 1943, Sweden)') },
    ],
    palette: ['#f5f2ec', '#e4ded2', '#c9b896', '#8b95a5', '#2e3440'],
    tags: ['北欧', '家具', '民主设计'],
    modes: ['gallery', 'detail', 'material'],
    weight: 78,
  } as EntityBase,

  // ================================================================== 文化
  {
    id: 'culture-scandinavian',
    type: 'culture',
    slug: 'scandinavian-culture',
    name: loc('北欧文化', 'Nordic / Scandinavian'),
    tagline: loc('漫长冬夜里的光与木', 'Light and wood through long winters'),
    summary: loc(
      '瑞典、丹麦、芬兰、挪威与冰岛共享的设计伦理：功能主义与手工艺握手，相信好的日常器物是社会平等的一部分。',
      'The shared design ethic of Sweden, Denmark, Finland, Norway and Iceland: functionalism and craft hand in hand, grounded in the belief that good everyday objects are part of social equality.'),
    body: [
      loc(
        '高纬度的冬季把人留在室内，北欧文化因此对“家”与日常器物格外郑重：浅色木材反射稀缺的日光，白色墙面放大光线，织物提供触感温度。19 世纪的民俗手工艺传统在 20 世纪与功能主义合流，生成“北欧现代”——它既不是英式绅士趣味，也不是德式工业冷峻，而是一种温和的理性：物件应当耐用、诚实、买得起，并且好看。',
        'High-latitude winters keep people indoors, making Nordic culture unusually attentive to home and everyday objects: pale wood reflects scarce daylight, white walls amplify it, textiles supply tactile warmth. Nineteenth-century folk-craft traditions merged with functionalism in the twentieth to produce Nordic modern — neither English gentility nor German industrial austerity but a gentle rationalism: objects should be durable, honest, affordable and beautiful.',
      ),
      loc(
        '这套伦理通过瑞典的宜家、丹麦的家具王朝与芬兰的 Marimekko 出口全球，成为“美好生活”最有传播力的地区版本之一。它与日本侘寂在现代隔空相惜：两者都相信克制、材料与留白。',
        'Exported globally through Sweden’s IKEA, Denmark’s furniture houses and Finland’s Marimekko, this ethic became one of the most influential regional versions of the good life — and a distant cousin of Japanese wabi-sabi, since both trust restraint, material and emptiness.',
      ),
    ],
    domainIds: ['design', 'craft', 'architecture'],
    tags: ['北欧', '民主设计', '手工艺'],
    modes: ['story', 'network'],
  },
];
