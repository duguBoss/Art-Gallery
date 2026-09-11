/**
 * Knowledge coverage audit — Visual Atlas phase 2.
 * Run via: npm run audit (esbuild bundle -> node).
 * Prints ten sections; exits non-zero when hard assertions fail.
 */
import {
  ALL,
  BY_ID,
  RELATIONS,
  ALL_LESSONS,
  allEdges,
  LEARNING_LEVELS,
  journeys,
} from '../src/content/kb';
import { DOMAIN_IDS, LESSON_LEVELS, type EntityType, type RelationType } from '../src/model';

// ---------------------------------------------------------------------------
let failures = 0;
const ok = (cond: boolean, msg: string) => {
  console.log(`  ${cond ? 'PASS' : 'FAIL'}  ${msg}`);
  if (!cond) failures++;
};
const section = (n: string, title: string) =>
  console.log(`\n=== ${n} ${title} ${'='.repeat(Math.max(0, 60 - title.length))}`);

const tr = (v: unknown, lang: 'zh' | 'en') => {
  if (v && typeof v === 'object') return ((v as Record<string, unknown>)[lang] as string) ?? '';
  return '';
};

// ---------------------------------------------------------------------------
section('1', 'Entity counts by type');
const byType = new Map<string, number>();
for (const e of ALL) byType.set(e.type, (byType.get(e.type) ?? 0) + 1);
for (const t of Object.keys(byType).sort()) console.log(`  ${t.padEnd(12)} ${byType.get(t)}`);

const count = (types: EntityType[]) =>
  types.reduce((n, t) => n + (byType.get(t) ?? 0), 0);

// ---------------------------------------------------------------------------
section('2', 'Domain × coverage (entities referencing the domain)');
const HUB_TYPES = new Set(['domain', 'period']);
for (const d of DOMAIN_IDS) {
  const members = ALL.filter(e => e.domainIds?.includes(d));
  const works = members.filter(e => ['work', 'building', 'object'].includes(e.type)).length;
  const people = members.filter(e => e.type === 'person').length;
  const ALL_LESSONS = members.filter(e => e.type === 'lesson').length;
  console.log(
    `  ${d.padEnd(16)} total=${String(members.length).padStart(3)}  works=${works}  people=${people}  ALL_LESSONS=${ALL_LESSONS}`,
  );
  ok(members.length >= 15, `domain ${d}: >= 15 entities (got ${members.length})`);
}
const domainWorksPeople = (d: string) => {
  const m = ALL.filter(e => e.domainIds?.includes(d));
  return {
    works: m.filter(e => ['work', 'building', 'object'].includes(e.type)).length,
    people: m.filter(e => e.type === 'person').length,
    ALL_LESSONS: m.filter(e => e.type === 'lesson').length,
  };
};
for (const d of ['fashion', 'photography', 'film', 'animation', 'games', 'industrial', 'craft']) {
  const r = domainWorksPeople(d);
  ok(r.works >= 3, `domain ${d}: >= 3 works/objects (got ${r.works})`);
  ok(
    r.people >= 2 || r.ALL_LESSONS >= 1,
    `domain ${d}: >= 2 people or >= 1 lesson (people=${r.people}, ALL_LESSONS=${r.ALL_LESSONS})`,
  );
}

// ---------------------------------------------------------------------------
section('3', 'Relation edges');
const edges = allEdges();
console.log(`  total edges: ${edges.length}`);
const edgeByType = new Map<RelationType, number>();
for (const ed of edges) edgeByType.set(ed.type, (edgeByType.get(ed.type) ?? 0) + 1);
for (const [t, n] of [...edgeByType.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${t.padEnd(22)} ${n}`);
}

// ---------------------------------------------------------------------------
section('4', 'Orphan / low-degree entities');
const degree = new Map<string, number>();
for (const ed of edges) {
  degree.set(ed.from, (degree.get(ed.from) ?? 0) + 1);
  degree.set(ed.to, (degree.get(ed.to) ?? 0) + 1);
}
const orphans = ALL.filter(e => !HUB_TYPES.has(e.type) && (degree.get(e.id) ?? 0) === 0);
const degree1 = ALL.filter(e => !HUB_TYPES.has(e.type) && (degree.get(e.id) ?? 0) === 1);
console.log(`  degree-0 non-registry entities: ${orphans.length}`);
orphans.slice(0, 40).forEach(e => console.log(`    - ${e.id} (${e.type})`));
console.log(`  degree-1 non-registry entities: ${degree1.length}`);
degree1.slice(0, 20).forEach(e => console.log(`    · ${e.id} (${e.type})`));
ok(orphans.length === 0, 'no degree-0 content entities');

// ---------------------------------------------------------------------------
section('5', 'Hand-authored weak edges (associated_with in RELATIONS)');
const weak = RELATIONS.filter(r => r.type === 'associated_with');
console.log(`  hand-authored associated_with: ${weak.length}`);
weak.forEach(r => console.log(`    ${r.from} -> ${r.to}`));
ok(weak.length <= 8, `hand-authored associated_with <= 8 (got ${weak.length})`);

// ---------------------------------------------------------------------------
section('6', 'Learning ladder');
for (const lv of LESSON_LEVELS) {
  const n = ALL_LESSONS.filter(l => l.path === lv).length;
  const meta = LEARNING_LEVELS.find(x => x.id === lv);
  console.log(`  L${meta?.index} ${lv.padEnd(12)} ${n} ALL_LESSONS`);
  ok(n >= 2, `level ${lv}: >= 2 ALL_LESSONS (got ${n})`);
}
const withOutcomes = ALL_LESSONS.filter(l => (l.outcomes?.length ?? 0) >= 3).length;
const withDifficulty = ALL_LESSONS.filter(l => !!l.difficulty).length;
console.log(`  ALL_LESSONS with >=3 outcomes: ${withOutcomes}/${ALL_LESSONS.length}`);
console.log(`  ALL_LESSONS with difficulty:   ${withDifficulty}/${ALL_LESSONS.length}`);
ok(withOutcomes >= ALL_LESSONS.length * 0.8, `>= 80% ALL_LESSONS have outcomes (got ${Math.round((withOutcomes / ALL_LESSONS.length) * 100)}%)`);
ok(withDifficulty >= ALL_LESSONS.length * 0.8, `>= 80% ALL_LESSONS have difficulty (got ${Math.round((withDifficulty / ALL_LESSONS.length) * 100)}%)`);

// prerequisite DAG check
const prereqEdges = ALL_LESSONS.flatMap(l => (l.prerequisiteIds ?? []).map(p => ({ from: l.id, to: p })));
let cyclic = false;
const visit = (id: string, stack: string[]) => {
  const l = ALL_LESSONS.find(x => x.id === id);
  for (const p of l?.prerequisiteIds ?? []) {
    if (stack.includes(p)) {
      console.log(`  CYCLE: ${[...stack, p].join(' -> ')}`);
      cyclic = true;
    } else visit(p, [...stack, p]);
  }
};
for (const l of ALL_LESSONS) visit(l.id, [l.id]);
ok(!cyclic, 'prerequisite graph is acyclic');

// ---------------------------------------------------------------------------
section('7', 'Learning journeys');
const js = journeys();
console.log(`  journeys: ${js.length}`);
ok(js.length === 7, `exactly 7 journeys (got ${js.length})`);
for (const j of js) {
  const stops = (j as { stops?: { id: string; entityIds: string[] }[] }).stops ?? [];
  const ids = stops.flatMap(s => s.entityIds);
  const missing = ids.filter(id => !BY_ID.has(id));
  const types = ids.map(id => BY_ID.get(id)?.type);
  const nLessons = types.filter(t => t === 'lesson').length;
  const nWorks = types.filter(t => t === 'work' || t === 'building' || t === 'object').length;
  const nConcepts = types.filter(t => t === 'concept' || t === 'technique' || t === 'material').length;
  const good =
    stops.length >= 5 && stops.length <= 8 && missing.length === 0 &&
    nLessons >= 1 && nWorks >= 2 && nConcepts >= 2;
  console.log(
    `  ${j.id.padEnd(18)} stops=${stops.length} ALL_LESSONS=${nLessons} works=${nWorks} concepts=${nConcepts} missing=${missing.length}`,
  );
  ok(good, `journey ${j.id}: 5-8 stops, valid ids, >=1 lesson/>=2 works/>=2 concepts`);
}

// ---------------------------------------------------------------------------
section('8', 'Bilingual completeness');
let biMissing = 0;
for (const e of ALL) {
  const needSummary = ['work', 'building', 'object', 'person', 'lesson', 'journey', 'movement', 'style'].includes(e.type);
  const probs: string[] = [];
  if (!tr(e.name, 'zh') || !tr(e.name, 'en')) probs.push('name');
  if (needSummary && (!tr(e.summary, 'zh') || !tr(e.summary, 'en'))) probs.push('summary');
  if (probs.length) {
    biMissing++;
    if (biMissing <= 30) console.log(`    ${e.id} (${e.type}): missing ${probs.join(',')}`);
  }
}
console.log(`  entities with bilingual gaps: ${biMissing}`);
ok(biMissing === 0, 'all content entities bilingual (zh+en name/summary)');

// ---------------------------------------------------------------------------
section('9', 'Super-chain reachability');
// undirected adjacency, hub (domain/period) nodes cannot be traversed
const adj = new Map<string, Set<string>>();
for (const ed of edges) {
  const a = BY_ID.get(ed.from);
  const b = BY_ID.get(ed.to);
  if (!a || !b) continue;
  if (!adj.has(ed.from)) adj.set(ed.from, new Set());
  if (!adj.has(ed.to)) adj.set(ed.to, new Set());
  adj.get(ed.from)!.add(ed.to);
  adj.get(ed.to)!.add(ed.from);
}
const reachable = (from: string, to: string, maxHops = 4): boolean => {
  if (!BY_ID.has(from) || !BY_ID.has(to)) return false;
  let frontier = [from];
  const seen = new Set([from]);
  for (let hop = 0; hop < maxHops; hop++) {
    const next: string[] = [];
    for (const id of frontier) {
      for (const nb of adj.get(id) ?? []) {
        if (seen.has(nb)) continue;
        const ent = BY_ID.get(nb);
        if (ent && HUB_TYPES.has(ent.type) && nb !== to) continue;
        if (nb === to) return true;
        seen.add(nb);
        next.push(nb);
      }
    }
    frontier = next;
  }
  return false;
};
const CHAINS: { name: string; nodes: string[] }[] = [
  {
    name: 'influence: hokusai -> ukiyo-e -> impressionism -> van gogh -> expressionism -> bauhaus -> swiss -> digital interface',
    nodes: ['person-hokusai', 'movement-ukiyo-e', 'movement-impressionism', 'person-van-gogh', 'movement-expressionism', 'movement-bauhaus', 'cs-swiss', 'c-digital-interface'],
  },
  {
    name: 'light: caravaggio -> chiaroscuro -> light -> cinematography -> blade runner -> realtime rendering -> journey',
    nodes: ['person-caravaggio', 'tech-chiaroscuro', 'c-light', 'c-cinematography', 'work-blade-runner', 'tech-realtime-rendering', 'work-journey-game'],
  },
  {
    name: 'geometry: parthenon -> renaissance -> cubism -> de stijl -> bauhaus -> swiss grid -> digital interface',
    nodes: ['building-parthenon', 'movement-renaissance', 'movement-cubism', 'movement-de-stijl', 'movement-bauhaus', 'atom-swiss-grid', 'c-digital-interface'],
  },
  {
    name: 'material: pigment -> oil paint -> silver film -> image sensor -> pixels -> digital color',
    nodes: ['mat-pigment', 'mat-oil-paint', 'mat-film-silver', 'mat-image-sensor', 'mat-code-pixels', 'c-digital-color'],
  },
];
for (const chain of CHAINS) {
  console.log(`  chain: ${chain.name}`);
  for (let i = 0; i < chain.nodes.length - 1; i++) {
    const a = chain.nodes[i];
    const b = chain.nodes[i + 1];
    const exists = BY_ID.has(a) && BY_ID.has(b);
    const reach = exists && reachable(a, b);
    ok(reach, `  ${a} ~~ ${b}${exists ? '' : '  (missing node!)'}`);
  }
}

// ---------------------------------------------------------------------------
section('10', 'Image coverage & count floors');
const withImg = ALL.filter(e => !!e.image).length;
console.log(`  entities with hero image: ${withImg}/${ALL.length}`);
const floors: [string, number, number][] = [
  ['works+buildings+objects', count(['work', 'building', 'object']), 70],
  ['persons', count(['person']), 45],
  ['concepts', count(['concept']), 65],
  ['materials', count(['material']), 30],
  ['techniques', count(['technique']), 35],
  ['movements', count(['movement']), 24],
  ['styles', count(['style']), 20],
  ['cultures', count(['culture']), 20],
  ['places', count(['place']), 30],
  ['periods', count(['period']), 20],
  ['ALL_LESSONS', count(['lesson']), 30],
  ['practices', count(['practice']), 14],
  ['journeys', count(['journey']), 7],
  ['total edges', edges.length, 350],
];
for (const [label, got, want] of floors) {
  console.log(`  ${label.padEnd(24)} ${String(got).padStart(4)} / want >= ${want}`);
  ok(got >= want, `${label} >= ${want} (got ${got})`);
}

// ---------------------------------------------------------------------------
console.log(`\n${failures === 0 ? 'ALL AUDIT CHECKS PASSED' : `${failures} AUDIT CHECK(S) FAILED`}`);
process.exit(failures === 0 ? 0 : 1);
