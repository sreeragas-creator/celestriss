import type { Artifact, ArtifactStory } from '../types';

export const ARTIFACT_STORIES: Record<string, ArtifactStory> = {
  // =========================================================================
  // APOLLO 11 EAGLE
  // =========================================================================
  'apollo-11-eagle': {
    hasActiveScienceValue: true,
    activeScienceDescription: 'The Laser Ranging Retroreflector (LRRR) deployed beside Eagle is the only Apollo experiment still actively operating, targeted by Earth laser observatories every month.',
    origin: {
      number: 1,
      title: 'THE ORIGIN',
      subtitle: 'The 1961 Challenge & The Birth of the Lunar Module',
      content: 'In May 1961, President John F. Kennedy challenged the United States to land a man on the Moon and return him safely to Earth before the decade was out. To achieve this, Grumman Aerospace was commissioned to build the Lunar Module—a vehicle that would never fly through air, had no aerodynamic streamlining, and consisted of two distinct stages: a descent stage to land on the surface, and an ascent stage to blast off.',
      highlightQuote: '"I believe that this nation should commit itself to achieving the goal, before this decade is out, of landing a man on the Moon and returning him safely to the Earth."',
      scientificInsight: 'The descent stage was designed from the beginning as a sacrificial launchpad. Engineers realized that lifting the heavy landing gear, descent engine, and empty fuel tanks back off the Moon would require an impossibly gigantic rocket.'
    },
    journey: {
      number: 2,
      title: 'THE JOURNEY',
      subtitle: 'The Saturn V Ride & The 1202 Program Alarm',
      content: 'On July 16, 1969, a 363-foot-tall Saturn V rocket ignited at Kennedy Space Center, hurling Eagle and Columbia into translunar injection at over 24,000 mph. Four days later, Neil Armstrong and Buzz Aldrin decoupled Eagle and began powered descent. At 33,000 feet, Eagle’s Apollo Guidance Computer flashed multiple "1202" and "1201" program alarms due to radar data overload. Armstrong took manual semi-automatic control with only seconds of fuel remaining to steer away from a boulder-strewn crater.',
      highlightQuote: '"Houston, Tranquility Base here. The Eagle has landed."',
      scientificInsight: 'Software engineer Margaret Hamilton led the MIT team that developed the asynchronous executive priority scheduling system, allowing the computer to drop low-priority tasks and prevent an abort.'
    },
    mission: {
      number: 3,
      title: 'THE MISSION',
      subtitle: 'Two Hours and Thirty-One Minutes on Alien Soil',
      content: 'At 10:56 PM EDT on July 20, 1969, Neil Armstrong descended the nine-rung ladder of Eagle’s front strut and set humanity’s first physical footprint in the lunar regolith. For two hours and 31 minutes, Armstrong and Aldrin deployed experimental instruments, documented their bootprints in the vacuum dust, and unfurled the United States flag using a telescoping horizontal rod to keep it visible without wind.',
      highlightQuote: '"That\'s one small step for man, one giant leap for mankind."',
      scientificInsight: 'The astronauts discovered lunar dust was electrostatically charged, clinging aggressively to spacesuits and smelling faintly like spent gunpowder.'
    },
    discoveries: {
      number: 4,
      title: 'THE DISCOVERIES',
      subtitle: 'Ancient Magma Oceans & Millimeter Precision',
      content: 'Eagle’s crew collected 21.55 kg of pristine lunar rock and soil samples. Laboratory analysis back on Earth revealed titanium-rich basalts dating back 3.7 billion years, proving the Moon once possessed a global magma ocean. Beside Eagle, the crew deployed the Laser Ranging Retroreflector (LRRR)—an array of 100 fused silica corner-cube prisms that reflects laser pulses directly back to Earth.',
      highlightQuote: '"By measuring the time it takes laser pulses to return from Eagle\'s reflector, scientists proved the Moon is spiraling away from Earth at 3.8 cm per year."',
      scientificInsight: 'Active science: Eagle’s retroreflector requires zero electrical power and continues to provide tests of Einstein’s General Theory of Relativity today.'
    },
    finalChapter: {
      number: 5,
      title: 'THE FINAL CHAPTER',
      subtitle: 'The Fire of Departure & 50 Years of Silence',
      content: 'At 17:54 UTC on July 21, 1969, Neil and Buzz fired Eagle’s ascent engine. The ascent stage blasted upward, using the descent stage as a sturdy launching platform. The ascent stage was later jettisoned in lunar orbit and crashed into an unknown lunar site, leaving the golden descent stage at Tranquility Base as the sole surviving monument. Today it rests under unfiltered solar ultraviolet light and micro-meteorite sandblasting.',
      highlightQuote: '"Here men from the planet Earth first set foot upon the Moon, July 1969 A.D. We came in peace for all mankind."',
      scientificInsight: 'Without atmosphere or wind, the footprints Neil and Buzz pressed around Eagle’s footpads will remain etched in the dust for hundreds of thousands of years.'
    },
    legacy: {
      number: 6,
      title: 'THE LEGACY',
      subtitle: 'Humanity’s First Off-World Historic Monument',
      content: 'Tranquility Base is recognized as the definitive archaeological landmark of human civilization’s expansion beyond our home planet. In 2020, the United States Congress passed the "One Small Step to Protect Human Heritage in Space Act", legally mandating that future space missions protect the Apollo 11 hardware and boundary zones from disturbance or thruster blast contamination.',
      highlightQuote: '"Eagle proved that humanity can break free from the cradle of Earth and step onto another celestial world in peace."',
      scientificInsight: 'Modern high-resolution orbital imagery from NASA’s Lunar Reconnaissance Orbiter (LRO) clearly shows Eagle’s descent stage casting a sharp shadow across the Sea of Tranquility.'
    },
    equipmentHotspots: [
      {
        id: 'plaque',
        name: 'Commemorative World Peace Plaque',
        role: 'Bolted to the forward landing strut between rungs of the ladder; declares humanity came in peace.',
        currentCondition: 'Stainless steel plate undisturbed; pristine vacuum preservation.',
        xPercent: 50,
        yPercent: 78,
        status: 'silent_relic'
      },
      {
        id: 'lrrr',
        name: 'Laser Ranging Retroreflector (LRRR)',
        role: 'Array of 100 fused-silica corner-cube prisms reflecting ground-based laser beams.',
        currentCondition: 'ACTIVELY OPERATING: Continues to reflect laser pulses from Earth observatories every month.',
        xPercent: 78,
        yPercent: 62,
        status: 'active_science'
      },
      {
        id: 'engine',
        name: 'Descent Engine & Propellant Tanks',
        role: 'Throttleable hypergolic rocket engine (TRW) providing 9,870 lbf of thrust for soft touchdown.',
        currentCondition: 'Tanks vented post-landing; propellant depleted; structural launch base intact.',
        xPercent: 50,
        yPercent: 45,
        status: 'silent_relic'
      },
      {
        id: 'gold-foil',
        name: 'Kapton & Mylar Thermal Blankets',
        role: 'Multilayer aluminized and gold thermal insulation to guard against -130°C to +120°C extremes.',
        currentCondition: 'Retains golden sheen; mild solar UV discoloration over five decades.',
        xPercent: 28,
        yPercent: 52,
        status: 'silent_relic'
      }
    ],
    quiz: {
      question: 'Which piece of Apollo 11 equipment left on the Moon is STILL actively used by scientists on Earth today?',
      options: [
        'The television camera transmitter',
        'The Laser Ranging Retroreflector (LRRR) corner-cube mirror array',
        'The ascent engine battery charger',
        'The VHF voice radio antenna'
      ],
      correctIndex: 1,
      explanation: 'The Laser Ranging Retroreflector requires no electricity. Scientists shoot high-powered laser beams at its silica prisms and time the bounce to measure the Moon’s distance to within millimeters!'
    }
  },

  // =========================================================================
  // OPPORTUNITY ROVER (MER-B)
  // =========================================================================
  'opportunity-rover': {
    hasActiveScienceValue: false,
    activeScienceDescription: 'Opportunity is completely silent following the catastrophic 2018 global dust storm, resting inside Perseverance Valley.',
    origin: {
      number: 1,
      title: 'THE ORIGIN',
      subtitle: 'The Hunt for Past Martian Water',
      content: 'Following the tragic loss of the Mars Climate Orbiter and Mars Polar Lander in 1999, NASA needed a resilient, high-reward mission. JPL proposed the Mars Exploration Rover (MER) project: twin robotic geologists named Spirit and Opportunity. Their goal was straightforward but historic: follow the water. Opportunity was sent to Meridiani Planum, a smooth plain where orbital satellites had detected gray hematite—a mineral that almost always forms in liquid water.',
      highlightQuote: '"We were looking for evidence that Mars was once wet enough, for long enough, to support life."',
      scientificInsight: 'The rover chassis used a rocker-bogie mobility suspension developed by JPL, allowing all six wheels to remain in contact with uneven ground without tilting the body excessively.'
    },
    journey: {
      number: 2,
      title: 'THE JOURNEY',
      subtitle: 'The Interplanetary Hole-in-One',
      content: 'Launched atop a Delta II Heavy rocket on July 7, 2003, Opportunity cruised through interplanetary space for six months. On January 25, 2004, it plunged into the Martian atmosphere at 12,000 mph, shielded by an ablative heat shield, slowed by a parachute, and cocooned within a cluster of giant nylon airbags. It bounced across the rust-red plains before rolling to a stop directly inside the 22-meter-wide Eagle Crater—an unprecedented interplanetary "hole-in-one"!',
      highlightQuote: '"When the camera unfolded, we were staring directly at bright bedrock layers exposed on the crater wall."',
      scientificInsight: 'Landing inside the crater saved months of driving; the impact had naturally excavated the ancient sedimentary rock layers scientists dreamed of finding.'
    },
    mission: {
      number: 3,
      title: 'THE MISSION',
      subtitle: 'From a 90-Day Sprint to a 15-Year Marathon',
      content: 'Engineers designed Opportunity to survive for just 90 Martian sols (about 3 months). But Opportunity refused to quit. Sol after sol, it rolled across the plains, descending into treacherous craters like Endurance, Victoria, and the colossal 22-kilometer Endeavour Crater. Over 14 years and 138 days, Opportunity drove 45.16 kilometers (28.06 miles)—completing the first extraterrestrial marathon in human history.',
      highlightQuote: '"On March 24, 2015, Opportunity crossed the official Olympic marathon distance (42.195 km) on Mars."',
      scientificInsight: 'The rovers were repeatedly saved by Martian dust devils—turbulent whirlwinds that swept across the solar panels and cleaned off months of accumulated dust.'
    },
    discoveries: {
      number: 4,
      title: 'THE DISCOVERIES',
      subtitle: 'Blueberries, Ancient Seas & Extraterrestrial Meteorites',
      content: 'Using its Microscopic Imager and Mössbauer Spectrometer, Opportunity examined tiny spherical grains scattered across the soil, affectionately dubbed "blueberries". They were confirmed to be hematite concretions precipitated out of ancient acidic groundwater. Later, at Endeavour Crater, Opportunity discovered veins of pure gypsum—proving that neutral, drinkable water once flowed across Mars billions of years ago.',
      highlightQuote: '"Opportunity provided the first definitive, ground-truth proof that liquid water once bathed the surface of Mars."',
      scientificInsight: 'Opportunity also discovered "Heat Shield Rock"—the very first iron-nickel meteorite ever discovered on another planet.'
    },
    finalChapter: {
      number: 5,
      title: 'THE FINAL CHAPTER',
      subtitle: 'The Dark Sky of 2018 & The Final Whisper',
      content: 'In June 2018, a catastrophic global dust storm blotted out the Martian sky, reducing sunlight to pitch-black darkness. Opportunity’s solar panels could no longer recharge its lithium-ion batteries. On June 10, 2018, Opportunity transmitted its final telemetry packet from Perseverance Valley. For eight months, NASA engineers beamed over a thousand recovery commands to the rover. On February 13, 2019, NASA declared the mission complete.',
      highlightQuote: '"Telemetry indicates atmospheric opacity exceeded tau 10.8. Solar array output dropped below 22 watt-hours. Battery level critically depleted."',
      scientificInsight: 'Opportunity’s poignant final message was poetically summarized as: "My battery is low and it’s getting dark."'
    },
    legacy: {
      number: 6,
      title: 'THE LEGACY',
      subtitle: 'The Pathfinder for Human Mars Exploration',
      content: 'Opportunity transformed Mars from a dry, mysterious red disc into a world with an ancient geological history of lakes, streams, and hot springs. Its marathon traverse validated the long-term endurance of robotic autonomous navigation and paved the path for the Curiosity and Perseverance nuclear rovers now exploring the planet.',
      highlightQuote: '"Opportunity’s tire tracks through Perseverance Valley stand as a monument to human curiosity and endurance."',
      scientificInsight: 'Opportunity holds the all-time distance driving record for any wheeled vehicle on another celestial body at 45.16 km.'
    },
    equipmentHotspots: [
      {
        id: 'pancam',
        name: 'Panoramic Camera (Pancam) Mast',
        role: 'High-resolution stereo color camera mounted on a 1.5-meter mast; gave humans our view of Mars.',
        currentCondition: 'Optics coated with fine red ferric dust; resting pointing toward the crater rim.',
        xPercent: 50,
        yPercent: 20,
        status: 'silent_relic'
      },
      {
        id: 'solar-wings',
        name: 'Triple-Junction Solar Array Wings',
        role: '1.3 square meters of solar cells generating up to 140 watts of electrical power.',
        currentCondition: 'Blanketed under thick Martian dust; unable to generate voltage.',
        xPercent: 68,
        yPercent: 48,
        status: 'silent_relic'
      },
      {
        id: 'idd-arm',
        name: 'Instrument Deployment Device (Robotic Arm)',
        role: '5-degree-of-freedom robotic arm carrying the microscopic imager, rock abrasion tool, and spectrometers.',
        currentCondition: 'Stowed against front chassis; grinding diamond teeth worn down to nubs.',
        xPercent: 32,
        yPercent: 70,
        status: 'silent_relic'
      },
      {
        id: 'wheels',
        name: 'Six Aluminum Rocker-Bogie Wheels',
        role: 'Individually motorized cleated wheels capable of climbing over 25-centimeter obstacles.',
        currentCondition: 'Tread worn and pitted by 45.16 km of Martian bedrock; parked on 15° crater slope.',
        xPercent: 50,
        yPercent: 88,
        status: 'silent_relic'
      }
    ],
    quiz: {
      question: 'What microscopic geological feature discovered by Opportunity proved that liquid water once pooled on Mars?',
      options: [
        'Fossilized alien shells',
        'Tiny hematite spheres nicknamed "blueberries"',
        'Liquid mercury droplets',
        'Volcanic lava tunnels'
      ],
      correctIndex: 1,
      explanation: 'The hematite "blueberries" were spherical concretions that could only form through the slow chemical soaking of mineral-rich liquid water!'
    }
  },

  // =========================================================================
  // INGENUITY HELICOPTER
  // =========================================================================
  'ingenuity-helicopter': {
    hasActiveScienceValue: true,
    activeScienceDescription: 'Even grounded with chipped rotor blades, Ingenuity’s avionics wake up daily at Valinor Hills to log weather, temperature, and camera telemetry.',
    origin: {
      number: 1,
      title: 'THE ORIGIN',
      subtitle: 'The Wright Brothers Moment on an Alien World',
      content: 'For decades, atmospheric flight on Mars was considered an impossible engineering hurdle. The Martian atmosphere is less than 1% as dense as Earth’s—equivalent to flying at an altitude of 100,000 feet above Earth, higher than any conventional helicopter had ever flown. JPL engineer MiMi Aung led an experimental team to design a featherweight technology demonstration: a 4-pound (1.8 kg) drone attached beneath the Perseverance rover.',
      highlightQuote: '"They told us it couldn’t be done. Mars’s air was too thin to create lift. We had to rethink every rotor dynamic from scratch."',
      scientificInsight: 'To compensate for the ultra-thin air, the twin counter-rotating carbon fiber blades had to spin at 2,400 to 2,700 RPM—roughly five times faster than an Earth helicopter.'
    },
    journey: {
      number: 2,
      title: 'THE JOURNEY',
      subtitle: 'Tucked Beneath the Belly of Perseverance',
      content: 'Ingenuity launched aboard an Atlas V rocket on July 30, 2020, tucked inside a protective carbon composite debris shield beneath Perseverance’s belly. After enduring the "Seven Minutes of Terror" landing on February 18, 2021, Perseverance drove to Wright Brothers Field, dropped the debris shield, and unlatched Ingenuity, setting its four carbon legs softly onto the Martian regolith before backing away.',
      highlightQuote: '"The most nerve-wracking moment was the first freezing night alone at -90°C without the rover\'s nuclear heater."',
      scientificInsight: 'Ingenuity had to survive on its own internal solar-charged lithium batteries from sol 1, preventing its sensitive electronics from freezing into solid ice.'
    },
    mission: {
      number: 3,
      title: 'THE MISSION',
      subtitle: 'From Five Test Flights to Seventy-Two Aerial Expeditions',
      content: 'On April 19, 2021, Ingenuity spun its blades, lifted 3 meters into the Martian sky, hovered for 39 seconds, and touched down safely—completing humanity’s first powered, controlled flight on another world! Designed as a simple 30-day technology demonstration with 5 planned flights, Ingenuity was so successful NASA promoted it to an operational scout for Perseverance, guiding the rover around impassable boulder fields.',
      highlightQuote: '"Ingenuity has performed its first flight: the first flight of a powered aircraft on another planet!"',
      scientificInsight: 'Underneath its solar panel, Ingenuity carried a postage-stamp-sized swatch of unbleached muslin fabric from the wing of the Wright Brothers’ original 1903 Flyer.'
    },
    discoveries: {
      number: 4,
      title: 'THE DISCOVERIES',
      subtitle: 'Aerial Scouting & Martian Wind Tomography',
      content: 'Ingenuity logged 128.8 minutes of total flight time and flew over 17 kilometers across Jezero Crater, reaching altitudes of 24 meters and speeds of 22 mph. It photographed the discarded backshell and supersonic parachute from Perseverance’s landing, providing engineers with priceless data on spacecraft aerodynamic entry dynamics. Its high-resolution downward camera mapped sand ripple hazards impossible to see from rover eye level.',
      highlightQuote: '"Aerial scouting saved Perseverance weeks of traverse time, discovering clear pathways through the treacherous Séítah dune fields."',
      scientificInsight: 'Ingenuity proved that future Mars exploration can use heavy rotorcraft to explore canyon walls, caves, and mountain peaks inaccessible to wheeled rovers.'
    },
    finalChapter: {
      number: 5,
      title: 'THE FINAL CHAPTER',
      subtitle: 'Flight 72 & The Silent Sentinel at Valinor Hills',
      content: 'On January 18, 2024, during Flight 72, Ingenuity flew over a featureless expanse of bland sand ripples that confused its optical tracking navigation algorithms. It executed a rapid emergency touchdown at 1 meter altitude. When downward images were downlinked, shadow telemetry revealed that the tip of one rotor blade had cleanly fractured off. Grounded forever, Ingenuity was retired from flight operations on January 25, 2024.',
      highlightQuote: '"Shadow telemetry confirmed pitch blade fracture. Airframe structurally intact; flight operations concluded at Valinor Hills."',
      scientificInsight: 'Ingenuity received a final software update turning it into a stationary weather station, continuously recording atmospheric data for future human colonists.'
    },
    legacy: {
      number: 6,
      title: 'THE LEGACY',
      subtitle: 'The Kitty Hawk of Interplanetary Aviation',
      content: 'Ingenuity opened the skies of other worlds forever. Its success directly inspired NASA’s Dragonfly mission—an eight-rotor nuclear-powered drone launching to Saturn’s giant moon Titan—and future Mars sample-retrieval helicopters.',
      highlightQuote: '"Just as the Wright Brothers transformed Earth transportation in 1903, Ingenuity transformed planetary exploration on Mars."',
      scientificInsight: 'Resting proudly at Valinor Hills, Ingenuity remains an eternal testament to human audacity and the spirit of flight.'
    },
    equipmentHotspots: [
      {
        id: 'rotors',
        name: 'Counter-Rotating Carbon-Fiber Rotors',
        role: 'Two 1.2-meter coaxial blades spinning at 2,500 RPM in opposite directions to cancel torque.',
        currentCondition: 'Blade tip chipped on Flight 72; permanently grounded; structurally stable.',
        xPercent: 50,
        yPercent: 18,
        status: 'silent_relic'
      },
      {
        id: 'solar-panel',
        name: 'Top Solar Array & Battery Relays',
        role: 'Compact solar array charging six Sony lithium-ion battery cells every Martian morning.',
        currentCondition: 'ACTIVELY OPERATING: Continues to generate power daily to run weather logging software.',
        xPercent: 50,
        yPercent: 38,
        status: 'active_science'
      },
      {
        id: 'wright-fabric',
        name: 'Wright Brothers 1903 Flyer Fabric Swatch',
        role: 'Historic unbleached muslin wing cloth from Kitty Hawk bolted beneath the solar panel cable.',
        currentCondition: 'Pristine historical artifact carried 300 million miles to Mars.',
        xPercent: 44,
        yPercent: 42,
        status: 'silent_relic'
      },
      {
        id: 'avionics',
        name: 'Qualcomm Snapdragon 801 Flight Computer',
        role: 'Smartphone-derived processor running Linux and autonomous optical flow visual navigation.',
        currentCondition: 'ACTIVELY OPERATING: Wakes up daily to record Martian surface temperature and diagnostics.',
        xPercent: 50,
        yPercent: 62,
        status: 'active_science'
      }
    ],
    quiz: {
      question: 'What secret piece of aviation history did Ingenuity carry beneath its solar panel on Mars?',
      options: [
        'A screw from Charles Lindbergh’s Spirit of St. Louis',
        'A piece of wing fabric from the Wright Brothers’ 1903 Kitty Hawk Flyer',
        'A microchip with Neil Armstrong’s signature',
        'A titanium feather from an American bald eagle'
      ],
      correctIndex: 1,
      explanation: 'NASA engineers taped a postage-stamp-sized swatch of muslin fabric from the original 1903 Wright Flyer under Ingenuity’s solar panel to link the birth of flight on Earth with the birth of flight on Mars!'
    }
  },

  // =========================================================================
  // APOLLO ALSEP NETWORK
  // =========================================================================
  'apollo-alsep-network': {
    hasActiveScienceValue: true,
    activeScienceDescription: 'While the electronic telemetry was powered down by NASA in 1977, the passive Laser Ranging Retroreflector (LRRR) arrays deployed with ALSEP remain continuously targeted by Earth laser observatories.',
    origin: {
      number: 1,
      title: 'THE ORIGIN',
      subtitle: 'Humanity’s First Off-World Geophysical Laboratory',
      content: 'During the planning of the Apollo landings, scientists realized that human footprints would only sample the surface for a few hours. To truly understand the Moon, humanity needed permanent autonomous scientific stations that could operate for years after the astronauts departed. NASA commissioned Bendix Aerospace to build the Apollo Lunar Surface Experiments Package (ALSEP)—a modular suite of seismic, solar wind, and atmospheric instruments powered by nuclear energy.',
      highlightQuote: '"ALSEP was designed to transform the Moon from a static target of exploration into an active observatory."',
      scientificInsight: 'Because the lunar night lasts 14 Earth days with temperatures plummeting to -130°C, solar panels would freeze and die. ALSEP was equipped with the SNAP-27 Radioisotope Thermoelectric Generator (RTG) fueled by plutonium-238.'
    },
    journey: {
      number: 2,
      title: 'THE JOURNEY',
      subtitle: 'Carried in the Scientific Equipment Bay of the Lunar Module',
      content: 'ALSEP stations flew aboard Apollo 12, 14, 15, 16, and 17. Stowed in the descent stage quadrant, the package consisted of two subpackages weighing roughly 80 kg. Once on the Moon, astronauts extracted the plutonium fuel cask with a specialized handling tool, inserted it into the generator, and carried the instruments like high-tech barbells at least 100 meters away from the Lunar Module to protect them from ascent engine exhaust.',
      highlightQuote: '"Carrying a nuclear generator and five scientific instruments across the Sea of Storms was like setting up the first camp on a new continent."',
      scientificInsight: 'The astronauts used a barbell carry bar to deploy the packages far enough away so that liftoff vibrations would not shatter the seismometers.'
    },
    mission: {
      number: 3,
      title: 'THE MISSION',
      subtitle: 'Eight Years of Listening to the Subterranean Moon',
      content: 'Between 1969 and 1977, the five deployed ALSEP stations operated simultaneously, creating the first multi-station seismic network on another world. The stations recorded more than 12,000 seismic events, including deep moonquakes occurring at 800 to 1,000 km depths caused by Earth’s tidal pull, thermal moonquakes as rocks expanded at sunrise, and meteorite strikes. On September 30, 1977, NASA formally commanded all stations off due to budget reallocations to Voyager.',
      highlightQuote: '"September 30, 1977: All five active ALSEP stations successfully commanded off. Final science packet archived at Goddard."',
      scientificInsight: 'NASA deliberately crashed spent Saturn V S-IVB upper rocket stages and lunar module ascent stages into the Moon to generate calibrated seismic waves for the ALSEP network.'
    },
    discoveries: {
      number: 4,
      title: 'THE DISCOVERIES',
      subtitle: 'The Molten Core, Crustal Thickness & The Lunar Exosphere',
      content: 'ALSEP revolutionized planetary geophysics. The seismic network proved the Moon has a layered internal structure: an outer crust 30 to 45 km thick, a rigid mantle, and a small partially molten metallic iron core roughly 330 km in radius. Suprathermal ion detectors discovered that the Moon is not a total vacuum, but possesses a tenuous, wispy atmosphere (exosphere) containing helium, neon, and argon.',
      highlightQuote: '"ALSEP proved that the Moon is not a dead, solid rock, but a dynamic body with internal quakes and a molten iron core."',
      scientificInsight: 'The Laser Ranging Retroreflectors deployed alongside ALSEP proved that the Moon is slowly moving away from Earth at 3.8 centimeters per year.'
    },
    finalChapter: {
      number: 5,
      title: 'THE FINAL CHAPTER',
      subtitle: 'Cold-Welded Silence & The Endless Reflection',
      content: 'When the radio transmitters were silenced in 1977, the SNAP-27 generators continued to generate heat as the plutonium-238 slowly decayed. In the vacuum of the lunar surface, metal joints cold-welded together. While the electronics are silent, the silica retroreflectors remain pristine, continuously hit by laser beams shot from telescopes in Texas, France, and Hawaii.',
      highlightQuote: '"The ALSEP stations stand on the lunar plains as silent outposts of human curiosity, still reflecting the light of Earth."',
      scientificInsight: 'Without wind or water erosion, the cables and instrument boxes remain exactly where Alan Bean, Edgar Mitchell, and Harrison Schmitt placed them over 50 years ago.'
    },
    legacy: {
      number: 6,
      title: 'THE LEGACY',
      subtitle: 'The Benchmark for Artemis and Lunar Base Design',
      content: 'Everything scientists know about the interior structure and seismic hazards of the Moon originates from the ALSEP network. As NASA prepares to land astronauts at the lunar South Pole under the Artemis program, ALSEP data guides the engineering of permanent habitats, pressurized rovers, and seismic protection systems.',
      highlightQuote: '"ALSEP proved that humanity could install permanent, multi-year robotic science infrastructure on another world."',
      scientificInsight: 'Future Artemis lunar base habitats are designed directly around ALSEP’s discoveries of deep moonquakes and micrometeoroid frequency.'
    },
    equipmentHotspots: [
      {
        id: 'central-station',
        name: 'Central Telemetry Transmitter Station',
        role: 'Hub connecting all sensors, processing commands from Earth and broadcasting data via helical antenna.',
        currentCondition: 'Powered down on Sept 30, 1977; antenna locked pointing at Earth.',
        xPercent: 50,
        yPercent: 48,
        status: 'silent_relic'
      },
      {
        id: 'snap-27',
        name: 'SNAP-27 Radioisotope Thermoelectric Generator (RTG)',
        role: '3.8 kg plutonium-238 fuel capsule producing 70 watts of continuous electrical power.',
        currentCondition: 'Plutonium heat output decayed past operational threshold; structurally intact in fuel cask.',
        xPercent: 26,
        yPercent: 65,
        status: 'silent_relic'
      },
      {
        id: 'seismometer',
        name: 'Passive Seismic Experiment (PSE)',
        role: 'Ultra-sensitive triaxial seismometer that recorded over 12,000 moonquakes and meteorite impacts.',
        currentCondition: 'Gold thermal shroud undisturbed; resting permanently on lunar bedrock.',
        xPercent: 74,
        yPercent: 68,
        status: 'silent_relic'
      }
    ],
    quiz: {
      question: 'What energy source powered the Apollo ALSEP stations through the freezing, 14-day lunar nights?',
      options: [
        'Massive lead-acid car batteries',
        'A SNAP-27 plutonium radioisotope thermoelectric generator (RTG)',
        'Windmills turned by the lunar atmosphere',
        'Giant rechargeable solar mirrors'
      ],
      correctIndex: 1,
      explanation: 'Because the lunar night is 14 Earth days long with temperatures reaching -130°C, solar panels would fail. ALSEP used a SNAP-27 plutonium nuclear generator that supplied continuous heat and electricity for 8 years!'
    }
  },

  // =========================================================================
  // PIONEER 10 & 11
  // =========================================================================
  'pioneer-10-11': {
    hasActiveScienceValue: false,
    activeScienceDescription: 'Pioneer 10 and 11 have exhausted their RTG electrical power, but their golden plaques drift forever as an indestructible interstellar message.',
    origin: {
      number: 1,
      title: 'THE ORIGIN',
      subtitle: 'The Grand Tour Scouts & Carl Sagan’s Vision',
      content: 'In the late 1960s, astronomers realized that a rare planetary alignment of the outer gas giants would occur once every 175 years. Before NASA could risk building the complex Voyager spacecraft, they needed lightweight scouts to determine whether spacecraft could survive the dangerous Asteroid Belt and the ferocious radiation belts of Jupiter. NASA Ames designed Pioneer 10 and 11 for this daring reconnaissance.',
      highlightQuote: '"Pioneer was our scout sent into the unknown to see if humanity could ever reach the outer planets."',
      scientificInsight: 'Carl Sagan and Frank Drake convinced NASA to bolt an engraved golden plaque to the spacecraft frame in case an alien civilization ever intercepted it in interstellar space.'
    },
    journey: {
      number: 2,
      title: 'THE JOURNEY',
      subtitle: 'Braving the Asteroid Belt & Slingshotting Jupiter',
      content: 'Pioneer 10 launched on March 2, 1972, aboard an Atlas-Centaur rocket, reaching a record speed of 32,400 mph—the fastest human-made object ever launched at the time. In July 1972, it became the first spacecraft to enter the Asteroid Belt, proving that asteroid debris was sparse and spacecraft could safely cross. In December 1973, Pioneer 10 made the first close flyby of Jupiter, braving radiation 10,000 times stronger than lethal human doses.',
      highlightQuote: '"Pioneer 11 used Jupiter’s titanic gravity as a slingshot to catapult across the Solar System to Saturn, discovering Saturn’s outermost F-ring."',
      scientificInsight: 'Pioneer proved that gravitational assists (slingshots) could be used to propel spacecraft to escape velocity from the Solar System.'
    },
    mission: {
      number: 3,
      title: 'THE MISSION',
      subtitle: 'Thirty-One Years of Telemetry from the Edge of the Sun',
      content: 'After their historic planetary flybys, Pioneer 10 and 11 headed outward toward the stars on hyperbolic escape trajectories. For over three decades, Pioneer 10 continued to broadcast scientific data from the outer heliosphere. On January 23, 2003, from a staggering distance of 12 billion kilometers (80 AU from Earth), Pioneer 10 sent its final faint whisper to the Deep Space Network.',
      highlightQuote: '"Round-trip light time for the final signal was 22 hours and 45 minutes."',
      scientificInsight: 'Pioneer 10 was the first human object to cross the orbit of Neptune, the most distant known planet at the time.'
    },
    discoveries: {
      number: 4,
      title: 'THE DISCOVERIES',
      subtitle: 'Jupiter’s Liquid Core, Cosmic Ray Modulation & Interstellar Boundaries',
      content: 'Pioneer returned the first close-up photographs of Jupiter’s Great Red Spot, revealed that Jupiter is an enormous fluid planet composed almost entirely of liquid hydrogen, and mapped its massive magnetic envelope. As it traveled beyond Pluto, Pioneer measured how the Sun’s solar wind pushes back against cosmic rays from the Milky Way galaxy, discovering the outer boundary of the heliosphere.',
      highlightQuote: '"Pioneer revealed that Jupiter radiates more heat into space than it receives from the Sun."',
      scientificInsight: 'Engineers noticed an unexplained tiny deceleration in the probes’ trajectories, dubbed the "Pioneer Anomaly", later solved as asymmetric thermal radiation recoil.'
    },
    finalChapter: {
      number: 5,
      title: 'THE FINAL CHAPTER',
      subtitle: 'Hyperbolic Escape & The Eternal Drift to Aldebaran',
      content: 'Today, Pioneer 10 and 11 are coasting through interstellar space at roughly 12 kilometers per second (27,000 mph). They are completely cold, frozen at 3 Kelvin (-270°C). Pioneer 10 is heading in the direction of the bright red giant star Aldebaran in the constellation Taurus, and will pass near it in about two million years.',
      highlightQuote: '"Even after our Sun burns out billions of years from now, Pioneer’s golden plaque will still be sailing through the galaxy."',
      scientificInsight: 'In the deep vacuum between stars, erosion from interstellar dust is so negligible that the plaque engravings will remain legible for billions of years.'
    },
    legacy: {
      number: 6,
      title: 'THE LEGACY',
      subtitle: 'Humanity’s First Message in a Bottle to the Galaxy',
      content: 'The Pioneer Plaque is humanity’s archetypal interstellar message. It depicts a man and a woman radiating peaceful intent, the silhouette of the spacecraft, a schematic of the hydrogen atom, and a pulsar map indicating the exact location of planet Earth relative to 14 pulsars. Pioneer proved that humanity is a species capable of reaching out to the cosmos.',
      highlightQuote: '"Pioneer carries our signature across the stars: a message that we lived, we explored, and we wondered."',
      scientificInsight: 'The pulsar timing diagram on the plaque is designed to act as an astronomical clock, allowing extraterrestrial finders to deduce the exact epoch when Pioneer was launched.'
    },
    equipmentHotspots: [
      {
        id: 'gold-plaque',
        name: 'Carl Sagan Gold-Anodized Aluminum Plaque',
        role: '6 by 9 inch engraved plaque showing human figures, Earth’s solar system, and a 14-pulsar galactic map.',
        currentCondition: 'Bolted to antenna strut; projected to survive unshielded in interstellar space for billions of years.',
        xPercent: 50,
        yPercent: 70,
        status: 'silent_relic'
      },
      {
        id: 'dish',
        name: '2.74-Meter High-Gain Parabolic Dish Antenna',
        role: 'Focal reflector allowing faint 8-watt signals to reach Earth across billions of miles.',
        currentCondition: 'Aluminum mesh reflector frozen at 3 Kelvin; drifting silently through the heliosheath.',
        xPercent: 50,
        yPercent: 35,
        status: 'silent_relic'
      },
      {
        id: 'rtg-booms',
        name: 'SNAP-19 RTG Nuclear Power Booms',
        role: 'Plutonium-238 generators mounted on extended booms to prevent radiation interference with sensors.',
        currentCondition: 'Radioisotope decay depleted below electrical threshold; cold and inert.',
        xPercent: 20,
        yPercent: 45,
        status: 'silent_relic'
      }
    ],
    quiz: {
      question: 'How does the Pioneer Plaque show an alien civilization where Earth is located in the Milky Way?',
      options: [
        'By drawing a road map with street names',
        'By plotting Earth’s position relative to 14 pulsars with their unique radio frequencies',
        'By listing the phone numbers of NASA mission control',
        'By drawing an arrow pointing directly to the North Star'
      ],
      correctIndex: 1,
      explanation: 'The plaque uses 14 lines radiating from the Sun to 14 known pulsars. By matching the binary pulse frequencies engraved on the lines, any alien astronomer can triangulate the exact location of Earth!'
    }
  }
};

/**
 * Universal Fallback Generator that crafts a structured 6-chapter story
 * for any artifact in the database based on its authentic NASA archival records.
 */
export function getArtifactStory(artifact: Artifact): ArtifactStory {
  if (ARTIFACT_STORIES[artifact.id]) {
    return ARTIFACT_STORIES[artifact.id];
  }

  // Derive intelligent, authentic fallback story
  const isMoon = artifact.celestialBody === 'moon';
  const isMars = artifact.celestialBody === 'mars';
  const destinationName = isMoon ? 'the Moon' : isMars ? 'Mars' : 'Deep Space';

  return {
    hasActiveScienceValue: false,
    origin: {
      number: 1,
      title: 'THE ORIGIN',
      subtitle: `The Engineering Concept & Strategic Objectives of ${artifact.mission}`,
      content: `${artifact.name} was commissioned by ${artifact.agency} during the ${artifact.launchYear} era to expand human presence and robotic investigation on ${destinationName}. Designed specifically to address unanswered planetary questions, its primary directive was: "${artifact.purpose}". Engineers built its chassis to withstand extreme off-world environments without direct human maintenance.`,
      highlightQuote: artifact.brief,
      scientificInsight: `Engineers designed ${artifact.name} with custom instruments tailored to withstand ${destinationName}'s brutal cosmic radiation and thermal cycling.`
    },
    journey: {
      number: 2,
      title: 'THE JOURNEY',
      subtitle: `Launch from Earth & Transit to ${destinationName}`,
      content: `On ${artifact.launchDate}, ${artifact.name} blasted off from Earth, breaking free of gravity and initiating its interplanetary voyage. ${
        artifact.landingDate 
          ? `After months traversing the vacuum of space, it executed its critical entry and touchdown sequence on ${artifact.landingDate}, setting down at ${artifact.coordinates.landingSite}.`
          : `It fired its propulsion thrusters to enter its orbital trajectory, navigating with celestial star trackers across millions of kilometers.`
      }`,
      highlightQuote: `Landing Site: ${artifact.coordinates.landingSite} (${artifact.coordinatesDisplay})`,
      scientificInsight: `Navigating to ${destinationName} required closed-loop trajectory correction burns and precise gravitational tracking.`
    },
    mission: {
      number: 3,
      title: 'THE MISSION',
      subtitle: `Surface Operations & Telemetry Milestones`,
      content: `Over its ${artifact.operationalDays} operational days, ${artifact.name} operated at peak efficiency, transmitting millions of bits of scientific telemetry back to Earth. ${
        artifact.distanceTraveledKm 
          ? `It traversed ${artifact.distanceTraveledKm} kilometers across extraterrestrial terrain, analyzing boulders, bedrock, and soil composition.`
          : `Operating as a stationary surface station, it monitored atmospheric and environmental changes across changing seasons.`
      }`,
      highlightQuote: artifact.finalLogTranscript || `Logged ${artifact.operationalDays} days of continuous off-world exploration.`,
      scientificInsight: artifact.narrative
    },
    discoveries: {
      number: 4,
      title: 'THE DISCOVERIES',
      subtitle: 'Key Scientific Breakthroughs & Knowledge Contributed',
      content: `The scientific instruments aboard ${artifact.name} delivered foundational discoveries: ${artifact.scientificLegacy.join('; ')}. These breakthroughs rewrote planetary textbooks and deepened our comprehension of ${destinationName}.`,
      highlightQuote: artifact.scientificLegacy[0] || 'Delivered ground-truth data from the extraterrestrial surface.',
      scientificInsight: `Physical samples, multispectral images, and telemetry provided empirical proof of planetary evolution processes.`
    },
    finalChapter: {
      number: 5,
      title: 'THE FINAL CHAPTER',
      subtitle: `The Final Signal & Resting State at ${artifact.coordinates.landingSite}`,
      content: `On ${artifact.finalSignalDate}, ${artifact.name} concluded its final scheduled communications pass with mission control. ${artifact.statusDescription} Exposed to ${artifact.cosmicWeathering.toLowerCase()}, it remains an enduring monument to humanity's scientific courage.`,
      highlightQuote: `Status: ${artifact.status.replace('_', ' ').toUpperCase()} // Preserved at ${artifact.coordinates.landingSite}`,
      scientificInsight: `Weathering conditions: ${artifact.cosmicWeathering}`
    },
    legacy: {
      number: 6,
      title: 'THE LEGACY',
      subtitle: 'Why This Hardware Matters to Future Spacefarers',
      content: `${artifact.historicalSignificance} As human civilization prepares for permanent bases under Artemis and future Mars expeditions, ${artifact.name} serves as an invaluable technological benchmark and protected heritage site.`,
      highlightQuote: `An immortal technological landmark preserved on ${destinationName}.`,
      scientificInsight: `Protected under space heritage frameworks as an irreplaceable chapter of humanity’s first exploratory century.`
    },
    equipmentHotspots: [
      {
        id: 'main-bus',
        name: `${artifact.name} Main Chassis`,
        role: `Primary structure housing electronics, computers, and mission instruments.`,
        currentCondition: artifact.statusDescription,
        xPercent: 50,
        yPercent: 50,
        status: 'silent_relic'
      }
    ],
    quiz: {
      question: `What was the primary historical accomplishment of the ${artifact.name}?`,
      options: [
        artifact.historicalSignificance.slice(0, 75) + '...',
        'It was returned to Earth and placed in the Smithsonian',
        'It malfunctioned before launch and never reached space',
        'It was dismantled by alien life forms'
      ],
      correctIndex: 0,
      explanation: artifact.historicalSignificance
    }
  };
}
