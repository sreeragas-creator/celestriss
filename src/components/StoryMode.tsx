import React, { useState, useEffect, useRef } from 'react';
import type { Artifact } from '../types';
import { museumAudio } from '../utils/audio';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  ChevronRight, 
  ChevronLeft, 
  Award, 
  CheckCircle2, 
  HelpCircle, 
  Compass, 
  RotateCcw,
  Zap,
  ArrowRight
} from 'lucide-react';

interface StoryModeProps {
  artifacts: Artifact[];
  onSelectArtifact: (artifact: Artifact) => void;
  isJuniorMode?: boolean;
}

interface Chapter {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  destination: string;
  era: string;
  intro: string;
  narrativeParagraphs: string[];
  spotlightArtifactId: string;
  interactiveClues: {
    title: string;
    description: string;
    revealedFact: string;
  }[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  badge: {
    id: string;
    title: string;
    desc: string;
    icon: string;
  };
}

const CHAPTERS: Chapter[] = [
  {
    id: 'ch1',
    number: 1,
    title: 'The Plaque at Tranquility Base',
    subtitle: 'Humanity’s First Footprints & The Left-Behind Launchpads',
    destination: 'The Moon (Mare Tranquillitatis)',
    era: '1969 — 1972 Apollo Era',
    intro: 'Year 2099. You are a Cadet Space Archaeologist touching down on the lunar surface. Fifty miles away shines the Earth like a brilliant sapphire marble. Before you stands a two-story octagonal structure draped in golden foil.',
    narrativeParagraphs: [
      'When Neil Armstrong and Buzz Aldrin blasted off from the Moon on July 24, 1969, they didn’t take everything back with them. In fact, they deliberately left the bottom half of the Eagle Lunar Module behind.',
      'Why? Because of the brutal laws of rocketry! Every single pound brought back to Earth requires extra rocket fuel. By using Eagle’s descent stage as a launchpad and leaving it behind, the astronauts saved thousands of pounds of fuel—ensuring they had enough propellant to reunite with Michael Collins in orbit and make it home alive.',
      'Bolted to the landing leg is a stainless-steel plate that has rested undisturbed in the lunar vacuum for over half a century: "Here men from the planet Earth first set foot upon the Moon, July 1969 A.D. We came in peace for all mankind."'
    ],
    spotlightArtifactId: 'apollo-11-eagle',
    interactiveClues: [
      {
        title: 'Inspect the Front Landing Strut',
        description: 'Take a close look at the ladder and plaque.',
        revealedFact: 'Beside the plaque is a silicon disc the size of a half-dollar, containing microscopic goodwill messages from 73 world leaders!'
      },
      {
        title: 'Scan the Nearby ALSEP Station',
        description: 'Examine the suitcase-sized equipment package 100 meters away.',
        revealedFact: 'Scientists on Earth STILL shoot laser beams from giant telescopes at its mirror prisms today to measure the Moon’s exact orbit down to the millimeter!'
      },
      {
        title: 'Check the Apollo 17 Moon Buggy',
        description: 'Travel to Taurus-Littrow and inspect LRV-003.',
        revealedFact: 'When astronaut Gene Cernan broke the buggy’s fender with a hammer, they taped four paper Moon maps together with gray duct tape! That taped map fender is still resting on the Moon!'
      }
    ],
    quiz: {
      question: 'Why did the Apollo 11 astronauts leave the bottom half of the Lunar Module (Eagle) on the Moon?',
      options: [
        'They forgot the ignition keys to the landing base',
        'It was used as the launchpad, and leaving it saved weight and fuel to get home',
        'Alien life forms asked them to leave it as a peace monument',
        'The tires had popped in the lunar dust'
      ],
      correctIndex: 1,
      explanation: 'Leaving the heavy descent stage behind allowed Neil and Buzz to take off in the lightweight Ascent Stage with enough fuel to reach lunar orbit and return to Earth!'
    },
    badge: {
      id: 'badge_lunar',
      title: 'Tranquility Historian',
      desc: 'Mastered the secrets of lunar hardware and the physics of Apollo launchpads.',
      icon: '🌕'
    }
  },
  {
    id: 'ch2',
    number: 2,
    title: 'The Red Planet Marathoners',
    subtitle: '15 Years in the Dust: The Legend of Spirit & Opportunity',
    destination: 'Mars (Gusev Crater & Endeavour Rim)',
    era: '2004 — 2019 Robotic Reconnaissance',
    intro: 'Your scout ship lands on the rust-colored plains of Mars. The thin wind howls softly. In the distance, an inactive golf-cart-sized rover rests on the rim of a giant ancient impact crater.',
    narrativeParagraphs: [
      'In January 2004, twin rovers named Spirit and Opportunity bounced onto opposite sides of Mars inside giant clusters of airbags. NASA engineers hoped they might survive for 90 days (about 3 months) before Martian dust coated their solar panels and killed them.',
      'Instead, Opportunity ("Oppy") became the greatest robotic marathoner in human history! It drove across 28.1 miles (45.16 kilometers) of Martian dunes and craters for nearly 15 YEARS—more than 55 times its planned lifespan!',
      'What saved them? Martian dust devils! Giant swirling mini-tornadoes periodically swept right over the rovers, miraculously vacuuming the dust off their solar panels and restoring their power. On June 10, 2018, a catastrophic planet-wide dust storm blotted out the sun, plunging Mars into darkness. Oppy’s final telemetry packet warned that battery levels had dropped critically low.'
    ],
    spotlightArtifactId: 'opportunity-rover',
    interactiveClues: [
      {
        title: 'Examine the Front Right Wheel of Spirit',
        description: 'Inspect Spirit’s jammed wheel at Home Plate.',
        revealedFact: 'When the wheel jammed, Spirit had to drive backwards dragging it. The dragging wheel scraped open pure white silica powder, proving Mars once had hot springs and geysers!'
      },
      {
        title: 'Inspect Oppy’s "Blueberries"',
        description: 'Look through the microscopic camera on Opportunity’s arm.',
        revealedFact: 'Oppy discovered tiny gray spheres made of hematite, nicknamed "blueberries", which proved beyond doubt that liquid water once pooled across the surface of Mars!'
      },
      {
        title: 'Analyze the Solar Panels',
        description: 'Scan the layer of red dust resting on the arrays.',
        revealedFact: 'Opportunity completed the first full marathon on another world, logging 42.195 km on March 24, 2015, outside Marathon Valley!'
      }
    ],
    quiz: {
      question: 'What natural phenomenon unexpectedly cleaned Opportunity’s solar panels and helped it survive for 15 years?',
      options: [
        'Sudden rain showers in the Martian clouds',
        'Martian dust devils (whirlwinds) that swept the dust off',
        'Astronauts driving by to squeegee the panels',
        'Robotic cleaning wipers installed on the cameras'
      ],
      correctIndex: 1,
      explanation: 'Martian dust devils regularly swept over Opportunity and Spirit, cleaning the dust off their solar arrays and restoring their battery power!'
    },
    badge: {
      id: 'badge_mars',
      title: 'Red Dust Veteran',
      desc: 'Honored the 15-year marathon of humanity’s robotic pioneers on Mars.',
      icon: '🔴'
    }
  },
  {
    id: 'ch3',
    number: 3,
    title: 'The First Wings on an Alien World',
    subtitle: 'The Miracle Helicopter Ingenuity & The Arctic Ice Miners',
    destination: 'Mars (Jezero Crater & Vastitas Borealis)',
    era: '2008 — 2024 Aerial & Subsurface Discovery',
    intro: 'You hike into the dry river delta of Jezero Crater. Resting upright between red sand ripples is a featherweight machine with twin carbon-fiber helicopter blades.',
    narrativeParagraphs: [
      'Flying on Mars was once considered almost impossible. The Martian atmosphere is less than 1% as thick as Earth’s! That means trying to fly on Mars is like trying to fly at 100,000 feet altitude on Earth.',
      'To generate lift in such whisper-thin air, NASA’s Ingenuity helicopter was engineered to weigh only 4 pounds (1.8 kg). Its twin carbon-fiber blades had to spin at an astonishing 2,400 to 2,700 revolutions per minute—roughly 5 times faster than a regular passenger helicopter on Earth!',
      'Ingenuity was only built for 5 short test flights. Instead, it soared 72 times across three years, acting as an aerial scout for the Perseverance rover. Underneath its tiny solar panel is a hidden treasure: a tiny postage-stamp-sized swatch of wing fabric from the Wright Brothers’ 1903 Flyer, connecting humanity’s very first flight on Earth to our first flight on Mars.'
    ],
    spotlightArtifactId: 'ingenuity-helicopter',
    interactiveClues: [
      {
        title: 'Inspect the Blade Tips',
        description: 'Zoom in on the carbon-fiber rotor blades.',
        revealedFact: 'On Flight 72, Ingenuity touched down hard on featureless sand and chipped its rotor tips. Even grounded, its computer still wakes up every day to measure Martian weather!'
      },
      {
        title: 'Check the Wright Brothers Fabric',
        description: 'Examine the cable beneath the solar panel.',
        revealedFact: 'A piece of unbleached muslin cloth from the 1903 Kitty Hawk flyer made the 300-million-mile journey to Mars!'
      },
      {
        title: 'Scan the Phoenix Arctic Lander',
        description: 'Look at the high arctic plains of Vastitas Borealis.',
        revealedFact: 'Phoenix scraped the arctic soil and found real water ice that vaporized before its cameras! Every winter, hundreds of pounds of solid carbon dioxide dry-ice frost freeze over it.'
      }
    ],
    quiz: {
      question: 'Why did Ingenuity’s rotor blades need to spin 5 times faster than an Earth helicopter?',
      options: [
        'Because Mars has 10 times stronger gravity than Earth',
        'Because the Martian atmosphere is less than 1% as thick as Earth’s',
        'To scare away curious Martian wildlife',
        'Because the battery had too much extra power'
      ],
      correctIndex: 1,
      explanation: 'With Mars’s air being ultra-thin (1% of Earth’s density), the blades had to spin at 2,400+ RPM to generate enough aerodynamic lift!'
    },
    badge: {
      id: 'badge_air',
      title: 'Aeronaut of Ares',
      desc: 'Discovered how engineers conquered flight in the razor-thin atmosphere of Mars.',
      icon: '🚁'
    }
  },
  {
    id: 'ch4',
    number: 4,
    title: 'Voices in the Interstellar Void',
    subtitle: 'The Eternal Drift of Pioneer, Kepler, and the Gold Plaques',
    destination: 'Interstellar Space & Deep Heliocentric Orbit',
    era: '1972 — Present Interstellar Voyages',
    intro: 'Your observation ship leaves the inner solar system behind, soaring beyond Neptune into the cold, silent twilight of the Kuiper Belt and outer heliosphere.',
    narrativeParagraphs: [
      'Not all abandoned space hardware rests on dusty planets. Some of our greatest machines are sailing endlessly through the deep void of space, never to return.',
      'In 1972 and 1973, Pioneer 10 and 11 became the first probes to cross the perilous Asteroid Belt and fly past Jupiter and Saturn. Jupiter’s colossal gravitational slingshot accelerated them to escape velocity, flinging them out of our Solar System forever.',
      'Bolted to each Pioneer probe is a gold-anodized aluminum plaque designed by Carl Sagan. It features drawings of a human man and woman, and a star map using 14 pulsars to show extraterrestrial civilizations where Earth is located. Even after the Sun expands and swallows Earth billions of years from now, these golden plaques will still be drifting safely through the Milky Way galaxy.'
    ],
    spotlightArtifactId: 'pioneer-10-11',
    interactiveClues: [
      {
        title: 'Inspect the Pioneer Golden Plaque',
        description: 'Examine the engraved diagram bolted to the antenna.',
        revealedFact: 'The plaque uses the hyperfine transition of neutral hydrogen as a universal cosmic ruler and clock, readable by any alien intelligence with physics knowledge!'
      },
      {
        title: 'Check the Kepler Planet Hunter',
        description: 'Look at the space telescope orbiting the Sun 94 million miles away.',
        revealedFact: 'Kepler discovered over 2,600 confirmed alien worlds before running out of fuel in 2018. When its fuel died, NASA sent it a final "Goodnight" command.'
      },
      {
        title: 'Scan the Asteroid Touchdown of NEAR',
        description: 'Visit Asteroid 433 Eros.',
        revealedFact: 'NEAR Shoemaker was never designed to land! It gently touched down on asteroid rocks at 4 mph on its solar panel tips and kept broadcasting!'
      }
    ],
    quiz: {
      question: 'What message do the Pioneer 10 and 11 probes carry into interstellar space?',
      options: [
        'A list of the fastest sports cars on Earth',
        'A gold-coated plaque with drawings of humans and a star map showing Earth’s position',
        'A time capsule full of soil and flower seeds',
        'A digital library of popular 1970s disco songs'
      ],
      correctIndex: 1,
      explanation: 'The Carl Sagan Pioneer plaque features diagrams of human beings and a pulsar map that shows any alien civilization how to locate planet Earth!'
    },
    badge: {
      id: 'badge_void',
      title: 'Interstellar Voyager',
      desc: 'Followed humanity’s eternal messengers drifting through the starry Milky Way.',
      icon: '✨'
    }
  }
];

export const StoryMode: React.FC<StoryModeProps> = ({ 
  artifacts, 
  onSelectArtifact,
  isJuniorMode = false 
}) => {
  const [currentChapterIdx, setCurrentChapterIdx] = useState(0);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('celestriss_badges');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [clueRevealed, setClueRevealed] = useState<Record<string, boolean>>({});
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [isNarrating, setIsNarrating] = useState<boolean>(false);

  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const currentChapter = CHAPTERS[currentChapterIdx];
  const spotlightArtifact = artifacts.find(a => a.id === currentChapter.spotlightArtifactId);

  // Save badges
  useEffect(() => {
    try {
      localStorage.setItem('celestriss_badges', JSON.stringify(unlockedBadges));
    } catch {
      // ignore storage error
    }
  }, [unlockedBadges]);

  // Cleanup speech narration on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const switchChapter = (idx: number) => {
    museumAudio.playClick(850);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsNarrating(false);
    setSelectedQuizAnswer(null);
    setQuizSubmitted(false);
    setCurrentChapterIdx(idx);
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
      const textToRead = `${currentChapter.title}. ${currentChapter.subtitle}. ${currentChapter.intro} ${currentChapter.narrativeParagraphs.join(' ')}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      
      utterance.onend = () => {
        setIsNarrating(false);
      };
      utterance.onerror = () => {
        setIsNarrating(false);
      };

      speechRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsNarrating(true);
    }
  };

  const handleRevealClue = (idx: number) => {
    museumAudio.playScanPing();
    setClueRevealed(prev => ({ ...prev, [`${currentChapter.id}_${idx}`]: true }));
  };

  const handleSelectAnswer = (idx: number) => {
    if (quizSubmitted) return;
    museumAudio.playClick(900);
    setSelectedQuizAnswer(idx);
  };

  const handleSubmitQuiz = () => {
    if (selectedQuizAnswer === null) return;
    setQuizSubmitted(true);
    
    if (selectedQuizAnswer === currentChapter.quiz.correctIndex) {
      museumAudio.playScanPing();
      if (!unlockedBadges.includes(currentChapter.badge.id)) {
        setUnlockedBadges(prev => [...prev, currentChapter.badge.id]);
      }
    } else {
      museumAudio.playClick(400);
    }
  };

  const isBadgeUnlocked = (badgeId: string) => unlockedBadges.includes(badgeId);

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      {/* Header Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-amber-950/40 via-cyan-950/30 to-purple-950/40 border border-white/10 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none text-9xl">
          🚀
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 font-mono text-[11px] uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                STORY EXPEDITION // CADET ARCHEOLOGIST 2099
              </span>
              {isJuniorMode && (
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/20 border border-cyan-400/30 text-cyan-300 font-mono text-[10px] uppercase">
                  Junior Explorer Mode
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-4xl font-heading font-light tracking-wide text-white">
              Chronicles of the Abandoned
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-light max-w-2xl leading-relaxed">
              Step into the boots of a 22nd-century Space Archaeologist. Travel across the Moon, Mars, and interstellar void to uncover the heroic human stories behind the machines left behind.
            </p>
          </div>

          {/* Badges Earned HUD */}
          <div className="p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-4 shrink-0">
            <div className="text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase">BADGES</div>
              <div className="text-xl font-bold text-amber-400">{unlockedBadges.length} / {CHAPTERS.length}</div>
            </div>
            <div className="flex items-center gap-2">
              {CHAPTERS.map(ch => (
                <div 
                  key={ch.badge.id}
                  title={`${ch.badge.title}: ${ch.badge.desc}`}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg border transition-all ${
                    isBadgeUnlocked(ch.badge.id)
                      ? 'bg-amber-500/20 border-amber-400/60 shadow-[0_0_12px_rgba(245,158,11,0.5)] scale-105'
                      : 'bg-white/5 border-white/10 opacity-30 grayscale'
                  }`}
                >
                  {ch.badge.icon}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chapter Stepper Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-6 pt-6 border-t border-white/10">
          {CHAPTERS.map((ch, idx) => {
            const isActive = idx === currentChapterIdx;
            const isCompleted = isBadgeUnlocked(ch.badge.id);
            return (
              <button
                key={ch.id}
                onClick={() => switchChapter(idx)}
                className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between ${
                  isActive
                    ? 'bg-white/15 border-amber-400/70 text-white shadow-lg'
                    : 'bg-black/40 border-white/5 text-slate-400 hover:bg-white/5 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className="uppercase text-amber-400 font-bold">CHAPTER 0{ch.number}</span>
                  {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <div className="text-xs font-heading font-medium truncate text-white">{ch.title}</div>
                <div className="text-[10px] text-slate-400 font-mono truncate mt-0.5">{ch.destination}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Chapter Content Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: The Narrative Story (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-[#060a15]/90 backdrop-blur-xl border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl">
          
          {/* Chapter Meta HUD */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-400">
                {currentChapter.destination} • {currentChapter.era}
              </span>
              <h2 className="text-xl sm:text-2xl font-heading font-light text-white">
                {currentChapter.title}
              </h2>
            </div>

            {/* Audio Narration Speech Synthesis Button */}
            <button
              onClick={toggleNarration}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono border flex items-center gap-2 transition-all ${
                isNarrating
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 animate-pulse shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {isNarrating ? <VolumeX className="w-4 h-4 text-amber-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
              <span>{isNarrating ? 'STOP AUDIO LOG' : 'LISTEN TO NARRATOR'}</span>
            </button>
          </div>

          {/* Story Intro Callout */}
          <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs sm:text-sm text-amber-200/90 font-serif italic leading-relaxed">
            "{currentChapter.intro}"
          </div>

          {/* Narrative Body Paragraphs */}
          <div className="space-y-4 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
            {currentChapter.narrativeParagraphs.map((para, pIdx) => (
              <p key={pIdx}>
                {para}
              </p>
            ))}
          </div>

          {/* Interactive Field Investigations / Clues */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-300 font-bold">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Interactive Archeologist Investigations</span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Click to examine clues in situ and record findings in your Field Journal:
            </p>

            <div className="space-y-2.5">
              {currentChapter.interactiveClues.map((clue, cIdx) => {
                const key = `${currentChapter.id}_${cIdx}`;
                const isRevealed = clueRevealed[key];
                return (
                  <div
                    key={cIdx}
                    onClick={() => handleRevealClue(cIdx)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isRevealed
                        ? 'bg-cyan-950/40 border-cyan-500/40 text-slate-200'
                        : 'bg-black/40 border-white/5 hover:border-white/20 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-heading font-medium text-white">
                        <span className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-[10px] text-cyan-300 font-mono">
                          {cIdx + 1}
                        </span>
                        <span>{clue.title}</span>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-400">
                        {isRevealed ? 'LOGGED' : 'EXAMINE 🔍'}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-400 mt-1 pl-7">
                      {clue.description}
                    </div>

                    {isRevealed && (
                      <div className="mt-2.5 pl-7 pt-2 border-t border-cyan-500/20 text-xs text-cyan-200 font-sans leading-relaxed animate-fade-in flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{clue.revealedFact}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chapter Quiz to Earn Badge */}
          <div className="pt-6 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>Cadet Field Knowledge Check</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">UNLOCK BADGE</span>
            </div>

            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-3">
              <div className="text-xs sm:text-sm font-heading text-white">
                {currentChapter.quiz.question}
              </div>

              <div className="space-y-2">
                {currentChapter.quiz.options.map((opt, oIdx) => {
                  const isSelected = selectedQuizAnswer === oIdx;
                  let btnColor = 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10';
                  
                  if (quizSubmitted) {
                    if (oIdx === currentChapter.quiz.correctIndex) {
                      btnColor = 'bg-emerald-950/60 border-emerald-500/80 text-emerald-300 font-medium';
                    } else if (isSelected) {
                      btnColor = 'bg-rose-950/60 border-rose-500/80 text-rose-300';
                    }
                  } else if (isSelected) {
                    btnColor = 'bg-amber-950/60 border-amber-400/80 text-amber-300';
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={quizSubmitted}
                      onClick={() => handleSelectAnswer(oIdx)}
                      className={`w-full p-2.5 rounded-xl border text-left text-xs font-sans transition-all flex items-start gap-2.5 ${btnColor}`}
                    >
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white shrink-0">
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {!quizSubmitted ? (
                <button
                  disabled={selectedQuizAnswer === null}
                  onClick={handleSubmitQuiz}
                  className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 font-heading font-semibold text-xs tracking-wider uppercase transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-amber-400 flex items-center justify-center gap-2 mt-2"
                >
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>Verify Field Answer</span>
                </button>
              ) : (
                <div className="space-y-3 pt-2">
                  <div className={`p-3 rounded-xl border text-xs leading-relaxed ${
                    selectedQuizAnswer === currentChapter.quiz.correctIndex
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                  }`}>
                    <div className="font-bold font-mono text-[11px] mb-1">
                      {selectedQuizAnswer === currentChapter.quiz.correctIndex
                        ? '🎉 OUTSTANDING WORK, CADET! BADGE UNLOCKED!'
                        : '❌ NOT QUITE! HERE IS THE HISTORICAL FACT:'}
                    </div>
                    {currentChapter.quiz.explanation}
                  </div>

                  {selectedQuizAnswer !== currentChapter.quiz.correctIndex && (
                    <button
                      onClick={() => {
                        setQuizSubmitted(false);
                        setSelectedQuizAnswer(null);
                      }}
                      className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Try Quiz Again</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Navigation Between Chapters */}
          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <button
              disabled={currentChapterIdx === 0}
              onClick={() => switchChapter(Math.max(0, currentChapterIdx - 1))}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>PREVIOUS EXPEDITION</span>
            </button>

            <button
              disabled={currentChapterIdx === CHAPTERS.length - 1}
              onClick={() => switchChapter(Math.min(CHAPTERS.length - 1, currentChapterIdx + 1))}
              className="px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 text-xs font-mono disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 transition-all font-bold"
            >
              <span>NEXT EXPEDITION</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Featured Artifact & Archeology Dossier (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Spotlight Artifact Card */}
          {spotlightArtifact && (
            <div className="rounded-3xl bg-[#070c1a] border border-white/10 p-5 sm:p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[10px] font-mono tracking-widest uppercase text-amber-400 font-bold">
                  EXPEDITION HARDWARE SPECIMEN
                </span>
                <span className="text-[10px] font-mono text-slate-400">{spotlightArtifact.launchYear}</span>
              </div>

              {/* Photo */}
              <div className="rounded-2xl overflow-hidden border border-white/10 aspect-video relative group">
                <img 
                  src={spotlightArtifact.imageUrl || `/images/artifacts/${spotlightArtifact.id}.jpg`} 
                  alt={spotlightArtifact.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2.5 left-3 right-3 text-[11px] font-mono text-slate-300 truncate">
                  {spotlightArtifact.coordinates.landingSite}
                </div>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-heading font-light text-white">
                  {spotlightArtifact.name}
                </h3>
                <p className="text-xs text-slate-400 font-light mt-1 line-clamp-2">
                  {spotlightArtifact.brief}
                </p>
              </div>

              {/* Kid-Friendly Fact Spotlight */}
              {spotlightArtifact.kidFriendly && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase text-amber-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Did You Know?</span>
                  </div>
                  <p className="text-xs text-amber-100 font-sans leading-relaxed">
                    {spotlightArtifact.kidFriendly.funFact}
                  </p>
                  <div className="pt-2 border-t border-amber-500/20 text-[11px] text-amber-200/80 font-mono">
                    <span className="font-bold">Size:</span> {spotlightArtifact.kidFriendly.sizeComparison}
                  </div>
                </div>
              )}

              {/* Inspect Button */}
              <button
                onClick={() => {
                  museumAudio.playClick(900);
                  onSelectArtifact(spotlightArtifact);
                }}
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-mono text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2"
              >
                <span>OPEN FULL TECHNICAL DOSSIER</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Active Chapter Badge Spotlight */}
          <div className="rounded-3xl bg-[#070c1a] border border-white/10 p-5 sm:p-6 space-y-3">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              CHAPTER BADGE CHALLENGE
            </div>

            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl border transition-all ${
                isBadgeUnlocked(currentChapter.badge.id)
                  ? 'bg-amber-500/20 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.6)]'
                  : 'bg-white/5 border-white/10 opacity-40 grayscale'
              }`}>
                {currentChapter.badge.icon}
              </div>

              <div className="space-y-1">
                <div className="text-sm font-heading font-medium text-white flex items-center gap-2">
                  <span>{currentChapter.badge.title}</span>
                  {isBadgeUnlocked(currentChapter.badge.id) ? (
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
                      UNLOCKED
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-500 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                      LOCKED
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  {currentChapter.badge.desc}
                </p>
              </div>
            </div>
          </div>

          {/* Master Certification Credential (Unlocked when all 4 completed) */}
          {unlockedBadges.length === CHAPTERS.length && (
            <div className="rounded-3xl p-6 bg-gradient-to-br from-amber-500/20 via-cyan-500/10 to-purple-500/20 border-2 border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.3)] space-y-4 animate-fade-in text-center">
              <Award className="w-12 h-12 text-amber-400 mx-auto animate-bounce" />
              <div>
                <div className="text-[10px] font-mono text-amber-300 uppercase tracking-widest font-bold">
                  NOVA INTERPLANETARY ACADEMY
                </div>
                <h4 className="text-lg font-heading text-white font-medium mt-1">
                  Master Space Archaeologist Credential
                </h4>
                <p className="text-xs text-slate-300 font-sans mt-1">
                  Congratulations! You have completed all 4 historical chapters and documented humanity’s permanent monuments across the Solar System.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-black/60 border border-amber-400/40 text-[11px] font-mono text-amber-300">
                CREDENTIAL ID: #SP-ARCH-2099-ALPHA
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};