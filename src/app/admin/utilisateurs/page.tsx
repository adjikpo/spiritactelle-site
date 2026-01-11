'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input } from '@/components/ui';
import { createBrowserClient } from '@/lib/supabase';
import type { Profile, Database } from '@/types/database';

type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export default function AdminUsersPage() {
  const supabase = createBrowserClient();
  const [users, setUsers] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setUsers(data as Profile[]);
    }
    setIsLoading(false);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.full_name && user.full_name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleRoleChange = async (userId: string, newRole: 'user' | 'premium' | 'admin') => {
    const updateData: ProfileUpdate = {
      role: newRole,
      is_premium: newRole === 'premium' || newRole === 'admin',
    };

    const { error } = await supabase
      .from('profiles')
      .update(updateData as never)
      .eq('id', userId);

    if (!error) {
      loadUsers();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Utilisateurs</h1>
        <span className="text-[var(--color-text-muted)]">
          {users.length} utilisateur{users.length > 1 ? 's' : ''}
        </span>
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
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin text-4xl">✦</div>
            </div>
          ) : (
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
                      Rôle
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
                          onChange={(e) =>
                            handleRoleChange(user.id, e.target.value as 'user' | 'premium' | 'admin')
                          }
                          className="bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded px-2 py-1 text-sm"
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
                  Aucun utilisateur trouvé
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
