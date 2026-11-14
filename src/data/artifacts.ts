import type { Artifact } from '../types';

export const ARTIFACTS: Artifact[] = [
  // ===================== THE MOON (LUNA) =====================
  {
    id: 'apollo-11-descent',
    archivalId: 'ARC-LUN-1969-A11',
    name: 'Apollo 11 Lunar Module Descent Stage ("Eagle")',
    mission: 'Apollo 11',
    agency: 'NASA',
    country: 'United States',
    celestialBody: 'moon',
    category: 'lander',
    launchDate: '1969-07-16',
    landingDate: '1969-07-20',
    finalSignalDate: '1969-07-24', // Ascent stage left descent stage at 21:54 UTC July 21
    operationalDays: 2,
    status: 'intact_inactive',
    statusDescription: 'Stationary launch platform resting permanently in Mare Tranquillitatis.',
    coordinates: {
      latitude: 0.67408,
      longitude: 23.47297,
      landingSite: 'Tranquility Base',
      region: 'Mare Tranquillitatis',
      elevationMeters: -2500,
    },
    coordinatesDisplay: '0.6741° N, 23.4730° E',
    brief: 'The lower stage of humanity’s first crewed lunar landing craft, carrying the commemorative plaque and solar wind experiment.',
    narrative: 'When Neil Armstrong and Buzz Aldrin blasted off from the lunar surface on July 21, 1969, the descent stage remained behind as their launch pad. Bolted to its forward landing gear strut is a stainless steel plaque engraved: "Here men from the planet Earth first set foot upon the Moon, July 1969 A.D. We came in peace for all mankind." It sits undisturbed in the silent vacuum, its gold Kapton thermal foil now brittle under decades of unshielded solar ultraviolet radiation.',
    finalLogTranscript: '"Houston, Tranquility Base here. The Eagle has landed." ... "Beautiful view. Magnificent desolation."',
    scientificLegacy: [
      'Validated powered lunar descent & landing radar guidance algorithms',
      'Deployed Early Apollo Scientific Experiments Package (EASEP)',
      'Left Retroreflector still targeted by Earth laser stations'
    ],
    equipmentAbandoned: [
      'Grumman LM Descent Engine & propellant tanks',
      'Laser Ranging Retroreflector (LRRR)',
      'Passive Seismic Experiment Package (PSEP)',
      'Stainless steel commemorative goodwill plaque',
      'Silicone goodwill disc with messages from 73 world leaders'
    ],
    cosmicWeathering: 'Exposed to unfiltered solar UV, day-night thermal swings from -130°C to +120°C, and steady micrometeoroid sandblasting.',
    imageTheme: {
      accentColor: '#F59E0B',
      schematicType: 'lander'
    }
  },
  {
    id: 'apollo-15-lrv',
    archivalId: 'ARC-LUN-1971-LRV1',
    name: 'Apollo 15 Lunar Roving Vehicle ("LRV-001")',
    mission: 'Apollo 15',
    agency: 'NASA',
    country: 'United States',
    celestialBody: 'moon',
    category: 'equipment',
    launchDate: '1971-07-26',
    landingDate: '1971-07-30',
    finalSignalDate: '1971-08-02',
    operationalDays: 3,
    distanceTraveledKm: 27.76,
    status: 'intact_inactive',
    statusDescription: 'Parked approximately 100 meters east of the Falcon descent stage.',
    coordinates: {
      latitude: 26.1322,
      longitude: 3.6339,
      landingSite: 'Hadley-Apennine',
      region: 'Palus Putredinis / Hadley Rille',
      elevationMeters: -1800,
    },
    coordinatesDisplay: '26.1322° N, 3.6339° E',
    brief: 'The first electric automobile driven by humans on another celestial world.',
    narrative: 'Folded like origami into the side of the lunar lander Falcon, LRV-001 opened vast geological ranges to astronauts David Scott and James Irwin. During EVA 3, Scott parked the rover at "VIP Site" with its color television camera pointed at Falcon so Houston could broadcast humanity’s first live telecast of a lunar liftoff. It remains parked facing the Hadley Rille canyon, its woven zinc-coated steel wire mesh tires resting quietly in lunar regolith.',
    finalLogTranscript: '"Man, is this a neat little car! ... It bounces quite a bit, but it climbs like a mountain goat."',
    scientificLegacy: [
      'Allowed exploration radius of over 5 km away from the lander',
      'Facilitated discovery of the iconic "Genesis Rock" (anorthosite dated 4.1 billion years old)',
      'Recorded the first live color broadcast of an ascent stage ignition from the Moon'
    ],
    equipmentAbandoned: [
      'Boeing/Delco four-wheel electric chassis with wire-mesh wheels',
      'High-gain parabolic antenna & RCA color TV camera assembly',
      'Astronaut seats and navigation gyro unit',
      'Commander Scott’s emergency seat-belt repair clamp'
    ],
    cosmicWeathering: 'Severe electrostatic lunar dust adhesion on fenders; thermal degradation of battery radiator mirrors.',
    imageTheme: {
      accentColor: '#E2E8F0',
      schematicType: 'vehicle'
    }
  },
  {
    id: 'lunokhod-1',
    archivalId: 'ARC-LUN-1970-LNK1',
    name: 'Lunokhod 1 (Luna 17)',
    mission: 'Luna 17',
    agency: 'Soviet Space Program',
    country: 'USSR',
    celestialBody: 'moon',
    category: 'rover',
    launchDate: '1970-11-10',
    landingDate: '1970-11-17',
    finalSignalDate: '1971-09-14',
    operationalDays: 322,
    distanceTraveledKm: 10.54,
    status: 'silent',
    statusDescription: 'Resting in Mare Imbrium; French retroreflector rediscovered by LRO in 2010.',
    coordinates: {
      latitude: 38.315,
      longitude: -35.008,
      landingSite: 'Mare Imbrium',
      region: 'Sea of Rains',
      elevationMeters: -2900,
    },
    coordinatesDisplay: '38.3150° N, 35.0080° W',
    brief: 'The world’s first robotic wheel-driven rover to roam the surface of an extraterrestrial world.',
    narrative: 'Resembling a steampunk tub on eight wire-spoked wheels, Lunokhod 1 was piloted by a five-man crew on Earth using joystick telemetry with a 3-second signal lag. Powered by solar cells inside its hinged lid and kept warm through freezing two-week lunar nights with a polonium-210 radioisotope heater, it survived 11 lunar days before its thermal source decayed. In 2010, NASA’s Lunar Reconnaissance Orbiter located its chassis, and Earth lasers successfully pinged its French corner-cube reflector after 40 years of darkness.',
    finalLogTranscript: '"Vehicle telemetry ceased on September 14, 1971, during its 11th lunar night. The isotope heat source is depleted."',
    scientificLegacy: [
      'Proved feasibility of teleoperated planetary rovers',
      'Acquired 20,000 television images and 200 high-resolution panoramas',
      'Analyzed soil density and chemical composition across 500 lunar sites'
    ],
    equipmentAbandoned: [
      'Eight-wheel wire mesh chassis with independent suspension',
      'Polonium-210 radioisotope decay heat generator',
      'RIFMA X-ray fluorescence spectrometer',
      'French-built Corner-cube laser retroreflector array'
    ],
    cosmicWeathering: 'Polonium heater completely decayed; metallic surfaces pitted with micrometeorite impacts; reflectors remarkably intact.',
    imageTheme: {
      accentColor: '#F59E0B',
      schematicType: 'rover'
    }
  },
  {
    id: 'surveyor-3',
    archivalId: 'ARC-LUN-1967-SRV3',
    name: 'Surveyor 3',
    mission: 'Surveyor 3',
    agency: 'NASA',
    country: 'United States',
    celestialBody: 'moon',
    category: 'lander',
    launchDate: '1967-04-17',
    landingDate: '1967-04-20',
    finalSignalDate: '1967-05-04',
    operationalDays: 14,
    status: 'intact_inactive',
    statusDescription: 'Resting on the interior slope of Surveyor Crater in Oceanus Procellarum.',
    coordinates: {
      latitude: -3.015,
      longitude: -23.418,
      landingSite: 'Surveyor Crater',
      region: 'Oceanus Procellarum (Ocean of Storms)',
      elevationMeters: -2100,
    },
    coordinatesDisplay: '3.0150° S, 23.4180° W',
    brief: 'The robotic scout that bounced twice upon touchdown and was later physically recovered by Apollo 12 astronauts.',
    narrative: 'Surveyor 3 demonstrated that Apollo astronauts would not sink into deep quicksand-like dust as once feared. In November 1969, Apollo 12 executed a pinpoint landing only 163 meters away. Astronauts Pete Conrad and Alan Bean walked down into the crater, took photographs, and unbolted Surveyor 3’s television camera and robotic scoop arm to carry them back to Earth—providing humanity’s first direct study of how hardware endures years in space.',
    finalLogTranscript: '"Touchdown radar failed to cut engines immediately; craft bounced 10 meters, then 3 meters, before settling safely."',
    scientificLegacy: [
      'Confirmed lunar regolith bearing strength prior to Apollo crewed missions',
      'Only uncrewed probe ever visited and physically examined by human astronauts on another celestial body',
      'Returned hardware revealed surviving Streptococcus mitis bacteria (though later determined likely contaminated in lab post-return)'
    ],
    equipmentAbandoned: [
      'Tubular aluminum tripod landing gear',
      'Radar altimeter sensor housing',
      'Solar panel mast (camera and scoop retrieved by Apollo 12)',
      'Two vernier rocket engines'
    ],
    cosmicWeathering: 'White paint had turned light tan from solar ultraviolet radiation; micrometeoroid pitting on sun-facing panels.',
    imageTheme: {
      accentColor: '#38BDF8',
      schematicType: 'lander'
    }
  },
  {
    id: 'apollo-17-challenger',
    archivalId: 'ARC-LUN-1972-A17',
    name: 'Apollo 17 Descent Stage & Rover ("LRV-003")',
    mission: 'Apollo 17',
    agency: 'NASA',
    country: 'United States',
    celestialBody: 'moon',
    category: 'equipment',
    launchDate: '1972-12-07',
    landingDate: '1972-12-11',
    finalSignalDate: '1972-12-14',
    operationalDays: 4,
    distanceTraveledKm: 35.89,
    status: 'intact_inactive',
    statusDescription: 'Taurus-Littrow Valley. Marks the final site where human footsteps were placed on lunar soil in the 20th century.',
    coordinates: {
      latitude: 20.1908,
      longitude: 30.7717,
      landingSite: 'Taurus-Littrow Valley',
      region: 'Mare Serenitatis Border',
      elevationMeters: -2300,
    },
    coordinatesDisplay: '20.1908° N, 30.7717° E',
    brief: 'The monument at the edge of the Taurus-Littrow valley holding the famous duct-taped fender and final footsteps.',
    narrative: 'Eugene Cernan and Harrison Schmitt spent three days traversing over 35 kilometers with LRV-003. When a hammer caught on the right rear fender and broke it off, lunar dust began raining down on the astronauts; they improvised a legendary repair using four taped chronological geology maps and gray duct tape. As Cernan stepped off the ladder for the last time, he uttered words that stand as humanity’s promise to return. The rover sits today at "Site 10" with its camera angled to the stars.',
    finalLogTranscript: '"As we leave the Moon at Taurus-Littrow, we leave as we came, and, God willing, as we shall return: with peace and hope for all mankind. Godspeed the crew of Apollo 17."',
    scientificLegacy: [
      'Longest total surface time of any Apollo mission (75 hours)',
      'Discovery of orange pyroclastic volcanic glass at Shorty Crater',
      'Extensive sub-surface seismic profiling of lunar crust'
    ],
    equipmentAbandoned: [
      'Challenger LM descent stage and landing pads',
      'Lunar Roving Vehicle 003 with duct-taped map fender repair',
      'Apollo Lunar Surface Experiments Package (ALSEP) central transmitter',
      'Traverse Gravimeter and Surface Electrical Properties transmitter'
    ],
    cosmicWeathering: 'Duct tape adhesive brittle and dried out; gold mylar thermal wraps partially discolored.',
    imageTheme: {
      accentColor: '#F59E0B',
      schematicType: 'vehicle'
    }
  },
  {
    id: 'yutu-rover',
    archivalId: 'ARC-LUN-2013-YTU1',
    name: 'Yutu Rover ("Jade Rabbit") / Chang\'e 3',
    mission: 'Chang\'e 3',
    agency: 'CNSA',
    country: 'China',
    celestialBody: 'moon',
    category: 'rover',
    launchDate: '2013-12-01',
    landingDate: '2013-12-14',
    finalSignalDate: '2016-07-31',
    operationalDays: 972,
    distanceTraveledKm: 0.114,
    status: 'silent',
    statusDescription: 'Resting in northern Mare Imbrium near Zi Wei crater.',
    coordinates: {
      latitude: 44.1214,
      longitude: -19.5125,
      landingSite: 'Mare Imbrium',
      region: 'Northern Mare Imbrium',
      elevationMeters: -2640,
    },
    coordinatesDisplay: '44.1214° N, 19.5125° W',
    brief: 'China’s first lunar rover whose heartfelt personified updates captivated millions across the globe.',
    narrative: 'Yutu touched down aboard Chang\'e 3 in late 2013, marking the first soft landing on the Moon since Luna 24 in 1976. Just before entering its second lunar night, the rover suffered a mechanical control circuit failure that prevented its solar wings from folding. Though immobilized, its radar and scientific payloads continued transmitting for an astonishing 31 months, earning the admiration of space fans worldwide before falling permanently silent on July 31, 2016.',
    finalLogTranscript: '"The stars are beautiful... The master has said to sleep now. Goodnight, Earth. Goodnight, humanity."',
    scientificLegacy: [
      'First radar penetration down to 400 meters inside lunar basalt layers',
      'Discovered a new type of basaltic rock rich in ilmenite and titanium dioxide',
      'Demonstrated prolonged survival of electronics in harsh lunar thermal conditions'
    ],
    equipmentAbandoned: [
      'Six-wheeled aluminum chassis with rocker-bogie suspension',
      'Lunar Penetrating Ground Radar (LPR)',
      'Alpha Particle X-Ray Spectrometer (APXS)',
      'Visible and Near-Infrared Imaging Spectrometer'
    ],
    cosmicWeathering: 'Open unshielded solar panel exposed to 30+ harsh thermal day-night cycles.',
    imageTheme: {
      accentColor: '#F43F5E',
      schematicType: 'rover'
    }
  },

  // ===================== MARS (ARES) =====================
  {
    id: 'opportunity-rover',
    archivalId: 'ARC-MRS-2004-OPP',
    name: 'Opportunity Rover (MER-B)',
    mission: 'Mars Exploration Rover',
    agency: 'NASA',
    country: 'United States',
    celestialBody: 'mars',
    category: 'rover',
    launchDate: '2003-07-07',
    landingDate: '2004-01-25',
    finalSignalDate: '2018-06-10',
    operationalDays: 5250, // Planned for 90 days, lasted 14.5 years
    distanceTraveledKm: 45.16,
    status: 'interred',
    statusDescription: 'Resting inside Perseverance Valley on the western rim of Endeavour Crater.',
    coordinates: {
      latitude: -2.257,
      longitude: 354.764,
      landingSite: 'Perseverance Valley',
      region: 'Endeavour Crater / Meridiani Planum',
      elevationMeters: -1900,
    },
    coordinatesDisplay: '2.2570° S, 354.7640° E',
    brief: 'The marathon rover that survived 57 times longer than planned, forever transforming our understanding of Martian water.',
    narrative: 'Designed for a modest 90-sol mission, Opportunity became one of humanity’s greatest robotic explorers. It climbed out of impact craters, examined hematite "blueberries" that proved liquid water once flowed across Mars, and set the all-time off-world driving record at 45.16 km. In June 2018, a catastrophic planet-encircling dust storm blotted out the sun over Endeavour Crater. Deprived of sunlight, its batteries drained to zero. Over eight months, engineers sent more than a thousand recovery commands; on February 13, 2019, NASA concluded the mission.',
    finalLogTranscript: '"Telemetry indicates atmospheric opacity (tau) exceeded 10.8. Solar array output dropped below 22 watt-hours. Battery level critically depleted."',
    scientificLegacy: [
      'Discovered definitive geological evidence of past liquid, acidic surface water on Mars',
      'Explored Eagle, Endurance, Victoria, and Endeavour craters across 45+ km',
      'Discovered the first meteorite found on another planet (Heat Shield Rock)'
    ],
    equipmentAbandoned: [
      'Six-wheel rocker-bogie rover chassis and instrument arm',
      'Mini-TES infrared spectrometer and Mössbauer spectrometer',
      'Panoramic Camera (Pancam) and Microscopic Imager',
      'Rock Abrasion Tool (RAT) with diamond grit heads worn down to nubs'
    ],
    cosmicWeathering: 'Coated in fine ferric iron oxide Martian red dust; high thermal stress on solder joints during sub-zero winters.',
    imageTheme: {
      accentColor: '#F59E0B',
      schematicType: 'rover'
    }
  },
  {
    id: 'spirit-rover',
    archivalId: 'ARC-MRS-2004-SPT',
    name: 'Spirit Rover (MER-A)',
    mission: 'Mars Exploration Rover',
    agency: 'NASA',
    country: 'United States',
    celestialBody: 'mars',
    category: 'rover',
    launchDate: '2003-06-10',
    landingDate: '2004-01-04',
    finalSignalDate: '2010-03-22',
    operationalDays: 2210,
    distanceTraveledKm: 7.73,
    status: 'interred',
    statusDescription: 'Entombed in the soft sulfate soils of "Troy" on the west side of Home Plate plateau, Gusev Crater.',
    coordinates: {
      latitude: -14.5684,
      longitude: 175.4726,
      landingSite: 'Gusev Crater',
      region: 'Home Plate / Columbia Hills',
      elevationMeters: -1940,
    },
    coordinatesDisplay: '14.5684° S, 175.4726° E',
    brief: 'Opportunity’s twin sister, which turned a broken front wheel into one of the greatest hydrothermal discoveries on Mars.',
    narrative: 'Spirit landed in Gusev Crater, battling rocky terrains and scaling Husband Hill. In 2006, its right-front wheel seized. Engineers learned to drive Spirit backwards, dragging the dead wheel behind it. This dragged wheel scraped away the topsoil at Home Plate, churning up dazzling white soil that was 90% pure silica—proving hydrothermal geysers or fumaroles once erupted here. In May 2009, Spirit became hopelessly bogged down in a hidden patch of soft iron-sulfate sand named "Troy". Unable to tilt its solar panels toward the winter sun, its last broadcast came on March 22, 2010.',
    finalLogTranscript: '"Sol 2210: Transmitted health telemetry via Mars Odyssey orbiter relay. Expected power for sol: 134 Wh. Temperatures falling below survivable threshold."',
    scientificLegacy: [
      'Serendipitously discovered pure silica deposits confirming ancient hot springs or steam vents',
      'Documented dozens of active Martian dust devils traversing Gusev Crater in video sequences',
      'First Martian ascent of a mountain peak (Husband Hill, rising 100 meters above surrounding plains)'
    ],
    equipmentAbandoned: [
      'Twin MER rover body with stuck front-right steering actuator',
      'Mössbauer iron spectrometer with cobalt-57 source',
      'Alpha Particle X-Ray Spectrometer (APXS)',
      'Microscopic soil imager'
    ],
    cosmicWeathering: 'Buried up to wheel hubs in sulfate sand; solar panels smothered with dust; cold cycle cracking.',
    imageTheme: {
      accentColor: '#EF4444',
      schematicType: 'rover'
    }
  },
  {
    id: 'ingenuity-helicopter',
    archivalId: 'ARC-MRS-2021-ING',
    name: 'Ingenuity Mars Helicopter ("Ginny")',
    mission: 'Mars 2020 (Perseverance)',
    agency: 'NASA / JPL',
    country: 'United States',
    celestialBody: 'mars',
    category: 'aircraft',
    launchDate: '2020-07-30',
    landingDate: '2021-02-18',
    finalSignalDate: '2024-01-25',
    operationalDays: 1042,
    distanceTraveledKm: 17.0,
    status: 'intact_inactive',
    statusDescription: 'Resting quietly among the sand ripples of "Valinor Hills" in Jezero Crater.',
    coordinates: {
      latitude: 18.4447,
      longitude: 77.4508,
      landingSite: 'Valinor Hills',
      region: 'Jezero Crater',
      elevationMeters: -2500,
    },
    coordinatesDisplay: '18.4447° N, 77.4508° E',
    brief: 'The first aircraft in human history to achieve powered, controlled flight on another world.',
    narrative: 'Tucked beneath Perseverance’s belly as a lightweight 1.8 kg tech demo, Ingenuity was designed for just five test flights in Mars’ ultra-thin atmosphere (less than 1% of Earth’s density). Instead, it flew 72 times across three Earth years, acting as an aerial scout for the rover. On Flight 72 on January 18, 2024, navigating across bland, featureless sand ripples, it made an emergency hard landing. Shadow imagery confirmed one of its carbon-fiber rotor blades had snapped off. Though unable to fly again, it remains powered, serving as a stationary weather station and avionics beacon.',
    finalLogTranscript: '"Flight 72 anomaly detected during autonomous descent at 1 meter altitude. Shadow telemetry reveals pitch blade fracture. Airframe structurally intact; flight operations concluded."',
    scientificLegacy: [
      'Proved aerodynamic lift in atmospheric density equivalent to 30 km altitude on Earth',
      'Logged 128.8 minutes of flight time across 17.0 km of Martian terrain',
      'Paved the way for future aerial planetary exploration (Dragonfly on Titan, future Mars rotorcraft)'
    ],
    equipmentAbandoned: [
      'Twin counter-rotating carbon fiber blades (damaged at tips)',
      'Qualcomm Snapdragon 801 flight processor',
      'Solar panel array with Sony Li-ion batteries',
      'Swatch of fabric from the Wright Brothers’ 1903 Flyer wing attached to its solar cable'
    ],
    cosmicWeathering: 'Rotor tip fractured; avionics intact and logging daily temperature/solar cycles into memory.',
    imageTheme: {
      accentColor: '#38BDF8',
      schematicType: 'helicopter'
    }
  },
  {
    id: 'viking-1-lander',
    archivalId: 'ARC-MRS-1976-VK1',
    name: 'Viking 1 Lander (Thomas A. Mutch Station)',
    mission: 'Viking 1',
    agency: 'NASA',
    country: 'United States',
    celestialBody: 'mars',
    category: 'lander',
    launchDate: '1975-08-20',
    landingDate: '1976-07-20',
    finalSignalDate: '1982-11-11',
    operationalDays: 2307,
    status: 'silent',
    statusDescription: 'Resting in the vast lowland volcanic plain of Chryse Planitia.',
    coordinates: {
      latitude: 22.697,
      longitude: 312.05,
      landingSite: 'Chryse Planitia',
      region: 'Plains of Gold',
      elevationMeters: -2690,
    },
    coordinatesDisplay: '22.6970° N, 312.0500° E',
    brief: 'The first spacecraft to successfully land on Mars and operate for over six Earth years.',
    narrative: 'Touching down on the 7th anniversary of Apollo 11, Viking 1 transmitted the first high-resolution photograph ever taken from the surface of Mars, revealing a rust-colored landscape dotted with sharp rocks under a salmon-pink sky. It tested soil for signs of microbial respiration and analyzed Martian meteorology through multiple winters. The lander was accidentally silenced in November 1982 when a ground command update intended to extend battery software overwritten antenna transmission parameters, permanently severing contact.',
    finalLogTranscript: '"Uplink command executed to patch battery management software. Uplink inadvertently overwrote communication pointer; antenna pointing angle lost. No further carrier received."',
    scientificLegacy: [
      'Returned the first ever color images from the Martian surface',
      'Performed humanity’s first direct in-situ biology & life detection experiments on Mars',
      'Documented seasonal atmospheric pressure fluctuations as polar carbon dioxide caps froze and sublimated'
    ],
    equipmentAbandoned: [
      'Hexagonal titanium-aluminum landing frame on three footpads',
      'SNAP-19 Radioisotope Thermoelectric Generators (RTGs)',
      'Gas Chromatograph-Mass Spectrometer (GCMS)',
      'Biology experiment chamber (Pyrolytic Release, Labeled Release, Gas Exchange)'
    ],
    cosmicWeathering: 'Decades of Martian dust accumulation; RTG plutonium-238 heat output gradually diminishing.',
    imageTheme: {
      accentColor: '#F59E0B',
      schematicType: 'lander'
    }
  },
  {
    id: 'pathfinder-sojourner',
    archivalId: 'ARC-MRS-1997-MPF',
    name: 'Mars Pathfinder & Sojourner Rover',
    mission: 'Mars Pathfinder (Carl Sagan Memorial Station)',
    agency: 'NASA / JPL',
    country: 'United States',
    celestialBody: 'mars',
    category: 'rover',
    launchDate: '1996-12-04',
    landingDate: '1997-07-04',
    finalSignalDate: '1997-09-27',
    operationalDays: 85,
    distanceTraveledKm: 0.10,
    status: 'silent',
    statusDescription: 'Resting in the ancient catastrophic flood channel of Ares Vallis.',
    coordinates: {
      latitude: 19.33,
      longitude: 326.45,
      landingSite: 'Ares Vallis',
      region: 'Ancient Outflow Channel',
      elevationMeters: -3650,
    },
    coordinatesDisplay: '19.3300° N, 326.4500° E',
    brief: 'The microwave-sized rover and tetrahedral lander that revived Martian exploration with airbag landings.',
    narrative: 'On July 4, 1997, Pathfinder bounced across Ares Vallis encased in giant airbags, opening its solar petals to reveal the 10.6 kg Sojourner rover. Sojourner crept down its ramp and spent three months analyzing rocks nicknamed "Barnacle Bill" and "Yogi", captivating the early World Wide Web with over 500 million website hits. When Pathfinder’s battery finally succumbed to the frigid Martian cold on September 27, Sojourner likely circled the silent lander according to its programmed contingency routine until its own batteries ran dry.',
    finalLogTranscript: '"Carrier lock lost during Sol 83 downlink pass. Suspected battery depletion preventing heater activation for transmitter oscillator."',
    scientificLegacy: [
      'Proved the viability of airbag-cushioned landings for planetary exploration',
      'Confirmed Ares Vallis was carved by massive catastrophic prehistoric flash floods',
      'Established the modern robotic rover architecture used by Spirit, Opportunity, and Curiosity'
    ],
    equipmentAbandoned: [
      'Carl Sagan Memorial tetrahedral lander base with deflated airbag remnants',
      'Sojourner six-wheel microrover with rocker-bogie mechanism',
      'Alpha Proton X-Ray Spectrometer (APXS) pressed against rock "Yogi"',
      'Imager for Mars Pathfinder (IMP) stereoscopic camera mast'
    ],
    cosmicWeathering: 'Airbag fabrics degraded by extreme solar ultraviolet rays; fine dust settling over microrover solar panel.',
    imageTheme: {
      accentColor: '#10B981',
      schematicType: 'rover'
    }
  },
  {
    id: 'phoenix-lander',
    archivalId: 'ARC-MRS-2008-PHX',
    name: 'Phoenix Mars Lander',
    mission: 'Phoenix',
    agency: 'NASA / University of Arizona',
    country: 'United States',
    celestialBody: 'mars',
    category: 'lander',
    launchDate: '2007-08-04',
    landingDate: '2008-05-25',
    finalSignalDate: '2008-11-02',
    operationalDays: 161,
    status: 'interred',
    statusDescription: 'Resting in the high arctic plains of Vastitas Borealis near Green Valley.',
    coordinates: {
      latitude: 68.2188,
      longitude: 234.2507,
      landingSite: 'Vastitas Borealis',
      region: 'Martian Arctic Plains',
      elevationMeters: -4100,
    },
    coordinatesDisplay: '68.2188° N, 234.2507° E',
    brief: 'The arctic explorer that scraped down into the soil to touch and taste Martian water ice for the first time.',
    narrative: 'Landing on Mars’ northern polar plains, Phoenix deployed its 2.35-meter robotic arm to dig into the polygon-patterned permafrost. In trench "Dodo-Goldilocks", it scraped away soil to reveal gleaming white material that sublimated over four days: pure water ice. It proved snow falls from Martian clouds and confirmed the presence of perchlorate salts. As the Martian winter approached, the sun dipped below the horizon and temperatures plunged to -125°C. In 2010, orbital photos confirmed the weight of frozen carbon dioxide (dry ice) had buckled and broken its octagonal solar arrays.',
    finalLogTranscript: '"Triumph: Robotic trench camera confirmed pure ice sublimation. ... Autumn dust storms obscured low sun; battery voltage collapsed to 13.2 volts on Sol 157."',
    scientificLegacy: [
      'First direct physical contact and chemical analysis of Martian water ice',
      'Detected atmospheric snow falling from cirrus clouds using LIDAR laser pulses',
      'Discovered magnesium perchlorate salts, revealing critical soil chemistry insights'
    ],
    equipmentAbandoned: [
      'Three-legged arctic lander frame',
      'Robotic digging scoop arm with thermal rasp drill',
      'Thermal and Evolved-Gas Analyzer (TEGA) miniature ovens',
      'Crushed decagonal solar panel wings under polar CO2 ice'
    ],
    cosmicWeathering: 'Solar arrays crushed and bent by hundreds of kilograms of seasonal dry ice frost accumulation every Martian year.',
    imageTheme: {
      accentColor: '#38BDF8',
      schematicType: 'lander'
    }
  },
  {
    id: 'zhurong-rover',
    archivalId: 'ARC-MRS-2021-ZHR',
    name: 'Zhurong Rover (Tianwen-1)',
    mission: 'Tianwen-1',
    agency: 'CNSA',
    country: 'China',
    celestialBody: 'mars',
    category: 'rover',
    launchDate: '2020-07-23',
    landingDate: '2021-05-14',
    finalSignalDate: '2022-05-20',
    operationalDays: 358,
    distanceTraveledKm: 1.92,
    status: 'hibernating',
    statusDescription: 'Resting in southern Utopia Planitia; entered planned hibernation for winter and failed to wake.',
    coordinates: {
      latitude: 25.066,
      longitude: 109.925,
      landingSite: 'Southern Utopia Planitia',
      region: 'Vast Northern Lowlands',
      elevationMeters: -4150,
    },
    coordinatesDisplay: '25.0660° N, 109.9250° E',
    brief: 'Named after the Chinese mythological god of fire, it made China the second nation to successfully operate a rover on Mars.',
    narrative: 'Equipped with subsurface radar, multispectral cameras, and a magnetometer, Zhurong traversed the ancient plains of Utopia Planitia. It dropped a remote wireless camera on the dirt and backed away to pose for a historic "selfie" with its landing platform. In May 2022, facing harsh winter temperatures and fierce dust storms, engineers put the rover into autonomous hibernation mode, expecting it to revive once temperatures reached -15°C and solar power topped 140 watts in December 2022. HiRISE orbital imagery later confirmed Zhurong remained unmoved, its solar arrays blanketed by Martian dust.',
    finalLogTranscript: '"Rover executed planned hibernation protocol on Sol 358 to survive winter dust storm season. Wake-up criteria: power > 140W, battery temp > -15°C. No signal received upon anticipated revival date."',
    scientificLegacy: [
      'Subsurface radar identified sedimentary layers pointing to past catastrophic sea or flood events in Utopia Planitia',
      'Identified hydrated minerals within young Amazonian-era strata, suggesting water persisted later than previously calculated',
      'Successfully deployed autonomous drop-cameras and remote wireless communications'
    ],
    equipmentAbandoned: [
      'Six-wheeled rover chassis with active suspension and butterfly solar wings',
      'RoPeR Subsurface Penetrating Radar',
      'Mars Surface Magnetic Field Detector',
      'Surface Composition Detector (laser-induced breakdown spectroscopy)'
    ],
    cosmicWeathering: 'Heavy dust deposition on non-stick anti-dust coatings; cold-soak across Martian northern winter.',
    imageTheme: {
      accentColor: '#F59E0B',
      schematicType: 'rover'
    }
  }
];
