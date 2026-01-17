// Types pour le blog
export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: ArticleCategory;
  tags: string[];
  author: string;
  publishedAt: string;
  readingTime: number;
  featured: boolean;
}

export type ArticleCategory =
  | 'mythologies'
  | 'astrologie'
  | 'pratiques'
  | 'bien-etre'
  | 'tarot';

export const ARTICLE_CATEGORIES: Record<ArticleCategory, { name: string; color: string }> = {
  mythologies: { name: 'Mythologies', color: '#7C3AED' },
  astrologie: { name: 'Astrologie', color: '#D97706' },
  pratiques: { name: 'Pratiques Spirituelles', color: '#059669' },
  'bien-etre': { name: 'Bien-etre', color: '#DB2777' },
  tarot: { name: 'Tarot & Oracles', color: '#0891B2' },
};

// Articles statiques
export const ARTICLES: Article[] = [
  {
    id: '1',
    slug: 'astrologie-chinoise-guide-complet',
    title: 'L\'Astrologie Chinoise : Guide Complet des 12 Animaux',
    excerpt: 'Decouvrez les secrets du zodiaque chinois, ses 12 animaux sacres et les 5 elements qui influencent votre destinee.',
    content: `
L'astrologie chinoise est l'un des systemes divinatoires les plus anciens au monde, remontant a plus de 2000 ans. Contrairement a l'astrologie occidentale basee sur les mois, le zodiaque chinois suit un cycle de 12 ans, chaque annee etant associee a un animal.

## Les 12 Animaux du Zodiaque Chinois

### Le Rat (1948, 1960, 1972, 1984, 1996, 2008, 2020)
Le Rat est intelligent, charmant et ambitieux. Premier animal du cycle, il symbolise les nouveaux departs et l'ingeniosite.

### Le Buffle (1949, 1961, 1973, 1985, 1997, 2009, 2021)
Le Buffle represente la force, la determination et le travail acharne. Les natifs sont fiables et patients.

### Le Tigre (1950, 1962, 1974, 1986, 1998, 2010, 2022)
Le Tigre incarne le courage, la passion et l'independance. C'est un leader ne qui n'hesite pas a prendre des risques.

### Le Lapin (1951, 1963, 1975, 1987, 1999, 2011, 2023)
Le Lapin est doux, elegant et diplomate. Il recherche l'harmonie et evite les conflits.

### Le Dragon (1952, 1964, 1976, 1988, 2000, 2012, 2024)
Le Dragon est le seul animal mythique du zodiaque. Il symbolise la chance, le pouvoir et la noblesse.

### Le Serpent (1953, 1965, 1977, 1989, 2001, 2013, 2025)
Le Serpent est sage, intuitif et mysterieux. Il possede une grande intelligence emotionnelle.

### Le Cheval (1954, 1966, 1978, 1990, 2002, 2014, 2026)
Le Cheval est libre, energique et independant. Il aime l'aventure et les grands espaces.

### La Chevre (1955, 1967, 1979, 1991, 2003, 2015, 2027)
La Chevre est artistique, douce et compatissante. Elle apprecie la beaute et l'harmonie.

### Le Singe (1956, 1968, 1980, 1992, 2004, 2016, 2028)
Le Singe est intelligent, versatile et plein d'humour. C'est un excellent communicant.

### Le Coq (1957, 1969, 1981, 1993, 2005, 2017, 2029)
Le Coq est confiant, travailleur et honnete. Il aime l'ordre et la precision.

### Le Chien (1958, 1970, 1982, 1994, 2006, 2018, 2030)
Le Chien est loyal, sincere et protecteur. C'est un ami fidele sur qui on peut compter.

### Le Cochon (1959, 1971, 1983, 1995, 2007, 2019, 2031)
Le Cochon est genereux, tolerant et honnete. Il apprecie les plaisirs simples de la vie.

## Les 5 Elements

Chaque animal est aussi associe a l'un des 5 elements qui se repetent tous les 10 ans :

- **Bois** : Creativite, croissance, flexibilite
- **Feu** : Passion, energie, transformation
- **Terre** : Stabilite, patience, pragmatisme
- **Metal** : Determination, rigidite, force
- **Eau** : Sagesse, intuition, adaptabilite

La combinaison de votre animal et de votre element cree un profil unique parmi les 60 possibilites du cycle complet.
    `,
    category: 'mythologies',
    tags: ['astrologie chinoise', 'zodiaque', 'animaux', 'elements'],
    author: 'Astrobien',
    publishedAt: '2026-01-10',
    readingTime: 8,
    featured: true,
  },
  {
    id: '2',
    slug: 'astrologie-egyptienne-12-dieux',
    title: 'L\'Astrologie Egyptienne : Les 12 Dieux de Votre Destinee',
    excerpt: 'Plongez dans la sagesse des pharaons et decouvrez quel dieu egyptien guide votre existence selon votre date de naissance.',
    content: `
L'astrologie egyptienne est l'une des plus anciennes formes de divination, developpee par les pretres de l'Egypte ancienne. Chaque periode de l'annee est placee sous la protection d'une divinite du pantheon egyptien.

## Les 12 Signes Egyptiens

### Nil (1-7 janvier, 19-28 juin, 1-7 septembre, 18-26 novembre)
Le Nil represente la source de vie. Les natifs sont pacifiques, observateurs et analytiques.

### Amon-Ra (8-21 janvier, 1-11 fevrier)
Dieu supreme du soleil. Les natifs sont des leaders nes, optimistes et charismatiques.

### Mout (22-31 janvier, 8-22 septembre)
Deesse mere. Les natifs sont nourriciers, protecteurs et patients.

### Geb (12-29 fevrier, 20-31 aout)
Dieu de la terre. Les natifs sont fiables, enracines et sensibles a l'environnement.

### Osiris (1-10 mars, 27 novembre - 18 decembre)
Dieu de la resurrection. Les natifs sont mysterieux, determineset regeneratifs.

### Isis (11-31 mars, 18-29 octobre, 19-31 decembre)
Deesse de la magie. Les natifs sont intuitifs, protecteurs et puissants.

### Thot (1-19 avril, 8-17 novembre)
Dieu de la sagesse. Les natifs sont intellectuels, communicants et inventifs.

### Horus (20 avril - 7 mai, 12-19 aout)
Dieu faucon. Les natifs sont courageux, visionnaires et protecteurs.

### Anubis (8-27 mai, 29 juin - 13 juillet)
Dieu des morts. Les natifs sont introspectifs, gardiens des secrets et transformateurs.

### Seth (28 mai - 18 juin, 28 septembre - 2 octobre)
Dieu du chaos. Les natifs sont independants, rebelles et transformateurs.

### Bastet (14-28 juillet, 23-27 septembre, 3-17 octobre)
Deesse chatte. Les natifs sont charmants, protecteurs du foyer et equilibres.

### Sekhmet (29 juillet - 11 aout, 30 octobre - 7 novembre)
Deesse lionne. Les natifs sont puissants, guerriers et guerisseurs.

## La Sagesse des Pharaons

L'astrologie egyptienne enseigne que chaque ame est guidee par une divinite qui lui confere des qualites particulieres. Comprendre votre signe egyptien vous aide a :

- Reconnaitre vos forces innees
- Comprendre vos defis karmiques
- Trouver votre mission de vie
- Harmoniser vos relations
    `,
    category: 'mythologies',
    tags: ['astrologie egyptienne', 'dieux', 'egypte ancienne', 'pharaons'],
    author: 'Astrobien',
    publishedAt: '2026-01-09',
    readingTime: 7,
    featured: true,
  },
  {
    id: '3',
    slug: 'phases-lune-rituels-spirituels',
    title: 'Les Phases de la Lune et Leurs Rituels Spirituels',
    excerpt: 'Apprenez a synchroniser votre vie avec les cycles lunaires pour manifester vos intentions et liberer ce qui ne vous sert plus.',
    content: `
La Lune exerce une influence profonde sur notre planete et sur nous-memes. Depuis des millenaires, les civilisations ont observe ses cycles pour planter, recolter, mais aussi pour leurs pratiques spirituelles.

## Les 8 Phases Lunaires

### Nouvelle Lune
C'est le moment des nouveaux departs. Plantez vos intentions, definissez vos objectifs, commencez de nouveaux projets.

**Rituel** : Ecrivez vos souhaits sur un papier et conservez-le jusqu'a la pleine lune.

### Premier Croissant
L'energie de manifestation commence a croitre. C'est le moment d'agir sur vos intentions.

**Rituel** : Allumez une bougie blanche et visualisez vos objectifs se realiser.

### Premier Quartier
Phase d'action et de determination. Surmontez les obstacles qui se presentent.

**Rituel** : Meditez sur les defis a relever et affirmez votre capacite a les surmonter.

### Lune Gibbeuse Croissante
Affinez vos projets, ajustez votre trajectoire. La manifestation approche.

**Rituel** : Faites le point sur vos avancees et remerciez pour les progres accomplis.

### Pleine Lune
Moment de culmination et de celebration. L'energie est a son maximum.

**Rituel** : Chargez vos cristaux, pratiquez la gratitude, liberez les emotions retenues.

### Lune Gibbeuse Decroissante
Temps de partage et de transmission. Offrez vos connaissances aux autres.

**Rituel** : Partagez votre sagesse, faites du benevolat, aidez votre communaute.

### Dernier Quartier
Phase de liberation et de lacher-prise. Liberez ce qui ne vous sert plus.

**Rituel** : Ecrivez ce dont vous souhaitez vous liberer et brulez le papier en securite.

### Lune Balsamique
Temps de repos et d'introspection avant le nouveau cycle.

**Rituel** : Meditez, prenez des bains rituels, preparez-vous pour la nouvelle lune.

## Conseils Pratiques

- Tenez un journal lunaire pour observer comment les phases vous affectent
- Planifiez vos activites importantes en fonction des energies lunaires
- Utilisez l'eau de lune (eau chargee sous la pleine lune) pour vos rituels
    `,
    category: 'pratiques',
    tags: ['lune', 'rituels', 'phases lunaires', 'spiritualite'],
    author: 'Astrobien',
    publishedAt: '2026-01-08',
    readingTime: 6,
    featured: false,
  },
  {
    id: '4',
    slug: 'meditation-chakras-guide-debutant',
    title: 'Meditation sur les Chakras : Guide pour Debutants',
    excerpt: 'Apprenez a equilibrer vos 7 chakras principaux grace a des meditations simples et efficaces.',
    content: `
Les chakras sont des centres energetiques situes le long de notre colonne vertebrale. Equilibrer ces centres permet d'harmoniser notre corps, notre esprit et notre ame.

## Les 7 Chakras Principaux

### 1. Chakra Racine (Muladhara) - Rouge
Situe a la base de la colonne vertebrale, il gouverne notre sentiment de securite et d'ancrage.

**Meditation** : Visualisez une lumiere rouge a la base de votre colonne. Affirmez : "Je suis en securite, je suis ancre."

### 2. Chakra Sacre (Svadhisthana) - Orange
Situe sous le nombril, il gouverne la creativite et les emotions.

**Meditation** : Visualisez une lumiere orange. Affirmez : "J'accueille mes emotions et ma creativite."

### 3. Chakra Solaire (Manipura) - Jaune
Situe au niveau du plexus solaire, il gouverne la confiance en soi.

**Meditation** : Visualisez un soleil jaune. Affirmez : "Je suis confiant et puissant."

### 4. Chakra du Coeur (Anahata) - Vert
Situe au centre de la poitrine, il gouverne l'amour et la compassion.

**Meditation** : Visualisez une lumiere verte. Affirmez : "J'aime et je suis aime inconditionnellement."

### 5. Chakra de la Gorge (Vishuddha) - Bleu
Situe au niveau de la gorge, il gouverne la communication.

**Meditation** : Visualisez une lumiere bleue. Affirmez : "Je m'exprime avec clarte et verite."

### 6. Chakra du Troisieme Oeil (Ajna) - Indigo
Situe entre les sourcils, il gouverne l'intuition.

**Meditation** : Visualisez une lumiere indigo. Affirmez : "Je fais confiance a mon intuition."

### 7. Chakra Couronne (Sahasrara) - Violet/Blanc
Situe au sommet de la tete, il nous connecte au divin.

**Meditation** : Visualisez une lumiere violette ou blanche. Affirmez : "Je suis connecte a l'univers."

## Pratique Quotidienne

Prenez 10 minutes chaque jour pour mediter sur vos chakras, en remontant de la base au sommet.
    `,
    category: 'bien-etre',
    tags: ['chakras', 'meditation', 'energie', 'equilibre'],
    author: 'Astrobien',
    publishedAt: '2026-01-07',
    readingTime: 5,
    featured: false,
  },
  {
    id: '5',
    slug: 'mythologie-grecque-12-olympiens',
    title: 'Mythologie Grecque : Les 12 Dieux de l\'Olympe',
    excerpt: 'Partez a la rencontre des divinites grecques et decouvrez leurs histoires fascinantes qui resonnent encore aujourd\'hui.',
    content: `
Les 12 Olympiens sont les dieux majeurs du pantheon grec, residant sur le mont Olympe. Leurs mythes continuent d'inspirer et d'enseigner.

## Les 12 Olympiens

### Zeus - Roi des dieux
Dieu du ciel et de la foudre, Zeus gouverne l'Olympe. Il represente l'autorite et la justice.

### Hera - Reine des dieux
Epouse de Zeus, deesse du mariage et de la famille. Elle incarne la fidelite et la protection du foyer.

### Poseidon - Dieu des mers
Frere de Zeus, il regne sur les oceans. Il symbolise la puissance des elements et l'inconscient.

### Demeter - Deesse de l'agriculture
Elle veille sur les recoltes et la fertilite de la terre. Son mythe avec Persephone explique les saisons.

### Athena - Deesse de la sagesse
Nee du crane de Zeus, elle represente la strategie, l'artisanat et la raison.

### Apollon - Dieu du soleil et des arts
Il incarne la lumiere, la musique, la poesie et la prophetie.

### Artemis - Deesse de la chasse
Soeur jumelle d'Apollon, elle protege la nature sauvage et les jeunes filles.

### Ares - Dieu de la guerre
Il represente la violence et la brutalite du combat.

### Aphrodite - Deesse de l'amour
Nee de l'ecume de la mer, elle incarne la beaute, l'amour et le desir.

### Hephaistos - Dieu du feu et de la forge
Mari d'Aphrodite, il est le forgeron des dieux, maitre de l'artisanat.

### Hermes - Messager des dieux
Dieu des voyageurs, des commercants et... des voleurs. Il guide aussi les ames vers les Enfers.

### Dionysos - Dieu du vin
Il represente l'ivresse, l'extase et la liberation des contraintes sociales.

## Lecons pour aujourd'hui

Chaque dieu incarne des aspects de la psyche humaine. Leurs mythes nous enseignent sur nos propres forces et faiblesses.
    `,
    category: 'mythologies',
    tags: ['mythologie grecque', 'olympe', 'dieux', 'grece antique'],
    author: 'Astrobien',
    publishedAt: '2026-01-06',
    readingTime: 7,
    featured: false,
  },
];

// Fonctions utilitaires
export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((article) => article.slug === slug);
}

export function getArticlesByCategory(category: ArticleCategory): Article[] {
  return ARTICLES.filter((article) => article.category === category);
}

export function getFeaturedArticles(): Article[] {
  return ARTICLES.filter((article) => article.featured);
}

export function getRecentArticles(count: number = 5): Article[] {
  return [...ARTICLES]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, count);
}
