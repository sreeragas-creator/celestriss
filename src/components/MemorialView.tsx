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

  const handleSalute = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    museumAudio.playScanPing();
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
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Prologue Memorial Banner */}
      <div className="relative rounded-2xl border border-slate-800 bg-gradient-to-b from-[#090d1a] to-[#05070e] p-6 sm:p-10 text-center overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-mono text-amber-400">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>EXHIBIT CHAMBER IV // SILENT WITNESSES</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif tracking-tight text-white">
            Abandoned, but Never Forgotten.
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Across millions of kilometers of vacuum and dust, our robotic pioneers and lunar vehicles rest in perpetual silence. They endured fierce cold, solar radiation, and catastrophic dust storms so that humanity could see beyond the horizon.
          </p>

          <div className="pt-2 text-xs font-mono text-slate-500">
            TOUCH OR SALUTE ANY RELIC TO TRANSMIT A SILENT MEMORIAL TRIBUTE
          </div>
        </div>
      </div>

      {/* Grid of Memorial Epitaph Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {artifacts.map((artifact) => {
          const saluteCount = (tributes[artifact.id] || 0) + 128; // authentic base counter

          return (
            <div
              key={artifact.id}
              onClick={() => {
                museumAudio.playClick(900);
                onSelectArtifact(artifact);
              }}
              className="group relative cursor-pointer rounded-xl border border-slate-800/80 bg-[#070b14]/90 p-6 transition-all duration-300 hover:border-amber-500/50 hover:bg-[#0c1220] flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: artifact.imageTheme.accentColor }} />
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                      {artifact.celestialBody.toUpperCase()} // {artifact.mission}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    {artifact.landingDate.slice(0, 4)}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white group-hover:text-amber-300 transition-colors mb-2">
                  {artifact.name}
                </h3>

                {/* Epitaph / Last words */}
                {artifact.finalLogTranscript ? (
                  <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/60 mb-4 text-xs font-serif italic text-amber-200/90 leading-relaxed">
                    {artifact.finalLogTranscript}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 leading-relaxed mb-4 font-light">
                    {artifact.brief}
                  </p>
                )}

                <div className="text-xs font-mono text-slate-400 space-y-1 mb-4">
                  <div>Resting site: <span className="text-slate-200">{artifact.coordinates.landingSite}</span></div>
                  <div>Final silence: <span className="text-slate-200">{artifact.finalSignalDate}</span> ({artifact.operationalDays} operational days)</div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={(e) => handleSalute(artifact.id, e)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 text-xs font-mono text-amber-400 hover:bg-amber-500 hover:text-slate-950 transition-all active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>TRANSMIT SALUTE ({saluteCount})</span>
                </button>

                <div className="flex items-center gap-1 text-xs font-mono text-slate-400 group-hover:text-white transition-colors">
                  <Eye className="w-3.5 h-3.5" />
                  <span>VIEW RELIC</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
