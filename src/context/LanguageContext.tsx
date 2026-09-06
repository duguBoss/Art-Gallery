import React, { createContext, useContext, useState } from 'react';

export type Language = 'zh' | 'en' | 'ja' | 'ko';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const translations: Record<Language, Record<string, string>> = {
  zh: {
    // Navbar
    'nav.index': '01 序幕索引',
    'nav.archive': '02 胶片印样',
    'nav.language': '03 视觉星图',
    'nav.dossiers': '04 研究案卷',
    'nav.lab': '05 创作工坊',
    'nav.about': '06 存在宣言',
    'nav.ai': '07 AI 驾驶舱',
    'nav.search': '全局检索',
    'nav.searchPlaceholder': '按 ⌘K 或 Ctrl+K 搜索',
    'nav.curator': '策展后台',
    'nav.title': 'VISUAL ATLAS',
    'nav.subtitle': '电影与美学语言系统',

    // 01 Index / Hero
    'hero.edition': '档案编号 001 // 2026 典藏版',
    'hero.systemSubtitle': '电影与美学语言系统',
    'hero.curatedCount': '部大师分镜',
    'hero.grid': '瑞士国际排版网格',
    'hero.tagline': '美学解构',
    'hero.titleLine1': '视觉语言',
    'hero.titleLine2': '解构系统',
    'hero.description': '摒弃平庸图库与卡片堆砌。这里是一个探索“图像为何动人”的视觉文献库——解构好莱坞镜头、光影比例、色彩色相与 AI 创作提示词。',
    'hero.studyScene': '解构此分镜',
    'hero.exploreArchive': '浏览完整档案',
    'hero.featured': '精选分镜',
    'hero.aspectRatio': '画幅比例',
    'hero.optics': '光学镜头',
    'hero.enterDeconstruction': '进入分镜深度解构 →',
    'hero.readyMoveCursor': '分析就绪 // 移动光标探索画面',
    'hero.hoverHint': '研习图像 // 悬停进行解构',
    'hero.subjectDetected': '主体锁定 · 宽银幕剪影',
    'hero.lightSource': '光源测绘 · 体积青光与实用暖光',
    'hero.negativeSpace': '负空间留白 · %pct%% 编辑平衡',
    'hero.focalDepth': '焦点深度 · 变形定焦镜头 T/1.8',
    'hero.cursor': '光标坐标',

    // 02 Archive
    'archive.tag': '胶片印样 // 档案索引',
    'archive.title': '电影分镜档案馆',
    'archive.status': '已载入 %count% / %total% 部电影分镜 · 胶片印样模式',
    'archive.filterLabel': '筛选:',
    'archive.filterAll': '全部档案',
    'archive.filterCyber': '赛博暗夜',
    'archive.filterBrutalist': '粗野巨构',
    'archive.filterEditorial': '画报诗性',
    'archive.filterZen': '东方水墨',
    'archive.filterGhibli': '治愈晴风',

    // 03 Constellation
    'constellation.tag': '03 // 关系拓扑',
    'constellation.title': '视觉星图',
    'constellation.subtitle': '非线性探索视觉构件之间的拓扑连接。光线、色彩、构图与情绪的宇宙。',
    'constellation.filterCategory': '分类筛选:',
    'constellation.all': '全部',
    'constellation.nodeSelected': '已选节点:',
    'constellation.connections': '关联节点数:',
    'constellation.viewDetails': '查看完整解构案卷 →',

    // 04 Dossiers
    'dossiers.tag': '04 // 深度研习',
    'dossiers.title': '视觉语言案卷',
    'dossiers.subtitle': '精选视觉解构案卷，深入剖析光影构图与情绪法则。',
    'dossiers.readCase': '研读案卷 →',

    // 05 Lab
    'lab.tag': '05 // 实验性排版',
    'lab.title': '视觉叙事工坊',
    'lab.subtitle': '自由组合分镜镜头，实时模拟宽银幕时间线剪辑序列。',
    'lab.timeline': '当前时间线序列',
    'lab.timelineDesc': '利用场景间的反差与节奏跨度建立视听张力。',
    'lab.exportStoryboard': '导出故事板剧本',
    'lab.keyScene': '关键场景',
    'lab.opticalRig': '光学机位',
    'lab.directorNote': '导演阐述',

    // 06 About
    'about.tag': '06 // 存在宣言与美学宪法',
    'about.title': '存在之由',
    'about.subtitle': '在自动化生成的时代，抵制对电影画面平庸化消耗的一份声明。',
    'about.h1': '图像不仅仅是画面。',
    'about.h2': '它们是精密的系统。',
    'about.p1': '普通的数字图库往往停留在“漂亮卡片”的被动浏览中。观者在无限滚动的瀑布流中迷失，却从未真正理解一张画面为何能在神经突触间激发战栗。',
    'about.p2': 'VISUAL ATLAS 建立于一个笃定信念：每一幅打动人心的电影杰作，都是由光线角度、光学焦段、几何网格与色彩极差精确构筑的语言体系。只有解构这种语法，创作者才能跨越平庸，创作出拥有永恒张力的作品。',
    'about.discoverArchive': '探索分镜档案 →',
    'about.anatomy': '电影语言解构层级',
    'about.step1': '光子、阴影、体积衰减与主暗反差比。',
    'about.step2': '色相极差、色温隔离与有机胶片乳胶质感。',
    'about.step3': '负空间留白、尺度震慑与建筑单点透视。',
    'about.step4': '光学焦段、焦外光斑、变形宽银幕畸变与快门角。',
    'about.step5': '电影律动、平移推拉、运动动量与静止。',
    'about.step6': '潜意识共鸣、文学性孤寂与崇高敬畏。',
    'about.constitution': '反 AI 设计宪章',
    'about.principlesTitle': '设计原则与审美克制',
    'about.curatedBy': '由视觉架构师与电影摄影师联合策划',
    'about.swissEdition': '瑞士国际排版系统 · 2026',

    // AI Cockpit
    'ai.tag': '07 // 机器智能接口',
    'ai.title': 'AI 视觉本体驾驶舱',
    'ai.subtitle': '为视觉生成模型与 LLM 提供标准化的语义上下文与提示词工程桥梁。',
    'ai.modelSelect': '选择目标生成引擎:',
    'ai.copyPrompt': '复制模型规范提示词',
    'ai.downloadJson': '获取全量视觉图谱 JSON',
    'ai.llmsTxt': '查看 llms.txt 规范',

    // Command Palette
    'cmd.placeholder': '搜索分镜、视觉 DNA、摄影机参数，或按 ESC...',
    'cmd.jumpTo': '跳转至:',
    'cmd.noResults': '未检索到匹配的视觉档案',

    // Footer
    'footer.edition': '// 2026 典藏档案版',
    'footer.loop': '看 → 拆 → 关联 → 收藏 → 创作',
    'footer.cms': '策展管理后台',
  },
  en: {
    // Navbar
    'nav.index': '01 INDEX',
    'nav.archive': '02 ARCHIVE',
    'nav.language': '03 CONSTELLATION',
    'nav.dossiers': '04 DOSSIERS',
    'nav.lab': '05 LAB',
    'nav.about': '06 ABOUT',
    'nav.ai': '07 AI COCKPIT',
    'nav.search': 'SEARCH',
    'nav.searchPlaceholder': 'Press ⌘K or Ctrl+K to search',
    'nav.curator': 'CURATOR CMS',
    'nav.title': 'VISUAL ATLAS',
    'nav.subtitle': 'THE CINEMA & AESTHETIC LANGUAGE SYSTEM',

    // 01 Index / Hero
    'hero.edition': 'ARCHIVE 001 // 2026 EDITION',
    'hero.systemSubtitle': 'THE CINEMA & AESTHETIC LANGUAGE SYSTEM',
    'hero.curatedCount': 'CURATED SCENES',
    'hero.grid': 'SWISS EDITORIAL GRID',
    'hero.tagline': 'AESTHETIC DECONSTRUCTION',
    'hero.titleLine1': 'VISUAL',
    'hero.titleLine2': 'LANGUAGE SYSTEM',
    'hero.description': 'Reject generic card galleries and masonry dumps. An interactive visual research archive deconstructing cinematic masterworks, lighting ratios, color palettes, optical rigs, and production prompts.',
    'hero.studyScene': 'STUDY THIS SCENE',
    'hero.exploreArchive': 'EXPLORE ARCHIVE',
    'hero.featured': 'FEATURED',
    'hero.aspectRatio': 'ASPECT RATIO',
    'hero.optics': 'OPTICS',
    'hero.enterDeconstruction': 'ENTER SCENE DECONSTRUCTION →',
    'hero.readyMoveCursor': 'ANALYSIS READY // MOVE CURSOR',
    'hero.hoverHint': 'STUDY THE IMAGE // HOVER TO DECONSTRUCT',
    'hero.subjectDetected': 'SUBJECT DETECTED · ANAMORPHIC SILHOUETTE',
    'hero.lightSource': 'LIGHT SOURCE · VOLUMETRIC CYAN RIM & PRACTICAL GLOW',
    'hero.negativeSpace': 'NEGATIVE SPACE · %pct%% EDITORIAL BALANCE',
    'hero.focalDepth': 'FOCAL DEPTH · ANAMORPHIC PRIME T/1.8',
    'hero.cursor': 'CURSOR',

    // 02 Archive
    'archive.tag': 'CONTACT SHEET // ARCHIVE INDEX',
    'archive.title': 'CINEMA ARCHIVE',
    'archive.status': 'LOADED %count% / %total% SCENES · CONTACT SHEET MODE',
    'archive.filterLabel': 'FILTER:',
    'archive.filterAll': 'ALL SCENES',
    'archive.filterCyber': 'CYBERPUNK',
    'archive.filterBrutalist': 'BRUTALISM',
    'archive.filterEditorial': 'EDITORIAL',
    'archive.filterZen': 'EAST ASIAN ZEN',
    'archive.filterGhibli': 'ATMOSPHERIC',

    // 03 Constellation
    'constellation.tag': '03 // RELATIONAL TOPOLOGY',
    'constellation.title': 'VISUAL CONSTELLATION',
    'constellation.subtitle': 'Non-linear exploration of topological connections between visual primitives.',
    'constellation.filterCategory': 'FILTER CATEGORY:',
    'constellation.all': 'ALL',
    'constellation.nodeSelected': 'SELECTED NODE:',
    'constellation.connections': 'CONNECTIONS:',
    'constellation.viewDetails': 'VIEW FULL DECONSTRUCTION DOSSIER →',

    // 04 Dossiers
    'dossiers.tag': '04 // IN-DEPTH STUDIES',
    'dossiers.title': 'VISUAL LANGUAGE DOSSIERS',
    'dossiers.subtitle': 'Curated visual case studies dissecting lighting, geometry, and emotional resonance.',
    'dossiers.readCase': 'READ DOSSIER →',

    // 05 Lab
    'lab.tag': '05 // EXPERIMENTAL EDITING',
    'lab.title': 'VISUAL LAB & STORYBOARD',
    'lab.subtitle': 'Compose cinema scenes into custom widescreen timeline sequences.',
    'lab.timeline': 'ACTIVE TIMELINE SEQUENCE',
    'lab.timelineDesc': 'Craft tension through deliberate contrast in scale, lighting, and pacing.',
    'lab.exportStoryboard': 'EXPORT STORYBOARD SCRIPT',
    'lab.keyScene': 'KEY SCENE',
    'lab.opticalRig': 'OPTICAL RIG',
    'lab.directorNote': 'DIRECTOR NOTE',

    // 06 About
    'about.tag': '06 // MANIFESTO & CONSTITUTION',
    'about.title': 'REASON FOR BEING',
    'about.subtitle': 'A refusal of image mediocrity in the age of generative automation.',
    'about.h1': 'IMAGES ARE NOT MERE PICTURES.',
    'about.h2': 'THEY ARE PRECISE SYSTEMS.',
    'about.p1': 'Traditional image galleries stop at superficial card browsing. Viewers scroll endlessly without understanding what makes an image resonate.',
    'about.p2': 'VISUAL ATLAS is grounded in conviction: every cinematic masterwork is built upon precise ratios of light, focal lengths, geometric frameworks, and chromatic polarity. By deconstructing this syntax, creators transcend generic outputs.',
    'about.discoverArchive': 'DISCOVER ARCHIVE →',
    'about.anatomy': 'CINEMA SYNTAX LAYERS',
    'about.step1': 'Photons, shadow depth, volumetric haze, and key-to-fill falloff.',
    'about.step2': 'Complementary gamut tension and film emulsion characteristics.',
    'about.step3': 'Negative space voids, human scale comparison, and one-point perspective.',
    'about.step4': 'Focal optics, anamorphic streaks, oval bokeh, and 180° shutter angle.',
    'about.step5': 'Rhythmic pacing, tracking velocity, and deliberate stillness.',
    'about.step6': 'Existential solitude, sublime reverence, and subconscious resonance.',
    'about.constitution': 'ANTI-AI SAMENESS CHARTER',
    'about.principlesTitle': 'DESIGN PRINCIPLES & RESTRAINT',
    'about.curatedBy': 'CURATED BY VISUAL ARCHITECTS & CINEMATOGRAPHERS',
    'about.swissEdition': 'SWISS EDITORIAL SYSTEM · 2026',

    // AI Cockpit
    'ai.tag': '07 // MACHINE INTELLIGENCE LAYER',
    'ai.title': 'AI KNOWLEDGE COCKPIT',
    'ai.subtitle': 'Bridge human cinematographic syntax with frontier generative AI models and LLMs.',
    'ai.modelSelect': 'TARGET GENERATION ENGINE:',
    'ai.copyPrompt': 'COPY MODEL-SPECIFIC PROMPT',
    'ai.downloadJson': 'DOWNLOAD COMPLETE KNOWLEDGE GRAPH JSON',
    'ai.llmsTxt': 'INSPECT LLMS.TXT SPECIFICATION',

    // Command Palette
    'cmd.placeholder': 'Search scenes, visual DNA, camera rig, or press ESC...',
    'cmd.jumpTo': 'JUMP TO:',
    'cmd.noResults': 'NO CORRESPONDING VISUAL ARCHIVE FOUND',

    // Footer
    'footer.edition': '// 2026 ARCHIVE EDITION',
    'footer.loop': 'SEE → DECODE → CONNECT → COLLECT → CREATE',
    'footer.cms': 'CURATOR CMS',
  },
  ja: {
    // Navbar
    'nav.index': '01 索引',
    'nav.archive': '02 フィルム印様',
    'nav.language': '03 視覚星図',
    'nav.dossiers': '04 研究書類',
    'nav.lab': '05 創作実験室',
    'nav.about': '06 存在宣言',
    'nav.ai': '07 AI 操縦席',
    'nav.search': '検索',
    'nav.searchPlaceholder': '⌘K または Ctrl+K で検索',
    'nav.curator': 'キュレーター管理',
    'nav.title': 'VISUAL ATLAS',
    'nav.subtitle': '映画と美学の言語体系',

    // 01 Index / Hero
    'hero.edition': 'アーカイブ 001 // 2026 決定版',
    'hero.systemSubtitle': '映画と美学の言語体系',
    'hero.curatedCount': 'の厳選カット',
    'hero.grid': 'スイス国際タイポグラフィ',
    'hero.tagline': '美学の解体',
    'hero.titleLine1': '視覚言語',
    'hero.titleLine2': '解体システム',
    'hero.description': '凡庸なギャラリーを拒絶する。画像がなぜ観る者の心を揺さぶるのかを解き明かす視覚文献庫。光学レンズ、光比、色彩極差、プロンプトを解体。',
    'hero.studyScene': 'このカットを解体',
    'hero.exploreArchive': 'アーカイブを閲覧',
    'hero.featured': '注目カット',
    'hero.aspectRatio': 'アスペクト比',
    'hero.optics': '光学レンズ',
    'hero.enterDeconstruction': 'カットの深層解体へ →',
    'hero.readyMoveCursor': '解析準備完了 // カーソルで探索',
    'hero.hoverHint': '画像を研鑽 // ホバーで解体',
    'hero.subjectDetected': '被写体検出 · アナモルフィック・シルエット',
    'hero.lightSource': '光源マッピング · ボリュームシアン光',
    'hero.negativeSpace': '余白率 · %pct%% エディトリアル・バランス',
    'hero.focalDepth': '焦点深度 · アナモルフィック T/1.8',
    'hero.cursor': '座標',

    // 02 Archive
    'archive.tag': 'コンタクトシート // アーカイブ',
    'archive.title': '映画カット・アーカイブ',
    'archive.status': '%count% / %total% カット読込完了',
    'archive.filterLabel': '絞り込み:',
    'archive.filterAll': '全カット',
    'archive.filterCyber': 'サイバーパンク',
    'archive.filterBrutalist': 'ブルータリズム',
    'archive.filterEditorial': 'エディトリアル',
    'archive.filterZen': '東洋の禅',
    'archive.filterGhibli': '癒しの空気感',

    // 03 Constellation
    'constellation.tag': '03 // 関係トポロジー',
    'constellation.title': '視覚星図',
    'constellation.subtitle': '光線、色彩、構図、感情が織りなす宇宙的ネットワーク。',
    'constellation.filterCategory': 'カテゴリ:',
    'constellation.all': 'すべて',
    'constellation.nodeSelected': '選択ノード:',
    'constellation.connections': '接続数:',
    'constellation.viewDetails': '完全な解体案卷を見る →',

    // 04 Dossiers
    'dossiers.tag': '04 // 深層研鑽',
    'dossiers.title': '視覚言語案卷',
    'dossiers.subtitle': '構図と光影の法則を徹底解剖するケーススタディ。',
    'dossiers.readCase': '案卷を読む →',

    // 05 Lab
    'lab.tag': '05 // 実験的編集',
    'lab.title': '視覚ラボ＆絵コンテ',
    'lab.subtitle': '映画カットを自由に組み合わせ、ワイドスクリーンのタイムラインを構築。',
    'lab.timeline': '現在のタイムライン',
    'lab.timelineDesc': 'スケールと明暗の対比によって緊張感を生み出す。',
    'lab.exportStoryboard': '絵コンテ脚本をエクスポート',
    'lab.keyScene': 'キーシーン',
    'lab.opticalRig': '光学リグ',
    'lab.directorNote': '監督ノート',

    // 06 About
    'about.tag': '06 // 存在宣言',
    'about.title': '存在の理由',
    'about.subtitle': '自動生成時代における画像凡庸化への抵抗宣言。',
    'about.h1': '画像は単なる絵ではない。',
    'about.h2': '精密な体系である。',
    'about.p1': '一般的なギャラリーはカードの消費で終わる。なぜその一枚に心が震えるのかを理解することはない。',
    'about.p2': 'VISUAL ATLAS の確信：傑作映画のカットは光線比率、画角、幾何学、色彩の精密な言語である。この文法を解体して初めて、真の傑作が生まれる。',
    'about.discoverArchive': 'アーカイブを探求 →',
    'about.anatomy': '映画言語の階層',
    'about.step1': '光子、陰影、ボリューム減衰と明暗比。',
    'about.step2': '色相極差とフィルム特有のエマルジョン質感。',
    'about.step3': 'ネガティブスペース、スケール感と一点透視。',
    'about.step4': '光学焦点、アナモルフィック光条と180度シャッター。',
    'about.step5': 'テンポ、カメラ移動と静止の律動。',
    'about.step6': '実存的孤独、崇高なる敬畏と無意識の共鳴。',
    'about.constitution': '反 AI 均質化憲章',
    'about.principlesTitle': '設計原則と美学的抑制',
    'about.curatedBy': 'ヴィジュアル・アーキテクトと映画撮影監督によるキュレーション',
    'about.swissEdition': 'スイス国際タイポグラフィ体系 · 2026',

    // AI Cockpit
    'ai.tag': '07 // 機械知性レイヤー',
    'ai.title': 'AI 視覚オントロジー・コックピット',
    'ai.subtitle': '映画撮影言語を最新の画像生成モデルとLLMに接続する構造化ブリッジ。',
    'ai.modelSelect': '対象エンジンを選択:',
    'ai.copyPrompt': 'モデル専用プロンプトをコピー',
    'ai.downloadJson': '全ナレッジグラフ JSON を取得',
    'ai.llmsTxt': 'llms.txt 仕様書を閲覧',

    // Command Palette
    'cmd.placeholder': 'シーン、視覚DNA、機材パラメータを検索 (ESCで閉じる)...',
    'cmd.jumpTo': '移動先:',
    'cmd.noResults': '該当する視覚アーカイブがありません',

    // Footer
    'footer.edition': '// 2026 保存版',
    'footer.loop': '観る → 解体する → 繋ぐ → 蓄積する → 創る',
    'footer.cms': 'キュレーター管理画面',
  },
  ko: {
    // Navbar
    'nav.index': '01 색인',
    'nav.archive': '02 필름 밀착',
    'nav.language': '03 시각 성도',
    'nav.dossiers': '04 연구 문서',
    'nav.lab': '05 창작 공방',
    'nav.about': '06 존재 선언',
    'nav.ai': '07 AI 콕핏',
    'nav.search': '전역 검색',
    'nav.searchPlaceholder': '⌘K 또는 Ctrl+K 로 검색',
    'nav.curator': '큐레이터 백엔드',
    'nav.title': 'VISUAL ATLAS',
    'nav.subtitle': '영화 및 미학 언어 시스템',

    // 01 Index / Hero
    'hero.edition': '아카이브 001 // 2026 에디션',
    'hero.systemSubtitle': '영화 및 미학 언어 시스템',
    'hero.curatedCount': '개의 엄선된 장면',
    'hero.grid': '스위스 국제 타이포그래피 그리드',
    'hero.tagline': '미학적 해체',
    'hero.titleLine1': '시각 언어',
    'hero.titleLine2': '해체 시스템',
    'hero.description': '평범한 갤러리를 거부합니다. 이미지가 왜 감동을 주는지 탐구하는 시각 문헌 저장소—광학 렌즈, 명암비, 색채 극차, 프롬프트 해체.',
    'hero.studyScene': '이 장면 해체하기',
    'hero.exploreArchive': '전체 아카이브 탐색',
    'hero.featured': '주요 장면',
    'hero.aspectRatio': '화면비',
    'hero.optics': '광학 렌즈',
    'hero.enterDeconstruction': '장면 심층 해체 시작 →',
    'hero.readyMoveCursor': '분석 준비 완료 // 마우스로 탐색',
    'hero.hoverHint': '이미지 연구 // 호버하여 해체',
    'hero.subjectDetected': '피사체 고정 · 아나모픽 실루엣',
    'hero.lightSource': '광원 매핑 · 볼류메트릭 시안 광',
    'hero.negativeSpace': '여백 비율 · %pct%% 에디토리얼 밸런스',
    'hero.focalDepth': '초점 심도 · 아나모픽 T/1.8',
    'hero.cursor': '좌표',

    // 02 Archive
    'archive.tag': '밀착 인화 // 아카이브 색인',
    'archive.title': '영화 장면 아카이브',
    'archive.status': '%count% / %total% 개 장면 로드 완료',
    'archive.filterLabel': '필터:',
    'archive.filterAll': '전체 장면',
    'archive.filterCyber': '사이버펑크',
    'archive.filterBrutalist': '브루탈리즘',
    'archive.filterEditorial': '에디토리얼',
    'archive.filterZen': '동양의 선',
    'archive.filterGhibli': '서정적 힐링',

    // 03 Constellation
    'constellation.tag': '03 // 관계 위상학',
    'constellation.title': '시각 성도',
    'constellation.subtitle': '빛, 색채, 구도, 감정 사이의 비선형적 위상 연결망.',
    'constellation.filterCategory': '카테고리:',
    'constellation.all': '전체',
    'constellation.nodeSelected': '선택된 노드:',
    'constellation.connections': '연결 수:',
    'constellation.viewDetails': '전체 해체 문서 보기 →',

    // 04 Dossiers
    'dossiers.tag': '04 // 심층 연구',
    'dossiers.title': '시각 언어 연구 문서',
    'dossiers.subtitle': '구도와 조명의 원리를 철저히 분석하는 케이스 스터디.',
    'dossiers.readCase': '문서 읽기 →',

    // 05 Lab
    'lab.tag': '05 // 실험적 편집',
    'lab.title': '시각 연구소 & 스토리보드',
    'lab.subtitle': '장면을 자유롭게 배열하여 와이드스크린 타임라인을 구성.',
    'lab.timeline': '현재 타임라인',
    'lab.timelineDesc': '스케일과 명암의 대비를 통해 서사적 긴장감을 구축.',
    'lab.exportStoryboard': '스토리보드 스크립트 내보내기',
    'lab.keyScene': '핵심 장면',
    'lab.opticalRig': '광학 리그',
    'lab.directorNote': '연출 노트',

    // 06 About
    'about.tag': '06 // 존재 선언문',
    'about.title': '존재의 이유',
    'about.subtitle': '생성형 AI 시대 이미지의 평범화에 맞서는 선언.',
    'about.h1': '이미지는 단순한 그림이 아닙니다.',
    'about.h2': '정밀한 시스템입니다.',
    'about.p1': '일반 갤러리는 끝없는 스크롤로 소비될 뿐입니다. 이미지가 왜 전율을 일으키는지 알지 못합니다.',
    'about.p2': 'VISUAL ATLAS의 확신: 걸작 영화의 장면은 조명 비율, 렌즈 초점, 기하학, 색채 극차로 정밀하게 축조된 언어 체계입니다. 이 문법을 해체해야만 진정한 걸작을 창작할 수 있습니다.',
    'about.discoverArchive': '아카이브 탐색 →',
    'about.anatomy': '영화 언어 해체 층위',
    'about.step1': '광자, 음영, 볼류메트릭 감쇄와 명암비.',
    'about.step2': '색상 극차와 필름 에멀전 질감.',
    'about.step3': '네거티브 스페이스, 스케일감과 1점 투시.',
    'about.step4': '광학 초점, 아나모픽 줄무늬와 180도 셔터 각도.',
    'about.step5': '리듬, 트래킹 속도와 의도적 정적.',
    'about.step6': '실존적 고독, 숭고한 경외감과 무의식적 공명.',
    'about.constitution': '반 AI 획일화 헌장',
    'about.principlesTitle': '디자인 원칙 및 미학적 절제',
    'about.curatedBy': '비주얼 아키텍트와 영화 촬영감독의 공동 큐레이션',
    'about.swissEdition': '스위스 국제 타이포그래피 시스템 · 2026',

    // AI Cockpit
    'ai.tag': '07 // 기계 지능 레이어',
    'ai.title': 'AI 시각 온톨로지 콕핏',
    'ai.subtitle': '영화 촬영 문법을 최신 생성 AI 모델과 LLM에 연결하는 구조화된 브릿지.',
    'ai.modelSelect': '대상 엔진 선택:',
    'ai.copyPrompt': '모델 맞춤 프롬프트 복사',
    'ai.downloadJson': '전체 지식 그래프 JSON 다운로드',
    'ai.llmsTxt': 'llms.txt 규격 검사',

    // Command Palette
    'cmd.placeholder': '장면, 시각 DNA, 카메라 매개변수 검색 (ESC)...',
    'cmd.jumpTo': '이동:',
    'cmd.noResults': '일치하는 시각 아카이브가 없습니다',

    // Footer
    'footer.edition': '// 2026 소장본',
    'footer.loop': '보고 → 해체하고 → 연결하고 → 수집하고 → 창작한다',
    'footer.cms': '큐레이터 관리',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('visual_atlas_lang');
      if (saved === 'en' || saved === 'zh' || saved === 'ja' || saved === 'ko') {
        return saved === 'zh' ? 'zh' : (saved as Language);
      }
      return 'zh';
    } catch {
      return 'zh';
    }
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('visual_atlas_lang', newLang);
    } catch {}
  };

  const toggleLang = () => {
    // 4-way cycle: zh -> en -> ja -> ko -> zh
    const order: Language[] = ['zh', 'en', 'ja', 'ko'];
    const nextIdx = (order.indexOf(lang) + 1) % order.length;
    setLang(order[nextIdx]);
  };

  const t = (key: string, params?: Record<string, string | number>): string => {
    let text = translations[lang]?.[key] || translations['zh']?.[key] || translations['en']?.[key] || key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(new RegExp(`%${k}%`, 'g'), String(v));
      });
    }
    return text;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
