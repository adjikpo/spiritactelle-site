'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { createBrowserClient } from '@/lib/supabase';

interface Stats {
  totalUsers: number;
  premiumUsers: number;
  totalArticles: number;
  totalMeditations: number;
}

export default function AdminDashboard() {
  const supabase = createBrowserClient();
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    premiumUsers: 0,
    totalArticles: 0,
    totalMeditations: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      // Get user counts
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      const { count: premiumUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('is_premium', true);

      // Get content counts
      const { count: totalArticles } = await supabase
        .from('articles')
        .select('*', { count: 'exact', head: true });

      const { count: totalMeditations } = await supabase
        .from('meditations')
        .select('*', { count: 'exact', head: true });

      setStats({
        totalUsers: totalUsers || 0,
        premiumUsers: premiumUsers || 0,
        totalArticles: totalArticles || 0,
        totalMeditations: totalMeditations || 0,
      });

      setIsLoading(false);
    };

    loadStats();
  }, [supabase]);

  const statCards = [
    {
      title: 'Utilisateurs',
      value: stats.totalUsers,
      icon: '👥',
      color: 'purple',
    },
    {
      title: 'Premium',
      value: stats.premiumUsers,
      icon: '⭐',
      color: 'gold',
    },
    {
      title: 'Articles',
      value: stats.totalArticles,
      icon: '📝',
      color: 'purple',
    },
    {
      title: 'Méditations',
      value: stats.totalMeditations,
      icon: '🧘',
      color: 'gold',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <Card
            key={stat.title}
            variant="glass"
            className={stat.color === 'gold' ? 'hover:glow-gold' : 'hover:glow-purple'}
          >
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--color-text-muted)]">{stat.title}</p>
                  <p className="text-3xl font-bold mt-1">
                    {isLoading ? '-' : stat.value}
                  </p>
                </div>
                <div className="text-4xl opacity-50">{stat.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="default">
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <a
                href="/admin/articles/nouveau"
                className="block px-4 py-3 rounded-[var(--radius-md)] bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-border)] transition-colors"
              >
                📝 Créer un nouvel article
              </a>
              <a
                href="/admin/meditations/nouveau"
                className="block px-4 py-3 rounded-[var(--radius-md)] bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-border)] transition-colors"
              >
                🧘 Ajouter une méditation
              </a>
              <a
                href="/admin/horoscopes/generer"
                className="block px-4 py-3 rounded-[var(--radius-md)] bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-border)] transition-colors"
              >
                ✨ Générer les horoscopes du jour
              </a>
            </div>
          </CardContent>
        </Card>

        <Card variant="default">
          <CardHeader>
            <CardTitle>Activité récente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-[var(--color-text-muted)] py-8">
              <p>Aucune activité récente</p>
              <p className="text-sm mt-2">Les nouvelles inscriptions et actions apparaîtront ici</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
