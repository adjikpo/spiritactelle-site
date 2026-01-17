/**
 * Astrobien - Moteur Astrologique
 *
 * Module principal exportant toutes les fonctionnalités astrologiques
 */

// Types
export * from './types';

// Constantes
export {
  ZODIAC_SIGNS,
  PLANETS,
  ASPECTS,
  ASTRONOMICAL_CONSTANTS,
  getSignInfo,
  getPlanetInfo,
  getAspectInfo,
  getSignFromDegree,
  getDegreeInSign,
  formatDegree,
} from './constants';

// Calculs
export {
  dateToJulianDay,
  julianDayToDate,
  julianCentury,
  greenwichSiderealTime,
  localSiderealTime,
  obliquityOfEcliptic,
  eclipticToEquatorial,
} from './calculations/julian';

export { calculatePlanetPositions } from './calculations/planets';

export {
  calculateHouses,
  calculateAscendant,
  calculateMidheaven,
  getHouseCuspsArray,
} from './calculations/houses';

export {
  calculateAspects,
  filterAspectsByType,
  filterAspectsByPlanet,
  calculateAspectScore,
  categorizeAspects,
  describeAspect,
} from './calculations/aspects';

// Génération de thème
export {
  generateNatalChart,
  getPlanetPosition,
  getSunSign,
  getMoonSign,
  getAscendantSign,
  calculateDominants,
  generateChartSummary,
} from './chart';

// Interprétations
export {
  interpretSunSign,
  interpretMoonSign,
  interpretAscendant,
  interpretSunHouse,
  interpretMoonHouse,
  generateFullInterpretation,
} from './interpretations';

// Villes et géolocalisation
export {
  searchCities,
  searchCitiesLocal,
  searchCitiesGeoNames,
  getCityByName,
  estimateTimezone,
} from './cities';
