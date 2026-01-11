'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Input } from '@/components/ui';

// Données de démonstration (Supabase désactivé)
const mockUsers = [
  {
    id: '1',
    email: 'marie.dupont@email.com',
    full_name: 'Marie Dupont',
    role: 'premium' as const,
    is_premium: true,
    created_at: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    email: 'jean.martin@email.com',
    full_name: 'Jean Martin',
    role: 'user' as const,
    is_premium: false,
    created_at: '2024-02-20T14:45:00Z',
  },
  {
    id: '3',
    email: 'sophie.bernard@email.com',
    full_name: 'Sophie Bernard',
    role: 'admin' as const,
    is_premium: true,
    created_at: '2024-01-01T09:00:00Z',
  },
  {
    id: '4',
    email: 'lucas.petit@email.com',
    full_name: 'Lucas Petit',
    role: 'user' as const,
    is_premium: false,
    created_at: '2024-03-10T16:20:00Z',
  },
  {
    id: '5',
    email: 'emma.moreau@email.com',
    full_name: null,
    role: 'premium' as const,
    is_premium: true,
    created_at: '2024-02-28T11:15:00Z',
  },
];

type MockUser = typeof mockUsers[0];

export default function AdminUsersPage() {
  const [users] = useState<MockUser[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.full_name && user.full_name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Utilisateurs</h1>
        <span className="text-[var(--color-text-muted)]">
          {users.length} utilisateur{users.length > 1 ? 's' : ''}
        </span>
      </div>

      {/* Info banner */}
      <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200">
        <div className="flex gap-3">
          <span className="text-amber-600">⚠️</span>
          <div>
            <p className="text-sm font-medium text-amber-800">Mode demonstration</p>
            <p className="text-sm text-amber-700">
              Les donnees affichees sont fictives. La gestion des utilisateurs sera disponible apres la configuration de Supabase.
            </p>
          </div>
        </div>
      </div>

      <Card variant="default">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Liste des utilisateurs</CardTitle>
            <div className="w-64">
              <Input
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-text-muted)]">
                    Utilisateur
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-text-muted)]">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-text-muted)]">
                    Role
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-text-muted)]">
                    Inscription
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-[var(--color-text-muted)]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-[var(--color-border)] hover:bg-[var(--color-bg-tertiary)]"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-accent-purple)] to-[var(--color-accent-gold)] flex items-center justify-center">
                          <span className="text-white text-xs">
                            {user.full_name ? user.full_name.charAt(0).toUpperCase() : '?'}
                          </span>
                        </div>
                        <span className="font-medium">
                          {user.full_name || 'Sans nom'}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[var(--color-text-secondary)]">
                      {user.email}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          user.role === 'admin'
                            ? 'bg-[var(--color-error)]/20 text-[var(--color-error)]'
                            : user.role === 'premium'
                            ? 'bg-[var(--color-accent-gold)]/20 text-[var(--color-accent-gold)]'
                            : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[var(--color-text-muted)] text-sm">
                      {new Date(user.created_at).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <select
                        value={user.role}
                        disabled
                        className="bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded px-2 py-1 text-sm opacity-50 cursor-not-allowed"
                      >
                        <option value="user">User</option>
                        <option value="premium">Premium</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className="text-center py-8 text-[var(--color-text-muted)]">
                Aucun utilisateur trouve
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
