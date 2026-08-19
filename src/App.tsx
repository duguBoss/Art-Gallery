import { useState, useMemo } from 'react';
import { ART_STYLES } from './data/stylesData';
import type { ArtStyle, Artwork, HallCategory } from './types/art';
import { SpotlightEffect } from './components/SpotlightEffect';
import { Navbar } from './components/Navbar';
import { HeroGallery } from './components/HeroGallery';
import { ArtworkWall } from './components/ArtworkWall';
import { StyleGrid } from './components/StyleGrid';
import { StyleDetailModal } from './components/StyleDetailModal';
import { Lightbox } from './components/Lightbox';
import { StyleMixer } from './components/StyleMixer';
import { PaletteInspectorModal } from './components/PaletteInspectorModal';
import { VirtualTourModal } from './components/VirtualTourModal';
import { SubmitStyleModal } from './components/SubmitStyleModal';
import { ScenarioExplorerModal } from './components/ScenarioExplorerModal';
import { Footer } from './components/Footer';

export function App() {
  const [currentView, setCurrentView] = useState<'wall' | 'styles'>('wall');
  const [selectedHall, setSelectedHall] = useState<HallCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modals state
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

      <Navbar
        currentView={currentView}
        onSwitchView={setCurrentView}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenMixer={() => setIsMixerOpen(true)}
        onOpenPalette={() => setIsPaletteOpen(true)}
        onOpenSubmit={() => setIsSubmitOpen(true)}
        onOpenTour={() => setIsTourOpen(true)}
        onOpenScenarios={() => setIsScenariosOpen(true)}
      />

      <main>
        <HeroGallery
          featuredStyles={featuredStyles}
          onSelectStyle={setSelectedStyle}
          onOpenTour={() => setIsTourOpen(true)}
          onSwitchView={setCurrentView}
        />

        <div id="exhibition-content">
          {currentView === 'wall' ? (
            <ArtworkWall
              styles={filteredStyles}
              onInspectArtwork={handleInspectArtwork}
              onSelectStyle={setSelectedStyle}
              onOpenScenarios={() => setIsScenariosOpen(true)}
            />
          ) : (
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