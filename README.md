# 视觉图志 · Visual Atlas

**人类视觉文化的活地图集 — A Living Atlas of Human Visual Culture**

[![Deploy](https://github.com/duguBoss/Art-Gallery/actions/workflows/deploy.yml/badge.svg)](https://github.com/duguBoss/Art-Gallery/actions/workflows/deploy.yml)
[![Live](https://img.shields.io/badge/在线访问-Live-gold?style=flat-square)](https://duguboss.github.io/Art-Gallery/)
[![License: CC BY-SA 4.0](https://img.shields.io/badge/内容协议-CC%20BY--SA%204.0-lightgrey?style=flat-square)](https://creativecommons.org/licenses/by-sa/4.0/)

> 从《大卫》的大理石到你手机里的栅格——
> 艺术史、建筑、设计、工艺、摄影、电影、动画、游戏、数字艺术与创作科学，
> 被织成一张可以双向漫游的知识图谱。
>
> *From the marble of David to the grid in your hand — art, architecture, design, film and creative technology as one explorable knowledge graph.*

**→ 入口：[https://duguboss.github.io/Art-Gallery/](https://duguboss.github.io/Art-Gallery/)**

---

## 这是什么

视觉图志**不是**画廊模板、不是课程市场、不是 SaaS 仪表盘，也不是 AI 落地页。
它同时是：

| 博物馆 Museum | 百科 Encyclopedia | 地图集 Atlas | 档案馆 Archive |
| --- | --- | --- | --- |
| 以策展叙事呈现作品 | 每个概念有完整释义 | 十四个知识域构成版图 | 事实图片皆可溯源 |
| **视觉实验室 Visual Lab** | **学习系统 Learning System** | **创作工具箱 Toolbox** | |
| 关系图谱、比较与时间轴 | 观察 → 分析 → 练习 | 技法知识与创作者产品 | |

核心信念：**当你真正理解一幅画为什么好，你就同时学会了布光、调色、排版与判断 AI 生成物——因为它们本来就是同一件事。**

## 四条铁律

1. **知识永远免费。** 产品售卖节省的时间，支持依靠捐赠，广告完全可选——永远不存在付费知识墙。
2. **内容决定呈现。** 绘画讲构图、色彩、光、笔触；建筑讲场地、流线、结构、光。不同学科使用不同的叙事序列，拒绝统一模板。
3. **关系是一等数据。** 「受影响于」「脱胎于」「使用材料」「形成对照」都是有方向的边，可双向遍历——知识不是分类树，是一张网。
4. **内容即代码。** 没有后台、没有数据库、没有 admin 面板：编辑内容 = git commit，发布 = 公开构建。

## 知识模型

一切皆为**实体（Entity）**，实体之间以**关系（Relation）**相连，呈现层只负责查询与渲染——数据与展示彻底分离。

```
src/model/        类型系统：22 种实体 · 28 种关系 · 17 种展览模式
src/content/data/ 种子内容（纯数据，零 UI 依赖）
src/content/kb.ts 只读查询 API：search / neighbors / timeline / random …
```

当前图谱规模：

| 知识域 14 | 历史时期 15 | 文化 10 · 地点 12 |
| --- | --- | --- |
| 材料 12 · 技法 12 | 概念 32（学术概念 + 视觉原子 + 设计原则） | 历史流派 14 · 当代风格 11 |
| 艺术家与建筑师 13 | 作品 / 建筑 / 物品 17（含学科化分析板块） | 课程 14 · 练习 8 |
| 创作者产品 4 | 专题策展 3 | 关系边 100+ |

每件作品带有一组**分析板块（AnalysisBlock）**：文本、引语、清单、工艺流程、图像标注（annotation markers）——按学科序列排定，而非套用通用详情页。

## 展览引擎

同一组知识，多种观看方式（`src/components/exhibition/`）：

- **Timeline** — 三千年水平时间轴，作品落位
- **GalleryWall** — 非对称沙龙式展墙（拒绝统一三列网格）
- **Atlas** — 14 知识域编辑式索引，每域自带强调色与字形图标
- **Network** — 放射状 SVG 关系星团，点击任意节点继续漫游
- **Detail** — 分析板块渲染，支持图像标注点
- **Compare / Map / Process** — 并置对比、等距矩形投影地图、工艺流程

全局检索：`⌘K / Ctrl+K` 命令面板，结果按实体类型分组；**Surprise Me** 随机坠入图谱任意节点。

## 页面地图

| 路由 | 内容 |
| --- | --- |
| `/` | 首页：12 段编辑式编排（发现 → 图谱 → 时间轴 → 策展 → 学习 → 支持） |
| `/gallery` | 展厅：作品 / 建筑 / 物品沙龙墙 |
| `/knowledge` | 知识图谱：14 域 + 概念 / 材料 / 技法索引 |
| `/explore` | 多维探索：时间 · 地点（地图）· 时期 · 文化 |
| `/styles` `/artists` | 历史流派 & 当代创作者风格 · 艺术家 |
| `/learn` `/practice` | 三条学习路径（视觉基础 / 艺术史 / 创作学科）· 动手练习 |
| `/tools` `/products` | 创作工具箱（技法知识）· 创作者产品（省时间的文件） |
| `/support` `/about` | 四种支持方式 · 项目宪章与致谢 |
| `/entity/:type/:slug` | 实体详情页（按类型分支叙事 + 关系星团） |
| `/exhibition/:slug` | 专题策展（如《几何线索：从大卫到界面》） |

## 设计语言

博物馆编辑式美学（Museum Editorial）：

- 暖纸底色 `#f7f4ec` · 墨色文字 `#1a1815` · 朱砂点睛色（≤5%）
- 衬线大标题（Cormorant Garamond / Noto Serif SC）+ 无衬线正文
- 留白是主动的设计元素；动效传达关系而非装饰
- 不使用默认暗色 / 霓虹 / 玻璃拟态 / 全卡片化

## 技术栈

**React 19 · TypeScript 6 · Vite 8 · Tailwind CSS 3 · framer-motion · lucide-react**

- 零后端：静态构建，部署至 GitHub Pages（`base: /Art-Gallery/`）
- 零路由依赖：自实现 hash 路由（`src/router/router.tsx`）
- i18n：中文 / 英文（模型层保留 zh / en / ja / ko 四语结构，种子内容双语）
- 事实作品图片使用已核验的 **Wikimedia Commons** 地址，每图标注收藏机构

## 本地开发

```bash
npm install
npm run dev        # http://localhost:3000/Art-Gallery/
npm run build      # tsc -b && vite build
```

## 内容贡献（内容即代码）

所有知识都是 `src/content/data/` 下的类型化数据文件。添加一件作品：

```ts
// src/content/data/works.ts — 追加一个 WorkEntity
{
  id: 'work-your-slug',
  type: 'work',
  slug: 'your-slug',
  name: loc('中文名', 'English name'),
  yearStart: 1656,
  creatorIds: ['person-…'],
  conceptIds: ['c-light'],
  image: { url: wiki('File:…jpg', 1400), sourceId: 'src-wikimedia' },
  blocks: [ /* 该学科的分析序列 */ ],
}
```

关系在 `src/content/data/relations.ts` 中以 `rel(from, type, to)` 声明；引用字段（`creatorIds`、`materialIds` 等）会被知识库自动派生为双向边。提交 PR 即完成策展。

## 版权与致谢

事实图片来自 **Wikimedia Commons** 及原始收藏机构（卢浮宫、佛罗伦萨美术学院、MoMA、包豪斯德绍基金会等），权利归各机构所有。文字内容以 **CC BY-SA 4.0** 开放；代码以 **MIT** 许可。

---

*Content as code · Knowledge free, forever.*
