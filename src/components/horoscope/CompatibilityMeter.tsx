'use client';

import { Compatibility, CompatibilityLevel, ZodiacSignKey } from '@/lib/api/types';
import { ZODIAC_SIGNS } from '@/lib/api/constants';

interface CompatibilityMeterProps {
  compatibility: Compatibility;
}

export function CompatibilityMeter({ compatibility }: CompatibilityMeterProps) {
  const sign1Info = ZODIAC_SIGNS[compatibility.sign1];
  const sign2Info = ZODIAC_SIGNS[compatibility.sign2];

  const levelColors: Record<CompatibilityLevel, string> = {
    excellent: '#10B981',
    good: '#3B82F6',
    moderate: '#F59E0B',
    challenging: '#EF4444',
  };

  const levelLabels: Record<CompatibilityLevel, string> = {
    excellent: 'Excellente',
    good: 'Bonne',
    moderate: 'Modérée',
    challenging: 'Exigeante',
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header avec les deux signes */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="text-center">
          <span className="text-4xl block mb-1" style={{ color: sign1Info.color }}>
            {sign1Info.emoji}
          </span>
          <span className="font-medium text-sm">{sign1Info.nameFr}</span>
        </div>

        <div className="text-2xl text-[var(--color-accent-gold)]">❤️</div>

        <div className="text-center">
          <span className="text-4xl block mb-1" style={{ color: sign2Info.color }}>
            {sign2Info.emoji}
          </span>
          <span className="font-medium text-sm">{sign2Info.nameFr}</span>
        </div>
      </div>

      {/* Score et niveau */}
      <div className="text-center mb-6">
        <div className="text-5xl font-bold mb-2" style={{ color: levelColors[compatibility.level] }}>
          {compatibility.score}%
        </div>
        <div
          className="inline-block px-4 py-1 rounded-full text-sm font-medium text-white"
          style={{ backgroundColor: levelColors[compatibility.level] }}
        >
          {levelLabels[compatibility.level]}
        </div>
      </div>

      {/* Barre de progression */}
      <div className="mb-6">
        <div className="h-3 bg-[var(--color-bg-tertiary)] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${compatibility.score}%`,
              backgroundColor: levelColors[compatibility.level],
            }}
          />
        </div>
      </div>

      {/* Description */}
      <p className="text-[var(--color-text-secondary)] text-center mb-6">
        {compatibility.descriptionFr}
      </p>

      {/* Points forts et défis */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-green-50 rounded-xl p-4">
          <h4 className="font-medium text-green-800 mb-2 flex items-center gap-2">
            <span>✨</span> Points forts
          </h4>
          <ul className="space-y-1">
            {compatibility.strengthsFr.map((strength, index) => (
              <li key={index} className="text-sm text-green-700 flex items-start gap-2">
                <span className="text-green-500 mt-0.5">•</span>
                {strength}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-amber-50 rounded-xl p-4">
          <h4 className="font-medium text-amber-800 mb-2 flex items-center gap-2">
            <span>⚡</span> Défis
          </h4>
          <ul className="space-y-1">
            {compatibility.challengesFr.map((challenge, index) => (
              <li key={index} className="text-sm text-amber-700 flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">•</span>
                {challenge}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/**
 * Sélecteur de signes pour la compatibilité
 */
export function CompatibilitySelector({
  sign1,
  sign2,
  onSign1Change,
  onSign2Change,
}: {
  sign1: ZodiacSignKey;
  sign2: ZodiacSignKey;
  onSign1Change: (sign: ZodiacSignKey) => void;
  onSign2Change: (sign: ZodiacSignKey) => void;
}) {
  const signs: ZodiacSignKey[] = [
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
    'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces',
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-center mb-6">Calculer votre compatibilité</h3>

      <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
        {/* Sélecteur signe 1 */}
        <div className="w-full sm:w-auto">
          <label className="block text-sm text-[var(--color-text-muted)] mb-2 text-center">
            Votre signe
          </label>
          <select
            value={sign1}
            onChange={(e) => onSign1Change(e.target.value as ZodiacSignKey)}
            className="w-full sm:w-48 px-4 py-3 rounded-xl border border-[var(--color-border)] bg-white text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] appearance-none cursor-pointer"
          >
            {signs.map((sign) => (
              <option key={sign} value={sign}>
                {ZODIAC_SIGNS[sign].emoji} {ZODIAC_SIGNS[sign].nameFr}
              </option>
            ))}
          </select>
        </div>

        <span className="text-2xl">💕</span>

        {/* Sélecteur signe 2 */}
        <div className="w-full sm:w-auto">
          <label className="block text-sm text-[var(--color-text-muted)] mb-2 text-center">
            Son signe
          </label>
          <select
            value={sign2}
            onChange={(e) => onSign2Change(e.target.value as ZodiacSignKey)}
            className="w-full sm:w-48 px-4 py-3 rounded-xl border border-[var(--color-border)] bg-white text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] appearance-none cursor-pointer"
          >
            {signs.map((sign) => (
              <option key={sign} value={sign}>
                {ZODIAC_SIGNS[sign].emoji} {ZODIAC_SIGNS[sign].nameFr}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
