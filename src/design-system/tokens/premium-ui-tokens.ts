/**
 * ARCO Design System - Enhanced UI/UX Improvements
 * Melhorias de interface e experiência do usuário
 */

import { premiumColors } from './colors-premium';

// 1. Sistema de Animações Aprimoradas
export const premiumAnimations = {
  // Transições suaves (Apple-inspired)
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0.0, 0.2, 1)',
    normal: '250ms cubic-bezier(0.4, 0.0, 0.2, 1)',
    slow: '350ms cubic-bezier(0.4, 0.0, 0.2, 1)',
    spring: '400ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
  
  // Efeitos de entrada
  entrances: {
    fadeIn: 'opacity 0 to 1',
    slideUp: 'transform translateY(20px) to translateY(0)',
    scaleIn: 'transform scale(0.95) to scale(1)',
    bounceIn: 'transform scale(0.3) to scale(1)'
  },
  
  // Micro-interações
  micro: {
    buttonPress: 'transform scale(0.98)',
    cardHover: 'transform translateY(-4px)',
    iconSpin: 'transform rotate(360deg)',
    glow: 'box-shadow 0 0 20px rgba(59, 130, 246, 0.3)'
  }
} as const;

// 2. Sistema de Espaçamento Harmonioso
export const premiumSpacing = {
  // Escala baseada em 4px (design system padrão)
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '0.75rem',    // 12px
  lg: '1rem',       // 16px
  xl: '1.5rem',     // 24px
  '2xl': '2rem',    // 32px
  '3xl': '3rem',    // 48px
  '4xl': '4rem',    // 64px
  '5xl': '6rem',    // 96px
  '6xl': '8rem',    // 128px
  
  // Espaçamentos especiais
  section: '5rem',   // Entre seções
  container: '2rem', // Padding de containers
  card: '1.5rem',    // Padding de cards
  
  // Grid system responsivo
  grid: {
    gap: {
      xs: '0.5rem',
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
      xl: '3rem'
    }
  }
} as const;

// 3. Sistema Tipográfico Premium
export const premiumTypography = {
  // Família de fontes (stack otimizado)
  fontFamilies: {
    sans: ['-apple-system', 'BlinkMacSystemFont', 'Inter', 'Segoe UI', 'Roboto', 'sans-serif'],
    serif: ['Georgia', 'Times New Roman', 'serif'],
    mono: ['JetBrains Mono', 'Monaco', 'Menlo', 'monospace'],
    display: ['Inter Display', '-apple-system', 'sans-serif']
  },
  
  // Tamanhos harmonizados (escala modular 1.25)
  fontSizes: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '4rem',     // 64px
  },
  
  // Pesos otimizados
  fontWeights: {
    thin: 100,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800
  },
  
  // Altura de linha perfeita
  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2
  }
} as const;

// 4. Sistema de Bordas e Raios
export const premiumBorderRadius = {
  none: '0',
  xs: '0.125rem',   // 2px
  sm: '0.25rem',    // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
  
  // Raios especializados
  card: '0.75rem',
  button: '0.5rem',
  input: '0.375rem',
  modal: '1rem'
} as const;

// 5. Sistema de Responsividade Premium
export const premiumBreakpoints = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  
  // Breakpoints especializados
  mobile: '640px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px'
} as const;

// 6. Sistema de Z-index Organizado
export const premiumZIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800
} as const;

// 7. Componentes de Layout Premium
export const premiumLayout = {
  // Container widths otimizados
  containers: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    full: '100%'
  },
  
  // Grid system flexível
  grid: {
    columns: {
      1: '1fr',
      2: 'repeat(2, 1fr)',
      3: 'repeat(3, 1fr)',
      4: 'repeat(4, 1fr)',
      5: 'repeat(5, 1fr)',
      6: 'repeat(6, 1fr)',
      12: 'repeat(12, 1fr)'
    }
  }
} as const;

// 8. Tokens Utilitários Avançados
export const premiumUtilities = {
  // Filtros CSS avançados
  filters: {
    blur: {
      sm: 'blur(4px)',
      md: 'blur(8px)',
      lg: 'blur(16px)'
    },
    brightness: {
      50: 'brightness(0.5)',
      75: 'brightness(0.75)',
      90: 'brightness(0.9)',
      110: 'brightness(1.1)',
      125: 'brightness(1.25)'
    }
  },
  
  // Backdrop filters (glass morphism)
  backdropFilters: {
    blur: {
      sm: 'backdrop-blur(4px)',
      md: 'backdrop-blur(12px)',
      lg: 'backdrop-blur(24px)'
    }
  }
} as const;

// Export consolidado
export const premiumDesignTokens = {
  colors: premiumColors,
  animations: premiumAnimations,
  spacing: premiumSpacing,
  typography: premiumTypography,
  borderRadius: premiumBorderRadius,
  breakpoints: premiumBreakpoints,
  zIndex: premiumZIndex,
  layout: premiumLayout,
  utilities: premiumUtilities
} as const;

export default premiumDesignTokens;