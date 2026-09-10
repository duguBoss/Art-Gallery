import type { Lang } from '../model';

/**
 * UI chrome strings. Content strings live in the model layer (L10n);
 * this dictionary only covers interface chrome.
 */
export const UI = {
  // nav
  'nav.home': { zh: '首页', en: 'Home' },
  'nav.gallery': { zh: '展厅', en: 'Gallery' },
  'nav.learn': { zh: '学习', en: 'Learn' },
  'nav.explore': { zh: '探索', en: 'Explore' },
  'nav.knowledge': { zh: '知识图谱', en: 'Knowledge' },
  'nav.styles': { zh: '风格', en: 'Styles' },
  'nav.artists': { zh: '艺术家', en: 'Artists' },
  'nav.practice': { zh: '练习', en: 'Practice' },
  'nav.tools': { zh: '工具箱', en: 'Tools' },
  'nav.products': { zh: '创作者商店', en: 'Products' },
  'nav.support': { zh: '支持我们', en: 'Support' },
  'nav.about': { zh: '关于', en: 'About' },
  'nav.search': { zh: '搜索一切…', en: 'Search everything…' },
  'nav.surprise': { zh: '随便看看', en: 'Surprise Me' },
  'nav.searchHint': { zh: '搜索作品 / 人物 / 概念 / 材料…', en: 'Works / people / concepts / materials…' },

  // common
  'common.readMore': { zh: '深入阅读', en: 'Read on' },
  'common.viewAll': { zh: '查看全部', en: 'View all' },
  'common.back': { zh: '返回', en: 'Back' },
  'common.minutes': { zh: '分钟', en: 'min' },
  'common.related': { zh: '相关条目', en: 'Related entries' },
  'common.sources': { zh: '资料来源', en: 'Sources' },
  'common.facts': { zh: '档案事实', en: 'At a glance' },
  'common.startLesson': { zh: '开始这一课', en: 'Begin the lesson' },
  'common.startPractice': { zh: '开始练习', en: 'Start the exercise' },
  'common.difficulty': { zh: '难度', en: 'Difficulty' },
  'common.knowledgeFree': { zh: '知识永远免费', en: 'Knowledge is always free' },

  // home sections
  'home.heroKicker': { zh: '视觉文化博物馆 · 百科 · 图谱', en: 'Museum · Encyclopedia · Atlas of Visual Culture' },
  'home.heroTitle': { zh: '人类视觉文化的\n活地图集', en: 'A living atlas of\nhuman visual culture' },
  'home.heroLead': {
    zh: '从《大卫》的大理石到你手机里的栅格——把艺术、建筑、设计、电影与创作技术连成一张可以漫游的知识图谱。',
    en: 'From the marble of David to the grid in your hand — art, architecture, design, film and creative technology as one explorable knowledge graph.',
  },
  'home.heroCta1': { zh: '进入展厅', en: 'Enter the gallery' },
  'home.heroCta2': { zh: '今天发现什么？', en: "Today's discovery" },
  'home.todayKicker': { zh: '今日发现', en: "Today's discovery" },
  'home.surprise': { zh: '换一个', en: 'Show me another' },
  'home.journeyTitle': { zh: '视觉之旅', en: 'A visual journey' },
  'home.journeyLead': { zh: '从任意一件作品出发，沿着关系走——每一步都通向新的学科。', en: 'Start at any work and follow the relations — every step crosses into a new discipline.' },
  'home.atlasTitle': { zh: '知识图谱', en: 'The knowledge atlas' },
  'home.atlasLead': { zh: '十四个知识域，同一张地图。', en: 'Fourteen domains, one map.' },
  'home.timelineTitle': { zh: '艺术史时间轴', en: 'The art history timeline' },
  'home.connectionsTitle': { zh: '跨学科连接', en: 'Cross-discipline connections' },
  'home.exhibitionTitle': { zh: '当前策展', en: 'Featured exhibitions' },
  'home.learnTitle': { zh: '像逛博物馆一样学习', en: 'Learn like wandering a museum' },
  'home.practiceTitle': { zh: '把手弄脏', en: 'Get your hands dirty' },
  'home.productsTitle': { zh: '为创作者节省时间', en: 'Built to save creators time' },
  'home.productsNote': { zh: '知识免费；你购买的是省下的时间。', en: 'Knowledge is free — you buy the time saved.' },
  'home.supportTitle': { zh: '让知识保持免费', en: 'Keep knowledge free' },

  // footer
  'footer.philosophy': { zh: '我们的哲学', en: 'Philosophy' },
  'footer.sources': { zh: '资料与来源', en: 'Sources' },
  'footer.language': { zh: '语言', en: 'Language' },
  'footer.github': { zh: 'GitHub', en: 'GitHub' },
  'footer.support': { zh: '支持', en: 'Support' },
  'footer.legal': { zh: '内容采用 CC BY-SA 4.0；事实图片归原始机构所有。', en: 'Content CC BY-SA 4.0; factual images credited to their institutions.' },
  'footer.tagline': { zh: '知识 = 免费 · 产品 = 省时间 · 支持 = 捐赠 · 广告 = 可选', en: 'Knowledge free · Products save time · Support by donation · Ads optional' },

  // entity type labels
  'type.work': { zh: '作品', en: 'Work' },
  'type.building': { zh: '建筑', en: 'Building' },
  'type.object': { zh: '物品', en: 'Object' },
  'type.person': { zh: '人物', en: 'Person' },
  'type.style': { zh: '风格流派', en: 'Style & Movement' },
  'type.period': { zh: '历史时期', en: 'Period' },
  'type.place': { zh: '地点', en: 'Place' },
  'type.culture': { zh: '文化', en: 'Culture' },
  'type.material': { zh: '材料', en: 'Material' },
  'type.technique': { zh: '技法', en: 'Technique' },
  'type.concept': { zh: '概念', en: 'Concept' },
  'type.lesson': { zh: '课程', en: 'Lesson' },
  'type.practice': { zh: '练习', en: 'Exercise' },
  'type.product': { zh: '产品', en: 'Product' },
  'type.exhibition': { zh: '策展', en: 'Exhibition' },
  'type.domain': { zh: '知识域', en: 'Domain' },
} as const;

export type UiKey = keyof typeof UI;

export const ui = (key: UiKey, lang: Lang): string => {
  const e = UI[key] as Record<Lang, string | undefined> | undefined;
  return (e && (e[lang] ?? e.en)) ?? key;
};
