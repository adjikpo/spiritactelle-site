'use client';

import Link from 'next/link';
import { Button, Card, CardContent } from '@/components/ui';
import { BackButton } from '@/components/layout';

export default function ProfilPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-20 pb-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-6">
          <BackButton href="/" label="Accueil" />
        </div>

        <Card variant="glass">
          <CardContent>
            <div className="text-center py-8">
              {/* Icon */}
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-4">
                Espace personnel
              </h1>

              {/* Coming soon message */}
              <div className="mb-8 p-4 rounded-xl bg-amber-50 border border-amber-200 text-left">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-amber-800">
                      Bientot disponible
                    </h3>
                    <p className="mt-1 text-sm text-amber-700">
                      La creation de compte et l&apos;espace personnel sont en cours de developpement.
                      Vous pourrez bientot creer votre profil, sauvegarder votre theme astral et acceder
                      a du contenu personnalise.
                    </p>
                  </div>
                </div>
              </div>

              {/* Features coming */}
              <div className="text-left mb-8">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
                  Fonctionnalites a venir :
                </h3>
                <ul className="space-y-3">
                  {[
                    'Sauvegarde de votre theme astral complet',
                    'Horoscopes personnalises selon votre carte du ciel',
                    'Historique de vos tirages de tarot',
                    'Acces aux contenus premium',
                    'Notifications personnalisees',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span className="text-[var(--color-text-secondary)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter CTA */}
              <div className="p-6 rounded-xl bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 mb-6">
                <p className="text-[var(--color-text-primary)] font-medium mb-2">
                  Soyez informe du lancement !
                </p>
                <p className="text-sm text-[var(--color-text-muted)] mb-4">
                  Inscrivez-vous a notre newsletter pour etre prevenu des que l&apos;espace personnel sera disponible.
                </p>
                <Link href="/newsletter">
                  <Button variant="gold">
                    S&apos;inscrire a la newsletter
                  </Button>
                </Link>
              </div>

              {/* Explore content */}
              <p className="text-[var(--color-text-secondary)] mb-4">
                En attendant, explorez nos contenus gratuits :
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/horoscope">
                  <Button variant="outline" size="sm">
                    Horoscopes
                  </Button>
                </Link>
                <Link href="/astrologie">
                  <Button variant="outline" size="sm">
                    Astrologie
                  </Button>
                </Link>
                <Link href="/mythologies">
                  <Button variant="outline" size="sm">
                    Mythologies
                  </Button>
                </Link>
                <Link href="/bien-etre">
                  <Button variant="outline" size="sm">
                    Bien-etre
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
