// Livre d'Or - Temoignages utilisateurs

export interface Testimonial {
  id: string;
  author: string;
  location?: string;
  rating: number; // 1-5
  service: TestimonialService;
  content: string;
  createdAt: string;
  featured: boolean;
}

export type TestimonialService =
  | 'horoscope'
  | 'theme-natal'
  | 'compatibilite'
  | 'tarot'
  | 'numerologie'
  | 'meditation'
  | 'general';

export const TESTIMONIAL_SERVICES: Record<TestimonialService, { name: string; color: string }> = {
  horoscope: { name: 'Horoscope', color: '#6366f1' },
  'theme-natal': { name: 'Theme Natal', color: '#8b5cf6' },
  compatibilite: { name: 'Compatibilite', color: '#ec4899' },
  tarot: { name: 'Tarot', color: '#f59e0b' },
  numerologie: { name: 'Numerologie', color: '#10b981' },
  meditation: { name: 'Meditation', color: '#06b6d4' },
  general: { name: 'General', color: '#6b7280' },
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    author: 'Marie L.',
    location: 'Paris',
    rating: 5,
    service: 'theme-natal',
    content: 'Mon theme natal etait incroyablement precis ! J\'ai enfin compris pourquoi je reagis de certaines facons. Les interpretations sont profondes et bienveillantes. Je recommande vivement a tous ceux qui cherchent a mieux se connaitre.',
    createdAt: '2026-01-08',
    featured: true,
  },
  {
    id: '2',
    author: 'Thomas D.',
    location: 'Lyon',
    rating: 5,
    service: 'horoscope',
    content: 'Je lis mon horoscope chaque matin depuis 3 mois. Les previsions sont etonnamment justes et m\'aident a aborder ma journee avec plus de serenite. Merci Astrobien !',
    createdAt: '2026-01-07',
    featured: true,
  },
  {
    id: '3',
    author: 'Sophie M.',
    location: 'Bordeaux',
    rating: 5,
    service: 'compatibilite',
    content: 'L\'analyse de compatibilite avec mon partenaire nous a permis de mieux comprendre nos differences. Nous communiquons beaucoup mieux maintenant. Un outil precieux pour les couples !',
    createdAt: '2026-01-06',
    featured: true,
  },
  {
    id: '4',
    author: 'Jean-Pierre R.',
    location: 'Marseille',
    rating: 4,
    service: 'numerologie',
    content: 'La numerologie m\'a revele des aspects de ma personnalite que je ne soupconnais pas. Le calcul du chemin de vie est fascinant. Je recommande.',
    createdAt: '2026-01-05',
    featured: false,
  },
  {
    id: '5',
    author: 'Camille B.',
    location: 'Toulouse',
    rating: 5,
    service: 'meditation',
    content: 'Les meditations guidees sont d\'une qualite exceptionnelle. Je les utilise chaque soir avant de dormir. Mon sommeil s\'est nettement ameliore.',
    createdAt: '2026-01-04',
    featured: false,
  },
  {
    id: '6',
    author: 'Alexandre K.',
    location: 'Nantes',
    rating: 5,
    service: 'tarot',
    content: 'Le tirage de tarot m\'a aide a prendre une decision importante. Les interpretations sont claires et pertinentes. Je reviens regulierement.',
    createdAt: '2026-01-03',
    featured: false,
  },
  {
    id: '7',
    author: 'Isabelle F.',
    location: 'Strasbourg',
    rating: 5,
    service: 'general',
    content: 'Un site complet et bien concu. J\'apprecie particulierement le design elegant et la richesse du contenu. Une vraie perle pour les passionnes de spiritualite.',
    createdAt: '2026-01-02',
    featured: false,
  },
  {
    id: '8',
    author: 'Nicolas P.',
    location: 'Lille',
    rating: 4,
    service: 'horoscope',
    content: 'Les horoscopes sont bien rediges et positifs. Ca fait du bien de commencer la journee avec ces conseils bienveillants.',
    createdAt: '2026-01-01',
    featured: false,
  },
  {
    id: '9',
    author: 'Aurelie G.',
    location: 'Nice',
    rating: 5,
    service: 'theme-natal',
    content: 'J\'ai offert un theme natal a ma meilleure amie pour son anniversaire. Elle etait ravie ! L\'interpretation est complete et accessible.',
    createdAt: '2025-12-28',
    featured: false,
  },
  {
    id: '10',
    author: 'Philippe V.',
    location: 'Rennes',
    rating: 5,
    service: 'compatibilite',
    content: 'Tres interessant de voir les compatibilites entre signes. Les explications sont detaillees et m\'ont permis de mieux comprendre mes relations.',
    createdAt: '2025-12-25',
    featured: false,
  },
];

export function getFeaturedTestimonials(): Testimonial[] {
  return TESTIMONIALS.filter((t) => t.featured);
}

export function getRecentTestimonials(count: number = 10): Testimonial[] {
  return [...TESTIMONIALS]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, count);
}

export function getTestimonialsByService(service: TestimonialService): Testimonial[] {
  return TESTIMONIALS.filter((t) => t.service === service);
}

export function getAverageRating(): number {
  const total = TESTIMONIALS.reduce((acc, t) => acc + t.rating, 0);
  return Math.round((total / TESTIMONIALS.length) * 10) / 10;
}

export function getTotalTestimonials(): number {
  return TESTIMONIALS.length;
}
