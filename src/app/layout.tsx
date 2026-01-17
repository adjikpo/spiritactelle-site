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
    default: 'Astrobien - Horoscopes & Astrologie',
    template: '%s | Astrobien',
  },
  description:
    'Horoscopes personnalisés, thèmes astraux et articles inspirants. Découvrez ce que les astres vous réservent avec Astrobien.',
  keywords: [
    'horoscope',
    'astrologie',
    'thème astral',
    'signe astrologique',
    'zodiaque',
    'ascendant',
    'spiritualité',
    'bien-être',
  ],
  authors: [{ name: 'Astrobien' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Astrobien',
    title: 'Astrobien - Horoscopes & Astrologie',
    description:
      'Horoscopes personnalisés, thèmes astraux et articles inspirants pour éclairer votre chemin.',
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
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
