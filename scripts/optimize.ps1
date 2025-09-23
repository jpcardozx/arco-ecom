# ARCO Quick Health Check & Fix
# PowerShell optimization script

param(
    [string]$Action = "health"
)

function Write-Status {
    param($Status, $Message)
    $Color = if ($Status -eq "OK") { "Green" } elseif ($Status -eq "ERROR") { "Red" } else { "Yellow" }
    $Icon = if ($Status -eq "OK") { "✅" } elseif ($Status -eq "ERROR") { "❌" } else { "⚠️" }
    Write-Host "$Icon $Message" -ForegroundColor $Color
}

function Test-TypeScript {
    Write-Host "🔍 Checking TypeScript..." -ForegroundColor Cyan
    
    $result = & npm run check-types 2>&1
    $success = $LASTEXITCODE -eq 0
    
    if ($success) {
        Write-Status "OK" "TypeScript: No errors"
    } else {
        Write-Status "ERROR" "TypeScript: Errors found"
        Write-Host $result -ForegroundColor Red
    }
    
    return $success
}

function Test-DevServer {
    Write-Host "🔍 Checking dev server..." -ForegroundColor Cyan
    
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3000" -TimeoutSec 5 -ErrorAction Stop
        $success = $response.StatusCode -eq 200
        Write-Status "OK" "Dev Server: Running (200)"
    } catch {
        $success = $false
        Write-Status "ERROR" "Dev Server: Not responding"
    }
    
    return $success
}

function Test-CriticalFiles {
    Write-Host "🔍 Checking critical files..." -ForegroundColor Cyan
    
    $criticalFiles = @(
        "src\app\page.tsx",
        "src\design-system\core\theme.ts",
        "package.json"
    )
    
    $missing = @()
    foreach ($file in $criticalFiles) {
        if (-not (Test-Path $file)) {
            $missing += $file
        }
    }
    
    if ($missing.Count -eq 0) {
        Write-Status "OK" "Critical files: All present"
        return $true
    } else {
        Write-Status "ERROR" "Missing files: $($missing -join ', ')"
        return $false
    }
}

function Fix-CommonIssues {
    Write-Host "🔧 Fixing common issues..." -ForegroundColor Cyan
    
    # Clear Next.js cache
    if (Test-Path ".next") {
        Remove-Item ".next" -Recurse -Force
        Write-Status "OK" "Cleared .next cache"
    }
    
    # Check use client directives
    $themeFile = "src\design-system\core\theme.ts"
    if (Test-Path $themeFile) {
        $content = Get-Content $themeFile -Raw
        if ($content -match "createContext" -and $content -notmatch '^"use client"') {
            Write-Status "WARN" "theme.ts may need 'use client' directive"
        }
    }
}

function Get-BuildPerformance {
    Write-Host "📊 Performance check..." -ForegroundColor Cyan
    
    $buildStart = Get-Date
    & npm run build | Out-Null
    $buildTime = (Get-Date) - $buildStart
    
    $success = $LASTEXITCODE -eq 0
    
    if ($success) {
        Write-Status "OK" "Build time: $($buildTime.TotalSeconds.ToString('F1'))s"
        
        # Check bundle size
        if (Test-Path ".next") {
            $size = (Get-ChildItem ".next" -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
            Write-Status "OK" "Bundle size: $($size.ToString('F1'))MB"
            
            if ($size -gt 1) {
                Write-Status "WARN" "Bundle size > 1MB (target: less than 250KB)"
            }
        }
    } else {
        Write-Status "ERROR" "Build failed"
    }
}

# Main execution
switch ($Action.ToLower()) {
    "health" {
        Write-Host "🎯 ARCO Health Check" -ForegroundColor Magenta
        Write-Host "=" * 50
        
        $tsOk = Test-TypeScript
        $serverOk = Test-DevServer  
        $filesOk = Test-CriticalFiles
        
        $overall = $tsOk -and $serverOk -and $filesOk
        
        Write-Host ""
        if ($overall) {
            Write-Status "OK" "Overall health: GOOD"
        } else {
            Write-Status "ERROR" "Overall health: ISSUES FOUND"
        }
    }
    
    "fix" {
        Fix-CommonIssues
    }
    
    "perf" {
        Get-BuildPerformance
    }
    
    "all" {
        Write-Host "🎯 ARCO Complete Check" -ForegroundColor Magenta
        Write-Host "=" * 50
        
        $tsOk = Test-TypeScript
        $serverOk = Test-DevServer
        $filesOk = Test-CriticalFiles
        
        if (-not ($tsOk -and $serverOk -and $filesOk)) {
            Write-Host ""
            Fix-CommonIssues
        }
        
        Write-Host ""
        Get-BuildPerformance
    }
    
    default {
        Write-Host "Usage: .\scripts\optimize.ps1 [health|fix|perf|all]" -ForegroundColor Yellow
    }
}
