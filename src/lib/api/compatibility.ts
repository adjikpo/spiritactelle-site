/**
 * Service de compatibilité astrologique
 */

import { ZodiacSignKey, Compatibility, CompatibilityLevel } from './types';
import { ZODIAC_SIGNS, COMPATIBILITY_MATRIX } from './constants';

/**
 * Calcule la compatibilité entre deux signes
 */
export function calculateCompatibility(sign1: ZodiacSignKey, sign2: ZodiacSignKey): Compatibility {
  const score = COMPATIBILITY_MATRIX[sign1][sign2];
  const level = getCompatibilityLevel(score);
  const sign1Info = ZODIAC_SIGNS[sign1];
  const sign2Info = ZODIAC_SIGNS[sign2];

  const { description, descriptionFr } = getCompatibilityDescription(sign1, sign2, score);
  const { strengths, strengthsFr } = getCompatibilityStrengths(sign1, sign2, score);
  const { challenges, challengesFr } = getCompatibilityChallenges(sign1, sign2, score);

  return {
    sign1,
    sign2,
    level,
    score,
    description,
    descriptionFr,
    strengths,
    strengthsFr,
    challenges,
    challengesFr,
  };
}

/**
 * Détermine le niveau de compatibilité
 */
function getCompatibilityLevel(score: number): CompatibilityLevel {
  if (score >= 85) return 'excellent';
  if (score >= 70) return 'good';
  if (score >= 50) return 'moderate';
  return 'challenging';
}

/**
 * Génère une description de la compatibilité
 */
function getCompatibilityDescription(
  sign1: ZodiacSignKey,
  sign2: ZodiacSignKey,
  score: number
): { description: string; descriptionFr: string } {
  const sign1Info = ZODIAC_SIGNS[sign1];
  const sign2Info = ZODIAC_SIGNS[sign2];
  const element1 = sign1Info.element;
  const element2 = sign2Info.element;

  // Même élément
  if (element1 === element2) {
    const elementFr = sign1Info.elementFr;
    return {
      description: `Two ${element1} signs create a natural understanding and shared energy.`,
      descriptionFr: `Deux signes de ${elementFr} créent une compréhension naturelle et une énergie partagée. Vous vous comprenez intuitivement.`,
    };
  }

  // Éléments compatibles
  const compatiblePairs = [
    ['fire', 'air'],
    ['earth', 'water'],
  ];

  const isCompatiblePair = compatiblePairs.some(
    (pair) =>
      (pair[0] === element1 && pair[1] === element2) ||
      (pair[1] === element1 && pair[0] === element2)
  );

  if (isCompatiblePair) {
    return {
      description: `${sign1Info.elementFr} and ${sign2Info.elementFr} complement each other beautifully.`,
      descriptionFr: `${sign1Info.elementFr} et ${sign2Info.elementFr} se complètent harmonieusement. Vos énergies s'équilibrent mutuellement.`,
    };
  }

  // Éléments en tension
  if (score >= 50) {
    return {
      description: `Different elements create both attraction and tension.`,
      descriptionFr: `Vos éléments différents créent à la fois une attraction et une tension créative. L'équilibre demande des efforts.`,
    };
  }

  return {
    description: `Challenging combination that requires understanding and patience.`,
    descriptionFr: `Une combinaison exigeante qui demande compréhension et patience. Les différences peuvent devenir des forces.`,
  };
}

/**
 * Génère les points forts de la compatibilité
 */
function getCompatibilityStrengths(
  sign1: ZodiacSignKey,
  sign2: ZodiacSignKey,
  score: number
): { strengths: string[]; strengthsFr: string[] } {
  const sign1Info = ZODIAC_SIGNS[sign1];
  const sign2Info = ZODIAC_SIGNS[sign2];

  const strengthsMap: Record<string, { en: string; fr: string }[]> = {
    excellent: [
      { en: 'Deep emotional connection', fr: 'Connexion émotionnelle profonde' },
      { en: 'Natural understanding', fr: 'Compréhension naturelle' },
      { en: 'Shared values and goals', fr: 'Valeurs et objectifs partagés' },
      { en: 'Effortless communication', fr: 'Communication fluide' },
    ],
    good: [
      { en: 'Good communication', fr: 'Bonne communication' },
      { en: 'Mutual respect', fr: 'Respect mutuel' },
      { en: 'Complementary strengths', fr: 'Forces complémentaires' },
    ],
    moderate: [
      { en: 'Learning opportunities', fr: 'Opportunités d\'apprentissage' },
      { en: 'Growth through differences', fr: 'Croissance par les différences' },
    ],
    challenging: [
      { en: 'Potential for transformation', fr: 'Potentiel de transformation' },
      { en: 'Lessons in patience', fr: 'Leçons de patience' },
    ],
  };

  const level = getCompatibilityLevel(score);
  const baseStrengths = strengthsMap[level];

  return {
    strengths: baseStrengths.map((s) => s.en),
    strengthsFr: baseStrengths.map((s) => s.fr),
  };
}

/**
 * Génère les défis de la compatibilité
 */
function getCompatibilityChallenges(
  sign1: ZodiacSignKey,
  sign2: ZodiacSignKey,
  score: number
): { challenges: string[]; challengesFr: string[] } {
  const challengesMap: Record<string, { en: string; fr: string }[]> = {
    excellent: [
      { en: 'Risk of codependency', fr: 'Risque de codépendance' },
      { en: 'Need for individual space', fr: 'Besoin d\'espace individuel' },
    ],
    good: [
      { en: 'Different communication styles', fr: 'Styles de communication différents' },
      { en: 'Occasional misunderstandings', fr: 'Malentendus occasionnels' },
    ],
    moderate: [
      { en: 'Conflicting priorities', fr: 'Priorités divergentes' },
      { en: 'Different emotional needs', fr: 'Besoins émotionnels différents' },
      { en: 'Requires compromise', fr: 'Nécessite des compromis' },
    ],
    challenging: [
      { en: 'Fundamental differences', fr: 'Différences fondamentales' },
      { en: 'Communication barriers', fr: 'Barrières de communication' },
      { en: 'Conflicting values', fr: 'Valeurs conflictuelles' },
      { en: 'Requires significant effort', fr: 'Demande des efforts significatifs' },
    ],
  };

  const level = getCompatibilityLevel(score);
  const baseChallenges = challengesMap[level];

  return {
    challenges: baseChallenges.map((c) => c.en),
    challengesFr: baseChallenges.map((c) => c.fr),
  };
}

/**
 * Obtient les signes les plus compatibles avec un signe donné
 */
export function getMostCompatible(sign: ZodiacSignKey, count: number = 3): ZodiacSignKey[] {
  const scores = COMPATIBILITY_MATRIX[sign];
  const sorted = (Object.entries(scores) as [ZodiacSignKey, number][])
    .filter(([s]) => s !== sign)
    .sort((a, b) => b[1] - a[1]);

  return sorted.slice(0, count).map(([s]) => s);
}

/**
 * Obtient les signes les moins compatibles avec un signe donné
 */
export function getLeastCompatible(sign: ZodiacSignKey, count: number = 3): ZodiacSignKey[] {
  const scores = COMPATIBILITY_MATRIX[sign];
  const sorted = (Object.entries(scores) as [ZodiacSignKey, number][])
    .filter(([s]) => s !== sign)
    .sort((a, b) => a[1] - b[1]);

  return sorted.slice(0, count).map(([s]) => s);
}

/**
 * Obtient le message de conseil pour une compatibilité
 */
export function getCompatibilityAdvice(level: CompatibilityLevel): string {
  const advices: Record<CompatibilityLevel, string> = {
    excellent: 'Vous êtes faits l\'un pour l\'autre ! Cultivez cette connexion naturelle tout en préservant votre individualité.',
    good: 'Belle harmonie en vue ! Communiquez ouvertement et appréciez vos différences complémentaires.',
    moderate: 'Relation enrichissante si vous faites l\'effort de vous comprendre. La patience sera votre meilleure alliée.',
    challenging: 'Défi stimulant ! Cette relation peut vous transformer profondément si vous êtes prêts à évoluer ensemble.',
  };

  return advices[level];
}
