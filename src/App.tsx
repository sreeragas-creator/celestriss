import { useState, useMemo } from 'react';
import { ARTIFACTS } from './data/artifacts';
import type { Artifact, CelestialBody, ViewMode, ArtifactCategory } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ArtifactCard } from './components/ArtifactCard';
import { ArtifactModal } from './components/ArtifactModal';
import { PlanetaryMap } from './components/PlanetaryMap';
import { TimelineView } from './components/TimelineView';
import { MemorialView } from './components/MemorialView';
import { DeepSpaceView } from './components/DeepSpaceView';
import { museumAudio } from './utils/audio';
import { 
  Search, 
  Filter, 
  X,
  ShieldAlert,
  Orbit
} from 'lucide-react';

export function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('archive');
  const [selectedBody, setSelectedBody] = useState<'all' | CelestialBody>('all');
  const [mapBody, setMapBody] = useState<CelestialBody>('moon');
  const [selectedCategory, setSelectedCategory] = useState<'all' | ArtifactCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArtifact, setActiveArtifact] = useState<Artifact | null>(null);

  // Filtered Artifacts for the Primary Archive Hall (Moon & Mars primary)
  const primaryArtifacts = useMemo(() => {
    return ARTIFACTS.filter(a => a.collection === 'primary');
  }, []);

  const filteredArtifacts = useMemo(() => {
    return primaryArtifacts.filter((item) => {
      // Celestial body match
      if (selectedBody !== 'all' && item.celestialBody !== selectedBody) return false;

      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;

      // Search match
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesMission = item.mission.toLowerCase().includes(q);
        const matchesAgency = item.agency.toLowerCase().includes(q);
        const matchesSite = item.coordinates.landingSite.toLowerCase().includes(q);
        const matchesId = item.archivalId.toLowerCase().includes(q);
        const matchesNarrative = item.narrative.toLowerCase().includes(q);
        const matchesPurpose = item.purpose.toLowerCase().includes(q);
        return matchesName || matchesMission || matchesAgency || matchesSite || matchesId || matchesNarrative || matchesPurpose;
      }

      return true;
    });
  }, [primaryArtifacts, selectedBody, selectedCategory, searchQuery]);

  const moonCount = ARTIFACTS.filter(a => a.celestialBody === 'moon').length;
  const marsCount = ARTIFACTS.filter(a => a.celestialBody === 'mars').length;
  const deepSpaceCount = ARTIFACTS.filter(a => a.celestialBody === 'deep_space').length;

  const handleOpenMapWithBody = (body: CelestialBody) => {
    setMapBody(body);
    setCurrentView('map');
  };

  return (
    <div className="min-h-screen bg-[#04060b] text-slate-100 flex flex-col relative selection:bg-amber-500 selection:text-slate-950 stars-bg font-sans">
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onSelectView={setCurrentView}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Exhibition View: Archive Gallery (Moon & Mars Primary) */}
        {currentView === 'archive' && (
          <div className="space-y-8 animate-fade-in">
            {/* Museum Hero Section */}
            <HeroSection
              totalArtifacts={ARTIFACTS.length}
              moonCount={moonCount}
              marsCount={marsCount}
              deepSpaceCount={deepSpaceCount}
              onExplore={() => {
                const el = document.getElementById('archive-filters');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenMap={() => handleOpenMapWithBody('moon')}
              onOpenDeepSpace={() => setCurrentView('deep_space')}
            />

            {/* Filter and Search Bar */}
            <div id="archive-filters" className="p-4 sm:p-5 rounded-2xl border border-slate-800/90 bg-[#070b14]/90 backdrop-blur-md space-y-4">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Apollo, Surveyor, Viking, InSight, rovers, coordinates..."
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-800 bg-slate-950/80 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/60 font-mono transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Primary Celestial Body Toggle: All Primary / Moon / Mars */}
                <div className="flex items-center rounded-xl border border-slate-800 bg-slate-950 p-1 shrink-0">
                  <button
                    onClick={() => {
                      museumAudio.playClick(750);
                      setSelectedBody('all');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      selectedBody === 'all' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    MOON & MARS ({primaryArtifacts.length})
                  </button>
                  <button
                    onClick={() => {
                      museumAudio.playClick(750);
                      setSelectedBody('moon');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      selectedBody === 'moon' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    MOON ({moonCount})
                  </button>
                  <button
                    onClick={() => {
                      museumAudio.playClick(750);
                      setSelectedBody('mars');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      selectedBody === 'mars' ? 'bg-amber-950/60 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    MARS ({marsCount})
                  </button>
                </div>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-900 text-xs font-mono">
                <span className="text-slate-400 mr-2 flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5" />
                  CLASSIFICATION:
                </span>
                {(['all', 'rover', 'lander', 'equipment', 'scientific_package', 'aircraft'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      museumAudio.playClick(850);
                      setSelectedCategory(cat);
                    }}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      selectedCategory === cat
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                    }`}
                  >
                    {cat.replace('_', ' ').toUpperCase()}
                  </button>
                ))}

                <div className="ml-auto flex items-center gap-3">
                  <button
                    onClick={() => {
                      museumAudio.playClick(850);
                      setCurrentView('deep_space');
                    }}
                    className="text-[11px] font-mono text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors"
                  >
                    <Orbit className="w-3.5 h-3.5" />
                    <span>VIEW DEEP SPACE VAULT ({deepSpaceCount}) →</span>
                  </button>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {filteredArtifacts.length} RELICS
                  </span>
                </div>
              </div>
            </div>

            {/* Grid of Artifact Cards */}
            {filteredArtifacts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArtifacts.map((artifact) => (
                  <ArtifactCard
                    key={artifact.id}
                    artifact={artifact}
                    onSelect={(item) => setActiveArtifact(item)}
                  />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center rounded-2xl border border-slate-800/80 bg-slate-950/60 space-y-3">
                <ShieldAlert className="w-8 h-8 text-amber-500 mx-auto opacity-70" />
                <h3 className="text-lg font-mono text-white">No Relics Located</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  No artifacts match "{searchQuery}" under the selected filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedBody('all');
                    setSelectedCategory('all');
                  }}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-xs font-mono text-slate-200 hover:bg-slate-700"
                >
                  RESET FILTERS
                </button>
              </div>
            )}
          </div>
        )}

        {/* Exhibition View: Deep Space Vault (Secondary Collection) */}
        {currentView === 'deep_space' && (
          <div className="animate-fade-in">
            <DeepSpaceView
              artifacts={ARTIFACTS}
              onSelectArtifact={(item) => setActiveArtifact(item)}
              onOpenRadar={() => handleOpenMapWithBody('deep_space')}
            />
          </div>
        )}

        {/* Exhibition View: Planetary Radar Map */}
        {currentView === 'map' && (
          <div className="animate-fade-in space-y-6">
            <PlanetaryMap
              artifacts={ARTIFACTS}
              selectedBody={mapBody}
              onSelectBody={setMapBody}
              onSelectArtifact={(item) => setActiveArtifact(item)}
            />
          </div>
        )}

        {/* Exhibition View: Exploration Chronometer */}
        {currentView === 'timeline' && (
          <div className="animate-fade-in">
            <TimelineView
              artifacts={ARTIFACTS}
              onSelectArtifact={(item) => setActiveArtifact(item)}
            />
          </div>
        )}

        {/* Exhibition View: Silent Witnesses Memorial */}
        {currentView === 'memorial' && (
          <div className="animate-fade-in">
            <MemorialView
              artifacts={ARTIFACTS}
              onSelectArtifact={(item) => setActiveArtifact(item)}
            />
          </div>
        )}
      </main>

      {/* Artifact Dossier Modal */}
      <ArtifactModal
        artifact={activeArtifact}
        onClose={() => setActiveArtifact(null)}
      />

      {/* Museum Footer */}
      <footer className="border-t border-slate-800/80 bg-[#05070e] py-8 text-xs font-mono text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="font-semibold text-white font-cinzel">AFTERLIGHT</span> — Interplanetary Heritage Museum
            </div>
            <p className="text-[11px] text-slate-400">
              Curated for NASA Space Apps Challenge 2026. Sourced from NASA JPL, NASA History Division, and Apollo Lunar Surface Journals.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <button
              onClick={() => {
                museumAudio.playClick(900);
                setCurrentView('archive');
              }}
              className="hover:text-slate-300"
            >
              ARCHIVE
            </button>
            <span>•</span>
            <button
              onClick={() => {
                museumAudio.playClick(900);
                setCurrentView('map');
              }}
              className="hover:text-slate-300"
            >
              RADAR MAP
            </button>
            <span>•</span>
            <button
              onClick={() => {
                museumAudio.playClick(900);
                setCurrentView('timeline');
              }}
              className="hover:text-slate-300"
            >
              CHRONOLOGY
            </button>
            <span>•</span>
            <button
              onClick={() => {
                museumAudio.playClick(900);
                setCurrentView('memorial');
              }}
              className="hover:text-slate-300"
            >
              MEMORIAL
            </button>
            <span>•</span>
            <button
              onClick={() => {
                museumAudio.playClick(900);
                setCurrentView('deep_space');
              }}
              className="text-sky-400 hover:text-sky-300"
            >
              DEEP SPACE VAULT
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
