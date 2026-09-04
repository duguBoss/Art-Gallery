import { useState, useEffect } from 'react';
import type { GalleryTheme } from './types/theme';
import { Navbar, type MainViewType } from './components/Navbar';
import { VisualJourneyHero } from './components/VisualJourneyHero';
import { VisualAtomsView } from './components/VisualAtomsView';
import { StyleMatrixView } from './components/StyleMatrixView';
import { MotionCameraLab } from './components/MotionCameraLab';
import { DesignAtlasView } from './components/DesignAtlasView';
import { GenerativePosterStudio } from './components/GenerativePosterStudio';
import { SpotlightEffect } from './components/SpotlightEffect';
import { AdminCMSModal } from './components/AdminCMSModal';
import { Footer } from './components/Footer';
import { getImageCases, getVideoWorkflows } from './data/workflowStore';
import type { AIImageCase, AIVideoWorkflow } from './types/art';

export function App() {
  // Scenario-Based Artistic Atmosphere Theme
  const [currentTheme, setCurrentTheme] = useState<GalleryTheme>(() => {
    const saved = localStorage.getItem('art_gallery_theme');
    const validThemes: GalleryTheme[] = ['cozy-night', 'zen-mist', 'cyber-neon', 'grand-salon', 'ghibli-breeze'];
    return (validThemes.includes(saved as GalleryTheme) ? (saved as GalleryTheme) : 'cozy-night');
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('art_gallery_theme', currentTheme);
  }, [currentTheme]);

  // Core Visual Atlas Views: 'atoms' | 'styles' | 'motion' | 'atlas' | 'shapes-lab'
  const [currentView, setCurrentView] = useState<MainViewType>('atoms');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cross-Dimension Filters
  const [activeAtomFilter, setActiveAtomFilter] = useState<string | null>(null);
  const [activeStyleFilter, setActiveStyleFilter] = useState<string | null>(null);

  // Stealth Admin Modal State
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [imageCases, setImageCases] = useState<AIImageCase[]>(getImageCases());
  const [videoWorkflows, setVideoWorkflows] = useState<AIVideoWorkflow[]>(getVideoWorkflows());

  // Cross-Navigation Handler: Explore Atom in Works
  const handleExploreAtomInWorks = (atomName: string) => {
    setActiveAtomFilter(atomName);
    setActiveStyleFilter(null);
    setCurrentView('atlas');
  };

  // Cross-Navigation Handler: Explore Style in Works
  const handleExploreStyleInWorks = (styleId: string) => {
    setActiveStyleFilter(styleId);
    setActiveAtomFilter(null);
    setCurrentView('atlas');
  };

  const handleClearFilters = () => {
    setActiveAtomFilter(null);
    setActiveStyleFilter(null);
  };

  // Stealth Trigger 1: Global Shortcut Ctrl + Shift + A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col font-sans transition-colors duration-300 relative"
      style={{
        backgroundColor: 'var(--bg-page)',
        color: 'var(--text-main)',
      }}
    >
      {/* Subtle Museum Spotlight Tracking Mouse */}
      <SpotlightEffect />

      {/* Top Global Navigation */}
      <Navbar
        currentView={currentView}
        onSwitchView={setCurrentView}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentTheme={currentTheme}
        onSelectTheme={setCurrentTheme}
      />

      {/* Main Visual Atlas Container */}
      <main className="flex-1 pb-16">
        {/* Visual Journey Hero & Progression Roadmap */}
        <VisualJourneyHero
          currentTab={currentView}
          onSelectTab={(tab) => {
            setCurrentView(tab as MainViewType);
          }}
        />

        {/* View 1: LEVEL 01 · 视觉基础原子库 (Visual Atoms) */}
        {currentView === 'atoms' && (
          <VisualAtomsView onExploreAtomInWorks={handleExploreAtomInWorks} />
        )}

        {/* View 2: LEVEL 02 · 风格规则矩阵与方程 (Style Matrix) */}
        {currentView === 'styles' && (
          <StyleMatrixView onExploreStyleInWorks={handleExploreStyleInWorks} />
        )}

        {/* View 3: LEVEL 03 · 动态与镜头语言实验室 (Motion & Camera Lab) */}
        {currentView === 'motion' && (
          <MotionCameraLab />
        )}

        {/* View 4: LEVEL 04 · 作品与多维知识网络 (Design Atlas Works & Deconstruction) */}
        {currentView === 'atlas' && (
          <DesignAtlasView
            initialAtomFilter={activeAtomFilter}
            initialStyleFilter={activeStyleFilter}
            onClearFilter={handleClearFilters}
            onSelectAtom={handleExploreAtomInWorks}
            onSelectStyle={handleExploreStyleInWorks}
          />
        )}

        {/* View 5: LEVEL 05 · 算法海报重构工坊 (Book of Shapes Generative Studio) */}
        {currentView === 'shapes-lab' && (
          <GenerativePosterStudio
            currentTheme={currentTheme}
            onSelectTheme={setCurrentTheme}
          />
        )}
      </main>

      {/* Clean Footer with Secret Trigger */}
      <Footer onSecretTrigger={() => setIsAdminOpen(true)} />

      {/* Stealth Curator Admin Modal */}
      <AdminCMSModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        imageCases={imageCases}
        videoWorkflows={videoWorkflows}
        onUpdateImageCases={setImageCases}
        onUpdateVideoWorkflows={setVideoWorkflows}
      />
    </div>
  );
}

export default App;
