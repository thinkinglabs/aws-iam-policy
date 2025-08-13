.DEFAULT_GOAL := help
.PHONY: tag install test

release: ## Release a version
	npm version ${version} -m "Bump v${version}"

install: ## Install dependencies
	npm install

lint: ## Lint code
	npm run lint

test: ## Execute tests
	npm test

help:
	@grep -h -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
