'use client';

import { FullNumerologyProfile } from '@/lib/api/types';

interface NumerologyCardProps {
  profile: FullNumerologyProfile;
  showDetails?: boolean;
}

export function NumerologyCard({ profile, showDetails = true }: NumerologyCardProps) {
  const { lifePath, expression, soul, personality, personalYear, personalYearMeaning } = profile;

  return (
    <div className="bg-white rounded-sm shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white text-center">
        <p className="text-sm text-white/70 mb-2">Votre chemin de vie</p>
        <div className="text-6xl font-bold mb-2">{lifePath.lifePathNumber}</div>
        <p className="text-xl font-medium">{lifePath.lifePathNameFr}</p>
      </div>

      {/* Contenu */}
      <div className="p-6">
        <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
          {lifePath.descriptionFr}
        </p>

        {showDetails && (
          <div className="space-y-4">
            {/* Nombres supplémentaires */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              <div className="bg-indigo-50 rounded-sm p-3 text-center">
                <div className="text-2xl font-bold text-indigo-600">{expression}</div>
                <p className="text-xs text-indigo-700">Expression</p>
              </div>
              <div className="bg-rose-50 rounded-sm p-3 text-center">
                <div className="text-2xl font-bold text-rose-600">{soul}</div>
                <p className="text-xs text-rose-700">Âme</p>
              </div>
              <div className="bg-teal-50 rounded-sm p-3 text-center">
                <div className="text-2xl font-bold text-teal-600">{personality}</div>
                <p className="text-xs text-teal-700">Personnalité</p>
              </div>
              <div className="bg-amber-50 rounded-sm p-3 text-center">
                <div className="text-2xl font-bold text-amber-600">{personalYear}</div>
                <p className="text-xs text-amber-700">Année</p>
              </div>
            </div>

            {/* Année personnelle */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-sm p-4 border border-amber-100">
              <h4 className="font-medium text-amber-800 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Votre année {personalYear}: {personalYearMeaning.title}
              </h4>
              <p className="text-sm text-amber-700">{personalYearMeaning.description}</p>
            </div>

            {/* Points forts */}
            <div className="bg-green-50 rounded-sm p-4">
              <h4 className="font-medium text-green-800 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                Vos forces
              </h4>
              <div className="flex flex-wrap gap-2">
                {lifePath.strengthsFr.map((strength, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                  >
                    {strength}
                  </span>
                ))}
              </div>
            </div>

            {/* Défis */}
            <div className="bg-amber-50 rounded-sm p-4">
              <h4 className="font-medium text-amber-800 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
                Vos défis
              </h4>
              <div className="flex flex-wrap gap-2">
                {lifePath.challengesFr.map((challenge, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm"
                  >
                    {challenge}
                  </span>
                ))}
              </div>
            </div>

            {/* Compatibilité */}
            <div className="bg-purple-50 rounded-sm p-4">
              <h4 className="font-medium text-purple-800 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                Nombres compatibles
              </h4>
              <div className="flex gap-3">
                {lifePath.compatibleNumbers.map((num) => (
                  <span
                    key={num}
                    className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold"
                  >
                    {num}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Formulaire de calcul numérologique
 */
export function NumerologyForm({
  onCalculate,
  isLoading = false,
}: {
  onCalculate: (birthDate: Date, name?: string) => void;
  isLoading?: boolean;
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dateStr = formData.get('birthDate') as string;
    const name = formData.get('name') as string;

    if (dateStr) {
      const [year, month, day] = dateStr.split('-').map(Number);
      const birthDate = new Date(year, month - 1, day);
      onCalculate(birthDate, name || undefined);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-sm shadow-lg p-6">
      <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6">
        Calculez votre chemin de vie
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
            Date de naissance *
          </label>
          <input
            type="date"
            name="birthDate"
            required
            className="w-full px-4 py-3 rounded-sm border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
            Nom complet (optionnel)
          </label>
          <input
            type="text"
            name="name"
            placeholder="Pour le nombre d'expression"
            className="w-full px-4 py-3 rounded-sm border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
          <p className="text-xs text-[var(--color-text-muted)] mt-1">
            Permet de calculer votre nombre d'expression
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isLoading ? 'Calcul en cours...' : 'Calculer mon profil'}
        </button>
      </div>
    </form>
  );
}

/**
 * Affichage compact d'un nombre numérologique
 */
export function NumerologyBadge({
  number,
  label,
  description,
}: {
  number: number;
  label: string;
  description?: string;
}) {
  return (
    <div className="bg-[var(--color-bg-tertiary)] rounded-sm p-4 text-center">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 text-white flex items-center justify-center text-xl font-bold mx-auto mb-2">
        {number}
      </div>
      <p className="font-medium text-sm text-[var(--color-text-primary)]">{label}</p>
      {description && (
        <p className="text-xs text-[var(--color-text-muted)] mt-1">{description}</p>
      )}
    </div>
  );
}
