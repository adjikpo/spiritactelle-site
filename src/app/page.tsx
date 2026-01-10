import Link from 'next/link';
import { Button, Card, CardContent } from '@/components/ui';

const services = [
  {
    title: 'Thème Astral',
    description: 'Découvrez votre carte du ciel natale et ses secrets',
    icon: '✦',
    href: '/astrologie/theme-natal',
    color: 'purple',
  },
  {
    title: 'Tirage de Cartes',
    description: 'Laissez le Tarot éclairer votre chemin',
    icon: '🃏',
    href: '/voyance/tirage',
    color: 'gold',
  },
  {
    title: 'Horoscope',
    description: 'Vos prévisions personnalisées au quotidien',
    icon: '☽',
    href: '/astrologie/horoscope',
    color: 'purple',
  },
  {
    title: 'Méditations',
    description: 'Guidances audio pour votre éveil spirituel',
    icon: '🕯',
    href: '/meditations',
    color: 'gold',
  },
];

const zodiacSigns = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated zodiac background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="text-[20rem] animate-spin" style={{ animationDuration: '120s' }}>
            {zodiacSigns.map((sign, i) => (
              <span
                key={i}
                className="absolute text-[var(--color-accent-purple)]"
                style={{
                  transform: `rotate(${i * 30}deg) translateY(-10rem)`,
                  transformOrigin: 'center center',
                }}
              >
                {sign}
              </span>
            ))}
          </div>
        </div>

        {/* Gradient orbs */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-[var(--color-accent-purple)] rounded-full blur-[128px] opacity-30 animate-pulse" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-[var(--color-accent-pink)] rounded-full blur-[128px] opacity-25 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--color-accent-gold)] rounded-full blur-[200px] opacity-10" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="inline-block px-5 py-2.5 rounded-full bg-gradient-to-r from-[var(--color-accent-purple)]/30 to-[var(--color-accent-pink)]/30 text-[var(--color-accent-gold)] text-sm font-semibold border border-[var(--color-accent-purple)]/40 shadow-[0_0_20px_rgba(147,51,234,0.3)]">
              Votre guide spirituel en ligne
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Explorez les mystères de{' '}
            <span className="text-gradient-gold">votre destinée</span>
          </h1>

          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] mb-10 max-w-2xl mx-auto leading-relaxed">
            Astrologie, tarot et méditations guidées pour éclairer votre chemin.
            Découvrez ce que les astres ont à vous révéler.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gold" size="lg" className="animate-pulse-glow">
              Créer mon thème astral
            </Button>
            <Button variant="mystic" size="lg">
              Découvrir les services
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-[var(--color-accent-gold)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nos <span className="text-gradient-mystic">services</span>
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Des outils puissants pour vous connecter à votre guidance intérieure
              et comprendre les messages de l&apos;univers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Link key={service.title} href={service.href}>
                <Card
                  variant={service.color === 'gold' ? 'gold' : 'mystic'}
                  className="h-full cursor-pointer group"
                >
                  <CardContent>
                    <div
                      className={`text-5xl mb-4 transition-transform duration-300 group-hover:scale-110 ${
                        service.color === 'gold'
                          ? 'text-[var(--color-accent-gold)] drop-shadow-[0_0_10px_rgba(245,197,24,0.5)]'
                          : 'text-[var(--color-accent-purple-light)] drop-shadow-[0_0_10px_rgba(147,51,234,0.5)]'
                      }`}
                    >
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-accent-gold)] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        {/* Background glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[300px] bg-gradient-to-r from-[var(--color-accent-purple)] via-[var(--color-accent-pink)] to-[var(--color-accent-gold)] rounded-full blur-[150px] opacity-20" />
        </div>
        <div className="max-w-4xl mx-auto relative">
          <Card variant="mystic" padding="lg" hover={false} className="border-2 border-[var(--color-accent-purple)]/40">
            <div className="text-center py-4">
              <div className="text-4xl mb-4">&#10022;</div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Prêt à découvrir <span className="text-gradient-mystic">votre chemin</span> ?
              </h2>
              <p className="text-[var(--color-text-secondary)] mb-8 max-w-xl mx-auto">
                Créez votre compte gratuitement et accédez à votre horoscope
                personnalisé, des tirages de cartes quotidiens et bien plus.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="gold" size="lg">
                  Commencer gratuitement
                </Button>
                <Button variant="outline" size="lg">
                  En savoir plus
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-[var(--color-bg-secondary)] to-[var(--color-bg-primary)] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-[var(--color-accent-gold)] rounded-full blur-[100px] opacity-20" />
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-[var(--color-accent-purple)] rounded-full blur-[100px] opacity-20" />

        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Une approche <span className="text-gradient-gold">moderne</span> de la spiritualité
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4 group">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--color-accent-purple)] to-[var(--color-accent-indigo)] flex items-center justify-center shadow-[0_0_20px_rgba(147,51,234,0.3)] group-hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] transition-shadow">
                    <span className="text-white text-xl">&#9733;</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-text-primary)] mb-1 text-lg">
                      Calculs astrologiques précis
                    </h3>
                    <p className="text-[var(--color-text-secondary)]">
                      Éphémérides suisses pour des positions planétaires exactes
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 group">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--color-accent-gold)] to-[var(--color-accent-gold-dark)] flex items-center justify-center shadow-[0_0_20px_rgba(245,197,24,0.3)] group-hover:shadow-[0_0_30px_rgba(245,197,24,0.5)] transition-shadow">
                    <span className="text-[var(--color-bg-primary)] text-xl">&#9829;</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-text-primary)] mb-1 text-lg">
                      Interprétations personnalisées
                    </h3>
                    <p className="text-[var(--color-text-secondary)]">
                      Des analyses uniques basées sur votre thème natal
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 group">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--color-accent-pink)] to-[var(--color-accent-purple)] flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.3)] group-hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-shadow">
                    <span className="text-white text-xl">&#9790;</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-text-primary)] mb-1 text-lg">
                      Accessible partout
                    </h3>
                    <p className="text-[var(--color-text-secondary)]">
                      Sur mobile, tablette ou ordinateur, votre guidance vous suit
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[var(--radius-xl)] bg-gradient-to-br from-[var(--color-accent-purple)]/30 via-[var(--color-accent-pink)]/20 to-[var(--color-accent-gold)]/30 border border-[var(--color-accent-purple)]/30 flex items-center justify-center shadow-[0_0_60px_rgba(147,51,234,0.2)] animate-float">
                <div className="text-9xl text-[var(--color-accent-gold)] drop-shadow-[0_0_30px_rgba(245,197,24,0.5)]">&#10022;</div>
              </div>
              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-[var(--color-accent-gold)]/20 border border-[var(--color-accent-gold)]/30 flex items-center justify-center animate-pulse">
                <span className="text-2xl text-[var(--color-accent-gold)]">&#9733;</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-[var(--color-accent-purple)]/20 border border-[var(--color-accent-purple)]/30 flex items-center justify-center animate-pulse" style={{ animationDelay: '0.5s' }}>
                <span className="text-xl text-[var(--color-accent-purple-light)]">&#9790;</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
