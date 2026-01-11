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

export {
  ARTICLES,
  ARTICLE_CATEGORIES,
  getArticleBySlug,
  getArticlesByCategory,
  getFeaturedArticles,
  getRecentArticles,
} from './blog';

export {
  CHINESE_ZODIAC,
  CHINESE_ELEMENTS,
  EGYPTIAN_ZODIAC,
  getChineseZodiacSign,
  getChineseElement,
  getEgyptianZodiacSign,
  getChineseZodiacById,
  getEgyptianZodiacById,
} from './mythologies';

export {
  TESTIMONIALS,
  TESTIMONIAL_SERVICES,
  getFeaturedTestimonials,
  getRecentTestimonials,
  getTestimonialsByService,
  getAverageRating,
  getTotalTestimonials,
} from './livre-dor';

export {
  getHoroscope,
  getAllHoroscopesForSign,
  isValidZodiacSign,
  PERIOD_LABELS,
  SIGN_NAMES_FR,
} from './horoscope-api';
export type { HoroscopePeriod, ZodiacSignKey, HoroscopeResponse } from './horoscope-api';
