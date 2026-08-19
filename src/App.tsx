import React, { useState, useMemo } from 'react';
import { ART_STYLES, EXHIBITION_HALLS } from './data/stylesData';
import { ArtStyle, Artwork, HallCategory } from './types/art';
import { SpotlightEffect } from './components/SpotlightEffect';
import { Navbar } from './components/Navbar';
import { HeroGallery } from './components/HeroGallery';
import { StyleGrid } from './components/StyleGrid';
import { StyleDetailModal } from './components/StyleDetailModal';
import { Lightbox } from './components/Lightbox';
import { StyleMixer } from './components/StyleMixer';
import { PaletteInspectorModal } from './components/PaletteInspectorModal';
import { VirtualTourModal } from './components/VirtualTourModal';
import { SubmitStyleModal } from './components/SubmitStyleModal';
import { Footer } from './components/Footer';

export function App() {
  const [selectedHall, setSelectedHall] = useState<HallCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modals state
  const [selectedStyle, setSelectedStyle] = useState<ArtStyle | null>(null);
  const [inspectedArtwork, setInspectedArtwork] = useState<{ artwork: Artwork; style: ArtStyle } | null>(null);
  const [isMixerOpen, setIsMixerOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);

  // Filtered Styles
  const filteredStyles = useMemo(() => {
    return ART_STYLES.filter((style) => {
      // Hall filter
      const matchesHall = selectedHall === 'all' || style.hall === selectedHall;

      // Search filter
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesHall;

      const matchesQuery =
        style.title.toLowerCase().includes(query) ||
        style.englishTitle.toLowerCase().includes(query) ||
        style.badge.toLowerCase().includes(query) ||
        style.summary.toLowerCase().includes(query) ||
        style.visualKeyFeatures.some(f => f.toLowerCase().includes(query)) ||
        style.promptKeywords.positiveKeywords.some(k => k.toLowerCase().includes(query));

      return matchesHall && matchesQuery;
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
      {/* Dynamic Museum Torch & Ambient Spotlight */}
      <SpotlightEffect />

      {/* Navigation Topbar */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenMixer={() => setIsMixerOpen(true)}
        onOpenPalette={() => setIsPaletteOpen(true)}
        onOpenSubmit={() => setIsSubmitOpen(true)}
        onOpenTour={() => setIsTourOpen(true)}
        stylesCount={ART_STYLES.length}
      />

      {/* Main Exhibition Content */}
      <main>
        <HeroGallery
          featuredStyles={featuredStyles}
          onSelectStyle={setSelectedStyle}
          onOpenTour={() => setIsTourOpen(true)}
          onJumpToHall={(hall) => setSelectedHall(hall as HallCategory)}
        />

        <StyleGrid
          styles={filteredStyles}
          selectedHall={selectedHall}
          onSelectHall={setSelectedHall}
          onSelectStyle={setSelectedStyle}
          searchQuery={searchQuery}
        />
      </main>

      {/* Interactive Modals */}
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

      {/* Museum Footer */}
      <Footer />
    </div>
  );
}

export default App;
