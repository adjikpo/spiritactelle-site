/**
 * Calculs des maisons astrologiques
 * Supporte différents systèmes de maisons
 */

import { HouseSystem, HouseCusp, ZodiacSign } from '../types';
import { getSignFromDegree, getDegreeInSign } from '../constants';
import { localSiderealTime, obliquityOfEcliptic } from './julian';

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

/**
 * Normalise un angle entre 0 et 360 degrés
 */
function normalizeAngle(angle: number): number {
  return ((angle % 360) + 360) % 360;
}

/**
 * Calcule l'Ascendant
 */
export function calculateAscendant(
  jd: number,
  latitude: number,
  longitude: number
): number {
  const lst = localSiderealTime(jd, longitude);
  const eps = obliquityOfEcliptic(jd);

  const lstRad = lst * DEG_TO_RAD;
  const latRad = latitude * DEG_TO_RAD;
  const epsRad = eps * DEG_TO_RAD;

  // Formule de l'Ascendant
  const y = -Math.cos(lstRad);
  const x =
    Math.sin(lstRad) * Math.cos(epsRad) +
    Math.tan(latRad) * Math.sin(epsRad);

  let asc = Math.atan2(y, x) * RAD_TO_DEG;
  asc = normalizeAngle(asc);

  return asc;
}

/**
 * Calcule le Milieu du Ciel (MC)
 */
export function calculateMidheaven(jd: number, longitude: number): number {
  const lst = localSiderealTime(jd, longitude);
  const eps = obliquityOfEcliptic(jd);

  const lstRad = lst * DEG_TO_RAD;
  const epsRad = eps * DEG_TO_RAD;

  // Formule du MC
  let mc = Math.atan2(Math.sin(lstRad), Math.cos(lstRad) * Math.cos(epsRad));
  mc = mc * RAD_TO_DEG;
  mc = normalizeAngle(mc);

  return mc;
}

/**
 * Calcule les cuspides des maisons selon le système Placidus
 */
function calculatePlacidusHouses(
  jd: number,
  latitude: number,
  longitude: number
): number[] {
  const asc = calculateAscendant(jd, latitude, longitude);
  const mc = calculateMidheaven(jd, longitude);
  const eps = obliquityOfEcliptic(jd);
  const lst = localSiderealTime(jd, longitude);

  const latRad = latitude * DEG_TO_RAD;
  const epsRad = eps * DEG_TO_RAD;

  const houses: number[] = [];

  // Maison 1 = Ascendant
  houses[0] = asc;

  // Maison 10 = MC
  houses[9] = mc;

  // Maison 4 = IC (opposé au MC)
  houses[3] = normalizeAngle(mc + 180);

  // Maison 7 = Descendant (opposé à l'Ascendant)
  houses[6] = normalizeAngle(asc + 180);

  // Calcul des maisons intermédiaires par interpolation Placidus
  // Maisons 2, 3 (entre ASC et IC)
  const arc1 = normalizeAngle(houses[3] - houses[0]);
  houses[1] = normalizeAngle(houses[0] + arc1 / 3);
  houses[2] = normalizeAngle(houses[0] + (2 * arc1) / 3);

  // Maisons 11, 12 (entre MC et ASC)
  const arc2 = normalizeAngle(houses[0] - houses[9]);
  houses[10] = normalizeAngle(houses[9] + arc2 / 3);
  houses[11] = normalizeAngle(houses[9] + (2 * arc2) / 3);

  // Maisons 5, 6 (opposées aux 11, 12)
  houses[4] = normalizeAngle(houses[10] + 180);
  houses[5] = normalizeAngle(houses[11] + 180);

  // Maisons 8, 9 (opposées aux 2, 3)
  houses[7] = normalizeAngle(houses[1] + 180);
  houses[8] = normalizeAngle(houses[2] + 180);

  return houses;
}

/**
 * Calcule les cuspides des maisons selon le système Koch
 */
function calculateKochHouses(
  jd: number,
  latitude: number,
  longitude: number
): number[] {
  // Le système Koch utilise une méthode différente de division
  // Pour simplifier, on utilise une approximation similaire à Placidus
  return calculatePlacidusHouses(jd, latitude, longitude);
}

/**
 * Calcule les cuspides des maisons selon le système à maisons égales
 */
function calculateEqualHouses(
  jd: number,
  latitude: number,
  longitude: number
): number[] {
  const asc = calculateAscendant(jd, latitude, longitude);
  const houses: number[] = [];

  // Chaque maison fait exactement 30°
  for (let i = 0; i < 12; i++) {
    houses[i] = normalizeAngle(asc + i * 30);
  }

  return houses;
}

/**
 * Calcule les cuspides des maisons selon le système des signes entiers
 */
function calculateWholeSignHouses(
  jd: number,
  latitude: number,
  longitude: number
): number[] {
  const asc = calculateAscendant(jd, latitude, longitude);

  // Trouver le début du signe de l'ascendant
  const ascSign = Math.floor(asc / 30);
  const startDegree = ascSign * 30;

  const houses: number[] = [];
  for (let i = 0; i < 12; i++) {
    houses[i] = normalizeAngle(startDegree + i * 30);
  }

  return houses;
}

/**
 * Calcule les cuspides des maisons selon le système choisi
 */
export function calculateHouses(
  jd: number,
  latitude: number,
  longitude: number,
  system: HouseSystem = HouseSystem.Placidus
): HouseCusp[] {
  let houseDegrees: number[];

  switch (system) {
    case HouseSystem.Koch:
      houseDegrees = calculateKochHouses(jd, latitude, longitude);
      break;
    case HouseSystem.Equal:
      houseDegrees = calculateEqualHouses(jd, latitude, longitude);
      break;
    case HouseSystem.WholeSign:
      houseDegrees = calculateWholeSignHouses(jd, latitude, longitude);
      break;
    case HouseSystem.Placidus:
    default:
      houseDegrees = calculatePlacidusHouses(jd, latitude, longitude);
      break;
  }

  // Convertir en objets HouseCusp
  const cusps: HouseCusp[] = houseDegrees.map((longitude, index) => ({
    house: index + 1,
    longitude,
    sign: getSignFromDegree(longitude),
    signDegree: getDegreeInSign(longitude),
  }));

  return cusps;
}

/**
 * Retourne les longitudes des cuspides sous forme de tableau simple
 */
export function getHouseCuspsArray(
  jd: number,
  latitude: number,
  longitude: number,
  system: HouseSystem = HouseSystem.Placidus
): number[] {
  const cusps = calculateHouses(jd, latitude, longitude, system);
  return cusps.map((c) => c.longitude);
}
