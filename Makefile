# Makefile - Commandes Docker pour Spiritactelle
# ================================================

.PHONY: help build up dev down stop restart logs logs-web logs-db install shell create-project add-package build-prod clean db-shell studio

# Couleurs pour l'affichage
CYAN := \033[36m
GREEN := \033[32m
YELLOW := \033[33m
RED := \033[31m
RESET := \033[0m

# Variables
PROJECT_NAME := spiritactelle
COMPOSE := docker-compose

# ================================================
# AIDE
# ================================================
help: ## Affiche cette aide
	@echo ""
	@echo "$(CYAN)╔════════════════════════════════════════════════════════════╗$(RESET)"
	@echo "$(CYAN)║           SPIRITACTELLE - Commandes Docker                 ║$(RESET)"
	@echo "$(CYAN)╚════════════════════════════════════════════════════════════╝$(RESET)"
	@echo ""
	@echo "$(GREEN)Commandes disponibles :$(RESET)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(YELLOW)%-18s$(RESET) %s\n", $$1, $$2}'
	@echo ""
	@echo "$(CYAN)Exemples d'utilisation :$(RESET)"
	@echo "  make build          # Construire les images"
	@echo "  make dev            # Demarrer en mode dev avec logs"
	@echo "  make add-package PKG=@supabase/supabase-js"
	@echo ""

# ================================================
# BUILD & IMAGES
# ================================================
build: ## Construire les images Docker
	@echo "$(CYAN)Construction des images Docker...$(RESET)"
	$(COMPOSE) build

build-prod: ## Build de production
	@echo "$(CYAN)Build de production Next.js...$(RESET)"
	$(COMPOSE) run --rm cli pnpm build

# ================================================
# DEMARRAGE & ARRET
# ================================================
up: ## Demarrer les services en arriere-plan
	@echo "$(GREEN)Demarrage des services...$(RESET)"
	$(COMPOSE) up -d
	@echo "$(GREEN)Application disponible sur http://localhost:3000$(RESET)"

dev: ## Demarrer en mode dev avec logs en direct
	@echo "$(GREEN)Demarrage en mode developpement...$(RESET)"
	$(COMPOSE) up

down: ## Arreter et supprimer les conteneurs
	@echo "$(YELLOW)Arret des services...$(RESET)"
	$(COMPOSE) down

stop: ## Arreter les services sans les supprimer
	@echo "$(YELLOW)Pause des services...$(RESET)"
	$(COMPOSE) stop

restart: ## Redemarrer les services
	@echo "$(YELLOW)Redemarrage des services...$(RESET)"
	$(COMPOSE) restart

# ================================================
# LOGS
# ================================================
logs: ## Afficher tous les logs
	$(COMPOSE) logs -f

logs-web: ## Logs du service Next.js
	$(COMPOSE) logs -f web

logs-db: ## Logs du service PostgreSQL
	$(COMPOSE) logs -f supabase-db

# ================================================
# INSTALLATION & PACKAGES
# ================================================
install: ## Installer les dependances pnpm
	@echo "$(CYAN)Installation des dependances...$(RESET)"
	$(COMPOSE) run --rm --profile tools cli pnpm install

add-package: ## Ajouter un package (usage: make add-package PKG=nom-package)
ifndef PKG
	@echo "$(RED)Erreur: Specifiez le package avec PKG=nom-du-package$(RESET)"
	@echo "Exemple: make add-package PKG=@supabase/supabase-js"
else
	@echo "$(CYAN)Ajout du package $(PKG)...$(RESET)"
	$(COMPOSE) run --rm --profile tools cli pnpm add $(PKG)
endif

add-dev-package: ## Ajouter un package dev (usage: make add-dev-package PKG=nom-package)
ifndef PKG
	@echo "$(RED)Erreur: Specifiez le package avec PKG=nom-du-package$(RESET)"
else
	@echo "$(CYAN)Ajout du package dev $(PKG)...$(RESET)"
	$(COMPOSE) run --rm --profile tools cli pnpm add -D $(PKG)
endif

# ================================================
# SHELL & CLI
# ================================================
shell: ## Ouvrir un shell dans le conteneur
	@echo "$(CYAN)Ouverture du shell...$(RESET)"
	$(COMPOSE) run --rm --profile tools cli sh

# ================================================
# CREATION DE PROJET
# ================================================
create-project: ## Creer un nouveau projet Next.js
	@echo "$(CYAN)Creation du projet Next.js...$(RESET)"
	@echo "$(YELLOW)Note: Les fichiers seront crees dans le dossier courant$(RESET)"
	$(COMPOSE) run --rm --profile tools create npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --use-pnpm --no-git

init-project: ## Initialiser un projet existant (si package.json existe)
	@echo "$(CYAN)Initialisation du projet...$(RESET)"
	@if [ -f "package.json" ]; then \
		echo "$(GREEN)package.json trouve, installation des dependances...$(RESET)"; \
		$(COMPOSE) run --rm --profile tools cli pnpm install; \
	else \
		echo "$(YELLOW)Pas de package.json, creation d'un nouveau projet...$(RESET)"; \
		$(MAKE) create-project; \
	fi

# ================================================
# BASE DE DONNEES
# ================================================
db-shell: ## Acceder au shell PostgreSQL
	@echo "$(CYAN)Connexion a PostgreSQL...$(RESET)"
	$(COMPOSE) exec supabase-db psql -U postgres -d spiritactelle

db-reset: ## Reinitialiser la base de donnees
	@echo "$(RED)Reinitialisation de la base de donnees...$(RESET)"
	$(COMPOSE) down -v
	$(COMPOSE) up -d supabase-db
	@echo "$(GREEN)Base de donnees reinitialisee$(RESET)"

# ================================================
# SUPABASE STUDIO
# ================================================
studio: ## Demarrer Supabase Studio
	@echo "$(CYAN)Demarrage de Supabase Studio...$(RESET)"
	$(COMPOSE) --profile studio up -d supabase-studio
	@echo "$(GREEN)Supabase Studio disponible sur http://localhost:3001$(RESET)"

studio-stop: ## Arreter Supabase Studio
	$(COMPOSE) --profile studio stop supabase-studio

# ================================================
# NETTOYAGE
# ================================================
clean: ## Nettoyer tout (conteneurs, volumes, images)
	@echo "$(RED)Nettoyage complet...$(RESET)"
	$(COMPOSE) down -v --remove-orphans
	@echo "$(GREEN)Nettoyage termine$(RESET)"

clean-all: ## Nettoyage total incluant les images
	@echo "$(RED)Nettoyage total (incluant les images)...$(RESET)"
	$(COMPOSE) down -v --remove-orphans --rmi local
	@echo "$(GREEN)Nettoyage total termine$(RESET)"

prune: ## Nettoyer les ressources Docker inutilisees
	@echo "$(YELLOW)Nettoyage des ressources Docker inutilisees...$(RESET)"
	docker system prune -f

# ================================================
# STATUS & DEBUG
# ================================================
status: ## Afficher le status des services
	@echo "$(CYAN)Status des services :$(RESET)"
	$(COMPOSE) ps

health: ## Verifier la sante des services
	@echo "$(CYAN)Verification de la sante des services...$(RESET)"
	@$(COMPOSE) ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}"

# ================================================
# PRODUCTION
# ================================================
prod-build: ## Construire l'image de production
	@echo "$(CYAN)Construction de l'image de production...$(RESET)"
	docker build -t $(PROJECT_NAME):latest -f Dockerfile .

prod-run: ## Lancer le conteneur de production
	@echo "$(GREEN)Demarrage en mode production...$(RESET)"
	docker run -p 3000:3000 --env-file .env.local $(PROJECT_NAME):latest
