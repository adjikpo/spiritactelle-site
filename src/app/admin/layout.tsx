'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createBrowserClient } from '@/lib/supabase';

const adminNavigation = [
  { name: 'Dashboard', href: '/admin', icon: '📊' },
  { name: 'Utilisateurs', href: '/admin/utilisateurs', icon: '👥' },
  { name: 'Articles', href: '/admin/articles', icon: '📝' },
  { name: 'Méditations', href: '/admin/meditations', icon: '🧘' },
  { name: 'Horoscopes', href: '/admin/horoscopes', icon: '✨' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const supabase = createBrowserClient();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/auth/connexion?redirect=/admin');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile?.role !== 'admin') {
        router.push('/');
        return;
      }

      setIsAuthorized(true);
      setIsLoading(false);
    };

    checkAdmin();
  }, [supabase, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin text-4xl">✦</div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[var(--color-bg-secondary)] border-r border-[var(--color-border)] fixed h-full pt-16">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gradient-gold mb-6">
            Administration
          </h2>
          <nav className="space-y-1">
            {adminNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
