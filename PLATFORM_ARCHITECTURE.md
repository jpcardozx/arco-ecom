# ARCO Platform Architecture Overview

## 🏗️ Dual-Purpose Platform Structure

This project implements a **dual-architecture system** with clear separation between:

### 1. 🎯 Marketing Campaign Platform (`/`)
**Purpose**: Lead generation, brand awareness, and service marketing
- **Target**: Business owners seeking marketing optimization services
- **Focus**: Conversion-optimized landing pages, testimonials, service explanations
- **Tech Stack**: Next.js 15, Tailwind CSS, Professional UI components
- **Content**: High-converting copy, case studies, service descriptions

### 2. 🛒 E-commerce Affiliate Platform (`/ecommerce`)
**Purpose**: Affiliate marketing management and product monetization
- **Target**: Affiliates and e-commerce marketers
- **Focus**: Product catalogs, commission tracking, affiliate integrations
- **Integrations**: Amazon Associates, Magazine Luiza, Shopee, MercadoLivre
- **Tech Stack**: OAuth 2.0, REST APIs, Real-time analytics

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Marketing landing page
│   └── ecommerce/
│       └── page.tsx                # Affiliate marketplace
│
├── components/
│   ├── business/                   # Marketing-focused components
│   │   ├── layouts/CompleteLandingPage.tsx
│   │   └── sections/               # Hero, testimonials, pricing
│   └── ecommerce/                  # E-commerce components
│       └── AffiliateMarketplace.tsx
│
├── lib/
│   ├── affiliate/                  # Affiliate integration logic
│   │   ├── base-client.ts          # OAuth 2.0 base implementation
│   │   └── amazon-client.ts        # Amazon Associates API
│   ├── content/
│   │   └── professional-copy.ts    # High-converting marketing copy
│   └── unsplash.ts                 # Professional image management
│
└── styles/
    └── globals.css                 # ARCO design system + utilities
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ (required for modern CLI tools)
- pnpm (package manager)
- Git

### Installation
```bash
# Clone repository
git clone <repository-url>
cd arco-main

# Install dependencies
pnpm install

# Setup environment
cp .env.example .env.local
# Fill in your affiliate API credentials

# Start development server
pnpm dev
```

### Access Points
- **Marketing Platform**: `http://localhost:3000/`
- **Affiliate Marketplace**: `http://localhost:3000/ecommerce`

## 🔗 Affiliate Integrations

### Supported Platforms

#### 1. Amazon Associates 🛒
- **Commission**: Up to 10%
- **Products**: Millions of items across all categories
- **API**: Product Advertising API (PAAPI 5.0)
- **Features**: Real-time pricing, reviews, inventory

#### 2. Magazine Luiza Parceiro 🛍️
- **Commission**: Up to 8%
- **Market**: Leading Brazilian retailer
- **Features**: Local payment methods, fast shipping
- **Integration**: REST API with OAuth 2.0

#### 3. Shopee Affiliate 🎯
- **Commission**: Up to 12%
- **Focus**: Fashion, beauty, electronics
- **Features**: Social commerce, gamification
- **Growth**: Fast-expanding platform

#### 4. MercadoLivre (Planned) 📦
- **Market**: Latin America's largest marketplace
- **Integration**: In development

### OAuth 2.0 Flow Implementation

```typescript
// Example: Amazon Associates authentication
const amazonClient = new AmazonAffiliateClient('your-partner-tag');

// 1. Generate auth URL
const authUrl = amazonClient.getAuthUrl('state123');

// 2. Handle callback and exchange code
const credentials = await amazonClient.exchangeCodeForToken(code);

// 3. Make authenticated requests
const products = await amazonClient.getProducts({
  keywords: 'smartphone',
  category: 'Electronics'
});
```

## 🎨 Design System

### ARCO Brand Tokens
- **Primary**: `#436099` (San Marino Blue)
- **Dark**: `#1A263D` (Deep Navy)
- **Typography**: Ruwudu (display), Lora (body)
- **Spacing**: Consistent scale from 0.25rem to 4rem

### Professional Assets
- **Images**: High-quality Unsplash API integration
- **Icons**: Lucide React (consistent, professional)
- **Components**: shadcn/ui base with ARCO customizations

### Visual Enhancements
- Glassmorphism effects with backdrop-blur
- Gradient mesh backgrounds for depth
- Micro-animations and hover effects
- Advanced shadow system for premium feel

## 📊 Performance Features

### Marketing Platform
- **SEO Optimized**: Semantic HTML, meta tags, structured data
- **Conversion Focused**: A/B tested copy, clear CTAs
- **Mobile First**: Responsive design with touch-friendly interactions
- **Analytics Ready**: Google Analytics, Facebook Pixel integration

### E-commerce Platform
- **Real-time Data**: Live product prices and availability
- **Commission Tracking**: Accurate attribution and reporting
- **Rate Limiting**: API request optimization
- **Caching**: Redis integration for performance

## 🔒 Security Considerations

### Authentication
- JWT-based session management
- OAuth 2.0 for affiliate platform access
- Secure credential storage (environment variables)

### API Security
- Rate limiting on all endpoints
- CORS configuration
- Input validation and sanitization
- Webhook signature verification

### Data Protection
- No sensitive data in localStorage
- Encrypted database connections
- GDPR-compliant data handling

## 🚀 Deployment

### Environment Configuration
```bash
# Production deployment
NODE_ENV=production
MOCK_AFFILIATE_APIs=false

# Security
JWT_SECRET=your-production-secret
SESSION_SECRET=your-session-secret

# Database
DATABASE_URL=your-production-database
REDIS_URL=your-redis-instance
```

### Platform Separation Benefits
1. **Independent Scaling**: Marketing and e-commerce can scale differently
2. **Different User Experiences**: Optimized for different user types
3. **Separate Analytics**: Clear attribution for each platform
4. **Isolated Updates**: Changes don't affect both platforms
5. **Security Isolation**: Different access patterns and security needs

## 📈 Analytics & Monitoring

### Key Metrics

#### Marketing Platform
- Conversion rates by traffic source
- Cost per lead (CPL)
- Customer lifetime value (CLV)
- Page performance metrics

#### E-commerce Platform
- Affiliate conversion rates
- Commission earnings
- Top-performing products
- Platform-specific metrics

### Monitoring Tools
- **Error Tracking**: Sentry integration
- **Performance**: Core Web Vitals monitoring
- **User Behavior**: Hotjar heatmaps and recordings
- **API Monitoring**: Response times and error rates

## 🤝 Contributing

### Code Style
- TypeScript strict mode
- ESLint + Prettier configuration
- Conventional commits
- Component documentation

### Testing Strategy
- Unit tests for utility functions
- Integration tests for API clients
- E2E tests for critical user flows
- Performance testing for affiliate APIs

---

**Built with ❤️ by the ARCO Team**

For questions or support, contact: [your-email@domain.com]