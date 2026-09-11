import type { L10n } from './i18n';
import { loc } from './i18n';
import type { RelationType } from './enums';

/**
 * A directed semantic edge between two entities (§9).
 * Edges are authored once; the knowledge base derives inverse traversal
 * automatically using the inverse map below.
 */
export interface Relation {
  from: string;
  to: string;
  type: RelationType;
  /** Optional editorial annotation shown on the edge / citation line. */
  note?: L10n;
}

export const rel = (from: string, type: RelationType, to: string, note?: L10n): Relation => ({
  from,
  type,
  to,
  note,
});

interface RelationMeta {
  label: L10n;
  /** Preposition-ish label when the edge is traversed backwards. */
  inverse: L10n;
}

const m = (zh: string, en: string, izh: string, ien: string): RelationMeta => ({
  label: loc(zh, en),
  inverse: loc(izh, ien),
});

/** Display labels + inverse labels for every relationship type. */
export const RELATION_META: Record<RelationType, RelationMeta> = {
  created_by: m('创作者', 'Created by', '作品', 'Works'),
  influenced_by: m('受影响于', 'Influenced by', '影响了', 'Influenced'),
  influenced: m('影响了', 'Influenced', '受影响于', 'Influenced by'),
  part_of: m('属于', 'Part of', '包含', 'Contains'),
  belongs_to: m('归属于', 'Belongs to', '旗下成员', 'Members'),
  related_to: m('相关联', 'Related to', '相关联', 'Related to'),
  contrasts_with: m('形成对照', 'Contrasts with', '形成对照', 'Contrasts with'),
  follows: m('紧随其后', 'Follows', '先于', 'Preceded by'),
  precedes: m('先于', 'Precedes', '紧随其后', 'Followed by'),
  emerged_from: m('脱胎于', 'Emerged from', '催生', 'Gave rise to'),
  evolved_into: m('演化为', 'Evolved into', '前身', 'Evolved from'),
  located_in: m('位于', 'Located in', '此地之物', 'Things here'),
  originated_in: m('发源于', 'Originated in', '发源地', 'Origin of'),
  uses_material: m('使用材料', 'Uses material', '用于', 'Used in'),
  uses_technique: m('使用技法', 'Uses technique', '技法见于', 'Found in'),
  uses_medium: m('媒介', 'Uses medium', '媒介见于', 'Medium of'),
  associated_with: m('关联', 'Associated with', '关联', 'Associated with'),
  collaborated_with: m('合作', 'Collaborated with', '合作', 'Collaborated with'),
  studied_under: m('师从', 'Studied under', '学生', 'Student of'),
  taught: m('教导', 'Taught', '老师', 'Taught by'),
  exhibited_at: m('展出于', 'Exhibited at', '展品', 'Exhibits'),
  references: m('引用 / 致敬', 'References', '被引用', 'Referenced by'),
  responds_to: m('回应', 'Responds to', '被回应', 'Responded to by'),
  contemporaneous_with: m('同一时期', 'Contemporaneous with', '同一时期', 'Contemporaneous with'),
  depicts: m('描绘', 'Depicts', '被描绘于', 'Depicted in'),
  teaches: m('讲授', 'Teaches', '相关课程', 'Taught in'),
  practiced_in: m('实践于', 'Practiced in', '实践内容', 'Practice'),
  requires: m('先修', 'Requires', '进阶解锁', 'Unlocks'),
};
