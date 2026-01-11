'use client';

import { NumerologyProfile } from '@/lib/api/types';

interface NumerologyCardProps {
  profile: NumerologyProfile;
  showDetails?: boolean;
}

export function NumerologyCard({ profile, showDetails = true }: NumerologyCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white text-center">
        <p className="text-sm text-white/70 mb-2">Votre chemin de vie</p>
        <div className="text-6xl font-bold mb-2">{profile.lifePathNumber}</div>
        <p className="text-xl font-medium">{profile.lifePathNameFr}</p>
      </div>

      {/* Contenu */}
      <div className="p-6">
        <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
          {profile.descriptionFr}
        </p>

        {showDetails && (
          <div className="space-y-4">
            {/* Points forts */}
            <div className="bg-green-50 rounded-xl p-4">
              <h4 className="font-medium text-green-800 mb-2 flex items-center gap-2">
                <span>💪</span> Vos forces
              </h4>
              <div className="flex flex-wrap gap-2">
                {profile.strengthsFr.map((strength, index) => (
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
            <div className="bg-amber-50 rounded-xl p-4">
              <h4 className="font-medium text-amber-800 mb-2 flex items-center gap-2">
                <span>🎯</span> Vos défis
              </h4>
              <div className="flex flex-wrap gap-2">
                {profile.challengesFr.map((challenge, index) => (
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
            <div className="bg-purple-50 rounded-xl p-4">
              <h4 className="font-medium text-purple-800 mb-2 flex items-center gap-2">
                <span>💕</span> Nombres compatibles
              </h4>
              <div className="flex gap-3">
                {profile.compatibleNumbers.map((num) => (
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
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6">
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
            className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
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
            className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
          <p className="text-xs text-[var(--color-text-muted)] mt-1">
            Permet de calculer votre nombre d'expression
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
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
    <div className="bg-[var(--color-bg-tertiary)] rounded-xl p-4 text-center">
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
