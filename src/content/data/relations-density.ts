import type { Relation } from '../../model/relation';
import { rel } from '../../model/relation';

/**
 * Phase 2b density edges — replaces star-shaped nodes with graph tissue.
 * Prioritizes the specific semantic edge types the master plan calls for
 * (influenced_by / emerged_from / evolved_into / studied_under /
 * collaborated_with / responds_to / references) over generic association,
 * and closes the 12 degree-1 entities left by Phase 2a.
 */
export const RELATIONS_DENSITY: Relation[] = [
  // --------------------------------------------------- influence: art history
  rel('person-turner', 'influenced', 'person-monet'),
  rel('person-van-gogh', 'influenced_by', 'person-hiroshige'),
  rel('person-van-gogh', 'references', 'work-sudden-shower-ohashi'),
  rel('movement-impressionism', 'influenced_by', 'person-turner'),
  rel('person-gaudi', 'influenced_by', 'movement-arts-and-crafts'),
  rel('person-westwood', 'influenced_by', 'movement-dada'),
  rel('person-satoshi-kon', 'influenced_by', 'person-otomo'),

  // ------------------------------------------------------------- movement DAG
  rel('movement-gothic', 'evolved_into', 'movement-renaissance'),
  rel('movement-art-nouveau', 'evolved_into', 'movement-art-deco'),
  rel('movement-vienna-secession', 'emerged_from', 'movement-art-nouveau'),
  rel('movement-art-deco', 'emerged_from', 'movement-vienna-secession'),
  rel('movement-art-deco', 'influenced_by', 'movement-constructivism'),
  rel('movement-op-art', 'influenced_by', 'movement-constructivism'),
  rel('movement-fluxus', 'emerged_from', 'movement-dada'),
  rel('movement-nihonga', 'responds_to', 'c-modernity'),
  rel('movement-dogme-95', 'responds_to', 'c-vfx'),

  // ----------------------------------------------------------- style genealogy
  rel('cs-vaporwave', 'emerged_from', 'movement-pop-art'),
  rel('cs-synthwave', 'emerged_from', 'cs-cyberpunk'),
  rel('cs-dieselpunk', 'emerged_from', 'cs-retro-futurism'),
  rel('cs-cel-shading', 'emerged_from', 'cs-anime'),
  rel('cs-metroidvania', 'emerged_from', 'c-level-design'),
  rel('cs-dark-fantasy', 'influenced_by', 'movement-romanticism'),
  rel('cs-neo-brutalism-web', 'emerged_from', 'cs-brutalism'),
  rel('cs-kawaii', 'emerged_from', 'culture-japanese'),
  rel('cs-maximalism', 'responds_to', 'cs-swiss'),
  rel('cs-maximalism', 'contrasts_with', 'cs-zen-design'),
  rel('cs-maximalism', 'references', 'c-ornament'),
  rel('cs-solarpunk', 'contrasts_with', 'cs-cyberpunk'),
  rel('cs-afrofuturism', 'contrasts_with', 'cs-cyberpunk'),
  rel('c-ornament', 'responds_to', 'c-form-follows-function'),

  // ----------------------------------------------- lineage: teachers & partners
  rel('person-satoshi-kon', 'studied_under', 'person-otomo'),
  rel('person-gropius', 'studied_under', 'person-behrens'),
  rel('person-le-corbusier', 'studied_under', 'person-behrens'),
  rel('person-wright', 'studied_under', 'person-sullivan'),
  rel('person-ive', 'studied_under', 'person-rams'),
  rel('person-miyazaki', 'collaborated_with', 'person-takahata'),

  // --------------------------------------------------- technique ↔ practitioner
  rel('person-warhol', 'uses_technique', 'tech-silkscreen'),
  rel('movement-dada', 'uses_technique', 'tech-photomontage'),
  rel('work-prince-achmed', 'uses_technique', 'tech-paper-cut-silhouette'),
  rel('building-sagrada-familia', 'uses_technique', 'tech-stained-glass-leading'),
  rel('building-carson-pirie-scott', 'uses_material', 'mat-terracotta'),

  // --------------------------------------------------------- cross-medium jumps
  rel('work-okami', 'references', 'work-great-wave'),
  rel('work-blade-runner', 'uses_material', 'mat-neon-gas'),
  rel('work-perfect-blue', 'responds_to', 'c-digital-interface'),
  rel('lesson-read-fashion', 'teaches', 'c-silhouette'),
  rel('lesson-read-fashion', 'teaches', 'c-body-identity'),
  rel('lesson-read-fashion', 'teaches', 'c-textile-innovation'),

  // --------------------------------------------- Phase 2a degree-1 node repairs
  rel('building-parthenon', 'located_in', 'place-athens'),
  rel('building-villa-savoye', 'located_in', 'place-poissy'),
  rel('building-fallingwater', 'located_in', 'place-mill-run'),
  rel('work-venus-birth', 'uses_material', 'mat-tempera'),
  rel('practice-architecture-circulation', 'practiced_in', 'building-villa-savoye'),
  rel('product-poster-kit', 'related_to', 'atom-swiss-grid'),
  rel('product-prompt-atlas', 'related_to', 'c-generative-art'),
  rel('exhibition-geometry-thread', 'references', 'work-mondrian-composition'),
  rel('exhibition-light-thread', 'references', 'work-calling-matthew'),
  rel('exhibition-david-neighborhood', 'references', 'person-michelangelo'),
  rel('person-goya', 'originated_in', 'place-fuendetodos'),
  rel('person-raphael', 'originated_in', 'place-urbino'),

  // ----------------------------------------------- geography tissue (Phase 2b nodes)
  // Mumbai holds one of the world’s largest Art Deco ensembles (UNESCO, 2018).
  rel('movement-art-deco', 'located_in', 'place-mumbai'),
  // Bombay was the great cotton-mill and textile-export port of the Indian trade.
  rel('culture-indian', 'related_to', 'place-mumbai'),
  rel('culture-ottoman', 'related_to', 'place-istanbul'),
  rel('culture-islamic', 'related_to', 'place-agra'),
];
