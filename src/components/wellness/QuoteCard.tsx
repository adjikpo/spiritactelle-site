'use client';

import { useState } from 'react';
import { Quote } from '@/lib/api/types';

interface QuoteCardProps {
  quote: Quote;
  variant?: 'default' | 'featured' | 'minimal';
  onRefresh?: () => void;
  showRefresh?: boolean;
}

export function QuoteCard({
  quote,
  variant = 'default',
  onRefresh,
  showRefresh = false,
}: QuoteCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleRefresh = () => {
    if (onRefresh) {
      setIsAnimating(true);
      onRefresh();
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  if (variant === 'featured') {
    return (
      <div className="relative bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent-purple)] rounded-2xl p-8 text-white overflow-hidden">
        {/* Motif décoratif */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M0 50 Q 25 0, 50 50 T 100 50 T 150 50" />
          </svg>
        </div>

        <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          <span className="text-4xl mb-4 block opacity-50">❝</span>
          <blockquote className="text-xl sm:text-2xl font-light leading-relaxed mb-6">
            {quote.text}
          </blockquote>
          <footer className="flex items-center justify-between">
            <cite className="not-italic font-medium opacity-80">— {quote.author}</cite>
            {showRefresh && (
              <button
                onClick={handleRefresh}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                aria-label="Nouvelle citation"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            )}
          </footer>
        </div>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className="text-center py-6">
        <p className="text-lg text-[var(--color-text-primary)] italic mb-2">
          « {quote.text} »
        </p>
        <p className="text-sm text-[var(--color-text-muted)]">— {quote.author}</p>
      </div>
    );
  }

  // Default variant
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-[var(--color-border)]">
      <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex items-start gap-3">
          <span className="text-3xl text-[var(--color-accent-gold)] opacity-50">❝</span>
          <div className="flex-1">
            <p className="text-[var(--color-text-primary)] leading-relaxed mb-3">
              {quote.text}
            </p>
            <div className="flex items-center justify-between">
              <p className="text-sm text-[var(--color-text-muted)] font-medium">
                — {quote.author}
              </p>
              {showRefresh && (
                <button
                  onClick={handleRefresh}
                  className="p-1.5 rounded-full hover:bg-[var(--color-bg-tertiary)] transition-colors text-[var(--color-text-muted)]"
                  aria-label="Nouvelle citation"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton de chargement pour QuoteCard
 */
export function QuoteCardSkeleton({ variant = 'default' }: { variant?: 'default' | 'featured' }) {
  if (variant === 'featured') {
    return (
      <div className="bg-[var(--color-border)] rounded-2xl p-8 animate-pulse">
        <div className="h-8 w-8 bg-white/20 rounded mb-4" />
        <div className="space-y-3">
          <div className="h-6 bg-white/20 rounded w-full" />
          <div className="h-6 bg-white/20 rounded w-5/6" />
          <div className="h-6 bg-white/20 rounded w-4/6" />
        </div>
        <div className="h-4 bg-white/20 rounded w-32 mt-6" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-[var(--color-border)] animate-pulse">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-[var(--color-border)] rounded" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-[var(--color-border)] rounded w-full" />
          <div className="h-4 bg-[var(--color-border)] rounded w-5/6" />
          <div className="h-4 bg-[var(--color-border)] rounded w-4/6" />
          <div className="h-3 bg-[var(--color-border)] rounded w-24 mt-3" />
        </div>
      </div>
    </div>
  );
}
