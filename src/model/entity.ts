import type { L10n } from './i18n';
import type {
  DomainId,
  EntityType,
  ExhibitionModeId,
  LessonLevel,
  PracticeKind,
} from './enums';

/**
 * Entity schema — master plan §33.
 *
 * The schema is deliberately open: all dimensional references are optional
 * and shared across types, so any object can participate in any knowledge
 * dimension (§10) without schema migrations. Type-specific interfaces only
 * add fields that genuinely belong to that kind of thing.
 */

export interface Source {
  id: string;
  label: string;
  url?: string;
  kind: 'wikimedia' | 'institution' | 'book' | 'web' | 'project';
}

export interface ImageRef {
  url: string;
  caption?: L10n;
  /** Source id — attribution must always be reachable (master plan §24). */
  sourceId?: string;
  ratio?: 'portrait' | 'landscape' | 'square';
  /** Mark the hero/lead image for full-bleed presentation. */
  hero?: boolean;
}

export interface Fact {
  label: L10n;
  value: L10n;
}

/**
 * Discipline-specific narrative block (master plan §13).
 * A painting tells composition -> color -> brushwork; a building tells
 * site -> plan -> structure -> light. The EntityPage renders whatever
 * sequence the content author provides instead of forcing one template.
 */
export interface AnalysisBlock {
  id: string;
  kind: 'text' | 'image' | 'quote' | 'list' | 'process' | 'annotation';
  title: L10n;
  body?: L10n;
  image?: ImageRef;
  items?: L10n[];
  /** Annotation markers (relative %) for image-led analysis. */
  markers?: { x: number; y: number; label: L10n }[];
}

// ---------------------------------------------------------------------------
// Base entity — carries every optional multi-dimensional reference (§10)
// ---------------------------------------------------------------------------
export interface EntityBase {
  id: string;
  type: EntityType;
  slug: string;
  name: L10n;
  alternateNames?: L10n[];
  /** One-line eyebrow / tagline under the title. */
  tagline?: L10n;
  /** 1–2 sentence standfirst used in cards and search results. */
  summary?: L10n;
  /** Long-form editorial paragraphs. */
  body?: L10n[];

  image?: ImageRef;
  images?: ImageRef[];
  /** Dominant colors, powers color exploration. */
  palette?: string[];

  // Multi-dimensional references
  domainIds?: DomainId[];
  disciplineIds?: string[];
  periodId?: string;
  movementIds?: string[];
  styleIds?: string[];
  creatorIds?: string[];
  materialIds?: string[];
  techniqueIds?: string[];
  conceptIds?: string[];
  placeId?: string;
  cultureId?: string;

  facts?: Fact[];
  blocks?: AnalysisBlock[];
  tags?: string[];
  sources?: string[]; // Source ids
  /** Exhibition modes this entity is best experienced through (§12). */
  modes?: ExhibitionModeId[];

  featured?: boolean;
  /** Free-form curatorial weight (higher = featured earlier). */
  weight?: number;
}

// ---------------------------------------------------------------------------
// Type-specific entities
// ---------------------------------------------------------------------------

export interface PersonEntity extends EntityBase {
  type: 'person';
  birthYear?: number;
  deathYear?: number;
  birthPlaceId?: string;
  occupation?: L10n;
}

export interface WorkEntity extends EntityBase {
  type: 'work' | 'building' | 'object';
  yearStart?: number;
  yearEnd?: number;
  medium?: L10n;
  dimensions?: L10n;
  currentLocation?: L10n;
  /** Coordinates when the work is fixed in space (buildings, landmarks). */
  geo?: { lat: number; lng: number };
}

export interface StyleEntity extends EntityBase {
  type: 'movement' | 'style';
  yearStart?: number;
  yearEnd?: number; // undefined = ongoing
  originPlaceId?: string;
  /** Marks the migrated contemporary creator-style corpus. */
  contemporary?: boolean;
}

export interface PeriodEntity extends EntityBase {
  type: 'period';
  yearStart: number; // negative = BCE
  yearEnd?: number; // undefined = present
  scope: 'global' | 'europe' | 'asia' | 'regional';
}

export interface PlaceEntity extends EntityBase {
  type: 'place';
  geo?: { lat: number; lng: number };
  country?: L10n;
}

export interface DomainEntity extends EntityBase {
  type: 'domain';
  /** Child discipline descriptors (registry, not necessarily entities). */
  disciplines: { id: string; name: L10n }[];
  /** Per-domain exhibition accent (content determines presentation, §18). */
  accent: string;
  glyph: string;
}

export type ProcessStep = { title: L10n; body: L10n; image?: ImageRef };

export interface LessonEntity extends EntityBase {
  type: 'lesson';
  path: LessonLevel;
  order: number;
  durationMin?: number;
  /** 1 (beginner) – 5 (advanced). */
  difficulty?: 1 | 2 | 3 | 4 | 5;
  /** Lesson ids that should be studied first (DAG). */
  prerequisiteIds?: string[];
  /** Editorially chosen next lessons. */
  recommendedNextIds?: string[];
  /** Sibling lessons on the same thread. */
  relatedLessonIds?: string[];
  /** What the learner can do afterwards (observable outcomes). */
  outcomes?: L10n[];
  /** Journey ids this lesson belongs to. */
  journeyIds?: string[];
  /** The artwork(s) the lesson asks the learner to observe. */
  workIds?: string[];
  exerciseIds?: string[];
  steps?: ProcessStep[];
  keyPrinciples?: L10n[];
}

export interface PracticeEntity extends EntityBase {
  type: 'practice';
  kind: PracticeKind;
  minutes?: number;
  difficulty?: 1 | 2 | 3;
  brief: L10n;
  prompts?: L10n[];
  workIds?: string[];
}

export interface ProductEntity extends EntityBase {
  type: 'product';
  priceCny?: number;
  priceUsd?: number;
  includes?: L10n[];
  compatibility?: L10n;
  license?: L10n;
  purchaseUrl?: string;
  category: L10n;
}

export interface ExhibitionEntity extends EntityBase {
  type: 'exhibition';
  sections: {
    id: string;
    title: L10n;
    lead?: L10n;
    entityIds: string[];
    narrative?: L10n;
  }[];
  accent?: string;
}

/**
 * A cross-discipline learning journey (§14b): an ordered thread of stops
 * mixing concepts, works and lessons — "follow light across 5,000 years"
 * rather than "take course 07". Rendered like an exhibition but consumed
 * from the Learn navigator.
 */
export interface JourneyEntity extends EntityBase {
  type: 'journey';
  stops: {
    id: string;
    title: L10n;
    lead?: L10n;
    entityIds: string[];
    narrative?: L10n;
  }[];
  accent?: string;
}

/** Taxonomy entities share the plain base shape. */
export interface TaxonomyEntity extends EntityBase {
  type:
    | 'discipline'
    | 'material'
    | 'technique'
    | 'concept'
    | 'culture'
    | 'institution'
    | 'tool'
    | 'collection';
}

export type Entity =
  | PersonEntity
  | WorkEntity
  | StyleEntity
  | PeriodEntity
  | PlaceEntity
  | DomainEntity
  | LessonEntity
  | PracticeEntity
  | ProductEntity
  | ExhibitionEntity
  | JourneyEntity
  | TaxonomyEntity;

export type EntityId = string;

// Convenience aliases for taxonomy entities sharing the base shape.
// (Intersection, not Extract — TaxonomyEntity is a single interface whose
// `type` is a union, so Extract would collapse to `never`.)
export type Culture = TaxonomyEntity & { type: 'culture' };
export type Material = TaxonomyEntity & { type: 'material' };
export type Technique = TaxonomyEntity & { type: 'technique' };
export type Concept = TaxonomyEntity & { type: 'concept' };
export type Discipline = TaxonomyEntity & { type: 'discipline' };
