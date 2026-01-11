'use client';

import { NatalChart, Planet } from '@/lib/astro/types';
import { ZODIAC_SIGNS, PLANETS, ASPECTS, getPlanetInfo, getSignInfo, getAspectInfo } from '@/lib/astro/constants';
import { calculateDominants, categorizeAspects } from '@/lib/astro';

interface ChartSummaryProps {
  chart: NatalChart;
}

export function ChartSummary({ chart }: ChartSummaryProps) {
  const dominants = calculateDominants(chart);
  const { harmonious, challenging } = categorizeAspects(chart.aspects);

  // Trouver les positions clés
  const sun = chart.planets.find((p) => p.planet === Planet.Sun);
  const moon = chart.planets.find((p) => p.planet === Planet.Moon);
  const asc = chart.planets.find((p) => p.planet === Planet.Ascendant);
  const mc = chart.planets.find((p) => p.planet === Planet.Midheaven);

  return (
    <div className="space-y-6">
      {/* Trio principal */}
      <div className="grid grid-cols-3 gap-4">
        {/* Soleil */}
        <div className="text-center p-4 bg-[var(--color-bg-tertiary)] rounded-xl">
          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-yellow-100 flex items-center justify-center">
            <span className="text-2xl">☉</span>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mb-1">Soleil</p>
          <p className="font-semibold text-sm">
            {sun && getSignInfo(sun.sign)?.nameFr}
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">
            Maison {sun?.house}
          </p>
        </div>

        {/* Lune */}
        <div className="text-center p-4 bg-[var(--color-bg-tertiary)] rounded-xl">
          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-2xl">☽</span>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mb-1">Lune</p>
          <p className="font-semibold text-sm">
            {moon && getSignInfo(moon.sign)?.nameFr}
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">
            Maison {moon?.house}
          </p>
        </div>

        {/* Ascendant */}
        <div className="text-center p-4 bg-[var(--color-bg-tertiary)] rounded-xl">
          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-purple-100 flex items-center justify-center">
            <span className="text-lg font-bold">AC</span>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mb-1">Ascendant</p>
          <p className="font-semibold text-sm">
            {asc && getSignInfo(asc.sign)?.nameFr}
          </p>
        </div>
      </div>

      {/* Dominantes élémentaires */}
      <div className="p-4 bg-[var(--color-bg-tertiary)] rounded-xl">
        <h3 className="font-semibold text-sm mb-3">Répartition des éléments</h3>
        <div className="grid grid-cols-4 gap-2">
          {Object.entries(dominants.elements).map(([element, score]) => {
            const colors = {
              fire: { bg: 'bg-red-100', text: 'text-red-600', label: 'Feu' },
              earth: { bg: 'bg-green-100', text: 'text-green-600', label: 'Terre' },
              air: { bg: 'bg-yellow-100', text: 'text-yellow-600', label: 'Air' },
              water: { bg: 'bg-blue-100', text: 'text-blue-600', label: 'Eau' },
            };
            const style = colors[element as keyof typeof colors];
            const maxScore = Math.max(...Object.values(dominants.elements));
            const percentage = (score / maxScore) * 100;

            return (
              <div key={element} className="text-center">
                <div
                  className={`h-16 rounded-lg ${style.bg} flex items-end justify-center overflow-hidden`}
                >
                  <div
                    className={`w-full ${style.text} bg-current opacity-30`}
                    style={{ height: `${percentage}%` }}
                  />
                </div>
                <p className={`text-xs font-medium mt-1 ${style.text}`}>
                  {style.label}
                </p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  {score.toFixed(1)}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Positions planétaires */}
      <div className="p-4 bg-[var(--color-bg-tertiary)] rounded-xl">
        <h3 className="font-semibold text-sm mb-3">Positions planétaires</h3>
        <div className="space-y-2">
          {chart.planets
            .filter((p) =>
              ![Planet.Ascendant, Planet.Midheaven, Planet.SouthNode].includes(p.planet)
            )
            .map((pos) => {
              const planetInfo = getPlanetInfo(pos.planet);
              const signInfo = getSignInfo(pos.sign);

              return (
                <div
                  key={pos.planet}
                  className="flex items-center justify-between py-1 border-b border-[var(--color-border)] last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{planetInfo?.symbol}</span>
                    <span className="text-sm">{planetInfo?.nameFr}</span>
                    {pos.retrograde && (
                      <span className="text-xs text-red-500 font-medium">R</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-right">
                    <span className="text-sm">{signInfo?.symbol}</span>
                    <span className="text-sm text-[var(--color-text-secondary)]">
                      {signInfo?.nameFr}
                    </span>
                    <span className="text-xs text-[var(--color-text-muted)]">
                      ({pos.signDegree.toFixed(0)}°)
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Aspects principaux */}
      <div className="p-4 bg-[var(--color-bg-tertiary)] rounded-xl">
        <h3 className="font-semibold text-sm mb-3">
          Aspects ({chart.aspects.length})
        </h3>
        <div className="flex gap-4 mb-3">
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-xs text-[var(--color-text-muted)]">
              Harmonieux ({harmonious.length})
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-xs text-[var(--color-text-muted)]">
              Tendus ({challenging.length})
            </span>
          </div>
        </div>
        <div className="space-y-1 max-h-40 overflow-y-auto">
          {chart.aspects.slice(0, 10).map((aspect, index) => {
            const planet1Info = getPlanetInfo(aspect.planet1);
            const planet2Info = getPlanetInfo(aspect.planet2);
            const aspectInfo = getAspectInfo(aspect.type);
            const isHarmonious = aspectInfo?.nature === 'harmonious';

            return (
              <div
                key={index}
                className="flex items-center justify-between text-xs py-1"
              >
                <div className="flex items-center gap-1">
                  <span>{planet1Info?.symbol}</span>
                  <span
                    className={
                      isHarmonious ? 'text-green-600' : 'text-red-600'
                    }
                  >
                    {aspectInfo?.symbol}
                  </span>
                  <span>{planet2Info?.symbol}</span>
                </div>
                <span className="text-[var(--color-text-muted)]">
                  {aspectInfo?.nameFr} ({aspect.orb.toFixed(1)}°)
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
