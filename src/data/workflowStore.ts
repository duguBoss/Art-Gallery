import type { AIImageCase, AIVideoWorkflow } from '../types/art';

const STORAGE_KEY_IMAGE_CASES = 'art_gallery_ai_image_cases_v3';
const STORAGE_KEY_VIDEO_WORKFLOWS = 'art_gallery_ai_video_workflows_v3';
const STORAGE_KEY_ADMIN_AUTH = 'art_gallery_admin_authed_v1';

export const DEFAULT_IMAGE_CASES: AIImageCase[] = [
  // ==================== 1. 暖夜温馨与人间烟火 (Cozy Night & Warm Glow) ====================
  {
    id: 'img-cozy-hearth-01',
    title: '暖夜壁炉与老木屋读书角',
    category: '暖夜温馨',
    badge: '暖光治愈',
    description: '窗外细雨敲打着窗棂，壁炉内松木轻微噼啪作响，老皮椅与冒着热气的红茶，空气中充满宁静与安全感。',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
    tags: ['暖夜壁炉', '温馨居所', '雨夜读本', '老木屋', '琥珀暖光'],
    promptBlocks: {
      subject: 'a cozy reading nook inside an old rustic wooden cabin, crackling stone fireplace, comfortable leather armchair, steaming mug of hot tea on wooden side table, rainy window panes overlooking misty pine forest at dusk',
      style: 'warm cinematic lighting photography, cozy atmospheric concept art, storybook realism',
      texture: 'aged oak wood grain, soft knitted wool blanket texture, warm glowing embers, raindrops on glass',
      lighting: 'warm amber lantern glow, dancing fireplace firelight, deep cozy shadows, volumetric light rays',
      composition: 'intimate medium interior shot, eye-level framing, shallow depth of field, 35mm lens render',
      parameters: '--ar 16:9 --v 6.1 --stylize 350',
      negative: 'harsh cold blue light, modern sterile stainless steel, neon, chaotic clutter, overexposed',
    },
    fullPrompt: 'Cozy reading nook inside an antique wooden cabin, warm crackling stone fireplace with glowing embers, vintage leather armchair draped with hand-knitted woolen throw, steaming ceramic mug, dark rainy night outside visible through misty window, warm amber candlelight, soft shadow falloff, cinematic 35mm photography, comforting aesthetic --ar 16:9 --v 6.1 --stylize 350',
    createdDate: '2026-09-04',
    author: '策展部 AI 实验室',
  },
  {
    id: 'img-vox-01',
    title: 'VOX 3D体素微缩居酒屋街角',
    category: '暖夜温馨',
    badge: '立体像素',
    description: '采用 MagicaVoxel 物理光追渲染的正交等轴 3D 箱庭，微距景深与暖黄红灯笼温暖反光。',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    tags: ['VOX', '3D像素', '居酒屋', '等轴透视', '暖夜街角'],
    promptBlocks: {
      subject: 'miniature Japanese ramen izakaya street corner, glowing red paper lanterns, steam gently rising from soup pot, wooden counter stools',
      style: 'VOX 3D voxel art, MagicaVoxel aesthetic, isometric orthographic projection',
      texture: 'cubic micro blocks, glossy wet asphalt reflections, smooth matte plastic bricks, paper lantern texture',
      lighting: 'volumetric ray-tracing lighting, warm amber neon glow, soft ambient occlusion, cozy nighttime warmth',
      composition: 'isometric tilt-shift photography, centered diorama floating island, 8k Octane render',
      parameters: '--ar 16:9 --v 6.1 --stylize 300',
      negative: '2D flat illustration, smooth curved realistic surfaces, messy artifacts, noisy photorealism',
    },
    fullPrompt: 'Detailed 3D voxel art diorama, MagicaVoxel aesthetic, isometric view of miniature Japanese ramen izakaya street corner, glowing paper lanterns, steam rising from boiling pot, cubic micro blocks, glossy wet asphalt reflections, volumetric ray-tracing lighting, warm amber neon glow, tilt-shift macro lens, 8k Octane render --ar 16:9 --v 6.1 --stylize 300',
    createdDate: '2026-09-04',
    author: '策展部 AI 实验室',
  },
  {
    id: 'img-cozy-cafe-01',
    title: '雨夜巴黎暖光街角咖啡馆',
    category: '暖夜温馨',
    badge: '胶片质感',
    description: '石板路上倒映着暖黄色橱窗光晕，黄铜吊灯、深红丝绒长椅与轻柔爵士乐弥漫的深夜庇护所。',
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
    tags: ['巴黎咖啡馆', '雨夜暖灯', '胶片怀旧', '石板路', '浪漫法式'],
    promptBlocks: {
      subject: 'a warm illuminated Parisian bistro cafe corner at night in light rain, brass pendant lamps, mahogany wooden tables, vintage espresso machine, patrons enjoying conversation inside through foggy steamed glass windows',
      style: 'cinematic vintage film photography, Kodak Portra 400 warmth, French romanticism',
      texture: 'wet cobblestone reflections, fogged window glass with delicate condensation drops, aged brass',
      lighting: 'rich warm tungsten lamp light, glowing amber interior, soft contrast, dark moody wet exterior',
      composition: 'street view looking in, rule of thirds, atmospheric leading lines, cinematic 50mm f/1.4 lens',
      parameters: '--ar 16:9 --v 6.1 --stylize 280',
      negative: 'daylight, cartoon, high saturation neon, modern glass skyscraper, overprocessed digital look',
    },
    fullPrompt: 'Cozy Parisian café at night in gentle drizzle, glowing golden amber windows casting reflections on wet cobblestone street, dark romantic atmosphere outside, warm bustling bistro interior visible through misted glass, cinematic film grain, Kodak Portra color grading, poetic mood --ar 16:9 --v 6.1 --stylize 280',
    createdDate: '2026-09-04',
    author: '策展部 AI 实验室',
  },
  {
    id: 'img-clay-01',
    title: '粘土定格森林奇遇小熊茶会',
    category: '童话治愈',
    badge: '软萌雕塑',
    description: '纯手工捏塑油泥质感，指纹印痕微距特写，暖调摄影柔光箱下的森林深处童趣秘境。',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
    tags: ['粘土定格', '阿德曼动画', '手工指纹', '治愈微缩', '童话森林'],
    promptBlocks: {
      subject: 'cute chubby clay bear and bunny having tea party around a tree stump table in a mossy enchanted autumn forest, miniature ceramic teacups and berry tart',
      style: 'claymation stop-motion animation, Aardman Studios aesthetic, handcrafted clay model',
      texture: 'soft matte plasticine, visible artisan fingerprints, smooth sculpted felt moss, miniature wool craft',
      lighting: 'warm studio softbox key light, gentle ambient backlight rim on clay edges, warm storybook glow',
      composition: 'macro tilt-shift photography, shallow focus on teacups, low angle storybook perspective',
      parameters: '--ar 16:9 --v 6.1 --stylize 200',
      negative: 'glossy 3D CGI plastic, sharp metallic edges, photorealistic fur, photorealistic human skin',
    },
    fullPrompt: 'Charming handcrafted claymation diorama, adorable stylized clay animals having tea in whimsical mossy forest, warm afternoon softbox lighting, authentic tactile plasticine clay texture with subtle artisan fingerprints, shallow depth of field, stop-motion animated movie still --ar 16:9 --v 6.1 --stylize 200',
    createdDate: '2026-09-04',
    author: '策展部 AI 实验室',
  },

  // ==================== 2. 东方禅意与写意烟雨 (Oriental & Zen Aesthetic) ====================
  {
    id: 'img-ink-01',
    title: '东方烟雨孤舟水墨留白',
    category: '东方意境',
    badge: '气韵生动',
    description: '宣纸自然渗墨肌理，浓淡干湿焦五色层次，计白当黑的空灵宋明禅宗意境。',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    tags: ['水墨', '东方写意', '留白', '宋明美学', '宣纸渗化'],
    promptBlocks: {
      subject: 'a solitary wooden boat drifting on a vast misty lake, distant layered mountain silhouettes, lonely gnarled pine tree',
      style: 'Traditional Chinese ink wash painting, Sumi-e oriental masterwork, Southern Song dynasty style',
      texture: 'raw xuan paper fiber grain, mineral ink bleeding edge, dry brush strokes, atmospheric ink splatter',
      lighting: 'diffused natural morning mist, soft gradient fog, ambient glow through clouds, high negative space',
      composition: 'poetic asymmetric composition, large negative space breathing room, scroll painting layout',
      parameters: '--ar 16:9 --v 6.1 --stylize 400',
      negative: 'western oil impasto, modern neon colors, photographic hyperrealism, 3D CGI rendering, crowded composition',
    },
    fullPrompt: 'Masterpiece Chinese ink wash painting, solitary wooden sampan drifting on a serene misty lake, distant layered mountain peaks disappearing in morning fog, Southern Song dynasty imperial academy style, rich ink tones on aged Xuan paper, profound Zen negative space, poetic tranquility --ar 16:9 --v 6.1 --stylize 400',
    createdDate: '2026-09-04',
    author: '策展部 AI 实验室',
  },
  {
    id: 'img-zen-tea-01',
    title: '空山竹林青瓷禅茶席',
    category: '东方意境',
    badge: '宋代风雅',
    description: '雨后空山竹林掩映，天青釉汝窑茶器凝结晨露，青石板与沉香烟缕勾勒极致风雅。',
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80',
    tags: ['汝窑青瓷', '禅茶席', '竹林听雨', '宋代美学', '侘寂幽玄'],
    promptBlocks: {
      subject: 'minimalist Song dynasty tea ceremony setting, delicate Ru ware celadon ceramic teacup with faint crackle glaze, single bamboo leaf resting on wet dark slate stone, subtle curling incense smoke ribbon, bamboo forest background',
      style: 'oriental Zen fine art photography, wabi-sabi aesthetics, poetic minimalism',
      texture: 'matte jade-like celadon ceramic glaze with fine ice crackle, textured wet dark slate stone, silk scroll runner',
      lighting: 'soft overcast natural rain light, subtle backlight illuminating steam and incense smoke, tranquil quietude',
      composition: 'still life macro close-up, asymmetric Japanese Ma composition, shallow depth of field',
      parameters: '--ar 16:9 --v 6.1 --stylize 320',
      negative: 'bright garish colors, cluttered modern objects, harsh flash lighting, western ceramic mugs',
    },
    fullPrompt: 'Fine art still life of Song dynasty Ru ware celadon teacup, jade-like glaze with subtle ice crackle, resting on rain-dampened dark slate in peaceful bamboo courtyard, ethereal wisp of sandalwood incense smoke, soft natural diffuse lighting, profound Eastern mindfulness and tranquility --ar 16:9 --v 6.1 --stylize 320',
    createdDate: '2026-09-04',
    author: '策展部 AI 实验室',
  },
  {
    id: 'img-ukiyo-01',
    title: '浮世绘神奈川惊涛波浪',
    category: '东方意境',
    badge: '木版水印',
    description: '葛饰北斋传统木版雕刻套印，普鲁士蓝矿物重彩与浪爪飞沫的浮世气魄。',
    imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=1200&q=80',
    tags: ['浮世绘', '葛饰北斋', '木版画', '普鲁士蓝', '惊涛波浪'],
    promptBlocks: {
      subject: 'towering monumental ocean tsunami waves curling like clawed dragons, tiny traditional wooden boats riding the crest, Mount Fuji visible in the far calm distance',
      style: 'Japanese Ukiyo-e woodblock print, Katsushika Hokusai masterwork, Edo period aesthetic',
      texture: 'visible hand-carved woodblock grain, washi paper fiber texture, layered ink embossing (karazuri)',
      lighting: 'flat decorative Japanese color blocks, high contrast deep Prussian blue and crest foam white',
      composition: 'dynamic spiral wave curve framing the distant sacred mountain, dramatic diagonal tension',
      parameters: '--ar 16:9 --v 6.1 --stylize 350',
      negative: '3D realistic water physics, modern digital gradients, photorealism, glossy plastic shine',
    },
    fullPrompt: 'Authentic Japanese Ukiyo-e woodblock print in the style of Hokusai, majestic cresting ocean wave with claw-like foam curls, Mount Fuji framed peacefully beneath the wave hollow, deep Prussian blue and indigo mineral pigments on handmade Washi paper, traditional wood relief grain --ar 16:9 --v 6.1 --stylize 350',
    createdDate: '2026-09-04',
    author: '策展部 AI 实验室',
  },
  {
    id: 'img-kintsugi-01',
    title: '侘寂金缮青瓷花器与枯山水',
    category: '东方意境',
    badge: '侘寂美学',
    description: '残破中见新生，24K 纯金粉修补裂痕，阴翳礼赞中体验不完美的时间之美。',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    tags: ['金缮', '侘寂', '枯山水', '破损重构', '阴翳礼赞'],
    promptBlocks: {
      subject: 'antique Japanese ceramic bowl repaired with glowing 24k gold lacquer Kintsugi seams, single withered autumn branch, raked white gravel Zen garden background',
      style: 'Japanese Wabi-Sabi philosophy art photography, In Praise of Shadows aesthetic',
      texture: 'cracked ceramic glaze, lustrous textured pure gold veins, coarse raked granite sand',
      lighting: 'dramatic single direction soft daylight through shoji screen paper, deep poetic shadows',
      composition: 'centered museum showcase framing, high negative space, meditative simplicity',
      parameters: '--ar 16:9 --v 6.1 --stylize 300',
      negative: 'flawless industrial machine finish, symmetrical perfection, plastic, modern colorful props',
    },
    fullPrompt: 'Exquisite antique ceramic tea bowl with prominent Kintsugi gold lacquer repair lines, radiant gold seams celebrating imperfect history, resting on dark weathered cedar board, raked gravel dry landscape in soft focus background, quiet meditative Japanese aesthetic --ar 16:9 --v 6.1 --stylize 300',
    createdDate: '2026-09-04',
    author: '策展部 AI 实验室',
  },

  // ==================== 3. 赛博霓虹与科幻未来 (Cyberpunk & Speculative Future) ====================
  {
    id: 'img-cyber-01',
    title: '赛博朋克雨夜全息拉面摊',
    category: '赛博未来',
    badge: '霓虹雨夜',
    description: '青蓝与洋红全息广告穿透雨雾，湿漉沥青路面倒映悬浮招牌与未来都市的孤独浪潮。',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    tags: ['赛博朋克', '雨夜街区', '全息投影', '霓虹倒影', '银翼杀手'],
    promptBlocks: {
      subject: 'a high-tech cyberpunk street food stall in torrential rain, hovering glowing neon signboards, cyborg chef preparing noodles with robotic precision, dense mega city alley',
      style: 'Blade Runner 2049 aesthetic, Syd Mead futurism, cinematic neo-noir film still',
      texture: 'glistening wet asphalt with rainbow oil slicks, carbon fiber panels, mist droplets catching neon light',
      lighting: 'dramatic dual-tone cyan and hot magenta neon rim lights, volumetric haze, deep obsidian shadows',
      composition: 'wide cinematic 2.39:1 aspect framing, low angle street level, atmospheric depth of field',
      parameters: '--ar 16:9 --v 6.1 --stylize 350',
      negative: 'sunny daylight, medieval fantasy, cartoon, low contrast, washed out desaturated colors',
    },
    fullPrompt: 'Cinematic neo-noir cyberpunk street food stall in heavy midnight rain, neon kanji signs glowing cyan and electric pink, reflections on puddle-strewn dark asphalt, hovering cybernetic food cart, Blade Runner atmosphere, volumetric steam and haze, anamorphic lens flare --ar 16:9 --v 6.1 --stylize 350',
    createdDate: '2026-09-04',
    author: '策展部 AI 实验室',
  },
  {
    id: 'img-glass-01',
    title: '液态亚克力透镜与色散焦散',
    category: '先锋3D',
    badge: '焦散折射',
    description: '极简透明流体玻璃在硬光穿透下的彩虹色散与物理光学焦散（Caustics），超前数字拟物。',
    imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=80',
    tags: ['玻璃拟物', '焦散折射', '液态亚克力', '色散虹彩', 'Octane渲染'],
    promptBlocks: {
      subject: 'sculptural curved liquid glass droplet suspended in air, optical prism refraction casting rainbow caustic patterns onto clean architectural concrete backdrop',
      style: 'Contemporary 3D digital art, Apple Vision Pro spatial UI aesthetic, abstract minimalism',
      texture: 'ultra-clear optical glass, internal chromatic dispersion, smooth fluid mercury curves',
      lighting: 'sharp studio sunlight casting intricate physical caustic ripples and prisms, pure clean ambient fill',
      composition: 'minimalist macro studio photography, abstract geometric balance, museum specimen staging',
      parameters: '--ar 16:9 --v 6.1 --stylize 280',
      negative: 'opaque plastic, cloudy murky liquid, messy textured background, cartoon lines, dirt and dust',
    },
    fullPrompt: 'High-end 3D render of sculptural curved transparent liquid glass, internal optical chromatic dispersion producing delicate rainbow caustic light patterns on smooth minimalist concrete wall, raytraced Octane render, crystal pure clarity, spatial computing design language --ar 16:9 --v 6.1 --stylize 280',
    createdDate: '2026-09-04',
    author: '策展部 AI 实验室',
  },
  {
    id: 'img-chrome-01',
    title: '液态金属生物机械拟态雕塑',
    category: '先锋3D',
    badge: '先锋机械',
    description: '水银镜面与碳纤维骨骼的交织流动，空山基式超现实机械美学与未来仿生构型。',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    tags: ['液态金属', '空山基', '生物机械', '超现实钛金', '参数化雕塑'],
    promptBlocks: {
      subject: 'biomechanical liquid chrome sculpture resembling an organic orchid flower, fluid mirror mercury petals, intricate carbon fiber filaments and gold circuitry core',
      style: 'Hajime Sorayama chrome futurism, Zaha Hadid parametric fluid architecture, hyper-detailed 3D render',
      texture: 'mirror finish polished liquid chrome, brushed titanium accents, iridescent anodized purple highlights',
      lighting: 'clean museum gallery directional spotlight, high specular contrast highlights, soft gradient dark background',
      composition: 'heroic product design center framing, clean studio negative space, macro focal clarity',
      parameters: '--ar 16:9 --v 6.1 --stylize 320',
      negative: 'rusty metal, low poly, rough textures, messy clutter, cartoon 2D, noisy artifacts',
    },
    fullPrompt: 'Sculptural masterpiece of fluid liquid chrome and bio-mechanical filaments, mirror-finish mercury surfaces reflecting ambient museum gallery light, Sorayama futuristic aesthetic, parametric organic curves, ultra-crisp studio lighting, 8k raytraced render --ar 16:9 --v 6.1 --stylize 320',
    createdDate: '2026-09-04',
    author: '策展部 AI 实验室',
  },

  // ==================== 4. 经典前卫与现代主义 (Classic & Avant-Garde) ====================
  {
    id: 'img-louvre-01',
    title: '卡拉瓦乔戏剧明暗古典油画',
    category: '古典高雅',
    badge: '戏剧光影',
    description: '卡拉瓦乔革命性的极黑背景与聚光灯式强光，厚重熟褐与古铜金营造巴洛克典雅力量。',
    imageUrl: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1200&q=80',
    tags: ['卡拉瓦乔', '明暗对照', '巴洛克', '古典油画', '戏剧性布光'],
    promptBlocks: {
      subject: 'an elderly scholar with silver beard examining an ancient brass celestial globe by single oil lamp, leather-bound manuscripts and antique quill on heavy oak table',
      style: 'Baroque fine art oil painting, Caravaggio chiaroscuro, Rembrandt golden age masterwork',
      texture: 'cracked oil glaze craquelure, rich impasto brushstrokes, aged parchment and worn leather grain',
      lighting: 'dramatic single-source chiaroscuro tenebrism, harsh piercing golden lantern beam against pitch black void',
      composition: 'theatrical diagonal dynamic staging, Renaissance golden ratio, deep atmospheric shadows',
      parameters: '--ar 16:9 --v 6.1 --stylize 400',
      negative: 'flat modern digital lighting, bright even illumination, cartoon, modern technology, anime',
    },
    fullPrompt: 'Monumental Baroque oil painting in the style of Caravaggio and Rembrandt, dramatic chiaroscuro lighting piercing deep pitch-black shadows, elderly scholar contemplating ancient brass armillary sphere, rich earth pigments and golden glazes, museum quality masterpiece --ar 16:9 --v 6.1 --stylize 400',
    createdDate: '2026-09-04',
    author: '策展部 AI 实验室',
  },
  {
    id: 'img-gothic-01',
    title: '暗黑哥特大教堂与彩绘玻璃圣光',
    category: '古典高雅',
    badge: '神圣庄严',
    description: '高耸飞扶壁与尖肋拱顶，日暮斜阳穿透中世纪玫瑰花窗投下的七彩光尘与历史回响。',
    imageUrl: 'https://images.unsplash.com/photo-1548625361-16a73c1d9b33?auto=format&fit=crop&w=1200&q=80',
    tags: ['哥特大教堂', '彩绘玻璃', '玫瑰花窗', '神圣光斑', '历史庄严'],
    promptBlocks: {
      subject: 'monumental medieval Gothic cathedral nave, soaring ribbed vault ceilings, colossal stained glass rose window in evening golden hour sunset, empty stone pews',
      style: 'Historical architectural photography, Gothic revival fine art, epic scale cinematography',
      texture: 'weathered carved limestone pillars, jewel-tone colored glass facets, swirling atmospheric incense dust motes',
      lighting: 'magnificent god rays of colored light streaming through stained glass onto stone floor, ethereal volumetric shafts',
      composition: 'strict symmetrical one-point perspective down the grand cathedral aisle, towering vertical scale',
      parameters: '--ar 16:9 --v 6.1 --stylize 350',
      negative: 'crowded modern tourists, modern lighting fixtures, cartoon 3D, neon colors, low resolution',
    },
    fullPrompt: 'Grand Gothic cathedral interior, soaring stone pillars and ribbed vaults leading to monumental stained glass rose window, golden hour sunlight beaming through multicolored glass creating brilliant jewel-tone light pools on ancient stone floor, awe-inspiring sacred atmosphere --ar 16:9 --v 6.1 --stylize 350',
    createdDate: '2026-09-04',
    author: '策展部 AI 实验室',
  },
  {
    id: 'img-rusty-01',
    title: '锈湖手绘暗黑叙事房间',
    category: '暗黑叙事',
    badge: '怪诞超现实',
    description: '荷兰黄金时代画风骨架，大卫·林奇式心理悬疑符号与复古羊皮纸低饱和剪纸手绘。',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    tags: ['锈湖', '暗黑悬疑', '硬边手绘', '大卫林奇', '复古羊皮纸'],
    promptBlocks: {
      subject: 'an eerie vintage parlor with an antique grandfather clock, a floating black cube, and a crow in a tailored suit holding a glass of wine',
      style: 'Rusty Lake art style, dark surrealism illustration, vintage Dutch golden age inspiration',
      texture: 'aged sepia paper grain, muted desaturated earthy watercolor, thick black ink hand-drawn outlines',
      lighting: 'subtle moody indoor ambient lighting, dramatic vignette shadow, single dim candle flicker',
      composition: 'strict symmetrical cinematic framing, flat theatrical staging, unsettling stillness',
      parameters: '--ar 16:9 --v 6.1 --stylize 250',
      negative: 'bright vivid rainbow colors, glossy 3D CGI plastic, lens flare, modern high-tech',
    },
    fullPrompt: 'Surreal eerie vintage parlor with an antique grandfather clock and a floating glowing black cube, crow dressed in Victorian gentleman suit, in Rusty Lake art style, aged sepia paper texture, thick clean black line art, muted sepia and moss green tones, strict symmetrical cinematic composition, David Lynch aesthetic --ar 16:9 --v 6.1 --stylize 250',
    createdDate: '2026-09-04',
    author: '策展部 AI 实验室',
  },
  {
    id: 'img-bauhaus-01',
    title: '包豪斯几何原色构成海报',
    category: '先锋构成',
    badge: '几何构成',
    description: '红黄蓝纯粹三原色，康定斯基点线面体系，形式追随功能的现代主义工业美学宣言。',
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80',
    tags: ['包豪斯', '三原色', '网格系统', '极简海报', '工业现代'],
    promptBlocks: {
      subject: 'abstract geometric poster composition, overlapping bold red circle, yellow triangle, and cobalt blue rectangle, minimalist typographic grid lines',
      style: 'Bauhaus exhibition poster 1923, Herbert Bayer typography, Russian Constructivism',
      texture: 'fine matte lithograph print texture, aged cream paper background, crisp flat screenprint inks',
      lighting: 'flat graphic graphic design lighting, zero gradients, pure compositional color contrast',
      composition: 'strict Swiss grid system, asymmetric dynamic diagonal equilibrium, negative white space balance',
      parameters: '--ar 16:9 --v 6.1 --stylize 180',
      negative: '3D shadows, realistic photographic textures, metallic reflections, gradients, ornate clutter',
    },
    fullPrompt: 'Bauhaus art exhibition poster design, bold geometric abstraction featuring primary colors red yellow blue, overlapping circles and constructivist angles, crisp typography, clean cream background with authentic vintage print texture, timeless modernist masterpiece --ar 16:9 --v 6.1 --stylize 180',
    createdDate: '2026-09-04',
    author: '策展部 AI 实验室',
  },
  {
    id: 'img-memphis-01',
    title: '孟菲斯波普狂欢几何图形',
    category: '先锋构成',
    badge: '撞色几何',
    description: '80年代后现代反叛美学，斑马纹、波点与跳跃荧光撞色交织的自由狂欢。',
    imageUrl: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&w=1200&q=80',
    tags: ['孟菲斯', '波普艺术', '撞色狂想', '几何波点', '复古80s'],
    promptBlocks: {
      subject: 'playful Memphis design interior room, squiggly pastel pink columns, mint green triangle tables, zebra pattern laminate flooring, floating colorful spheres',
      style: 'Memphis Group Milano 1981 aesthetic, Ettore Sottsass design, bold pop postmodernism',
      texture: 'plastic laminate glossy textures, vibrant screenprinted geometric patterns, terrazzo stone flecks',
      lighting: 'bright punchy commercial studio lighting, soft colorful bounce shadows, high energy pop vibe',
      composition: 'isometric playful diorama, dynamic off-center balance, high visual rhythm',
      parameters: '--ar 16:9 --v 6.1 --stylize 250',
      negative: 'gloomy dark shadows, realistic gritty dirt, traditional classical wood, monochrome drab colors',
    },
    fullPrompt: 'Bold 1980s Memphis Milano interior design art, vibrant collision of pastel yellow, mint green, coral pink and electric blue, whimsical squiggly lines and zebra terrazzo patterns, playful postmodern furniture shapes, joyful pop art aesthetic --ar 16:9 --v 6.1 --stylize 250',
    createdDate: '2026-09-04',
    author: '策展部 AI 实验室',
  },

  // ==================== 5. 治愈手绘与童话诗意 (Whimsical & Nostalgic) ====================
  {
    id: 'img-ghibli-01',
    title: '吉卜力夏日云海田园草甸',
    category: '童话治愈',
    badge: '治愈手绘',
    description: '巨大的夏日积雨云耸立在远方蔚蓝晴空，微风拂动金色麦浪与红色屋顶的水车磨坊。',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    tags: ['吉卜力', '夏日积雨云', '麦田水车', '手绘水彩', '宫崎骏'],
    promptBlocks: {
      subject: 'sprawling lush green summer meadow with colorful wildflowers, vintage rustic wooden watermill cottage, towering magnificent cumulus clouds in bright azure sky',
      style: 'Studio Ghibli animation background art, Hayao Miyazaki film still, lush hand-painted gouache watercolor',
      texture: 'traditional anime celluloid paint, delicate watercolor bloom on paper, lush grass blade details',
      lighting: 'warm radiant summer sunlight, dappled golden highlights, soft luminous cloud shadows',
      composition: 'wide panoramic pastoral landscape, low horizon emphasizing the towering majestic sky, cinematic anime frame',
      parameters: '--ar 16:9 --v 6.1 --stylize 300',
      negative: 'gritty photorealism, CGI 3D plastic, dark horror, gloomy winter, urban skyscrapers',
    },
    fullPrompt: 'Breathtaking Studio Ghibli style anime background painting, lush emerald summer field dotted with wild poppies, rustic country cottage with spinning water wheel, colossal billowing white cumulus thunderheads in clear blue sky, nostalgic summer warmth, painted by Kazuo Oga --ar 16:9 --v 6.1 --stylize 300',
    createdDate: '2026-09-04',
    author: '策展部 AI 实验室',
  },
  {
    id: 'img-wes-01',
    title: '韦斯·安德森对称复古粉彩大饭店',
    category: '童话治愈',
    badge: '对称复古',
    description: '极致精确的中心轴对称构图，粉红与浅天蓝马卡龙配色，荒诞温情的复古怀旧美学。',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    tags: ['韦斯安德森', '对称构图', '粉彩配色', '复古大饭店', '电影美学'],
    promptBlocks: {
      subject: 'front facade of a whimsical pastel pink and pale turquoise alpine grand hotel, vintage bellhop in purple uniform standing motionless at the brass revolving door',
      style: 'Wes Anderson movie still, Grand Budapest Hotel cinematography, Robert Yeoman camera style',
      texture: 'chalky pastel matte paint finish, ornate vintage brass accents, velvet ropes, perfectly manicured topiary',
      lighting: 'soft diffused bright overcast sunlight, zero harsh shadows, gentle nostalgic pastel glow',
      composition: 'strict obsessive 100% centered symmetrical front elevation shot, geometric dollhouse framing',
      parameters: '--ar 16:9 --v 6.1 --stylize 280',
      negative: 'asymmetrical Dutch angle, modern high-tech, chaotic composition, dark moody grime, fish-eye lens',
    },
    fullPrompt: 'Cinematic wide shot directed by Wes Anderson, whimsical pastel pink grand alpine hotel with turquoise trim, strict 100% centered symmetrical elevation, vintage bellhop standing in doorway, delicate storybook aesthetic, exquisite pastel color palette, 35mm film still --ar 16:9 --v 6.1 --stylize 280',
    createdDate: '2026-09-04',
    author: '策展部 AI 实验室',
  },
  {
    id: 'img-vapor-01',
    title: '蒸汽波阿波罗雕塑与洋红网格',
    category: '赛博未来',
    badge: '复古未来',
    description: '古希腊大理石雕像与 80 年代低保真透视网格、洋红渐变夕阳与复古合成器梦境。',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    tags: ['蒸汽波', '复古合成器', '阿波罗雕像', '洋红网格', '80年代怀旧'],
    promptBlocks: {
      subject: 'classical Greek marble bust of Apollo wearing cyberpunk chrome sunglasses, floating geometric wireframe grid floor receding to infinity, glitchy low-poly palm trees',
      style: 'Vaporwave aesthetic, 80s synthwave album cover, nostalgic lo-fi retro-futurism',
      texture: 'VHS tape tracking glitches, CRT scan lines, smooth white Carrara marble, iridescent chrome',
      lighting: 'neon pink and cyan sunset horizon glow, magenta gradient rim light on marble, retro synth glow',
      composition: 'surreal dreamlike centered montage, nostalgic horizon vanishing point, album cover framing',
      parameters: '--ar 16:9 --v 6.1 --stylize 300',
      negative: 'gritty realistic dirt, modern 4K digital clarity, dark monochrome, historical medieval fantasy',
    },
    fullPrompt: 'Iconic Vaporwave artwork, classical marble Apollo statue bust with reflective mirrored glasses, glowing neon wireframe perspective grid spanning to purple sunset horizon, palm tree silhouettes, retro 1980s aesthetic, VHS scanlines, magenta and teal palette --ar 16:9 --v 6.1 --stylize 300',
    createdDate: '2026-09-04',
    author: '策展部 AI 实验室',
  },
  {
    id: 'img-lowpoly-01',
    title: '低多边形几何发光折纸灵鹿',
    category: '先锋3D',
    badge: '折纸几何',
    description: '极简多边形棱面折纸艺术，晨雾幽谷中浑身透出幽蓝微光的灵鹿雕塑。',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    tags: ['低多边形', '折纸艺术', '发光雕塑', '极简棱面', '空灵幽谷'],
    promptBlocks: {
      subject: 'majestic geometric low-poly stag deer standing on a rocky outcrop, internal ethereal cyan light shining through polygonal facets, misty mountain forest at dawn',
      style: 'Low-poly 3D geometric art, papercraft origami sculpture, modern fantasy illustration',
      texture: 'sharp clean triangular facets, frosted semi-translucent quartz crystal panels, crisp folded paper folds',
      lighting: 'subtle morning twilight mist, soft radiant luminescence emitting from inside the deer crystal body',
      composition: 'heroic side profile silhouette against soft foggy gradient mountains, elegant minimalist balance',
      parameters: '--ar 16:9 --v 6.1 --stylize 280',
      negative: 'photorealistic deer fur, rounded smooth organic anatomy, chaotic messy triangles, noisy textures',
    },
    fullPrompt: 'Stylized low-poly origami stag standing poised in foggy twilight forest, glowing internal cyan light illuminating crisp geometric facets and antlers, clean papercraft polygon aesthetic, serene mystical atmosphere, minimal 3D design --ar 16:9 --v 6.1 --stylize 280',
    createdDate: '2026-09-04',
    author: '策展部 AI 实验室',
  }
];

export const DEFAULT_VIDEO_WORKFLOWS: AIVideoWorkflow[] = [
  {
    id: 'wf-cinema-01',
    title: '叙事电影短片镜头连贯生成流',
    category: '多镜头叙事',
    badge: '电影级连贯',
    difficulty: '进阶',
    totalSteps: 4,
    summary: '解决 AI 视频人物脸部变形与多镜头场景不连贯痛点，通过角色定妆锁脸、首尾帧过渡与运镜控制制作高水准短片。',
    coverImage: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80',
    toolsChain: ['Midjourney v6.1', 'Kling 1.5 Pro', 'Runway Gen-3 Alpha', 'Topaz Video AI'],
    steps: [
      {
        stepNumber: 1,
        stepTitle: '角色多角度一致性定妆图生成',
        toolUsed: 'Midjourney v6.1 (--cref 参数)',
        toolCategory: 'image-gen',
        purpose: '固定角色核心五官、服装与发型，生成同一角色的正面、侧面及全身视角，为视频运镜提供坚实基准。',
        stepPrompt: 'character turnaround sheet of a 30yo Asian detective, trench coat, dim streetlight, neutral expression, multiple angles, cinematic lighting --cref [URL] --ar 16:9',
        parameters: '--v 6.1 --cw 100 --stylize 250',
        keyTechniques: [
          '使用 --cref 固定脸部特征，配合 --cw 100 锁定服装细节',
          '背景尽量使用中性暗色或纯色微光，防止后续视频模型被杂乱背景干扰'
        ]
      },
      {
        stepNumber: 2,
        stepTitle: '镜头 1：人物背影至回眸特写运镜',
        toolUsed: 'Kling 1.5 Pro (运动笔刷 + 镜头控制)',
        toolCategory: 'video-gen',
        purpose: '从主角缓步走入雨夜街头的背影，平滑推镜至侧脸微表情，建立悬疑电影开场氛围。',
        stepPrompt: 'Slow cinematic dolly in, camera tracks from behind character, character slowly turns head to right profile, rain drops falling in neon light, shallow depth of field.',
        parameters: 'Duration: 5s, Mode: Professional, Camera: Push In + Pan Right',
        keyTechniques: [
          '在运动笔刷中框选角色头部与大衣，赋予向右缓慢旋转的运动向量',
          '背景全息招牌赋予细微闪烁参数，增加环境真实度'
        ]
      },
      {
        stepNumber: 3,
        stepTitle: '镜头 2：首尾帧锚定与跨场景无缝转场',
        toolUsed: 'Runway Gen-3 (First & Last Frame)',
        toolCategory: 'video-gen',
        purpose: '以镜头 1 最后一帧作为起始帧，生成角色推门步入室内温暖酒吧的无缝连贯镜头。',
        stepPrompt: 'Continuous shot, character pushes open dark heavy wooden door, entering warm bustling amber bar, camera glides forward through doorway.',
        parameters: 'Motion: 4, Camera Motion: Forward Dolly',
        keyTechniques: [
          '严格上传上一段视频尾帧作为起始输入，杜绝换场景时人物服装发型突变',
          '提示词中必须写明门前暗调与门后暖光的对比过渡'
        ]
      },
      {
        stepNumber: 4,
        stepTitle: '超分升频至 4K 60FPS 与胶片调色',
        toolUsed: 'Topaz Video AI 5 + DaVinci Resolve',
        toolCategory: 'post-edit',
        purpose: '消除 AI 视频由于压缩导致的模糊与果冻效应，补充自然胶片颗粒与高保真 4K 细节。',
        stepPrompt: 'AI Enhancement Model: Proteus Fine Tune / Artemis LQ, Motion Deblur: 50, Add Film Grain: 15%',
        parameters: 'Output: 3840x2160 ProRes 422HQ',
        keyTechniques: [
          '使用 Proteus 模型手动调整 Auto 参数，避免皮肤纹理被过度平滑成塑料假脸',
          '在达芬奇中套用 Kodak 2383 胶片模拟 LUT，并统筹环境声音效'
        ]
      }
    ]
  },
  {
    id: 'wf-oldphoto-02',
    title: '老照片动态微表情与时光回溯流',
    category: '人物写实',
    badge: '情感共鸣',
    difficulty: '入门',
    totalSteps: 3,
    summary: '将泛黄老旧黑白老照片修复为 4K 彩色影像，并赋予温润呼吸感与自然眨眼微笑微动态。',
    coverImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80',
    toolsChain: ['SUPIR / GFP-GAN', 'Stable Diffusion ControlNet', 'LivePortrait / Kling 1.5'],
    steps: [
      {
        stepNumber: 1,
        stepTitle: '老照片高清去噪与面部精准重构',
        toolUsed: 'SUPIR + GFPGAN',
        toolCategory: 'image-gen',
        purpose: '去除折痕、划伤与模糊噪点，智能填补老照片丢失的睫毛与皮肤细孔微细节。',
        stepPrompt: 'Restoration master, highly detailed facial pores, natural skin texture, vintage 1950s portrait photograph, sharp focus, 8k.',
        parameters: 'Scale: 4x, Denoise: 0.35, Fidelity: 0.8',
        keyTechniques: [
          '优先使用 SUPIR 深度学习文本引导修复，比普通人脸插值更懂真实人体解剖学',
          '保留适度黑白灰阶层次，不可一次性过度拉高锐化'
        ]
      },
      {
        stepNumber: 2,
        stepTitle: '基于年代背景的真实色彩还原',
        toolUsed: 'Palet.ai / SD XL Lineart',
        toolCategory: 'image-gen',
        purpose: '赋予符合历史真实感的暖调肤色、棉麻布料色彩与古典室内环境色。',
        stepPrompt: 'Natural historically accurate colorization, soft skin tone, vintage sepia linen, warm morning sunlight, nostalgic color palette.',
        parameters: 'Model: RealVisXL, Denoising: 0.25',
        keyTechniques: [
          '参考 20 世纪中叶柯达彩胶的低饱和微黄特性，避免荧光感'
        ]
      },
      {
        stepNumber: 3,
        stepTitle: '自然呼吸律动与深情回眸驱动',
        toolUsed: 'LivePortrait / Kling 1.5 (微动态模式)',
        toolCategory: 'video-gen',
        purpose: '注入极小幅度的胸腔呼吸起伏、眼神流转与嘴角微扬，唤醒沉睡在岁月中的生动记忆。',
        stepPrompt: 'Gentle natural breathing, subtle eye blinking, gentle affectionate smile appearing on lips, head tilting slightly 2 degrees, warm soft gaze into camera lens.',
        parameters: 'Motion Magnitude: 2 (极轻微), Frame Rate: 30fps',
        keyTechniques: [
          '幅度务必控制在最小档位，幅度过大会导致面部五官拉扯变形失去真实感',
          '添加柔和的风声与老式放映机白噪音作为背景氛围'
        ]
      }
    ]
  },
  {
    id: 'wf-product-03',
    title: '商业高奢产品 3D 环绕运镜与材质流',
    category: '电商商拍',
    badge: '商业高奢',
    difficulty: '专家',
    totalSteps: 3,
    summary: '针对香水、珠宝、高端数码硬件，打造好莱坞级别的 360 度产品环绕滑轨运镜与光影流转视效。',
    coverImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
    toolsChain: ['Midjourney v6.1 (Studio Clean)', 'Luma Dream Machine 1.5', 'Kling 1.5 Orbit'],
    steps: [
      {
        stepNumber: 1,
        stepTitle: '极简静物无影棚三点布光成图',
        toolUsed: 'Midjourney v6.1',
        toolCategory: 'image-gen',
        purpose: '生成没有杂乱倒影的顶级商拍白底或悬浮暗调主图，突出产品玻璃、金属与液体的高端质感。',
        stepPrompt: 'luxury perfume glass bottle suspended in clean studio space, floating liquid droplets and golden silk ribbon, soft gradient backdrop, commercial advertising photography --ar 16:9',
        parameters: '--v 6.1 --style raw --stylize 150',
        keyTechniques: [
          '使用 --style raw 压制过多的艺术发散，确保产品边缘线条横平竖直',
          '在 Prompt 中明确定义主光（Key light）、轮廓光（Rim light）与焦散光斑'
        ]
      },
      {
        stepNumber: 2,
        stepTitle: '360 度圆周环绕与宏观特写运镜',
        toolUsed: 'Luma Dream Machine / Kling 1.5 (Orbit 运镜)',
        toolCategory: 'video-gen',
        purpose: '模拟顶级机械臂（Bolt High-speed Cinebot）的平滑环绕运动，高光随着玻璃曲面流动。',
        stepPrompt: 'High-speed camera 360 degree smooth orbit around perfume bottle, liquid splashing in super slow motion, specular studio highlights gliding across crystal glass edges, 1000fps feel.',
        parameters: 'Camera Motion: Orbit Left 360, Speed: Slow & Smooth',
        keyTechniques: [
          'Prompt 必须加入 specular highlights gliding across surface，强制视频模型计算物理高光位移',
          '设定相机运动为单一轴向匀速旋转，避免多轴向同时晃动失焦'
        ]
      },
      {
        stepNumber: 3,
        stepTitle: '转场合成与商业光效粒子包装',
        toolUsed: 'After Effects / CapCut Pro (Optical Flares)',
        toolCategory: 'post-edit',
        purpose: '叠加细微镜头光斑（Lens Flare）与悬浮金色微粒，配合低音轰鸣（Sub-bass Boom）打造顶级商业大片。',
        stepPrompt: 'Lens flare anamorphic streak, floating champagne golden particles, smooth fade to brand typography lockup.',
        parameters: 'Blend Mode: Screen, Glow Radius: 45px',
        keyTechniques: [
          '粒子运动方向须与镜头环绕方向保持同频，增强纵深空间感'
        ]
      }
    ]
  }
];

// Helper to get image cases from local storage or defaults
export function getImageCases(): AIImageCase[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_IMAGE_CASES);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length >= DEFAULT_IMAGE_CASES.length) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load image cases from localStorage', e);
  }
  // Store default enriched cases
  try {
    localStorage.setItem(STORAGE_KEY_IMAGE_CASES, JSON.stringify(DEFAULT_IMAGE_CASES));
  } catch (e) {
    // silent
  }
  return DEFAULT_IMAGE_CASES;
}

// Helper to save image cases
export function saveImageCases(cases: AIImageCase[]) {
  try {
    localStorage.setItem(STORAGE_KEY_IMAGE_CASES, JSON.stringify(cases));
  } catch (e) {
    console.error('Failed to save image cases to localStorage', e);
  }
}

// Helper to get video workflows from local storage or defaults
export function getVideoWorkflows(): AIVideoWorkflow[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_VIDEO_WORKFLOWS);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to load video workflows from localStorage', e);
  }
  return DEFAULT_VIDEO_WORKFLOWS;
}

// Helper to save video workflows
export function saveVideoWorkflows(workflows: AIVideoWorkflow[]) {
  try {
    localStorage.setItem(STORAGE_KEY_VIDEO_WORKFLOWS, JSON.stringify(workflows));
  } catch (e) {
    console.error('Failed to save video workflows to localStorage', e);
  }
}

// Admin Auth Helpers
export function isAdminAuthed(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY_ADMIN_AUTH) === 'true';
  } catch (e) {
    return false;
  }
}

export function setAdminAuth(authed: boolean) {
  try {
    if (authed) {
      localStorage.setItem(STORAGE_KEY_ADMIN_AUTH, 'true');
    } else {
      localStorage.removeItem(STORAGE_KEY_ADMIN_AUTH);
    }
  } catch (e) {
    // silent
  }
}

// Export all data as JSON
export function exportAllDataAsJSON(): string {
  const data = {
    imageCases: getImageCases(),
    videoWorkflows: getVideoWorkflows(),
    exportedAt: new Date().toISOString(),
    version: '3.0.0',
  };
  return JSON.stringify(data, null, 2);
}

// Reset to factory defaults
export function resetToDefaults() {
  try {
    localStorage.removeItem(STORAGE_KEY_IMAGE_CASES);
    localStorage.removeItem(STORAGE_KEY_VIDEO_WORKFLOWS);
  } catch (e) {
    // silent
  }
}