'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BackButton } from '@/components/layout';
import { ARTICLES, ARTICLE_CATEGORIES, getRecentArticles, getFeaturedArticles } from '@/lib/api';
import type { ArticleCategory } from '@/lib/api/blog';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory | 'all'>('all');

  const featuredArticles = getFeaturedArticles();
  const recentArticles = getRecentArticles(10);

  const filteredArticles = selectedCategory === 'all'
    ? recentArticles
    : recentArticles.filter((article) => article.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-6">
          <BackButton href="/" label="Accueil" />
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3">
            Blog Spiritactelle
          </h1>
          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Explorez nos articles sur les mythologies du monde, les pratiques spirituelles,
            l'astrologie et le bien-etre.
          </p>
        </div>

        {featuredArticles.length > 0 && (
          <div className="mb-12">
            <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">
              Articles a la une
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredArticles.map((article, index) => {
                const cardStyles = [
                  'bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200',
                  'bg-gradient-to-br from-slate-50 to-gray-100 border border-slate-200',
                ];
                const textColors = [
                  { primary: 'text-amber-900', secondary: 'text-amber-700', muted: 'text-amber-600/70', tag: 'bg-amber-100 text-amber-700' },
                  { primary: 'text-slate-900', secondary: 'text-slate-700', muted: 'text-slate-600/70', tag: 'bg-slate-200 text-slate-700' },
                ];
                const style = cardStyles[index % 2];
                const colors = textColors[index % 2];

                return (
                  <Link
                    key={article.id}
                    href={`/blog/${article.slug}`}
                    className={`group ${style} rounded-sm p-6 hover:shadow-xl transition-shadow`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-sm ${colors.tag}`}>
                        {ARTICLE_CATEGORIES[article.category].name}
                      </span>
                      <span className={`text-sm ${colors.muted}`}>{article.readingTime} min</span>
                    </div>
                    <h3 className={`text-xl font-bold mb-2 group-hover:underline ${colors.primary}`}>
                      {article.title}
                    </h3>
                    <p className={`${colors.secondary} text-sm line-clamp-2`}>
                      {article.excerpt}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-sm text-sm font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-white text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]'
            }`}
          >
            Tous
          </button>
          {Object.entries(ARTICLE_CATEGORIES).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key as ArticleCategory)}
              className={`px-4 py-2 rounded-sm text-sm font-medium transition-all ${
                selectedCategory === key
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-white text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]'
              }`}
            >
              {value.name}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className="group bg-white rounded-sm border border-[var(--color-border)] hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="px-2 py-1 text-xs font-medium rounded-sm"
                    style={{
                      backgroundColor: `${ARTICLE_CATEGORIES[article.category].color}15`,
                      color: ARTICLE_CATEGORIES[article.category].color,
                    }}
                  >
                    {ARTICLE_CATEGORIES[article.category].name}
                  </span>
                  <span className="text-xs text-[var(--color-text-muted)]">
                    {article.readingTime} min de lecture
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                  <span>{article.author}</span>
                  <span>-</span>
                  <span>{new Date(article.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[var(--color-text-muted)]">
              Aucun article trouve dans cette categorie.
            </p>
          </div>
        )}

        <div className="mt-12 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-sm p-6 border border-amber-100">
          <h3 className="font-bold text-amber-800 mb-3">
            Explorez nos autres ressources
          </h3>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/mythologies"
              className="px-4 py-2 bg-white rounded-sm shadow-sm hover:shadow-md transition-shadow text-[var(--color-text-primary)]"
            >
              Multi-Mythologies
            </Link>
            <Link
              href="/horoscope"
              className="px-4 py-2 bg-white rounded-sm shadow-sm hover:shadow-md transition-shadow text-[var(--color-text-primary)]"
            >
              Horoscopes
            </Link>
            <Link
              href="/bien-etre"
              className="px-4 py-2 bg-white rounded-sm shadow-sm hover:shadow-md transition-shadow text-[var(--color-text-primary)]"
            >
              Bien-etre
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
