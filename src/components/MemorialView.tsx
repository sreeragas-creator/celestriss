import React, { useState } from 'react';
import type { Artifact } from '../types';
import { museumAudio } from '../utils/audio';
import { Sparkles, Radio, Eye } from 'lucide-react';

interface MemorialViewProps {
  artifacts: Artifact[];
  onSelectArtifact: (artifact: Artifact) => void;
}

export const MemorialView: React.FC<MemorialViewProps> = ({ artifacts, onSelectArtifact }) => {
  const [selectedBodyFilter, setSelectedBodyFilter] = useState<'all' | 'moon' | 'mars' | 'deep_space'>('all');
  const [salutingId, setSalutingId] = useState<string | null>(null);

  const [tributes, setTributes] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('afterlight_tributes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const handleSalute = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    museumAudio.playScanPing();
    setSalutingId(id);
    setTimeout(() => setSalutingId(null), 800);

    setTributes(prev => {
      const next = { ...prev, [id]: (prev[id] || 0) + 1 };
      try {
        localStorage.setItem('afterlight_tributes', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const filteredArtifacts = artifacts.filter(a => {
    if (selectedBodyFilter !== 'all' && a.celestialBody !== selectedBodyFilter) return false;
    return true;
  });

  const totalDays = artifacts.reduce((acc, curr) => acc + curr.operationalDays, 0);

  return (
    <div className="space-y-8 font-sans">
      
      {/* TOP COMMAND CENTER COMMENDATION HUD BANNER */}
      <div className="relative rounded-2xl border border-white/10 bg-[#050811]/90 backdrop-blur-xl p-6 sm:p-8 flex flex-col md:flex-row md:items-end justify-between gap-6 shadow-2xl overflow-hidden">
        
        {/* Subtle radial glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[10px] font-mono text-amber-300">
            <Radio className="w-3 h-3 animate-pulse" />
            <span>MEMORIAL ARCHIVE // SECTOR: SOL-DEEP // SILENT SENTINELS</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-heading font-light tracking-wide text-white">
            Abandoned, but Never Forgotten.
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
            Across millions of kilometers of vacuum, frozen regolith, and cosmic radiation, humanity's solitary robotic pioneers and Apollo vehicles rest in perpetual silence. They braved catastrophic dust storms, polar winters, and interstellar cold so that our species could gaze beyond the horizon.
          </p>
        </div>

        {/* CUMULATIVE TELEMETRY METRIC STRIP */}
        <div className="grid grid-cols-2 gap-3 shrink-0 font-mono text-xs">
          <div className="p-3 rounded-xl bg-[#090e1c] border border-white/10">
            <div className="text-[10px] text-slate-400 uppercase tracking-widest">SENTINELS</div>
            <div className="text-xl font-bold text-white mt-0.5">{artifacts.length} Relics</div>
          </div>
          <div className="p-3 rounded-xl bg-[#090e1c] border border-white/10">
            <div className="text-[10px] text-slate-400 uppercase tracking-widest">DAYS ACTIVE</div>
            <div className="text-xl font-bold text-cyan-300 mt-0.5">{totalDays.toLocaleString()} d</div>
          </div>
        </div>
      </div>

      {/* TWO-COLUMN COMMAND CENTER LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT FILTER DRAWER (3 cols) */}
        <div className="lg:col-span-3 rounded-2xl bg-[#050811]/90 backdrop-blur-xl border border-white/10 p-4 space-y-4">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-widest border-b border-white/10 pb-2">
            SENTINEL SECTORS
          </div>

          <div className="space-y-1 font-mono text-xs">
            {[
              { id: 'all', label: 'All Sentinels', count: artifacts.length },
              { id: 'moon', label: 'Moon (Luna)', count: artifacts.filter(a => a.celestialBody === 'moon').length },
              { id: 'mars', label: 'Mars (Ares)', count: artifacts.filter(a => a.celestialBody === 'mars').length },
              { id: 'deep_space', label: 'Deep Space', count: artifacts.filter(a => a.celestialBody === 'deep_space').length },
            ].map(sec => (
              <button
                key={sec.id}
                onClick={() => {
                  museumAudio.playClick(750);
                  setSelectedBodyFilter(sec.id as any);
                }}
                className={`w-full py-2 px-3 rounded-lg text-left flex items-center justify-between transition-colors ${
                  selectedBodyFilter === sec.id
                    ? 'bg-cyan-950/60 border border-cyan-500/50 text-cyan-300 font-bold'
                    : 'bg-[#080d1a] border border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                <span>{sec.label}</span>
                <span className="text-[10px] text-slate-400">{sec.count}</span>
              </button>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-[#080d1a] border border-white/5 text-[11px] font-mono text-slate-400 leading-relaxed">
            Transmit a silent starlight commendation to any machine to record a permanent tribute starlight ping.
          </div>
        </div>

        {/* RIGHT COMMEMORATIVE MODULES GRID (9 cols) */}
        <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredArtifacts.map((artifact) => {
            const saluteCount = (tributes[artifact.id] || 0) + 142;
            const isSaluting = salutingId === artifact.id;

            return (
              <div
                key={artifact.id}
                onClick={() => {
                  museumAudio.playClick(900);
                  onSelectArtifact(artifact);
                }}
                className="group relative cursor-pointer rounded-2xl bg-[#050811]/90 backdrop-blur-xl border border-white/10 p-5 sm:p-6 transition-all duration-300 hover:border-cyan-500/40 hover:bg-[#080d1d] flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3 mb-3 text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: artifact.imageTheme.accentColor }} />
                      <span className="uppercase text-white/80">{artifact.celestialBody.replace('_', ' ')}</span>
                      <span>•</span>
                      <span>{artifact.archivalId}</span>
                    </div>
                    <span className="text-slate-300 font-semibold">{artifact.launchYear}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-heading font-light tracking-wide text-white group-hover:text-cyan-200 transition-colors mb-2">
                    {artifact.name}
                  </h3>

                  {/* Ghost Signal / Final Log Terminal Quote */}
                  {artifact.finalLogTranscript ? (
                    <div className="p-3 rounded-xl bg-[#080d1a] border border-white/5 mb-3 text-xs font-mono italic text-amber-200/90 leading-relaxed border-l-2 border-l-amber-500">
                      {artifact.finalLogTranscript}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 font-light leading-relaxed mb-3">
                      {artifact.brief}
                    </p>
                  )}

                  {/* Telemetry metrics */}
                  <div className="text-[11px] font-mono text-slate-400 space-y-1 mb-4">
                    <div>Resting: <span className="text-slate-200">{artifact.coordinates.landingSite}</span></div>
                    <div>Silenced: <span className="text-slate-200">{artifact.finalSignalDate}</span> ({artifact.operationalDays} days active)</div>
                  </div>
                </div>

                {/* Commendation Salute Action */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={(e) => handleSalute(artifact.id, e)}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono transition-all active:scale-95 ${
                      isSaluting
                        ? 'bg-cyan-400 text-slate-950 border-cyan-300 scale-105 shadow-[0_0_15px_rgba(6,182,212,0.8)]'
                        : 'border-cyan-500/30 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>COMMENDATION ({saluteCount})</span>
                  </button>

                  <div className="flex items-center gap-1 text-xs font-mono text-slate-400 group-hover:text-white transition-colors">
                    <Eye className="w-3.5 h-3.5" />
                    <span>DOSSIER</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
