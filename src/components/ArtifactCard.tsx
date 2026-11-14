import React from 'react';
import type { Artifact } from '../types';
import { SchematicView } from './SchematicView';
import { museumAudio } from '../utils/audio';
import { ArrowUpRight, Calendar, Compass, Radio } from 'lucide-react';

interface ArtifactCardProps {
  artifact: Artifact;
  onSelect: (artifact: Artifact) => void;
}

export const ArtifactCard: React.FC<ArtifactCardProps> = ({ artifact, onSelect }) => {
  const handleClick = () => {
    museumAudio.playClick(900);
    onSelect(artifact);
  };

  const statusColors = {
    intact_inactive: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    interred: 'text-red-400 border-red-500/30 bg-red-500/10',
    silent: 'text-slate-400 border-slate-600/30 bg-slate-800/40',
    hibernating: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
  };

  return (
    <div 
      onClick={handleClick}
      onMouseEnter={() => museumAudio.playClick(1200)}
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-slate-800/90 bg-[#070b14]/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/50 hover:shadow-[0_10px_30px_rgba(245,158,11,0.08)] flex flex-col justify-between"
    >
      {/* Corner Bracket Accent */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-slate-700/60 rounded-tr-xl group-hover:border-amber-500/70 transition-colors pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-slate-700/60 rounded-bl-xl group-hover:border-amber-500/70 transition-colors pointer-events-none" />

      <div>
        {/* Top Header Metrics */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-amber-400/90 tracking-wider">
              {artifact.archivalId}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">/</span>
            <span className="text-[10px] font-mono uppercase text-slate-400">
              {artifact.agency}
            </span>
          </div>

          <div className={`px-2 py-0.5 rounded text-[10px] font-mono border uppercase tracking-wider ${statusColors[artifact.status]}`}>
            {artifact.status.replace('_', ' ')}
          </div>
        </div>

        {/* Schematic Preview */}
        <div className="mb-4">
          <SchematicView artifact={artifact} compact={true} />
        </div>

        {/* Title & Mission */}
        <div className="mb-2">
          <div className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
            {artifact.mission}
          </div>
          <h3 className="text-base font-semibold text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-1">
            {artifact.name}
          </h3>
        </div>

        {/* Brief Narrative */}
        <p className="text-xs text-slate-400 line-clamp-2 font-light leading-relaxed mb-4">
          {artifact.brief}
        </p>
      </div>

      {/* Footer Telemetry */}
      <div className="border-t border-slate-800/80 pt-3 space-y-2">
        <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-1.5 truncate">
            <Compass className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{artifact.coordinates.landingSite}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate justify-end">
            <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>{artifact.landingDate.slice(0, 4)} — {artifact.finalSignalDate.slice(0, 4)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
            <Radio className="w-3 h-3 text-amber-500" />
            <span>Lifespan: <strong className="text-slate-300 font-normal">{artifact.operationalDays} days</strong></span>
            {artifact.distanceTraveledKm && (
              <span className="text-slate-400">({artifact.distanceTraveledKm} km)</span>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs font-mono text-amber-400 opacity-80 group-hover:opacity-100 transition-opacity">
            <span>INSPECT</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};
