# Tailwind CSS Diagnostic Protocol Executor
# Based on the TAILWIND_DIAGNOSTIC_PROTOCOL.md document
Write-Host "`n🔍 TAILWIND CSS DIAGNOSTIC PROTOCOL EXECUTION`n" -ForegroundColor Cyan

# Phase 1: Environment & Version Audit
Write-Host "📋 PHASE 1: ENVIRONMENT & VERSION AUDIT" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green

Write-Host "`nVerifying Tailwind CSS version and compatibility matrix..." -ForegroundColor Yellow
npm list tailwindcss @tailwindcss/postcss postcss autoprefixer

Write-Host "`nChecking for version conflicts..." -ForegroundColor Yellow
npm ls --depth=0 | findstr /R "(tailwind|postcss)"

Write-Host "`nVerifying Node.js and npm versions..." -ForegroundColor Yellow
node --version
npm --version

# Phase 2: Configuration Architecture Analysis
Write-Host "`n📋 PHASE 2: CONFIGURATION ARCHITECTURE ANALYSIS" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green

Write-Host "`nAnalyzing PostCSS configuration..." -ForegroundColor Yellow
if (Test-Path -Path "postcss.config.js") {
    Write-Host "✅ PostCSS configuration found" -ForegroundColor Green
    Get-Content -Path "postcss.config.js" | Select-Object -First 10
} else {
    Write-Host "❌ PostCSS configuration not found!" -ForegroundColor Red
}

Write-Host "`nAnalyzing Tailwind configuration..." -ForegroundColor Yellow
if (Test-Path -Path "tailwind.config.js") {
    Write-Host "✅ Tailwind configuration found" -ForegroundColor Green
    Get-Content -Path "tailwind.config.js" | Select-Object -First 15
} else {
    Write-Host "❌ Tailwind configuration not found!" -ForegroundColor Red
}

Write-Host "`nAnalyzing CSS Import Chain..." -ForegroundColor Yellow
$cssFiles = @(
    "src/app/globals.css",
    "src/styles/globals.css"
)

$foundCss = $false
foreach ($cssFile in $cssFiles) {
    if (Test-Path -Path $cssFile) {
        Write-Host "✅ Found CSS file: $cssFile" -ForegroundColor Green
        $cssContent = Get-Content -Path $cssFile | Select-Object -First 15
        Write-Host $cssContent
        $foundCss = $true
        break
    }
}

if (-not $foundCss) {
    Write-Host "❌ No global CSS file found!" -ForegroundColor Red
}

# Phase 3: Build Pipeline Deep Inspection
Write-Host "`n📋 PHASE 3: BUILD PIPELINE DEEP INSPECTION" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green

Write-Host "`nDo you want to run a build to inspect CSS compilation? (y/n)" -ForegroundColor Yellow
$runBuild = Read-Host

if ($runBuild -eq "y") {
    Write-Host "`nRunning build with CSS compilation logging..." -ForegroundColor Yellow
    npm run build | findstr /R "(tailwind|css|error|warning)"
    
    Write-Host "`nExamining build output structure..." -ForegroundColor Yellow
    Get-ChildItem -Path "build/static/css" -Recurse -File -Filter "*.css" | ForEach-Object {
        Write-Host "`n=== $($_.FullName) ===" -ForegroundColor Cyan
        Get-Content -Path $_.FullName -TotalCount 50
    }
} else {
    Write-Host "Skipping build phase..." -ForegroundColor Yellow
}

# Run the validation script
Write-Host "`n📋 RUNNING COMPREHENSIVE VALIDATION SCRIPT" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green

Write-Host "`nExecuting validate-tailwind.js..." -ForegroundColor Yellow
node scripts/validate-tailwind.js

Write-Host "`n🔍 TAILWIND CSS DIAGNOSTIC COMPLETE`n" -ForegroundColor Cyan
Write-Host "For more detailed information, refer to docs/TAILWIND_DIAGNOSTIC_PROTOCOL.md" -ForegroundColor Green
