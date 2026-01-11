// Service pour l'API Horoscope externe
// API: https://horoscope-api.herokuapp.com

export type HoroscopePeriod = 'today' | 'week' | 'month' | 'year';

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

export interface HoroscopeResponse {
  horoscope: string;
  sign: string;
  period: HoroscopePeriod;
}

export interface HoroscopeError {
  error: string;
  message: string;
}

const API_BASE_URL = 'https://horoscope-api.herokuapp.com';

// Mapping des périodes en français
export const PERIOD_LABELS: Record<HoroscopePeriod, { label: string; labelFr: string }> = {
  today: { label: 'Daily', labelFr: 'Quotidien' },
  week: { label: 'Weekly', labelFr: 'Hebdomadaire' },
  month: { label: 'Monthly', labelFr: 'Mensuel' },
  year: { label: 'Yearly', labelFr: 'Annuel' },
};

// Mapping des signes en français
export const SIGN_NAMES_FR: Record<ZodiacSignKey, string> = {
  aries: 'Bélier',
  taurus: 'Taureau',
  gemini: 'Gémeaux',
  cancer: 'Cancer',
  leo: 'Lion',
  virgo: 'Vierge',
  libra: 'Balance',
  scorpio: 'Scorpion',
  sagittarius: 'Sagittaire',
  capricorn: 'Capricorne',
  aquarius: 'Verseau',
  pisces: 'Poissons',
};

/**
 * Récupère l'horoscope pour un signe et une période donnée
 */
export async function getHoroscope(
  sign: ZodiacSignKey,
  period: HoroscopePeriod
): Promise<HoroscopeResponse> {
  const endpoint = `/horoscope/${period}/${sign}`;

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: period === 'today' ? 3600 : period === 'week' ? 86400 : 604800, // Cache: 1h, 1j, 1 semaine
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    return {
      horoscope: data.horoscope || data.data || data.description || 'Horoscope non disponible.',
      sign: sign,
      period: period,
    };
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'horoscope:', error);

    // Retourner un horoscope par défaut en cas d'erreur
    return {
      horoscope: getDefaultHoroscope(sign, period),
      sign: sign,
      period: period,
    };
  }
}

/**
 * Récupère tous les horoscopes pour un signe (toutes les périodes)
 */
export async function getAllHoroscopesForSign(sign: ZodiacSignKey): Promise<Record<HoroscopePeriod, HoroscopeResponse>> {
  const periods: HoroscopePeriod[] = ['today', 'week', 'month', 'year'];

  const results = await Promise.all(
    periods.map((period) => getHoroscope(sign, period))
  );

  return {
    today: results[0],
    week: results[1],
    month: results[2],
    year: results[3],
  };
}

/**
 * Horoscope par défaut si l'API est indisponible
 */
function getDefaultHoroscope(sign: ZodiacSignKey, period: HoroscopePeriod): string {
  const signFr = SIGN_NAMES_FR[sign];
  const periodFr = PERIOD_LABELS[period].labelFr.toLowerCase();

  const defaults: Record<HoroscopePeriod, string> = {
    today: `Cher ${signFr}, aujourd'hui les astres vous invitent à la réflexion et à l'introspection. C'est le moment idéal pour écouter votre intuition et suivre votre cœur. Les énergies cosmiques favorisent les nouvelles rencontres et les opportunités inattendues.`,
    week: `Cette semaine, ${signFr}, vous ressentirez une énergie particulière qui vous poussera vers de nouveaux horizons. Les planètes s'alignent pour favoriser vos projets personnels et professionnels. Restez ouvert aux opportunités qui se présentent.`,
    month: `Ce mois-ci est placé sous le signe du renouveau pour vous, cher ${signFr}. Les influences astrales encouragent la transformation positive et l'évolution personnelle. C'est le moment de concrétiser vos rêves et d'avancer vers vos objectifs.`,
    year: `L'année qui s'annonce pour le ${signFr} sera marquée par des changements significatifs et des opportunités de croissance. Les astres favorisent l'accomplissement de vos ambitions à long terme. Faites confiance au processus et restez fidèle à vos valeurs.`,
  };

  return defaults[period];
}

/**
 * Vérifie si un slug correspond à un signe valide
 */
export function isValidZodiacSign(slug: string): slug is ZodiacSignKey {
  return Object.keys(SIGN_NAMES_FR).includes(slug);
}
