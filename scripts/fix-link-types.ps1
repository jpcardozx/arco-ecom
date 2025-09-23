# Script to fix Next.js Link href type issues
# This will add the import for createHref and fix Link components with string href values

# Create temp directory if it doesn't exist
if (-not (Test-Path -Path "temp")) {
    New-Item -ItemType Directory -Path "temp"
}

# Files to process - add more here as needed
$files = @(
    "src/components/layout/ARCONavigation.tsx",
    "src/components/layout/CleanNavigation.tsx",
    "src/components/layout/Footer.tsx",
    "src/components/layout/PremiumFooter.tsx",
    "src/components/layout/PremiumNavigation.tsx",
    "src/components/layout/ProfessionalFooter.tsx",
    "src/components/layout/ProfessionalNavigation.tsx",
    "src/components/layout/SophisticatedNavigation.tsx",
    "src/components/layout/StrategicNavigation.tsx",
    "src/components/partners/ContentSection.tsx",
    "src/components/sections/EnterpriseHero.tsx",
    "src/components/sections/EnterprisePricing.tsx",
    "src/components/sections/Hero.tsx",
    "src/components/sections/PremiumHero.tsx",
    "src/components/sections/ProfessionalCaseStudies.tsx",
    "src/components/sections/ProfessionalProof.tsx",
    "src/components/sections/ProfessionalServices.tsx",
    "src/components/sections/StrategicServices.tsx"
)

foreach ($file in $files) {
    Write-Host "Processing $file..."
    
    # Read the file content
    $content = Get-Content $file -Raw
    
    # Check if the import already exists
    if ($content -notmatch "import\s+{\s*createHref\s*}") {
        # Add the import if it doesn't exist
        $content = $content -replace "(import Link from 'next\/link'.*?)([\r\n])", "`$1`$2import { createHref } from '@/utils/navigation';`$2"
    }
    
    # Fix href={string} instances with href={createHref(string)}
    # Patterns to find and replace:
    # 1. href="/path" -> href={createHref("/path")}
    $content = $content -replace 'href="(\/[^"]*)"', 'href={createHref("$1")}'
    
    # 2. href={item.href} -> href={createHref(item.href)}
    $content = $content -replace 'href=\{([^{}]*?)\}', 'href={createHref($1)}'
    
    # 3. Special handling for template literals href={`/path/${var}`} -> href={createHref(`/path/${var}`)}
    $content = $content -replace 'href=\{(`[^`]*?`)\}', 'href={createHref($1)}'
    
    # Write the content to a temporary file
    $content | Set-Content "temp\$(Split-Path $file -Leaf)"
    
    # Replace the original file if the temp file was created successfully
    if (Test-Path "temp\$(Split-Path $file -Leaf)") {
        Copy-Item "temp\$(Split-Path $file -Leaf)" -Destination $file -Force
        Write-Host "Updated $file"
    } else {
        Write-Host "Failed to process $file"
    }
}

# Clean up
Remove-Item -Path "temp" -Recurse -Force

Write-Host "All files processed successfully!"
