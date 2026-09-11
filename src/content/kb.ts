/**
 * Knowledge base API — master plan §11/§33.
 *
 * Content (entities + authored relations) lives in ./data; this module is
 * the read layer the whole UI talks to. Nothing in components imports data
 * files directly — everything goes through here so query logic stays in
 * one place and data stays presentation-free.
 */
import type { EntityBase, Source } from '../model/entity';
import type { EntityType, RelationType, DomainId, Lang } from '../model';
import { tr } from '../model';
import type { Relation } from '../model/relation';
import { RELATION_META } from '../model/relation';

import { DOMAINS } from './data/domains';
import { PERIODS } from './data/periods';
import { CULTURES, PLACES } from './data/geography';
import { MATERIALS } from './data/materials';
import { TECHNIQUES } from './data/techniques';
import { CONCEPTS } from './data/concepts';
import { MOVEMENTS } from './data/movements';
import { CONTEMPORARY_STYLES } from './data/styles';
import { PEOPLE } from './data/people';
import { WORKS } from './data/works';
import { LESSONS } from './data/lessons';
import { LESSONS_EXPANSION, PRACTICES_EXPANSION } from './data/lessons-expansion';
import { PRACTICES } from './data/practice';
import { PRODUCTS } from './data/products';
import { EXHIBITIONS } from './data/exhibitions';
import { JOURNEYS } from './data/journeys';
import { MODERN_ART, DESIGN_HISTORY } from './data/modern-art';
import { PHOTOGRAPHY } from './data/photography';
import { FILM } from './data/film';
import { CRAFT_EXPANSION } from './data/craft-expansion';
import { DIGITAL_MEDIA } from './data/digital';
import { ANIMATION } from './data/animation';
import { GAMES } from './data/games';
import { INDUSTRIAL } from './data/industrial';
import { FASHION } from './data/fashion';
import { VISUAL_CULTURE_EXTRA } from './data/visual-culture-expansion';
import { SOURCES } from './data/sources';
import { RELATIONS } from './data/relations';

export type Entity = EntityBase;

// ---------------------------------------------------------------------------
// Aggregate
// ---------------------------------------------------------------------------
const ALL_ENTITIES: Entity[] = [
  ...DOMAINS,
  ...PERIODS,
  ...CULTURES,
  ...PLACES,
  ...MATERIALS,
  ...TECHNIQUES,
  ...CONCEPTS,
  ...MOVEMENTS,
  ...CONTEMPORARY_STYLES,
  ...PEOPLE,
  ...WORKS,
  ...LESSONS,
  ...LESSONS_EXPANSION,
  ...PRACTICES,
  ...PRACTICES_EXPANSION,
  ...PRODUCTS,
  ...EXHIBITIONS,
  ...JOURNEYS,
  ...MODERN_ART,
  ...DESIGN_HISTORY,
  ...PHOTOGRAPHY,
  ...FILM,
  ...CRAFT_EXPANSION,
  ...DIGITAL_MEDIA,
  ...ANIMATION,
  ...GAMES,
  ...INDUSTRIAL,
  ...FASHION,
  ...VISUAL_CULTURE_EXTRA,
];

/** Every entity keyed by id (fails loudly on duplicate ids). */
export const BY_ID = new Map<string, Entity>();
for (const e of ALL_ENTITIES) {
  if (BY_ID.has(e.id)) {
    console.warn(`[kb] duplicate entity id: ${e.id}`);
  }
  BY_ID.set(e.id, e);
}

export const getById = (id: string): Entity | undefined => BY_ID.get(id);
export const mustGet = (id: string): Entity => {
  const e = BY_ID.get(id);
  if (!e) throw new Error(`[kb] unknown entity id: ${id}`);
  return e;
};

export const getByType = <T extends Entity = Entity>(type: EntityType): T[] =>
  ALL_ENTITIES.filter(e => e.type === type) as T[];

/** Resolve an entity by its URL slug (+ optional type guard). */
export function findBySlug(slug: string, type?: EntityType): Entity | undefined {
  return ALL_ENTITIES.find(e => e.slug === slug && (!type || e.type === type));
}

export const ALL = ALL_ENTITIES;
export const SOURCES_BY_ID = new Map<string, Source>(SOURCES.map(s => [s.id, s]));

// ---------------------------------------------------------------------------
// Relation graph: authored edges + edges derived from reference fields (§10)
// ---------------------------------------------------------------------------
function derivedRelations(): Relation[] {
  const out: Relation[] = [];
  const push = (from: string, type: RelationType, to?: string, note?: Relation['note']) => {
    if (to && BY_ID.has(to) && to !== from) out.push({ from, type, to, note });
  };
  for (const e of ALL_ENTITIES) {
    e.creatorIds?.forEach(id => push(e.id, 'created_by', id));
    e.materialIds?.forEach(id => push(e.id, 'uses_material', id));
    e.techniqueIds?.forEach(id => push(e.id, 'uses_technique', id));
    // Phase-2 edge upgrade: concepts <-> related_to; movements <-> part_of;
    // contemporary styles keep associated_with ("made in this style").
    e.conceptIds?.forEach(id => push(e.id, 'related_to', id));
    e.movementIds?.forEach(id => push(e.id, 'part_of', id));
    e.styleIds?.forEach(id => push(e.id, 'associated_with', id));
    e.domainIds?.forEach(id => push(e.id, 'part_of', id));
    push(e.id, 'located_in', e.placeId);
    push(e.id, 'part_of', e.periodId);
    push(e.id, 'emerged_from', e.cultureId);
    if (e.type === 'lesson' || e.type === 'practice') {
      (e as { workIds?: string[] }).workIds?.forEach(id =>
        push(e.id, e.type === 'lesson' ? 'references' : 'practiced_in', id),
      );
    }
    if (e.type === 'lesson') {
      const l = e as Entity & {
        prerequisiteIds?: string[];
        recommendedNextIds?: string[];
      };
      l.prerequisiteIds?.forEach(id => push(e.id, 'requires', id));
      l.recommendedNextIds?.forEach(id =>
        push(e.id, 'related_to', id, { zh: '进阶', en: 'Next step' }),
      );
    }
    if (e.type === 'journey') {
      const j = e as Entity & { stops?: { entityIds: string[] }[] };
      j.stops?.forEach(s => s.entityIds.forEach(id => push(e.id, 'part_of', id)));
    }
  }
  return out;
}

const ALL_EDGES: Relation[] = [...RELATIONS, ...derivedRelations()];

/** Full edge list (authored + derived) — used by the knowledge audit script. */
export function allEdges(): Relation[] {
  return ALL_EDGES;
}

export interface Neighbor {
  entity: Entity;
  type: RelationType;
  /** Direction of the edge relative to the queried entity. */
  dir: 'out' | 'in';
  note?: Relation['note'];
}

const outAdj = new Map<string, Neighbor[]>();
const inAdj = new Map<string, Neighbor[]>();

for (const edge of ALL_EDGES) {
  const a = BY_ID.get(edge.from);
  const b = BY_ID.get(edge.to);
  if (!a || !b) {
    console.warn(`[kb] relation with unknown endpoint: ${edge.from} -${edge.type}-> ${edge.to}`);
    continue;
  }
  if (!outAdj.has(edge.from)) outAdj.set(edge.from, []);
  outAdj.get(edge.from)!.push({ entity: b, type: edge.type, dir: 'out', note: edge.note });
  if (!inAdj.has(edge.to)) inAdj.set(edge.to, []);
  inAdj.get(edge.to)!.push({ entity: a, type: edge.type, dir: 'in', note: edge.note });
}

/**
 * Neighbors of an entity, traversing edges both directions.
 * When reading an incoming edge the inverse label is used for display.
 */
export function neighbors(id: string, opts?: { types?: RelationType[]; dir?: 'out' | 'in' | 'both' }): Neighbor[] {
  const dir = opts?.dir ?? 'both';
  const wanted = opts?.types ? new Set(opts.types) : null;
  const seen = new Map<string, Neighbor>();
  const collect = (list: Neighbor[] | undefined) => {
    list?.forEach(n => {
      if (wanted && !wanted.has(n.type) && !wanted.has(inverseType(n.type))) return;
      const key = `${n.entity.id}:${n.type}:${n.dir}`;
      if (!seen.has(key)) seen.set(key, n);
    });
  };
  if (dir !== 'in') collect(outAdj.get(id));
  if (dir !== 'out') collect(inAdj.get(id));
  return [...seen.values()];
}

/** Grouped neighbors for entity pages: grouped by edge display label. */
export function neighborGroups(id: string, lang: Lang): { label: string; items: Neighbor[] }[] {
  const groups = new Map<string, Neighbor[]>();
  for (const n of neighbors(id)) {
    const meta = RELATION_META[n.type];
    const label = n.dir === 'out' ? tr(meta.label, lang) : tr(meta.inverse, lang);
    if (!groups.has(label)) groups.set(label, []);
    groups.get(label)!.push(n);
  }
  return [...groups.entries()].map(([label, items]) => ({
    label,
    items: items.sort((a, b) => (b.entity.weight ?? 0) - (a.entity.weight ?? 0)),
  }));
}

// RelationType has paired inverses by convention but not a runtime map;
// neighbor display uses per-edge dir so this helper only informs filtering.
function inverseType(t: RelationType): RelationType {
  const pairs: Partial<Record<RelationType, RelationType>> = {
    created_by: 'influenced',
    influenced_by: 'influenced',
    influenced: 'influenced_by',
    part_of: 'associated_with',
    located_in: 'located_in',
    uses_material: 'uses_material',
    uses_technique: 'uses_technique',
    requires: 'requires',
    associated_with: 'associated_with',
    related_to: 'related_to',
  };
  return pairs[t] ?? t;
}

// ---------------------------------------------------------------------------
// Search (§22) — lightweight, multilingual, entity-ranked
// ---------------------------------------------------------------------------
export interface SearchHit {
  entity: Entity;
  score: number;
}

export function search(query: string, lang: Lang, opts?: { types?: EntityType[]; limit?: number }): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (q.length === 0) return [];
  const tokens = q.split(/\s+/);
  const hits: SearchHit[] = [];
  for (const e of ALL_ENTITIES) {
    if (opts?.types && !opts.types.includes(e.type)) continue;
    const hay = [
      tr(e.name, lang),
      e.tagline ? tr(e.tagline, lang) : '',
      e.summary ? tr(e.summary, lang) : '',
      e.alternateNames?.map(n => tr(n, lang)).join(' ') ?? '',
      e.tags?.join(' ') ?? '',
    ]
      .join(' ')
      .toLowerCase();
    let score = 0;
    for (const t of tokens) {
      if (hay.includes(t)) score += t.length > 2 ? 2 : 1;
    }
    if (score > 0) {
      score += (e.weight ?? 0) / 100;
      if (tr(e.name, lang).toLowerCase().includes(q)) score += 3;
      hits.push({ entity: e, score });
    }
  }
  return hits
    .sort((a, b) => b.score - a.score)
    .slice(0, opts?.limit ?? 40);
}

// ---------------------------------------------------------------------------
// Discovery
// ---------------------------------------------------------------------------
export function randomEntity(filter?: (e: Entity) => boolean): Entity {
  const pool = filter ? ALL_ENTITIES.filter(filter) : ALL_ENTITIES;
  return pool[Math.floor(Math.random() * pool.length)];
}

export const featured = (type?: EntityType, limit = 6): Entity[] =>
  ALL_ENTITIES.filter(e => (type ? e.type === type : true) && e.featured)
    .sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0))
    .slice(0, limit);

/** Entities carrying a year — the material of the timeline view. */
export interface TimelineEntry {
  entity: Entity;
  year: number;
}
export function timeline(filter?: (e: Entity) => boolean): TimelineEntry[] {
  return ALL_ENTITIES
    .filter(e => {
      const y = (e as { yearStart?: number }).yearStart ?? (e as { birthYear?: number }).birthYear;
      return y !== undefined && (!filter || filter(e));
    })
    .map(e => ({
      entity: e,
      year: ((e as { yearStart?: number }).yearStart ?? (e as { birthYear?: number }).birthYear) as number,
    }))
    .sort((a, b) => a.year - b.year);
}

export function byDomain(domain: DomainId): Entity[] {
  return ALL_ENTITIES.filter(e => e.domainIds?.includes(domain));
}

// ---------------------------------------------------------------------------
// Learning ladder (§14 / phase 2)
// ---------------------------------------------------------------------------
export { LEARNING_LEVELS, learningLevel } from '../model/learning';
import type { LessonLevel } from '../model';

/** Lessons on a ladder level, ordered. */
export function lessonsByLevel(level: LessonLevel): Entity[] {
  return ALL_ENTITIES.filter(e => e.type === 'lesson' && (e as { path?: string }).path === level).sort(
    (a, b) => ((a as { order?: number }).order ?? 0) - ((b as { order?: number }).order ?? 0),
  );
}

/** All learning journeys. */
export function journeys(): Entity[] {
  return JOURNEYS;
}

/** Prerequisite lesson entities of a lesson (direct, in authored order). */
export function prerequisitesOf(lessonId: string): Entity[] {
  const e = BY_ID.get(lessonId) as { prerequisiteIds?: string[] } | undefined;
  return (e?.prerequisiteIds ?? []).map(id => BY_ID.get(id)).filter((x): x is Entity => !!x);
}

/** Recommended next lesson entities. */
export function recommendedNextOf(lessonId: string): Entity[] {
  const e = BY_ID.get(lessonId) as { recommendedNextIds?: string[] } | undefined;
  return (e?.recommendedNextIds ?? []).map(id => BY_ID.get(id)).filter((x): x is Entity => !!x);
}

export const ALL_LESSONS: Entity[] = [...LESSONS, ...LESSONS_EXPANSION];
export const ALL_PRACTICES: Entity[] = [...PRACTICES, ...PRACTICES_EXPANSION];

export { DOMAINS, EXHIBITIONS, JOURNEYS, LESSONS, PRACTICES, PRODUCTS, PERIODS, SOURCES, RELATIONS };
