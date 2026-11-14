import React from 'react';
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
  const deepSpaceArtifacts = artifacts.filter(a => a.celestialBody === 'deep_space');

  return (
    <div className="space-y-8 font-sans">
      {/* Header Banner */}
      <div className="relative rounded-2xl border border-sky-900/60 bg-gradient-to-b from-[#081226] via-[#050a17] to-[#04060c] p-6 sm:p-10 shadow-2xl overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-10 w-80 h-80 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-sky-500/40 bg-sky-500/10 text-xs font-mono text-sky-400">
            <Orbit className="w-3.5 h-3.5 animate-spin" />
            <span>SECONDARY EXHIBITION VAULT // BEYOND MOON & MARS</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-cinzel">
            The Deep Space Relics
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Beyond the gravity wells of the Moon and Mars drift humanity's farthest ambassadors. Resting upon tumbling asteroids, locked in eternal orbits around dwarf planets, or silently coasting along hyperbolic trajectories toward distant constellations.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                museumAudio.playClick(900);
                onOpenRadar();
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500 text-slate-950 font-mono text-xs font-bold hover:bg-sky-400 transition-colors shadow-lg active:scale-95"
            >
              <Compass className="w-4 h-4" />
              <span>INSPECT CELESTIAL RADAR</span>
            </button>
            <span className="text-xs font-mono text-slate-400">
              4 VERIFIED DEEP SPACE MISSIONS ARCHIVED
            </span>
          </div>
        </div>
      </div>

      {/* Grid of Deep Space Artifacts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {deepSpaceArtifacts.map((artifact) => (
          <ArtifactCard
            key={artifact.id}
            artifact={artifact}
            onSelect={onSelectArtifact}
          />
        ))}
      </div>
    </div>
  );
};
