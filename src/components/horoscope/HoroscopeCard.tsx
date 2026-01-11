'use client';

import { HoroscopeData, ZodiacSignKey } from '@/lib/api/types';
import { ZODIAC_SIGNS } from '@/lib/api/constants';

interface HoroscopeCardProps {
  horoscope: HoroscopeData;
  showDetails?: boolean;
}

export function HoroscopeCard({ horoscope, showDetails = true }: HoroscopeCardProps) {
  const signInfo = ZODIAC_SIGNS[horoscope.sign];

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header avec gradient */}
      <div
        className="p-6 text-white"
        style={{
          background: `linear-gradient(135deg, ${signInfo.color}, ${adjustColor(signInfo.color, -20)})`,
        }}
      >
        <div className="flex items-center gap-4">
          <span className="text-5xl">{signInfo.emoji}</span>
          <div>
            <h2 className="text-2xl font-bold">{signInfo.nameFr}</h2>
            <p className="text-white/80 text-sm">{signInfo.dateRangeFr}</p>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-6">
        {/* Description */}
        <p className="text-[var(--color-text-primary)] leading-relaxed mb-6">
          {horoscope.description}
        </p>

        {/* Détails */}
        {showDetails && (
          <div className="grid grid-cols-2 gap-4">
            {horoscope.mood && (
              <div className="bg-[var(--color-bg-tertiary)] rounded-xl p-3">
                <p className="text-xs text-[var(--color-text-muted)] mb-1">Humeur</p>
                <p className="font-medium text-[var(--color-text-primary)]">{horoscope.mood}</p>
              </div>
            )}
            {horoscope.color && (
              <div className="bg-[var(--color-bg-tertiary)] rounded-xl p-3">
                <p className="text-xs text-[var(--color-text-muted)] mb-1">Couleur du jour</p>
                <p className="font-medium text-[var(--color-text-primary)]">{horoscope.color}</p>
              </div>
            )}
            {horoscope.luckyNumber && (
              <div className="bg-[var(--color-bg-tertiary)] rounded-xl p-3">
                <p className="text-xs text-[var(--color-text-muted)] mb-1">Nombre chanceux</p>
                <p className="font-medium text-[var(--color-text-primary)]">{horoscope.luckyNumber}</p>
              </div>
            )}
            {horoscope.compatibility && (
              <div className="bg-[var(--color-bg-tertiary)] rounded-xl p-3">
                <p className="text-xs text-[var(--color-text-muted)] mb-1">Compatibilité</p>
                <p className="font-medium text-[var(--color-text-primary)]">{horoscope.compatibility}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Version compacte de l'horoscope pour les listes
 */
export function HoroscopeCardCompact({
  horoscope,
  onClick,
}: {
  horoscope: HoroscopeData;
  onClick?: () => void;
}) {
  const signInfo = ZODIAC_SIGNS[horoscope.sign];

  return (
    <div
      className={`
        bg-white rounded-xl p-4 border border-[var(--color-border)]
        hover:shadow-md transition-all duration-200
        ${onClick ? 'cursor-pointer' : ''}
      `}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <span className="text-3xl" style={{ color: signInfo.color }}>
          {signInfo.emoji}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-[var(--color-text-primary)]">{signInfo.nameFr}</h3>
          <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mt-1">
            {horoscope.description}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton de chargement pour HoroscopeCard
 */
export function HoroscopeCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
      <div className="h-32 bg-[var(--color-border)]" />
      <div className="p-6 space-y-4">
        <div className="h-4 bg-[var(--color-border)] rounded w-full" />
        <div className="h-4 bg-[var(--color-border)] rounded w-5/6" />
        <div className="h-4 bg-[var(--color-border)] rounded w-4/6" />
        <div className="grid grid-cols-2 gap-4 mt-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 bg-[var(--color-border)] rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Ajuste la luminosité d'une couleur hex
 */
function adjustColor(color: string, amount: number): string {
  const clamp = (num: number) => Math.min(255, Math.max(0, num));

  const hex = color.replace('#', '');
  const r = clamp(parseInt(hex.substring(0, 2), 16) + amount);
  const g = clamp(parseInt(hex.substring(2, 4), 16) + amount);
  const b = clamp(parseInt(hex.substring(4, 6), 16) + amount);

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
