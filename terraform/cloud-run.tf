resource "google_cloud_run_v2_service" "junction2023-backend" {
  name     = "junction2023-backend"
  location = "europe-west1"
  ingress  = "INGRESS_TRAFFIC_INTERNAL_LOAD_BALANCER"

  template {

    service_account = google_service_account.backend-sa.email

    containers {

      image = "europe-west1-docker.pkg.dev/junction2023-diary/junction2023-backend/backend:latest"

      ports {
        container_port = 8080
      }

      env {
        name = "OPENAI_ORGANIZATION_ID"
        value_source {
          secret_key_ref {
            secret = "openai-organization-id"
            version = "latest"
          }
        }
      }

      env {
        name = "OPENAI_SECRET_KEY"
        value_source {
          secret_key_ref {
            secret = "openai-secret-key"
            version = "latest"
          }
        }
      }
    }
  }
}
