# Script de Limpeza Completa para Resolver Erros 500
# PowerShell script para resolver problemas de cache e servidor

Write-Host "🔧 INICIANDO LIMPEZA COMPLETA DO NEXT.JS" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green

# 1. Parar todos os processos Node.js
Write-Host "`n1. 🛑 Parando processos Node.js..." -ForegroundColor Yellow
try {
    taskkill /F /IM node.exe 2>$null
    Write-Host "   ✅ Processos Node.js finalizados" -ForegroundColor Green
} catch {
    Write-Host "   ℹ️  Nenhum processo Node.js ativo" -ForegroundColor Blue
}

# 2. Limpar caches do Next.js
Write-Host "`n2. 🧹 Limpando caches..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force .next
    Write-Host "   ✅ Cache .next removido" -ForegroundColor Green
} else {
    Write-Host "   ℹ️  Cache .next não encontrado" -ForegroundColor Blue
}

if (Test-Path "node_modules/.cache") {
    Remove-Item -Recurse -Force node_modules/.cache
    Write-Host "   ✅ Cache node_modules removido" -ForegroundColor Green
} else {
    Write-Host "   ℹ️  Cache node_modules não encontrado" -ForegroundColor Blue
}

# 3. Aguardar um momento
Write-Host "`n3. ⏳ Aguardando limpeza completa..." -ForegroundColor Yellow
Start-Sleep -Seconds 2

# 4. Reinstalar dependências se necessário
Write-Host "`n4. 📦 Verificando dependências..." -ForegroundColor Yellow
if (Test-Path "package-lock.json") {
    Write-Host "   ✅ Dependencies OK" -ForegroundColor Green
} else {
    Write-Host "   🔄 Reinstalando dependências..." -ForegroundColor Yellow
    npm install
}

# 5. Iniciar servidor
Write-Host "`n5. 🚀 Iniciando servidor limpo..." -ForegroundColor Yellow
Write-Host "   Servidor será iniciado em nova janela..." -ForegroundColor Blue
Write-Host "`n📋 INSTRUÇÕES FINAIS:" -ForegroundColor Cyan
Write-Host "   1. Abra http://localhost:3000 em nova aba" -ForegroundColor White
Write-Host "   2. Se ainda houver erros, use Ctrl+Shift+R" -ForegroundColor White
Write-Host "   3. Ou teste em aba privada/incógnita" -ForegroundColor White
Write-Host "`n✅ Limpeza concluída! Iniciando servidor..." -ForegroundColor Green

# Iniciar o servidor
Start-Process -FilePath "npm" -ArgumentList "run", "dev" -NoNewWindow
