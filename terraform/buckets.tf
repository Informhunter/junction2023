# Google cloud buckets for static content and terraform state

resource "google_storage_bucket" "junction2023-static" {

  name          = "junction2023-diary-static"
  location      = "EU"
  force_destroy = false
  storage_class = "STANDARD"

  website {
    main_page_suffix = "index.html"
    not_found_page   = "404.html"
  }

  uniform_bucket_level_access = true

}

resource "google_storage_bucket" "junction2023-terraform-state" {
  name                     = "junction2023-diary-terraform-state"
  location                 = "EU"
  force_destroy            = false
  storage_class            = "STANDARD"
  public_access_prevention = "enforced"
}
