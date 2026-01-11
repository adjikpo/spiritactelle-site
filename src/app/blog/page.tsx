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
              {featuredArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="group bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="px-2 py-1 text-xs font-medium rounded-full bg-white/20"
                    >
                      {ARTICLE_CATEGORIES[article.category].name}
                    </span>
                    <span className="text-sm text-white/70">{article.readingTime} min</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:underline">
                    {article.title}
                  </h3>
                  <p className="text-white/80 text-sm line-clamp-2">
                    {article.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
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
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
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
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden"
            >
              <div
                className="h-2"
                style={{ backgroundColor: ARTICLE_CATEGORIES[article.category].color }}
              />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="px-2 py-1 text-xs font-medium rounded-full"
                    style={{
                      backgroundColor: `${ARTICLE_CATEGORIES[article.category].color}20`,
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

        <div className="mt-12 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100">
          <h3 className="font-bold text-purple-800 mb-3">
            Explorez nos autres ressources
          </h3>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/mythologies"
              className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-purple-700"
            >
              Multi-Mythologies
            </Link>
            <Link
              href="/horoscope"
              className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-purple-700"
            >
              Horoscopes
            </Link>
            <Link
              href="/bien-etre"
              className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-purple-700"
            >
              Bien-etre
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
