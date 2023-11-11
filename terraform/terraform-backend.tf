terraform {
  backend "gcs" {
    bucket = "junction2023-diary-terraform-state"
    prefix = "terraform/state"
  }
}