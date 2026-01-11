'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BackButton } from '@/components/layout';
import {
  TESTIMONIALS,
  TESTIMONIAL_SERVICES,
  getFeaturedTestimonials,
  getAverageRating,
  getTotalTestimonials,
} from '@/lib/api';
import type { TestimonialService } from '@/lib/api/livre-dor';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= rating ? 'text-amber-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function LivreDorPage() {
  const [selectedService, setSelectedService] = useState<TestimonialService | 'all'>('all');

  const featuredTestimonials = getFeaturedTestimonials();
  const averageRating = getAverageRating();
  const totalCount = getTotalTestimonials();

  const filteredTestimonials = selectedService === 'all'
    ? TESTIMONIALS
    : TESTIMONIALS.filter((t) => t.service === selectedService);

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-6">
          <BackButton href="/" label="Accueil" />
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3">
            Livre d'Or
          </h1>
          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto mb-6">
            Decouvrez les temoignages de notre communaute et partagez votre experience avec Spiritactelle.
          </p>

          <div className="inline-flex items-center gap-6 bg-white rounded-2xl shadow-md px-6 py-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <span className="text-2xl font-bold text-[var(--color-text-primary)]">{averageRating}</span>
                <span className="text-amber-400">/5</span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)]">Note moyenne</p>
            </div>
            <div className="w-px h-10 bg-[var(--color-border)]" />
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--color-text-primary)]">{totalCount}</div>
              <p className="text-xs text-[var(--color-text-muted)]">Temoignages</p>
            </div>
            <div className="w-px h-10 bg-[var(--color-border)]" />
            <div className="flex">
              <StarRating rating={Math.round(averageRating)} />
            </div>
          </div>
        </div>

        {featuredTestimonials.length > 0 && (
          <div className="mb-12">
            <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">
              Temoignages a la une
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredTestimonials.map((testimonial, index) => {
                const cardStyles = [
                  'bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200',
                  'bg-gradient-to-br from-slate-50 to-gray-100 border border-slate-200',
                  'bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200',
                ];
                const textColors = [
                  { primary: 'text-amber-900', secondary: 'text-amber-700', muted: 'text-amber-600/70', tag: 'bg-amber-100 text-amber-700' },
                  { primary: 'text-slate-900', secondary: 'text-slate-700', muted: 'text-slate-600/70', tag: 'bg-slate-200 text-slate-700' },
                  { primary: 'text-rose-900', secondary: 'text-rose-700', muted: 'text-rose-600/70', tag: 'bg-rose-100 text-rose-700' },
                ];
                const style = cardStyles[index % 3];
                const colors = textColors[index % 3];

                return (
                  <div
                    key={testimonial.id}
                    className={`${style} rounded-2xl p-6 hover:shadow-lg transition-shadow`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors.tag}`}>
                        {TESTIMONIAL_SERVICES[testimonial.service].name}
                      </span>
                      <StarRating rating={testimonial.rating} />
                    </div>
                    <p className={`${colors.secondary} text-sm leading-relaxed mb-4`}>
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`font-medium ${colors.primary}`}>{testimonial.author}</p>
                        {testimonial.location && (
                          <p className={`text-xs ${colors.muted}`}>{testimonial.location}</p>
                        )}
                      </div>
                      <p className={`text-xs ${colors.muted}`}>
                        {new Date(testimonial.createdAt).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedService('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedService === 'all'
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-white text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]'
            }`}
          >
            Tous
          </button>
          {Object.entries(TESTIMONIAL_SERVICES).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setSelectedService(key as TestimonialService)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedService === key
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-white text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]'
              }`}
            >
              {value.name}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: TESTIMONIAL_SERVICES[testimonial.service].color }}
                  >
                    {testimonial.author[0]}
                  </div>
                  <div>
                    <p className="font-medium text-[var(--color-text-primary)]">
                      {testimonial.author}
                    </p>
                    {testimonial.location && (
                      <p className="text-xs text-[var(--color-text-muted)]">
                        {testimonial.location}
                      </p>
                    )}
                  </div>
                </div>
                <StarRating rating={testimonial.rating} />
              </div>

              <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-4">
                "{testimonial.content}"
              </p>

              <div className="flex items-center justify-between">
                <span
                  className="px-3 py-1 text-xs font-medium rounded-full"
                  style={{
                    backgroundColor: `${TESTIMONIAL_SERVICES[testimonial.service].color}15`,
                    color: TESTIMONIAL_SERVICES[testimonial.service].color,
                  }}
                >
                  {TESTIMONIAL_SERVICES[testimonial.service].name}
                </span>
                <p className="text-xs text-[var(--color-text-muted)]">
                  {new Date(testimonial.createdAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredTestimonials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[var(--color-text-muted)]">
              Aucun temoignage dans cette categorie.
            </p>
          </div>
        )}

        <div className="mt-12 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-100">
          <h3 className="font-bold text-amber-800 mb-3">
            Partagez votre experience
          </h3>
          <p className="text-amber-700 mb-4">
            Vous avez utilise nos services ? Votre temoignage compte ! La possibilite de laisser
            un temoignage sera bientot disponible. En attendant, inscrivez-vous a notre newsletter.
          </p>
          <Link
            href="/newsletter"
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors"
          >
            S&apos;inscrire a la newsletter
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/mythologies"
            className="px-6 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow text-[var(--color-text-primary)]"
          >
            Multi-Mythologies
          </Link>
          <Link
            href="/horoscope"
            className="px-6 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow text-[var(--color-text-primary)]"
          >
            Horoscopes
          </Link>
          <Link
            href="/bien-etre"
            className="px-6 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow text-[var(--color-text-primary)]"
          >
            Bien-etre
          </Link>
        </div>
      </div>
    </div>
  );
}
