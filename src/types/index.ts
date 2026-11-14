export type CelestialBody = 'moon' | 'mars' | 'deep_space';

export type ArtifactCollection = 'primary' | 'deep_space';

export type ArtifactStatus = 
  | 'silent' 
  | 'interred' 
  | 'hibernating' 
  | 'intact_inactive' 
  | 'perpetual_orbit' 
  | 'interstellar_drift';

export type ArtifactCategory = 
  | 'lander' 
  | 'rover' 
  | 'aircraft' 
  | 'scientific_package' 
  | 'equipment'
  | 'deep_space_probe'
  | 'space_telescope';

export interface Coordinates {
  latitude?: number; // degrees
  longitude?: number; // degrees
  landingSite: string;
  region: string;
  elevationMeters?: number;
  orbitalRegime?: string; // for deep space
  distanceFromSunAU?: string; // for deep space
}

export interface KidComparison {
  sizeComparison: string;
  weightComparison?: string;
  speedComparison?: string;
  funFact: string;
  whyLeftBehind: string;
}

export interface StoryChapter {
  number: number;
  title: string;
  subtitle: string;
  content: string;
  highlightQuote?: string;
  scientificInsight?: string;
}

export interface EquipmentHotspot {
  id: string;
  name: string;
  role: string;
  currentCondition: string;
  xPercent: number;
  yPercent: number;
  status: 'active_science' | 'silent_relic';
}

export interface StoryQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ArtifactStory {
  origin: StoryChapter;
  journey: StoryChapter;
  mission: StoryChapter;
  discoveries: StoryChapter;
  finalChapter: StoryChapter;
  legacy: StoryChapter;
  equipmentHotspots?: EquipmentHotspot[];
  quiz?: StoryQuiz;
  hasActiveScienceValue?: boolean;
  activeScienceDescription?: string;
}

export interface Artifact {
  id: string;
  archivalId: string; // e.g. "ARC-LUN-1969-A11"
  name: string;
  mission: string;
  agency: string;
  country: string;
  celestialBody: CelestialBody;
  collection: ArtifactCollection;
  category: ArtifactCategory;
  launchYear: number;
  launchDate: string;
  landingDate?: string;
  finalSignalDate: string;
  operationalDays: number;
  status: ArtifactStatus;
  statusDescription: string;
  coordinates: Coordinates;
  coordinatesDisplay: string;
  distanceTraveledKm?: number;
  purpose: string;
  historicalSignificance: string;
  brief: string;
  narrative: string;
  finalLogTranscript?: string;
  scientificLegacy: string[];
  equipmentAbandoned: string[];
  cosmicWeathering: string;
  nasaSourceUrl: string;
  imageUrl?: string;
  imageCredit?: string;
  imageCaption?: string;
  imageTheme: {
    accentColor: string;
    schematicType: 'rover' | 'lander' | 'helicopter' | 'vehicle' | 'package' | 'probe' | 'telescope';
  };
  kidFriendly?: KidComparison;
  story?: ArtifactStory;
}

export type ViewMode = 
  | 'overview' 
  | 'story'
  | 'lab'
  | 'quest'
  | 'timeline'
  | 'tracker'
  | 'moon' 
  | 'mars' 
  | 'radar' 
  | 'memorial' 
  | 'deep_space';
