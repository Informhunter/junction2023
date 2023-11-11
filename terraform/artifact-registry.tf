resource "google_artifact_registry_repository" "junction2023-backend-artifact-registry" {
  location      = "europe-west1"
  repository_id = "junction2023-backend"
  description   = "Junction2023 Backend Docker Repo"
  format        = "DOCKER"
}
