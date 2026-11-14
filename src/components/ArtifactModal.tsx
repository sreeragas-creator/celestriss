import React, { useEffect } from 'react';
import type { Artifact } from '../types';
import { ArtifactVisualizer } from './ArtifactVisualizer';
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
  Sparkles
} from 'lucide-react';

interface ArtifactModalProps {
  artifact: Artifact | null;
  onClose: () => void;
}

export const ArtifactModal: React.FC<ArtifactModalProps> = ({ artifact, onClose }) => {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fade-in">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={handleClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl border border-slate-700/80 bg-[#060a14] shadow-2xl text-slate-100 z-10 flex flex-col">
        {/* Top Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-800 bg-[#060a14]/95 px-6 py-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-amber-400">
              NASA ARCHIVAL DOSSIER // {artifact.archivalId}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* NASA External Source Link */}
            <a
              href={artifact.nasaSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-slate-700 bg-slate-900/90 text-[11px] font-mono text-slate-300 hover:text-amber-300 hover:border-amber-500/50 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              <span>NASA ARCHIVE SOURCE</span>
            </a>

            <button
              onClick={handleClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8 font-sans">
          {/* Main Title Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-widest mb-1.5">
                <span>{artifact.agency}</span>
                <span>•</span>
                <span>{artifact.country}</span>
                <span>•</span>
                <span className="text-amber-400 font-semibold">{artifact.celestialBody.replace('_', ' ').toUpperCase()}</span>
                <span>•</span>
                <span>YEAR {artifact.launchYear}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-light tracking-wide text-white font-heading">
                {artifact.name}
              </h1>
              <p className="text-sm font-mono text-slate-300 mt-2 flex items-center gap-2">
                <span className="text-amber-500 font-semibold">DESTINATION:</span> 
                <span>{artifact.coordinates.landingSite}</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-md border border-slate-700 bg-slate-900 text-xs font-mono text-slate-300">
                CLASS: {artifact.category.replace('_', ' ').toUpperCase()}
              </span>
              <span className="px-3 py-1 rounded-md border border-amber-500/40 bg-amber-500/10 text-xs font-mono text-amber-400">
                STATUS: {artifact.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
          </div>

          {/* Schematic & Quick Telemetry Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Visual Photographic & Schematic Box */}
            <div className="lg:col-span-7">
              <ArtifactVisualizer artifact={artifact} compact={false} />
            </div>

            {/* Telemetry Metrics Column */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-3 p-5 rounded-xl border border-slate-800 bg-slate-950/70">
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-400" />
                Orbital Telemetry & Regime
              </h4>

              <div className="space-y-2.5 font-mono text-xs">
                <div className="flex justify-between border-b border-slate-900 pb-2">
                  <span className="text-slate-400">LOCATION:</span>
                  <span className="text-slate-200 text-right">{artifact.coordinatesDisplay}</span>
                </div>
                {artifact.coordinates.elevationMeters !== undefined && (
                  <div className="flex justify-between border-b border-slate-900 pb-2">
                    <span className="text-slate-400">ELEVATION:</span>
                    <span className="text-slate-200">{artifact.coordinates.elevationMeters} m</span>
                  </div>
                )}
                {artifact.coordinates.orbitalRegime && (
                  <div className="flex justify-between border-b border-slate-900 pb-2">
                    <span className="text-slate-400">ORBITAL REGIME:</span>
                    <span className="text-slate-200 text-right">{artifact.coordinates.orbitalRegime}</span>
                  </div>
                )}
                <div className="flex justify-between border-b border-slate-900 pb-2">
                  <span className="text-slate-400">LAUNCH DATE:</span>
                  <span className="text-slate-200">{artifact.launchDate}</span>
                </div>
                {artifact.landingDate && (
                  <div className="flex justify-between border-b border-slate-900 pb-2">
                    <span className="text-slate-400">TOUCHDOWN:</span>
                    <span className="text-slate-200">{artifact.landingDate}</span>
                  </div>
                )}
                <div className="flex justify-between border-b border-slate-900 pb-2">
                  <span className="text-slate-400">FINAL SIGNAL:</span>
                  <span className="text-slate-200">{artifact.finalSignalDate}</span>
                </div>
                <div className="flex justify-between border-b border-slate-900 pb-2">
                  <span className="text-slate-400">OPERATIONAL SPAN:</span>
                  <span className="text-amber-400 font-semibold">{artifact.operationalDays} days</span>
                </div>
                {artifact.distanceTraveledKm !== undefined && (
                  <div className="flex justify-between pb-1">
                    <span className="text-slate-400">DISTANCE TRAVERSED:</span>
                    <span className="text-slate-200">{artifact.distanceTraveledKm} km</span>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-900 text-[11px] font-mono text-slate-300 leading-relaxed">
                <span className="text-amber-400 font-semibold">CURRENT STATE: </span>
                {artifact.statusDescription}
              </div>
            </div>
          </div>

          {/* Mission Purpose & Historical Significance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-950/60 space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Primary Mission Purpose
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                {artifact.purpose}
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-800 bg-slate-950/60 space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-widest text-sky-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Historical Significance
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                {artifact.historicalSignificance}
              </p>
            </div>
          </div>

          {/* Final Log / Ghost Signal Quote */}
          {artifact.finalLogTranscript && (
            <div className="relative rounded-xl border border-amber-500/30 bg-amber-950/20 p-5 sm:p-6 overflow-hidden">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
                <Radio className="w-4 h-4 animate-pulse" />
                <span>The Final Transmission / Archival Ghost Signal</span>
              </div>
              <blockquote className="text-sm sm:text-base italic font-serif text-amber-100/95 leading-relaxed pl-3 border-l-2 border-amber-500/60">
                {artifact.finalLogTranscript}
              </blockquote>
            </div>
          )}

          {/* Detailed Historical Narrative */}
          <div className="space-y-3">
            <h3 className="text-sm font-mono uppercase tracking-widest text-slate-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Detailed Archival Narrative
            </h3>
            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
              {artifact.narrative}
            </p>
          </div>

          {/* Equipment Left on Surface & Cosmic Weathering */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Equipment Abandoned */}
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-950/50 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-sky-400" />
                Physical Hardware Abandoned in Place
              </h4>
              <ul className="space-y-2 text-xs text-slate-300 font-mono">
                {artifact.equipmentAbandoned.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cosmic Weathering & Scientific Legacy */}
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-950/50 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 flex items-center gap-2">
                <Wind className="w-4 h-4 text-emerald-400" />
                Cosmic Environment & Weathering
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {artifact.cosmicWeathering}
              </p>
              
              <div className="pt-3 border-t border-slate-900">
                <h5 className="text-[11px] font-mono uppercase text-slate-400 mb-2">Scientific Legacy</h5>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {artifact.scientificLegacy.map((legacy, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-sky-400">✓</span>
                      <span>{legacy}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto border-t border-slate-800 bg-[#060a14] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-400">
          <a
            href={artifact.nasaSourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>VERIFIED NASA SOURCE LINK</span>
          </a>

          <button
            onClick={handleClose}
            className="px-5 py-2 rounded-lg border border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 transition-colors font-medium"
          >
            RETURN TO EXHIBITION
          </button>
        </div>
      </div>
    </div>
  );
};
