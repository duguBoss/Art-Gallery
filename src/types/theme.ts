export type GalleryTheme = 'concrete' | 'salon' | 'sage' | 'midnight';

export interface ThemeOption {
  id: GalleryTheme;
  name: string;
  enName: string;
  inspiration: string;
  badge: string;
  previewColor: string;
  accentColor: string;
  textColor: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'concrete',
    name: '清水微水泥',
    enName: 'Raw Concrete',
    inspiration: '安藤忠雄·纯粹建筑灰',
    badge: '极简先锋',
    previewColor: '#EBE9E4',
    accentColor: '#B85D38',
    textColor: '#202428',
  },
  {
    id: 'salon',
    name: '法式奶油木',
    enName: 'Vintage Salon',
    inspiration: '巴黎奥赛·复古羊皮纸',
    badge: '典雅沙龙',
    previewColor: '#F3ECE1',
    accentColor: '#9E3A26',
    textColor: '#2E251E',
  },
  {
    id: 'sage',
    name: '莫兰迪鼠尾草',
    enName: 'Nordic Sage',
    inspiration: '北欧慢调·静谧灰绿',
    badge: '自然呼吸',
    previewColor: '#E5ECE7',
    accentColor: '#2E6B56',
    textColor: '#1D2A22',
  },
  {
    id: 'midnight',
    name: '午夜深海蓝',
    enName: 'Midnight Cinema',
    inspiration: '好莱坞胶片·钛金夜幕',
    badge: '深邃沉浸',
    previewColor: '#0D131C',
    accentColor: '#38BDF8',
    textColor: '#F1F5F9',
  }
];