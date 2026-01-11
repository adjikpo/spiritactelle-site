import Link from 'next/link';
import { Button, Card, CardContent } from '@/components/ui';

const services = [
  {
    title: 'Horoscope du Jour',
    description: 'Découvrez ce que les astres vous réservent aujourd\'hui',
    icon: '☀️',
    href: '/horoscope/quotidien',
  },
  {
    title: 'Horoscope Hebdomadaire',
    description: 'Vos prévisions pour la semaine à venir',
    icon: '📅',
    href: '/horoscope/hebdomadaire',
  },
  {
    title: 'Horoscope Mensuel',
    description: 'Les grandes tendances du mois pour votre signe',
    icon: '🌙',
    href: '/horoscope/mensuel',
  },
  {
    title: 'Horoscope Annuel',
    description: 'Les prévisions détaillées pour votre année',
    icon: '✨',
    href: '/horoscope/annuel',
  },
];

const astrologie = [
  {
    title: 'Thème Astral',
    description: 'Calculez votre carte du ciel natale complète',
    icon: '🌟',
    href: '/astrologie/theme-natal',
  },
  {
    title: 'Compatibilité',
    description: 'Découvrez votre compatibilité amoureuse',
    icon: '💕',
    href: '/astrologie/compatibilite',
  },
  {
    title: 'Ascendant',
    description: 'Calculez et comprenez votre ascendant',
    icon: '⬆️',
    href: '/astrologie/ascendant',
  },
  {
    title: 'Transits',
    description: 'Les influences planétaires du moment',
    icon: '🪐',
    href: '/astrologie/transits',
  },
];

const signes = [
  { nom: 'Bélier', symbole: '♈', dates: '21 mars - 19 avril' },
  { nom: 'Taureau', symbole: '♉', dates: '20 avril - 20 mai' },
  { nom: 'Gémeaux', symbole: '♊', dates: '21 mai - 20 juin' },
  { nom: 'Cancer', symbole: '♋', dates: '21 juin - 22 juillet' },
  { nom: 'Lion', symbole: '♌', dates: '23 juillet - 22 août' },
  { nom: 'Vierge', symbole: '♍', dates: '23 août - 22 sept.' },
  { nom: 'Balance', symbole: '♎', dates: '23 sept. - 22 oct.' },
  { nom: 'Scorpion', symbole: '♏', dates: '23 oct. - 21 nov.' },
  { nom: 'Sagittaire', symbole: '♐', dates: '22 nov. - 21 déc.' },
  { nom: 'Capricorne', symbole: '♑', dates: '22 déc. - 19 janv.' },
  { nom: 'Verseau', symbole: '♒', dates: '20 janv. - 18 fév.' },
  { nom: 'Poissons', symbole: '♓', dates: '19 fév. - 20 mars' },
];

const articlesRecents = [
  {
    titre: 'Nouvelle Lune en Capricorne : Un nouveau départ',
    extrait: 'Cette nouvelle lune nous invite à poser des intentions concrètes pour l\'année à venir...',
    date: '10 janvier 2026',
    categorie: 'Astrologie',
  },
  {
    titre: 'Mercure rétrograde : Guide de survie',
    extrait: 'Pas de panique ! Voici comment naviguer cette période avec sérénité...',
    date: '8 janvier 2026',
    categorie: 'Conseils',
  },
  {
    titre: 'Les 12 signes et leur élément',
    extrait: 'Feu, Terre, Air, Eau : comprendre les éléments pour mieux se connaître...',
    date: '5 janvier 2026',
    categorie: 'Découverte',
  },
];

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="hero-dark min-h-[70vh] flex items-center justify-center py-20 px-4">
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="trust-badge">
              <span className="text-lg">✦</span>
              <span>Astrologie & Spiritualité</span>
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Explorez les mystères de{' '}
            <span className="text-[var(--color-secondary-light)]">votre destinée</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Horoscopes personnalisés, thèmes astraux et articles inspirants
            pour éclairer votre chemin de vie.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/horoscope/quotidien">
              <Button variant="gold" size="lg" className="w-full sm:w-auto">
                Mon horoscope du jour
              </Button>
            </Link>
            <Link href="/astrologie/theme-natal">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10">
                Calculer mon thème astral
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Signes du Zodiaque - Quick Access */}
      <section className="py-12 px-4 bg-[var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-2xl font-bold mb-8">Choisissez votre signe</h2>
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-3">
            {signes.map((signe) => (
              <Link
                key={signe.nom}
                href={`/horoscope/${signe.nom.toLowerCase()}`}
                className="group text-center"
              >
                <div className="aspect-square rounded-xl bg-white border border-[var(--color-border)] flex items-center justify-center text-3xl group-hover:border-[var(--color-primary)] group-hover:shadow-md transition-all">
                  {signe.symbole}
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
      <section className="py-16 px-4 bg-[var(--color-bg-primary)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Horoscopes</h2>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Des prévisions détaillées pour chaque période, adaptées à votre signe.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Link key={service.title} href={service.href}>
                <div className="service-card h-full">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {service.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Astrologie Section */}
      <section className="py-16 px-4 bg-[var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Astrologie</h2>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Plongez dans l&apos;étude des astres et découvrez votre carte du ciel.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {astrologie.map((item) => (
              <Link key={item.title} href={item.href}>
                <div className="service-card h-full">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Livre d'Or / Articles Section */}
      <section className="py-16 px-4 bg-[var(--color-bg-tertiary)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Livre d&apos;Or</h2>
              <p className="text-[var(--color-text-secondary)] max-w-xl">
                Articles, réflexions et guides pour approfondir votre connaissance de l&apos;astrologie.
              </p>
            </div>
            <Link href="/livre-dor" className="mt-4 md:mt-0">
              <Button variant="outline">Tous les articles</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      <section className="py-16 px-4 bg-[var(--color-bg-primary)]">
        <div className="max-w-4xl mx-auto">
          <div className="cta-banner">
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Recevez votre horoscope chaque matin
              </h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Inscrivez-vous gratuitement et recevez vos prévisions personnalisées
                directement dans votre boîte mail.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/inscription">
                  <Button variant="gold" size="lg">
                    Créer mon compte gratuit
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-[var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pourquoi Spiritactelle ?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="feature-icon mx-auto mb-4">
                <span>🎯</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Précision astrologique</h3>
              <p className="text-[var(--color-text-secondary)]">
                Calculs basés sur les éphémérides suisses pour une exactitude maximale.
              </p>
            </div>
            <div className="text-center">
              <div className="feature-icon mx-auto mb-4">
                <span>📚</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Contenu enrichissant</h3>
              <p className="text-[var(--color-text-secondary)]">
                Articles de fond et guides pour approfondir vos connaissances.
              </p>
            </div>
            <div className="text-center">
              <div className="feature-icon mx-auto mb-4">
                <span>💫</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Personnalisation</h3>
              <p className="text-[var(--color-text-secondary)]">
                Des prévisions adaptées à votre profil astrologique unique.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="hero-dark py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-white/80 mb-6">
            Découvrez ce que les astres ont à vous révéler
          </p>
          <Link href="/horoscope/quotidien">
            <Button variant="gold" size="lg">
              Lire mon horoscope
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
