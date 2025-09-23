# Limpar o cache do Next.js e iniciar o servidor de desenvolvimento

Write-Host "===== ARCO Project - Limpeza de Cache e Inicialização =====" -ForegroundColor Magenta

$projectRoot = $PSScriptRoot

# Limpar os caches
Write-Host "`nLimpando caches do Next.js..." -ForegroundColor Cyan

if (Test-Path "$projectRoot\.next") {
    Write-Host "Removendo diretório .next..." -ForegroundColor Yellow
    Remove-Item -Path "$projectRoot\.next" -Recurse -Force -ErrorAction SilentlyContinue
}

if (Test-Path "$projectRoot\node_modules\.cache") {
    Write-Host "Removendo cache do Node.js..." -ForegroundColor Yellow
    Remove-Item -Path "$projectRoot\node_modules\.cache" -Recurse -Force -ErrorAction SilentlyContinue
}

# Verificar e corrigir o tailwind.config.ts
$tailwindConfigPath = "$projectRoot\tailwind.config.ts"
if (Test-Path $tailwindConfigPath) {
    $tailwindContent = Get-Content $tailwindConfigPath -Raw
    
    # Verificar se o content inclui os componentes da raiz
    if (-not ($tailwindContent -match "'.\/components\/\*\*\/\*.{js,ts,jsx,tsx,mdx}'")) {
        Write-Host "`nAtualizando tailwind.config.ts para incluir componentes da raiz..." -ForegroundColor Yellow
        
        $tailwindContent = $tailwindContent -replace "content:\s*\[([^\]]*)\]", "content: [`$1,'./components/**/*.{js,ts,jsx,tsx,mdx}']"
        Set-Content -Path $tailwindConfigPath -Value $tailwindContent
        Write-Host "tailwind.config.ts atualizado com sucesso!" -ForegroundColor Green
    }
}

# Copiar componentes essenciais
Write-Host "`nCopiando componentes essenciais..." -ForegroundColor Cyan

# NavBarEnhanced
if (Test-Path "$projectRoot\components\NavBarEnhanced.tsx") {
    if (-not (Test-Path "$projectRoot\src\components\layout\NavBarEnhanced.tsx")) {
        Write-Host "Copiando NavBarEnhanced para src\components\layout" -ForegroundColor Yellow
        Copy-Item -Path "$projectRoot\components\NavBarEnhanced.tsx" -Destination "$projectRoot\src\components\layout\NavBarEnhanced.tsx" -Force
    }
}

# ProcessEnhanced
if (Test-Path "$projectRoot\components\ProcessEnhanced.tsx") {
    if (-not (Test-Path "$projectRoot\src\components\sections\ProcessEnhanced.tsx")) {
        Write-Host "Copiando ProcessEnhanced para src\components\sections" -ForegroundColor Yellow
        Copy-Item -Path "$projectRoot\components\ProcessEnhanced.tsx" -Destination "$projectRoot\src\components\sections\ProcessEnhanced.tsx" -Force
    }
}

# HeroARCOEnhanced
if (Test-Path "$projectRoot\components\HeroARCOEnhanced.tsx") {
    if (-not (Test-Path "$projectRoot\src\components\sections\HeroARCOEnhanced.tsx")) {
        Write-Host "Copiando HeroARCOEnhanced para src\components\sections" -ForegroundColor Yellow
        Copy-Item -Path "$projectRoot\components\HeroARCOEnhanced.tsx" -Destination "$projectRoot\src\components\sections\HeroARCOEnhanced.tsx" -Force
    }
}

# Iniciar o servidor de desenvolvimento
Write-Host "`n===== Iniciando servidor de desenvolvimento =====" -ForegroundColor Magenta
Write-Host "Executando 'npm run dev'" -ForegroundColor Cyan
Write-Host "Pressione Ctrl+C para interromper o servidor quando terminar.\n" -ForegroundColor Yellow

# Iniciar o servidor
try {
    Set-Location $projectRoot
    npm run dev
}
catch {
    Write-Host "[ERRO] Falha ao iniciar o servidor: $_" -ForegroundColor Red
    Write-Host "Tente executar 'npm run dev' manualmente." -ForegroundColor Yellow
}
