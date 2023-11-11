resource "google_project_iam_custom_role" "cdn-cache-invalidator" {
  role_id     = "cdnCacheInvalidator"
  title       = "Role for CDN cache invalidation."
  description = "Role for CDN cache invalidation."
  permissions = ["compute.urlMaps.get", "compute.urlMaps.invalidateCache"]
}
