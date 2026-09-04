import { useState, useMemo, useEffect } from 'react';
import { getImageCases, getVideoWorkflows } from './data/workflowStore';
import type { AIImageCase, AIVideoWorkflow } from './types/art';
import type { GalleryTheme } from './types/theme';
import { Navbar, type MainViewType } from './components/Navbar';
import { HeroGallery } from './components/HeroGallery';
import { CinematicGalleryStage } from './components/CinematicGalleryStage';
import { AIVideoWorkflowLab } from './components/AIVideoWorkflowLab';
import { SpotlightEffect } from './components/SpotlightEffect';
import { AdminCMSModal } from './components/AdminCMSModal';
import { Footer } from './components/Footer';

export function App() {
  // Artistic Gallery Theme State (Raw Concrete, Vintage Salon, Nordic Sage, Midnight Cinema)
  const [currentTheme, setCurrentTheme] = useState<GalleryTheme>(() => {
    const saved = localStorage.getItem('art_gallery_theme');
    return (saved as GalleryTheme) || 'concrete';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('art_gallery_theme', currentTheme);
  }, [currentTheme]);

  // Two core views: 'image-lab' (Image Prompts) & 'video-lab' (Video Workflows)
  const [currentView, setCurrentView] = useState<MainViewType>('image-lab');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Local storage backed dataset
  const [imageCases, setImageCases] = useState<AIImageCase[]>(getImageCases());
  const [videoWorkflows, setVideoWorkflows] = useState<AIVideoWorkflow[]>(getVideoWorkflows());

  // Stealth Admin Modal State
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Filtered Image Cases
  const filteredImageCases = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return imageCases;
    return imageCases.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.badge.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags?.some((t) => t.toLowerCase().includes(q)) ||
        c.promptBlocks?.subject.toLowerCase().includes(q)
    );
  }, [imageCases, searchQuery]);

  // Filtered Video Workflows
  const filteredVideoWorkflows = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return videoWorkflows;
    return videoWorkflows.filter(
      (w) =>
        w.title.toLowerCase().includes(q) ||
        w.category.toLowerCase().includes(q) ||
        w.summary.toLowerCase().includes(q) ||
        w.toolsChain?.some((t) => t.toLowerCase().includes(q)) ||
        w.steps?.some(
          (s) => s.stepTitle.toLowerCase().includes(q) || s.toolUsed.toLowerCase().includes(q)
        )
    );
  }, [videoWorkflows, searchQuery]);

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

  // Stealth Trigger 2: Secret URL parameter ?curator=1 or ?vault=1
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('curator') === '1' || params.get('vault') === '1') {
        setIsAdminOpen(true);
      }
    } catch (e) {
      // silent
    }
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

      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onSwitchView={setCurrentView}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentTheme={currentTheme}
        onSelectTheme={setCurrentTheme}
      />

      {/* Main Container */}
      <main className="flex-1">
        {/* Concise Hero Section */}
        <HeroGallery currentView={currentView} />

        {/* View 1: Cinematic Gallery Stage (3D Perspective, Auto-Tour for Video Recording) */}
        {currentView === 'image-lab' && (
          <CinematicGalleryStage imageCases={filteredImageCases} />
        )}

        {/* View 2: Video Workflow Lab */}
        {currentView === 'video-lab' && (
          <AIVideoWorkflowLab workflows={filteredVideoWorkflows} />
        )}
      </main>

      {/* Clean Footer with Secret Easter Egg */}
      <Footer onSecretTrigger={() => setIsAdminOpen(true)} />

      {/* Stealth Admin Modal */}
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