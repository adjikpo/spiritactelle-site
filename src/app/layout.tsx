import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Header, Footer } from '@/components/layout';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Spiritactelle - Voyance & Astrologie en ligne',
    template: '%s | Spiritactelle',
  },
  description:
    'Découvrez votre thème astral, tirez les cartes et explorez votre chemin spirituel avec Spiritactelle. Astrologie, tarot et méditations guidées.',
  keywords: [
    'voyance',
    'astrologie',
    'tarot',
    'thème astral',
    'horoscope',
    'méditation',
    'spiritualité',
  ],
  authors: [{ name: 'Spiritactelle' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Spiritactelle',
    title: 'Spiritactelle - Voyance & Astrologie en ligne',
    description:
      'Découvrez votre thème astral, tirez les cartes et explorez votre chemin spirituel.',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
