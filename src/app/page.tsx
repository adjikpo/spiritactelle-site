import Link from 'next/link';
import { Button, Card, CardContent } from '@/components/ui';
import { StarryBackground } from '@/components/animations';
import {
  AriesIcon,
  TaurusIcon,
  GeminiIcon,
  CancerIcon,
  LeoIcon,
  VirgoIcon,
  LibraIcon,
  ScorpioIcon,
  SagittariusIcon,
  CapricornIcon,
  AquariusIcon,
  PiscesIcon,
  SunIcon,
  MoonIcon,
  StarIcon,
  ConstellationIcon,
  PlanetIcon,
} from '@/components/icons';

const services = [
  {
    title: 'Horoscope du Jour',
    description: 'Ce que les astres vous réservent',
    Icon: SunIcon,
    href: '/horoscope/quotidien',
  },
  {
    title: 'Hebdomadaire',
    description: 'Prévisions de la semaine',
    Icon: MoonIcon,
    href: '/horoscope/hebdomadaire',
  },
  {
    title: 'Mensuel',
    description: 'Tendances du mois',
    Icon: StarIcon,
    href: '/horoscope/mensuel',
  },
  {
    title: 'Annuel',
    description: 'Votre année en détail',
    Icon: ConstellationIcon,
    href: '/horoscope/annuel',
  },
];

const astrologie = [
  {
    title: 'Thème Astral',
    description: 'Votre carte du ciel',
    Icon: ConstellationIcon,
    href: '/astrologie/theme-natal',
  },
  {
    title: 'Compatibilité',
    description: 'Affinités amoureuses',
    Icon: StarIcon,
    href: '/astrologie/compatibilite',
  },
  {
    title: 'Ascendant',
    description: 'Calculez le vôtre',
    Icon: SunIcon,
    href: '/astrologie/ascendant',
  },
  {
    title: 'Transits',
    description: 'Influences du moment',
    Icon: PlanetIcon,
    href: '/astrologie/transits',
  },
];

const signes = [
  { nom: 'Bélier', slug: 'belier', Icon: AriesIcon },
  { nom: 'Taureau', slug: 'taureau', Icon: TaurusIcon },
  { nom: 'Gémeaux', slug: 'gemeaux', Icon: GeminiIcon },
  { nom: 'Cancer', slug: 'cancer', Icon: CancerIcon },
  { nom: 'Lion', slug: 'lion', Icon: LeoIcon },
  { nom: 'Vierge', slug: 'vierge', Icon: VirgoIcon },
  { nom: 'Balance', slug: 'balance', Icon: LibraIcon },
  { nom: 'Scorpion', slug: 'scorpion', Icon: ScorpioIcon },
  { nom: 'Sagittaire', slug: 'sagittaire', Icon: SagittariusIcon },
  { nom: 'Capricorne', slug: 'capricorne', Icon: CapricornIcon },
  { nom: 'Verseau', slug: 'verseau', Icon: AquariusIcon },
  { nom: 'Poissons', slug: 'poissons', Icon: PiscesIcon },
];

const articlesRecents = [
  {
    titre: 'Nouvelle Lune en Capricorne',
    extrait: 'Un nouveau départ pour l\'année...',
    date: '10 jan.',
    categorie: 'Astrologie',
  },
  {
    titre: 'Mercure rétrograde',
    extrait: 'Guide de survie pour cette période...',
    date: '8 jan.',
    categorie: 'Conseils',
  },
  {
    titre: 'Les 12 signes et leur élément',
    extrait: 'Feu, Terre, Air, Eau...',
    date: '5 jan.',
    categorie: 'Découverte',
  },
];

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section - includes padding for fixed header */}
      <section className="hero-dark min-h-screen flex items-center justify-center pt-24 sm:pt-28 pb-16 sm:pb-20 px-4 relative overflow-hidden">
        <StarryBackground />
        <div className="relative z-10 text-center w-full max-w-4xl mx-auto">
          <div className="mb-4 sm:mb-6">
            <span className="trust-badge text-xs sm:text-sm">
              <StarIcon size={18} className="text-[var(--color-secondary-light)]" />
              <span>Astrologie & Spiritualité</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-2">
            Explorez les mystères de{' '}
            <span className="text-[var(--color-secondary-light)]">votre destinée</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-2">
            Horoscopes, thèmes astraux et articles inspirants pour éclairer votre chemin.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center px-4">
            <Link href="/horoscope/quotidien" className="w-full sm:w-auto">
              <Button variant="gold" size="lg" className="w-full">
                Mon horoscope du jour
              </Button>
            </Link>
            <Link href="/astrologie/theme-natal" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full border-white/30 text-white hover:bg-white/10">
                Mon thème astral
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Signes du Zodiaque - Scroll horizontal sur mobile */}
      <section className="py-8 sm:py-12 bg-[var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-xl sm:text-2xl font-bold mb-6 sm:mb-8 px-4">
            Choisissez votre signe
          </h2>

          {/* Mobile: horizontal scroll */}
          <div className="overflow-x-auto pb-4 px-4 sm:hidden scrollbar-hide">
            <div className="flex gap-3 w-max">
              {signes.map((signe) => (
                <Link
                  key={signe.nom}
                  href={`/horoscope/${signe.slug}`}
                  className="flex-shrink-0 group text-center"
                >
                  <div className="w-16 h-16 rounded-xl bg-white border border-[var(--color-border)] flex items-center justify-center active:scale-95 transition-transform text-[var(--color-primary)]">
                    <signe.Icon size={28} />
                  </div>
                  <p className="text-xs mt-1.5 text-[var(--color-text-secondary)]">
                    {signe.nom}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Tablet/Desktop: grid */}
          <div className="hidden sm:grid grid-cols-6 lg:grid-cols-12 gap-3 px-4">
            {signes.map((signe) => (
              <Link
                key={signe.nom}
                href={`/horoscope/${signe.slug}`}
                className="group text-center"
              >
                <div className="aspect-square rounded-xl bg-white border border-[var(--color-border)] flex items-center justify-center text-[var(--color-primary)] group-hover:border-[var(--color-primary)] group-hover:shadow-md group-hover:text-[var(--color-primary-dark)] transition-all">
                  <signe.Icon size={32} className="lg:w-9 lg:h-9" />
                </div>
                <p className="text-xs mt-2 text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)]">
                  {signe.nom}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Horoscopes Section */}
      <section className="py-10 sm:py-16 px-4 bg-[var(--color-bg-primary)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">Horoscopes</h2>
            <p className="text-sm sm:text-base text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Des prévisions adaptées à votre signe
            </p>
          </div>

          {/* Mobile: 2 colonnes, plus compact */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {services.map((service) => (
              <Link key={service.title} href={service.href}>
                <div className="service-card h-full p-4 sm:p-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] mb-3 sm:mb-4">
                    <service.Icon size={24} className="sm:w-7 sm:h-7" />
                  </div>
                  <h3 className="text-sm sm:text-lg font-semibold text-[var(--color-text-primary)] mb-1 sm:mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] line-clamp-2">
                    {service.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Astrologie Section */}
      <section className="py-10 sm:py-16 px-4 bg-[var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">Astrologie</h2>
            <p className="text-sm sm:text-base text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Découvrez votre carte du ciel
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {astrologie.map((item) => (
              <Link key={item.title} href={item.href}>
                <div className="service-card h-full p-4 sm:p-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[var(--color-secondary)]/10 flex items-center justify-center text-[var(--color-secondary)] mb-3 sm:mb-4">
                    <item.Icon size={24} className="sm:w-7 sm:h-7" />
                  </div>
                  <h3 className="text-sm sm:text-lg font-semibold text-[var(--color-text-primary)] mb-1 sm:mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Livre d'Or / Articles Section */}
      <section className="py-10 sm:py-16 px-4 bg-[var(--color-bg-tertiary)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-6 sm:mb-12">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-4">Livre d&apos;Or</h2>
              <p className="text-sm sm:text-base text-[var(--color-text-secondary)] hidden sm:block max-w-xl">
                Articles et guides pour approfondir l&apos;astrologie
              </p>
            </div>
            <Link href="/livre-dor">
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                Voir tout
              </Button>
            </Link>
          </div>

          {/* Mobile: horizontal scroll */}
          <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:hidden scrollbar-hide">
            <div className="flex gap-4 w-max">
              {articlesRecents.map((article, index) => (
                <Link key={index} href={`/livre-dor/${index + 1}`} className="w-72 flex-shrink-0">
                  <Card variant="default" className="h-full">
                    <CardContent className="p-4">
                      <span className="inline-block px-2 py-0.5 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-medium rounded-full mb-3">
                        {article.categorie}
                      </span>
                      <h3 className="font-semibold text-base text-[var(--color-text-primary)] mb-2 line-clamp-2">
                        {article.titre}
                      </h3>
                      <p className="text-sm text-[var(--color-text-secondary)] mb-3 line-clamp-2">
                        {article.extrait}
                      </p>
                      <p className="text-xs text-[var(--color-text-muted)]">
                        {article.date}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop: grid */}
          <div className="hidden sm:grid grid-cols-1 md:grid-cols-3 gap-6">
            {articlesRecents.map((article, index) => (
              <Link key={index} href={`/livre-dor/${index + 1}`}>
                <Card variant="default" hover className="h-full">
                  <CardContent>
                    <span className="inline-block px-3 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-medium rounded-full mb-4">
                      {article.categorie}
                    </span>
                    <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                      {article.titre}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                      {article.extrait}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      {article.date}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 sm:py-16 px-4 bg-[var(--color-bg-primary)]">
        <div className="max-w-4xl mx-auto">
          <div className="cta-banner p-6 sm:p-10">
            <div className="relative z-10 text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
                Votre horoscope chaque matin
              </h2>
              <p className="text-sm sm:text-base text-white/80 mb-6 sm:mb-8 max-w-xl mx-auto">
                Inscrivez-vous et recevez vos prévisions par mail
              </p>
              <Link href="/auth/inscription" className="inline-block w-full sm:w-auto">
                <Button variant="gold" size="lg" className="w-full sm:w-auto">
                  Créer mon compte gratuit
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 sm:py-16 px-4 bg-[var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Pourquoi Spiritactelle ?
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
            <div className="flex sm:flex-col items-start sm:items-center text-left sm:text-center gap-4 sm:gap-0">
              <div className="feature-icon flex-shrink-0 sm:mb-4">
                <ConstellationIcon size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Précision astrologique</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Calculs basés sur les éphémérides suisses
                </p>
              </div>
            </div>
            <div className="flex sm:flex-col items-start sm:items-center text-left sm:text-center gap-4 sm:gap-0">
              <div className="feature-icon flex-shrink-0 sm:mb-4">
                <StarIcon size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Contenu enrichissant</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Articles et guides approfondis
                </p>
              </div>
            </div>
            <div className="flex sm:flex-col items-start sm:items-center text-left sm:text-center gap-4 sm:gap-0">
              <div className="feature-icon flex-shrink-0 sm:mb-4">
                <SunIcon size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Personnalisation</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Prévisions adaptées à votre profil
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="hero-dark py-10 sm:py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-base sm:text-lg text-white/80 mb-4 sm:mb-6">
            Découvrez ce que les astres vous révèlent
          </p>
          <Link href="/horoscope/quotidien" className="inline-block w-full sm:w-auto px-4 sm:px-0">
            <Button variant="gold" size="lg" className="w-full sm:w-auto">
              Lire mon horoscope
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
