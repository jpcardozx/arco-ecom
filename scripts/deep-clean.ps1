Write-Host "Iniciando limpeza profunda do projeto..." -ForegroundColor Green

# Remover diretórios de build e cache
Write-Host "Removendo diretórios de build e cache..." -ForegroundColor Cyan
if (Test-Path ".next") {
    Remove-Item -Recurse -Force .next
    Write-Host "  ✓ Cache .next removido" -ForegroundColor Green
}

if (Test-Path "build") {
    Remove-Item -Recurse -Force build
    Write-Host "  ✓ Diretório build removido" -ForegroundColor Green
}

if (Test-Path "node_modules/.cache") {
    Remove-Item -Recurse -Force node_modules/.cache
    Write-Host "  ✓ Cache do Node removido" -ForegroundColor Green
}

# Remover arquivo de cache do TypeScript
if (Test-Path "tsconfig.tsbuildinfo") {
    Remove-Item -Force tsconfig.tsbuildinfo
    Write-Host "  ✓ Cache do TypeScript removido" -ForegroundColor Green
}

# Verificar dependências do projeto
Write-Host "Reinstalando dependências do projeto..." -ForegroundColor Cyan
pnpm install

# Reconstruir o projeto
Write-Host "Reconstruindo o projeto com opções de depuração..." -ForegroundColor Cyan
$env:NEXT_SKIP_TYPE_CHECKS = "true"
$env:NEXT_SKIP_LINT = "true"
$env:NEXT_TELEMETRY_DISABLED = "1"

# Limpar a variável de ambiente NODE_OPTIONS se existir
if ($env:NODE_OPTIONS) {
    $oldNodeOptions = $env:NODE_OPTIONS
    $env:NODE_OPTIONS = ""
    Write-Host "  ✓ NODE_OPTIONS temporariamente limpo: $oldNodeOptions" -ForegroundColor Yellow
}

Write-Host "Executando build com opções mínimas..." -ForegroundColor Cyan
pnpm run build:win

# Restaurar NODE_OPTIONS se foi salvo anteriormente
if ($oldNodeOptions) {
    $env:NODE_OPTIONS = $oldNodeOptions
    Write-Host "  ✓ NODE_OPTIONS restaurado: $oldNodeOptions" -ForegroundColor Yellow
}

Write-Host "Processo de limpeza e reconstrução concluído!" -ForegroundColor Green
Write-Host "Execute 'pnpm run dev' para iniciar o servidor de desenvolvimento." -ForegroundColor Magenta
