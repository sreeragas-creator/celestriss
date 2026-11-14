import React, { useEffect, useState } from 'react';
import type { Artifact } from '../types';
import { museumAudio } from '../utils/audio';
import { 
  X, 
  Activity, 
  Radio, 
  Cpu, 
  Wind, 
  ShieldCheck,
  ExternalLink,
  Target,
  Sparkles,
  Camera
} from 'lucide-react';

interface ArtifactModalProps {
  artifact: Artifact | null;
  onClose: () => void;
}

export const ArtifactModal: React.FC<ArtifactModalProps> = ({ artifact, onClose }) => {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [artifact?.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        museumAudio.playClick(600);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!artifact) return null;

  const handleClose = () => {
    museumAudio.playClick(600);
    onClose();
  };

  const hasAuthenticPhoto = !!artifact.imageUrl && !imageFailed;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/90 backdrop-blur-md animate-fade-in font-sans">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={handleClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#050811] shadow-[0_25px_80px_rgba(0,0,0,0.95)] text-slate-100 z-10 flex flex-col">
        
        {/* Top Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#050811]/95 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-[#FFB800] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FFB800]">
              NASA ARCHIVAL DOSSIER // {artifact.archivalId}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* NASA External Source Link */}
            <a
              href={artifact.nasaSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-[11px] font-mono text-slate-300 hover:text-[#00CFFF] hover:border-[#00CFFF]/40 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#00CFFF]" />
              <span>NASA ARCHIVE SOURCE</span>
            </a>

            <button
              onClick={handleClose}
              className="rounded-full p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Main Title Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-widest mb-1.5">
                <span>{artifact.agency}</span>
                <span>•</span>
                <span>{artifact.country}</span>
                <span>•</span>
                <span className="text-[#FFB800] font-medium">{artifact.celestialBody.replace('_', ' ').toUpperCase()}</span>
                <span>•</span>
                <span className="text-slate-300">YEAR {artifact.launchYear}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-light tracking-wide text-white font-heading">
                {artifact.name}
              </h1>
              <p className="text-xs sm:text-sm font-mono text-slate-400 mt-2 flex items-center gap-2">
                <span className="text-[#FFB800]">DESTINATION:</span> 
                <span className="text-slate-200">{artifact.coordinates.landingSite}</span>
                {artifact.coordinates.region && (
                  <span className="text-slate-500">({artifact.coordinates.region})</span>
                )}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-xs font-mono text-slate-300">
                CLASS: {artifact.category.replace('_', ' ').toUpperCase()}
              </span>
              <span className="px-3 py-1 rounded-full border border-[#FFB800]/30 bg-[#FFB800]/10 text-xs font-mono text-[#FFB800]">
                STATUS: {artifact.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
          </div>

          {/* TWO-COLUMN CORE EXHIBIT LAYOUT (7 cols Photo : 5 cols Telemetry) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* LEFT COLUMN: Large Cinematic Archival Photograph */}
            <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-white/10 bg-[#070b16] overflow-hidden relative min-h-[380px] lg:min-h-[440px] shadow-2xl group">
              
              {hasAuthenticPhoto ? (
                <>
                  {/* The Monument Archival Photograph */}
                  <img
                    src={artifact.imageUrl}
                    alt={artifact.name}
                    onError={() => setImageFailed(true)}
                    className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.08] transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                  />

                  {/* Restrained Archival Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 pointer-events-none" />

                  {/* Top Left Archival Plate Stamp */}
                  <div className="absolute top-3.5 left-4 z-10 flex items-center gap-2 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800] animate-pulse" />
                    <span>NASA ARCHIVAL PLATE // {artifact.archivalId}</span>
                  </div>

                  {/* Top Right Mission Stamp */}
                  <div className="absolute top-3.5 right-4 z-10 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#00CFFF] uppercase tracking-wider">
                    HISTORICAL RECORD
                  </div>

                  {/* Bottom Image Caption & Credit Plaque */}
                  <div className="absolute bottom-3 left-3 right-3 z-10 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 p-3 space-y-1">
                    <p className="text-xs font-sans text-slate-200 font-normal leading-relaxed">
                      {artifact.imageCaption || artifact.brief}
                    </p>
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-white/10">
                      <span className="text-[#00CFFF]/90">
                        {artifact.imageCredit || 'NASA Public Domain Archive'}
                      </span>
                      <span>IN SITU RECORD</span>
                    </div>
                  </div>
                </>
              ) : (
                /* Archival Visual Placeholder (Only if image fails to load) */
                <div className="w-full h-full min-h-[380px] flex flex-col items-center justify-center p-8 text-center bg-[#070b16] space-y-3">
                  <Camera className="w-8 h-8 text-slate-500 opacity-60" />
                  <div className="text-xs font-mono text-slate-400">
                    AUTHENTIC HISTORICAL IMAGE RECORD
                  </div>
                  <p className="text-xs text-slate-500 max-w-sm font-light">
                    Archival photographic plate is currently synchronizing with the planetary database.
                  </p>
                  <div className="text-[10px] font-mono text-slate-600">
                    {artifact.archivalId} // IAU CATALOG
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: ORBITAL TELEMETRY & REGIME (Exact Original Order) */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-white/10 bg-[#060a14] p-6 shadow-2xl">
              
              <div>
                {/* Heading */}
                <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#00CFFF] flex items-center gap-2 border-b border-white/10 pb-3 mb-4">
                  <Activity className="w-4 h-4 text-[#00CFFF]" />
                  ORBITAL TELEMETRY & REGIME
                </h4>

                {/* The Six Required Rows in Exact Order */}
                <div className="space-y-3 font-mono text-xs">
                  
                  {/* 1. LOCATION */}
                  <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                    <span className="text-slate-400 text-[11px]">LOCATION:</span>
                    <span className="text-slate-200 text-right font-medium">
                      {artifact.coordinatesDisplay}
                    </span>
                  </div>

                  {/* 2. ELEVATION */}
                  <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                    <span className="text-slate-400 text-[11px]">ELEVATION:</span>
                    <span className="text-slate-200 font-medium">
                      {artifact.coordinates.elevationMeters !== undefined 
                        ? `${artifact.coordinates.elevationMeters} m` 
                        : (artifact.coordinates.orbitalRegime || 'N/A — DEEP SPACE')}
                    </span>
                  </div>

                  {/* 3. LAUNCH DATE */}
                  <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                    <span className="text-slate-400 text-[11px]">LAUNCH DATE:</span>
                    <span className="text-slate-200 font-medium">
                      {artifact.launchDate}
                    </span>
                  </div>

                  {/* 4. TOUCHDOWN */}
                  <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                    <span className="text-slate-400 text-[11px]">TOUCHDOWN:</span>
                    <span className="text-slate-200 font-medium">
                      {artifact.landingDate || 'IN-FLIGHT ORBIT'}
                    </span>
                  </div>

                  {/* 5. FINAL SIGNAL */}
                  <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                    <span className="text-slate-400 text-[11px]">FINAL SIGNAL:</span>
                    <span className="text-slate-200 font-medium">
                      {artifact.finalSignalDate}
                    </span>
                  </div>

                  {/* 6. OPERATIONAL SPAN */}
                  <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                    <span className="text-slate-400 text-[11px]">OPERATIONAL SPAN:</span>
                    <span className="text-[#FFB800] font-bold">
                      {artifact.operationalDays} days
                    </span>
                  </div>
                </div>
              </div>

              {/* CURRENT STATE (Below the six rows) */}
              <div className="pt-4 border-t border-white/10 mt-4 space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#FFB800] font-bold">
                  CURRENT STATE
                </div>
                <p className="text-xs font-mono text-slate-300 leading-relaxed font-light">
                  {artifact.statusDescription}
                </p>
              </div>

            </div>
          </div>

          {/* Mission Purpose & Historical Significance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-2xl border border-white/10 bg-[#060a14] space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#FFB800] flex items-center gap-2">
                <Target className="w-4 h-4" />
                Primary Mission Purpose
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                {artifact.purpose}
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-white/10 bg-[#060a14] space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#00CFFF] flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Historical Significance
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                {artifact.historicalSignificance}
              </p>
            </div>
          </div>

          {/* Final Log / Ghost Signal Quote */}
          {artifact.finalLogTranscript && (
            <div className="relative rounded-2xl border border-[#FFB800]/25 bg-[#FFB800]/5 p-5 sm:p-6 overflow-hidden">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FFB800] mb-2">
                <Radio className="w-4 h-4 animate-pulse" />
                <span>The Final Transmission / Archival Ghost Signal</span>
              </div>
              <blockquote className="text-sm sm:text-base italic font-serif text-amber-100/95 leading-relaxed pl-3 border-l-2 border-[#FFB800]/70">
                {artifact.finalLogTranscript}
              </blockquote>
            </div>
          )}

          {/* Detailed Historical Narrative */}
          <div className="space-y-3">
            <h3 className="text-sm font-mono uppercase tracking-widest text-slate-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#FFB800]" />
              Detailed Archival Narrative
            </h3>
            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
              {artifact.narrative}
            </p>
          </div>

          {/* Equipment Left on Surface & Cosmic Weathering */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Equipment Abandoned */}
            <div className="p-5 rounded-2xl border border-white/10 bg-[#060a14] space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#00CFFF]" />
                Physical Hardware Abandoned in Place
              </h4>
              <ul className="space-y-2 text-xs text-slate-300 font-mono">
                {artifact.equipmentAbandoned.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#FFB800] mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cosmic Weathering & Scientific Legacy */}
            <div className="p-5 rounded-2xl border border-white/10 bg-[#060a14] space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 flex items-center gap-2">
                <Wind className="w-4 h-4 text-emerald-400" />
                Cosmic Environment & Weathering
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {artifact.cosmicWeathering}
              </p>
              
              <div className="pt-3 border-t border-white/5">
                <h5 className="text-[11px] font-mono uppercase text-slate-400 mb-2">Scientific Legacy</h5>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {artifact.scientificLegacy.map((legacy, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#00CFFF]">✓</span>
                      <span>{legacy}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto border-t border-white/10 bg-[#050811] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-400">
          <a
            href={artifact.nasaSourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#FFB800] hover:text-[#FFB800]/80 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>VERIFIED NASA SOURCE LINK</span>
          </a>

          <button
            onClick={handleClose}
            className="px-5 py-2 rounded-full border border-white/10 bg-white/[0.04] text-slate-200 hover:bg-white/10 transition-colors font-medium"
          >
            RETURN TO EXHIBITION
          </button>
        </div>
      </div>
    </div>
  );
};
