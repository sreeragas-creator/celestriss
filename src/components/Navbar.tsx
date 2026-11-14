import React, { useState, useRef, useEffect } from 'react';
import type { ViewMode } from '../types';
import { museumAudio } from '../utils/audio';
import { 
  Volume2, 
  VolumeX, 
  Search, 
  ChevronDown,
  Compass,
  Heart,
  Rocket
} from 'lucide-react';

interface NavbarProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  onOpenSearch: () => void;
  isJuniorMode: boolean;
  onToggleJuniorMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onSelectView,
  onOpenSearch,
  isJuniorMode,
  onToggleJuniorMode
}) => {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isArchiveDropdownOpen, setIsArchiveDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleAudioToggle = () => {
    const active = museumAudio.toggleAmbiance();
    setIsAudioActive(active);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsArchiveDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isExploreArchiveActive = ['moon', 'mars', 'deep_space', 'timeline', 'story', 'lab', 'quest'].includes(currentView);

  return (
    <header className="sticky top-4 z-50 w-full max-w-7xl mx-auto px-4 sm:px-6 font-sans">
      {/* Solid Dark Frosted Glass Container with Heavy Backdrop Blur */}
      <div className="bg-[#050811]/92 backdrop-blur-md rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.92)] border border-white/10">
        
        {/* Brand with Glowing Amber Dot */}
        <div 
          onClick={() => {
            museumAudio.playClick(900);
            onSelectView('overview');
          }}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 group-hover:scale-125 transition-transform shadow-[0_0_12px_rgba(245,158,11,0.9)] animate-pulse" />
          <span className="font-heading font-light tracking-[0.25em] text-sm text-white uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
            AFTERLIGHT
          </span>
        </div>

        {/* Consolidate Center Navigation: Home, Explore Archive (dropdown), 3D Tracker, Memorial */}
        <nav className="hidden md:flex items-center gap-1.5 font-heading text-xs tracking-wider">
          
          {/* 1. Home (Active State) */}
          <button
            onClick={() => {
              museumAudio.playClick(850);
              onSelectView('overview');
            }}
            className={`px-4 py-1.5 rounded-full transition-all ${
              currentView === 'overview'
                ? 'bg-white/15 text-white font-medium border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.08)]'
                : 'text-slate-300 hover:text-white hover:bg-white/5 font-light'
            }`}
          >
            Home
          </button>

          {/* 2. Explore Archive (with Dropdown Indicator) */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => {
                museumAudio.playClick(800);
                setIsArchiveDropdownOpen(!isArchiveDropdownOpen);
              }}
              className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                isExploreArchiveActive
                  ? 'bg-white/15 text-white font-medium border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.08)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5 font-light'
              }`}
            >
              <span>Explore Archive</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isArchiveDropdownOpen ? 'rotate-180 text-white' : ''}`} />
            </button>

            {/* Dropdown Menu Overlay */}
            {isArchiveDropdownOpen && (
              <div className="absolute left-0 top-10 w-64 p-2 rounded-2xl bg-[#050811]/95 backdrop-blur-xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.95)] z-50 space-y-1 animate-fade-in text-xs font-mono">
                <div className="text-[10px] text-slate-400 px-3 py-1.5 uppercase tracking-widest border-b border-white/10 font-bold">
                  PLANETARY ARCHIVES
                </div>

                <button
                  onClick={() => {
                    museumAudio.playClick(850);
                    onSelectView('moon');
                    setIsArchiveDropdownOpen(false);
                  }}
                  className={`w-full p-2 rounded-xl text-left flex items-center justify-between hover:bg-white/10 transition-colors ${
                    currentView === 'moon' ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/40' : 'text-slate-300'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-sm">🌕</span>
                    <span className="font-heading">Moon Archive</span>
                  </span>
                  <span className="text-[10px] text-cyan-400">7 Sites</span>
                </button>

                <button
                  onClick={() => {
                    museumAudio.playClick(850);
                    onSelectView('mars');
                    setIsArchiveDropdownOpen(false);
                  }}
                  className={`w-full p-2 rounded-xl text-left flex items-center justify-between hover:bg-white/10 transition-colors ${
                    currentView === 'mars' ? 'bg-amber-950/60 text-amber-300 border border-amber-500/40' : 'text-slate-300'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-sm">🔴</span>
                    <span className="font-heading">Mars Archive</span>
                  </span>
                  <span className="text-[10px] text-amber-400">8 Relics</span>
                </button>

                <button
                  onClick={() => {
                    museumAudio.playClick(850);
                    onSelectView('deep_space');
                    setIsArchiveDropdownOpen(false);
                  }}
                  className={`w-full p-2 rounded-xl text-left flex items-center justify-between hover:bg-white/10 transition-colors ${
                    currentView === 'deep_space' ? 'bg-purple-950/60 text-purple-300 border border-purple-500/40' : 'text-slate-300'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-sm">🌌</span>
                    <span className="font-heading">Deep Space Vault</span>
                  </span>
                  <span className="text-[10px] text-purple-400">4 Probes</span>
                </button>

                <div className="pt-1 border-t border-white/10 space-y-1">
                  <button
                    onClick={() => {
                      museumAudio.playClick(850);
                      onSelectView('story');
                      setIsArchiveDropdownOpen(false);
                    }}
                    className={`w-full p-2 rounded-xl text-left flex items-center justify-between hover:bg-white/10 transition-colors ${
                      currentView === 'story' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-300'
                    }`}
                  >
                    <span>📖 Story Chronicles</span>
                    <span className="text-[10px] text-amber-400">4 Ch.</span>
                  </button>

                  <button
                    onClick={() => {
                      museumAudio.playClick(850);
                      onSelectView('lab');
                      setIsArchiveDropdownOpen(false);
                    }}
                    className={`w-full p-2 rounded-xl text-left flex items-center justify-between hover:bg-white/10 transition-colors ${
                      currentView === 'lab' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-300'
                    }`}
                  >
                    <span>🚀 Rocket Physics Lab</span>
                    <span className="text-[10px] text-cyan-400">Δv Lab</span>
                  </button>

                  <button
                    onClick={() => {
                      museumAudio.playClick(850);
                      onSelectView('quest');
                      setIsArchiveDropdownOpen(false);
                    }}
                    className={`w-full p-2 rounded-xl text-left flex items-center justify-between hover:bg-white/10 transition-colors ${
                      currentView === 'quest' ? 'bg-purple-500/20 text-purple-300' : 'text-slate-300'
                    }`}
                  >
                    <span>🔍 Detective Case Files</span>
                    <span className="text-[10px] text-purple-400">5 Cases</span>
                  </button>

                  <button
                    onClick={() => {
                      museumAudio.playClick(850);
                      onSelectView('timeline');
                      setIsArchiveDropdownOpen(false);
                    }}
                    className={`w-full p-2 rounded-xl text-left flex items-center justify-between hover:bg-white/10 transition-colors ${
                      currentView === 'timeline' ? 'bg-white/15 text-white' : 'text-slate-300'
                    }`}
                  >
                    <span>⏱️ Interplanetary Timeline</span>
                    <span className="text-[10px] text-slate-400">1966+</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 3. 3D Tracker (with Radar/Compass Icon) */}
          <button
            onClick={() => {
              museumAudio.playClick(850);
              onSelectView('tracker');
            }}
            className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              currentView === 'tracker'
                ? 'bg-cyan-500/25 text-cyan-300 font-medium border border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                : 'text-slate-300 hover:text-white hover:bg-white/5 font-light'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>3D Tracker</span>
          </button>

          {/* 4. Memorial */}
          <button
            onClick={() => {
              museumAudio.playClick(850);
              onSelectView('memorial');
            }}
            className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              currentView === 'memorial'
                ? 'bg-white/15 text-white font-medium border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.08)]'
                : 'text-slate-300 hover:text-white hover:bg-white/5 font-light'
            }`}
          >
            <Heart className="w-3 h-3 text-rose-400" />
            <span>Memorial</span>
          </button>

        </nav>

        {/* Right Controls: Interactive Orange Pill JUNIOR EXPLORER + Search + Audio */}
        <div className="flex items-center gap-2.5 shrink-0">
          
          {/* Interactive Orange Pill Button with Rocket Icon */}
          <button
            onClick={() => {
              museumAudio.playScanPing();
              onToggleJuniorMode();
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all border ${
              isJuniorMode
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.65)] hover:scale-105 active:scale-95'
                : 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
            }`}
            title="Toggle Junior Explorer Mode"
          >
            <Rocket className="w-3.5 h-3.5 fill-current" />
            <span className="tracking-wider uppercase text-[11px]">JUNIOR EXPLORER</span>
          </button>

          {/* Quick Search Trigger Icon */}
          <button
            onClick={() => {
              museumAudio.playClick(800);
              onOpenSearch();
            }}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors border border-transparent hover:border-white/10"
            title="Search Relics & Missions"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Audio Ambiance Synthesizer Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-mono transition-all border ${
              isAudioActive
                ? 'bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                : 'text-slate-400 hover:text-slate-200 border-white/5 bg-white/[0.02]'
            }`}
            title="Ambient Space Audio"
          >
            {isAudioActive ? (
              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline text-[10px] font-mono">
              {isAudioActive ? 'AUDIO ON' : 'MUTE'}
            </span>
          </button>

        </div>

      </div>

      {/* Mobile Horizontal Navigation Strip */}
      <div className="flex md:hidden items-center overflow-x-auto py-2 mt-2 gap-1.5 text-xs font-heading scrollbar-none">
        <button
          onClick={() => {
            museumAudio.playClick(850);
            onSelectView('overview');
          }}
          className={`px-3 py-1 rounded-full whitespace-nowrap ${
            currentView === 'overview' ? 'bg-white/20 text-white' : 'text-slate-400'
          }`}
        >
          Home
        </button>
        <button
          onClick={() => {
            museumAudio.playClick(850);
            onSelectView('moon');
          }}
          className={`px-3 py-1 rounded-full whitespace-nowrap ${
            currentView === 'moon' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400'
          }`}
        >
          Moon [7]
        </button>
        <button
          onClick={() => {
            museumAudio.playClick(850);
            onSelectView('mars');
          }}
          className={`px-3 py-1 rounded-full whitespace-nowrap ${
            currentView === 'mars' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400'
          }`}
        >
          Mars [8]
        </button>
        <button
          onClick={() => {
            museumAudio.playClick(850);
            onSelectView('deep_space');
          }}
          className={`px-3 py-1 rounded-full whitespace-nowrap ${
            currentView === 'deep_space' ? 'bg-purple-500/20 text-purple-300' : 'text-slate-400'
          }`}
        >
          Deep Space [4]
        </button>
        <button
          onClick={() => {
            museumAudio.playClick(850);
            onSelectView('tracker');
          }}
          className={`px-3 py-1 rounded-full whitespace-nowrap ${
            currentView === 'tracker' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'
          }`}
        >
          3D Tracker
        </button>
        <button
          onClick={() => {
            museumAudio.playClick(850);
            onSelectView('memorial');
          }}
          className={`px-3 py-1 rounded-full whitespace-nowrap ${
            currentView === 'memorial' ? 'bg-white/20 text-white' : 'text-slate-400'
          }`}
        >
          Memorial
        </button>
      </div>

    </header>
  );
};
