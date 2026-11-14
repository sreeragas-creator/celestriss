import React, { useState } from 'react';
import type { Artifact } from '../types';
import { museumAudio } from '../utils/audio';
import { 
  Search, 
  HelpCircle, 
  Award, 
  RotateCcw, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  XCircle,
  Compass
} from 'lucide-react';

interface QuestModeProps {
  artifacts: Artifact[];
  onSelectArtifact: (artifact: Artifact) => void;
  isJuniorMode?: boolean;
}

interface MysteryCase {
  id: string;
  caseNumber: string;
  codename: string;
  difficulty: 'Easy' | 'Medium' | 'Challenging';
  destination: string;
  briefing: string;
  clues: string[];
  targetArtifactId: string;
  rewardBadge: string;
  funFactPostSolve: string;
}

const MYSTERY_CASES: MysteryCase[] = [
  {
    id: 'case_1',
    caseNumber: 'CASE FILE #001',
    codename: 'The Duct-Tape Buggy',
    difficulty: 'Easy',
    destination: 'The Moon (Taurus-Littrow Valley)',
    briefing: 'Deep Space Radar has detected an abandoned electric vehicle resting at the base of the lunar mountains. A repair was made in the field using unusual materials.',
    clues: [
      'It drove 35.9 kilometers across the Moon during the final Apollo mission in December 1972.',
      'When an astronaut snapped off its right fender with a hammer, they repaired it using gray duct tape and paper Moon maps!',
      'Its color television camera was pointed at the lunar module so Earth could broadcast the astronauts blasting off into space.'
    ],
    targetArtifactId: 'apollo-17-lrv',
    rewardBadge: '🔧 Lunar Mechanic Badge',
    funFactPostSolve: 'That duct-taped map fender is still resting completely intact on the Moon right now, preserved by the airless vacuum for over 50 years!'
  },
  {
    id: 'case_2',
    caseNumber: 'CASE FILE #002',
    codename: 'The Dust Devil Marathoner',
    difficulty: 'Medium',
    destination: 'Mars (Meridiani Planum)',
    briefing: 'Mission control lost contact with a legendary wheeled robot in 2018 after a catastrophic planet-wide dust storm. Identify this tireless explorer.',
    clues: [
      'It was designed to survive for only 90 days, but drove across Mars for nearly 15 YEARS (over 5,000 Martian sols)!',
      'Whirling Martian dust devils regularly swept over it, cleaning its solar panels and giving it new life.',
      'It discovered tiny hematite spheres called "blueberries", proving liquid water once soaked the Martian surface.'
    ],
    targetArtifactId: 'opportunity-rover',
    rewardBadge: '🏃 Mars Marathoner Badge',
    funFactPostSolve: 'Opportunity drove 45.16 kilometers (28.1 miles)—holding the all-time off-world driving distance record in human history!'
  },
  {
    id: 'case_3',
    caseNumber: 'CASE FILE #003',
    codename: 'The Kitty Hawk Connection',
    difficulty: 'Medium',
    destination: 'Mars (Jezero Crater)',
    briefing: 'Satellites have imaged a grounded two-bladed flying craft resting among the sand ripples of Valinor Hills. It carried a secret piece of aviation history.',
    clues: [
      'It weighs just 4 pounds (1.8 kg) and its twin carbon-fiber blades spun at 2,400 RPM to lift off in Mars’s 1% air.',
      'It carried a tiny swatch of muslin wing fabric from the Wright Brothers’ 1903 Flyer attached under its solar panel.',
      'It was built for only 5 test flights, but flew 72 times across three years acting as an aerial scout.'
    ],
    targetArtifactId: 'ingenuity-helicopter',
    rewardBadge: '🚁 Alien Aviator Badge',
    funFactPostSolve: 'Even though a chipped blade grounded it on Flight 72, its flight computer still wakes up every sol to record Martian weather data!'
  },
  {
    id: 'case_4',
    caseNumber: 'CASE FILE #004',
    codename: 'The Message to the Stars',
    difficulty: 'Challenging',
    destination: 'Interstellar Space',
    briefing: 'A silent probe is coasting past the outer edges of our Solar System on an escape trajectory toward distant constellations.',
    clues: [
      'Launched in 1972, it was the first spacecraft to safely cross the Asteroid Belt and fly past Jupiter.',
      'Bolted to its antenna strut is a gold-anodized plaque designed by Carl Sagan with drawings of human figures and a pulsar map of Earth.',
      'It is currently drifting through interstellar space over 12 billion miles away from our Sun.'
    ],
    targetArtifactId: 'pioneer-10-11',
    rewardBadge: '✨ Interstellar Emissary Badge',
    funFactPostSolve: 'The golden plaque was designed to resist cosmic ray erosion and will survive intact for billions of years—likely outlasting the Earth itself!'
  },
  {
    id: 'case_5',
    caseNumber: 'CASE FILE #005',
    codename: 'The Arctic Permafrost Miner',
    difficulty: 'Challenging',
    destination: 'Mars Arctic (Vastitas Borealis)',
    briefing: 'A three-legged robotic lander rests buried in the high arctic plains of Mars. It was the first machine to physically touch water ice on the Red Planet.',
    clues: [
      'Landed in 2008 and used a robotic backhoe arm to dig trench "Dodo-Goldilocks".',
      'Photographed chunks of pure white water ice that slowly vaporized into the thin atmosphere right in front of its cameras.',
      'During the freezing polar winter, hundreds of kilograms of solid carbon dioxide dry-ice frost crushed its circular solar wings.'
    ],
    targetArtifactId: 'phoenix-lander',
    rewardBadge: '❄️ Polar Ice Scout Badge',
    funFactPostSolve: 'Phoenix also used laser LIDAR to detect snow falling from Martian clouds, proving that Mars has genuine winter snowstorms!'
  }
];

export const QuestMode: React.FC<QuestModeProps> = ({
  artifacts,
  onSelectArtifact,
  isJuniorMode = false
}) => {
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);
  const [revealedCluesCount, setRevealedCluesCount] = useState<Record<string, number>>({
    case_1: 1,
    case_2: 1,
    case_3: 1,
    case_4: 1,
    case_5: 1
  });
  const [solvedCases, setSolvedCases] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('celestriss_solved_cases');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [candidateArtifactId, setCandidateArtifactId] = useState<string>('');
  const [feedback, setFeedback] = useState<{ status: 'correct' | 'wrong' | null; message: string }>({
    status: null,
    message: ''
  });

  const activeCase = MYSTERY_CASES[selectedCaseIdx];
  const isCaseSolved = solvedCases.includes(activeCase.id);
  const targetArtifact = artifacts.find(a => a.id === activeCase.targetArtifactId);

  const handleRevealNextClue = () => {
    museumAudio.playClick(850);
    setRevealedCluesCount(prev => ({
      ...prev,
      [activeCase.id]: Math.min(3, (prev[activeCase.id] || 1) + 1)
    }));
  };

  const handleVerifyCandidate = () => {
    if (!candidateArtifactId) return;

    if (candidateArtifactId === activeCase.targetArtifactId) {
      museumAudio.playScanPing();
      setFeedback({
        status: 'correct',
        message: `CASE SOLVED! Outstanding detective work. You correctly identified ${targetArtifact?.name || 'the artifact'}!`
      });

      if (!solvedCases.includes(activeCase.id)) {
        const nextSolved = [...solvedCases, activeCase.id];
        setSolvedCases(nextSolved);
        try {
          localStorage.setItem('celestriss_solved_cases', JSON.stringify(nextSolved));
        } catch {
          // ignore
        }
      }
    } else {
      museumAudio.playClick(350);
      setFeedback({
        status: 'wrong',
        message: 'Telemetry mismatch! That artifact does not match the case clues. Review the evidence and try again.'
      });
    }
  };

  const handleResetQuest = () => {
    if (confirm('Reset your detective progress and badges?')) {
      museumAudio.playClick(500);
      setSolvedCases([]);
      localStorage.removeItem('celestriss_solved_cases');
      setFeedback({ status: null, message: '' });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      
      {/* Top Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-950/40 via-cyan-950/40 to-slate-900 border border-white/10 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 font-mono text-[11px] uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-amber-300" />
              COSMIC DETECTIVE // SPACE ARCHEOLOGY QUEST
            </span>
            {isJuniorMode && (
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/20 border border-cyan-400/30 text-cyan-300 font-mono text-[10px] uppercase">
                Junior Sleuth
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-4xl font-heading font-light tracking-wide text-white">
            The Lost Hardware Case Files
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-light max-w-2xl leading-relaxed">
            Read the astronaut logs and satellite radar clues. Search the catalog of relics on the Moon, Mars, and deep space to identify the mystery machines!
          </p>
        </div>

        {/* Detective Rank HUD */}
        <div className="p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-4 shrink-0 font-mono">
          <div className="text-center">
            <div className="text-[10px] text-slate-400 uppercase">CASES SOLVED</div>
            <div className="text-2xl font-bold text-amber-400">
              {solvedCases.length} / {MYSTERY_CASES.length}
            </div>
          </div>
          <div className="border-l border-white/10 pl-4 space-y-1">
            <div className="text-[10px] text-slate-400 uppercase">SLEUTH RANK</div>
            <div className="text-xs font-bold text-cyan-300">
              {solvedCases.length === 5 ? '🏆 CHIEF INVESTIGATOR' : solvedCases.length >= 3 ? '🔍 SENIOR SLEUTH' : '⭐ JUNIOR SCOUT'}
            </div>
          </div>
        </div>
      </div>

      {/* Case File Selector Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {MYSTERY_CASES.map((c, idx) => {
          const isSelected = idx === selectedCaseIdx;
          const isSolved = solvedCases.includes(c.id);
          return (
            <button
              key={c.id}
              onClick={() => {
                museumAudio.playClick(850);
                setSelectedCaseIdx(idx);
                setFeedback({ status: null, message: '' });
                setCandidateArtifactId('');
              }}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-amber-500/20 border-amber-400 text-white shadow-lg'
                  : 'bg-[#070c1a] border-white/5 text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                <span>{c.caseNumber}</span>
                {isSolved ? (
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-slate-600" />
                )}
              </div>
              <div className="text-xs font-heading font-medium truncate text-white">
                {c.codename}
              </div>
              <div className="text-[10px] font-mono text-cyan-400 truncate mt-1">
                {c.difficulty}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Detective Investigation Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Clues and Dossier (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-[#060a15]/90 backdrop-blur-xl border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                {activeCase.caseNumber} // {activeCase.difficulty.toUpperCase()} DIFFICULTY
              </span>
              <h2 className="text-xl sm:text-2xl font-heading font-light text-white">
                {activeCase.codename}
              </h2>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>{activeCase.destination}</span>
            </div>
          </div>

          {/* Case Briefing */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
              OFFICIAL MISSION BRIEFING
            </div>
            <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
              {activeCase.briefing}
            </p>
          </div>

          {/* Clues Unlocked */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>UNCOVERED EVIDENCE CLUES ({revealedCluesCount[activeCase.id] || 1}/3)</span>
              </div>

              {(revealedCluesCount[activeCase.id] || 1) < 3 && !isCaseSolved && (
                <button
                  onClick={handleRevealNextClue}
                  className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1"
                >
                  <span>REVEAL NEXT CLUE (+1)</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="space-y-2.5">
              {activeCase.clues.slice(0, revealedCluesCount[activeCase.id] || 1).map((clue, cIdx) => (
                <div
                  key={cIdx}
                  className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-slate-200 font-sans flex items-start gap-3 animate-fade-in"
                >
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                    {cIdx + 1}
                  </span>
                  <span className="leading-relaxed">{clue}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suspect Identification Dropdown / Verification */}
          <div className="pt-4 border-t border-white/10 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>MATCH WITH HISTORIC ARTIFACT CATALOG</span>
            </div>

            {!isCaseSolved ? (
              <div className="space-y-3">
                <select
                  value={candidateArtifactId}
                  onChange={(e) => setCandidateArtifactId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/20 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                >
                  <option value="">-- Choose Matching Artifact From Archive --</option>
                  {artifacts.map(a => (
                    <option key={a.id} value={a.id}>
                      {a.name} ({a.launchYear} • {a.celestialBody.toUpperCase()})
                    </option>
                  ))}
                </select>

                <button
                  disabled={!candidateArtifactId}
                  onClick={handleVerifyCandidate}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-heading font-semibold text-xs tracking-wider uppercase transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Verify Detective Match</span>
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 space-y-2">
                <div className="flex items-center gap-2 text-emerald-300 font-heading font-bold text-sm">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span>CASE FILE OFFICIALLY CLOSED</span>
                </div>
                <p className="text-xs text-slate-200 font-sans leading-relaxed">
                  {activeCase.funFactPostSolve}
                </p>
                <div className="pt-2 text-xs font-mono text-amber-300 font-bold">
                  REWARD EARNED: {activeCase.rewardBadge}
                </div>
              </div>
            )}

            {/* Feedback Alert */}
            {feedback.status && !isCaseSolved && (
              <div className={`p-3.5 rounded-xl border text-xs leading-relaxed flex items-start gap-2.5 animate-fade-in ${
                feedback.status === 'correct'
                  ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200'
                  : 'bg-rose-950/60 border-rose-500/60 text-rose-200'
              }`}>
                {feedback.status === 'correct' ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                )}
                <span>{feedback.message}</span>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Suspect Dossier & Reward Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Target Artifact Preview (Revealed upon solve) */}
          {isCaseSolved && targetArtifact ? (
            <div className="rounded-3xl bg-[#070c1a] border border-emerald-500/40 p-6 space-y-4 shadow-2xl animate-fade-in">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase font-bold">
                  VERIFIED HARDWARE IDENTIFICATION
                </span>
                <span className="text-[10px] font-mono text-slate-400">{targetArtifact.archivalId}</span>
              </div>

              <div className="rounded-2xl overflow-hidden border border-white/10 aspect-video relative">
                <img
                  src={targetArtifact.imageUrl || `/images/artifacts/${targetArtifact.id}.jpg`}
                  alt={targetArtifact.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-heading text-white font-medium">
                  {targetArtifact.name}
                </h3>
                <p className="text-xs text-slate-300 font-sans mt-1 leading-relaxed">
                  {targetArtifact.brief}
                </p>
              </div>

              <button
                onClick={() => {
                  museumAudio.playClick(900);
                  onSelectArtifact(targetArtifact);
                }}
                className="w-full py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-200 font-mono text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2"
              >
                <span>INSPECT FULL EXHIBIT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="rounded-3xl bg-[#070c1a] border border-white/10 p-6 space-y-4 shadow-2xl text-center">
              <HelpCircle className="w-12 h-12 text-slate-600 mx-auto animate-pulse" />
              <div className="text-sm font-heading text-white">
                Mystery Hardware Redacted
              </div>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Review the clues in the case file, choose the matching specimen from the catalog, and hit Verify!
              </p>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] font-mono text-amber-400">
                REWARD: {activeCase.rewardBadge}
              </div>
            </div>
          )}

          {/* Master Detective Trophy Card */}
          {solvedCases.length === MYSTERY_CASES.length && (
            <div className="rounded-3xl p-6 bg-gradient-to-br from-amber-500/20 via-cyan-500/20 to-purple-500/20 border-2 border-amber-400 text-center space-y-3 shadow-2xl animate-fade-in">
              <Award className="w-12 h-12 text-amber-400 mx-auto animate-bounce" />
              <div className="text-[10px] font-mono text-amber-300 uppercase tracking-widest font-bold">
                CHIEF PLANETARY INVESTIGATOR
              </div>
              <h4 className="text-base font-heading text-white font-medium">
                All 5 Cold Cases Solved!
              </h4>
              <p className="text-xs text-slate-300 font-sans">
                You have proven mastery over the forgotten hardware of the Moon, Mars, and the outer solar system!
              </p>
              <button
                onClick={handleResetQuest}
                className="text-[11px] font-mono text-slate-400 hover:text-white flex items-center gap-1 mx-auto pt-2"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Quest Progress</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};