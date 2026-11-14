import { useState, useMemo } from 'react';
import { ARTIFACTS } from './data/artifacts';
import type { Artifact, CelestialBody, ViewMode, ArtifactCategory } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ArtifactCard } from './components/ArtifactCard';
import { ArtifactModal } from './components/ArtifactModal';
import { PlanetaryMap } from './components/PlanetaryMap';
import { OrbitalTracker } from './components/OrbitalTracker';
import { MemorialView } from './components/MemorialView';
import { DeepSpaceView } from './components/DeepSpaceView';
import { museumAudio } from './utils/audio';
import { 
  Search, 
  X, 
  Compass
} from 'lucide-react';

export function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('overview');
  const [selectedCategory, setSelectedCategory] = useState<'all' | ArtifactCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArtifact, setActiveArtifact] = useState<Artifact | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [eraFilter, setEraFilter] = useState<string>('all');

  // Filtered lists for Moon and Mars
  const moonArtifacts = useMemo(() => ARTIFACTS.filter(a => a.celestialBody === 'moon'), []);
  const marsArtifacts = useMemo(() => ARTIFACTS.filter(a => a.celestialBody === 'mars'), []);
  const deepSpaceArtifacts = useMemo(() => ARTIFACTS.filter(a => a.celestialBody === 'deep_space'), []);

  // Filter logic based on active view, era, category, and search
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

      if (eraFilter !== 'all') {
        if (eraFilter === 'apollo' && (item.launchYear < 1966 || item.launchYear > 1974)) return false;
        if (eraFilter === 'pioneer' && (item.launchYear < 1975 || item.launchYear > 1999)) return false;
        if (eraFilter === 'modern' && item.launchYear < 2000) return false;
      }

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
  }, [currentView, moonArtifacts, marsArtifacts, deepSpaceArtifacts, selectedCategory, eraFilter, searchQuery]);

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
              onOpenMap={() => setCurrentView('tracker')}
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

        {/* VIEW: 3D ORBITAL TRACKER (NOVA / ORBIT CODEX REFERENCE SPEC) */}
        {currentView === 'tracker' && (
          <div className="animate-fade-in space-y-6">
            <OrbitalTracker
              artifacts={ARTIFACTS}
              onSelectArtifact={(item) => setActiveArtifact(item)}
              defaultBody="moon"
            />
          </div>
        )}

        {/* VIEW: MOON ARCHIVE (COMMAND CENTER TWO-COLUMN LAYOUT) */}
        {currentView === 'moon' && (
          <div className="space-y-8 animate-fade-in">
            {/* Top Sector HUD Bar */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#050811]/90 backdrop-blur-xl border border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6 shadow-2xl">
              <div className="space-y-2 max-w-2xl">
                <span className="text-[10px] font-mono tracking-[0.2em] text-slate-400 uppercase">
                  LUNA SECTOR // TIDALLY LOCKED // GRAVITY: 1.62 m/s²
                </span>
                <h2 className="text-2xl sm:text-4xl font-heading font-light tracking-wide text-white">
                  Monuments of the Moon
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                  Humanity's first extraterrestrial footprints and permanent technological stations, from the Apollo 11 descent stage to the rovers resting across Mare Imbrium and Taurus-Littrow.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 shrink-0 font-mono text-xs">
                <div className="p-3 rounded-xl bg-[#090e1c] border border-white/10">
                  <div className="text-[10px] text-slate-400 uppercase">LUNAR RELICS</div>
                  <div className="text-xl font-bold text-white mt-0.5">{moonArtifacts.length} Sites</div>
                </div>
                <div className="p-3 rounded-xl bg-[#090e1c] border border-white/10">
                  <div className="text-[10px] text-slate-400 uppercase">DISTANCE</div>
                  <div className="text-xl font-bold text-cyan-300 mt-0.5">384,400 km</div>
                </div>
              </div>
            </div>

            {/* Two-Column Command Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Drawer: Era & Classification */}
              <div className="lg:col-span-3 rounded-2xl bg-[#050811]/90 backdrop-blur-xl border border-white/10 p-4 space-y-4 font-mono text-xs">
                <div className="text-[11px] text-slate-400 uppercase tracking-widest border-b border-white/10 pb-2">
                  LUNAR ERAS
                </div>

                <div className="space-y-1">
                  {[
                    { id: 'all', label: 'All Expeditions' },
                    { id: 'apollo', label: 'Surveyor & Apollo (1966-1972)' },
                    { id: 'modern', label: 'Modern Lunar Pioneers' },
                  ].map(era => (
                    <button
                      key={era.id}
                      onClick={() => {
                        museumAudio.playClick(750);
                        setEraFilter(era.id);
                      }}
                      className={`w-full py-2 px-3 rounded-lg text-left flex items-center justify-between transition-colors ${
                        eraFilter === era.id
                          ? 'bg-cyan-950/60 border border-cyan-500/50 text-cyan-300 font-bold'
                          : 'bg-[#080d1a] border border-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>{era.label}</span>
                      {eraFilter === era.id && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                    </button>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/10 space-y-2">
                  <div className="text-[10px] text-slate-400 uppercase">3D ORBITAL SIMULATION</div>
                  <button
                    onClick={() => setCurrentView('tracker')}
                    className="w-full py-2 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-600 hover:text-white transition-colors text-center font-bold flex items-center justify-center gap-2"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>LAUNCH 3D TRACKER</span>
                  </button>
                </div>
              </div>

              {/* Right Cards Grid */}
              <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-5">
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

        {/* VIEW: MARS ARCHIVE (COMMAND CENTER TWO-COLUMN LAYOUT) */}
        {currentView === 'mars' && (
          <div className="space-y-8 animate-fade-in">
            {/* Top Sector HUD Bar */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#050811]/90 backdrop-blur-xl border border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6 shadow-2xl">
              <div className="space-y-2 max-w-2xl">
                <span className="text-[10px] font-mono tracking-[0.2em] text-amber-400/90 uppercase">
                  ARES SECTOR // 24H 37M SOL // GRAVITY: 3.72 m/s²
                </span>
                <h2 className="text-2xl sm:text-4xl font-heading font-light tracking-wide text-white">
                  Monuments of Mars
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                  The robotic explorers, rovers, and landers that braved catastrophic ferric dust storms and polar dry ice to uncover the ancient watery history of Mars.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 shrink-0 font-mono text-xs">
                <div className="p-3 rounded-xl bg-[#090e1c] border border-white/10">
                  <div className="text-[10px] text-slate-400 uppercase">MARTIAN RELICS</div>
                  <div className="text-xl font-bold text-white mt-0.5">{marsArtifacts.length} Relics</div>
                </div>
                <div className="p-3 rounded-xl bg-[#090e1c] border border-white/10">
                  <div className="text-[10px] text-slate-400 uppercase">DISTANCE</div>
                  <div className="text-xl font-bold text-amber-400 mt-0.5">225M km</div>
                </div>
              </div>
            </div>

            {/* Two-Column Command Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Drawer: Era & Classification */}
              <div className="lg:col-span-3 rounded-2xl bg-[#050811]/90 backdrop-blur-xl border border-white/10 p-4 space-y-4 font-mono text-xs">
                <div className="text-[11px] text-slate-400 uppercase tracking-widest border-b border-white/10 pb-2">
                  MARTIAN ERAS
                </div>

                <div className="space-y-1">
                  {[
                    { id: 'all', label: 'All Expeditions' },
                    { id: 'pioneer', label: 'Viking & Pathfinder (1975-1997)' },
                    { id: 'modern', label: 'MER & Modern Rovers (2003+)' },
                  ].map(era => (
                    <button
                      key={era.id}
                      onClick={() => {
                        museumAudio.playClick(750);
                        setEraFilter(era.id);
                      }}
                      className={`w-full py-2 px-3 rounded-lg text-left flex items-center justify-between transition-colors ${
                        eraFilter === era.id
                          ? 'bg-amber-950/60 border border-amber-500/50 text-amber-300 font-bold'
                          : 'bg-[#080d1a] border border-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>{era.label}</span>
                      {eraFilter === era.id && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                    </button>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/10 space-y-2">
                  <div className="text-[10px] text-slate-400 uppercase">3D ORBITAL SIMULATION</div>
                  <button
                    onClick={() => setCurrentView('tracker')}
                    className="w-full py-2 rounded-lg bg-amber-950/60 border border-amber-500/40 text-amber-300 hover:bg-amber-600 hover:text-white transition-colors text-center font-bold flex items-center justify-center gap-2"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>LAUNCH 3D TRACKER</span>
                  </button>
                </div>
              </div>

              {/* Right Cards Grid */}
              <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-5">
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
              onOpenRadar={() => setCurrentView('tracker')}
            />
          </div>
        )}
      </main>

      {/* Quick Search Modal Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="fixed inset-0" onClick={() => setIsSearchOpen(false)} />
          <div className="relative w-full max-w-xl rounded-2xl bg-[#050811] p-5 border border-white/10 shadow-2xl z-10 space-y-4">
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

      {/* Minimalist Footer */}
      <footer className="border-t border-white/5 py-8 text-xs font-mono text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="font-heading font-light tracking-widest text-white uppercase">AFTERLIGHT</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-400">NOVA / ORBIT CODEX EXPLORATION SPECIFICATION</span>
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
