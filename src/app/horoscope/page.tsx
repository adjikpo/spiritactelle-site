'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ZodiacGrid } from '@/components/horoscope';
import { QuoteCard } from '@/components/wellness';
import { MoonPhaseWidget } from '@/components/wellness';
import { fetchHoroscope, fetchQuoteOfTheDay, calculateMoonPhase } from '@/lib/api';
import { HoroscopeData, Quote, MoonPhase, ZodiacSignKey } from '@/lib/api/types';
import { ZODIAC_SIGNS } from '@/lib/api/constants';

export default function HoroscopePage() {
  const [selectedSign, setSelectedSign] = useState<ZodiacSignKey | null>(null);
  const [horoscope, setHoroscope] = useState<HoroscopeData | null>(null);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [moonPhase, setMoonPhase] = useState<MoonPhase | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Charger la citation du jour et la phase lunaire
    const loadInitialData = async () => {
      const [quoteData, moonData] = await Promise.all([
        fetchQuoteOfTheDay(),
        Promise.resolve(calculateMoonPhase()),
      ]);
      setQuote(quoteData);
      setMoonPhase(moonData);
    };

    loadInitialData();
  }, []);

  const handleSelectSign = async (sign: ZodiacSignKey) => {
    setSelectedSign(sign);
    setIsLoading(true);

    try {
      const data = await fetchHoroscope(sign);
      setHoroscope(data);
    } catch (error) {
      console.error('Error loading horoscope:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3">
            Horoscope du Jour
          </h1>
          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Découvrez ce que les astres vous réservent. Sélectionnez votre signe pour obtenir votre horoscope personnalisé.
          </p>
        </div>

        {/* Widgets en haut */}
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {quote && <QuoteCard quote={quote} variant="featured" />}
          {moonPhase && <MoonPhaseWidget moonPhase={moonPhase} variant="compact" />}
        </div>

        {/* Sélection du signe */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 text-center">
            Choisissez votre signe
          </h2>
          <ZodiacGrid
            variant="compact"
            selectedSign={selectedSign || undefined}
            onSelect={handleSelectSign}
          />
        </div>

        {/* Horoscope affiché */}
        {selectedSign && (
          <div className="max-w-2xl mx-auto">
            {isLoading ? (
              <div className="bg-white rounded-2xl shadow-lg p-8 animate-pulse">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-[var(--color-border)] rounded-full" />
                  <div className="space-y-2">
                    <div className="h-6 bg-[var(--color-border)] rounded w-32" />
                    <div className="h-4 bg-[var(--color-border)] rounded w-24" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-[var(--color-border)] rounded w-full" />
                  <div className="h-4 bg-[var(--color-border)] rounded w-5/6" />
                  <div className="h-4 bg-[var(--color-border)] rounded w-4/6" />
                </div>
              </div>
            ) : horoscope ? (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Header avec gradient */}
                <div
                  className="p-6 text-white"
                  style={{
                    background: `linear-gradient(135deg, ${ZODIAC_SIGNS[selectedSign].color}, ${ZODIAC_SIGNS[selectedSign].color}dd)`,
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-5xl">{ZODIAC_SIGNS[selectedSign].emoji}</span>
                    <div>
                      <h2 className="text-2xl font-bold">{ZODIAC_SIGNS[selectedSign].nameFr}</h2>
                      <p className="text-white/80 text-sm">{ZODIAC_SIGNS[selectedSign].dateRangeFr}</p>
                    </div>
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-6">
                  <p className="text-[var(--color-text-primary)] leading-relaxed mb-6">
                    {horoscope.description}
                  </p>

                  {/* Détails */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {horoscope.mood && (
                      <div className="bg-[var(--color-bg-tertiary)] rounded-xl p-3">
                        <p className="text-xs text-[var(--color-text-muted)] mb-1">Humeur</p>
                        <p className="font-medium text-[var(--color-text-primary)]">{horoscope.mood}</p>
                      </div>
                    )}
                    {horoscope.color && (
                      <div className="bg-[var(--color-bg-tertiary)] rounded-xl p-3">
                        <p className="text-xs text-[var(--color-text-muted)] mb-1">Couleur du jour</p>
                        <p className="font-medium text-[var(--color-text-primary)]">{horoscope.color}</p>
                      </div>
                    )}
                    {horoscope.luckyNumber && (
                      <div className="bg-[var(--color-bg-tertiary)] rounded-xl p-3">
                        <p className="text-xs text-[var(--color-text-muted)] mb-1">Nombre chanceux</p>
                        <p className="font-medium text-[var(--color-text-primary)]">{horoscope.luckyNumber}</p>
                      </div>
                    )}
                    {horoscope.compatibility && (
                      <div className="bg-[var(--color-bg-tertiary)] rounded-xl p-3">
                        <p className="text-xs text-[var(--color-text-muted)] mb-1">Compatibilité</p>
                        <p className="font-medium text-[var(--color-text-primary)]">{horoscope.compatibility}</p>
                      </div>
                    )}
                  </div>

                  {/* Liens */}
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/horoscope/${selectedSign}`}
                      className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      Voir plus sur {ZODIAC_SIGNS[selectedSign].nameFr}
                    </Link>
                    <Link
                      href="/horoscope/compatibilite"
                      className="px-4 py-2 bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] rounded-lg text-sm font-medium hover:bg-[var(--color-border)] transition-colors"
                    >
                      Test de compatibilité
                    </Link>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* Liens rapides */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
            Explorer plus
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/horoscope/compatibilite"
              className="px-5 py-2.5 bg-white rounded-full shadow-md text-[var(--color-text-primary)] hover:shadow-lg transition-shadow"
            >
              💕 Compatibilité
            </Link>
            <Link
              href="/astrologie/theme-natal"
              className="px-5 py-2.5 bg-white rounded-full shadow-md text-[var(--color-text-primary)] hover:shadow-lg transition-shadow"
            >
              🌟 Thème natal
            </Link>
            <Link
              href="/astrologie/calendrier-lunaire"
              className="px-5 py-2.5 bg-white rounded-full shadow-md text-[var(--color-text-primary)] hover:shadow-lg transition-shadow"
            >
              🌙 Calendrier lunaire
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
