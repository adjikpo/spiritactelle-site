import Link from 'next/link';

export const metadata = {
  title: 'Mentions Legales | Spiritactelle',
  description: 'Mentions legales du site Spiritactelle - Informations sur l\'editeur et l\'hebergeur.',
};

export default function MentionsLegalesPage() {
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
            Mentions Legales
          </h1>

          <div className="space-y-8 text-[var(--color-text-secondary)]">
            <section>
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                1. Editeur du site
              </h2>
              <div className="space-y-2">
                <p><strong>Nom du site :</strong> Spiritactelle</p>
                <p><strong>URL :</strong> https://spiritactelle.com</p>
                <p><strong>Statut :</strong> [A completer - Entreprise individuelle / SAS / SARL]</p>
                <p><strong>Siege social :</strong> [A completer]</p>
                <p><strong>SIRET :</strong> [A completer]</p>
                <p><strong>Directeur de la publication :</strong> [A completer]</p>
                <p><strong>Contact :</strong> contact@spiritactelle.com</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                2. Hebergement
              </h2>
              <div className="space-y-2">
                <p><strong>Hebergeur :</strong> Vercel Inc.</p>
                <p><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
                <p><strong>Site web :</strong> https://vercel.com</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                3. Propriete intellectuelle
              </h2>
              <p className="leading-relaxed">
                L'ensemble du contenu de ce site (textes, images, graphismes, logo, icones, sons, logiciels, etc.)
                est la propriete exclusive de Spiritactelle ou de ses partenaires et est protege par les lois
                francaises et internationales relatives a la propriete intellectuelle.
              </p>
              <p className="mt-4 leading-relaxed">
                Toute reproduction, representation, modification, publication, adaptation de tout ou partie
                des elements du site, quel que soit le moyen ou le procede utilise, est interdite, sauf
                autorisation ecrite prealable de Spiritactelle.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                4. Responsabilite
              </h2>
              <p className="leading-relaxed">
                Les informations fournies sur ce site le sont a titre indicatif et ne sauraient engager
                la responsabilite de l'editeur. Les contenus relatifs a l'astrologie, la numerologie,
                le tarot et autres pratiques spirituelles sont presentes a des fins de divertissement
                et de developpement personnel.
              </p>
              <p className="mt-4 leading-relaxed">
                Ces contenus ne se substituent en aucun cas a un avis medical, psychologique ou
                professionnel. L'utilisateur est seul responsable de l'utilisation qu'il fait des
                informations presentes sur le site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                5. Liens hypertextes
              </h2>
              <p className="leading-relaxed">
                Le site peut contenir des liens vers d'autres sites internet. Spiritactelle n'exerce
                aucun controle sur ces sites et decline toute responsabilite quant a leur contenu.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                6. Droit applicable
              </h2>
              <p className="leading-relaxed">
                Les presentes mentions legales sont soumises au droit francais. En cas de litige,
                les tribunaux francais seront seuls competents.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                7. Contact
              </h2>
              <p className="leading-relaxed">
                Pour toute question concernant ces mentions legales, vous pouvez nous contacter
                a l'adresse suivante : contact@spiritactelle.com
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
            href="/cgu"
            className="px-6 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow text-[var(--color-text-primary)]"
          >
            CGU
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
