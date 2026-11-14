import React, { useState } from 'react';
import { museumAudio } from '../utils/audio';
import { ArrowUpRight, Compass } from 'lucide-react';

interface HeroSectionProps {
  onExplore: () => void;
  onOpenMap: () => void;
  totalArtifacts: number;
  moonCount: number;
  marsCount: number;
  deepSpaceCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplore,
  onOpenMap,
  totalArtifacts,
  moonCount,
  marsCount,
  deepSpaceCount,
}) => {
  const [activePlanet, setActivePlanet] = useState<'moon' | 'mars'>('moon');

  const handlePlanetToggle = (planet: 'moon' | 'mars') => {
    museumAudio.playClick(planet === 'moon' ? 900 : 750);
    setActivePlanet(planet);
  };

  return (
    <section className="relative w-full min-h-[580px] lg:min-h-[640px] flex items-center mb-12 sm:mb-16 pt-6 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-slate-800/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Two-Sided NOVA Layout Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* LEFT COLUMN: Editorial Typography & Actions (5 cols) */}
        <div className="lg:col-span-6 space-y-6 z-10">
          
          {/* Status pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-slate-300 uppercase">
              ARCHIVAL TELEMETRY ONLINE // SECTOR: SOL-IV
            </span>
          </div>

          {/* Thin Uppercase NOVA Headline */}
          <div className="space-y-1">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-light tracking-[0.14em] text-white uppercase leading-[1.08]">
              ABANDONED.
              <br />
              <span className="text-slate-300">BUT NOT</span>
              <br />
              <span className="text-white">FORGOTTEN.</span>
            </h1>
          </div>

          {/* Editorial Description */}
          <p className="text-sm sm:text-base text-slate-400 font-sans font-light leading-relaxed max-w-lg">
            A minimalist digital museum documenting humanity’s silent technological monuments resting in perpetual vacuum across the Moon, the red plains of Mars, and the outer void.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={() => {
                museumAudio.playClick(900);
                onExplore();
              }}
              className="px-6 py-2.5 rounded-full bg-white text-slate-950 font-heading text-xs font-normal tracking-wider hover:bg-slate-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.15)] flex items-center gap-2 active:scale-95"
            >
              <span>EXPLORE ARCHIVE</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                museumAudio.playClick(850);
                onOpenMap();
              }}
              className="px-6 py-2.5 rounded-full nova-glass text-slate-300 hover:text-white font-heading text-xs font-light tracking-wider hover:border-white/20 transition-all flex items-center gap-2 active:scale-95"
            >
              <Compass className="w-3.5 h-3.5 text-slate-400" />
              <span>SURFACE RADAR</span>
            </button>
          </div>

          {/* Minimalist Telemetry Indicator Strip */}
          <div className="grid grid-cols-4 gap-2 pt-6 border-t border-white/5 font-mono text-xs">
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest">Total</div>
              <div className="text-lg font-normal text-white mt-0.5">{totalArtifacts}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest">Moon</div>
              <div className="text-lg font-normal text-slate-300 mt-0.5">{moonCount}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest">Mars</div>
              <div className="text-lg font-normal text-amber-300/90 mt-0.5">{marsCount}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest">Deep Space</div>
              <div className="text-lg font-normal text-sky-300/90 mt-0.5">{deepSpaceCount}</div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Massive Cinematic Planetary Visual (6 cols) */}
        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[380px] sm:min-h-[460px] lg:min-h-[520px]">
          
          {/* Subtle concentric orbital rings */}
          <div className="absolute w-[360px] sm:w-[480px] lg:w-[540px] h-[360px] sm:h-[480px] lg:h-[540px] rounded-full border border-white/[0.04] pointer-events-none animate-[spin_120s_linear_infinite]" />
          <div className="absolute w-[290px] sm:w-[390px] lg:w-[430px] h-[290px] sm:h-[390px] lg:h-[430px] rounded-full border border-dashed border-white/[0.06] pointer-events-none" />

          {/* Elliptical tilted orbital trajectory line */}
          <div 
            className="absolute w-[440px] sm:w-[560px] h-[180px] sm:h-[220px] rounded-[100%] border border-white/[0.08] pointer-events-none -rotate-12"
          />

          {/* The Planetary Sphere with realistic side-lighting */}
          <div className="relative w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 rounded-full overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.9)] border border-white/5 group">
            
            {/* Texture background depending on Luna vs Ares */}
            {activePlanet === 'moon' ? (
              <div 
                className="w-full h-full bg-cover bg-center transition-all duration-700 filter contrast-[1.12] brightness-90"
                style={{
                  backgroundImage: `radial-gradient(circle at 35% 35%, #2a3342 0%, #151a24 45%, #080b11 75%, #020408 100%)`
                }}
              >
                {/* Lunar Mare Basins Overlay */}
                <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-400 via-slate-700 to-black pointer-events-none" />
              </div>
            ) : (
              <div 
                className="w-full h-full bg-cover bg-center transition-all duration-700 filter contrast-[1.15] brightness-90"
                style={{
                  backgroundImage: `radial-gradient(circle at 35% 35%, #c2410c 0%, #7c2d12 45%, #2a110a 75%, #040203 100%)`
                }}
              >
                {/* Martian Surface Relief Overlay */}
                <div className="absolute inset-0 opacity-45 mix-blend-overlay bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-amber-500 via-orange-950 to-black pointer-events-none" />
              </div>
            )}

            {/* Dramatic Crescent Limb Terminator Line Lighting */}
            <div 
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                boxShadow: activePlanet === 'moon'
                  ? 'inset 18px 18px 40px rgba(255, 255, 255, 0.45), inset -30px -30px 60px rgba(0, 0, 0, 0.95)'
                  : 'inset 18px 18px 45px rgba(251, 146, 60, 0.55), inset -30px -30px 60px rgba(0, 0, 0, 0.95)'
              }}
            />

            {/* Planetary Atmospheric Rim Glow */}
            <div 
              className="absolute inset-0 rounded-full pointer-events-none opacity-60"
              style={{
                boxShadow: activePlanet === 'moon'
                  ? '0 0 50px rgba(148, 163, 184, 0.15)'
                  : '0 0 50px rgba(234, 88, 12, 0.25)'
              }}
            />
          </div>

          {/* Floating Glass Telemetry Information Tag 1 (Top Right) */}
          <div className="absolute top-4 sm:top-10 right-0 sm:right-4 nova-glass px-3.5 py-2 rounded-xl text-left font-mono text-[11px] border border-white/10 shadow-2xl animate-fade-in">
            <div className="flex items-center gap-1.5 text-slate-400 text-[9px] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>{activePlanet === 'moon' ? 'TRANQUILITY BASE' : 'MERIDIANI PLANUM'}</span>
            </div>
            <div className="text-white font-normal mt-0.5 text-xs">
              {activePlanet === 'moon' ? 'Apollo 11 Eagle' : 'Opportunity MER-B'}
            </div>
            <div className="text-[10px] text-slate-400">
              {activePlanet === 'moon' ? '0.6741° N, 23.4730° E' : '2.2570° S, 354.7640° E'}
            </div>
          </div>

          {/* Floating Glass Telemetry Information Tag 2 (Bottom Left) */}
          <div className="absolute bottom-4 sm:bottom-8 left-0 sm:left-4 nova-glass px-3.5 py-2 rounded-xl text-left font-mono text-[11px] border border-white/10 shadow-2xl animate-fade-in hidden sm:block">
            <div className="flex items-center gap-1.5 text-slate-400 text-[9px] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>{activePlanet === 'moon' ? 'HADLEY RILLE' : 'JEZERO CRATER'}</span>
            </div>
            <div className="text-white font-normal mt-0.5 text-xs">
              {activePlanet === 'moon' ? 'LRV-001 (Apollo 15)' : 'Ingenuity Helicopter'}
            </div>
            <div className="text-[10px] text-slate-400">
              {activePlanet === 'moon' ? '26.1322° N, 3.6339° E' : '18.4447° N, 77.4508° E'}
            </div>
          </div>

          {/* Interactive Celestial Planet Selector Pill (Bottom Center) */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 nova-glass p-1 rounded-full border border-white/10 flex items-center gap-1 z-20">
            <button
              onClick={() => handlePlanetToggle('moon')}
              className={`px-3 py-1 rounded-full text-[11px] font-heading tracking-wider transition-all ${
                activePlanet === 'moon'
                  ? 'bg-white/15 text-white font-normal'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              LUNA
            </button>
            <button
              onClick={() => handlePlanetToggle('mars')}
              className={`px-3 py-1 rounded-full text-[11px] font-heading tracking-wider transition-all ${
                activePlanet === 'mars'
                  ? 'bg-amber-500/20 text-amber-300 font-normal border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ARES
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
