import React, { useState } from 'react';
import type { Artifact, CelestialBody } from '../types';
import { museumAudio } from '../utils/audio';
import { 
  ChevronDown, 
  Radio
} from 'lucide-react';

interface PlanetaryMapProps {
  artifacts: Artifact[];
  selectedBody?: CelestialBody;
  onSelectBody?: (body: CelestialBody) => void;
  onSelectArtifact: (artifact: Artifact) => void;
}

export const PlanetaryMap: React.FC<PlanetaryMapProps> = ({
  artifacts,
  selectedBody: initialBody = 'moon',
  onSelectArtifact,
}) => {
  const [selectedBody, setSelectedBody] = useState<CelestialBody>(initialBody);
  const [hoveredArtifact, setHoveredArtifact] = useState<Artifact | null>(null);
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [activeArtifactId, setActiveArtifactId] = useState<string | null>(null);

  const filteredArtifacts = artifacts.filter(a => {
    if (selectedBody !== 'deep_space' && a.celestialBody !== selectedBody) return false;
    if (selectedBody === 'deep_space' && a.celestialBody !== 'deep_space') return false;
    if (selectedSector !== 'all' && !a.coordinates.region.toLowerCase().includes(selectedSector.toLowerCase())) return false;
    return true;
  });

  const selectedArtifact = artifacts.find(a => a.id === activeArtifactId) || filteredArtifacts[0];

  const getMapCoordinates = (lat?: number, lng?: number, body?: CelestialBody) => {
    if (lat === undefined || lng === undefined) return { x: 50, y: 50 };
    if (body === 'moon') {
      const x = ((lng + 180) / 360) * 100;
      const y = ((75 - lat) / 150) * 100;
      return { x: Math.max(8, Math.min(92, x)), y: Math.max(12, Math.min(88, y)) };
    } else {
      const normalizedLng = lng < 0 ? lng + 360 : lng;
      const x = (normalizedLng / 360) * 100;
      const y = ((80 - lat) / 160) * 100;
      return { x: Math.max(8, Math.min(92, x)), y: Math.max(12, Math.min(88, y)) };
    }
  };

  const sectors = selectedBody === 'moon' 
    ? [
        { id: 'all', label: 'All Lunar Sectors' },
        { id: 'tranquillitatis', label: 'Mare Tranquillitatis' },
        { id: 'imbrium', label: 'Mare Imbrium' },
        { id: 'procellarum', label: 'Oceanus Procellarum' },
        { id: 'descartes', label: 'Descartes Highlands' },
        { id: 'taurus', label: 'Taurus-Littrow' },
      ]
    : [
        { id: 'all', label: 'All Martian Sectors' },
        { id: 'meridiani', label: 'Meridiani Planum' },
        { id: 'chryse', label: 'Chryse Planitia' },
        { id: 'utopia', label: 'Utopia Planitia' },
        { id: 'elysium', label: 'Elysium Planitia' },
        { id: 'jezero', label: 'Jezero Crater' },
      ];

  const handleMarkerClick = (artifact: Artifact) => {
    museumAudio.playClick(950);
    setActiveArtifactId(artifact.id);
  };

  const handleInspect = (artifact: Artifact) => {
    museumAudio.playClick(1000);
    onSelectArtifact(artifact);
  };

  return (
    <div className="relative w-full h-[840px] rounded-2xl border border-white/10 bg-[#020408] overflow-hidden select-none font-sans text-slate-200">
      
      {/* ================= LEFT COMMAND DRAWER ================= */}
      <div className="absolute top-4 left-4 bottom-4 w-72 sm:w-80 rounded-xl bg-[#050811]/90 backdrop-blur-xl border border-white/10 p-4 flex flex-col justify-between z-30 shadow-2xl overflow-y-auto">
        <div className="space-y-4">
          
          {/* TARGET SYSTEM SELECTOR */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
              RADAR SECTOR
            </span>
            <div className="relative">
              <select
                value={selectedBody}
                onChange={(e) => {
                  museumAudio.playClick(800);
                  setSelectedBody(e.target.value as CelestialBody);
                  setSelectedSector('all');
                  setActiveArtifactId(null);
                }}
                className="bg-[#0b101d] text-white text-xs font-mono px-3 py-1.5 rounded-lg border border-white/15 focus:outline-none appearance-none pr-8 cursor-pointer hover:border-white/30"
              >
                <option value="moon">Luna (Moon)</option>
                <option value="mars">Ares (Mars)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* SECTOR JUMP CONTROLLER */}
          <div className="space-y-1.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
              TOPOGRAPHIC SECTORS
            </span>
            <div className="space-y-1">
              {sectors.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => {
                    museumAudio.playClick(750);
                    setSelectedSector(sec.id);
                  }}
                  className={`w-full py-1.5 px-2.5 rounded text-left text-xs font-mono transition-colors flex items-center justify-between ${
                    selectedSector === sec.id
                      ? 'bg-cyan-950/60 border border-cyan-500/50 text-cyan-300 font-medium'
                      : 'bg-[#080d1a] border border-white/5 text-slate-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <span className="truncate">{sec.label}</span>
                  {selectedSector === sec.id && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                </button>
              ))}
            </div>
          </div>

          {/* ASSETS IN CURRENT RADAR SWEEP */}
          <div className="space-y-1.5 pt-2 border-t border-white/10">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>ACTIVE BEACONS ({filteredArtifacts.length})</span>
              <span className="text-cyan-400">SWEEP 360°</span>
            </div>
            <div className="space-y-1 max-h-[220px] overflow-y-auto pr-1">
              {filteredArtifacts.map((asset) => {
                const isActive = (activeArtifactId || selectedArtifact?.id) === asset.id;
                return (
                  <div
                    key={asset.id}
                    onClick={() => handleMarkerClick(asset)}
                    className={`p-2 rounded border text-xs font-mono flex items-center justify-between cursor-pointer transition-all ${
                      isActive
                        ? 'bg-cyan-950/50 border-cyan-500/50 text-white'
                        : 'bg-[#080d1a]/60 border-white/5 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <div className="truncate">
                      <div className="text-[11px] font-medium truncate">{asset.name.split('(')[0]}</div>
                      <div className="text-[9px] text-slate-400 truncate">{asset.coordinates.landingSite}</div>
                    </div>
                    <span className={`w-2 h-2 rounded-full shrink-0 ${isActive ? 'bg-cyan-400 animate-ping' : 'bg-slate-600'}`} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* BOTTOM DRAWER ACTIONS */}
        <div className="pt-3 border-t border-white/10 space-y-2 font-mono text-[10px]">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                museumAudio.playClick(600);
                setSelectedSector('all');
                setActiveArtifactId(null);
              }}
              className="py-1.5 rounded bg-[#090d18] border border-white/10 text-slate-300 hover:text-white"
            >
              RESET SWEEP
            </button>
            <button
              onClick={() => handleInspect(selectedArtifact)}
              className="py-1.5 rounded bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-600 hover:text-white font-bold"
            >
              INSPECT RELIC
            </button>
          </div>
          <div className="text-[9px] text-slate-400 text-center">
            IAU TOPOGRAPHIC CARTOGRAPHY LINKED
          </div>
        </div>
      </div>

      {/* ================= CENTER RADAR SCREEN CANVAS ================= */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        
        {/* Subtle coordinate grid lines */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(148, 163, 184, 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(148, 163, 184, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Radar Circular Screen Frame */}
        <div className="relative w-[560px] sm:w-[680px] lg:w-[760px] h-[560px] sm:h-[680px] lg:h-[760px] rounded-full border border-cyan-500/20 bg-[#040711] overflow-hidden pointer-events-auto shadow-[0_0_80px_rgba(0,0,0,0.9)]">
          
          {/* Concentric distance rings */}
          <div className="absolute inset-16 rounded-full border border-cyan-500/15 pointer-events-none" />
          <div className="absolute inset-32 rounded-full border border-cyan-500/10 pointer-events-none" />
          <div className="absolute inset-48 rounded-full border border-dashed border-cyan-500/10 pointer-events-none" />

          {/* Crosshair Axes */}
          <div className="absolute top-1/2 left-0 right-0 h-px border-t border-dashed border-cyan-500/20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 left-1/2 w-px border-l border-dashed border-cyan-500/20 pointer-events-none" />

          {/* 360-Degree Animated Radar Beam Rotating Sweep */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-full rounded-full animate-radar-sweep relative">
              <div 
                className="absolute top-1/2 left-1/2 w-1/2 h-0.5 origin-left"
                style={{
                  background: 'linear-gradient(90deg, rgba(6, 182, 212, 0.8) 0%, transparent 100%)'
                }}
              />
            </div>
          </div>

          {/* Topographic Background Silhouettes */}
          {selectedBody === 'moon' ? (
            <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" preserveAspectRatio="none">
              <circle cx="38%" cy="40%" r="10%" fill="#1e293b" />
              <circle cx="28%" cy="52%" r="14%" fill="#1e293b" />
              <circle cx="58%" cy="52%" r="9%" fill="#1e293b" />
              <text x="35%" y="40%" fill="#64748b" fontSize="10" fontFamily="monospace">MARE IMBRIUM</text>
              <text x="20%" y="54%" fill="#64748b" fontSize="10" fontFamily="monospace">OCEANUS PROCELLARUM</text>
              <text x="54%" y="52%" fill="#64748b" fontSize="10" fontFamily="monospace">TRANQUILLITATIS</text>
            </svg>
          ) : (
            <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none" preserveAspectRatio="none">
              <ellipse cx="28%" cy="46%" rx="10%" ry="14%" fill="#451a03" />
              <path d="M 36 50 Q 50 56 65 52" stroke="#b45309" strokeWidth="5" fill="none" opacity="0.6" />
              <text x="21%" y="38%" fill="#9a3412" fontSize="10" fontFamily="monospace">OLYMPUS MONS</text>
              <text x="44%" y="60%" fill="#9a3412" fontSize="10" fontFamily="monospace">VALLES MARINERIS</text>
              <text x="56%" y="36%" fill="#9a3412" fontSize="10" fontFamily="monospace">CHRYSE PLANITIA</text>
            </svg>
          )}

          {/* Interactive Radar Markers */}
          {filteredArtifacts.map((artifact) => {
            const { x, y } = getMapCoordinates(
              artifact.coordinates.latitude,
              artifact.coordinates.longitude,
              artifact.celestialBody
            );
            const isSelected = (activeArtifactId || selectedArtifact?.id) === artifact.id;
            const isHovered = hoveredArtifact?.id === artifact.id;

            return (
              <div
                key={artifact.id}
                style={{ left: `${x}%`, top: `${y}%` }}
                onClick={() => handleMarkerClick(artifact)}
                onDoubleClick={() => handleInspect(artifact)}
                onMouseEnter={() => setHoveredArtifact(artifact)}
                onMouseLeave={() => setHoveredArtifact(null)}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 group"
              >
                {/* Sonar Pulse Ring */}
                <div 
                  className={`absolute -inset-3 rounded-full opacity-70 ${isSelected ? 'animate-ping border border-cyan-400' : 'animate-sonar'}`}
                  style={{ backgroundColor: isSelected ? 'rgba(6, 182, 212, 0.4)' : artifact.imageTheme.accentColor }}
                />

                {/* Marker Center */}
                <div 
                  className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                    isSelected 
                      ? 'scale-125 bg-cyan-400 border-white text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.9)]'
                      : isHovered
                      ? 'scale-110 bg-amber-400 border-white text-slate-950'
                      : 'bg-[#060a14] border-white/60 text-slate-300'
                  }`}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>

                {/* Tag Callout */}
                <div className={`absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap px-2 py-0.5 rounded text-[10px] font-mono pointer-events-none transition-all ${
                  isSelected
                    ? 'bg-cyan-950/90 border border-cyan-400 text-white font-bold shadow-lg z-40'
                    : 'bg-black/75 border border-white/10 text-slate-300'
                }`}>
                  {artifact.mission}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= RIGHT ENVIRONMENT & TELEMETRY HUD ================= */}
      <div className="absolute top-4 right-4 w-64 sm:w-72 rounded-xl bg-[#050811]/90 backdrop-blur-xl border border-white/10 p-4 space-y-4 z-30 shadow-2xl font-mono text-xs">
        
        <div className="border-b border-white/10 pb-2 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 uppercase tracking-widest font-heading">
            {selectedBody.toUpperCase()} ENVIRONMENT
          </span>
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        </div>

        <div className="space-y-3 font-mono">
          <div className="flex items-baseline justify-between">
            <span className="text-[10px] text-slate-400 uppercase">GRAVITY</span>
            <span className="text-base font-bold text-cyan-300 tracking-wider">
              {selectedBody === 'moon' ? '1.62 m/s²' : '3.72 m/s²'}
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-[10px] text-slate-400 uppercase">ORBIT TYPE</span>
            <span className="text-sm font-semibold text-cyan-400 tracking-wide">
              {selectedBody === 'moon' ? 'Tidal Locked' : '24h 37m Sol'}
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-[10px] text-slate-400 uppercase">DISTANCE</span>
            <span className="text-sm font-semibold text-cyan-400 tracking-wide">
              {selectedBody === 'moon' ? '384,400 km' : '225,000,000 km'}
            </span>
          </div>
        </div>

        <div className="pt-3 border-t border-white/10 space-y-2 text-[10px] text-slate-400">
          <div className="text-[11px] text-slate-200 font-heading uppercase tracking-wider mb-1">
            VIEW TELEMETRY
          </div>

          <div className="flex justify-between">
            <span>ZOOM RATIO</span>
            <span className="text-white">3.98x</span>
          </div>

          <div className="flex justify-between">
            <span>RADAR AZIMUTH</span>
            <span className="text-white">360° CONTINUOUS</span>
          </div>

          <div className="flex justify-between">
            <span>TARGET LAT / LON</span>
            <span className="text-cyan-300 font-mono">
              {selectedArtifact?.coordinatesDisplay || '0.00° / 0.00°'}
            </span>
          </div>
        </div>

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

      {/* ================= BOTTOM TIME & SIMULATION BAR ================= */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full bg-[#050811]/90 backdrop-blur-xl border border-white/10 text-xs font-mono text-slate-300 flex items-center gap-4 shadow-2xl z-30">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span className="tracking-widest">IAU RADAR SWEEP // ACTIVE MONITORING</span>
      </div>

    </div>
  );
};
