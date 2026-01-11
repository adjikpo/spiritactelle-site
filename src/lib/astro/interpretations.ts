/**
 * Interprétations astrologiques automatisées
 * Textes pour les planètes en signes et en maisons
 */

import { Planet, ZodiacSign, NatalChart } from './types';
import { getSignInfo, getPlanetInfo } from './constants';

// ============================================
// Planètes en signes - Interprétations courtes
// ============================================

const SUN_IN_SIGNS: Record<ZodiacSign, string> = {
  [ZodiacSign.Aries]: "Votre Soleil en Bélier vous confère une nature pionnière, courageuse et indépendante. Vous avez besoin d'action et de défis pour vous épanouir.",
  [ZodiacSign.Taurus]: "Votre Soleil en Taureau vous rend stable, sensuel et attaché aux plaisirs de la vie. La sécurité matérielle et affective est importante pour vous.",
  [ZodiacSign.Gemini]: "Votre Soleil en Gémeaux vous dote d'un esprit vif, curieux et communicatif. Vous avez besoin de variété et d'échanges intellectuels.",
  [ZodiacSign.Cancer]: "Votre Soleil en Cancer vous rend sensible, protecteur et attaché à votre foyer. Votre vie émotionnelle est riche et profonde.",
  [ZodiacSign.Leo]: "Votre Soleil en Lion vous confère une nature généreuse, créative et charismatique. Vous avez besoin de reconnaissance et d'exprimer votre créativité.",
  [ZodiacSign.Virgo]: "Votre Soleil en Vierge vous rend analytique, serviable et perfectionniste. Vous excellez dans les détails et l'organisation.",
  [ZodiacSign.Libra]: "Votre Soleil en Balance vous dote d'un sens aigu de l'harmonie et de la justice. Les relations et l'esthétique sont essentielles à votre équilibre.",
  [ZodiacSign.Scorpio]: "Votre Soleil en Scorpion vous confère une intensité émotionnelle profonde. Vous êtes passionné, intuitif et capable de grandes transformations.",
  [ZodiacSign.Sagittarius]: "Votre Soleil en Sagittaire vous rend optimiste, aventurier et philosophe. Vous cherchez à élargir vos horizons et à trouver un sens à la vie.",
  [ZodiacSign.Capricorn]: "Votre Soleil en Capricorne vous confère ambition, discipline et persévérance. Vous visez haut et êtes prêt à travailler dur pour atteindre vos objectifs.",
  [ZodiacSign.Aquarius]: "Votre Soleil en Verseau vous rend original, indépendant et humanitaire. Vous êtes un visionnaire qui pense à l'avenir de l'humanité.",
  [ZodiacSign.Pisces]: "Votre Soleil en Poissons vous dote d'une grande sensibilité et d'une intuition développée. Vous êtes empathique, créatif et spirituel.",
};

const MOON_IN_SIGNS: Record<ZodiacSign, string> = {
  [ZodiacSign.Aries]: "Votre Lune en Bélier révèle des émotions vives et spontanées. Vous réagissez rapidement et avez besoin d'action pour vous sentir bien.",
  [ZodiacSign.Taurus]: "Votre Lune en Taureau vous procure une stabilité émotionnelle et un besoin de confort. La sécurité affective est fondamentale.",
  [ZodiacSign.Gemini]: "Votre Lune en Gémeaux indique un besoin de communication et de stimulation intellectuelle pour votre équilibre émotionnel.",
  [ZodiacSign.Cancer]: "Votre Lune en Cancer est en domicile, amplifiant votre sensibilité et votre attachement familial. Vos émotions sont profondes et nourricières.",
  [ZodiacSign.Leo]: "Votre Lune en Lion révèle un besoin d'être reconnu et aimé. Vos émotions sont théâtrales et vous avez un cœur généreux.",
  [ZodiacSign.Virgo]: "Votre Lune en Vierge vous pousse à analyser vos émotions. Vous avez besoin d'ordre et de vous sentir utile pour être serein.",
  [ZodiacSign.Libra]: "Votre Lune en Balance indique un besoin d'harmonie relationnelle. Vous êtes sensible à l'esthétique et recherchez l'équilibre.",
  [ZodiacSign.Scorpio]: "Votre Lune en Scorpion révèle une vie émotionnelle intense et profonde. Vous ressentez les choses avec passion et êtes très intuitif.",
  [ZodiacSign.Sagittarius]: "Votre Lune en Sagittaire vous donne un besoin de liberté et d'aventure. L'optimisme et la philosophie vous réconfortent.",
  [ZodiacSign.Capricorn]: "Votre Lune en Capricorne indique une réserve émotionnelle. Vous êtes responsable et avez besoin de sécurité et de structure.",
  [ZodiacSign.Aquarius]: "Votre Lune en Verseau révèle un détachement émotionnel et un besoin de liberté. Vous êtes original dans l'expression de vos sentiments.",
  [ZodiacSign.Pisces]: "Votre Lune en Poissons vous rend extrêmement empathique et intuitif. Votre sensibilité artistique et spirituelle est très développée.",
};

const ASCENDANT_IN_SIGNS: Record<ZodiacSign, string> = {
  [ZodiacSign.Aries]: "Avec l'Ascendant Bélier, vous projetez une image dynamique et courageuse. Votre approche de la vie est directe et énergique.",
  [ZodiacSign.Taurus]: "Avec l'Ascendant Taureau, vous projetez une image stable et fiable. Votre approche est posée et vous dégagez une certaine sensualité.",
  [ZodiacSign.Gemini]: "Avec l'Ascendant Gémeaux, vous projetez une image vive et curieuse. Vous paraissez communicatif et adaptable.",
  [ZodiacSign.Cancer]: "Avec l'Ascendant Cancer, vous projetez une image protectrice et sensible. Votre approche est émotionnelle et accueillante.",
  [ZodiacSign.Leo]: "Avec l'Ascendant Lion, vous projetez une image charismatique et fière. Vous attirez naturellement l'attention.",
  [ZodiacSign.Virgo]: "Avec l'Ascendant Vierge, vous projetez une image modeste et efficace. Votre approche est méthodique et analytique.",
  [ZodiacSign.Libra]: "Avec l'Ascendant Balance, vous projetez une image élégante et diplomatique. Vous cherchez à créer l'harmonie autour de vous.",
  [ZodiacSign.Scorpio]: "Avec l'Ascendant Scorpion, vous projetez une image mystérieuse et intense. Votre regard est pénétrant et magnétique.",
  [ZodiacSign.Sagittarius]: "Avec l'Ascendant Sagittaire, vous projetez une image optimiste et aventurière. Votre approche est enthousiaste et ouverte.",
  [ZodiacSign.Capricorn]: "Avec l'Ascendant Capricorne, vous projetez une image sérieuse et ambitieuse. Votre approche est responsable et prudente.",
  [ZodiacSign.Aquarius]: "Avec l'Ascendant Verseau, vous projetez une image originale et indépendante. Votre approche est unique et non-conformiste.",
  [ZodiacSign.Pisces]: "Avec l'Ascendant Poissons, vous projetez une image douce et rêveuse. Votre approche est intuitive et compassionnelle.",
};

// ============================================
// Planètes en maisons - Interprétations courtes
// ============================================

const SUN_IN_HOUSES: Record<number, string> = {
  1: "Le Soleil en Maison 1 renforce votre identité et votre présence personnelle. Vous rayonnez naturellement et êtes le centre de votre propre vie.",
  2: "Le Soleil en Maison 2 met l'accent sur les valeurs et les ressources. Votre identité est liée à ce que vous possédez et à votre estime de vous-même.",
  3: "Le Soleil en Maison 3 met en lumière la communication. Vous brillez par vos idées et votre capacité à vous exprimer.",
  4: "Le Soleil en Maison 4 place la famille et le foyer au cœur de votre identité. Votre vie privée est importante pour vous.",
  5: "Le Soleil en Maison 5 favorise la créativité et l'expression personnelle. Les plaisirs, les enfants et les loisirs vous épanouissent.",
  6: "Le Soleil en Maison 6 met l'accent sur le travail et la santé. Vous vous réalisez à travers le service aux autres.",
  7: "Le Soleil en Maison 7 place les relations au centre de votre vie. Vous vous épanouissez à travers le partenariat.",
  8: "Le Soleil en Maison 8 indique une nature profonde et transformatrice. Les mystères de la vie vous attirent.",
  9: "Le Soleil en Maison 9 favorise les voyages, la philosophie et l'enseignement. Vous cherchez à élargir vos horizons.",
  10: "Le Soleil en Maison 10 place la carrière et la réputation au premier plan. Vous êtes ambitieux et visez les sommets.",
  11: "Le Soleil en Maison 11 met l'accent sur les amitiés et les projets collectifs. Vous vous épanouissez dans un groupe.",
  12: "Le Soleil en Maison 12 indique une vie intérieure riche. Vous êtes connecté à l'invisible et avez besoin de solitude.",
};

const MOON_IN_HOUSES: Record<number, string> = {
  1: "La Lune en Maison 1 rend vos émotions très visibles. Votre humeur influence fortement votre apparence et votre comportement.",
  2: "La Lune en Maison 2 lie vos émotions à la sécurité matérielle. Votre confort dépend de votre sentiment de sécurité financière.",
  3: "La Lune en Maison 3 indique des pensées influencées par les émotions. Vous communiquez avec sensibilité.",
  4: "La Lune en Maison 4 est en position forte. Le foyer et la famille sont essentiels à votre bien-être émotionnel.",
  5: "La Lune en Maison 5 apporte des émotions créatives et ludiques. Vous avez besoin de joie et d'expression artistique.",
  6: "La Lune en Maison 6 lie les émotions au quotidien et à la santé. Votre travail influence votre état émotionnel.",
  7: "La Lune en Maison 7 indique un besoin émotionnel de relation. Le partenariat est vital pour votre équilibre.",
  8: "La Lune en Maison 8 révèle une vie émotionnelle intense et profonde. Les crises sont des occasions de transformation.",
  9: "La Lune en Maison 9 apporte un besoin émotionnel d'exploration. Les voyages et la spiritualité vous nourrissent.",
  10: "La Lune en Maison 10 lie les émotions à la carrière. Votre image publique reflète votre vie intérieure.",
  11: "La Lune en Maison 11 indique un besoin émotionnel d'appartenance. Les amitiés et les groupes vous sécurisent.",
  12: "La Lune en Maison 12 cache les émotions dans l'inconscient. Vous avez une vie intérieure riche mais secrète.",
};

// ============================================
// Fonctions d'interprétation
// ============================================

/**
 * Génère l'interprétation du Soleil en signe
 */
export function interpretSunSign(sign: ZodiacSign): string {
  return SUN_IN_SIGNS[sign] || '';
}

/**
 * Génère l'interprétation de la Lune en signe
 */
export function interpretMoonSign(sign: ZodiacSign): string {
  return MOON_IN_SIGNS[sign] || '';
}

/**
 * Génère l'interprétation de l'Ascendant
 */
export function interpretAscendant(sign: ZodiacSign): string {
  return ASCENDANT_IN_SIGNS[sign] || '';
}

/**
 * Génère l'interprétation du Soleil en maison
 */
export function interpretSunHouse(house: number): string {
  return SUN_IN_HOUSES[house] || '';
}

/**
 * Génère l'interprétation de la Lune en maison
 */
export function interpretMoonHouse(house: number): string {
  return MOON_IN_HOUSES[house] || '';
}

/**
 * Génère une interprétation complète du thème natal
 */
export function generateFullInterpretation(chart: NatalChart): {
  sun: { sign: string; house: string };
  moon: { sign: string; house: string };
  ascendant: string;
  summary: string;
} {
  const sun = chart.planets.find((p) => p.planet === Planet.Sun);
  const moon = chart.planets.find((p) => p.planet === Planet.Moon);
  const asc = chart.planets.find((p) => p.planet === Planet.Ascendant);

  const sunSignInfo = sun ? getSignInfo(sun.sign) : null;
  const moonSignInfo = moon ? getSignInfo(moon.sign) : null;
  const ascSignInfo = asc ? getSignInfo(asc.sign) : null;

  // Générer un résumé
  let summary = '';
  if (sunSignInfo && moonSignInfo && ascSignInfo) {
    summary = `Vous êtes ${sunSignInfo.nameFr} avec une Lune en ${moonSignInfo.nameFr} et un Ascendant ${ascSignInfo.nameFr}. `;

    // Analyser la combinaison des éléments
    const sunElement = sunSignInfo.element;
    const moonElement = moonSignInfo.element;

    if (sunElement === moonElement) {
      summary += `La concordance de vos luminaires en signe de ${sunElement === 'fire' ? 'Feu' : sunElement === 'earth' ? 'Terre' : sunElement === 'air' ? 'Air' : 'Eau'} renforce cette énergie dans votre personnalité.`;
    } else {
      summary += `La combinaison de votre Soleil en signe de ${sunElement === 'fire' ? 'Feu' : sunElement === 'earth' ? 'Terre' : sunElement === 'air' ? 'Air' : 'Eau'} et de votre Lune en signe d'${moonElement === 'fire' ? 'Feu' : moonElement === 'earth' ? 'Terre' : moonElement === 'air' ? 'Air' : 'Eau'} crée une richesse et une complexité dans votre personnalité.`;
    }
  }

  return {
    sun: {
      sign: sun ? interpretSunSign(sun.sign) : '',
      house: sun ? interpretSunHouse(sun.house) : '',
    },
    moon: {
      sign: moon ? interpretMoonSign(moon.sign) : '',
      house: moon ? interpretMoonHouse(moon.house) : '',
    },
    ascendant: asc ? interpretAscendant(asc.sign) : '',
    summary,
  };
}
