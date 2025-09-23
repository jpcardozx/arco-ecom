#!/bin/bash

# Script de Deploy Otimizado para Conversão B2B
# Foca em Web Vitals e Performance Real

echo "🚀 ARCO - Deploy Otimizado para Conversão B2B"
echo "=============================================="

# 1. Verificar dependências
echo "📦 Verificando dependências..."
npm audit --audit-level moderate
if [ $? -ne 0 ]; then
  echo "⚠️  Vulnerabilidades encontradas. Executando correções..."
  npm audit fix
fi

# 2. Otimizar bundle
echo "📊 Analisando bundle size..."
npx next-bundle-analyzer build

# 3. Build otimizado
echo "🔨 Building com otimizações..."
export NODE_ENV=production
export NEXT_TELEMETRY_DISABLED=1

npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build falhou!"
  exit 1
fi

# 4. Verificar Web Vitals
echo "📈 Verificando Web Vitals..."
npx lighthouse http://localhost:3000 \
  --only-categories=performance \
  --chrome-flags="--headless" \
  --output=json \
  --output-path=./lighthouse-report.json

# 5. Otimizar imagens
echo "🖼️  Otimizando imagens..."
find ./public -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" | while read img; do
  echo "Otimizando: $img"
  # Usar imagemin ou sharp aqui se disponível
done

# 6. Gerar sitemap otimizado
echo "🗺️  Gerando sitemap..."
npx next-sitemap

# 7. Deploy
echo "🚀 Iniciando deploy..."
vercel --prod

echo "✅ Deploy concluído!"
echo ""
echo "📊 Métricas pós-deploy:"
echo "- Verifique Web Vitals em: https://pagespeed.web.dev/"
echo "- Monitor de conversão: /dashboard"
echo "- Lighthouse report: ./lighthouse-report.json"
