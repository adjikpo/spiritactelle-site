import Link from 'next/link';

export const metadata = {
  title: 'Conditions Generales d\'Utilisation | Spiritactelle',
  description: 'Conditions generales d\'utilisation du site Spiritactelle.',
};

export default function CGUPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-20 pb-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3 py-2 bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Accueil</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-8">
            Conditions Generales d'Utilisation
          </h1>

          <div className="space-y-8 text-[var(--color-text-secondary)]">
            <section>
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                1. Objet
              </h2>
              <p className="leading-relaxed">
                Les presentes Conditions Generales d'Utilisation (CGU) ont pour objet de definir
                les modalites et conditions d'utilisation des services proposes sur le site
                Spiritactelle, ainsi que les droits et obligations des utilisateurs.
              </p>
              <p className="mt-4 leading-relaxed">
                L'utilisation du site implique l'acceptation pleine et entiere des presentes CGU.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                2. Description des services
              </h2>
              <p className="leading-relaxed">
                Spiritactelle propose les services suivants :
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>Horoscopes quotidiens, hebdomadaires et mensuels</li>
                <li>Calcul de theme natal et interpretations astrologiques</li>
                <li>Calcul de compatibilite amoureuse</li>
                <li>Tirages de tarot et oracles</li>
                <li>Calculs numerologiques</li>
                <li>Meditations guidees</li>
                <li>Articles et contenus editoriaux sur la spiritualite</li>
                <li>Astrologies du monde (chinoise, egyptienne, etc.)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                3. Acces au site
              </h2>
              <p className="leading-relaxed">
                L'acces au site est gratuit. Certaines fonctionnalites peuvent neanmoins etre
                reservees aux utilisateurs inscrits ou aux abonnes premium.
              </p>
              <p className="mt-4 leading-relaxed">
                L'utilisateur est responsable de son equipement informatique et de son acces a internet.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                4. Inscription et compte utilisateur
              </h2>
              <p className="leading-relaxed">
                Pour acceder a certains services, l'utilisateur doit creer un compte en fournissant
                des informations exactes et a jour. L'utilisateur s'engage a :
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>Fournir des informations veridiques</li>
                <li>Maintenir la confidentialite de ses identifiants</li>
                <li>Notifier immediatement toute utilisation non autorisee de son compte</li>
                <li>Ne pas creer plusieurs comptes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                5. Utilisation des services
              </h2>
              <p className="leading-relaxed">
                L'utilisateur s'engage a utiliser le site de maniere conforme a sa destination
                et a la legislation en vigueur. Il est notamment interdit de :
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>Utiliser le site a des fins illicites ou frauduleuses</li>
                <li>Tenter de porter atteinte au bon fonctionnement du site</li>
                <li>Collecter des donnees personnelles d'autres utilisateurs</li>
                <li>Reproduire ou distribuer le contenu sans autorisation</li>
                <li>Utiliser des robots ou systemes automatises</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                6. Nature des contenus
              </h2>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                <p className="text-amber-800 font-medium">
                  Important : Les contenus proposes sur Spiritactelle (horoscopes, tarot, numerologie, etc.)
                  sont fournis a titre de divertissement et de reflexion personnelle.
                </p>
              </div>
              <p className="leading-relaxed">
                Ces contenus ne constituent en aucun cas :
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>Un avis medical ou psychologique</li>
                <li>Un conseil juridique ou financier</li>
                <li>Une prediction de l'avenir garantie</li>
              </ul>
              <p className="mt-4 leading-relaxed">
                L'utilisateur reste seul responsable des decisions qu'il prend sur la base de ces contenus.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                7. Propriete intellectuelle
              </h2>
              <p className="leading-relaxed">
                L'ensemble des elements du site (textes, images, logos, icones, logiciels) sont proteges
                par le droit de la propriete intellectuelle. Toute reproduction non autorisee est interdite.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                8. Responsabilite
              </h2>
              <p className="leading-relaxed">
                Spiritactelle s'efforce d'assurer l'exactitude des informations diffusees mais ne peut
                garantir leur exhaustivite. Le site ne saurait etre tenu responsable des dommages directs
                ou indirects resultant de l'utilisation du site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                9. Modification des CGU
              </h2>
              <p className="leading-relaxed">
                Spiritactelle se reserve le droit de modifier les presentes CGU a tout moment.
                Les utilisateurs seront informes des modifications par publication sur le site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                10. Droit applicable et litiges
              </h2>
              <p className="leading-relaxed">
                Les presentes CGU sont soumises au droit francais. En cas de litige, une solution
                amiable sera recherchee avant toute action judiciaire. A defaut, les tribunaux
                francais seront competents.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                11. Contact
              </h2>
              <p className="leading-relaxed">
                Pour toute question relative aux presentes CGU : contact@spiritactelle.com
              </p>
            </section>
          </div>

          <div className="mt-8 pt-8 border-t border-[var(--color-border)]">
            <p className="text-sm text-[var(--color-text-muted)]">
              Derniere mise a jour : Janvier 2026
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/mentions-legales"
            className="px-6 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow text-[var(--color-text-primary)]"
          >
            Mentions legales
          </Link>
          <Link
            href="/confidentialite"
            className="px-6 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow text-[var(--color-text-primary)]"
          >
            Confidentialite
          </Link>
        </div>
      </div>
    </div>
  );
}
