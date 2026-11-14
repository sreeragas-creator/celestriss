import React, { useState, useEffect } from 'react';
import type { Artifact, CelestialBody } from '../types';
import { museumAudio } from '../utils/audio';
import { 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  Radio, 
  Crosshair
} from 'lucide-react';

interface OrbitalTrackerProps {
  artifacts: Artifact[];
  onSelectArtifact: (artifact: Artifact) => void;
  defaultBody?: CelestialBody;
}

export const OrbitalTracker: React.FC<OrbitalTrackerProps> = ({
  artifacts,
  onSelectArtifact,
  defaultBody = 'moon',
}) => {
  const [targetSystem, setTargetSystem] = useState<CelestialBody>(defaultBody);
  const [expertMode, setExpertMode] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'assets' | 'layers' | 'time'>('assets');
  const [assetSubtype, setAssetSubtype] = useState<'rovers' | 'probes'>('rovers');
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [showOrbitals, setShowOrbitals] = useState<boolean>(true);
  const [activeArtifactId, setActiveArtifactId] = useState<string | null>(null);
  const [hoveredArtifact, setHoveredArtifact] = useState<Artifact | null>(null);
  const [simSpeed, setSimSpeed] = useState<string>('0.25X');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isLeftCollapsed, setIsLeftCollapsed] = useState<boolean>(false);
  const [isRightCollapsed, setIsRightCollapsed] = useState<boolean>(false);

  // Clock simulation
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { hour12: true });
      const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase();
      setCurrentTime(`${dateStr}   ${simSpeed}   ${timeStr}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [simSpeed]);

  // Filter artifacts for current target system
  const systemArtifacts = artifacts.filter(a => a.celestialBody === targetSystem);
  
  const rovers = systemArtifacts.filter(a => a.category === 'rover' || a.category === 'equipment');
  const probes = systemArtifacts.filter(a => a.category === 'lander' || a.category === 'scientific_package' || a.category === 'aircraft');

  const displayedAssets = assetSubtype === 'rovers' ? rovers : probes;

  const selectedArtifact = artifacts.find(a => a.id === activeArtifactId) || systemArtifacts[0];

  // Map latitude/longitude to 2D percentage on circular planetary projection
  const getPlanetaryScreenCoords = (lat?: number, lng?: number) => {
    if (lat === undefined || lng === undefined) return { x: 50, y: 50 };
    // Orthographic projection center-weighted
    const phi = (lat * Math.PI) / 180;
    const theta = (lng * Math.PI) / 180;
    
    // Project on visible hemisphere
    const x = 50 + 38 * Math.cos(phi) * Math.sin(theta);
    const y = 50 - 38 * Math.sin(phi);
    
    return {
      x: Math.max(16, Math.min(84, x)),
      y: Math.max(16, Math.min(84, y))
    };
  };

  const handleFind = (artifact: Artifact) => {
    museumAudio.playScanPing();
    setActiveArtifactId(artifact.id);
  };

  const handleInspect = (artifact: Artifact) => {
    museumAudio.playClick(950);
    onSelectArtifact(artifact);
  };

  return (
    <div className="relative w-full h-[840px] rounded-2xl border border-white/10 bg-[#020408] overflow-hidden select-none font-sans text-slate-200">
      
      {/* =========================================================================
          LEFT CONTROLLER PANEL (NOVA / ORBIT CODEX SPEC - COLLAPSIBLE)
         ========================================================================= */}
      {/* Collapsed Expand Tab */}
      {isLeftCollapsed && (
        <button
          onClick={() => {
            museumAudio.playClick(800);
            setIsLeftCollapsed(false);
          }}
          className="absolute top-4 left-4 z-40 px-3.5 py-2 rounded-xl bg-[#050811]/95 backdrop-blur-xl border border-white/10 text-xs font-mono text-cyan-300 hover:text-white hover:border-cyan-500/40 transition-all flex items-center gap-2 shadow-2xl animate-fade-in"
          title="Expand Target System Controller"
        >
          <ChevronRight className="w-4 h-4 text-cyan-400" />
          <span className="tracking-wider">TARGET SYSTEM</span>
        </button>
      )}

      {/* Main Left Drawer */}
      <div 
        className={`absolute top-4 left-4 bottom-4 w-72 sm:w-80 rounded-xl bg-[#050811]/90 backdrop-blur-xl border border-white/10 p-4 flex flex-col justify-between z-30 shadow-2xl overflow-y-auto transition-transform duration-300 ease-in-out ${
          isLeftCollapsed ? '-translate-x-[120%] pointer-events-none' : 'translate-x-0'
        }`}
      >
        <div className="space-y-4">
          
          {/* TARGET SYSTEM SELECTOR WITH COLLAPSE TOGGLE */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                TARGET SYSTEM
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <select
                  value={targetSystem}
                  onChange={(e) => {
                    museumAudio.playClick(800);
                    setTargetSystem(e.target.value as CelestialBody);
                    setActiveArtifactId(null);
                  }}
                  className="bg-[#0b101d] text-white text-xs font-mono px-3 py-1.5 rounded-lg border border-white/15 focus:outline-none appearance-none pr-8 cursor-pointer hover:border-white/30"
                >
                  <option value="moon">Moon (Luna)</option>
                  <option value="mars">Mars (Ares)</option>
                  <option value="deep_space">Deep Space</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Collapse Left Panel Button */}
              <button
                onClick={() => {
                  museumAudio.playClick(600);
                  setIsLeftCollapsed(true);
                }}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Collapse Target Panel"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* EXPERT MODE TOGGLE */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
              EXPERT MODE
            </span>
            <button
              onClick={() => {
                museumAudio.playClick(600);
                setExpertMode(!expertMode);
              }}
              className={`w-10 h-5 rounded-full transition-colors relative p-0.5 ${
                expertMode ? 'bg-cyan-500' : 'bg-slate-700'
              }`}
            >
              <div 
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  expertMode ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* SYSTEM BADGE */}
          <div className="px-3 py-1.5 rounded-lg bg-[#0b101d] border border-white/10 text-xs font-mono text-slate-300 text-center tracking-wide">
            {targetSystem === 'moon' ? 'Moon Explorers & Rovers' : targetSystem === 'mars' ? 'Mars Landers & Rovers' : 'Interplanetary Relics'}
          </div>

          {/* SEGMENTED CONTROL TABS: Assets, Layers, Time & Sim */}
          <div className="grid grid-cols-3 gap-1 bg-[#090d18] p-1 rounded-lg border border-white/10 text-[11px] font-mono">
            <button
              onClick={() => {
                museumAudio.playClick(700);
                setActiveTab('assets');
              }}
              className={`py-1 rounded-md transition-colors ${
                activeTab === 'assets' ? 'bg-cyan-600/80 text-white font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              Assets
            </button>
            <button
              onClick={() => {
                museumAudio.playClick(700);
                setActiveTab('layers');
              }}
              className={`py-1 rounded-md transition-colors ${
                activeTab === 'layers' ? 'bg-cyan-600/80 text-white font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              Layers
            </button>
            <button
              onClick={() => {
                museumAudio.playClick(700);
                setActiveTab('time');
              }}
              className={`py-1 rounded-md transition-colors ${
                activeTab === 'time' ? 'bg-cyan-600/80 text-white font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              Time & Sim
            </button>
          </div>

          {/* TAB CONTENT: ASSETS */}
          {activeTab === 'assets' && (
            <div className="space-y-3">
              {/* Secondary Subtype: Rovers vs Probes */}
              <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono">
                <button
                  onClick={() => {
                    museumAudio.playClick(750);
                    setAssetSubtype('rovers');
                  }}
                  className={`py-1.5 rounded border transition-colors ${
                    assetSubtype === 'rovers' 
                      ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300 font-bold' 
                      : 'border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  ROVERS ({rovers.length})
                </button>
                <button
                  onClick={() => {
                    museumAudio.playClick(750);
                    setAssetSubtype('probes');
                  }}
                  className={`py-1.5 rounded border transition-colors ${
                    assetSubtype === 'probes' 
                      ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300 font-bold' 
                      : 'border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  LANDERS ({probes.length})
                </button>
              </div>

              {/* Surface Assets List with FIND button and live status */}
              <div className="space-y-1.5 max-h-[280px] overflow-y-auto pr-1">
                {displayedAssets.map((asset) => {
                  const isActive = (activeArtifactId || selectedArtifact?.id) === asset.id;
                  return (
                    <div
                      key={asset.id}
                      onClick={() => handleFind(asset)}
                      className={`p-2 rounded-lg border text-xs font-mono flex items-center justify-between gap-2 cursor-pointer transition-all ${
                        isActive
                          ? 'bg-cyan-950/40 border-cyan-500/50 text-white shadow'
                          : 'bg-[#080d1a]/60 border-white/5 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <div className="truncate">
                        <div className="truncate text-[11px] font-medium">{asset.name.split('(')[0]}</div>
                        <div className="text-[9px] text-slate-400 truncate">{asset.coordinates.landingSite}</div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFind(asset);
                          }}
                          className="px-2 py-0.5 rounded text-[9px] font-mono bg-[#0d1527] border border-white/10 text-slate-300 hover:bg-cyan-600 hover:text-white transition-colors"
                        >
                          FIND
                        </button>
                        <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-cyan-400 animate-ping' : 'bg-slate-600'}`} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Show labels toggle switch */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px] font-mono text-slate-400">
                <span>Show rover labels</span>
                <button
                  onClick={() => setShowLabels(!showLabels)}
                  className={`w-8 h-4 rounded-full transition-colors relative p-0.5 ${
                    showLabels ? 'bg-cyan-500' : 'bg-slate-700'
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full bg-white transition-transform ${showLabels ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>
          )}

          {/* TAB CONTENT: LAYERS */}
          {activeTab === 'layers' && (
            <div className="space-y-2 text-xs font-mono text-slate-300">
              <div className="flex items-center justify-between p-2 rounded bg-[#080d1a] border border-white/5">
                <span>Orbital Trajectories</span>
                <input 
                  type="checkbox" 
                  checked={showOrbitals} 
                  onChange={(e) => setShowOrbitals(e.target.checked)} 
                  className="accent-cyan-500" 
                />
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-[#080d1a] border border-white/5">
                <span>Lunar Mare Topography</span>
                <span className="text-emerald-400 text-[10px]">ACTIVE</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-[#080d1a] border border-white/5">
                <span>Solar Terminator Line</span>
                <span className="text-emerald-400 text-[10px]">CALCULATED</span>
              </div>
            </div>
          )}

          {/* TAB CONTENT: TIME & SIM */}
          {activeTab === 'time' && (
            <div className="space-y-3 text-xs font-mono">
              <div className="text-[10px] text-slate-400">SIMULATION RATE</div>
              <div className="grid grid-cols-3 gap-1">
                {['0.10X', '0.25X', '1.0X'].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setSimSpeed(spd)}
                    className={`py-1 rounded border text-[10px] ${
                      simSpeed === spd ? 'bg-cyan-600 text-white border-cyan-400' : 'border-white/10 text-slate-400'
                    }`}
                  >
                    {spd}
                  </button>
                ))}
              </div>
              <div className="text-[10px] text-slate-400 pt-2">
                Simulating tidal locked rotation and orbital pass vectors for 2026.
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM PANEL CONTROLS */}
        <div className="pt-3 border-t border-white/10 space-y-2 font-mono text-[10px]">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                museumAudio.playClick(600);
                setActiveArtifactId(null);
              }}
              className="py-1.5 rounded bg-[#090d18] border border-white/10 text-slate-300 hover:text-white hover:border-white/20 text-center"
            >
              RESET
            </button>
            <button
              onClick={() => handleInspect(selectedArtifact)}
              className="py-1.5 rounded bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-600 hover:text-white text-center font-bold"
            >
              INSPECT DOSSIER
            </button>
          </div>
          <div className="flex items-center justify-between text-slate-400 text-[9px] pt-1">
            <span>NASA / CESIUM ION LINK</span>
            <span className="text-emerald-400">SYNCED</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          CENTER VIEWPORT: PLANETARY 3D SPHERE & ORBITAL TRAJECTORIES
         ========================================================================= */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        
        {/* Starfield ambient background */}
        <div className="absolute inset-0 stars-bg opacity-75" />

        {/* Planetary Sphere Container */}
        <div className="relative w-[480px] sm:w-[600px] lg:w-[680px] h-[480px] sm:h-[600px] lg:h-[680px] rounded-full pointer-events-auto">
          
          {/* Main Moon / Mars Globe Texture Sphere */}
          {targetSystem === 'moon' ? (
            <div 
              className="w-full h-full rounded-full overflow-hidden relative shadow-[0_0_120px_rgba(0,0,0,0.95)]"
              style={{
                background: 'radial-gradient(circle at 45% 42%, #222b38 0%, #111620 50%, #05070c 85%, #000000 100%)',
                boxShadow: 'inset 22px 22px 50px rgba(255, 255, 255, 0.4), inset -40px -40px 90px rgba(0, 0, 0, 0.98), 0 0 60px rgba(148, 163, 184, 0.15)'
              }}
            >
              {/* Lunar Mare Basins Silhouette */}
              <div className="absolute inset-0 opacity-45 mix-blend-overlay bg-[radial-gradient(ellipse_at_35%_35%,_var(--tw-gradient-stops))] from-slate-200 via-slate-600 to-black" />
              <div className="absolute top-[28%] left-[28%] w-48 h-36 rounded-full bg-slate-900/40 blur-md pointer-events-none" /> {/* Mare Imbrium */}
              <div className="absolute top-[40%] left-[45%] w-36 h-28 rounded-full bg-slate-900/50 blur-md pointer-events-none" /> {/* Tranquillitatis */}
              <div className="absolute top-[48%] left-[20%] w-52 h-44 rounded-full bg-slate-900/45 blur-lg pointer-events-none" /> {/* Oceanus Procellarum */}
            </div>
          ) : (
            <div 
              className="w-full h-full rounded-full overflow-hidden relative shadow-[0_0_120px_rgba(0,0,0,0.95)]"
              style={{
                background: 'radial-gradient(circle at 45% 42%, #c2410c 0%, #7c2d12 50%, #290f07 85%, #000000 100%)',
                boxShadow: 'inset 22px 22px 50px rgba(251, 146, 60, 0.45), inset -40px -40px 90px rgba(0, 0, 0, 0.98), 0 0 60px rgba(234, 88, 12, 0.2)'
              }}
            >
              <div className="absolute inset-0 opacity-45 mix-blend-overlay bg-[radial-gradient(ellipse_at_35%_35%,_var(--tw-gradient-stops))] from-amber-400 via-orange-900 to-black" />
            </div>
          )}

          {/* GOLDEN ORBITAL PATHS & ACTIVE SATELLITE NODES */}
          {showOrbitals && (
            <svg className="absolute -inset-16 w-[calc(100%+128px)] h-[calc(100%+128px)] pointer-events-none" viewBox="0 0 800 800" fill="none">
              {/* Elliptical Golden Orbit 1: LRO */}
              <ellipse 
                cx="400" cy="400" rx="360" ry="190" 
                stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="5 3" opacity="0.65"
                transform="rotate(-28 400 400)" 
              />
              <circle cx="340" cy="225" r="5" fill="#f59e0b" />
              <text x="352" y="230" fill="#f59e0b" fontSize="10" fontFamily="monospace" fontWeight="bold">
                {targetSystem === 'moon' ? 'LRO (Lunar Reconnaissance Orbiter)' : 'Mars Odyssey Relay'}
              </text>

              {/* Elliptical Golden Orbit 2: KPLO / Polar Orbit */}
              <ellipse 
                cx="400" cy="400" rx="390" ry="240" 
                stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" opacity="0.5"
                transform="rotate(42 400 400)" 
              />
              <circle cx="480" cy="175" r="4.5" fill="#f59e0b" />
              <text x="492" y="180" fill="#f59e0b" fontSize="9" fontFamily="monospace">
                {targetSystem === 'moon' ? 'KPLO (Danuri Lunar Orbiter)' : 'MRO (Mars Reconnaissance Orbiter)'}
              </text>

              {/* Distant Orbit 3: Queqiao Relay */}
              <path d="M 680 180 Q 720 400 660 620" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 4" opacity="0.45" />
              <circle cx="685" cy="410" r="4" fill="#f59e0b" />
              <text x="696" y="414" fill="#f59e0b" fontSize="9" fontFamily="monospace">
                {targetSystem === 'moon' ? 'Queqiao-2 Relay' : 'ExoMars TGO'}
              </text>
            </svg>
          )}

          {/* SURFACE ASSET PINS (ROVERS & LANDERS ANCHORED TO PLANETARY SURFACE) */}
          {systemArtifacts.map((artifact) => {
            const { x, y } = getPlanetaryScreenCoords(
              artifact.coordinates.latitude,
              artifact.coordinates.longitude
            );
            const isSelected = (activeArtifactId || selectedArtifact?.id) === artifact.id;
            const isHovered = hoveredArtifact?.id === artifact.id;

            return (
              <div
                key={artifact.id}
                style={{ left: `${x}%`, top: `${y}%` }}
                onClick={() => {
                  museumAudio.playClick(900);
                  setActiveArtifactId(artifact.id);
                }}
                onDoubleClick={() => handleInspect(artifact)}
                onMouseEnter={() => setHoveredArtifact(artifact)}
                onMouseLeave={() => setHoveredArtifact(null)}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 group"
              >
                {/* Sonar Pulse Ring if Selected */}
                {isSelected && (
                  <div className="absolute -inset-3 rounded-full border border-cyan-400 animate-ping pointer-events-none" />
                )}

                {/* Surface Pin Marker Icon */}
                <div 
                  className={`flex items-center justify-center w-5 h-5 rounded border transition-all ${
                    isSelected 
                      ? 'bg-cyan-500 border-white text-slate-950 scale-125 shadow-[0_0_15px_rgba(34,211,238,0.9)]'
                      : isHovered
                      ? 'bg-amber-400 border-white text-slate-950 scale-110'
                      : 'bg-[#080e1c] border-white/40 text-slate-300'
                  }`}
                >
                  <Crosshair className="w-3 h-3" />
                </div>

                {/* Surface Label Pin */}
                {showLabels && (
                  <div className={`absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap px-2 py-0.5 rounded text-[10px] font-mono pointer-events-none transition-all ${
                    isSelected
                      ? 'bg-cyan-950/90 border border-cyan-400/80 text-white font-bold shadow-lg z-40'
                      : 'bg-black/75 border border-white/10 text-slate-300'
                  }`}>
                    {artifact.name.split('(')[0]}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          RIGHT ENVIRONMENT & TELEMETRY HUD PANEL (COLLAPSIBLE)
         ========================================================================= */}
      {/* Collapsed Expand Tab on Right Edge */}
      {isRightCollapsed && (
        <button
          onClick={() => {
            museumAudio.playClick(800);
            setIsRightCollapsed(false);
          }}
          className="absolute top-4 right-4 z-40 px-3.5 py-2 rounded-xl bg-[#050811]/95 backdrop-blur-xl border border-white/10 text-xs font-mono text-cyan-300 hover:text-white hover:border-cyan-500/40 transition-all flex items-center gap-2 shadow-2xl animate-fade-in"
          title="Expand Environment Telemetry HUD"
        >
          <span className="tracking-wider">{targetSystem.toUpperCase()} ENVIRONMENT</span>
          <ChevronLeft className="w-4 h-4 text-cyan-400" />
        </button>
      )}

      {/* Main Right HUD Card */}
      <div 
        className={`absolute top-4 right-4 w-64 sm:w-72 rounded-xl bg-[#050811]/90 backdrop-blur-xl border border-white/10 p-4 space-y-4 z-30 shadow-2xl font-mono text-xs transition-transform duration-300 ease-in-out ${
          isRightCollapsed ? 'translate-x-[120%] pointer-events-none' : 'translate-x-0'
        }`}
      >
        
        {/* Environment Title with Collapse Button */}
        <div className="border-b border-white/10 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[11px] text-slate-300 uppercase tracking-widest font-heading">
              {targetSystem.toUpperCase()} ENVIRONMENT
            </span>
          </div>

          <button
            onClick={() => {
              museumAudio.playClick(600);
              setIsRightCollapsed(true);
            }}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Collapse Environment HUD"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Physical Metrics: Gravity, Orbit, Distance */}
        <div className="space-y-3 font-mono">
          <div className="flex items-baseline justify-between">
            <span className="text-[10px] text-slate-400 uppercase">GRAVITY</span>
            <span className="text-base font-bold text-cyan-300 tracking-wider">
              {targetSystem === 'moon' ? '1.62 m/s²' : targetSystem === 'mars' ? '3.72 m/s²' : '0.00 m/s²'}
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-[10px] text-slate-400 uppercase">ORBIT TYPE</span>
            <span className="text-sm font-semibold text-cyan-400 tracking-wide">
              {targetSystem === 'moon' ? 'Tidal Locked' : targetSystem === 'mars' ? '24h 37m Sol' : 'Heliocentric'}
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-[10px] text-slate-400 uppercase">DISTANCE</span>
            <span className="text-sm font-semibold text-cyan-400 tracking-wide">
              {targetSystem === 'moon' ? '384,400 km' : targetSystem === 'mars' ? '225,000,000 km' : '>135 AU'}
            </span>
          </div>
        </div>

        {/* VIEW TELEMETRY SUB-PANEL */}
        <div className="pt-3 border-t border-white/10 space-y-2 text-[10px] text-slate-400">
          <div className="text-[11px] text-slate-200 font-heading uppercase tracking-wider mb-1">
            VIEW TELEMETRY
          </div>

          <div className="flex justify-between">
            <span>ZOOM RATIO</span>
            <span className="text-white">3.98x</span>
          </div>

          <div className="flex justify-between">
            <span>HEADING / PITCH</span>
            <span className="text-white">273.4° / -87.0°</span>
          </div>

          <div className="flex justify-between">
            <span>TARGET LAT / LON</span>
            <span className="text-cyan-300 font-mono">
              {selectedArtifact?.coordinatesDisplay || '0.00° / 0.00°'}
            </span>
          </div>

          <div className="flex justify-between">
            <span>CAMERA ALT</span>
            <span className="text-white">5,171.8 km</span>
          </div>
        </div>

        {/* Selected Artifact Quick Inspector Card */}
        {selectedArtifact && (
          <div className="p-2.5 rounded-lg bg-[#0b101d] border border-cyan-500/30 space-y-1.5 animate-fade-in">
            <div className="flex items-center gap-1.5 text-[9px] text-amber-400">
              <Radio className="w-3 h-3 animate-pulse" />
              <span>{selectedArtifact.archivalId}</span>
            </div>
            <div className="text-xs font-heading font-light text-white truncate">
              {selectedArtifact.name}
            </div>
            <div className="text-[9px] text-slate-400 truncate">
              Site: {selectedArtifact.coordinates.landingSite}
            </div>
            <button
              onClick={() => handleInspect(selectedArtifact)}
              className="w-full mt-1 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-[10px] font-bold tracking-wider transition-colors"
            >
              OPEN MISSION DOSSIER
            </button>
          </div>
        )}
      </div>

      {/* =========================================================================
          BOTTOM CENTER: TIME & SIMULATION BAR
         ========================================================================= */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full bg-[#050811]/90 backdrop-blur-xl border border-white/10 text-xs font-mono text-slate-300 flex items-center gap-4 shadow-2xl z-30">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span className="tracking-widest">{currentTime || 'APR 09, 2026   0.25X   11:05:57 AM'}</span>
      </div>

    </div>
  );
};
