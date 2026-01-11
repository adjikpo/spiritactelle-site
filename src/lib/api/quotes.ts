/**
 * Service de citations et affirmations
 * APIs: Zen Quotes, Affirmations.dev, Advice Slip
 */

import { Quote, Affirmation, Advice } from './types';
import { FALLBACK_QUOTES, FALLBACK_AFFIRMATIONS } from './constants';

const ZEN_QUOTES_URL = 'https://zenquotes.io/api';
const AFFIRMATIONS_URL = 'https://www.affirmations.dev/';
const ADVICE_SLIP_URL = 'https://api.adviceslip.com/advice';

/**
 * Récupère une citation aléatoire depuis Zen Quotes
 */
export async function fetchRandomQuote(): Promise<Quote> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

    const response = await fetch(`${ZEN_QUOTES_URL}/random`, {
      next: { revalidate: 3600 }, // Cache 1 heure
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data[0]) {
      return {
        text: data[0].q,
        author: data[0].a,
      };
    }

    throw new Error('Invalid response format');
  } catch {
    // Retourner une citation de fallback silencieusement
    return FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
  }
}

/**
 * Récupère la citation du jour depuis Zen Quotes
 */
export async function fetchQuoteOfTheDay(): Promise<Quote> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

    const response = await fetch(`${ZEN_QUOTES_URL}/today`, {
      next: { revalidate: 86400 }, // Cache 24 heures
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data[0]) {
      return {
        text: data[0].q,
        author: data[0].a,
      };
    }

    throw new Error('Invalid response format');
  } catch {
    // Utiliser la date pour avoir une citation "stable" pour la journée
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
    );
    return FALLBACK_QUOTES[dayOfYear % FALLBACK_QUOTES.length];
  }
}

/**
 * Récupère plusieurs citations aléatoires
 */
export async function fetchMultipleQuotes(count: number = 5): Promise<Quote[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

    const response = await fetch(`${ZEN_QUOTES_URL}/quotes`, {
      next: { revalidate: 3600 },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (Array.isArray(data)) {
      return data.slice(0, count).map((item: { q: string; a: string }) => ({
        text: item.q,
        author: item.a,
      }));
    }

    throw new Error('Invalid response format');
  } catch {
    // Retourner des citations de fallback
    return FALLBACK_QUOTES.slice(0, count);
  }
}

/**
 * Récupère une affirmation positive depuis Affirmations.dev
 */
export async function fetchAffirmation(): Promise<Affirmation> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

    const response = await fetch(AFFIRMATIONS_URL, {
      next: { revalidate: 300 }, // Cache 5 minutes
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.affirmation) {
      return {
        text: data.affirmation,
      };
    }

    throw new Error('Invalid response format');
  } catch {
    // Retourner une affirmation de fallback en français
    return {
      text: FALLBACK_AFFIRMATIONS[Math.floor(Math.random() * FALLBACK_AFFIRMATIONS.length)],
    };
  }
}

/**
 * Récupère un conseil de vie depuis Advice Slip
 */
export async function fetchAdvice(): Promise<Advice> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

    // Ajouter un timestamp pour éviter le cache
    const response = await fetch(`${ADVICE_SLIP_URL}?timestamp=${Date.now()}`, {
      cache: 'no-store',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.slip) {
      return {
        id: data.slip.id,
        text: data.slip.advice,
      };
    }

    throw new Error('Invalid response format');
  } catch {
    return {
      id: 0,
      text: "Prenez le temps d'apprécier les petites choses de la vie.",
    };
  }
}

/**
 * Recherche un conseil par mot-clé
 */
export async function searchAdvice(query: string): Promise<Advice[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

    const response = await fetch(`${ADVICE_SLIP_URL}/search/${encodeURIComponent(query)}`, {
      cache: 'no-store',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 404) {
        return [];
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.slips && Array.isArray(data.slips)) {
      return data.slips.map((slip: { id: number; advice: string }) => ({
        id: slip.id,
        text: slip.advice,
      }));
    }

    return [];
  } catch {
    return [];
  }
}

/**
 * Catégories de citations pour le filtrage local
 */
export const QUOTE_CATEGORIES = [
  { key: 'all', label: 'Toutes', labelFr: 'Toutes' },
  { key: 'motivation', label: 'Motivation', labelFr: 'Motivation' },
  { key: 'wisdom', label: 'Wisdom', labelFr: 'Sagesse' },
  { key: 'love', label: 'Love', labelFr: 'Amour' },
  { key: 'spirituality', label: 'Spirituality', labelFr: 'Spiritualité' },
  { key: 'mindfulness', label: 'Mindfulness', labelFr: 'Pleine conscience' },
];

/**
 * Citations locales par catégorie (fallback enrichi)
 */
export const CATEGORIZED_QUOTES: Record<string, Quote[]> = {
  motivation: [
    { text: "Le succès n'est pas final, l'échec n'est pas fatal. C'est le courage de continuer qui compte.", author: "Winston Churchill" },
    { text: "Croyez en vos rêves et ils se réaliseront peut-être. Croyez en vous et ils se réaliseront sûrement.", author: "Martin Luther King" },
    { text: "La seule façon de faire du bon travail est d'aimer ce que vous faites.", author: "Steve Jobs" },
  ],
  wisdom: [
    { text: "La connaissance parle, mais la sagesse écoute.", author: "Jimi Hendrix" },
    { text: "Le sage ne dit pas ce qu'il sait, le sot ne sait pas ce qu'il dit.", author: "Proverbe chinois" },
    { text: "La vraie sagesse est de savoir ce que l'on ignore.", author: "Socrate" },
  ],
  love: [
    { text: "L'amour ne se regarde pas l'un l'autre, mais dans la même direction.", author: "Antoine de Saint-Exupéry" },
    { text: "Aimer, c'est savoir dire je t'aime sans parler.", author: "Victor Hugo" },
    { text: "L'amour est la seule folie acceptable.", author: "Anonyme" },
  ],
  spirituality: [
    { text: "Nous ne sommes pas des êtres humains vivant une expérience spirituelle, mais des êtres spirituels vivant une expérience humaine.", author: "Pierre Teilhard de Chardin" },
    { text: "L'âme n'a pas de secret que le comportement ne révèle.", author: "Lao Tseu" },
    { text: "La spiritualité n'est pas une religion. C'est un chemin pour trouver la paix intérieure.", author: "Anonyme" },
  ],
  mindfulness: [
    { text: "Le moment présent est le seul moment qui existe vraiment.", author: "Thich Nhat Hanh" },
    { text: "Là où vous êtes, soyez-y totalement.", author: "Eckhart Tolle" },
    { text: "La pleine conscience est simplement être conscient de ce qui se passe maintenant.", author: "Jon Kabat-Zinn" },
  ],
};
