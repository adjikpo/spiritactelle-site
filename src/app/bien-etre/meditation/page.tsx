'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { BackButton } from '@/components/layout';

const MEDITATION_SESSIONS = [
  {
    id: 'respiration',
    title: 'Respiration Consciente',
    duration: 5,
    description: 'Calmez votre esprit avec des exercices de respiration guidée.',
    color: 'from-blue-400 to-cyan-400',
    steps: [
      { instruction: 'Installez-vous confortablement', duration: 10 },
      { instruction: 'Fermez les yeux doucement', duration: 5 },
      { instruction: 'Inspirez profondément par le nez... 4 temps', duration: 4 },
      { instruction: 'Retenez votre souffle... 4 temps', duration: 4 },
      { instruction: 'Expirez lentement par la bouche... 6 temps', duration: 6 },
      { instruction: 'Répétez ce cycle...', duration: 60 },
      { instruction: 'Inspirez... 4 temps', duration: 4 },
      { instruction: 'Retenez... 4 temps', duration: 4 },
      { instruction: 'Expirez... 6 temps', duration: 6 },
      { instruction: 'Continuez à votre rythme...', duration: 120 },
      { instruction: 'Revenez doucement à votre respiration naturelle', duration: 10 },
      { instruction: 'Ouvrez les yeux quand vous êtes prêt(e)', duration: 10 },
    ],
  },
  {
    id: 'bodyscan',
    title: 'Scan Corporel',
    duration: 10,
    description: 'Détendez chaque partie de votre corps progressivement.',
    color: 'from-purple-400 to-pink-400',
    steps: [
      { instruction: 'Allongez-vous ou asseyez-vous confortablement', duration: 15 },
      { instruction: 'Fermez les yeux et respirez profondément', duration: 15 },
      { instruction: 'Portez votre attention sur vos pieds', duration: 30 },
      { instruction: 'Détendez vos chevilles et mollets', duration: 30 },
      { instruction: 'Relâchez vos genoux et cuisses', duration: 30 },
      { instruction: 'Détendez votre bassin et vos hanches', duration: 30 },
      { instruction: 'Relâchez votre ventre et bas du dos', duration: 30 },
      { instruction: 'Détendez votre poitrine et haut du dos', duration: 30 },
      { instruction: 'Relâchez vos épaules et bras', duration: 30 },
      { instruction: 'Détendez vos mains et doigts', duration: 30 },
      { instruction: 'Relâchez votre cou et gorge', duration: 30 },
      { instruction: 'Détendez votre visage et tête', duration: 30 },
      { instruction: 'Ressentez votre corps entier détendu', duration: 60 },
      { instruction: 'Revenez doucement à vous', duration: 20 },
    ],
  },
  {
    id: 'gratitude',
    title: 'Méditation de Gratitude',
    duration: 7,
    description: 'Cultivez la gratitude pour transformer votre perspective.',
    color: 'from-amber-400 to-orange-400',
    steps: [
      { instruction: 'Installez-vous dans un endroit calme', duration: 10 },
      { instruction: 'Fermez les yeux et centrez-vous', duration: 10 },
      { instruction: 'Pensez à 3 choses pour lesquelles vous êtes reconnaissant(e)', duration: 60 },
      { instruction: 'Visualisez la première chose avec gratitude', duration: 45 },
      { instruction: 'Ressentez la chaleur de cette gratitude', duration: 30 },
      { instruction: 'Visualisez la deuxième chose', duration: 45 },
      { instruction: 'Laissez la reconnaissance emplir votre cœur', duration: 30 },
      { instruction: 'Visualisez la troisième chose', duration: 45 },
      { instruction: 'Baignez dans cette énergie de gratitude', duration: 60 },
      { instruction: 'Remerciez-vous pour ce moment', duration: 30 },
      { instruction: 'Ouvrez les yeux en douceur', duration: 15 },
    ],
  },
  {
    id: 'visualisation',
    title: 'Visualisation Créatrice',
    duration: 8,
    description: 'Manifestez vos rêves à travers le pouvoir de la visualisation.',
    color: 'from-indigo-400 to-violet-400',
    steps: [
      { instruction: 'Asseyez-vous confortablement', duration: 10 },
      { instruction: 'Fermez les yeux et détendez-vous', duration: 15 },
      { instruction: 'Respirez profondément 3 fois', duration: 20 },
      { instruction: 'Imaginez votre objectif réalisé', duration: 60 },
      { instruction: 'Visualisez chaque détail de cette réalité', duration: 90 },
      { instruction: 'Ressentez les émotions de cette réussite', duration: 60 },
      { instruction: 'Voyez-vous vivre cette nouvelle réalité', duration: 90 },
      { instruction: 'Ancrez ces sensations dans votre corps', duration: 45 },
      { instruction: 'Remerciez l\'univers pour cette manifestation', duration: 30 },
      { instruction: 'Revenez doucement au présent', duration: 20 },
    ],
  },
];

export default function MeditationPage() {
  const [selectedSession, setSelectedSession] = useState<typeof MEDITATION_SESSIONS[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Calculer la durée totale de la session
  const getTotalDuration = (session: typeof MEDITATION_SESSIONS[0]) => {
    return session.steps.reduce((acc, step) => acc + step.duration, 0);
  };

  // Démarrer/Arrêter la méditation
  const togglePlay = () => {
    if (!selectedSession) return;
    setIsPlaying(!isPlaying);
  };

  // Réinitialiser
  const reset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
    setStepProgress(0);
    setTotalElapsed(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // Effet pour le timer
  useEffect(() => {
    if (isPlaying && selectedSession) {
      intervalRef.current = setInterval(() => {
        setStepProgress((prev) => {
          const currentStep = selectedSession.steps[currentStepIndex];
          if (prev >= currentStep.duration) {
            // Passer à l'étape suivante
            if (currentStepIndex < selectedSession.steps.length - 1) {
              setCurrentStepIndex((i) => i + 1);
              return 0;
            } else {
              // Fin de la session
              setIsPlaying(false);
              return prev;
            }
          }
          return prev + 1;
        });
        setTotalElapsed((prev) => prev + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, selectedSession, currentStepIndex]);

  // Formater le temps
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
            Méditation Guidée
          </h1>
          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Trouvez la paix intérieure avec nos sessions de méditation guidée.
            Prenez un moment pour vous recentrer.
          </p>
        </div>

        {/* Session en cours */}
        {selectedSession ? (
          <div className="mb-10">
            <div className={`bg-gradient-to-br ${selectedSession.color} rounded-2xl p-8 text-white`}>
              {/* Header de session */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold">{selectedSession.title}</h2>
                  <p className="text-sm text-white/80">{selectedSession.duration} minutes</p>
                </div>
                <button
                  onClick={() => {
                    reset();
                    setSelectedSession(null);
                  }}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Instruction actuelle */}
              <div className="text-center py-8">
                <p className="text-2xl font-light leading-relaxed">
                  {selectedSession.steps[currentStepIndex]?.instruction}
                </p>
              </div>

              {/* Barre de progression de l'étape */}
              <div className="mb-4">
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-1000"
                    style={{
                      width: `${(stepProgress / selectedSession.steps[currentStepIndex]?.duration) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Contrôles */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={reset}
                  className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
                <button
                  onClick={togglePlay}
                  className="p-4 bg-white rounded-full text-gray-800 hover:bg-white/90 transition-colors"
                >
                  {isPlaying ? (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                  ) : (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>
                <div className="text-lg font-mono">
                  {formatTime(totalElapsed)} / {formatTime(getTotalDuration(selectedSession))}
                </div>
              </div>

              {/* Progression globale */}
              <div className="mt-6">
                <div className="flex justify-between text-sm text-white/70 mb-2">
                  <span>Étape {currentStepIndex + 1} / {selectedSession.steps.length}</span>
                  <span>{Math.round((totalElapsed / getTotalDuration(selectedSession)) * 100)}%</span>
                </div>
                <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white/50 transition-all duration-1000"
                    style={{
                      width: `${(totalElapsed / getTotalDuration(selectedSession)) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Liste des sessions */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">
            Choisissez une session
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {MEDITATION_SESSIONS.map((session) => (
              <button
                key={session.id}
                onClick={() => {
                  reset();
                  setSelectedSession(session);
                }}
                className={`
                  p-6 rounded-2xl text-left transition-all hover:-translate-y-1
                  ${
                    selectedSession?.id === session.id
                      ? `bg-gradient-to-br ${session.color} text-white`
                      : 'bg-white border border-[var(--color-border)] hover:shadow-lg'
                  }
                `}
              >
                <h3 className={`font-bold text-lg mb-1 ${selectedSession?.id === session.id ? '' : 'text-[var(--color-text-primary)]'}`}>
                  {session.title}
                </h3>
                <p className={`text-sm mb-3 ${selectedSession?.id === session.id ? 'text-white/80' : 'text-[var(--color-text-muted)]'}`}>
                  {session.description}
                </p>
                <div className={`inline-flex items-center gap-1 text-sm font-medium ${selectedSession?.id === session.id ? 'text-white/90' : 'text-[var(--color-text-secondary)]'}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{session.duration} minutes</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Conseils */}
        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-100">
          <h3 className="font-bold text-teal-800 mb-4">
            Conseils pour méditer
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-teal-700">
            <div>
              <p>Méditez idéalement le matin au réveil ou le soir avant de dormir.</p>
            </div>
            <div>
              <p>Trouvez une position confortable, assis ou allongé.</p>
            </div>
            <div>
              <p>Mettez votre téléphone en mode silencieux.</p>
            </div>
            <div>
              <p>Créez une ambiance apaisante avec une lumière tamisée.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
