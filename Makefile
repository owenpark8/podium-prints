.PHONY: start-development
start-development: ## Start the development docker container.
	docker compose -f docker-compose.development.yml up -d

.PHONY: stop-development
stop-development: ## Stop the development docker container.
	docker compose -f docker-compose.development.yml down

.PHONY: build-production
build-production: ## Build the production docker image.
	docker compose -f docker-compose.production.yml build

.PHONY: start-production
start-production: ## Start the production docker container.
	docker compose -f docker-compose.production.yml up -d

.PHONY: stop-production
stop-production: ## Stop the production docker container.
	docker compose -f docker-compose.production.yml down