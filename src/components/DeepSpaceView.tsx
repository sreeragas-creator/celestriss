import React, { useState } from 'react';
import type { Artifact } from '../types';
import { ArtifactCard } from './ArtifactCard';
import { museumAudio } from '../utils/audio';
import { Orbit, Compass } from 'lucide-react';

interface DeepSpaceViewProps {
  artifacts: Artifact[];
  onSelectArtifact: (artifact: Artifact) => void;
  onOpenRadar: () => void;
}

export const DeepSpaceView: React.FC<DeepSpaceViewProps> = ({
  artifacts,
  onSelectArtifact,
  onOpenRadar,
}) => {
  const [selectedRegime, setSelectedRegime] = useState<string>('all');
  const deepSpaceArtifacts = artifacts.filter(a => a.celestialBody === 'deep_space');

  const filteredArtifacts = deepSpaceArtifacts.filter(a => {
    if (selectedRegime !== 'all' && !a.coordinates.orbitalRegime?.toLowerCase().includes(selectedRegime.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 font-sans">
      
      {/* TOP ASTRODYNAMICS HUD BANNER */}
      <div className="relative rounded-2xl border border-white/10 bg-[#050811]/90 backdrop-blur-xl p-6 sm:p-8 flex flex-col md:flex-row md:items-end justify-between gap-6 shadow-2xl overflow-hidden">
        
        {/* Subtle radial glow */}
        <div className="absolute top-0 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[10px] font-mono text-cyan-300">
            <Orbit className="w-3.5 h-3.5 animate-spin" />
            <span>ASTRODYNAMICS VAULT // HELIOCENTRIC & INTERSTELLAR REGIMES</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-heading font-light tracking-wide text-white">
            The Deep Space Relics
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
            Beyond the Moon and Mars drift humanity's farthest ambassadors. Locked in eternal orbits around dwarf planets, resting upon tumbling asteroids, or coasting through interstellar space toward distant star systems.
          </p>
        </div>

        {/* METRIC STRIP */}
        <div className="grid grid-cols-2 gap-3 shrink-0 font-mono text-xs">
          <div className="p-3 rounded-xl bg-[#090e1c] border border-white/10">
            <div className="text-[10px] text-slate-400 uppercase tracking-widest">MAX DISTANCE</div>
            <div className="text-xl font-bold text-cyan-300 mt-0.5">&gt; 135 AU</div>
          </div>
          <div className="p-3 rounded-xl bg-[#090e1c] border border-white/10">
            <div className="text-[10px] text-slate-400 uppercase tracking-widest">RELICS TRACKED</div>
            <div className="text-xl font-bold text-white mt-0.5">{deepSpaceArtifacts.length} Missions</div>
          </div>
        </div>
      </div>

      {/* TWO-COLUMN ASTRODYNAMICS COMMAND LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT ASTRODYNAMICS DRAWER (3 cols) */}
        <div className="lg:col-span-3 rounded-2xl bg-[#050811]/90 backdrop-blur-xl border border-white/10 p-4 space-y-4 font-mono text-xs">
          <div className="text-[11px] text-slate-400 uppercase tracking-widest border-b border-white/10 pb-2">
            ORBITAL REGIMES
          </div>

          <div className="space-y-1">
            {[
              { id: 'all', label: 'All Deep Space' },
              { id: 'ceres', label: 'Ceres Polar Orbit' },
              { id: 'touchdown', label: 'Asteroid Surface' },
              { id: 'interstellar', label: 'Interstellar Escape' },
              { id: 'heliocentric', label: 'Earth-Trailing Solar' },
            ].map(reg => (
              <button
                key={reg.id}
                onClick={() => {
                  museumAudio.playClick(750);
                  setSelectedRegime(reg.id);
                }}
                className={`w-full py-2 px-3 rounded-lg text-left flex items-center justify-between transition-colors ${
                  selectedRegime === reg.id
                    ? 'bg-cyan-950/60 border border-cyan-500/50 text-cyan-300 font-bold'
                    : 'bg-[#080d1a] border border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                <span>{reg.label}</span>
                {selectedRegime === reg.id && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 space-y-2 text-[10px] text-slate-400">
            <div className="flex justify-between">
              <span>ROUND-TRIP LIGHT TIME</span>
              <span className="text-white">Up to 22h 45m</span>
            </div>
            <div className="flex justify-between">
              <span>ESCAPE VELOCITY</span>
              <span className="text-white">~12 km/s</span>
            </div>
          </div>

          <button
            onClick={() => {
              museumAudio.playClick(900);
              onOpenRadar();
            }}
            className="w-full py-2 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-600 hover:text-white transition-colors text-center font-bold flex items-center justify-center gap-2"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>RADAR TRAJECTORY</span>
          </button>
        </div>

        {/* RIGHT COMMAND MODULES GRID (9 cols) */}
        <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredArtifacts.map((artifact) => (
            <ArtifactCard
              key={artifact.id}
              artifact={artifact}
              onSelect={onSelectArtifact}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
