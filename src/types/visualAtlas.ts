export type AtlasTab = 'index' | 'archive' | 'language' | 'dossiers' | 'lab' | 'about' | 'ai';

export type AnalysisMode = 'overview' | 'composition' | 'color' | 'camera' | 'light';

export type LabEngine = 'midjourney' | 'flux' | 'stable-diffusion' | 'gemini' | 'veo';

export interface VisualDnaTag {
  category: 'mood' | 'light' | 'color' | 'camera' | 'composition';
  name: string;
  nameEn: string;
  description: string;
}

export interface ResearchDossier {
  id: string;
  dossierNumber: string;
  title: string;
  titleEn: string;
  description: string;
  sceneIds: string[];
  createdAt: string;
  tags: string[];
}

