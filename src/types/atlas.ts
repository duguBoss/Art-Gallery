export type VisualDimension = 'color' | 'composition' | 'typography' | 'light' | 'texture' | 'space';

export interface VisualAtom {
  id: string;
  name: string;
  nameEn: string;
  dimension: VisualDimension;
  formula: string; // e.g., "冷调环境光 + 暖调轮廓光 = 视觉焦点"
  description: string;
  principle: string; // 为什么好看？背后的设计学原理
  sampleVisualUrl: string;
  accentColor: string;
  tags: string[];
}

export interface StyleRuleEquation {
  id: string;
  name: string;
  nameEn: string;
  equation: string[]; // e.g. ["高对比粗黑体", "原始未加工排版", "不对称几何破格", "碰撞荧光色"]
  historicalContext: string;
  aestheticMood: string;
  colorPalette: string[];
  recommendedTypefaces: string[];
  bannerImage: string;
  keyAtoms: string[]; // Linked atom IDs
}

export type MotionCategory = 'motion' | 'transition' | 'camera' | 'rhythm' | 'spatial' | 'effects';

export interface MotionKeyframeEvent {
  time: string; // e.g. "00:01"
  action: string; // e.g. "PUSH IN 缓慢推进"
  detail: string; // e.g. "焦距由 35mm 缓推至主体 50mm"
}

export interface MotionLanguageItem {
  id: string;
  name: string;
  nameEn: string;
  category: MotionCategory;
  description: string;
  cameraMovement?: string;
  rhythmCurve?: string;
  timelineEvents: MotionKeyframeEvent[];
  demoVideoUrl?: string;
  demoAnimationType: 'push-in' | 'orbit' | 'mask-wipe' | 'glitch' | 'elastic-bounce' | 'parallax-depth' | 'tracking-shot';
  aestheticPurpose: string; // 传达的情绪与叙事目的
}

export type MediumType = 'web' | 'ui' | 'poster' | '3d' | 'motion' | 'film';

export interface AtlasWork {
  id: string;
  title: string;
  titleEn: string;
  medium: MediumType;
  primaryStyleId: string;
  coverImage: string;
  colorPalette: string[];
  atoms: string[]; // Visual atom names / IDs
  motionLanguage?: string[];
  dimensionsRatio: 'portrait' | 'landscape' | 'square';
  whyItWorks: {
    composition: string;
    lightAndColor: string;
    spaceAndRhythm: string;
  };
  rebuildGuide: {
    tools: string[];
    cssSnippet?: string;
    promptTips: string;
  };
  authorOrSource?: string;
}
