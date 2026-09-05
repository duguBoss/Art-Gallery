import { useState, useEffect } from 'react';
import type { GalleryTheme } from './types/theme';
import type { MediumType, VisualAtom, DesignPrinciple, StyleRuleEquation } from './types/atlas';
import type { CinemaScene } from './types/cinema';
import { Navbar, type MainViewType } from './components/Navbar';
import { ChapterDock, CHAPTER_LIST } from './components/ChapterDock';
import { TierStaircaseGate } from './components/TierStaircaseGate';
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
    setSlideDirection(newIdx >= oldIdx ? 'up' : 'down');
    setIsWarping(true);
    setTimeout(() => setIsWarping(false), 700);
    setCurrentView(newView);

    const targetElement = document.getElementById(`chapter-${newView}`);
    if (targetElement) {
      const yOffset = -72; // header height offset
      const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    }
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

  // Continuous Scroll Viewport Spy: Automatically synchronize active chapter with scroll position
  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id.replace('chapter-', '') as MainViewType;
          if (id && CHAPTER_LIST.some((c) => c.id === id)) {
            setCurrentView(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    CHAPTER_LIST.forEach((chapter) => {
      const el = document.getElementById(`chapter-${chapter.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Global Keyboard Navigation for Chapter Jump
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

      {/* Main Visual Atlas Container - Continuous Silky-Smooth Ascending Staircase */}
      <main className="flex-1 pb-24 space-y-12">
        {/* Tier 0: LEVEL 00 · 镜头式叙事与电影分镜 (Prompt Cinema Viewport) */}
        <section id="chapter-cinema" className="scroll-mt-20">
          <PromptCinemaView
            scenes={cinemaScenes}
            onOpenCMS={() => setIsAdminOpen(true)}
            onExploreAtom={handleExploreAtomInWorks}
            onExplorePrinciple={handleExplorePrincipleInWorks}
          />
        </section>

        {/* Architectural Staircase Gate 01 */}
        <TierStaircaseGate
          stepIndex={1}
          title="视觉基础材料库"
          subtitle="Visual Atoms & Raw Aesthetics · 几何、色彩、光影、材质底层质感"
          elevationMeters={100}
          onAscend={() => handleSwitchChapter('atoms')}
        />

        {/* Tier 1: LEVEL 01 · 视觉基础材料库 (Visual Atoms) */}
        <section id="chapter-atoms" className="scroll-mt-20">
          <VisualAtomsView 
            atoms={visualAtoms}
            onExploreAtomInWorks={handleExploreAtomInWorks} 
          />
        </section>

        {/* Architectural Staircase Gate 02 */}
        <TierStaircaseGate
          stepIndex={2}
          title="十大设计原则实验室"
          subtitle="Ten Design Principles · The Bridge · 秩序、对比、留白、张力工程法则"
          elevationMeters={240}
          onAscend={() => handleSwitchChapter('principles')}
        />

        {/* Tier 2: LEVEL 02 · 十大设计原则实验室 (Design Principles - The Bridge) */}
        <section id="chapter-principles" className="scroll-mt-20">
          <DesignPrinciplesView 
            principles={designPrinciples}
            onExplorePrincipleInWorks={handleExplorePrincipleInWorks} 
          />
        </section>

        {/* Architectural Staircase Gate 03 */}
        <TierStaircaseGate
          stepIndex={3}
          title="风格规则矩阵与方程"
          subtitle="Style Matrix Equations · 跨时代美学流派计算法则与参数矩阵"
          elevationMeters={420}
          onAscend={() => handleSwitchChapter('styles')}
        />

        {/* Tier 3: LEVEL 03 · 风格规则矩阵与方程 (Style Matrix Equations) */}
        <section id="chapter-styles" className="scroll-mt-20">
          <StyleMatrixView 
            styles={styleRules}
            onExploreStyleInWorks={handleExploreStyleInWorks} 
          />
        </section>

        {/* Architectural Staircase Gate 04 */}
        <TierStaircaseGate
          stepIndex={4}
          title="四大表现媒介矩阵"
          subtitle="The 4 Mediums: Image · Interface · Space · Motion"
          elevationMeters={600}
          onAscend={() => handleSwitchChapter('mediums')}
        />

        {/* Tier 4: LEVEL 04 · 四大表现媒介 (The 4 Mediums: Image, Interface, Space, Motion) */}
        <section id="chapter-mediums" className="scroll-mt-20">
          <MediumMatrixView onExploreMediumInWorks={handleExploreMediumInWorks} />
        </section>

        {/* Architectural Staircase Gate 05 */}
        <TierStaircaseGate
          stepIndex={5}
          title="动态与镜头语言实验室"
          subtitle="Motion & Camera Lab · 运镜轨迹、时间阻尼、视觉节奏"
          elevationMeters={820}
          onAscend={() => handleSwitchChapter('motion')}
        />

        {/* Tier 5: LEVEL 05 · 动态与镜头语言实验室 (Motion & Cinema Lab) */}
        <section id="chapter-motion" className="scroll-mt-20">
          <MotionCameraLab />
        </section>

        {/* Architectural Staircase Gate 06 */}
        <TierStaircaseGate
          stepIndex={6}
          title="作品知识网络与多维拆解"
          subtitle="Design Atlas Works & Multidimensional Deconstruction"
          elevationMeters={1080}
          onAscend={() => handleSwitchChapter('atlas')}
        />

        {/* Tier 6: LEVEL 06 · 作品知识网络与多维拆解 (Design Atlas Works & Deconstruction) */}
        <section id="chapter-atlas" className="scroll-mt-20">
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
        </section>

        {/* Architectural Staircase Gate 07 */}
        <TierStaircaseGate
          stepIndex={7}
          title="算法海报重构工坊"
          subtitle="Generative Book of Shapes Studio · 殿堂级参数化生成与导出"
          elevationMeters={1380}
          onAscend={() => handleSwitchChapter('shapes-lab')}
        />

        {/* Tier 7: LEVEL 07 · 算法海报重构工坊 (Book of Shapes Generative Studio) */}
        <section id="chapter-shapes-lab" className="scroll-mt-20">
          <GenerativePosterStudio
            currentTheme={currentTheme}
            onSelectTheme={setCurrentTheme}
          />
        </section>

        {/* Global Curated Exhibition Patron Banner (Google AdSense Unit) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-16">
          <GoogleAdSenseUnit variant="banner" />
        </div>
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
