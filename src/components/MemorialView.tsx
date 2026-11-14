import React, { useState } from 'react';
import type { Artifact } from '../types';
import { museumAudio } from '../utils/audio';
import { Sparkles, Radio, Eye } from 'lucide-react';

interface MemorialViewProps {
  artifacts: Artifact[];
  onSelectArtifact: (artifact: Artifact) => void;
}

export const MemorialView: React.FC<MemorialViewProps> = ({ artifacts, onSelectArtifact }) => {
  // Store tributes in localStorage
  const [tributes, setTributes] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('afterlight_tributes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [salutingId, setSalutingId] = useState<string | null>(null);

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

  return (
    <div className="space-y-10 max-w-5xl mx-auto font-sans">
      {/* Prologue Memorial Banner */}
      <div className="relative rounded-2xl border border-slate-800 bg-gradient-to-b from-[#090d1a] to-[#05070e] p-6 sm:p-10 text-center overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-mono text-amber-400">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>EXHIBIT CHAMBER IV // SILENT WITNESSES</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-light tracking-wide text-white font-heading">
            Abandoned, but Never Forgotten.
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Across millions of kilometers of vacuum, frozen regolith, and cosmic radiation, humanity's solitary robotic pioneers and Apollo vehicles rest in perpetual silence. They braved catastrophic dust storms, polar winters, and interstellar cold so that our species could gaze beyond the horizon.
          </p>

          <div className="pt-2 text-xs font-mono text-slate-500">
            TOUCH OR TRANSMIT A SILENT MEMORIAL SALUTE TO ANY RELIC
          </div>
        </div>
      </div>

      {/* Grid of Memorial Epitaph Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {artifacts.map((artifact) => {
          const saluteCount = (tributes[artifact.id] || 0) + 142;
          const isSaluting = salutingId === artifact.id;

          return (
            <div
              key={artifact.id}
              onClick={() => {
                museumAudio.playClick(900);
                onSelectArtifact(artifact);
              }}
              className="group relative cursor-pointer rounded-xl border border-slate-800/80 bg-[#070b14]/90 p-6 transition-all duration-300 hover:border-amber-500/50 hover:bg-[#0c1220] flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: artifact.imageTheme.accentColor }} />
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                      {artifact.celestialBody.replace('_', ' ').toUpperCase()} // {artifact.mission}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400 font-semibold">
                    {artifact.launchYear}
                  </span>
                </div>

                <h3 className="text-lg font-light tracking-wide text-white group-hover:text-amber-200 transition-colors mb-2 font-heading">
                  {artifact.name}
                </h3>

                {/* Epitaph / Last words */}
                {artifact.finalLogTranscript ? (
                  <div className="p-3.5 rounded-lg border border-slate-800 bg-slate-950/60 mb-4 text-xs font-serif italic text-amber-200/90 leading-relaxed">
                    {artifact.finalLogTranscript}
                  </div>
                ) : (
                  <p className="text-xs text-slate-300 leading-relaxed mb-4 font-normal">
                    {artifact.brief}
                  </p>
                )}

                <div className="text-xs font-mono text-slate-400 space-y-1 mb-4">
                  <div>Resting site: <span className="text-slate-200">{artifact.coordinates.landingSite}</span></div>
                  <div>Final silence: <span className="text-slate-200">{artifact.finalSignalDate}</span> ({artifact.operationalDays} days active)</div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={(e) => handleSalute(artifact.id, e)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg border text-xs font-mono transition-all active:scale-95 ${
                    isSaluting
                      ? 'bg-amber-400 text-slate-950 border-amber-300 scale-105 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                      : 'border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-slate-950'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>TRANSMIT SALUTE ({saluteCount})</span>
                </button>

                <div className="flex items-center gap-1 text-xs font-mono text-slate-400 group-hover:text-white transition-colors">
                  <Eye className="w-3.5 h-3.5" />
                  <span>VIEW DOSSIER</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
