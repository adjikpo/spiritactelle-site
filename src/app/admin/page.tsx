'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

// Donnees de demonstration (Supabase desactive)
const mockStats = {
  totalUsers: 127,
  premiumUsers: 23,
  totalArticles: 4,
  totalMeditations: 8,
};

export default function AdminDashboard() {
  const statCards = [
    {
      title: 'Utilisateurs',
      value: mockStats.totalUsers,
      icon: '👥',
      color: 'purple',
    },
    {
      title: 'Premium',
      value: mockStats.premiumUsers,
      icon: '⭐',
      color: 'gold',
    },
    {
      title: 'Articles',
      value: mockStats.totalArticles,
      icon: '📝',
      color: 'purple',
    },
    {
      title: 'Meditations',
      value: mockStats.totalMeditations,
      icon: '🧘',
      color: 'gold',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Info banner */}
      <div className="mb-6 p-4 rounded-sm bg-amber-50 border border-amber-200">
        <div className="flex gap-3">
          <span className="text-amber-600">⚠️</span>
          <div>
            <p className="text-sm font-medium text-amber-800">Mode demonstration</p>
            <p className="text-sm text-amber-700">
              Les donnees affichees sont fictives. Supabase sera configure prochainement.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <Card
            key={stat.title}
            variant="glass"
            className={stat.color === 'gold' ? 'hover:shadow-lg' : 'hover:shadow-lg'}
          >
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--color-text-muted)]">{stat.title}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
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
                className="block px-4 py-3 rounded-sm bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-border)] transition-colors"
              >
                📝 Creer un nouvel article
              </a>
              <a
                href="/admin/meditations/nouveau"
                className="block px-4 py-3 rounded-sm bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-border)] transition-colors"
              >
                🧘 Ajouter une meditation
              </a>
              <a
                href="/admin/horoscopes/generer"
                className="block px-4 py-3 rounded-sm bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-border)] transition-colors"
              >
                ✨ Generer les horoscopes du jour
              </a>
            </div>
          </CardContent>
        </Card>

        <Card variant="default">
          <CardHeader>
            <CardTitle>Activite recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-[var(--color-text-muted)] py-8">
              <p>Aucune activite recente</p>
              <p className="text-sm mt-2">Les nouvelles inscriptions et actions apparaitront ici</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
