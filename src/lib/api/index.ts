/**
 * Module API - Exports centralisés
 */

// Types
export * from './types';

// Constantes
export * from './constants';

// Services
export {
  fetchHoroscope,
  fetchAllHoroscopes,
  getZodiacSign,
} from './horoscope';

export {
  fetchRandomQuote,
  fetchQuoteOfTheDay,
  fetchMultipleQuotes,
  fetchAffirmation,
  fetchAdvice,
  searchAdvice,
  QUOTE_CATEGORIES,
  CATEGORIZED_QUOTES,
} from './quotes';

export {
  calculateMoonPhase,
  fetchMoonPhase,
  getMoonCalendar,
  getNextPhase,
  getUpcomingPhases,
  getMoonGuidance,
} from './moon';

export {
  calculateCompatibility,
  getMostCompatible,
  getLeastCompatible,
  getCompatibilityAdvice,
} from './compatibility';

export {
  calculateLifePath,
  calculateExpressionNumber,
  calculateSoulNumber,
  calculatePersonalityNumber,
  calculatePersonalYear,
  getFullNumerologyProfile,
  PERSONAL_YEAR_MEANINGS,
} from './numerology';
