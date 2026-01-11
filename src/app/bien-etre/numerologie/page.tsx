'use client';

import { useState } from 'react';
import Link from 'next/link';
import { NumerologyCard } from '@/components/wellness';
import { BackButton } from '@/components/layout';
import { getFullNumerologyProfile } from '@/lib/api';
import { FullNumerologyProfile } from '@/lib/api/types';

export default function NumerologiePage() {
  const [birthDate, setBirthDate] = useState('');
  const [fullName, setFullName] = useState('');
  const [profile, setProfile] = useState<FullNumerologyProfile | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = () => {
    if (!birthDate || !fullName.trim()) return;

    setIsCalculating(true);

    // Simulation d'un délai pour l'effet visuel
    setTimeout(() => {
      const result = getFullNumerologyProfile(new Date(birthDate), fullName.trim());
      setProfile(result);
      setIsCalculating(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Retour */}
        <div className="mb-6">
          <BackButton href="/bien-etre" label="Bien-être" />
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-5xl mb-4 block">🔢</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3">
            Numérologie
          </h1>
          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Découvrez les secrets cachés dans vos nombres personnels.
            La numérologie révèle votre chemin de vie et votre potentiel.
          </p>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">
            Calculez votre profil numérologique
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Votre nom complet
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Prénom et Nom"
                className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Date de naissance
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none"
              />
            </div>
          </div>
          <button
            onClick={handleCalculate}
            disabled={!birthDate || !fullName.trim() || isCalculating}
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCalculating ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Calcul en cours...
              </span>
            ) : (
              'Révéler mon profil'
            )}
          </button>
        </div>

        {/* Résultat */}
        {profile && (
          <div className="mb-10 animate-fade-in">
            <NumerologyCard profile={profile} showDetails />
          </div>
        )}

        {/* Explication des nombres */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-6">
            Comprendre les nombres
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
              <h3 className="font-medium text-indigo-800 mb-2">Chemin de Vie</h3>
              <p className="text-sm text-indigo-700">
                Votre mission principale dans cette vie, calculée à partir de votre date de naissance.
              </p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
              <h3 className="font-medium text-purple-800 mb-2">Nombre d'Expression</h3>
              <p className="text-sm text-purple-700">
                Vos talents naturels et la façon dont vous vous exprimez dans le monde.
              </p>
            </div>
            <div className="bg-rose-50 rounded-xl p-4 border border-rose-100">
              <h3 className="font-medium text-rose-800 mb-2">Nombre de l'Âme</h3>
              <p className="text-sm text-rose-700">
                Vos désirs profonds et ce qui vous motive réellement dans la vie.
              </p>
            </div>
          </div>
        </div>

        {/* Signification des nombres 1-9 */}
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100">
          <h2 className="text-lg font-bold text-indigo-800 mb-6">
            Les 9 nombres fondamentaux
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { num: 1, title: 'Le Leader', desc: 'Innovation, indépendance, ambition' },
              { num: 2, title: 'Le Diplomate', desc: 'Coopération, sensibilité, équilibre' },
              { num: 3, title: 'Le Créatif', desc: 'Expression, créativité, joie' },
              { num: 4, title: 'Le Bâtisseur', desc: 'Stabilité, travail, fondations' },
              { num: 5, title: 'L\'Aventurier', desc: 'Liberté, changement, adaptabilité' },
              { num: 6, title: 'Le Responsable', desc: 'Harmonie, famille, service' },
              { num: 7, title: 'Le Chercheur', desc: 'Spiritualité, analyse, sagesse' },
              { num: 8, title: 'Le Réalisateur', desc: 'Pouvoir, abondance, karma' },
              { num: 9, title: 'L\'Humaniste', desc: 'Compassion, universalité, sagesse' },
            ].map((item) => (
              <div
                key={item.num}
                className="bg-white/60 backdrop-blur-sm rounded-xl p-4 flex items-start gap-3"
              >
                <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">
                  {item.num}
                </span>
                <div>
                  <h4 className="font-medium text-indigo-800">{item.title}</h4>
                  <p className="text-xs text-indigo-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Nombres maîtres */}
          <div className="mt-6 pt-6 border-t border-indigo-200">
            <h3 className="font-medium text-indigo-800 mb-3">Nombres Maîtres</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { num: 11, title: 'L\'Illuminé', desc: 'Intuition, inspiration spirituelle' },
                { num: 22, title: 'Le Maître Bâtisseur', desc: 'Vision, accomplissement majeur' },
                { num: 33, title: 'Le Maître Enseignant', desc: 'Guérison, compassion suprême' },
              ].map((item) => (
                <div
                  key={item.num}
                  className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl p-4 flex items-start gap-3"
                >
                  <span className="w-8 h-8 bg-amber-200 text-amber-700 rounded-full flex items-center justify-center font-bold text-sm">
                    {item.num}
                  </span>
                  <div>
                    <h4 className="font-medium text-amber-800">{item.title}</h4>
                    <p className="text-xs text-amber-700">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Liens rapides */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/horoscope"
            className="px-6 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
          >
            Horoscopes
          </Link>
          <Link
            href="/astrologie"
            className="px-6 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
          >
            Astrologie
          </Link>
        </div>
      </div>
    </div>
  );
}
