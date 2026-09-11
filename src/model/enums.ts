/**
 * Core enumerations of the knowledge architecture.
 * Master plan: §6 domain map, §8 entity model, §9 relationships, §12 exhibition engine.
 */

// ---------------------------------------------------------------------------
// §8 Entity types — the universe of things the atlas can describe.
// Adding a new discipline never requires adding a new entity type: a film, a
// chair, a cathedral and an AI model are all `work`-like entities with
// different dimensions and exhibition modes.
// ---------------------------------------------------------------------------
export const ENTITY_TYPES = [
  'person',
  'work', // painting, photograph, film, poster, digital work ...
  'building', // architecture & spatial works
  'object', // furniture, products, ceramics, craft objects ...
  'movement', // historical art movements
  'style', // visual styles incl. contemporary creator styles
  'period', // broad historical periods
  'domain', // top-level knowledge domain (§6)
  'discipline', // field of practice inside a domain
  'material',
  'technique',
  'concept', // visual language, theory, ideas
  'culture',
  'place',
  'institution',
  'tool',
  'collection',
  'exhibition', // curated editorial exhibition
  'journey', // cross-discipline learning journey (§14b)
  'lesson',
  'practice',
  'product',
] as const;

export type EntityType = (typeof ENTITY_TYPES)[number];

// ---------------------------------------------------------------------------
// §6 The 14 reserved knowledge domains. The registry (content/data/domains)
// holds their editorial content; the IDs are fixed architectural anchors.
// ---------------------------------------------------------------------------
export const DOMAIN_IDS = [
  'arts',
  'architecture',
  'design',
  'craft',
  'photography',
  'film',
  'animation',
  'games',
  'digital',
  'fashion',
  'industrial',
  'visual-culture',
  'creative-science',
  'art-history',
] as const;

export type DomainId = (typeof DOMAIN_IDS)[number];

// ---------------------------------------------------------------------------
// §9 Semantic relationship vocabulary. Relationships are first-class data:
// pages, graph views and search all read the same edge list.
// ---------------------------------------------------------------------------
export const RELATION_TYPES = [
  'created_by',
  'influenced_by',
  'influenced',
  'part_of',
  'belongs_to',
  'related_to',
  'contrasts_with',
  'follows',
  'precedes',
  'emerged_from',
  'evolved_into',
  'located_in',
  'originated_in',
  'uses_material',
  'uses_technique',
  'uses_medium',
  'associated_with',
  'collaborated_with',
  'studied_under',
  'taught',
  'exhibited_at',
  'references',
  'responds_to',
  'contemporaneous_with',
  'depicts',
  'teaches',
  'practiced_in',
  'requires',
] as const;

export type RelationType = (typeof RELATION_TYPES)[number];

// ---------------------------------------------------------------------------
// §12 Exhibition engine modes — the same knowledge entity can be experienced
// through every mode its content supports.
// ---------------------------------------------------------------------------
export const EXHIBITION_MODES = [
  'timeline',
  'gallery',
  'atlas',
  'map',
  'comparison',
  'detail',
  'process',
  'material',
  'viewer3d',
  'archive',
  'story',
  'interactive',
  'network',
  'editorial',
  'before-after',
  'annotation',
  'immersive',
] as const;

export type ExhibitionModeId = (typeof EXHIBITION_MODES)[number];

// ---------------------------------------------------------------------------
// §15 Practice exercise kinds
// ---------------------------------------------------------------------------
export const PRACTICE_KINDS = [
  'observation',
  'analysis',
  'reconstruction',
  'constraint',
  'comparison',
  'composition',
  'color',
  'typography',
  'spatial',
  'material',
  'lighting',
  'storyboard',
  'challenge',
  'prompt',
  'cross-style',
] as const;

export type PracticeKind = (typeof PRACTICE_KINDS)[number];

// ---------------------------------------------------------------------------
// §14 Learning ladder — seven levels of growing visual capability.
// Level metadata (names/leads) lives in model/learning.ts; this is the
// ordered id registry.
// ---------------------------------------------------------------------------
export const LESSON_LEVELS = [
  'awareness', // L0: meeting the visual world
  'foundations', // L1: shared visual fundamentals
  'language', // L2: visual language & design principles
  'disciplines', // L3: discipline methods
  'history', // L4: history & culture
  'practice', // L5: creation practice
  'cross', // L6: cross-discipline creation
] as const;

export type LessonLevel = (typeof LESSON_LEVELS)[number];
