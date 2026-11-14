import React, { useEffect, useRef, useState, useCallback } from 'react';
import { museumAudio } from '../utils/audio';

interface HeroGlobeProps {
  activePlanet: 'moon' | 'mars';
  onTogglePlanet: (planet: 'moon' | 'mars') => void;
  onSelectSite?: (siteName: string) => void;
}

interface Landmark {
  id: string;
  name: string;
  hardware: string;
  coordinatesDisplay: string;
  lat: number;
  lon: number;
  accentColor: string;
  beaconColor: string;
}

const LUNA_LANDMARKS: Landmark[] = [
  {
    id: 'apollo11',
    name: 'TRANQUILITY BASE',
    hardware: 'Apollo 11 Eagle',
    coordinatesDisplay: '0.6741° N, 23.4730° E',
    lat: 0.674,
    lon: 23.473,
    accentColor: '#38BDF8',
    beaconColor: '#00CFFF'
  },
  {
    id: 'apollo15',
    name: 'HADLEY-APENNINE',
    hardware: 'LRV-001 (Apollo 15)',
    coordinatesDisplay: '26.1322° N, 3.6339° E',
    lat: 26.132,
    lon: 3.634,
    accentColor: '#F59E0B',
    beaconColor: '#FFB800'
  }
];

const ARES_LANDMARKS: Landmark[] = [
  {
    id: 'meridiani',
    name: 'MERIDIANI PLANUM',
    hardware: 'Opportunity MER-B',
    coordinatesDisplay: '2.2570° S, 354.7640° E',
    lat: -2.257,
    lon: 354.764,
    accentColor: '#F59E0B',
    beaconColor: '#FFB800'
  },
  {
    id: 'jezero',
    name: 'JEZERO CRATER',
    hardware: 'Ingenuity Helicopter',
    coordinatesDisplay: '18.4447° N, 77.4508° E',
    lat: 18.445,
    lon: 77.451,
    accentColor: '#38BDF8',
    beaconColor: '#00CFFF'
  }
];

export const HeroGlobe: React.FC<HeroGlobeProps> = ({
  activePlanet,
  onTogglePlanet,
  onSelectSite
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const rotationRef = useRef<number>(activePlanet === 'moon' ? 0.4 : 1.2);
  const isDraggingRef = useRef<boolean>(false);
  const lastMouseXRef = useRef<number>(0);

  // Store projected 2D coordinates for UI overlay pins
  const [projectedPoints, setProjectedPoints] = useState<Record<string, { x: number; y: number; visible: boolean }>>({});

  const landmarks = activePlanet === 'moon' ? LUNA_LANDMARKS : ARES_LANDMARKS;

  // Draw procedural globe with crater textures, atmospheric fresnel edge glow, and terrain shading
  const renderGlobe = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.36; // vibrant size

    ctx.clearRect(0, 0, width, height);

    // Increment auto rotation if not dragging
    if (!isDraggingRef.current) {
      rotationRef.current += 0.0035;
    }
    const currentRot = rotationRef.current;

    // --- 1. Tilted Orbital Trajectory Ellipse (Behind Globe) ---
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(-0.25);
    ctx.beginPath();
    ctx.ellipse(0, 0, radius * 1.65, radius * 0.65, 0, 0, Math.PI * 2);
    ctx.strokeStyle = activePlanet === 'moon' ? 'rgba(56, 189, 248, 0.22)' : 'rgba(245, 158, 11, 0.22)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 6]);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    // --- 2. Outer Concentric Telemetry Rings ---
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 1.45, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 1.22, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // --- 3. Planetary Globe Base & Detailed Terrain ---
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.clip();

    // Planetary Base Gradient
    const baseGradient = ctx.createRadialGradient(
      centerX - radius * 0.45,
      centerY - radius * 0.45,
      radius * 0.1,
      centerX,
      centerY,
      radius
    );

    if (activePlanet === 'moon') {
      // High contrast lunar tones
      baseGradient.addColorStop(0, '#e2e8f0');
      baseGradient.addColorStop(0.25, '#94a3b8');
      baseGradient.addColorStop(0.55, '#334155');
      baseGradient.addColorStop(0.85, '#0f172a');
      baseGradient.addColorStop(1, '#020408');
    } else {
      // Rich Martian ferric tones
      baseGradient.addColorStop(0, '#fdba74');
      baseGradient.addColorStop(0.25, '#ea580c');
      baseGradient.addColorStop(0.55, '#9a3412');
      baseGradient.addColorStop(0.85, '#431407');
      baseGradient.addColorStop(1, '#040203');
    }

    ctx.fillStyle = baseGradient;
    ctx.fill();

    // --- 4. Procedural Mare Basins, Craters & Topography (Rotating with sphere) ---
    const featureCount = 18;
    for (let i = 0; i < featureCount; i++) {
      const featureAngle = (i * (Math.PI * 2 / featureCount)) + currentRot;
      const latOffset = ((i % 5) - 2) * 0.35;
      
      const fx = Math.cos(featureAngle);
      const fy = Math.sin(latOffset);
      const fz = Math.sin(featureAngle);

      // Only draw if on front hemisphere
      if (fz > -0.2) {
        const screenX = centerX + fx * radius * Math.cos(latOffset) * 0.88;
        const screenY = centerY + fy * radius * 0.88;
        const featureSize = ((i % 3) + 1) * (radius * 0.18) * Math.max(0.2, (fz + 0.4));

        ctx.save();
        ctx.beginPath();
        ctx.arc(screenX, screenY, featureSize, 0, Math.PI * 2);

        if (activePlanet === 'moon') {
          // Dark basalt Mare basins
          const mareGrad = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, featureSize);
          mareGrad.addColorStop(0, 'rgba(15, 23, 42, 0.7)');
          mareGrad.addColorStop(0.7, 'rgba(30, 41, 59, 0.45)');
          mareGrad.addColorStop(1, 'rgba(30, 41, 59, 0)');
          ctx.fillStyle = mareGrad;
          ctx.fill();

          // Subtle bright crater rim
          if (i % 2 === 0) {
            ctx.beginPath();
            ctx.arc(screenX, screenY, featureSize * 0.3, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
            ctx.fill();
          }
        } else {
          // Martian highlands and canyon rifts
          const aresGrad = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, featureSize);
          aresGrad.addColorStop(0, 'rgba(67, 20, 7, 0.8)');
          aresGrad.addColorStop(0.65, 'rgba(154, 52, 18, 0.5)');
          aresGrad.addColorStop(1, 'rgba(154, 52, 18, 0)');
          ctx.fillStyle = aresGrad;
          ctx.fill();

          // Polar Ice Cap for Mars
          if (i === 0) {
            ctx.beginPath();
            ctx.ellipse(centerX, centerY - radius * 0.78, radius * 0.28, radius * 0.1, 0, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
            ctx.fill();
          }
        }
        ctx.restore();
      }
    }

    // --- 5. Atmospheric Fresnel Rim Lighting & Terminator Shadow ---
    const shadowGrad = ctx.createRadialGradient(
      centerX + radius * 0.25,
      centerY + radius * 0.25,
      radius * 0.2,
      centerX,
      centerY,
      radius
    );
    shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
    shadowGrad.addColorStop(0.65, 'rgba(0, 0, 0, 0.45)');
    shadowGrad.addColorStop(0.92, 'rgba(0, 0, 0, 0.88)');
    shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0.98)');
    ctx.fillStyle = shadowGrad;
    ctx.fill();

    // Inner Specular Crescent Edge
    const crescentGrad = ctx.createRadialGradient(
      centerX - radius * 0.7,
      centerY - radius * 0.7,
      radius * 0.1,
      centerX - radius * 0.5,
      centerY - radius * 0.5,
      radius * 0.9
    );
    if (activePlanet === 'moon') {
      crescentGrad.addColorStop(0, 'rgba(255, 255, 255, 0.65)');
      crescentGrad.addColorStop(0.3, 'rgba(56, 189, 248, 0.35)');
      crescentGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    } else {
      crescentGrad.addColorStop(0, 'rgba(254, 215, 170, 0.75)');
      crescentGrad.addColorStop(0.35, 'rgba(249, 115, 22, 0.4)');
      crescentGrad.addColorStop(1, 'rgba(254, 215, 170, 0)');
    }
    ctx.fillStyle = crescentGrad;
    ctx.fill();

    ctx.restore(); // end globe clip

    // --- 6. Outer Atmospheric Glow (Fresnel Aura) ---
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 1.05, 0, Math.PI * 2);
    const outerAura = ctx.createRadialGradient(centerX, centerY, radius * 0.95, centerX, centerY, radius * 1.15);
    if (activePlanet === 'moon') {
      outerAura.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
      outerAura.addColorStop(0.5, 'rgba(148, 163, 184, 0.18)');
      outerAura.addColorStop(1, 'rgba(56, 189, 248, 0)');
    } else {
      outerAura.addColorStop(0, 'rgba(249, 115, 22, 0.55)');
      outerAura.addColorStop(0.5, 'rgba(234, 88, 12, 0.22)');
      outerAura.addColorStop(1, 'rgba(249, 115, 22, 0)');
    }
    ctx.fillStyle = outerAura;
    ctx.fill();
    ctx.restore();

    // --- 7. Project Landmark Coordinates & Draw Pulsating Radar Dots ---
    const nextProjected: Record<string, { x: number; y: number; visible: boolean }> = {};
    const now = Date.now();
    const pulseFactor = 0.5 + 0.5 * Math.sin(now * 0.006);

    landmarks.forEach((mark) => {
      // Convert lat/lon to sphere spherical coordinates
      const latRad = (mark.lat * Math.PI) / 180;
      const lonRad = (mark.lon * Math.PI) / 180 + currentRot;

      const xSphere = Math.cos(latRad) * Math.sin(lonRad);
      const ySphere = -Math.sin(latRad);
      const zSphere = Math.cos(latRad) * Math.cos(lonRad);

      const isVisible = zSphere > -0.15; // Visible on front half
      const screenX = centerX + xSphere * radius * 0.94;
      const screenY = centerY + ySphere * radius * 0.94;

      nextProjected[mark.id] = { x: screenX, y: screenY, visible: isVisible };

      if (isVisible) {
        // Draw pulsating radar rings on globe surface
        ctx.save();
        ctx.beginPath();
        ctx.arc(screenX, screenY, 4 + pulseFactor * 7, 0, Math.PI * 2);
        ctx.strokeStyle = mark.beaconColor;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(screenX, screenY, 3, 0, Math.PI * 2);
        ctx.fillStyle = mark.beaconColor;
        ctx.shadowColor = mark.beaconColor;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      }
    });

    setProjectedPoints(nextProjected);
  }, [activePlanet, landmarks]);

  // Main animation render loop
  useEffect(() => {
    let animId: number;
    const loop = () => {
      renderGlobe();
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [renderGlobe]);

  // Canvas resize and initialization
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const width = Math.min(rect.width, 540);
      const height = Math.min(rect.height || 480, 520);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext('2d');
      ctx?.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Drag-to-spin interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    lastMouseXRef.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastMouseXRef.current;
    rotationRef.current += deltaX * 0.008;
    lastMouseXRef.current = e.clientX;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[420px] sm:h-[480px] lg:h-[540px] flex items-center justify-center select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* 3D Rotating Canvas */}
      <canvas 
        ref={canvasRef} 
        className="cursor-grab active:cursor-grabbing max-w-full drop-shadow-[0_0_60px_rgba(0,0,0,0.9)]"
      />

      {/* SVG Connecting Overlay Lines Linking Tags to Surface Radar Points */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
        {landmarks[0] && projectedPoints[landmarks[0].id]?.visible && (
          <g>
            <line
              x1={projectedPoints[landmarks[0].id].x}
              y1={projectedPoints[landmarks[0].id].y}
              x2={projectedPoints[landmarks[0].id].x + 60}
              y2={projectedPoints[landmarks[0].id].y - 45}
              stroke={landmarks[0].accentColor}
              strokeWidth="1.2"
              strokeDasharray="3 3"
              opacity="0.8"
            />
            <circle
              cx={projectedPoints[landmarks[0].id].x}
              cy={projectedPoints[landmarks[0].id].y}
              r="2"
              fill={landmarks[0].accentColor}
            />
          </g>
        )}

        {landmarks[1] && projectedPoints[landmarks[1].id]?.visible && (
          <g>
            <line
              x1={projectedPoints[landmarks[1].id].x}
              y1={projectedPoints[landmarks[1].id].y}
              x2={projectedPoints[landmarks[1].id].x - 60}
              y2={projectedPoints[landmarks[1].id].y + 45}
              stroke={landmarks[1].accentColor}
              strokeWidth="1.2"
              strokeDasharray="3 3"
              opacity="0.8"
            />
            <circle
              cx={projectedPoints[landmarks[1].id].x}
              cy={projectedPoints[landmarks[1].id].y}
              r="2"
              fill={landmarks[1].accentColor}
            />
          </g>
        )}
      </svg>

      {/* Floating Glass Telemetry Information Tag 1 (Top Right) */}
      <div 
        onClick={() => {
          museumAudio.playClick(950);
          if (onSelectSite) onSelectSite(landmarks[0]?.name || '');
        }}
        className="absolute top-2 sm:top-8 right-1 sm:right-4 nova-glass px-3.5 py-2 rounded-xl text-left font-mono text-[11px] border border-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.85)] z-20 cursor-pointer hover:border-cyan-400/50 transition-all group"
      >
        <div className="flex items-center gap-1.5 text-slate-400 text-[9px] uppercase tracking-wider">
          <span 
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: landmarks[0]?.beaconColor }}
          />
          <span className="group-hover:text-cyan-300 transition-colors">{landmarks[0]?.name}</span>
        </div>
        <div className="text-white font-medium mt-0.5 text-xs truncate max-w-[170px]">
          {landmarks[0]?.hardware}
        </div>
        <div className="text-[10px] text-slate-400 font-mono">
          {landmarks[0]?.coordinatesDisplay}
        </div>
      </div>

      {/* Floating Glass Telemetry Information Tag 2 (Bottom Left) */}
      <div 
        onClick={() => {
          museumAudio.playClick(950);
          if (onSelectSite) onSelectSite(landmarks[1]?.name || '');
        }}
        className="absolute bottom-12 sm:bottom-16 left-1 sm:left-4 nova-glass px-3.5 py-2 rounded-xl text-left font-mono text-[11px] border border-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.85)] z-20 cursor-pointer hover:border-amber-400/50 transition-all group hidden xs:block"
      >
        <div className="flex items-center gap-1.5 text-slate-400 text-[9px] uppercase tracking-wider">
          <span 
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: landmarks[1]?.beaconColor }}
          />
          <span className="group-hover:text-amber-300 transition-colors">{landmarks[1]?.name}</span>
        </div>
        <div className="text-white font-medium mt-0.5 text-xs truncate max-w-[170px]">
          {landmarks[1]?.hardware}
        </div>
        <div className="text-[10px] text-slate-400 font-mono">
          {landmarks[1]?.coordinatesDisplay}
        </div>
      </div>

      {/* Interactive Floating Glass Celestial Planet Selector Widget (Bottom Center) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 nova-glass p-1 rounded-full border border-white/10 flex items-center gap-1.5 z-30 shadow-[0_10px_25px_rgba(0,0,0,0.9)] backdrop-blur-xl">
        <button
          onClick={() => {
            museumAudio.playClick(900);
            onTogglePlanet('moon');
          }}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all ${
            activePlanet === 'moon'
              ? 'bg-white/20 text-white font-bold border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.2)]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${activePlanet === 'moon' ? 'bg-cyan-400' : 'bg-slate-500'}`} />
          <span>LUNA</span>
        </button>

        <button
          onClick={() => {
            museumAudio.playClick(750);
            onTogglePlanet('mars');
          }}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all ${
            activePlanet === 'mars'
              ? 'bg-amber-500/25 text-amber-300 font-bold border border-amber-400/50 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${activePlanet === 'mars' ? 'bg-amber-400' : 'bg-slate-500'}`} />
          <span>ARES</span>
        </button>
      </div>

    </div>
  );
};
