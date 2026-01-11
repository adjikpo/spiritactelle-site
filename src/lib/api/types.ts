/**
 * Types pour les APIs externes
 */

// ============================================
// Horoscope Types
// ============================================

export type ZodiacSignKey =
  | 'aries'
  | 'taurus'
  | 'gemini'
  | 'cancer'
  | 'leo'
  | 'virgo'
  | 'libra'
  | 'scorpio'
  | 'sagittarius'
  | 'capricorn'
  | 'aquarius'
  | 'pisces';

export type HoroscopePeriod = 'today' | 'tomorrow' | 'yesterday' | 'week' | 'month';

export interface HoroscopeData {
  sign: ZodiacSignKey;
  date: string;
  dateRange: string;
  description: string;
  compatibility: string;
  mood: string;
  color: string;
  luckyNumber: string;
  luckyTime: string;
}

export interface ZodiacSignInfo {
  key: ZodiacSignKey;
  name: string;
  nameFr: string;
  symbol: string;
  emoji: string;
  element: 'fire' | 'earth' | 'air' | 'water';
  elementFr: string;
  modality: 'cardinal' | 'fixed' | 'mutable';
  modalityFr: string;
  ruler: string;
  rulerFr: string;
  dateRange: string;
  dateRangeFr: string;
  traits: string[];
  traitsFr: string[];
  description: string;
  descriptionFr: string;
  color: string;
  colorFr: string;
}

// ============================================
// Citations & Bien-être Types
// ============================================

export interface Quote {
  text: string;
  author: string;
  category?: string;
}

export interface Affirmation {
  text: string;
  category?: string;
}

export interface Advice {
  id: number;
  text: string;
}

// ============================================
// Phases Lunaires Types
// ============================================

export type MoonPhaseName =
  | 'New Moon'
  | 'Waxing Crescent'
  | 'First Quarter'
  | 'Waxing Gibbous'
  | 'Full Moon'
  | 'Waning Gibbous'
  | 'Last Quarter'
  | 'Waning Crescent';

export interface MoonPhase {
  phase: MoonPhaseName;
  phaseFr: string;
  illumination: number;
  age: number;
  emoji: string;
  description: string;
  descriptionFr: string;
  rituals: string[];
  ritualsFr: string[];
  date?: Date;
}

export interface UpcomingMoonPhase {
  phase: MoonPhaseName;
  phaseFr: string;
  emoji: string;
  date: Date;
}

// ============================================
// Numérologie Types
// ============================================

export interface NumerologyProfile {
  lifePathNumber: number;
  lifePathName: string;
  lifePathNameFr: string;
  description: string;
  descriptionFr: string;
  strengths: string[];
  strengthsFr: string[];
  challenges: string[];
  challengesFr: string[];
  compatibleNumbers: number[];
}

export interface FullNumerologyProfile {
  lifePath: NumerologyProfile;
  expression: number;
  soul: number;
  personality: number;
  personalYear: number;
  personalYearMeaning: { title: string; description: string };
}

// ============================================
// Wellness Combined Types
// ============================================

export interface DailyWellness {
  horoscope: HoroscopeData | null;
  quote: Quote | null;
  affirmation: Affirmation | null;
  moonPhase: MoonPhase | null;
  date: string;
}

// ============================================
// Compatibilité Types
// ============================================

export type CompatibilityLevel = 'excellent' | 'good' | 'moderate' | 'challenging';

export interface Compatibility {
  sign1: ZodiacSignKey;
  sign2: ZodiacSignKey;
  level: CompatibilityLevel;
  score: number;
  description: string;
  descriptionFr: string;
  strengths: string[];
  strengthsFr: string[];
  challenges: string[];
  challengesFr: string[];
}
