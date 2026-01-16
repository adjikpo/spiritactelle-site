'use client';

import { useState } from 'react';
import { BirthDataForm, ZodiacWheel, ChartSummary } from '@/components/astro';
import { generateNatalChart, NatalChart, GeoLocation, HouseSystem } from '@/lib/astro';

export default function ThemeNatalPage() {
  const [chart, setChart] = useState<NatalChart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: {
    date: string;
    time: string;
    location: GeoLocation;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      // Créer la date à partir de la chaîne
      const [year, month, day] = data.date.split('-').map(Number);
      const birthDate = new Date(year, month - 1, day);

      // Générer le thème
      const natalChart = generateNatalChart(
        {
          date: birthDate,
          time: data.time,
          location: data.location,
        },
        HouseSystem.Placidus
      );

      setChart(natalChart);
    } catch (err) {
      console.error('Error generating chart:', err);
      setError('Une erreur est survenue lors du calcul du thème.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setChart(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-2">
            Thème Astral
          </h1>
          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Découvrez votre carte du ciel au moment de votre naissance.
            Entrez vos informations pour calculer votre thème natal complet.
          </p>
        </div>

        {!chart ? (
          /* Formulaire */
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-sm shadow-lg p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-6">
                Vos informations de naissance
              </h2>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-sm text-red-600 text-sm">
                  {error}
                </div>
              )}

              <BirthDataForm onSubmit={handleSubmit} isLoading={isLoading} />
            </div>

            {/* Informations */}
            <div className="mt-6 text-center">
              <p className="text-sm text-[var(--color-text-muted)]">
                L&apos;heure exacte de naissance permet un calcul précis de l&apos;ascendant et des maisons.
              </p>
            </div>
          </div>
        ) : (
          /* Résultats */
          <div className="space-y-8">
            {/* Bouton retour */}
            <div className="flex justify-center">
              <button
                onClick={handleReset}
                className="text-sm text-[var(--color-primary)] hover:underline flex items-center gap-1"
              >
                <span>←</span>
                <span>Nouveau calcul</span>
              </button>
            </div>

            {/* Informations de naissance */}
            <div className="text-center p-4 bg-[var(--color-bg-secondary)] rounded-sm border border-[var(--color-border)]">
              <p className="text-sm text-[var(--color-text-secondary)]">
                Thème natal calculé pour le{' '}
                <span className="font-medium text-[var(--color-text-primary)]">
                  {chart.birthData.date.toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>{' '}
                à{' '}
                <span className="font-medium text-[var(--color-text-primary)]">
                  {chart.birthData.time}
                </span>{' '}
                -{' '}
                <span className="font-medium text-[var(--color-text-primary)]">
                  {chart.birthData.location.name}, {chart.birthData.location.country}
                </span>
              </p>
            </div>

            {/* Layout principal */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Roue zodiacale */}
              <div className="bg-white rounded-sm shadow-lg p-6 flex items-center justify-center">
                <ZodiacWheel chart={chart} size={350} showAspects={true} />
              </div>

              {/* Résumé */}
              <div className="bg-white rounded-sm shadow-lg p-6">
                <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
                  Analyse du thème
                </h2>
                <ChartSummary chart={chart} />
              </div>
            </div>

            {/* Légende */}
            <div className="bg-[var(--color-bg-secondary)] rounded-sm p-4">
              <h3 className="font-medium text-sm mb-3">Légende des aspects</h3>
              <div className="flex flex-wrap gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-purple-500" />
                  <span>Conjonction (0°)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-red-500 border-dashed border-t" />
                  <span>Opposition (180°)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-green-500" />
                  <span>Trigone (120°)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-red-500" />
                  <span>Carré (90°)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-blue-500" />
                  <span>Sextile (60°)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
