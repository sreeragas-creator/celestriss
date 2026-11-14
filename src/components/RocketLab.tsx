import React, { useState } from 'react';
import type { Artifact } from '../types';
import { museumAudio } from '../utils/audio';
import { 
  Rocket, 
  Fuel, 
  DollarSign, 
  ShieldCheck, 
  Layers, 
  Sparkles,
  Info
} from 'lucide-react';

interface RocketLabProps {
  artifacts: Artifact[];
  onSelectArtifact?: (artifact: Artifact) => void;
  isJuniorMode?: boolean;
}

interface PresetMission {
  id: string;
  name: string;
  destination: 'moon' | 'mars';
  hardwareMassKg: number;
  description: string;
  icon: string;
  whyStayed: string;
}

const PRESET_MISSIONS: PresetMission[] = [
  {
    id: 'oppy',
    name: 'Opportunity Rover ("Oppy")',
    destination: 'mars',
    hardwareMassKg: 185,
    description: 'Golf-cart-sized rover exploring Mars for 15 years.',
    icon: '🚗',
    whyStayed: 'To lift Oppy back off Mars, engineers would have needed an ascent rocket, heat shield, and return spacecraft weighing over 3,000 kg—costing billions of dollars.'
  },
  {
    id: 'eagle',
    name: 'Apollo 11 Eagle Descent Stage',
    destination: 'moon',
    hardwareMassKg: 2134,
    description: 'The golden base of the first crewed lunar landing module.',
    icon: '🦅',
    whyStayed: 'Served as Neil and Buzz’s launchpad. Leaving its 2 tons behind was the only way the ascent stage was light enough to escape the Moon’s gravity with available fuel.'
  },
  {
    id: 'ginny',
    name: 'Ingenuity Helicopter',
    destination: 'mars',
    hardwareMassKg: 1.8,
    description: 'Ultra-lightweight twin-rotor alien atmosphere aircraft.',
    icon: '🚁',
    whyStayed: 'Though only 1.8 kg, retrieving it from Jezero Crater would require a specialized robotic sample-recovery lander.'
  },
  {
    id: 'lrv15',
    name: 'Apollo 15 Lunar Roving Vehicle',
    destination: 'moon',
    hardwareMassKg: 210,
    description: 'Humanity’s first off-world electric car.',
    icon: '🏎️',
    whyStayed: 'Left in Taurus-Littrow with its color camera broadcasting liftoff; brought back 170 lbs of Moon rocks instead of the car chassis.'
  }
];

export const RocketLab: React.FC<RocketLabProps> = ({ 
  artifacts: _artifacts, 
  onSelectArtifact: _onSelectArtifact,
  isJuniorMode = false 
}) => {
  const [selectedPreset, setSelectedPreset] = useState<PresetMission>(PRESET_MISSIONS[0]);
  const [attemptReturn, setAttemptReturn] = useState<boolean>(false);
  const [customMass, setCustomMass] = useState<number>(185);
  const [activeTab, setActiveTab] = useState<'simulator' | 'principles'>('simulator');

  const destinationGravity = selectedPreset.destination === 'moon' ? 1.62 : 3.72; // m/s^2

  // The Tsiolkovsky mass penalty multipliers
  const oneWayEarthLaunchMass = customMass * 45; // kg of rocket on Earth pad
  const returnMissionEarthLaunchMass = Math.round(customMass * 45 * (attemptReturn ? (selectedPreset.destination === 'moon' ? 14 : 32) : 1));
  const additionalFuelKg = attemptReturn ? Math.round(returnMissionEarthLaunchMass - oneWayEarthLaunchMass) : 0;
  const estimatedCostMillions = Math.round((oneWayEarthLaunchMass * 0.008) * (attemptReturn ? 8.5 : 1) + 200);

  const handleSelectPreset = (mission: PresetMission) => {
    museumAudio.playClick(850);
    setSelectedPreset(mission);
    setCustomMass(mission.hardwareMassKg);
  };

  const handleToggleReturn = () => {
    museumAudio.playScanPing();
    setAttemptReturn(!attemptReturn);
  };

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#060a15]/90 backdrop-blur-xl border border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6 shadow-2xl">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-cyan-400/20 border border-cyan-400/30 text-cyan-300 font-mono text-[11px] uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <Rocket className="w-3.5 h-3.5 text-cyan-300" />
              PHYSICS & ROCKETRY LAB // DELTA-V SIMULATOR
            </span>
            {isJuniorMode && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 font-mono text-[10px] uppercase">
                Junior Explorer
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-4xl font-heading font-light tracking-wide text-white">
            Why Did We Leave It Behind?
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
            The single most common question space enthusiasts ask is: <span className="text-amber-300 italic">"Why didn’t NASA bring the rovers and landers back home?"</span> Explore the ruthless laws of orbital physics, rocketry mass ratios, and the ethics of extraterrestrial preservation.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center rounded-xl bg-black/60 p-1 border border-white/10 shrink-0 font-mono text-xs">
          <button
            onClick={() => {
              museumAudio.playClick(750);
              setActiveTab('simulator');
            }}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'simulator'
                ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/40 shadow font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            SIMULATOR LAB
          </button>
          <button
            onClick={() => {
              museumAudio.playClick(750);
              setActiveTab('principles');
            }}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'principles'
                ? 'bg-amber-500/30 text-amber-200 border border-amber-400/40 shadow font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            3 CORE REASONS
          </button>
        </div>
      </div>

      {activeTab === 'simulator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-[#070c1a] border border-white/10 p-6 space-y-6 shadow-2xl">
            
            {/* Mission Presets */}
            <div className="space-y-3">
              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                1. SELECT HISTORIC HARDWARE
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {PRESET_MISSIONS.map(m => (
                  <button
                    key={m.id}
                    onClick={() => handleSelectPreset(m)}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      selectedPreset.id === m.id
                        ? 'bg-cyan-950/60 border-cyan-400/80 text-white shadow-lg'
                        : 'bg-black/40 border-white/5 text-slate-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="text-xl mb-1">{m.icon}</div>
                    <div className="text-xs font-heading font-medium truncate text-white">{m.name}</div>
                    <div className="text-[10px] font-mono text-cyan-300 mt-1">
                      {m.hardwareMassKg} kg • {m.destination.toUpperCase()}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Mass Slider */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                  2. HARDWARE MASS TO RETURN
                </span>
                <span className="font-mono text-xs text-amber-400 font-bold">
                  {customMass} kg ({Math.round(customMass * 2.20462)} lbs)
                </span>
              </div>

              <input
                type="range"
                min="1"
                max="3000"
                step="5"
                value={customMass}
                onChange={(e) => setCustomMass(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>1 kg (Ingenuity size)</span>
                <span>185 kg (Rover)</span>
                <span>3,000 kg (Apollo LM)</span>
              </div>
            </div>

            {/* Return Mission Toggle */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                3. MISSION FLIGHT PROFILE
              </div>

              <div 
                onClick={handleToggleReturn}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  attemptReturn
                    ? 'bg-rose-950/40 border-rose-500/60 text-white shadow-[0_0_20px_rgba(244,63,94,0.3)]'
                    : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                }`}
              >
                <div>
                  <div className="text-xs font-heading font-bold flex items-center gap-2">
                    <span>{attemptReturn ? '🔥 FULL ROUND-TRIP RETURN' : '✅ REALISTIC ONE-WAY EXPLORATION'}</span>
                  </div>
                  <div className="text-[11px] text-slate-300 font-sans mt-0.5">
                    {attemptReturn 
                      ? 'Attempt to fly hardware back to Earth surface'
                      : 'Leave hardware behind as in-situ monument'}
                  </div>
                </div>

                <div className={`w-12 h-6 rounded-full p-1 transition-colors ${attemptReturn ? 'bg-rose-500' : 'bg-slate-700'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${attemptReturn ? 'translate-x-6' : 'translate-x-0'}`} />
                </div>
              </div>
            </div>

            {/* Why Stayed Insight Box */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1.5">
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase text-amber-400">
                <Info className="w-3.5 h-3.5" />
                <span>Mission Real-World Archive Note</span>
              </div>
              <p className="text-xs text-amber-100 font-sans leading-relaxed">
                {selectedPreset.whyStayed}
              </p>
            </div>

          </div>

          {/* Visualization & Physics Results Column (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-[#060a15]/90 backdrop-blur-xl border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl">
            
            <div className="border-b border-white/10 pb-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase">
                  SIMULATION TELEMETRY
                </span>
                <h3 className="text-xl font-heading text-white">
                  The "Tyranny of Rocket Equation" Visualizer
                </h3>
              </div>
              <div className="text-right font-mono text-xs">
                <div className="text-slate-400 text-[10px]">GRAVITY WELL</div>
                <div className="text-amber-300 font-bold">{destinationGravity} m/s²</div>
              </div>
            </div>

            {/* Interactive Visual Rocket Size Comparison */}
            <div className="p-6 rounded-2xl bg-black/60 border border-white/10 flex flex-col items-center justify-center space-y-6">
              
              <div className="text-xs font-mono text-slate-300 text-center max-w-md">
                Rocket Stack Needed on Earth Launchpad to Complete This Mission:
              </div>

              {/* Dynamic Rocket Graphic */}
              <div className="flex items-end justify-center gap-8 h-56 w-full px-4 border-b border-white/10 pb-4">
                
                {/* One-Way Standard Stack */}
                <div className="flex flex-col items-center gap-2">
                  <div className="text-[10px] font-mono text-emerald-400">Standard One-Way</div>
                  <div className="w-10 rounded-t-lg bg-gradient-to-t from-emerald-600 via-emerald-400 to-white flex items-center justify-center shadow-lg transition-all duration-700 h-24">
                    <Rocket className="w-4 h-4 text-slate-950" />
                  </div>
                  <div className="text-[11px] font-mono text-slate-300">
                    {(oneWayEarthLaunchMass / 1000).toFixed(1)} tons
                  </div>
                </div>

                {/* Return Mission Stack (Grows exponentially!) */}
                <div className="flex flex-col items-center gap-2">
                  <div className={`text-[10px] font-mono ${attemptReturn ? 'text-rose-400 font-bold animate-pulse' : 'text-slate-500'}`}>
                    {attemptReturn ? '🚨 Return Mission Monster' : 'Return Mode Off'}
                  </div>
                  
                  <div 
                    style={{ 
                      height: attemptReturn 
                        ? `${Math.min(190, 60 + (returnMissionEarthLaunchMass / oneWayEarthLaunchMass) * 4)}px` 
                        : '24px' 
                    }}
                    className={`w-14 rounded-t-xl transition-all duration-700 flex flex-col items-center justify-between p-1.5 shadow-2xl ${
                      attemptReturn 
                        ? 'bg-gradient-to-t from-rose-700 via-amber-500 to-white shadow-[0_0_30px_rgba(244,63,94,0.5)]'
                        : 'bg-slate-800 opacity-40'
                    }`}
                  >
                    <Rocket className="w-4 h-4 text-slate-950" />
                    {attemptReturn && (
                      <div className="text-[9px] font-mono text-slate-950 font-bold rotate-90">
                        {Math.round(returnMissionEarthLaunchMass / oneWayEarthLaunchMass)}x MASS
                      </div>
                    )}
                  </div>

                  <div className={`text-[11px] font-mono font-bold ${attemptReturn ? 'text-rose-300' : 'text-slate-500'}`}>
                    {(returnMissionEarthLaunchMass / 1000).toFixed(1)} tons
                  </div>
                </div>

              </div>

              {/* Dynamic Telemetry Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1">
                    <Fuel className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Extra Fuel Needed</span>
                  </div>
                  <div className="text-base font-bold font-mono text-white">
                    +{additionalFuelKg.toLocaleString()} kg
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {attemptReturn ? `${(additionalFuelKg / customMass).toFixed(0)} kg fuel per 1 kg payload` : 'Optimal fuel balance'}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                    <span>Est. Mission Cost</span>
                  </div>
                  <div className="text-base font-bold font-mono text-amber-300">
                    ${estimatedCostMillions.toLocaleString()}M
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {attemptReturn ? 'Skyrocketing budget' : 'Feasible scientific scope'}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-purple-400" />
                    <span>Rocket Stages</span>
                  </div>
                  <div className="text-base font-bold font-mono text-purple-300">
                    {attemptReturn ? '5 - 6 Stages' : '2 - 3 Stages'}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {attemptReturn ? 'Ascent + Earth return module' : 'Direct surface delivery'}
                  </div>
                </div>

              </div>

            </div>

            {/* Kid & Casual Enthusiast Lesson Takeaway */}
            <div className={`p-4 rounded-2xl border transition-all ${
              attemptReturn
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-200'
                : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-200'
            }`}>
              <div className="font-heading font-medium text-xs sm:text-sm flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>The Rocket Scientist Verdict:</span>
              </div>
              <p className="text-xs font-sans leading-relaxed text-slate-300">
                {attemptReturn ? (
                  <span>
                    To bring <strong className="text-white">{customMass} kg</strong> back to Earth from {selectedPreset.destination === 'moon' ? 'the Moon' : 'Mars'}, you must carry a rocket inside your rocket! That means burning <strong className="text-rose-300">{additionalFuelKg.toLocaleString()} kg of extra rocket propellant</strong> and building a rocket as tall as a skyscraper! That is why engineers leave the rovers behind and only bring back tiny rock samples.
                  </span>
                ) : (
                  <span>
                    By leaving the heavy rover wheels, frames, and antennas on the foreign world, we save <strong className="text-emerald-300">90% of the mission weight and budget</strong>. This allowed missions like Apollo, Curiosity, and Opportunity to exist in the first place!
                  </span>
                )}
              </p>
            </div>

          </div>

        </div>
      )}

      {/* 3 Core Principles View */}
      {activeTab === 'principles' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
          
          {/* Reason 1 */}
          <div className="rounded-3xl bg-[#060a15] border border-white/10 p-6 space-y-4 shadow-2xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <Fuel className="w-6 h-6" />
              </div>
              <div className="text-[10px] font-mono text-rose-400 uppercase tracking-widest font-bold">
                REASON 01 // PHYSICS
              </div>
              <h3 className="text-lg font-heading text-white">
                The Tyranny of the Rocket Equation
              </h3>
              <p className="text-xs text-slate-300 font-sans leading-relaxed font-light">
                To launch 1 kg of hardware off Mars or the Moon, you must launch an engine and fuel tank to carry it. But that engine and fuel tank also have weight, requiring even MORE fuel! By the time you trace it back to the launchpad on Earth, every single pound of return payload requires over 40 pounds of additional rocket fuel.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] font-mono text-slate-400">
              Formula: Δv = v_e • ln(m_0 / m_f)
            </div>
          </div>

          {/* Reason 2 */}
          <div className="rounded-3xl bg-[#060a15] border border-white/10 p-6 space-y-4 shadow-2xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">
                REASON 02 // HERITAGE
              </div>
              <h3 className="text-lg font-heading text-white">
                Extraterrestrial Time Capsules
              </h3>
              <p className="text-xs text-slate-300 font-sans leading-relaxed font-light">
                Just like historical monuments on Earth—such as Pompeii or the Pyramids—the hardware on the Moon and Mars forms a permanent museum of humanity’s first exploratory steps into the cosmos. In 2020, the United States enacted the <strong className="text-white">One Small Step to Protect Human Heritage in Space Act</strong> to protect Apollo landing sites from being looted or damaged.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] font-mono text-amber-300">
              Status: Protected Historical Landmarks
            </div>
          </div>

          {/* Reason 3 */}
          <div className="rounded-3xl bg-[#060a15] border border-white/10 p-6 space-y-4 shadow-2xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
                REASON 03 // ONGOING SCIENCE
              </div>
              <h3 className="text-lg font-heading text-white">
                Calibration Targets & Active Science
              </h3>
              <p className="text-xs text-slate-300 font-sans leading-relaxed font-light">
                Even "dead" hardware continues to serve science! The retroreflector mirrors left by Apollo 11, 14, and 15 are still targeted by Earth laser observatories every single month to measure the Moon’s drift (3.8 cm per year). On Mars, rover tracks and heat shields serve as known-size calibration targets for cameras aboard modern orbiting satellites.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] font-mono text-cyan-300">
              Active Utility: Laser Ranging & Remote Sensing
            </div>
          </div>

        </div>
      )}

    </div>
  );
};