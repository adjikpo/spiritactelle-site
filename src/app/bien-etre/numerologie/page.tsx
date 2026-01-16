'use client';

import Link from 'next/link';
import { BackButton } from '@/components/layout';

export default function NumerologiePage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Retour */}
        <div className="mb-6">
          <BackButton href="/bien-etre" label="Bien-être" />
        </div>

        {/* Coming Soon */}
        <div className="text-center py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
            Numérologie
          </h1>

          <div className="inline-block bg-gray-800 text-white px-6 py-2 rounded-sm font-medium mb-6">
            Bientôt disponible
          </div>

          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto mb-8">
            Découvrez bientôt les secrets cachés dans vos nombres personnels.
            La numérologie révèle votre chemin de vie et votre potentiel.
          </p>

          <div className="bg-white rounded-sm shadow-lg p-8 max-w-md mx-auto mb-8">
            <h2 className="font-bold text-[var(--color-text-primary)] mb-4">
              Ce qui vous attend
            </h2>
            <ul className="text-left text-[var(--color-text-secondary)] space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-indigo-500">✦</span>
                <span>Calcul de votre Chemin de Vie</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-500">✦</span>
                <span>Nombre d'Expression et de l'Âme</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-500">✦</span>
                <span>Analyse des Nombres Maîtres (11, 22, 33)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-500">✦</span>
                <span>Profil numérologique complet</span>
              </li>
            </ul>
          </div>

          {/* Liens rapides */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/horoscope"
              className="px-6 py-3 bg-white rounded-sm shadow-md hover:shadow-lg transition-shadow"
            >
              Horoscopes
            </Link>
            <Link
              href="/bien-etre"
              className="px-6 py-3 bg-white rounded-sm shadow-md hover:shadow-lg transition-shadow"
            >
              Bien-être
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
