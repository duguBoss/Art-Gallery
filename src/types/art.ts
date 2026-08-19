export type HallCategory = 
  | 'all'
  | 'surreal-mystery'   // 悬疑与暗黑超现实展厅
  | 'digital-future'    // 数字体素与赛博未来展厅
  | 'traditional-zen'   // 传统典雅与东方意境展厅
  | 'modern-geometry'   // 现代主义与几何狂想展厅
  | 'whimsical-3d';     // 治愈手绘与趣味3D展厅

export type VideoScenarioId =
  | 'all'
  | 'brand-film'       // 1.1 品牌大片与影视内容
  | 'visual-packaging'  // 1.2 视觉创意与内容包装
  | 'motion-graphics'   // 1.3 动态图形、MG动画、AE特效
  | 'ar-creative'       // 1.4 AR现实增强创意视频
  | 'ai-narrative'      // 1.5 AI 剧情内容创作
  | 'product-ecommerce' // 1.6 产品与电商营销
  | 'game-experience'   // 1.7 数字体验与游戏创意
  | 'industrial-robot'  // 1.8 硬件、实体工业、具身智能演示
  | 'stylized-animation';// 1.9 动画与风格化影像

export interface VideoScenarioInfo {
  id: VideoScenarioId;
  code: string;
  name: string;
  enName: string;
  description: string;
  iconName: string;
  recommendedStyles: string[];
}

export interface HallInfo {
  id: HallCategory;
  name: string;
  enName: string;
  description: string;
  iconName: string;
  themeColor: string;
}

export interface ColorSwatch {
  name: string;
  hex: string;
}

export interface PromptRecipe {
  mjPrompt: string;
  positiveKeywords: string[];
  negativeKeywords: string[];
  parameters: string;
}

export interface TechniqueGuide {
  medium: string;
  brushwork: string;
  lighting: string;
  composition: string;
}

export interface ScenarioApplication {
  scenarioId: VideoScenarioId;
  scenarioName: string;
  useCase: string;
  cameraAdvice: string;
}

export interface Artwork {
  id: string;
  title: string;
  year: string;
  artist?: string;
  description: string;
  imageUrl: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
  tag?: string;
}

export interface ArtStyle {
  id: string;
  title: string;
  englishTitle: string;
  roomNumber: string;
  hall: HallCategory;
  era: string;
  badge: string;
  quote: string;
  summary: string;
  detailedDescription: string;
  visualKeyFeatures: string[];
  colorPalette: ColorSwatch[];
  promptKeywords: PromptRecipe;
  creationTechniques: TechniqueGuide;
  appliedScenarios: ScenarioApplication[];
  representativeWorks: Artwork[];
  likesCount: number;
  featured?: boolean;
}

export interface StyleMixResult {
  styleA: ArtStyle;
  styleB: ArtStyle;
  hybridTitle: string;
  hybridEnTitle: string;
  conceptDescription: string;
  hybridPrompt: string;
  combinedPalette: ColorSwatch[];
  curatorNotes: string;
}