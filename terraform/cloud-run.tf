resource "google_cloud_run_v2_service" "junction2023-backend" {
  name     = "junction2023-backend"
  location = "europe-west1"
  ingress  = "INGRESS_TRAFFIC_INTERNAL_LOAD_BALANCER"

  template {
    containers {
      image = "europe-west1-docker.pkg.dev/junction2023-diary/junction2023-backend/backend:latest"
      ports {
        container_port = 8080
      }
    }
  }
}
