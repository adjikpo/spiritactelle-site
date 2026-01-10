# Dockerfile - Image de production Next.js (multi-stage)

# ============================================
# Stage 1: Dependencies
# ============================================
FROM node:20-alpine AS deps

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copier les fichiers de dependances
COPY package.json pnpm-lock.yaml* ./

# Installer uniquement les dependances de production
RUN pnpm install --frozen-lockfile

# ============================================
# Stage 2: Builder
# ============================================
FROM node:20-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copier les dependances depuis le stage deps
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Variables d'environnement pour le build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build de l'application Next.js
RUN pnpm build

# ============================================
# Stage 3: Runner (Production)
# ============================================
FROM node:20-alpine AS runner

WORKDIR /app

# Variables d'environnement de production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Creer un utilisateur non-root pour la securite
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copier les fichiers necessaires depuis le builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Copier le build standalone de Next.js
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Utiliser l'utilisateur non-root
USER nextjs

# Exposer le port 3000
EXPOSE 3000

# Variables d'environnement pour le serveur
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Demarrer le serveur Next.js
CMD ["node", "server.js"]
