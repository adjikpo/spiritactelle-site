'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BackButton } from '@/components/layout';
import {
  CHINESE_ZODIAC,
  CHINESE_ELEMENTS,
  getChineseZodiacSign,
  getChineseElement,
} from '@/lib/api';

export default function ChineseAstrologyPage() {
  const [birthYear, setBirthYear] = useState('');
  const [result, setResult] = useState<{
    sign: typeof CHINESE_ZODIAC[0];
    element: keyof typeof CHINESE_ELEMENTS;
  } | null>(null);

  const handleCalculate = () => {
    const year = parseInt(birthYear);
    if (year && year >= 1900 && year <= 2100) {
      const sign = getChineseZodiacSign(year);
      const element = getChineseElement(year);
      setResult({ sign, element });
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
            Astrologie Chinoise
          </h1>
          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Decouvrez votre animal du zodiaque chinois et l'element qui influence
            votre personnalite et votre destinee.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">
            Calculez votre signe chinois
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Annee de naissance
              </label>
              <input
                type="number"
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                placeholder="Ex: 1990"
                min="1900"
                max="2100"
                className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleCalculate}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                Calculer
              </button>
            </div>
          </div>
        </div>

        {result && (
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border border-red-100 mb-8">
            <div className="text-center mb-6">
              <p className="text-red-600 font-medium mb-2">Votre signe chinois</p>
              <h3 className="text-3xl font-bold text-red-800 mb-2">
                {result.sign.nameFr}
              </h3>
              <div className="inline-flex items-center gap-2">
                <span
                  className="px-3 py-1 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: CHINESE_ELEMENTS[result.element].color }}
                >
                  Element {CHINESE_ELEMENTS[result.element].nameFr}
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-red-800 mb-2">Traits de personnalite</h4>
                <div className="flex flex-wrap gap-2">
                  {result.sign.traits.map((trait) => (
                    <span
                      key={trait}
                      className="px-3 py-1 bg-white rounded-full text-sm text-red-700"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-red-800 mb-2">Forces</h4>
                <div className="flex flex-wrap gap-2">
                  {result.sign.strengths.map((strength) => (
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
                <h4 className="font-medium text-red-800 mb-2">Points d'attention</h4>
                <div className="flex flex-wrap gap-2">
                  {result.sign.weaknesses.map((weakness) => (
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
                <h4 className="font-medium text-red-800 mb-2">Meilleure compatibilite</h4>
                <div className="flex flex-wrap gap-2">
                  {result.sign.compatibility.map((compat) => {
                    const compatSign = CHINESE_ZODIAC.find((s) => s.id === compat);
                    return (
                      <span
                        key={compat}
                        className="px-3 py-1 bg-pink-100 rounded-full text-sm text-pink-700"
                      >
                        {compatSign?.nameFr}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-red-200">
              <p className="text-red-700 leading-relaxed">{result.sign.description}</p>
            </div>

            <div className="mt-6 pt-6 border-t border-red-200">
              <h4 className="font-medium text-red-800 mb-2">
                Influence de l'element {CHINESE_ELEMENTS[result.element].nameFr}
              </h4>
              <div className="flex flex-wrap gap-2">
                {CHINESE_ELEMENTS[result.element].traits.map((trait) => (
                  <span
                    key={trait}
                    className="px-3 py-1 rounded-full text-sm text-white"
                    style={{ backgroundColor: CHINESE_ELEMENTS[result.element].color }}
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6">
            Les 12 Animaux du Zodiaque Chinois
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {CHINESE_ZODIAC.map((sign) => (
              <div
                key={sign.id}
                className="p-4 rounded-xl bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-border)] transition-colors"
              >
                <h3 className="font-bold text-[var(--color-text-primary)]">{sign.nameFr}</h3>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">
                  {sign.years.slice(-3).join(', ')}...
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {sign.traits.slice(0, 2).map((trait) => (
                    <span
                      key={trait}
                      className="px-2 py-0.5 text-xs bg-white rounded-full text-[var(--color-text-secondary)]"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6">
            Les 5 Elements
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(CHINESE_ELEMENTS).map(([key, element]) => (
              <div
                key={key}
                className="p-4 rounded-xl text-center"
                style={{ backgroundColor: `${element.color}15` }}
              >
                <div
                  className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center"
                  style={{ backgroundColor: element.color }}
                >
                  <span className="text-white font-bold">{element.nameFr[0]}</span>
                </div>
                <h3 className="font-bold" style={{ color: element.color }}>
                  {element.nameFr}
                </h3>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">
                  {element.traits.slice(0, 2).join(', ')}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border border-red-100">
          <h3 className="font-bold text-red-800 mb-3">
            A propos de l'Astrologie Chinoise
          </h3>
          <p className="text-red-700 mb-4">
            L'astrologie chinoise est basee sur un cycle de 12 ans, chaque annee etant
            associee a un animal et a un element. Ce systeme remonte a plus de 2000 ans
            et reste une partie importante de la culture chinoise.
          </p>
          <p className="text-red-700">
            Votre signe est determine par votre annee de naissance, tandis que votre
            element est determine par le cycle de 10 ans des elements. La combinaison
            des deux cree un profil unique parmi 60 possibilites.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/mythologies/egyptienne"
            className="px-6 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow text-[var(--color-text-primary)]"
          >
            Astrologie Egyptienne
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
