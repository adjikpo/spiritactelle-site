'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui';
import { createBrowserClient } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Voyance', href: '/voyance' },
  { name: 'Astrologie', href: '/astrologie' },
  { name: 'Blog', href: '/blog' },
];

export function Header() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createBrowserClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setIsLoading(false);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 glass border-b border-[var(--color-accent-purple)]/20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-accent-purple)] via-[var(--color-accent-pink)] to-[var(--color-accent-gold)] flex items-center justify-center shadow-[0_0_15px_rgba(147,51,234,0.4)] group-hover:shadow-[0_0_25px_rgba(147,51,234,0.6)] transition-shadow">
              <span className="text-white text-xl">&#10022;</span>
            </div>
            <span className="text-xl font-bold text-gradient-gold group-hover:drop-shadow-[0_0_10px_rgba(245,197,24,0.5)] transition-all">
              Spiritactelle
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isLoading ? (
              <div className="w-20 h-8 bg-[var(--color-bg-tertiary)] rounded animate-pulse" />
            ) : user ? (
              <>
                <Link href="/profil">
                  <Button variant="ghost" size="sm">
                    Mon espace
                  </Button>
                </Link>
                <Button variant="secondary" size="sm" onClick={handleLogout}>
                  Déconnexion
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/connexion">
                  <Button variant="ghost" size="sm">
                    Connexion
                  </Button>
                </Link>
                <Link href="/auth/inscription">
                  <Button variant="gold" size="sm">
                    Inscription
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-[var(--radius-md)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[var(--color-border)]">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-2 rounded-[var(--radius-md)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex gap-2 mt-4 px-4">
                {user ? (
                  <>
                    <Link href="/profil" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full">
                        Mon espace
                      </Button>
                    </Link>
                    <Button variant="secondary" size="sm" className="flex-1" onClick={handleLogout}>
                      Déconnexion
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/connexion" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full">
                        Connexion
                      </Button>
                    </Link>
                    <Link href="/auth/inscription" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="gold" size="sm" className="w-full">
                        Inscription
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
