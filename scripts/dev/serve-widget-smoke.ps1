$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$widgetFile = Join-Path $repoRoot "samples\chatwoot\widget-local-smoke.html"
$hostName = "127.0.0.1"
$port = 8088
$url = "http://$hostName`:$port/"

if (-not (Test-Path $widgetFile)) {
  throw "Widget file not found: $widgetFile"
}

$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("$url")
$listener.Start()

$serveFile = {
  param($Context, $FilePath)

  $bytes = [System.IO.File]::ReadAllBytes($FilePath)
  $Context.Response.StatusCode = 200
  $Context.Response.ContentType = "text/html; charset=utf-8"
  $Context.Response.ContentLength64 = $bytes.Length
  $Context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  $Context.Response.OutputStream.Close()
}

$serve404 = {
  param($Context)

  $body = [System.Text.Encoding]::UTF8.GetBytes("Not found")
  $Context.Response.StatusCode = 404
  $Context.Response.ContentType = "text/plain; charset=utf-8"
  $Context.Response.ContentLength64 = $body.Length
  $Context.Response.OutputStream.Write($body, 0, $body.Length)
  $Context.Response.OutputStream.Close()
}

Write-Host "Serving widget smoke page at $url"
Write-Host "Open this URL if the browser does not launch automatically."
Start-Process $url | Out-Null

try {
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $path = $context.Request.Url.AbsolutePath.Trim("/")

    if ([string]::IsNullOrWhiteSpace($path) -or $path -eq "widget-local-smoke.html") {
      & $serveFile $context $widgetFile
      continue
    }

    & $serve404 $context
  }
}
finally {
  $listener.Stop()
  $listener.Close()
}
