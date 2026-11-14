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
  const getMapCoordinates = (lat: number, lng: number, body: CelestialBody) => {
    if (body === 'moon') {
      // Cylindrical projection normalized -70 to +70 lat, -180 to +180 long
      // Center 0,0 at center of map
      const x = ((lng + 180) / 360) * 100;
      const y = ((75 - lat) / 150) * 100;
      return { 
        x: Math.max(8, Math.min(92, x)), 
        y: Math.max(12, Math.min(88, y)) 
      };
    } else {
      // Mars projection
      // longitude on Mars: standard 0-360 or -180 to +180
      const normalizedLng = lng < 0 ? lng + 360 : lng;
      const x = (normalizedLng / 360) * 100;
      const y = ((80 - lat) / 160) * 100;
      return { 
        x: Math.max(8, Math.min(92, x)), 
        y: Math.max(12, Math.min(88, y)) 
      };
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
    <div className="relative w-full rounded-2xl border border-slate-800 bg-[#060913] p-4 sm:p-6 shadow-2xl overflow-hidden">
      {/* Header telemetry HUD */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-400">
            <Radio className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold tracking-wide text-white uppercase font-mono">
                Orbital Surface Radar
              </h2>
              <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-amber-400 border border-amber-500/30">
                ACTIVE SWEEP
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              TELEMETRY SENSOR MATRIX // {selectedBody.toUpperCase()} SECTOR ARCHIVE
            </p>
          </div>
        </div>

        {/* Celestial Body Toggle */}
        <div className="flex items-center rounded-xl border border-slate-800 bg-slate-950/80 p-1">
          <button
            onClick={() => {
              museumAudio.playClick(800);
              onSelectBody('moon');
            }}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-mono font-medium transition-all ${
              selectedBody === 'moon'
                ? 'bg-slate-800 text-white shadow-lg border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-slate-300" />
            LUNA (MOON)
          </button>
          <button
            onClick={() => {
              museumAudio.playClick(800);
              onSelectBody('mars');
            }}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-mono font-medium transition-all ${
              selectedBody === 'mars'
                ? 'bg-amber-950/60 text-amber-300 shadow-lg border border-amber-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            ARES (MARS)
          </button>
        </div>
      </div>

      {/* Main Radar Surface Map Canvas / SVG */}
      <div className="relative aspect-[21/10] min-h-[380px] w-full rounded-xl border border-slate-800 bg-[#05070f] overflow-hidden select-none">
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

        {/* Topographic Background Art for Luna & Mars */}
        {selectedBody === 'moon' ? (
          <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none" preserveAspectRatio="none">
            {/* Lunar Mare Basins */}
            <circle cx="38%" cy="40%" r="9%" fill="#1e293b" opacity="0.6" /> {/* Mare Imbrium */}
            <circle cx="28%" cy="52%" r="14%" fill="#1e293b" opacity="0.5" /> {/* Oceanus Procellarum */}
            <circle cx="56%" cy="47%" r="7%" fill="#1e293b" opacity="0.6" /> {/* Mare Serenitatis */}
            <circle cx="58%" cy="52%" r="8%" fill="#1e293b" opacity="0.7" /> {/* Mare Tranquillitatis */}
            <circle cx="68%" cy="46%" r="5%" fill="#1e293b" opacity="0.5" /> {/* Mare Crisium */}
            
            {/* Crater Rings */}
            <circle cx="32%" cy="44%" r="18" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" fill="none" /> {/* Copernicus */}
            <circle cx="45%" cy="75%" r="22" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" fill="none" /> {/* Tycho */}
            
            {/* Labels */}
            <text x="35%" y="40%" fill="#64748b" fontSize="10" fontFamily="monospace">MARE IMBRIUM</text>
            <text x="22%" y="54%" fill="#64748b" fontSize="10" fontFamily="monospace">OCEANUS PROCELLARUM</text>
            <text x="54%" y="52%" fill="#64748b" fontSize="10" fontFamily="monospace">TRANQUILLITATIS</text>
          </svg>
        ) : (
          <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none" preserveAspectRatio="none">
            {/* Mars Features */}
            <ellipse cx="28%" cy="46%" rx="10%" ry="14%" fill="#451a03" opacity="0.5" /> {/* Tharsis Rise */}
            <circle cx="24%" cy="42%" r="16" stroke="#b45309" strokeWidth="1.5" strokeDasharray="2 2" fill="#78350f" fillOpacity="0.4" /> {/* Olympus Mons */}
            <path d="M 36 50 Q 50 56 65 52" stroke="#b45309" strokeWidth="6" opacity="0.6" fill="none" strokeLinecap="round" /> {/* Valles Marineris */}
            <circle cx="75%" cy="65%" r="12%" fill="#3f1c13" opacity="0.4" /> {/* Hellas Basin */}
            <circle cx="58%" cy="38%" r="6%" fill="#451a03" opacity="0.5" /> {/* Chryse Planitia */}
            <circle cx="62%" cy="70%" r="5%" fill="#27150c" opacity="0.5" /> {/* Argyre */}
            
            {/* Labels */}
            <text x="21%" y="38%" fill="#9a3412" fontSize="10" fontFamily="monospace">OLYMPUS MONS</text>
            <text x="44%" y="60%" fill="#9a3412" fontSize="10" fontFamily="monospace">VALLES MARINERIS</text>
            <text x="68%" y="65%" fill="#9a3412" fontSize="10" fontFamily="monospace">HELLAS BASIN</text>
            <text x="56%" y="36%" fill="#9a3412" fontSize="10" fontFamily="monospace">CHRYSE PLANITIA</text>
          </svg>
        )}

        {/* Radar Sweep Effect */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(245, 158, 11, 0.08) 50%, rgba(245, 158, 11, 0.3) 100%)',
            width: '40%',
            animation: 'sweep 8s linear infinite'
          }}
        />

        {/* Interactive Beacon Markers */}
        {filteredArtifacts.map((artifact) => {
          const { x, y } = getMapCoordinates(
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
              {/* Outer pulsing ring */}
              <div 
                className="absolute -inset-3 rounded-full opacity-60 animate-ping pointer-events-none"
                style={{ backgroundColor: artifact.imageTheme.accentColor }}
              />

              {/* Beacon Core */}
              <div 
                className={`relative flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                  isHovered 
                    ? 'scale-125 shadow-[0_0_15px_rgba(245,158,11,0.8)] border-white' 
                    : 'border-slate-300/80 bg-slate-900/90'
                }`}
                style={{ borderColor: isHovered ? '#ffffff' : artifact.imageTheme.accentColor }}
              >
                <div 
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: artifact.imageTheme.accentColor }}
                />
              </div>

              {/* Label Tag on Map */}
              <div className="absolute left-7 top-1/2 -translate-y-1/2 whitespace-nowrap hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-slate-300 pointer-events-none opacity-85 group-hover:opacity-100 group-hover:border-amber-500/50">
                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: artifact.imageTheme.accentColor }} />
                <span>{artifact.mission}</span>
              </div>
            </div>
          );
        })}

        {/* Corner HUD Coordinates Overlay */}
        <div className="absolute bottom-3 left-4 text-[10px] font-mono text-slate-500 space-y-0.5 pointer-events-none bg-slate-950/60 p-2 rounded border border-slate-900">
          <div>LAT SCALE: 80°N - 80°S</div>
          <div>LON SCALE: 180°W - 180°E</div>
          <div>ACTIVE MONITORS: {filteredArtifacts.length} RELICS</div>
        </div>

        <div className="absolute top-3 right-4 text-[10px] font-mono text-amber-500/70 pointer-events-none bg-slate-950/60 p-2 rounded border border-slate-900 flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 animate-spin" />
          <span>REAL-TIME TELEMETRY LOCK</span>
        </div>
      </div>

      {/* Selected / Hovered Artifact Telemetry Card Banner */}
      <div className="mt-4 p-4 rounded-xl border border-slate-800 bg-[#090e1a]/80 backdrop-blur transition-all">
        {hoveredArtifact ? (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  {hoveredArtifact.archivalId}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {hoveredArtifact.coordinatesDisplay}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  // {hoveredArtifact.coordinates.landingSite}
                </span>
              </div>
              <h3 className="text-base font-medium text-white tracking-wide">
                {hoveredArtifact.name}
              </h3>
              <p className="text-xs text-slate-300 line-clamp-1 max-w-2xl font-light">
                {hoveredArtifact.brief}
              </p>
            </div>

            <button
              onClick={() => handleMarkerClick(hoveredArtifact)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-slate-950 font-mono text-xs font-semibold hover:bg-amber-400 transition-colors shrink-0 shadow-lg"
            >
              <Eye className="w-4 h-4" />
              OPEN ARCHIVAL DOSSIER
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 py-1">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>Hover or select any telemetry beacon to inspect historical coordinates and final status.</span>
            </div>
            <span className="text-slate-500 hidden sm:inline">CLICK BEACON FOR COMPLETE DOSSIER</span>
          </div>
        )}
      </div>
    </div>
  );
};
