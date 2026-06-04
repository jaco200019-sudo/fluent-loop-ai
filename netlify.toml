[build]
  publish = "."

[[redirects]]
  from = "/api/ai-coach"
  to = "/.netlify/functions/ai-coach"
  status = 200

[functions]
  directory = "netlify/functions"

[[headers]]
  for = "/sw.js"
  [headers.values]
    Cache-Control = "no-cache"

[[headers]]
  for = "/manifest.webmanifest"
  [headers.values]
    Content-Type = "application/manifest+json; charset=utf-8"
