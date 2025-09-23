# ARCO Design System - S-Tier UI/UX

## 🎨 Premium Design Philosophy

O ARCO implementa um design system de **classe mundial**, inspirado nas melhores práticas do Apple Human Interface Guidelines, Linear Design System e Stripe Dashboard.

### Design Principles

1. **Simplicidade Sofisticada** - Interfaces limpas com detalhes sutis
2. **Hierarquia Visual Clara** - Typography e spacing matemático
3. **Consistência Absoluta** - Tokens obrigatórios em todos componentes
4. **Performance Premium** - Animações 60fps e interações fluidas
5. **Acessibilidade S-Tier** - WCAG 2.1 AAA compliance

## 🌈 Color System Premium

### Brand Colors
```typescript
// Midnight Blue - Primary brand color
midnight: {
  500: '#64748b',  // Main brand
  700: '#334155',  // Dark variant
  900: '#0f172a'   // Darkest
}

// Electric Blue - Call-to-action
electric: {
  500: '#3b82f6',  // Primary CTA
  600: '#2563eb',  // Hover state
  700: '#1d4ed8'   // Active state
}
```

### Semantic Colors
- **Success**: Emerald green (`#10b981`)
- **Warning**: Premium amber (`#f59e0b`)
- **Danger**: Sophisticated rose (`#f43f5e`)
- **Info**: Sky blue (`#0ea5e9`)

### Premium Gradients
```css
/* Hero gradients */
hero-light: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 25%, #e2e8f0 100%);

/* Glass morphism */
glass-light: linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%);

/* Call-to-action */
cta-primary: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
```

## 📝 Typography System

### Font Stack Premium
```css
/* Primary sans-serif */
font-family: 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Code/technical */
font-family: 'JetBrains Mono Variable', 'SF Mono', 'Monaco', monospace;

/* Display/branding */
font-family: 'Cal Sans', 'Inter Variable', sans-serif;
```

### Typography Scale
| Size | Font Size | Line Height | Use Case |
|------|-----------|-------------|----------|
| `xs` | 12px | 16px | Micro text, badges |
| `sm` | 14px | 20px | Small text, captions |
| `base` | 16px | 24px | Body text |
| `lg` | 18px | 28px | Large body text |
| `xl` | 20px | 28px | Subheadings |
| `2xl` | 24px | 32px | Section headings |
| `3xl` | 30px | 36px | Page headings |
| `4xl` | 36px | 40px | Large headings |
| `5xl` | 48px | 48px | Display text |

### Semantic Typography
```typescript
// Display styles (hero sections)
display.lg: {
  fontSize: '3rem',      // 48px
  lineHeight: '1',       // 48px
  fontWeight: 600,       // semibold
  letterSpacing: '-0.025em'
}

// Heading styles (sections)
heading.h1: {
  fontSize: '1.875rem',  // 30px
  lineHeight: '2.25rem', // 36px
  fontWeight: 700,       // bold
  letterSpacing: '-0.025em'
}

// Body styles
body.base: {
  fontSize: '1rem',      // 16px
  lineHeight: '1.5rem',  // 24px
  fontWeight: 400,       // normal
  letterSpacing: '0em'
}
```

## 📐 Spacing System

### Mathematical Scale (8px base)
```typescript
// Base spacing scale
'2': '0.5rem',    // 8px  - base unit
'4': '1rem',      // 16px - small spacing
'6': '1.5rem',    // 24px - medium spacing
'8': '2rem',      // 32px - large spacing
'12': '3rem',     // 48px - section spacing
'16': '4rem',     // 64px - layout spacing
'24': '6rem',     // 96px - major spacing
```

### Semantic Spacing
```typescript
// Component spacing
component: {
  xs: '8px',    // tight spacing
  sm: '16px',   // normal spacing
  md: '24px',   // comfortable spacing
  lg: '32px',   // loose spacing
  xl: '48px'    // very loose spacing
}

// Section spacing
section: {
  sm: '64px',   // small sections
  md: '96px',   // medium sections
  lg: '128px',  // large sections
  xl: '192px'   // hero sections
}
```

## 🎭 Shadow System

### Elevation Shadows
```css
/* Subtle elevations */
xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

/* Premium colored shadows */
blue: 0 10px 15px -3px rgba(59, 130, 246, 0.1);
green: 0 10px 15px -3px rgba(16, 185, 129, 0.1);
```

## 🏗️ Component Architecture

### Design Gates (Obrigatórios)
Todos os componentes **DEVEM** usar o design gate para validação:

```typescript
import { useDesignGate } from '@/design-system/core/design-gate';

export const MyComponent = () => {
  // OBRIGATÓRIO: Validação de design tokens
  useDesignGate('MyComponent', {
    allowedColors: ['primary', 'secondary'],
    requiredProps: ['variant', 'size']
  });

  return <div>...</div>;
};
```

### Component Variants
```typescript
// Exemplo: Button variants
const buttonVariants = cva('base-button-styles', {
  variants: {
    variant: {
      primary: 'bg-electric-500 text-white',
      secondary: 'bg-slate-100 text-slate-900',
      ghost: 'bg-transparent text-slate-700'
    },
    size: {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-6 py-4 text-lg'
    }
  }
});
```

## 🎬 Animation System

### Micro-interactions
```css
/* Smooth transitions */
transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

/* Hover elevations */
hover:shadow-lg hover:scale-[1.02]

/* Loading states */
animate-pulse, animate-spin, animate-bounce
```

### Spring Animations (Framer Motion)
```typescript
const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 30
};

const scaleVariants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.9, opacity: 0 }
};
```

## 📱 Responsive Design

### Breakpoints
```typescript
const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet portrait
  lg: '1024px',  // Tablet landscape
  xl: '1280px',  // Desktop
  '2xl': '1536px' // Large desktop
};
```

### Mobile-First Approach
```css
/* Mobile styles first */
.component {
  padding: 1rem;
}

/* Then scale up */
@media (min-width: 768px) {
  .component {
    padding: 2rem;
  }
}
```

## 🔧 Implementation Guidelines

### 1. Token Usage
```typescript
// ✅ CORRETO - Usar tokens
className="text-slate-700 bg-white border-slate-200"

// ❌ INCORRETO - Valores arbitrários
className="text-[#475569] bg-[#ffffff] border-[#e2e8f0]"
```

### 2. Component Composition
```typescript
// ✅ CORRETO - Composição com tokens
<Card variant="elevated" spacing="lg">
  <CardHeader>
    <Heading level={2}>Title</Heading>
  </CardHeader>
  <CardContent>
    <Text variant="body">Content</Text>
  </CardContent>
</Card>
```

### 3. Design Gates Enforcement
```typescript
// ✅ CORRETO - Com design gate
export const Button = ({ variant, size, ...props }) => {
  useDesignGate('Button', { variant, size });
  return <button className={buttonVariants({ variant, size })} {...props} />;
};

// ❌ INCORRETO - Sem validação
export const Button = ({ className, ...props }) => {
  return <button className={className} {...props} />;
};
```

## 🏆 Quality Standards

### Performance Targets
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3s

### Accessibility Standards
- **Color Contrast**: WCAG AAA (7:1 ratio)
- **Keyboard Navigation**: Full support
- **Screen Readers**: Semantic HTML + ARIA
- **Focus Management**: Visible focus indicators

### Browser Support
- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+

## 🚀 Next Steps

1. **Component Library**: Finalizar todos componentes com design gates
2. **Storybook**: Documentação visual interativa
3. **Design Tokens Export**: Figma integration
4. **Performance Monitoring**: Real User Metrics
5. **A11y Testing**: Automated accessibility checks