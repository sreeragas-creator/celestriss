import React, { useEffect, useState, useRef } from 'react';
import type { Artifact, EquipmentHotspot, StoryChapter, ViewMode } from '../types';
import { getArtifactStory } from '../data/artifactStories';
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
  Camera,
  BookOpen,
  Compass,
  Clock,
  CircleDot,
  Volume2,
  VolumeX,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  HelpCircle,
  Zap,
  RotateCcw,
  Layers,
  ArrowRight
} from 'lucide-react';

interface ArtifactModalProps {
  artifact: Artifact | null;
  onClose: () => void;
  isJuniorMode?: boolean;
  onNavigateView?: (view: ViewMode) => void;
}

export const ArtifactModal: React.FC<ArtifactModalProps> = ({ 
  artifact, 
  onClose,
  isJuniorMode = false,
  onNavigateView 
}) => {
  const [activeTab, setActiveTab] = useState<'story' | 'dossier'>('story');
  const [currentChapterNum, setCurrentChapterNum] = useState<number>(1);
  const [activeHotspot, setActiveHotspot] = useState<EquipmentHotspot | null>(null);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [isNarrating, setIsNarrating] = useState<boolean>(false);
  const [failedImageId, setFailedImageId] = useState<string | null>(null);

  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const story = artifact ? getArtifactStory(artifact) : null;
  const imageFailed = artifact ? failedImageId === artifact.id : false;

  // Cleanup speech narration on unmount or artifact change
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
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

  if (!artifact || !story) return null;

  const handleClose = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    museumAudio.playClick(600);
    onClose();
  };

  const fallbackPath = `/images/artifacts/${artifact.id}.jpg`;
  const imageSource = artifact.imageUrl || fallbackPath;

  // Map 1-6 to chapters
  const chapters: StoryChapter[] = [
    story.origin,
    story.journey,
    story.mission,
    story.discoveries,
    story.finalChapter,
    story.legacy
  ];

  const currentChapter = chapters[currentChapterNum - 1] || story.origin;
  const readingProgressPercent = Math.round((currentChapterNum / 6) * 100);

  const switchChapter = (num: number) => {
    museumAudio.playClick(850);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsNarrating(false);
    setCurrentChapterNum(num);
    setActiveHotspot(null);
  };

  const toggleNarration = () => {
    museumAudio.playClick(800);
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech audio narration is not supported in this browser.');
      return;
    }

    if (isNarrating) {
      window.speechSynthesis.cancel();
      setIsNarrating(false);
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${currentChapter.title}. ${currentChapter.subtitle}. ${currentChapter.content} ${currentChapter.highlightQuote || ''} ${currentChapter.scientificInsight || ''}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      
      utterance.onend = () => setIsNarrating(false);
      utterance.onerror = () => setIsNarrating(false);

      speechRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsNarrating(true);
    }
  };

  const handleSelectQuiz = (idx: number) => {
    if (quizSubmitted) return;
    museumAudio.playClick(900);
    setSelectedQuizAnswer(idx);
  };

  const handleSubmitQuiz = () => {
    if (selectedQuizAnswer === null || !story.quiz) return;
    setQuizSubmitted(true);
    if (selectedQuizAnswer === story.quiz.correctIndex) {
      museumAudio.playScanPing();
    } else {
      museumAudio.playClick(400);
    }
  };

  const handleNavigate = (view: ViewMode) => {
    museumAudio.playClick(900);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    onClose();
    if (onNavigateView) {
      onNavigateView(view);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/90 backdrop-blur-md animate-fade-in font-sans">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={handleClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#050811] shadow-[0_25px_80px_rgba(0,0,0,0.95)] text-slate-100 z-10 flex flex-col">
        
        {/* Top Sticky Header Bar */}
        <div className="sticky top-0 z-30 flex flex-col sm:flex-row items-center justify-between border-b border-white/10 bg-[#050811]/95 px-5 sm:px-6 py-3.5 backdrop-blur-md gap-3">
          
          {/* Header Archival Tag & Progress */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-[#FFB800] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FFB800]">
                EXPEDITION CHRONICLE // {artifact.archivalId}
              </span>
            </div>

            {/* Reading Progress Indicator */}
            {activeTab === 'story' && (
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-cyan-300">
                <span>CH {currentChapterNum}/6</span>
                <div className="w-12 h-1.5 bg-black/50 rounded-full overflow-hidden border border-white/10">
                  <div 
                    style={{ width: `${readingProgressPercent}%` }} 
                    className="h-full bg-cyan-400 transition-all duration-300"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Utility Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            
            {/* Story vs Dossier Toggle */}
            <div className="flex items-center p-0.5 rounded-full bg-black/60 border border-white/10 text-[11px] font-mono">
              <button
                onClick={() => {
                  museumAudio.playClick(750);
                  setActiveTab('story');
                }}
                className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all ${
                  activeTab === 'story'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40 shadow font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <BookOpen className="w-3 h-3" />
                <span>STORY EXPERIENCE</span>
              </button>

              <button
                onClick={() => {
                  museumAudio.playClick(750);
                  setActiveTab('dossier');
                }}
                className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all ${
                  activeTab === 'dossier'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3 h-3" />
                <span>TELEMETRY DOSSIER</span>
              </button>
            </div>

            {/* Audio Voice Narration Toggle (Only in Story Mode) */}
            {activeTab === 'story' && (
              <button
                onClick={toggleNarration}
                className={`p-1.5 rounded-full border transition-all ${
                  isNarrating
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 animate-pulse'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
                title={isNarrating ? 'Pause Audio Log' : 'Listen to Chapter Audio Log'}
              >
                {isNarrating ? <VolumeX className="w-4 h-4 text-amber-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
              </button>
            )}

            {/* NASA External Source Link */}
            <a
              href={artifact.nasaSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[11px] font-mono text-slate-300 hover:text-[#00CFFF] hover:border-[#00CFFF]/40 transition-colors"
            >
              <ExternalLink className="w-3 h-3 text-[#00CFFF]" />
              <span>NASA</span>
            </a>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="rounded-full p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            TAB 1: IMMERSIVE 6-CHAPTER STORY EXPERIENCE (PRIMARY)
            ========================================================================= */}
        {activeTab === 'story' && (
          <div className="p-5 sm:p-8 space-y-6 animate-fade-in">
            
            {/* Mission Hero Header */}
            <div className="space-y-2 border-b border-white/10 pb-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-widest">
                  <span>{artifact.agency}</span>
                  <span>•</span>
                  <span>{artifact.country}</span>
                  <span>•</span>
                  <span className="text-[#FFB800] font-medium">{artifact.celestialBody.replace('_', ' ').toUpperCase()}</span>
                  <span>•</span>
                  <span className="text-slate-300">YEAR {artifact.launchYear}</span>
                </div>

                {/* Active Science vs Silent Hardware Tag */}
                <div className="flex items-center gap-2">
                  {story.hasActiveScienceValue ? (
                    <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 font-mono text-[11px] font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                      <Zap className="w-3.5 h-3.5 text-cyan-300" />
                      <span>CONTINUING ACTIVE SCIENCE</span>
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 font-mono text-[11px] flex items-center gap-1.5">
                      <CircleDot className="w-3 h-3 text-amber-400/80" />
                      <span>SILENT HISTORIC RELIC</span>
                    </span>
                  )}
                </div>
              </div>

              <h1 className="text-2xl sm:text-4xl font-light tracking-wide text-white font-heading">
                {artifact.name}
              </h1>

              <p className="text-xs sm:text-sm font-mono text-slate-400 flex items-center gap-2">
                <span className="text-[#FFB800] font-medium">LOCATION:</span> 
                <span className="text-slate-200">{artifact.coordinates.landingSite}</span>
                <span className="text-slate-500">({artifact.coordinatesDisplay})</span>
              </p>
            </div>

            {/* Chapter Stepper HUD Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
              {chapters.map((ch, idx) => {
                const num = idx + 1;
                const isActive = num === currentChapterNum;
                const isPast = num < currentChapterNum;
                return (
                  <button
                    key={num}
                    onClick={() => switchChapter(num)}
                    className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      isActive
                        ? 'bg-amber-500/20 border-amber-400 text-white shadow-lg'
                        : isPast
                        ? 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                        : 'bg-black/40 border-white/5 text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                      <span className={isActive ? 'text-amber-400 font-bold' : ''}>0{num}</span>
                      {isPast && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                    </div>
                    <div className="text-[11px] font-heading font-medium truncate">
                      {ch.title.replace('THE ', '')}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* TWO-COLUMN CINEMATIC EXHIBIT & NARRATIVE (7 cols Story : 5 cols Visual Hotspots) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT COLUMN: The Chapter Narrative (7 cols) */}
              <div className="lg:col-span-7 rounded-2xl bg-[#060a15] border border-white/10 p-6 sm:p-7 space-y-6 shadow-2xl">
                
                {/* Chapter Heading */}
                <div className="border-b border-white/10 pb-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FFB800] font-bold">
                      CHAPTER 0{currentChapter.number} // {currentChapter.title}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      STEP {currentChapter.number} OF 6
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-heading font-light text-white">
                    {currentChapter.subtitle}
                  </h2>
                </div>

                {/* Narrative Text */}
                <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed font-light">
                  {currentChapter.content}
                </p>

                {/* Historical Quotation / Mission Transcript */}
                {currentChapter.highlightQuote && (
                  <div className="p-4 rounded-xl bg-amber-500/10 border-l-2 border-amber-400 text-xs sm:text-sm text-amber-200/95 font-serif italic leading-relaxed">
                    {currentChapter.highlightQuote}
                  </div>
                )}

                {/* Key Scientific Discovery / Takeaway Box */}
                {currentChapter.scientificInsight && (
                  <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase text-cyan-400">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Scientific Discovery & Planetary Insight</span>
                    </div>
                    <p className="text-xs text-cyan-100 font-sans leading-relaxed">
                      {currentChapter.scientificInsight}
                    </p>
                  </div>
                )}

                {/* Active Science Continuation Banner */}
                {story.hasActiveScienceValue && currentChapter.number >= 4 && (
                  <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1">
                    <div className="text-[10px] font-mono uppercase text-emerald-300 font-bold flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Active Science Continuation Note</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {story.activeScienceDescription}
                    </p>
                  </div>
                )}

                {/* Chapter Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <button
                    disabled={currentChapterNum === 1}
                    onClick={() => switchChapter(Math.max(1, currentChapterNum - 1))}
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>PREVIOUS CHAPTER</span>
                  </button>

                  <button
                    disabled={currentChapterNum === 6}
                    onClick={() => switchChapter(Math.min(6, currentChapterNum + 1))}
                    className="px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 hover:bg-amber-500 hover:text-slate-950 text-xs font-mono disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 transition-all font-bold"
                  >
                    <span>NEXT CHAPTER</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* RIGHT COLUMN: Visual Inspection with Interactive Equipment Hotspots (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Visual Frame with Hotspot Overlays */}
                <div className="rounded-2xl border border-white/10 bg-[#070b16] overflow-hidden relative shadow-2xl group min-h-[300px]">
                  
                  {!imageFailed ? (
                    <>
                      <img
                        src={imageSource}
                        alt={artifact.name}
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src !== window.location.origin + fallbackPath) {
                            target.src = fallbackPath;
                          } else {
                            setFailedImageId(artifact.id);
                          }
                        }}
                        className="w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.08] min-h-[320px]"
                        loading="eager"
                      />

                      {/* Vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                      {/* Interactive Equipment Hotspots */}
                      {story.equipmentHotspots?.map((hotspot) => {
                        const isSelected = activeHotspot?.id === hotspot.id;
                        return (
                          <div
                            key={hotspot.id}
                            style={{ top: `${hotspot.yPercent}%`, left: `${hotspot.xPercent}%` }}
                            className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
                            onClick={() => {
                              museumAudio.playScanPing();
                              setActiveHotspot(hotspot);
                            }}
                          >
                            <div className="relative group/pin">
                              <span className={`flex h-6 w-6 items-center justify-center rounded-full border transition-all ${
                                isSelected
                                  ? 'bg-amber-400 text-slate-950 border-white shadow-[0_0_20px_rgba(245,158,11,0.9)] scale-125'
                                  : hotspot.status === 'active_science'
                                  ? 'bg-cyan-500/80 text-white border-cyan-300 animate-pulse'
                                  : 'bg-black/70 text-white border-amber-400 hover:scale-110'
                              }`}>
                                <Sparkles className="w-3 h-3" />
                              </span>

                              {/* Tooltip Label */}
                              <div className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-0.5 rounded bg-black/90 border border-white/10 text-[9px] font-mono text-white whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity pointer-events-none">
                                {hotspot.name}
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {/* Bottom Banner */}
                      <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 p-2.5 flex items-center justify-between text-[11px] font-mono">
                        <span className="text-cyan-300">
                          {story.equipmentHotspots?.length || 0} INTERACTIVE EQUIPMENT HOTSPOTS
                        </span>
                        <span className="text-slate-400">CLICK PINS TO INSPECT</span>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center p-8 text-center bg-[#070b16] space-y-2">
                      <Camera className="w-8 h-8 text-slate-500 opacity-60" />
                      <div className="text-xs font-mono text-slate-400">AUTHENTIC HISTORICAL IMAGE</div>
                      <div className="text-[10px] font-mono text-slate-600">{artifact.archivalId}</div>
                    </div>
                  )}
                </div>

                {/* Hotspot Inspection Card (When Clicked) */}
                {activeHotspot ? (
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/40 space-y-2 animate-fade-in shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${activeHotspot.status === 'active_science' ? 'bg-cyan-400 animate-pulse' : 'bg-amber-400'}`} />
                        <span className="text-xs font-heading font-bold text-white uppercase">
                          {activeHotspot.name}
                        </span>
                      </div>
                      <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${
                        activeHotspot.status === 'active_science'
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
                          : 'bg-white/5 text-slate-400 border-white/10'
                      }`}>
                        {activeHotspot.status === 'active_science' ? 'ACTIVE SCIENCE' : 'IN-SITU RELIC'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-200 font-sans leading-relaxed">
                      {activeHotspot.role}
                    </p>

                    <div className="pt-2 border-t border-white/10 text-[11px] font-mono text-amber-200/90">
                      <span className="text-slate-400">CONDITION TODAY:</span> {activeHotspot.currentCondition}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-400 font-mono text-center">
                    Click any glowing pin on the equipment photo above to inspect its instruments and current condition.
                  </div>
                )}

                {/* Connected Interplanetary Exploration Hub */}
                <div className="p-5 rounded-2xl bg-[#060a14] border border-white/10 space-y-3 shadow-xl">
                  <div className="text-[10px] font-mono text-[#00CFFF] uppercase tracking-widest font-bold">
                    CONNECTED OBSERVATION SYSTEMS
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => handleNavigate('tracker')}
                      className="w-full p-2.5 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono flex items-center justify-between transition-colors font-medium"
                    >
                      <div className="flex items-center gap-2">
                        <CircleDot className="w-3.5 h-3.5" />
                        <span>TRACK IN 3D ORBITAL SIMULATION</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleNavigate('radar')}
                      className="w-full p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-mono flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Compass className="w-3.5 h-3.5 text-amber-400" />
                        <span>INSPECT SURFACE RADAR SITE</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleNavigate('timeline')}
                      className="w-full p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-mono flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-purple-400" />
                        <span>LOCATE ON INTERPLANETARY TIMELINE</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

            </div>

            {/* Educational Knowledge Check Section (Solidifies learning) */}
            {story.quiz && (
              <div className="p-6 rounded-2xl bg-[#060a14] border border-amber-500/20 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                    <HelpCircle className="w-4 h-4 text-amber-400" />
                    <span>Story Comprehension & Science Check</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">EDUCATIONAL REVIEW</span>
                </div>

                <div className="text-sm font-heading text-white">
                  {story.quiz.question}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {story.quiz.options.map((option, oIdx) => {
                    const isSelected = selectedQuizAnswer === oIdx;
                    let btnStyle = 'bg-black/40 border-white/10 text-slate-300 hover:bg-white/5';
                    
                    if (quizSubmitted) {
                      if (oIdx === story.quiz?.correctIndex) {
                        btnStyle = 'bg-emerald-950/60 border-emerald-500/80 text-emerald-300 font-medium';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-950/60 border-rose-500/80 text-rose-300';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-amber-950/60 border-amber-400/80 text-amber-300 font-medium';
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={quizSubmitted}
                        onClick={() => handleSelectQuiz(oIdx)}
                        className={`p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-2.5 ${btnStyle}`}
                      >
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white shrink-0">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span className="leading-relaxed">{option}</span>
                      </button>
                    );
                  })}
                </div>

                {!quizSubmitted ? (
                  <button
                    disabled={selectedQuizAnswer === null}
                    onClick={handleSubmitQuiz}
                    className="py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-heading font-semibold text-xs tracking-wider uppercase transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>Confirm Knowledge Answer</span>
                  </button>
                ) : (
                  <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 space-y-1 animate-fade-in">
                    <div className="font-bold font-mono text-[11px]">
                      {selectedQuizAnswer === story.quiz.correctIndex ? '🎉 CORRECT SCIENTIFIC INSIGHT!' : '💡 HISTORICAL INSIGHT:'}
                    </div>
                    <p className="text-slate-200 leading-relaxed font-sans">{story.quiz.explanation}</p>
                    {selectedQuizAnswer !== story.quiz.correctIndex && (
                      <button
                        onClick={() => {
                          setQuizSubmitted(false);
                          setSelectedQuizAnswer(null);
                        }}
                        className="text-amber-400 font-mono text-[11px] hover:underline flex items-center gap-1 pt-1"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Try Again</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

          </div>
        )}

        {/* =========================================================================
            TAB 2: TECHNICAL NASA ARCHIVAL DOSSIER (PRESERVED SPECIFICATIONS)
            ========================================================================= */}
        {activeTab === 'dossier' && (
          <div className="p-6 sm:p-8 space-y-8 animate-fade-in">
            
            {/* Main Title Section */}
            <div className="border-b border-white/10 pb-6 space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-widest">
                  <span>{artifact.agency}</span>
                  <span>•</span>
                  <span>{artifact.country}</span>
                  <span>•</span>
                  <span className="text-[#FFB800] font-medium">{artifact.celestialBody.replace('_', ' ').toUpperCase()}</span>
                  <span>•</span>
                  <span className="text-slate-300">YEAR {artifact.launchYear}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-xs font-mono text-slate-300">
                    CLASS: {artifact.category.replace('_', ' ').toUpperCase()}
                  </span>
                  <span className="px-3 py-1 rounded-full border border-[#FFB800]/30 bg-[#FFB800]/10 text-xs font-mono text-[#FFB800]">
                    STATUS: {artifact.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-4xl font-light tracking-wide text-white font-heading">
                {artifact.name}
              </h1>

              <p className="text-xs sm:text-sm font-mono text-slate-400 flex items-center gap-2">
                <span className="text-[#FFB800] font-medium">DESTINATION:</span> 
                <span className="text-slate-200">{artifact.coordinates.landingSite}</span>
                {artifact.coordinates.region && (
                  <span className="text-slate-500">({artifact.coordinates.region})</span>
                )}
              </p>
            </div>

            {/* TWO-COLUMN CORE EXHIBIT LAYOUT (7 cols Photo : 5 cols Telemetry) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* LEFT COLUMN: Large Cinematic Archival Photograph */}
              <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-white/10 bg-[#070b16] overflow-hidden relative min-h-[380px] lg:min-h-[440px] shadow-2xl group">
                <img
                  src={imageSource}
                  alt={artifact.name}
                  className="w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.08] transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 pointer-events-none" />

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
              </div>

              {/* RIGHT COLUMN: ORBITAL TELEMETRY & REGIME (Exact Original Order) */}
              <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-white/10 bg-[#060a14] p-6 shadow-2xl">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#00CFFF] flex items-center gap-2 border-b border-white/10 pb-3 mb-4">
                    <Activity className="w-4 h-4 text-[#00CFFF]" />
                    ORBITAL TELEMETRY & REGIME
                  </h4>

                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                      <span className="text-slate-400 text-[11px]">LOCATION:</span>
                      <span className="text-slate-200 text-right font-medium">{artifact.coordinatesDisplay}</span>
                    </div>

                    <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                      <span className="text-slate-400 text-[11px]">ELEVATION:</span>
                      <span className="text-slate-200 font-medium">
                        {artifact.coordinates.elevationMeters !== undefined 
                          ? `${artifact.coordinates.elevationMeters} m` 
                          : (artifact.coordinates.orbitalRegime || 'N/A — DEEP SPACE')}
                      </span>
                    </div>

                    <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                      <span className="text-slate-400 text-[11px]">LAUNCH DATE:</span>
                      <span className="text-slate-200 font-medium">{artifact.launchDate}</span>
                    </div>

                    <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                      <span className="text-slate-400 text-[11px]">TOUCHDOWN:</span>
                      <span className="text-slate-200 font-medium">{artifact.landingDate || 'IN-FLIGHT ORBIT'}</span>
                    </div>

                    <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                      <span className="text-slate-400 text-[11px]">FINAL SIGNAL:</span>
                      <span className="text-slate-200 font-medium">{artifact.finalSignalDate}</span>
                    </div>

                    <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                      <span className="text-slate-400 text-[11px]">OPERATIONAL SPAN:</span>
                      <span className="text-[#FFB800] font-bold">{artifact.operationalDays} days</span>
                    </div>
                  </div>
                </div>

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

            {/* Junior Explorer Dossier Section (if present) */}
            {artifact.kidFriendly && (
              <div className={`rounded-2xl p-6 border space-y-4 ${
                isJuniorMode 
                  ? 'bg-gradient-to-r from-amber-500/15 via-cyan-500/10 to-transparent border-amber-400/50 shadow-xl' 
                  : 'bg-[#060a14] border-white/10'
              }`}>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>JUNIOR EXPLORER DOSSIER & DID-YOU-KNOW</span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-300">FOR SCHOOL-AGE & CASUAL ENTHUSIASTS</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 p-3.5 rounded-xl bg-black/40 border border-white/5">
                    <div className="text-[10px] font-mono uppercase text-amber-300 font-bold">
                      💡 Mind-Blowing Fact
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                      {artifact.kidFriendly.funFact}
                    </p>
                  </div>

                  <div className="space-y-1.5 p-3.5 rounded-xl bg-black/40 border border-white/5">
                    <div className="text-[10px] font-mono uppercase text-cyan-300 font-bold">
                      ❓ Why Was It Left Behind?
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                      {artifact.kidFriendly.whyLeftBehind}
                    </p>
                  </div>

                  <div className="space-y-1 p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-xs">
                    <span className="text-[10px] text-slate-400 uppercase">REAL-WORLD SCALE:</span>
                    <div className="text-slate-200 font-medium">{artifact.kidFriendly.sizeComparison}</div>
                  </div>

                  {artifact.kidFriendly.weightComparison && (
                    <div className="space-y-1 p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-xs">
                      <span className="text-[10px] text-slate-400 uppercase">WEIGHT ON OFF-WORLD GRAVITY:</span>
                      <div className="text-slate-200 font-medium">{artifact.kidFriendly.weightComparison}</div>
                    </div>
                  )}
                </div>
              </div>
            )}

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
        )}

        {/* Modal Bottom Action Bar */}
        <div className="mt-auto border-t border-white/10 bg-[#050811] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-400">
          <a
            href={artifact.nasaSourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#FFB800] hover:text-[#FFB800]/80 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>VERIFIED NASA ARCHIVE SPECIFICATION</span>
          </a>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                museumAudio.playClick(750);
                setActiveTab(activeTab === 'story' ? 'dossier' : 'story');
              }}
              className="text-cyan-400 hover:text-cyan-300 transition-colors underline underline-offset-4"
            >
              {activeTab === 'story' ? 'VIEW RAW TELEMETRY DOSSIER →' : '← RETURN TO IMMERSIVE STORY'}
            </button>

            <button
              onClick={handleClose}
              className="px-5 py-2 rounded-full border border-white/10 bg-white/[0.04] text-slate-200 hover:bg-white/10 transition-colors font-medium"
            >
              RETURN TO EXPLORATION
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
