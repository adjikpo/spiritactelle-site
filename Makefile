# Makefile - Commandes Docker pour Spiritactelle (Bun)
# ================================================

.PHONY: help build up dev down stop restart logs logs-web logs-db install shell create-project add build-prod clean db-shell studio

# Couleurs pour l'affichage
CYAN := \033[36m
GREEN := \033[32m
YELLOW := \033[33m
RED := \033[31m
RESET := \033[0m

# Variables
PROJECT_NAME := spiritactelle
COMPOSE := docker compose

# ================================================
# AIDE
# ================================================
help: ## Affiche cette aide
	@echo ""
	@echo "$(CYAN)╔════════════════════════════════════════════════════════════╗$(RESET)"
	@echo "$(CYAN)║        SPIRITACTELLE - Commandes Docker (Bun)              ║$(RESET)"
	@echo "$(CYAN)╚════════════════════════════════════════════════════════════╝$(RESET)"
	@echo ""
	@echo "$(GREEN)Commandes disponibles :$(RESET)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(YELLOW)%-18s$(RESET) %s\n", $$1, $$2}'
	@echo ""
	@echo "$(CYAN)Exemples d'utilisation :$(RESET)"
	@echo "  make build          # Construire les images"
	@echo "  make dev            # Demarrer en mode dev avec logs"
	@echo "  make add PKG=@supabase/supabase-js"
	@echo ""

# ================================================
# BUILD & IMAGES
# ================================================
build: ## Construire les images Docker
	@echo "$(CYAN)Construction des images Docker...$(RESET)"
	$(COMPOSE) build

build-prod: ## Build de production
	@echo "$(CYAN)Build de production Next.js...$(RESET)"
	$(COMPOSE) run --rm cli bun run build

# ================================================
# DEMARRAGE & ARRET
# ================================================
up: ## Demarrer les services en arriere-plan
	@echo "$(GREEN)Demarrage des services...$(RESET)"
	$(COMPOSE) up -d web supabase-db
	@echo "$(GREEN)Application disponible sur http://localhost:3000$(RESET)"

dev: ## Demarrer en mode dev avec logs en direct
	@echo "$(GREEN)Demarrage en mode developpement...$(RESET)"
	$(COMPOSE) up web supabase-db

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
# INSTALLATION & PACKAGES (Bun)
# ================================================
install: ## Installer les dependances avec Bun
	@echo "$(CYAN)Installation des dependances avec Bun...$(RESET)"
	$(COMPOSE) run --rm cli bun install

add: ## Ajouter un package (usage: make add PKG=nom-package)
ifndef PKG
	@echo "$(RED)Erreur: Specifiez le package avec PKG=nom-du-package$(RESET)"
	@echo "Exemple: make add PKG=@supabase/supabase-js"
else
	@echo "$(CYAN)Ajout du package $(PKG) avec Bun...$(RESET)"
	$(COMPOSE) run --rm cli bun add $(PKG)
endif

add-dev: ## Ajouter un package dev (usage: make add-dev PKG=nom-package)
ifndef PKG
	@echo "$(RED)Erreur: Specifiez le package avec PKG=nom-du-package$(RESET)"
else
	@echo "$(CYAN)Ajout du package dev $(PKG) avec Bun...$(RESET)"
	$(COMPOSE) run --rm cli bun add -d $(PKG)
endif

remove: ## Supprimer un package (usage: make remove PKG=nom-package)
ifndef PKG
	@echo "$(RED)Erreur: Specifiez le package avec PKG=nom-du-package$(RESET)"
else
	@echo "$(CYAN)Suppression du package $(PKG)...$(RESET)"
	$(COMPOSE) run --rm cli bun remove $(PKG)
endif

# ================================================
# SHELL & CLI
# ================================================
shell: ## Ouvrir un shell dans le conteneur
	@echo "$(CYAN)Ouverture du shell...$(RESET)"
	$(COMPOSE) run --rm cli sh

bun: ## Executer une commande Bun (usage: make bun CMD="run test")
ifndef CMD
	@echo "$(RED)Erreur: Specifiez la commande avec CMD=\"...\"$(RESET)"
	@echo "Exemple: make bun CMD=\"run test\""
else
	@echo "$(CYAN)Execution: bun $(CMD)$(RESET)"
	$(COMPOSE) run --rm cli bun $(CMD)
endif

# ================================================
# CREATION DE PROJET
# ================================================
create-project: ## Creer un nouveau projet Next.js avec Bun
	@echo "$(CYAN)Creation du projet Next.js avec Bun...$(RESET)"
	@echo "$(YELLOW)Creation dans un dossier temporaire puis fusion...$(RESET)"
	$(COMPOSE) run --rm create sh -c "bunx create-next-app@latest /tmp/nextapp --typescript --tailwind --eslint --app --src-dir --use-bun --no-git && cp -r /tmp/nextapp/* /tmp/nextapp/.[!.]* /app/ 2>/dev/null; ls -la /app"
	@echo "$(GREEN)Projet Next.js cree avec succes!$(RESET)"

init-project: ## Initialiser un projet existant (si package.json existe)
	@echo "$(CYAN)Initialisation du projet...$(RESET)"
	@if [ -f "package.json" ]; then \
		echo "$(GREEN)package.json trouve, installation des dependances...$(RESET)"; \
		$(COMPOSE) run --rm cli bun install; \
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
	$(COMPOSE) up -d supabase-studio
	@echo "$(GREEN)Supabase Studio disponible sur http://localhost:3001$(RESET)"

studio-stop: ## Arreter Supabase Studio
	$(COMPOSE) stop supabase-studio

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

prune: ## Nettoyer les ressources Docker du projet uniquement
	@echo "$(YELLOW)Nettoyage des ressources Docker du projet Spiritactelle...$(RESET)"
	@docker images --filter "reference=*spiritactelle*" -q | xargs -r docker rmi -f 2>/dev/null || true
	@docker volume ls --filter "name=spiritactelle" -q | xargs -r docker volume rm 2>/dev/null || true
	@docker network ls --filter "name=spiritactelle" -q | xargs -r docker network rm 2>/dev/null || true
	@echo "$(GREEN)Nettoyage du projet termine$(RESET)"

prune-all: ## Nettoyer TOUTES les ressources Docker inutilisees (attention!)
	@echo "$(RED)Nettoyage de TOUTES les ressources Docker inutilisees...$(RESET)"
	docker system prune -f

# ================================================
# STATUS & DEBUG
# ================================================
status: ## Afficher le status des services
	@echo "$(CYAN)Status des services :$(RESET)"
	$(COMPOSE) ps

health: ## Verifier la sante des services
	@echo "$(CYAN)Verification de la sante des services...$(RESET)"
	@$(COMPOSE) ps

# ================================================
# PRODUCTION
# ================================================
prod-build: ## Construire l'image de production
	@echo "$(CYAN)Construction de l'image de production...$(RESET)"
	docker build -t $(PROJECT_NAME):latest -f Dockerfile .

prod-run: ## Lancer le conteneur de production
	@echo "$(GREEN)Demarrage en mode production...$(RESET)"
	docker run -p 3000:3000 --env-file .env.local $(PROJECT_NAME):latest

# ================================================
# TESTS & QUALITE
# ================================================
test: ## Lancer les tests
	@echo "$(CYAN)Lancement des tests...$(RESET)"
	$(COMPOSE) run --rm cli bun test

lint: ## Lancer le linter
	@echo "$(CYAN)Lancement du linter...$(RESET)"
	$(COMPOSE) run --rm cli bun run lint

format: ## Formater le code
	@echo "$(CYAN)Formatage du code...$(RESET)"
	$(COMPOSE) run --rm cli bun run format
