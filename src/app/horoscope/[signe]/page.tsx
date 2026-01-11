'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ZodiacCard } from '@/components/horoscope';
import { fetchHoroscope, getMostCompatible, getLeastCompatible } from '@/lib/api';
import { HoroscopeData, ZodiacSignKey, HoroscopePeriod } from '@/lib/api/types';
import { ZODIAC_SIGNS, ZODIAC_SIGNS_ARRAY } from '@/lib/api/constants';
import { zodiacIconsByKey } from '@/components/icons';

export default function SigneDetailPage() {
  const params = useParams();
  const sign = params.signe as ZodiacSignKey;

  const [period, setPeriod] = useState<HoroscopePeriod>('today');
  const [horoscope, setHoroscope] = useState<HoroscopeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Vérifier que le signe est valide
  const isValidSign = ZODIAC_SIGNS_ARRAY.includes(sign);
  const signInfo = isValidSign ? ZODIAC_SIGNS[sign] : null;

  useEffect(() => {
    if (!isValidSign) return;

    const loadHoroscope = async () => {
      setIsLoading(true);
      try {
        const data = await fetchHoroscope(sign, period);
        setHoroscope(data);
      } catch (error) {
        console.error('Error loading horoscope:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadHoroscope();
  }, [sign, period, isValidSign]);

  if (!isValidSign || !signInfo) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)] pt-20 pb-12 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Signe non trouvé</h1>
          <p className="text-[var(--color-text-muted)] mb-6">
            Ce signe zodiacal n'existe pas.
          </p>
          <Link
            href="/horoscope"
            className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg"
          >
            Retour aux horoscopes
          </Link>
        </div>
      </div>
    );
  }

  const mostCompatible = getMostCompatible(sign, 3);
  const leastCompatible = getLeastCompatible(sign, 2);

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Retour */}
        <Link
          href="/horoscope"
          className="inline-flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] mb-6"
        >
          <span>←</span>
          <span>Tous les signes</span>
        </Link>

        {/* Header du signe */}
        <div
          className="rounded-2xl p-8 text-white mb-8"
          style={{
            background: `linear-gradient(135deg, ${signInfo.color}, ${signInfo.color}cc)`,
          }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center">
              {(() => {
                const IconComponent = zodiacIconsByKey[sign];
                return <IconComponent size={48} className="text-white" />;
              })()}
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">{signInfo.nameFr}</h1>
              <p className="text-white/80 text-lg mb-3">{signInfo.dateRangeFr}</p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                  {signInfo.elementFr}
                </span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                  {signInfo.modalityFr}
                </span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                  {signInfo.rulerFr}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Description du signe */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">
            À propos du {signInfo.nameFr}
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
            {signInfo.descriptionFr}
          </p>
          <div className="flex flex-wrap gap-2">
            {signInfo.traitsFr.map((trait, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-[var(--color-bg-tertiary)] rounded-full text-sm text-[var(--color-text-primary)]"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        {/* Sélecteur de période */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
              Horoscope
            </h2>
            <div className="flex gap-2">
              {[
                { key: 'yesterday', label: 'Hier' },
                { key: 'today', label: "Aujourd'hui" },
                { key: 'tomorrow', label: 'Demain' },
              ].map((p) => (
                <button
                  key={p.key}
                  onClick={() => setPeriod(p.key as HoroscopePeriod)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    period === p.key
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-3 animate-pulse">
              <div className="h-4 bg-[var(--color-border)] rounded w-full" />
              <div className="h-4 bg-[var(--color-border)] rounded w-5/6" />
              <div className="h-4 bg-[var(--color-border)] rounded w-4/6" />
            </div>
          ) : horoscope ? (
            <>
              <p className="text-[var(--color-text-primary)] leading-relaxed mb-6">
                {horoscope.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {horoscope.mood && (
                  <div className="bg-[var(--color-bg-tertiary)] rounded-xl p-3 text-center">
                    <p className="text-xs text-[var(--color-text-muted)] mb-1">Humeur</p>
                    <p className="font-medium text-sm">{horoscope.mood}</p>
                  </div>
                )}
                {horoscope.color && (
                  <div className="bg-[var(--color-bg-tertiary)] rounded-xl p-3 text-center">
                    <p className="text-xs text-[var(--color-text-muted)] mb-1">Couleur</p>
                    <p className="font-medium text-sm">{horoscope.color}</p>
                  </div>
                )}
                {horoscope.luckyNumber && (
                  <div className="bg-[var(--color-bg-tertiary)] rounded-xl p-3 text-center">
                    <p className="text-xs text-[var(--color-text-muted)] mb-1">Nombre</p>
                    <p className="font-medium text-sm">{horoscope.luckyNumber}</p>
                  </div>
                )}
                {horoscope.luckyTime && (
                  <div className="bg-[var(--color-bg-tertiary)] rounded-xl p-3 text-center">
                    <p className="text-xs text-[var(--color-text-muted)] mb-1">Heure</p>
                    <p className="font-medium text-sm">{horoscope.luckyTime}</p>
                  </div>
                )}
              </div>
            </>
          ) : null}
        </div>

        {/* Compatibilité */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              Meilleure compatibilité
            </h3>
            <div className="space-y-3">
              {mostCompatible.map((s) => {
                const CompatIcon = zodiacIconsByKey[s];
                return (
                  <Link
                    key={s}
                    href={`/horoscope/${s}`}
                    className="flex items-center gap-3 p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <CompatIcon size={24} className="text-green-700" />
                    </div>
                    <span className="font-medium text-green-800">{ZODIAC_SIGNS[s].nameFr}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              Défis potentiels
            </h3>
            <div className="space-y-3">
              {leastCompatible.map((s) => {
                const ChallengeIcon = zodiacIconsByKey[s];
                return (
                  <Link
                    key={s}
                    href={`/horoscope/${s}`}
                    className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                      <ChallengeIcon size={24} className="text-amber-700" />
                    </div>
                    <span className="font-medium text-amber-800">{ZODIAC_SIGNS[s].nameFr}</span>
                  </Link>
                );
              })}
            </div>
            <Link
              href="/horoscope/compatibilite"
              className="block mt-4 text-center text-sm text-[var(--color-primary)] hover:underline"
            >
              Calculer une compatibilité précise →
            </Link>
          </div>
        </div>

        {/* Autres signes */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">
            Découvrir les autres signes
          </h3>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {ZODIAC_SIGNS_ARRAY.filter((s) => s !== sign).map((s) => {
              const OtherSignIcon = zodiacIconsByKey[s];
              return (
                <Link
                  key={s}
                  href={`/horoscope/${s}`}
                  className="p-3 text-center bg-[var(--color-bg-tertiary)] rounded-xl hover:bg-[var(--color-border)] transition-colors"
                >
                  <div className="w-10 h-10 mx-auto mb-1 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center">
                    <OtherSignIcon size={24} className="text-[var(--color-primary)]" />
                  </div>
                  <span className="text-xs text-[var(--color-text-muted)]">
                    {ZODIAC_SIGNS[s].nameFr}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
