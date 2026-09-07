import type { KnowledgeNode } from '../types/visualAtlas';
import { KNOWLEDGE_NODES as CORE_NODES, KNOWLEDGE_DOMAINS, getKnowledgeDomain } from './knowledgeStore';
import { KNOWLEDGE_EXPANSION } from './knowledgeExpansion';

export const KNOWLEDGE_CATALOG: KnowledgeNode[] = [...CORE_NODES, ...KNOWLEDGE_EXPANSION];

export const getCatalogNode = (id: string) => KNOWLEDGE_CATALOG.find((node) => node.id === id);
export const getCatalogDomain = getKnowledgeDomain;
export const getCatalogNodesByDomain = (domainId: string) => KNOWLEDGE_CATALOG.filter((node) => node.domainId === domainId);
