import type {
  VisualKnowledgeGraph,
  VisualKnowledgeAtom,
  KnowledgeGraphEdge,
  VisualOntologyCategory
} from '../types/knowledge';

export const ONTOLOGY_CATEGORIES: { id: VisualOntologyCategory; label: { en: string; 'zh-CN': string; ja: string; ko: string }; desc: { en: string; 'zh-CN': string; ja: string; ko: string } }[] = [
  {
    id: 'mood',
    label: { en: 'Mood & Atmosphere', 'zh-CN': '情绪与氛围', ja: 'ムード＆大気感', ko: '분위기 및 정서' },
    desc: { en: 'Psychological resonance, tension, isolation, and cinematic melancholy.', 'zh-CN': '心理共振、张力沉浸、孤独感与电影级诗意氛围。', ja: '心理的共鳴、緊張感、詩的な孤独と映画的ムード。', ko: '심리적 공명, 긴장감, 고독 및 영화적 분위기.' }
  },
  {
    id: 'lighting',
    label: { en: 'Lighting Vector', 'zh-CN': '光影矢量', ja: 'ライティング・ベクトル', ko: '조명 벡터' },
    desc: { en: 'Chiaroscuro, volumetric haze, rim illumination, and falloff ratios.', 'zh-CN': '明暗对照法、体积光丁达尔、边缘轮廓光与光衰比率。', ja: 'キアロスクーロ、ボリューム光、エッジライトと光量減衰。', ko: '키아로스쿠로, 볼류메트릭 안개, 림 라이팅 및 감쇠 비율.' }
  },
  {
    id: 'color',
    label: { en: 'Color Harmony', 'zh-CN': '色彩对撞与调和', ja: '色彩調和と対比', ko: '색채 조화 및 대비' },
    desc: { en: 'Complementary gamut clashes, split-toning, and calibrated cinematic LUTs.', 'zh-CN': '冷暖补色极差、分离色调与电影级工业调色校准。', ja: '補色対比、スプリットトーニング、映画的LUTカラー。', ko: '보색 대비, 스플릿 토닝 및 영화적 LUT 보정.' }
  },
  {
    id: 'camera',
    label: { en: 'Optics & Rig', 'zh-CN': '机位与光学机械', ja: '光学機器＆レンズ', ko: '광학 및 카메라 리그' },
    desc: { en: 'Anamorphic flare, shallow depth of field, shutter angles, and sensor geometry.', 'zh-CN': '变形宽银幕眩光、浅景深、180度快门角与画幅传感器规格。', ja: 'アナモルフィック・フレア、浅い被写界深度、180度シャッター。', ko: '아나모픽 플레어, 얕은 심도, 180도 셔터 각도.' }
  },
  {
    id: 'composition',
    label: { en: 'Compositional Syntax', 'zh-CN': '构图语法', ja: '構図構文論', ko: '구도 문법' },
    desc: { en: 'Golden ratios, negative space voids, leading vectors, and frame-within-frame.', 'zh-CN': '黄金分割、留白负空间、视线引导线与框式画中画。', ja: '黄金比、ネガティブスペース、視線誘導とフレームインフレーム。', ko: '황금 비율, 음의 여백, 유도선 및 프레임 인 프레임.' }
  },
  {
    id: 'space',
    label: { en: 'Spatial Scale', 'zh-CN': '空间尺度', ja: '空間スケール', ko: '공간 스케일' },
    desc: { en: 'Brutalist monoliths, claustrophobic corridors, and infinite atmospheric horizons.', 'zh-CN': '粗野主义巨构建筑、密闭走廊与无限延伸的深远地平线。', ja: 'ブルータリズム巨像、閉所恐怖的通路、無限の地平線。', ko: '브루탈리즘 거대 건축, 폐쇄된 통로, 무한한 지평선.' }
  },
  {
    id: 'texture',
    label: { en: 'Materiality & Texture', 'zh-CN': '材质肌理', ja: 'マテリアル質感', ko: '재질 및 질감' },
    desc: { en: 'Wet asphalt specularity, raw cast concrete, brushed metals, and film grain.', 'zh-CN': '潮湿柏油高光反射、清水混凝土质感、拉丝金属与胶片颗粒。', ja: '濡れたアスファルトの光沢、打ち放しコンクリート、フィルムグレイン。', ko: '젖은 아스팔트 반사광, 노출 콘크리트, 브러시드 메탈 및 필름 그레인.' }
  },
  {
    id: 'era',
    label: { en: 'Aesthetic Movement', 'zh-CN': '时代美学流派', ja: '美学潮流', ko: '미학 운동' },
    desc: { en: 'Cyberpunk Noir, Brutalism, Baroque Grandeur, and Minimalist Quietude.', 'zh-CN': '赛博暗黑、粗野主义、巴洛克庄严与极简主义禅意。', ja: 'サイバーパンク・ノワール、ブルータリズム、バロック的壮麗。', ko: '사이버펑크 누아르, 브루탈리즘, 바로크적 웅장함.' }
  },
  {
    id: 'movement',
    label: { en: 'Kinetic Energy', 'zh-CN': '动力学运镜', ja: '動的カメラワーク', ko: '운동학적 연출' },
    desc: { en: 'Slow dolly creeps, hyper-speed light streaks, and static observational rigor.', 'zh-CN': '慢速推进推轨、超高速车流拖影与绝对静止的审视机位。', ja: '低速ドリー、光速の光跡、静止した観測的アングル。', ko: '슬로우 돌리 이동, 고속 광선 궤적, 정적 관찰 구도.' }
  }
];

export const CANONICAL_KNOWLEDGE_ATOMS: VisualKnowledgeAtom[] = [
  {
    id: 'visual.lighting.chiaroscuro',
    category: 'lighting',
    name: {
      en: 'Chiaroscuro & Low-Key Lighting',
      'zh-CN': '明暗对照与暗调压暗',
      ja: 'キアロスクーロ＆ローキー照明',
      ko: '키아로스쿠로 및 로우키 조명'
    },
    definition: {
      en: 'High contrast ratio between illuminated and shaded areas, generating extreme dramatic gravity and spatial isolation.',
      'zh-CN': '高对比度光暗落差，以强烈阴影衬托受光面，创造极具戏剧性的视觉张力与孤独感。',
      ja: '明部と暗部の極端なコントラストにより、劇的な重厚感と空間的孤立を生み出す技法。',
      ko: '밝은 부분과 어두운 부분 사이의 극적인 명암비로 강렬한 드라마와 고립감을 형성하는 기법.'
    },
    visualSignifiers: ['Deep crushed blacks', 'Carved volumetric edge', '8:1 contrast ratio', 'Moody falloff'],
    promptTokens: {
      midjourney: 'chiaroscuro lighting, deep dramatic shadows, 8:1 lighting contrast, Rembrandt falloff, volumetric darkness, cinematic rim light --ar 2.39:1',
      sdxl: '(chiaroscuro:1.3), high contrast dark aesthetic, dramatic low-key lighting, deep carved shadows, subtle rim edge',
      flux: 'Extreme chiaroscuro lighting scheme, precise light falloff, deep textured shadows, cinematic key light from 45 degree angle',
      universalKeywords: ['chiaroscuro', 'low-key lighting', 'dramatic falloff', 'carved shadows', 'high contrast']
    },
    technicalSpecs: {
      ratio: '8:1 to 16:1',
      lightFalloff: 'Inverse Square with hard barn doors',
      colorTemperature: '3200K key vs 6500K ambient'
    },
    relatedConceptIds: ['visual.color.cold-warm-clash', 'visual.mood.cyber-melancholy', 'visual.composition.negative-space'],
    associatedSceneIds: ['scene-cyber-rain-01', 'scene-neon-highway-03', 'scene-industrial-terminal-08']
  },
  {
    id: 'visual.color.cold-warm-clash',
    category: 'color',
    name: {
      en: 'Cold-Warm Chromatic Clash',
      'zh-CN': '冷暖补色极差对撞',
      ja: '寒暖補色対比',
      ko: '한난 보색 대비'
    },
    definition: {
      en: 'Juxtaposition of complementary hues (e.g. electric cyan vs incandescent amber), carving depth through color temperature opposition.',
      'zh-CN': '利用超过150度色相差的冷青与暖琥珀交织，以色温对立在雨夜或暗调中撕裂景深空间。',
      ja: 'エレクトリック・シアンと温かみのあるアンバーを対置し、色温度差で奥行きを彫刻する技法。',
      ko: '전기 시안과 따뜻한 호박색을 대비시켜 색온도 차이로 공간의 깊이감을 조각하는 기법.'
    },
    visualSignifiers: ['Cyan and amber clash', 'Split-toning', 'Wet floor chromatic reflections', 'Dual temperature keys'],
    promptTokens: {
      midjourney: 'teal and orange color grade, split complementary lighting, electric cyan rim light with warm tungsten practical lanterns --stylize 350',
      sdxl: 'cyan and amber split tone, rich chromatic contrast, cinematic color grading, vibrant neon accents on matte dark background',
      flux: 'Dual-chromatic illumination, calibrated electric teal and deep warm amber, complementary color clash',
      universalKeywords: ['teal and amber', 'split toning', 'chromatic clash', 'complementary contrast']
    },
    technicalSpecs: {
      colorTemperature: '2700K tungsten practicals vs 8500K neon tubes'
    },
    relatedConceptIds: ['visual.lighting.chiaroscuro', 'visual.texture.wet-asphalt'],
    associatedSceneIds: ['scene-cyber-rain-01', 'scene-neon-highway-03']
  },
  {
    id: 'visual.space.brutalist-monolith',
    category: 'space',
    name: {
      en: 'Brutalist Monolithic Scale',
      'zh-CN': '粗野主义巨构尺度',
      ja: 'ブルータリズム巨構スケール',
      ko: '브루탈리즘 모놀리스 스케일'
    },
    definition: {
      en: 'Monumental geometric concrete architecture dwarfing human occupants, cultivating existential reverence and spatial awe.',
      'zh-CN': '以未粉刷的清水混凝土与崇高几何巨构衬托微渺个体，引发存在主义沉思与空间压迫感。',
      ja: '未加工のコンクリートと巨大な幾何学建築が人間を圧倒し、崇高な静寂をもたらす造形。',
      ko: '가공되지 않은 노출 콘크리트와 거대한 기하학적 건축이 인간을 압도하는 숭고미.'
    },
    visualSignifiers: ['Massive fluted pillars', 'Human figure for scale comparison', 'Monochromatic palette', 'God rays'],
    promptTokens: {
      midjourney: 'brutalist concrete architecture, colossal geometric monolith, tiny human silhouette for scale, monumental scale, cinematic god ray from ceiling skylight --ar 16:9 --v 6.1',
      sdxl: 'raw brutalist concrete interior, massive monolithic pillars, miniature human subject, grand architectural volume, dust motes in sunlight',
      flux: 'Ultra-wide angle photo of brutalist concrete rotunda, monumental fluted walls, architectural solitude',
      universalKeywords: ['brutalism', 'monolith', 'concrete architecture', 'monumental scale', 'god rays']
    },
    technicalSpecs: {
      focalLengthRange: '18mm to 24mm ultra-wide lens'
    },
    relatedConceptIds: ['visual.composition.negative-space', 'visual.lighting.god-ray', 'visual.texture.raw-concrete'],
    associatedSceneIds: ['scene-brutalist-02', 'scene-baroque-cathedral-06']
  },
  {
    id: 'visual.lighting.god-ray',
    category: 'lighting',
    name: {
      en: 'Volumetric Crepuscular Ray (God Ray)',
      'zh-CN': '体积光与丁达尔神圣光束',
      ja: '薄明光線（ゴッドレイ・チンダル光）',
      ko: '볼류메트릭 틴들 광선 (갓 레이)'
    },
    definition: {
      en: 'Visible shafts of sunlight or key light cutting through airborne particulate or mist, evoking spiritual grandeur.',
      'zh-CN': '光束穿越空气中的悬浮微尘或雾气产生丁达尔效应，形成指向性极强的神圣体积光芒。',
      ja: '空気中の微粒子や靄を透過する光の束（チンダル現象）が神聖なスケール感を生み出す効果。',
      ko: '공기 중의 먼지나 안개를 통과하는 빛의 줄기가 신성하고 웅장한 분위기를 연출하는 기법.'
    },
    visualSignifiers: ['Collimated light shafts', 'Floating dust motes', 'Atmospheric haze', 'High contrast floor pool'],
    promptTokens: {
      midjourney: 'visible volumetric god rays, sunbeam piercing through skylight, atmospheric floating dust particles, heavenly dramatic lighting --v 6.1',
      sdxl: 'crepuscular rays, volumetric fog lighting, sharp light beam piercing shadow, particles suspended in air',
      flux: 'Precise collimated shaft of sunlight cutting through dark interior haze, cinematic volumetric Tyndall effect',
      universalKeywords: ['god rays', 'crepuscular rays', 'volumetric fog', 'tyndall effect']
    },
    relatedConceptIds: ['visual.space.brutalist-monolith', 'visual.mood.ethereal-solitude'],
    associatedSceneIds: ['scene-brutalist-02', 'scene-mist-forest-05', 'scene-baroque-cathedral-06']
  },
  {
    id: 'visual.composition.negative-space',
    category: 'composition',
    name: {
      en: 'Negative Space & Tension Void',
      'zh-CN': '留白张力与虚空结构',
      ja: 'ネガティブスペース＆余白の緊張感',
      ko: '네거티브 스페이스 및 여백의 긴장감'
    },
    definition: {
      en: 'Deliberate allocation of unoccupied space around the focal subject to heighten isolation, contemplation, and weight.',
      'zh-CN': '刻意在视觉焦点周围留出大面积虚空，以空间留白放大主体的孤绝感与审美张力。',
      ja: '主題の周囲に広大な余白を意図的に配置し、孤独感と視覚的緊張感を高める構図法。',
      ko: '피사체 주변에 의도적으로 넓은 여백을 두어 고립감과 시각적 긴장감을 극대화하는 구도.'
    },
    visualSignifiers: ['Subject occupies < 10% frame', 'Expansive clean backdrop', 'Off-center placement', 'Breathing room'],
    promptTokens: {
      midjourney: 'minimalist composition, vast empty negative space, solitary figure off-center, cinematic solitude, clean aesthetic horizon --ar 2.39:1',
      sdxl: 'rule of thirds negative space, minimal subject isolated in vast void, atmospheric breathing room',
      flux: 'Extreme negative space framing, isolated subject in lower-third, minimalist cinematic tranquility',
      universalKeywords: ['negative space', 'minimalist framing', 'isolated subject', 'void composition']
    },
    relatedConceptIds: ['visual.space.brutalist-monolith', 'visual.mood.ethereal-solitude'],
    associatedSceneIds: ['scene-brutalist-02', 'scene-desert-dune-04', 'scene-mist-forest-05']
  },
  {
    id: 'visual.texture.wet-asphalt',
    category: 'texture',
    name: {
      en: 'Wet Asphalt Specularity',
      'zh-CN': '湿漉沥青镜面反射',
      ja: '濡れたアスファルトの鏡面反射',
      ko: '젖은 아스팔트 거울 반사'
    },
    definition: {
      en: 'Rain-soaked ground acting as a secondary dynamic lighting canvas, mirroring signage flares with micro-roughness.',
      'zh-CN': '雨水漫渍的柏油路面化作第二张动态画卷，以微粗糙度镜面延展霓虹光源与倒影。',
      ja: '雨に濡れた道路が第二の光源となり、ネオンの光条を微小な粗さで反射するテクスチャ表現。',
      ko: '비에 젖은 아스팔트 도로가 네온과 불빛을 미세한 거칠기로 반사하여 깊이감을 배가시키는 질감.'
    },
    visualSignifiers: ['Puddle reflections', 'Stretched vertical light flares', 'Rough asphalt specularity', 'Rain droplet ripples'],
    promptTokens: {
      midjourney: 'wet rain-slicked asphalt road, mirror reflections of neon signs, water puddles, sharp macro texture of wet bitumen --stylize 250',
      sdxl: 'rain soaked street surface, mirror water reflections, glossy wet pavement, rain splashes and droplets',
      flux: 'Wet asphalt texture with authentic specular highlights and puddle reflections of colored light',
      universalKeywords: ['wet asphalt', 'puddle reflections', 'rain-slicked', 'specular road']
    },
    relatedConceptIds: ['visual.color.cold-warm-clash', 'visual.lighting.chiaroscuro'],
    associatedSceneIds: ['scene-cyber-rain-01', 'scene-neon-highway-03']
  },
  {
    id: 'visual.camera.anamorphic-streak',
    category: 'camera',
    name: {
      en: 'Anamorphic Lens Flare & Oval Bokeh',
      'zh-CN': '变形宽银幕横向眩光与椭圆光斑',
      ja: 'アナモルフィック・フレア＆楕円ボケ',
      ko: '아나모픽 렌즈 플레어 및 타원형 보케'
    },
    definition: {
      en: 'Horizontal blue/cyan streak flare and distinctive oval out-of-focus highlights unique to anamorphic cine optics.',
      'zh-CN': '变形宽银幕柱面镜片带来的独特横向水平光斑拉丝与高长宽比椭圆形失焦散景。',
      ja: 'アナモルフィックシネマレンズ特有の水平ブルーフレアと楕円形のアウトフォーカスボケ。',
      ko: '아나모픽 시네마 렌즈 특유의 수평 블루 플레어와 타원형 아웃포커스 보케 효과.'
    },
    visualSignifiers: ['Horizontal streak flare', 'Oval bokeh orbs', 'Edge barrel curvature', 'Cinema 2.39:1 scope'],
    promptTokens: {
      midjourney: 'shot on anamorphic lens, horizontal blue streak flares, oval bokeh background, cinematic 2.39:1 aspect ratio, Panavision C-Series look',
      sdxl: 'anamorphic lens optical flares, horizontal blue streak, oval bokeh rings, cinematic widescreen frame',
      flux: 'Authentic 35mm anamorphic prime lens artifact, horizontal cyan streak flare across sensor, oval bokeh',
      universalKeywords: ['anamorphic lens', 'blue streak flare', 'oval bokeh', '2.39:1']
    },
    technicalSpecs: {
      ratio: '2.39:1 Cinemascope',
      shutterAngle: '180 degree (1/48s at 24fps)'
    },
    relatedConceptIds: ['visual.lighting.chiaroscuro', 'visual.movement.slow-dolly'],
    associatedSceneIds: ['scene-cyber-rain-01', 'scene-neon-highway-03', 'scene-metropolis-aerial-07']
  },
  {
    id: 'visual.movement.slow-dolly',
    category: 'movement',
    name: {
      en: 'Slow Dolly Creep & Z-Axis Travel',
      'zh-CN': '慢速推轨与Z轴纵深行进',
      ja: '低速ドリー＆Z軸トラベル',
      ko: '슬로우 돌리 및 Z축 이동'
    },
    definition: {
      en: 'Imperceptible forward or lateral camera progression on tracks, inducing hypnotic absorption without visual jarring.',
      'zh-CN': '几乎不易察觉的微速轨道推进，引导观者视线平稳穿透画面景深层级，带来催眠般的沉浸体验。',
      ja: 'レール上を極めてゆっくりと前進するカメラワークで、観客を催眠的な没入感へと引き込む手法。',
      ko: '눈에 띄지 않을 정도로 부드러운 전진 이동으로 관객을 깊은 몰입감으로 이끄는 카메라 연출.'
    },
    visualSignifiers: ['Parallax layer shift', 'Smooth steady acceleration', 'Subject isolation from background', 'Zero hand shake'],
    promptTokens: {
      midjourney: 'slow cinematic camera tracking forward, steady dolly movement, deep perspective parallax shift --v 6.1',
      sdxl: 'smooth dolly in camera angle, continuous tracking perspective, cinematic steady movement',
      flux: 'Controlled mechanical dolly forward track along the central perspective axis',
      universalKeywords: ['slow dolly', 'tracking shot', 'parallax perspective', 'smooth movement']
    },
    relatedConceptIds: ['visual.camera.anamorphic-streak', 'visual.composition.leading-lines'],
    associatedSceneIds: ['scene-cyber-rain-01', 'scene-brutalist-02', 'scene-desert-dune-04', 'scene-baroque-cathedral-06']
  },
  {
    id: 'visual.composition.leading-lines',
    category: 'composition',
    name: {
      en: 'Dynamic Leading Convergence Lines',
      'zh-CN': '透视视线引导线与灭点聚合',
      ja: 'パースペクティブ誘導線＆消失点収束',
      ko: '원근 유도선 및 소실점 수렴'
    },
    definition: {
      en: 'Linear structural features that guide viewer gaze decisively toward the focal vanishing point.',
      'zh-CN': '利用建筑结构、道路边缘或光影明暗交界线汇聚成透视灭点，强有力牵引观者的视觉行进路径。',
      ja: '建築構造や道路の境界線が消失点に向かって収束し、鑑賞者の視線を強く引き寄せる構図。',
      ko: '건축선이나 도로 경계가 소실점으로 수렴하여 관객의 시선을 피사체로 집중시키는 구도.'
    },
    visualSignifiers: ['One-point perspective', 'Converging diagonal vectors', 'Vanishing point lock', 'Structural rhythm'],
    promptTokens: {
      midjourney: 'one point perspective, dynamic leading lines converging to center vanishing point, symmetrical composition --ar 16:9',
      sdxl: 'strong leading lines, geometric perspective convergence, powerful vanishing point structure',
      flux: 'Rigorous linear perspective with vanishing lines drawing the eye directly into the frame depth',
      universalKeywords: ['leading lines', 'one-point perspective', 'vanishing point', 'geometric convergence']
    },
    relatedConceptIds: ['visual.space.brutalist-monolith', 'visual.movement.slow-dolly'],
    associatedSceneIds: ['scene-neon-highway-03', 'scene-industrial-terminal-08']
  },
  {
    id: 'visual.mood.ethereal-solitude',
    category: 'mood',
    name: {
      en: 'Ethereal Solitude & Atmospheric Mist',
      'zh-CN': '空灵孤绝与幽微雾气',
      ja: '幽玄なる孤独と大気霧',
      ko: '공허한 고독 및 신비로운 안개'
    },
    definition: {
      en: 'A quiet, meditative state of suspension created by low-contrast diffused tones, layered mists, and solitary sentinels.',
      'zh-CN': '低对比度漫射柔光、层叠晨雾与极简孤立主体共同构筑的冥想式超然定境。',
      ja: '低コントラストの拡散光と重なり合う朝霧、孤立した主体がもたらす瞑想的で超越的な静寂。',
      ko: '확산된 부드러운 빛과 겹겹의 안개, 고립된 피사체가 만들어내는 명상적 고요.'
    },
    visualSignifiers: ['Layered distance haze', 'Diffused soft horizon', 'Monochrome calm', 'Subdued desaturation'],
    promptTokens: {
      midjourney: 'ethereal mist atmosphere, quiet meditative solitude, misty morning pine trees, soft overcast daylight, poetic quietude --ar 16:9',
      sdxl: 'dense low fog, serene ethereal landscape, minimalist muted colors, quiet morning solitude',
      flux: 'Atmospheric ethereal landscape shrouded in morning fog, serene stillness, subtle desaturated tonal range',
      universalKeywords: ['ethereal mist', 'quiet solitude', 'meditative calm', 'diffused light']
    },
    relatedConceptIds: ['visual.lighting.god-ray', 'visual.composition.negative-space'],
    associatedSceneIds: ['scene-desert-dune-04', 'scene-mist-forest-05', 'scene-astral-abyss-09']
  }
];

export const CANONICAL_KNOWLEDGE_EDGES: KnowledgeGraphEdge[] = [
  { source: 'visual.lighting.chiaroscuro', target: 'visual.color.cold-warm-clash', relationship: 'co_occurs_with', weight: 0.85 },
  { source: 'visual.lighting.chiaroscuro', target: 'visual.texture.wet-asphalt', relationship: 'influences', weight: 0.9 },
  { source: 'visual.lighting.chiaroscuro', target: 'visual.camera.anamorphic-streak', relationship: 'co_occurs_with', weight: 0.75 },
  { source: 'visual.space.brutalist-monolith', target: 'visual.composition.negative-space', relationship: 'exhibits', weight: 0.95 },
  { source: 'visual.space.brutalist-monolith', target: 'visual.lighting.god-ray', relationship: 'co_occurs_with', weight: 0.88 },
  { source: 'visual.space.brutalist-monolith', target: 'visual.movement.slow-dolly', relationship: 'influences', weight: 0.7 },
  { source: 'visual.composition.negative-space', target: 'visual.mood.ethereal-solitude', relationship: 'derives_from', weight: 0.92 },
  { source: 'visual.lighting.god-ray', target: 'visual.mood.ethereal-solitude', relationship: 'influences', weight: 0.82 },
  { source: 'visual.composition.leading-lines', target: 'visual.movement.slow-dolly', relationship: 'co_occurs_with', weight: 0.8 },
  { source: 'visual.camera.anamorphic-streak', target: 'visual.texture.wet-asphalt', relationship: 'co_occurs_with', weight: 0.86 },
  { source: 'visual.color.cold-warm-clash', target: 'visual.texture.wet-asphalt', relationship: 'influences', weight: 0.94 }
];

export const CANONICAL_KNOWLEDGE_GRAPH: VisualKnowledgeGraph = {
  version: '2.0.0',
  lastUpdated: '2026-09-06',
  ontologyCategories: ['mood', 'lighting', 'color', 'camera', 'composition', 'space', 'texture', 'era', 'movement'],
  nodes: CANONICAL_KNOWLEDGE_ATOMS,
  edges: CANONICAL_KNOWLEDGE_EDGES
};

export function getAtomById(id: string): VisualKnowledgeAtom | undefined {
  return CANONICAL_KNOWLEDGE_ATOMS.find(a => a.id === id);
}

export function getAtomsByCategory(category: VisualOntologyCategory): VisualKnowledgeAtom[] {
  return CANONICAL_KNOWLEDGE_ATOMS.filter(a => a.category === category);
}

export function getAtomsForScene(sceneId: string): VisualKnowledgeAtom[] {
  return CANONICAL_KNOWLEDGE_ATOMS.filter(a => a.associatedSceneIds.includes(sceneId));
}

export function getRelatedAtoms(atomId: string): VisualKnowledgeAtom[] {
  const atom = getAtomById(atomId);
  if (!atom) return [];
  return CANONICAL_KNOWLEDGE_ATOMS.filter(a => atom.relatedConceptIds.includes(a.id));
}
