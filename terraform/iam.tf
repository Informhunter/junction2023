resource "google_storage_bucket_iam_member" "all-users-static-public" {
  bucket = google_storage_bucket.junction2023-static.name
  role   = "roles/storage.objectViewer"
  member = "allUsers"
}

resource "google_cloud_run_service_iam_member" "all-users-backend-public" {
  location = "europe-west1"
  service  = google_cloud_run_v2_service.junction2023-backend.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

resource "google_cloud_run_service_iam_member" "junction2023-backend-deploy" {
  location = "europe-west1"
  service  = google_cloud_run_v2_service.junction2023-backend.name
  role     = "roles/run.developer"
  member   = google_service_account.junction2023-deploy.member
}

resource "google_artifact_registry_repository_iam_member" "junction2023-backend-deploy" {
  location   = "europe-west1"
  repository = google_artifact_registry_repository.junction2023-backend-artifact-registry.name
  role       = "roles/artifactregistry.writer"
  member     = google_service_account.junction2023-deploy.member
}

resource "google_storage_bucket_iam_member" "junction2023-frontend-deploy" {
  bucket = google_storage_bucket.junction2023-static.name
  role   = "roles/storage.objectUser"
  member = google_service_account.junction2023-deploy.member
}

resource "google_project_iam_member" "junction2023-deploy-invalidate-cache" {
  project = var.project
  role    = google_project_iam_custom_role.cdn-cache-invalidator.name
  member  = google_service_account.junction2023-deploy.member
}

resource "google_service_account_iam_member" "junction2023-backend-deploy-sa" {
  role               = "roles/iam.serviceAccountUser"
  service_account_id = google_service_account.backend-sa.id
  member             = google_service_account.junction2023-deploy.member
}

resource "google_secret_manager_secret_iam_member" "openai-organization-id" {
  role      = "roles/secretmanager.secretAccessor"
  secret_id = "openai-organization-id"
  member    = google_service_account.backend-sa.member
}

resource "google_secret_manager_secret_iam_binding" "openai-secret-key" {
  members   = [google_service_account.backend-sa.member]
  role      = "roles/secretmanager.secretAccessor"
  secret_id = "openai-secret-key"
}
