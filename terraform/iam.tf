# All users can read from the bucket
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
