/**
 * Service de numérologie
 * Calculs du chemin de vie et autres nombres significatifs
 */

import { NumerologyProfile } from './types';
import { LIFE_PATH_NUMBERS } from './constants';

/**
 * Calcule le chemin de vie à partir de la date de naissance
 */
export function calculateLifePath(birthDate: Date): NumerologyProfile {
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1;
  const year = birthDate.getFullYear();

  // Réduire chaque composant
  const dayReduced = reduceNumber(day);
  const monthReduced = reduceNumber(month);
  const yearReduced = reduceNumber(year);

  // Calculer la somme totale
  const total = dayReduced + monthReduced + yearReduced;

  // Réduire le total en préservant les nombres maîtres
  const lifePathNumber = reduceMasterNumber(total);

  const profile = LIFE_PATH_NUMBERS[lifePathNumber] || LIFE_PATH_NUMBERS[reduceNumber(lifePathNumber)];

  return {
    lifePathNumber,
    ...profile,
  };
}

/**
 * Réduit un nombre à un chiffre (1-9)
 */
function reduceNumber(num: number): number {
  while (num > 9) {
    num = String(num)
      .split('')
      .reduce((sum, digit) => sum + parseInt(digit, 10), 0);
  }
  return num;
}

/**
 * Réduit un nombre en préservant les nombres maîtres (11, 22, 33)
 */
function reduceMasterNumber(num: number): number {
  // Les nombres maîtres
  const masterNumbers = [11, 22, 33];

  if (masterNumbers.includes(num)) {
    return num;
  }

  while (num > 9 && !masterNumbers.includes(num)) {
    num = String(num)
      .split('')
      .reduce((sum, digit) => sum + parseInt(digit, 10), 0);

    if (masterNumbers.includes(num)) {
      return num;
    }
  }

  return num;
}

/**
 * Calcule le nombre d'expression à partir du nom complet
 */
export function calculateExpressionNumber(fullName: string): number {
  const letterValues: Record<string, number> = {
    a: 1, j: 1, s: 1,
    b: 2, k: 2, t: 2,
    c: 3, l: 3, u: 3,
    d: 4, m: 4, v: 4,
    e: 5, n: 5, w: 5,
    f: 6, o: 6, x: 6,
    g: 7, p: 7, y: 7,
    h: 8, q: 8, z: 8,
    i: 9, r: 9,
  };

  const normalizedName = fullName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z]/g, '');

  const total = normalizedName
    .split('')
    .reduce((sum, letter) => sum + (letterValues[letter] || 0), 0);

  return reduceMasterNumber(total);
}

/**
 * Calcule le nombre de l'âme (voyelles du nom)
 */
export function calculateSoulNumber(fullName: string): number {
  const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
  const letterValues: Record<string, number> = {
    a: 1, e: 5, i: 9, o: 6, u: 3, y: 7,
  };

  const normalizedName = fullName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z]/g, '');

  const total = normalizedName
    .split('')
    .filter((letter) => vowels.includes(letter))
    .reduce((sum, letter) => sum + (letterValues[letter] || 0), 0);

  return reduceMasterNumber(total);
}

/**
 * Calcule le nombre de personnalité (consonnes du nom)
 */
export function calculatePersonalityNumber(fullName: string): number {
  const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
  const letterValues: Record<string, number> = {
    b: 2, c: 3, d: 4, f: 6, g: 7, h: 8, j: 1, k: 2, l: 3,
    m: 4, n: 5, p: 7, q: 8, r: 9, s: 1, t: 2, v: 4, w: 5,
    x: 6, z: 8,
  };

  const normalizedName = fullName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z]/g, '');

  const total = normalizedName
    .split('')
    .filter((letter) => !vowels.includes(letter))
    .reduce((sum, letter) => sum + (letterValues[letter] || 0), 0);

  return reduceMasterNumber(total);
}

/**
 * Calcule l'année personnelle
 */
export function calculatePersonalYear(birthDate: Date, currentYear: number = new Date().getFullYear()): number {
  const birthDay = birthDate.getDate();
  const birthMonth = birthDate.getMonth() + 1;

  const dayReduced = reduceNumber(birthDay);
  const monthReduced = reduceNumber(birthMonth);
  const yearReduced = reduceNumber(currentYear);

  const total = dayReduced + monthReduced + yearReduced;

  return reduceNumber(total);
}

/**
 * Descriptions des années personnelles
 */
export const PERSONAL_YEAR_MEANINGS: Record<number, { title: string; description: string }> = {
  1: {
    title: 'Nouveaux Départs',
    description: 'Une année de nouveaux commencements, d\'initiatives et d\'indépendance. C\'est le moment de planter les graines de vos futurs projets.',
  },
  2: {
    title: 'Coopération',
    description: 'Une année de patience, de diplomatie et de partenariats. Cultivez vos relations et restez réceptif aux autres.',
  },
  3: {
    title: 'Expression Créative',
    description: 'Une année d\'expression personnelle, de créativité et de joie. Laissez libre cours à votre imagination.',
  },
  4: {
    title: 'Construction',
    description: 'Une année de travail, d\'organisation et de fondations solides. Construisez patiemment votre avenir.',
  },
  5: {
    title: 'Changement',
    description: 'Une année de liberté, de voyages et de transformations. Accueillez les changements avec enthousiasme.',
  },
  6: {
    title: 'Responsabilité',
    description: 'Une année centrée sur la famille, le foyer et les responsabilités. Prenez soin de vos proches.',
  },
  7: {
    title: 'Introspection',
    description: 'Une année de réflexion, d\'analyse et de croissance spirituelle. Tournez-vous vers l\'intérieur.',
  },
  8: {
    title: 'Accomplissement',
    description: 'Une année de réussite matérielle, de pouvoir et d\'abondance. Récoltez les fruits de vos efforts.',
  },
  9: {
    title: 'Achèvement',
    description: 'Une année de fin de cycle, de lâcher-prise et de préparation au renouveau. Terminez ce qui doit l\'être.',
  },
};

/**
 * Obtient une interprétation complète du profil numérologique
 */
export function getFullNumerologyProfile(
  birthDate: Date,
  fullName: string
): {
  lifePath: NumerologyProfile;
  expression: number;
  soul: number;
  personality: number;
  personalYear: number;
  personalYearMeaning: { title: string; description: string };
} {
  const lifePath = calculateLifePath(birthDate);
  const expression = calculateExpressionNumber(fullName);
  const soul = calculateSoulNumber(fullName);
  const personality = calculatePersonalityNumber(fullName);
  const personalYear = calculatePersonalYear(birthDate);
  const personalYearMeaning = PERSONAL_YEAR_MEANINGS[personalYear];

  return {
    lifePath,
    expression,
    soul,
    personality,
    personalYear,
    personalYearMeaning,
  };
}
