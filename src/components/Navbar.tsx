import React, { useState } from 'react';
import type { ViewMode } from '../types';
import { museumAudio } from '../utils/audio';
import { 
  MapPin, 
  Clock, 
  Heart, 
  Volume2, 
  VolumeX, 
  Sparkles,
  Radio,
  Layers
} from 'lucide-react';

interface NavbarProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onSelectView,
}) => {
  const [isAudioActive, setIsAudioActive] = useState(false);

  const handleAudioToggle = () => {
    const active = museumAudio.toggleAmbiance();
    setIsAudioActive(active);
  };

  const navItems: { id: ViewMode; label: string; icon: React.ReactNode }[] = [
    { id: 'archive', label: 'Artifact Archive', icon: <Layers className="w-4 h-4" /> },
    { id: 'map', label: 'Planetary Radar', icon: <MapPin className="w-4 h-4" /> },
    { id: 'timeline', label: 'Chronometer', icon: <Clock className="w-4 h-4" /> },
    { id: 'memorial', label: 'Silent Witnesses', icon: <Heart className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#05070e]/90 backdrop-blur-md">
      {/* Top Telemetry Ticker */}
      <div className="border-b border-slate-900 bg-slate-950/60 px-4 py-1 text-[10px] font-mono text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-amber-400">
            <Radio className="w-3 h-3 animate-pulse" />
            LIVE LINK: DSN GOLDSTONE // CANBERRA // MADRID
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline text-slate-400">
            NASA SPACE APPS 2026 // MONUMENTS OF INTERPLANETARY EXPLORATION
          </span>
        </div>

        <div className="flex items-center gap-3 font-mono">
          <span>UTC: {new Date().toISOString().slice(0, 10)}</span>
          <span className="text-emerald-400">STATUS: ARCHIVE UNSEALED</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Logo & Brand */}
          <div 
            onClick={() => {
              museumAudio.playClick(900);
              onSelectView('archive');
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/40 bg-gradient-to-br from-amber-500/20 to-transparent text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)] group-hover:border-amber-400 transition-all">
              <Sparkles className="h-5 w-5 animate-[spin_12s_linear_infinite]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold tracking-widest text-white font-mono">
                  AFTERLIGHT
                </span>
                <span className="hidden sm:inline text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700">
                  DIGITAL MUSEUM
                </span>
              </div>
              <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                Abandoned but Not Forgotten
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-950/70 p-1">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    museumAudio.playClick(850);
                    onSelectView(item.id);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                    isActive
                      ? 'bg-slate-800 text-white shadow-md border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <span className={isActive ? 'text-amber-400' : 'text-slate-500'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Audio Synthesizer Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleAudioToggle}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                isAudioActive
                  ? 'border-amber-500/50 bg-amber-500/10 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
              title="Toggle Space Drone Synthesizer Soundscape"
            >
              {isAudioActive ? (
                <>
                  <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span className="hidden sm:inline">AMBIANCE: ON</span>
                  {/* Miniature audio visualizer */}
                  <div className="flex items-end gap-0.5 h-3 ml-1">
                    <span className="w-0.5 bg-amber-400 h-2 animate-[pulse_0.6s_ease-in-out_infinite]" />
                    <span className="w-0.5 bg-amber-400 h-3 animate-[pulse_0.4s_ease-in-out_infinite]" />
                    <span className="w-0.5 bg-amber-400 h-1.5 animate-[pulse_0.8s_ease-in-out_infinite]" />
                  </div>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-slate-500" />
                  <span className="hidden sm:inline">AMBIANCE: OFF</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile View Selector */}
        <div className="flex md:hidden items-center justify-between overflow-x-auto py-2 border-t border-slate-900 gap-1">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  museumAudio.playClick(850);
                  onSelectView(item.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-mono whitespace-nowrap ${
                  isActive ? 'bg-slate-800 text-white font-medium' : 'text-slate-400'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
