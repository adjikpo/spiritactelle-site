/**
 * Types et interfaces pour le moteur astrologique Astrobien
 */

// ============================================
// Enums
// ============================================

export enum Planet {
  Sun = 'sun',
  Moon = 'moon',
  Mercury = 'mercury',
  Venus = 'venus',
  Mars = 'mars',
  Jupiter = 'jupiter',
  Saturn = 'saturn',
  Uranus = 'uranus',
  Neptune = 'neptune',
  Pluto = 'pluto',
  NorthNode = 'northNode',
  SouthNode = 'southNode',
  Chiron = 'chiron',
  Ascendant = 'ascendant',
  Midheaven = 'midheaven',
}

export enum ZodiacSign {
  Aries = 'aries',
  Taurus = 'taurus',
  Gemini = 'gemini',
  Cancer = 'cancer',
  Leo = 'leo',
  Virgo = 'virgo',
  Libra = 'libra',
  Scorpio = 'scorpio',
  Sagittarius = 'sagittarius',
  Capricorn = 'capricorn',
  Aquarius = 'aquarius',
  Pisces = 'pisces',
}

export enum Element {
  Fire = 'fire',
  Earth = 'earth',
  Air = 'air',
  Water = 'water',
}

export enum Modality {
  Cardinal = 'cardinal',
  Fixed = 'fixed',
  Mutable = 'mutable',
}

export enum AspectType {
  Conjunction = 'conjunction',
  Opposition = 'opposition',
  Trine = 'trine',
  Square = 'square',
  Sextile = 'sextile',
  Quincunx = 'quincunx',
  SemiSextile = 'semiSextile',
  SemiSquare = 'semiSquare',
  Sesquiquadrate = 'sesquiquadrate',
  Quintile = 'quintile',
  BiQuintile = 'biQuintile',
}

export enum HouseSystem {
  Placidus = 'placidus',
  Koch = 'koch',
  Equal = 'equal',
  WholeSign = 'wholeSign',
  Campanus = 'campanus',
  Regiomontanus = 'regiomontanus',
}

// ============================================
// Interfaces de base
// ============================================

export interface GeoLocation {
  latitude: number;
  longitude: number;
  timezone: string;
  name?: string;
  country?: string;
}

export interface BirthData {
  date: Date;
  time: string; // Format HH:mm
  location: GeoLocation;
}

export interface PlanetPosition {
  planet: Planet;
  longitude: number; // 0-360 degrees
  latitude: number;
  speed: number; // degrees per day
  retrograde: boolean;
  sign: ZodiacSign;
  signDegree: number; // 0-30 within sign
  house: number; // 1-12
}

export interface HouseCusp {
  house: number; // 1-12
  longitude: number; // 0-360 degrees
  sign: ZodiacSign;
  signDegree: number;
}

export interface Aspect {
  planet1: Planet;
  planet2: Planet;
  type: AspectType;
  orb: number; // actual orb in degrees
  maxOrb: number; // maximum allowed orb
  applying: boolean; // true if aspect is forming, false if separating
  exactDegree: number; // exact angle
}

// ============================================
// Thème Astral complet
// ============================================

export interface NatalChart {
  birthData: BirthData;
  planets: PlanetPosition[];
  houses: HouseCusp[];
  aspects: Aspect[];
  houseSystem: HouseSystem;
  calculatedAt: Date;
}

// ============================================
// Métadonnées des signes
// ============================================

export interface SignInfo {
  sign: ZodiacSign;
  name: string;
  nameFr: string;
  symbol: string;
  element: Element;
  modality: Modality;
  ruler: Planet;
  detriment: Planet;
  exaltation: Planet | null;
  fall: Planet | null;
  startDegree: number; // 0-360
  keywords: string[];
}

// ============================================
// Métadonnées des planètes
// ============================================

export interface PlanetInfo {
  planet: Planet;
  name: string;
  nameFr: string;
  symbol: string;
  keywords: string[];
  dignities: {
    domicile: ZodiacSign[];
    exaltation: ZodiacSign | null;
    detriment: ZodiacSign[];
    fall: ZodiacSign | null;
  };
}

// ============================================
// Métadonnées des aspects
// ============================================

export interface AspectInfo {
  type: AspectType;
  name: string;
  nameFr: string;
  angle: number;
  defaultOrb: number;
  nature: 'harmonious' | 'challenging' | 'neutral';
  symbol: string;
}

// ============================================
// Transits
// ============================================

export interface Transit {
  transitingPlanet: Planet;
  natalPlanet: Planet;
  aspectType: AspectType;
  orb: number;
  exactDate: Date;
  startDate: Date;
  endDate: Date;
  applying: boolean;
}

export interface TransitChart {
  natalChart: NatalChart;
  transitDate: Date;
  transits: Transit[];
  transitPlanets: PlanetPosition[];
}

// ============================================
// Synastrie (Compatibilité)
// ============================================

export interface SynastryAspect extends Aspect {
  person1Planet: Planet;
  person2Planet: Planet;
}

export interface SynastryChart {
  person1: NatalChart;
  person2: NatalChart;
  aspects: SynastryAspect[];
  compatibility: {
    overall: number; // 0-100
    emotional: number;
    intellectual: number;
    physical: number;
    spiritual: number;
  };
}

// ============================================
// API Response types
// ============================================

export interface ChartCalculationRequest {
  birthDate: string; // ISO date string
  birthTime: string; // HH:mm
  latitude: number;
  longitude: number;
  timezone: string;
  houseSystem?: HouseSystem;
}

export interface ChartCalculationResponse {
  success: boolean;
  chart?: NatalChart;
  error?: string;
}
