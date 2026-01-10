'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'gold' | 'mystic';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-[var(--color-accent-purple)] text-white
    hover:bg-[var(--color-accent-purple-light)]
    hover:shadow-[0_0_20px_rgba(147,51,234,0.4)]
    active:scale-[0.98]
  `,
  secondary: `
    bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)]
    border border-[var(--color-border)]
    hover:bg-[var(--color-bg-card)] hover:border-[var(--color-accent-purple)]
    hover:shadow-[0_0_15px_rgba(147,51,234,0.2)]
  `,
  ghost: `
    bg-transparent text-[var(--color-text-secondary)]
    hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]
  `,
  outline: `
    bg-transparent text-[var(--color-accent-purple-light)]
    border-2 border-[var(--color-accent-purple)]
    hover:bg-[var(--color-accent-purple)] hover:text-white
    hover:shadow-[0_0_20px_rgba(147,51,234,0.4)]
  `,
  gold: `
    bg-gradient-to-r from-[var(--color-accent-gold)] via-[var(--color-accent-gold-light)] to-[var(--color-accent-gold)]
    text-[var(--color-bg-primary)] font-bold
    hover:shadow-[var(--shadow-glow-gold)]
    active:scale-[0.98]
    border border-[var(--color-accent-gold-dark)]
  `,
  mystic: `
    bg-gradient-to-r from-[var(--color-accent-purple)] via-[var(--color-accent-pink)] to-[var(--color-accent-purple)]
    text-white font-semibold
    hover:shadow-[var(--shadow-glow-purple)]
    active:scale-[0.98]
    background-size: 200% auto
    hover:bg-right
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-xl',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`
          inline-flex items-center justify-center gap-2
          font-medium
          transition-all duration-300 ease-out
          disabled:opacity-50 disabled:cursor-not-allowed
          cursor-pointer
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
