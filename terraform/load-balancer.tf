resource "google_compute_global_address" "junction2023-ip" {
  name = "junction2023-ip"
}

resource "google_compute_backend_bucket" "junction2023-static-bucket" {
  name        = "junction2023-static-bucket"
  bucket_name = google_storage_bucket.junction2023-static.name
  enable_cdn  = true
  description = "Bucket for junction2023 static files."
}

resource "google_compute_region_network_endpoint_group" "junction2023-backend-neg" {
  name                  = "junction2023-backend-neg"
  network_endpoint_type = "SERVERLESS"
  region                = "europe-west1"
  cloud_run {
    service = google_cloud_run_v2_service.junction2023-backend.name
  }
}

resource "google_compute_backend_service" "junction2023-backend-service" {
  name        = "junction2023-backend-service"
  protocol    = "HTTP"
  port_name   = "http"
  timeout_sec = 30
  backend {
    group = google_compute_region_network_endpoint_group.junction2023-backend-neg.id
  }
}

resource "google_compute_url_map" "junction2023-url-map" {
  name            = "junction2023-url-map"
  default_service = google_compute_backend_bucket.junction2023-static-bucket.id
  host_rule {
    hosts        = ["*"]
    path_matcher = "allpaths"
  }
  path_matcher {
    name            = "allpaths"
    default_service = google_compute_backend_bucket.junction2023-static-bucket.id
    path_rule {
      paths   = ["/api/*"]
      service = google_compute_backend_service.junction2023-backend-service.id
      route_action {
        url_rewrite {
          path_prefix_rewrite = "/"
        }
      }
    }
  }
}

resource "google_compute_target_http_proxy" "junction2023-http-proxy" {
  name    = "http-lb-proxy"
  url_map = google_compute_url_map.junction2023-url-map.id
}

resource "google_compute_global_forwarding_rule" "junction2023-forwarding-rule" {
  name       = "junction2023-forwarding-rule"
  target     = google_compute_target_http_proxy.junction2023-http-proxy.id
  ip_address = google_compute_global_address.junction2023-ip.id
  port_range = "80"
}
