import type { ProductEntity } from '../../model/entity';
import { loc } from '../../model/i18n';

/**
 * Creator products — master plan §28. Knowledge is free; products sell
 * saved time, never knowledge. Each product states plainly what it is.
 */
export const PRODUCTS: ProductEntity[] = [
  {
    id: 'product-poster-kit',
    type: 'product',
    slug: 'editorial-poster-kit',
    name: loc('编辑式海报网格模板包', 'Editorial Poster Grid Kit'),
    category: loc('设计模板', 'Design templates'),
    summary: loc('12 套博物馆编辑式海报模板：衬线大标题网格、不对称图墙、留白型录——把《构图》课里的规则直接做成可改的文件。', 'Twelve museum-editorial poster templates: serif masthead grids, asymmetric image walls, whitespace catalogs — the Composition lesson rules as editable files.'),
    priceCny: 49,
    priceUsd: 9,
    includes: [
      loc('12 套 Figma 模板（A2 / 竖版 / 方形）', '12 Figma templates (A2 / portrait / square)'),
      loc('3 级字阶系统与段落样式', '3-level type scale with paragraph styles'),
      loc('6 组可复用配色（博物馆纸感 / 墨黑 / 朱砂点睛等）', '6 reusable palettes (museum paper / ink black / cinnabar accent)'),
    ],
    compatibility: loc('Figma（免费版即可）', 'Figma (free plan)'),
    license: loc('个人与商业项目可用，禁止转售', 'Personal & commercial use; no resale'),
    purchaseUrl: '#',
    body: [
      loc('这个包里的每一个模板都对应知识库里的一个原则页——你买到的不是“好看的模板”，而是省下自己把规则翻译成文件的十小时。原则本身永远免费。', 'Each template maps to a principle page in the knowledge base — you buy ten saved hours, not the principles. The principles stay free.')
    ],
    modes: ['gallery'],
    weight: 90,
  },
  {
    id: 'product-prompt-atlas',
    type: 'product',
    slug: 'cross-style-prompt-atlas',
    name: loc('跨风格提示词图鉴（含 200 条可执行规则）', 'Cross-Style Prompt Atlas (200 executable rules)'),
    category: loc('AI 创作工具', 'AI creation toolkit'),
    summary: loc('把 24 种历史与当代风格拆成“构图/色彩/材料/母题”四栏可执行规则，直接拼成提示词——AI 视觉素养课的配套工具箱。', '24 historical and contemporary styles decomposed into executable rules across composition/color/material/motif — the AI literacy course as a working kit.'),
    priceCny: 69,
    priceUsd: 12,
    includes: [
      loc('24 风格 × 4 栏规则，中英双语', '24 styles × 4 rule columns, bilingual ZH/EN'),
      loc('60 条“跨风格碰撞”公式', '60 cross-style collision formulas'),
      loc('负面提示词与风格保真度检查清单', 'Negative prompts and style-fidelity checklist'),
    ],
    compatibility: loc('PDF + Notion 数据库导出', 'PDF + Notion database export'),
    license: loc('个人创作使用', 'For individual creative use'),
    purchaseUrl: '#',
    modes: ['detail'],
    weight: 88,
  },
  {
    id: 'product-swatch-atlas',
    type: 'product',
    slug: 'museum-swatch-atlas',
    name: loc('博物馆色卡图鉴', 'Museum Swatch Atlas'),
    category: loc('色彩参考', 'Color reference'),
    summary: loc('从 80 件名作提取的 480 个色卡：每张卡带 HEX/CMYK 与出处链接，按冷暖与明度排列。', '480 swatches extracted from 80 masterworks: each card carries HEX/CMYK and a source link, ordered by temperature and value.'),
    priceCny: 39,
    priceUsd: 7,
    includes: [
      loc('480 色卡，含作品出处', '480 swatches with artwork attribution'),
      loc('ASE / Figma / Tailwind config 三种格式', 'ASE / Figma / Tailwind config formats'),
      loc('“点睛色 5%”对照速查表', '5%-accent quick reference table'),
    ],
    compatibility: loc('通用格式', 'Universal formats'),
    license: loc('个人与商业项目可用', 'Personal & commercial use'),
    purchaseUrl: '#',
    modes: ['gallery'],
    weight: 80,
  },
  {
    id: 'product-motion-pack',
    type: 'product',
    slug: 'cinematic-motion-pack',
    name: loc('电影感动效曲线包', 'Cinematic Motion Curve Pack'),
    category: loc('动效资源', 'Motion assets'),
    summary: loc('24 条 Framer Motion 缓动曲线与 12 个转场模板：呼吸、揭示、扫视——动效传达关系而非装饰。', '24 Framer Motion easing curves and 12 transition templates: breathing, reveals, sweeps — motion that communicates relation, not decoration.'),
    priceCny: 45,
    priceUsd: 8,
    includes: [
      loc('24 条命名缓动（含时长与用途说明）', '24 named easings with duration and usage notes'),
      loc('12 个可复制的转场片段（TS + framer-motion）', '12 copyable transition snippets (TS + framer-motion)'),
      loc('“动效即关系”决策流程图', 'Motion-as-relation decision flowchart'),
    ],
    compatibility: loc('framer-motion 12+ / React', 'framer-motion 12+ / React'),
    license: loc('个人与商业项目可用', 'Personal & commercial use'),
    purchaseUrl: '#',
    modes: ['detail'],
    weight: 78,
  },
];
