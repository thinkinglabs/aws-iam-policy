.DEFAULT_GOAL := help
.PHONY: tag install test

version=$(shell cat package.json | jq -r '.version')

tag: ## Tag git repo
	git tag -a ${version} -m "Bump ${version}"
	git push origin main --follow-tags

install: ## Install dependencies
	npm install

test: ## Execute tests
	npm test

help:
	@grep -h -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
