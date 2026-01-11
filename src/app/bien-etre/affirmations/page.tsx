'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { AffirmationCard } from '@/components/wellness';
import { fetchAffirmation } from '@/lib/api';
import { Affirmation } from '@/lib/api/types';

const AFFIRMATION_THEMES = [
  {
    id: 'confiance',
    title: 'Confiance en soi',
    affirmations: [
      'Je suis capable de réaliser tout ce que j\'entreprends.',
      'Ma confiance grandit chaque jour.',
      'Je m\'accepte tel(le) que je suis.',
      'Je mérite le succès et le bonheur.',
      'Ma voix compte et mérite d\'être entendue.',
    ],
  },
  {
    id: 'abondance',
    title: 'Abondance',
    affirmations: [
      'L\'abondance coule vers moi naturellement.',
      'Je suis ouvert(e) à recevoir tous les bienfaits de l\'univers.',
      'L\'argent vient à moi facilement et régulièrement.',
      'Je vis dans la gratitude et l\'abondance.',
      'Je mérite la prospérité dans tous les domaines de ma vie.',
    ],
  },
  {
    id: 'amour',
    title: 'Amour',
    affirmations: [
      'Je suis digne d\'un amour profond et véritable.',
      'J\'attire des relations saines et épanouissantes.',
      'Mon cœur est ouvert à donner et recevoir l\'amour.',
      'Je m\'aime inconditionnellement.',
      'L\'amour m\'entoure et me guide.',
    ],
  },
  {
    id: 'paix',
    title: 'Paix intérieure',
    affirmations: [
      'Je choisis la paix dans chaque moment.',
      'Mon esprit est calme et serein.',
      'Je lâche prise sur ce que je ne peux pas contrôler.',
      'La paix habite mon cœur.',
      'Je respire profondément et je me détends.',
    ],
  },
  {
    id: 'sante',
    title: 'Santé & Vitalité',
    affirmations: [
      'Mon corps est en parfaite santé.',
      'Je nourris mon corps avec amour et respect.',
      'Chaque cellule de mon corps vibre de santé.',
      'Je choisis des pensées qui soutiennent ma guérison.',
      'Mon énergie vitale est forte et équilibrée.',
    ],
  },
  {
    id: 'creativite',
    title: 'Créativité',
    affirmations: [
      'Ma créativité est infinie et unique.',
      'Les idées créatives me viennent facilement.',
      'J\'exprime librement ma créativité.',
      'Mon imagination est une source de joie.',
      'Je suis un canal pour l\'inspiration divine.',
    ],
  },
];

export default function AffirmationsPage() {
  const [currentAffirmation, setCurrentAffirmation] = useState<Affirmation | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [themeIndex, setThemeIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Charger une affirmation au démarrage
  useEffect(() => {
    const loadAffirmation = async () => {
      try {
        const affirmation = await fetchAffirmation();
        setCurrentAffirmation(affirmation);
      } catch (error) {
        console.error('Error loading affirmation:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAffirmation();

    // Charger les favoris du localStorage
    const savedFavorites = localStorage.getItem('spiritactelle_affirmation_favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Nouvelle affirmation aléatoire
  const getNewAffirmation = useCallback(async () => {
    setIsLoading(true);
    try {
      const affirmation = await fetchAffirmation();
      setCurrentAffirmation(affirmation);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Affirmation suivante du thème
  const nextThemeAffirmation = useCallback(() => {
    if (!selectedTheme) return;
    const theme = AFFIRMATION_THEMES.find((t) => t.id === selectedTheme);
    if (!theme) return;

    const nextIndex = (themeIndex + 1) % theme.affirmations.length;
    setThemeIndex(nextIndex);
    setCurrentAffirmation({
      text: theme.affirmations[nextIndex],
      category: theme.title,
    });
  }, [selectedTheme, themeIndex]);

  // Sélectionner un thème
  const selectTheme = (themeId: string) => {
    const theme = AFFIRMATION_THEMES.find((t) => t.id === themeId);
    if (!theme) return;

    setSelectedTheme(themeId);
    setThemeIndex(0);
    setCurrentAffirmation({
      text: theme.affirmations[0],
      category: theme.title,
    });
  };

  // Ajouter/retirer des favoris
  const toggleFavorite = (text: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(text)
        ? prev.filter((f) => f !== text)
        : [...prev, text];
      localStorage.setItem('spiritactelle_affirmation_favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Retour */}
        <Link
          href="/bien-etre"
          className="inline-flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] mb-6"
        >
          <span>←</span>
          <span>Bien-être</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3">
            Affirmations Positives
          </h1>
          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Reprogrammez votre esprit avec des pensées positives. Répétez ces affirmations
            chaque jour pour transformer votre vie.
          </p>
        </div>

        {/* Affirmation principale */}
        <div className="mb-10">
          {isLoading ? (
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-10 animate-pulse">
              <div className="h-8 bg-amber-200 rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-8 bg-amber-200 rounded w-1/2 mx-auto"></div>
            </div>
          ) : currentAffirmation ? (
            <div className="relative">
              <AffirmationCard affirmation={currentAffirmation} />
              <button
                onClick={() => currentAffirmation && toggleFavorite(currentAffirmation.text)}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                  currentAffirmation && favorites.includes(currentAffirmation.text)
                    ? 'text-red-500'
                    : 'text-gray-400 hover:text-red-500'
                }`}
              >
                <svg className="w-6 h-6" fill={currentAffirmation && favorites.includes(currentAffirmation.text) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          ) : null}
        </div>

        {/* Boutons d'action */}
        <div className="flex justify-center gap-4 mb-10">
          {selectedTheme ? (
            <button
              onClick={nextThemeAffirmation}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <span>Suivante</span>
              <span>→</span>
            </button>
          ) : (
            <button
              onClick={getNewAffirmation}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Nouvelle affirmation
            </button>
          )}
          {selectedTheme && (
            <button
              onClick={() => setSelectedTheme(null)}
              className="px-6 py-3 bg-white rounded-xl text-[var(--color-text-primary)] font-medium shadow-md hover:shadow-lg transition-shadow"
            >
              Thème aléatoire
            </button>
          )}
        </div>

        {/* Thèmes */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">
            Choisissez un thème
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {AFFIRMATION_THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => selectTheme(theme.id)}
                className={`
                  p-4 rounded-xl text-left transition-all
                  ${
                    selectedTheme === theme.id
                      ? 'bg-gradient-to-br from-amber-100 to-orange-100 border-2 border-amber-400'
                      : 'bg-white border border-[var(--color-border)] hover:border-amber-300'
                  }
                `}
              >
                <h3 className="font-medium text-[var(--color-text-primary)]">{theme.title}</h3>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">
                  {theme.affirmations.length} affirmations
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Favoris */}
        {favorites.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">
              Mes favoris
            </h2>
            <div className="space-y-3">
              {favorites.map((text, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-white rounded-xl p-4 border border-[var(--color-border)]"
                >
                  <p className="flex-1 text-[var(--color-text-primary)]">{text}</p>
                  <button
                    onClick={() => toggleFavorite(text)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Guide d'utilisation */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
          <h3 className="font-bold text-purple-800 mb-4 flex items-center gap-2">
            <span>📖</span> Comment utiliser les affirmations
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-purple-700">
            <div className="flex items-start gap-2">
              <span className="font-bold">1.</span>
              <p>Choisissez une affirmation qui résonne avec vos besoins actuels.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold">2.</span>
              <p>Répétez-la à voix haute, avec conviction, au moins 3 fois.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold">3.</span>
              <p>Visualisez-vous en train de vivre cette affirmation.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold">4.</span>
              <p>Pratiquez chaque matin au réveil et chaque soir avant de dormir.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
