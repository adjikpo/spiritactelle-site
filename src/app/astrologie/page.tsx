'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MoonPhaseWidget } from '@/components/wellness';
import { calculateMoonPhase, getUpcomingPhases } from '@/lib/api';
import { MoonPhase, MoonPhaseName } from '@/lib/api/types';
import { MOON_PHASES } from '@/lib/api/constants';
import { moonPhaseIcons } from '@/components/icons';

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
      href: '/astrologie/theme-natal',
    },
    {
      title: 'Calendrier Lunaire',
      description: 'Suivez les phases de la lune et leurs influences',
      href: '/astrologie/calendrier-lunaire',
    },
    {
      title: 'Transits Planétaires',
      description: 'Découvrez les positions actuelles des planètes',
      href: '/astrologie/transits',
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
              {upcomingPhases.map((phase, index) => {
                const PhaseIcon = moonPhaseIcons[phase.phase];
                return (
                <div key={index} className="text-center">
                  <span className="flex justify-center mb-2">
                    {PhaseIcon ? <PhaseIcon size={36} className="text-indigo-600" /> : null}
                  </span>
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
                );
              })}
            </div>
          </div>
        )}

        {/* Sections principales */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="service-card p-6 h-full group"
            >
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">{section.title}</h3>
              <p className="text-[var(--color-text-secondary)] mb-4">
                {section.description}
              </p>
              <span className="text-[var(--color-primary)] font-medium group-hover:underline">
                Découvrir →
              </span>
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
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-3">
                Le Thème Natal
              </h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                Votre thème natal est une photographie du ciel au moment exact de votre naissance.
                Il révèle vos forces, vos défis, et votre chemin de vie unique. Chaque planète
                représente une facette de votre personnalité.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-3">
                Les Cycles Lunaires
              </h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                La Lune influence nos émotions et notre énergie. Comprendre ses phases permet
                de mieux planifier nos actions : nouveaux projets à la nouvelle lune,
                accomplissements à la pleine lune.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-3">
                Les Signes Solaires
              </h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                Votre signe solaire (votre "signe" habituel) représente votre essence,
                votre identité fondamentale. C'est la position du Soleil au moment de votre naissance.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-3">
                L'Ascendant
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
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-800 to-indigo-900 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
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
