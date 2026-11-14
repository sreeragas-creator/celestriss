import React, { useState } from 'react';
import type { ViewMode } from '../types';
import { museumAudio } from '../utils/audio';
import { 
  Volume2, 
  VolumeX, 
  Search, 
  Bell, 
  CircleDot,
  Sparkles,
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
  const [showNotice, setShowNotice] = useState(false);

  const handleAudioToggle = () => {
    const active = museumAudio.toggleAmbiance();
    setIsAudioActive(active);
  };

  const navItems: { id: ViewMode; label: string; highlight?: boolean }[] = [
    { id: 'overview', label: 'Home' },
    { id: 'story', label: '📖 Story Mode', highlight: true },
    { id: 'lab', label: '🚀 Rocket Lab', highlight: true },
    { id: 'quest', label: '🔍 Detective Quest', highlight: true },
    { id: 'timeline', label: 'Timeline' },
    { id: 'moon', label: 'Moon' },
    { id: 'mars', label: 'Mars' },
    { id: 'deep_space', label: 'Deep Space' },
    { id: 'memorial', label: 'Memorial' },
  ];

  return (
    <header className="sticky top-4 z-50 w-full max-w-7xl mx-auto px-4 sm:px-6">
      {/* Floating Glass Pill Container */}
      <div className="nova-glass rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 shadow-[0_16px_40px_rgba(0,0,0,0.8)] border border-white/10">
        
        {/* Brand */}
        <div 
          onClick={() => {
            museumAudio.playClick(900);
            onSelectView('overview');
          }}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-2 h-2 rounded-full bg-amber-400 group-hover:scale-125 transition-transform shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
          <span className="font-heading font-light tracking-[0.25em] text-sm text-white uppercase">
            AFTERLIGHT
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  museumAudio.playClick(850);
                  onSelectView(item.id);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-heading tracking-wide transition-all ${
                  isActive
                    ? 'bg-white/15 text-white font-normal border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.06)]'
                    : item.highlight
                    ? 'text-amber-300 hover:text-white hover:bg-white/5 font-medium'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 font-light'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Utility Controls */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Junior Explorer Mode Toggle */}
          <button
            onClick={() => {
              museumAudio.playScanPing();
              onToggleJuniorMode();
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold transition-all border ${
              isJuniorMode
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/20'
            }`}
            title="Toggle Junior Explorer Mode (School-age friendly)"
          >
            {isJuniorMode ? (
              <>
                <Rocket className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">JUNIOR EXPLORER</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">ARCHIVE MODE</span>
              </>
            )}
          </button>

          {/* Quick Search */}
          <button
            onClick={() => {
              museumAudio.playClick(800);
              onOpenSearch();
            }}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
            title="Search Relics & Missions"
          >
            <Search className="w-3.5 h-3.5" />
          </button>

          {/* 3D Tracker Pill Button */}
          <button
            onClick={() => {
              museumAudio.playClick(900);
              onSelectView('tracker');
            }}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold transition-all border ${
              currentView === 'tracker'
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                : 'bg-cyan-950/40 text-cyan-400 border-cyan-500/40 hover:bg-cyan-900/50'
            }`}
          >
            <CircleDot className="w-3 h-3 animate-pulse" />
            <span>3D TRACKER</span>
          </button>

          {/* Audio Synthesizer Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono transition-all border ${
              isAudioActive
                ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200 border-white/5 bg-white/[0.02]'
            }`}
            title="Space Drone Ambiance"
          >
            {isAudioActive ? (
              <>
                <Volume2 className="w-3 h-3 text-amber-400" />
                <span className="hidden sm:inline text-[10px]">AUDIO</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3 h-3" />
                <span className="hidden sm:inline text-[10px]">MUTE</span>
              </>
            )}
          </button>

          {/* Notification / Status Icon */}
          <div className="relative">
            <button
              onClick={() => {
                museumAudio.playClick(750);
                setShowNotice(!showNotice);
              }}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 relative"
              title="System Telemetry Status"
            >
              <Bell className="w-3.5 h-3.5" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </button>

            {showNotice && (
              <div className="absolute right-0 top-10 w-64 p-3 rounded-xl nova-glass-card shadow-2xl z-50 text-[11px] font-mono space-y-2 border border-white/10 animate-fade-in">
                <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-bold">
                  <CircleDot className="w-3 h-3 animate-pulse" />
                  <span>DSN TELEMETRY ACTIVE</span>
                </div>
                <p className="text-slate-300 font-sans text-xs font-light">
                  NASA Goldstone, Madrid & Canberra tracking stations synchronized.
                </p>
                <div className="text-[10px] text-slate-400 border-t border-white/10 pt-1.5">
                  19 historical relics monitored in vacuum.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Horizontal Scroll for Navigation */}
      <div className="flex xl:hidden items-center overflow-x-auto py-2 mt-2 gap-1 text-xs font-heading scrollbar-none">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                museumAudio.playClick(850);
                onSelectView(item.id);
              }}
              className={`px-3 py-1 rounded-full whitespace-nowrap text-xs transition-colors ${
                isActive
                  ? 'bg-white/15 text-white font-normal'
                  : item.highlight
                  ? 'text-amber-300 hover:text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
