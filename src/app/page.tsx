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
  QuoteIcon,
  SparklesIcon,
  MeditationIcon,
  NumerologyIcon,
  DragonIcon,
  AnkhIcon,
  BookOpenIcon,
} from '@/components/icons';

const signes = [
  { nom: 'Bélier', slug: 'aries', Icon: AriesIcon, dates: '21 mars - 19 avril' },
  { nom: 'Taureau', slug: 'taurus', Icon: TaurusIcon, dates: '20 avril - 20 mai' },
  { nom: 'Gémeaux', slug: 'gemini', Icon: GeminiIcon, dates: '21 mai - 20 juin' },
  { nom: 'Cancer', slug: 'cancer', Icon: CancerIcon, dates: '21 juin - 22 juillet' },
  { nom: 'Lion', slug: 'leo', Icon: LeoIcon, dates: '23 juillet - 22 août' },
  { nom: 'Vierge', slug: 'virgo', Icon: VirgoIcon, dates: '23 août - 22 sept.' },
  { nom: 'Balance', slug: 'libra', Icon: LibraIcon, dates: '23 sept. - 22 oct.' },
  { nom: 'Scorpion', slug: 'scorpio', Icon: ScorpioIcon, dates: '23 oct. - 21 nov.' },
  { nom: 'Sagittaire', slug: 'sagittarius', Icon: SagittariusIcon, dates: '22 nov. - 21 déc.' },
  { nom: 'Capricorne', slug: 'capricorn', Icon: CapricornIcon, dates: '22 déc. - 19 jan.' },
  { nom: 'Verseau', slug: 'aquarius', Icon: AquariusIcon, dates: '20 jan. - 18 fév.' },
  { nom: 'Poissons', slug: 'pisces', Icon: PiscesIcon, dates: '19 fév. - 20 mars' },
];

const horoscopes = [
  { title: 'Quotidien', Icon: SunIcon, href: '/horoscope' },
  { title: 'Compatibilite', Icon: StarIcon, href: '/horoscope/compatibilite' },
];

const astrologie = [
  { title: 'Thème Astral', Icon: ConstellationIcon, href: '/astrologie/theme-natal' },
  { title: 'Compatibilité', Icon: StarIcon, href: '/horoscope/compatibilite' },
  { title: 'Calendrier Lunaire', Icon: MoonIcon, href: '/astrologie/calendrier-lunaire' },
  { title: 'Transits', Icon: PlanetIcon, href: '/astrologie/transits' },
];

const bienEtre = [
  { title: 'Citations', Icon: QuoteIcon, href: '/bien-etre/citations' },
  { title: 'Affirmations', Icon: SparklesIcon, href: '/bien-etre/affirmations' },
  { title: 'Méditation', Icon: MeditationIcon, href: '/bien-etre/meditation' },
  { title: 'Numérologie', Icon: NumerologyIcon, href: '/bien-etre/numerologie' },
];

const mythologies = [
  { title: 'Chinoise', Icon: DragonIcon, href: '/mythologies/chinoise' },
  { title: 'Egyptienne', Icon: AnkhIcon, href: '/mythologies/egyptienne' },
];

const blogArticles = [
  { title: 'Astrologie Chinoise', Icon: DragonIcon, href: '/blog/astrologie-chinoise-guide-complet' },
  { title: 'Phases de la Lune', Icon: MoonIcon, href: '/blog/phases-lune-rituels-spirituels' },
  { title: 'Chakras', Icon: MeditationIcon, href: '/blog/equilibrer-chakras-guide-pratique' },
  { title: 'Tous les articles', Icon: BookOpenIcon, href: '/blog' },
];

const temoignagesRecents = [
  {
    auteur: 'Marie L.',
    extrait: 'Mon theme natal etait incroyablement precis !',
    service: 'Theme Natal',
    rating: 5,
  },
  {
    auteur: 'Thomas D.',
    extrait: 'Les previsions sont etonnamment justes...',
    service: 'Horoscope',
    rating: 5,
  },
  {
    auteur: 'Sophie M.',
    extrait: 'Nous communiquons beaucoup mieux maintenant.',
    service: 'Compatibilite',
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section avec carte flottante */}
      <section className="hero-dark min-h-screen relative overflow-hidden">
        <StarryBackground />

        {/* Contenu principal */}
        <div className="relative z-10 min-h-screen flex flex-col justify-center px-4 pt-20 pb-8">
          {/* Carte flottante centrale */}
          <div className="w-full max-w-6xl mx-auto">
            <div className="hero-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl">
              {/* En-tête centré */}
              <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  L&apos;astrologie qui
                </h1>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-secondary-light)] leading-tight">
                  inspire votre vie
                </h2>
                <p className="mt-3 text-sm text-white/70 leading-relaxed max-w-md mx-auto">
                  Horoscopes précis, thèmes astraux et articles inspirants pour éclairer votre quotidien.
                </p>
              </div>

              {/* Roue zodiacale elegante */}
              <div className="relative w-full max-w-lg mx-auto mb-8">
                {/* Conteneur centré */}
                <div className="relative" style={{ paddingBottom: '100%' }}>
                  {/* Cercles decoratifs */}
                  <div className="absolute inset-[15%] rounded-full border border-white/10" />
                  <div className="absolute inset-[25%] rounded-full border border-white/15" />
                  <div className="absolute inset-[35%] rounded-full border border-white/20 bg-white/5" />

                  {/* Centre - Logo/Soleil */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[var(--color-secondary-light)] to-[var(--color-secondary)] shadow-2xl flex items-center justify-center">
                    <span className="text-2xl sm:text-3xl">✦</span>
                  </div>

                  {/* Les 12 signes en cercle */}
                  {signes.map((signe, index) => {
                    const angle = (index * 30 - 90) * (Math.PI / 180);
                    const radius = 40;
                    const x = 50 + radius * Math.cos(angle);
                    const y = 50 + radius * Math.sin(angle);

                    return (
                      <Link
                        key={signe.nom}
                        href={`/horoscope/${signe.slug}`}
                        className="absolute group"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        <div className="flex flex-col items-center">
                          <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/95 shadow-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:bg-white">
                            <signe.Icon className="w-5 h-5 sm:w-7 sm:h-7 text-[var(--color-primary)]" />
                          </div>
                          <span className="mt-1.5 text-[9px] sm:text-[11px] font-medium text-white/90 group-hover:text-white transition-colors whitespace-nowrap">
                            {signe.nom}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Bouton CTA centré */}
              <div className="text-center">
                <Link href="/horoscope">
                  <Button variant="gold" size="lg" className="group">
                    <span>Explorer les horoscopes</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Button>
                </Link>
              </div>

            </div>
          </div>

          {/* Indicateur scroll */}
          <div className="flex justify-center mt-8">
            <div className="animate-bounce">
              <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Services - Horoscopes & Astrologie combinés */}
      <section className="py-12 sm:py-16 bg-[var(--color-bg-secondary)]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Explorez les astres</h2>
            <p className="text-sm text-[var(--color-text-secondary)]">Horoscopes et guides pour éclairer votre chemin</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {/* Horoscopes */}
            {horoscopes.map((item) => (
              <Link key={item.title} href={item.href}>
                <div className="service-card p-4 h-full text-center">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] mb-3">
                    <item.Icon size={24} />
                  </div>
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">Horoscope</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-4">
            {/* Astrologie */}
            {astrologie.map((item) => (
              <Link key={item.title} href={item.href}>
                <div className="service-card p-4 h-full text-center">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-[var(--color-secondary)]/10 flex items-center justify-center text-[var(--color-secondary)] mb-3">
                    <item.Icon size={24} />
                  </div>
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">Astrologie</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section Bien-être */}
      <section className="py-12 sm:py-16 bg-[var(--color-bg-primary)]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Bien-etre et Developpement</h2>
            <p className="text-sm text-[var(--color-text-secondary)]">Nourrissez votre esprit au quotidien</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {bienEtre.map((item) => (
              <Link key={item.title} href={item.href}>
                <div className="service-card p-4 h-full text-center">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-[var(--color-accent-teal)]/10 flex items-center justify-center text-[var(--color-accent-teal)] mb-3">
                    <item.Icon size={24} />
                  </div>
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">Bien-etre</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section Multi-Mythologies */}
      <section className="py-12 sm:py-16 bg-[var(--color-bg-secondary)]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Multi-Mythologies</h2>
            <p className="text-sm text-[var(--color-text-secondary)]">Explorez les astrologies du monde entier</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
            {mythologies.map((item) => (
              <Link key={item.title} href={item.href}>
                <div className="service-card p-4 h-full text-center">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-[var(--color-accent-coral)]/10 flex items-center justify-center text-[var(--color-accent-coral)] mb-3">
                    <item.Icon size={24} />
                  </div>
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">Mythologie</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-6">
            <Link href="/mythologies">
              <Button variant="outline" size="sm">Voir toutes les mythologies</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Livre d'Or - Temoignages */}
      <section className="py-12 sm:py-16 bg-[var(--color-bg-tertiary)]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">Livre d&apos;Or</h2>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">Ce que notre communaute en dit</p>
            </div>
            <Link href="/livre-dor">
              <Button variant="outline" size="sm">Voir tout</Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            {temoignagesRecents.map((temoignage, index) => (
              <Card key={index} variant="default" hover className="h-full">
                <CardContent className="p-5">
                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-4 h-4 ${star <= temoignage.rating ? 'text-amber-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-3 italic">
                    &quot;{temoignage.extrait}&quot;
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">{temoignage.auteur}</p>
                    <span className="px-2 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-medium rounded-full">
                      {temoignage.service}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section Blog */}
      <section className="py-12 sm:py-16 bg-[var(--color-bg-primary)]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Blog</h2>
            <p className="text-sm text-[var(--color-text-secondary)]">Articles et guides spirituels</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {blogArticles.map((item) => (
              <Link key={item.title} href={item.href}>
                <div className="service-card p-4 h-full text-center">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] mb-3">
                    <item.Icon size={24} />
                  </div>
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">Article</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="hero-dark py-16 sm:py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Recevez votre horoscope chaque matin
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Inscrivez-vous gratuitement et commencez chaque journee avec les conseils des astres.
          </p>
          <Link href="/auth/inscription">
            <Button variant="gold" size="lg">
              Creer mon compte gratuit
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
