'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BackButton } from '@/components/layout';
import {
  EGYPTIAN_ZODIAC,
  getEgyptianZodiacSign,
} from '@/lib/api';

export default function EgyptianAstrologyPage() {
  const [birthDay, setBirthDay] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [result, setResult] = useState<typeof EGYPTIAN_ZODIAC[0] | null>(null);

  const handleCalculate = () => {
    const day = parseInt(birthDay);
    const month = parseInt(birthMonth);
    if (day && month && day >= 1 && day <= 31 && month >= 1 && month <= 12) {
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

        <div className="bg-white rounded-sm shadow-lg p-6 mb-8">
          <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">
            Calculez votre signe egyptien
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Jour de naissance
              </label>
              <input
                type="number"
                value={birthDay}
                onChange={(e) => setBirthDay(e.target.value)}
                placeholder="Ex: 15"
                min="1"
                max="31"
                className="w-full px-4 py-3 rounded-sm border border-[var(--color-border)] focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Mois de naissance
              </label>
              <select
                value={birthMonth}
                onChange={(e) => setBirthMonth(e.target.value)}
                className="w-full px-4 py-3 rounded-sm border border-[var(--color-border)] focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none bg-white"
              >
                <option value="">Selectionnez un mois</option>
                <option value="1">Janvier</option>
                <option value="2">Fevrier</option>
                <option value="3">Mars</option>
                <option value="4">Avril</option>
                <option value="5">Mai</option>
                <option value="6">Juin</option>
                <option value="7">Juillet</option>
                <option value="8">Aout</option>
                <option value="9">Septembre</option>
                <option value="10">Octobre</option>
                <option value="11">Novembre</option>
                <option value="12">Decembre</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={handleCalculate}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-sm font-medium hover:opacity-90 transition-opacity"
              >
                Calculer
              </button>
            </div>
          </div>
        </div>

        {result && (
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-sm p-6 border border-amber-100 mb-8">
            <div className="text-center mb-6">
              <p className="text-amber-600 font-medium mb-2">Votre divinite protectrice</p>
              <h3 className="text-3xl font-bold text-amber-800 mb-2">
                {result.deityFr}
              </h3>
              <div className="inline-flex items-center gap-2">
                <span
                  className="px-3 py-1 rounded-sm text-sm font-medium text-white"
                  style={{ backgroundColor: result.color }}
                >
                  Element {result.element}
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-amber-800 mb-2">Traits de personnalite</h4>
                <div className="flex flex-wrap gap-2">
                  {result.traits.map((trait) => (
                    <span
                      key={trait}
                      className="px-3 py-1 bg-white rounded-sm text-sm text-amber-700"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-amber-800 mb-2">Forces</h4>
                <div className="flex flex-wrap gap-2">
                  {result.strengths.map((strength) => (
                    <span
                      key={strength}
                      className="px-3 py-1 bg-green-100 rounded-sm text-sm text-green-700"
                    >
                      {strength}
                    </span>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <h4 className="font-medium text-amber-800 mb-2">Points d&apos;attention</h4>
                <div className="flex flex-wrap gap-2">
                  {result.weaknesses.map((weakness) => (
                    <span
                      key={weakness}
                      className="px-3 py-1 bg-amber-100 rounded-sm text-sm text-amber-700"
                    >
                      {weakness}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-amber-200">
              <p className="text-amber-700 leading-relaxed">{result.description}</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-sm shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6">
            Les 12 Divinites du Zodiaque Egyptien
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {EGYPTIAN_ZODIAC.map((sign) => (
              <div
                key={sign.id}
                className="p-4 rounded-sm bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-border)] transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: sign.color }}
                  />
                  <h3 className="font-bold text-[var(--color-text-primary)]">{sign.deityFr}</h3>
                </div>
                <p className="text-xs text-[var(--color-text-muted)] mb-2">
                  Element: {sign.element}
                </p>
                <div className="flex flex-wrap gap-1">
                  {sign.traits.slice(0, 2).map((trait) => (
                    <span
                      key={trait}
                      className="px-2 py-0.5 text-xs bg-white rounded-sm text-[var(--color-text-secondary)]"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-sm shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">
            Les Elements Egyptiens
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-6">
            L&apos;astrologie egyptienne associe chaque divinite a l&apos;un des quatre elements
            sacres qui influencent profondement la personnalite des natifs.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Feu', color: '#F59E0B', icon: '🔥', desc: 'Energie, passion, leadership' },
              { name: 'Eau', color: '#3B82F6', icon: '💧', desc: 'Intuition, emotion, sagesse' },
              { name: 'Terre', color: '#22C55E', icon: '🌍', desc: 'Stabilite, fiabilite, ancrage' },
              { name: 'Air', color: '#8B5CF6', icon: '💨', desc: 'Intellect, communication, liberte' },
            ].map((element) => (
              <div
                key={element.name}
                className="p-4 rounded-sm text-center"
                style={{ backgroundColor: `${element.color}15` }}
              >
                <div className="text-3xl mb-2">{element.icon}</div>
                <h3 className="font-bold" style={{ color: element.color }}>
                  {element.name}
                </h3>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">
                  {element.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-sm p-6 border border-amber-100">
          <h3 className="font-bold text-amber-800 mb-3">
            A propos de l&apos;Astrologie Egyptienne
          </h3>
          <p className="text-amber-700 mb-4">
            L&apos;astrologie egyptienne est l&apos;une des plus anciennes formes de divination,
            developpee par les pretres de l&apos;Egypte ancienne il y a plus de 3000 ans.
            Chaque signe est associe a une divinite du pantheon egyptien.
          </p>
          <p className="text-amber-700">
            Votre signe est determine par votre date de naissance et revele quelle
            divinite guide votre chemin de vie. Contrairement a l&apos;astrologie occidentale,
            les periodes ne sont pas continues tout au long de l&apos;annee - certaines
            divinites gouvernent plusieurs periodes distinctes.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/mythologies/chinoise"
            className="px-6 py-3 bg-white rounded-sm shadow-md hover:shadow-lg transition-shadow text-[var(--color-text-primary)]"
          >
            Astrologie Chinoise
          </Link>
          <Link
            href="/horoscope"
            className="px-6 py-3 bg-white rounded-sm shadow-md hover:shadow-lg transition-shadow text-[var(--color-text-primary)]"
          >
            Astrologie Occidentale
          </Link>
        </div>
      </div>
    </div>
  );
}
