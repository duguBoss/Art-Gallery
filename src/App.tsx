import React, { useState, useEffect } from 'react';
import type { AtlasTab } from './types/visualAtlas';
import type { CinemaScene } from './types/cinema';
import { Navbar } from './components/Navbar';
import { OpeningSequenceView } from './components/OpeningSequenceView';
import { ArchiveContactSheet } from './components/ArchiveContactSheet';
import { SceneDetailView } from './components/SceneDetailView';
import { VisualConstellationView } from './components/VisualConstellationView';
import { DossiersView } from './components/DossiersView';
import { VisualLabView } from './components/VisualLabView';
import { CommandPalette } from './components/CommandPalette';
import { AdminCMSModal } from './components/AdminCMSModal';
import { GoogleAdSenseUnit } from './components/GoogleAdSenseUnit';
import { playSpotlightClick } from './utils/audio';
import { 
  getCinemaScenes, 
  getVisualAtoms, 
  getDesignPrinciples, 
  getStyleRules 
} from './data/atlasStore';

export function App() {
  const [currentTab, setCurrentTab] = useState<AtlasTab>('index');
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(null);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Dynamic Scene Data Store
  const [scenes, setScenes] = useState<CinemaScene[]>(() => getCinemaScenes());
  const [visualAtoms, setVisualAtoms] = useState(() => getVisualAtoms());
  const [designPrinciples, setDesignPrinciples] = useState(() => getDesignPrinciples());
  const [styleRules, setStyleRules] = useState(() => getStyleRules());

  // Personal Research Dossier Saved State
  const [savedSceneIds, setSavedSceneIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('visual_atlas_dossier_scenes_v1');
      return saved ? JSON.parse(saved) : [scenes[0]?.id].filter(Boolean);
    } catch (e) {
      return [scenes[0]?.id].filter(Boolean);
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('visual_atlas_dossier_scenes_v1', JSON.stringify(savedSceneIds));
    } catch (e) {}
  }, [savedSceneIds]);

  // Global ⌘K Shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        if (selectedSceneId) {
          setSelectedSceneId(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedSceneId]);

  // Dossier Toggle Handlers
  const handleToggleDossier = (scene: CinemaScene) => {
    playSpotlightClick();
    setSavedSceneIds((prev) =>
      prev.includes(scene.id) ? prev.filter((id) => id !== scene.id) : [...prev, scene.id]
    );
  };

  const handleRemoveFromDossier = (sceneId: string) => {
    playSpotlightClick();
    setSavedSceneIds((prev) => prev.filter((id) => id !== sceneId));
  };

  const activeScene = scenes.find((s) => s.id === selectedSceneId) || scenes[0];

  return (
    <div className="min-h-screen w-full bg-[#11110F] text-[#F2F0E8] font-sans flex flex-col justify-between selection:bg-[#D8FF3E] selection:text-[#11110F]">
      {/* Top Editorial Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setSelectedSceneId(null);
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenCommandPalette={() => setIsCommandOpen(true)}
        onOpenCMS={() => setIsAdminOpen(true)}
        savedDossierCount={savedSceneIds.length}
      />

      {/* Main Exhibition Floor */}
      <main className="flex-1 w-full">
        {selectedSceneId ? (
          <SceneDetailView
            scene={activeScene}
            allScenes={scenes}
            onBack={() => {
              setSelectedSceneId(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectScene={(id) => {
              setSelectedSceneId(id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreTag={(tag) => {
              setSelectedSceneId(null);
              setCurrentTab('archive');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenInLab={() => {
              setSelectedSceneId(null);
              setCurrentTab('lab');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSaveToDossier={handleToggleDossier}
            isSavedInDossier={savedSceneIds.includes(activeScene.id)}
          />
        ) : (
          <>
            {currentTab === 'index' && (
              <OpeningSequenceView
                featuredScene={scenes[0]}
                totalScenesCount={scenes.length}
                onStudyScene={(id) => {
                  setSelectedSceneId(id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onExploreArchive={() => {
                  setCurrentTab('archive');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {currentTab === 'archive' && (
              <ArchiveContactSheet
                scenes={scenes}
                onSelectScene={(id) => {
                  setSelectedSceneId(id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {currentTab === 'language' && (
              <VisualConstellationView
                scenes={scenes}
                onSelectScene={(id) => {
                  setSelectedSceneId(id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {currentTab === 'dossiers' && (
              <DossiersView
                savedSceneIds={savedSceneIds}
                allScenes={scenes}
                onSelectScene={(id) => {
                  setSelectedSceneId(id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onRemoveFromDossier={handleRemoveFromDossier}
              />
            )}

            {currentTab === 'lab' && (
              <VisualLabView
                initialScene={scenes[0]}
                onSavePromptToDossier={(prompt) => {
                  alert('Prompt saved to research dossier.');
                }}
              />
            )}
          </>
        )}
      </main>

      {/* AdSense Unit (Discreet Editorial Placement) */}
      <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-12 my-6">
        <GoogleAdSenseUnit variant="banner" />
      </div>

      {/* Minimal Swiss Editorial Colophon Footer */}
      <footer className="w-full border-t border-[#F2F0E8]/10 bg-[#0E0E0C] text-[#8B887F] text-xs font-mono py-8 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[#D8FF3E]">●</span>
            <span className="text-[#F2F0E8] font-bold">VISUAL ATLAS</span>
            <span>// 2026 ARCHIVE EDITION</span>
          </div>
          <div className="flex items-center gap-6 text-[11px]">
            <span>SEE → DECODE → CONNECT → COLLECT → CREATE</span>
            <button 
              onClick={() => setIsAdminOpen(true)}
              className="hover:text-[#D8FF3E] transition-colors cursor-pointer"
            >
              CURATOR CMS
            </button>
          </div>
        </div>
      </footer>

      {/* Global ⌘K Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        scenes={scenes}
        onSelectScene={(id) => {
          setSelectedSceneId(id);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateTab={(tab) => {
          setSelectedSceneId(null);
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Stealth / Curator Admin CMS Modal */}
      <AdminCMSModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        cinemaScenes={scenes}
        visualAtoms={visualAtoms}
        designPrinciples={designPrinciples}
        styleRules={styleRules}
        onUpdateCinemaScenes={setScenes}
        onUpdateVisualAtoms={setVisualAtoms}
        onUpdateDesignPrinciples={setDesignPrinciples}
        onUpdateStyleRules={setStyleRules}
      />
    </div>
  );
}

export default App;
