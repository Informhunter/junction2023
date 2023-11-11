.PHONY: deploy-frontend deploy-backend

FRONTEND_BUCKET=junction2023-diary-static

BACKEND_IMAGE_LOCAL=junction2023-backend:latest
BACKEND_IMAGE_REMOTE=europe-west1-docker.pkg.dev/junction2023-diary/junction2023-backend/backend:latest
BACKEND_SERVICE_NAME=junction2023-backend
LOAD_BALANCER_NAME=junction2023-url-map
REGION=europe-west1
GCP_PROJECT=junction2023-diary


build-frontend:
	echo "Building frontend..."
	cd frontend && npm install && npm run build
	echo "Built frontend"


deploy-frontend: build-frontend
	echo "Deploying frontend..."
	cd frontend && gsutil rsync  -d -r build/ gs://$(FRONTEND_BUCKET)
	echo "Deployed frontend to gs://$(FRONTEND_BUCKET)"
	echo "Invalidating cache..."
	gcloud compute url-maps invalidate-cdn-cache $(LOAD_BALANCER_NAME) --path "/*" --async --project $(GCP_PROJECT)


build-backend:
	echo "Building backend..."
	export DOCKER_DEFAULT_PLATFORM=linux/amd64 && \
	cd backend && \
	make build


deploy-backend: build-backend
	echo "Deploying backend..."
	docker tag $(BACKEND_IMAGE_LOCAL) $(BACKEND_IMAGE_REMOTE)
	docker push $(BACKEND_IMAGE_REMOTE)
	gcloud run deploy $(BACKEND_SERVICE_NAME) --image $(BACKEND_IMAGE_REMOTE) --region $(REGION) --project $(GCP_PROJECT)
