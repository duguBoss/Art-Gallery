import type { L10n } from './i18n';
import { loc } from './i18n';
import type { LessonLevel } from './enums';

/**
 * Learning ladder metadata — master plan §14 (phase 2).
 * Seven levels of growing visual capability, from "what is seeing?" to
 * cross-discipline creation. The Learn navigator renders this registry;
 * lessons only carry the level id.
 */
export interface LearningLevelMeta {
  id: LessonLevel;
  /** L0 … L6 */
  index: number;
  name: L10n;
  lead: L10n;
}

export const LEARNING_LEVELS: LearningLevelMeta[] = [
  {
    id: 'awareness',
    index: 0,
    name: loc('认识视觉', 'Awareness'),
    lead: loc(
      '在学习任何技法之前，先学会“看见”：视觉如何在三秒内替你做判断。',
      'Before any technique: learn to see — how vision makes judgments for you in three seconds.',
    ),
  },
  {
    id: 'foundations',
    index: 1,
    name: loc('视觉基础', 'Visual Foundations'),
    lead: loc(
      '色彩、构图、形态、空间、光、材料、节奏——所有门类共享的底层功夫。',
      'Color, composition, form, space, light, material, rhythm — the fundamentals every discipline shares.',
    ),
  },
  {
    id: 'language',
    index: 2,
    name: loc('视觉语言', 'Visual Language'),
    lead: loc(
      '层级、对比、平衡、留白、网格、符号——把基础元素组织成可读句子的语法。',
      'Hierarchy, contrast, balance, emptiness, grid, sign — the grammar that organizes fundamentals into readable sentences.',
    ),
  },
  {
    id: 'disciplines',
    index: 3,
    name: loc('学科方法', 'Discipline Methods'),
    lead: loc(
      '选择一门手艺：如何阅读照片、电影、动画、游戏、产品、服装与器物。',
      'Pick a craft: how to read a photograph, a film, an animation, a game, a product, a garment, an object.',
    ),
  },
  {
    id: 'history',
    index: 4,
    name: loc('历史与文化', 'History & Culture'),
    lead: loc(
      '不背年代——理解每一次风格突变在回答什么问题，以及它从哪条线索走来。',
      'Not dates to memorize — the question each rupture answered, and the thread it came from.',
    ),
  },
  {
    id: 'practice',
    index: 5,
    name: loc('创作实践', 'Creation Practice'),
    lead: loc(
      '从观察走向创作：拆解、借鉴、重组，建立自己的工作流。',
      'From looking to making: dismantle, borrow, recombine — build your own workflow.',
    ),
  },
  {
    id: 'cross',
    index: 6,
    name: loc('跨学科创造', 'Cross-Discipline'),
    lead: loc(
      '浮世绘×界面、建筑×游戏、电影光×渲染——真正的新东西生在学科交界处。',
      'Ukiyo-e × interfaces, architecture × games, film light × rendering — the new is born at discipline borders.',
    ),
  },
];

export const learningLevel = (id: LessonLevel): LearningLevelMeta =>
  LEARNING_LEVELS.find(l => l.id === id) ?? LEARNING_LEVELS[1];
