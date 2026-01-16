'use client';

import Link from 'next/link';
import { BackButton } from '@/components/layout';

export default function NativeAmericanAstrologyPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <BackButton href="/mythologies" label="Mythologies" />
        </div>

        {/* Coming Soon */}
        <div className="text-center py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
            Astrologie Amérindienne
          </h1>

          <div className="inline-block bg-gray-800 text-white px-6 py-2 rounded-sm font-medium mb-6">
            Bientôt disponible
          </div>

          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto mb-8">
            Découvrez bientôt votre animal totem et la sagesse ancestrale
            de la roue de médecine amérindienne.
          </p>

          <div className="bg-white rounded-sm shadow-lg p-8 max-w-md mx-auto mb-8">
            <h2 className="font-bold text-[var(--color-text-primary)] mb-4">
              Les 12 Animaux Totems
            </h2>
            <div className="grid grid-cols-3 gap-3 text-sm text-[var(--color-text-secondary)]">
              <span>Faucon</span>
              <span>Castor</span>
              <span>Cerf</span>
              <span>Pic-vert</span>
              <span>Saumon</span>
              <span>Ours</span>
              <span>Corbeau</span>
              <span>Serpent</span>
              <span>Chouette</span>
              <span>Oie</span>
              <span>Loutre</span>
              <span>Loup</span>
            </div>
          </div>

          {/* Info */}
          <div className="bg-[var(--color-bg-secondary)] rounded-sm p-6 border border-[var(--color-border)] max-w-lg mx-auto mb-8">
            <h3 className="font-bold text-[var(--color-text-primary)] mb-3">
              À propos
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              L'astrologie amérindienne est basée sur la roue de médecine, un symbole
              sacré représentant les cycles de la vie. Chaque animal totem apporte
              ses qualités et sa sagesse à ceux nés sous son influence.
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
