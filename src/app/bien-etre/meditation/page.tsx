'use client';

import Link from 'next/link';
import { BackButton } from '@/components/layout';

export default function MeditationPage() {
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
            Méditation Guidée
          </h1>

          <div className="inline-block bg-gray-800 text-white px-6 py-2 rounded-sm font-medium mb-6">
            Bientôt disponible
          </div>

          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto mb-8">
            Trouvez la paix intérieure avec nos sessions de méditation guidée.
            Prenez un moment pour vous recentrer et cultiver la sérénité.
          </p>

          <div className="bg-white rounded-sm shadow-lg p-8 max-w-md mx-auto mb-8">
            <h2 className="font-bold text-[var(--color-text-primary)] mb-4">
              Sessions à venir
            </h2>
            <ul className="text-left text-[var(--color-text-secondary)] space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-purple-500">✦</span>
                <span>Respiration Consciente (5 min)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-500">✦</span>
                <span>Scan Corporel (10 min)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-500">✦</span>
                <span>Méditation de Gratitude (7 min)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-500">✦</span>
                <span>Visualisation Créatrice (8 min)</span>
              </li>
            </ul>
          </div>

          {/* Conseils */}
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-sm p-6 border border-teal-100 max-w-lg mx-auto mb-8">
            <h3 className="font-bold text-teal-800 mb-3">
              En attendant...
            </h3>
            <p className="text-sm text-teal-700">
              Prenez 3 respirations profondes. Inspirez par le nez pendant 4 secondes,
              retenez pendant 4 secondes, expirez par la bouche pendant 6 secondes.
            </p>
          </div>

          {/* Liens rapides */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/bien-etre/citations"
              className="px-6 py-3 bg-white rounded-sm shadow-md hover:shadow-lg transition-shadow"
            >
              Citations
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
