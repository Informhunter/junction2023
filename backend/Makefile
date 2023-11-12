VENV ?= .venv
PWD := $(shell pwd)

export DOCKER_CLI_EXPERIMENTAL := enabled


CODE ?= src tests
DOCKER_WORKDIR := /app

export REPO ?= junction2023-backend
export TAG ?= latest
export OPENAI_SECRET_KEY ?=
export OPENAI_ORG_ID ?=


.PHONY: help test init lint shell pretty


help:
	cat Makefile


####### LOCAL DEVELOPMENT #######

init:
	python -m venv $(VENV)
	$(VENV)/bin/python -m pip install -U pip
	source $(VENV)/bin/activate && poetry install

shell:
	@echo "Entering shell"
	source $(VENV)/bin/activate && \
	poetry shell

test:
	pytest

pretty:
	isort $(CODE)
	unify --in-place --recursive $(CODE)

lint: JOBS=4
lint:
	flake8 --jobs $(JOBS) --statistics $(CODE)
	pylint --jobs $(JOBS) --rcfile setup.cfg $(CODE)
	isort --check-only $(CODE)
	mypy $(CODE)

app:
	uvicorn src.server:app --host 0.0.0.0 --port 8080

####### DOCKER #######

build:
	docker build -t $(REPO):$(TAG) .

push:
	docker push $(REPO):$(TAG)

docker-%:
	docker run \
		-v $(PWD):$(DOCKER_WORKDIR) \
		-p 8080:8080 \
		--env OPENAI_SECRET_KEY=$(OPENAI_SECRET_KEY) \
		--env OPENAI_ORG_ID=$(OPENAI_ORG_ID) \
		--rm \
		$(REPO):$(TAG) make $(subst docker-,,$@)

docker-bash:
	docker run \
		-v $(PWD):$(DOCKER_WORKDIR) \
		--rm \
		-ti $(REPO):$(TAG) /bin/bash
