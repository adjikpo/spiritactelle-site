'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, CardHeader, CardTitle, CardContent, Input } from '@/components/ui';
import { createBrowserClient } from '@/lib/supabase';
import type { Profile } from '@/types/database';

export default function ProfilPage() {
  const router = useRouter();
  const supabase = createBrowserClient();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form state
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthPlace, setBirthPlace] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/auth/connexion');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profile) {
        setProfile(profile);
        setFullName(profile.full_name || '');
        setBirthDate(profile.birth_date || '');
        setBirthTime(profile.birth_time || '');
        setBirthPlace(profile.birth_place || '');
      }

      setIsLoading(false);
    };

    loadProfile();
  }, [supabase, router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: fullName,
        birth_date: birthDate || null,
        birth_time: birthTime || null,
        birth_place: birthPlace || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (error) {
      setMessage({ type: 'error', text: 'Erreur lors de la sauvegarde' });
    } else {
      setMessage({ type: 'success', text: 'Profil mis à jour avec succès' });
    }

    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin text-4xl">✦</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Mon espace</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card variant="glass">
              <CardContent>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--color-accent-purple)] to-[var(--color-accent-gold)] flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl text-white">
                      {fullName ? fullName.charAt(0).toUpperCase() : '✦'}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold">{fullName || 'Utilisateur'}</h2>
                  <p className="text-sm text-[var(--color-text-muted)]">{profile?.email}</p>

                  {profile?.is_premium ? (
                    <span className="inline-block mt-3 px-3 py-1 rounded-full bg-[var(--color-accent-gold)]/20 text-[var(--color-accent-gold)] text-xs font-medium">
                      Premium
                    </span>
                  ) : (
                    <Button variant="gold" size="sm" className="mt-4">
                      Devenir Premium
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card variant="default" className="mt-4">
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[var(--color-text-muted)]">Thèmes créés</span>
                    <span className="font-semibold">0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[var(--color-text-muted)]">Tirages</span>
                    <span className="font-semibold">0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[var(--color-text-muted)]">Membre depuis</span>
                    <span className="font-semibold">
                      {profile?.created_at
                        ? new Date(profile.created_at).toLocaleDateString('fr-FR', {
                            month: 'short',
                            year: 'numeric',
                          })
                        : '-'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Form */}
            <Card variant="default">
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSave} className="space-y-4">
                  <Input
                    label="Nom complet"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Votre nom"
                  />

                  <div className="pt-4 border-t border-[var(--color-border)]">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <span className="text-[var(--color-accent-purple)]">✦</span>
                      Données de naissance
                    </h3>
                    <p className="text-sm text-[var(--color-text-muted)] mb-4">
                      Ces informations sont nécessaires pour calculer votre thème astral
                      et personnaliser vos horoscopes.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Date de naissance"
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                      />
                      <Input
                        label="Heure de naissance"
                        type="time"
                        value={birthTime}
                        onChange={(e) => setBirthTime(e.target.value)}
                        hint="Si inconnue, laissez vide"
                      />
                    </div>

                    <div className="mt-4">
                      <Input
                        label="Lieu de naissance"
                        type="text"
                        value={birthPlace}
                        onChange={(e) => setBirthPlace(e.target.value)}
                        placeholder="Paris, France"
                        hint="Ville et pays de naissance"
                      />
                    </div>
                  </div>

                  {message && (
                    <p
                      className={`text-sm ${
                        message.type === 'success'
                          ? 'text-[var(--color-success)]'
                          : 'text-[var(--color-error)]'
                      }`}
                    >
                      {message.text}
                    </p>
                  )}

                  <div className="flex justify-end">
                    <Button type="submit" variant="gold" isLoading={isSaving}>
                      Enregistrer
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="justify-start h-auto py-4"
                    onClick={() => router.push('/astrologie/theme-natal')}
                  >
                    <div className="text-left">
                      <div className="text-lg mb-1">✦ Créer mon thème astral</div>
                      <div className="text-sm text-[var(--color-text-muted)] font-normal">
                        Découvrez votre carte du ciel
                      </div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start h-auto py-4"
                    onClick={() => router.push('/voyance/tirage')}
                  >
                    <div className="text-left">
                      <div className="text-lg mb-1">🃏 Tirage de cartes</div>
                      <div className="text-sm text-[var(--color-text-muted)] font-normal">
                        Consultez le tarot
                      </div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
