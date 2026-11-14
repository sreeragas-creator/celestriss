import React from 'react';
import { museumAudio } from '../utils/audio';
import { Sparkles, MapPin, ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  onExplore: () => void;
  onOpenMap: () => void;
  totalArtifacts: number;
  moonCount: number;
  marsCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplore,
  onOpenMap,
  totalArtifacts,
  moonCount,
  marsCount,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-gradient-to-b from-[#090e1d] via-[#060913] to-[#04060c] p-6 sm:p-12 mb-10 shadow-2xl">
      {/* Background Starfield and Radial Atmospheric Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-sky-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-amber-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle coordinate overlay */}
      <div className="absolute top-4 right-6 font-mono text-[10px] text-slate-400 hidden lg:block text-right pointer-events-none">
        <div>ORBIT: LUNAR-MARTIAN LAGRANGE ARCHIVE</div>
        <div>OPTICAL RESOLUTION: 0.05m / PIXEL</div>
        <div>SURFACE TELEMETRY: REAL-TIME LINK</div>
      </div>

      <div className="relative z-10 max-w-3xl space-y-6">
        {/* Category Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-mono text-amber-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>NASA SPACE APPS 2026 // DIGITAL SCI-FI MUSEUM</span>
        </div>

        {/* Main Headline */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-sans">
            Abandoned, but <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">Not Forgotten.</span>
          </h1>
          <p className="text-sm sm:text-lg text-slate-300 font-light leading-relaxed max-w-2xl">
            A cinematic interactive memorial honoring humanity's silent technological monuments resting across the craters of the Moon and the red plains of Mars.
          </p>
        </div>

        {/* Interactive Action CTAs */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => {
              museumAudio.playClick(900);
              onExplore();
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-mono text-xs font-bold hover:bg-amber-400 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] active:scale-95"
          >
            <span>ENTER THE ARCHIVE</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              museumAudio.playClick(850);
              onOpenMap();
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-700 bg-slate-900/80 text-slate-200 font-mono text-xs font-medium hover:bg-slate-800 hover:border-slate-600 transition-all active:scale-95"
          >
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>ORBITAL SURFACE RADAR</span>
          </button>
        </div>

        {/* Stat Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80 text-xs font-mono">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-900">
            <div className="text-slate-400 text-[10px]">TOTAL MONUMENTS</div>
            <div className="text-xl font-bold text-white mt-1">{totalArtifacts} Artifacts</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-900">
            <div className="text-slate-400 text-[10px]">THE MOON (LUNA)</div>
            <div className="text-xl font-bold text-slate-200 mt-1">{moonCount} Sites</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-900">
            <div className="text-slate-400 text-[10px]">MARS (ARES)</div>
            <div className="text-xl font-bold text-amber-400 mt-1">{marsCount} Relics</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-900">
            <div className="text-slate-400 text-[10px]">CUMULATIVE TRAVERSE</div>
            <div className="text-xl font-bold text-emerald-400 mt-1">137+ km</div>
          </div>
        </div>
      </div>
    </div>
  );
};
