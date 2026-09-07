import type { KnowledgeDomain, KnowledgeDomainId, KnowledgeNode, LearningPath } from '../types/visualAtlas';

export const KNOWLEDGE_DOMAINS: KnowledgeDomain[] = [
  { id: 'visual-foundations', name: '视觉基础', nameEn: 'Visual Foundations', description: '构图、色彩、字体、版式、光影与视觉层级。', descriptionEn: 'Composition, color, typography, layout, light and visual hierarchy.', knowledgeCount: 5, topics: ['构图', '色彩', '字体', '版式'] },
  { id: 'graphic-design', name: '平面设计', nameEn: 'Graphic Design', description: '海报、品牌、编辑设计、信息图与视觉系统。', descriptionEn: 'Posters, identity, editorial design, infographics and visual systems.', knowledgeCount: 5, topics: ['品牌', '海报', '编辑', '信息图'] },
  { id: 'ui-ux', name: 'UI / UX', nameEn: 'UI / UX', description: '界面、交互、信息架构、设计系统与产品体验。', descriptionEn: 'Interfaces, interaction, IA, design systems and product experience.', knowledgeCount: 5, topics: ['界面', '交互', 'IA', '系统'] },
  { id: 'photography', name: '摄影', nameEn: 'Photography', description: '曝光、镜头、景深、光线与摄影语言。', descriptionEn: 'Exposure, optics, depth of field, lighting and photographic language.', knowledgeCount: 5, topics: ['曝光', '镜头', '景深', '光线'] },
  { id: 'video-editing', name: '视频与剪辑', nameEn: 'Video & Editing', description: '镜头语言、叙事、节奏、剪辑、调色与声音。', descriptionEn: 'Shot language, narrative, pacing, editing, color and sound.', knowledgeCount: 5, topics: ['镜头', '节奏', '剪辑', '调色'] },
  { id: 'motion', name: '动态设计 / AE', nameEn: 'Motion / After Effects', description: '动画原理、时间、缓动、图形动画与合成。', descriptionEn: 'Animation principles, timing, easing, motion graphics and compositing.', knowledgeCount: 5, topics: ['动画', '缓动', '图形', '合成'] },
  { id: '3d', name: '3D 设计', nameEn: '3D Design', description: '建模、材质、灯光、摄影机、动画与渲染。', descriptionEn: 'Modeling, materials, lighting, cameras, animation and rendering.', knowledgeCount: 5, topics: ['建模', '材质', '灯光', '渲染'] },
  { id: 'audio', name: '声音与视听', nameEn: 'Audio & Sound', description: '音乐、音效、混音、声音叙事与视听关系。', descriptionEn: 'Music, SFX, mixing, sonic storytelling and audiovisual relationships.', knowledgeCount: 5, topics: ['音乐', '音效', '混音', '叙事'] },
  { id: 'ai-creation', name: 'AI 创作', nameEn: 'AI Creation', description: 'Prompt、图像、视频、工作流与 AI 辅助创作。', descriptionEn: 'Prompting, image, video, workflows and AI-assisted creation.', knowledgeCount: 5, topics: ['Prompt', '图像', '视频', '工作流'] },
  { id: 'software', name: '创作软件', nameEn: 'Creative Software', description: '理解软件定位、核心能力与跨软件工作流。', descriptionEn: 'Understand tool roles, core capabilities and cross-app workflows.', knowledgeCount: 5, topics: ['Photoshop', 'Figma', 'Premiere', 'Blender'] },
  { id: 'creative-systems', name: '创作系统', nameEn: 'Creative Systems', description: '设计系统、素材管理、工作流、交付与协作。', descriptionEn: 'Design systems, asset management, workflows, delivery and collaboration.', knowledgeCount: 5, topics: ['流程', '规范', '素材', '交付'] },
  { id: 'methodology', name: '创作方法论', nameEn: 'Creative Methodology', description: '从问题定义到研究、迭代、判断与作品复盘。', descriptionEn: 'Problem framing, research, iteration, critique and creative decision-making.', knowledgeCount: 5, topics: ['研究', '策略', '迭代', '复盘'] },
];

const n = (id: string, slug: string, title: string, titleEn: string, summary: string, summaryEn: string, domainId: KnowledgeDomainId, level: KnowledgeNode['level'], software: string[], tags: string[], relatedIds: string[] = []): KnowledgeNode => ({ id, slug, title, titleEn, summary, summaryEn, domainId, level, software, tags, relatedIds, toolIds: [] });

export const KNOWLEDGE_NODES: KnowledgeNode[] = [
  n('composition', 'composition', '构图', 'Composition', '组织画面元素，让视线、信息与空间形成秩序。', 'Organize visual elements so attention, information and space form a clear hierarchy.', 'visual-foundations', 'beginner', [], ['构图', '层级', '空间']),
  n('color-theory', 'color-theory', '色彩理论', 'Color Theory', '理解色相、明度、饱和度以及色彩关系。', 'Understand hue, value, saturation and color relationships.', 'visual-foundations', 'beginner', [], ['色彩', '对比', '配色']),
  n('typography', 'typography', '字体与排版', 'Typography', '用字体、字距、行距和层级组织信息。', 'Use type, spacing and hierarchy to organize information.', 'visual-foundations', 'beginner', ['Figma', 'Photoshop'], ['字体', '排版', '层级']),
  n('grid-system', 'grid-system', '网格系统', 'Grid Systems', '用网格建立对齐、节奏和可扩展的版式结构。', 'Use grids to establish alignment, rhythm and scalable layouts.', 'visual-foundations', 'intermediate', ['Figma', 'InDesign'], ['网格', '版式', '系统']),
  n('visual-hierarchy', 'visual-hierarchy', '视觉层级', 'Visual Hierarchy', '决定用户先看什么、再看什么以及为什么。', 'Control what viewers see first, next and why.', 'visual-foundations', 'beginner', ['Figma'], ['层级', '注意力', '信息']),

  n('poster-design', 'poster-design', '海报设计', 'Poster Design', '在有限画面里建立主题、冲突和视觉记忆点。', 'Create a strong theme, tension and visual hook within a limited canvas.', 'graphic-design', 'beginner', ['Photoshop', 'Illustrator'], ['海报', '视觉传播']),
  n('brand-identity', 'brand-identity', '品牌视觉识别', 'Brand Identity', '把品牌策略转化为可持续使用的视觉语言。', 'Translate brand strategy into a reusable visual language.', 'graphic-design', 'intermediate', ['Illustrator', 'Figma'], ['品牌', 'VI', '系统']),
  n('editorial-design', 'editorial-design', '编辑设计', 'Editorial Design', '通过文字、图片、网格和节奏组织长内容。', 'Structure long-form content with type, imagery, grids and rhythm.', 'graphic-design', 'intermediate', ['InDesign', 'Figma'], ['编辑', '杂志', '网格']),
  n('infographic', 'infographic', '信息图', 'Infographic', '把复杂数据转化为可快速理解的视觉结构。', 'Turn complex data into visual structures that can be understood quickly.', 'graphic-design', 'intermediate', ['Illustrator', 'Figma'], ['信息图', '数据', '可视化']),
  n('design-critique', 'design-critique', '设计评审', 'Design Critique', '用目标、证据和视觉原则判断方案，而不是只谈好不好看。', 'Evaluate work with goals, evidence and principles instead of taste alone.', 'graphic-design', 'advanced', ['Figma'], ['评审', '判断', '反馈']),

  n('information-architecture', 'information-architecture', '信息架构', 'Information Architecture', '决定内容如何分类、命名和被用户找到。', 'Define how content is grouped, named and discovered.', 'ui-ux', 'beginner', ['Figma'], ['IA', '导航', '结构']),
  n('interaction-design', 'interaction-design', '交互设计', 'Interaction Design', '设计用户与产品之间的动作、反馈和状态变化。', 'Design actions, feedback and state changes between user and product.', 'ui-ux', 'intermediate', ['Figma'], ['交互', '状态', '反馈']),
  n('design-system', 'design-system', '设计系统', 'Design Systems', '把颜色、字体、组件和规则变成可复用系统。', 'Turn colors, type, components and rules into a reusable system.', 'ui-ux', 'intermediate', ['Figma'], ['组件', '规范', '系统']),
  n('responsive-layout', 'responsive-layout', '响应式布局', 'Responsive Layout', '让同一信息结构适应手机、平板和桌面。', 'Adapt one information structure across mobile, tablet and desktop.', 'ui-ux', 'intermediate', ['Figma', 'CSS'], ['响应式', '布局']),
  n('usability', 'usability', '可用性', 'Usability', '降低理解、操作和学习成本，让界面更容易使用。', 'Reduce cognitive, interaction and learning costs.', 'ui-ux', 'beginner', ['Figma'], ['可用性', '体验']),

  n('exposure-triangle', 'exposure-triangle', '曝光三要素', 'Exposure Triangle', '光圈、快门和 ISO 共同决定曝光与画面效果。', 'Aperture, shutter speed and ISO jointly shape exposure and image character.', 'photography', 'beginner', ['Lightroom'], ['曝光', '光圈', '快门', 'ISO']),
  n('focal-length', 'focal-length', '焦距与视角', 'Focal Length', '理解焦距如何改变视角、空间关系与主体比例。', 'Understand how focal length changes angle of view, spatial relationships and proportions.', 'photography', 'beginner', [], ['镜头', '视角']),
  n('depth-of-field', 'depth-of-field', '景深', 'Depth of Field', '景深决定画面中哪些区域保持清晰。', 'Depth of field controls which areas of a scene remain sharp.', 'photography', 'intermediate', ['Lightroom'], ['景深', '焦点']),
  n('lighting-basics', 'lighting-basics', '摄影布光', 'Lighting Basics', '通过光源方向、大小和强度塑造主体。', 'Shape subjects through light direction, size and intensity.', 'photography', 'intermediate', [], ['灯光', '影调']),
  n('cinematic-photography', 'cinematic-photography', '电影感摄影', 'Cinematic Photography', '综合镜头、光线、色彩和构图建立叙事感。', 'Combine optics, lighting, color and composition for narrative imagery.', 'photography', 'advanced', ['Lightroom', 'DaVinci Resolve'], ['电影感', '叙事']),

  n('shot-size', 'shot-size', '景别', 'Shot Size', '远景、中景、近景等决定信息量和情绪距离。', 'Shot sizes control information density and emotional distance.', 'video-editing', 'beginner', ['Premiere', 'DaVinci Resolve'], ['景别', '镜头语言']),
  n('editing-rhythm', 'editing-rhythm', '剪辑节奏', 'Editing Rhythm', '通过镜头长度、动作和声音组织观看节奏。', 'Use shot duration, action and sound to shape viewing rhythm.', 'video-editing', 'intermediate', ['Premiere', 'DaVinci Resolve'], ['节奏', '剪辑']),
  n('match-cut', 'match-cut', '匹配剪辑', 'Match Cut', '利用形状、动作或意义上的相似完成镜头连接。', 'Connect shots through visual, motion or semantic similarity.', 'video-editing', 'intermediate', ['Premiere'], ['转场', '叙事']),
  n('color-grading', 'color-grading', '视频调色', 'Color Grading', '建立曝光、对比、色彩和风格一致性的后期流程。', 'Build consistent exposure, contrast, color and style in post.', 'video-editing', 'intermediate', ['DaVinci Resolve', 'Premiere'], ['调色', '后期']),
  n('sound-editing', 'sound-editing', '声音剪辑', 'Sound Editing', '用对白、音乐和音效增强画面节奏与叙事。', 'Use dialogue, music and effects to reinforce visual rhythm and story.', 'video-editing', 'intermediate', ['Premiere', 'DaVinci Resolve'], ['声音', '音效']),

  n('animation-principles', 'animation-principles', '动画十二原则', '12 Principles of Animation', '理解预备、跟随、缓入缓出等动画基础。', 'Learn anticipation, follow-through, easing and other animation fundamentals.', 'motion', 'beginner', ['After Effects', 'Blender'], ['动画原理', '运动']),
  n('easing', 'easing', '缓动', 'Easing', '改变运动速度曲线，让动画从机械运动变得有生命力。', 'Shape velocity curves so motion feels intentional rather than mechanical.', 'motion', 'beginner', ['After Effects', 'CSS', 'GSAP'], ['缓动', '曲线']),
  n('motion-typography', 'motion-typography', '动态字体', 'Motion Typography', '用时间、节奏和层级让文字成为运动视觉元素。', 'Use timing, rhythm and hierarchy to turn type into moving visual elements.', 'motion', 'intermediate', ['After Effects'], ['文字动画', '排版']),
  n('motion-graphics', 'motion-graphics', '动态图形', 'Motion Graphics', '把形状、图标、文字和节奏组合成动态视觉系统。', 'Combine shapes, icons, type and rhythm into motion systems.', 'motion', 'intermediate', ['After Effects', 'Cavalry'], ['动态图形', '系统']),
  n('compositing', 'compositing', '合成', 'Compositing', '把多个视觉元素整合到同一空间并统一光色关系。', 'Integrate multiple visual elements into one coherent space and light/color system.', 'motion', 'advanced', ['After Effects', 'Nuke'], ['合成', 'VFX']),

  n('3d-coordinates', '3d-coordinates', '3D 坐标与空间', '3D Coordinates & Space', '理解 XYZ、Transform、层级和空间关系。', 'Understand XYZ, transforms, hierarchy and spatial relationships.', '3d', 'beginner', ['Blender', 'Cinema 4D'], ['3D', '空间']),
  n('3d-modeling', '3d-modeling', '多边形建模', 'Polygon Modeling', '用顶点、边和面建立可控的三维形体。', 'Build controllable forms from vertices, edges and faces.', '3d', 'beginner', ['Blender', 'Cinema 4D'], ['建模', 'Polygon']),
  n('pbr-material', 'pbr-material', 'PBR 材质', 'PBR Materials', '用 Base Color、Roughness、Metallic 等参数模拟材质。', 'Use Base Color, Roughness, Metallic and related properties to describe materials.', '3d', 'intermediate', ['Blender', 'Substance 3D'], ['材质', 'PBR']),
  n('3d-lighting', '3d-lighting', '3D 灯光', '3D Lighting', '通过主光、辅光、轮廓光和环境光塑造空间。', 'Shape a 3D scene with key, fill, rim and environment lighting.', '3d', 'intermediate', ['Blender', 'Cinema 4D'], ['灯光', '空间']),
  n('3d-rendering', '3d-rendering', '渲染', 'Rendering', '理解采样、阴影、反射、全局光照和渲染成本。', 'Understand sampling, shadows, reflections, global illumination and render cost.', '3d', 'advanced', ['Blender', 'Cinema 4D', 'Houdini'], ['渲染', '性能']),

  n('music-editing', 'music-editing', '音乐剪辑', 'Music Editing', '选择、裁切和组织音乐，让结构服务于画面。', 'Select, cut and structure music so it serves the visual edit.', 'audio', 'beginner', ['Premiere', 'DaVinci Resolve'], ['音乐', '节奏']),
  n('sound-effects', 'sound-effects', '音效设计', 'Sound Effects', '用拟音、环境声和冲击音建立空间与动作反馈。', 'Use foley, ambience and impacts to build space and action feedback.', 'audio', 'intermediate', ['Premiere', 'Audition'], ['音效', '拟音']),
  n('mixing-basics', 'mixing-basics', '混音基础', 'Mixing Basics', '平衡对白、音乐和音效的响度与频率关系。', 'Balance dialogue, music and effects by level and frequency.', 'audio', 'intermediate', ['Audition', 'DaVinci Resolve'], ['混音', '响度']),
  n('sound-perspective', 'sound-perspective', '声音视角', 'Sound Perspective', '用距离、方向和混响让声音与空间位置一致。', 'Match sound distance, direction and reverb to visual space.', 'audio', 'advanced', ['DaVinci Resolve', 'Audition'], ['空间', '叙事']),
  n('audiovisual-sync', 'audiovisual-sync', '视听同步', 'Audiovisual Sync', '让声音的节拍、动作和剪辑点形成有意识的关系。', 'Create intentional relationships between beats, actions and edit points.', 'audio', 'intermediate', ['Premiere', 'After Effects'], ['同步', '节奏']),

  n('prompt-structure', 'prompt-structure', 'Prompt 结构', 'Prompt Structure', '把主体、场景、镜头、光线、色彩和构图组织成可控描述。', 'Structure subject, scene, optics, lighting, color and composition into controllable descriptions.', 'ai-creation', 'beginner', ['ChatGPT', 'Gemini'], ['Prompt', '结构']),
  n('ai-image-composition', 'ai-image-composition', 'AI 图像构图控制', 'AI Image Composition', '用构图语言控制主体位置、视角、景别和空间。', 'Control subject placement, viewpoint, shot size and space with composition language.', 'ai-creation', 'intermediate', ['Midjourney', 'Flux'], ['图像', '构图']),
  n('ai-video-direction', 'ai-video-direction', 'AI 视频导演', 'AI Video Direction', '把镜头运动、动作、时间和声音写成可执行提示。', 'Describe camera motion, action, timing and sound as executable direction.', 'ai-creation', 'intermediate', ['Veo', 'Runway'], ['视频', '导演']),
  n('ai-workflow', 'ai-workflow', 'AI 创作工作流', 'AI Creative Workflow', '将生成、筛选、修改、放大和后期串成稳定流程。', 'Connect generation, selection, revision, upscaling and post into a repeatable workflow.', 'ai-creation', 'advanced', ['ChatGPT', 'Gemini'], ['工作流', '自动化']),
  n('ai-consistency', 'ai-consistency', 'AI 视觉一致性', 'AI Visual Consistency', '控制角色、材质、色彩和镜头语言在多张图中的一致。', 'Maintain character, material, color and camera consistency across outputs.', 'ai-creation', 'advanced', ['Flux', 'ComfyUI'], ['一致性', '角色']),

  n('photoshop-role', 'photoshop', 'Photoshop：像素与合成', 'Photoshop: Pixels & Compositing', '理解 Photoshop 在修图、合成、绘制和视觉后期中的定位。', 'Understand Photoshop for retouching, compositing, painting and visual post-production.', 'software', 'beginner', ['Photoshop'], ['Photoshop', '后期']),
  n('figma-role', 'figma', 'Figma：界面与系统', 'Figma: Interfaces & Systems', '理解 Figma 在 UI、原型和设计系统中的工作方式。', 'Understand Figma for UI, prototyping and design systems.', 'software', 'beginner', ['Figma'], ['Figma', 'UI']),
  n('premiere-role', 'premiere-pro', 'Premiere Pro：时间线剪辑', 'Premiere Pro: Timeline Editing', '理解 Premiere 在剪辑、声音、字幕和交付中的定位。', 'Understand Premiere for editing, sound, captions and delivery.', 'software', 'beginner', ['Premiere'], ['Premiere', '剪辑']),
  n('after-effects-role', 'after-effects', 'After Effects：合成与动态', 'After Effects: Compositing & Motion', '理解 AE 与剪辑软件、3D 软件之间的边界与协作。', 'Understand AE and how it collaborates with editing and 3D tools.', 'software', 'intermediate', ['After Effects', 'Premiere', 'Blender'], ['AE', '动态', '合成']),
  n('blender-role', 'blender', 'Blender：通用 3D', 'Blender: General-purpose 3D', '理解 Blender 从建模、材质、动画到渲染的完整链路。', 'Understand Blender across modeling, materials, animation and rendering.', 'software', 'beginner', ['Blender'], ['Blender', '3D']),

  n('creative-brief', 'creative-brief', '创意 Brief', 'Creative Brief', '在动手之前明确目标、受众、约束、交付物和判断标准。', 'Define goals, audience, constraints, deliverables and criteria before making.', 'creative-systems', 'beginner', [], ['Brief', '策略']),
  n('asset-management', 'asset-management', '素材管理', 'Asset Management', '建立命名、目录、版本和素材复用规则。', 'Create naming, folder, versioning and reuse rules for assets.', 'creative-systems', 'beginner', ['Figma', 'Photoshop'], ['素材', '版本']),
  n('design-tokens', 'design-tokens', '设计 Token', 'Design Tokens', '把颜色、间距、字体等抽象为可复用参数。', 'Abstract color, spacing, type and other values into reusable parameters.', 'creative-systems', 'advanced', ['Figma', 'CSS'], ['Token', '系统']),
  n('handoff', 'handoff', '设计交付', 'Design Handoff', '让设计意图、尺寸、状态和资源准确进入开发或制作环节。', 'Transfer intent, dimensions, states and assets accurately into production.', 'creative-systems', 'intermediate', ['Figma'], ['交付', '协作']),
  n('version-control-for-creators', 'version-control-for-creators', '创作版本管理', 'Versioning for Creators', '用清晰版本记录降低返工和素材丢失。', 'Use clear versions to reduce rework and lost assets.', 'creative-systems', 'intermediate', ['Git', 'Figma'], ['版本', '协作']),

  n('research', 'creative-research', '创意研究', 'Creative Research', '从参考、竞品、用户和文化语境中提炼问题与机会。', 'Extract problems and opportunities from references, competitors, users and culture.', 'methodology', 'beginner', [], ['研究', '参考']),
  n('moodboard', 'moodboard', '情绪板', 'Moodboard', '把抽象方向转成可讨论的视觉证据。', 'Turn an abstract direction into discussable visual evidence.', 'methodology', 'beginner', ['Figma'], ['Moodboard', '方向']),
  n('iteration', 'iteration', '迭代', 'Iteration', '通过小步实验不断缩小不确定性，而不是一次追求完美。', 'Reduce uncertainty through small experiments instead of chasing perfection in one pass.', 'methodology', 'intermediate', [], ['迭代', '实验']),
  n('creative-constraints', 'creative-constraints', '创作约束', 'Creative Constraints', '主动设置限制，让选择更清晰、产出更稳定。', 'Use deliberate constraints to make choices clearer and output more consistent.', 'methodology', 'intermediate', [], ['约束', '决策']),
  n('postmortem', 'creative-postmortem', '作品复盘', 'Creative Postmortem', '从目标、过程、结果和反馈中提炼下一次可复用经验。', 'Extract reusable lessons from goals, process, outcome and feedback.', 'methodology', 'advanced', [], ['复盘', '经验']),
];

export const LEARNING_PATHS: LearningPath[] = [
  { id: 'design-zero', title: '零基础视觉设计', titleEn: 'Visual Design from Zero', description: '从视觉元素、构图、色彩到字体和版式，建立设计基础。', descriptionEn: 'Build fundamentals from visual elements, composition, color, type and layout.', domainIds: ['visual-foundations', 'graphic-design'], steps: ['composition', 'color-theory', 'typography', 'grid-system', 'visual-hierarchy', 'poster-design', 'brand-identity', 'design-critique'] },
  { id: 'creator-video', title: '短视频创作者', titleEn: 'Short-form Creator', description: '从景别、节奏、剪辑到调色和声音，完成一条视频。', descriptionEn: 'Go from shots and rhythm to editing, color and sound to finish a video.', domainIds: ['video-editing', 'audio', 'photography'], steps: ['shot-size', 'editing-rhythm', 'match-cut', 'color-grading', 'sound-editing', 'audiovisual-sync'] },
  { id: 'motion-ae', title: 'AE 动态设计入门', titleEn: 'Motion Design with AE', description: '先理解运动原理，再用 AE 做文字、图形和合成。', descriptionEn: 'Learn motion principles first, then build typography, graphics and composites in AE.', domainIds: ['motion', 'software'], steps: ['animation-principles', 'easing', 'motion-typography', 'motion-graphics', 'compositing', 'after-effects-role'] },
  { id: '3d-visual', title: '3D 视觉创作', titleEn: '3D Visual Creator', description: '从空间、建模、材质和灯光走到渲染。', descriptionEn: 'Move from space and modeling through materials, lighting and rendering.', domainIds: ['3d', 'photography'], steps: ['3d-coordinates', '3d-modeling', 'pbr-material', '3d-lighting', '3d-rendering'] },
  { id: 'ai-creator', title: 'AI 视觉创作者', titleEn: 'AI Visual Creator', description: '把传统视觉知识转译成 AI 图像与视频工作流。', descriptionEn: 'Translate visual fundamentals into AI image and video workflows.', domainIds: ['ai-creation', 'visual-foundations', 'methodology'], steps: ['prompt-structure', 'composition', 'ai-image-composition', 'ai-video-direction', 'ai-workflow', 'ai-consistency'] },
];

export function getKnowledgeNode(id: string) { return KNOWLEDGE_NODES.find((node) => node.id === id || node.slug === id); }
export function getKnowledgeDomain(id: KnowledgeDomainId) { return KNOWLEDGE_DOMAINS.find((domain) => domain.id === id); }
export function getNodesByDomain(domainId: KnowledgeDomainId) { return KNOWLEDGE_NODES.filter((node) => node.domainId === domainId); }
