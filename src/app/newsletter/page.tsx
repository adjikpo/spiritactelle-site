'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { BackButton } from '@/components/layout';

export default function NewsletterPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simuler un délai d'envoi
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitted(true);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-20 pb-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-6">
          <BackButton href="/" label="Accueil" />
        </div>

        <div className="bg-white rounded-sm shadow-lg overflow-hidden">
          {/* Header décoratif */}
          <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-sm bg-white/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Restez connecte aux etoiles
            </h1>
            <p className="text-white/80">
              Recevez votre horoscope quotidien et nos conseils spirituels
            </p>
          </div>

          {/* Contenu */}
          <div className="p-6 sm:p-8">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-sm bg-green-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
                  Merci pour votre inscription !
                </h2>
                <p className="text-[var(--color-text-secondary)] mb-6">
                  Vous recevrez bientot nos premieres nouvelles cosmiques dans votre boite mail.
                </p>
                <Link href="/">
                  <Button variant="primary">
                    Retour a l&apos;accueil
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                {/* Message compte non disponible */}
                <div className="mb-6 p-4 rounded-sm bg-amber-50 border border-amber-200">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-amber-800">
                        Creation de compte bientot disponible
                      </h3>
                      <p className="mt-1 text-sm text-amber-700">
                        La creation de compte et l&apos;espace personnel arriveront tres prochainement.
                        En attendant, abonnez-vous a notre newsletter pour etre informe du lancement !
                      </p>
                    </div>
                  </div>
                </div>

                {/* Avantages */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">
                    Ce que vous recevrez :
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Votre horoscope quotidien personnalise',
                      'Les phases lunaires et leurs influences',
                      'Des conseils spirituels et de bien-etre',
                      'Les actualites astrologiques importantes',
                      'Acces en avant-premiere aux nouvelles fonctionnalites',
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <span className="text-[var(--color-text-secondary)]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Formulaire */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                      Votre adresse email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="exemple@email.com"
                      required
                      className="w-full px-4 py-3 rounded-sm border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="gold"
                    size="lg"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Inscription en cours...
                      </span>
                    ) : (
                      "S'abonner a la newsletter"
                    )}
                  </Button>

                  <p className="text-xs text-center text-[var(--color-text-muted)]">
                    En vous inscrivant, vous acceptez de recevoir nos emails.
                    Vous pouvez vous desabonner a tout moment.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Section supplémentaire */}
        <div className="mt-8 text-center">
          <p className="text-[var(--color-text-secondary)] mb-4">
            En attendant, explorez nos contenus gratuits :
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/horoscope">
              <Button variant="outline" size="sm">
                Horoscopes
              </Button>
            </Link>
            <Link href="/mythologies">
              <Button variant="outline" size="sm">
                Mythologies
              </Button>
            </Link>
            <Link href="/blog">
              <Button variant="outline" size="sm">
                Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
