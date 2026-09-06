import { useState, useEffect } from 'react';
import type { GalleryTheme } from './types/theme';
import type { MediumType, VisualAtom, DesignPrinciple, StyleRuleEquation } from './types/atlas';
import type { CinemaScene } from './types/cinema';
import { Navbar, type MainViewType } from './components/Navbar';
import { ChapterDock, CHAPTER_LIST } from './components/ChapterDock';
import { VisualGuidanceRail } from './components/VisualGuidanceRail';
import { VisualGuidanceWarpCurtain } from './components/VisualGuidanceWarpCurtain';
import { StageHeaderHUD } from './components/StageHeaderHUD';
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

  // Core Visual Atlas Views (8 Stages)
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

  // 3D Warp Velocity & Screen Index
  const [isWarping, setIsWarping] = useState(false);
  const currentIdx = Math.max(0, CHAPTER_LIST.findIndex((c) => c.id === currentView));

  const handleSwitchChapter = (newView: MainViewType) => {
    playSpotlightClick();
    setIsWarping(true);
    setTimeout(() => setIsWarping(false), 700);
    setCurrentView(newView);
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

  // Single-Screen Wheel Snap: Scroll once to switch exactly one full screen
  useEffect(() => {
    let isLocked = false;
    let lockTimer: ReturnType<typeof setTimeout> | null = null;

    const handleWheel = (e: WheelEvent) => {
      if (isAdminOpen) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (isLocked) return;

      // Find active screen scrollable container
      const activeStage = document.getElementById(`stage-${currentView}`);
      if (activeStage) {
        const { scrollTop, scrollHeight, clientHeight } = activeStage;
        const hasInternalOverflow = scrollHeight > clientHeight + 15;

        // If scrolling down, but haven't reached bottom of internal content
        if (e.deltaY > 0 && hasInternalOverflow && scrollTop + clientHeight < scrollHeight - 20) {
          return;
        }
        // If scrolling up, but haven't reached top of internal content
        if (e.deltaY < 0 && hasInternalOverflow && scrollTop > 20) {
          return;
        }
      }

      if (Math.abs(e.deltaY) > 25) {
        const idx = CHAPTER_LIST.findIndex((c) => c.id === currentView);
        if (e.deltaY > 0 && idx < CHAPTER_LIST.length - 1) {
          isLocked = true;
          handleSwitchChapter(CHAPTER_LIST[idx + 1].id);
          lockTimer = setTimeout(() => { isLocked = false; }, 750);
        } else if (e.deltaY < 0 && idx > 0) {
          isLocked = true;
          handleSwitchChapter(CHAPTER_LIST[idx - 1].id);
          lockTimer = setTimeout(() => { isLocked = false; }, 750);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (lockTimer) clearTimeout(lockTimer);
    };
  }, [currentView, isAdminOpen]);

  // Touch Swipe Gesture for Mobile / Trackpad (1 swipe = 1 screen)
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

      if (Math.abs(deltaY) > 50) {
        const idx = CHAPTER_LIST.findIndex((c) => c.id === currentView);
        if (deltaY > 0 && idx < CHAPTER_LIST.length - 1) {
          isLocked = true;
          handleSwitchChapter(CHAPTER_LIST[idx + 1].id);
          setTimeout(() => { isLocked = false; }, 750);
        } else if (deltaY < 0 && idx > 0) {
          isLocked = true;
          handleSwitchChapter(CHAPTER_LIST[idx - 1].id);
          setTimeout(() => { isLocked = false; }, 750);
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

  // Global Keyboard Navigation (Arrow / Page keys switch exactly one screen)
  useEffect(() => {
    const handleChapterKeys = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (isAdminOpen) return;

      const idx = CHAPTER_LIST.findIndex((c) => c.id === currentView);
      if (e.key === 'PageDown' || e.key === 'ArrowDown') {
        e.preventDefault();
        if (idx < CHAPTER_LIST.length - 1) {
          handleSwitchChapter(CHAPTER_LIST[idx + 1].id);
        }
      } else if (e.key === 'PageUp' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (idx > 0) {
          handleSwitchChapter(CHAPTER_LIST[idx - 1].id);
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
      className="h-screen w-screen overflow-hidden flex flex-col font-sans transition-colors duration-300 relative select-none"
      style={{
        backgroundColor: 'var(--bg-page)',
        color: 'var(--text-main)',
      }}
    >
      {/* Three.js Interactive 3D Spatial Universe Canvas */}
      <Spatial3DCanvas theme={currentTheme} isWarping={isWarping} />

      {/* Fluid Magnetic Torch Cursor */}
      <MagneticCursor />

      {/* Apple-Grade Visual Guidance Light Rail (Left-Side Screen Navigator) */}
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

      {/* Main Fullscreen 100vh Viewport Deck (One Scroll Flick = One Screen Transition) */}
      <main className="fixed inset-x-0 top-16 bottom-0 overflow-hidden z-10">
        <div 
          className="w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col"
          style={{ transform: `translateY(-${currentIdx * 100}%)` }}
        >
          {/* Stage 00: 镜头式叙事与电影分镜 */}
          <div 
            id="stage-cinema" 
            className="w-full h-full flex-shrink-0 overflow-y-auto px-4 sm:px-8 py-4 sm:py-6 relative"
          >
            <StageHeaderHUD
              stepIndex={0}
              title="镜头式叙事与电影分镜"
              titleEn="Prompt Cinema Viewport"
              desc="16:9 电影画幅 · 制作通告单 · 运镜分层解析 · 场景情绪定调"
              elevationMeters={0}
              onNextScreen={() => handleSwitchChapter('atoms')}
            />
            <PromptCinemaView
              scenes={cinemaScenes}
              onOpenCMS={() => setIsAdminOpen(true)}
              onExploreAtom={handleExploreAtomInWorks}
              onExplorePrinciple={handleExplorePrincipleInWorks}
            />
          </div>

          {/* Stage 01: 视觉基础材料库 */}
          <div 
            id="stage-atoms" 
            className="w-full h-full flex-shrink-0 overflow-y-auto px-4 sm:px-8 py-4 sm:py-6 relative"
          >
            <StageHeaderHUD
              stepIndex={1}
              title="视觉基础材料库"
              titleEn="Visual Atoms & Raw Aesthetics"
              desc="色彩对撞 · 负空间留白 · 极端尺度反差 · 丁达尔光束 · 材质触感"
              elevationMeters={100}
              onNextScreen={() => handleSwitchChapter('principles')}
            />
            <VisualAtomsView 
              atoms={visualAtoms}
              onExploreAtomInWorks={handleExploreAtomInWorks} 
            />
          </div>

          {/* Stage 02: 十大设计原则实验室 */}
          <div 
            id="stage-principles" 
            className="w-full h-full flex-shrink-0 overflow-y-auto px-4 sm:px-8 py-4 sm:py-6 relative"
          >
            <StageHeaderHUD
              stepIndex={2}
              title="十大设计原则实验室"
              titleEn="Ten Design Principles · The Bridge"
              desc="对比 · 平衡 · 层级 · 节奏 · 比例 · 动势 · 秩序法则"
              elevationMeters={240}
              onNextScreen={() => handleSwitchChapter('styles')}
            />
            <DesignPrinciplesView 
              principles={designPrinciples}
              onExplorePrincipleInWorks={handleExplorePrincipleInWorks} 
            />
          </div>

          {/* Stage 03: 风格规则矩阵与方程 */}
          <div 
            id="stage-styles" 
            className="w-full h-full flex-shrink-0 overflow-y-auto px-4 sm:px-8 py-4 sm:py-6 relative"
          >
            <StageHeaderHUD
              stepIndex={3}
              title="风格规则矩阵与方程"
              titleEn="Style Matrix Equations"
              desc="瑞士国际 · 粗野主义 · 赛博朋克 · 杂志编辑美学算法"
              elevationMeters={420}
              onNextScreen={() => handleSwitchChapter('mediums')}
            />
            <StyleMatrixView 
              styles={styleRules}
              onExploreStyleInWorks={handleExploreStyleInWorks} 
            />
          </div>

          {/* Stage 04: 四大表现媒介矩阵 */}
          <div 
            id="stage-mediums" 
            className="w-full h-full flex-shrink-0 overflow-y-auto px-4 sm:px-8 py-4 sm:py-6 relative"
          >
            <StageHeaderHUD
              stepIndex={4}
              title="四大表现媒介矩阵"
              titleEn="The 4 Mediums: Image · Interface · Space · Motion"
              desc="平面画作 · UI界面 · 3D空间建筑 · 影视动效矩阵跨媒介"
              elevationMeters={600}
              onNextScreen={() => handleSwitchChapter('motion')}
            />
            <MediumMatrixView onExploreMediumInWorks={handleExploreMediumInWorks} />
          </div>

          {/* Stage 05: 动态与镜头语言实验室 */}
          <div 
            id="stage-motion" 
            className="w-full h-full flex-shrink-0 overflow-y-auto px-4 sm:px-8 py-4 sm:py-6 relative"
          >
            <StageHeaderHUD
              stepIndex={5}
              title="动态与镜头语言实验室"
              titleEn="Motion & Camera Cinematography"
              desc="运镜调度 · 遮罩转场 · 时间阻尼 · 视觉节奏时序分镜"
              elevationMeters={820}
              onNextScreen={() => handleSwitchChapter('atlas')}
            />
            <MotionCameraLab />
          </div>

          {/* Stage 06: 作品知识网络与多维拆解 */}
          <div 
            id="stage-atlas" 
            className="w-full h-full flex-shrink-0 overflow-y-auto px-4 sm:px-8 py-4 sm:py-6 relative"
          >
            <StageHeaderHUD
              stepIndex={6}
              title="作品知识网络与多维拆解"
              titleEn="Works Atlas & Multidimensional Deconstruction"
              desc="多维交叉筛选 · 构图网格 · 一个作品等于一个美学入口"
              elevationMeters={1080}
              onNextScreen={() => handleSwitchChapter('shapes-lab')}
            />
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
          </div>

          {/* Stage 07: 算法海报重构工坊 */}
          <div 
            id="stage-shapes-lab" 
            className="w-full h-full flex-shrink-0 overflow-y-auto px-4 sm:px-8 py-4 sm:py-6 relative pb-20"
          >
            <StageHeaderHUD
              stepIndex={7}
              title="算法海报重构工坊"
              titleEn="Generative Book of Shapes Studio"
              desc="参数化几何海报生成 · 殿堂级 SVG / PNG 高清导出"
              elevationMeters={1380}
            />
            <GenerativePosterStudio
              currentTheme={currentTheme}
              onSelectTheme={setCurrentTheme}
            />

            {/* Global Curated Exhibition Patron Banner (Google AdSense Unit) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-12 mb-6">
              <GoogleAdSenseUnit variant="banner" />
            </div>

            {/* Clean Footer with Secret Trigger */}
            <Footer onSecretTrigger={() => setIsAdminOpen(true)} />
          </div>
        </div>
      </main>

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
