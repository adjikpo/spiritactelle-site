/**
 * Service des phases lunaires
 * Combinaison de calculs locaux et API Farmsense
 */

import { MoonPhase, MoonPhaseName, UpcomingMoonPhase } from './types';
import { MOON_PHASES } from './constants';

const FARMSENSE_URL = 'https://api.farmsense.net/v1/moonphases/';

/**
 * Calcule la phase lunaire actuelle basée sur les calculs astronomiques
 * Utilise l'algorithme de Conway pour une approximation précise
 */
export function calculateMoonPhase(date: Date = new Date()): MoonPhase {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Calcul du cycle lunaire (29.53 jours)
  const LUNAR_CYCLE = 29.53058867;

  // Date de référence: Nouvelle Lune connue (6 janvier 2000)
  const referenceNewMoon = new Date(2000, 0, 6, 18, 14, 0);

  // Calcul du nombre de jours depuis la référence
  const daysSinceRef = (date.getTime() - referenceNewMoon.getTime()) / (1000 * 60 * 60 * 24);

  // Position dans le cycle lunaire actuel (0-29.53)
  const moonAge = daysSinceRef % LUNAR_CYCLE;

  // Pourcentage d'illumination (approximatif)
  const illumination = Math.round((1 - Math.cos((moonAge / LUNAR_CYCLE) * 2 * Math.PI)) / 2 * 100);

  // Détermination de la phase
  let phaseName: MoonPhaseName;

  if (moonAge < 1.85) {
    phaseName = 'New Moon';
  } else if (moonAge < 7.38) {
    phaseName = 'Waxing Crescent';
  } else if (moonAge < 9.23) {
    phaseName = 'First Quarter';
  } else if (moonAge < 14.77) {
    phaseName = 'Waxing Gibbous';
  } else if (moonAge < 16.61) {
    phaseName = 'Full Moon';
  } else if (moonAge < 22.15) {
    phaseName = 'Waning Gibbous';
  } else if (moonAge < 23.99) {
    phaseName = 'Last Quarter';
  } else if (moonAge < 29.53) {
    phaseName = 'Waning Crescent';
  } else {
    phaseName = 'New Moon';
  }

  const phaseInfo = MOON_PHASES[phaseName];

  return {
    ...phaseInfo,
    illumination,
    age: Math.round(moonAge * 10) / 10,
  };
}

/**
 * Récupère la phase lunaire depuis l'API Farmsense
 */
export async function fetchMoonPhase(date: Date = new Date()): Promise<MoonPhase> {
  try {
    const timestamp = Math.floor(date.getTime() / 1000);
    const response = await fetch(`${FARMSENSE_URL}?d=${timestamp}`, {
      next: { revalidate: 43200 }, // Cache 12 heures
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data[0] && !data[0].Error) {
      const phaseName = mapFarmsensePhase(data[0].Phase);
      const phaseInfo = MOON_PHASES[phaseName];
      const illumination = parseFloat(data[0].Illumination?.replace('%', '') || '0');

      return {
        ...phaseInfo,
        illumination: Math.round(illumination),
        age: parseFloat(data[0].Age || '0'),
      };
    }

    throw new Error('Invalid response format');
  } catch (error) {
    console.error('Error fetching moon phase from API:', error);
    // Fallback vers le calcul local
    return calculateMoonPhase(date);
  }
}

/**
 * Convertit le nom de phase Farmsense vers notre format
 */
function mapFarmsensePhase(phase: string): MoonPhaseName {
  const mapping: Record<string, MoonPhaseName> = {
    'New Moon': 'New Moon',
    'Waxing Crescent': 'Waxing Crescent',
    'First Quarter': 'First Quarter',
    'Waxing Gibbous': 'Waxing Gibbous',
    'Full Moon': 'Full Moon',
    'Waning Gibbous': 'Waning Gibbous',
    'Third Quarter': 'Last Quarter',
    'Last Quarter': 'Last Quarter',
    'Waning Crescent': 'Waning Crescent',
  };

  return mapping[phase] || 'New Moon';
}

/**
 * Génère le calendrier lunaire pour un mois donné
 */
export function getMoonCalendar(year: number, month: number): MoonPhase[] {
  const daysInMonth = new Date(year, month, 0).getDate();
  const calendar: MoonPhase[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day);
    calendar.push(calculateMoonPhase(date));
  }

  return calendar;
}

/**
 * Trouve la prochaine occurrence d'une phase lunaire spécifique
 */
export function getNextPhase(targetPhase: MoonPhaseName, fromDate: Date = new Date()): Date {
  let currentDate = new Date(fromDate);
  const maxDays = 32; // Maximum 1 mois de recherche

  for (let i = 0; i < maxDays; i++) {
    currentDate.setDate(currentDate.getDate() + 1);
    const phase = calculateMoonPhase(currentDate);

    if (phase.phase === targetPhase) {
      return currentDate;
    }
  }

  return currentDate;
}

/**
 * Obtient les dates des prochaines phases principales
 */
export function getUpcomingPhases(count: number = 4, fromDate: Date = new Date()): UpcomingMoonPhase[] {
  const mainPhases: MoonPhaseName[] = ['New Moon', 'First Quarter', 'Full Moon', 'Last Quarter'];
  const upcomingPhases: UpcomingMoonPhase[] = [];

  for (const phase of mainPhases) {
    const phaseInfo = MOON_PHASES[phase];
    upcomingPhases.push({
      phase,
      phaseFr: phaseInfo.phaseFr,
      emoji: phaseInfo.emoji,
      date: getNextPhase(phase, fromDate),
    });
  }

  // Trier par date et limiter au nombre demandé
  upcomingPhases.sort((a, b) => a.date.getTime() - b.date.getTime());

  return upcomingPhases.slice(0, count);
}

/**
 * Obtient le message spirituel pour la phase actuelle
 */
export function getMoonGuidance(phase: MoonPhase): string {
  const guidances: Record<MoonPhaseName, string> = {
    'New Moon': "C'est le moment idéal pour poser vos intentions et commencer de nouveaux projets. Méditez sur ce que vous souhaitez manifester.",
    'Waxing Crescent': "L'énergie croît. Prenez des mesures concrètes vers vos objectifs. C'est le temps de l'action et de la croissance.",
    'First Quarter': "Des défis peuvent surgir. Restez déterminé et ajustez votre cap si nécessaire. La persévérance est votre alliée.",
    'Waxing Gibbous': "Affinez vos plans et préparez-vous à la plénitude. C'est le moment de perfectionner vos projets.",
    'Full Moon': "L'énergie est à son maximum. Célébrez vos accomplissements et libérez ce qui ne vous sert plus. Excellent pour les rituels.",
    'Waning Gibbous': "Temps de gratitude et de partage. Transmettez ce que vous avez appris et donnez en retour.",
    'Last Quarter': "C'est le moment de lâcher prise et de pardonner. Libérez les attachements qui vous retiennent.",
    'Waning Crescent': "Reposez-vous et préparez-vous au nouveau cycle. C'est un temps de réflexion et de régénération.",
  };

  return guidances[phase.phase];
}
