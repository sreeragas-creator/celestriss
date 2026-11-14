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

      {/* Target Reticle Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
        <div className="w-48 h-48 rounded-full border border-dashed border-slate-500 animate-[spin_60s_linear_infinite]" />
        <div className="absolute w-36 h-36 rounded-full border border-slate-600/50" />
      </div>

      {/* Top Left HUD Coordinates */}
      <div className="absolute top-2.5 left-3 text-[10px] font-mono text-slate-400 tracking-wider flex items-center gap-1.5 z-10">
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
        <span>{artifact.archivalId}</span>
      </div>

      {/* Top Right Status Badge */}
      <div className="absolute top-2.5 right-3 text-[10px] font-mono text-slate-400 uppercase tracking-widest z-10">
        LOC: {artifact.celestialBody.toUpperCase()} // REG: {artifact.coordinates.region.slice(0, 14)}
      </div>

      {/* SVG Vector Graphic Schematics */}
      <div className="relative z-10 flex items-center justify-center p-4">
        {type === 'rover' && (
          <svg className={compact ? 'w-36 h-28' : 'w-56 h-44'} viewBox="0 0 200 150" fill="none" stroke="currentColor">
            {/* Rocker-Bogie Chassis */}
            <path d="M 50 100 L 90 75 L 140 80 L 165 110" stroke={color} strokeWidth="3" strokeLinecap="round" />
            <path d="M 90 75 L 75 110" stroke={color} strokeWidth="2.5" />
            
            {/* Wheels */}
            <circle cx="50" cy="115" r="14" stroke="#e2e8f0" strokeWidth="2" fill="#0b111e" />
            <circle cx="50" cy="115" r="5" fill={color} />
            <circle cx="78" cy="118" r="14" stroke="#e2e8f0" strokeWidth="2" fill="#0b111e" />
            <circle cx="78" cy="118" r="5" fill={color} />
            <circle cx="165" cy="115" r="14" stroke="#e2e8f0" strokeWidth="2" fill="#0b111e" />
            <circle cx="165" cy="115" r="5" fill={color} />

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
            <circle cx="100" cy="18" r="2" fill={color} />

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
      </div>

      {/* Subtle Scanlines effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%)',
          backgroundSize: '100% 4px'
        }}
      />

      {/* Bottom Telemetry Bar */}
      <div className="absolute bottom-2 left-3 right-3 flex justify-between items-center text-[9px] font-mono text-slate-500 border-t border-slate-800/80 pt-1.5 z-10">
        <span>STATUS: {artifact.status.replace('_', ' ').toUpperCase()}</span>
        <span>SYS: TELEMETRY RETRIEVED</span>
      </div>
    </div>
  );
};
