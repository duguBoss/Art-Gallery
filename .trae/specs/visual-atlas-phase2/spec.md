# Visual Atlas 第二阶段：知识密度建设期（Knowledge Expansion & Learning Graph 2.0）— PRD

## Overview

- **Summary**：不重构网站骨架。在现有 Entity / Relation / Exhibition Engine / kb.ts 架构上，进行大规模**知识内容扩充、关系网络加密、学习系统升级**：14 个知识域从"注册表存在"变为"每个域都有作品、创作者、概念与学习路径"；课程从 3 层分类升级为 7 层能力成长体系 + 主题学习旅程；关系从"星点状连接"升级为可连续漫游的知识链。
- **Purpose**：让用户可以从任意一个人、作品、建筑、材料、概念出发，沿影响、材料、光、几何等主线连续探索数十个节点——网站从"艺术画廊"成为真正的人类视觉文化知识宇宙。
- **Target Users**：零基础视觉学习者；设计/摄影/电影/动画/游戏/AI 创作方向的自学者；跨学科创作者。

## Goals

- G1：14 个知识域全部有实质内容（作品/物品/建筑 + 人物 + 概念/材料/技法 + 课程），消灭空壳域。
- G2：知识实体总量与质量同步提升（不批量生成低质条目），每个重要实体具备身份、重要性、背景、视觉特征、关系、来源。
- G3：关系网络加密：减少无解释的 `associated_with`，大量使用具体关系类型；建成影响链、材料链、光链、几何链四条可遍历超级链。
- G4：学习系统升级为 7 层能力成长体系（L0 认识视觉 → L6 跨学科创造），课程带先修/难度/进阶关系。
- G5：建立"主题学习旅程"（Journey）：光、色彩、几何、空间、叙事、材料、节奏 7 条跨学科旅程，弱化"课程市场"感。
- G6：Learn 页从课程列表升级为学习导航（"我想学什么"入口 + 层级阶梯 + 旅程区）。
- G7：交付可重复运行的知识覆盖审计工具与审计报告。

## Non-Goals

- N1：不重新设计 UI 骨架、不改变产品定位、不增加后台/数据库/付费墙/会员。
- N2：不引入新路由库、UI 框架或运行时依赖（esbuild 经 vite 已存在，仅用于审计脚本打包）。
- N3：不把内容改成统一卡片网格；呈现仍由内容决定（Timeline/Gallery/Network/Map/Process 等模式不变）。
- N4：不收录版权不明的图片。游戏、电影、动画、时尚、当代工业产品等**以文本优先**（无图实体，卡片已有字形降级）。
- N5：不追求实体数量的机械达标；数量地板是下限，密度与质量是验收重点。

## Background & Context

- 代码审计基线（2026-09-10）：
  - 作品/建筑/物品 17 件；人物 13；概念 32；材料 12；技法 12；历史流派 14；当代风格 11；课程 14；练习 8；文化 10；地点 12；时期 15；专题展览 3。
  - 域引用次数（domainIds，除 domains.ts）：arts 75、creative-science 51、design 53、architecture 41、art-history 26、digital 19、visual-culture 17、craft 15、film 13、industrial 7、animation 4、games 4、photography 3、**fashion 0**。
  - `LessonLevel = 'foundations' | 'history' | 'disciplines'`；LessonEntity 无 prerequisite / difficulty / outcomes / next 字段；LearnPage 硬编码 3 个 Path；EntityPage 硬编码层级中文名。
  - kb.ts 从引用字段自动派生边：conceptIds / movementIds / styleIds 目前都派生为弱关系 `associated_with`；手写 RELATIONS 约 50 条，含约 8 条 `associated_with`。
  - EntityCard 对无图实体已有首字符字形降级；WorkEntity.yearStart 已支撑 Timeline；关系类型 27 种已含 influenced_by / emerged_from / responds_to / references / contrasts_with / studied_under / collaborated_with / follows / evolved_into 等。

## 关键设计决策

- D1：**7 层学习层级**（向后兼容，保留旧 id 语义）：
  `awareness`(L0 认识视觉) → `foundations`(L1 视觉基础) → `language`(L2 视觉语言) → `disciplines`(L3 学科方法) → `history`(L4 历史与文化) → `practice`(L5 创作实践) → `cross`(L6 跨学科创造)。
  现有课程映射：9 门 foundations 中 typography/narrative 归入 L2，其余留 L1；history 3 门归 L4；disciplines 2 门归 L3。
- D2：**LessonEntity 新增可选字段**：`prerequisiteIds?: string[]`、`recommendedNextIds?: string[]`、`relatedLessonIds?: string[]`、`difficulty?: 1|2|3|4|5`、`outcomes?: L10n[]`（学完能做什么）、`journeyIds?: string[]`。用户提出的 skillIds 由现有 conceptIds 承担（概念即技能点），masterrySignals 由 outcomes 承担，portfolioProject 由 exerciseIds 承担——不增加冗余字段。
- D3：**新增实体类型 `journey`**（JourneyEntity：stops 有序停靠点，结构同展览 sections）。旅程是"弱化课程"的一等公民，被 Learn 页与检索消费；EntityPage 复用展览式叙事渲染。新增关系类型 `requires`（先修，反向"进阶解锁"）。
- D4：**派生关系升级**：movementIds → `part_of`；conceptIds → `related_to`；styleIds 保留 `associated_with`（"以此风格创作"语义）；prerequisiteIds → `requires`；journey stops → `part_of`。
- D5：**内容按批次放入新数据文件**（如 `modern-art.ts`、`photography.ts`、`film.ts`、`animation.ts`、`games.ts`、`industrial.ts`、`fashion.ts`、`craft-expansion.ts`、`journeys.ts`），kb.ts 聚合导入；不改写现有 17 件作品等已有文件（仅在必要时追加 id 引用）。
- D6：**图片政策**：古典艺术品/建筑/工艺文物继续使用已核验 Wikimedia Commons URL（需 HTTP 200）；游戏、电影、动画、时尚、当代工业产品默认无图（文本优先），palette 字段照常填写。
- D7：**内容质量门槛**：每个新实体必须双语（zh/en 名称+摘要）；作品/人物/课程/旅程必须 summary + body(≥1 段) + ≥2 条关系边 + domainIds；作品须有年代与创作者/流派/概念连接；事实性陈述配 sources。

## Functional Requirements

- **FR-1（模型）**：LessonLevel 扩展为 7 层；LessonEntity 支持 D2 字段；新增 journey 实体类型与 requires 关系类型（含中英文标签）；模型变更全部为可选字段/联合类型扩展，现有数据零迁移成本。
- **FR-2（kb 查询层）**：新增 `learningLevels()`（有序层级元数据，中英双语名称与导语）、`lessonsByLevel(level)`、`journeys()`、`prerequisitesOf(lessonId)`、`isReadyFor(lessonId)`（先修是否存在即可，无状态化）；派生关系按 D4 升级；重复 id / 悬空关系告警为零。
- **FR-3（审计工具）**：`npm run audit` 经 esbuild 打包后执行，输出：各域按实体类型的数量、关系边总数与各类型计数、度为 0/1 的实体清单、手写 associated_with 计数、各层级课程数、旅程数与停靠点校验、图片覆盖、双语缺失检查。
- **FR-4（核心圈内容）**：艺术史/艺术/建筑/设计补全从古典古代到当代的影响链缺口（希腊罗马、中世纪、文艺复兴扩展、印象派、后印象派、表现主义、抽象、达达/超现实、抽象表现/极简、设计史链：莫里斯→新艺术→包豪斯→瑞士→国际主义→数字界面）。
- **FR-5（第二圈内容）**：摄影（摄影史人物、曝光/镜头/决定性瞬间等概念、材料技法、代表作品）、电影（导演/作品、蒙太奇/场面调度/分镜/VFX 概念，以《银翼杀手》为超级入口）、工艺（陶瓷完整树：泥料-成型-上釉-烧制-窑-地域传统，玻璃/纺织扩展）、数字与新媒体（像素/矢量/渲染/着色器/生成艺术、界面设计史物品）。
- **FR-6（第三圈内容）**：动画（动画史人物与作品、动画 12 原则核心概念：squash&stretch/anticipation/timing/spacing/acting/layout）、游戏（Journey/Monument Valley/Myst/Shadow of the Colossus/Inside/Portal/Gris/Hollow Knight/Disco Elysium 等作品；环境叙事/游戏感/Diegetic UI/关卡设计/实时渲染概念；上田文人、陈星汉等创作者）、工业设计（Rams/Braun、Eames、Sottsass/Olivetti、Sony、Apple/Ive；人机工程、好设计十原则等概念；标志性产品物品）、时尚（Chanel/Dior/三宅一生/川久保玲等；轮廓/垂坠/纺织概念；服装物品）、视觉文化补充。
- **FR-7（学习图谱）**：课程总数 ≥ 30；7 个层级每层 ≥ 2 门课；先修关系构成有向无环图且所有 id 有效；课程页展示难度、先修、"接下来学什么"。
- **FR-8（学习旅程）**：7 条 journey（light/color/geometry/space/narrative/material/rhythm），每条 5–8 个有序停靠点（混合概念/作品/课程），所有引用 id 有效；旅程页叙事化呈现。
- **FR-9（Learn 页导航）**：呈现 7 层阶梯；顶部"我想学什么"入口（完全新手/设计/摄影/电影/AI 创作五条导向，锚定到对应层级与课程）；旅程专区。
- **FR-10（关系加密）**：手写 associated_with ≤ 8 条且均有语义合理性；四条超级链在图中可遍历（审计脚本断言关键路径存在，如 hokusai→ukiyo-e→impressionism→...→swiss→ui；caravaggio→chiaroscuro→photography→film→3d/games）；每个内容实体度数 ≥ 2（domain/period 等注册表实体除外）。
- **FR-11（呈现适配）**：EntityCard/TYPE_KEY、EntityPage、路由、i18n 类型标签支持 journey；EntityPage 课程分支渲染层级/难度/先修/进阶；无视觉框架级改动。
- **FR-12（双语与来源）**：所有新增实体 name/summary 中英双语齐备；事实图片与事实陈述带来源。

## Non-Functional Requirements

- **NFR-1**：`npx tsc -b` 零错误；`npx vite build` 成功；产物 gzip JS ≤ 220KB（内容增长主要是文本，允许从 164KB 增长但不失控）。
- **NFR-2**：`npm run audit` 退出码 0 且报告落盘（控制台 + 可选 `docs/` 不新增——报告直接在任务证据中记录）。
- **NFR-3**：浏览器冒烟（首页/学习页/旅程详情/游戏作品详情/电影作品详情/搜索）无控制台错误。
- **NFR-4**：新增 Wikimedia 图片 URL 100% HTTP 200（沿用既有核验方式）。

## Constraints

- **Technical**：React 19 + TS + Vite + Tailwind，hash 路由不变；内容即代码（纯 TS 数据文件）；Windows PowerShell 环境（命令分隔 `;`）。
- **Business**：知识永久免费；产品只卖省时间的文件；无付费墙。
- **Dependencies**：无新运行时依赖；审计脚本使用 vite 自带 esbuild。

## Assumptions

- 游戏/电影/动画/时尚/当代产品采用无图文本优先策略（用户可在审批时否决，改而只收录 Commons 有自由版权图像的极少数条目）。
- 旅程用新实体类型 journey 而非复用 exhibition（语义独立、Learn 页消费）；渲染复用展览组件。
- 课程层级编号与用户提出的 L0–L6 一致；现有 14 门课按 D1 重映射。

## Acceptance Criteria

### AC-1：模型与查询层升级到位
- **Type**: `rule`
- **Given**：升级后的 model/kb
- **When**：检查 enums/entity/kb 并运行 tsc
- **Then**：LessonLevel 含 7 个层级；LessonEntity 含 prerequisiteIds/recommendedNextIds/relatedLessonIds/difficulty/outcomes/journeyIds 可选字段；ENTITY_TYPES 含 'journey'；RELATION_TYPES 含 'requires' 且有中英标签；kb 导出 learningLevels/lessonsByLevel/journeys/prerequisitesOf
- **Pass Condition**：`npx tsc -b` 零错误；上述符号全部存在且被页面/审计使用
- **Evidence**：tsc 输出；grep 结果；审计脚本读数

### AC-2：实体总量达到密度地板
- **Type**: `rule`
- **Given**：全部内容文件
- **When**：运行 `npm run audit`
- **Then**：works+buildings+objects ≥ 70；person ≥ 45；concept ≥ 65；material ≥ 30；technique ≥ 35；movement ≥ 24；style ≥ 20；culture ≥ 20；place ≥ 30；period ≥ 20；lesson ≥ 30；practice ≥ 14；journey = 7
- **Pass Condition**：审计报告各计数达标
- **Evidence**：`npm run audit` 输出

### AC-3：14 域无空壳
- **Type**: `rule`
- **Given**：审计报告按域统计
- **Then**：每个域引用实体 ≥ 15；fashion/photography/film/animation/games/industrial/craft 七域各有 ≥ 3 件 work/building/object 与 ≥ 2 位 person（或等价创作者实体）且 ≥ 1 门 lesson 或 journey stop 覆盖
- **Pass Condition**：域计数表全部达标
- **Evidence**：审计输出 + 抽查域页面

### AC-4：关系网络密度与超级链
- **Type**: `rule`
- **Then**：关系边总数 ≥ 350；度为 0 的非注册表实体 = 0；手写 associated_with ≤ 8；审计断言四条链关键路径存在（影响链：hokusai→ukiyo-e→impressionism→van-gogh→expressionism→...→bauhaus→swiss→digital/ui；光链：caravaggio→chiaroscuro→photography→film-lighting→3d-render→games；几何链：greek-proportion→renaissance→cubism→de-stijl→bauhaus→swiss-grid→ui；材料链：mineral-pigment→oil-paint→print→photography→display→digital-color）
- **Pass Condition**：审计脚本链断言全部 PASS，边计数达标
- **Evidence**：审计输出；relations.ts/数据文件 grep

### AC-5：学习体系 7 层 + 先修图有效
- **Type**: `rule`
- **Then**：7 个层级每层 ≥ 2 门课；每门带 prerequisiteIds 的课其引用全部存在且图中无环；≥ 80% 课程有 outcomes 与 difficulty
- **Pass Condition**：审计校验通过
- **Evidence**：审计输出；lessons 数据

### AC-6：七条学习旅程完整
- **Type**: `rule`
- **Then**：7 条 journey 各有 5–8 stops，所有 entityId 有效，每条至少含 1 门 lesson、2 件作品、2 个概念；journey 实体在搜索与 Learn 页可见
- **Pass Condition**：审计 id 校验 0 悬空；页面可见
- **Evidence**：审计输出；浏览器截图/DOM

### AC-7：内容质量（抽样评审）
- **Type**: `rubric`
- **Dimension**：新增实体的知识密度（身份/为何重要/背景/视觉特征/关系/来源六要素）
- **Scale**: 1-5
- **Anchors**: 1 = 只有名称和一句摘要、无关系无正文；3 = 有正文有关系但分析泛泛、跨学科连接缺失；5 = 六要素齐备、分析具体到作品细节、至少 3 条跨学科边
- **Pass Threshold**: ≥ 4（抽样 12 个新实体，均分 ≥ 4 且无 1–2 分）
- **Evidence**：独立 Review 抽样记录

### AC-8：双语完整性
- **Type**: `rule`
- **Then**：审计对全部实体检查 name/summary 的 zh/en 非空；新增内容缺失数 = 0
- **Pass Condition**：审计 bilingual 检查 0 缺失
- **Evidence**：审计输出

### AC-9：UI 适配且骨架不动
- **Type**: `rule`
- **Then**：Learn 页含层级阶梯、5 个"我想学什么"入口、旅程专区；课程实体页显示难度/先修/进阶；journey 实体页可正常渲染；改动文件仅限 model/、content/、kb.ts、LearnPage、EntityPage、i18n/ui.ts、router（如需标签）
- **Pass Condition**：浏览器冒烟无错误；文件清单符合边界
- **Evidence**：git diff 文件清单；冒烟记录

### AC-10：构建与部署就绪
- **Type**: `rule`
- **Then**：tsc + vite build 成功；gzip JS ≤ 220KB；新增图片 HTTP 200；提交推送后 Pages 正常
- **Pass Condition**：全部通过
- **Evidence**：构建输出；图片抽查；push 结果

## Open Questions

- [ ] 文本优先政策（D6）是否认可？若希望游戏/电影也有图，需逐条确认 Commons 自由版权，工作量另计。（默认按 D6 执行）
