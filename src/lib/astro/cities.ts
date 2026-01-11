/**
 * Service de recherche de villes avec coordonnées géographiques
 * Utilise l'API GeoNames (gratuite avec inscription)
 * En fallback, utilise une liste de villes françaises principales
 */

import { GeoLocation } from './types';

/**
 * Villes françaises principales avec leurs coordonnées
 */
const FRENCH_CITIES: GeoLocation[] = [
  { name: 'Paris', country: 'France', latitude: 48.8566, longitude: 2.3522, timezone: 'Europe/Paris' },
  { name: 'Marseille', country: 'France', latitude: 43.2965, longitude: 5.3698, timezone: 'Europe/Paris' },
  { name: 'Lyon', country: 'France', latitude: 45.7640, longitude: 4.8357, timezone: 'Europe/Paris' },
  { name: 'Toulouse', country: 'France', latitude: 43.6047, longitude: 1.4442, timezone: 'Europe/Paris' },
  { name: 'Nice', country: 'France', latitude: 43.7102, longitude: 7.2620, timezone: 'Europe/Paris' },
  { name: 'Nantes', country: 'France', latitude: 47.2184, longitude: -1.5536, timezone: 'Europe/Paris' },
  { name: 'Strasbourg', country: 'France', latitude: 48.5734, longitude: 7.7521, timezone: 'Europe/Paris' },
  { name: 'Montpellier', country: 'France', latitude: 43.6108, longitude: 3.8767, timezone: 'Europe/Paris' },
  { name: 'Bordeaux', country: 'France', latitude: 44.8378, longitude: -0.5792, timezone: 'Europe/Paris' },
  { name: 'Lille', country: 'France', latitude: 50.6292, longitude: 3.0573, timezone: 'Europe/Paris' },
  { name: 'Rennes', country: 'France', latitude: 48.1173, longitude: -1.6778, timezone: 'Europe/Paris' },
  { name: 'Reims', country: 'France', latitude: 49.2583, longitude: 4.0317, timezone: 'Europe/Paris' },
  { name: 'Le Havre', country: 'France', latitude: 49.4944, longitude: 0.1079, timezone: 'Europe/Paris' },
  { name: 'Saint-Étienne', country: 'France', latitude: 45.4397, longitude: 4.3872, timezone: 'Europe/Paris' },
  { name: 'Toulon', country: 'France', latitude: 43.1242, longitude: 5.9280, timezone: 'Europe/Paris' },
  { name: 'Grenoble', country: 'France', latitude: 45.1885, longitude: 5.7245, timezone: 'Europe/Paris' },
  { name: 'Dijon', country: 'France', latitude: 47.3220, longitude: 5.0415, timezone: 'Europe/Paris' },
  { name: 'Angers', country: 'France', latitude: 47.4784, longitude: -0.5632, timezone: 'Europe/Paris' },
  { name: 'Nîmes', country: 'France', latitude: 43.8367, longitude: 4.3601, timezone: 'Europe/Paris' },
  { name: 'Aix-en-Provence', country: 'France', latitude: 43.5297, longitude: 5.4474, timezone: 'Europe/Paris' },
  { name: 'Brest', country: 'France', latitude: 48.3904, longitude: -4.4861, timezone: 'Europe/Paris' },
  { name: 'Le Mans', country: 'France', latitude: 48.0061, longitude: 0.1996, timezone: 'Europe/Paris' },
  { name: 'Amiens', country: 'France', latitude: 49.8941, longitude: 2.2958, timezone: 'Europe/Paris' },
  { name: 'Tours', country: 'France', latitude: 47.3941, longitude: 0.6848, timezone: 'Europe/Paris' },
  { name: 'Limoges', country: 'France', latitude: 45.8336, longitude: 1.2611, timezone: 'Europe/Paris' },
  { name: 'Clermont-Ferrand', country: 'France', latitude: 45.7772, longitude: 3.0870, timezone: 'Europe/Paris' },
  { name: 'Villeurbanne', country: 'France', latitude: 45.7676, longitude: 4.8810, timezone: 'Europe/Paris' },
  { name: 'Besançon', country: 'France', latitude: 47.2378, longitude: 6.0241, timezone: 'Europe/Paris' },
  { name: 'Orléans', country: 'France', latitude: 47.9029, longitude: 1.9093, timezone: 'Europe/Paris' },
  { name: 'Metz', country: 'France', latitude: 49.1193, longitude: 6.1757, timezone: 'Europe/Paris' },
  { name: 'Rouen', country: 'France', latitude: 49.4432, longitude: 1.0999, timezone: 'Europe/Paris' },
  { name: 'Mulhouse', country: 'France', latitude: 47.7508, longitude: 7.3359, timezone: 'Europe/Paris' },
  { name: 'Perpignan', country: 'France', latitude: 42.6887, longitude: 2.8948, timezone: 'Europe/Paris' },
  { name: 'Caen', country: 'France', latitude: 49.1829, longitude: -0.3707, timezone: 'Europe/Paris' },
  { name: 'Nancy', country: 'France', latitude: 48.6921, longitude: 6.1844, timezone: 'Europe/Paris' },
  { name: 'Argenteuil', country: 'France', latitude: 48.9472, longitude: 2.2467, timezone: 'Europe/Paris' },
  { name: 'Saint-Denis', country: 'France', latitude: 48.9362, longitude: 2.3574, timezone: 'Europe/Paris' },
  { name: 'Roubaix', country: 'France', latitude: 50.6942, longitude: 3.1746, timezone: 'Europe/Paris' },
  { name: 'Tourcoing', country: 'France', latitude: 50.7262, longitude: 3.1612, timezone: 'Europe/Paris' },
  { name: 'Montreuil', country: 'France', latitude: 48.8638, longitude: 2.4483, timezone: 'Europe/Paris' },
  { name: 'Avignon', country: 'France', latitude: 43.9493, longitude: 4.8055, timezone: 'Europe/Paris' },
  { name: 'Poitiers', country: 'France', latitude: 46.5802, longitude: 0.3404, timezone: 'Europe/Paris' },
  { name: 'Versailles', country: 'France', latitude: 48.8014, longitude: 2.1301, timezone: 'Europe/Paris' },
  { name: 'Créteil', country: 'France', latitude: 48.7900, longitude: 2.4628, timezone: 'Europe/Paris' },
  { name: 'Pau', country: 'France', latitude: 43.2951, longitude: -0.3708, timezone: 'Europe/Paris' },
  { name: 'La Rochelle', country: 'France', latitude: 46.1591, longitude: -1.1520, timezone: 'Europe/Paris' },
  { name: 'Calais', country: 'France', latitude: 50.9513, longitude: 1.8587, timezone: 'Europe/Paris' },
  { name: 'Béziers', country: 'France', latitude: 43.3444, longitude: 3.2192, timezone: 'Europe/Paris' },
  { name: 'Dunkerque', country: 'France', latitude: 51.0343, longitude: 2.3768, timezone: 'Europe/Paris' },
];

/**
 * Villes internationales principales
 */
const INTERNATIONAL_CITIES: GeoLocation[] = [
  { name: 'New York', country: 'États-Unis', latitude: 40.7128, longitude: -74.0060, timezone: 'America/New_York' },
  { name: 'Los Angeles', country: 'États-Unis', latitude: 34.0522, longitude: -118.2437, timezone: 'America/Los_Angeles' },
  { name: 'Londres', country: 'Royaume-Uni', latitude: 51.5074, longitude: -0.1278, timezone: 'Europe/London' },
  { name: 'Berlin', country: 'Allemagne', latitude: 52.5200, longitude: 13.4050, timezone: 'Europe/Berlin' },
  { name: 'Madrid', country: 'Espagne', latitude: 40.4168, longitude: -3.7038, timezone: 'Europe/Madrid' },
  { name: 'Rome', country: 'Italie', latitude: 41.9028, longitude: 12.4964, timezone: 'Europe/Rome' },
  { name: 'Bruxelles', country: 'Belgique', latitude: 50.8503, longitude: 4.3517, timezone: 'Europe/Brussels' },
  { name: 'Amsterdam', country: 'Pays-Bas', latitude: 52.3676, longitude: 4.9041, timezone: 'Europe/Amsterdam' },
  { name: 'Lisbonne', country: 'Portugal', latitude: 38.7223, longitude: -9.1393, timezone: 'Europe/Lisbon' },
  { name: 'Genève', country: 'Suisse', latitude: 46.2044, longitude: 6.1432, timezone: 'Europe/Zurich' },
  { name: 'Montréal', country: 'Canada', latitude: 45.5017, longitude: -73.5673, timezone: 'America/Montreal' },
  { name: 'Tokyo', country: 'Japon', latitude: 35.6762, longitude: 139.6503, timezone: 'Asia/Tokyo' },
  { name: 'Sydney', country: 'Australie', latitude: -33.8688, longitude: 151.2093, timezone: 'Australia/Sydney' },
  { name: 'Dubaï', country: 'Émirats Arabes Unis', latitude: 25.2048, longitude: 55.2708, timezone: 'Asia/Dubai' },
  { name: 'Casablanca', country: 'Maroc', latitude: 33.5731, longitude: -7.5898, timezone: 'Africa/Casablanca' },
  { name: 'Dakar', country: 'Sénégal', latitude: 14.7167, longitude: -17.4677, timezone: 'Africa/Dakar' },
  { name: 'Abidjan', country: 'Côte d\'Ivoire', latitude: 5.3600, longitude: -4.0083, timezone: 'Africa/Abidjan' },
  { name: 'Tunis', country: 'Tunisie', latitude: 36.8065, longitude: 10.1815, timezone: 'Africa/Tunis' },
  { name: 'Alger', country: 'Algérie', latitude: 36.7538, longitude: 3.0588, timezone: 'Africa/Algiers' },
  { name: 'Le Caire', country: 'Égypte', latitude: 30.0444, longitude: 31.2357, timezone: 'Africa/Cairo' },
];

const ALL_CITIES = [...FRENCH_CITIES, ...INTERNATIONAL_CITIES];

/**
 * Recherche de villes par nom (recherche locale)
 */
export function searchCitiesLocal(query: string, limit: number = 10): GeoLocation[] {
  if (!query || query.length < 2) return [];

  const normalizedQuery = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const results = ALL_CITIES.filter((city) => {
    if (!city.name) return false;
    const normalizedName = city.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return normalizedName.includes(normalizedQuery);
  });

  // Trier par pertinence (commence par la requête en premier)
  results.sort((a, b) => {
    const aName = a.name || '';
    const bName = b.name || '';
    const aStarts = aName.toLowerCase().startsWith(query.toLowerCase());
    const bStarts = bName.toLowerCase().startsWith(query.toLowerCase());
    if (aStarts && !bStarts) return -1;
    if (!aStarts && bStarts) return 1;
    return aName.localeCompare(bName);
  });

  return results.slice(0, limit);
}

/**
 * Recherche de villes via l'API GeoNames
 * Nécessite une clé API (username) GeoNames
 */
export async function searchCitiesGeoNames(
  query: string,
  limit: number = 10,
  username: string = 'demo'
): Promise<GeoLocation[]> {
  if (!query || query.length < 2) return [];

  try {
    const url = new URL('https://secure.geonames.org/searchJSON');
    url.searchParams.set('q', query);
    url.searchParams.set('maxRows', limit.toString());
    url.searchParams.set('username', username);
    url.searchParams.set('style', 'MEDIUM');
    url.searchParams.set('featureClass', 'P'); // Places/cities

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error('GeoNames API error');
    }

    const data = await response.json();

    if (!data.geonames || !Array.isArray(data.geonames)) {
      return [];
    }

    return data.geonames.map((city: {
      name: string;
      countryName: string;
      lat: string;
      lng: string;
      timezone?: { timeZoneId: string };
    }) => ({
      name: city.name,
      country: city.countryName,
      latitude: parseFloat(city.lat),
      longitude: parseFloat(city.lng),
      timezone: city.timezone?.timeZoneId || 'UTC',
    }));
  } catch (error) {
    console.error('GeoNames search failed, falling back to local:', error);
    return searchCitiesLocal(query, limit);
  }
}

/**
 * Recherche de villes avec fallback
 */
export async function searchCities(
  query: string,
  limit: number = 10
): Promise<GeoLocation[]> {
  // D'abord essayer la recherche locale (plus rapide)
  const localResults = searchCitiesLocal(query, limit);

  // Si on a suffisamment de résultats locaux, les retourner
  if (localResults.length >= 5) {
    return localResults;
  }

  // Sinon, utiliser GeoNames (avec le username par défaut pour le dev)
  // En production, utiliser une vraie clé API
  return searchCitiesGeoNames(query, limit);
}

/**
 * Obtenir une ville par son nom exact
 */
export function getCityByName(name: string): GeoLocation | undefined {
  return ALL_CITIES.find(
    (city) => city.name && city.name.toLowerCase() === name.toLowerCase()
  );
}

/**
 * Déterminer le fuseau horaire à partir des coordonnées
 * (approximation basée sur la longitude)
 */
export function estimateTimezone(longitude: number): string {
  const offset = Math.round(longitude / 15);
  if (offset === 0) return 'UTC';
  if (offset > 0) return `Etc/GMT-${offset}`;
  return `Etc/GMT+${Math.abs(offset)}`;
}
