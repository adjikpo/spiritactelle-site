/**
 * Service d'horoscope - Aztro API
 * https://aztro.sameerkumar.website/
 */

import { HoroscopeData, ZodiacSignKey, HoroscopePeriod } from './types';
import { ZODIAC_SIGNS } from './constants';

const AZTRO_BASE_URL = 'https://aztro.sameerkumar.website/';

// Horoscopes de fallback en français
const FALLBACK_HOROSCOPES: Record<ZodiacSignKey, string> = {
  aries: "Aujourd'hui, votre énergie est à son maximum. C'est le moment idéal pour prendre des initiatives et montrer votre leadership. Une opportunité inattendue pourrait se présenter.",
  taurus: "La stabilité est votre force aujourd'hui. Concentrez-vous sur vos projets à long terme. Les finances pourraient vous apporter une bonne surprise.",
  gemini: "Votre curiosité vous mène vers de nouvelles découvertes. Les communications sont favorisées. Un message important pourrait arriver.",
  cancer: "Écoutez votre intuition aujourd'hui. Les liens familiaux sont mis en avant. Prenez soin de votre bien-être émotionnel.",
  leo: "Votre charisme rayonne ! C'est une excellente journée pour les projets créatifs et les rencontres. Laissez briller votre lumière intérieure.",
  virgo: "Votre sens du détail est précieux aujourd'hui. Organisez et planifiez pour l'avenir. Un problème trouve sa solution.",
  libra: "L'harmonie est au rendez-vous. Les relations sont favorisées. Recherchez l'équilibre dans toutes vos actions.",
  scorpio: "Votre intuition est particulièrement aiguisée. Des révélations importantes sont possibles. Faites confiance à votre instinct.",
  sagittarius: "L'aventure vous appelle ! Élargissez vos horizons, que ce soit par les voyages ou l'apprentissage. L'optimisme est votre allié.",
  capricorn: "Votre détermination porte ses fruits. Les efforts passés sont récompensés. Restez focalisé sur vos objectifs.",
  aquarius: "Votre originalité est votre force. De nouvelles idées émergent. Les amitiés sont sources de joie aujourd'hui.",
  pisces: "Votre sensibilité artistique est amplifiée. Laissez libre cours à votre créativité. Les rêves peuvent apporter des messages.",
};

/**
 * Récupère l'horoscope quotidien depuis l'API Aztro
 */
export async function fetchHoroscope(
  sign: ZodiacSignKey,
  day: HoroscopePeriod = 'today'
): Promise<HoroscopeData> {
  const signInfo = ZODIAC_SIGNS[sign];

  try {
    const response = await fetch(`${AZTRO_BASE_URL}?sign=${sign}&day=${day}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      sign,
      date: data.current_date || new Date().toLocaleDateString('fr-FR'),
      dateRange: signInfo.dateRangeFr,
      description: data.description || FALLBACK_HOROSCOPES[sign],
      compatibility: data.compatibility || '',
      mood: data.mood || '',
      color: data.color || signInfo.colorFr,
      luckyNumber: data.lucky_number || String(Math.floor(Math.random() * 99) + 1),
      luckyTime: data.lucky_time || '',
    };
  } catch (error) {
    console.error('Error fetching horoscope:', error);
    // Retourner un horoscope de fallback
    return {
      sign,
      date: new Date().toLocaleDateString('fr-FR'),
      dateRange: signInfo.dateRangeFr,
      description: FALLBACK_HOROSCOPES[sign],
      compatibility: getRandomCompatibility(sign),
      mood: getRandomMood(),
      color: signInfo.colorFr,
      luckyNumber: String(Math.floor(Math.random() * 99) + 1),
      luckyTime: getRandomLuckyTime(),
    };
  }
}

/**
 * Récupère les horoscopes pour tous les signes
 */
export async function fetchAllHoroscopes(
  day: HoroscopePeriod = 'today'
): Promise<Record<ZodiacSignKey, HoroscopeData>> {
  const signs: ZodiacSignKey[] = [
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
    'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
  ];

  const horoscopes: Partial<Record<ZodiacSignKey, HoroscopeData>> = {};

  // Fetch en parallèle mais avec un délai pour éviter le rate limiting
  const results = await Promise.allSettled(
    signs.map((sign, index) =>
      new Promise<HoroscopeData>((resolve) => {
        setTimeout(async () => {
          const horoscope = await fetchHoroscope(sign, day);
          resolve(horoscope);
        }, index * 100); // 100ms entre chaque requête
      })
    )
  );

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      horoscopes[signs[index]] = result.value;
    }
  });

  return horoscopes as Record<ZodiacSignKey, HoroscopeData>;
}

/**
 * Génère un signe compatible aléatoire
 */
function getRandomCompatibility(sign: ZodiacSignKey): string {
  const compatibilities: Record<string, ZodiacSignKey[]> = {
    fire: ['aries', 'leo', 'sagittarius'],
    earth: ['taurus', 'virgo', 'capricorn'],
    air: ['gemini', 'libra', 'aquarius'],
    water: ['cancer', 'scorpio', 'pisces'],
  };

  const signElement = ZODIAC_SIGNS[sign].element;
  const compatible = compatibilities[signElement];
  const randomSign = compatible[Math.floor(Math.random() * compatible.length)];

  return ZODIAC_SIGNS[randomSign].nameFr;
}

/**
 * Génère une humeur aléatoire
 */
function getRandomMood(): string {
  const moods = [
    'Optimiste', 'Serein', 'Énergique', 'Réfléchi', 'Créatif',
    'Passionné', 'Calme', 'Inspiré', 'Déterminé', 'Joyeux'
  ];
  return moods[Math.floor(Math.random() * moods.length)];
}

/**
 * Génère une heure chanceuse aléatoire
 */
function getRandomLuckyTime(): string {
  const hour = Math.floor(Math.random() * 12) + 1;
  const period = Math.random() > 0.5 ? 'h' : 'h30';
  return `${hour}${period}`;
}

/**
 * Détermine le signe zodiacal à partir d'une date de naissance
 */
export function getZodiacSign(birthDate: Date): ZodiacSignKey {
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'aquarius';
  return 'pisces';
}
