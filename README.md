# Spiritactelle

Plateforme holistique de spiritualite, mythologies et bien-etre.

## Stack Technique

- **Frontend** : Next.js 14 (App Router) + React + TypeScript
- **Styling** : Tailwind CSS
- **Backend** : Supabase (PostgreSQL + Auth + Storage)
- **Containerisation** : Docker + Docker Compose
- **Package Manager** : pnpm

## Demarrage Rapide

### Prerequis

- Docker Desktop installe et demarre
- Make (optionnel mais recommande)

### Installation

```bash
# 1. Construire les images Docker
make build

# 2. Creer le projet Next.js (si nouveau projet)
make create-project

# 3. Configurer les variables d'environnement
cp .env.local.example .env.local
# Editer .env.local avec vos valeurs

# 4. Installer les dependances
make install

# 5. Demarrer le serveur de developpement
make dev
```

### Commandes Utiles

```bash
# Demarrer en arriere-plan
make up

# Demarrer avec logs
make dev

# Voir les logs
make logs

# Arreter les services
make down

# Installer un package
make add-package PKG=@supabase/supabase-js

# Acceder au shell
make shell

# Acceder a PostgreSQL
make db-shell

# Ouvrir Supabase Studio
make studio

# Voir toutes les commandes
make help
```

## Structure du Projet

```
site/
├── src/
│   ├── app/              # App Router Next.js
│   ├── components/       # Composants React
│   ├── lib/              # Utilitaires (supabase client, etc.)
│   └── styles/           # Styles CSS/Tailwind
├── public/               # Assets statiques
├── Dockerfile            # Image production
├── Dockerfile.dev        # Image developpement
├── docker-compose.yml    # Orchestration services
├── Makefile              # Commandes raccourcis
└── .env.local            # Variables d'environnement
```

## Services Docker

| Service | Description | Port |
|---------|-------------|------|
| web | Application Next.js | 3000 |
| supabase-db | PostgreSQL | 5432 |
| supabase-studio | Interface admin Supabase | 3001 |

## Acces

- **Application** : http://localhost:3000
- **Supabase Studio** : http://localhost:3001
- **PostgreSQL** : localhost:5432

## Deploiement

### Vercel (Recommande)

```bash
# Build de production
make build-prod

# Ou deployer directement via Vercel CLI
vercel
```

### Docker Production

```bash
# Construire l'image de production
make prod-build

# Lancer en production
make prod-run
```

## Configuration Supabase

1. Installer le client :
```bash
make add-package PKG=@supabase/supabase-js
```

2. Creer `src/lib/supabase.ts` :
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

## Troubleshooting

**"Directory not empty"**
```bash
make clean
make create-project
```

**"Module not found"**
```bash
make install
```

**"Cannot connect to database"**
```bash
make logs-db
make restart
```

---

*Spiritactelle - Une boutique spirituelle avec une ame*
