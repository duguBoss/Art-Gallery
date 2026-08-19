export type HallCategory = 
  | 'all'
  | 'surreal-mystery'   // 悬疑与暗黑超现实展厅
  | 'digital-future'    // 数字体素与赛博未来展厅
  | 'traditional-zen'   // 传统典雅与东方意境展厅
  | 'modern-geometry'   // 现代主义与几何狂想展厅
  | 'whimsical-3d'      // 治愈幻想与趣味3D展厅
  | 'classic-gothic';   // 古典手稿与华丽暗黑展厅

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