'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const adminNavigation = [
  { name: 'Dashboard', href: '/admin', icon: '📊' },
  { name: 'Utilisateurs', href: '/admin/utilisateurs', icon: '👥' },
  { name: 'Articles', href: '/admin/articles', icon: '📝' },
  { name: 'Meditations', href: '/admin/meditations', icon: '🧘' },
  { name: 'Horoscopes', href: '/admin/horoscopes', icon: '✨' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Version temporaire sans authentification
  // L'admin sera protege quand Supabase sera configure
  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen flex pt-16">
      {/* Sidebar */}
      <aside className="w-64 bg-[var(--color-bg-secondary)] border-r border-[var(--color-border)] fixed h-full top-16">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-[var(--color-primary)] mb-2">
            Administration
          </h2>
          <p className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded mb-4">
            Mode dev - Auth desactivee
          </p>
          <nav className="space-y-1">
            {adminNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-colors ${
                  isActive(item.href)
                    ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Retour au site */}
        <div className="absolute bottom-4 left-4 right-4">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour au site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 bg-[var(--color-bg-primary)]">
        {children}
      </main>
    </div>
  );
}
