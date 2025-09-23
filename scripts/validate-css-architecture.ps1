#!/usr/bin/env pwsh
# CSS Architecture Validation Script
# Validates the consolidated Tailwind CSS architecture

Write-Host "🔍 ARCO Tailwind CSS Architecture Validation" -ForegroundColor Cyan
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
        Write-Host "   ❌ CONFLICT: $file exists" -ForegroundColor Red
    } elseif (Test-Path "$file.backup") {
        $backupFiles += "$file.backup"
        Write-Host "   ✅ BACKUP: $file.backup found" -ForegroundColor Green
    }
}

if ($existingFiles.Count -eq 1 -and $existingFiles[0] -eq "src/styles/globals.css") {
    Write-Host "   ✅ CSS ARCHITECTURE: Single source of truth confirmed" -ForegroundColor Green
} else {
    Write-Host "   ❌ CSS ARCHITECTURE: Multiple CSS files detected" -ForegroundColor Red
}

# Validate Tailwind compilation
Write-Host "`n2. Validating Tailwind CSS compilation..." -ForegroundColor Yellow

try {
    $output = npx tailwindcss -i ./src/styles/globals.css -o ./validation-output.css 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   ✅ COMPILATION: Tailwind CSS compiles successfully" -ForegroundColor Green
        Remove-Item ./validation-output.css -ErrorAction SilentlyContinue
    } else {
        Write-Host "   ❌ COMPILATION: Tailwind CSS compilation failed" -ForegroundColor Red
        Write-Host "   Error: $output" -ForegroundColor Red
    }
} catch {
    Write-Host "   ❌ COMPILATION: Failed to run Tailwind CSS" -ForegroundColor Red
}

# Check for missing shadow classes
Write-Host "`n3. Checking for critical CSS classes..." -ForegroundColor Yellow

$requiredClasses = @("shadow-soft", "shadow-medium", "shadow-large")
$cssContent = Get-Content "src/styles/globals.css" -Raw

foreach ($class in $requiredClasses) {
    if ($cssContent -match "\.$class\s*{") {
        Write-Host "   ✅ CLASS: .$class is defined" -ForegroundColor Green
    } else {
        Write-Host "   ❌ CLASS: .$class is missing" -ForegroundColor Red
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
    if ($cssContent -match "\.$class\s*{") {
        Write-Host "   ✅ TRUST: .$class is defined" -ForegroundColor Green
    } else {
        Write-Host "   ❌ TRUST: .$class is missing" -ForegroundColor Red
    }
}

# Validate import in layout.tsx
Write-Host "`n5. Validating CSS import in layout..." -ForegroundColor Yellow

$layoutContent = Get-Content "src/app/layout.tsx" -Raw
if ($layoutContent -match 'import\s+["\'\'`]\.\.\/styles\/globals\.css["\'\'`]') {
    Write-Host "   ✅ IMPORT: globals.css correctly imported in layout.tsx" -ForegroundColor Green
} else {
    Write-Host "   ❌ IMPORT: globals.css import not found in layout.tsx" -ForegroundColor Red
}

# Check for duplicate @layer components
Write-Host "`n6. Checking for duplicate CSS layers..." -ForegroundColor Yellow

$componentLayers = ($cssContent | Select-String "@layer components" -AllMatches).Matches.Count
if ($componentLayers -le 1) {
    Write-Host "   ✅ LAYERS: No duplicate @layer components found" -ForegroundColor Green
} else {
    Write-Host "   ❌ LAYERS: $componentLayers @layer components found (should be 1)" -ForegroundColor Red
}

# Final validation summary
Write-Host "`n===============================================" -ForegroundColor Cyan
Write-Host "📊 VALIDATION SUMMARY" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan

$issues = 0
if ($existingFiles.Count -ne 1) { $issues++ }
if ($componentLayers -gt 1) { $issues++ }

if ($issues -eq 0) {
    Write-Host "🎉 SUCCESS: Tailwind CSS architecture is properly configured!" -ForegroundColor Green
    Write-Host "   The Enterprise Standards section should now display correctly." -ForegroundColor Green
} else {
    Write-Host "⚠️  WARNING: $issues architecture issues detected" -ForegroundColor Yellow
    Write-Host "   Please review the issues above and fix them." -ForegroundColor Yellow
}

Write-Host "`n🚀 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Open http://localhost:3000 in your browser" -ForegroundColor White
Write-Host "   2. Scroll to the 'Enterprise Standards' section" -ForegroundColor White
Write-Host "   3. Verify that all styles are properly applied" -ForegroundColor White
Write-Host "   4. Check browser DevTools for any CSS errors" -ForegroundColor White
