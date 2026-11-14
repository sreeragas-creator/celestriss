import React, { useState } from 'react';
import { museumAudio } from '../utils/audio';
import { ArrowUpRight, Compass } from 'lucide-react';
import { HeroGlobe } from './HeroGlobe';

interface HeroSectionProps {
  onExplore: () => void;
  onOpenMap: () => void;
  totalArtifacts: number;
  moonCount: number;
  marsCount: number;
  deepSpaceCount: number;
  onSelectSite?: (siteName: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplore,
  onOpenMap,
  totalArtifacts,
  moonCount,
  marsCount,
  deepSpaceCount,
  onSelectSite,
}) => {
  const [activePlanet, setActivePlanet] = useState<'moon' | 'mars'>('moon');

  return (
    <section className="relative w-full min-h-[580px] lg:min-h-[640px] flex items-center mb-12 sm:mb-16 pt-2 overflow-hidden font-sans">
      
      {/* Background Ambience: Deep Space Radial Glows */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[650px] h-[650px] bg-sky-950/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[450px] h-[450px] bg-amber-950/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Two-Column NOVA Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* LEFT COLUMN: Editorial Scifi Typography & Actions (6 cols) */}
        <div className="lg:col-span-6 space-y-6 z-10">
          
          {/* Telemetry Status Subtext Pill */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-[#050812]/80 backdrop-blur-md shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="font-mono text-[10px] tracking-[0.25em] text-slate-300 uppercase font-medium">
              ARCHIVAL TELEMETRY ONLINE // SECTOR: SOL-IV
            </span>
          </div>

          {/* Bold, Uppercase, Spaced-out Heading */}
          <div className="space-y-1">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-light tracking-[0.15em] text-white uppercase leading-[1.06]">
              ABANDONED.
              <br />
              <span className="text-slate-300 tracking-[0.16em]">BUT NOT</span>
              <br />
              <span className="text-white drop-shadow-[0_0_35px_rgba(255,255,255,0.18)]">FORGOTTEN.</span>
            </h1>
          </div>

          {/* Sharp, Readable Small Editorial Subheading */}
          <p className="text-xs sm:text-sm text-slate-300 font-sans font-light leading-relaxed max-w-lg">
            A high-contrast digital museum documenting humanity’s silent technological monuments resting in perpetual vacuum across the Moon, the red plains of Mars, and the interstellar void.
          </p>

          {/* High-Contrast Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            
            {/* Prominent White/Glass Capsule Pill */}
            <button
              onClick={() => {
                museumAudio.playClick(900);
                onExplore();
              }}
              className="px-7 py-3 rounded-full bg-white text-slate-950 font-heading text-xs font-semibold tracking-wider hover:bg-slate-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.25)] flex items-center gap-2 active:scale-95 group"
            >
              <span>EXPLORE ARCHIVE</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Ghost-Button Style with Subtle Cyan Icon Highlights */}
            <button
              onClick={() => {
                museumAudio.playClick(850);
                onOpenMap();
              }}
              className="px-6 py-3 rounded-full nova-glass text-slate-200 hover:text-white font-heading text-xs font-light tracking-wider hover:border-cyan-400/50 transition-all flex items-center gap-2 active:scale-95 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)] group"
            >
              <Compass className="w-4 h-4 text-cyan-400 group-hover:rotate-45 transition-transform" />
              <span>3D ORBITAL TRACKER</span>
              <span className="text-cyan-400 text-xs font-mono">⌖</span>
            </button>
          </div>

          {/* Vertically Aligned Glowing Color-Coded Telemetry Stats */}
          <div className="grid grid-cols-4 gap-3 pt-6 border-t border-white/10 font-mono text-xs">
            
            <div className="space-y-1">
              <div className="text-[10px] text-slate-400 uppercase tracking-widest">TOTAL</div>
              <div className="text-xl font-normal text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                {totalArtifacts}
              </div>
              <div className="text-[9px] text-slate-500 uppercase">Relics</div>
            </div>

            <div className="space-y-1">
              <div className="text-[10px] text-cyan-400/90 uppercase tracking-widest">MOON</div>
              <div className="text-xl font-normal text-cyan-300 drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]">
                {moonCount}
              </div>
              <div className="text-[9px] text-cyan-400/60 uppercase">Sites</div>
            </div>

            <div className="space-y-1">
              <div className="text-[10px] text-amber-400/90 uppercase tracking-widest">MARS</div>
              <div className="text-xl font-normal text-amber-300 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                {marsCount}
              </div>
              <div className="text-[9px] text-amber-400/60 uppercase">Relics</div>
            </div>

            <div className="space-y-1">
              <div className="text-[10px] text-purple-400/90 uppercase tracking-widest">DEEP SPACE</div>
              <div className="text-xl font-normal text-purple-300 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                {deepSpaceCount}
              </div>
              <div className="text-[9px] text-purple-400/60 uppercase">Probes</div>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: The Vibrant 3D Centerpiece Globe (6 cols) */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          <HeroGlobe
            activePlanet={activePlanet}
            onTogglePlanet={(planet) => setActivePlanet(planet)}
            onSelectSite={onSelectSite}
          />
        </div>

      </div>
    </section>
  );
};
