# Script de Limpeza Completa para Resolver Erros 500
Write-Host "INICIANDO LIMPEZA COMPLETA DO NEXT.JS" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green

# 1. Parar todos os processos Node.js
Write-Host "`n1. Parando processos Node.js..." -ForegroundColor Yellow
try {
    taskkill /F /IM node.exe 2>$null
    Write-Host "   Processos Node.js finalizados" -ForegroundColor Green
} catch {
    Write-Host "   Nenhum processo Node.js ativo" -ForegroundColor Blue
}

# 2. Limpar caches do Next.js
Write-Host "`n2. Limpando caches..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force .next
    Write-Host "   Cache .next removido" -ForegroundColor Green
} else {
    Write-Host "   Cache .next nao encontrado" -ForegroundColor Blue
}

if (Test-Path "node_modules/.cache") {
    Remove-Item -Recurse -Force node_modules/.cache
    Write-Host "   Cache node_modules removido" -ForegroundColor Green
} else {
    Write-Host "   Cache node_modules nao encontrado" -ForegroundColor Blue
}

# 3. Aguardar um momento
Write-Host "`n3. Aguardando limpeza completa..." -ForegroundColor Yellow
Start-Sleep -Seconds 2

# 4. Iniciar servidor
Write-Host "`n4. Iniciando servidor limpo..." -ForegroundColor Yellow
Write-Host "`nINSTRUCOES FINAIS:" -ForegroundColor Cyan
Write-Host "   1. Abra http://localhost:3000 em nova aba" -ForegroundColor White
Write-Host "   2. Se ainda houver erros, use Ctrl+Shift+R" -ForegroundColor White
Write-Host "   3. Ou teste em aba privada/incognita" -ForegroundColor White
Write-Host "`nLimpeza concluida!" -ForegroundColor Green
