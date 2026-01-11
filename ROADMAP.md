# Roadmap Spiritactelle

**Derniere mise a jour**: 11 Janvier 2026

---

## Etat Actuel du Projet

### Version 0.4.0 - Prete pour Vercel

| Module | Status | Details |
|--------|--------|---------|
| **Infrastructure** | | |
| Next.js 16 + React 19 | OK | App Router, TypeScript, Tailwind 4 |
| Docker + Bun | OK | Environnement de dev local |
| Deploiement Vercel | PRET | Variables env configurees |
| **Pages Principales** | | |
| Homepage + Roue zodiacale | OK | Design centre, 12 signes en cercle |
| Newsletter | OK | Remplace temporairement l'inscription |
| Pages legales | OK | CGU, Mentions, Confidentialite |
| **Horoscopes** | | |
| Liste des 12 signes | OK | Cards avec icones SVG |
| Page detail signe | OK | Infos + horoscope + compatibilite |
| API Horoscope externe | OK | Quotidien, Hebdo, Mensuel, Annuel |
| Compatibilite entre signes | OK | Matrice complete + conseils |
| **Astrologie** | | |
| Hub Astrologie | OK | `/astrologie` |
| Theme natal (formulaire) | OK | `/astrologie/theme-natal` |
| Calendrier lunaire | OK | `/astrologie/calendrier-lunaire` |
| Transits | OK | `/astrologie/transits` |
| **Mythologies** | | |
| Hub Mythologies | OK | `/mythologies` |
| Zodiaque Chinois | OK | 12 animaux + 5 elements + calcul |
| Zodiaque Egyptien | OK | 12 divinites |
| **Bien-etre** | | |
| Hub Bien-etre | OK | `/bien-etre` |
| Numerologie | OK | `/bien-etre/numerologie` |
| Citations | OK | `/bien-etre/citations` |
| Affirmations | OK | `/bien-etre/affirmations` |
| Meditation | OK | `/bien-etre/meditation` |
| **Contenu** | | |
| Blog/Articles | OK | Liste + detail, categories |
| Livre d'Or | OK | Temoignages + filtres |
| **Admin** | | |
| Dashboard admin | OK | `/admin` |
| Gestion utilisateurs | OK | `/admin/utilisateurs` |

---

## Phase 1 : Finalisation MVP (Priorite Haute)

### 1.1 Authentification Supabase
- [ ] Configuration Supabase Cloud production
- [ ] Schema base de donnees (users, profiles, subscriptions)
- [ ] Social Login (Google, Facebook, Apple)
- [ ] Pages connexion/inscription
- [ ] Profil utilisateur avec date/heure/lieu naissance
- [ ] Middleware de protection des routes

### 1.2 Newsletter Reelle
- [ ] Integration service email (Resend ou Mailchimp)
- [ ] Stockage abonnes en base
- [ ] Email de confirmation
- [ ] Template email horoscope quotidien

### 1.3 SEO & Performance
- [ ] Metadonnees dynamiques par page
- [ ] Sitemap.xml automatique
- [ ] Schema.org structured data
- [ ] Optimisation Core Web Vitals
- [ ] Images optimisees (next/image)

---

## Phase 2 : Moteur Astrologique (Priorite Haute)

### 2.1 Calculs Astronomiques
**Source existante**: `voyantissime/` contient deja les calculs PHP

- [ ] Port Swiss Ephemeris en TypeScript
- [ ] Calcul positions planetaires (Soleil → Pluton + Noeuds)
- [ ] Calcul des maisons (Placidus, Koch, Equal)
- [ ] Calcul des aspects (conjonction, opposition, trigone, carre, sextile)
- [ ] API GeoNames pour autocompletion lieux
- [ ] Tests unitaires calculs astronomiques

### 2.2 Theme Astral Complet
- [ ] Formulaire de saisie (date, heure, lieu)
- [ ] Generation du theme natal complet
- [ ] Visualisation graphique (roue zodiacale SVG interactive)
- [ ] Tableau des positions planetaires
- [ ] Tableau des aspects
- [ ] Export PDF du theme

### 2.3 Interpretations Automatisees
**Source existante**: `voyantissime/app/Data/` contient les textes

- [ ] Migration textes interpretation vers JSON/Markdown
- [ ] Interpretation planete en signe
- [ ] Interpretation planete en maison
- [ ] Interpretation aspects majeurs
- [ ] Synthese personnalisee du theme

### 2.4 Fonctionnalites Avancees
- [ ] Transits du jour/mois personnalises
- [ ] Revolution solaire
- [ ] Synastrie (compatibilite entre deux themes)
- [ ] Horoscope personnalise base sur theme natal

---

## Phase 3 : Tirage de Cartes (Priorite Haute)

### Ressources Existantes dans `voyantissime/`

| Ressource | Emplacement | Contenu |
|-----------|-------------|---------|
| SQL Cartes | `database/tarot_cards.sql` | 78 cartes completes |
| SQL Jeux | `database/tarot_games.sql` | Types de tirages |
| Images Arcanes | `resources/assets/images_old/tarots/` | 22 arcanes majeurs (.jpg) |
| Images Mineurs | `resources/assets/images_old/tarots/` | Batons, Coupes, etc. |

### 3.1 Migration Donnees Tarot
- [ ] Creer `src/lib/api/tarot.ts`
- [ ] Importer les 22 arcanes majeurs avec:
  - Nom, numero, image
  - Symbolisme complet
  - Interpretation oui/non
  - Interpretation generale
- [ ] Importer les 56 arcanes mineurs (4 couleurs x 14 cartes)
- [ ] Copier images dans `public/images/tarot/`

### 3.2 Types de Tirages
- [ ] Tirage 1 carte (conseil du jour)
- [ ] Tirage 3 cartes (passe, present, futur)
- [ ] Tirage oui/non
- [ ] Croix celtique (10 cartes)
- [ ] Tirage en croix (5 cartes)

### 3.3 Interface de Tirage
- [ ] Page `/tarot` - Hub des tirages
- [ ] Selection du type de tirage
- [ ] Animation melange des cartes (GSAP)
- [ ] Selection visuelle par clic
- [ ] Retournement anime des cartes
- [ ] Affichage interpretation par position

### 3.4 Fonctionnalites Avancees
- [ ] Historique des tirages (utilisateur connecte)
- [ ] Interpretation contextuelle (combinaisons)
- [ ] Export/partage du tirage
- [ ] Mode "question ouverte" avec IA

---

## Phase 4 : Contenu Editorial (Priorite Moyenne)

### 4.1 Blog Enrichi
- [ ] Editeur Markdown/Rich Text pour admin
- [ ] Categories et tags dynamiques
- [ ] Recherche full-text
- [ ] Articles premium (paywall)
- [ ] Commentaires (utilisateurs connectes)

### 4.2 Meditations & Audio
**A verifier**: contenus audio existants dans voyantissime

- [ ] Lecteur audio personnalise
- [ ] Bibliotheque meditations guidees
- [ ] Playlists thematiques
- [ ] Progression utilisateur
- [ ] Telechargement offline (premium)

---

## Phase 5 : Monetisation Freemium (Priorite Moyenne)

### 5.1 Limites Gratuites
| Fonctionnalite | Limite Gratuite | Premium |
|----------------|-----------------|---------|
| Theme astral | 1/mois | Illimite |
| Tirages tarot | 3/jour | Illimite |
| Articles | Gratuits uniquement | Tous |
| Horoscope | Basique | Personnalise |
| Transits | - | Oui |
| Synastrie | - | Oui |
| Export PDF | - | Oui |
| Sans pub | Non | Oui |

### 5.2 Integration Paiement
- [ ] Stripe Checkout
- [ ] Abonnement mensuel (~9.99€)
- [ ] Abonnement annuel (~79.99€)
- [ ] Gestion factures
- [ ] Periode d'essai 7 jours

---

## Phase 6 : Optimisation & Croissance (Priorite Basse)

### 6.1 Performance
- [ ] Mise en cache Redis
- [ ] CDN Cloudflare
- [ ] Lazy loading agressif
- [ ] Service Worker (PWA)

### 6.2 Marketing
- [ ] Landing pages SEO
- [ ] Integration reseaux sociaux
- [ ] Programme affiliation
- [ ] Notifications push

### 6.3 Communaute (Future)
- [ ] Forum d'entraide
- [ ] Profils publics
- [ ] Partage de themes
- [ ] Astrologues certifies

---

## Priorites Immediates

### Sprint 1 (Cette semaine)
1. Deployer sur Vercel (version actuelle)
2. Creer module tarot avec donnees existantes
3. Page tirage 1 carte fonctionnelle

### Sprint 2 (Semaine prochaine)
1. Configurer Supabase Cloud
2. Authentification basique
3. Tirage 3 cartes

### Sprint 3
1. Theme astral formulaire + calculs de base
2. Profil utilisateur avec preferences
3. Newsletter automatique

---

## Stack Technique

```
Frontend:
├── Next.js 16 (App Router)
├── React 19
├── TypeScript 5
├── Tailwind CSS 4
├── GSAP (animations cartes)
└── Zustand (state management)

Backend:
├── Supabase
│   ├── PostgreSQL
│   ├── Auth (Social Login)
│   ├── Storage (images, audio)
│   └── Edge Functions
└── Bun runtime

Astrologie:
├── Swiss Ephemeris (port TypeScript)
├── astronomia (calculs base)
└── GeoNames API (lieux)

Paiement:
└── Stripe

Deploiement:
├── Vercel (frontend)
├── Supabase Cloud (backend)
└── Cloudflare (CDN)
```

---

## Ressources a Migrer depuis Voyantissime

| Type | Source | Destination |
|------|--------|-------------|
| Cartes Tarot | `database/tarot_cards.sql` | `src/lib/api/tarot.ts` |
| Images Tarot | `resources/assets/images_old/tarots/` | `public/images/tarot/` |
| Interpretations | `app/Data/` | `src/lib/api/interpretations.ts` |
| Textes Astro | Divers fichiers PHP | JSON/Markdown |
| Audios | A identifier | `public/audio/` |

---

*Document maintenu par l'equipe Spiritactelle*
