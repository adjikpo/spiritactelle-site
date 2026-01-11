/**
 * Calculs des aspects astrologiques
 */

import { Planet, AspectType, Aspect, PlanetPosition } from '../types';
import { ASPECTS } from '../constants';

/**
 * Configuration des orbes par planète
 * Les luminaires (Soleil, Lune) ont des orbes plus larges
 */
const ORB_MODIFIERS: Partial<Record<Planet, number>> = {
  [Planet.Sun]: 1.5,
  [Planet.Moon]: 1.3,
  [Planet.Mercury]: 1.0,
  [Planet.Venus]: 1.0,
  [Planet.Mars]: 1.0,
  [Planet.Jupiter]: 1.0,
  [Planet.Saturn]: 1.0,
  [Planet.Uranus]: 0.8,
  [Planet.Neptune]: 0.8,
  [Planet.Pluto]: 0.8,
  [Planet.NorthNode]: 0.7,
  [Planet.SouthNode]: 0.7,
  [Planet.Chiron]: 0.7,
  [Planet.Ascendant]: 1.2,
  [Planet.Midheaven]: 1.2,
};

/**
 * Calcule l'orbe maximum pour un aspect entre deux planètes
 */
function getMaxOrb(
  planet1: Planet,
  planet2: Planet,
  aspectType: AspectType
): number {
  const aspectInfo = ASPECTS.find((a) => a.type === aspectType);
  if (!aspectInfo) return 0;

  const baseOrb = aspectInfo.defaultOrb;
  const mod1 = ORB_MODIFIERS[planet1] || 1.0;
  const mod2 = ORB_MODIFIERS[planet2] || 1.0;

  // Moyenne des modificateurs
  return baseOrb * ((mod1 + mod2) / 2);
}

/**
 * Calcule l'angle entre deux longitudes
 */
function angleBetween(long1: number, long2: number): number {
  let diff = Math.abs(long1 - long2);
  if (diff > 180) {
    diff = 360 - diff;
  }
  return diff;
}

/**
 * Détermine si un aspect est en application ou en séparation
 */
function isApplying(
  planet1: PlanetPosition,
  planet2: PlanetPosition,
  aspectAngle: number
): boolean {
  const currentAngle = angleBetween(planet1.longitude, planet2.longitude);

  // Calculer l'angle dans 1 jour (approximation)
  const future1 = planet1.longitude + planet1.speed;
  const future2 = planet2.longitude + planet2.speed;
  const futureAngle = angleBetween(future1, future2);

  // Si l'angle futur est plus proche de l'aspect exact, c'est en application
  const currentDiff = Math.abs(currentAngle - aspectAngle);
  const futureDiff = Math.abs(futureAngle - aspectAngle);

  return futureDiff < currentDiff;
}

/**
 * Trouve tous les aspects entre une liste de positions planétaires
 */
export function calculateAspects(
  positions: PlanetPosition[],
  majorOnly: boolean = false
): Aspect[] {
  const aspects: Aspect[] = [];

  // Types d'aspects à vérifier
  const aspectTypes = majorOnly
    ? [
        AspectType.Conjunction,
        AspectType.Opposition,
        AspectType.Trine,
        AspectType.Square,
        AspectType.Sextile,
      ]
    : ASPECTS.map((a) => a.type);

  // Comparer chaque paire de planètes
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const pos1 = positions[i];
      const pos2 = positions[j];

      // Ne pas calculer d'aspects entre les noeuds lunaires (ils sont toujours opposés)
      if (
        (pos1.planet === Planet.NorthNode && pos2.planet === Planet.SouthNode) ||
        (pos1.planet === Planet.SouthNode && pos2.planet === Planet.NorthNode)
      ) {
        continue;
      }

      const angle = angleBetween(pos1.longitude, pos2.longitude);

      // Vérifier chaque type d'aspect
      for (const aspectType of aspectTypes) {
        const aspectInfo = ASPECTS.find((a) => a.type === aspectType);
        if (!aspectInfo) continue;

        const maxOrb = getMaxOrb(pos1.planet, pos2.planet, aspectType);
        const orb = Math.abs(angle - aspectInfo.angle);

        if (orb <= maxOrb) {
          aspects.push({
            planet1: pos1.planet,
            planet2: pos2.planet,
            type: aspectType,
            orb,
            maxOrb,
            applying: isApplying(pos1, pos2, aspectInfo.angle),
            exactDegree: aspectInfo.angle,
          });
          break; // Un seul aspect par paire de planètes
        }
      }
    }
  }

  // Trier par importance (orbe le plus serré en premier)
  aspects.sort((a, b) => a.orb - b.orb);

  return aspects;
}

/**
 * Filtre les aspects par type
 */
export function filterAspectsByType(
  aspects: Aspect[],
  types: AspectType[]
): Aspect[] {
  return aspects.filter((a) => types.includes(a.type));
}

/**
 * Filtre les aspects par planète
 */
export function filterAspectsByPlanet(
  aspects: Aspect[],
  planet: Planet
): Aspect[] {
  return aspects.filter((a) => a.planet1 === planet || a.planet2 === planet);
}

/**
 * Calcule un score de dominante pour les aspects
 * Plus il y a d'aspects serrés, plus le score est élevé
 */
export function calculateAspectScore(aspects: Aspect[]): number {
  let score = 0;

  for (const aspect of aspects) {
    // Score inversement proportionnel à l'orbe
    const orbScore = 1 - aspect.orb / aspect.maxOrb;

    // Bonus selon le type d'aspect
    let typeBonus = 1;
    switch (aspect.type) {
      case AspectType.Conjunction:
        typeBonus = 1.5;
        break;
      case AspectType.Opposition:
      case AspectType.Square:
        typeBonus = 1.2;
        break;
      case AspectType.Trine:
      case AspectType.Sextile:
        typeBonus = 1.1;
        break;
    }

    score += orbScore * typeBonus;
  }

  return score;
}

/**
 * Compte les aspects harmoniques vs les aspects tendus
 */
export function categorizeAspects(aspects: Aspect[]): {
  harmonious: Aspect[];
  challenging: Aspect[];
  neutral: Aspect[];
} {
  const harmonious: Aspect[] = [];
  const challenging: Aspect[] = [];
  const neutral: Aspect[] = [];

  for (const aspect of aspects) {
    const aspectInfo = ASPECTS.find((a) => a.type === aspect.type);
    if (!aspectInfo) continue;

    switch (aspectInfo.nature) {
      case 'harmonious':
        harmonious.push(aspect);
        break;
      case 'challenging':
        challenging.push(aspect);
        break;
      case 'neutral':
        neutral.push(aspect);
        break;
    }
  }

  return { harmonious, challenging, neutral };
}

/**
 * Génère une description textuelle d'un aspect
 */
export function describeAspect(aspect: Aspect): string {
  const aspectInfo = ASPECTS.find((a) => a.type === aspect.type);
  if (!aspectInfo) return '';

  const orbStr = aspect.orb.toFixed(1);
  const applyingStr = aspect.applying ? 'en application' : 'en séparation';

  return `${aspect.planet1} ${aspectInfo.nameFr} ${aspect.planet2} (orbe: ${orbStr}°, ${applyingStr})`;
}
