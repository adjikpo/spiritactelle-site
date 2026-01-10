import { HTMLAttributes, forwardRef } from 'react';

type CardVariant = 'default' | 'glass' | 'bordered' | 'glow' | 'mystic' | 'gold';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

const variantStyles: Record<CardVariant, string> = {
  default: `
    bg-[var(--gradient-card)]
    border border-[var(--color-border)]
    shadow-[var(--shadow-soft)]
  `,
  glass: `
    bg-[rgba(30,18,48,0.85)]
    backdrop-blur-xl
    border border-[rgba(147,51,234,0.2)]
  `,
  bordered: `
    bg-transparent
    border-2 border-[var(--color-border-light)]
    hover:border-[var(--color-accent-purple)]
  `,
  glow: `
    bg-[var(--color-bg-card)]
    border border-[var(--color-accent-purple)]
    shadow-[var(--shadow-glow-purple)]
  `,
  mystic: `
    bg-gradient-to-br from-[rgba(147,51,234,0.15)] via-[rgba(99,102,241,0.1)] to-[rgba(236,72,153,0.15)]
    border border-[rgba(147,51,234,0.3)]
    backdrop-blur-sm
    shadow-[0_8px_32px_rgba(147,51,234,0.2)]
  `,
  gold: `
    bg-gradient-to-br from-[rgba(245,197,24,0.1)] to-[rgba(201,160,0,0.05)]
    border border-[rgba(245,197,24,0.3)]
    shadow-[0_8px_32px_rgba(245,197,24,0.15)]
  `,
};

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', padding = 'md', hover = true, className = '', children, ...props }, ref) => {
    const hoverStyles = hover
      ? 'hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(147,51,234,0.25)] hover:border-[var(--color-accent-purple-light)]'
      : '';

    return (
      <div
        ref={ref}
        className={`
          rounded-[var(--radius-lg)]
          transition-all duration-300 ease-out
          ${variantStyles[variant]}
          ${paddingStyles[padding]}
          ${hoverStyles}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div ref={ref} className={`mb-4 ${className}`} {...props}>
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={`text-xl font-semibold text-[var(--color-text-primary)] ${className}`}
        {...props}
      >
        {children}
      </h3>
    );
  }
);

CardTitle.displayName = 'CardTitle';

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div ref={ref} className={`text-[var(--color-text-secondary)] ${className}`} {...props}>
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`mt-4 pt-4 border-t border-[var(--color-border)] ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';
