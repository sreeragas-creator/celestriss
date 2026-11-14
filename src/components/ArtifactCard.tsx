import React from 'react';
import type { Artifact } from '../types';
import { ArtifactVisualizer } from './ArtifactVisualizer';
import { museumAudio } from '../utils/audio';
import { ArrowUpRight, Compass, Radio, Sparkles } from 'lucide-react';

interface ArtifactCardProps {
  artifact: Artifact;
  onSelect: (artifact: Artifact) => void;
  isJuniorMode?: boolean;
}

export const ArtifactCard: React.FC<ArtifactCardProps> = ({ 
  artifact, 
  onSelect,
  isJuniorMode = false 
}) => {
  const handleClick = () => {
    museumAudio.playClick(900);
    onSelect(artifact);
  };

  const statusBadges: Record<string, string> = {
    intact_inactive: 'text-amber-300 border-amber-500/20 bg-amber-500/5',
    interred: 'text-rose-300 border-rose-500/20 bg-rose-500/5',
    silent: 'text-slate-400 border-slate-700/40 bg-slate-800/20',
    hibernating: 'text-sky-300 border-sky-500/20 bg-sky-500/5',
    perpetual_orbit: 'text-emerald-300 border-emerald-500/20 bg-emerald-500/5',
    interstellar_drift: 'text-purple-300 border-purple-500/20 bg-purple-500/5',
  };

  return (
    <div 
      onClick={handleClick}
      onMouseEnter={() => museumAudio.playClick(1200)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl nova-glass-card p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Top Header Metrics */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
            <span className="text-white/80">{artifact.archivalId}</span>
            <span>/</span>
            <span className="uppercase">{artifact.agency}</span>
            <span>•</span>
            <span className="text-slate-300">{artifact.launchYear}</span>
          </div>

          <div className={`px-2 py-0.5 rounded-full text-[10px] font-mono border uppercase tracking-wider ${statusBadges[artifact.status] || 'text-slate-400 border-slate-700'}`}>
            {artifact.status.replace('_', ' ')}
          </div>
        </div>

        {/* Dual-Mode Photo & Schematic Visualizer */}
        <div className="mb-4">
          <ArtifactVisualizer artifact={artifact} compact={true} />
        </div>

        {/* Title & Mission */}
        <div className="mb-2">
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 mb-1">
            {artifact.mission} // {artifact.celestialBody.replace('_', ' ').toUpperCase()}
          </div>
          <h3 className="text-base sm:text-lg font-heading font-light tracking-wide text-white group-hover:text-amber-200 transition-colors line-clamp-1">
            {artifact.name}
          </h3>
        </div>

        {/* Junior Mode Highlight or Brief Narrative */}
        {isJuniorMode && artifact.kidFriendly ? (
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1.5 mb-4">
            <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Junior Explorer Insight</span>
            </div>
            <p className="text-xs text-amber-100 font-sans leading-relaxed line-clamp-2">
              {artifact.kidFriendly.funFact}
            </p>
            <div className="text-[10px] text-amber-200/80 font-mono truncate">
              📏 {artifact.kidFriendly.sizeComparison}
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-400 font-sans font-light line-clamp-2 leading-relaxed mb-4">
            {artifact.brief}
          </p>
        )}
      </div>

      {/* Footer Telemetry */}
      <div className="border-t border-white/5 pt-3 space-y-2 font-mono text-[11px]">
        <div className="flex items-center justify-between text-slate-400">
          <div className="flex items-center gap-1.5 truncate">
            <Compass className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{artifact.coordinates.landingSite}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <Radio className="w-3 h-3 text-amber-500/80" />
            <span>{artifact.operationalDays}d</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 text-xs">
          <span className="text-[10px] text-slate-400">STATUS: {artifact.status.replace('_', ' ').toUpperCase()}</span>
          <div className="flex items-center gap-1 text-amber-300 group-hover:text-amber-200 transition-colors font-heading text-[11px] tracking-wider font-medium">
            <span>EXPLORE STORY</span>
            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};
