'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MoonPhaseWidget } from '@/components/wellness';
import { calculateMoonPhase, getUpcomingPhases } from '@/lib/api';
import { MoonPhase, MoonPhaseName } from '@/lib/api/types';
import { MOON_PHASES } from '@/lib/api/constants';

export default function AstrologiePage() {
  const [moonPhase, setMoonPhase] = useState<MoonPhase | null>(null);
  const [upcomingPhases, setUpcomingPhases] = useState<{ phase: MoonPhaseName; date: Date }[]>([]);

  useEffect(() => {
    const moon = calculateMoonPhase();
    setMoonPhase(moon);

    const upcoming = getUpcomingPhases();
    setUpcomingPhases(upcoming);
  }, []);

  const sections = [
    {
      title: 'Thème Natal',
      description: 'Calculez votre carte du ciel au moment de votre naissance',
      icon: '🌟',
      href: '/astrologie/theme-natal',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      title: 'Calendrier Lunaire',
      description: 'Suivez les phases de la lune et leurs influences',
      icon: '🌙',
      href: '/astrologie/calendrier-lunaire',
      color: 'from-indigo-500 to-blue-500',
    },
    {
      title: 'Transits Planétaires',
      description: 'Découvrez les positions actuelles des planètes',
      icon: '🪐',
      href: '/astrologie/transits',
      color: 'from-blue-500 to-cyan-500',
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3">
            Astrologie
          </h1>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Explorez les mystères du cosmos. Découvrez votre thème natal, suivez les cycles lunaires
            et comprenez l'influence des astres sur votre vie.
          </p>
        </div>

        {/* Phase lunaire actuelle */}
        {moonPhase && (
          <div className="max-w-md mx-auto mb-12">
            <MoonPhaseWidget moonPhase={moonPhase} variant="full" showRituals />
          </div>
        )}

        {/* Prochaines phases */}
        {upcomingPhases.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
            <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-4 text-center">
              Prochaines phases lunaires
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {upcomingPhases.map((phase, index) => (
                <div key={index} className="text-center">
                  <span className="text-3xl block mb-2">{MOON_PHASES[phase.phase].emoji}</span>
                  <p className="font-medium text-sm text-[var(--color-text-primary)]">
                    {MOON_PHASES[phase.phase].phaseFr}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    {phase.date.toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sections principales */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className={`bg-gradient-to-r ${section.color} p-6 text-white`}>
                <span className="text-4xl block mb-3">{section.icon}</span>
                <h3 className="text-xl font-bold mb-1">{section.title}</h3>
              </div>
              <div className="p-6">
                <p className="text-[var(--color-text-secondary)] mb-4">
                  {section.description}
                </p>
                <span className="text-[var(--color-primary)] font-medium group-hover:underline">
                  Découvrir →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Informations sur l'astrologie */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6 text-center">
            Comprendre l'Astrologie
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                <span>🌟</span> Le Thème Natal
              </h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                Votre thème natal est une photographie du ciel au moment exact de votre naissance.
                Il révèle vos forces, vos défis, et votre chemin de vie unique. Chaque planète
                représente une facette de votre personnalité.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                <span>🌙</span> Les Cycles Lunaires
              </h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                La Lune influence nos émotions et notre énergie. Comprendre ses phases permet
                de mieux planifier nos actions : nouveaux projets à la nouvelle lune,
                accomplissements à la pleine lune.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                <span>☀️</span> Les Signes Solaires
              </h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                Votre signe solaire (votre "signe" habituel) représente votre essence,
                votre identité fondamentale. C'est la position du Soleil au moment de votre naissance.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                <span>⬆️</span> L'Ascendant
              </h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                L'ascendant est le masque que vous présentez au monde. Il influence votre apparence,
                votre première impression, et votre approche de la vie. Il nécessite l'heure exacte de naissance.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/astrologie/theme-natal"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              <span>Calculer mon thème natal</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
