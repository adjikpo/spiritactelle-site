'use client';

import { useState, useRef, useEffect } from 'react';
import { Compatibility, CompatibilityLevel, ZodiacSignKey } from '@/lib/api/types';
import { ZODIAC_SIGNS } from '@/lib/api/constants';
import { zodiacIconsByKey } from '@/components/icons';

interface CompatibilityMeterProps {
  compatibility: Compatibility;
}

// Icone coeur SVG
function HeartIcon({ className, size = 24 }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Icone etoile SVG
function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

// Icone eclair SVG
function BoltIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" />
    </svg>
  );
}

export function CompatibilityMeter({ compatibility }: CompatibilityMeterProps) {
  const sign1Info = ZODIAC_SIGNS[compatibility.sign1];
  const sign2Info = ZODIAC_SIGNS[compatibility.sign2];
  const Sign1Icon = zodiacIconsByKey[compatibility.sign1];
  const Sign2Icon = zodiacIconsByKey[compatibility.sign2];

  const levelColors: Record<CompatibilityLevel, string> = {
    excellent: '#10B981',
    good: '#3B82F6',
    moderate: '#F59E0B',
    challenging: '#EF4444',
  };

  const levelLabels: Record<CompatibilityLevel, string> = {
    excellent: 'Excellente',
    good: 'Bonne',
    moderate: 'Moderee',
    challenging: 'Exigeante',
  };

  return (
    <div className="bg-white rounded-sm shadow-lg p-6 border border-[var(--color-border)]">
      {/* Header avec les deux signes */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="text-center">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mb-1 mx-auto"
            style={{ backgroundColor: `${sign1Info.color}15` }}
          >
            {Sign1Icon && <Sign1Icon size={28} style={{ color: sign1Info.color }} />}
          </div>
          <span className="font-medium text-sm">{sign1Info.nameFr}</span>
        </div>

        <HeartIcon className="text-rose-500" size={24} />

        <div className="text-center">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mb-1 mx-auto"
            style={{ backgroundColor: `${sign2Info.color}15` }}
          >
            {Sign2Icon && <Sign2Icon size={28} style={{ color: sign2Info.color }} />}
          </div>
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

      {/* Points forts et defis */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-green-50 rounded-sm p-4 border border-green-100">
          <h4 className="font-medium text-green-800 mb-2 flex items-center gap-2">
            <StarIcon className="w-4 h-4 text-green-600" />
            Points forts
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

        <div className="bg-amber-50 rounded-sm p-4 border border-amber-100">
          <h4 className="font-medium text-amber-800 mb-2 flex items-center gap-2">
            <BoltIcon className="w-4 h-4 text-amber-600" />
            Defis
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
 * Dropdown personnalise avec icones SVG
 */
function ZodiacDropdown({
  value,
  onChange,
  label,
}: {
  value: ZodiacSignKey;
  onChange: (sign: ZodiacSignKey) => void;
  label: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const signs: ZodiacSignKey[] = [
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
    'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces',
  ];

  const SelectedIcon = zodiacIconsByKey[value];
  const selectedSign = ZODIAC_SIGNS[value];

  // Fermer le dropdown en cliquant a l'exterieur
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full sm:w-auto" ref={dropdownRef}>
      <label className="block text-sm text-[var(--color-text-muted)] mb-2 text-center">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full sm:w-48 px-4 py-3 rounded-sm border border-[var(--color-border)] bg-white text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] cursor-pointer flex items-center gap-3"
        >
          {SelectedIcon && <SelectedIcon size={20} style={{ color: selectedSign.color }} />}
          <span className="flex-1 text-left">{selectedSign.nameFr}</span>
          <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white rounded-sm border border-[var(--color-border)] shadow-lg max-h-64 overflow-y-auto">
            {signs.map((sign) => {
              const SignIcon = zodiacIconsByKey[sign];
              const signInfo = ZODIAC_SIGNS[sign];
              return (
                <button
                  key={sign}
                  type="button"
                  onClick={() => {
                    onChange(sign);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2 flex items-center gap-3 hover:bg-[var(--color-bg-tertiary)] transition-colors ${
                    value === sign ? 'bg-[var(--color-bg-secondary)]' : ''
                  }`}
                >
                  {SignIcon && <SignIcon size={20} style={{ color: signInfo.color }} />}
                  <span>{signInfo.nameFr}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Selecteur de signes pour la compatibilite
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
  return (
    <div className="bg-white rounded-sm shadow-lg p-6 border border-[var(--color-border)]">
      <h3 className="text-lg font-bold text-center mb-6">Calculer votre compatibilite</h3>

      <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
        <ZodiacDropdown
          value={sign1}
          onChange={onSign1Change}
          label="Votre signe"
        />

        <HeartIcon className="text-rose-400" size={24} />

        <ZodiacDropdown
          value={sign2}
          onChange={onSign2Change}
          label="Son signe"
        />
      </div>
    </div>
  );
}
