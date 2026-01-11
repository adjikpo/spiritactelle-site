'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { MoonPhaseWidget } from '@/components/wellness';
import { calculateMoonPhase, getMoonGuidance, getUpcomingPhases } from '@/lib/api';
import { MoonPhase, MoonPhaseName } from '@/lib/api/types';
import { MOON_PHASES } from '@/lib/api/constants';

export default function CalendrierLunairePage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMoonPhase, setSelectedMoonPhase] = useState<MoonPhase | null>(null);

  // Calculer la phase pour la date sélectionnée
  useEffect(() => {
    const phase = calculateMoonPhase(selectedDate);
    setSelectedMoonPhase(phase);
  }, [selectedDate]);

  // Générer le calendrier du mois
  const calendar = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days: { date: Date; moonPhase: MoonPhase; isCurrentMonth: boolean }[] = [];

    // Jours du mois précédent
    const firstDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push({
        date,
        moonPhase: calculateMoonPhase(date),
        isCurrentMonth: false,
      });
    }

    // Jours du mois courant
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      days.push({
        date,
        moonPhase: calculateMoonPhase(date),
        isCurrentMonth: true,
      });
    }

    // Jours du mois suivant pour compléter la grille
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        moonPhase: calculateMoonPhase(date),
        isCurrentMonth: false,
      });
    }

    return days;
  }, [currentMonth]);

  const navigateMonth = (delta: number) => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + delta);
      return newDate;
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date) => {
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Retour */}
        <Link
          href="/astrologie"
          className="inline-flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] mb-6"
        >
          <span>←</span>
          <span>Astrologie</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3">
            Calendrier Lunaire
          </h1>
          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Suivez les phases de la lune et planifiez vos activités en harmonie avec les cycles lunaires.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendrier */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {/* Navigation du mois */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="p-2 hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h2 className="text-xl font-bold text-[var(--color-text-primary)] capitalize">
                  {currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                </h2>
                <button
                  onClick={() => navigateMonth(1)}
                  className="p-2 hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Jours de la semaine */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="text-center text-sm font-medium text-[var(--color-text-muted)] py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Grille du calendrier */}
              <div className="grid grid-cols-7 gap-1">
                {calendar.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDate(day.date)}
                    className={`
                      relative p-2 rounded-lg text-center transition-all
                      ${!day.isCurrentMonth ? 'opacity-30' : ''}
                      ${isToday(day.date) ? 'bg-[var(--color-primary)] text-white' : ''}
                      ${isSelected(day.date) && !isToday(day.date) ? 'bg-[var(--color-bg-tertiary)] ring-2 ring-[var(--color-primary)]' : ''}
                      ${!isToday(day.date) && !isSelected(day.date) ? 'hover:bg-[var(--color-bg-tertiary)]' : ''}
                    `}
                  >
                    <span className="text-sm font-medium block">{day.date.getDate()}</span>
                    <span className="text-lg block mt-1">{day.moonPhase.emoji}</span>
                  </button>
                ))}
              </div>

              {/* Légende */}
              <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
                <h3 className="text-sm font-medium text-[var(--color-text-primary)] mb-3">
                  Légende des phases
                </h3>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  {(['New Moon', 'First Quarter', 'Full Moon', 'Last Quarter'] as MoonPhaseName[]).map((phase) => (
                    <div key={phase} className="flex items-center gap-2">
                      <span className="text-lg">{MOON_PHASES[phase].emoji}</span>
                      <span className="text-[var(--color-text-muted)]">{MOON_PHASES[phase].phaseFr}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Détails de la phase sélectionnée */}
          <div className="space-y-6">
            {selectedMoonPhase && (
              <>
                <MoonPhaseWidget moonPhase={selectedMoonPhase} variant="full" showRituals />

                {/* Date sélectionnée */}
                <div className="bg-white rounded-xl p-4 shadow-md">
                  <p className="text-sm text-[var(--color-text-muted)] mb-1">Date sélectionnée</p>
                  <p className="font-medium text-[var(--color-text-primary)]">
                    {selectedDate.toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>

                {/* Message spirituel */}
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
                  <h3 className="font-bold text-purple-800 mb-3 flex items-center gap-2">
                    <span>✨</span> Guidance du jour
                  </h3>
                  <p className="text-purple-700 leading-relaxed">
                    {getMoonGuidance(selectedMoonPhase)}
                  </p>
                </div>
              </>
            )}

            {/* Bouton aujourd'hui */}
            <button
              onClick={() => {
                setSelectedDate(new Date());
                setCurrentMonth(new Date());
              }}
              className="w-full py-3 bg-[var(--color-primary)] text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              Revenir à aujourd'hui
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
