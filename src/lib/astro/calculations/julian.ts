/**
 * Calculs de dates juliennes
 * Base de tous les calculs astronomiques
 */

/**
 * Convertit une date en jour julien
 * @param date - Date JavaScript
 * @returns Jour julien (nombre décimal)
 */
export function dateToJulianDay(date: Date): number {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const hour = date.getUTCHours();
  const minute = date.getUTCMinutes();
  const second = date.getUTCSeconds();

  // Fraction du jour
  const dayFraction = (hour + minute / 60 + second / 3600) / 24;

  // Ajustement pour les mois janvier et février
  let y = year;
  let m = month;
  if (month <= 2) {
    y = year - 1;
    m = month + 12;
  }

  // Calcul du jour julien (formule de Meeus)
  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);

  const jd =
    Math.floor(365.25 * (y + 4716)) +
    Math.floor(30.6001 * (m + 1)) +
    day +
    dayFraction +
    b -
    1524.5;

  return jd;
}

/**
 * Convertit un jour julien en date JavaScript
 * @param jd - Jour julien
 * @returns Date JavaScript
 */
export function julianDayToDate(jd: number): Date {
  const z = Math.floor(jd + 0.5);
  const f = jd + 0.5 - z;

  let a: number;
  if (z < 2299161) {
    a = z;
  } else {
    const alpha = Math.floor((z - 1867216.25) / 36524.25);
    a = z + 1 + alpha - Math.floor(alpha / 4);
  }

  const b = a + 1524;
  const c = Math.floor((b - 122.1) / 365.25);
  const d = Math.floor(365.25 * c);
  const e = Math.floor((b - d) / 30.6001);

  const day = b - d - Math.floor(30.6001 * e) + f;
  const month = e < 14 ? e - 1 : e - 13;
  const year = month > 2 ? c - 4716 : c - 4715;

  const dayInt = Math.floor(day);
  const dayFrac = day - dayInt;

  const hours = dayFrac * 24;
  const hour = Math.floor(hours);
  const minutes = (hours - hour) * 60;
  const minute = Math.floor(minutes);
  const seconds = (minutes - minute) * 60;
  const second = Math.floor(seconds);

  return new Date(Date.UTC(year, month - 1, dayInt, hour, minute, second));
}

/**
 * Calcule le temps julien (siècles juliens depuis J2000.0)
 * @param jd - Jour julien
 * @returns Siècles juliens depuis J2000.0
 */
export function julianCentury(jd: number): number {
  return (jd - 2451545.0) / 36525.0;
}

/**
 * Calcule le temps sidéral à Greenwich (GMST)
 * @param jd - Jour julien
 * @returns Temps sidéral en degrés (0-360)
 */
export function greenwichSiderealTime(jd: number): number {
  const T = julianCentury(jd);

  // Formule de l'IAU pour le GMST
  let gmst =
    280.46061837 +
    360.98564736629 * (jd - 2451545.0) +
    0.000387933 * T * T -
    (T * T * T) / 38710000;

  // Normaliser entre 0 et 360
  gmst = ((gmst % 360) + 360) % 360;

  return gmst;
}

/**
 * Calcule le temps sidéral local (LST)
 * @param jd - Jour julien
 * @param longitude - Longitude en degrés (positif vers l'Est)
 * @returns Temps sidéral local en degrés (0-360)
 */
export function localSiderealTime(jd: number, longitude: number): number {
  const gmst = greenwichSiderealTime(jd);
  let lst = gmst + longitude;
  lst = ((lst % 360) + 360) % 360;
  return lst;
}

/**
 * Calcule l'obliquité de l'écliptique
 * @param jd - Jour julien
 * @returns Obliquité en degrés
 */
export function obliquityOfEcliptic(jd: number): number {
  const T = julianCentury(jd);

  // Formule simplifiée de l'obliquité moyenne
  const epsilon =
    23.439291111 -
    0.0130042 * T -
    0.00000016 * T * T +
    0.000000504 * T * T * T;

  return epsilon;
}

/**
 * Convertit des coordonnées écliptiques en équatoriales
 * @param longitude - Longitude écliptique en degrés
 * @param latitude - Latitude écliptique en degrés
 * @param obliquity - Obliquité de l'écliptique en degrés
 * @returns { ra: ascension droite en degrés, dec: déclinaison en degrés }
 */
export function eclipticToEquatorial(
  longitude: number,
  latitude: number,
  obliquity: number
): { ra: number; dec: number } {
  const deg2rad = Math.PI / 180;
  const rad2deg = 180 / Math.PI;

  const L = longitude * deg2rad;
  const B = latitude * deg2rad;
  const eps = obliquity * deg2rad;

  const sinDec = Math.sin(B) * Math.cos(eps) + Math.cos(B) * Math.sin(eps) * Math.sin(L);
  const dec = Math.asin(sinDec) * rad2deg;

  const y = Math.sin(L) * Math.cos(eps) - Math.tan(B) * Math.sin(eps);
  const x = Math.cos(L);
  let ra = Math.atan2(y, x) * rad2deg;
  ra = ((ra % 360) + 360) % 360;

  return { ra, dec };
}
