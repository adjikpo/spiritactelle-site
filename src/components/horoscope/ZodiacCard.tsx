'use client';

import Link from 'next/link';
import { ZodiacSignKey } from '@/lib/api/types';
import { ZODIAC_SIGNS } from '@/lib/api/constants';
import { zodiacIconsByKey } from '@/components/icons';

interface ZodiacCardProps {
  sign: ZodiacSignKey;
  variant?: 'compact' | 'full';
  showLink?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

export function ZodiacCard({
  sign,
  variant = 'compact',
  showLink = true,
  isSelected = false,
  onClick,
}: ZodiacCardProps) {
  const signInfo = ZODIAC_SIGNS[sign];
  const IconComponent = zodiacIconsByKey[sign];

  const content = (
    <div
      className={`
        relative rounded-sm p-4 transition-all duration-300
        ${variant === 'compact' ? 'text-center' : 'text-left'}
        ${isSelected
          ? 'bg-[var(--color-primary)] text-white shadow-lg scale-105'
          : 'bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-lg hover:scale-102 border border-[var(--color-border)]'
        }
        ${onClick ? 'cursor-pointer' : ''}
      `}
      onClick={onClick}
    >
      {/* Icône SVG */}
      <div
        className={`
          mb-2 flex justify-center
          ${variant === 'compact' ? '' : 'justify-start'}
        `}
      >
        <div
          className={`
            w-12 h-12 rounded-sm flex items-center justify-center
            ${isSelected
              ? 'bg-white/20'
              : 'bg-[var(--color-primary)]/10'
            }
          `}
        >
          <IconComponent
            size={28}
            className={isSelected ? 'text-white' : 'text-[var(--color-primary)]'}
          />
        </div>
      </div>

      {/* Nom */}
      <h3
        className={`
          font-bold mb-1
          ${variant === 'compact' ? 'text-sm' : 'text-lg'}
          ${isSelected ? 'text-white' : 'text-[var(--color-text-primary)]'}
        `}
      >
        {signInfo.nameFr}
      </h3>

      {/* Date range */}
      <p
        className={`
          text-xs
          ${isSelected ? 'text-white/80' : 'text-[var(--color-text-muted)]'}
        `}
      >
        {signInfo.dateRangeFr}
      </p>

      {/* Version complète - infos supplémentaires */}
      {variant === 'full' && (
        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <span className={isSelected ? 'text-white/60' : 'text-[var(--color-text-muted)]'}>
              Élément:
            </span>
            <span className={`font-medium ${isSelected ? 'text-white' : ''}`}>
              {signInfo.elementFr}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className={isSelected ? 'text-white/60' : 'text-[var(--color-text-muted)]'}>
              Planète:
            </span>
            <span className={`font-medium ${isSelected ? 'text-white' : ''}`}>
              {signInfo.rulerFr}
            </span>
          </div>
          <p
            className={`
              text-xs mt-2 line-clamp-3
              ${isSelected ? 'text-white/80' : 'text-[var(--color-text-secondary)]'}
            `}
          >
            {signInfo.descriptionFr}
          </p>
        </div>
      )}
    </div>
  );

  if (showLink && !onClick) {
    return (
      <Link href={`/horoscope/${sign}`} className="block">
        {content}
      </Link>
    );
  }

  return content;
}

/**
 * Grille de tous les signes du zodiaque
 */
export function ZodiacGrid({
  variant = 'compact',
  selectedSign,
  onSelect,
}: {
  variant?: 'compact' | 'full';
  selectedSign?: ZodiacSignKey;
  onSelect?: (sign: ZodiacSignKey) => void;
}) {
  const signs: ZodiacSignKey[] = [
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
    'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces',
  ];

  return (
    <div
      className={`
        grid gap-3
        ${variant === 'compact'
          ? 'grid-cols-3 sm:grid-cols-4 md:grid-cols-6'
          : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
        }
      `}
    >
      {signs.map((sign) => (
        <ZodiacCard
          key={sign}
          sign={sign}
          variant={variant}
          showLink={!onSelect}
          isSelected={selectedSign === sign}
          onClick={onSelect ? () => onSelect(sign) : undefined}
        />
      ))}
    </div>
  );
}
