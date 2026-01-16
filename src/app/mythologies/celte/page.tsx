'use client';

import Link from 'next/link';
import { BackButton } from '@/components/layout';

export default function CelticAstrologyPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <BackButton href="/mythologies" label="Mythologies" />
        </div>

        {/* Coming Soon */}
        <div className="text-center py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
            Astrologie Celte
          </h1>

          <div className="inline-block bg-gray-800 text-white px-6 py-2 rounded-sm font-medium mb-6">
            Bientôt disponible
          </div>

          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto mb-8">
            Découvrez bientôt les 13 arbres sacrés des druides qui révèlent
            votre personnalité profonde et votre connexion à la nature.
          </p>

          <div className="bg-white rounded-sm shadow-lg p-8 max-w-md mx-auto mb-8">
            <h2 className="font-bold text-[var(--color-text-primary)] mb-4">
              Les 13 Arbres Sacrés
            </h2>
            <div className="grid grid-cols-3 gap-3 text-sm text-[var(--color-text-secondary)]">
              <span>Bouleau</span>
              <span>Sorbier</span>
              <span>Frêne</span>
              <span>Aulne</span>
              <span>Saule</span>
              <span>Aubépine</span>
              <span>Chêne</span>
              <span>Houx</span>
              <span>Noisetier</span>
              <span>Vigne</span>
              <span>Lierre</span>
              <span>Roseau</span>
              <span>Sureau</span>
            </div>
          </div>

          {/* Info */}
          <div className="bg-[var(--color-bg-secondary)] rounded-sm p-6 border border-[var(--color-border)] max-w-lg mx-auto mb-8">
            <h3 className="font-bold text-[var(--color-text-primary)] mb-3">
              À propos
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              L'astrologie celte, basée sur l'alphabet Ogham, associe chaque période
              de l'année à un arbre sacré. Les druides croyaient que ces arbres
              possédaient des propriétés spirituelles uniques.
            </p>
          </div>

          {/* Liens rapides */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/mythologies/chinoise"
              className="px-6 py-3 bg-white rounded-sm shadow-md hover:shadow-lg transition-shadow text-[var(--color-text-primary)]"
            >
              Astrologie Chinoise
            </Link>
            <Link
              href="/mythologies"
              className="px-6 py-3 bg-white rounded-sm shadow-md hover:shadow-lg transition-shadow text-[var(--color-text-primary)]"
            >
              Mythologies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
