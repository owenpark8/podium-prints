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

.PHONY: clean-containers
clean-containers: ## Remove all stopped containers
	docker container prune

.PHONY: clean-images
clean-images: ## Remove all images not used by existing containers
	docker image prune -a

.PHONY: clean-volumes
clean-volumes:  ## Remove all images not used by existing containers
	docker volume prune

.PHONY: clean-networks
clean-networks:  ## Remove all networks not used by existing containers
	docker network prune

.PHONY: clean
clean: ## Prunes all images, containers, and networks
	docker system prune --volumes -f
	docker volume prune -a -f
