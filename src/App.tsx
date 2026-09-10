import { LanguageProvider } from './i18n/LanguageContext';
import { RouterProvider, useRouter, Link } from './router/router';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CommandPalette } from './components/search/CommandPalette';
import { EntityPage } from './components/entity/EntityPage';
import { HomePage } from './pages/HomePage';
import { GalleryPage } from './pages/GalleryPage';
import { ExplorePage } from './pages/ExplorePage';
import { KnowledgePage } from './pages/KnowledgePage';
import { StylesPage } from './pages/StylesPage';
import { ArtistsPage } from './pages/ArtistsPage';
import { LearnPage } from './pages/LearnPage';
import { PracticePage } from './pages/PracticePage';
import { ProductsPage } from './pages/ProductsPage';
import { SupportPage } from './pages/SupportPage';
import { AboutPage } from './pages/AboutPage';
import { ToolsPage } from './pages/ToolsPage';
import { SearchPage } from './pages/SearchPage';
import { ExhibitionPage } from './pages/ExhibitionPage';
import { useLang } from './i18n/LanguageContext';

function NotFound() {
  const { u } = useLang();
  return (
    <div className="wrap py-32 text-center">
      <div className="eyebrow mb-4">404</div>
      <p className="font-serif text-5xl">This room is empty.</p>
      <Link to="/" className="btn-ghost mt-8">← {u('nav.home')}</Link>
    </div>
  );
}

function Routed() {
  const { route } = useRouter();
  const [s0, s1, s2] = route.segments;

  let page: React.ReactNode;
  switch (s0) {
    case undefined: page = <HomePage />; break;
    case 'gallery': page = <GalleryPage />; break;
    case 'explore': page = <ExplorePage />; break;
    case 'knowledge': page = <KnowledgePage />; break;
    case 'styles': page = <StylesPage />; break;
    case 'artists': page = <ArtistsPage />; break;
    case 'learn': page = <LearnPage />; break;
    case 'practice': page = <PracticePage />; break;
    case 'products': page = <ProductsPage />; break;
    case 'support': page = <SupportPage />; break;
    case 'about': page = <AboutPage />; break;
    case 'tools': page = <ToolsPage />; break;
    case 'search': page = <SearchPage />; break;
    case 'exhibition': page = s1 ? <ExhibitionPage slug={s1} /> : <NotFound />; break;
    case 'entity': page = s1 && s2 ? <EntityPage type={s1} slug={s2} /> : <NotFound />; break;
    default: page = <NotFound />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pb-8">{page}</main>
      <Footer />
      <CommandPalette />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <RouterProvider>
        <Routed />
      </RouterProvider>
    </LanguageProvider>
  );
}
