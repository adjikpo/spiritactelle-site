'use client';

import { useState } from 'react';
import { Affirmation } from '@/lib/api/types';

interface AffirmationCardProps {
  affirmation: Affirmation;
  onRefresh?: () => void;
}

export function AffirmationCard({ affirmation, onRefresh }: AffirmationCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleRefresh = () => {
    if (onRefresh) {
      setIsAnimating(true);
      onRefresh();
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center flex-shrink-0">
          <span className="text-2xl">🌟</span>
        </div>

        <div className="flex-1">
          <p className="text-xs text-amber-600 font-medium uppercase tracking-wide mb-2">
            {affirmation.category || 'Affirmation du jour'}
          </p>
          <p
            className={`text-lg text-amber-900 font-medium leading-relaxed transition-opacity duration-300 ${
              isAnimating ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {affirmation.text}
          </p>
        </div>

        {onRefresh && (
          <button
            onClick={handleRefresh}
            className="p-2 rounded-full hover:bg-amber-100 transition-colors text-amber-600"
            aria-label="Nouvelle affirmation"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Liste d'affirmations
 */
export function AffirmationList({ affirmations }: { affirmations: string[] }) {
  return (
    <div className="space-y-3">
      {affirmations.map((affirmation, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-4 border border-[var(--color-border)] flex items-start gap-3"
        >
          <span className="text-xl">✨</span>
          <p className="text-[var(--color-text-primary)]">{affirmation}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton de chargement
 */
export function AffirmationCardSkeleton() {
  return (
    <div className="bg-amber-50 rounded-2xl p-6 animate-pulse">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-amber-200" />
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-amber-200 rounded w-24" />
          <div className="h-5 bg-amber-200 rounded w-full" />
          <div className="h-5 bg-amber-200 rounded w-4/5" />
        </div>
      </div>
    </div>
  );
}
