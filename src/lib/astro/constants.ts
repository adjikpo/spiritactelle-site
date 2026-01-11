/**
 * Constantes astronomiques et astrologiques
 */

import {
  ZodiacSign,
  Element,
  Modality,
  Planet,
  AspectType,
  SignInfo,
  PlanetInfo,
  AspectInfo,
} from './types';

// ============================================
// Informations sur les signes du zodiaque
// ============================================

export const ZODIAC_SIGNS: SignInfo[] = [
  {
    sign: ZodiacSign.Aries,
    name: 'Aries',
    nameFr: 'Bélier',
    symbol: '♈',
    element: Element.Fire,
    modality: Modality.Cardinal,
    ruler: Planet.Mars,
    detriment: Planet.Venus,
    exaltation: Planet.Sun,
    fall: Planet.Saturn,
    startDegree: 0,
    keywords: ['initiative', 'courage', 'impulsivité', 'leadership', 'énergie'],
  },
  {
    sign: ZodiacSign.Taurus,
    name: 'Taurus',
    nameFr: 'Taureau',
    symbol: '♉',
    element: Element.Earth,
    modality: Modality.Fixed,
    ruler: Planet.Venus,
    detriment: Planet.Mars,
    exaltation: Planet.Moon,
    fall: Planet.Uranus,
    startDegree: 30,
    keywords: ['stabilité', 'sensualité', 'patience', 'possession', 'nature'],
  },
  {
    sign: ZodiacSign.Gemini,
    name: 'Gemini',
    nameFr: 'Gémeaux',
    symbol: '♊',
    element: Element.Air,
    modality: Modality.Mutable,
    ruler: Planet.Mercury,
    detriment: Planet.Jupiter,
    exaltation: null,
    fall: null,
    startDegree: 60,
    keywords: ['communication', 'curiosité', 'adaptabilité', 'intellect', 'dualité'],
  },
  {
    sign: ZodiacSign.Cancer,
    name: 'Cancer',
    nameFr: 'Cancer',
    symbol: '♋',
    element: Element.Water,
    modality: Modality.Cardinal,
    ruler: Planet.Moon,
    detriment: Planet.Saturn,
    exaltation: Planet.Jupiter,
    fall: Planet.Mars,
    startDegree: 90,
    keywords: ['émotion', 'famille', 'protection', 'intuition', 'sensibilité'],
  },
  {
    sign: ZodiacSign.Leo,
    name: 'Leo',
    nameFr: 'Lion',
    symbol: '♌',
    element: Element.Fire,
    modality: Modality.Fixed,
    ruler: Planet.Sun,
    detriment: Planet.Saturn,
    exaltation: Planet.Neptune,
    fall: Planet.Uranus,
    startDegree: 120,
    keywords: ['créativité', 'fierté', 'générosité', 'leadership', 'expression'],
  },
  {
    sign: ZodiacSign.Virgo,
    name: 'Virgo',
    nameFr: 'Vierge',
    symbol: '♍',
    element: Element.Earth,
    modality: Modality.Mutable,
    ruler: Planet.Mercury,
    detriment: Planet.Jupiter,
    exaltation: Planet.Mercury,
    fall: Planet.Venus,
    startDegree: 150,
    keywords: ['analyse', 'service', 'perfectionnisme', 'santé', 'méthode'],
  },
  {
    sign: ZodiacSign.Libra,
    name: 'Libra',
    nameFr: 'Balance',
    symbol: '♎',
    element: Element.Air,
    modality: Modality.Cardinal,
    ruler: Planet.Venus,
    detriment: Planet.Mars,
    exaltation: Planet.Saturn,
    fall: Planet.Sun,
    startDegree: 180,
    keywords: ['harmonie', 'justice', 'partenariat', 'esthétique', 'diplomatie'],
  },
  {
    sign: ZodiacSign.Scorpio,
    name: 'Scorpio',
    nameFr: 'Scorpion',
    symbol: '♏',
    element: Element.Water,
    modality: Modality.Fixed,
    ruler: Planet.Pluto,
    detriment: Planet.Venus,
    exaltation: Planet.Uranus,
    fall: Planet.Moon,
    startDegree: 210,
    keywords: ['transformation', 'intensité', 'mystère', 'passion', 'pouvoir'],
  },
  {
    sign: ZodiacSign.Sagittarius,
    name: 'Sagittarius',
    nameFr: 'Sagittaire',
    symbol: '♐',
    element: Element.Fire,
    modality: Modality.Mutable,
    ruler: Planet.Jupiter,
    detriment: Planet.Mercury,
    exaltation: null,
    fall: null,
    startDegree: 240,
    keywords: ['aventure', 'philosophie', 'optimisme', 'liberté', 'expansion'],
  },
  {
    sign: ZodiacSign.Capricorn,
    name: 'Capricorn',
    nameFr: 'Capricorne',
    symbol: '♑',
    element: Element.Earth,
    modality: Modality.Cardinal,
    ruler: Planet.Saturn,
    detriment: Planet.Moon,
    exaltation: Planet.Mars,
    fall: Planet.Jupiter,
    startDegree: 270,
    keywords: ['ambition', 'discipline', 'structure', 'responsabilité', 'persévérance'],
  },
  {
    sign: ZodiacSign.Aquarius,
    name: 'Aquarius',
    nameFr: 'Verseau',
    symbol: '♒',
    element: Element.Air,
    modality: Modality.Fixed,
    ruler: Planet.Uranus,
    detriment: Planet.Sun,
    exaltation: null,
    fall: Planet.Neptune,
    startDegree: 300,
    keywords: ['innovation', 'humanité', 'originalité', 'indépendance', 'progrès'],
  },
  {
    sign: ZodiacSign.Pisces,
    name: 'Pisces',
    nameFr: 'Poissons',
    symbol: '♓',
    element: Element.Water,
    modality: Modality.Mutable,
    ruler: Planet.Neptune,
    detriment: Planet.Mercury,
    exaltation: Planet.Venus,
    fall: Planet.Mercury,
    startDegree: 330,
    keywords: ['intuition', 'compassion', 'spiritualité', 'imagination', 'transcendance'],
  },
];

// ============================================
// Informations sur les planètes
// ============================================

export const PLANETS: PlanetInfo[] = [
  {
    planet: Planet.Sun,
    name: 'Sun',
    nameFr: 'Soleil',
    symbol: '☉',
    keywords: ['identité', 'vitalité', 'ego', 'créativité', 'père'],
    dignities: {
      domicile: [ZodiacSign.Leo],
      exaltation: ZodiacSign.Aries,
      detriment: [ZodiacSign.Aquarius],
      fall: ZodiacSign.Libra,
    },
  },
  {
    planet: Planet.Moon,
    name: 'Moon',
    nameFr: 'Lune',
    symbol: '☽',
    keywords: ['émotions', 'instinct', 'mère', 'passé', 'besoins'],
    dignities: {
      domicile: [ZodiacSign.Cancer],
      exaltation: ZodiacSign.Taurus,
      detriment: [ZodiacSign.Capricorn],
      fall: ZodiacSign.Scorpio,
    },
  },
  {
    planet: Planet.Mercury,
    name: 'Mercury',
    nameFr: 'Mercure',
    symbol: '☿',
    keywords: ['communication', 'intellect', 'apprentissage', 'commerce', 'mobilité'],
    dignities: {
      domicile: [ZodiacSign.Gemini, ZodiacSign.Virgo],
      exaltation: ZodiacSign.Virgo,
      detriment: [ZodiacSign.Sagittarius, ZodiacSign.Pisces],
      fall: ZodiacSign.Pisces,
    },
  },
  {
    planet: Planet.Venus,
    name: 'Venus',
    nameFr: 'Vénus',
    symbol: '♀',
    keywords: ['amour', 'beauté', 'harmonie', 'valeurs', 'plaisir'],
    dignities: {
      domicile: [ZodiacSign.Taurus, ZodiacSign.Libra],
      exaltation: ZodiacSign.Pisces,
      detriment: [ZodiacSign.Scorpio, ZodiacSign.Aries],
      fall: ZodiacSign.Virgo,
    },
  },
  {
    planet: Planet.Mars,
    name: 'Mars',
    nameFr: 'Mars',
    symbol: '♂',
    keywords: ['action', 'énergie', 'désir', 'conflit', 'courage'],
    dignities: {
      domicile: [ZodiacSign.Aries, ZodiacSign.Scorpio],
      exaltation: ZodiacSign.Capricorn,
      detriment: [ZodiacSign.Libra, ZodiacSign.Taurus],
      fall: ZodiacSign.Cancer,
    },
  },
  {
    planet: Planet.Jupiter,
    name: 'Jupiter',
    nameFr: 'Jupiter',
    symbol: '♃',
    keywords: ['expansion', 'chance', 'sagesse', 'abondance', 'optimisme'],
    dignities: {
      domicile: [ZodiacSign.Sagittarius, ZodiacSign.Pisces],
      exaltation: ZodiacSign.Cancer,
      detriment: [ZodiacSign.Gemini, ZodiacSign.Virgo],
      fall: ZodiacSign.Capricorn,
    },
  },
  {
    planet: Planet.Saturn,
    name: 'Saturn',
    nameFr: 'Saturne',
    symbol: '♄',
    keywords: ['structure', 'limites', 'temps', 'responsabilité', 'karma'],
    dignities: {
      domicile: [ZodiacSign.Capricorn, ZodiacSign.Aquarius],
      exaltation: ZodiacSign.Libra,
      detriment: [ZodiacSign.Cancer, ZodiacSign.Leo],
      fall: ZodiacSign.Aries,
    },
  },
  {
    planet: Planet.Uranus,
    name: 'Uranus',
    nameFr: 'Uranus',
    symbol: '♅',
    keywords: ['révolution', 'originalité', 'liberté', 'éveil', 'technologie'],
    dignities: {
      domicile: [ZodiacSign.Aquarius],
      exaltation: ZodiacSign.Scorpio,
      detriment: [ZodiacSign.Leo],
      fall: ZodiacSign.Taurus,
    },
  },
  {
    planet: Planet.Neptune,
    name: 'Neptune',
    nameFr: 'Neptune',
    symbol: '♆',
    keywords: ['spiritualité', 'illusion', 'compassion', 'rêves', 'transcendance'],
    dignities: {
      domicile: [ZodiacSign.Pisces],
      exaltation: ZodiacSign.Leo,
      detriment: [ZodiacSign.Virgo],
      fall: ZodiacSign.Aquarius,
    },
  },
  {
    planet: Planet.Pluto,
    name: 'Pluto',
    nameFr: 'Pluton',
    symbol: '♇',
    keywords: ['transformation', 'pouvoir', 'mort/renaissance', 'profondeur', 'régénération'],
    dignities: {
      domicile: [ZodiacSign.Scorpio],
      exaltation: ZodiacSign.Aries,
      detriment: [ZodiacSign.Taurus],
      fall: ZodiacSign.Libra,
    },
  },
  {
    planet: Planet.NorthNode,
    name: 'North Node',
    nameFr: 'Nœud Nord',
    symbol: '☊',
    keywords: ['destinée', 'croissance', 'but de vie', 'évolution', 'karma futur'],
    dignities: {
      domicile: [],
      exaltation: null,
      detriment: [],
      fall: null,
    },
  },
  {
    planet: Planet.SouthNode,
    name: 'South Node',
    nameFr: 'Nœud Sud',
    symbol: '☋',
    keywords: ['passé', 'talents innés', 'karma passé', 'zone de confort', 'libération'],
    dignities: {
      domicile: [],
      exaltation: null,
      detriment: [],
      fall: null,
    },
  },
  {
    planet: Planet.Chiron,
    name: 'Chiron',
    nameFr: 'Chiron',
    symbol: '⚷',
    keywords: ['blessure', 'guérison', 'enseignant', 'sagesse', 'vulnérabilité'],
    dignities: {
      domicile: [],
      exaltation: null,
      detriment: [],
      fall: null,
    },
  },
  {
    planet: Planet.Ascendant,
    name: 'Ascendant',
    nameFr: 'Ascendant',
    symbol: 'AC',
    keywords: ['apparence', 'première impression', 'masque social', 'approche de la vie'],
    dignities: {
      domicile: [],
      exaltation: null,
      detriment: [],
      fall: null,
    },
  },
  {
    planet: Planet.Midheaven,
    name: 'Midheaven',
    nameFr: 'Milieu du Ciel',
    symbol: 'MC',
    keywords: ['carrière', 'réputation', 'objectifs', 'statut social', 'vocation'],
    dignities: {
      domicile: [],
      exaltation: null,
      detriment: [],
      fall: null,
    },
  },
];

// ============================================
// Informations sur les aspects
// ============================================

export const ASPECTS: AspectInfo[] = [
  {
    type: AspectType.Conjunction,
    name: 'Conjunction',
    nameFr: 'Conjonction',
    angle: 0,
    defaultOrb: 8,
    nature: 'neutral',
    symbol: '☌',
  },
  {
    type: AspectType.Opposition,
    name: 'Opposition',
    nameFr: 'Opposition',
    angle: 180,
    defaultOrb: 8,
    nature: 'challenging',
    symbol: '☍',
  },
  {
    type: AspectType.Trine,
    name: 'Trine',
    nameFr: 'Trigone',
    angle: 120,
    defaultOrb: 8,
    nature: 'harmonious',
    symbol: '△',
  },
  {
    type: AspectType.Square,
    name: 'Square',
    nameFr: 'Carré',
    angle: 90,
    defaultOrb: 7,
    nature: 'challenging',
    symbol: '□',
  },
  {
    type: AspectType.Sextile,
    name: 'Sextile',
    nameFr: 'Sextile',
    angle: 60,
    defaultOrb: 6,
    nature: 'harmonious',
    symbol: '⚹',
  },
  {
    type: AspectType.Quincunx,
    name: 'Quincunx',
    nameFr: 'Quinconce',
    angle: 150,
    defaultOrb: 3,
    nature: 'challenging',
    symbol: '⚻',
  },
  {
    type: AspectType.SemiSextile,
    name: 'Semi-Sextile',
    nameFr: 'Semi-Sextile',
    angle: 30,
    defaultOrb: 2,
    nature: 'neutral',
    symbol: '⚺',
  },
  {
    type: AspectType.SemiSquare,
    name: 'Semi-Square',
    nameFr: 'Semi-Carré',
    angle: 45,
    defaultOrb: 2,
    nature: 'challenging',
    symbol: '∠',
  },
  {
    type: AspectType.Sesquiquadrate,
    name: 'Sesquiquadrate',
    nameFr: 'Sesqui-Carré',
    angle: 135,
    defaultOrb: 2,
    nature: 'challenging',
    symbol: '⚼',
  },
  {
    type: AspectType.Quintile,
    name: 'Quintile',
    nameFr: 'Quintile',
    angle: 72,
    defaultOrb: 2,
    nature: 'harmonious',
    symbol: 'Q',
  },
  {
    type: AspectType.BiQuintile,
    name: 'Bi-Quintile',
    nameFr: 'Bi-Quintile',
    angle: 144,
    defaultOrb: 2,
    nature: 'harmonious',
    symbol: 'bQ',
  },
];

// ============================================
// Constantes astronomiques
// ============================================

export const ASTRONOMICAL_CONSTANTS = {
  // Julian Date de l'époque J2000.0
  J2000: 2451545.0,

  // Nombre de jours juliens par siècle
  JULIAN_CENTURY: 36525.0,

  // Obliquité moyenne de l'écliptique à J2000.0 (en degrés)
  OBLIQUITY_J2000: 23.439291111,

  // Secondes d'arc par degré
  ARCSEC_PER_DEG: 3600,

  // Degrés par radian
  DEG_PER_RAD: 180 / Math.PI,

  // Radians par degré
  RAD_PER_DEG: Math.PI / 180,
};

// ============================================
// Helpers pour accéder aux données
// ============================================

export function getSignInfo(sign: ZodiacSign): SignInfo | undefined {
  return ZODIAC_SIGNS.find((s) => s.sign === sign);
}

export function getPlanetInfo(planet: Planet): PlanetInfo | undefined {
  return PLANETS.find((p) => p.planet === planet);
}

export function getAspectInfo(aspect: AspectType): AspectInfo | undefined {
  return ASPECTS.find((a) => a.type === aspect);
}

export function getSignFromDegree(degree: number): ZodiacSign {
  const normalizedDegree = ((degree % 360) + 360) % 360;
  const signIndex = Math.floor(normalizedDegree / 30);
  return Object.values(ZodiacSign)[signIndex];
}

export function getDegreeInSign(degree: number): number {
  const normalizedDegree = ((degree % 360) + 360) % 360;
  return normalizedDegree % 30;
}

export function formatDegree(degree: number): string {
  const sign = getSignFromDegree(degree);
  const signInfo = getSignInfo(sign);
  const degInSign = getDegreeInSign(degree);
  const deg = Math.floor(degInSign);
  const min = Math.floor((degInSign - deg) * 60);

  return `${deg}°${min.toString().padStart(2, '0')}' ${signInfo?.symbol || ''}`;
}
