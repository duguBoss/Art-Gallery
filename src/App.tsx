import { useState, useEffect } from 'react';
import type { GalleryTheme } from './types/theme';
import type { MediumType, VisualAtom, DesignPrinciple, StyleRuleEquation } from './types/atlas';
import type { CinemaScene } from './types/cinema';
import { Navbar, type MainViewType } from './components/Navbar';
import { ChapterDock, CHAPTER_LIST } from './components/ChapterDock';
import { ChapterTransitionGate } from './components/ChapterTransitionGate';
import { PromptCinemaView } from './components/PromptCinemaView';
import { VisualAtomsView } from './components/VisualAtomsView';
import { DesignPrinciplesView } from './components/DesignPrinciplesView';
import { StyleMatrixView } from './components/StyleMatrixView';
import { MediumMatrixView } from './components/MediumMatrixView';
import { MotionCameraLab } from './components/MotionCameraLab';
import { DesignAtlasView } from './components/DesignAtlasView';
import { GenerativePosterStudio } from './components/GenerativePosterStudio';
import { SpotlightEffect } from './components/SpotlightEffect';
import { Spatial3DCanvas } from './components/Spatial3DCanvas';
import { MagneticCursor } from './components/MagneticCursor';
import { AdminCMSModal } from './components/AdminCMSModal';
import { Footer } from './components/Footer';
import { GoogleAdSenseUnit } from './components/GoogleAdSenseUnit';
import { 
  getCinemaScenes, 
  getVisualAtoms, 
  getDesignPrinciples, 
  getStyleRules 
} from './data/atlasStore';

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

  // Core Visual Atlas Views:
  // 'cinema' | 'atoms' | 'principles' | 'styles' | 'mediums' | 'motion' | 'atlas' | 'shapes-lab'
  const [currentView, setCurrentView] = useState<MainViewType>('cinema');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cross-Dimension Filters
  const [activeAtomFilter, setActiveAtomFilter] = useState<string | null>(null);
  const [activeStyleFilter, setActiveStyleFilter] = useState<string | null>(null);
  const [activePrincipleFilter, setActivePrincipleFilter] = useState<string | null>(null);
  const [activeMediumFilter, setActiveMediumFilter] = useState<MediumType | 'all'>('all');

  // Dynamic Atlas Store Managed via CMS
  const [cinemaScenes, setCinemaScenes] = useState<CinemaScene[]>(() => getCinemaScenes());
  const [visualAtoms, setVisualAtoms] = useState<VisualAtom[]>(() => getVisualAtoms());
  const [designPrinciples, setDesignPrinciples] = useState<DesignPrinciple[]>(() => getDesignPrinciples());
  const [styleRules, setStyleRules] = useState<StyleRuleEquation[]>(() => getStyleRules());

  // Cinematic Deck Slide Direction ('up' | 'down') & 3D Warp Velocity
  const [slideDirection, setSlideDirection] = useState<'up' | 'down'>('up');
  const [isWarping, setIsWarping] = useState(false);

  const handleSwitchChapter = (newView: MainViewType) => {
    const oldIdx = CHAPTER_LIST.findIndex((c) => c.id === currentView);
    const newIdx = CHAPTER_LIST.findIndex((c) => c.id === newView);
    if (oldIdx === newIdx) return;
    setSlideDirection(newIdx >= oldIdx ? 'up' : 'down');
    setIsWarping(true);
    setTimeout(() => setIsWarping(false), 750);
    setCurrentView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Stealth / Direct Admin CMS State
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Cross-Navigation Handler: Explore Atom in Works
  const handleExploreAtomInWorks = (atomName: string) => {
    setActiveAtomFilter(atomName);
    setActiveStyleFilter(null);
    setActivePrincipleFilter(null);
    setActiveMediumFilter('all');
    handleSwitchChapter('atlas');
  };

  // Cross-Navigation Handler: Explore Style in Works
  const handleExploreStyleInWorks = (styleId: string) => {
    setActiveStyleFilter(styleId);
    setActiveAtomFilter(null);
    setActivePrincipleFilter(null);
    setActiveMediumFilter('all');
    handleSwitchChapter('atlas');
  };

  // Cross-Navigation Handler: Explore Principle in Works
  const handleExplorePrincipleInWorks = (principleName: string) => {
    setActivePrincipleFilter(principleName);
    setActiveAtomFilter(null);
    setActiveStyleFilter(null);
    setActiveMediumFilter('all');
    handleSwitchChapter('atlas');
  };

  // Cross-Navigation Handler: Explore Medium in Works
  const handleExploreMediumInWorks = (medium: MediumType) => {
    setActiveMediumFilter(medium);
    setActiveAtomFilter(null);
    setActiveStyleFilter(null);
    setActivePrincipleFilter(null);
    handleSwitchChapter('atlas');
  };

  const handleClearFilters = () => {
    setActiveAtomFilter(null);
    setActiveStyleFilter(null);
    setActivePrincipleFilter(null);
    setActiveMediumFilter('all');
  };

  // Global Keyboard Navigation for Chapter Flip
  useEffect(() => {
    const handleChapterKeys = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (isAdminOpen) return;

      const currentIdx = CHAPTER_LIST.findIndex((c) => c.id === currentView);
      if (e.key === 'PageDown' || (e.altKey && e.key === 'ArrowDown')) {
        e.preventDefault();
        if (currentIdx < CHAPTER_LIST.length - 1) {
          handleSwitchChapter(CHAPTER_LIST[currentIdx + 1].id);
        }
      } else if (e.key === 'PageUp' || (e.altKey && e.key === 'ArrowUp')) {
        e.preventDefault();
        if (currentIdx > 0) {
          handleSwitchChapter(CHAPTER_LIST[currentIdx - 1].id);
        }
      }
    };
    window.addEventListener('keydown', handleChapterKeys);
    return () => window.removeEventListener('keydown', handleChapterKeys);
  }, [currentView, isAdminOpen]);

  // Wheel-driven chapter flipping with momentum & boundary detection
  useEffect(() => {
    let lastWheelTime = 0;
    let wheelDeltaAccumulator = 0;

    const handleWheel = (e: WheelEvent) => {
      if (isAdminOpen) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      // Check if user is scrolling inside an element with active internal scrollbar
      let target = e.target as HTMLElement | null;
      let isScrollable = false;
      while (target && target !== document.body) {
        const overflowY = window.getComputedStyle(target).overflowY;
        if (['auto', 'scroll'].includes(overflowY) && target.scrollHeight > target.clientHeight) {
          if (e.deltaY > 0 && target.scrollTop + target.clientHeight < target.scrollHeight - 10) {
            isScrollable = true;
            break;
          }
          if (e.deltaY < 0 && target.scrollTop > 10) {
            isScrollable = true;
            break;
          }
        }
        target = target.parentElement;
      }

      if (isScrollable) return;

      // Check if document page itself is scrollable and not at bottom/top
      const docScrollTop = window.scrollY || document.documentElement.scrollTop;
      const docMaxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (e.deltaY > 0 && docScrollTop < docMaxScroll - 25) {
        return;
      }
      if (e.deltaY < 0 && docScrollTop > 25) {
        return;
      }

      const now = Date.now();
      if (now - lastWheelTime < 650) return;

      wheelDeltaAccumulator += e.deltaY;

      if (Math.abs(wheelDeltaAccumulator) > 55) {
        const currentIdx = CHAPTER_LIST.findIndex((c) => c.id === currentView);
        if (wheelDeltaAccumulator > 0 && currentIdx < CHAPTER_LIST.length - 1) {
          lastWheelTime = now;
          wheelDeltaAccumulator = 0;
          handleSwitchChapter(CHAPTER_LIST[currentIdx + 1].id);
        } else if (wheelDeltaAccumulator < 0 && currentIdx > 0) {
          lastWheelTime = now;
          wheelDeltaAccumulator = 0;
          handleSwitchChapter(CHAPTER_LIST[currentIdx - 1].id);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentView, isAdminOpen]);

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
      {/* Three.js Interactive 3D Spatial Universe & Kinetic Polyhedra Canvas */}
      <Spatial3DCanvas theme={currentTheme} isWarping={isWarping} />

      {/* Fluid Magnetic Torch Cursor */}
      <MagneticCursor />

      {/* Floating Right-Side Chapter Deck Indicator (Film Gauge Scrubber) */}
      <ChapterDock
        currentView={currentView}
        onSwitchView={handleSwitchChapter}
      />

      {/* Top Global Navigation */}
      <Navbar
        currentView={currentView}
        onSwitchView={handleSwitchChapter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentTheme={currentTheme}
        onSelectTheme={setCurrentTheme}
        onOpenCMS={() => setIsAdminOpen(true)}
      />

      {/* Main Visual Atlas Container */}
      <main className="flex-1 pb-16">
        {/* Animated Cinematic Deck Stage with Page-Flip Transitions */}
        <div 
          key={currentView} 
          className={slideDirection === 'up' ? 'animate-deck-up' : 'animate-deck-down'}
        >
          {/* View 0: LEVEL 00 · 镜头式叙事与电影分镜 (Prompt Cinema Viewport) */}
          {currentView === 'cinema' && (
            <PromptCinemaView
              scenes={cinemaScenes}
              onOpenCMS={() => setIsAdminOpen(true)}
              onExploreAtom={handleExploreAtomInWorks}
              onExplorePrinciple={handleExplorePrincipleInWorks}
            />
          )}

          {/* View 1: LEVEL 01 · 视觉基础材料库 (Visual Atoms) */}
          {currentView === 'atoms' && (
            <VisualAtomsView 
              atoms={visualAtoms}
              onExploreAtomInWorks={handleExploreAtomInWorks} 
            />
          )}

          {/* View 2: LEVEL 02 · 十大设计原则实验室 (Design Principles - The Bridge) */}
          {currentView === 'principles' && (
            <DesignPrinciplesView 
              principles={designPrinciples}
              onExplorePrincipleInWorks={handleExplorePrincipleInWorks} 
            />
          )}

          {/* View 3: LEVEL 03 · 风格规则矩阵与方程 (Style Matrix Equations) */}
          {currentView === 'styles' && (
            <StyleMatrixView 
              styles={styleRules}
              onExploreStyleInWorks={handleExploreStyleInWorks} 
            />
          )}

          {/* View 4: LEVEL 04 · 四大表现媒介 (The 4 Mediums: Image, Interface, Space, Motion) */}
          {currentView === 'mediums' && (
            <MediumMatrixView onExploreMediumInWorks={handleExploreMediumInWorks} />
          )}

          {/* View 5: LEVEL 05 · 动态与镜头语言实验室 (Motion & Cinema Lab) */}
          {currentView === 'motion' && (
            <MotionCameraLab />
          )}

          {/* View 6: LEVEL 06 · 作品知识网络与多维拆解 (Design Atlas Works & Deconstruction) */}
          {currentView === 'atlas' && (
            <DesignAtlasView
              initialAtomFilter={activeAtomFilter}
              initialStyleFilter={activeStyleFilter}
              initialPrincipleFilter={activePrincipleFilter}
              initialMediumFilter={activeMediumFilter}
              onClearFilter={handleClearFilters}
              onSelectAtom={handleExploreAtomInWorks}
              onSelectStyle={handleExploreStyleInWorks}
              onSelectPrinciple={handleExplorePrincipleInWorks}
            />
          )}

          {/* View 7: LEVEL 07 · 算法海报重构工坊 (Book of Shapes Generative Studio) */}
          {currentView === 'shapes-lab' && (
            <GenerativePosterStudio
              currentTheme={currentTheme}
              onSelectTheme={setCurrentTheme}
            />
          )}
        </div>

        {/* Cinematic Chapter Transition Gate (Bottom Flip Gateway) */}
        <ChapterTransitionGate
          currentView={currentView}
          onSwitchView={handleSwitchChapter}
        />

        {/* Global Curated Exhibition Patron Banner (Google AdSense Unit) */}
        <GoogleAdSenseUnit variant="banner" />
      </main>

      {/* Clean Footer with Secret Trigger */}
      <Footer onSecretTrigger={() => setIsAdminOpen(true)} />

      {/* Full-Featured Curator Admin CMS Modal */}
      <AdminCMSModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        cinemaScenes={cinemaScenes}
        visualAtoms={visualAtoms}
        designPrinciples={designPrinciples}
        styleRules={styleRules}
        onUpdateCinemaScenes={setCinemaScenes}
        onUpdateVisualAtoms={setVisualAtoms}
        onUpdateDesignPrinciples={setDesignPrinciples}
        onUpdateStyleRules={setStyleRules}
      />
    </div>
  );
}

export default App;
