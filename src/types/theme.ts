export type GalleryTheme = 
  | 'cozy-night'    // 暖夜微光 · 温馨居所（夜晚灯光下的温馨场景）
  | 'zen-mist'      // 空山新雨 · 东方禅意（青石水墨与空山竹雨）
  | 'cyber-neon'    // 赛博雨夜 · 霓虹街町（冷调全息与湿漉沥青）
  | 'grand-salon'   // 永恒殿堂 · 巴黎沙龙（卢浮古典金叶与明暗对照）
  | 'ghibli-breeze'; // 夏日晴风 · 云海草甸（吉卜力治愈蓝天与金麦浪）

export interface Spatial3DConfig {
  floorType: 'herringbone-wood' | 'zen-slate' | 'cyber-grid' | 'royal-marble' | 'meadow-tatami';
  floorBaseColor: number;
  floorLineColor: number;
  wallBaseColor: number;
  wallRoughness: number;
  ceilingColor: number;
  benchColor: number;
  frameColor: number;
  frameRoughness: number;
  frameMetalness: number;
  ambientLightColor: number;
  ambientLightIntensity: number;
  keyLightColor: number;
  keyLightIntensity: number;
  spotlightColor: number;
  spotlightIntensity: number;
  fogColor: number;
  fogDensity: number;
  particleColor: number;
  particleCount: number;
  particleSpeed: number;
  particleSize: number;
}

export interface ThemeOption {
  id: GalleryTheme;
  name: string;
  enName: string;
  sceneTitle: string;
  atmosphere: string;
  badge: string;
  previewColor: string;
  accentColor: string;
  textColor: string;
  glowColor: string;
  featuredCategories: string[];
  scene3D: Spatial3DConfig;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'cozy-night',
    name: '暖夜微光',
    enName: 'Warm Night Hearth',
    sceneTitle: '夜晚灯光下的温馨居所',
    atmosphere: '琥珀暖灯 · 壁炉柴火 · 窗外细雨与热红茶',
    badge: '温馨治愈',
    previewColor: '#1A1410',
    accentColor: '#E07A5F',
    textColor: '#F4ECE4',
    glowColor: 'rgba(224, 122, 95, 0.25)',
    featuredCategories: ['暖夜温馨', '童话治愈'],
    scene3D: {
      floorType: 'herringbone-wood',
      floorBaseColor: 0x18110c,
      floorLineColor: 0x271c14,
      wallBaseColor: 0x221812,
      wallRoughness: 0.88,
      ceilingColor: 0x140e0a,
      benchColor: 0x281a12,
      frameColor: 0x3d2719,
      frameRoughness: 0.4,
      frameMetalness: 0.2,
      ambientLightColor: 0xffe2cc,
      ambientLightIntensity: 0.42,
      keyLightColor: 0xffa057,
      keyLightIntensity: 1.35,
      spotlightColor: 0xffebd6,
      spotlightIntensity: 5.5,
      fogColor: 0x0f0b08,
      fogDensity: 0.024,
      particleColor: 0xff9944,
      particleCount: 180,
      particleSpeed: 0.003,
      particleSize: 0.08,
    },
  },
  {
    id: 'zen-mist',
    name: '空山新雨',
    enName: 'Misty Rain Zen',
    sceneTitle: '水墨烟雨与东方禅茶',
    atmosphere: '竹林雾霭 · 青石古阶 · 宣纸渗化与天青釉',
    badge: '东方意境',
    previewColor: '#151C18',
    accentColor: '#52B788',
    textColor: '#E8F1EC',
    glowColor: 'rgba(82, 183, 136, 0.22)',
    featuredCategories: ['东方意境'],
    scene3D: {
      floorType: 'zen-slate',
      floorBaseColor: 0x111613,
      floorLineColor: 0x1d2922,
      wallBaseColor: 0x18201a,
      wallRoughness: 0.95,
      ceilingColor: 0x0c110e,
      benchColor: 0x1b241e,
      frameColor: 0x141a16,
      frameRoughness: 0.6,
      frameMetalness: 0.1,
      ambientLightColor: 0xd6ede1,
      ambientLightIntensity: 0.45,
      keyLightColor: 0x72c499,
      keyLightIntensity: 1.1,
      spotlightColor: 0xe4f8ee,
      spotlightIntensity: 5.2,
      fogColor: 0x0e1410,
      fogDensity: 0.028,
      particleColor: 0x9be8bd,
      particleCount: 220,
      particleSpeed: 0.005,
      particleSize: 0.06,
    },
  },
  {
    id: 'cyber-neon',
    name: '赛博雨夜',
    enName: 'Neon Cyber Alley',
    sceneTitle: '霓虹冷冽与全息街町',
    atmosphere: '湿漉沥青 · 全息水波 · 荧光青蓝与洋红倒影',
    badge: '先锋科幻',
    previewColor: '#090D16',
    accentColor: '#00F0FF',
    textColor: '#E2F1FF',
    glowColor: 'rgba(0, 240, 255, 0.28)',
    featuredCategories: ['赛博未来', '先锋3D'],
    scene3D: {
      floorType: 'cyber-grid',
      floorBaseColor: 0x050811,
      floorLineColor: 0x00e5ff,
      wallBaseColor: 0x0a1020,
      wallRoughness: 0.35,
      ceilingColor: 0x04060c,
      benchColor: 0x081022,
      frameColor: 0x00f0ff,
      frameRoughness: 0.2,
      frameMetalness: 0.85,
      ambientLightColor: 0x00bfff,
      ambientLightIntensity: 0.38,
      keyLightColor: 0xff0077,
      keyLightIntensity: 1.5,
      spotlightColor: 0x00ffff,
      spotlightIntensity: 6.0,
      fogColor: 0x040712,
      fogDensity: 0.026,
      particleColor: 0x00f0ff,
      particleCount: 260,
      particleSpeed: 0.008,
      particleSize: 0.09,
    },
  },
  {
    id: 'grand-salon',
    name: '永恒殿堂',
    enName: 'Grand Louvre Salon',
    sceneTitle: '古典卢浮宫与烫金沙龙',
    atmosphere: '巴洛克雕花 · 羊皮纸暖白 · 卡拉瓦乔戏剧光',
    badge: '古典高雅',
    previewColor: '#2B2118',
    accentColor: '#D4AF37',
    textColor: '#FAF4E8',
    glowColor: 'rgba(212, 175, 55, 0.25)',
    featuredCategories: ['古典高雅', '电影质感'],
    scene3D: {
      floorType: 'royal-marble',
      floorBaseColor: 0x221811,
      floorLineColor: 0x3d2c1d,
      wallBaseColor: 0x2d1f15,
      wallRoughness: 0.75,
      ceilingColor: 0x1a120b,
      benchColor: 0x382314,
      frameColor: 0xd4af37,
      frameRoughness: 0.25,
      frameMetalness: 0.75,
      ambientLightColor: 0xfff0d4,
      ambientLightIntensity: 0.45,
      keyLightColor: 0xd4af37,
      keyLightIntensity: 1.4,
      spotlightColor: 0xfffaed,
      spotlightIntensity: 6.0,
      fogColor: 0x160f09,
      fogDensity: 0.022,
      particleColor: 0xffdf78,
      particleCount: 190,
      particleSpeed: 0.003,
      particleSize: 0.07,
    },
  },
  {
    id: 'ghibli-breeze',
    name: '夏日晴风',
    enName: 'Ghibli Summer Meadow',
    sceneTitle: '吉卜力云海与明媚草甸',
    atmosphere: '盛夏积雨云 · 碧空微风 · 治愈麦田与阳光斑驳',
    badge: '清新明媚',
    previewColor: '#EBF4F6',
    accentColor: '#1D70B8',
    textColor: '#1A2938',
    glowColor: 'rgba(29, 112, 184, 0.2)',
    featuredCategories: ['童话治愈', '暖夜温馨', '东方意境'],
    scene3D: {
      floorType: 'meadow-tatami',
      floorBaseColor: 0xdbe7db,
      floorLineColor: 0xa8c2a8,
      wallBaseColor: 0xf2f7f9,
      wallRoughness: 0.6,
      ceilingColor: 0xbed6e5,
      benchColor: 0xc8a168,
      frameColor: 0x8a6237,
      frameRoughness: 0.45,
      frameMetalness: 0.1,
      ambientLightColor: 0xecf8ff,
      ambientLightIntensity: 0.75,
      keyLightColor: 0xffea88,
      keyLightIntensity: 1.2,
      spotlightColor: 0xffffff,
      spotlightIntensity: 4.8,
      fogColor: 0xd6eaf8,
      fogDensity: 0.015,
      particleColor: 0xfff59d,
      particleCount: 240,
      particleSpeed: 0.004,
      particleSize: 0.08,
    },
  },
];