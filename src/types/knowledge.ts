export type SupportedLocale = 'en' | 'zh-CN' | 'ja' | 'ko';

export type VisualOntologyCategory =
  | 'mood'
  | 'lighting'
  | 'color'
  | 'camera'
  | 'composition'
  | 'space'
  | 'texture'
  | 'era'
  | 'movement';

export interface LocalizedText {
  en: string;
  'zh-CN': string;
  ja: string;
  ko: string;
}

export interface PromptTokenSet {
  midjourney: string;
  sdxl: string;
  flux: string;
  universalKeywords: string[];
}

export interface VisualKnowledgeAtom {
  id: string; // e.g. "visual.lighting.chiaroscuro"
  category: VisualOntologyCategory;
  name: LocalizedText;
  definition: LocalizedText;
  visualSignifiers: string[];
  promptTokens: PromptTokenSet;
  technicalSpecs?: {
    ratio?: string;
    lightFalloff?: string;
    colorTemperature?: string;
    focalLengthRange?: string;
    shutterAngle?: string;
  };
  relatedConceptIds: string[];
  associatedSceneIds: string[];
}

export type KnowledgeRelationType =
  | 'exhibits'
  | 'contrasts_with'
  | 'derives_from'
  | 'co_occurs_with'
  | 'influences';

export interface KnowledgeGraphEdge {
  source: string;
  target: string;
  relationship: KnowledgeRelationType;
  weight: number;
}

export interface VisualKnowledgeGraph {
  version: string;
  lastUpdated: string;
  ontologyCategories: VisualOntologyCategory[];
  nodes: VisualKnowledgeAtom[];
  edges: KnowledgeGraphEdge[];
}
