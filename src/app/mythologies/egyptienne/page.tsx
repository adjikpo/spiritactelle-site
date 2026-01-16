'use client';

import Link from 'next/link';
import { BackButton } from '@/components/layout';

export default function EgyptianAstrologyPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <BackButton href="/mythologies" label="Mythologies" />
        </div>

        {/* Coming Soon */}
        <div className="text-center py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
            Astrologie Égyptienne
          </h1>

          <div className="inline-block bg-gray-800 text-white px-6 py-2 rounded-sm font-medium mb-6">
            Bientôt disponible
          </div>

          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto mb-8">
            Découvrez bientôt quel dieu égyptien guide votre existence et révèle
            votre personnalité profonde selon la sagesse des pharaons.
          </p>

          <div className="bg-white rounded-sm shadow-lg p-8 max-w-md mx-auto mb-8">
            <h2 className="font-bold text-[var(--color-text-primary)] mb-4">
              Les 12 Divinités du Zodiaque
            </h2>
            <div className="grid grid-cols-3 gap-3 text-sm text-[var(--color-text-secondary)]">
              <div className="flex items-center gap-2">
                <span className="text-amber-500">☥</span>
                <span>Horus</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-500">☥</span>
                <span>Isis</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-500">☥</span>
                <span>Osiris</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-500">☥</span>
                <span>Amon-Râ</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-500">☥</span>
                <span>Thot</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-500">☥</span>
                <span>Bastet</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-500">☥</span>
                <span>Sekhmet</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-500">☥</span>
                <span>Geb</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-500">☥</span>
                <span>Anubis</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-500">☥</span>
                <span>Seth</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-500">☥</span>
                <span>Mout</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-500">☥</span>
                <span>Nil</span>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-sm p-6 border border-amber-100 max-w-lg mx-auto mb-8">
            <h3 className="font-bold text-amber-800 mb-3">
              À propos
            </h3>
            <p className="text-sm text-amber-700">
              L'astrologie égyptienne est l'une des plus anciennes formes de divination,
              développée par les prêtres de l'Égypte ancienne il y a plus de 3000 ans.
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
