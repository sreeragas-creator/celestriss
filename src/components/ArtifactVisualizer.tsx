import React, { useState } from 'react';
import type { Artifact } from '../types';
import { SchematicView } from './SchematicView';
import { museumAudio } from '../utils/audio';
import { Camera, Cpu } from 'lucide-react';

interface ArtifactVisualizerProps {
  artifact: Artifact;
  compact?: boolean;
}

export const ArtifactVisualizer: React.FC<ArtifactVisualizerProps> = ({
  artifact,
  compact = false,
}) => {
  // Default to photo if available, fallback to schematic
  const [viewMode, setViewMode] = useState<'photo' | 'schematic'>(
    artifact.imageUrl ? 'photo' : 'schematic'
  );
  const [imageError, setImageError] = useState(false);

  const hasPhoto = !!artifact.imageUrl && !imageError;

  const handleToggle = (mode: 'photo' | 'schematic', e: React.MouseEvent) => {
    e.stopPropagation();
    museumAudio.playClick( mode === 'photo' ? 1000 : 750 );
    setViewMode(mode);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      {/* Mode Switcher Toggle Pill */}
      {hasPhoto && (
        <div className="absolute top-2.5 right-3 z-30 flex items-center rounded-md border border-slate-700/80 bg-slate-950/80 p-0.5 backdrop-blur-md">
          <button
            onClick={(e) => handleToggle('photo', e)}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono transition-all ${
              viewMode === 'photo'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Camera className="w-2.5 h-2.5" />
            <span>PHOTO</span>
          </button>
          <button
            onClick={(e) => handleToggle('schematic', e)}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono transition-all ${
              viewMode === 'schematic'
                ? 'bg-slate-800 text-white font-bold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-2.5 h-2.5" />
            <span>SCHEMATIC</span>
          </button>
        </div>
      )}

      {/* Render Photo Mode */}
      {viewMode === 'photo' && hasPhoto ? (
        <div 
          className={`relative w-full overflow-hidden rounded-lg border border-slate-800 bg-[#070b14] group/img ${
            compact ? 'h-48' : 'h-72 w-full'
          }`}
        >
          {/* Real World NASA Archival Image */}
          <img
            src={artifact.imageUrl}
            alt={artifact.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.08] transition-transform duration-500 group-hover/img:scale-105"
            loading="lazy"
          />

          {/* Vignette & scanline overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none scanlines-overlay opacity-20" />

          {/* Top Left Archival Tag */}
          <div className="absolute top-2.5 left-3 text-[10px] font-mono text-slate-200 bg-black/60 px-2 py-0.5 rounded border border-slate-700/60 backdrop-blur-sm pointer-events-none z-10 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>NASA ARCHIVAL PLATE</span>
          </div>

          {/* Bottom Caption & Credit Bar */}
          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[9px] font-mono text-slate-300 bg-black/70 px-2.5 py-1 rounded border border-slate-800/80 backdrop-blur-sm z-10">
            <span className="truncate max-w-[70%] text-amber-200/90">
              {artifact.imageCaption || artifact.coordinates.landingSite}
            </span>
            <span className="text-slate-400 shrink-0">
              {artifact.imageCredit || 'NASA Public Domain'}
            </span>
          </div>
        </div>
      ) : (
        /* Render Schematic Mode (or Fallback) */
        <SchematicView artifact={artifact} compact={compact} />
      )}
    </div>
  );
};
