# ARCO: Configuração e Implementação de Autenticação Segura

## Visão Geral da Arquitetura de Segurança

O ARCO implementa um sistema de autenticação robusto e compatível com padrões empresariais usando NextAuth.js. Este sistema foi desenvolvido seguindo os princípios de segurança enterprise-grade:

1. **Segurança em Profundidade** - Múltiplas camadas de proteção
2. **Princípio do Menor Privilégio** - Concessão do mínimo de permissões necessárias
3. **Defesa em Camadas** - Proteções redundantes para segurança robusta
4. **Auditabilidade Completa** - Capacidade de rastreamento e análise de eventos de segurança

## Índice

1. [Configuração do Ambiente](#configuração-do-ambiente)
2. [Provedores de Autenticação](#provedores-de-autenticação)
   - [Credenciais (Email/Senha)](#credenciais-emailsenha)
   - [OAuth com Google](#oauth-com-google)
   - [OAuth com GitHub](#oauth-com-github)
3. [Armazenamento de Usuários](#armazenamento-de-usuários)
4. [Segurança Avançada](#segurança-avançada)
   - [Hash de Senhas](#hash-de-senhas)
   - [Proteção contra Ataques](#proteção-contra-ataques)
   - [Controle de Acesso Baseado em Funções (RBAC)](#controle-de-acesso-baseado-em-funções-rbac)
   - [Cabeçalhos de Segurança HTTP](#cabeçalhos-de-segurança-http)
5. [JWT e Gestão de Sessão](#jwt-e-gestão-de-sessão)
6. [Operação em Produção](#operação-em-produção)
7. [Análise de Riscos e Mitigações](#análise-de-riscos-e-mitigações)
8. [Referências de Segurança](#referências-de-segurança)

## Configuração do Ambiente

### Variáveis de Ambiente Essenciais

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```bash
# Autenticação
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=sua_chave_secreta_muito_longa_e_aleatoria

# Provedores OAuth
GITHUB_ID=seu_github_client_id
GITHUB_SECRET=seu_github_client_secret
GOOGLE_CLIENT_ID=seu_google_client_id
GOOGLE_CLIENT_SECRET=seu_google_client_secret

# Banco de dados (escolha um)
DATABASE_URL=postgresql://usuario:senha@localhost:5432/arco
# OU
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/arco
```

### Geração de Secret Seguro

É **crítico** usar um secret criptograficamente seguro. Use um destes métodos:

```bash
# Método 1: OpenSSL (recomendado para produção)
openssl rand -base64 64

# Método 2: Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
```

## Provedores de Autenticação

### Credenciais (Email/Senha)

Para implementação de produção, use um algoritmo de hash seguro como bcrypt:

1. Instale as dependências necessárias:

   ```bash
   npm install bcryptjs
   npm install -D @types/bcryptjs
   ```

2. Funções recomendadas para gestão de senhas:

   ```typescript
   import bcrypt from 'bcryptjs';

   // Hash de senha (use em cadastro/redefinição)
   export async function hashPassword(password: string): Promise<string> {
     const saltRounds = 12;
     return await bcrypt.hash(password, saltRounds);
   }

   // Verificação de senha (use em login)
   export async function verifyPassword(
     password: string,
     hashedPassword: string
   ): Promise<boolean> {
     return await bcrypt.compare(password, hashedPassword);
   }
   ```

### OAuth com Google

#### Configuração do Console Google Cloud:

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Navegue para "APIs & Serviços" → "Credenciais"
4. Clique em "Criar Credenciais" → "ID do Cliente OAuth"
5. Configure a tela de consentimento OAuth:

   - Tipo de usuário: Externo
   - Nome do aplicativo: ARCO
   - Logo: Faça upload do logo da empresa
   - Domínio da página inicial: seu-dominio.com
   - Escopos autorizados: .../auth/userinfo.email, .../auth/userinfo.profile
   - E-mail de contato para suporte: seu-email@empresa.com

6. Configure o cliente OAuth:

   - Tipo de aplicação: Aplicativo da Web
   - Nome: ARCO Web Client
   - Origens JavaScript autorizadas:
     - http://localhost:3000 (desenvolvimento)
     - https://seu-dominio.com (produção)
   - URIs de redirecionamento autorizados:
     - http://localhost:3000/api/auth/callback/google (desenvolvimento)
     - https://seu-dominio.com/api/auth/callback/google (produção)

7. Copie o ID do cliente e o segredo do cliente para suas variáveis de ambiente

### OAuth com GitHub

#### Configuração no GitHub:

1. Acesse [GitHub Developer Settings](https://github.com/settings/developers)
2. Clique em "New OAuth App" (ou edite um existente)
3. Preencha os campos:

   - Nome do aplicativo: ARCO
   - URL da página inicial: https://seu-dominio.com
   - Descrição do aplicativo: Sistema de gestão empresarial ARCO
   - URL de callback da autorização:
     - http://localhost:3000/api/auth/callback/github (desenvolvimento)
     - https://seu-dominio.com/api/auth/callback/github (produção)

4. Clique em "Register application"
5. Gere um novo segredo do cliente
6. Copie o ID do cliente e o segredo do cliente para suas variáveis de ambiente

## Armazenamento de Usuários

### Integração com Bancos de Dados

Selecione um adaptador de banco de dados baseado nas necessidades da sua empresa:

#### PostgreSQL (via Prisma)

1. Instale os pacotes necessários:

   ```bash
   npm install @prisma/client @next-auth/prisma-adapter
   npm install -D prisma
   ```

2. Inicialize e configure o Prisma:

   ```bash
   npx prisma init
   ```

3. Configure seu schema Prisma em `prisma/schema.prisma`:

   ```prisma
   model User {
     id            String    @id @default(cuid())
     name          String?
     email         String?   @unique
     emailVerified DateTime?
     image         String?
     password      String?
     role          String    @default("user")
     accounts      Account[]
     sessions      Session[]
   }

   model Account {
     id                String  @id @default(cuid())
     userId            String
     type              String
     provider          String
     providerAccountId String
     refresh_token     String? @db.Text
     access_token      String? @db.Text
     expires_at        Int?
     token_type        String?
     scope             String?
     id_token          String? @db.Text
     session_state     String?

     user User @relation(fields: [userId], references: [id], onDelete: Cascade)

     @@unique([provider, providerAccountId])
   }

   model Session {
     id           String   @id @default(cuid())
     sessionToken String   @unique
     userId       String
     expires      DateTime
     user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
   }

   model VerificationToken {
     identifier String
     token      String   @unique
     expires    DateTime

     @@unique([identifier, token])
   }
   ```

4. Execute a migração do banco de dados:
   ```bash
   npx prisma migrate dev --name init
   ```

#### MongoDB

1. Instale os pacotes necessários:

   ```bash
   npm install mongodb @next-auth/mongodb-adapter
   ```

2. Crie o arquivo de conexão em `src/lib/mongodb.ts`:

   ```typescript
   import { MongoClient } from 'mongodb';

   if (!process.env.MONGODB_URI) {
     throw new Error('MONGODB_URI não está configurado nas variáveis de ambiente');
   }

   let client;
   let clientPromise: Promise<MongoClient>;

   const options = {
     useUnifiedTopology: true,
     useNewUrlParser: true,
   };

   if (process.env.NODE_ENV === 'development') {
     if (!global._mongoClientPromise) {
       client = new MongoClient(process.env.MONGODB_URI, options);
       global._mongoClientPromise = client.connect();
     }
     clientPromise = global._mongoClientPromise;
   } else {
     client = new MongoClient(process.env.MONGODB_URI, options);
     clientPromise = client.connect();
   }

   export default clientPromise;
   ```

## Segurança Avançada

### Hash de Senhas

A implementação atual utiliza bcrypt para hash seguro de senhas:

```typescript
import bcrypt from 'bcryptjs';

// Hash de senha (10 rounds para equilíbrio entre segurança e desempenho)
const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Verificação de senha em tempo constante para evitar ataques de timing
const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};
```

> **Importante**: O bcrypt é preferível ao SHA-256 e outros algoritmos de hash não específicos para senhas, pois foi projetado especificamente para dificultar ataques de força bruta, com funções de derivação de chave com custo computacional elevado e salt integrado.

### Proteção Contra Ataques

#### Rate Limiting (Limitação de Taxa)

Implementação robusta de limitação de taxa para prevenir ataques de força bruta:

```typescript
// Em memória para desenvolvimento (use Redis em produção)
const loginAttempts: Record<string, { count: number; lastAttempt: number }> = {};

const checkRateLimit = (
  identifier: string,
  maxAttempts = 5,
  windowMs = 15 * 60 * 1000
): boolean => {
  const now = Date.now();

  // Limpar entradas antigas
  for (const key in loginAttempts) {
    if (now - loginAttempts[key].lastAttempt > windowMs) {
      delete loginAttempts[key];
    }
  }

  // Verificar se está limitado
  if (!loginAttempts[identifier]) {
    loginAttempts[identifier] = { count: 0, lastAttempt: now };
  }

  const attempt = loginAttempts[identifier];

  // Se muitas tentativas
  if (attempt.count >= maxAttempts) {
    return false;
  }

  // Incrementar contador de tentativas
  attempt.count++;
  attempt.lastAttempt = now;
  return true;
};
```

#### Prevenção de User Enumeration

Técnicas implementadas:

1. **Tempo Constante**: Mesmo tempo de resposta independentemente de o usuário existir ou não
2. **Mensagens Genéricas**: Mensagens de erro não revelam se o email existe
3. **Mesmo Fluxo**: Fluxos idênticos para credenciais válidas e inválidas

#### Proteção Contra Session Hijacking

1. **Validação de Tokens**: Verificação de integridade e propriedades de token
2. **Informações de Dispositivo**: (Recomendado para produção) Verificação de fingerprint do dispositivo
3. **Refresh Token Rotation**: Implementar rotação de tokens de atualização

### Controle de Acesso Baseado em Funções (RBAC)

O sistema implementa RBAC robusto para controlar o acesso com granularidade:

```typescript
// No middleware
const authorized = ({ token, req }) => {
  const path = req.nextUrl.pathname;

  // Verificar integridade do token
  if (token && (!token.id || !token.role)) {
    console.warn('Token com estrutura inválida detectado');
    return false;
  }

  // Rotas administrativas
  if (path.startsWith('/dashboard/admin')) {
    return token?.role === 'admin';
  }

  // Rotas de análise - apenas admin e gerentes
  if (path.startsWith('/dashboard/analytics')) {
    return ['admin', 'manager'].includes(token?.role);
  }

  // Rotas específicas para clientes
  if (path.startsWith('/dashboard/clients')) {
    return ['admin', 'manager', 'client'].includes(token?.role);
  }

  // Para todas as outras rotas do dashboard, requer autenticação com função válida
  return !!token && !!token.role;
};
```

### Cabeçalhos de Segurança HTTP

Os seguintes cabeçalhos de segurança são implementados para mitigar várias categorias de ataques:

| Cabeçalho                 | Valor                                                        | Propósito                             |
| ------------------------- | ------------------------------------------------------------ | ------------------------------------- |
| X-Frame-Options           | DENY                                                         | Prevenção de clickjacking             |
| X-Content-Type-Options    | nosniff                                                      | Prevenção de MIME sniffing            |
| Referrer-Policy           | strict-origin-when-cross-origin                              | Controle de informações de referência |
| Permissions-Policy        | camera=(), microphone=(), geolocation=(), interest-cohort=() | Restrição de recursos do navegador    |
| Content-Security-Policy   | Configuração rigorosa                                        | Prevenção de XSS                      |
| Strict-Transport-Security | max-age=63072000; includeSubDomains; preload                 | Força conexões HTTPS                  |

Exemplo de implementação no middleware:

```typescript
// Adicionar cabeçalhos de segurança
response.headers.set('X-Frame-Options', 'DENY');
response.headers.set('X-Content-Type-Options', 'nosniff');
response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
response.headers.set(
  'Permissions-Policy',
  'camera=(), microphone=(), geolocation=(), interest-cohort=()'
);

// CSP rigoroso em produção
const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://analytics.arco.com https://vercel.live",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https://*.arco.com blob:",
  "connect-src 'self' https://api.arco.com https://analytics.arco.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

response.headers.set('Content-Security-Policy', cspDirectives);

// HSTS em produção
if (process.env.NODE_ENV === 'production') {
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
}
```

### Autenticação de Dois Fatores (2FA)

Para implementação futura, considere adicionar 2FA usando TOTP:

1. Instale a biblioteca necessária:

   ```bash
   npm install @simplewebauthn/server @simplewebauthn/browser otplib
   ```

2. Implemente a geração e verificação de códigos OTP

### Logs de Auditoria e Monitoramento

Recomendações para produção:

1. **Registro Centralizado**: Integração com um serviço de logging central
2. **Alertas de Segurança**: Configuração de alertas para atividades suspeitas
3. **Análise Regular**: Revisão periódica de logs e tentativas de acesso
4. **Retenção de Logs**: Políticas claras de retenção de logs de segurança

## JWT e Gestão de Sessão

### Configuração de JWT Segura

O sistema implementa uma estratégia robusta para tokens JWT:

```typescript
// Configuração de JWT e sessão
session: {
  strategy: "jwt" as const,
  maxAge: 7 * 24 * 60 * 60, // 7 dias
  updateAge: 24 * 60 * 60,  // Atualiza o token 24h antes de expirar
},

jwt: {
  secret: process.env.NEXTAUTH_SECRET,
  maxAge: 7 * 24 * 60 * 60, // 7 dias
  // encryption: true,      // Habilite em produção para usar JWE (JWT encriptado)
},
```

### Cookies Seguros

Configuração robusta de cookies para máxima segurança:

```typescript
cookies: {
  sessionToken: {
    name: `__Secure-next-auth.session-token`,
    options: {
      httpOnly: true,        // Impede acesso via JavaScript
      sameSite: 'lax',       // Previne CSRF
      path: '/',
      secure: process.env.NODE_ENV === 'production', // HTTPS apenas em produção
      maxAge: 7 * 24 * 60 * 60,
    }
  },
  callbackUrl: {
    name: `__Secure-next-auth.callback-url`,
    options: {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: process.env.NODE_ENV === 'production',
    }
  },
  csrfToken: {
    name: `__Host-next-auth.csrf-token`,
    options: {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: process.env.NODE_ENV === 'production',
    }
  },
},
```

### Callbacks Seguros

Implementação cuidadosa dos callbacks para evitar vazamento de informações sensíveis:

```typescript
callbacks: {
  async jwt({ token, user, account }) {
    // Adicionar apenas informações essenciais
    if (user) {
      token.id = user.id;
      token.role = user.role || "user";
      token.emailVerified = user.emailVerified || null;
    }

    if (account?.provider) {
      token.provider = account.provider;
    }

    return token;
  },

  async session({ session, token }) {
    // Adicionar apenas dados autorizados à sessão do lado do cliente
    if (token && session.user) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.provider = token.provider;
    }

    // Nunca expor dados sensíveis na sessão
    return session;
  },

  async redirect({ url, baseUrl }) {
    // Permitir redirecionamentos apenas para nosso próprio domínio
    if (url.startsWith(baseUrl)) return url;
    if (url.startsWith('/')) return `${baseUrl}${url}`;
    return baseUrl;
  }
},
```

## Operação em Produção

### Lista de Verificação de Segurança para Produção

✅ Usar HTTPS para toda a comunicação  
✅ Configurar CSP (Content Security Policy) adequadamente  
✅ Implementar rotação regular de tokens  
✅ Usar senhas com hash e salt seguros (bcrypt)  
✅ Implementar limitação de taxa (rate limiting)  
✅ Configurar cabeçalhos de segurança HTTP  
✅ Usar cookies seguros (HttpOnly, Secure, SameSite)  
✅ Implementar RBAC (Controle de Acesso Baseado em Funções)  
✅ Validação rigorosa de entradas do usuário  
✅ Logs de auditoria para eventos críticos  
✅ Monitoramento contínuo de segurança
✅ Implementar expiração de sessão apropriada  
✅ Configurar CORS adequadamente  
✅ Armazenar secrets fora do controle de versão  
✅ Implementar monitoramento de segurança

## Solução de Problemas

### Problemas Comuns e Soluções

#### Erro: "PKCE não verificado"

- **Causa**: Configuração incorreta de callback URL
- **Solução**: Verifique se as URLs de callback no provedor OAuth correspondem exatamente às URLs em sua aplicação

#### Erro: "Erro de JWT inválido"

- **Causa**: Secret do NextAuth incorreto ou comprometido
- **Solução**: Regenere o NEXTAUTH_SECRET e atualize em seus ambientes

#### Erro: "Solicitação não autorizada"

- **Causa**: Token expirado ou problemas de CORS
- **Solução**: Verifique a configuração de CORS e a validade do token

---

**Observação sobre segurança**: Este documento é confidencial e contém informações sensíveis sobre a segurança do ARCO. Compartilhe apenas com pessoal autorizado.

---

© 2025 ARCO Enterprise Solutions
