import type { Source } from '../../model/entity';

/** Sources — every factual image and claim must be traceable (§24). */
export const SOURCES: Source[] = [
  {
    id: 'src-wikimedia',
    label: 'Wikimedia Commons',
    url: 'https://commons.wikimedia.org/',
    kind: 'wikimedia',
  },
  {
    id: 'src-moma',
    label: 'The Museum of Modern Art (MoMA)',
    url: 'https://www.moma.org/',
    kind: 'institution',
  },
  {
    id: 'src-galleria-accademia',
    label: 'Galleria dell’Accademia, Firenze',
    url: 'https://www.galleriaaccademiafirenze.it/',
    kind: 'institution',
  },
  {
    id: 'src-bauhaus-dessau',
    label: 'Stiftung Bauhaus Dessau',
    url: 'https://www.bauhaus-dessau.de/',
    kind: 'institution',
  },
];
