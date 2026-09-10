import type { ExhibitionEntity } from '../../model/entity';
import { loc } from '../../model/i18n';
import { wiki } from '../../lib/urls';

/**
 * Curated exhibitions — master plan §12. Exhibitions are curated walks
 * through the knowledge graph: sections hold entities plus narrative,
 * the engine renders each section in the mode the content asks for.
 */
export const EXHIBITIONS: ExhibitionEntity[] = [
  {
    id: 'exhibition-geometry-thread',
    type: 'exhibition',
    slug: 'geometry-from-david-to-the-interface',
    name: loc('几何线索：从大卫到界面', 'The Geometry Thread: from David to the interface'),
    summary: loc('一条横跨雕塑、绘画、建筑、家具与屏幕的线索：人类如何用几何理解世界，打碎它，再用它重建日常。', 'A thread across sculpture, painting, architecture, furniture and screens: how humanity used geometry to read the world, shattered it, and rebuilt everyday life with it.'),
    tagline: loc('一个概念，五次变形', 'One concept, five transformations'),
    image: { url: wiki('Piet Mondriaan, 1930 - Mondrian Composition II in Red, Blue, and Yellow.jpg', 1400), ratio: 'square' },
    accent: '#1a1815',
    sections: [
      {
        id: 'g-order',
        title: loc('一、秩序的发明', 'I. The invention of order'),
        lead: loc('希腊人用比例把神庙调成“看起来完美”，文艺复兴把人体变成可测量的奇迹。', 'The Greeks tuned temples to look perfect with proportion; the Renaissance made the body a measurable miracle.'),
        entityIds: ['building-parthenon', 'work-david', 'c-geometry', 'dp-proportion'],
        narrative: loc('两座杰作共享一个信念：世界的秩序可以被数学捕捉，而艺术让它被身体感受到。', 'Both masterpieces share a faith: the world’s order is mathematically capturable, and art lets the body feel it.'),
      },
      {
        id: 'g-perspective',
        title: loc('二、空间被测量', 'II. Space gets measured'),
        lead: loc('透视法把观看者放到世界的中心，画面第一次成为可测量的房间。', 'Perspective puts the viewer at the center; the picture becomes a measurable room.'),
        entityIds: ['work-last-supper', 'c-perspective', 'movement-renaissance'],
        narrative: loc('灭点不止是技法——它是一种世界观：主体站在中央，万物向他汇聚。', 'The vanishing point is a worldview: the subject at center, everything converging toward them.'),
      },
      {
        id: 'g-shatter',
        title: loc('三、打碎', 'III. The shattering'),
        lead: loc('1907 年，五个视点同时挤进一个画面——五百年的透视规则在一夜间作废。', 'In 1907 five viewpoints flood one picture — five centuries of perspective rule out overnight.'),
        entityIds: ['work-demoiselles', 'movement-cubism', 'person-picasso'],
        narrative: loc('打碎不是毁灭，是还原：世界被拆成最基本的几何面，等待重新组装。', 'Shattering is reduction: the world broken into geometric facets, waiting to be reassembled.'),
      },
      {
        id: 'g-reduce',
        title: loc('四、还原到线与面', 'IV. Reduced to line and plane'),
        lead: loc('蒙德里安把画减到正交线与三原色；里特费尔德让这张画变成可以坐的椅子。', 'Mondrian reduces painting to orthogonals and primaries; Rietveld makes the reduction into a chair.'),
        entityIds: ['work-mondrian-composition', 'object-red-blue-chair', 'movement-de-stijl', 'person-mondrian', 'person-rietveld'],
        narrative: loc('从画布到椅子只隔一步：当形被还原到关系，任何日常物品都可以用同一套语法设计。', 'One step from canvas to chair: reduced to relations, any everyday object can share the grammar.'),
      },
      {
        id: 'g-industrialize',
        title: loc('五、网格进入世界', 'V. The grid enters the world'),
        lead: loc('包豪斯把几何交给机器；柯布西耶把住宅抬上柱子；瑞士学派把网格交给了纸张与后来的屏幕。', 'The Bauhaus hands geometry to machines; Le Corbusier lifts the house on columns; the Swiss school gives the grid to paper — and later to screens.'),
        entityIds: ['building-bauhaus-dessau', 'building-villa-savoye', 'movement-bauhaus', 'atom-swiss-grid', 'person-gropius', 'person-le-corbusier'],
        narrative: loc('你手机里的栅格、海报里的栏、你正在看的这个页面——都是这条线索的当代末梢。', 'The grid on your phone, the columns in posters, the page you are reading — the thread’s living ends.'),
      },
    ],
    modes: ['story', 'timeline', 'network'],
    featured: true,
    weight: 100,
  },
  {
    id: 'exhibition-light-thread',
    type: 'exhibition',
    slug: 'the-light-travels',
    name: loc('光的旅行：跨学科的一束', 'Light Travels: one beam across disciplines'),
    summary: loc('卡拉瓦乔的光束、达·芬奇的烟雾、包豪斯的玻璃幕墙、电影的轮廓光——同一束光如何穿过五个门类。', 'Caravaggio’s beam, Leonardo’s smoke, the Bauhaus glass wall, cinema’s rim light — one beam crossing five disciplines.'),
    tagline: loc('所有门类的共同媒介', 'The medium all disciplines share'),
    image: { url: wiki('Calling-of-st-matthew.jpg', 1600), ratio: 'landscape' },
    accent: '#8a6d3b',
    sections: [
      {
        id: 'l-painting',
        title: loc('一、画中的光', 'I. Light in painting'),
        lead: loc('从戏剧性的硬光到没有轮廓的烟雾，画家先于物理学家研究光。', 'From dramatic hard light to contourless smoke, painters studied light before physicists.'),
        entityIds: ['work-calling-matthew', 'work-mona-lisa', 'work-starry-night', 'tech-chiaroscuro', 'tech-sfumato'],
        narrative: loc('在这三张画里，光分别是：一根指向人的手指、一层让人微笑游移的雾、一片沸腾的情绪天空。', 'In these three works light is respectively: a pointing finger, a mist that moves a smile, a boiling sky of feeling.'),
      },
      {
        id: 'l-architecture',
        title: loc('二、建造光', 'II. Building with light'),
        lead: loc('建筑是“在光中被巧妙汇集的体块”——玻璃幕墙与架空方盒都是捕捉光的机器。', 'Architecture is “masses brought together in light” — curtain walls and raised boxes are light-catching machines.'),
        entityIds: ['building-bauhaus-dessau', 'building-villa-savoye', 'work-sistine-ceiling'],
        narrative: loc('湿壁画利用高处小窗的真实天光，现代建筑干脆把墙变成光本身。', 'Fresco worked with real light from high windows; modern architecture turns the wall itself into light.'),
      },
      {
        id: 'l-screen',
        title: loc('三、镜头与屏幕的光', 'III. Light on lens and screen'),
        lead: loc('轮廓光、体积光与胶片颗粒：电影与摄影把绘画的光变成可调度的语言。', 'Rim light, god rays, film grain: cinema and photography turn painted light into a directable language.'),
        entityIds: ['c-light', 'atom-rim-light', 'atom-god-rays', 'atom-film-grain', 'lesson-light'],
        narrative: loc('当你下次在渲染器或调色台里打光，你调用的是卡拉瓦乔 1600 年写下的语法。', 'When you light a render or grade a clip, you call a syntax Caravaggio wrote in 1600.'),
      },
    ],
    modes: ['story', 'network', 'gallery'],
    weight: 90,
  },
  {
    id: 'exhibition-david-neighborhood',
    type: 'exhibition',
    slug: 'the-neighborhood-of-david',
    name: loc('《大卫》的关系宇宙', 'The Neighborhood of David'),
    summary: loc('一尊雕像不是孤立的物：它连接着一个人、一座城、一种哲学、一块石头与五百年回响——以网络方式漫游这颗知识星团。', 'A statue is no isolated object: one man, one city, a philosophy, a block of stone and five centuries of echoes — wander the knowledge cluster as a network.'),
    tagline: loc('一件作品，一整张地图', 'One work, one whole map'),
    image: { url: wiki("Michelangelo's David.jpg", 1200), ratio: 'portrait' },
    accent: '#5c6b58',
    sections: [
      {
        id: 'n-core',
        title: loc('中心', 'The center'),
        lead: loc('从作品本身出发。', 'Start from the work itself.'),
        entityIds: ['work-david'],
      },
      {
        id: 'n-makers',
        title: loc('创造者与时代', 'Maker and moment'),
        lead: loc('谁做的，在什么时代？', 'Who made it, and when?'),
        entityIds: ['person-michelangelo', 'movement-renaissance', 'period-renaissance'],
      },
      {
        id: 'n-matter',
        title: loc('材料与技法', 'Matter and method'),
        lead: loc('它由什么构成，怎样被制造？', 'What it is made of, and how.'),
        entityIds: ['mat-marble', 'tech-contrapposto'],
      },
      {
        id: 'n-ideas',
        title: loc('思想', 'Ideas'),
        lead: loc('它为什么让当时的人屏息？', 'Why it took its age’s breath away.'),
        entityIds: ['c-humanism', 'c-anatomy', 'dp-proportion'],
      },
      {
        id: 'n-place',
        title: loc('地点与回响', 'Place and echoes'),
        lead: loc('它站在哪，又走向了哪？', 'Where it stands, and where it went.'),
        entityIds: ['place-florence', 'culture-italian', 'work-sistine-ceiling'],
      },
    ],
    modes: ['network', 'detail'],
    weight: 88,
  },
];
