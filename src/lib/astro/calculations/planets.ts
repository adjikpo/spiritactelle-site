/**
 * Calculs des positions planétaires
 * Basé sur des formules simplifiées VSOP87
 */

import { Planet, ZodiacSign, PlanetPosition } from '../types';
import { getSignFromDegree, getDegreeInSign } from '../constants';
import { julianCentury } from './julian';

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

/**
 * Normalise un angle entre 0 et 360 degrés
 */
function normalizeAngle(angle: number): number {
  return ((angle % 360) + 360) % 360;
}

/**
 * Éléments orbitaux moyens des planètes à J2000.0
 * L = longitude moyenne, a = demi-grand axe, e = excentricité
 * i = inclinaison, omega = longitude du noeud ascendant
 * pomega = longitude du périhélie
 */
interface OrbitalElements {
  L0: number; // Longitude moyenne à J2000 (degrés)
  Ldot: number; // Taux de changement (degrés/siècle)
  e0: number; // Excentricité à J2000
  edot: number; // Taux de changement
  i0: number; // Inclinaison à J2000 (degrés)
  idot: number;
  omega0: number; // Longitude du noeud ascendant (degrés)
  omegadot: number;
  pomega0: number; // Longitude du périhélie (degrés)
  pomegadot: number;
  a: number; // Demi-grand axe (UA)
}

const ORBITAL_ELEMENTS: Record<string, OrbitalElements> = {
  mercury: {
    L0: 252.25084,
    Ldot: 149472.67411175,
    e0: 0.20563593,
    edot: 0.00001906,
    i0: 7.00497902,
    idot: -0.00594749,
    omega0: 48.33076593,
    omegadot: -0.12534081,
    pomega0: 77.45779628,
    pomegadot: 0.16047689,
    a: 0.38709927,
  },
  venus: {
    L0: 181.9798,
    Ldot: 58517.8156748,
    e0: 0.00677672,
    edot: -0.00004107,
    i0: 3.39467605,
    idot: -0.00078890,
    omega0: 76.67984255,
    omegadot: -0.27769418,
    pomega0: 131.60246718,
    pomegadot: 0.00268329,
    a: 0.72333566,
  },
  earth: {
    L0: 100.46457166,
    Ldot: 35999.37244981,
    e0: 0.01671123,
    edot: -0.00004392,
    i0: 0.0,
    idot: 0.0,
    omega0: 0.0,
    omegadot: 0.0,
    pomega0: 102.93768193,
    pomegadot: 0.32327364,
    a: 1.00000261,
  },
  mars: {
    L0: 355.4533,
    Ldot: 19140.30268499,
    e0: 0.0933941,
    edot: 0.00007882,
    i0: 1.84969142,
    idot: -0.00813131,
    omega0: 49.55953891,
    omegadot: -0.29257343,
    pomega0: 336.05637041,
    pomegadot: 0.44441088,
    a: 1.52371034,
  },
  jupiter: {
    L0: 34.39644,
    Ldot: 3034.74612775,
    e0: 0.04838624,
    edot: -0.00013253,
    i0: 1.30439695,
    idot: -0.00183714,
    omega0: 100.47390909,
    omegadot: 0.20469106,
    pomega0: 14.72847983,
    pomegadot: 0.21252668,
    a: 5.20288700,
  },
  saturn: {
    L0: 49.95424,
    Ldot: 1222.49362201,
    e0: 0.05386179,
    edot: -0.00050991,
    i0: 2.48599187,
    idot: 0.00193609,
    omega0: 113.66242448,
    omegadot: -0.28867794,
    pomega0: 92.59887831,
    pomegadot: -0.41897216,
    a: 9.53667594,
  },
  uranus: {
    L0: 313.23218,
    Ldot: 428.48202785,
    e0: 0.04725744,
    edot: -0.00004397,
    i0: 0.77263783,
    idot: -0.00242939,
    omega0: 74.01692503,
    omegadot: 0.04240589,
    pomega0: 170.95427630,
    pomegadot: 0.40805281,
    a: 19.18916464,
  },
  neptune: {
    L0: 304.88003,
    Ldot: 218.45945325,
    e0: 0.00859048,
    edot: 0.00005105,
    i0: 1.77004347,
    idot: 0.00035372,
    omega0: 131.78422574,
    omegadot: -0.00508664,
    pomega0: 44.96476227,
    pomegadot: -0.32241464,
    a: 30.06992276,
  },
  pluto: {
    L0: 238.92881,
    Ldot: 145.20780515,
    e0: 0.24882730,
    edot: 0.00006016,
    i0: 17.14001206,
    idot: 0.00394481,
    omega0: 110.30393684,
    omegadot: -0.01183482,
    pomega0: 224.06891629,
    pomegadot: -0.04062942,
    a: 39.48211675,
  },
};

/**
 * Calcule la position héliocentrique d'une planète
 */
function calculateHeliocentricPosition(
  planet: string,
  T: number
): { longitude: number; latitude: number; radius: number } {
  const elem = ORBITAL_ELEMENTS[planet];
  if (!elem) {
    return { longitude: 0, latitude: 0, radius: 1 };
  }

  // Éléments à la date T
  const L = normalizeAngle(elem.L0 + elem.Ldot * T);
  const e = elem.e0 + elem.edot * T;
  const i = elem.i0 + elem.idot * T;
  const omega = normalizeAngle(elem.omega0 + elem.omegadot * T);
  const pomega = normalizeAngle(elem.pomega0 + elem.pomegadot * T);

  // Anomalie moyenne
  const M = normalizeAngle(L - pomega);
  const Mrad = M * DEG_TO_RAD;

  // Équation de Kepler (résolution itérative)
  let E = Mrad;
  for (let iter = 0; iter < 10; iter++) {
    E = Mrad + e * Math.sin(E);
  }

  // Anomalie vraie
  const nu =
    2 *
    Math.atan2(
      Math.sqrt(1 + e) * Math.sin(E / 2),
      Math.sqrt(1 - e) * Math.cos(E / 2)
    );

  // Distance au Soleil
  const r = elem.a * (1 - e * Math.cos(E));

  // Coordonnées dans le plan orbital
  const xOrb = r * Math.cos(nu);
  const yOrb = r * Math.sin(nu);

  // Conversion en coordonnées héliocentriques écliptiques
  const omegaRad = omega * DEG_TO_RAD;
  const pomegaRad = pomega * DEG_TO_RAD;
  const iRad = i * DEG_TO_RAD;
  const argPeri = pomegaRad - omegaRad;

  const cosO = Math.cos(omegaRad);
  const sinO = Math.sin(omegaRad);
  const cosI = Math.cos(iRad);
  const sinI = Math.sin(iRad);
  const cosW = Math.cos(argPeri);
  const sinW = Math.sin(argPeri);

  const x =
    (cosO * cosW - sinO * sinW * cosI) * xOrb +
    (-cosO * sinW - sinO * cosW * cosI) * yOrb;
  const y =
    (sinO * cosW + cosO * sinW * cosI) * xOrb +
    (-sinO * sinW + cosO * cosW * cosI) * yOrb;
  const z = sinW * sinI * xOrb + cosW * sinI * yOrb;

  // Conversion en longitude/latitude
  const longitude = normalizeAngle(Math.atan2(y, x) * RAD_TO_DEG);
  const latitude = Math.asin(z / r) * RAD_TO_DEG;

  return { longitude, latitude, radius: r };
}

/**
 * Calcule la position géocentrique (vue depuis la Terre)
 */
function calculateGeocentricPosition(
  planet: string,
  T: number
): { longitude: number; latitude: number; speed: number } {
  // Position de la Terre
  const earth = calculateHeliocentricPosition('earth', T);
  const earthX = earth.radius * Math.cos(earth.longitude * DEG_TO_RAD);
  const earthY = earth.radius * Math.sin(earth.longitude * DEG_TO_RAD);

  // Position de la planète
  const planetHelio = calculateHeliocentricPosition(planet, T);
  const planetX = planetHelio.radius * Math.cos(planetHelio.longitude * DEG_TO_RAD);
  const planetY = planetHelio.radius * Math.sin(planetHelio.longitude * DEG_TO_RAD);
  const planetZ =
    planetHelio.radius * Math.sin(planetHelio.latitude * DEG_TO_RAD);

  // Vecteur Terre -> Planète
  const dx = planetX - earthX;
  const dy = planetY - earthY;
  const dz = planetZ;

  // Longitude géocentrique
  const longitude = normalizeAngle(Math.atan2(dy, dx) * RAD_TO_DEG);

  // Latitude géocentrique
  const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
  const latitude = Math.asin(dz / dist) * RAD_TO_DEG;

  // Vitesse approximative (calcul différentiel)
  const deltaT = 0.0001;
  const futurePos = calculateHeliocentricPosition(planet, T + deltaT);
  const futurePlanetX =
    futurePos.radius * Math.cos(futurePos.longitude * DEG_TO_RAD);
  const futurePlanetY =
    futurePos.radius * Math.sin(futurePos.longitude * DEG_TO_RAD);

  const futureEarth = calculateHeliocentricPosition('earth', T + deltaT);
  const futureEarthX = futureEarth.radius * Math.cos(futureEarth.longitude * DEG_TO_RAD);
  const futureEarthY = futureEarth.radius * Math.sin(futureEarth.longitude * DEG_TO_RAD);

  const futureDx = futurePlanetX - futureEarthX;
  const futureDy = futurePlanetY - futureEarthY;
  const futureLon = normalizeAngle(Math.atan2(futureDy, futureDx) * RAD_TO_DEG);

  let speed = (futureLon - longitude) / deltaT / 36525; // degrés par jour

  // Gérer le passage 360->0
  if (speed > 180) speed -= 360;
  if (speed < -180) speed += 360;

  return { longitude, latitude, speed };
}

/**
 * Calcule la position du Soleil (géocentrique)
 */
function calculateSunPosition(T: number): { longitude: number; speed: number } {
  // Position de la Terre (héliocentrique)
  const earth = calculateHeliocentricPosition('earth', T);

  // Le Soleil vu de la Terre est à 180° de la position de la Terre
  const sunLongitude = normalizeAngle(earth.longitude + 180);

  // Vitesse moyenne du Soleil
  const speed = 360 / 365.25; // environ 0.9856 degrés par jour

  return { longitude: sunLongitude, speed };
}

/**
 * Calcule la position de la Lune
 */
function calculateMoonPosition(T: number): {
  longitude: number;
  latitude: number;
  speed: number;
} {
  // Éléments lunaires moyens
  const Lp = normalizeAngle(218.3165 + 481267.8813 * T); // Longitude moyenne
  const D = normalizeAngle(297.8502 + 445267.1115 * T); // Élongation moyenne
  const M = normalizeAngle(357.5291 + 35999.0503 * T); // Anomalie moyenne du Soleil
  const Mp = normalizeAngle(134.9634 + 477198.8676 * T); // Anomalie moyenne de la Lune
  const F = normalizeAngle(93.2721 + 483202.0175 * T); // Argument de latitude

  // Termes principaux de perturbation
  const LpRad = Lp * DEG_TO_RAD;
  const DRad = D * DEG_TO_RAD;
  const MRad = M * DEG_TO_RAD;
  const MpRad = Mp * DEG_TO_RAD;
  const FRad = F * DEG_TO_RAD;

  // Longitude (termes principaux)
  let longitude = Lp;
  longitude += 6.289 * Math.sin(MpRad);
  longitude += 1.274 * Math.sin(2 * DRad - MpRad);
  longitude += 0.658 * Math.sin(2 * DRad);
  longitude += 0.214 * Math.sin(2 * MpRad);
  longitude -= 0.186 * Math.sin(MRad);
  longitude -= 0.114 * Math.sin(2 * FRad);

  // Latitude
  let latitude = 5.128 * Math.sin(FRad);
  latitude += 0.281 * Math.sin(MpRad + FRad);
  latitude += 0.278 * Math.sin(MpRad - FRad);

  // Vitesse moyenne de la Lune
  const speed = 13.176; // degrés par jour

  return {
    longitude: normalizeAngle(longitude),
    latitude,
    speed,
  };
}

/**
 * Calcule les noeuds lunaires
 */
function calculateLunarNodes(T: number): {
  northNode: number;
  southNode: number;
} {
  // Longitude du noeud nord moyen
  let northNode = 125.0445479 - 1934.1362891 * T + 0.0020754 * T * T;
  northNode = normalizeAngle(northNode);

  const southNode = normalizeAngle(northNode + 180);

  return { northNode, southNode };
}

/**
 * Calcule toutes les positions planétaires pour une date donnée
 */
export function calculatePlanetPositions(
  jd: number,
  houses: number[] = []
): PlanetPosition[] {
  const T = julianCentury(jd);
  const positions: PlanetPosition[] = [];

  // Soleil
  const sun = calculateSunPosition(T);
  positions.push({
    planet: Planet.Sun,
    longitude: sun.longitude,
    latitude: 0,
    speed: sun.speed,
    retrograde: false,
    sign: getSignFromDegree(sun.longitude),
    signDegree: getDegreeInSign(sun.longitude),
    house: getHouseForLongitude(sun.longitude, houses),
  });

  // Lune
  const moon = calculateMoonPosition(T);
  positions.push({
    planet: Planet.Moon,
    longitude: moon.longitude,
    latitude: moon.latitude,
    speed: moon.speed,
    retrograde: false,
    sign: getSignFromDegree(moon.longitude),
    signDegree: getDegreeInSign(moon.longitude),
    house: getHouseForLongitude(moon.longitude, houses),
  });

  // Planètes
  const planetList: Array<{ name: string; planet: Planet }> = [
    { name: 'mercury', planet: Planet.Mercury },
    { name: 'venus', planet: Planet.Venus },
    { name: 'mars', planet: Planet.Mars },
    { name: 'jupiter', planet: Planet.Jupiter },
    { name: 'saturn', planet: Planet.Saturn },
    { name: 'uranus', planet: Planet.Uranus },
    { name: 'neptune', planet: Planet.Neptune },
    { name: 'pluto', planet: Planet.Pluto },
  ];

  for (const { name, planet } of planetList) {
    const pos = calculateGeocentricPosition(name, T);
    positions.push({
      planet,
      longitude: pos.longitude,
      latitude: pos.latitude,
      speed: pos.speed,
      retrograde: pos.speed < 0,
      sign: getSignFromDegree(pos.longitude),
      signDegree: getDegreeInSign(pos.longitude),
      house: getHouseForLongitude(pos.longitude, houses),
    });
  }

  // Noeuds lunaires
  const nodes = calculateLunarNodes(T);
  positions.push({
    planet: Planet.NorthNode,
    longitude: nodes.northNode,
    latitude: 0,
    speed: -0.053, // Le noeud nord recule
    retrograde: true,
    sign: getSignFromDegree(nodes.northNode),
    signDegree: getDegreeInSign(nodes.northNode),
    house: getHouseForLongitude(nodes.northNode, houses),
  });

  positions.push({
    planet: Planet.SouthNode,
    longitude: nodes.southNode,
    latitude: 0,
    speed: -0.053,
    retrograde: true,
    sign: getSignFromDegree(nodes.southNode),
    signDegree: getDegreeInSign(nodes.southNode),
    house: getHouseForLongitude(nodes.southNode, houses),
  });

  return positions;
}

/**
 * Trouve la maison pour une longitude donnée
 */
function getHouseForLongitude(longitude: number, houses: number[]): number {
  if (houses.length < 12) return 1;

  for (let i = 0; i < 12; i++) {
    const start = houses[i];
    const end = houses[(i + 1) % 12];

    if (end > start) {
      if (longitude >= start && longitude < end) {
        return i + 1;
      }
    } else {
      // Passage par 0°
      if (longitude >= start || longitude < end) {
        return i + 1;
      }
    }
  }

  return 1;
}
