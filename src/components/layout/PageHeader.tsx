'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  backLink?: {
    href: string;
    label: string;
  };
}

// Mapping des routes vers leurs labels
const routeLabels: Record<string, string> = {
  horoscope: 'Horoscope',
  astrologie: 'Astrologie',
  'bien-etre': 'Bien-être',
  'theme-natal': 'Thème Natal',
  'calendrier-lunaire': 'Calendrier Lunaire',
  transits: 'Transits',
  compatibilite: 'Compatibilité',
  citations: 'Citations',
  affirmations: 'Affirmations',
  meditation: 'Méditation',
  numerologie: 'Numérologie',
};

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [{ label: 'Accueil', href: '/' }];

  let currentPath = '';
  for (const segment of segments) {
    currentPath += `/${segment}`;
    // Ignorer les segments dynamiques (comme [signe])
    if (!segment.startsWith('[')) {
      breadcrumbs.push({
        label: routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
        href: currentPath,
      });
    }
  }

  return breadcrumbs;
}

export function PageHeader({ title, description, backLink }: PageHeaderProps) {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);

  return (
    <div className="mb-8">
      {/* Breadcrumb - visible sur tous les écrans */}
      <nav className="mb-4" aria-label="Fil d'Ariane">
        <ol className="flex items-center flex-wrap gap-1 text-sm">
          {breadcrumbs.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <svg
                  className="w-4 h-4 text-[var(--color-text-muted)] mx-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-[var(--color-text-primary)] font-medium">{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Bouton retour amélioré pour mobile */}
      {backLink && (
        <Link
          href={backLink.href}
          className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] font-medium transition-colors sm:hidden"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>{backLink.label}</span>
        </Link>
      )}

      {/* Titre et description */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3">
          {title}
        </h1>
        {description && (
          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * Version compacte pour les pages avec header personnalisé
 */
export function BackButton({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 px-3 py-2 bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] text-sm font-medium transition-colors"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      <span>{label}</span>
    </Link>
  );
}
