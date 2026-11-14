import React, { useState } from 'react';
import type { Artifact, CelestialBody } from '../types';
import { museumAudio } from '../utils/audio';
import { Calendar, Compass, ArrowRight, Eye, Sparkles } from 'lucide-react';

interface TimelineViewProps {
  artifacts: Artifact[];
  onSelectArtifact: (artifact: Artifact) => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({ artifacts, onSelectArtifact }) => {
  const [filterBody, setFilterBody] = useState<'all' | CelestialBody>('all');
  const [selectedEra, setSelectedEra] = useState<string>('all');

  // Sort chronologically by launchYear then launchDate
  const sortedArtifacts = [...artifacts].sort((a, b) => 
    new Date(a.launchDate).getTime() - new Date(b.launchDate).getTime()
  );

  const eras = [
    { id: 'all', label: 'All Eras (1966 — Present)' },
    { id: 'early_pioneer', label: 'Surveyor & Apollo Dawn (1966 — 1970)', start: 1966, end: 1970 },
    { id: 'apollo_golden', label: 'Apollo Lunar Rovers & Pioneers (1971 — 1974)', start: 1971, end: 1974 },
    { id: 'viking_pathfinder', label: 'Viking & Pathfinder Awakening (1975 — 1999)', start: 1975, end: 1999 },
    { id: 'mars_renaissance', label: 'Martian Rovers & Deep Space (2000 — 2012)', start: 2000, end: 2012 },
    { id: 'modern_aerial', label: 'Modern Aerial & Seismology (2013 — Present)', start: 2013, end: 2030 },
  ];

  const filteredArtifacts = sortedArtifacts.filter(a => {
    if (filterBody !== 'all' && a.celestialBody !== filterBody) return false;
    if (selectedEra !== 'all') {
      const era = eras.find(e => e.id === selectedEra);
      if (era && era.start && era.end) {
        if (a.launchYear < era.start || a.launchYear > era.end) return false;
      }
    }
    return true;
  });

  return (
    <div className="space-y-8 font-sans">
      {/* Era / Filter Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl border border-slate-800 bg-[#070b14]/90 backdrop-blur">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-wide text-white uppercase flex items-center gap-2 font-cinzel">
            <Sparkles className="w-5 h-5 text-amber-400" />
            Interplanetary Chronometer
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Humanity’s technological milestones anchored chronologically across the Moon, Mars, and Deep Space
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Celestial Filter */}
          <div className="flex items-center rounded-lg border border-slate-800 bg-slate-950 p-1">
            <button
              onClick={() => {
                museumAudio.playClick(750);
                setFilterBody('all');
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
                filterBody === 'all' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              ALL ({artifacts.length})
            </button>
            <button
              onClick={() => {
                museumAudio.playClick(750);
                setFilterBody('moon');
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
                filterBody === 'moon' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              MOON ({artifacts.filter(a => a.celestialBody === 'moon').length})
            </button>
            <button
              onClick={() => {
                museumAudio.playClick(750);
                setFilterBody('mars');
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
                filterBody === 'mars' ? 'bg-amber-950/60 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              MARS ({artifacts.filter(a => a.celestialBody === 'mars').length})
            </button>
            <button
              onClick={() => {
                museumAudio.playClick(750);
                setFilterBody('deep_space');
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
                filterBody === 'deep_space' ? 'bg-sky-950/60 text-sky-300 border border-sky-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              DEEP SPACE ({artifacts.filter(a => a.celestialBody === 'deep_space').length})
            </button>
          </div>
        </div>
      </div>

      {/* Era Selection Tabs */}
      <div className="flex flex-wrap gap-2">
        {eras.map(era => (
          <button
            key={era.id}
            onClick={() => {
              museumAudio.playClick(850);
              setSelectedEra(era.id);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono border transition-all ${
              selectedEra === era.id
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-lg'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            {era.label}
          </button>
        ))}
      </div>

      {/* Timeline Stream */}
      <div className="relative pl-6 sm:pl-10 border-l border-slate-800/80 space-y-8 my-8">
        {filteredArtifacts.map((artifact) => {
          const isMoon = artifact.celestialBody === 'moon';
          const isMars = artifact.celestialBody === 'mars';

          return (
            <div 
              key={artifact.id}
              className="relative group transition-all"
            >
              {/* Timeline Pin Node on the line with animated hover ping */}
              <div 
                className="absolute -left-[31px] sm:-left-[47px] top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 transition-transform duration-300 group-hover:scale-125"
                style={{
                  borderColor: artifact.imageTheme.accentColor,
                  backgroundColor: '#060a14'
                }}
              >
                <div 
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: artifact.imageTheme.accentColor }}
                />
              </div>

              {/* Timeline Card */}
              <div 
                onClick={() => {
                  museumAudio.playClick(900);
                  onSelectArtifact(artifact);
                }}
                className="cursor-pointer rounded-xl border border-slate-800/90 bg-[#070b14]/85 p-5 sm:p-6 transition-all duration-300 hover:border-amber-500/50 hover:bg-[#0c1322] hover:shadow-xl hover:-translate-y-0.5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xl sm:text-2xl font-bold font-mono text-white tracking-wider">
                      {artifact.launchYear}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider border ${
                      isMoon 
                        ? 'border-slate-600 bg-slate-800/60 text-slate-300' 
                        : isMars
                        ? 'border-amber-500/40 bg-amber-500/10 text-amber-400'
                        : 'border-sky-500/40 bg-sky-500/10 text-sky-300'
                    }`}>
                      {artifact.celestialBody.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {artifact.archivalId}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>Launched: {artifact.launchDate}</span>
                    <span>•</span>
                    <span>Silenced: {artifact.finalSignalDate}</span>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <h3 className="text-base sm:text-lg font-bold text-slate-100 group-hover:text-amber-300 transition-colors font-cinzel">
                      {artifact.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-normal max-w-3xl leading-relaxed">
                      {artifact.purpose}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400 pt-1">
                      <Compass className="w-3.5 h-3.5 text-slate-500" />
                      <span>{artifact.coordinates.landingSite} ({artifact.coordinatesDisplay})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-700 bg-slate-900/90 text-xs font-mono text-slate-200 group-hover:border-amber-500/50 group-hover:text-amber-300 transition-colors">
                      <Eye className="w-3.5 h-3.5" />
                      <span>INSPECT DOSSIER</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
