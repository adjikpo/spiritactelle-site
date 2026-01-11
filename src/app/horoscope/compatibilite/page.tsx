'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CompatibilityMeter, CompatibilitySelector } from '@/components/horoscope';
import { calculateCompatibility, getCompatibilityAdvice } from '@/lib/api';
import { Compatibility, ZodiacSignKey } from '@/lib/api/types';
import { ZODIAC_SIGNS } from '@/lib/api/constants';

export default function CompatibilitePage() {
  const [sign1, setSign1] = useState<ZodiacSignKey>('aries');
  const [sign2, setSign2] = useState<ZodiacSignKey>('leo');
  const [compatibility, setCompatibility] = useState<Compatibility | null>(null);

  const handleCalculate = () => {
    const result = calculateCompatibility(sign1, sign2);
    setCompatibility(result);
  };

  // Calculer automatiquement quand les signes changent
  useState(() => {
    handleCalculate();
  });

  // Recalculer quand un signe change
  const handleSign1Change = (sign: ZodiacSignKey) => {
    setSign1(sign);
    const result = calculateCompatibility(sign, sign2);
    setCompatibility(result);
  };

  const handleSign2Change = (sign: ZodiacSignKey) => {
    setSign2(sign);
    const result = calculateCompatibility(sign1, sign);
    setCompatibility(result);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-20 pb-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Retour */}
        <Link
          href="/horoscope"
          className="inline-flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] mb-6"
        >
          <span>←</span>
          <span>Horoscopes</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3">
            Compatibilité Amoureuse
          </h1>
          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Découvrez votre compatibilité astrologique avec votre partenaire ou crush.
            Les étoiles ont-elles aligné vos destins ?
          </p>
        </div>

        {/* Sélecteur */}
        <div className="mb-8">
          <CompatibilitySelector
            sign1={sign1}
            sign2={sign2}
            onSign1Change={handleSign1Change}
            onSign2Change={handleSign2Change}
          />
        </div>

        {/* Résultat */}
        {compatibility && (
          <div className="space-y-6">
            <CompatibilityMeter compatibility={compatibility} />

            {/* Conseil */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
              <h3 className="font-bold text-purple-800 mb-2 flex items-center gap-2">
                <span>💡</span> Conseil des astres
              </h3>
              <p className="text-purple-700">
                {getCompatibilityAdvice(compatibility.level)}
              </p>
            </div>

            {/* Liens vers les signes */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/horoscope/${sign1}`}
                className="flex-1 flex items-center gap-3 bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow"
              >
                <span className="text-3xl" style={{ color: ZODIAC_SIGNS[sign1].color }}>
                  {ZODIAC_SIGNS[sign1].emoji}
                </span>
                <div>
                  <p className="font-medium text-[var(--color-text-primary)]">
                    {ZODIAC_SIGNS[sign1].nameFr}
                  </p>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    Voir l'horoscope →
                  </p>
                </div>
              </Link>

              <Link
                href={`/horoscope/${sign2}`}
                className="flex-1 flex items-center gap-3 bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow"
              >
                <span className="text-3xl" style={{ color: ZODIAC_SIGNS[sign2].color }}>
                  {ZODIAC_SIGNS[sign2].emoji}
                </span>
                <div>
                  <p className="font-medium text-[var(--color-text-primary)]">
                    {ZODIAC_SIGNS[sign2].nameFr}
                  </p>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    Voir l'horoscope →
                  </p>
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* Explication */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">
            Comment fonctionne la compatibilité ?
          </h2>
          <div className="space-y-4 text-[var(--color-text-secondary)]">
            <p>
              La compatibilité astrologique analyse la relation entre les éléments (Feu, Terre, Air, Eau)
              et les modalités (Cardinal, Fixe, Mutable) de chaque signe.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-red-50 rounded-xl p-4">
                <h4 className="font-medium text-red-800 mb-2">🔥 Feu + Air</h4>
                <p className="text-sm text-red-700">
                  L'Air attise le Feu. Combinaison dynamique et stimulante.
                </p>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <h4 className="font-medium text-green-800 mb-2">🌍 Terre + Eau</h4>
                <p className="text-sm text-green-700">
                  L'Eau nourrit la Terre. Union stable et nourrissante.
                </p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <h4 className="font-medium text-blue-800 mb-2">✨ Même élément</h4>
                <p className="text-sm text-blue-700">
                  Compréhension naturelle mais peut manquer de complémentarité.
                </p>
              </div>
              <div className="bg-amber-50 rounded-xl p-4">
                <h4 className="font-medium text-amber-800 mb-2">⚡ Éléments opposés</h4>
                <p className="text-sm text-amber-700">
                  Attraction des contraires mais nécessite des compromis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
