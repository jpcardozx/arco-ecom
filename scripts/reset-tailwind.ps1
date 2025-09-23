Write-Host "Iniciando processo de reinicialização do TailwindCSS..."

# Limpar o cache
Write-Host "Limpando caches..."
if (Test-Path ".next") {
    Remove-Item -Recurse -Force .next
    Write-Host "Cache .next removido"
}

# Remover arquivos de build
if (Test-Path ".next/cache") {
    Remove-Item -Recurse -Force .next/cache
    Write-Host "Cache Webpack/SWC removido"
}

Write-Host "Atualizando dependências..."
pnpm install

Write-Host "Executando build de desenvolvimento..."
pnpm run dev
