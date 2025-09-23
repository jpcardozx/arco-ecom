# Guia de Configuração - Vercel Dashboard

## ✅ Status Atual
- **Build Local**: Funcionando perfeitamente ✓
- **Supabase + MongoDB**: Operando em harmonia ✓
- **Next.js 15**: Compatibilidade completa ✓
- **Problema**: Variáveis de ambiente não configuradas no Vercel

## 🚀 Configuração no Vercel Dashboard

### 1. Acessar Configurações do Projeto
1. Vá para [vercel.com/dashboard](https://vercel.com/dashboard)
2. Clique no projeto **arco-affiliate-platform**
3. Vá para **Settings** → **Environment Variables**

### 2. Adicionar Variáveis OBRIGATÓRIAS

#### MongoDB (CRÍTICO)
```
MONGODB_URI = mongodb+srv://Vercel-Admin-atlas-pink-jacket:QNVhAnBNkeiV5nqx@atlas-pink-jacket.u53iu1b.mongodb.net/?retryWrites=true&w=majority&appName=atlas-pink-jacket
MONGODB_DB = arco-production
```

#### Supabase Storage (CRÍTICO)
```
NEXT_PUBLIC_SUPABASE_URL = https://mylflnfybdccavfllieu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15bGZsbmZ5YmRjY2F2ZmxsaWV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2Njc2NjMsImV4cCI6MjA3NDI0MzY2M30.IRi9vZWBN8hwSJJ1IWTIo7VDZv_qIAWUuQY8mQZ3fwc
```

#### Autenticação (CRÍTICO)
```
NEXTAUTH_SECRET = your-super-secret-key-minimum-32-characters-for-production
NEXTAUTH_URL = https://arco-affiliate-platform.vercel.app
```

### 3. Configurar Ambiente
- **Environment**: Selecione `Production`, `Preview`, e `Development`
- **Branch**: Deixe em branco para aplicar a todas as branches

### 4. Deploy e Teste
Após adicionar as variáveis:
1. Clique em **Save** para cada variável
2. Vá para **Deployments**
3. Clique em **Redeploy** no último deployment
4. Aguarde o build completar

## 🔧 Funcionalidades Configuradas

### Supabase Storage (Em Harmonia com MongoDB)
- **Função**: Armazenamento de imagens de produtos
- **Integração**: Upload automático via API `/api/products/import`
- **Componente**: `ImageUpload` para interface admin
- **Endpoint**: `/api/products/images` para uploads manuais

### MongoDB
- **Função**: Dados estruturados dos produtos
- **Collections**: `products`, `users`, `analytics`
- **Harmonia**: Supabase URL salva nos documentos MongoDB

## ⚠️ Pontos de Atenção

### 1. Build Error Atual
```
Error: supabaseUrl is required.
    at createClient (/vercel/path0/.next/server/chunks/123.js:1:234)
```

### 2. Solução Implementada
- Fallback values configurados no client
- Verificação dinâmica de credenciais
- Graceful degradation quando Supabase indisponível

### 3. Pós-Deploy
- Testar upload de imagens no admin
- Verificar integração MongoDB + Supabase
- Validar funcionalidade completa

## 📝 Próximos Passos

1. ✅ Configurar variáveis no Vercel
2. 🔄 Redeploy do projeto
3. 🧪 Testar funcionalidades
4. 🎨 Otimizar design system (sem poluição)

---

**Nota**: O Supabase opera em perfeita harmonia com MongoDB - um cuida das imagens, outro dos dados estruturados. Sistema robusto e escalável.