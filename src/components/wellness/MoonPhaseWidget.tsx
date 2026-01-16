'use client';

import { MoonPhase } from '@/lib/api/types';
import { moonPhaseIcons } from '@/components/icons';

interface MoonPhaseWidgetProps {
  moonPhase: MoonPhase;
  variant?: 'compact' | 'full';
  showRituals?: boolean;
}

export function MoonPhaseWidget({
  moonPhase,
  variant = 'compact',
  showRituals = false,
}: MoonPhaseWidgetProps) {
  const PhaseIcon = moonPhaseIcons[moonPhase.phase as keyof typeof moonPhaseIcons];

  if (variant === 'compact') {
    return (
      <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-sm p-6 h-full flex flex-col justify-center">
        <div className="flex items-center gap-4">
          {PhaseIcon ? <PhaseIcon size={60} className="text-yellow-200" /> : null}
          <div className="flex-1">
            <p className="text-sm mb-1" style={{ color: '#fef9c3' }}>Phase lunaire</p>
            <p className="text-xl font-bold mb-1" style={{ color: '#fef08a' }}>{moonPhase.phaseFr}</p>
            <p className="text-sm" style={{ color: '#fef9c3' }}>{moonPhase.illumination}% illuminée</p>
          </div>
        </div>
      </div>
    );
  }

  // Version complète
  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 rounded-sm p-6 text-white overflow-hidden relative">
      {/* Étoiles décoratives */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative">
        {/* Lune */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-2">
            {PhaseIcon ? <PhaseIcon size={70} className="text-yellow-200" /> : null}
          </div>
          <h3 className="text-2xl font-bold mb-1" style={{ color: '#fef08a' }}>{moonPhase.phaseFr}</h3>
          <p className="font-medium" style={{ color: '#fef9c3' }}>Illumination : {moonPhase.illumination}%</p>
          <p className="text-sm" style={{ color: '#fef08a' }}>Âge : {moonPhase.age} jours</p>
        </div>

        {/* Barre d'illumination */}
        <div className="mb-6">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-300 to-yellow-100 rounded-full transition-all duration-500"
              style={{ width: `${moonPhase.illumination}%` }}
            />
          </div>
        </div>

        {/* Description */}
        <p className="text-center mb-6 leading-relaxed" style={{ color: '#fef9c3' }}>
          {moonPhase.descriptionFr}
        </p>

        {/* Rituels */}
        {showRituals && (
          <div className="bg-yellow-100/20 rounded-sm p-4">
            <h4 className="font-medium mb-3 text-yellow-200">
              Rituels recommandés
            </h4>
            <ul className="space-y-2">
              {moonPhase.ritualsFr.map((ritual, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-yellow-100">
                  <span className="text-yellow-300">•</span>
                  {ritual}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Prochaines phases lunaires
 */
export function UpcomingPhasesWidget({
  phases,
}: {
  phases: { phase: string; phaseFr: string; date: Date }[];
}) {
  return (
    <div className="bg-white rounded-sm shadow-md p-4 border border-[var(--color-border)]">
      <h3 className="font-medium text-[var(--color-text-primary)] mb-4">Prochaines phases</h3>
      <div className="space-y-3">
        {phases.map((phase, index) => {
          const PhaseIcon = moonPhaseIcons[phase.phase as keyof typeof moonPhaseIcons];
          return (
          <div key={index} className="flex items-center gap-3">
            {PhaseIcon ? <PhaseIcon size={28} className="text-indigo-600" /> : null}
            <div className="flex-1">
              <p className="text-sm font-medium text-[var(--color-text-primary)]">
                {phase.phaseFr}
              </p>
              <p className="text-xs text-[var(--color-text-muted)]">
                {phase.date.toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })}
              </p>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Skeleton de chargement
 */
export function MoonPhaseWidgetSkeleton() {
  return (
    <div className="bg-[var(--color-border)] rounded-sm p-6 animate-pulse">
      <div className="text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4" />
        <div className="h-6 bg-white/20 rounded w-32 mx-auto mb-2" />
        <div className="h-4 bg-white/20 rounded w-24 mx-auto" />
      </div>
    </div>
  );
}
