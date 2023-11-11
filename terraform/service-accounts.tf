resource "google_service_account" "junction2023-deploy" {
  account_id   = "junction2023-deploy"
  display_name = "junction2023-deploy"
}

resource "google_service_account" "backend-sa" {
  account_id = "backend-sa"
  display_name = "backend-sa"
}
