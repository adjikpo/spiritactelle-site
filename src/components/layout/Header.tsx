'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui';

const navigation = [
  { name: 'Horoscopes', href: '/horoscope' },
  { name: 'Astrologie', href: '/astrologie' },
  { name: 'Mythologies', href: '/mythologies' },
  { name: 'Bien-etre', href: '/bien-etre' },
  { name: 'Livre d\'Or', href: '/livre-dor' },
  { name: 'Blog', href: '/blog' },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  // Vérifier si on est sur la page d'accueil (hero dark)
  const isHomePage = pathname === '/';

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-50 transition-all duration-300 ${
          isScrolled || !isHomePage
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[var(--color-border)]'
            : 'bg-gradient-to-b from-black/50 to-transparent'
        }`}
        style={{ right: 0, width: '100%' }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group z-10">
              <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all ${
                isScrolled || !isHomePage
                  ? 'bg-[var(--color-primary)]'
                  : 'bg-white/20 backdrop-blur-sm'
              }`}>
                <span className="text-white text-base sm:text-lg">✦</span>
              </div>
              <span className={`text-lg sm:text-xl font-bold transition-colors ${
                isScrolled || !isHomePage
                  ? 'text-[var(--color-primary)]'
                  : 'text-white'
              }`}>
                Spiritactelle
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive(item.href)
                      ? isScrolled || !isHomePage
                        ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                        : 'bg-white/20 text-white'
                      : isScrolled || !isHomePage
                        ? 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Desktop Newsletter Button */}
            <div className="hidden md:flex items-center gap-2">
              <Link href="/newsletter">
                <Button variant="gold" size="sm">
                  Newsletter
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 -mr-2 rounded-lg transition-colors z-10 ${
                isMobileMenuOpen
                  ? 'text-[var(--color-text-primary)]'
                  : isScrolled || !isHomePage
                    ? 'text-[var(--color-text-primary)]'
                    : 'text-white'
              }`}
              aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isMobileMenuOpen}
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
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
            <span className="text-lg font-semibold text-[var(--color-text-primary)]">Menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 -mr-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]"
              aria-label="Fermer le menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-4">
            <div className="space-y-1">
              <Link
                href="/"
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  pathname === '/'
                    ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] active:bg-[var(--color-bg-tertiary)]'
                }`}
              >
                Accueil
              </Link>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                      : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] active:bg-[var(--color-bg-tertiary)]'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-[var(--color-border)]" />

            {/* Newsletter Section */}
            <div className="space-y-3">
              <div className="px-4 py-3 rounded-xl bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10">
                <p className="text-sm font-medium text-[var(--color-text-primary)] mb-1">
                  Restez connecte aux etoiles
                </p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Recevez votre horoscope et nos conseils spirituels
                </p>
              </div>
              <Link href="/newsletter" className="block">
                <Button variant="gold" size="lg" className="w-full">
                  S&apos;abonner a la newsletter
                </Button>
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[var(--color-border)] bg-[var(--color-bg-tertiary)] safe-area-bottom">
            <p className="text-xs text-center text-[var(--color-text-muted)]">
              Spiritactelle © 2026
            </p>
          </div>
        </div>
      </div>

    </>
  );
}
