Write-Host "Iniciando processo de correção do TailwindCSS v4..."

# Limpar o cache
Write-Host "Limpando caches..."
if (Test-Path ".next") {
    Remove-Item -Recurse -Force .next
    Write-Host "Cache .next removido"
}

# Reinstalar pacotes específicos
Write-Host "Reinstalando pacotes específicos..."
pnpm install @tailwindcss/postcss@latest tailwindcss@latest postcss@latest --save-dev

# Verificar se tudo está instalado corretamente
Write-Host "Verificando instalação..."
pnpm list @tailwindcss/postcss tailwindcss postcss

# Executar build
Write-Host "Executando build..."
pnpm run build
