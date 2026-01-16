import Link from 'next/link';
import { BackButton } from '@/components/layout';

export const metadata = {
  title: 'Multi-Mythologies | Spiritactelle',
  description: 'Explorez les astrologies du monde : chinoise, egyptienne, celte et bien plus encore.',
};

const MYTHOLOGIES = [
  {
    id: 'chinoise',
    title: 'Astrologie Chinoise',
    description: 'Decouvrez votre animal du zodiaque chinois et les 5 elements qui influencent votre destinee.',
    href: '/mythologies/chinoise',
    color: '#DC2626',
    gradient: 'from-red-500 to-orange-500',
    features: ['12 animaux', '5 elements', 'Compatibilite'],
  },
  {
    id: 'egyptienne',
    title: 'Astrologie Egyptienne',
    description: 'Quel dieu egyptien guide votre existence ? Plongez dans la sagesse des pharaons.',
    href: '/mythologies/egyptienne',
    color: '#F59E0B',
    gradient: 'from-amber-500 to-yellow-500',
    features: ['12 divinites', 'Sagesse ancienne', 'Mission de vie'],
  },
  {
    id: 'celte',
    title: 'Astrologie Celte',
    description: 'Les 13 arbres sacres des druides revelent votre personnalite profonde.',
    href: '/mythologies/celte',
    color: '#22C55E',
    gradient: 'from-green-500 to-emerald-500',
    features: ['13 arbres', 'Ogham', 'Connexion nature'],
    comingSoon: true,
  },
  {
    id: 'amerindienne',
    title: 'Astrologie Amerindienne',
    description: 'Decouvrez votre animal totem et la sagesse de la roue de medecine.',
    href: '/mythologies/amerindienne',
    color: '#8B5CF6',
    gradient: 'from-purple-500 to-violet-500',
    features: ['Animaux totems', 'Roue de medecine', 'Sagesse ancestrale'],
    comingSoon: true,
  },
];

export default function MythologiesPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-6">
          <BackButton href="/" label="Accueil" />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3">
            Multi-Mythologies
          </h1>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Explorez la sagesse ancestrale du monde entier. Chaque culture a developpe
            son propre systeme astrologique, offrant des perspectives uniques sur votre personnalite
            et votre destinee.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {MYTHOLOGIES.map((mythology) => (
            <div
              key={mythology.id}
              className={`relative bg-white rounded-sm shadow-lg overflow-hidden ${
                mythology.comingSoon ? 'opacity-75' : ''
              }`}
            >
              <div className={`h-2 bg-gradient-to-r ${mythology.gradient}`} />

              {mythology.comingSoon && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-gray-800 text-white text-xs font-medium rounded-sm">
                  Bientot disponible
                </div>
              )}

              <div className="p-6">
                <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
                  {mythology.title}
                </h2>
                <p className="text-[var(--color-text-secondary)] mb-4">
                  {mythology.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {mythology.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 text-sm rounded-sm"
                      style={{
                        backgroundColor: `${mythology.color}15`,
                        color: mythology.color,
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {mythology.comingSoon ? (
                  <button
                    disabled
                    className="w-full py-3 bg-gray-100 text-gray-400 rounded-sm font-medium cursor-not-allowed"
                  >
                    Prochainement
                  </button>
                ) : (
                  <Link
                    href={mythology.href}
                    className={`block w-full py-3 bg-gradient-to-r ${mythology.gradient} text-white rounded-sm font-medium text-center hover:opacity-90 transition-opacity`}
                  >
                    Decouvrir
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-sm p-8 border border-indigo-100">
          <h2 className="text-xl font-bold text-indigo-800 mb-4">
            Pourquoi explorer les multi-mythologies ?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="w-12 h-12 bg-indigo-100 rounded-sm flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="font-medium text-indigo-800 mb-2">Vision Globale</h3>
              <p className="text-sm text-indigo-700">
                Chaque tradition apporte un eclairage different sur votre personnalite.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-indigo-100 rounded-sm flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-medium text-indigo-800 mb-2">Sagesse Ancestrale</h3>
              <p className="text-sm text-indigo-700">
                Des millenaires de sagesse accumule par differentes civilisations.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-indigo-100 rounded-sm flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-medium text-indigo-800 mb-2">Connexion Profonde</h3>
              <p className="text-sm text-indigo-700">
                Trouvez la tradition qui resonne le plus avec votre ame.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/horoscope"
            className="px-6 py-3 bg-white rounded-sm shadow-md hover:shadow-lg transition-shadow text-[var(--color-text-primary)]"
          >
            Astrologie Occidentale
          </Link>
          <Link
            href="/blog"
            className="px-6 py-3 bg-white rounded-sm shadow-md hover:shadow-lg transition-shadow text-[var(--color-text-primary)]"
          >
            Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
