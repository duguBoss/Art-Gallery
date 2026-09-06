import { useState, useEffect } from 'react';
import type { GalleryTheme } from './types/theme';
import type { MediumType, VisualAtom, DesignPrinciple, StyleRuleEquation } from './types/atlas';
import type { CinemaScene } from './types/cinema';
import { Navbar, type MainViewType } from './components/Navbar';
import { ChapterDock, CHAPTER_LIST } from './components/ChapterDock';
import { VisualGuidanceRail } from './components/VisualGuidanceRail';
import { VisualGuidanceWarpCurtain } from './components/VisualGuidanceWarpCurtain';
import { SlideControlBar } from './components/SlideControlBar';
import { DJIFlightSpecsHUD, type DJIFocalLength } from './components/DJIFlightSpecsHUD';
import { PromptCinemaView } from './components/PromptCinemaView';
import { VisualAtomsView } from './components/VisualAtomsView';
import { DesignPrinciplesView } from './components/DesignPrinciplesView';
import { StyleMatrixView } from './components/StyleMatrixView';
import { MediumMatrixView } from './components/MediumMatrixView';
import { MotionCameraLab } from './components/MotionCameraLab';
import { DesignAtlasView } from './components/DesignAtlasView';
import { GenerativePosterStudio } from './components/GenerativePosterStudio';
import { Spatial3DCanvas } from './components/Spatial3DCanvas';
import { MagneticCursor } from './components/MagneticCursor';
import { AdminCMSModal } from './components/AdminCMSModal';
import { Footer } from './components/Footer';
import { GoogleAdSenseUnit } from './components/GoogleAdSenseUnit';
import { playSpotlightClick } from './utils/audio';
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

  // Active Presentation Slide (0 to 7)
  const [currentView, setCurrentView] = useState<MainViewType>('cinema');
  const [slideDirection, setSlideDirection] = useState<'up' | 'down'>('up');
  const [isWarping, setIsWarping] = useState(false);
  const [focalLength, setFocalLength] = useState<DJIFocalLength>('24mm');
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

  // Slide Switch Handler
  const handleSwitchChapter = (newView: MainViewType) => {
    if (newView === currentView) return;
    playSpotlightClick();
    const oldIdx = CHAPTER_LIST.findIndex((c) => c.id === currentView);
    const newIdx = CHAPTER_LIST.findIndex((c) => c.id === newView);
    setSlideDirection(newIdx >= oldIdx ? 'up' : 'down');
    setIsWarping(true);
    setTimeout(() => setIsWarping(false), 550);
    setCurrentView(newView);
  };

  // Stealth / Direct Admin CMS State
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Cross-Navigation Handlers
  const handleExploreAtomInWorks = (atomName: string) => {
    setActiveAtomFilter(atomName);
    setActiveStyleFilter(null);
    setActivePrincipleFilter(null);
    setActiveMediumFilter('all');
    handleSwitchChapter('atlas');
  };

  const handleExploreStyleInWorks = (styleId: string) => {
    setActiveStyleFilter(styleId);
    setActiveAtomFilter(null);
    setActivePrincipleFilter(null);
    setActiveMediumFilter('all');
    handleSwitchChapter('atlas');
  };

  const handleExplorePrincipleInWorks = (principleName: string) => {
    setActivePrincipleFilter(principleName);
    setActiveAtomFilter(null);
    setActiveStyleFilter(null);
    setActiveMediumFilter('all');
    handleSwitchChapter('atlas');
  };

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

  // PPT / Keynote Remote Wheel Flip: Scroll once to flip exactly one slide
  useEffect(() => {
    let isLocked = false;
    let lockTimer: ReturnType<typeof setTimeout> | null = null;

    const handleWheel = (e: WheelEvent) => {
      if (isAdminOpen) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      
      // Stop native page scrolling so wheel acts 100% as a PPT slide clicker!
      e.preventDefault();

      if (isLocked) return;

      if (Math.abs(e.deltaY) > 8) {
        const idx = CHAPTER_LIST.findIndex((c) => c.id === currentView);
        if (e.deltaY > 0 && idx < CHAPTER_LIST.length - 1) {
          isLocked = true;
          handleSwitchChapter(CHAPTER_LIST[idx + 1].id);
          lockTimer = setTimeout(() => { isLocked = false; }, 550);
        } else if (e.deltaY < 0 && idx > 0) {
          isLocked = true;
          handleSwitchChapter(CHAPTER_LIST[idx - 1].id);
          lockTimer = setTimeout(() => { isLocked = false; }, 550);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (lockTimer) clearTimeout(lockTimer);
    };
  }, [currentView, isAdminOpen]);

  // PPT Keyboard Remote: Space, Arrows, PageUp/Down
  useEffect(() => {
    const handleChapterKeys = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (isAdminOpen) return;

      const idx = CHAPTER_LIST.findIndex((c) => c.id === currentView);
      if (e.key === ' ' || e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        if (idx < CHAPTER_LIST.length - 1) {
          handleSwitchChapter(CHAPTER_LIST[idx + 1].id);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        if (idx > 0) {
          handleSwitchChapter(CHAPTER_LIST[idx - 1].id);
        }
      }
    };
    window.addEventListener('keydown', handleChapterKeys);
    return () => window.removeEventListener('keydown', handleChapterKeys);
  }, [currentView, isAdminOpen]);

  // Touch Swipe Gesture (Mobile / iPad PPT flip)
  useEffect(() => {
    let touchStartY = 0;
    let isLocked = false;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isLocked || isAdminOpen) return;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      if (Math.abs(deltaY) > 35) {
        const idx = CHAPTER_LIST.findIndex((c) => c.id === currentView);
        if (deltaY > 0 && idx < CHAPTER_LIST.length - 1) {
          isLocked = true;
          handleSwitchChapter(CHAPTER_LIST[idx + 1].id);
          setTimeout(() => { isLocked = false; }, 550);
        } else if (deltaY < 0 && idx > 0) {
          isLocked = true;
          handleSwitchChapter(CHAPTER_LIST[idx - 1].id);
          setTimeout(() => { isLocked = false; }, 550);
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
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
      className="h-screen w-screen overflow-hidden flex flex-col font-sans transition-colors duration-300 relative select-none"
      style={{
        backgroundColor: 'var(--bg-page)',
        color: 'var(--text-main)',
      }}
    >
      {/* Three.js Interactive DJI Mavic 3 Pro Tri-Camera Gimbal Pod */}
      <Spatial3DCanvas 
        theme={currentTheme} 
        currentView={currentView}
        focalLength={focalLength}
        isWarping={isWarping} 
      />

      {/* DJI Fly Flight Telemetry & Hasselblad Tri-Camera HUD Overlay */}
      <DJIFlightSpecsHUD 
        currentView={currentView}
        focalLength={focalLength}
        onSelectFocalLength={setFocalLength}
      />

      {/* Fluid Magnetic Torch Cursor */}
      <MagneticCursor />

      {/* Visual Guidance Light Rail (Left Side) */}
      <VisualGuidanceRail
        currentView={currentView}
        onSelectChapter={handleSwitchChapter}
      />

      {/* Cinematic Optical Warp Portal Curtain */}
      <VisualGuidanceWarpCurtain
        isWarping={isWarping}
        targetView={currentView}
      />

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

      {/* Main Full-Bleed Presentation Stage (Apple Keynote Slide Flip Stage) */}
      <main className="fixed inset-x-0 top-16 bottom-14 overflow-hidden z-10 flex flex-col items-center justify-center p-2 sm:p-4">
        <div
          key={currentView}
          className={`w-full h-full max-w-7xl mx-auto overflow-y-auto no-scrollbar flex flex-col justify-center ${
            slideDirection === 'up' ? 'animate-keynote-up' : 'animate-keynote-down'
          }`}
        >
          {/* Slide 00: 镜头式叙事与电影分镜 */}
          {currentView === 'cinema' && (
            <PromptCinemaView
              scenes={cinemaScenes}
              onOpenCMS={() => setIsAdminOpen(true)}
              onExploreAtom={handleExploreAtomInWorks}
              onExplorePrinciple={handleExplorePrincipleInWorks}
            />
          )}

          {/* Slide 01: 视觉基础材料库 */}
          {currentView === 'atoms' && (
            <VisualAtomsView 
              atoms={visualAtoms}
              onExploreAtomInWorks={handleExploreAtomInWorks} 
            />
          )}

          {/* Slide 02: 十大设计原则实验室 */}
          {currentView === 'principles' && (
            <DesignPrinciplesView 
              principles={designPrinciples}
              onExplorePrincipleInWorks={handleExplorePrincipleInWorks} 
            />
          )}

          {/* Slide 03: 风格规则矩阵与方程 */}
          {currentView === 'styles' && (
            <StyleMatrixView 
              styles={styleRules}
              onExploreStyleInWorks={handleExploreStyleInWorks} 
            />
          )}

          {/* Slide 04: 四大表现媒介矩阵 */}
          {currentView === 'mediums' && (
            <MediumMatrixView onExploreMediumInWorks={handleExploreMediumInWorks} />
          )}

          {/* Slide 05: 动态与镜头语言实验室 */}
          {currentView === 'motion' && (
            <MotionCameraLab />
          )}

          {/* Slide 06: 作品知识网络与多维拆解 */}
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

          {/* Slide 07: 算法海报重构工坊 */}
          {currentView === 'shapes-lab' && (
            <div className="flex-1 flex flex-col justify-between overflow-y-auto no-scrollbar">
              <GenerativePosterStudio
                currentTheme={currentTheme}
                onSelectTheme={setCurrentTheme}
              />
              <div className="mt-8 mb-4">
                <GoogleAdSenseUnit variant="banner" />
              </div>
              <Footer onSecretTrigger={() => setIsAdminOpen(true)} />
            </div>
          )}
        </div>
      </main>

      {/* Floating Keynote Slide Control Bar */}
      <SlideControlBar
        currentView={currentView}
        onSwitchView={handleSwitchChapter}
      />

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
