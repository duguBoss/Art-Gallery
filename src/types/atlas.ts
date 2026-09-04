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

export interface DesignPrinciple {
  id: string;
  name: string;
  nameEn: string;
  coreQuestion: string; // "设计师是如何组织画面的？"
  definition: string;
  mechanics: string[]; // 具体的实践技法
  sampleVisualUrl: string;
  beforeAfterScenario: {
    before: string; // 缺乏该原则时的常见平庸痛点
    after: string; // 运用该原则后的升华表现
  };
  accentColor: string;
  linkedStyles: string[]; // 紧密关联的风格 ID
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

export type MotionCategory =
  | 'motion'
  | 'transition'
  | 'camera'
  | 'rhythm'
  | 'spatial'
  | 'cinematography'
  | 'editing'
  | 'effects';

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
  demoAnimationType:
    | 'push-in'
    | 'orbit'
    | 'mask-wipe'
    | 'glitch'
    | 'elastic-bounce'
    | 'parallax-depth'
    | 'tracking-shot'
    | 'rack-focus';
  aestheticPurpose: string; // 传达的情绪与叙事目的
}

export type MediumType = 'web' | 'ui' | 'poster' | '3d' | 'motion' | 'film' | 'photography' | 'illustration';

export interface MediumCategoryInfo {
  id: 'image' | 'interface' | 'space' | 'motion';
  name: string;
  nameEn: string;
  headline: string;
  description: string;
  subcategories: string[];
  bannerImage: string;
  designConsiderations: string[]; // 媒介特有的设计考量
}

export interface AtlasWork {
  id: string;
  title: string;
  titleEn: string;
  medium: MediumType;
  primaryStyleId: string;
  coverImage: string;
  colorPalette: string[];
  atoms: string[]; // Visual atom names / IDs
  principles?: string[]; // Applied design principles
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
