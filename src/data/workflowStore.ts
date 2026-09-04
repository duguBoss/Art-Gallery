import type { AIImageCase, AIVideoWorkflow } from '../types/art';

const STORAGE_KEY_IMAGE_CASES = 'art_gallery_ai_image_cases_v1';
const STORAGE_KEY_VIDEO_WORKFLOWS = 'art_gallery_ai_video_workflows_v1';
const STORAGE_KEY_ADMIN_AUTH = 'art_gallery_admin_authed_v1';

export const DEFAULT_IMAGE_CASES: AIImageCase[] = [
  {
    id: 'img-vox-01',
    title: 'VOX 3D体素微缩居酒屋街角',
    category: 'VOX体素',
    badge: '立体像素',
    description: '采用 MagicaVoxel 物理光追渲染的正交等轴 3D 箱庭，微距景深与暖黄灯笼反光。',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    tags: ['VOX', '3D像素', '等轴透视', '赛博微缩', 'Octane渲染'],
    promptBlocks: {
      subject: 'miniature Japanese ramen izakaya street corner, glowing paper lanterns, steam rising from boiling pot',
      style: 'VOX 3D voxel art, MagicaVoxel aesthetic, isometric orthographic projection',
      texture: 'cubic micro blocks, glossy wet asphalt reflections, smooth matte plastic bricks',
      lighting: 'volumetric ray-tracing lighting, warm amber neon glow, soft ambient occlusion',
      composition: 'isometric tilt-shift photography, centered diorama floating island, 8k Octane render',
      parameters: '--ar 16:9 --v 6.1 --stylize 300',
      negative: '2D flat illustration, smooth curved surfaces, realistic human skin, noisy photorealism',
    },
    fullPrompt: 'Detailed 3D voxel art diorama, MagicaVoxel aesthetic, isometric view of miniature Japanese ramen izakaya street corner, glowing paper lanterns, steam rising from boiling pot, cubic micro blocks, glossy wet asphalt reflections, volumetric ray-tracing lighting, warm amber neon glow, tilt-shift macro lens, 8k Octane render --ar 16:9 --v 6.1 --stylize 300',
    createdDate: '2026-09-04',
    author: '策展部 AI 实验室',
  },
  {
    id: 'img-rusty-01',
    title: '锈湖手绘暗黑叙事房间',
    category: '锈湖暗黑',
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
    id: 'img-ink-01',
    title: '东方烟雨孤舟水墨留白',
    category: '东方水墨',
    badge: '气韵生动',
    description: '宣纸自然渗墨肌理，浓淡干湿焦五色层次，计白当黑的空灵禅宗意境。',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    tags: ['水墨', '东方写意', '留白', '宋明美学', '宣纸渗化'],
    promptBlocks: {
      subject: 'a solitary wooden boat drifting on a vast misty lake, distant layered mountain silhouettes, lonely gnarled pine tree',
      style: 'Traditional Chinese ink wash painting, Sumi-e oriental masterwork, Southern Song dynasty style',
      texture: 'rice paper bleeding texture, dry brush flying white technique, subtle mineral gold dust splatter',
      lighting: 'ethereal diffused daylight through thick morning fog, no harsh directional shadows',
      composition: 'extensive poetic negative space (计白当黑), high-perspective bird-eye panoramic view',
      parameters: '--ar 16:9 --v 6.1 --stylize 350',
      negative: 'western thick oil impasto, harsh neon light, crowded frame, 3D polygons',
    },
    fullPrompt: 'Traditional Chinese ink wash painting, ethereal misty mountains with lonely pine tree, solitary boat on vast lake, sweeping minimalist brush strokes, extensive negative space, rice paper bleeding texture, delicate gold foil accents, Zen tranquility, Southern Song dynasty masterwork --ar 16:9 --v 6.1 --stylize 350',
    createdDate: '2026-09-04',
    author: '策展部 AI 实验室',
  },
  {
    id: 'img-cyber-01',
    title: '赛博朋克雨夜全息义体都市',
    category: '赛博朋克',
    badge: '霓虹废土',
    description: '高对比度青蓝与激光品红互补色，雨夜潮湿沥青倒影与密布全息巨构。',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    tags: ['赛博朋克', '雨夜霓虹', '全息投影', '银翼杀手', '机能风'],
    promptBlocks: {
      subject: 'a hooded detective with glowing mechanical cybernetic arm standing on a rainy crossroad, towering megastructures with giant holographic advert',
      style: 'Blade Runner 2049 aesthetic, cinematic cyberpunk concept art, dystopian sci-fi',
      texture: 'wet reflective asphalt puddles, brushed chrome metal, dense exterior cables and air conditioning units',
      lighting: 'cyan and magenta neon contrast, rainy volumetric fog, anamorphic horizontal lens flare',
      composition: 'dramatic low-angle wide shot, two-point deep street perspective, film grain',
      parameters: '--ar 21:9 --v 6.1 --style raw',
      negative: 'sunny rural pastoral, medieval fantasy, bright pastel cartoon, low resolution',
    },
    fullPrompt: 'Cinematic wide shot of a bustling cyberpunk street at rainy night, towering skyscrapers covered in massive holographic advertisements, vivid neon magenta and cyan lighting, wet asphalt reflections, dense flying vehicles, Blade Runner 2049 aesthetic, photorealistic 8k --ar 21:9 --v 6.1 --style raw',
    createdDate: '2026-09-04',
    author: '策展部 AI 实验室',
  },
  {
    id: 'img-ghibli-01',
    title: '吉卜力水彩夏日积雨云与木屋',
    category: '吉卜力水彩',
    badge: '治愈光影',
    description: '层次厚重的雕塑感白云海，随风起伏的碧绿草甸，海报水粉胶片颗粒手绘。',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    tags: ['吉卜力', '男鹿和雄', '积雨云', '治愈手绘', '海报水粉'],
    promptBlocks: {
      subject: 'a cozy rustic wooden cottage with a spinning watermill, surrounded by blooming wildflowers and a gentle stream',
      style: 'Studio Ghibli animation background art, painted by Kazuo Oga and Hayao Miyazaki',
      texture: 'Nicker poster color painted texture, watercolor paper grain, vintage 35mm film cell aesthetic',
      lighting: 'warm golden afternoon sunlight, dappled light through lush green leaves, Tyndall beam rays',
      composition: 'sculpted volumetric fluffy cumulus clouds rising in deep azure sky, sweeping hillside view',
      parameters: '--ar 16:9 --v 6.1 --stylize 320',
      negative: '3D CGI render, dark horror, dystopian, noisy plastic surfaces, photorealism',
    },
    fullPrompt: 'A breathtaking scenic landscape in Studio Ghibli anime style, painted by Hayao Miyazaki and Kazuo Oga, lush rolling green hills, blooming wildflowers, massive fluffy cumulus clouds in bright blue sky, cozy wooden cottage with watermill, soft warm daylight, watercolor poster color texture --ar 16:9 --v 6.1 --stylize 320',
    createdDate: '2026-09-04',
    author: '策展部 AI 实验室',
  },
  {
    id: 'img-clay-01',
    title: '3D 粘土定格童趣小怪兽茶会',
    category: '粘土定格',
    badge: '温暖手工',
    description: '柔软油泥手工指纹凹凸肌理，次表面散射温润胶质透光，摄影棚柔光微距景深。',
    imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',
    tags: ['粘土定格', '定格动画', '次表面散射', '手工指纹', '微距微缩'],
    promptBlocks: {
      subject: 'two cute chubby clay creatures sitting on tree stumps sharing tea and tiny berry cupcakes',
      style: 'Claymation stop-motion animation aesthetic, Aardman animations inspired, tactile handcrafted 3D',
      texture: 'Plasticine oil clay material, visible subtle handmade fingerprints, slightly uneven organic surface',
      lighting: 'warm studio softbox lighting, translucent subsurface scattering (SSS) clay glow',
      composition: 'macro tilt-shift photography, shallow depth of field, miniature tabletop stage',
      parameters: '--ar 16:9 --v 6.1 --stylize 300',
      negative: 'sharp metallic edges, hard glossy plastic, flat 2D vector, harsh direct flash',
    },
    fullPrompt: 'Cute claymation characters having tea in a cozy handmade miniature forest, Plasticine clay texture with visible subtle fingerprints, stop motion animation aesthetic, warm soft studio lighting, subsurface scattering, macro tilt-shift photography, tactile, playful, masterpiece 3D --ar 16:9 --v 6.1 --stylize 300',
    createdDate: '2026-09-04',
    author: '策展部 AI 实验室',
  }
];

export const DEFAULT_VIDEO_WORKFLOWS: AIVideoWorkflow[] = [
  {
    id: 'wf-vox-mg-01',
    title: 'VOX 体素风格 MG 动态图形视频生成管线',
    category: '动态图形与MG动画',
    badge: 'VOX × MG',
    summary: '从静态 3D 体素分层资产开始，通过 AI 动态骨骼运镜与 AE 后期节奏包装，两步生成复古潮流的体素 MG 动画短片。',
    previewVideoUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    totalSteps: 3,
    difficulty: '进阶',
    toolsChain: ['Midjourney v6.1 / Flux.1', 'Runway Gen-3 / Kling 1.5', 'After Effects / 剪映'],
    author: '视听实验工坊',
    createdDate: '2026-09-04',
    steps: [
      {
        stepNumber: 1,
        stepTitle: '步骤一：静态分层体素资产与角色概念图生成 (Asset Generation)',
        toolUsed: 'Midjourney v6.1 / Flux.1 Schnell',
        toolCategory: 'image-gen',
        purpose: '生成无透视形变、边缘清晰的正交视角体素角色与场景切片，为后续视频运镜奠定干净的画面基因。',
        stepPrompt: 'Detailed 3D voxel art character and isometric food cart, MagicaVoxel render, cubic micro blocks, clean pure black background, orthographic projection, volumetric rim light, Octane render --ar 16:9 --v 6.1',
        parameters: 'Ratio: 16:9, Stylize: 250, Raw Mode: Off',
        keyTechniques: [
          '强制加入 "orthographic projection"（正交透视），避免边缘广角透视畸变导致 3D 体素坍缩',
          '使用纯色或纯黑背景（Pure black background），便于导入视频工具后无缝扣取图层',
          '通过 "cubic micro blocks" 锚定体素正方体单元颗粒感，防止画面过于圆滑'
        ],
        outputPreviewUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
      },
      {
        stepNumber: 2,
        stepTitle: '步骤二：图生视频运镜与微动作生成 (Motion Synthesis)',
        toolUsed: 'Runway Gen-3 Alpha / Kling 1.5 / Luma Dream Machine',
        toolCategory: 'video-gen',
        purpose: '利用 I2V (Image-to-Video) 赋予静态体素模型空间旋转、灯光闪烁与烟雾升腾微动，保持体素刚体不融化。',
        stepPrompt: 'Continuous 45-degree smooth orbit camera rotation around the voxel shop, glowing neon signage gently flickering, tiny pixelated steam rising from noodle pot, water puddles glistening, stop-motion rigidity maintained, no morphing, no warping.',
        parameters: 'Motion Value: 4 (建议 3~5), Camera: Orbit Right 15°, Quality: 1080p High',
        keyTechniques: [
          '运动强度（Motion Intensity）严格控制在 3~4，若数值过大（>6），AI 会把立方体方块融化成平滑曲面',
          'Prompt 明确限定 "stop-motion rigidity maintained, no morphing"（保持定格刚体刚度，禁止形变）',
          '采用轻微匀速旋转运镜（Orbit Camera），展现体素模型的 3D 纵深感'
        ],
        outputPreviewUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      },
      {
        stepNumber: 3,
        stepTitle: '步骤三：动态图形 MG 节奏卡点与音效包装 (Motion Graphics & Audio)',
        toolUsed: 'After Effects / CapCut Pro',
        toolCategory: 'post-edit',
        purpose: '为生成的体素视频添加 12fps 抽帧定格顿挫感，叠加 MG 几何切片转场与 8-bit 芯片音乐音效。',
        stepPrompt: 'BPM 124 芯片音乐节拍卡点，关键帧蒙版位移，微量发光辉光（Deep Glow）增强霓虹溢出',
        parameters: 'Posterize Time: 12 fps, Glow Threshold: 60%, Audio: 8-Bit Lo-fi Synth',
        keyTechniques: [
          '应用 AE "时间抽帧 (Posterize Time)" 滤镜将帧率降至 12~15fps，强化像素偶动画的手工生动感',
          '在视频切镜节点叠加大色块矩形滑入与文字弹跳（MG 动效标志性技法）',
          '配乐优先选择 8-Bit 芯片乐或复古合成波（Chiptune / Synthwave），视听完美统一'
        ],
        outputPreviewUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      }
    ]
  },
  {
    id: 'wf-rusty-ai-02',
    title: '锈湖暗黑叙事风格 AI 悬疑短剧生成管线',
    category: 'AI 剧情内容创作',
    badge: '心理悬疑短剧',
    summary: '分三步实现大卫·林奇式怪诞悬疑短剧：从分镜角色原画，到呼吸凝视微表情运镜，再到胶片风化暗角包装。',
    previewVideoUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    totalSteps: 3,
    difficulty: '入门',
    toolsChain: ['Midjourney v6.1', 'Kling 1.5 (快手可灵)', '剪映专业版'],
    author: '视听实验工坊',
    createdDate: '2026-09-04',
    steps: [
      {
        stepNumber: 1,
        stepTitle: '步骤一：低饱和剪纸手绘分镜与核心道具生成',
        toolUsed: 'Midjourney v6.1',
        toolCategory: 'image-gen',
        purpose: '确立轴对称剧场式分镜，固定乌鸦绅士面具、黑方块与老旧钟摆三大核心叙事符号。',
        stepPrompt: 'Vintage eerie stage, Rusty Lake aesthetic, man wearing detailed black crow head mask sitting at antique wooden table, floating dark cube emitting faint smoke, thick black lines, muted sepia --ar 16:9 --v 6.1',
        parameters: '--ar 16:9 --stylize 200 --seed 488921',
        keyTechniques: [
          '固定 Seed 种子值以保持同一集角色服装和鸟头面具的一致性',
          '使用居中轴对称构图（Symmetrical framing）营造不安的舞台定格感'
        ]
      },
      {
        stepNumber: 2,
        stepTitle: '步骤二：极其缓慢的呼吸凝视与微镜头推进',
        toolUsed: 'Kling 1.5 (首尾帧模式)',
        toolCategory: 'video-gen',
        purpose: '让角色缓慢眨眼与微调头部角度，黑方块在空中上下微浮，烘托令人屏息的心理张力。',
        stepPrompt: 'Extremely slow and subtle dolly in towards the crow man, crow eyes blink once slowly, black cube gently hovers up and down, ominous atmosphere, cinematic tension.',
        parameters: 'Duration: 5s, Camera: Push In (0.3 Slow)',
        keyTechniques: [
          '绝对禁用大幅度肢体动作，悬疑感源于“99%静止中的那1%微动”',
          '设置微速推进镜头（Slow Dolly In），引导观众视线聚焦在人物面具的眼神细节上'
        ]
      },
      {
        stepNumber: 3,
        stepTitle: '步骤三：老式留声机底噪与羊皮纸暗角调色',
        toolUsed: '剪映专业版 / DaVinci Resolve',
        toolCategory: 'post-edit',
        purpose: '添加老式黑胶留声机唱针底噪（Vinyl crackle）、暗角压暗与胶片颗粒，完成沉浸式电影质感。',
        stepPrompt: '叠加热燥波、暗角胶片遮罩、老钟摆秒针滴答声（Ticking sound）与沉闷大提琴单音',
        parameters: 'Film Grain: 25%, Vignette: 40%, Contrast: +15%',
        keyTechniques: [
          '混音加入不规则的黑胶杂音与远处低频蜂鸣，强化心理悬疑氛围',
          '调色降低画面整体饱和度，提亮局部油灯或发光方块区域，形成视觉焦点'
        ]
      }
    ]
  },
  {
    id: 'wf-bauhaus-mg-03',
    title: '包豪斯构成主义动态海报与产品宣传片管线',
    category: '品牌大片与影视内容',
    badge: '构成主义',
    summary: '运用包豪斯红黄蓝三原色与几何网格，通过动态位移和排版形变，制作高规格现代工业品牌先导视频。',
    previewVideoUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80',
    totalSteps: 2,
    difficulty: '入门',
    toolsChain: ['Flux.1 Pro', 'Runway Gen-3 Alpha', 'After Effects'],
    author: '视听实验工坊',
    createdDate: '2026-09-04',
    steps: [
      {
        stepNumber: 1,
        stepTitle: '步骤一：红黄蓝基础几何构成海报母版生成',
        toolUsed: 'Flux.1 Pro',
        toolCategory: 'image-gen',
        purpose: '生成严格基于现代网格系统的三原色圆、三角形、矩形排列，字体采用无衬线排版。',
        stepPrompt: 'Iconic Bauhaus 1923 exhibition poster layout, primary colors red blue yellow, clean Swiss grid system, geometric abstract constructivism, clean lines, museum graphic design --ar 16:9',
        parameters: 'Steps: 30, Guidance: 3.5',
        keyTechniques: [
          '强调 "clean Swiss grid system"（瑞士网格），保证图形边缘处于严谨数学对齐状态',
          '严格控制色彩数量：红、黄、蓝三原色 + 纯黑与米白画布底色'
        ]
      },
      {
        stepNumber: 2,
        stepTitle: '步骤二：几何图形路径缩放流动与位移转场',
        toolUsed: 'Runway Gen-3 / AE Shape Motion',
        toolCategory: 'video-gen',
        purpose: '让圆形与斜线沿 45 度对角线匀速平移与旋转展开，演变为科技产品轮廓。',
        stepPrompt: 'Kinetic typography and graphic motion, red circle scales up smoothly, blue triangles slide along 45 degree grid lines, seamless vector constructivism animation, elegant and precise.',
        parameters: 'Motion: 5, Smooth: High',
        keyTechniques: [
          '保持几何图形运动的线性（Linear）或平滑缓出（Ease-out），避免物理弹簧形变',
          '图形展开的终点无缝过渡到客户的数码产品或 Logo 轮廓'
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
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to load image cases from localStorage', e);
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
    version: '1.0.0',
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