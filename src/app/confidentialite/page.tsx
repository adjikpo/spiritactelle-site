import Link from 'next/link';

export const metadata = {
  title: 'Politique de Confidentialite | Astrobien',
  description: 'Politique de confidentialite et protection des donnees personnelles de Astrobien.',
};

export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-20 pb-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3 py-2 bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-border)] rounded-sm text-[var(--color-text-primary)] text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Accueil</span>
          </Link>
        </div>

        <div className="bg-white rounded-sm shadow-lg p-8">
          <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-8">
            Politique de Confidentialite
          </h1>

          <div className="space-y-8 text-[var(--color-text-secondary)]">
            <section>
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                1. Introduction
              </h2>
              <p className="leading-relaxed">
                Astrobien s'engage a proteger la vie privee de ses utilisateurs. Cette politique
                de confidentialite explique comment nous collectons, utilisons et protegeons vos
                donnees personnelles conformement au Reglement General sur la Protection des Donnees (RGPD).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                2. Responsable du traitement
              </h2>
              <div className="space-y-2">
                <p><strong>Responsable :</strong> Astrobien</p>
                <p><strong>Email :</strong> dpo@astrobien.com</p>
                <p><strong>Adresse :</strong> [A completer]</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                3. Donnees collectees
              </h2>
              <p className="leading-relaxed mb-4">
                Nous collectons les donnees suivantes :
              </p>

              <h3 className="font-medium text-[var(--color-text-primary)] mb-2">Donnees d'inscription :</h3>
              <ul className="list-disc list-inside space-y-1 mb-4">
                <li>Adresse email</li>
                <li>Mot de passe (chiffre)</li>
                <li>Nom et prenom (optionnel)</li>
              </ul>

              <h3 className="font-medium text-[var(--color-text-primary)] mb-2">Donnees astrologiques (optionnel) :</h3>
              <ul className="list-disc list-inside space-y-1 mb-4">
                <li>Date de naissance</li>
                <li>Heure de naissance</li>
                <li>Lieu de naissance</li>
              </ul>

              <h3 className="font-medium text-[var(--color-text-primary)] mb-2">Donnees de navigation :</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Adresse IP</li>
                <li>Type de navigateur</li>
                <li>Pages visitees</li>
                <li>Duree des visites</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                4. Finalites du traitement
              </h2>
              <p className="leading-relaxed mb-4">
                Vos donnees sont utilisees pour :
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Gerer votre compte et authentification</li>
                <li>Fournir les services personnalises (horoscope, theme natal)</li>
                <li>Ameliorer nos services et l'experience utilisateur</li>
                <li>Envoyer des communications (si vous y avez consenti)</li>
                <li>Assurer la securite du site</li>
                <li>Respecter nos obligations legales</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                5. Base legale du traitement
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Execution du contrat :</strong> fourniture des services demandes</li>
                <li><strong>Consentement :</strong> newsletters et communications marketing</li>
                <li><strong>Interet legitime :</strong> amelioration des services, securite</li>
                <li><strong>Obligation legale :</strong> conservation des donnees de facturation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                6. Destinataires des donnees
              </h2>
              <p className="leading-relaxed mb-4">
                Vos donnees peuvent etre transmises a :
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Supabase :</strong> hebergement et base de donnees</li>
                <li><strong>Vercel :</strong> hebergement du site web</li>
                <li><strong>Stripe :</strong> traitement des paiements (si applicable)</li>
              </ul>
              <p className="mt-4 leading-relaxed">
                Nous ne vendons jamais vos donnees a des tiers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                7. Duree de conservation
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Donnees de compte : duree de l'inscription + 3 ans apres suppression</li>
                <li>Donnees de navigation : 13 mois</li>
                <li>Donnees de facturation : 10 ans (obligation legale)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                8. Vos droits
              </h2>
              <p className="leading-relaxed mb-4">
                Conformement au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Droit d'acces :</strong> obtenir une copie de vos donnees</li>
                <li><strong>Droit de rectification :</strong> corriger vos donnees</li>
                <li><strong>Droit a l'effacement :</strong> supprimer vos donnees</li>
                <li><strong>Droit a la portabilite :</strong> recuperer vos donnees</li>
                <li><strong>Droit d'opposition :</strong> vous opposer a certains traitements</li>
                <li><strong>Droit de limitation :</strong> limiter le traitement de vos donnees</li>
              </ul>
              <p className="mt-4 leading-relaxed">
                Pour exercer ces droits, contactez-nous a : dpo@astrobien.com
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                9. Cookies
              </h2>
              <p className="leading-relaxed mb-4">
                Notre site utilise des cookies pour :
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Cookies essentiels :</strong> fonctionnement du site, authentification</li>
                <li><strong>Cookies de preferences :</strong> memorisation de vos choix</li>
                <li><strong>Cookies analytiques :</strong> statistiques de visite (anonymisees)</li>
              </ul>
              <p className="mt-4 leading-relaxed">
                Vous pouvez gerer vos preferences de cookies dans les parametres de votre navigateur.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                10. Securite
              </h2>
              <p className="leading-relaxed">
                Nous mettons en oeuvre des mesures de securite techniques et organisationnelles
                pour proteger vos donnees : chiffrement SSL/TLS, mots de passe hashes,
                acces restreint aux donnees, sauvegardes regulieres.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                11. Transferts internationaux
              </h2>
              <p className="leading-relaxed">
                Certains de nos prestataires peuvent etre situes hors de l'Union Europeenne.
                Dans ce cas, nous nous assurons que des garanties appropriees sont en place
                (clauses contractuelles types, certification adequation).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                12. Reclamations
              </h2>
              <p className="leading-relaxed">
                Si vous estimez que vos droits ne sont pas respectes, vous pouvez introduire
                une reclamation aupres de la CNIL (Commission Nationale de l'Informatique et des Libertes) :
                www.cnil.fr
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                13. Modifications
              </h2>
              <p className="leading-relaxed">
                Cette politique peut etre modifiee a tout moment. La date de derniere mise a jour
                est indiquee en bas de page. Nous vous encourageons a la consulter regulierement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                14. Contact
              </h2>
              <p className="leading-relaxed">
                Pour toute question concernant cette politique : dpo@astrobien.com
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
            className="px-6 py-3 bg-white rounded-sm shadow-md hover:shadow-lg transition-shadow text-[var(--color-text-primary)]"
          >
            Mentions legales
          </Link>
          <Link
            href="/cgu"
            className="px-6 py-3 bg-white rounded-sm shadow-md hover:shadow-lg transition-shadow text-[var(--color-text-primary)]"
          >
            CGU
          </Link>
        </div>
      </div>
    </div>
  );
}
