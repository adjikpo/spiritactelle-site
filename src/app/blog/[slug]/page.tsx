import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug, ARTICLES, ARTICLE_CATEGORIES, getRecentArticles } from '@/lib/api';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: 'Article non trouve' };
  }

  return {
    title: `${article.title} | Astrobien`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRecentArticles(3).filter((a) => a.id !== article.id);

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-20 pb-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-3 py-2 bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-border)] rounded-sm text-[var(--color-text-primary)] text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Blog</span>
          </Link>
        </div>

        <article className="bg-white rounded-sm shadow-lg overflow-hidden border border-[var(--color-border)]">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="px-3 py-1 text-sm font-medium rounded-sm"
                style={{
                  backgroundColor: `${ARTICLE_CATEGORIES[article.category].color}15`,
                  color: ARTICLE_CATEGORIES[article.category].color,
                }}
              >
                {ARTICLE_CATEGORIES[article.category].name}
              </span>
              <span className="text-sm text-[var(--color-text-muted)]">
                {article.readingTime} min de lecture
              </span>
            </div>

            <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
              {article.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)] mb-8 pb-8 border-b border-[var(--color-border)]">
              <span>Par {article.author}</span>
              <span>-</span>
              <span>
                {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>

            <div
              className="prose prose-lg max-w-none text-[var(--color-text-secondary)]"
              style={{
                lineHeight: '1.8',
              }}
            >
              {article.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2
                      key={index}
                      className="text-2xl font-bold text-[var(--color-text-primary)] mt-8 mb-4"
                    >
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3
                      key={index}
                      className="text-xl font-semibold text-[var(--color-text-primary)] mt-6 mb-3"
                    >
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return (
                    <p key={index} className="font-medium text-[var(--color-text-primary)] my-4">
                      {paragraph.replace(/\*\*/g, '')}
                    </p>
                  );
                }
                if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n').filter((line) => line.startsWith('- '));
                  return (
                    <ul key={index} className="list-disc list-inside space-y-2 my-4">
                      {items.map((item, i) => (
                        <li key={i}>{item.replace('- ', '')}</li>
                      ))}
                    </ul>
                  );
                }
                if (paragraph.trim()) {
                  return (
                    <p key={index} className="my-4">
                      {paragraph}
                    </p>
                  );
                }
                return null;
              })}
            </div>

            <div className="mt-8 pt-8 border-t border-[var(--color-border)]">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] rounded-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>

        {relatedArticles.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6">
              Articles similaires
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="bg-white rounded-sm p-4 shadow-md hover:shadow-lg transition-shadow"
                >
                  <span
                    className="text-xs font-medium"
                    style={{ color: ARTICLE_CATEGORIES[related.category].color }}
                  >
                    {ARTICLE_CATEGORIES[related.category].name}
                  </span>
                  <h3 className="font-medium text-[var(--color-text-primary)] mt-1 line-clamp-2">
                    {related.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            href="/mythologies"
            className="px-6 py-3 bg-white rounded-sm shadow-md hover:shadow-lg transition-shadow text-[var(--color-text-primary)]"
          >
            Multi-Mythologies
          </Link>
          <Link
            href="/horoscope"
            className="px-6 py-3 bg-white rounded-sm shadow-md hover:shadow-lg transition-shadow text-[var(--color-text-primary)]"
          >
            Horoscopes
          </Link>
        </div>
      </div>
    </div>
  );
}
