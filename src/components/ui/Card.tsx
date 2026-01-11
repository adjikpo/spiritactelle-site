import { HTMLAttributes, forwardRef } from 'react';

type CardVariant = 'default' | 'elevated' | 'bordered' | 'dark' | 'glass';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

const variantStyles: Record<CardVariant, string> = {
  default: `
    bg-white
    border border-[var(--color-border)]
    shadow-[var(--shadow-card)]
  `,
  elevated: `
    bg-white
    shadow-[var(--shadow-md)]
    border border-[var(--color-border)]
  `,
  bordered: `
    bg-white
    border-2 border-[var(--color-border)]
  `,
  dark: `
    bg-[var(--color-bg-dark)]
    text-white
    border border-[rgba(255,255,255,0.1)]
  `,
  glass: `
    bg-white/80
    backdrop-blur-md
    border border-[var(--color-border)]
    shadow-[var(--shadow-md)]
  `,
};

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', padding = 'md', hover = false, className = '', children, ...props }, ref) => {
    const hoverStyles = hover
      ? 'hover:shadow-[var(--shadow-lg)] hover:border-[var(--color-primary)] hover:-translate-y-1'
      : '';

    return (
      <div
        ref={ref}
        className={`
          rounded-[var(--radius-xl)]
          transition-all duration-200 ease-out
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
