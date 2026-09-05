import type { CinemaScene } from '../types/cinema';
import type { VisualAtom, DesignPrinciple, StyleRuleEquation, AtlasWork } from '../types/atlas';
import { DEFAULT_CINEMA_SCENES } from './cinemaDefaultScenes';
import { VISUAL_ATOMS } from './visualAtlasData';
import { DESIGN_PRINCIPLES } from './designPrinciplesData';
import { STYLE_RULES } from './visualAtlasData';
import { ATLAS_WORKS } from './visualAtlasData';

const STORAGE_KEY_CINEMA_SCENES = 'atlas_cinema_scenes_v1';
const STORAGE_KEY_VISUAL_ATOMS = 'atlas_visual_atoms_v1';
const STORAGE_KEY_PRINCIPLES = 'atlas_design_principles_v1';
const STORAGE_KEY_STYLE_RULES = 'atlas_style_rules_v1';
const STORAGE_KEY_WORKS = 'atlas_works_v1';
const STORAGE_KEY_ADMIN_AUTH = 'atlas_admin_authed_v1';

// --- Cinema Scenes ---
export function getCinemaScenes(): CinemaScene[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CINEMA_SCENES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load cinema scenes from localStorage', e);
  }
  return DEFAULT_CINEMA_SCENES;
}

export function saveCinemaScenes(scenes: CinemaScene[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_CINEMA_SCENES, JSON.stringify(scenes));
  } catch (e) {
    console.error('Failed to save cinema scenes to localStorage', e);
  }
}

// --- Visual Atoms ---
export function getVisualAtoms(): VisualAtom[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_VISUAL_ATOMS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load visual atoms from localStorage', e);
  }
  return VISUAL_ATOMS;
}

export function saveVisualAtoms(atoms: VisualAtom[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_VISUAL_ATOMS, JSON.stringify(atoms));
  } catch (e) {
    console.error('Failed to save visual atoms to localStorage', e);
  }
}

// --- Design Principles ---
export function getDesignPrinciples(): DesignPrinciple[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PRINCIPLES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load design principles from localStorage', e);
  }
  return DESIGN_PRINCIPLES;
}

export function saveDesignPrinciples(principles: DesignPrinciple[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_PRINCIPLES, JSON.stringify(principles));
  } catch (e) {
    console.error('Failed to save design principles to localStorage', e);
  }
}

// --- Style Rules ---
export function getStyleRules(): StyleRuleEquation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STYLE_RULES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load style rules from localStorage', e);
  }
  return STYLE_RULES;
}

export function saveStyleRules(styles: StyleRuleEquation[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_STYLE_RULES, JSON.stringify(styles));
  } catch (e) {
    console.error('Failed to save style rules to localStorage', e);
  }
}

// --- Atlas Works ---
export function getAtlasWorks(): AtlasWork[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_WORKS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load atlas works from localStorage', e);
  }
  return ATLAS_WORKS;
}

export function saveAtlasWorks(works: AtlasWork[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_WORKS, JSON.stringify(works));
  } catch (e) {
    console.error('Failed to save atlas works to localStorage', e);
  }
}

// --- Backup & Export / Import ---
export interface FullAtlasBackupPackage {
  version: string;
  exportDate: string;
  cinemaScenes: CinemaScene[];
  visualAtoms: VisualAtom[];
  designPrinciples: DesignPrinciple[];
  styleRules: StyleRuleEquation[];
  atlasWorks: AtlasWork[];
}

export function exportAllAtlasDataAsJSON(): string {
  const dataPackage: FullAtlasBackupPackage = {
    version: '2.0-prompt-cinema',
    exportDate: new Date().toISOString(),
    cinemaScenes: getCinemaScenes(),
    visualAtoms: getVisualAtoms(),
    designPrinciples: getDesignPrinciples(),
    styleRules: getStyleRules(),
    atlasWorks: getAtlasWorks(),
  };
  return JSON.stringify(dataPackage, null, 2);
}

export function importAtlasDataFromJSON(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.cinemaScenes && Array.isArray(parsed.cinemaScenes)) {
      saveCinemaScenes(parsed.cinemaScenes);
    }
    if (parsed.visualAtoms && Array.isArray(parsed.visualAtoms)) {
      saveVisualAtoms(parsed.visualAtoms);
    }
    if (parsed.designPrinciples && Array.isArray(parsed.designPrinciples)) {
      saveDesignPrinciples(parsed.designPrinciples);
    }
    if (parsed.styleRules && Array.isArray(parsed.styleRules)) {
      saveStyleRules(parsed.styleRules);
    }
    if (parsed.atlasWorks && Array.isArray(parsed.atlasWorks)) {
      saveAtlasWorks(parsed.atlasWorks);
    }
    return true;
  } catch (e) {
    console.error('Import failed:', e);
    return false;
  }
}

export function resetAtlasToDefaults(): void {
  localStorage.removeItem(STORAGE_KEY_CINEMA_SCENES);
  localStorage.removeItem(STORAGE_KEY_VISUAL_ATOMS);
  localStorage.removeItem(STORAGE_KEY_PRINCIPLES);
  localStorage.removeItem(STORAGE_KEY_STYLE_RULES);
  localStorage.removeItem(STORAGE_KEY_WORKS);
}

// --- Admin Auth ---
export function isAdminAuthed(): boolean {
  return localStorage.getItem(STORAGE_KEY_ADMIN_AUTH) === 'true';
}

export function setAdminAuth(authed: boolean): void {
  if (authed) {
    localStorage.setItem(STORAGE_KEY_ADMIN_AUTH, 'true');
  } else {
    localStorage.removeItem(STORAGE_KEY_ADMIN_AUTH);
  }
}
