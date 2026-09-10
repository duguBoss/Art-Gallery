/**
 * URL helpers.
 * - `wiki()` resolves stable Wikimedia Commons file names (real, sourced
 *   factual imagery for documented works).
 * - `gen()` points at the project image-generation endpoint for atmospheric
 *   / editorial imagery that does not depict a specific factual work.
 * - `scene()` serves bundled atmospheric scene plates from /public.
 */
const BASE = import.meta.env.BASE_URL;

export const scene = (file: string): string => `${BASE}scenes/${file}`;

export const wiki = (commonsFileName: string, width = 1400): string =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
    commonsFileName,
  )}?width=${width}`;

export type GenSize =
  | 'square_hd'
  | 'square'
  | 'portrait_4_3'
  | 'portrait_16_9'
  | 'landscape_4_3'
  | 'landscape_16_9';

export const gen = (prompt: string, size: GenSize = 'landscape_16_9'): string =>
  `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(
    prompt,
  )}&image_size=${size}`;
