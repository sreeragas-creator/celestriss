import { useState, useMemo } from 'react';
import { ARTIFACTS } from './data/artifacts';
import type { Artifact, CelestialBody, ViewMode, ArtifactCategory } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ArtifactCard } from './components/ArtifactCard';
import { ArtifactModal } from './components/ArtifactModal';
import { PlanetaryMap } from './components/PlanetaryMap';
import { MemorialView } from './components/MemorialView';
import { DeepSpaceView } from './components/DeepSpaceView';
import { museumAudio } from './utils/audio';
import { 
  Search, 
  X, 
  ArrowRight
} from 'lucide-react';

export function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('overview');
  const [selectedCategory, setSelectedCategory] = useState<'all' | ArtifactCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArtifact, setActiveArtifact] = useState<Artifact | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Filtered lists for Moon and Mars
  const moonArtifacts = useMemo(() => ARTIFACTS.filter(a => a.celestialBody === 'moon'), []);
  const marsArtifacts = useMemo(() => ARTIFACTS.filter(a => a.celestialBody === 'mars'), []);
  const deepSpaceArtifacts = useMemo(() => ARTIFACTS.filter(a => a.celestialBody === 'deep_space'), []);

  // Filter logic based on active view and search
  const visibleArtifacts = useMemo(() => {
    let baseList = ARTIFACTS;

    if (currentView === 'overview') {
      baseList = ARTIFACTS.filter(a => a.collection === 'primary');
    } else if (currentView === 'moon') {
      baseList = moonArtifacts;
    } else if (currentView === 'mars') {
      baseList = marsArtifacts;
    } else if (currentView === 'deep_space') {
      baseList = deepSpaceArtifacts;
    }

    return baseList.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesMission = item.mission.toLowerCase().includes(q);
        const matchesAgency = item.agency.toLowerCase().includes(q);
        const matchesSite = item.coordinates.landingSite.toLowerCase().includes(q);
        const matchesId = item.archivalId.toLowerCase().includes(q);
        const matchesNarrative = item.narrative.toLowerCase().includes(q);
        return matchesName || matchesMission || matchesAgency || matchesSite || matchesId || matchesNarrative;
      }

      return true;
    });
  }, [currentView, moonArtifacts, marsArtifacts, deepSpaceArtifacts, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#020408] text-slate-100 flex flex-col relative selection:bg-amber-400 selection:text-slate-950 stars-bg font-sans">
      
      {/* Floating NOVA Glass Navigation Bar */}
      <Navbar
        currentView={currentView}
        onSelectView={setCurrentView}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* VIEW: OVERVIEW */}
        {currentView === 'overview' && (
          <div className="space-y-12 animate-fade-in">
            {/* Cinematic Two-Sided Planetary Hero */}
            <HeroSection
              totalArtifacts={ARTIFACTS.length}
              moonCount={moonArtifacts.length}
              marsCount={marsArtifacts.length}
              deepSpaceCount={deepSpaceArtifacts.length}
              onExplore={() => {
                const el = document.getElementById('archive-grid');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenMap={() => setCurrentView('radar')}
            />

            {/* Quick Section Shortcuts */}
            <div id="archive-grid" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/5 pb-4">
                <div>
                  <div className="text-[10px] font-mono tracking-[0.2em] text-slate-400 uppercase">
                    PRIMARY CATALOG // MOON & MARS
                  </div>
                  <h2 className="text-xl sm:text-2xl font-heading font-light tracking-wide text-white mt-1">
                    The Silent Relics
                  </h2>
                </div>

                {/* Category classification filter pills */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs font-heading">
                  {(['all', 'rover', 'lander', 'equipment', 'scientific_package', 'aircraft'] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        museumAudio.playClick(850);
                        setSelectedCategory(cat);
                      }}
                      className={`px-3 py-1 rounded-full transition-all ${
                        selectedCategory === cat
                          ? 'bg-white/15 text-white font-normal border border-white/10'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 font-light'
                      }`}
                    >
                      {cat.replace('_', ' ').toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid of Artifact Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleArtifacts.map((artifact) => (
                  <ArtifactCard
                    key={artifact.id}
                    artifact={artifact}
                    onSelect={(item) => setActiveArtifact(item)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW: MOON ARCHIVE */}
        {currentView === 'moon' && (
          <div className="space-y-8 animate-fade-in">
            <div className="p-6 sm:p-8 rounded-3xl nova-glass border border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-[0.2em] text-slate-400 uppercase">
                  LUNA ARCHIVE // 7 ACTIVE SITES
                </span>
                <h2 className="text-2xl sm:text-4xl font-heading font-light tracking-wide text-white">
                  Monuments of the Moon
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 font-light max-w-2xl leading-relaxed">
                  From Apollo 11’s descent stage at Tranquility Base to the lunar roving vehicles resting at Hadley Rille and Taurus-Littrow.
                </p>
              </div>

              <button
                onClick={() => setCurrentView('radar')}
                className="px-4 py-2 rounded-full nova-glass text-xs font-heading text-slate-300 hover:text-white transition-all shrink-0 flex items-center gap-2"
              >
                <span>OPEN LUNAR RADAR</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleArtifacts.map((artifact) => (
                <ArtifactCard
                  key={artifact.id}
                  artifact={artifact}
                  onSelect={(item) => setActiveArtifact(item)}
                />
              ))}
            </div>
          </div>
        )}

        {/* VIEW: MARS ARCHIVE */}
        {currentView === 'mars' && (
          <div className="space-y-8 animate-fade-in">
            <div className="p-6 sm:p-8 rounded-3xl nova-glass border border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-[0.2em] text-amber-400/80 uppercase">
                  ARES ARCHIVE // 7 HISTORIC EXPEDITIONS
                </span>
                <h2 className="text-2xl sm:text-4xl font-heading font-light tracking-wide text-white">
                  Monuments of Mars
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 font-light max-w-2xl leading-relaxed">
                  The brave robotic pathfinders, marathon rovers, and arctic landers resting in the red ferric soil of Mars.
                </p>
              </div>

              <button
                onClick={() => setCurrentView('radar')}
                className="px-4 py-2 rounded-full nova-glass text-xs font-heading text-slate-300 hover:text-white transition-all shrink-0 flex items-center gap-2"
              >
                <span>OPEN MARTIAN RADAR</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleArtifacts.map((artifact) => (
                <ArtifactCard
                  key={artifact.id}
                  artifact={artifact}
                  onSelect={(item) => setActiveArtifact(item)}
                />
              ))}
            </div>
          </div>
        )}

        {/* VIEW: PLANETARY RADAR */}
        {currentView === 'radar' && (
          <div className="animate-fade-in space-y-6">
            <PlanetaryMap
              artifacts={ARTIFACTS}
              selectedBody="moon"
              onSelectBody={(_body: CelestialBody) => {}}
              onSelectArtifact={(item) => setActiveArtifact(item)}
            />
          </div>
        )}

        {/* VIEW: SILENT WITNESSES MEMORIAL */}
        {currentView === 'memorial' && (
          <div className="animate-fade-in">
            <MemorialView
              artifacts={ARTIFACTS}
              onSelectArtifact={(item) => setActiveArtifact(item)}
            />
          </div>
        )}

        {/* VIEW: DEEP SPACE VAULT */}
        {currentView === 'deep_space' && (
          <div className="animate-fade-in">
            <DeepSpaceView
              artifacts={ARTIFACTS}
              onSelectArtifact={(item) => setActiveArtifact(item)}
              onOpenRadar={() => setCurrentView('radar')}
            />
          </div>
        )}
      </main>

      {/* Quick Search Modal Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="fixed inset-0" onClick={() => setIsSearchOpen(false)} />
          <div className="relative w-full max-w-xl nova-glass rounded-2xl p-5 border border-white/10 shadow-2xl z-10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Search className="w-4 h-4 text-slate-400" />
                <span>SEARCH ARCHIVE</span>
              </div>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by mission, artifact name, landing site, or coordinates..."
              className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 font-mono text-xs focus:outline-none focus:border-white/20"
            />

            <div className="max-h-64 overflow-y-auto space-y-2">
              {searchQuery && visibleArtifacts.length === 0 && (
                <div className="text-center py-6 text-xs text-slate-400 font-mono">
                  No artifacts match "{searchQuery}"
                </div>
              )}
              {visibleArtifacts.slice(0, 5).map((artifact) => (
                <div
                  key={artifact.id}
                  onClick={() => {
                    setIsSearchOpen(false);
                    setActiveArtifact(artifact);
                  }}
                  className="p-3 rounded-xl hover:bg-white/5 cursor-pointer flex items-center justify-between transition-colors border border-transparent hover:border-white/5"
                >
                  <div>
                    <div className="text-xs font-heading text-white">{artifact.name}</div>
                    <div className="text-[10px] font-mono text-slate-400">{artifact.coordinates.landingSite}</div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{artifact.launchYear}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Artifact Dossier Modal */}
      <ArtifactModal
        artifact={activeArtifact}
        onClose={() => setActiveArtifact(null)}
      />

      {/* Minimalist NOVA Footer */}
      <footer className="border-t border-white/5 py-8 text-xs font-mono text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="font-heading font-light tracking-widest text-white uppercase">AFTERLIGHT</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-400">NOVA EXPLORATION SPECIFICATION</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <span>NASA SPACE APPS 2026</span>
            <span>•</span>
            <span>JPL / GSFC VERIFIED</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
