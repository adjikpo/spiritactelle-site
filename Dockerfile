# Dockerfile - Image de production Next.js avec Bun (multi-stage)

# ============================================
# Stage 1: Dependencies
# ============================================
FROM oven/bun:1-alpine AS deps

WORKDIR /app

# Copier les fichiers de dependances
COPY package.json bun.lockb* ./

# Installer les dependances
RUN bun install --frozen-lockfile

# ============================================
# Stage 2: Builder
# ============================================
FROM oven/bun:1-alpine AS builder

WORKDIR /app

# Copier les dependances depuis le stage deps
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Variables d'environnement pour le build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build de l'application Next.js
RUN bun run build

# ============================================
# Stage 3: Runner (Production)
# ============================================
FROM oven/bun:1-alpine AS runner

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

# Demarrer le serveur Next.js avec Bun
CMD ["bun", "server.js"]
