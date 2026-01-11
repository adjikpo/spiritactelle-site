'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MoonPhaseWidget } from '@/components/wellness';
import { BackButton } from '@/components/layout';
import { calculateMoonPhase, getUpcomingPhases } from '@/lib/api';
import { MoonPhase, UpcomingMoonPhase } from '@/lib/api/types';
import { ZODIAC_SIGNS } from '@/lib/api/constants';

// Données des planètes et leurs significations
const PLANETS = {
  sun: {
    name: 'Soleil',
    symbol: '☉',
    color: '#FFD700',
    meaning: 'Vitalité, ego, identité fondamentale',
    cycle: '1 an',
  },
  moon: {
    name: 'Lune',
    symbol: '☽',
    color: '#C0C0C0',
    meaning: 'Émotions, intuition, besoins émotionnels',
    cycle: '28 jours',
  },
  mercury: {
    name: 'Mercure',
    symbol: '☿',
    color: '#87CEEB',
    meaning: 'Communication, intellect, échanges',
    cycle: '88 jours',
  },
  venus: {
    name: 'Vénus',
    symbol: '♀',
    color: '#FFB6C1',
    meaning: 'Amour, beauté, harmonie, valeurs',
    cycle: '225 jours',
  },
  mars: {
    name: 'Mars',
    symbol: '♂',
    color: '#FF6347',
    meaning: 'Action, énergie, courage, désir',
    cycle: '687 jours',
  },
  jupiter: {
    name: 'Jupiter',
    symbol: '♃',
    color: '#FFA500',
    meaning: 'Expansion, chance, sagesse, croissance',
    cycle: '12 ans',
  },
  saturn: {
    name: 'Saturne',
    symbol: '♄',
    color: '#8B4513',
    meaning: 'Structure, responsabilité, karma, temps',
    cycle: '29 ans',
  },
  uranus: {
    name: 'Uranus',
    symbol: '♅',
    color: '#00CED1',
    meaning: 'Révolution, originalité, libération',
    cycle: '84 ans',
  },
  neptune: {
    name: 'Neptune',
    symbol: '♆',
    color: '#4169E1',
    meaning: 'Spiritualité, intuition, rêves, illusions',
    cycle: '165 ans',
  },
  pluto: {
    name: 'Pluton',
    symbol: '♇',
    color: '#800080',
    meaning: 'Transformation, pouvoir, renaissance',
    cycle: '248 ans',
  },
};

// Calcul simplifié de la position zodiacale approximative du Soleil
function getSunSign(date: Date): string {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'aquarius';
  return 'pisces';
}

// Transits actuels simulés (dans une vraie app, calculés via éphémérides)
function getCurrentTransits(date: Date) {
  const sunSign = getSunSign(date);
  const moonPhase = calculateMoonPhase(date);

  // Simulation de positions planétaires basées sur la date
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const signs = Object.keys(ZODIAC_SIGNS);

  // Utiliser l'âge de la lune pour déterminer le signe (approximation)
  const moonSignIndex = Math.floor(moonPhase.age) % 12;

  return [
    { planet: 'sun', sign: sunSign, retrograde: false },
    { planet: 'moon', sign: signs[moonSignIndex], retrograde: false },
    { planet: 'mercury', sign: signs[(dayOfYear * 4) % 12], retrograde: dayOfYear % 116 > 93 },
    { planet: 'venus', sign: signs[(dayOfYear * 1.6) % 12 | 0], retrograde: false },
    { planet: 'mars', sign: signs[(dayOfYear * 0.53) % 12 | 0], retrograde: false },
    { planet: 'jupiter', sign: signs[9], retrograde: false }, // Capricorne pour 2024
    { planet: 'saturn', sign: signs[10], retrograde: false }, // Verseau
    { planet: 'uranus', sign: signs[1], retrograde: true }, // Taureau
    { planet: 'neptune', sign: signs[11], retrograde: false }, // Poissons
    { planet: 'pluto', sign: signs[9], retrograde: false }, // Capricorne
  ];
}

export default function TransitsPage() {
  const [currentMoonPhase, setCurrentMoonPhase] = useState<MoonPhase | null>(null);
  const [transits, setTransits] = useState<ReturnType<typeof getCurrentTransits>>([]);
  const [upcomingPhases, setUpcomingPhases] = useState<UpcomingMoonPhase[]>([]);

  useEffect(() => {
    const today = new Date();
    setCurrentMoonPhase(calculateMoonPhase(today));
    setTransits(getCurrentTransits(today));
    setUpcomingPhases(getUpcomingPhases(4));
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Retour */}
        <div className="mb-6">
          <BackButton href="/astrologie" label="Astrologie" />
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3">
            Transits Planétaires
          </h1>
          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Découvrez les positions actuelles des planètes et leur influence sur votre vie quotidienne.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Transits actuels */}
          <div className="lg:col-span-2 space-y-6">
            {/* Grille des planètes */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6">
                Positions Planétaires Actuelles
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {transits.map((transit) => {
                  const planet = PLANETS[transit.planet as keyof typeof PLANETS];
                  const sign = ZODIAC_SIGNS[transit.sign as keyof typeof ZODIAC_SIGNS];

                  return (
                    <div
                      key={transit.planet}
                      className="flex items-center gap-4 p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]"
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                        style={{ backgroundColor: `${planet.color}20`, color: planet.color }}
                      >
                        {planet.symbol}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-[var(--color-text-primary)]">
                            {planet.name}
                          </span>
                          {transit.retrograde && (
                            <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full">
                              Rétrograde
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-[var(--color-text-secondary)]">
                          <span>en</span>
                          <span style={{ color: sign?.color }}>{sign?.emoji}</span>
                          <span>{sign?.nameFr}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Signification des planètes */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6">
                Signification des Planètes
              </h2>
              <div className="space-y-4">
                {Object.entries(PLANETS).map(([key, planet]) => (
                  <div
                    key={key}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-[var(--color-bg-secondary)] transition-colors"
                  >
                    <span className="text-2xl" style={{ color: planet.color }}>
                      {planet.symbol}
                    </span>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-medium text-[var(--color-text-primary)]">
                          {planet.name}
                        </h3>
                        <span className="text-xs text-[var(--color-text-muted)]">
                          Cycle: {planet.cycle}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--color-text-secondary)]">
                        {planet.meaning}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Phase lunaire actuelle */}
            {currentMoonPhase && (
              <MoonPhaseWidget moonPhase={currentMoonPhase} variant="full" />
            )}

            {/* Prochaines phases */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-[var(--color-text-primary)] mb-4">
                Prochaines Phases Lunaires
              </h3>
              <div className="space-y-3">
                {upcomingPhases.map((phase, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--color-bg-secondary)]"
                  >
                    <span className="text-2xl">{phase.emoji}</span>
                    <div>
                      <p className="font-medium text-sm text-[var(--color-text-primary)]">
                        {phase.phaseFr}
                      </p>
                      <p className="text-xs text-[var(--color-text-muted)]">
                        {phase.date.toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rétrogrades actives */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-100">
              <h3 className="font-bold text-red-800 mb-3">
                Rétrogrades Actives
              </h3>
              <div className="space-y-2">
                {transits.filter((t) => t.retrograde).length > 0 ? (
                  transits
                    .filter((t) => t.retrograde)
                    .map((transit) => {
                      const planet = PLANETS[transit.planet as keyof typeof PLANETS];
                      return (
                        <div key={transit.planet} className="flex items-center gap-2">
                          <span style={{ color: planet.color }}>{planet.symbol}</span>
                          <span className="text-red-700">{planet.name}</span>
                        </div>
                      );
                    })
                ) : (
                  <p className="text-red-700 text-sm">
                    Aucune planète majeure en rétrograde actuellement.
                  </p>
                )}
              </div>
              <p className="mt-3 text-xs text-red-600">
                Les rétrogrades invitent à la réflexion et à la révision des domaines concernés.
              </p>
            </div>

            {/* Lien vers le calendrier */}
            <Link
              href="/astrologie/calendrier-lunaire"
              className="block bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-6 hover:opacity-90 transition-opacity"
            >
              <h3 className="font-bold mb-2">
                Calendrier Lunaire
              </h3>
              <p className="text-sm text-indigo-100">
                Consultez le calendrier complet des phases lunaires
              </p>
            </Link>
          </div>
        </div>

        {/* Section éducative */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6">
            Comprendre les Transits
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-xl p-5">
              <h3 className="font-medium text-blue-800 mb-2">
                Qu'est-ce qu'un transit ?
              </h3>
              <p className="text-sm text-blue-700">
                Un transit est le passage d'une planète dans un signe du zodiaque.
                Ces mouvements influencent l'énergie collective et personnelle.
              </p>
            </div>
            <div className="bg-purple-50 rounded-xl p-5">
              <h3 className="font-medium text-purple-800 mb-2">
                Les rétrogrades
              </h3>
              <p className="text-sm text-purple-700">
                Quand une planète semble reculer dans le ciel, c'est une période
                de révision et d'introspection liée aux thèmes de cette planète.
              </p>
            </div>
            <div className="bg-green-50 rounded-xl p-5">
              <h3 className="font-medium text-green-800 mb-2">
                Impact personnel
              </h3>
              <p className="text-sm text-green-700">
                Les transits interagissent avec votre thème natal, créant des
                opportunités de croissance et des défis à surmonter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
