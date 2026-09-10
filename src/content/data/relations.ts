import type { Relation } from '../../model/relation';
import { rel } from '../../model/relation';

/**
 * Explicit relation graph — master plan §9 / §36. The knowledge base
 * additionally derives edges from entity reference fields
 * (creatorIds, materialIds, conceptIds, …); this table carries the
 * relationships those fields cannot express: influence chains,
 * emergence, references, contrasts, teaching and cross-discipline jumps.
 */
export const RELATIONS: Relation[] = [
  // ---------------------------------------------------------- influence chains
  rel('movement-renaissance', 'emerged_from', 'culture-italian'),
  rel('movement-renaissance', 'references', 'culture-ancient-greek', ),
  rel('movement-baroque', 'follows', 'movement-renaissance'),
  rel('movement-impressionism', 'responds_to', 'period-realism'),
  rel('movement-post-impressionism', 'follows', 'movement-impressionism'),
  rel('movement-cubism', 'emerged_from', 'movement-post-impressionism'),
  rel('movement-cubism', 'influenced_by', 'movement-ukiyo-e'),
  rel('movement-de-stijl', 'influenced_by', 'movement-cubism'),
  rel('movement-bauhaus', 'influenced_by', 'movement-de-stijl'),
  rel('movement-pop-art', 'responds_to', 'movement-abstract-expressionism'),
  rel('movement-minimalism', 'responds_to', 'movement-abstract-expressionism'),

  rel('person-caravaggio', 'influenced', 'person-van-gogh'),
  rel('person-van-gogh', 'influenced_by', 'movement-ukiyo-e'),
  rel('person-van-gogh', 'influenced_by', 'person-hokusai'),
  rel('person-picasso', 'influenced_by', 'movement-ukiyo-e'),
  rel('person-mondrian', 'associated_with', 'movement-de-stijl'),
  rel('person-rietveld', 'associated_with', 'movement-de-stijl'),
  rel('person-gropius', 'associated_with', 'movement-bauhaus'),
  rel('person-le-corbusier', 'associated_with', 'movement-bauhaus'),
  rel('person-warhol', 'associated_with', 'movement-pop-art'),

  // ------------------------------------------------------ contemporaneity
  rel('person-michelangelo', 'contemporaneous_with', 'person-leonardo'),
  rel('person-mondrian', 'contemporaneous_with', 'person-rietveld'),
  rel('person-gropius', 'contemporaneous_with', 'person-le-corbusier'),
  rel('work-david', 'contemporaneous_with', 'work-last-supper'),

  // ------------------------------------------------------ people in places
  rel('person-michelangelo', 'practiced_in', 'place-florence'),
  rel('person-michelangelo', 'practiced_in', 'place-rome'),
  rel('person-leonardo', 'practiced_in', 'place-milan'),
  rel('person-caravaggio', 'practiced_in', 'place-rome'),
  rel('person-gropius', 'practiced_in', 'place-dessau'),
  rel('person-le-corbusier', 'practiced_in', 'place-paris'),
  rel('person-hokusai', 'practiced_in', 'place-edo'),
  rel('person-warhol', 'practiced_in', 'place-new-york'),
  rel('person-frida', 'practiced_in', 'place-mexico-city'),

  // ------------------------------------------------------ work-level extra edges
  rel('work-sistine-ceiling', 'created_by', 'person-michelangelo'),
  rel('work-calling-matthew', 'created_by', 'person-caravaggio'),
  rel('work-starry-night', 'influenced_by', 'movement-ukiyo-e'),
  rel('work-campbells', 'references', 'work-great-wave'),
  rel('object-red-blue-chair', 'references', 'work-mondrian-composition'),
  rel('building-villa-savoye', 'contrasts_with', 'building-katsura'),
  rel('building-fallingwater', 'responds_to', 'building-villa-savoye'),
  rel('building-bauhaus-dessau', 'exhibited_at', 'place-dessau'),

  // ------------------------------------------------------ contemporary styles
  rel('cs-swiss', 'emerged_from', 'movement-de-stijl'),
  rel('cs-swiss', 'emerged_from', 'movement-bauhaus'),
  rel('cs-brutalism', 'emerged_from', 'movement-bauhaus'),
  rel('cs-ink-wash', 'emerged_from', 'culture-chinese'),
  rel('cs-ghibli', 'influenced_by', 'movement-ukiyo-e'),
  rel('cs-editorial', 'emerged_from', 'cs-swiss'),
  rel('cs-zen-design', 'emerged_from', 'cs-ink-wash'),
  rel('cs-cyberpunk', 'contrasts_with', 'cs-zen-design'),
  rel('cs-claymation', 'associated_with', 'mat-ceramic'),
  rel('cs-liquid-glass', 'associated_with', 'mat-steel-glass'),

  // ------------------------------------------------------ concepts connect disciplines
  rel('c-geometry', 'related_to', 'c-perspective'),
  rel('c-light', 'related_to', 'tech-chiaroscuro'),
  rel('tech-chiaroscuro', 'influenced', 'atom-rim-light'),
  rel('tech-sfumato', 'associated_with', 'c-light'),
  rel('c-humanism', 'associated_with', 'c-anatomy'),
  rel('c-conceptual-turn', 'influenced_by', 'tech-readymade'),

  // ------------------------------------------------------ lessons & practices
  rel('lesson-light', 'teaches', 'c-light'),
  rel('lesson-color', 'teaches', 'c-color-theory'),
  rel('lesson-renaissance-humanism', 'teaches', 'c-humanism'),
  rel('lesson-modern-shatter', 'teaches', 'c-geometry'),
  rel('practice-find-light-source', 'practiced_in', 'work-calling-matthew'),
  rel('practice-find-light-source', 'practiced_in', 'work-mona-lisa'),
  rel('practice-cross-style', 'practiced_in', 'cs-cyberpunk'),
  rel('practice-cross-style', 'practiced_in', 'cs-ink-wash'),

  // ------------------------------------------------------ exhibition anchors
  rel('exhibition-geometry-thread', 'related_to', 'c-geometry'),
  rel('exhibition-light-thread', 'related_to', 'c-light'),
  rel('exhibition-david-neighborhood', 'related_to', 'work-david'),
];
