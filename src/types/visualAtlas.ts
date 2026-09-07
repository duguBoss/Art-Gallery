export type AtlasTab = 'index' | 'archive' | 'knowledge' | 'language' | 'dossiers' | 'lab' | 'tools' | 'about' | 'ai';

export type AnalysisMode = 'overview' | 'composition' | 'color' | 'camera' | 'light';

export type LabEngine = 'midjourney' | 'flux' | 'stable-diffusion' | 'gemini' | 'veo';

export type KnowledgeDomainId =
  | 'visual-foundations'
  | 'graphic-design'
  | 'ui-ux'
  | 'photography'
  | 'video-editing'
  | 'motion'
  | '3d'
  | 'audio'
  | 'ai-creation'
  | 'software'
  | 'creative-systems'
  | 'methodology';

export interface KnowledgeDomain {
  id: KnowledgeDomainId;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  knowledgeCount: number;
  topics: string[];
}

export interface LearningPath {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  domainIds: KnowledgeDomainId[];
  steps: string[];
}

export interface KnowledgeNode {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  domainId: KnowledgeDomainId;
  level: 'beginner' | 'intermediate' | 'advanced';
  relatedIds: string[];
  toolIds: string[];
  software: string[];
  tags: string[];
}

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
