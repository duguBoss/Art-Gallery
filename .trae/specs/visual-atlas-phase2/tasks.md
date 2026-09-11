# Visual Atlas 第二阶段：知识密度建设期 — Implementation Plan

> 执行约定：所有新增内容放入 `src/content/data/` 下的**新数据文件**（每批次独立文件，互不重叠）；kb.ts 的聚合导入由主线程串行接入；内容创作子任务只读现有代码、只写自己的新文件；每批次完成后跑 `npx tsc -b` 与 `npm run audit`（T3 之后）。

## Task 1: 模型层升级（7 层级 / 学习字段 / journey / requires）
- **Status**: `pending`
- **Priority**: `high`
- **Depends On**: None
- **Description**:
  - `src/model/enums.ts`：LessonLevel 扩展为 7 层（`awareness|foundations|language|disciplines|history|practice|cross`）；ENTITY_TYPES 增加 `'journey'`；RELATION_TYPES 增加 `'requires'`。
  - `src/model/entity.ts`：LessonEntity 增加 `prerequisiteIds?/recommendedNextIds?/relatedLessonIds?/difficulty?(1-5)/outcomes?:L10n[]/journeyIds?`；新增 `JourneyEntity`（type:'journey'，stops: {id,title,lead?,entityIds[],narrative?}[]）并加入 Entity 联合。
  - `src/model/relation.ts`：requires 标签（先修 / Prerequisite；反向：进阶 / Unlocks）。
  - 新建 `src/model/learning.ts`：LEARNING_LEVELS 有序元数据（id、序号、中英 name/lead）。
  - 现有 14 门课的 path 按 D1 重映射（typography/narrative → language；其余不变）。
- **Acceptance Criteria Addressed**: AC-1
- **Test Requirements**:
  - `rule` TR-1.1: `npx tsc -b` 零错误；grep 确认 7 层级、journey、requires、新字段全部存在
  - `rule` TR-1.2: 现有课程 path 全部为合法新层级值，无遗漏
- **Notes**: 纯可选/联合扩展，现有数据不改结构

## Task 2: kb 查询层与派生关系升级
- **Status**: `pending`
- **Priority**: `high`
- **Depends On**: Task 1
- **Description**:
  - kb.ts：聚合导入 JOURNEYS；新增 `learningLevels()`、`lessonsByLevel(level)`、`journeys()`、`prerequisitesOf(id)`。
  - 派生关系升级：movementIds→`part_of`；conceptIds→`related_to`；styleIds 保持 `associated_with`；lesson.prerequisiteIds→`requires`；journey stops 内实体→`part_of`；lesson.recommendedNextIds→`related_to`（带 note"进阶"）。
  - 重复 id 与悬空关系保持 console.warn 且当前为零。
- **Acceptance Criteria Addressed**: AC-1, AC-4
- **Test Requirements**:
  - `rule` TR-2.1: tsc + build 通过；控制台无 [kb] warn
  - `rule` TR-2.2: neighbors() 能返回课程的 requires 边与旅程的 part_of 边（临时断言或审计读数验证）

## Task 3: 知识覆盖审计脚本与基线
- **Status**: `pending`
- **Priority**: `high`
- **Depends On**: Task 2
- **Description**:
  - 新建 `scripts/knowledge-audit.ts`：经 `npx esbuild --bundle --platform=node --format=esm` 打包后执行（npm script `"audit"`）。
  - 输出：① 各实体类型总数；② 各域 × 类型计数矩阵；③ 关系边总数与按类型计数；④ 度 0/1 实体清单；⑤ 手写 associated_with 计数与明细；⑥ 各层级课程数；⑦ journey 数与 stop/id 校验；⑧ 双语缺失（name/summary zh|en 空串）清单；⑨ 四条超级链关键路径断言（节点存在 + 边可达）；⑩ 无图实体统计。
  - 断言失败时退出码非 0；报告打印到控制台。
- **Acceptance Criteria Addressed**: AC-2, AC-3, AC-4, AC-5, AC-6, AC-8
- **Test Requirements**:
  - `rule` TR-3.1: `npm run audit` 可运行并输出完整 10 个分区；基线（现状）数字被记录到任务证据
  - `rule` TR-3.2: 链断言以显式 PASS/FAIL 行输出

## Task 4: 核心圈内容——艺术史/艺术/设计链条补全
- **Status**: `pending`
- **Priority**: `high`
- **Depends On**: Task 2
- **Description**:
  - 新文件 `src/content/data/modern-art.ts`（人物+作品+概念，arts/art-history 域）：希腊罗马（《掷铁饼者》《米洛的维纳斯》等，Wikimedia 图）、中世纪/拜占庭 1–2、文艺复兴扩展（波提切利、拉斐尔、布鲁内莱斯基、阿尔贝蒂）、浪漫主义/现实主义（戈雅、透纳、库尔贝）、印象派（莫奈、雷诺阿、德加）、后印象派（塞尚、修拉）、表现主义（蒙克）、抽象（康定斯基、马列维奇）、达达/杜尚、超现实（达利、马格利特）、抽象表现（波洛克、罗斯科）、极简（贾德、弗莱文）。
  - 新文件 `src/content/data/design-history.ts`（design/industrial 域，物品+人物+概念）：莫里斯/新艺术、贝伦斯/AEG、李西茨基/构成主义、齐霍尔兹/瑞士网格、兰德/IBM-UPS、拉姆斯→艾维/Apple 界面链的关键节点（无图文本优先）。
  - movements.ts 追加缺失流派（浪漫/现实/印象/后印象/表现/抽象/达达/超现实/抽象表现/极简等）；periods/geography/concepts 按需追加。
  - 每个新实体遵守 D7 质量门槛；古典作品用已核验 Wikimedia 图。
  - 数量地板：本批 person ≥ 20，work/building/object ≥ 22，movement ≥ 10（累计 movement ≥ 24），concept ≥ 12，place ≥ 8。
- **Acceptance Criteria Addressed**: AC-2, AC-3, AC-7, AC-8, AC-10
- **Test Requirements**:
  - `rule` TR-4.1: tsc/build 通过；audit 类型计数达标；双语缺失 0
  - `rule` TR-4.2: 新增 Wikimedia 图片 HTTP 200 抽查（≥ 8 张全 200）
  - `rubric` TR-4.3: 内容密度；1-5；1=仅名称摘要；3=有正文有关系但泛泛；5=六要素齐+跨学科边≥3；阈值≥4；抽样 4 个实体

## Task 5: 第二圈——摄影与电影
- **Status**: `pending`
- **Priority**: `high`
- **Depends On**: Task 2（可与 Task 4 并行，文件不重叠）
- **Description**:
  - 新文件 `photography.ts`：人物（尼埃普斯/达盖尔、阿杰、斯蒂格利茨、布列松、安塞尔·亚当斯、维基人像/纪实代表如多萝西·兰格）、作品（《圣殿大道》《圣拉扎尔车站后》《月升》《移民母亲》等 Commons 可核验照片）、概念（曝光三角、光圈/景深、快门、ISO、决定性瞬间、硬光柔光、胶片颗粒、街头/纪实传统）、材料技法（银版/湿版/明胶银盐/数码传感器/计算摄影）。
  - 新文件 `film.ts`：人物（梅里爱、爱森斯坦、威尔斯、黑泽明、塔可夫斯基、雷德利·斯科特、库布里克）、作品（《银翼杀手》为超级入口：霓虹/表现主义/赛博朋克/城市/雨/VFX 全连接；《公民凯恩》《七武士》《2001 太空漫游》《潜行者》等，无图文本优先）、概念（场面调度、蒙太奇、长镜头、分镜、电影布光、VFX、声音设计、色彩分级）。
  - 数量地板：两域合计 person ≥ 10，work ≥ 12，concept ≥ 14，material+technique ≥ 10。
- **Acceptance Criteria Addressed**: AC-2, AC-3, AC-7, AC-8
- **Test Requirements**:
  - `rule` TR-5.1: tsc/build 通过；audit 中 photography/film 域计数达标（各 ≥ 15 引用、≥3 作品、≥2 人物）
  - `rubric` TR-5.2: 内容密度；1-5；锚点同 TR-4.3；阈值≥4；抽样 3 个（含《银翼杀手》）

## Task 6: 第二圈——工艺与数字新媒体
- **Status**: `pending`
- **Priority**: `high`
- **Depends On**: Task 2（可与 Task 4/5 并行）
- **Description**:
  - 新文件 `craft-expansion.ts`：陶瓷完整树——材料（瓷土/陶土/釉料/高岭土）、技法（拉坯/泥板/手捏/上釉/烧成）、概念（窑变/开片/天目/侘寂）、地域传统（中国青瓷/青花瓷、日本乐烧/萩烧、韩国青瓷、伊斯兰锡釉、欧洲代尔夫特/迈森）、物品（宋瓷茶碗/建盏/乐茶碗等有 Commons 图者）；玻璃（吹制/铅水晶）、纺织（丝绸/织锦/扎染）扩展。
  - 新文件 `digital.ts`：概念（像素/矢量/栅格、渲染管线、着色器、实时渲染、生成艺术、Diegetic UI 可前置占位由 games 深化）、作品/物品（文字处理界面史、Mac/iPhone 等文本优先物品）、技法（矢量绘图/3D 建模/光照贴图）。
  - 数量地板：material ≥ 12（累计 ≥ 30），technique ≥ 10（累计 ≥ 30），object ≥ 8，concept ≥ 10，digital 域 work/object ≥ 3。
- **Acceptance Criteria Addressed**: AC-2, AC-3, AC-7, AC-8
- **Test Requirements**:
  - `rule` TR-6.1: audit 中 craft 域 ≥ 15 引用且材料/技法计数达标；digital 域 ≥ 15 引用
  - `rubric` TR-6.2: 内容密度；1-5；阈值≥4；抽样 3 个（含陶瓷链 1 个）

## Task 7: 第三圈——动画与游戏
- **Status**: `pending`
- **Priority**: `high`
- **Depends On**: Task 2（可与 Task 4–6 并行）
- **Description**:
  - 新文件 `animation.ts`：人物（洛特·赖尼格、诺曼·麦克拉伦、宫崎骏、高畑勋、大友克洋、押井守、拉塞特）、作品（《千与千寻》《幽灵公主》《阿基拉》《攻壳机动队》《白雪公主》/定格代表等，文本优先）、概念（12 原则核心：squash&stretch、anticipation、timing、spacing、acting、layout/视觉开发、定格/2D/3D 分野）。
  - 新文件 `games.ts`：作品（Journey、Monument Valley、Myst、Minecraft、Shadow of the Colossus、Inside、Limbo、Portal、Gris、Hollow Knight、Disco Elysium、Breath of the Wild、Death Stranding 中选 ≥ 10）、人物（上田文人、陈星汉、Playdead 二人组等 ≥ 3）、概念（环境叙事、游戏感/game feel、Diegetic UI、关卡设计、实时 3D、低多边形美学、程序生成）、与电影/建筑/概念艺术的跨域边（如 SOTC↔浪漫主义风景、Journey↔光链、Monument Valley↔埃舍尔/不可能几何）。
  - 数量地板：两域合计 work ≥ 14，person ≥ 5，concept ≥ 14，style 追加（像素/低多边形/手绘动画等）≥ 4（累计 style ≥ 20）。
- **Acceptance Criteria Addressed**: AC-2, AC-3, AC-7, AC-8
- **Test Requirements**:
  - `rule` TR-7.1: audit 中 games/animation 域各 ≥ 15 引用、≥ 3 作品、≥ 2 人物或课程覆盖
  - `rule` TR-7.2: 游戏/动画实体 0 版权图片（image 字段缺失或为 Commons 自由授权）
  - `rubric` TR-7.3: 内容密度；1-5；阈值≥4；抽样 3 个（含 Journey 或 SOTC）

## Task 8: 第三圈——工业设计、时尚与视觉文化
- **Status**: `pending`
- **Priority**: `high`
- **Depends On**: Task 2（可并行；与 Task 4 design-history 注意 id 不冲突）
- **Description**:
  - 新文件 `industrial.ts`：人物（迪特·拉姆斯、伊姆斯夫妇、索特萨斯、索尼设计组、乔纳森·艾维）、物品（Braun SK4/T3、LCW 椅、Valentine 打字机、Walkman、iPhone 等文本优先）、概念（人机工程、好设计十原则、形式追随功能、计划废止、模块化、极简 UI 源流）。
  - 新文件 `fashion.ts`：人物（可可·香奈儿、克里斯汀·迪奥、三宅一生、川久保玲、麦昆）、物品（小黑裙、New Look、褶皱系列等文本优先）、概念（轮廓 silhouette、垂坠、制版、纺织创新、身体与身份）、材料（丝绸/羊毛/斜纹软呢/合成纤维）、文化连接（和服↔垂坠、高级定制↔工艺）。
  - 视觉文化补充：emoji/表情包/地图/公共标识等 3–5 个概念或物品入 visual-culture 域。
  - 数量地板：industrial 与 fashion 域 object ≥ 10、person ≥ 7、concept ≥ 12、material ≥ 4；fashion 域引用 ≥ 15 且 ≥ 3 物品。
- **Acceptance Criteria Addressed**: AC-2, AC-3, AC-7, AC-8
- **Test Requirements**:
  - `rule` TR-8.1: audit 中 industrial/fashion/visual-culture 计数达标；fashion 从 0 变为 ≥ 15
  - `rubric` TR-8.2: 内容密度；1-5；阈值≥4；抽样 2 个

## Task 9: 学习图谱——课程扩编与先修网络
- **Status**: `pending`
- **Priority**: `high`
- **Depends On**: Task 4, Task 5, Task 6, Task 7, Task 8
- **Description**:
  - 新文件 `lessons-expansion.ts`：
    - L0 awareness：2 门（"什么是视觉"/"学会观看"）；
    - L2 language：5–6 门（视觉层级、对比、平衡与留白、网格、符号与语义、图底关系）；
    - L3 disciplines：7 门（如何阅读一张照片/一部电影/一部动画/一个游戏/一件产品/一件服装/一件陶瓷）；
    - L4 history：2–3 门（摄影与现代性、战后艺术与消费社会、日本视觉文化线）；
    - L5 practice：2 门（从观察到创作：工作流、风格拆解与重组）；
    - L6 cross：3–4 门（浮世绘×现代界面、建筑×游戏空间、电影布光×3D 渲染、包豪斯×数字产品）。
  - 全部课程（含旧 14 门）补齐 difficulty、outcomes（≥3 条）、prerequisiteIds（构成 DAG）、recommendedNextIds；新练习 ≥ 6 条入 practice（累计 ≥ 14）。
- **Acceptance Criteria Addressed**: AC-5, AC-7
- **Test Requirements**:
  - `rule` TR-9.1: audit 显示每层 ≥ 2 门、lesson ≥ 30、practice ≥ 14；先修 id 全部存在且无环（审计检测）
  - `rule` TR-9.2: ≥ 80% 课程有 outcomes 与 difficulty
  - `rubric` TR-9.3: 课程教学质量；1-5；1=空洞条目；3=结构完整但观察环节不具体；5=情境→原理→观察(具体作品)→练习→联结齐备；阈值≥4；抽样 3 门

## Task 10: 七条主题学习旅程
- **Status**: `pending`
- **Priority**: `high`
- **Depends On**: Task 9
- **Description**:
  - 新文件 `journeys.ts`：light / color / geometry / space / narrative / material / rhythm 七条 JourneyEntity，每条 5–8 stops（每 stop 混合概念/作品/课程，叙事 lead 双语），每条 ≥ 1 门 lesson、≥ 2 件作品、≥ 2 个概念；旅程自身 body 讲清"为什么这条线索能横穿 5000 年"。
  - 旅程须踩中超级链节点（光链：卡拉瓦乔→摄影→电影→3D→游戏；几何链：希腊比例→文艺复兴→立体主义→风格派→包豪斯→瑞士网格→UI）。
- **Acceptance Criteria Addressed**: AC-6, AC-7
- **Test Requirements**:
  - `rule` TR-10.1: audit 旅程校验：7 条、每条 5–8 stops、0 悬空 id、组成门槛达标
  - `rubric` TR-10.2: 旅程叙事质量；1-5；阈值≥4；抽样光与几何两条

## Task 11: 关系加密与超级链贯通
- **Status**: `pending`
- **Priority**: `high`
- **Depends On**: Task 9, Task 10
- **Description**:
  - 新文件 `relations-expansion.ts`（并入 RELATIONS）：为新实体补着手写具体关系（influenced_by/emerged_from/responds_to/references/contrasts_with/studied_under/collaborated_with/follows/evolved_into）；把旧 relations.ts 中可升级的 associated_with 替换为具体类型（人物↔流派→part_of；风格↔材料→uses_material 等）。
  - 贯通四条超级链（见 spec AC-4 路径），确保审计链断言 PASS；每个非注册表实体度数 ≥ 2。
- **Acceptance Criteria Addressed**: AC-4, AC-7
- **Test Requirements**:
  - `rule` TR-11.1: audit：边总数 ≥ 350；度 0 实体 = 0；手写 associated_with ≤ 8；四链断言全 PASS
  - `rule` TR-11.2: 旧 8 条 associated_with 中语义可升级者均已升级并记录

## Task 12: Learn 页导航与实体页适配
- **Status**: `pending`
- **Priority**: `medium`
- **Hard Depends**: Task 1（层级/journey 类型）；**Content Depends**: Task 9, Task 10
- **Description**:
  - LearnPage 重做为：7 层阶梯（序号+名称+导语，按 LEARNING_LEVELS 渲染）；顶部"我想学什么"5 个导向入口（新手→L0/L1；设计→L1+L2+设计 L3；摄影→光+摄影 L3+摄影史；电影→构图/光+电影 L3；AI 创作→L1+风格史+AI 课），点击锚定/筛选到对应课程；旅程专区（7 条 journey 编辑式列表）。
  - EntityPage：课程分支渲染层级名（取自 LEARNING_LEVELS，删除硬编码三元判断）、难度（1–5 点）、先修 chips、"接下来学什么"；journey 分支按 stops 叙事渲染（复用展览分区样式）。
  - EntityCard TYPE_KEY、i18n/ui.ts 类型标签补 journey；确认 router entityPath 对 journey 正常。
- **Acceptance Criteria Addressed**: AC-9, AC-11
- **Test Requirements**:
  - `rule` TR-12.1: 浏览器冒烟：/learn 显示阶梯+5 入口+旅程区；课程页显示先修/难度/进阶；/entity/journey/light 可渲染；无控制台错误
  - `rule` TR-12.2: 改动文件仅限 model/、content/、kb.ts、LearnPage、EntityPage、i18n/ui.ts（router 如需）

## Task 13: 全量审计、构建、冒烟、README 与提交
- **Status**: `pending`
- **Priority**: `high`
- **Depends On**: Task 11, Task 12
- **Description**:
  - 跑 `npm run audit` 全绿并记录最终数字；`npx tsc -b` + `npx vite build`（gzip JS ≤ 220KB）；新增 Wikimedia 图 HTTP 抽查；浏览器冒烟（首页/学习/旅程/游戏详情/电影详情/搜索"光"）。
  - 更新 README.md 图谱规模表数字；commit + push（直连代理覆盖参数），读到 `main -> main` 结论。
- **Acceptance Criteria Addressed**: AC-2, AC-8, AC-10
- **Test Requirements**:
  - `rule` TR-13.1: audit 退出码 0；build 成功且 gzip ≤ 220KB；冒烟无错误
  - `rule` TR-13.2: push 输出含 `main -> main` 且 `git branch -vv` 显示与 origin/main 同步
