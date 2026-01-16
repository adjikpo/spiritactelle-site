'use client';

import { useState, useEffect, useCallback } from 'react';
import { QuoteCard } from '@/components/wellness';
import { BackButton } from '@/components/layout';
import { fetchRandomQuote, fetchQuoteOfTheDay } from '@/lib/api';
import { Quote } from '@/lib/api/types';

const QUOTE_CATEGORIES = [
  { id: 'all', label: 'Toutes' },
  { id: 'wisdom', label: 'Sagesse' },
  { id: 'love', label: 'Amour' },
  { id: 'motivation', label: 'Motivation' },
  { id: 'peace', label: 'Paix' },
  { id: 'growth', label: 'Croissance' },
];

export default function CitationsPage() {
  const [quoteOfDay, setQuoteOfDay] = useState<Quote | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Charger les citations initiales
  useEffect(() => {
    const loadInitialQuotes = async () => {
      setIsLoading(true);
      try {
        const [dailyQuote, ...randomQuotes] = await Promise.all([
          fetchQuoteOfTheDay(),
          ...Array(6).fill(null).map(() => fetchRandomQuote()),
        ]);
        setQuoteOfDay(dailyQuote);
        setQuotes(randomQuotes);
      } catch (error) {
        console.error('Error loading quotes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialQuotes();
  }, []);

  // Charger plus de citations
  const loadMoreQuotes = useCallback(async () => {
    setIsLoadingMore(true);
    try {
      const newQuotes = await Promise.all(
        Array(4).fill(null).map(() => fetchRandomQuote())
      );
      setQuotes((prev) => [...prev, ...newQuotes]);
    } catch (error) {
      console.error('Error loading more quotes:', error);
    } finally {
      setIsLoadingMore(false);
    }
  }, []);

  // Nouvelle citation aléatoire
  const getNewQuote = useCallback(async () => {
    try {
      const newQuote = await fetchRandomQuote();
      setQuotes((prev) => [newQuote, ...prev]);
    } catch (error) {
      console.error('Error getting new quote:', error);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Retour */}
        <div className="mb-6">
          <BackButton href="/bien-etre" label="Bien-être" />
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3">
            Citations Inspirantes
          </h1>
          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Laissez-vous inspirer par ces pensées profondes qui nourrissent l'âme
            et éveillent la conscience.
          </p>
        </div>

        {/* Citation du jour */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">
            Citation du Jour
          </h2>
          {isLoading ? (
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-sm p-8 animate-pulse">
              <div className="h-8 bg-purple-200 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-purple-200 rounded w-1/4 mx-auto"></div>
            </div>
          ) : quoteOfDay ? (
            <QuoteCard quote={quoteOfDay} variant="featured" />
          ) : null}
        </div>

        {/* Catégories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {QUOTE_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                px-4 py-2 rounded-sm text-sm font-medium transition-all
                ${
                  selectedCategory === category.id
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-white text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]'
                }
              `}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Bouton nouvelle citation */}
        <div className="flex justify-center mb-8">
          <button
            onClick={getNewQuote}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Nouvelle citation
          </button>
        </div>

        {/* Grille de citations */}
        <div className="space-y-6">
          {isLoading ? (
            Array(4)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-sm p-6 shadow-md animate-pulse"
                >
                  <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              ))
          ) : (
            quotes.map((quote, index) => (
              <QuoteCard
                key={`${quote.text}-${index}`}
                quote={quote}
                variant={index % 3 === 0 ? 'default' : 'minimal'}
              />
            ))
          )}
        </div>

        {/* Charger plus */}
        {!isLoading && quotes.length > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={loadMoreQuotes}
              disabled={isLoadingMore}
              className="px-8 py-3 bg-white rounded-sm text-[var(--color-text-primary)] font-medium shadow-md hover:shadow-lg transition-shadow disabled:opacity-50"
            >
              {isLoadingMore ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Chargement...
                </span>
              ) : (
                'Voir plus de citations'
              )}
            </button>
          </div>
        )}

        {/* Section partage */}
        <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-sm p-6 border border-indigo-100">
          <h3 className="font-bold text-indigo-800 mb-3">
            Conseil du jour
          </h3>
          <p className="text-indigo-700">
            Choisissez une citation qui résonne avec vous et méditez dessus pendant quelques minutes.
            Laissez sa sagesse infuser votre journée et guider vos actions.
          </p>
        </div>
      </div>
    </div>
  );
}
