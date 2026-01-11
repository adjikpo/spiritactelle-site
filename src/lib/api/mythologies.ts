// Types pour les mythologies
export interface ChineseZodiacSign {
  id: string;
  name: string;
  nameFr: string;
  element: ChineseElement;
  years: number[];
  traits: string[];
  strengths: string[];
  weaknesses: string[];
  compatibility: string[];
  incompatibility: string[];
  description: string;
}

export interface EgyptianZodiacSign {
  id: string;
  deity: string;
  deityFr: string;
  periods: { start: string; end: string }[];
  traits: string[];
  strengths: string[];
  weaknesses: string[];
  element: string;
  color: string;
  description: string;
}

export type ChineseElement = 'wood' | 'fire' | 'earth' | 'metal' | 'water';

export const CHINESE_ELEMENTS: Record<ChineseElement, {
  name: string;
  nameFr: string;
  color: string;
  traits: string[];
  season: string;
  direction: string;
  planet: string;
  organ: string;
  emotion: string;
  description: string;
}> = {
  wood: {
    name: 'Wood',
    nameFr: 'Bois',
    color: '#22C55E',
    traits: ['Creativite', 'Croissance', 'Flexibilite', 'Generosite'],
    season: 'Printemps',
    direction: 'Est',
    planet: 'Jupiter',
    organ: 'Foie',
    emotion: 'Colere',
    description: 'Le Bois represente la croissance, l\'expansion et la vitalite. Comme un arbre qui s\'eleve vers le ciel, les personnes Bois ont une energie ascendante et creative. Elles excellent dans l\'innovation et savent s\'adapter aux changements.',
  },
  fire: {
    name: 'Fire',
    nameFr: 'Feu',
    color: '#EF4444',
    traits: ['Passion', 'Energie', 'Dynamisme', 'Leadership'],
    season: 'Ete',
    direction: 'Sud',
    planet: 'Mars',
    organ: 'Coeur',
    emotion: 'Joie',
    description: 'Le Feu symbolise la passion, l\'enthousiasme et la transformation. Les personnes Feu rayonnent d\'une energie charismatique qui attire les autres. Elles sont des leaders naturels, capables d\'inspirer et de motiver.',
  },
  earth: {
    name: 'Earth',
    nameFr: 'Terre',
    color: '#A16207',
    traits: ['Stabilite', 'Patience', 'Pragmatisme', 'Fiabilite'],
    season: 'Inter-saisons',
    direction: 'Centre',
    planet: 'Saturne',
    organ: 'Rate',
    emotion: 'Reflexion',
    description: 'La Terre incarne la stabilite, l\'ancrage et la nourriture. Les personnes Terre sont des piliers fiables sur lesquels on peut compter. Elles apportent equilibre et harmonie dans leur entourage.',
  },
  metal: {
    name: 'Metal',
    nameFr: 'Metal',
    color: '#9CA3AF',
    traits: ['Determination', 'Force', 'Organisation', 'Ambition'],
    season: 'Automne',
    direction: 'Ouest',
    planet: 'Venus',
    organ: 'Poumons',
    emotion: 'Tristesse',
    description: 'Le Metal represente la precision, la determination et la purete. Les personnes Metal ont une grande force interieure et un sens aigu de la justice. Elles excellent dans l\'organisation et la discipline.',
  },
  water: {
    name: 'Water',
    nameFr: 'Eau',
    color: '#3B82F6',
    traits: ['Sagesse', 'Intuition', 'Adaptabilite', 'Diplomatie'],
    season: 'Hiver',
    direction: 'Nord',
    planet: 'Mercure',
    organ: 'Reins',
    emotion: 'Peur',
    description: 'L\'Eau symbolise la sagesse profonde, l\'intuition et l\'adaptabilite. Les personnes Eau sont comme le fleuve qui contourne les obstacles. Elles possedent une intelligence emotionnelle remarquable.',
  },
};

export const CHINESE_ZODIAC: ChineseZodiacSign[] = [
  {
    id: 'rat',
    name: 'Rat',
    nameFr: 'Rat',
    element: 'water',
    years: [1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020],
    traits: ['Intelligent', 'Charmant', 'Ambitieux', 'Opportuniste'],
    strengths: ['Ingeniosite', 'Adaptabilite', 'Perspicacite'],
    weaknesses: ['Avare', 'Manipulateur', 'Nerveux'],
    compatibility: ['dragon', 'monkey', 'ox'],
    incompatibility: ['horse', 'goat'],
    description: 'Le Rat est le premier animal du zodiaque chinois. Intelligent et resourceful, il sait toujours trouver une solution. Sa vivacite d\'esprit et son charme naturel lui permettent de reussir dans de nombreux domaines.',
  },
  {
    id: 'ox',
    name: 'Ox',
    nameFr: 'Buffle',
    element: 'earth',
    years: [1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021],
    traits: ['Fiable', 'Patient', 'Methodique', 'Determine'],
    strengths: ['Perseverance', 'Honnetete', 'Endurance'],
    weaknesses: ['Tetu', 'Rigide', 'Rancunier'],
    compatibility: ['rat', 'snake', 'rooster'],
    incompatibility: ['goat', 'horse', 'dog'],
    description: 'Le Buffle incarne la force tranquille et la determination. Travailleur acharne, il atteint ses objectifs par sa perseverance. Sa fiabilite en fait un partenaire de confiance.',
  },
  {
    id: 'tiger',
    name: 'Tiger',
    nameFr: 'Tigre',
    element: 'wood',
    years: [1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022],
    traits: ['Courageux', 'Passione', 'Independant', 'Impulsif'],
    strengths: ['Leadership', 'Courage', 'Magnetisme'],
    weaknesses: ['Impatient', 'Arrogant', 'Temeraire'],
    compatibility: ['horse', 'dog', 'pig'],
    incompatibility: ['ox', 'snake', 'monkey'],
    description: 'Le Tigre est un leader ne qui n\'hesite jamais a prendre des risques. Sa passion et son courage sont contagieux. Il inspire les autres par sa determination et son charisme.',
  },
  {
    id: 'rabbit',
    name: 'Rabbit',
    nameFr: 'Lapin',
    element: 'wood',
    years: [1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023],
    traits: ['Doux', 'Elegant', 'Diplomate', 'Prudent'],
    strengths: ['Elegance', 'Sensibilite', 'Raffinement'],
    weaknesses: ['Indecis', 'Superficiel', 'Timide'],
    compatibility: ['goat', 'pig', 'dog'],
    incompatibility: ['rooster', 'rat'],
    description: 'Le Lapin recherche l\'harmonie et la paix. Elegant et raffine, il possede un gout sur pour les belles choses. Sa diplomatie lui permet d\'eviter les conflits.',
  },
  {
    id: 'dragon',
    name: 'Dragon',
    nameFr: 'Dragon',
    element: 'earth',
    years: [1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024],
    traits: ['Chanceux', 'Puissant', 'Noble', 'Exuberant'],
    strengths: ['Charisme', 'Ambition', 'Vitalite'],
    weaknesses: ['Arrogant', 'Intolerant', 'Exigeant'],
    compatibility: ['rat', 'monkey', 'rooster'],
    incompatibility: ['dog', 'ox', 'dragon'],
    description: 'Le Dragon est le signe le plus venere du zodiaque chinois. Seul animal mythique, il symbolise le pouvoir, la chance et la noblesse. Les Dragons sont destines a accomplir de grandes choses.',
  },
  {
    id: 'snake',
    name: 'Snake',
    nameFr: 'Serpent',
    element: 'fire',
    years: [1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025],
    traits: ['Sage', 'Intuitif', 'Mysterieux', 'Seducteur'],
    strengths: ['Intelligence', 'Intuition', 'Elegance'],
    weaknesses: ['Jaloux', 'Mefiant', 'Possessif'],
    compatibility: ['ox', 'rooster', 'dragon'],
    incompatibility: ['pig', 'tiger'],
    description: 'Le Serpent possede une sagesse profonde et une intuition remarquable. Mysterieux et seducteur, il observe attentivement avant d\'agir. Son intelligence emotionnelle est exceptionnelle.',
  },
  {
    id: 'horse',
    name: 'Horse',
    nameFr: 'Cheval',
    element: 'fire',
    years: [1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026],
    traits: ['Libre', 'Energique', 'Independant', 'Enthousiaste'],
    strengths: ['Vivacite', 'Energie', 'Sociabilite'],
    weaknesses: ['Impatient', 'Instable', 'Egoiste'],
    compatibility: ['tiger', 'goat', 'dog'],
    incompatibility: ['rat', 'ox', 'horse'],
    description: 'Le Cheval aime la liberte et les grands espaces. Energique et enthousiaste, il se lance dans l\'aventure sans hesiter. Son charme naturel attire de nombreux amis.',
  },
  {
    id: 'goat',
    name: 'Goat',
    nameFr: 'Chevre',
    element: 'earth',
    years: [1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027],
    traits: ['Artistique', 'Doux', 'Compassionnant', 'Reveur'],
    strengths: ['Creativite', 'Compassion', 'Elegance'],
    weaknesses: ['Hesitant', 'Pessimiste', 'Dependant'],
    compatibility: ['rabbit', 'horse', 'pig'],
    incompatibility: ['ox', 'rat', 'dog'],
    description: 'La Chevre est l\'artiste du zodiaque. Sensible et creative, elle apprecie la beaute sous toutes ses formes. Sa compassion naturelle en fait un ami precieux.',
  },
  {
    id: 'monkey',
    name: 'Monkey',
    nameFr: 'Singe',
    element: 'metal',
    years: [1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028],
    traits: ['Intelligent', 'Versatile', 'Espiegle', 'Inventif'],
    strengths: ['Ingeniosite', 'Curiosite', 'Humour'],
    weaknesses: ['Manipulateur', 'Inconstant', 'Jaloux'],
    compatibility: ['rat', 'dragon', 'snake'],
    incompatibility: ['tiger', 'pig'],
    description: 'Le Singe est vif, malin et plein d\'humour. Sa curiosite insatiable le pousse a explorer tous les domaines. Son intelligence lui permet de resoudre les problemes les plus complexes.',
  },
  {
    id: 'rooster',
    name: 'Rooster',
    nameFr: 'Coq',
    element: 'metal',
    years: [1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029],
    traits: ['Confiant', 'Travailleur', 'Honnete', 'Observateur'],
    strengths: ['Franchise', 'Precision', 'Determination'],
    weaknesses: ['Critique', 'Vaniteux', 'Autoritaire'],
    compatibility: ['ox', 'snake', 'dragon'],
    incompatibility: ['rabbit', 'dog', 'rooster'],
    description: 'Le Coq est fier et confiant. Travailleur acharne, il aime l\'ordre et la precision. Son honnetete peut parfois paraitre brutale, mais elle est toujours sincere.',
  },
  {
    id: 'dog',
    name: 'Dog',
    nameFr: 'Chien',
    element: 'earth',
    years: [1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030],
    traits: ['Loyal', 'Sincere', 'Protecteur', 'Juste'],
    strengths: ['Fidelite', 'Honnetete', 'Devouement'],
    weaknesses: ['Anxieux', 'Pessimiste', 'Critique'],
    compatibility: ['tiger', 'rabbit', 'horse'],
    incompatibility: ['dragon', 'goat', 'rooster'],
    description: 'Le Chien est l\'ami le plus fidele qu\'on puisse avoir. Loyal et protecteur, il defend toujours les causes justes. Sa sincerite est absolue.',
  },
  {
    id: 'pig',
    name: 'Pig',
    nameFr: 'Cochon',
    element: 'water',
    years: [1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031],
    traits: ['Genereux', 'Tolerant', 'Honnete', 'Sociable'],
    strengths: ['Generosite', 'Optimisme', 'Authenticite'],
    weaknesses: ['Naif', 'Materialiste', 'Indulgent'],
    compatibility: ['rabbit', 'goat', 'tiger'],
    incompatibility: ['snake', 'monkey'],
    description: 'Le Cochon est genereux et bon vivant. Il apprecie les plaisirs simples de la vie et partage volontiers avec les autres. Sa tolerance et son optimisme sont contagieux.',
  },
];

export const EGYPTIAN_ZODIAC: EgyptianZodiacSign[] = [
  {
    id: 'nile',
    deity: 'Nile',
    deityFr: 'Nil',
    periods: [
      { start: '01-01', end: '07-01' },
      { start: '19-06', end: '28-06' },
      { start: '01-09', end: '07-09' },
      { start: '18-11', end: '26-11' },
    ],
    traits: ['Pacifique', 'Observateur', 'Analytique', 'Passione'],
    strengths: ['Sagesse', 'Patience', 'Communication'],
    weaknesses: ['Indecis', 'Instable emotionnellement'],
    element: 'Eau',
    color: '#3B82F6',
    description: 'Le Nil represente la source de vie. Comme le fleuve sacre, les natifs sont porteurs de vie et de renouveau. Ils ont une capacite naturelle a nourrir et soutenir les autres.',
  },
  {
    id: 'amon-ra',
    deity: 'Amon-Ra',
    deityFr: 'Amon-Ra',
    periods: [
      { start: '08-01', end: '21-01' },
      { start: '01-02', end: '11-02' },
    ],
    traits: ['Leader', 'Optimiste', 'Charismatique', 'Genereux'],
    strengths: ['Leadership', 'Confiance', 'Creativite'],
    weaknesses: ['Orgueil', 'Impatience'],
    element: 'Feu',
    color: '#F59E0B',
    description: 'Amon-Ra est le dieu supreme du soleil. Les natifs sont des leaders naturels, rayonnant d\'une energie positive. Ils inspirent les autres par leur optimisme et leur vision.',
  },
  {
    id: 'mout',
    deity: 'Mout',
    deityFr: 'Mout',
    periods: [
      { start: '22-01', end: '31-01' },
      { start: '08-09', end: '22-09' },
    ],
    traits: ['Nourricier', 'Protecteur', 'Patient', 'Mysterieux'],
    strengths: ['Protection', 'Intuition', 'Devotion'],
    weaknesses: ['Possessif', 'Anxieux'],
    element: 'Eau',
    color: '#8B5CF6',
    description: 'Mout est la deesse mere, epouse d\'Amon. Les natifs sont des protecteurs nes, avec un instinct maternel/paternel developpe. Ils offrent refuge et reconfort.',
  },
  {
    id: 'geb',
    deity: 'Geb',
    deityFr: 'Geb',
    periods: [
      { start: '12-02', end: '29-02' },
      { start: '20-08', end: '31-08' },
    ],
    traits: ['Ancre', 'Fiable', 'Sensible', 'Honnete'],
    strengths: ['Stabilite', 'Fiabilite', 'Connexion a la nature'],
    weaknesses: ['Tetu', 'Melancolique'],
    element: 'Terre',
    color: '#22C55E',
    description: 'Geb est le dieu de la terre. Les natifs sont profondement connectes a la nature et au monde materiel. Leur stabilite est un roc sur lequel les autres peuvent s\'appuyer.',
  },
  {
    id: 'osiris',
    deity: 'Osiris',
    deityFr: 'Osiris',
    periods: [
      { start: '01-03', end: '10-03' },
      { start: '27-11', end: '18-12' },
    ],
    traits: ['Mysterieux', 'Determine', 'Regeneratif', 'Juste'],
    strengths: ['Transformation', 'Justice', 'Renaissance'],
    weaknesses: ['Obsessionnel', 'Vengeur'],
    element: 'Eau',
    color: '#10B981',
    description: 'Osiris est le dieu de la mort et de la resurrection. Les natifs ont une capacite unique a se reinventer et a transformer les epreuves en opportunites.',
  },
  {
    id: 'isis',
    deity: 'Isis',
    deityFr: 'Isis',
    periods: [
      { start: '11-03', end: '31-03' },
      { start: '18-10', end: '29-10' },
      { start: '19-12', end: '31-12' },
    ],
    traits: ['Magique', 'Intuitif', 'Protecteur', 'Sage'],
    strengths: ['Magie', 'Guerison', 'Intuition'],
    weaknesses: ['Manipulateur', 'Obsessionnel'],
    element: 'Eau',
    color: '#EC4899',
    description: 'Isis est la deesse de la magie et de la guerison. Les natifs possedent une intuition puissante et des capacites de guerison naturelles. Ils protegent ferocent ceux qu\'ils aiment.',
  },
  {
    id: 'thot',
    deity: 'Thot',
    deityFr: 'Thot',
    periods: [
      { start: '01-04', end: '19-04' },
      { start: '08-11', end: '17-11' },
    ],
    traits: ['Intellectuel', 'Communicant', 'Inventif', 'Sage'],
    strengths: ['Sagesse', 'Communication', 'Ecriture'],
    weaknesses: ['Distant', 'Sur-analytique'],
    element: 'Air',
    color: '#6366F1',
    description: 'Thot est le dieu de la sagesse et de l\'ecriture. Les natifs sont des penseurs brillants avec un don pour la communication. Ils cherchent constamment a apprendre et partager.',
  },
  {
    id: 'horus',
    deity: 'Horus',
    deityFr: 'Horus',
    periods: [
      { start: '20-04', end: '07-05' },
      { start: '12-08', end: '19-08' },
    ],
    traits: ['Courageux', 'Visionnaire', 'Protecteur', 'Noble'],
    strengths: ['Courage', 'Vision', 'Protection'],
    weaknesses: ['Teméraire', 'Arrogant'],
    element: 'Feu',
    color: '#EAB308',
    description: 'Horus est le dieu faucon, fils d\'Osiris et Isis. Les natifs ont une vision perçante et un courage inebranlable. Ils voient au-dela des apparences.',
  },
  {
    id: 'anubis',
    deity: 'Anubis',
    deityFr: 'Anubis',
    periods: [
      { start: '08-05', end: '27-05' },
      { start: '29-06', end: '13-07' },
    ],
    traits: ['Introspectif', 'Gardien', 'Transformateur', 'Loyal'],
    strengths: ['Transformation', 'Protection', 'Secrets'],
    weaknesses: ['Solitaire', 'Melancolique'],
    element: 'Terre',
    color: '#1F2937',
    description: 'Anubis est le dieu des morts et gardien des secrets. Les natifs sont des guides pour les ames en transition. Ils comprennent les mysteres de la vie et de la mort.',
  },
  {
    id: 'seth',
    deity: 'Seth',
    deityFr: 'Seth',
    periods: [
      { start: '28-05', end: '18-06' },
      { start: '28-09', end: '02-10' },
    ],
    traits: ['Independant', 'Rebelle', 'Puissant', 'Impulsif'],
    strengths: ['Force', 'Independence', 'Transformation'],
    weaknesses: ['Destructeur', 'Jaloux'],
    element: 'Feu',
    color: '#DC2626',
    description: 'Seth est le dieu du chaos et des tempetes. Les natifs sont des agents de changement, brisant les structures obsoletes. Leur energie est a la fois creatrice et destructrice.',
  },
  {
    id: 'bastet',
    deity: 'Bastet',
    deityFr: 'Bastet',
    periods: [
      { start: '14-07', end: '28-07' },
      { start: '23-09', end: '27-09' },
      { start: '03-10', end: '17-10' },
    ],
    traits: ['Charmant', 'Protecteur', 'Equilibre', 'Sensuel'],
    strengths: ['Charme', 'Protection du foyer', 'Intuition'],
    weaknesses: ['Superficiel', 'Capricieux'],
    element: 'Terre',
    color: '#F472B6',
    description: 'Bastet est la deesse chatte, protectrice du foyer. Les natifs allient grace et force. Ils protegent ferocent leur territoire et ceux qu\'ils aiment.',
  },
  {
    id: 'sekhmet',
    deity: 'Sekhmet',
    deityFr: 'Sekhmet',
    periods: [
      { start: '29-07', end: '11-08' },
      { start: '30-10', end: '07-11' },
    ],
    traits: ['Puissant', 'Guerrier', 'Guerisseur', 'Passione'],
    strengths: ['Force', 'Guerison', 'Protection'],
    weaknesses: ['Colere', 'Exces'],
    element: 'Feu',
    color: '#B91C1C',
    description: 'Sekhmet est la deesse lionne, guerriere et guerisseuse. Les natifs possedent une force formidable qu\'ils mettent au service de la guerison et de la protection.',
  },
];

// Fonctions utilitaires
export function getChineseZodiacSign(year: number): ChineseZodiacSign {
  const index = (year - 4) % 12;
  return CHINESE_ZODIAC[index];
}

export function getChineseElement(year: number): ChineseElement {
  const elements: ChineseElement[] = ['wood', 'wood', 'fire', 'fire', 'earth', 'earth', 'metal', 'metal', 'water', 'water'];
  const index = (year - 4) % 10;
  return elements[index];
}

export function getEgyptianZodiacSign(day: number, month: number): EgyptianZodiacSign | undefined {
  const dateStr = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}`;

  for (const sign of EGYPTIAN_ZODIAC) {
    for (const period of sign.periods) {
      const [startDay, startMonth] = period.start.split('-').map(Number);
      const [endDay, endMonth] = period.end.split('-').map(Number);

      const startDate = startMonth * 100 + startDay;
      const endDate = endMonth * 100 + endDay;
      const currentDate = month * 100 + day;

      if (currentDate >= startDate && currentDate <= endDate) {
        return sign;
      }
    }
  }

  return EGYPTIAN_ZODIAC[0]; // Default to Nil
}

export function getChineseZodiacById(id: string): ChineseZodiacSign | undefined {
  return CHINESE_ZODIAC.find((sign) => sign.id === id);
}

export function getEgyptianZodiacById(id: string): EgyptianZodiacSign | undefined {
  return EGYPTIAN_ZODIAC.find((sign) => sign.id === id);
}
