import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/database';

// Client Supabase désactivé temporairement
// Retourne null si les variables d'environnement ne sont pas configurées
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Vérifier que les variables sont définies et valides
  if (!url || !key || url.includes('placeholder')) {
    console.warn('Supabase non configuré - fonctionnalités auth désactivées');
    return null;
  }

  return createBrowserClient<Database>(url, key);
}
