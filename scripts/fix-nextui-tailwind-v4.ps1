# Fix NextUI and Tailwind CSS v4 compatibility issues
Write-Host "`nTAILWIND CSS V4 + NEXTUI COMPATIBILITY FIX`n" -ForegroundColor Cyan

# First, check if .npmrc exists and has required configurations for pnpm
$npmrcPath = ".npmrc"
$npmrcExists = Test-Path -Path $npmrcPath

if (-not $npmrcExists) {
    Write-Host "Creating .npmrc file with necessary configurations..." -ForegroundColor Yellow
    $npmrcContent = @"
# Configuration for handling peer dependency conflicts with Tailwind CSS v4
strict-peer-dependencies=false
resolution-mode=highest
auto-install-peers=true
shamefully-hoist=true
"@

    Set-Content -Path $npmrcPath -Value $npmrcContent
    Write-Host "Created .npmrc file" -ForegroundColor Green
} else {
    Write-Host "Updating .npmrc file with necessary configurations..." -ForegroundColor Yellow
    $npmrcContent = Get-Content -Path $npmrcPath -Raw
    
    $updatedContent = $npmrcContent
    
    if (-not $npmrcContent.Contains("strict-peer-dependencies=false")) {
        $updatedContent += "`nstrict-peer-dependencies=false"
    }
    
    if (-not $npmrcContent.Contains("resolution-mode=highest")) {
        $updatedContent += "`nresolution-mode=highest"
    }
    
    if (-not $npmrcContent.Contains("auto-install-peers=true")) {
        $updatedContent += "`nauto-install-peers=true"
    }
    
    if (-not $npmrcContent.Contains("shamefully-hoist=true")) {
        $updatedContent += "`nshamefully-hoist=true"
    }
      Set-Content -Path $npmrcPath -Value $updatedContent
    Write-Host "Updated .npmrc file" -ForegroundColor Green
}

# Update package.json with necessary overrides/resolutions
Write-Host "Updating package.json with necessary overrides for NextUI..." -ForegroundColor Yellow

$packageJsonPath = "package.json"
$packageJson = Get-Content -Path $packageJsonPath -Raw | ConvertFrom-Json

# Get the current Tailwind version
$tailwindVersion = $packageJson.dependencies.tailwindcss -replace '[\^~]', ''
if (-not $tailwindVersion) {
    $tailwindVersion = $packageJson.devDependencies.tailwindcss -replace '[\^~]', ''
}
if (-not $tailwindVersion) {
    $tailwindVersion = "4.1.6" # Default if not found
    Write-Host "Could not detect Tailwind version, using default: $tailwindVersion" -ForegroundColor Yellow
} else {
    Write-Host "Detected Tailwind version: $tailwindVersion" -ForegroundColor Green
}

# Add overrides property if it doesn't exist
if (-not ($packageJson.PSObject.Properties.Name -contains "overrides")) {
    $packageJson | Add-Member -Type NoteProperty -Name "overrides" -Value @{}
}

# Add NextUI overrides
$packageJson.overrides | Add-Member -Type NoteProperty -Name "@nextui-org/theme" -Value @{ "tailwindcss" = $tailwindVersion } -Force
$packageJson.overrides | Add-Member -Type NoteProperty -Name "@nextui-org/react" -Value @{ "tailwindcss" = $tailwindVersion } -Force

# Add resolutions property if it doesn't exist (for Yarn/NPM)
if (-not ($packageJson.PSObject.Properties.Name -contains "resolutions")) {
    $packageJson | Add-Member -Type NoteProperty -Name "resolutions" -Value @{}
}

# Add NextUI resolutions
$packageJson.resolutions | Add-Member -Type NoteProperty -Name "@nextui-org/theme/tailwindcss" -Value $tailwindVersion -Force
$packageJson.resolutions | Add-Member -Type NoteProperty -Name "@nextui-org/react/tailwindcss" -Value $tailwindVersion -Force

# Save the updated package.json
$packageJson | ConvertTo-Json -Depth 10 | Set-Content -Path $packageJsonPath
Write-Host "Updated package.json with NextUI compatibility overrides" -ForegroundColor Green

# Create patches directory if it doesn't exist
$patchesDir = "patches"
if (-not (Test-Path -Path $patchesDir)) {
    New-Item -ItemType Directory -Path $patchesDir
    Write-Host "Created patches directory" -ForegroundColor Green
}

Write-Host "`nRecommendation: Install and configure patch-package" -ForegroundColor Yellow
Write-Host "Run the following commands:" -ForegroundColor Yellow
Write-Host "1. npm install --save-dev patch-package postinstall-postinstall" -ForegroundColor White
Write-Host "2. Add to package.json scripts: `"postinstall`": `"patch-package`"" -ForegroundColor White
Write-Host "3. Manually modify node_modules/@nextui-org/theme/package.json:" -ForegroundColor White
Write-Host "   Change: `"tailwindcss`": `"^3.4.0`"" -ForegroundColor White
Write-Host "   To:     `"tailwindcss`": `">=3.4.0 OR ^4.0.0`"" -ForegroundColor White
Write-Host "4. Run: npx patch-package @nextui-org/theme" -ForegroundColor White

Write-Host "`nCOMPATIBILITY FIX COMPLETE`n" -ForegroundColor Cyan
Write-Host "Next steps:" -ForegroundColor Green
Write-Host "1. Reinstall dependencies: pnpm install" -ForegroundColor Green
Write-Host "2. Verify fix: npm run validate:tailwind-v4" -ForegroundColor Green
Write-Host "3. Test your application" -ForegroundColor Green
