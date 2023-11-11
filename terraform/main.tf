variable "project" {
  default = "junction2023-diary"
}

provider "google" {
  project = var.project
}
