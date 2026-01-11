/**
 * Génération de thèmes astraux complets
 */

import {
  NatalChart,
  BirthData,
  HouseSystem,
  Planet,
  PlanetPosition,
} from './types';
import { dateToJulianDay } from './calculations/julian';
import { calculatePlanetPositions } from './calculations/planets';
import { calculateHouses, calculateAscendant, calculateMidheaven, getHouseCuspsArray } from './calculations/houses';
import { calculateAspects } from './calculations/aspects';
import { getSignFromDegree, getDegreeInSign } from './constants';

/**
 * Parse une chaîne de temps HH:mm en heures décimales
 */
function parseTime(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours + minutes / 60;
}

/**
 * Crée une date UTC à partir des données de naissance
 */
function createBirthDate(
  date: Date,
  time: string,
  timezone: string
): Date {
  const timeDecimal = parseTime(time);
  const hours = Math.floor(timeDecimal);
  const minutes = Math.round((timeDecimal - hours) * 60);

  // Créer la date en heure locale
  const localDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hours,
    minutes,
    0
  );

  // Pour l'instant, on assume que la timezone est déjà prise en compte
  // TODO: Intégrer une librairie de timezone comme date-fns-tz
  return localDate;
}

/**
 * Génère un thème natal complet
 */
export function generateNatalChart(
  birthData: BirthData,
  houseSystem: HouseSystem = HouseSystem.Placidus
): NatalChart {
  // Créer la date de naissance avec l'heure
  const birthDateTime = createBirthDate(
    birthData.date,
    birthData.time,
    birthData.location.timezone
  );

  // Calculer le jour julien
  const jd = dateToJulianDay(birthDateTime);

  // Calculer les maisons
  const houses = calculateHouses(
    jd,
    birthData.location.latitude,
    birthData.location.longitude,
    houseSystem
  );

  // Obtenir les cuspides comme tableau pour le calcul des planètes
  const houseCusps = getHouseCuspsArray(
    jd,
    birthData.location.latitude,
    birthData.location.longitude,
    houseSystem
  );

  // Calculer les positions planétaires
  const planets = calculatePlanetPositions(jd, houseCusps);

  // Ajouter l'Ascendant et le MC comme "planètes"
  const asc = calculateAscendant(jd, birthData.location.latitude, birthData.location.longitude);
  const mc = calculateMidheaven(jd, birthData.location.longitude);

  planets.push({
    planet: Planet.Ascendant,
    longitude: asc,
    latitude: 0,
    speed: 0,
    retrograde: false,
    sign: getSignFromDegree(asc),
    signDegree: getDegreeInSign(asc),
    house: 1,
  });

  planets.push({
    planet: Planet.Midheaven,
    longitude: mc,
    latitude: 0,
    speed: 0,
    retrograde: false,
    sign: getSignFromDegree(mc),
    signDegree: getDegreeInSign(mc),
    house: 10,
  });

  // Calculer les aspects
  const aspects = calculateAspects(planets, false);

  return {
    birthData,
    planets,
    houses,
    aspects,
    houseSystem,
    calculatedAt: new Date(),
  };
}

/**
 * Obtient la position d'une planète spécifique dans le thème
 */
export function getPlanetPosition(
  chart: NatalChart,
  planet: Planet
): PlanetPosition | undefined {
  return chart.planets.find((p) => p.planet === planet);
}

/**
 * Obtient le signe solaire
 */
export function getSunSign(chart: NatalChart): string {
  const sun = getPlanetPosition(chart, Planet.Sun);
  return sun?.sign || '';
}

/**
 * Obtient le signe lunaire
 */
export function getMoonSign(chart: NatalChart): string {
  const moon = getPlanetPosition(chart, Planet.Moon);
  return moon?.sign || '';
}

/**
 * Obtient l'ascendant
 */
export function getAscendantSign(chart: NatalChart): string {
  const asc = getPlanetPosition(chart, Planet.Ascendant);
  return asc?.sign || '';
}

/**
 * Calcule les dominantes du thème
 */
export function calculateDominants(chart: NatalChart): {
  elements: Record<string, number>;
  modalities: Record<string, number>;
  planets: Array<{ planet: Planet; score: number }>;
} {
  const elements: Record<string, number> = {
    fire: 0,
    earth: 0,
    air: 0,
    water: 0,
  };

  const modalities: Record<string, number> = {
    cardinal: 0,
    fixed: 0,
    mutable: 0,
  };

  const planetScores: Record<Planet, number> = {} as Record<Planet, number>;

  // Mapper les signes aux éléments et modalités
  const signElements: Record<string, string> = {
    aries: 'fire', taurus: 'earth', gemini: 'air', cancer: 'water',
    leo: 'fire', virgo: 'earth', libra: 'air', scorpio: 'water',
    sagittarius: 'fire', capricorn: 'earth', aquarius: 'air', pisces: 'water',
  };

  const signModalities: Record<string, string> = {
    aries: 'cardinal', taurus: 'fixed', gemini: 'mutable', cancer: 'cardinal',
    leo: 'fixed', virgo: 'mutable', libra: 'cardinal', scorpio: 'fixed',
    sagittarius: 'mutable', capricorn: 'cardinal', aquarius: 'fixed', pisces: 'mutable',
  };

  // Poids des planètes
  const planetWeights: Partial<Record<Planet, number>> = {
    [Planet.Sun]: 4,
    [Planet.Moon]: 4,
    [Planet.Ascendant]: 3,
    [Planet.Mercury]: 2,
    [Planet.Venus]: 2,
    [Planet.Mars]: 2,
    [Planet.Jupiter]: 1.5,
    [Planet.Saturn]: 1.5,
    [Planet.Uranus]: 1,
    [Planet.Neptune]: 1,
    [Planet.Pluto]: 1,
    [Planet.Midheaven]: 2,
  };

  for (const pos of chart.planets) {
    const weight = planetWeights[pos.planet] || 1;
    const element = signElements[pos.sign];
    const modality = signModalities[pos.sign];

    if (element) elements[element] += weight;
    if (modality) modalities[modality] += weight;

    // Score de la planète basé sur les aspects
    const planetAspects = chart.aspects.filter(
      (a) => a.planet1 === pos.planet || a.planet2 === pos.planet
    );
    planetScores[pos.planet] = (planetScores[pos.planet] || 0) + planetAspects.length * weight;
  }

  // Trier les planètes par score
  const sortedPlanets = Object.entries(planetScores)
    .map(([planet, score]) => ({ planet: planet as Planet, score }))
    .sort((a, b) => b.score - a.score);

  return { elements, modalities, planets: sortedPlanets };
}

/**
 * Génère un résumé textuel du thème
 */
export function generateChartSummary(chart: NatalChart): string {
  const sun = getPlanetPosition(chart, Planet.Sun);
  const moon = getPlanetPosition(chart, Planet.Moon);
  const asc = getPlanetPosition(chart, Planet.Ascendant);

  const lines: string[] = [];

  if (sun) {
    lines.push(`Soleil en ${sun.sign} (Maison ${sun.house})`);
  }
  if (moon) {
    lines.push(`Lune en ${moon.sign} (Maison ${moon.house})`);
  }
  if (asc) {
    lines.push(`Ascendant ${asc.sign}`);
  }

  // Ajouter les planètes rétrogrades
  const retrogrades = chart.planets.filter((p) => p.retrograde && p.planet !== Planet.NorthNode && p.planet !== Planet.SouthNode);
  if (retrogrades.length > 0) {
    const retroNames = retrogrades.map((p) => p.planet).join(', ');
    lines.push(`Planètes rétrogrades: ${retroNames}`);
  }

  return lines.join('\n');
}
