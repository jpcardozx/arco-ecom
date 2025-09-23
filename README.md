# ARCO - Plataforma Inteligente de Afiliados

## 🚀 Visão Geral

ARCO é uma plataforma moderna de afiliados desenvolvida com **S-Tier Clean Architecture**, oferecendo visualização detalhada de produtos, parsing inteligente de URLs e interface premium para e-commerce.

## ✨ Características Principais

### 🎯 **Core Features**
- **📊 Visualização Detalhada de Produtos** - Sistema completo de parsing de URLs do Mercado Livre, Amazon e outras plataformas
- **🤖 Parsing Inteligente** - Extração automática de dados de produtos via HTTP com análise contextual
- **💎 Interface S-Tier** - Design system profissional com 400+ design tokens
- **⚡ Performance Otimizada** - Build otimizado, loading rápido, experiência fluida

### 🏗️ **Arquitetura S-Tier**
- **Clean Architecture** - Separação clara de responsabilidades
- **Type-Safe** - TypeScript em 100% do código
- **Configuration-Driven** - Zero hardcoding, tudo configurável
- **Hierarchical Data Sources** - Sistema de dados hierárquico e limpo

## 🛠️ Stack Tecnológica

- **Framework**: Next.js 15.3.1 (App Router)
- **Linguagem**: TypeScript
- **Styling**: Tailwind CSS + Design Tokens customizados
- **UI Components**: Radix UI + Design System próprio
- **Validação**: Zod
- **Icons**: Lucide React
- **Deploy**: Vercel

## 📁 Estrutura do Projeto

```
src/
├── app/                          # App Router do Next.js
│   ├── api/                      # API Routes
│   │   ├── parse-link/          # Parser de URLs de produtos
│   │   └── products/            # CRUD de produtos
│   ├── produto/view/            # Visualização detalhada
│   └── ...
├── components/                   # Componentes React
│   ├── design-system/           # Design System components
│   ├── ecommerce/              # Componentes de e-commerce
│   └── business/               # Componentes de negócio
├── lib/                         # Utilities e configurações
│   ├── config/                 # Configuração centralizada
│   ├── data-sources/           # Sources de dados hierárquicos
│   ├── design-system/          # Design tokens e sistema
│   └── types/                  # Definições de tipos
└── styles/                     # Estilos globais
```

## 🚦 Como Executar

### Pré-requisitos
- Node.js 18+
- npm ou pnpm

### Instalação
```bash
# Clone o repositório
git clone https://github.com/[username]/arco-affiliate-platform.git
cd arco-affiliate-platform

# Instale as dependências
npm install
# ou
pnpm install

# Execute em modo desenvolvimento
npm run dev
# ou
pnpm dev
```

### Build para Produção
```bash
# Build otimizado
npm run build
npm run start

# ou
pnpm build
pnpm start
```

## 🔧 Configuração

### Environment Variables
```env
# Opcional - para imagens do Unsplash
UNSPLASH_ACCESS_KEY=your_key_here

# Opcional - para analytics
NEXT_PUBLIC_GA_ID=your_ga_id_here
```

## 📊 Features Implementadas

### ✅ **Sistema de Parsing de Produtos**
- Parser automático de URLs do Mercado Livre
- Extração inteligente de dados (título, preço, imagens, especificações)
- Suporte a modo básico e detalhado
- Inferência automática de categoria e marca

### ✅ **Visualização Detalhada**
- Interface em abas (Especificações, Características, Vendedor, Frete)
- Galeria de imagens com thumbnails
- Informações completas do produto
- Design responsivo e moderno

### ✅ **Design System S-Tier**
- 400+ design tokens profissionais
- Sistema de cores hierárquico
- Componentes reutilizáveis
- Tipografia e espaçamento consistentes

### ✅ **Performance**
- Build otimizado (3.0s build time)
- Code splitting automático
- Imagens otimizadas
- SEO-friendly

## 🎨 Design System

O projeto implementa um design system completo com:

- **Cores**: Sistema hierárquico com 50-950 shades
- **Tipografia**: Escalas responsive com line-heights otimizados
- **Espaçamento**: Sistema baseado em rem para consistência
- **Componentes**: Variants type-safe para buttons, cards, inputs
- **Animations**: Transições fluidas e profissionais

## 📱 Funcionalidades

### Parsing de URLs
```typescript
// Exemplo de uso da API
GET /api/parse-link?url=https://mercadolivre.com/produto&detailed=true

// Retorna dados estruturados do produto
{
  "success": true,
  "title": "Produto Extraído",
  "price": 1299.99,
  "rating": 4.5,
  "features": [...],
  "specifications": {...}
}
```

### Visualização Detalhada
- Acesse `/produto/view?url=URL_ENCODED` para ver detalhes completos
- Interface moderna com tabs e galeria
- Informações de vendedor, frete e disponibilidade

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte o repositório ao Vercel
2. Configure as environment variables (opcionais)
3. Deploy automático em cada push

### Outras Plataformas
O projeto é compatível com qualquer plataforma que suporte Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## 📈 Roadmap

### Próximas Features
- [ ] Sistema de usuários e autenticação
- [ ] Dashboard de analytics avançado
- [ ] Integração com APIs reais de afiliados
- [ ] Sistema de comparação de preços
- [ ] Notificações de mudanças de preço

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

Desenvolvido com ❤️ usando S-Tier Clean Architecture e as melhores práticas de desenvolvimento.

---

**ARCO** - Transformando links em oportunidades de negócio 🚀
├── design-system/  # Design system
├── lib/           # Utilities
├── types/         # TypeScript types
└── styles/        # Global styles
```

## Development

```bash
npm run dev
npm run build
npm run test
```
