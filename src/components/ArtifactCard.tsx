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

  const statusColors: Record<string, string> = {
    intact_inactive: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    interred: 'text-red-400 border-red-500/30 bg-red-500/10',
    silent: 'text-slate-400 border-slate-600/30 bg-slate-800/40',
    hibernating: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
    perpetual_orbit: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    interstellar_drift: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
  };

  return (
    <div 
      onClick={handleClick}
      onMouseEnter={() => museumAudio.playClick(1200)}
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-slate-800/90 bg-[#070b14]/85 p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-500/50 hover:shadow-[0_12px_36px_rgba(245,158,11,0.12)] flex flex-col justify-between"
    >
      {/* Expanding Corner Bracket Accents on Hover */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-slate-700/60 rounded-tr-xl group-hover:border-amber-400 group-hover:w-10 group-hover:h-10 transition-all pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-slate-700/60 rounded-bl-xl group-hover:border-amber-400 group-hover:w-10 group-hover:h-10 transition-all pointer-events-none" />

      {/* Subtle underglow matching artifact accent */}
      <div 
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-20 opacity-0 group-hover:opacity-20 blur-2xl transition-opacity pointer-events-none rounded-full"
        style={{ backgroundColor: artifact.imageTheme.accentColor }}
      />

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
            <span className="text-[10px] font-mono text-slate-500">•</span>
            <span className="text-[11px] font-mono font-semibold text-slate-300">
              {artifact.launchYear}
            </span>
          </div>

          <div className={`px-2 py-0.5 rounded text-[10px] font-mono border uppercase tracking-wider ${statusColors[artifact.status] || 'text-slate-400 border-slate-700'}`}>
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
            {artifact.mission} // {artifact.celestialBody.replace('_', ' ').toUpperCase()}
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-1 font-cinzel">
            {artifact.name}
          </h3>
        </div>

        {/* Brief Narrative */}
        <p className="text-xs text-slate-300 line-clamp-2 font-normal leading-relaxed mb-4">
          {artifact.brief}
        </p>
      </div>

      {/* Footer Telemetry */}
      <div className="border-t border-slate-800/80 pt-3 space-y-2 font-mono">
        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5 truncate">
            <Compass className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{artifact.coordinates.landingSite}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate justify-end">
            <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>{artifact.launchYear} — {artifact.finalSignalDate.slice(0, 4)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <Radio className="w-3 h-3 text-amber-500 animate-pulse" />
            <span>Span: <strong className="text-slate-200 font-medium">{artifact.operationalDays} days</strong></span>
          </div>

          <div className="flex items-center gap-1 text-xs text-amber-400 opacity-80 group-hover:opacity-100 transition-opacity">
            <span className="font-semibold">INSPECT DOSSIER</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};
