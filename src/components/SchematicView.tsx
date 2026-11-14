import React from 'react';
import type { Artifact } from '../types';

interface SchematicViewProps {
  artifact: Artifact;
  compact?: boolean;
}

export const SchematicView: React.FC<SchematicViewProps> = ({ artifact, compact = false }) => {
  const type = artifact.imageTheme.schematicType;
  const color = artifact.imageTheme.accentColor;

  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-lg border border-slate-800 bg-[#070b14]/90 ${compact ? 'h-48' : 'h-72 w-full'}`}>
      {/* Background Reticle Grid */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Target Reticle Rings with slow spin animation */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
        <div className="w-48 h-48 rounded-full border border-dashed border-slate-500 animate-[spin_60s_linear_infinite]" />
        <div className="absolute w-36 h-36 rounded-full border border-slate-600/50" />
      </div>

      {/* Top Left HUD Coordinates */}
      <div className="absolute top-2.5 left-3 text-[10px] font-mono text-slate-400 tracking-wider flex items-center gap-1.5 z-10">
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
        <span>{artifact.archivalId}</span>
      </div>

      {/* Top Right Status Badge */}
      <div className="absolute top-2.5 right-3 text-[10px] font-mono text-slate-400 uppercase tracking-widest z-10">
        {artifact.celestialBody.replace('_', ' ').toUpperCase()} // {artifact.category.replace('_', ' ').toUpperCase()}
      </div>

      {/* SVG Vector Graphic Schematics with subtle animation elements */}
      <div className="relative z-10 flex items-center justify-center p-4">
        {type === 'rover' && (
          <svg className={compact ? 'w-36 h-28' : 'w-56 h-44'} viewBox="0 0 200 150" fill="none" stroke="currentColor">
            {/* Rocker-Bogie Chassis */}
            <path d="M 50 100 L 90 75 L 140 80 L 165 110" stroke={color} strokeWidth="3" strokeLinecap="round" />
            <path d="M 90 75 L 75 110" stroke={color} strokeWidth="2.5" />
            
            {/* Animated Wheels with slow rotation feel */}
            <g className="animate-[spin_20s_linear_infinite]" style={{ transformOrigin: '50px 115px' }}>
              <circle cx="50" cy="115" r="14" stroke="#e2e8f0" strokeWidth="2" fill="#0b111e" />
              <circle cx="50" cy="115" r="5" fill={color} />
              <line x1="50" y1="103" x2="50" y2="127" stroke={color} strokeWidth="1" />
            </g>
            <g className="animate-[spin_20s_linear_infinite]" style={{ transformOrigin: '78px 118px' }}>
              <circle cx="78" cy="118" r="14" stroke="#e2e8f0" strokeWidth="2" fill="#0b111e" />
              <circle cx="78" cy="118" r="5" fill={color} />
              <line x1="78" y1="106" x2="78" y2="130" stroke={color} strokeWidth="1" />
            </g>
            <g className="animate-[spin_20s_linear_infinite]" style={{ transformOrigin: '165px 115px' }}>
              <circle cx="165" cy="115" r="14" stroke="#e2e8f0" strokeWidth="2" fill="#0b111e" />
              <circle cx="165" cy="115" r="5" fill={color} />
              <line x1="165" y1="103" x2="165" y2="127" stroke={color} strokeWidth="1" />
            </g>

            {/* Equipment Body */}
            <rect x="75" y="55" width="70" height="30" rx="3" stroke="#e2e8f0" strokeWidth="2" fill="#111827" fillOpacity="0.8" />
            
            {/* Solar Array Deck */}
            <polygon points="65,55 155,55 145,45 75,45" stroke={color} strokeWidth="1.5" fill="#1e293b" />
            
            {/* Camera Mast */}
            <path d="M 130 45 L 130 18" stroke={color} strokeWidth="2.5" />
            <rect x="122" y="10" width="16" height="10" rx="2" stroke="#e2e8f0" strokeWidth="1.5" fill="#0b111e" />
            <circle cx="127" cy="15" r="2.5" fill={color} />
            <circle cx="134" cy="15" r="1.5" fill="#38bdf8" />

            {/* Robotic Arm */}
            <path d="M 145 70 L 175 60 L 180 80" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 2" />
            <circle cx="180" cy="80" r="3" fill={color} />
          </svg>
        )}

        {type === 'lander' && (
          <svg className={compact ? 'w-36 h-28' : 'w-56 h-44'} viewBox="0 0 200 160" fill="none" stroke="currentColor">
            {/* Descent Stage Body / Octagon */}
            <polygon points="70,55 130,55 150,85 130,110 70,110 50,85" stroke="#e2e8f0" strokeWidth="2.5" fill="#111827" fillOpacity="0.85" />
            
            {/* Descent Engine Bell */}
            <polygon points="90,110 110,110 120,135 80,135" stroke={color} strokeWidth="2" fill="#1f2937" />

            {/* Landing Legs */}
            <line x1="60" y1="95" x2="25" y2="140" stroke={color} strokeWidth="3" strokeLinecap="round" />
            <line x1="25" y1="140" x2="60" y2="120" stroke="#94a3b8" strokeWidth="1.5" />
            <rect x="15" y="138" width="20" height="4" rx="1" fill="#e2e8f0" />

            <line x1="140" y1="95" x2="175" y2="140" stroke={color} strokeWidth="3" strokeLinecap="round" />
            <line x1="175" y1="140" x2="140" y2="120" stroke="#94a3b8" strokeWidth="1.5" />
            <rect x="165" y="138" width="20" height="4" rx="1" fill="#e2e8f0" />

            {/* Radar / Antenna Mast */}
            <line x1="100" y1="55" x2="100" y2="25" stroke="#94a3b8" strokeWidth="2" />
            <path d="M 85 25 Q 100 10 115 25" stroke={color} strokeWidth="2" fill="none" />
            <circle cx="100" cy="18" r="2.5" fill={color} className="animate-ping" />

            {/* Plaque / Modular Bay */}
            <rect x="85" y="75" width="30" height="20" rx="1" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
          </svg>
        )}

        {type === 'helicopter' && (
          <svg className={compact ? 'w-36 h-28' : 'w-56 h-44'} viewBox="0 0 200 150" fill="none" stroke="currentColor">
            {/* Top Solar Panel */}
            <rect x="75" y="15" width="50" height="10" rx="2" stroke={color} strokeWidth="2" fill="#1e293b" />
            
            {/* Rotor Mast */}
            <line x1="100" y1="25" x2="100" y2="65" stroke="#94a3b8" strokeWidth="3" />

            {/* Upper Rotor Blade */}
            <ellipse cx="100" cy="35" rx="75" ry="5" stroke="#e2e8f0" strokeWidth="2" fill="none" />
            {/* Lower Counter-Rotating Rotor Blade */}
            <ellipse cx="100" cy="48" rx="70" ry="5" stroke={color} strokeWidth="2" fill="none" />

            {/* Avionics Box */}
            <rect x="85" y="65" width="30" height="28" rx="3" stroke="#e2e8f0" strokeWidth="2" fill="#111827" />
            <circle cx="100" cy="79" r="4" fill={color} />

            {/* 4 Carbon Fiber Legs */}
            <line x1="85" y1="90" x2="45" y2="135" stroke="#94a3b8" strokeWidth="2.5" />
            <circle cx="45" cy="135" r="3" fill="#e2e8f0" />

            <line x1="115" y1="90" x2="155" y2="135" stroke="#94a3b8" strokeWidth="2.5" />
            <circle cx="155" cy="135" r="3" fill="#e2e8f0" />
          </svg>
        )}

        {type === 'vehicle' && (
          <svg className={compact ? 'w-36 h-28' : 'w-56 h-44'} viewBox="0 0 200 150" fill="none" stroke="currentColor">
            {/* Rover Chassis Frame */}
            <line x1="40" y1="95" x2="160" y2="95" stroke={color} strokeWidth="3" />
            <line x1="80" y1="95" x2="90" y2="65" stroke="#94a3b8" strokeWidth="2" />
            <line x1="120" y1="95" x2="110" y2="65" stroke="#94a3b8" strokeWidth="2" />

            {/* Wire Mesh Wheels */}
            <circle cx="45" cy="108" r="18" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="3 2" fill="#0b111e" />
            <circle cx="45" cy="108" r="6" fill={color} />

            <circle cx="155" cy="108" r="18" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="3 2" fill="#0b111e" />
            <circle cx="155" cy="108" r="6" fill={color} />

            {/* Lawn-Chair Seats */}
            <path d="M 85 90 L 85 65 L 100 65 L 105 85" stroke="#e2e8f0" strokeWidth="2" fill="none" />
            <path d="M 105 90 L 105 65 L 120 65 L 125 85" stroke="#e2e8f0" strokeWidth="2" fill="none" />

            {/* High Gain Parabolic Dish Antenna */}
            <line x1="140" y1="90" x2="145" y2="40" stroke="#94a3b8" strokeWidth="2" />
            <path d="M 130 30 Q 145 20 160 30" stroke={color} strokeWidth="2.5" fill="none" />
            <line x1="145" y1="23" x2="145" y2="15" stroke={color} strokeWidth="2" />

            {/* TV Camera */}
            <rect x="150" y="45" width="14" height="10" rx="1" stroke="#e2e8f0" strokeWidth="1.5" fill="#1e293b" />
          </svg>
        )}

        {type === 'package' && (
          <svg className={compact ? 'w-36 h-28' : 'w-56 h-44'} viewBox="0 0 200 150" fill="none" stroke="currentColor">
            {/* ALSEP Central Station Box */}
            <rect x="70" y="70" width="60" height="40" rx="2" stroke="#e2e8f0" strokeWidth="2.5" fill="#111827" />
            
            {/* Helical S-band Antenna Mast */}
            <line x1="100" y1="70" x2="100" y2="25" stroke={color} strokeWidth="2" />
            <path d="M 94 30 Q 106 35 94 40 Q 106 45 94 50" stroke={color} strokeWidth="2" fill="none" />
            <circle cx="100" cy="22" r="3" fill="#38bdf8" className="animate-pulse" />

            {/* SNAP-27 RTG Radiator Cask */}
            <rect x="25" y="80" width="28" height="32" rx="3" stroke="#f59e0b" strokeWidth="2" fill="#1e293b" />
            <line x1="25" y1="88" x2="53" y2="88" stroke="#f59e0b" strokeWidth="1" />
            <line x1="25" y1="96" x2="53" y2="96" stroke="#f59e0b" strokeWidth="1" />
            <line x1="25" y1="104" x2="53" y2="104" stroke="#f59e0b" strokeWidth="1" />
            <circle cx="39" cy="96" r="3" fill="#f59e0b" className="animate-ping" />

            {/* Power cable connector connecting RTG to Central Station */}
            <path d="M 53 100 Q 62 110 70 95" stroke="#94a3b8" strokeWidth="2" strokeDasharray="2 2" fill="none" />

            {/* Passive Seismometer & Solar Wind sensor on ground */}
            <rect x="145" y="95" width="22" height="16" rx="2" stroke="#38bdf8" strokeWidth="1.5" fill="#0f172a" />
            <path d="M 130 95 Q 138 108 145 104" stroke="#94a3b8" strokeWidth="2" strokeDasharray="2 2" fill="none" />
          </svg>
        )}

        {type === 'probe' && (
          <svg className={compact ? 'w-36 h-28' : 'w-56 h-44'} viewBox="0 0 200 150" fill="none" stroke="currentColor">
            {/* High Gain Parabolic Dish */}
            <ellipse cx="100" cy="70" rx="34" ry="24" stroke="#e2e8f0" strokeWidth="2.5" fill="#111827" />
            <circle cx="100" cy="70" r="6" fill={color} />
            <line x1="100" y1="70" x2="100" y2="40" stroke={color} strokeWidth="2" />
            <circle cx="100" cy="38" r="2.5" fill="#38bdf8" className="animate-ping" />

            {/* Radio transmission ripples */}
            <path d="M 85 30 Q 100 20 115 30" stroke={color} strokeWidth="1.5" strokeDasharray="3 2" fill="none" className="animate-pulse" />
            <path d="M 75 22 Q 100 10 125 22" stroke={color} strokeWidth="1" strokeDasharray="3 3" fill="none" />

            {/* Extended Solar Panels / Boom Arms */}
            <line x1="66" y1="70" x2="15" y2="70" stroke={color} strokeWidth="3" />
            <rect x="15" y="58" width="45" height="24" rx="2" stroke="#e2e8f0" strokeWidth="1.5" fill="#1e293b" />

            <line x1="134" y1="70" x2="185" y2="70" stroke={color} strokeWidth="3" />
            <rect x="140" y="58" width="45" height="24" rx="2" stroke="#e2e8f0" strokeWidth="1.5" fill="#1e293b" />

            {/* RTG / Sensor boom */}
            <line x1="100" y1="94" x2="100" y2="135" stroke="#94a3b8" strokeWidth="2" />
            <rect x="90" y="130" width="20" height="10" rx="1" stroke={color} strokeWidth="1.5" fill="#0f172a" />
          </svg>
        )}

        {type === 'telescope' && (
          <svg className={compact ? 'w-36 h-28' : 'w-56 h-44'} viewBox="0 0 200 150" fill="none" stroke="currentColor">
            {/* Schmidt Telescope Cylinder Tube */}
            <polygon points="50,45 150,30 155,95 55,110" stroke="#e2e8f0" strokeWidth="2.5" fill="#111827" />
            
            {/* Aperture Opening Oval */}
            <ellipse cx="52" cy="77" rx="12" ry="32" stroke={color} strokeWidth="2" fill="#0f172a" />
            <circle cx="52" cy="77" r="4" fill="#38bdf8" className="animate-pulse" />

            {/* Curved Solar Shield on top */}
            <path d="M 52 45 Q 100 32 150 30" stroke={color} strokeWidth="3" fill="none" />
            
            {/* Reaction Wheel / Avionics Bus on rear */}
            <rect x="152" y="42" width="22" height="48" rx="2" stroke="#94a3b8" strokeWidth="2" fill="#1e293b" />
            <circle cx="163" cy="66" r="5" stroke={color} strokeWidth="1.5" fill="#0b111e" />

            {/* Star Transit Beam line */}
            <line x1="40" y1="77" x2="10" y2="77" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" className="animate-pulse" />
          </svg>
        )}
      </div>

      {/* Subtle Scanlines effect */}
      <div className="absolute inset-0 pointer-events-none scanlines-overlay opacity-30" />

      {/* Bottom Telemetry Bar */}
      <div className="absolute bottom-2 left-3 right-3 flex justify-between items-center text-[9px] font-mono text-slate-400 border-t border-slate-800/80 pt-1.5 z-10">
        <span>STATUS: {artifact.status.replace('_', ' ').toUpperCase()}</span>
        <span>SYS: RECORD VERIFIED</span>
      </div>
    </div>
  );
};
