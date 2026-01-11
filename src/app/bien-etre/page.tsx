'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { QuoteCard, MoonPhaseWidget, AffirmationCard } from '@/components/wellness';
import { fetchQuoteOfTheDay, fetchAffirmation, calculateMoonPhase } from '@/lib/api';
import { Quote, Affirmation, MoonPhase } from '@/lib/api/types';

const WELLNESS_SECTIONS = [
  {
    id: 'citations',
    title: 'Citations Inspirantes',
    description: 'Des pensées profondes pour nourrir votre âme',
    emoji: '💭',
    href: '/bien-etre/citations',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'affirmations',
    title: 'Affirmations Positives',
    description: 'Reprogrammez votre esprit avec des pensées positives',
    emoji: '✨',
    href: '/bien-etre/affirmations',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    id: 'meditation',
    title: 'Méditation Guidée',
    description: 'Trouvez la paix intérieure et la sérénité',
    emoji: '🧘',
    href: '/bien-etre/meditation',
    gradient: 'from-teal-500 to-cyan-500',
  },
  {
    id: 'numerologie',
    title: 'Numérologie',
    description: 'Découvrez les secrets de vos nombres personnels',
    emoji: '🔢',
    href: '/bien-etre/numerologie',
    gradient: 'from-indigo-500 to-blue-500',
  },
];

export default function BienEtrePage() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [affirmation, setAffirmation] = useState<Affirmation | null>(null);
  const [moonPhase, setMoonPhase] = useState<MoonPhase | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [quoteData, affirmationData] = await Promise.all([
          fetchQuoteOfTheDay(),
          fetchAffirmation(),
        ]);
        setQuote(quoteData);
        setAffirmation(affirmationData);
        setMoonPhase(calculateMoonPhase());
      } catch (error) {
        console.error('Error loading wellness data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-5xl mb-4 block">🌿</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3">
            Bien-être Holistique
          </h1>
          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Explorez nos ressources pour nourrir votre corps, votre esprit et votre âme.
            Trouvez l'équilibre et l'harmonie dans votre vie quotidienne.
          </p>
        </div>

        {/* Citation du jour */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
            <span>💭</span> Citation du Jour
          </h2>
          {isLoading ? (
            <div className="bg-white rounded-2xl p-8 shadow-lg animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto"></div>
            </div>
          ) : quote ? (
            <QuoteCard quote={quote} variant="featured" />
          ) : null}
        </div>

        {/* Sections principales */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {WELLNESS_SECTIONS.map((section) => (
            <Link
              key={section.id}
              href={section.href}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-90`}></div>
              <div className="relative p-6 text-white">
                <span className="text-4xl mb-4 block">{section.emoji}</span>
                <h3 className="text-lg font-bold mb-2">{section.title}</h3>
                <p className="text-sm text-white/80">{section.description}</p>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium">
                  <span>Explorer</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Affirmation et Phase lunaire */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Affirmation du jour */}
          <div>
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
              <span>✨</span> Affirmation du Jour
            </h2>
            {isLoading ? (
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 animate-pulse">
                <div className="h-6 bg-amber-200 rounded w-full mb-2"></div>
                <div className="h-6 bg-amber-200 rounded w-2/3"></div>
              </div>
            ) : affirmation ? (
              <AffirmationCard affirmation={affirmation} />
            ) : null}
          </div>

          {/* Phase lunaire */}
          <div>
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
              <span>🌙</span> Énergie Lunaire
            </h2>
            {isLoading ? (
              <div className="bg-white rounded-2xl p-8 shadow-lg animate-pulse">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </div>
            ) : moonPhase ? (
              <MoonPhaseWidget moonPhase={moonPhase} variant="full" showRituals />
            ) : null}
          </div>
        </div>

        {/* Conseils bien-être */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
            <span>🌸</span> Conseils Bien-être Quotidiens
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-xl p-5 border border-green-100">
              <h3 className="font-medium text-green-800 mb-2 flex items-center gap-2">
                <span>🌅</span> Rituel du Matin
              </h3>
              <p className="text-sm text-green-700">
                Commencez votre journée avec 5 minutes de gratitude et de respiration consciente.
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <h3 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                <span>💧</span> Hydratation
              </h3>
              <p className="text-sm text-blue-700">
                Buvez un verre d'eau tiède au réveil pour activer votre métabolisme.
              </p>
            </div>
            <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
              <h3 className="font-medium text-purple-800 mb-2 flex items-center gap-2">
                <span>🧘</span> Pause Consciente
              </h3>
              <p className="text-sm text-purple-700">
                Prenez 3 respirations profondes toutes les heures pour rester centré.
              </p>
            </div>
            <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
              <h3 className="font-medium text-amber-800 mb-2 flex items-center gap-2">
                <span>🌿</span> Nature
              </h3>
              <p className="text-sm text-amber-700">
                Passez au moins 20 minutes par jour en contact avec la nature.
              </p>
            </div>
            <div className="bg-rose-50 rounded-xl p-5 border border-rose-100">
              <h3 className="font-medium text-rose-800 mb-2 flex items-center gap-2">
                <span>❤️</span> Auto-compassion
              </h3>
              <p className="text-sm text-rose-700">
                Traitez-vous avec la même gentillesse que vous offririez à un ami.
              </p>
            </div>
            <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
              <h3 className="font-medium text-indigo-800 mb-2 flex items-center gap-2">
                <span>🌙</span> Rituel du Soir
              </h3>
              <p className="text-sm text-indigo-700">
                Notez 3 moments de gratitude avant de vous coucher pour un sommeil paisible.
              </p>
            </div>
          </div>
        </div>

        {/* Liens rapides */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/horoscope"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-bg-secondary)] rounded-full hover:bg-[var(--color-bg-tertiary)] transition-colors"
          >
            <span>♈</span>
            <span>Horoscopes</span>
          </Link>
          <Link
            href="/astrologie"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-bg-secondary)] rounded-full hover:bg-[var(--color-bg-tertiary)] transition-colors"
          >
            <span>🌌</span>
            <span>Astrologie</span>
          </Link>
          <Link
            href="/astrologie/calendrier-lunaire"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-bg-secondary)] rounded-full hover:bg-[var(--color-bg-tertiary)] transition-colors"
          >
            <span>🌙</span>
            <span>Calendrier Lunaire</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
