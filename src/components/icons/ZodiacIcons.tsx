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

// Lune
export function MoonIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...defaultProps} {...props}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeLinecap="round" strokeLinejoin="round" />
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

// Export map pour accès dynamique
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

export type ZodiacSign = keyof typeof zodiacIcons;
