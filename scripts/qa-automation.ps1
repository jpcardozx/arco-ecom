# =================================================================
# ARCO QA Automation Suite - PowerShell Version
# Automated testing and validation for UI/UX improvements
# =================================================================

param(
    [string]$Phase = "all",
    [switch]$Verbose = $false
)

# Colors for output
$Colors = @{
    Red = 'Red'
    Green = 'Green'
    Yellow = 'Yellow'
    Blue = 'Cyan'
    Reset = 'White'
}

# Test results tracking
$Script:TestsPassed = 0
$Script:TestsFailed = 0
$Script:Warnings = 0

# =================================================================
# UTILITY FUNCTIONS
# =================================================================

function Write-Success {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor $Colors.Green
    $Script:TestsPassed++
}

function Write-Error {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor $Colors.Red
    $Script:TestsFailed++
}

function Write-Warning {
    param([string]$Message)
    Write-Host "⚠️  $Message" -ForegroundColor $Colors.Yellow
    $Script:Warnings++
}

function Write-Info {
    param([string]$Message)
    Write-Host "ℹ️  $Message" -ForegroundColor $Colors.Blue
}

function Test-FileExists {
    param([string]$Path, [string]$Description)
    
    if (Test-Path $Path) {
        Write-Success "$Description exists"
        return $true
    } else {
        Write-Error "$Description missing: $Path"
        return $false
    }
}

function Test-FileContains {
    param([string]$Path, [string]$Pattern, [string]$Description)
    
    if (Test-Path $Path) {
        $content = Get-Content $Path -Raw
        if ($content -match $Pattern) {
            Write-Success "$Description found"
            return $true
        } else {
            Write-Warning "$Description not found in $Path"
            return $false
        }
    } else {
        Write-Error "Cannot check $Description - file missing: $Path"
        return $false
    }
}

# =================================================================
# PHASE 1: FOUNDATION VALIDATION
# =================================================================

function Test-FoundationSystems {
    Write-Host ""
    Write-Host "🏗️  PHASE 1: FOUNDATION SYSTEMS VALIDATION" -ForegroundColor $Colors.Blue
    Write-Host "=========================================="
    
    # Design Tokens
    Write-Host "Validating Design Tokens..."
    if (Test-FileExists "src/tokens/design-tokens.ts" "Design tokens file") {
        Test-FileContains "src/tokens/design-tokens.ts" "export const designTokens" "Design tokens export"
        Test-FileContains "src/tokens/design-tokens.ts" "colors" "Color tokens"
        Test-FileContains "src/tokens/design-tokens.ts" "spacing" "Spacing tokens"
        Test-FileContains "src/tokens/design-tokens.ts" "elevation" "Elevation tokens"
    }
    
    # Glassmorphism System
    Write-Host "Validating Glassmorphism System..."
    if (Test-FileExists "src/styles/system/glassmorphism.css" "Glassmorphism CSS file") {
        Test-FileContains "src/styles/system/glassmorphism.css" "\.glass-premium" "Glass premium class"
        Test-FileContains "src/styles/system/glassmorphism.css" "\.glass-technical" "Glass technical class"
        Test-FileContains "src/styles/system/glassmorphism.css" "\.depth-" "Depth system classes"
        Test-FileContains "src/styles/system/glassmorphism.css" "\.glow-" "Glow effect classes"
    }
    
    # Spacing System
    Write-Host "Validating Spacing System..."
    if (Test-FileExists "src/styles/system/spacing.css" "Spacing CSS file") {
        Test-FileContains "src/styles/system/spacing.css" "\.section-spacing" "Section spacing classes"
        Test-FileContains "src/styles/system/spacing.css" "\.container-centered" "Container classes"
        Test-FileContains "src/styles/system/spacing.css" "\.component-spacing" "Component spacing classes"
    }
}

# =================================================================
# PHASE 2: COMPONENT VALIDATION
# =================================================================

function Test-Components {
    Write-Host ""
    Write-Host "🧩 PHASE 2: COMPONENT VALIDATION" -ForegroundColor $Colors.Blue
    Write-Host "==============================="
    
    # InteractiveAssessmentExperience
    Write-Host "Validating InteractiveAssessmentExperience..."
    if (Test-FileExists "src/components/sections/InteractiveAssessmentExperience.tsx" "InteractiveAssessmentExperience component") {
        Test-FileContains "src/components/sections/InteractiveAssessmentExperience.tsx" "Simule Sua Transformação Digital" "Updated copy"
        Test-FileContains "src/components/sections/InteractiveAssessmentExperience.tsx" "container-centered" "Container spacing"
        Test-FileContains "src/components/sections/InteractiveAssessmentExperience.tsx" "section-spacing" "Section spacing"
    }
    
    # SuperiorNavigation
    Write-Host "Validating SuperiorNavigation..."
    if (Test-FileExists "src/components/layout/SuperiorNavigation.tsx" "SuperiorNavigation component") {
        $hasGlass = Test-FileContains "src/components/layout/SuperiorNavigation.tsx" "glass-" "Glassmorphism classes"
        if (-not $hasGlass) {
            Write-Warning "Navigation needs glassmorphism classes - pending implementation"
        }
    }
    
    # Badge System
    Write-Host "Validating Badge System..."
    if (Test-FileExists "src/components/ui/design-system/STierBadge.tsx" "STierBadge component") {
        Write-Success "STierBadge component found"
    } else {
        Write-Warning "STierBadge component missing - needs implementation"
    }
}

# =================================================================
# PHASE 3: BUILD VALIDATION
# =================================================================

function Test-Build {
    Write-Host ""
    Write-Host "🔧 PHASE 3: BUILD & COMPILATION VALIDATION" -ForegroundColor $Colors.Blue
    Write-Host "========================================="
    
    # TypeScript compilation
    Write-Host "Running TypeScript compilation..."
    try {
        $buildResult = npm run build 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Build compilation successful"
        } else {
            Write-Error "Build compilation failed"
            if ($Verbose) {
                Write-Host $buildResult -ForegroundColor $Colors.Red
            }
        }
    } catch {
        Write-Error "Build command failed to execute"
    }
    
    # ESLint validation
    Write-Host "Running ESLint validation..."
    try {
        $lintResult = npm run lint 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Success "ESLint validation passed"
        } else {
            Write-Warning "ESLint issues found - review required"
            if ($Verbose) {
                Write-Host $lintResult -ForegroundColor $Colors.Yellow
            }
        }
    } catch {
        Write-Warning "ESLint command failed to execute"
    }
}

# =================================================================
# PHASE 4: PERFORMANCE VALIDATION
# =================================================================

function Test-Performance {
    Write-Host ""
    Write-Host "⚡ PHASE 4: PERFORMANCE VALIDATION" -ForegroundColor $Colors.Blue
    Write-Host "================================"
    
    # Check if dev server is running
    Write-Host "Checking development server status..."
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3001" -TimeoutSec 5 -ErrorAction Stop
        Write-Success "Development server is running on port 3001"
        
        # Basic performance check
        Write-Host "Running basic performance check..."
        $stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
        $response = Invoke-WebRequest -Uri "http://localhost:3001" -ErrorAction Stop
        $stopwatch.Stop()
        
        $responseTime = $stopwatch.ElapsedMilliseconds
        
        if ($responseTime -lt 1000) {
            Write-Success "Response time: ${responseTime}ms (Good)"
        } elseif ($responseTime -lt 3000) {
            Write-Warning "Response time: ${responseTime}ms (Acceptable)"
        } else {
            Write-Error "Response time: ${responseTime}ms (Poor - Needs optimization)"
        }
    } catch {
        Write-Warning "Development server not running - performance tests skipped"
    }
}

# =================================================================
# PHASE 5: ASSET VALIDATION
# =================================================================

function Test-Assets {
    Write-Host ""
    Write-Host "📦 PHASE 5: ASSET & DEPENDENCY VALIDATION" -ForegroundColor $Colors.Blue
    Write-Host "========================================"
    
    # Check for missing assets
    Write-Host "Checking for critical assets..."
    Test-FileExists "public/icons/logo-v2-192.png" "PWA icon"
    
    # Check package.json for redundant dependencies
    Write-Host "Checking for redundant animation libraries..."
    if (Test-Path "package.json") {
        $packageJson = Get-Content "package.json" -Raw
        
        if ($packageJson -match '"gsap"') {
            Write-Warning "GSAP still in dependencies - should be removed"
        } else {
            Write-Success "GSAP not found in dependencies"
        }
        
        if ($packageJson -match '"react-spring"') {
            Write-Warning "React Spring still in dependencies - should be removed"
        } else {
            Write-Success "React Spring not found in dependencies"
        }
    }
}

# =================================================================
# PHASE 6: ACCESSIBILITY VALIDATION
# =================================================================

function Test-Accessibility {
    Write-Host ""
    Write-Host "♿ PHASE 6: ACCESSIBILITY VALIDATION" -ForegroundColor $Colors.Blue
    Write-Host "=================================="
    
    # Check for accessibility patterns
    Write-Host "Checking accessibility patterns..."
    
    $componentFiles = Get-ChildItem -Path "src/components" -Filter "*.tsx" -Recurse
    
    $altTextCount = 0
    $ariaCount = 0
    
    foreach ($file in $componentFiles) {
        $content = Get-Content $file.FullName -Raw
        if ($content -match 'alt=') { $altTextCount++ }
        if ($content -match 'aria-') { $ariaCount++ }
    }
    
    if ($altTextCount -gt 0) {
        Write-Success "Alt texts found in $altTextCount components"
    } else {
        Write-Warning "No alt texts found - review image accessibility"
    }
    
    if ($ariaCount -gt 0) {
        Write-Success "ARIA attributes found in $ariaCount components"
    } else {
        Write-Warning "Limited ARIA attributes - review accessibility"
    }
}

# =================================================================
# MAIN EXECUTION
# =================================================================

function Show-Results {
    Write-Host ""
    Write-Host "📊 QA VALIDATION RESULTS" -ForegroundColor $Colors.Blue
    Write-Host "======================="
    Write-Host "Tests Passed: $Script:TestsPassed" -ForegroundColor $Colors.Green
    Write-Host "Tests Failed: $Script:TestsFailed" -ForegroundColor $Colors.Red
    Write-Host "Warnings: $Script:Warnings" -ForegroundColor $Colors.Yellow
    Write-Host ""
    
    $totalTests = $Script:TestsPassed + $Script:TestsFailed
    if ($totalTests -gt 0) {
        $passRate = [math]::Round(($Script:TestsPassed / $totalTests) * 100, 1)
        Write-Host "Pass Rate: $passRate%"
    } else {
        Write-Host "Pass Rate: N/A"
    }
    
    Write-Host ""
    Write-Host "🎯 IMMEDIATE ACTIONS REQUIRED" -ForegroundColor $Colors.Blue
    Write-Host "============================="
    
    if ($Script:TestsFailed -gt 0) {
        Write-Host "CRITICAL: $Script:TestsFailed tests failed - immediate attention required" -ForegroundColor $Colors.Red
    }
    
    if ($Script:Warnings -gt 3) {
        Write-Host "HIGH: $Script:Warnings warnings found - review and fix recommended" -ForegroundColor $Colors.Yellow
    }
    
    Write-Host ""
    Write-Host "Priority Actions:"
    Write-Host "1. Fix any failed tests above"
    Write-Host "2. Address performance issues (LCP > 4s)"
    Write-Host "3. Apply glassmorphism to navigation"
    Write-Host "4. Remove redundant animation libraries"
    Write-Host "5. Add missing PWA assets"
    
    Write-Host ""
    Write-Host "🚀 Ready for next phase of implementation!" -ForegroundColor $Colors.Green
}

# =================================================================
# SCRIPT EXECUTION
# =================================================================

Write-Host "🎯 ARCO QA AUTOMATION SUITE" -ForegroundColor $Colors.Blue
Write-Host "=========================="
Write-Host "Starting comprehensive QA validation..."

switch ($Phase.ToLower()) {
    "foundation" { Test-FoundationSystems }
    "components" { Test-Components }
    "build" { Test-Build }
    "performance" { Test-Performance }
    "assets" { Test-Assets }
    "accessibility" { Test-Accessibility }
    "all" {
        Test-FoundationSystems
        Test-Components
        Test-Build
        Test-Performance
        Test-Assets
        Test-Accessibility
    }
    default {
        Write-Error "Invalid phase: $Phase. Valid options: foundation, components, build, performance, assets, accessibility, all"
        exit 1
    }
}

Show-Results

# Exit with appropriate code
if ($Script:TestsFailed -gt 0) {
    exit 1
} else {
    exit 0
}
