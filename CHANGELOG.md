# Changelog - Spiritactelle

Toutes les modifications notables de ce projet sont documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Versioning Sémantique](https://semver.org/lang/fr/).

---

## [0.4.0] - 2026-01-11 - Version Vercel

### Ajouté

#### Page Newsletter
- **Nouvelle page newsletter** (`src/app/newsletter/page.tsx`)
  - Formulaire d'inscription à la newsletter
  - Message informatif "Création de compte bientôt disponible"
  - Liste des avantages de l'abonnement :
    - Horoscope quotidien personnalisé
    - Phases lunaires et leurs influences
    - Conseils spirituels et bien-être
    - Actualités astrologiques
    - Accès avant-première aux nouvelles fonctionnalités
  - Animation de chargement lors de la soumission
  - État de confirmation après inscription
  - Liens vers les contenus gratuits (Horoscopes, Mythologies, Blog)

#### Configuration Vercel
- **Fichier .env.example** pour documenter les variables d'environnement
- Support des déploiements sans Supabase configuré

### Modifié

#### Header - Simplification pour Vercel
- **Refonte complète du Header** (`src/components/layout/Header.tsx`)
  - Suppression de toute la logique d'authentification Supabase
  - Remplacement des boutons "Connexion/Inscription" par "Newsletter"
  - Menu mobile avec section newsletter et message d'accroche
  - Code plus léger et performant

#### Middleware Simplifié
- **Désactivation temporaire de Supabase** (`src/middleware.ts`)
  - Middleware passthrough simple sans appels Supabase
  - Prêt pour réactivation future de l'authentification

#### Client Supabase Sécurisé
- **Protection contre les erreurs** (`src/lib/supabase/client.ts`)
  - Vérification des variables d'environnement avant création du client
  - Retourne null si Supabase n'est pas configuré
  - Warning console informatif
  - Évite les crashs en production sans configuration

### Supprimé

#### Pages d'Authentification
- Suppression du dossier `src/app/auth/` complet :
  - `src/app/auth/connexion/page.tsx`
  - `src/app/auth/inscription/page.tsx`
- Ces pages reviendront lors de l'activation de Supabase

#### Global Error Page
- Suppression de `src/app/global-error.tsx` (causait des erreurs de build)

### Notes de Déploiement

Pour déployer sur Vercel :
1. Les variables Supabase peuvent être laissées vides ou avec des placeholders
2. L'authentification est désactivée - seule la newsletter fonctionne
3. Toutes les fonctionnalités de contenu (horoscopes, blog, etc.) fonctionnent

---

## [0.3.0] - 2026-01-11

### Ajouté

#### API Horoscope Externe
- **Nouveau service API** (`src/lib/api/horoscope-api.ts`)
  - Intégration avec l'API externe `https://horoscope-api.herokuapp.com`
  - Support pour 4 périodes temporelles :
    - `today` - Horoscope quotidien
    - `week` - Horoscope hebdomadaire
    - `month` - Horoscope mensuel
    - `year` - Horoscope annuel
  - Fonction `getHoroscope(sign, period)` pour récupérer un horoscope spécifique
  - Fonction `getAllHoroscopesForSign(sign)` pour récupérer toutes les périodes d'un signe
  - Fonction `isValidZodiacSign(slug)` pour valider les slugs de signes
  - Système de cache intelligent avec revalidation :
    - 1 heure pour les horoscopes quotidiens
    - 24 heures pour les horoscopes hebdomadaires
    - 1 semaine pour les horoscopes mensuels et annuels
  - Horoscopes par défaut en français en cas d'indisponibilité de l'API
  - Mapping complet des 12 signes zodiacaux en français

#### Page Horoscope Détaillée
- **Refonte du sélecteur de période** (`src/app/horoscope/[signe]/page.tsx`)
  - Nouveau design avec icônes pour chaque période :
    - Soleil (SunIcon) pour Quotidien
    - Lune (MoonIcon) pour Hebdomadaire
    - Étoile (StarIcon) pour Mensuel
    - Constellation (ConstellationIcon) pour Annuel
  - Interface responsive avec flex-wrap pour mobile
  - Affichage du label de période avec icône
  - Animation de chargement (skeleton) pendant le fetch
  - Transition fluide entre les périodes

### Modifié

#### Header - Initialisation Supabase
- **Fix du client Supabase** (`src/components/layout/Header.tsx`)
  - Initialisation du client Supabase uniquement côté client via useEffect
  - Prévention des erreurs de prerendering avec les hooks React
  - État initial null pour le client Supabase
  - Vérification de l'existence du client avant les appels API

#### Exports API
- **Mise à jour des exports** (`src/lib/api/index.ts`)
  - Export de `getHoroscope`, `getAllHoroscopesForSign`, `isValidZodiacSign`
  - Export de `PERIOD_LABELS` et `SIGN_NAMES_FR`
  - Export des types `HoroscopePeriod`, `ZodiacSignKey`, `HoroscopeResponse`

### Fichiers Créés
- `src/lib/api/horoscope-api.ts` - Service API horoscope externe
- `src/app/global-error.tsx` - Page d'erreur globale minimale

### Fichiers Modifiés
- `src/lib/api/index.ts` - Nouveaux exports API
- `src/app/horoscope/[signe]/page.tsx` - Nouveau sélecteur de périodes
- `src/components/layout/Header.tsx` - Fix initialisation Supabase

---

## [0.2.0] - 2026-01-11

### Ajouté

#### Système de Livre d'Or (Témoignages)
- **Nouveau module témoignages** (`src/lib/api/livre-dor.ts`)
  - Structure de données pour les témoignages avec :
    - ID unique, nom, avatar
    - Service utilisé, note (1-5 étoiles)
    - Commentaire, date, statut featured
  - 8 témoignages pré-remplis couvrant tous les services
  - Fonctions utilitaires :
    - `getFeaturedTestimonials(limit)` - Témoignages mis en avant
    - `getRecentTestimonials(limit)` - Témoignages récents
    - `getTestimonialsByService(service)` - Filtrage par service
    - `getAverageRating()` - Calcul de la note moyenne
    - `getTotalTestimonials()` - Comptage total

- **Page Livre d'Or** (`src/app/livre-dor/page.tsx`)
  - Affichage en grille responsive des témoignages
  - Système d'étoiles pour les notes
  - Filtrage par service (Horoscopes, Thème astral, Compatibilité, etc.)
  - Statistiques globales (note moyenne, nombre total)
  - Design cohérent avec le reste du site

#### Système de Blog/Articles
- **Module articles** (`src/lib/api/blog.ts`)
  - Structure complète pour les articles :
    - Titre, slug, excerpt, contenu complet
    - Catégorie, tags, image de couverture
    - Auteur, date de publication
    - Temps de lecture estimé
  - Catégories d'articles :
    - Astrologie, Spiritualité, Bien-être, Guides pratiques
  - 4 articles pré-remplis de qualité
  - Fonctions de filtrage et recherche

- **Pages Blog**
  - `src/app/blog/page.tsx` - Liste des articles avec filtres
  - `src/app/blog/[slug]/page.tsx` - Page article détaillée
  - Navigation entre articles
  - Affichage des tags et catégories

#### Multi-Mythologies (Astrologies Alternatives)
- **Module mythologies** (`src/lib/api/mythologies.ts`)
  - **Astrologie Chinoise** :
    - 12 animaux du zodiaque avec descriptions détaillées
    - 5 éléments (Bois, Feu, Terre, Métal, Eau)
    - Calcul du signe selon l'année de naissance
    - Calcul de l'élément associé
    - Traits de personnalité, forces, faiblesses
    - Compatibilités entre signes
  - **Astrologie Égyptienne** :
    - 12 divinités du zodiaque égyptien
    - Dates et périodes associées
    - Descriptions mythologiques
    - Traits de personnalité par divinité

- **Pages Mythologies**
  - `src/app/mythologies/page.tsx` - Hub des mythologies
  - `src/app/mythologies/chinoise/page.tsx` - Calculateur zodiaque chinois
  - `src/app/mythologies/egyptienne/page.tsx` - Zodiaque égyptien

#### Icônes SVG Éléments Chinois
- **Nouveaux composants icônes** (`src/components/icons/index.tsx`)
  - `WoodElementIcon` - Élément Bois (arbre stylisé)
  - `FireElementIcon` - Élément Feu (flammes)
  - `EarthElementIcon` - Élément Terre (montagnes)
  - `MetalElementIcon` - Élément Métal (lingot)
  - `WaterElementIcon` - Élément Eau (vagues)
  - Tous les composants acceptent `size`, `className`, `style`

#### Pages Légales
- `src/app/mentions-legales/page.tsx` - Mentions légales complètes
- `src/app/cgu/page.tsx` - Conditions générales d'utilisation
- `src/app/confidentialite/page.tsx` - Politique de confidentialité

### Modifié

#### Navigation et Layout
- **Footer** (`src/components/layout/Footer.tsx`)
  - Ajout des liens vers les pages légales
  - Liens vers Livre d'Or et Blog
  - Organisation en colonnes thématiques

- **Header** (`src/components/layout/Header.tsx`)
  - Ajout de "Mythologies" dans la navigation principale
  - Ajout de "Livre d'Or" et "Blog"

- **Navigation Mobile**
  - Menu hamburger avec tous les nouveaux liens
  - Animation slide-in depuis la droite
  - Overlay avec backdrop blur

#### Composant BackButton
- **Amélioration** (`src/components/layout/PageHeader.tsx`)
  - Props `href` et `label` personnalisables
  - Design cohérent avec flèche retour
  - Hover states améliorés

### Fichiers Créés
- `src/lib/api/livre-dor.ts`
- `src/lib/api/blog.ts`
- `src/lib/api/mythologies.ts`
- `src/app/livre-dor/page.tsx`
- `src/app/blog/page.tsx`
- `src/app/blog/[slug]/page.tsx`
- `src/app/mythologies/page.tsx`
- `src/app/mythologies/chinoise/page.tsx`
- `src/app/mythologies/egyptienne/page.tsx`
- `src/app/mentions-legales/page.tsx`
- `src/app/cgu/page.tsx`
- `src/app/confidentialite/page.tsx`

---

## [0.1.0] - 2026-01-10

### Ajouté

#### Page d'Accueil
- **Hero Section** (`src/app/page.tsx`)
  - Design avec dégradé cosmique (indigo vers violet)
  - Titre animé "L'astrologie qui inspire votre vie"
  - Roue des 12 signes zodiacaux en cercle
    - Positionnement circulaire avec Math.cos/sin
    - Icônes SVG pour chaque signe
    - Liens vers les pages détaillées
  - Bouton CTA "Explorer les horoscopes"
  - Layout centré et responsive

#### Système d'Horoscopes
- **Page liste des signes** (`src/app/horoscope/page.tsx`)
  - Grille des 12 signes zodiacaux
  - Cards avec icône, nom, dates
  - Couleur distinctive par signe

- **Page détail d'un signe** (`src/app/horoscope/[signe]/page.tsx`)
  - Header coloré avec informations du signe
  - Élément, modalité, planète régente
  - Description et traits de personnalité
  - Section horoscope avec sélecteur de période
  - Compatibilités (meilleures et défis)
  - Navigation vers les autres signes

- **API Horoscopes** (`src/lib/api/horoscope.ts`)
  - Fonction `fetchHoroscope(sign, period)`
  - Fonction `fetchAllHoroscopes()`
  - Fonction `getZodiacSign(date)`

#### Système de Compatibilité
- **Module compatibilité** (`src/lib/api/compatibility.ts`)
  - Matrice de compatibilité entre tous les signes
  - Scores de 1 à 5 pour chaque paire
  - Fonction `calculateCompatibility(sign1, sign2)`
  - Fonction `getMostCompatible(sign, limit)`
  - Fonction `getLeastCompatible(sign, limit)`
  - Fonction `getCompatibilityAdvice(sign1, sign2)`

- **Page Compatibilité** (`src/app/horoscope/compatibilite/page.tsx`)
  - Sélecteurs pour deux signes
  - Affichage du score de compatibilité
  - Conseils personnalisés

#### Numérologie
- **Module numérologie** (`src/lib/api/numerology.ts`)
  - Calcul du chemin de vie
  - Nombre d'expression
  - Nombre de l'âme
  - Nombre de personnalité
  - Année personnelle
  - Profil numérologique complet

#### Phases Lunaires
- **Module lune** (`src/lib/api/moon.ts`)
  - Calcul des phases lunaires
  - Calendrier lunaire
  - Prochaines phases
  - Guidances selon la phase

#### Citations et Affirmations
- **Module citations** (`src/lib/api/quotes.ts`)
  - Citations inspirantes par catégorie
  - Affirmations positives
  - Conseils du jour
  - Citation aléatoire

#### Icônes SVG
- **Composants icônes** (`src/components/icons/index.tsx`)
  - 12 icônes zodiacales (Bélier à Poissons)
  - Icônes astrologiques (Soleil, Lune, Étoile, etc.)
  - Export par clé `zodiacIconsByKey`
  - Tailles et couleurs personnalisables

#### Constantes et Types
- **Constantes** (`src/lib/api/constants.ts`)
  - `ZODIAC_SIGNS` - Données complètes des 12 signes
    - Noms FR/EN
    - Dates
    - Éléments et modalités
    - Planètes régentes
    - Couleurs
    - Descriptions
    - Traits de personnalité
  - `ZODIAC_SIGNS_ARRAY` - Liste ordonnée des clés

- **Types** (`src/lib/api/types.ts`)
  - Interfaces TypeScript pour tous les modules
  - Types pour les horoscopes, compatibilités, numérologie

#### Composants UI
- **Button** (`src/components/ui/Button.tsx`)
  - Variantes : primary, secondary, outline, ghost, gold
  - Tailles : sm, md, lg
  - États hover et disabled

- **Card** (`src/components/ui/Card.tsx`)
  - Container avec shadow et border-radius
  - Variantes de padding

#### Layout
- **Header** (`src/components/layout/Header.tsx`)
  - Logo Spiritactelle
  - Navigation desktop avec hover states
  - Menu mobile hamburger
  - Authentification Supabase intégrée
  - Adaptation transparente sur hero/colorée ailleurs

- **Footer** (`src/components/layout/Footer.tsx`)
  - Colonnes de liens organisées
  - Copyright
  - Liens réseaux sociaux

- **PageHeader** (`src/components/layout/PageHeader.tsx`)
  - Composant titre de page
  - Bouton retour configurable

#### Authentification Supabase
- **Client Supabase** (`src/lib/supabase/`)
  - `client.ts` - Client navigateur
  - `server.ts` - Client serveur
  - `middleware.ts` - Gestion des sessions

- **Pages Auth**
  - `src/app/auth/connexion/page.tsx` - Formulaire de connexion
  - `src/app/auth/inscription/page.tsx` - Formulaire d'inscription

- **Middleware** (`src/middleware.ts`)
  - Protection des routes
  - Refresh automatique des tokens

#### Configuration
- **Next.js 16** avec App Router
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4**
- **Bun** comme runtime et package manager
- **Docker Compose** pour le développement
  - Service web (Next.js)
  - Supabase (DB, Auth, REST, Studio)

### Fichiers de Configuration
- `package.json` - Dépendances et scripts
- `tsconfig.json` - Configuration TypeScript
- `tailwind.config.ts` - Configuration Tailwind
- `next.config.ts` - Configuration Next.js
- `docker-compose.yml` - Services Docker
- `.env.local` - Variables d'environnement

---

## Structure du Projet

```
spiritactelle-site/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── connexion/page.tsx
│   │   │   └── inscription/page.tsx
│   │   ├── blog/
│   │   │   ├── [slug]/page.tsx
│   │   │   └── page.tsx
│   │   ├── horoscope/
│   │   │   ├── [signe]/page.tsx
│   │   │   ├── compatibilite/page.tsx
│   │   │   └── page.tsx
│   │   ├── livre-dor/page.tsx
│   │   ├── mythologies/
│   │   │   ├── chinoise/page.tsx
│   │   │   ├── egyptienne/page.tsx
│   │   │   └── page.tsx
│   │   ├── mentions-legales/page.tsx
│   │   ├── cgu/page.tsx
│   │   ├── confidentialite/page.tsx
│   │   ├── global-error.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── icons/index.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── PageHeader.tsx
│   │   │   └── index.ts
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── index.ts
│   ├── lib/
│   │   ├── api/
│   │   │   ├── blog.ts
│   │   │   ├── compatibility.ts
│   │   │   ├── constants.ts
│   │   │   ├── horoscope.ts
│   │   │   ├── horoscope-api.ts
│   │   │   ├── livre-dor.ts
│   │   │   ├── moon.ts
│   │   │   ├── mythologies.ts
│   │   │   ├── numerology.ts
│   │   │   ├── quotes.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   └── supabase/
│   │       ├── client.ts
│   │       ├── server.ts
│   │       ├── middleware.ts
│   │       └── index.ts
│   ├── middleware.ts
│   └── types/
│       └── database.ts
├── public/
├── docker-compose.yml
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── CHANGELOG.md
```

---

## Technologies Utilisées

| Technologie | Version | Usage |
|-------------|---------|-------|
| Next.js | 16.1.1 | Framework React avec App Router |
| React | 19.2.3 | Bibliothèque UI |
| TypeScript | 5.x | Typage statique |
| Tailwind CSS | 4.x | Styles utilitaires |
| Supabase | 2.90.1 | Backend as a Service (Auth, DB) |
| Bun | Latest | Runtime et package manager |
| Docker | Latest | Conteneurisation |
| GSAP | 3.14.2 | Animations (prévu) |

---

## Auteurs

- **Équipe Spiritactelle** - Développement initial
- **Claude Code** - Assistance au développement

---

## Licence

Ce projet est privé et propriétaire. Tous droits réservés.
