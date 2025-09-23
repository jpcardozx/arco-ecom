Write-Host "Verificando e corrigindo conflitos de dependências..." -ForegroundColor Cyan

# Atualizar pacotes específicos
pnpm install next@latest @tailwindcss/postcss@latest tailwindcss@latest postcss@latest --save-dev

Write-Host "Verificação de dependências concluída!" -ForegroundColor Green
