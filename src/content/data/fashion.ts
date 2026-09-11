import type { EntityBase } from '../../model/entity';
import { loc } from '../../model/i18n';

/**
 * Fashion corpus — from Chanel’s modernism to Japanese and British
 * deconstruction. Garments are copyright contemporary designs, so this
 * file is text-first (no image fields); palettes are still authored.
 * Entities with person-/object-specific fields use `as EntityBase`
 * because this is a mixed-type corpus exported under the shared base.
 */
export const FASHION: EntityBase[] = [
  // ================================================================== 人物
  {
    id: 'person-chanel',
    type: 'person',
    slug: 'coco-chanel',
    name: loc('可可·香奈儿', 'Coco Chanel'),
    birthYear: 1883,
    deathYear: 1971,
    placeId: 'place-paris',
    occupation: loc('时装设计师 · 香奈儿品牌创始人', 'Fashion designer · founder of Chanel'),
    tagline: loc('把女人从束腰里放出来', 'She let women out of the corset'),
    summary: loc(
      '孤儿院出身的女裁缝用男式内衣的平纹针织做女装，用小黑裙与斜纹软呢套装重新定义了现代女性的衣橱——时尚易逝，风格永存。',
      'An orphan-turned-seamstress who made women’s clothes from men’s underwear jersey, and redefined the modern wardrobe with the little black dress and the tweed suit — fashion fades, style remains.',
    ),
    body: [
      loc(
        '香奈儿在法国孤儿院学会缝纫，1910 年在巴黎康朋街开店。她厌恶美好年代的束腰、蕾丝与夸张帽饰，转而借用男性衣柜的语言：针织衫、斜纹软呢、马裤与雨风衣。平纹针织本是内衣与运动服面料，廉价、有弹性、垂坠自如——她用它做出不勒腰、不垫臀的直线条裙装，让女人可以走路、骑马、工作。',
        'Chanel learned sewing in a French orphanage and opened her shop on Rue Cambon, Paris, in 1910. Detesting the corsets, lace and extravagant hats of the Belle Époque, she borrowed the language of the male wardrobe: knitwear, tweed, breeches and raincoats. Jersey — then an underwear and sportswear fabric, cheap, elastic and fluid — became unboned, unlined straight dresses in which women could walk, ride and work.',
      ),
      loc(
        '1926 年美国版《Vogue》刊登她的黑色直身裙，称之为“香奈儿的福特车”——小黑裙从此成为现代制服。1954 年她以 71 岁高龄复出，用滚边斜纹软呢套装再次定义战后女装。她的建筑观与日本和服暗暗相通：衣服与身体之间留出呼吸的空间。',
        'In 1926 American Vogue printed her black shift as “the Chanel Ford” — the little black dress became a modern uniform. In 1954 she returned at 71 and redefined postwar womenswear with the braided tweed suit. Her sense of structure quietly echoes the kimono: space left between cloth and body for the body to breathe.',
      ),
    ],
    cultureId: 'culture-french',
    domainIds: ['fashion', 'craft'],
    materialIds: ['mat-jersey-knit', 'mat-tweed'],
    conceptIds: ['c-haute-couture', 'c-silhouette', 'c-textile-innovation'],
    facts: [
      { label: loc('生卒', 'Lifespan'), value: loc('1883–1971', '1883–1971') },
      { label: loc('地址', 'Address'), value: loc('巴黎康朋街 31 号', '31 Rue Cambon, Paris') },
      { label: loc('标志面料', 'Signature fabrics'), value: loc('平纹针织、斜纹软呢', 'Jersey knit, tweed') },
    ],
    tags: ['高级定制', '现代女装', '小黑裙'],
    modes: ['story', 'network'],
    weight: 90,
  } as EntityBase,
  {
    id: 'person-dior',
    type: 'person',
    slug: 'christian-dior',
    name: loc('克里斯汀·迪奥', 'Christian Dior'),
    birthYear: 1905,
    deathYear: 1957,
    placeId: 'place-paris',
    occupation: loc('时装设计师 · 克里斯汀·迪奥品牌创始人', 'Fashion designer · founder of Christian Dior'),
    tagline: loc('用二十码布料换回女人味', 'Twenty yards of cloth to bring back femininity'),
    summary: loc(
      '战后第二年，他用一条花冠般的长裙宣告配给制的结束：New Look 的纤腰与宽摆震惊世界，也让巴黎重新坐稳高级定制之都。',
      'A year after the war he announced the end of rationing with a flower-calf skirt: the New Look’s cinched waist and full hem shocked the world — and re-seated Paris as capital of haute couture.',
    ),
    body: [
      loc(
        '迪奥曾是画廊经营者，战争与家变后转行时装。1947 年 2 月 12 日，他在蒙田大道 30 号发布首个系列“花冠”（Corolle）：紧身收腰的 Bar 外套、长及小腿中部的百褶裙，单裙用料近二十码。《时尚芭莎》主编卡梅尔·斯诺看完说：“亲爱的克里斯汀，你的裙子有一种 New Look。”名字就此定下。',
        'Dior had run an art gallery before family ruin and war pushed him into fashion. On 12 February 1947, at 30 Avenue Montaigne, he showed his first line, “Corolle”: the cinched Bar jacket and pleated skirts to mid-calf, nearly twenty yards of fabric in a single skirt. “My dear Christian,” said Harper’s Bazaar editor Carmel Snow, “your dresses have such a new look.” The name stuck.',
      ),
      loc(
        '在布料仍配给的年代，如此铺张引发街头抗议——却也精准命中战后对丰盈与柔软的渴望。迪奥把制版当作建筑：裙撑、衬里与省道共同塑造轮廓，布料本身就是结构。他 1957 年早逝后，品牌由伊夫·圣洛朗等人接续，高级定制进入工业化授权时代。',
        'In an age of fabric rationing such abundance drew street protests — yet it perfectly answered the postwar hunger for softness and plenty. Dior treated pattern-making as architecture: petticoats, linings and darts engineering the silhouette, cloth as structure. After his early death in 1957 the house passed to Yves Saint Laurent and others, and couture entered the age of licensing.',
      ),
    ],
    cultureId: 'culture-french',
    domainIds: ['fashion', 'craft'],
    conceptIds: ['c-haute-couture', 'c-silhouette'],
    facts: [
      { label: loc('生卒', 'Lifespan'), value: loc('1905–1957', '1905–1957') },
      { label: loc('首秀', 'First collection'), value: loc('1947 年 2 月 12 日，“花冠”系列', '12 Feb 1947, “Corolle” line') },
      { label: loc('地址', 'Address'), value: loc('巴黎蒙田大道 30 号', '30 Avenue Montaigne, Paris') },
    ],
    tags: ['高级定制', 'New Look', '巴黎'],
    modes: ['story', 'network'],
    weight: 86,
  } as EntityBase,
  {
    id: 'person-miyake-issey',
    type: 'person',
    slug: 'issey-miyake',
    name: loc('三宅一生', 'Issey Miyake'),
    birthYear: 1938,
    deathYear: 2022,
    birthPlaceId: 'place-edo',
    placeId: 'place-edo',
    occupation: loc('时装设计师 · 三宅一生品牌创始人', 'Fashion designer · founder of Issey Miyake'),
    tagline: loc('一块布（A-Piece of Cloth）', 'A Piece of Cloth'),
    summary: loc(
      '他从和服“布与身之间的空气”出发，用热压褶皱与一块布理念把时装做成人人可穿的活动雕塑——东方空间观与工业合成纤维的结合。',
      'Starting from the air between kimono and body, he made fashion into wearable sculpture for everyone through heat-set pleats and the “Piece of Cloth” — Eastern spatial thought meeting industrial synthetic fibers.',
    ),
    body: [
      loc(
        '三宅一生 1938 年生于广岛，在东京学习平面设计，1960 年代赴巴黎，先后在纪·拉罗什与纪梵希工作室工作。1970 年创立自己的品牌。他反复追问：和服为何不贴身却最舒适？答案是布料与身体之间的空间——衣物不是身体的外壳，而是两者之间的风。',
        'Born in Hiroshima in 1938, Miyake studied graphic design in Tokyo and moved to Paris in the 1960s, working at Guy Laroche and Givenchy before founding his label in 1970. He kept asking: why is the kimono most comfortable despite never clinging? The answer was the space between cloth and body — clothing not as the body’s shell but as the wind between them.',
      ),
      loc(
        '1993 年的 Pleats Please 系列把这件事工业化：先把衣服按三倍大裁制缝合，再送入压褶机热压定型——褶裥永久保存在聚酯纤维里，可机洗、免熨烫、一卷即走。他还与艺术家合作褶皱衣装，并在 1990 年代末推出“一块布”（A-POC）：管状针织布上预先织好整件衣服，穿着者自行剪下成形。',
        'The 1993 Pleats Please line industrialized the idea: garments are cut and sewn three times oversized, then heat-pressed so pleats are permanently set in polyester — machine-washable, iron-free, rolled up and carried. Collaborating with artists on pleated pieces, he later launched A-POC (“A Piece of Cloth”): a knitted tube in which whole garments are pre-woven, to be cut free by the wearer.',
      ),
    ],
    cultureId: 'culture-japanese',
    domainIds: ['fashion', 'craft', 'design'],
    materialIds: ['mat-synthetic-fiber'],
    conceptIds: ['c-textile-innovation', 'c-drape', 'c-pattern-making'],
    facts: [
      { label: loc('生卒', 'Lifespan'), value: loc('1938–2022', '1938–2022') },
      { label: loc('创立', 'Founded'), value: loc('三宅设计事务所，1970 年于东京', 'Miyake Design Studio, Tokyo, 1970') },
      { label: loc('代表系列', 'Signature lines'), value: loc('Pleats Please（1993）/ A-POC 一块布', 'Pleats Please (1993) / A-POC') },
    ],
    tags: ['日本设计', '褶皱', '一块布'],
    modes: ['story', 'network'],
    weight: 85,
  } as EntityBase,
  {
    id: 'person-kawakubo',
    type: 'person',
    slug: 'rei-kawakubo',
    name: loc('川久保玲', 'Rei Kawakubo'),
    birthYear: 1942,
    birthPlaceId: 'place-edo',
    placeId: 'place-edo',
    occupation: loc('时装设计师 · Comme des Garçons 创始人', 'Fashion designer · founder of Comme des Garçons'),
    tagline: loc('我不做衣服，我做问题', 'I don’t make clothes; I make questions'),
    summary: loc(
      '1981 年她带着一身黑衣与破洞登陆巴黎，把时装从“美化身体”改写为“质疑身体”；1997 年的肿块装让评论界第一次必须用哲学词汇描述衣服。',
      'She arrived in Paris in 1981 in black cloth full of holes, rewriting fashion from “beautifying the body” to questioning it; her 1997 lumps-and-bumps collection forced critics to describe clothes in the vocabulary of philosophy.',
    ),
    body: [
      loc(
        '川久保玲大学学的是美学与文学，1969 年在东京创立 Comme des Garçons（法语“像男孩一样”），1973 年注册公司。1981 年她首次在巴黎发布：不对称、破洞、未完成的折边与一身黑，当时的法国媒体称之为“广岛时髦”——既是误读，也证明冲击之深。',
        'Kawakubo studied aesthetics and literature, founded Comme des Garçons (“like boys”) in Tokyo in 1969 and incorporated in 1973. Her 1981 Paris debut — asymmetry, holes, unfinished hems and total black — was dismissed by French press as “Hiroshima chic”: a misreading that measures the shock.',
      ),
      loc(
        '1997 年春夏的“身体遇见裙子，裙子遇见身体”在弹力连衣裙里塞入鹅羽绒团，让面料在不该隆起的地方隆起：她拒绝的不是某种美，而是“身体应当如何”的单一答案。她也是精明的经营者——CdG 的游击店、多品牌集市（Black Market）把前卫做成了可持续生意。',
        'For Spring/Summer 1997’s “Body Meets Dress, Dress Meets Body”, stretch dresses were stuffed with goose-down pads, bulging where cloth should never bulge. What she rejects is not a kind of beauty but the single permitted answer to how a body should look. A shrewd operator too, her guerrilla stores and the Black Market multi-label market made the avant-garde sustainable as business.',
      ),
    ],
    cultureId: 'culture-japanese',
    domainIds: ['fashion', 'craft', 'visual-culture'],
    materialIds: ['mat-synthetic-fiber'],
    conceptIds: ['c-deconstruction-fashion', 'c-body-identity'],
    facts: [
      { label: loc('出生', 'Born'), value: loc('1942 年生于东京', 'Born 1942, Tokyo') },
      { label: loc('创立', 'Founded'), value: loc('Comme des Garçons，1969 年', 'Comme des Garçons, 1969') },
      { label: loc('巴黎首秀', 'Paris debut'), value: loc('1981 年', '1981') },
    ],
    tags: ['日本设计', '解构', '黑色'],
    modes: ['story', 'network'],
    weight: 84,
  } as EntityBase,
  {
    id: 'person-mcqueen',
    type: 'person',
    slug: 'alexander-mcqueen',
    name: loc('亚历山大·麦昆', 'Alexander McQueen'),
    birthYear: 1969,
    deathYear: 2010,
    occupation: loc('时装设计师 · Alexander McQueen 品牌创始人', 'Fashion designer · founder of Alexander McQueen'),
    tagline: loc('萨维尔街的剪刀，舞台上的胆量', 'Savile Row scissors with stage courage'),
    summary: loc(
      '伦敦出租车司机之子，十六岁进萨维尔街学徒学剪裁，圣马丁毕业首秀即成名——他用低腰裤、高地暴行与 VOSS 疯人院秀场，把时装秀推到当代艺术的强度。',
      'A London cab driver’s son, apprenticed on Savile Row at sixteen and launched straight from Central Saint Martins — with bumsters, Highland Rape and the asylum spectacle of VOSS he pushed the runway to the intensity of contemporary art.',
    ),
    body: [
      loc(
        '麦昆 1969 年生于伦敦东区，在安德森与谢泼德等萨维尔街裁缝店学得一手硬剪裁——相传他能在一条裤缝里缝进六公里棉线。1992 年圣马丁硕士毕业系列“开膛手杰克”被伊莎贝拉·布罗整批买下，他的低腰 Bumster 裤同期登场：腰线降至髋骨以下，脊柱末端若隐若现，他说这是为了“拉长躯干”。',
        'Born in London’s East End in 1969, McQueen learned hard tailoring at Savile Row houses like Anderson & Sheppard — legend says he sewed six kilometers of thread into a single trouser. His 1992 Central Saint Martins MA collection “Jack the Ripper” was bought in full by Isabella Blow, alongside the first bumsters: waistbands dropped below the hipbone, the base of the spine glimpsed — to “elongate the body”, he said.',
      ),
      loc(
        '1995 年“高地暴行”以撕裂的格纹与踉跄的模特直面苏格兰创伤；他同时为纪梵希设计高定（1996–2001），四次拿下英国年度设计师。秀场是他的媒介：VOSS 的镜面疯人院、“柏拉图的亚特兰蒂斯”的深海异形与现场直播，都在他 2010 年自杀前成为绝唱。',
        'Highland Rape (1995) confronted Scottish trauma through torn tartan and stumbling models; he designed Givenchy couture (1996–2001) and won British Designer of the Year four times. The show was his medium: VOSS’s mirrored asylum, the deep-sea aliens and live-stream of Plato’s Atlantis — all before his suicide in 2010.',
      ),
    ],
    domainIds: ['fashion', 'craft', 'visual-culture'],
    conceptIds: ['c-silhouette', 'c-body-identity', 'c-deconstruction-fashion'],
    facts: [
      { label: loc('生卒', 'Lifespan'), value: loc('1969–2010（伦敦）', '1969–2010, London') },
      { label: loc('训练', 'Training'), value: loc('萨维尔街裁缝学徒 → 中央圣马丁硕士（1992）', 'Savile Row apprenticeship → CSM MA (1992)') },
      { label: loc('荣誉', 'Honors'), value: loc('四届英国年度设计师', 'British Designer of the Year, four times') },
    ],
    tags: ['英国设计', '剪裁', '前卫秀场'],
    modes: ['story'],
    weight: 84,
  } as EntityBase,

  // ================================================================== 物品
  {
    id: 'object-little-black-dress',
    type: 'object',
    slug: 'chanel-little-black-dress-1926',
    name: loc('香奈儿小黑裙（1926）', 'Chanel Little Black Dress (1926)'),
    yearStart: 1926,
    medium: loc('黑色平纹针织与丝绸绉纱', 'Black wool jersey and silk crêpe'),
    tagline: loc('“香奈儿的福特车”', '“The Chanel Ford”'),
    summary: loc(
      '一条直身、无装饰、长及膝盖的黑色裙装，被《Vogue》预言为“所有女人都会穿的制服”——黑色从丧服颜色翻转为现代性的底色。',
      'A straight, unadorned, knee-length black dress that Vogue predicted would become “a sort of uniform for all women” — black inverted from mourning into the ground color of modernity.',
    ),
    body: [
      loc(
        '1926 年 10 月 1 日，美国版《Vogue》刊登香奈儿的黑色直身裙：低腰、斜裁下摆、长及小腿中部，配珍珠项链与浅口鞋。杂志以福特 T 型车作比——“香奈儿的福特车”——暗示它将像流水线汽车一样民主、可靠、人人可及。',
        'On 1 October 1926 American Vogue published Chanel’s black shift: drop waist, bias-cut hem, mid-calf length, with pearls and pumps. The magazine compared it to the Ford Model T — “the Chanel Ford” — democratic, reliable and universally available like an assembly-line car.',
      ),
      loc(
        '在此之前，黑色是仆役、修士与丧礼的颜色；香奈儿用针织与绉纱把它做成高级时装：直线条取消了胸衣，裙摆释放了步伐，中性色与首饰随意配搭。奥黛丽·赫本 1961 年的蒂凡尼早餐形象是它的银幕注脚——一条裙子从此成为衣橱里最长寿的单品。',
        'Black had belonged to servants, clergy and mourning; Chanel made it couture in jersey and crêpe: straight lines abolished the corset, the freed hem allowed walking, and the neutral field invited jewelry at will. Audrey Hepburn’s 1961 Breakfast at Tiffany’s look was its screen footnote — the dress became the longest-lived item in the wardrobe.',
      ),
    ],
    creatorIds: ['person-chanel'],
    materialIds: ['mat-jersey-knit', 'mat-silk'],
    conceptIds: ['c-silhouette', 'c-textile-innovation'],
    cultureId: 'culture-french',
    placeId: 'place-paris',
    periodId: 'period-modern',
    domainIds: ['fashion', 'craft'],
    facts: [
      { label: loc('设计师', 'Designer'), value: loc('可可·香奈儿', 'Coco Chanel') },
      { label: loc('年份', 'Year'), value: loc('1926（美国版《Vogue》10 月号刊出）', '1926 (American Vogue, October issue)') },
      { label: loc('面料', 'Fabric'), value: loc('平纹针织 / 丝绸绉纱', 'Wool jersey / silk crêpe') },
      { label: loc('昵称', 'Nickname'), value: loc('“香奈儿的福特车”', '“The Chanel Ford”') },
    ],
    blocks: [
      { id: 'lbd-color', kind: 'text', title: loc('黑色的民主化', 'Black, democratized'), body: loc('黑色曾标志丧服与仆役；当它脱离礼仪，反而成为最大的自由色——任何人、任何场合、任何时间都可穿，且永远不与其他颜色争夺注意力。', 'Black once signaled mourning and service; freed from ritual it became the freest color — wearable by anyone, anywhere, anytime, never competing for attention.') },
      { id: 'lbd-jersey', kind: 'text', title: loc('内衣面料的政变', 'The underwear-fabric coup'), body: loc('平纹针织本是男人运动内衣的布料，弹性、廉价、垂坠。香奈儿把它缝上高级定制的标签，完成面料等级史上最著名的一次颠覆。', 'Jersey was the cloth of men’s athletic underwear — elastic, cheap, fluid. Chanel sewed it into a couture label: the most famous inversion in the hierarchy of fabrics.') },
      { id: 'lbd-line', kind: 'text', title: loc('直线条解放身体', 'A straight line frees the body'), body: loc('没有腰垫、没有裙撑、没有省道堆叠，裙身垂直落下，只在肩与胯承重。轮廓从“沙漏”变为“管子”，对应的是走向职场与街头的新女性。', 'No pads, no crinolines, no stacked darts — the cloth falls vertically, hanging from shoulders and hips. The silhouette shifted from hourglass to tube, mapping the woman heading to the office and the street.') },
    ],
    palette: ['#111113', '#1d1d20', '#2e2e33', '#e7e2d8', '#9b958a'],
    tags: ['小黑裙', '现代女装', '香奈儿'],
    modes: ['detail', 'material', 'comparison'],
    weight: 86,
  } as EntityBase,
  {
    id: 'object-new-look',
    type: 'object',
    slug: 'dior-new-look-bar-suit-1947',
    name: loc('迪奥 New Look · Bar 套装（1947）', 'Dior New Look · Bar Suit (1947)'),
    yearStart: 1947,
    medium: loc('象牙白山东绸紧身外套，黑色百褶羊毛裙', 'Ivory silk shantung bar jacket with black pleated wool skirt'),
    tagline: loc('花冠般的长裙', 'A skirt like a flower'),
    summary: loc(
      '收腰、垫肩、散开至小腿中部的百褶裙——单裙用料近二十码，在布料配给的年代既惹抗议也宣告新生，成为战后西方最重要的轮廓。',
      'Cinched waist, padded hips, pleated skirt flaring to mid-calf — nearly twenty yards of fabric at a time of rationing, provoking protest and announcing rebirth; the defining silhouette of the postwar West.',
    ),
    body: [
      loc(
        'Bar 套装是“花冠”系列的核心单品：象牙白山东绸外套以细小腰线收紧，臀部加垫，下摆呈倒三角形翘起；下配黑色羊毛百褶裙，裙摆在走动时开合如花冠。它在 1947 年 2 月的首秀上引发抢购与愤怒——配给制下的女人质问：为什么一个设计师要烧掉这么多布料？',
        'The Bar suit anchors the Corolle line: an ivory silk shantung jacket nipped at a tiny waist, padded at the hip, its hem kicking out in an inverted triangle, over a black wool pleated skirt that opens and closes like a flower in motion. Its February 1947 debut provoked both frenzy and anger — women under rationing asked why a designer should burn through so much cloth.',
      ),
      loc(
        '迪奥的回答是：战时垫肩直筒裙是权宜，不是天性；丰裕的布料是对“女人味”的集体记忆。New Look 随即统治西方女装十年，腰线与裙摆的升降从此成为每一季时装编辑的头条——轮廓，第一次成为国家情绪的指标。',
        'Dior’s answer: wartime shoulder-padded sheaths were expediency, not nature; abundance of cloth was a collective memory of femininity. The New Look ruled Western womenswear for a decade, and the rise and fall of hemlines became seasonal headline news — silhouette as an index of national mood for the first time.',
      ),
    ],
    creatorIds: ['person-dior'],
    materialIds: ['mat-silk'],
    conceptIds: ['c-silhouette', 'c-haute-couture', 'c-pattern-making'],
    cultureId: 'culture-french',
    placeId: 'place-paris',
    periodId: 'period-postwar',
    domainIds: ['fashion', 'craft'],
    facts: [
      { label: loc('设计师', 'Designer'), value: loc('克里斯汀·迪奥', 'Christian Dior') },
      { label: loc('年份', 'Year'), value: loc('1947（2 月 12 日首秀）', '1947 (debut 12 February)') },
      { label: loc('系列', 'Collection'), value: loc('“花冠”（Corolle），即 New Look', '“Corolle” — the New Look') },
      { label: loc('用料', 'Fabric use'), value: loc('单裙用料近 20 码', 'Nearly 20 yards per skirt') },
    ],
    blocks: [
      { id: 'nl-silhouette', kind: 'text', title: loc('花冠轮廓', 'The corolle silhouette'), body: loc('上身收紧至极细腰线，下身突然放量为多片百褶——轮廓像一朵翻转的花：腰是茎，裙是花冠。整件外套没有一颗纽扣外露，结构全藏在面料里。', 'The torso cinches to a wasp waist, then the lower body bursts into pleated panels — the outline of an inverted flower: waist as stem, skirt as bloom. No button shows on the jacket; structure hides within the cloth.') },
      { id: 'nl-fabric', kind: 'text', title: loc('面料即结构', 'Fabric as structure'), body: loc('山东绸的粗粝纹理与挺括手感让外套无需衬垫也能保持弧线；羊毛裙的褶皱本身就是骨架。在这里制版不是裁剪布料，而是编排材料的力学。', 'The slubby texture and body of shantung hold the jacket’s arcs without padding; the pleats of the wool skirt are themselves the skeleton. Pattern-making here is not cutting cloth but engineering the mechanics of material.') },
      { id: 'nl-context', kind: 'text', title: loc('配给制下的争议', 'Controversy under rationing'), body: loc('战后欧洲仍在凭票供应布料，街头女性曾扯掉模特的 New Look 裙摆抗议。争议本身说明：服装从不是私事，布料用量是政治。', 'Postwar Europe still rationed fabric; women in the streets tore at New Look hems in protest. The fury proves clothing is never private — the amount of cloth used is politics.') },
    ],
    palette: ['#efe9dc', '#1a1a1c', '#b8a98f', '#8c7d63', '#d9d2c2'],
    tags: ['New Look', '高级定制', '轮廓'],
    modes: ['detail', 'material', 'comparison'],
    weight: 86,
  } as EntityBase,
  {
    id: 'object-pleats-please',
    type: 'object',
    slug: 'issey-miyake-pleats-please-1993',
    name: loc('三宅一生 Pleats Please 褶皱系列（1993）', 'Issey Miyake Pleats Please (1993)'),
    yearStart: 1993,
    medium: loc('热压定型聚酯纤维褶裥', 'Heat-set polyester pleats'),
    tagline: loc('先缝成衣服，再压出褶皱', 'Sewn first, pleated after'),
    summary: loc(
      '把三倍大的成衣送入压褶机热压，褶皱永远封进聚酯纤维：可机洗、免熨烫、卷成拳头大小——高定第一次以工业尺度为普通人生产。',
      'Garments sewn three times oversized are heat-pressed, pleats locked permanently into polyester: machine-washable, iron-free, rollable to the size of a fist — couture logic produced at industrial scale for ordinary people.',
    ),
    body: [
      loc(
        '传统褶裥先压褶、再剪裁缝合，一洗就散；三宅一生把工序倒转：先按放大三倍的尺寸缝成整件衣服，再夹进折纸状的纸模送入压褶机加热——褶痕从此活在纤维的记忆里。这个灵感部分来自 1960 年代法国设计师格里夫人的绉褶，但三宅把它交给了工业流水线。',
        'Conventionally pleats are pressed before cutting and dissolve at the dry cleaner; Miyake inverted the sequence: garments are sewn whole at three times the final size, sandwiched in origami-like paper molds and heat-pressed — the creases thereafter living in the fiber’s memory. The idea partly recalls the pleats of Madame Grès, but Miyake handed them to the production line.',
      ),
      loc(
        '褶皱让衣服与身体之间始终隔着一层可伸缩的风琴结构：任何尺码都能穿，任何动作都不被束缚。它呼应和服的空间哲学，却使用最现代的合成纤维——东方的“布与身之间的空气”被装进了行李箱，成为旅行者、舞者与通勤者共同的制服。',
        'The pleats keep a concertina of air between cloth and body: one size fits everyone and no movement is constrained. Echoing the kimono’s spatial philosophy in the most modern of fibers, the Eastern “air between cloth and body” was packed into a suitcase — a shared uniform for travelers, dancers and commuters.',
      ),
    ],
    creatorIds: ['person-miyake-issey'],
    materialIds: ['mat-synthetic-fiber'],
    conceptIds: ['c-textile-innovation', 'c-drape', 'c-pattern-making'],
    cultureId: 'culture-japanese',
    placeId: 'place-edo',
    periodId: 'period-contemporary',
    domainIds: ['fashion', 'craft', 'design'],
    facts: [
      { label: loc('设计师', 'Designer'), value: loc('三宅一生', 'Issey Miyake') },
      { label: loc('年份', 'Year'), value: loc('1993', '1993') },
      { label: loc('面料', 'Fabric'), value: loc('聚酯纤维（热压永久褶裥）', 'Polyester (permanent heat-set pleats)') },
      { label: loc('工艺', 'Process'), value: loc('先缝合三倍大成衣，再入压褶机定型', 'Sewn at 3× size, then heat-pressed to shape') },
    ],
    blocks: [
      { id: 'pp-process', kind: 'text', title: loc('倒置的工序', 'The inverted process'), body: loc('先成衣、后压褶：裁缝完成时衣服还大得荒谬，机器加热的几分钟里它才“长成”最终尺寸。制造顺序的颠倒，是这个系列真正的专利。', 'Garment first, pleats second: when tailoring ends the cloth is absurdly large; in minutes of heat it “grows” into its final size. The reversed order of making is the line’s real patent.') },
      { id: 'pp-air', kind: 'text', title: loc('褶皱是第二皮肤', 'Pleats as a second skin'), body: loc('风琴褶随身体拉伸与回弹，布料永不贴死皮肤。它继承和服的呼吸空间，又用合成纤维的弹性把这种空间工业化——贴身与自由第一次不必二选一。', 'Accordion pleats stretch and rebound with the body, cloth never gluing to skin. It inherits the kimono’s breathing space but industrializes it through elastic synthetic fiber — fit and freedom no longer a trade-off.') },
      { id: 'pp-care', kind: 'text', title: loc('可机洗的高级时装', 'Machine-washable couture'), body: loc('它不送干洗店、不需要熨烫、旅行时卷成一卷。维护成本被设计归零——三宅一生的民主化不是降价，而是把“伺候衣服”的时间还给穿着者。', 'No dry cleaner, no ironing, rolled for travel. Maintenance is designed down to zero — Miyake’s democratization was not lower prices but returning the hours of tending clothes to the wearer.') },
    ],
    palette: ['#efeff2', '#c3c9d4', '#46608a', '#d9534f', '#32363d'],
    tags: ['褶皱', '日本设计', '合成纤维'],
    modes: ['detail', 'material', 'process'],
    weight: 85,
  } as EntityBase,
  {
    id: 'object-body-meets-dress',
    type: 'object',
    slug: 'cdg-body-meets-dress-1997',
    name: loc('川久保玲“身体遇见裙子”（1997）', 'Comme des Garçons “Body Meets Dress” (1997)'),
    yearStart: 1997,
    medium: loc('弹力尼龙针织面料，内填鹅羽绒团', 'Stretch nylon jersey stuffed with goose-down pads'),
    tagline: loc('“肿块装”', 'The “lumps and bumps” dresses'),
    summary: loc(
      '连衣裙的肩、背、腰、臀处鼓起羽绒团块，像身体在布料下长错了地方——评论界称之为“肿块装”，它是时装史上对理想化身体最响亮的一次拒绝。',
      'Goose-down pads bulge from shoulder, back, waist and hip as if the body had grown in the wrong places under the cloth — critics called them “lumps and bumps”; fashion history’s loudest refusal of the idealized body.',
    ),
    body: [
      loc(
        '1997 年春夏系列全名“身体遇见裙子，裙子遇见身体”：蓝白格纹或碎花的弹力连衣裙里，缝入大小不一的鹅羽绒团，位置精确避开女性身体的“正确”曲线——它们落在肩胛骨、后腰与胯侧，让穿着者看起来微微畸形。发布会后媒体一片哗然，称之为“肿块装”（lumps and bumps）。',
        'The Spring/Summer 1997 line was fully titled “Body Meets Dress, Dress Meets Body”: stretch gingham and floral dresses sewn with goose-down pads of varying sizes, placed to avoid the “correct” female curves — between shoulder blades, at the small of the back, along the hip — making the wearer look faintly deformed. The press recoiled, naming them the “lumps and bumps” collection.',
      ),
      loc(
        '川久保玲拒绝把裙子改回去的呼声：她质疑的不是身材，而是时装工业维持的“身材应当如何”的暴政——垫肩、束腰与隆胸都在修正身体，她只是把修正器挪到了错误的位置。十年后，这些裙子进入大都会博物馆与京都服装学院收藏，被视为“身体与身份”讨论的里程碑。',
        'Kawakubo refused calls to revise the dresses: her target was not body shape but fashion’s tyranny of how bodies should be — shoulder pads, corsets and push-up bras all correct the body; she simply moved the correctors to wrong positions. Within a decade the dresses entered the Met and the Kyoto Costume Institute as milestones in the discourse of body and identity.',
      ),
    ],
    creatorIds: ['person-kawakubo'],
    materialIds: ['mat-synthetic-fiber'],
    conceptIds: ['c-deconstruction-fashion', 'c-body-identity', 'c-textile-innovation'],
    cultureId: 'culture-japanese',
    placeId: 'place-edo',
    periodId: 'period-contemporary',
    domainIds: ['fashion', 'visual-culture', 'craft'],
    facts: [
      { label: loc('设计师', 'Designer'), value: loc('川久保玲 / Comme des Garçons', 'Rei Kawakubo / Comme des Garçons') },
      { label: loc('年份', 'Year'), value: loc('1997 年春夏', 'Spring/Summer 1997') },
      { label: loc('填充', 'Padding'), value: loc('鹅羽绒团缝入弹力针织布', 'Goose-down pads sewn into stretch jersey') },
      { label: loc('别称', 'Nickname'), value: loc('“肿块装”（lumps and bumps）', '“Lumps and bumps”') },
    ],
    blocks: [
      { id: 'bmd-lumps', kind: 'text', title: loc('布料下的肿块', 'Bumps beneath the cloth'), body: loc('羽绒团让裙面在不该隆起的位置隆起：视觉语言从“修饰曲线”转为“干扰曲线”。熟悉的连衣裙轮廓被加上不属于身体的体积，迫使观者重新打量“正常”二字。', 'Down pads bulge where cloth should lie flat: the visual language shifts from enhancing curves to disrupting them. A familiar dress silhouette loaded with non-anatomical volume forces the viewer to inspect the word “normal”.') },
      { id: 'bmd-body', kind: 'text', title: loc('反对单一的理想身体', 'Against one ideal body'), body: loc('束腰、垫肩与衬裙一直在“修正”身体，只是修正方向被默认为美。川久保玲把同样的技术挪到“错误”位置——她否定的不是身材，而是身材必须被修正的前提。', 'Corsets, shoulder pads and petticoats have always corrected the body, their direction simply assumed as beauty. Kawakubo moved the same devices to “wrong” positions — rejecting not body shape but the premise that bodies need correction.') },
      { id: 'bmd-stretch', kind: 'text', title: loc('弹力针织的工程学', 'The engineering of stretch jersey'), body: loc('尼龙与氨纶的弹力让包覆成为可能，羽绒团的重量被针织张力均匀分散——这件“概念作品”其实建立在精密的材料工程上，而非任意造型。', 'Nylon-and-spandex stretch makes the wrapping possible, the weight of the pads distributed through knit tension: a “concept piece” built on precise materials engineering rather than arbitrary shape.') },
    ],
    palette: ['#f4f1ea', '#7fa6c8', '#2f5f8f', '#e3dfd3', '#1d1d20'],
    tags: ['解构', '身体', '前卫时装'],
    modes: ['detail', 'comparison', 'story'],
    weight: 82,
  } as EntityBase,
  {
    id: 'object-bumster',
    type: 'object',
    slug: 'mcqueen-bumster-trousers-1996',
    name: loc('麦昆 Bumster 低腰裤（1996）', 'McQueen Bumster Trousers (1996)'),
    yearStart: 1996,
    medium: loc('格纹精纺羊毛低腰裤', 'Low-rise tartan worsted wool trousers'),
    tagline: loc('腰线下降十厘米', 'The waistline drops ten centimeters'),
    summary: loc(
      '裤腰被切到髋骨以下，脊柱末端与臀缝上缘若隐若现——麦昆用萨维尔街级别的剪裁，把一个下流玩笑变成了改变一代人腰线的轮廓革命。',
      'The waistband cut below the hipbone, the base of the spine and the upper cleft glancing in and out of view — McQueen turned a rude joke, cut with Savile Row precision, into a silhouette revolution that shifted a generation’s waistline.',
    ),
    body: [
      loc(
        'Bumster 是麦昆最早的签名单品，在 1990 年代中期的系列中反复出现：前片腰线降至正常位置以下约七至十厘米，后片更低；裸露的不是臀部，而是脊柱底端——他称之为“身体上最性感的部位之一”。格纹版本与 1995 年“高地暴行”对苏格兰历史的追问一脉相承。',
        'The bumster was McQueen’s earliest signature, recurring through mid-1990s collections: the front waistband dropped seven to ten centimeters below the norm, the back lower still, exposing not the buttocks but the base of the spine — “one of the most erotic parts of the body”, he called it. The tartan versions echo the Scottish history probed in 1995’s Highland Rape.',
      ),
      loc(
        '它在萨维尔街的硬剪裁里成立：腰头越低，裆部与裤管的比例越难处理，稍有误差就垮成二流玩笑。麦昆的论点是人类学式的——腰线的高度定义了时代比例：帝国时期高腰的尊严、1960 年代低腰的叛逆；他把这条线推到极致，随后整个牛仔裤产业跟进到低腰时代。',
        'It succeeds only through Savile Row rigor: the lower the waist, the harder the crotch-to-leg proportion; a millimeter off and it collapses into a second-rate gag. McQueen’s argument was anthropological — waistline height defines an era’s proportions, from the high-waisted dignity of empire to the low-slung rebellion of the 1960s. He pushed the line to its limit, and the denim industry followed into the low-rise age.',
      ),
    ],
    creatorIds: ['person-mcqueen'],
    materialIds: ['mat-tweed'],
    conceptIds: ['c-silhouette', 'c-body-identity', 'c-deconstruction-fashion'],
    periodId: 'period-contemporary',
    domainIds: ['fashion', 'craft', 'visual-culture'],
    facts: [
      { label: loc('设计师', 'Designer'), value: loc('亚历山大·麦昆', 'Alexander McQueen') },
      { label: loc('年份', 'Year'), value: loc('1996', '1996') },
      { label: loc('面料', 'Fabric'), value: loc('格纹精纺羊毛（亦有黑色精纺版本）', 'Tartan worsted wool (also black versions)') },
      { label: loc('特征', 'Feature'), value: loc('腰线降至髋骨以下，露出脊柱末端', 'Waistband below the hipbone, exposing the spine’s base') },
    ],
    blocks: [
      { id: 'bm-waist', kind: 'text', title: loc('一条线的革命', 'Revolution in a single line'), body: loc('服装轮廓由少数几条线决定：肩线、腰线、裙摆线。麦昆只移动了腰线一条，就重排了躯干的比例——上身被拉长，重心被压低，站姿随之改变。', 'A silhouette is set by few lines: shoulder, waist, hem. Moving only the waistline, McQueen re-proportioned the torso — upper body lengthened, center of gravity lowered, the stance itself changed.') },
      { id: 'bm-tailor', kind: 'text', title: loc('下流玩笑与硬剪裁', 'A dirty joke in hard tailoring'), body: loc('低腰之所以没有沦为噱头，全靠萨维尔街学徒期的版型功力：腰臀差、裆弯与裤线全部重新计算。挑衅的想法用最保守的工艺兑现，这是麦昆的配方。', 'The low rise escapes gimmickry only through Savile Row block-making: hip-to-waist fall, crotch curve and crease line all recalculated. A provocative idea cashed out in the most conservative of crafts — McQueen’s recipe.') },
      { id: 'bm-politics', kind: 'text', title: loc('暴露的政治学', 'The politics of exposure'), body: loc('露出脊柱末端而非乳沟，是选择了一个时尚不曾编码的性感地带——观者被迫先感到不适，再追问：为何有些身体部位可以公开展示，另一些不行？', 'Exposing the base of the spine rather than cleavage selects an erotic zone fashion had never coded — the viewer is made uncomfortable first, then asks why some parts of the body may be shown and others not.') },
    ],
    palette: ['#141416', '#26262a', '#3a3a40', '#7a2e2e', '#d9d4cb'],
    tags: ['低腰裤', '剪裁', '英国前卫'],
    modes: ['detail', 'comparison'],
    weight: 80,
  } as EntityBase,

  // ================================================================== 概念
  {
    id: 'c-silhouette',
    type: 'concept',
    slug: 'silhouette',
    name: loc('轮廓', 'Silhouette'),
    tagline: loc('远看一件衣服，先看到的是外轮廓', 'From across a room, a garment is its outline first'),
    summary: loc(
      '时装的第一语言：在看清面料与细节之前，外轮廓已经说出年代与身份——直线条的爵士时代、沙漏型的 New Look、低腰的 1990 年代。',
      'Fashion’s first language: before fabric or detail register, the outer outline announces decade and identity — the tube of the Jazz Age, the New Look hourglass, the low-rise 1990s.'),
    body: [
      loc(
        '“silhouette”一词来自 18 世纪法国财务总监艾蒂安·德·西卢埃特——他以吝啬闻名，人们把最便宜的黑色侧面剪纸戏称为他的肖像。这个词后来成为时装编辑的核心术语：廓形设计师只勾外轮廓就能辨认一个年代。1920 年代的直筒、1947 年的花冠、1990 年代的低腰，每一次时装革命首先都是外轮廓的革命。',
        'The term derives from Étienne de Silhouette, an 18th-century French finance minister so notorious for thrift that the cheapest black paper profile cutouts were jokingly named after him. It became fashion editing’s core term: a silhouette designer can date a decade by outline alone. The 1920s tube, the 1947 corolle, the 1990s low rise — every fashion revolution is first a revolution in outline.',
      ),
      loc(
        '轮廓由肩线、腰线、裙摆线与裤线决定，因此它既是审美选择，也是身体政治：腰线高低在束缚与解放之间摆动，裙摆升降同步于经济与性别权力。时装插画师与漫画大师都知道：擦掉内部细节，只留外轮廓，人物依然可辨。',
        'Set by shoulder, waist, hem and crease lines, the silhouette is aesthetic choice and body politics at once: waistlines oscillate between constraint and emancipation, hemlines track the economy and gender power. Fashion illustrators and cartoonists both know: erase every interior detail, keep the outline, and the figure remains recognizable.',
      ),
    ],
    domainIds: ['fashion', 'design', 'visual-culture'],
    facts: [
      { label: loc('词源', 'Etymology'), value: loc('18 世纪法国财务总监 de Silhouette', '18th-c. French finance minister de Silhouette') },
      { label: loc('控制线', 'Control lines'), value: loc('肩线 / 腰线 / 裙摆线 / 裤线', 'Shoulder / waist / hem / crease lines') },
    ],
    tags: ['廓形', '视觉语言'],
    modes: ['detail', 'comparison'],
  },
  {
    id: 'c-drape',
    type: 'concept',
    slug: 'draping',
    name: loc('垂坠', 'Draping'),
    tagline: loc('布料不是被剪裁，而是自然落下', 'Cloth not cut into shape but falling into it'),
    summary: loc(
      '时装两种基本语法之一：硬剪裁用省道把布塑成壳，垂坠让布顺应重力与身体——希腊长袍、和服、纱丽与三宅一生的褶皱都是它的变奏。',
      'One of fashion’s two fundamental grammars: hard tailoring sculpts cloth into a shell with darts, while draping lets cloth follow gravity and body — the Greek chiton, the kimono, the sari and Miyake’s pleats are all its variations.'),
    body: [
      loc(
        '垂坠（draping，法语 moulage）指在人台上直接用坯布缠绕、别针、塑形，再按布纹走向裁片；它尊重布料的重量与斜向拉伸——1930 年代玛德琳·维奥内的斜裁（bias cut）让丝绸顺着 45 度斜纹贴合身体再在膝部绽开，是垂坠美学的高峰。',
        'Draping (French moulage) means wrapping and pinning muslin directly on the mannequin, then cutting along the grain the cloth reveals; it honors weight and diagonal stretch. Madeleine Vionnet’s 1930s bias cut — silk hugging the body along the 45-degree grain before flaring at the knee — is the high peak of the draped aesthetic.',
      ),
      loc(
        '垂坠传统与东方服饰关系深厚：和服与纱丽都不剪布，靠缠绕与固定在身体上形成空间。三宅一生的褶皱把垂坠的随形性交给合成纤维永久保存。与硬剪裁相比，垂坠宽容尺码、随动作变化，是“衣服适应身体”最古老的答案。',
        'The draped tradition runs deep in Eastern dress: neither kimono nor sari cuts the cloth, wrapping and tucking instead to form space around the body. Miyake’s pleats handed drape’s responsiveness to synthetic fiber for permanent keeping. Compared with tailoring, draping forgives size and moves with the body — fashion’s oldest answer to clothes adapting to the body.',
      ),
    ],
    domainIds: ['fashion', 'craft', 'design'],
    materialIds: ['mat-jersey-knit', 'mat-silk'],
    facts: [
      { label: loc('两种语法', 'Two grammars'), value: loc('垂坠 / 立体裁剪 vs 平面制版硬剪裁', 'Draping (moulage) vs flat-pattern tailoring') },
      { label: loc('代表', 'Peak'), value: loc('维奥内斜裁（1930 年代）', 'Vionnet’s bias cut (1930s)') },
    ],
    tags: ['布料', '立体裁剪', '东方影响'],
    modes: ['detail', 'process'],
  },
  {
    id: 'c-pattern-making',
    type: 'concept',
    slug: 'pattern-making',
    name: loc('制版', 'Pattern Making'),
    tagline: loc('把三维身体翻译成二维纸样', 'Translating a three-dimensional body into two-dimensional patterns'),
    summary: loc(
      '时装的工程学：平面制版与立体裁剪两条路径，用省道、褶裥与放松量把平面布料变成可穿戴的三维结构——一切轮廓的兑现都靠纸样。',
      'Fashion’s engineering: flat pattern and moulage — darts, pleats and ease turn flat cloth into wearable three-dimensional structure. No silhouette is ever realized without the paper pattern.'),
    body: [
      loc(
        '制版有两条路径：平面制版以基本原型（block）为基础，按尺寸加减推算；立体裁剪直接在人台上用坯布造型再拓成纸样。省道（dart）是其中最关键的发明——一个缝进去的三角形褶，让平面布片获得锥度，从而贴合胸、腰、臀的起伏。放松量（ease）则是留给呼吸与动作的间隙。',
        'Pattern-making has two routes: flat pattern, calculated from a basic block by measurement; and moulage, draped on the mannequin in muslin and transferred to paper. The dart is the decisive invention — a stitched triangular tuck giving flat cloth the taper to follow bust, waist and hip. Ease is the margin left for breath and motion.',
      ),
      loc(
        '迪奥 Bar 外套的极细腰线与麦昆 Bumster 的极低腰头，都是纸样上的数学：腰臀差几厘米，省道就转移几厘米。高级定制的真正壁垒不在秀场概念，而在这套需要十年训练的隐性知识——萨维尔街的裁缝能在不量体的情况下记住数百套纸样。',
        'The Bar jacket’s wasp waist and the bumster’s ultra-low rise are mathematics on paper: centimeters of hip-to-waist fall relocated through darts. Haute couture’s real barrier is not the runway concept but this tacit knowledge requiring a decade of training — Savile Row cutters hold hundreds of patterns in memory without measuring.',
      ),
    ],
    domainIds: ['fashion', 'craft'],
    facts: [
      { label: loc('两条路径', 'Two routes'), value: loc('平面制版 / 立体裁剪', 'Flat pattern / moulage (draping)') },
      { label: loc('关键结构', 'Key devices'), value: loc('省道、褶裥、放松量', 'Darts, pleats, ease') },
    ],
    tags: ['工艺', '纸样', '裁缝'],
    modes: ['process', 'detail'],
  },
  {
    id: 'c-textile-innovation',
    type: 'concept',
    slug: 'textile-innovation',
    name: loc('纺织创新', 'Textile Innovation'),
    tagline: loc('每一次时装革命，先发生在纱线上', 'Every fashion revolution happens first in the yarn'),
    summary: loc(
      '新面料比新轮廓更深刻地改变衣橱：丝绸、棉花、尼龙与聚酯纤维相继改写了衣服的价格、形态与道德——香奈儿的针织与三宅一生的褶皱都是面料先行。',
      'New fabric changes the wardrobe more deeply than new outline: silk, cotton, nylon and polyester successively rewrote clothing’s price, form and ethics — Chanel’s jersey and Miyake’s pleats both began at the fiber.'),
    body: [
      loc(
        '面料史即时装史：工业革命的棉纺把布料价格打到平民可及；1938 年杜邦推出尼龙，丝袜在 1940 年首日卖出四百万双；1941 年聚酯纤维专利化，为免熨烫时代铺路；1959 年氨纶问世，紧身衣与运动服从此改写。合成纤维让褶皱可以永久定型、让衣服轻到可卷起邮寄——三宅一生的 Pleats Please 是这套技术的艺术兑现。',
        'Fabric history is fashion history: industrial cotton spinning brought cloth within ordinary budgets; DuPont launched nylon in 1938 and four million pairs of stockings sold on day one in 1940; polyester was patented in 1941, paving the wash-and-wear age; spandex arrived in 1959, rewriting intimate and athletic wear. Synthetic fibers let pleats be set permanently and garments be light enough to post in a tube — Miyake’s Pleats Please is the artistic cashing-out of that technology.',
      ),
      loc(
        '创新从来不是单向的胜利：廉价合成纤维也带来血汗工厂与微塑料，今日的面料创新转而追问可降解、可回收与可种植。香奈儿把内衣针织抬进高定的历史提醒我们：材料的等级从来不是天然的，它由穿着者重新册封。',
        'Innovation is never one-sided triumph: cheap synthetics also brought sweatshops and microplastics, and today’s textile research asks after biodegradability, recycling and grown materials. Chanel’s elevation of underwear jersey to couture reminds us that the hierarchy of materials is never natural — wearers re-anoint it.',
      ),
    ],
    domainIds: ['fashion', 'craft', 'industrial'],
    materialIds: ['mat-synthetic-fiber', 'mat-jersey-knit'],
    facts: [
      { label: loc('尼龙', 'Nylon'), value: loc('杜邦 1938 年发表，1940 年丝袜上市', 'DuPont, 1938; stockings on sale 1940') },
      { label: loc('聚酯纤维', 'Polyester'), value: loc('1941 年专利化，免熨烫时代', 'Patented 1941; the wash-and-wear age') },
    ],
    tags: ['面料', '材料史', '合成纤维'],
    modes: ['material', 'process'],
  },
  {
    id: 'c-body-identity',
    type: 'concept',
    slug: 'body-and-identity',
    name: loc('身体与身份', 'Body & Identity'),
    tagline: loc('衣服是身体最外层的社会皮肤', 'Clothing is the body’s outermost social skin'),
    summary: loc(
      '服装把性别、阶级、职业与欲望写在可见的身体表面：束腰与直筒裙、肿块装与低腰裤，每一次轮廓争执都是“谁有权定义身体”的争执。',
      'Clothing inscribes gender, class, profession and desire on the body’s visible surface: corset and shift, lumps-and-bumps and bumster — every silhouette quarrel is a quarrel over who defines the body.'),
    body: [
      loc(
        '人类学家玛丽·道格拉斯把身体视为社会压力的承载面，服装则是这层表面的第一层媒介。1920 年代的直筒裙藏起胸腰差，对应女性投票权与进入职场；1947 年的 New Look 重新强调胸腰臀曲线，被战后女性既拥抱也抵抗；1990 年代川久保玲的肿块装与麦昆的低腰裤，则把“身材应当如何”的标准答案本身撕开口子。',
        'Anthropologist Mary Douglas read the body as a surface bearing social pressure, clothing its first medium. The 1920s shift concealed the bust-waist-hip differential as women gained the vote and entered offices; the 1947 New Look reasserted those curves, embraced and resisted by postwar women; the 1990s lumps-and-bumps and bumsters tore open the single permitted answer to how a body ought to be.',
      ),
      loc(
        '当代讨论继续在这个层面展开：无性别系列、大码秀场与适应性服装（为残障身体设计的磁性开合、坐姿版型）都在扩展“身体”的复数形式。衣服从不只覆盖身体——它规定哪一种身体被视为正常。',
        'Today’s debates unfold on the same plane: unisex lines, plus-size runways and adaptive clothing (magnetic closures, seated-fit patterns for disabled bodies) all expand the plural of “body”. Clothing never merely covers the body — it stipulates which bodies count as normal.',
      ),
    ],
    domainIds: ['fashion', 'visual-culture', 'design'],
    facts: [
      { label: loc('理论参照', 'Theoretical frame'), value: loc('玛丽·道格拉斯：身体即社会符号', 'Mary Douglas: the body as social symbol') },
      { label: loc('当代延伸', 'Contemporary'), value: loc('无性别、大码、适应性服装', 'Unisex, plus-size, adaptive clothing') },
    ],
    tags: ['身体政治', '性别', '身份'],
    modes: ['story', 'comparison'],
  },
  {
    id: 'c-haute-couture',
    type: 'concept',
    slug: 'haute-couture',
    name: loc('高级定制', 'Haute Couture'),
    tagline: loc('巴黎受法律保护的一个词', 'A Parisian term protected by law'),
    summary: loc(
      '不是“贵的衣服”，而是一个法定称号：巴黎时装协会认证的工坊、每季发布、为顾客单人量体制作——它是服装业的实验室与品牌光环的发动机。',
      'Not “expensive clothes” but a legally protected title: association-accredited ateliers, seasonal collections, garments made to the individual client’s measurements — fashion’s laboratory and the engine of brand aura.'),
    body: [
      loc(
        '高级定制在法国是受法律保护的称谓：只有经巴黎高级定制时装协会（Chambre Syndicale，1868 年创立）认证、满足在巴黎设有工坊、每季发布规定数量作品、为顾客单人单裁等条件的品牌，才能在广告中使用。它的制度奠基人常被追溯到英国人查尔斯·弗雷德里克·沃斯——19 世纪中叶他在巴黎和平街挂起自己的名字，让裁缝从手艺人变成“设计师”。',
        'In France haute couture is a legally protected designation: only houses accredited by the Chambre Syndicale (founded 1868) — maintaining Paris ateliers, showing a required number of pieces each season and cutting garments to the individual client — may use the term in advertising. Its institutional founder is often taken to be the Englishman Charles Frederick Worth, who hung his own name over a Rue de la Paix salon in the mid-19th century, turning tailor into “designer”.',
      ),
      loc(
        '今日高定客户全球仅数千人，工坊本身往往亏损；但它承担着行业实验室的功能——手工刺绣、新型面料与秀场奇观先在高定试验，再下放到成衣与香水瓶。香奈儿与迪奥的历史说明：高定卖的从来不是裙子，而是让整个品牌溢价的光环。',
        'Today’s couture clients number only a few thousand worldwide and the ateliers often run at a loss; yet couture serves as the industry’s laboratory — hand embroidery, new fabrics and runway spectacle tested there descend to ready-to-wear and perfume bottles. Chanel and Dior make the point: couture has never sold dresses but the aura that prices everything else.',
      ),
    ],
    placeId: 'place-paris',
    domainIds: ['fashion', 'craft', 'visual-culture'],
    conceptIds: ['c-silhouette', 'c-pattern-making'],
    facts: [
      { label: loc('法定条件', 'Legal criteria'), value: loc('巴黎工坊 / 季度发布 / 单人量体制', 'Paris atelier / seasonal showing / made-to-measure') },
      { label: loc('机构', 'Governing body'), value: loc('巴黎高级定制时装协会（1868）', 'Chambre Syndicale de la Couture (1868)') },
    ],
    tags: ['巴黎', '制度', '工坊'],
    modes: ['story', 'detail'],
  },
  {
    id: 'c-deconstruction-fashion',
    type: 'concept',
    slug: 'deconstruction-fashion',
    name: loc('解构时装', 'Deconstruction Fashion'),
    tagline: loc('把衣服的内部翻到外面', 'Turning the inside of clothing to the outside'),
    summary: loc(
      '1980–90 年代的时装思潮：外露的缝份、未锁边的折边、不对称与拼接丹宁——借德里达“解构”之名，质疑衣服里关于完整、得体与身体的预设。',
      'The fashion movement of the 1980s–90s: exposed seams, unfinished hems, asymmetry and reassembled denim — borrowing Derrida’s term to question clothing’s assumptions about wholeness, propriety and the body.'),
    body: [
      loc(
        '解构时装在 1981 年川久保玲与山本耀司的巴黎首秀后成形：黑衣、破洞、左右不对称、缝线本应藏在里面却翻到外面。1980 年代末比利时人马丁·马吉拉把它推到极致——Tabi 分趾靴、拆自旧货市场的服装重组、肩线外翻的外套。它挪用哲学家德里达的术语：意义不来自结构的稳定，而来自结构的裂缝。',
        'Deconstruction fashion cohered after the 1981 Paris debuts of Kawakubo and Yohji Yamamoto: black cloth, holes, asymmetry, seams that belong inside turned outward. Martin Margiela pushed it to its limits in the late 1980s — Tabi boots, garments reconstructed from flea-market stock, jackets with exposed shoulder construction. It borrowed Derrida’s term: meaning arises not from structural stability but from its cracks.',
      ),
      loc(
        '丹宁是解构最爱征用的面料：它的工装出身、旧化痕迹与廉价记忆，与高级时装的礼仪构成最大反差——马吉拉与川久保玲都用重组丹宁表演“低级材料进入高级体系”的戏剧。时至今日，露缝卫衣、未收边牛仔早已流入快时尚，先锋的裂缝变成了下一代的日常。',
        'Denim is the movement’s favorite conscript: its workwear origins, aging patina and cheap memory clash hardest with couture propriety — both Margiela and Kawakubo staged reassembled denim as the drama of low material entering the high system. Today exposed-seam sweatshirts and raw-edge denim are fast-fashion staples; the avant-garde’s crack becomes the next generation’s everyday.',
      ),
    ],
    creatorIds: ['person-kawakubo'],
    materialIds: ['mat-denim', 'mat-synthetic-fiber'],
    domainIds: ['fashion', 'visual-culture', 'design'],
    facts: [
      { label: loc('代表人物', 'Key figures'), value: loc('川久保玲 / 山本耀司 / 马丁·马吉拉', 'Kawakubo / Yamamoto / Martin Margiela') },
      { label: loc('手法', 'Devices'), value: loc('露缝、折边外露、不对称、面料重组', 'Exposed seams, raw hems, asymmetry, fabric reassembly') },
    ],
    tags: ['解构', '前卫', '丹宁'],
    modes: ['detail', 'comparison'],
  },

  // ================================================================== 材料
  {
    id: 'mat-tweed',
    type: 'material',
    slug: 'tweed',
    name: loc('斜纹软呢', 'Tweed'),
    summary: loc(
      '粗纺羊毛织物，表面有杂色毛羽，原为苏格兰高地与爱尔兰乡野的户外服——香奈儿把它猎装男装改写成战后女性的权力套装。',
      'Rough-woven woolen cloth with mottled, fibrous surface, originally outdoor wear of the Scottish Borders and Irish countryside — Chanel rewrote its hunting-jacket masculinity into the postwar woman’s power suit.'),
    body: [
      loc(
        '哈里斯粗花呢（Harris Tweed）产自苏格兰外赫布里底群岛，至今仍须在岛民家中用手工织机织造并盖章认证：粗羊毛不染色或仅植物染色，织出杂色斑驳、防风耐雨的厚重面料。1920 年代香奈儿从情人西敏公爵的狩猎装中借用斜纹软呢，1954 年复出系列以滚边织带斜纹软呢套装奠定现代职业女装的制服。',
        'Harris Tweed comes from Scotland’s Outer Hebrides, still woven by hand on islanders’ looms and certified with an orb mark: coarse wool, un-dyed or vegetable-dyed, woven into mottled, wind-and-rain-resistant yardage. In the 1920s Chanel borrowed tweed from the Duke of Westminster’s hunting wardrobe; her 1954 comeback collection’s braid-trimmed tweed suits became the uniform of the modern working woman.',
      ),
    ],
    domainIds: ['fashion', 'craft'],
    facts: [
      { label: loc('产地', 'Origin'), value: loc('苏格兰边境 / 外赫布里底群岛', 'Scottish Borders / Outer Hebrides') },
      { label: loc('高定时刻', 'Couture moment'), value: loc('香奈儿 1954 年斜纹软呢套装', 'Chanel’s 1954 tweed suit') },
    ],
    palette: ['#b8a98f', '#8c7d63', '#6b6256', '#e8e2d4', '#3a3530'],
    tags: ['羊毛', '粗花呢', '套装'],
    modes: ['material'],
  },
  {
    id: 'mat-jersey-knit',
    type: 'material',
    slug: 'jersey-knit',
    name: loc('平纹针织', 'Jersey Knit'),
    summary: loc(
      '有弹性的纬编针织物，因泽西岛渔民内衣得名，原是廉价的内衣与运动服面料——香奈儿用它做出高定，今天它是 T 恤的身体记忆。',
      'Elastic weft-knit fabric named after the fishermen’s underwear of Jersey; once the cheap cloth of undergarments and sportswear — Chanel made it couture, and today it lives in everyone’s T-shirt.'),
    body: [
      loc(
        '平纹针织与机织面料的根本差别在于线圈结构：每一针都是一个小弹簧，因此面料随身体拉伸回弹，无需省道即可贴合。它 19 世纪末因泽西岛的针织内衣贸易得名，20 世纪初仍是男装内衣布料；香奈儿看中它垂坠、免熨与廉价，用它做出不束腰的连衣裙——面料等级史上最著名的一次越界。',
        'Jersey differs fundamentally from woven cloth in its loop structure: every stitch is a tiny spring, so the fabric stretches and rebounds with the body, fitting without darts. Named for the Jersey knitwear trade in fisherman’s underwear, it remained a men’s underclothing fabric into the early 20th century; Chanel prized its drape, washability and low cost, making corset-free dresses from it — the most celebrated border crossing in the hierarchy of fabrics.',
      ),
    ],
    domainIds: ['fashion', 'craft'],
    facts: [
      { label: loc('结构', 'Structure'), value: loc('纬编线圈，天然弹性', 'Weft-knit loops; natural stretch') },
      { label: loc('高定时刻', 'Couture moment'), value: loc('香奈儿以针织制作女装（1910s–1920s）', 'Chanel’s jersey womenswear (1910s–20s)') },
    ],
    palette: ['#d8d3c8', '#a8a296', '#6e6a60', '#efebe1', '#2e2c27'],
    tags: ['针织', '弹性', '内衣出身'],
    modes: ['material'],
  },
  {
    id: 'mat-denim',
    type: 'material',
    slug: 'denim',
    name: loc('丹宁', 'Denim'),
    summary: loc(
      '靛蓝棉斜纹布，从热那亚水手裤与美国淘金工装到反叛青年制服，再被解构时装与日本赤耳工艺重新册封——一块布写尽现代阶级流动。',
      'Indigo cotton twill, from Genoese sailors’ trousers and American gold-rush workwear to the rebel’s uniform, re-anointed by deconstruction and Japanese selvedge craft — one cloth narrating modern class mobility.'),
    body: [
      loc(
        '丹宁的名字来自法语“serge de Nîmes”（尼姆市的斜纹布），牛仔裤的“jeans”则来自热那亚（Genoa）水手裤。1873 年李维·斯特劳斯与裁缝雅各布·戴维斯为裤袋铜铆钉申请专利，工装牛仔裤诞生；1950 年代马龙·白兰度与詹姆斯·迪恩把它穿上银幕，丹宁从工人身体转入反叛青年身体；1970 年代后日本冈山用老式织机复刻“赤耳”丹宁，旧工装变成收藏级工艺。',
        'Denim takes its name from “serge de Nîmes”, while “jeans” derives from the sailors’ trousers of Genoa. In 1873 Levi Strauss and tailor Jacob Davis patented copper-riveted pockets and work jeans were born; Marlon Brando and James Dean wore them on 1950s screens and denim migrated from workers’ bodies to rebels’; after the 1970s Japanese mills in Okayama reproduced selvedge denim on vintage looms, turning old workwear into collectible craft.',
      ),
    ],
    domainIds: ['fashion', 'craft'],
    facts: [
      { label: loc('词源', 'Etymology'), value: loc('serge de Nîmes（尼姆）/ Genes（热那亚）', 'serge de Nîmes / Genes (Genoa)') },
      { label: loc('专利', 'Patent'), value: loc('1873 年铆钉工装裤专利', 'Riveted work-pants patent, 1873') },
    ],
    palette: ['#2b4a7a', '#4a6fa5', '#8fb0d4', '#e8e4da', '#1d2430'],
    tags: ['棉', '工装', '靛蓝'],
    modes: ['material'],
  },
  {
    id: 'mat-synthetic-fiber',
    type: 'material',
    slug: 'synthetic-fiber',
    name: loc('合成纤维', 'Synthetic Fiber'),
    summary: loc(
      '从石油与化工中来的纤维：尼龙、聚酯与氨纶让丝袜、免烫衬衫与永久褶皱成为可能——它民主化了衣橱，也带来血汗工厂与微塑料的账单。',
      'Fibers from petroleum and chemistry: nylon, polyester and spandex made stockings, wash-and-wear shirts and permanent pleats possible — democratizing the wardrobe while billing us for sweatshops and microplastics.'),
    body: [
      loc(
        '1935 年杜邦的卡罗瑟斯合成尼龙，1938 年发表、1940 年尼龙丝袜上市即售出数百万双——它是第一种完全合成的纺织纤维，强度堪比钢丝；聚酯纤维 1941 年在英国专利化，以抗皱免烫统治战后衣橱；氨纶（莱卡）1959 年问世，让紧身与运动成为可能。合成纤维可热塑定型，这正是三宅一生永久褶皱的技术前提。',
        'DuPont’s Wallace Carothers synthesized nylon in 1935; announced in 1938, nylon stockings reached shops in 1940 and sold millions — the first fully synthetic textile fiber, strong as steel wire. Polyester was patented in Britain in 1941 and ruled the postwar wardrobe with wrinkle resistance; spandex (Lycra) followed in 1959, enabling tight fit and sportswear. Synthetics can be heat-set — the technical precondition for Miyake’s permanent pleats.',
      ),
      loc(
        '它的社会史有两面：廉价耐穿让全球普通人第一次拥有充足衣物；石油基纤维也催生了快时尚的过度生产，每次洗涤脱落的微纤维进入海洋。今日的纺织创新因此回到实验室——回收聚酯、生物基尼龙与可降解纤维，是这一材料故事尚未写完的下一章。',
        'Its social history has two faces: cheap durability gave ordinary people everywhere an adequate wardrobe for the first time; the petroleum base also enabled fast fashion’s overproduction, microfibers entering the oceans with every wash. Today’s textile innovation returns to the lab — recycled polyester, bio-based nylon and biodegradable fibers are the unwritten next chapter.',
      ),
    ],
    domainIds: ['fashion', 'craft', 'industrial'],
    facts: [
      { label: loc('尼龙', 'Nylon'), value: loc('杜邦 1938 年发表（卡罗瑟斯）', 'DuPont, 1938 (Carothers)') },
      { label: loc('聚酯 / 氨纶', 'Polyester / Spandex'), value: loc('1941 / 1959 年问世', 'Introduced 1941 / 1959') },
    ],
    palette: ['#eef0f4', '#c9cedb', '#9aa3b5', '#54607a', '#232630'],
    tags: ['尼龙', '聚酯', '快时尚'],
    modes: ['material'],
  },
];
