export type CelestialBody = 'moon' | 'mars';

export type ArtifactStatus = 'silent' | 'interred' | 'hibernating' | 'intact_inactive';

export type ArtifactCategory = 
  | 'lander' 
  | 'rover' 
  | 'aircraft' 
  | 'scientific_package' 
  | 'equipment';

export interface Coordinates {
  latitude: number; // degrees
  longitude: number; // degrees
  landingSite: string;
  region: string;
  elevationMeters?: number;
}

export interface Artifact {
  id: string;
  archivalId: string; // e.g. "ARC-LUN-1969-01"
  name: string;
  mission: string;
  agency: string;
  country: string;
  celestialBody: CelestialBody;
  category: ArtifactCategory;
  launchDate: string;
  landingDate: string;
  finalSignalDate: string;
  operationalDays: number;
  status: ArtifactStatus;
  statusDescription: string;
  coordinates: Coordinates;
  coordinatesDisplay: string;
  distanceTraveledKm?: number;
  brief: string;
  narrative: string;
  finalLogTranscript?: string;
  scientificLegacy: string[];
  equipmentAbandoned: string[];
  cosmicWeathering: string;
  imageTheme: {
    accentColor: string;
    schematicType: 'rover' | 'lander' | 'helicopter' | 'vehicle' | 'package';
  };
}

export type ViewMode = 'archive' | 'map' | 'timeline' | 'memorial';
