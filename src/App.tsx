import { useState, useMemo } from 'react';
import { ART_STYLES } from './data/stylesData';
import { getImageCases, getVideoWorkflows } from './data/workflowStore';
import type { ArtStyle, Artwork, HallCategory, AIImageCase, AIVideoWorkflow } from './types/art';
import { SpotlightEffect } from './components/SpotlightEffect';
import { Navbar, type MainViewType } from './components/Navbar';
import { HeroGallery } from './components/HeroGallery';
import { AIImagePromptLab } from './components/AIImagePromptLab';
import { AIVideoWorkflowLab } from './components/AIVideoWorkflowLab';
import { SpatialGalleryRoom } from './components/SpatialGalleryRoom';
import { ArtworkWall } from './components/ArtworkWall';
import { StyleGrid } from './components/StyleGrid';
import { StyleDetailModal } from './components/StyleDetailModal';
import { Lightbox } from './components/Lightbox';
import { StyleMixer } from './components/StyleMixer';
import { PaletteInspectorModal } from './components/PaletteInspectorModal';
import { VirtualTourModal } from './components/VirtualTourModal';
import { SubmitStyleModal } from './components/SubmitStyleModal';
import { ScenarioExplorerModal } from './components/ScenarioExplorerModal';
import { AdminCMSModal } from './components/AdminCMSModal';
import { Footer } from './components/Footer';

export function App() {
  // Main view defaults to 'image-lab' for AI Prompt deconstruction and 'video-lab' for multi-step workflows
  const [currentView, setCurrentView] = useState<MainViewType>('image-lab');
  const [selectedHall, setSelectedHall] = useState<HallCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // AI Prompt and Video Workflow stores backed by localStorage
  const [imageCases, setImageCases] = useState<AIImageCase[]>(getImageCases());
  const [videoWorkflows, setVideoWorkflows] = useState<AIVideoWorkflow[]>(getVideoWorkflows());

  // Modals state
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<ArtStyle | null>(null);
  const [inspectedArtwork, setInspectedArtwork] = useState<{ artwork: Artwork; style: ArtStyle } | null>(null);
  const [isMixerOpen, setIsMixerOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isScenariosOpen, setIsScenariosOpen] = useState(false);

  // Filtered Styles
  const filteredStyles = useMemo(() => {
    return ART_STYLES.filter((style) => {
      const matchesHall = selectedHall === 'all' || style.hall === selectedHall;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesHall;

      return matchesHall && (
        style.title.toLowerCase().includes(query) ||
        style.englishTitle.toLowerCase().includes(query) ||
        style.badge.toLowerCase().includes(query) ||
        style.summary.toLowerCase().includes(query) ||
        style.appliedScenarios?.some(s => s.scenarioName.toLowerCase().includes(query) || s.useCase.toLowerCase().includes(query)) ||
        style.representativeWorks.some(w => w.title.toLowerCase().includes(query) || w.description.toLowerCase().includes(query))
      );
    });
  }, [selectedHall, searchQuery]);

  const featuredStyles = useMemo(() => {
    return ART_STYLES.filter(s => s.featured);
  }, []);

  const handleInspectArtwork = (art: Artwork, style: ArtStyle) => {
    setInspectedArtwork({ artwork: art, style });
  };

  return (
    <div className="min-h-screen bg-gallery-950 text-gallery-100 relative">
      <SpotlightEffect />

      {/* Primary Top Navigation */}
      <Navbar
        currentView={currentView}
        onSwitchView={setCurrentView}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenMixer={() => setIsMixerOpen(true)}
        onOpenPalette={() => setIsPaletteOpen(true)}
        onOpenSubmit={() => setIsSubmitOpen(true)}
        onOpenTour={() => setIsTourOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      <main>
        {/* Dynamic Hero Facade */}
        <HeroGallery
          featuredStyles={featuredStyles}
          onSelectStyle={setSelectedStyle}
          onOpenTour={() => setIsTourOpen(true)}
          onSwitchView={setCurrentView}
        />

        {/* Dynamic Studio Stage Anchor */}
        <div id="exhibition-content">
          {/* VIEW 1: AI Image Prompt Deconstruction Lab */}
          {currentView === 'image-lab' && (
            <AIImagePromptLab
              imageCases={imageCases}
              onOpenAdmin={() => setIsAdminOpen(true)}
            />
          )}

          {/* VIEW 2: AI Multi-Step Video Workflow Pipeline */}
          {currentView === 'video-lab' && (
            <AIVideoWorkflowLab
              workflows={videoWorkflows}
              onOpenAdmin={() => setIsAdminOpen(true)}
            />
          )}

          {/* VIEW 3: 3D Spatial Museum Room */}
          {currentView === 'spatial' && (
            <SpatialGalleryRoom
              styles={filteredStyles}
              onInspectArtwork={handleInspectArtwork}
              onSelectStyle={setSelectedStyle}
              onOpenTour={() => setIsTourOpen(true)}
              onOpenScenarios={() => setIsScenariosOpen(true)}
            />
          )}

          {/* VIEW 4: Art Wall Masonry */}
          {currentView === 'wall' && (
            <ArtworkWall
              styles={filteredStyles}
              onInspectArtwork={handleInspectArtwork}
              onSelectStyle={setSelectedStyle}
              onOpenScenarios={() => setIsScenariosOpen(true)}
            />
          )}

          {/* VIEW 5: Styles Salons List */}
          {currentView === 'styles' && (
            <StyleGrid
              styles={filteredStyles}
              selectedHall={selectedHall}
              onSelectHall={setSelectedHall}
              onSelectStyle={setSelectedStyle}
              searchQuery={searchQuery}
            />
          )}
        </div>
      </main>

      {/* Admin CMS Modal */}
      <AdminCMSModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        imageCases={imageCases}
        videoWorkflows={videoWorkflows}
        onUpdateImageCases={setImageCases}
        onUpdateVideoWorkflows={setVideoWorkflows}
      />

      {/* Artwork Inspection & Style Details */}
      {selectedStyle && (
        <StyleDetailModal
          style={selectedStyle}
          onClose={() => setSelectedStyle(null)}
          onInspectArtwork={handleInspectArtwork}
        />
      )}

      {inspectedArtwork && (
        <Lightbox
          artwork={inspectedArtwork.artwork}
          style={inspectedArtwork.style}
          onClose={() => setInspectedArtwork(null)}
        />
      )}

      {/* Auxiliary Tools */}
      <ScenarioExplorerModal
        isOpen={isScenariosOpen}
        onClose={() => setIsScenariosOpen(false)}
        styles={ART_STYLES}
        onSelectStyle={(s) => setSelectedStyle(s)}
      />

      <StyleMixer
        styles={ART_STYLES}
        isOpen={isMixerOpen}
        onClose={() => setIsMixerOpen(false)}
      />

      <PaletteInspectorModal
        styles={ART_STYLES}
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
      />

      <SubmitStyleModal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
      />

      <VirtualTourModal
        styles={ART_STYLES}
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onSelectStyle={(s) => setSelectedStyle(s)}
      />

      <Footer />
    </div>
  );
}

export default App;