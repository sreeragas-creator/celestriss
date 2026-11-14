import React, { useState } from 'react';
import type { Artifact, CelestialBody } from '../types';
import { museumAudio } from '../utils/audio';
import { Compass, Eye, MapPin, Radio } from 'lucide-react';

interface PlanetaryMapProps {
  artifacts: Artifact[];
  selectedBody: CelestialBody;
  onSelectBody: (body: CelestialBody) => void;
  onSelectArtifact: (artifact: Artifact) => void;
}

export const PlanetaryMap: React.FC<PlanetaryMapProps> = ({
  artifacts,
  selectedBody,
  onSelectBody,
  onSelectArtifact,
}) => {
  const [hoveredArtifact, setHoveredArtifact] = useState<Artifact | null>(null);

  const filteredArtifacts = artifacts.filter(a => a.celestialBody === selectedBody);

  // Convert lat/long to percentage coordinates on the projection
  const getMapCoordinates = (lat?: number, lng?: number, body?: CelestialBody) => {
    if (lat === undefined || lng === undefined) {
      // Fallback center
      return { x: 50, y: 50 };
    }

    if (body === 'moon') {
      // Cylindrical projection normalized -75 to +75 lat, -180 to +180 long
      const x = ((lng + 180) / 360) * 100;
      const y = ((75 - lat) / 150) * 100;
      return { 
        x: Math.max(6, Math.min(94, x)), 
        y: Math.max(10, Math.min(90, y)) 
      };
    } else if (body === 'mars') {
      // Mars projection (standard 0-360 or -180 to +180)
      const normalizedLng = lng < 0 ? lng + 360 : lng;
      const x = (normalizedLng / 360) * 100;
      const y = ((80 - lat) / 160) * 100;
      return { 
        x: Math.max(6, Math.min(94, x)), 
        y: Math.max(10, Math.min(90, y)) 
      };
    } else {
      // Deep space celestial coordinate map (Kepler, Pioneer, Dawn, NEAR)
      // Placed based on solar distance and eccentricity
      return { x: 50, y: 50 };
    }
  };

  // Deep space positional mapping for orbital regime display
  const getDeepSpaceCoordinates = (id: string) => {
    switch (id) {
      case 'kepler-telescope':
        return { x: 26, y: 52 }; // Earth-trailing solar orbit 1.05 AU
      case 'near-shoemaker':
        return { x: 42, y: 38 }; // 433 Eros surface 1.45 AU
      case 'dawn-spacecraft':
        return { x: 60, y: 64 }; // Ceres orbit 2.77 AU
      case 'pioneer-10-11':
        return { x: 86, y: 30 }; // Interstellar escape >135 AU
      default:
        return { x: 50, y: 50 };
    }
  };

  const handleMarkerClick = (artifact: Artifact) => {
    museumAudio.playClick(950);
    onSelectArtifact(artifact);
  };

  const handleMarkerHover = (artifact: Artifact | null) => {
    if (artifact && artifact.id !== hoveredArtifact?.id) {
      museumAudio.playScanPing();
    }
    setHoveredArtifact(artifact);
  };

  return (
    <div className="relative w-full rounded-2xl border border-slate-800 bg-[#060913] p-4 sm:p-6 shadow-2xl overflow-hidden font-sans">
      {/* Header telemetry HUD */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-400">
            <Radio className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-light tracking-wide text-white uppercase font-heading">
                Orbital Surface & Celestial Radar
              </h2>
              <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-amber-400 border border-amber-500/30">
                SWEEP ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              IAU VERIFIED TELEMETRY // {selectedBody.toUpperCase()} SECTOR ARCHIVE
            </p>
          </div>
        </div>

        {/* Celestial Body Toggle: Moon, Mars, Deep Space */}
        <div className="flex items-center rounded-xl border border-slate-800 bg-slate-950/80 p-1">
          <button
            onClick={() => {
              museumAudio.playClick(800);
              onSelectBody('moon');
            }}
            className={`flex items-center gap-1.5 sm:gap-2 rounded-lg px-3 sm:px-4 py-2 text-xs font-mono font-medium transition-all ${
              selectedBody === 'moon'
                ? 'bg-slate-800 text-white shadow-lg border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-slate-300" />
            <span>LUNA ({artifacts.filter(a => a.celestialBody === 'moon').length})</span>
          </button>
          <button
            onClick={() => {
              museumAudio.playClick(800);
              onSelectBody('mars');
            }}
            className={`flex items-center gap-1.5 sm:gap-2 rounded-lg px-3 sm:px-4 py-2 text-xs font-mono font-medium transition-all ${
              selectedBody === 'mars'
                ? 'bg-amber-950/60 text-amber-300 shadow-lg border border-amber-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>ARES ({artifacts.filter(a => a.celestialBody === 'mars').length})</span>
          </button>
          <button
            onClick={() => {
              museumAudio.playClick(800);
              onSelectBody('deep_space');
            }}
            className={`flex items-center gap-1.5 sm:gap-2 rounded-lg px-3 sm:px-4 py-2 text-xs font-mono font-medium transition-all ${
              selectedBody === 'deep_space'
                ? 'bg-sky-950/60 text-sky-300 shadow-lg border border-sky-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <span>DEEP SPACE ({artifacts.filter(a => a.celestialBody === 'deep_space').length})</span>
          </button>
        </div>
      </div>

      {/* Main Radar Surface Map Canvas / SVG */}
      <div className="relative aspect-[21/10] min-h-[420px] w-full rounded-xl border border-slate-800 bg-[#05070f] overflow-hidden select-none">
        {/* Subtle grid lines */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(148, 163, 184, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(148, 163, 184, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '5% 10%'
          }}
        />

        {/* Equatorial and Meridian Lines */}
        <div className="absolute top-1/2 left-0 right-0 h-px border-t border-dashed border-slate-700/60 pointer-events-none" />
        <div className="absolute top-0 bottom-0 left-1/2 w-px border-l border-dashed border-slate-700/60 pointer-events-none" />

        {/* 360-Degree Animated Radar Beam Rotating Sweep */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[800px] rounded-full border border-slate-800/40 animate-radar-sweep relative">
            <div 
              className="absolute top-1/2 left-1/2 w-[400px] h-0.5 origin-left"
              style={{
                background: selectedBody === 'mars' 
                  ? 'linear-gradient(90deg, rgba(245, 158, 11, 0.7) 0%, transparent 100%)' 
                  : selectedBody === 'deep_space'
                  ? 'linear-gradient(90deg, rgba(56, 189, 248, 0.7) 0%, transparent 100%)'
                  : 'linear-gradient(90deg, rgba(226, 232, 240, 0.7) 0%, transparent 100%)'
              }}
            />
          </div>
        </div>

        {/* Topographic Background Art for Luna, Mars & Deep Space */}
        {selectedBody === 'moon' && (
          <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none" preserveAspectRatio="none">
            {/* Lunar Mare Basins */}
            <circle cx="38%" cy="40%" r="9%" fill="#1e293b" opacity="0.6" /> {/* Mare Imbrium */}
            <circle cx="28%" cy="52%" r="14%" fill="#1e293b" opacity="0.5" /> {/* Oceanus Procellarum */}
            <circle cx="56%" cy="47%" r="7%" fill="#1e293b" opacity="0.6" /> {/* Mare Serenitatis */}
            <circle cx="58%" cy="52%" r="8%" fill="#1e293b" opacity="0.7" /> {/* Mare Tranquillitatis */}
            <circle cx="68%" cy="46%" r="5%" fill="#1e293b" opacity="0.5" /> {/* Mare Crisium */}
            <circle cx="54%" cy="62%" r="6%" fill="#1e293b" opacity="0.6" /> {/* Mare Nectaris */}
            
            {/* Crater Rings */}
            <circle cx="32%" cy="44%" r="18" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" fill="none" /> {/* Copernicus */}
            <circle cx="45%" cy="75%" r="22" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" fill="none" /> {/* Tycho */}
            
            {/* Labels */}
            <text x="35%" y="40%" fill="#64748b" fontSize="10" fontFamily="monospace">MARE IMBRIUM</text>
            <text x="20%" y="54%" fill="#64748b" fontSize="10" fontFamily="monospace">OCEANUS PROCELLARUM</text>
            <text x="54%" y="52%" fill="#64748b" fontSize="10" fontFamily="monospace">TRANQUILLITATIS</text>
            <text x="50%" y="64%" fill="#64748b" fontSize="10" fontFamily="monospace">DESCARTES HIGHLANDS</text>
          </svg>
        )}

        {selectedBody === 'mars' && (
          <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none" preserveAspectRatio="none">
            {/* Mars Features */}
            <ellipse cx="28%" cy="46%" rx="10%" ry="14%" fill="#451a03" opacity="0.5" /> {/* Tharsis Rise */}
            <circle cx="24%" cy="42%" r="16" stroke="#b45309" strokeWidth="1.5" strokeDasharray="2 2" fill="#78350f" fillOpacity="0.4" /> {/* Olympus Mons */}
            <path d="M 36 50 Q 50 56 65 52" stroke="#b45309" strokeWidth="6" opacity="0.6" fill="none" strokeLinecap="round" /> {/* Valles Marineris */}
            <circle cx="75%" cy="65%" r="12%" fill="#3f1c13" opacity="0.4" /> {/* Hellas Basin */}
            <circle cx="58%" cy="38%" r="6%" fill="#451a03" opacity="0.5" /> {/* Chryse Planitia */}
            <circle cx="68%" cy="26%" r="10%" fill="#371b0d" opacity="0.5" /> {/* Utopia Planitia */}
            <circle cx="72%" cy="48%" r="6%" fill="#451a03" opacity="0.5" /> {/* Elysium Planitia */}
            
            {/* Labels */}
            <text x="21%" y="38%" fill="#9a3412" fontSize="10" fontFamily="monospace">OLYMPUS MONS</text>
            <text x="44%" y="60%" fill="#9a3412" fontSize="10" fontFamily="monospace">VALLES MARINERIS</text>
            <text x="56%" y="36%" fill="#9a3412" fontSize="10" fontFamily="monospace">CHRYSE PLANITIA</text>
            <text x="66%" y="24%" fill="#9a3412" fontSize="10" fontFamily="monospace">UTOPIA PLANITIA</text>
            <text x="70%" y="46%" fill="#9a3412" fontSize="10" fontFamily="monospace">ELYSIUM PLANITIA</text>
          </svg>
        )}

        {selectedBody === 'deep_space' && (
          <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" preserveAspectRatio="none">
            {/* Solar system concentric orbital rings */}
            <circle cx="12%" cy="50%" r="5%" stroke="#f59e0b" strokeWidth="2" fill="#78350f" fillOpacity="0.3" /> {/* The Sun */}
            <text x="11%" y="58%" fill="#f59e0b" fontSize="10" fontFamily="monospace">SOL</text>
            
            <circle cx="12%" cy="50%" r="16%" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" fill="none" /> {/* Earth Orbit (1 AU) */}
            <text x="24%" y="45%" fill="#64748b" fontSize="9" fontFamily="monospace">EARTH ORBIT (1.0 AU)</text>

            <circle cx="12%" cy="50%" r="28%" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" fill="none" /> {/* Mars / Asteroid 433 Eros */}
            <text x="36%" y="34%" fill="#64748b" fontSize="9" fontFamily="monospace">433 EROS REGIME (1.45 AU)</text>

            <circle cx="12%" cy="50%" r="48%" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" fill="none" /> {/* Ceres Orbit (2.77 AU) */}
            <text x="54%" y="60%" fill="#64748b" fontSize="9" fontFamily="monospace">DWARF PLANET CERES (2.77 AU)</text>

            {/* Interstellar Hyperbolic Escape Vector */}
            <path d="M 20 40 Q 60 30 95 24" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
            <text x="78%" y="22%" fill="#38bdf8" fontSize="9" fontFamily="monospace">HYPERBOLIC ESCAPE (&gt;135 AU)</text>
          </svg>
        )}

        {/* Interactive Beacon Markers with multi-ring sonar pulses */}
        {filteredArtifacts.map((artifact) => {
          const { x, y } = selectedBody === 'deep_space'
            ? getDeepSpaceCoordinates(artifact.id)
            : getMapCoordinates(
                artifact.coordinates.latitude,
                artifact.coordinates.longitude,
                artifact.celestialBody
              );
          const isHovered = hoveredArtifact?.id === artifact.id;

          return (
            <div
              key={artifact.id}
              style={{ left: `${x}%`, top: `${y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
              onClick={() => handleMarkerClick(artifact)}
              onMouseEnter={() => handleMarkerHover(artifact)}
              onMouseLeave={() => handleMarkerHover(null)}
            >
              {/* Expanding Sonar Pulse Ring */}
              <div 
                className="absolute -inset-4 rounded-full opacity-70 animate-sonar pointer-events-none"
                style={{ backgroundColor: artifact.imageTheme.accentColor }}
              />

              {/* Beacon Core */}
              <div 
                className={`relative flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                  isHovered 
                    ? 'scale-125 shadow-[0_0_20px_rgba(245,158,11,0.9)] border-white' 
                    : 'border-slate-300/80 bg-slate-900/95'
                }`}
                style={{ borderColor: isHovered ? '#ffffff' : artifact.imageTheme.accentColor }}
              >
                <div 
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: artifact.imageTheme.accentColor }}
                />
              </div>

              {/* Label Tag on Map */}
              <div className="absolute left-7 top-1/2 -translate-y-1/2 whitespace-nowrap hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-950/90 border border-slate-800 text-[10px] font-mono text-slate-300 pointer-events-none opacity-85 group-hover:opacity-100 group-hover:border-amber-500/60 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: artifact.imageTheme.accentColor }} />
                <span className="font-semibold text-white">{artifact.mission}</span>
                <span className="text-slate-500">({artifact.launchYear})</span>
              </div>
            </div>
          );
        })}

        {/* Corner HUD Coordinates Overlay */}
        <div className="absolute bottom-3 left-4 text-[10px] font-mono text-slate-400 space-y-0.5 pointer-events-none bg-slate-950/75 p-2 rounded-lg border border-slate-800">
          <div>SECTOR: {selectedBody.replace('_', ' ').toUpperCase()}</div>
          <div>ACTIVE BEACONS: {filteredArtifacts.length} MONUMENTS</div>
          <div>IAU REFERENCE GRID: CALIBRATED</div>
        </div>

        <div className="absolute top-3 right-4 text-[10px] font-mono text-amber-500/80 pointer-events-none bg-slate-950/75 p-2 rounded-lg border border-slate-800 flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 animate-spin" />
          <span>REAL-TIME TELEMETRY LOCK</span>
        </div>
      </div>

      {/* Selected / Hovered Artifact Telemetry Card Banner */}
      <div className="mt-4 p-4 rounded-xl border border-slate-800 bg-[#090e1a]/90 backdrop-blur transition-all">
        {hoveredArtifact ? (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  {hoveredArtifact.archivalId}
                </span>
                <span className="text-xs font-mono text-slate-300">
                  {hoveredArtifact.coordinatesDisplay}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  // {hoveredArtifact.coordinates.landingSite}
                </span>
              </div>
              <h3 className="text-base font-light tracking-wide text-white font-heading">
                {hoveredArtifact.name}
              </h3>
              <p className="text-xs text-slate-300 line-clamp-1 max-w-3xl font-normal">
                {hoveredArtifact.purpose}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleMarkerClick(hoveredArtifact)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-slate-950 font-mono text-xs font-bold hover:bg-amber-400 transition-colors shadow-lg active:scale-95"
              >
                <Eye className="w-4 h-4" />
                OPEN ARCHIVAL DOSSIER
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 py-1">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>Hover or select any telemetry beacon to inspect historical coordinates, mission purpose, and final status.</span>
            </div>
            <span className="text-slate-500 hidden sm:inline">CLICK BEACON FOR COMPLETE DOSSIER</span>
          </div>
        )}
      </div>
    </div>
  );
};
