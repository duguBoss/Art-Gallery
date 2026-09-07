import React, { useState, useEffect } from 'react';
import type { AtlasTab } from './types/visualAtlas';
import type { CinemaScene } from './types/cinema';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { OpeningSequenceView } from './components/OpeningSequenceView';
import { ArchiveContactSheet } from './components/ArchiveContactSheet';
import { SceneDetailView } from './components/SceneDetailView';
import { VisualConstellationView } from './components/VisualConstellationView';
import { KnowledgeHubViewV2 } from './components/KnowledgeHubViewV2';
import { KnowledgeDetailView } from './components/KnowledgeDetailView';
import { ToolsHubView } from './components/ToolsHubView';
import { DossiersView } from './components/DossiersView';
import { VisualLabView } from './components/VisualLabView';
import { AboutManifestoView } from './components/AboutManifestoView';
import { CommandPalette } from './components/CommandPalette';
import { UseWithAIModal } from './components/UseWithAIModal';
import { AIKnowledgeCockpit } from './components/AIKnowledgeCockpit';
import { useAtlasRouter } from './router/useAtlasRouter';
import { GoogleAdSenseUnit } from './components/GoogleAdSenseUnit';
import { playSpotlightClick } from './utils/audio';
import { getCinemaScenes } from './data/atlasStore';

function AppContent() {
  const { lang, setLang, t } = useLanguage();
  const [currentTab, setCurrentTab] = useState<AtlasTab>('index');
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(null);
  const [selectedKnowledgeId, setSelectedKnowledgeId] = useState<string | null>(null);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [scenes] = useState<CinemaScene[]>(() => getCinemaScenes());

  useAtlasRouter(lang, currentTab === 'language' ? 'constellation' : currentTab, selectedSceneId, selectedKnowledgeId, (route) => {
    if (route.locale && route.locale !== lang) setLang(route.locale);
    if (route.tab) setCurrentTab(route.tab === 'constellation' ? 'language' : route.tab as AtlasTab);
    setSelectedSceneId(route.sceneId || null);
    setSelectedKnowledgeId(route.knowledgeId || null);
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setIsCommandOpen((prev) => !prev); }
      if (e.key === 'Escape') { setSelectedSceneId(null); setSelectedKnowledgeId(null); }
    };
    window.addEventListener('keydown', handleKeyDown); return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const go = (tab: AtlasTab) => { setSelectedSceneId(null); setSelectedKnowledgeId(null); setCurrentTab(tab); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const openKnowledge = (id: string) => { setSelectedSceneId(null); setSelectedKnowledgeId(id); setCurrentTab('knowledge'); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const activeScene = scenes.find((s) => s.id === selectedSceneId) || scenes[0];
  const [savedSceneIds, setSavedSceneIds] = useState<string[]>(() => { try { const saved = localStorage.getItem('visual_atlas_dossier_scenes_v1'); return saved ? JSON.parse(saved) : [scenes[0]?.id].filter(Boolean); } catch { return [scenes[0]?.id].filter(Boolean); } });
  useEffect(() => { try { localStorage.setItem('visual_atlas_dossier_scenes_v1', JSON.stringify(savedSceneIds)); } catch {} }, [savedSceneIds]);
  const handleToggleDossier = (scene: CinemaScene) => { playSpotlightClick(); setSavedSceneIds((prev) => prev.includes(scene.id) ? prev.filter((id) => id !== scene.id) : [...prev, scene.id]); };
  const handleRemoveFromDossier = (sceneId: string) => { playSpotlightClick(); setSavedSceneIds((prev) => prev.filter((id) => id !== sceneId)); };

  return <div className="min-h-screen w-full bg-[#11110F] text-[#F2F0E8] font-sans flex flex-col justify-between selection:bg-[#D8FF3E] selection:text-[#11110F]">
    <Navbar currentTab={currentTab} onSelectTab={go} onOpenCommandPalette={() => setIsCommandOpen(true)} onOpenAI={() => setIsAIOpen(true)} savedDossierCount={savedSceneIds.length} />
    <main className="flex-1 w-full">
      {selectedSceneId ? <SceneDetailView scene={activeScene} allScenes={scenes} onBack={() => go('archive')} onSelectScene={(id) => { setSelectedSceneId(id); window.scrollTo({ top: 0, behavior: 'smooth' }); }} onExploreTag={() => go('archive')} onOpenInLab={() => go('lab')} onSaveToDossier={handleToggleDossier} isSavedInDossier={savedSceneIds.includes(activeScene.id)} />
      : selectedKnowledgeId ? <KnowledgeDetailView nodeId={selectedKnowledgeId} onBack={() => go('knowledge')} onOpenNode={openKnowledge} />
      : <>
        {currentTab === 'index' && <OpeningSequenceView featuredScene={scenes[0]} totalScenesCount={scenes.length} onStudyScene={(id) => setSelectedSceneId(id)} onExploreArchive={() => go('archive')} />}
        {currentTab === 'archive' && <ArchiveContactSheet scenes={scenes} onSelectScene={(id) => setSelectedSceneId(id)} />}
        {currentTab === 'knowledge' && <KnowledgeHubViewV2 onOpenNode={openKnowledge} />}
        {currentTab === 'language' && <VisualConstellationView scenes={scenes} onSelectScene={(id) => setSelectedSceneId(id)} />}
        {currentTab === 'dossiers' && <DossiersView savedSceneIds={savedSceneIds} allScenes={scenes} onSelectScene={(id) => setSelectedSceneId(id)} onRemoveFromDossier={handleRemoveFromDossier} />}
        {currentTab === 'lab' && <VisualLabView initialScene={scenes[0]} allScenes={scenes} onSavePromptToDossier={() => alert(t('lab.savePromptToDossier') + ' OK')} />}
        {currentTab === 'tools' && <ToolsHubView />}
        {currentTab === 'about' && <AboutManifestoView onExploreArchive={() => go('archive')} />}
        {currentTab === 'ai' && <AIKnowledgeCockpit />}
      </>}
    </main>
    <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-12 my-6"><GoogleAdSenseUnit variant="banner" /></div>
    <footer className="w-full border-t border-[#F2F0E8]/10 bg-[#0E0E0C] text-[#8B887F] text-xs font-mono py-8 px-6 lg:px-12"><div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4"><div className="flex items-center gap-2"><span className="text-[#D8FF3E]">●</span><span className="text-[#F2F0E8] font-bold">VISUAL ATLAS</span><span>{t('footer.edition')}</span></div><div className="flex items-center gap-6 text-[11px]"><span>{t('footer.loop')}</span><a href="https://github.com/duguBoss/Art-Gallery" target="_blank" rel="noreferrer" className="hover:text-[#D8FF3E]">GITHUB</a></div></div></footer>
    <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} scenes={scenes} onSelectScene={(id) => setSelectedSceneId(id)} onNavigateTab={(tab) => go(tab)} />
    <UseWithAIModal isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
  </div>;
}

export function App() { return <LanguageProvider><AppContent /></LanguageProvider>; }
export default App;
