#!/usr/bin/env pwsh
# CSS Architecture Validation Script
# Validates the consolidated Tailwind CSS architecture

Write-Host "CSS ARCO Tailwind CSS Architecture Validation" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan

# Check for CSS conflicts
Write-Host "`n1. Checking for CSS file conflicts..." -ForegroundColor Yellow

$cssFiles = @(
    "src/styles/globals.css",
    "src/app/globals.css", 
    "src/app/tailwind-utilities.css",
    "src/app/additional-tailwind-utilities.css"
)

$existingFiles = @()
$backupFiles = @()

foreach ($file in $cssFiles) {
    if (Test-Path $file) {
        $existingFiles += $file
        Write-Host "   CONFLICT: $file exists" -ForegroundColor Red
    } elseif (Test-Path "$file.backup") {
        $backupFiles += "$file.backup"
        Write-Host "   BACKUP: $file.backup found" -ForegroundColor Green
    }
}

if ($existingFiles.Count -eq 1 -and $existingFiles[0] -eq "src/styles/globals.css") {
    Write-Host "   CSS ARCHITECTURE: Single source of truth confirmed" -ForegroundColor Green
} else {
    Write-Host "   CSS ARCHITECTURE: Multiple CSS files detected" -ForegroundColor Red
}

# Validate Tailwind compilation
Write-Host "`n2. Validating Tailwind CSS compilation..." -ForegroundColor Yellow

try {
    npx tailwindcss -i ./src/styles/globals.css -o ./validation-output.css 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   COMPILATION: Tailwind CSS compiles successfully" -ForegroundColor Green
        Remove-Item ./validation-output.css -ErrorAction SilentlyContinue
    } else {
        Write-Host "   COMPILATION: Tailwind CSS compilation failed" -ForegroundColor Red
    }
} catch {
    Write-Host "   COMPILATION: Failed to run Tailwind CSS" -ForegroundColor Red
}

# Check for missing shadow classes
Write-Host "`n3. Checking for critical CSS classes..." -ForegroundColor Yellow

$requiredClasses = @("shadow-soft", "shadow-medium", "shadow-large")
$cssContent = Get-Content "src/styles/globals.css" -Raw

foreach ($class in $requiredClasses) {
    if ($cssContent -match "\.$class") {
        Write-Host "   CLASS: .$class is defined" -ForegroundColor Green
    } else {
        Write-Host "   CLASS: .$class is missing" -ForegroundColor Red
    }
}

# Check for executive trust section classes
Write-Host "`n4. Checking for Executive Trust Section classes..." -ForegroundColor Yellow

$trustClasses = @(
    "executive-trust-section",
    "executive-trust-card", 
    "executive-standards-summary",
    "executive-container"
)

foreach ($class in $trustClasses) {
    if ($cssContent -match "\.$class") {
        Write-Host "   TRUST: .$class is defined" -ForegroundColor Green
    } else {
        Write-Host "   TRUST: .$class is missing" -ForegroundColor Red
    }
}

Write-Host "`n===============================================" -ForegroundColor Cyan
Write-Host "VALIDATION COMPLETE" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan

Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "   1. Open http://localhost:3000 in your browser" -ForegroundColor White
Write-Host "   2. Scroll to the 'Enterprise Standards' section" -ForegroundColor White
Write-Host "   3. Verify that all styles are properly applied" -ForegroundColor White
