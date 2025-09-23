# ARCO Project Structure Visualization
# This script analyzes the project structure and helps debug component loading issues

Write-Host "===== ARCO Project Structure Analysis =====" -ForegroundColor Magenta

$projectRoot = $PSScriptRoot | Split-Path -Parent
Write-Host "Project root: $projectRoot" -ForegroundColor Cyan

# Check src/components structure
Write-Host "`n=== src/components Directory Structure ===" -ForegroundColor Blue
$srcComponentsDirs = Get-ChildItem "$projectRoot\src\components" -Directory | Select-Object -ExpandProperty Name
Write-Host "Found subdirectories:" -ForegroundColor Yellow
$srcComponentsDirs | ForEach-Object { Write-Host "- $_" -ForegroundColor White }

# Check root components structure
Write-Host "`n=== Root components Directory Structure ===" -ForegroundColor Blue
$rootComponentsDirs = Get-ChildItem "$projectRoot\components" -Directory | Select-Object -ExpandProperty Name
Write-Host "Found subdirectories:" -ForegroundColor Yellow
$rootComponentsDirs | ForEach-Object { Write-Host "- $_" -ForegroundColor White }

# Count TypeScript component files
$rootComponentsCount = (Get-ChildItem "$projectRoot\components\*.tsx" | Measure-Object).Count
$srcComponentsCount = (Get-ChildItem "$projectRoot\src\components\*\*.tsx" -Recurse | Measure-Object).Count

Write-Host "`n=== Component Files Count ===" -ForegroundColor Blue
Write-Host "Components in root directory: $rootComponentsCount" -ForegroundColor Yellow
Write-Host "Components in src directory: $srcComponentsCount" -ForegroundColor Yellow

# Analyze imports - identify imports that might be problematic
Write-Host "`n=== Import Path Analysis ===" -ForegroundColor Blue
$importPattern = "(?:import\s+.*from\s+['\"]\@\/components\/.*['\"])"
$files = Get-ChildItem "$projectRoot\src" -Include "*.ts", "*.tsx" -Recurse

Write-Host "Checking for @/components imports that might cause issues..." -ForegroundColor Yellow
$files | ForEach-Object {
    $content = Get-Content $_ -Raw
    $matches = [regex]::Matches($content, $importPattern)
    if ($matches.Count -gt 0) {
        Write-Host "  File: $($_.FullName)" -ForegroundColor White
        $matches | ForEach-Object {
            Write-Host "    - $($_)" -ForegroundColor Gray
        }
    }
}

Write-Host "`n===== Analysis Complete =====" -ForegroundColor Magenta
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. If components exist in both root and src directories, consider consolidating" -ForegroundColor White
Write-Host "2. Update tsconfig.json paths if necessary" -ForegroundColor White
Write-Host "3. Verify Next.js aliases point to the correct locations" -ForegroundColor White
