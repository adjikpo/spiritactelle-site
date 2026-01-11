import { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

const defaultProps: IconProps = {
  size: 24,
  strokeWidth: 1.5,
  stroke: 'currentColor',
  fill: 'none',
};

// Bélier (Aries) - ♈
export function AriesIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...defaultProps} {...props}>
      <path d="M5 18C5 14 7 10 9 8C11 6 12 4 12 4C12 4 13 6 15 8C17 10 19 14 19 18" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 4V20" strokeLinecap="round" />
    </svg>
  );
}

// Taureau (Taurus) - ♉
export function TaurusIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...defaultProps} {...props}>
      <circle cx="12" cy="15" r="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 6C6 4 7.5 3 9 3C10.5 3 12 4 12 6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 6C18 4 16.5 3 15 3C13.5 3 12 4 12 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Gémeaux (Gemini) - ♊
export function GeminiIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...defaultProps} {...props}>
      <path d="M6 4H18" strokeLinecap="round" />
      <path d="M6 20H18" strokeLinecap="round" />
      <path d="M8 4V20" strokeLinecap="round" />
      <path d="M16 4V20" strokeLinecap="round" />
    </svg>
  );
}

// Cancer - ♋
export function CancerIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...defaultProps} {...props}>
      <path d="M4 10C4 7 6 5 9 5C13 5 15 8 15 10C15 12 13 14 10 14" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 14C20 17 18 19 15 19C11 19 9 16 9 14C9 12 11 10 14 10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Lion (Leo) - ♌
export function LeoIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...defaultProps} {...props}>
      <circle cx="8" cy="8" r="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 12C8 15 10 18 13 18C16 18 18 16 18 13" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 13V20" strokeLinecap="round" />
      <circle cx="18" cy="20" r="1" fill="currentColor" />
    </svg>
  );
}

// Vierge (Virgo) - ♍
export function VirgoIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...defaultProps} {...props}>
      <path d="M6 4V14C6 17 8 19 11 19" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 4V14C10 17 12 19 15 19" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 4V14" strokeLinecap="round" />
      <path d="M14 14C14 17 16 19 19 19" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 15V21" strokeLinecap="round" />
    </svg>
  );
}

// Balance (Libra) - ♎
export function LibraIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...defaultProps} {...props}>
      <path d="M4 18H20" strokeLinecap="round" />
      <path d="M6 14H18" strokeLinecap="round" />
      <path d="M12 6C14.2 6 16 7.8 16 10H8C8 7.8 9.8 6 12 6Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Scorpion (Scorpio) - ♏
export function ScorpioIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...defaultProps} {...props}>
      <path d="M5 4V14C5 17 7 19 10 19" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 4V14C10 17 12 19 15 19" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 4V19" strokeLinecap="round" />
      <path d="M15 19L19 15" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 17L19 15L17 13" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Sagittaire (Sagittarius) - ♐
export function SagittariusIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...defaultProps} {...props}>
      <path d="M5 19L19 5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 5H19V11" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 12L12 16" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Capricorne (Capricorn) - ♑
export function CapricornIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...defaultProps} {...props}>
      <path d="M6 4V12C6 15 8 17 11 17H14" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 8V17" strokeLinecap="round" />
      <circle cx="17" cy="17" r="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 20V22" strokeLinecap="round" />
    </svg>
  );
}

// Verseau (Aquarius) - ♒
export function AquariusIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...defaultProps} {...props}>
      <path d="M4 10L6 8L8 10L10 8L12 10L14 8L16 10L18 8L20 10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 16L6 14L8 16L10 14L12 16L14 14L16 16L18 14L20 16" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Poissons (Pisces) - ♓
export function PiscesIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...defaultProps} {...props}>
      <path d="M4 6C8 6 10 9 10 12C10 15 8 18 4 18" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 6C16 6 14 9 14 12C14 15 16 18 20 18" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 12H20" strokeLinecap="round" />
    </svg>
  );
}

// Icônes astrologiques supplémentaires

// Soleil
export function SunIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...defaultProps} {...props}>
      <circle cx="12" cy="12" r="5" />
      <path d="M12 2V4" strokeLinecap="round" />
      <path d="M12 20V22" strokeLinecap="round" />
      <path d="M4 12H2" strokeLinecap="round" />
      <path d="M22 12H20" strokeLinecap="round" />
      <path d="M19.78 4.22L18.36 5.64" strokeLinecap="round" />
      <path d="M5.64 18.36L4.22 19.78" strokeLinecap="round" />
      <path d="M19.78 19.78L18.36 18.36" strokeLinecap="round" />
      <path d="M5.64 5.64L4.22 4.22" strokeLinecap="round" />
    </svg>
  );
}

// Lune (croissant)
export function MoonIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...defaultProps} {...props}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Phases lunaires avec remplissage visuel

// Nouvelle Lune
export function NewMoonIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

// Premier Croissant
export function WaxingCrescentIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 2a10 10 0 0 1 0 20c3-2 5-6 5-10s-2-8-5-10z" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

// Premier Quartier
export function FirstQuarterIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 2a10 10 0 0 1 0 20V2z" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

// Lune Gibbeuse Croissante
export function WaxingGibbousIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 2a10 10 0 0 1 0 20c-3-2-5-6-5-10s2-8 5-10z" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

// Pleine Lune
export function FullMoonIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

// Lune Gibbeuse Decroissante
export function WaningGibbousIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 2a10 10 0 0 0 0 20c3-2 5-6 5-10s-2-8-5-10z" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

// Dernier Quartier
export function LastQuarterIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 2a10 10 0 0 0 0 20V2z" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

// Dernier Croissant
export function WaningCrescentIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 2a10 10 0 0 0 0 20c-3-2-5-6-5-10s2-8 5-10z" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

// Étoile
export function StarIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...defaultProps} {...props}>
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Constellation
export function ConstellationIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...defaultProps} {...props}>
      <circle cx="5" cy="5" r="1.5" fill="currentColor" />
      <circle cx="12" cy="8" r="1.5" fill="currentColor" />
      <circle cx="19" cy="5" r="1.5" fill="currentColor" />
      <circle cx="8" cy="15" r="1.5" fill="currentColor" />
      <circle cx="16" cy="14" r="1.5" fill="currentColor" />
      <circle cx="12" cy="20" r="1.5" fill="currentColor" />
      <path d="M5 5L12 8L19 5" strokeLinecap="round" />
      <path d="M12 8L8 15L12 20L16 14L12 8" strokeLinecap="round" />
    </svg>
  );
}

// Planète
export function PlanetIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...defaultProps} {...props}>
      <circle cx="12" cy="12" r="6" />
      <ellipse cx="12" cy="12" rx="10" ry="3" transform="rotate(-20 12 12)" />
    </svg>
  );
}

// Icônes Bien-être

// Citation / Bulle de pensée
export function QuoteIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...defaultProps} {...props}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 8h2v3H8V8z" fill="currentColor" />
      <path d="M14 8h2v3h-2V8z" fill="currentColor" />
    </svg>
  );
}

// Affirmation / Étincelles
export function SparklesIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...defaultProps} {...props}>
      <path d="M12 3L13.5 8.5L19 10L13.5 11.5L12 17L10.5 11.5L5 10L10.5 8.5L12 3Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 15L19.5 17L21.5 17.5L19.5 18L19 20L18.5 18L16.5 17.5L18.5 17L19 15Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 2L5.5 4L7.5 4.5L5.5 5L5 7L4.5 5L2.5 4.5L4.5 4L5 2Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Méditation / Lotus
export function MeditationIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...defaultProps} {...props}>
      <path d="M12 21C12 21 8 17 8 13C8 10 10 8 12 8C14 8 16 10 16 13C16 17 12 21 12 21Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 8V3" strokeLinecap="round" />
      <path d="M8 13C5 13 3 11 3 8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 13C19 13 21 11 21 8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="3" r="1" fill="currentColor" />
    </svg>
  );
}

// Numérologie / Grille de chiffres
export function NumerologyIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...defaultProps} {...props}>
      <rect x="3" y="3" width="8" height="8" rx="1" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="13" y="3" width="8" height="8" rx="1" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="3" y="13" width="8" height="8" rx="1" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="13" y="13" width="8" height="8" rx="1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 5.5V9.5M6 6.5H8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 5.5C16 5.5 16 6.5 17 6.5C18 6.5 18 8 17 8.5C16 9 16 9.5 16 9.5H18" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 15.5H8L6 18.5H8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 15.5V18.5M18 15.5V18.5M16 17H18" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Icones Blog

// Livre ouvert
export function BookOpenIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...defaultProps} {...props}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2V3z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7V3z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Plume / Ecriture
export function FeatherIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...defaultProps} {...props}>
      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 8L2 22" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17.5 15H9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Icones Mythologies

// Dragon Chinois
export function DragonIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...defaultProps} {...props}>
      <path d="M4 8C4 8 6 6 9 6C12 6 14 8 14 11C14 14 12 16 9 16" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 16C9 16 11 18 14 18C17 18 20 16 20 12" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 12C20 9 18 7 16 7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 8L2 6M4 8L2 10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 12L22 10M20 12L22 14" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="7" cy="9" r="1" fill="currentColor" />
      <path d="M10 11C10 11 11 12 12 11" strokeLinecap="round" />
    </svg>
  );
}

// Oeil d'Horus / Egyptien
export function EgyptianEyeIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...defaultProps} {...props}>
      <ellipse cx="12" cy="10" rx="8" ry="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2" fill="currentColor" />
      <path d="M4 10C4 10 2 12 2 14C2 16 4 18 4 18" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 15V20" strokeLinecap="round" />
      <path d="M9 17L12 20L15 17" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Yin Yang (Chinois)
export function YinYangIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...defaultProps} {...props}>
      <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 3C12 3 12 7.5 12 12C12 16.5 8.5 21 12 21" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 3C15.5 3 12 7.5 12 12" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="7.5" r="1.5" fill="currentColor" />
      <circle cx="12" cy="16.5" r="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Ankh (Egyptien)
export function AnkhIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...defaultProps} {...props}>
      <path d="M12 9C14.5 9 16 7 16 5C16 3 14.5 2 12 2C9.5 2 8 3 8 5C8 7 9.5 9 12 9Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 9V22" strokeLinecap="round" />
      <path d="M7 14H17" strokeLinecap="round" />
    </svg>
  );
}

// Globe / Monde (pour Multi-mythologies)
export function GlobeIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...defaultProps} {...props}>
      <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 12H21" strokeLinecap="round" />
      <path d="M12 3C14.5 5.5 16 8.5 16 12C16 15.5 14.5 18.5 12 21" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 3C9.5 5.5 8 8.5 8 12C8 15.5 9.5 18.5 12 21" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Icônes des 5 Éléments Chinois

// Bois (Wood) - Arbre/Feuilles
export function WoodElementIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...defaultProps} {...props}>
      <path d="M12 22V8" strokeLinecap="round" />
      <path d="M12 8C12 8 8 6 8 4C8 2 10 2 12 4C14 2 16 2 16 4C16 6 12 8 12 8Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 14C12 14 7 12 7 9C7 6 10 7 12 10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 14C12 14 17 12 17 9C17 6 14 7 12 10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 22H15" strokeLinecap="round" />
    </svg>
  );
}

// Feu (Fire) - Flamme
export function FireElementIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...defaultProps} {...props}>
      <path d="M12 22C8 22 5 19 5 15C5 11 8 8 10 6C10 6 10 9 12 10C12 7 14 3 15 2C15 2 16 6 18 9C19.5 11 19 14 19 15C19 19 16 22 12 22Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 22C10 22 9 20 9 18C9 16 10 15 12 14C14 15 15 16 15 18C15 20 14 22 12 22Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Terre (Earth) - Montagne
export function EarthElementIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...defaultProps} {...props}>
      <path d="M2 20L8 10L12 14L18 6L22 20H2Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 20H22" strokeLinecap="round" />
      <circle cx="18" cy="6" r="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Métal (Metal) - Lingot/Diamant
export function MetalElementIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...defaultProps} {...props}>
      <path d="M6 3H18L22 9L12 21L2 9L6 3Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 9H22" strokeLinecap="round" />
      <path d="M12 21L8 9L6 3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 21L16 9L18 3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 9L12 3L16 9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Eau (Water) - Vagues
export function WaterElementIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...defaultProps} {...props}>
      <path d="M2 6C4 6 5 8 7 8C9 8 10 6 12 6C14 6 15 8 17 8C19 8 20 6 22 6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 12C4 12 5 14 7 14C9 14 10 12 12 12C14 12 15 14 17 14C19 14 20 12 22 12" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 18C4 18 5 20 7 20C9 20 10 18 12 18C14 18 15 20 17 20C19 20 20 18 22 18" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Export map pour accès dynamique (noms français)
export const zodiacIcons = {
  belier: AriesIcon,
  taureau: TaurusIcon,
  gemeaux: GeminiIcon,
  cancer: CancerIcon,
  lion: LeoIcon,
  vierge: VirgoIcon,
  balance: LibraIcon,
  scorpion: ScorpioIcon,
  sagittaire: SagittariusIcon,
  capricorne: CapricornIcon,
  verseau: AquariusIcon,
  poissons: PiscesIcon,
} as const;

// Export map avec clés en anglais (pour ZodiacSignKey)
export const zodiacIconsByKey = {
  aries: AriesIcon,
  taurus: TaurusIcon,
  gemini: GeminiIcon,
  cancer: CancerIcon,
  leo: LeoIcon,
  virgo: VirgoIcon,
  libra: LibraIcon,
  scorpio: ScorpioIcon,
  sagittarius: SagittariusIcon,
  capricorn: CapricornIcon,
  aquarius: AquariusIcon,
  pisces: PiscesIcon,
} as const;

export type ZodiacSign = keyof typeof zodiacIcons;

// Export map pour les phases lunaires
export const moonPhaseIcons = {
  'New Moon': NewMoonIcon,
  'Waxing Crescent': WaxingCrescentIcon,
  'First Quarter': FirstQuarterIcon,
  'Waxing Gibbous': WaxingGibbousIcon,
  'Full Moon': FullMoonIcon,
  'Waning Gibbous': WaningGibbousIcon,
  'Last Quarter': LastQuarterIcon,
  'Waning Crescent': WaningCrescentIcon,
} as const;

export type MoonPhaseName = keyof typeof moonPhaseIcons;
