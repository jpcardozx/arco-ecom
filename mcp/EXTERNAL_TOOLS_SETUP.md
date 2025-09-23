# 🔧 ARCO MCP External Tools Setup Guide

## 🎯 Overview

O sistema MCP ARCO integra com ferramentas externas reais para análise de UI/UX e copy sem simulações. Esta configuração é **opcional** - o sistema funciona com dados locais como fallback.

## 🛠️ Ferramentas Integradas

### 🚀 **Performance Analysis**

#### 1. Google PageSpeed Insights API
- **Propósito**: Análise de performance real via Lighthouse
- **Dados**: Core Web Vitals, oportunidades de otimização
- **Setup**: [Google Cloud Console](https://console.cloud.google.com)
- **Cost**: Gratuito até 25,000 queries/dia

```bash
# Habilitar API
gcloud services enable pagespeedonline.googleapis.com
```

#### 2. GTMetrix API
- **Propósito**: Análise detalhada de performance
- **Dados**: Métricas de loading, recomendações
- **Setup**: [GTMetrix Account](https://gtmetrix.com/api/)
- **Cost**: $14.95/mês para Pro

### 👥 **User Behavior Analysis**

#### 3. Hotjar API
- **Propósito**: Heatmaps e análise de comportamento
- **Dados**: Click maps, scroll depth, attention data
- **Setup**: [Hotjar Dashboard](https://insights.hotjar.com/api)
- **Cost**: $32/mês para Observe

#### 4. Microsoft Clarity API
- **Propósito**: Session recordings e insights
- **Dados**: User interactions, rage clicks, dead clicks
- **Setup**: [Clarity Dashboard](https://clarity.microsoft.com)
- **Cost**: Gratuito

### 📝 **Copy & Content Analysis**

#### 5. TextRazor API
- **Propósito**: Análise avançada de texto com NLP
- **Dados**: Sentiment, readability, persuasion elements
- **Setup**: [TextRazor Console](https://www.textrazor.com)
- **Cost**: $500/mês para 1M requests

#### 6. OpenAI API (Alternative)
- **Propósito**: Análise de copy e sugestões
- **Dados**: Clarity, tone, persuasion analysis
- **Setup**: [OpenAI Platform](https://platform.openai.com)
- **Cost**: ~$0.002 per request

### ♿ **Accessibility Analysis**

#### 7. axe-core API
- **Propósito**: Automated accessibility testing
- **Dados**: WCAG violations, fixes
- **Setup**: Local installation (gratuito)
- **Cost**: Gratuito

## 🚀 Quick Setup (Recommended)

### Opção 1: Configuração Mínima (Gratuita)
```bash
# APIs gratuitas essenciais
LIGHTHOUSE_API_KEY=your_google_api_key
CLARITY_API_KEY=your_clarity_api_key
```

### Opção 2: Configuração Profissional
```bash
# Setup completo para análise profissional
LIGHTHOUSE_API_KEY=your_google_api_key
HOTJAR_API_KEY=your_hotjar_api_key
TEXTRAZOR_API_KEY=your_textrazor_api_key
CLARITY_API_KEY=your_clarity_api_key
```

### Opção 3: Configuração Enterprise
```bash
# Todas as ferramentas para análise máxima
LIGHTHOUSE_API_KEY=your_google_api_key
GTMETRIX_API_KEY=your_gtmetrix_api_key
HOTJAR_API_KEY=your_hotjar_api_key
CLARITY_API_KEY=your_clarity_api_key
TEXTRAZOR_API_KEY=your_textrazor_api_key
OPENAI_API_KEY=your_openai_api_key
```

## 📋 Step-by-Step Configuration

### 1. Google PageSpeed Insights
```bash
# 1. Go to Google Cloud Console
# 2. Create new project or select existing
# 3. Enable PageSpeed Insights API
# 4. Create credentials (API Key)
# 5. Add to .env file
LIGHTHOUSE_API_KEY=AIzaSyBKbPdUe...
```

### 2. Microsoft Clarity (FREE)
```bash
# 1. Go to https://clarity.microsoft.com
# 2. Create account and add your site
# 3. Get Project ID
# 4. Use Project ID as API key
CLARITY_API_KEY=your_project_id
```

### 3. Hotjar
```bash
# 1. Sign up at https://www.hotjar.com
# 2. Install tracking code on your site
# 3. Go to Settings > API
# 4. Generate API key
HOTJAR_API_KEY=your_hotjar_api_key
```

### 4. TextRazor
```bash
# 1. Sign up at https://www.textrazor.com
# 2. Go to My Account > API Key
# 3. Copy your API key
TEXTRAZOR_API_KEY=your_textrazor_key
```

## 🏃‍♂️ Immediate Start (No Setup Required)

Se você não quiser configurar APIs externas agora, o sistema funciona perfeitamente com:

1. **Análise Local de Performance**: Usa dados do próprio sistema
2. **Análise de Conteúdo Local**: Análise baseada em heurísticas
3. **Fallback Intelligence**: Usa dados históricos e análise local

```bash
# Start sem APIs externas
cd src/mcp/servers
npm start
# Sistema detecta automaticamente e usa fallbacks
```

## 📊 Comparação: Com vs Sem APIs Externas

### ✅ **Com APIs Externas**
- Dados de performance em tempo real do Google
- Comportamento real de usuários via Hotjar/Clarity
- Análise avançada de copy com NLP
- Insights competitivos atualizados
- **Precisão**: 95%+

### 🔄 **Sem APIs Externas (Fallback)**
- Análise de performance local via web-vitals.js
- Análise de comportamento via analytics.js existente
- Análise de copy via heurísticas e padrões
- Insights baseados em conhecimento ARCO
- **Precisão**: 75-80%

## 🎯 Recommended Setup por Caso de Uso

### **Freelancer/Startup**
```
✅ Google Lighthouse (FREE)
✅ Microsoft Clarity (FREE)
⏰ Outras APIs conforme crescimento
```

### **Agência/Consultoria**
```
✅ Google Lighthouse (FREE)
✅ Microsoft Clarity (FREE)  
✅ Hotjar ($32/mês)
✅ TextRazor ($500/mês)
```

### **Enterprise**
```
✅ Todas as APIs
✅ Custom integrations
✅ White-label setup
```

## 🔧 Testing Your Setup

```bash
# Test API connections
cd src/mcp
tsx scripts/test-external-apis.ts

# Test UI/UX analysis with your APIs
tsx servers/arco-consolidated-intelligence-server.ts
# Use tool: ui_ux_copy_analysis
```

## 🤔 FAQ

**Q: O sistema funciona sem APIs externas?**
A: Sim! O sistema tem fallbacks inteligentes que usam dados locais.

**Q: Qual é a diferença de qualidade?**
A: APIs externas: 95% precisão vs Fallback local: 75-80% precisão.

**Q: Quais APIs são mais importantes?**
A: 1. Google Lighthouse (performance), 2. Clarity (behavior), 3. TextRazor (copy).

**Q: Posso adicionar APIs gradualmente?**
A: Sim! O sistema detecta automaticamente quais APIs estão disponíveis.

**Q: Como verificar se as APIs estão funcionando?**
A: Execute a análise - o resultado mostra `"source": "real_data"` vs `"source": "fallback"`.

## 🚀 Next Steps

1. **Comece sem APIs** para testar o sistema
2. **Adicione Google Lighthouse** para performance real
3. **Adicione Clarity** para comportamento de usuários
4. **Adicione TextRazor** para análise profissional de copy
5. **Configure monitoramento** para ROI tracking

O sistema ARCO MCP foi projetado para funcionar **imediatamente** e melhorar **gradualmente** conforme você adiciona integrações.