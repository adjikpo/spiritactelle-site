'use client';

import { useMemo } from 'react';
import { NatalChart, Planet, ZodiacSign, AspectType } from '@/lib/astro/types';
import { ZODIAC_SIGNS, PLANETS, ASPECTS } from '@/lib/astro/constants';

interface ZodiacWheelProps {
  chart: NatalChart;
  size?: number;
  showAspects?: boolean;
}

// Couleurs pour chaque élément
const ELEMENT_COLORS = {
  fire: '#e74c3c',
  earth: '#27ae60',
  air: '#f1c40f',
  water: '#3498db',
};

// Symboles des planètes
const PLANET_SYMBOLS: Record<Planet, string> = {
  [Planet.Sun]: '☉',
  [Planet.Moon]: '☽',
  [Planet.Mercury]: '☿',
  [Planet.Venus]: '♀',
  [Planet.Mars]: '♂',
  [Planet.Jupiter]: '♃',
  [Planet.Saturn]: '♄',
  [Planet.Uranus]: '♅',
  [Planet.Neptune]: '♆',
  [Planet.Pluto]: '♇',
  [Planet.NorthNode]: '☊',
  [Planet.SouthNode]: '☋',
  [Planet.Chiron]: '⚷',
  [Planet.Ascendant]: 'AC',
  [Planet.Midheaven]: 'MC',
};

// Couleurs des aspects
const ASPECT_COLORS: Record<AspectType, string> = {
  [AspectType.Conjunction]: '#9b59b6',
  [AspectType.Opposition]: '#e74c3c',
  [AspectType.Trine]: '#2ecc71',
  [AspectType.Square]: '#e74c3c',
  [AspectType.Sextile]: '#3498db',
  [AspectType.Quincunx]: '#f39c12',
  [AspectType.SemiSextile]: '#95a5a6',
  [AspectType.SemiSquare]: '#e67e22',
  [AspectType.Sesquiquadrate]: '#e67e22',
  [AspectType.Quintile]: '#1abc9c',
  [AspectType.BiQuintile]: '#1abc9c',
};

export function ZodiacWheel({
  chart,
  size = 400,
  showAspects = true,
}: ZodiacWheelProps) {
  const center = size / 2;
  const outerRadius = size / 2 - 10;
  const signRingWidth = 40;
  const innerRadius = outerRadius - signRingWidth;
  const houseRadius = innerRadius - 30;
  const planetRadius = houseRadius - 40;
  const aspectRadius = planetRadius - 20;

  // L'Ascendant définit le point de départ (9h sur le cercle = 180°)
  const ascendant = chart.planets.find((p) => p.planet === Planet.Ascendant);
  const ascLongitude = ascendant?.longitude || 0;

  // Convertit une longitude zodiacale en angle SVG
  const longitudeToAngle = (longitude: number): number => {
    // 0° Bélier est à l'Est (3h), l'Ascendant est à l'Ouest (9h)
    // On fait tourner pour que l'Ascendant soit à gauche
    return (180 - (longitude - ascLongitude) + 360) % 360;
  };

  // Convertit un angle en coordonnées
  const angleToCoords = (
    angleDeg: number,
    radius: number
  ): { x: number; y: number } => {
    const angleRad = (angleDeg * Math.PI) / 180;
    return {
      x: center + radius * Math.cos(angleRad),
      y: center - radius * Math.sin(angleRad),
    };
  };

  // Génère le chemin d'arc pour un segment de signe
  const createArcPath = (
    startAngle: number,
    endAngle: number,
    innerR: number,
    outerR: number
  ): string => {
    const start1 = angleToCoords(startAngle, outerR);
    const end1 = angleToCoords(endAngle, outerR);
    const start2 = angleToCoords(endAngle, innerR);
    const end2 = angleToCoords(startAngle, innerR);

    const largeArc = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;
    const sweepOuter = endAngle > startAngle ? 0 : 1;
    const sweepInner = endAngle > startAngle ? 1 : 0;

    return `
      M ${start1.x} ${start1.y}
      A ${outerR} ${outerR} 0 ${largeArc} ${sweepOuter} ${end1.x} ${end1.y}
      L ${start2.x} ${start2.y}
      A ${innerR} ${innerR} 0 ${largeArc} ${sweepInner} ${end2.x} ${end2.y}
      Z
    `;
  };

  // Rendu des signes du zodiaque
  const signSegments = useMemo(() => {
    return ZODIAC_SIGNS.map((signInfo, index) => {
      const startLongitude = index * 30;
      const endLongitude = (index + 1) * 30;
      const startAngle = longitudeToAngle(startLongitude);
      const endAngle = longitudeToAngle(endLongitude);
      const midAngle = (startAngle + endAngle) / 2;

      // Couleur basée sur l'élément
      const color = ELEMENT_COLORS[signInfo.element as keyof typeof ELEMENT_COLORS];

      // Position du symbole
      const symbolPos = angleToCoords(midAngle, innerRadius + signRingWidth / 2);

      return (
        <g key={signInfo.sign}>
          <path
            d={createArcPath(startAngle, endAngle, innerRadius, outerRadius)}
            fill={`${color}20`}
            stroke={color}
            strokeWidth="1"
          />
          <text
            x={symbolPos.x}
            y={symbolPos.y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="18"
            fill={color}
          >
            {signInfo.symbol}
          </text>
        </g>
      );
    });
  }, [ascLongitude, innerRadius, outerRadius, signRingWidth]);

  // Rendu des cuspides des maisons
  const houseCusps = useMemo(() => {
    return chart.houses.map((house) => {
      const angle = longitudeToAngle(house.longitude);
      const inner = angleToCoords(angle, aspectRadius);
      const outer = angleToCoords(angle, innerRadius);

      // Position du numéro de maison
      const labelAngle = longitudeToAngle(
        house.longitude + 15 // Milieu de la maison (approximatif)
      );
      const labelPos = angleToCoords(labelAngle, houseRadius + 10);

      return (
        <g key={`house-${house.house}`}>
          <line
            x1={inner.x}
            y1={inner.y}
            x2={outer.x}
            y2={outer.y}
            stroke="var(--color-text-muted)"
            strokeWidth={house.house === 1 || house.house === 10 ? 2 : 1}
            opacity={0.5}
          />
          <text
            x={labelPos.x}
            y={labelPos.y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="10"
            fill="var(--color-text-muted)"
          >
            {house.house}
          </text>
        </g>
      );
    });
  }, [chart.houses, aspectRadius, innerRadius, houseRadius]);

  // Rendu des planètes
  const planetPositions = useMemo(() => {
    // Grouper les planètes proches pour éviter les chevauchements
    const planets = chart.planets.filter(
      (p) => p.planet !== Planet.SouthNode // Ne pas afficher le noeud sud (opposé au nord)
    );

    return planets.map((pos) => {
      const angle = longitudeToAngle(pos.longitude);
      const coords = angleToCoords(angle, planetRadius);
      const symbol = PLANET_SYMBOLS[pos.planet];

      // Ligne vers le cercle extérieur
      const outerCoords = angleToCoords(angle, innerRadius - 5);

      // Couleur selon rétrogradation
      const color = pos.retrograde
        ? 'var(--color-error)'
        : 'var(--color-text-primary)';

      return (
        <g key={pos.planet}>
          {/* Ligne de connexion */}
          <line
            x1={coords.x}
            y1={coords.y}
            x2={outerCoords.x}
            y2={outerCoords.y}
            stroke="var(--color-border)"
            strokeWidth="1"
            opacity={0.3}
          />
          {/* Symbole de la planète */}
          <circle
            cx={coords.x}
            cy={coords.y}
            r="12"
            fill="var(--color-bg-card)"
            stroke={color}
            strokeWidth="1"
          />
          <text
            x={coords.x}
            y={coords.y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="12"
            fontWeight="bold"
            fill={color}
          >
            {symbol}
          </text>
          {/* Indicateur rétrograde */}
          {pos.retrograde && (
            <text
              x={coords.x + 10}
              y={coords.y - 10}
              fontSize="8"
              fill="var(--color-error)"
            >
              R
            </text>
          )}
        </g>
      );
    });
  }, [chart.planets, planetRadius, innerRadius]);

  // Rendu des aspects
  const aspectLines = useMemo(() => {
    if (!showAspects) return null;

    // Filtrer les aspects majeurs seulement
    const majorAspects = chart.aspects.filter((a) =>
      [
        AspectType.Conjunction,
        AspectType.Opposition,
        AspectType.Trine,
        AspectType.Square,
        AspectType.Sextile,
      ].includes(a.type)
    );

    return majorAspects.map((aspect, index) => {
      const planet1 = chart.planets.find((p) => p.planet === aspect.planet1);
      const planet2 = chart.planets.find((p) => p.planet === aspect.planet2);

      if (!planet1 || !planet2) return null;

      const angle1 = longitudeToAngle(planet1.longitude);
      const angle2 = longitudeToAngle(planet2.longitude);
      const coords1 = angleToCoords(angle1, aspectRadius);
      const coords2 = angleToCoords(angle2, aspectRadius);

      const color = ASPECT_COLORS[aspect.type];
      const opacity = 1 - aspect.orb / aspect.maxOrb;

      return (
        <line
          key={`aspect-${index}`}
          x1={coords1.x}
          y1={coords1.y}
          x2={coords2.x}
          y2={coords2.y}
          stroke={color}
          strokeWidth={1.5}
          opacity={opacity * 0.6}
          strokeDasharray={
            aspect.type === AspectType.Opposition ||
            aspect.type === AspectType.Square
              ? '4,2'
              : 'none'
          }
        />
      );
    });
  }, [chart.aspects, chart.planets, showAspects, aspectRadius]);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="zodiac-wheel"
    >
      {/* Fond */}
      <circle
        cx={center}
        cy={center}
        r={outerRadius}
        fill="var(--color-bg-card)"
        stroke="var(--color-border)"
        strokeWidth="2"
      />

      {/* Cercle intérieur */}
      <circle
        cx={center}
        cy={center}
        r={innerRadius}
        fill="none"
        stroke="var(--color-border)"
        strokeWidth="1"
      />

      {/* Cercle des planètes */}
      <circle
        cx={center}
        cy={center}
        r={planetRadius}
        fill="none"
        stroke="var(--color-border)"
        strokeWidth="1"
        opacity={0.3}
      />

      {/* Signes du zodiaque */}
      {signSegments}

      {/* Cuspides des maisons */}
      {houseCusps}

      {/* Lignes d'aspects */}
      {aspectLines}

      {/* Planètes */}
      {planetPositions}

      {/* Centre - Point */}
      <circle
        cx={center}
        cy={center}
        r="3"
        fill="var(--color-primary)"
      />
    </svg>
  );
}
