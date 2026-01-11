'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BackButton } from '@/components/layout';
import { EGYPTIAN_ZODIAC, getEgyptianZodiacSign } from '@/lib/api';

export default function EgyptianAstrologyPage() {
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState<typeof EGYPTIAN_ZODIAC[0] | null>(null);

  const handleCalculate = () => {
    if (birthDate) {
      const date = new Date(birthDate);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const sign = getEgyptianZodiacSign(day, month);
      if (sign) {
        setResult(sign);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <BackButton href="/mythologies" label="Mythologies" />
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3">
            Astrologie Egyptienne
          </h1>
          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Decouvrez quel dieu egyptien guide votre existence et revele
            votre personnalite profonde selon la sagesse des pharaons.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">
            Calculez votre signe egyptien
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Date de naissance
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleCalculate}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                Calculer
              </button>
            </div>
          </div>
        </div>

        {result && (
          <div
            className="rounded-2xl p-6 mb-8 border"
            style={{
              backgroundColor: `${result.color}10`,
              borderColor: `${result.color}30`,
            }}
          >
            <div className="text-center mb-6">
              <p className="font-medium mb-2" style={{ color: result.color }}>
                Votre divinite protectrice
              </p>
              <h3 className="text-3xl font-bold mb-2" style={{ color: result.color }}>
                {result.deityFr}
              </h3>
              <div className="inline-flex items-center gap-2">
                <span
                  className="px-3 py-1 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: result.color }}
                >
                  Element {result.element}
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2" style={{ color: result.color }}>
                  Traits de personnalite
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.traits.map((trait) => (
                    <span
                      key={trait}
                      className="px-3 py-1 bg-white rounded-full text-sm"
                      style={{ color: result.color }}
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2" style={{ color: result.color }}>
                  Forces
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.strengths.map((strength) => (
                    <span
                      key={strength}
                      className="px-3 py-1 bg-green-100 rounded-full text-sm text-green-700"
                    >
                      {strength}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2" style={{ color: result.color }}>
                  Points d'attention
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.weaknesses.map((weakness) => (
                    <span
                      key={weakness}
                      className="px-3 py-1 bg-amber-100 rounded-full text-sm text-amber-700"
                    >
                      {weakness}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2" style={{ color: result.color }}>
                  Periodes
                </h4>
                <div className="text-sm" style={{ color: result.color }}>
                  {result.periods.map((period, i) => (
                    <span key={i}>
                      {period.start.split('-').reverse().join('/')} - {period.end.split('-').reverse().join('/')}
                      {i < result.periods.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t" style={{ borderColor: `${result.color}30` }}>
              <p className="leading-relaxed" style={{ color: result.color }}>
                {result.description}
              </p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6">
            Les 12 Divinites du Zodiaque Egyptien
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {EGYPTIAN_ZODIAC.map((sign) => (
              <div
                key={sign.id}
                className="p-4 rounded-xl border transition-colors hover:shadow-md"
                style={{
                  backgroundColor: `${sign.color}05`,
                  borderColor: `${sign.color}20`,
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: sign.color }}
                  >
                    {sign.deityFr[0]}
                  </div>
                  <div>
                    <h3 className="font-bold" style={{ color: sign.color }}>
                      {sign.deityFr}
                    </h3>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      {sign.element}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {sign.traits.slice(0, 2).map((trait) => (
                    <span
                      key={trait}
                      className="px-2 py-0.5 text-xs rounded-full"
                      style={{
                        backgroundColor: `${sign.color}15`,
                        color: sign.color,
                      }}
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-100">
          <h3 className="font-bold text-amber-800 mb-3">
            A propos de l'Astrologie Egyptienne
          </h3>
          <p className="text-amber-700 mb-4">
            L'astrologie egyptienne est l'une des plus anciennes formes de divination,
            developpee par les pretres de l'Egypte ancienne il y a plus de 3000 ans.
            Chaque periode de l'annee est placee sous la protection d'une divinite
            du pantheon egyptien.
          </p>
          <p className="text-amber-700">
            Votre signe egyptien revele les qualites que la divinite vous a conferees,
            ainsi que votre mission de vie et les defis que vous devez surmonter.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/mythologies/chinoise"
            className="px-6 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow text-[var(--color-text-primary)]"
          >
            Astrologie Chinoise
          </Link>
          <Link
            href="/horoscope"
            className="px-6 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow text-[var(--color-text-primary)]"
          >
            Astrologie Occidentale
          </Link>
        </div>
      </div>
    </div>
  );
}
