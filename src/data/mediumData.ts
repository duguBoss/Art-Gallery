import type { MediumCategoryInfo } from '../types/atlas';

export const MEDIUM_CATEGORIES: MediumCategoryInfo[] = [
  {
    id: 'image',
    name: '图像与平面',
    nameEn: 'Image & Graphic Design',
    headline: '二维平面的纯粹视觉张力与观念表达',
    description: '涵盖摄影、插画、海报、画报与数字概念艺术。在单帧画幅中以极致的构图、色彩与质感凝固时间。',
    subcategories: ['Photography 摄影艺术', 'Illustration 概念插画', 'Poster 平面海报', 'Graphic Design 视觉编排', 'Digital Art 数字纯艺'],
    bannerImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
    designConsiderations: [
      '单画幅内完整闭环的信息层级与叙事深度',
      '印刷纸张肌理、油墨质感与银盐颗粒考究',
      '超现实比例差与留白张力控制',
    ],
  },
  {
    id: 'interface',
    name: '数字界面与交互',
    nameEn: 'Interface & Interaction',
    headline: '人机对话维度的信息架构与微交互美学',
    description: '涵盖 Web 官网、移动 App、UI 控件系统与数据大屏。兼具艺术审美与极高的人机可用性。',
    subcategories: ['Web 官方网站', 'UI 界面设计', 'App 移动应用', 'Dashboard 数据大屏', 'Interaction 交互动效'],
    bannerImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    designConsiderations: [
      '动态响应式断点与视口自适应排版',
      '点击反馈、悬停状态与微交互物理回弹',
      '认知负荷最小化与极客微层级 (Micro-Hierarchy)',
    ],
  },
  {
    id: 'space',
    name: '三维与空间设计',
    nameEn: 'Space & 3D Environment',
    headline: '物理纵深、建筑光影与沉浸体验场域',
    description: '涵盖 3D 渲染、建筑空间设计、装置艺术与虚拟空间。打破屏幕扁平局限，注入真实物理光线追踪与体积深度。',
    subcategories: ['3D 场景渲染', 'Architecture 建筑空间', 'Installation 艺术装置', 'Spatial Design 空间交互'],
    bannerImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    designConsiderations: [
      '物理材质反射度 (Roughness/Metallic) 与次表面散射',
      '真实三维空间中的丁达尔体积光与环境遮蔽 (AO)',
      '观察者视点 (POV) 移动带来的透视拉伸',
    ],
  },
  {
    id: 'motion',
    name: '动态影像与视听',
    nameEn: 'Motion & Cinema',
    headline: '引入时间轴的视听节奏、镜头调度与情感起伏',
    description: '涵盖动态图形 (MG)、实验动画、影视分镜与电影片头。以秒为刻度掌控情绪波动。',
    subcategories: ['Motion Graphics 动态图形', 'Animation 实验动画', 'Film 影视分镜', 'Title Design 电影片头', 'VFX 影视级特效'],
    bannerImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    designConsiderations: [
      '时序分镜关键帧 (Keyframes) 的严密把控',
      '镜头运镜 (Push/Pull/Orbit) 与音效重拍卡点契合',
      '转场遮罩撕开的无缝时空衔接',
    ],
  },
];
