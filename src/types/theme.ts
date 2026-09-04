export type GalleryTheme = 
  | 'cozy-night'    // 暖夜微光 · 温馨居所（夜晚灯光下的温馨场景）
  | 'zen-mist'      // 空山新雨 · 东方禅意（青石水墨与空山竹雨）
  | 'cyber-neon'    // 赛博雨夜 · 霓虹街町（冷调全息与湿漉沥青）
  | 'grand-salon'   // 永恒殿堂 · 巴黎沙龙（卢浮古典金叶与明暗对照）
  | 'ghibli-breeze'; // 夏日晴风 · 云海草甸（吉卜力治愈蓝天与金麦浪）

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
  },
];