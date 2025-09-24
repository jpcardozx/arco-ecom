/**
 * ARCO Design System - Premium S-Tier Color Palette
 * Luxury-grade color system inspired by Apple, Linear, and Stripe
 */

// Premium Brand Colors - S-Tier Professional
export const premiumBrandColors = {
  // Primary - Deep Midnight Blue (inspired by Apple Pro)
  midnight: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617'
  },

  // Secondary - Sophisticated Slate (Linear-inspired)
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617'
  },

  // Accent - Electric Blue (Stripe-inspired)
  electric: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554'
  }
} as const;

// Luxury Semantic Colors - Premium Feel
export const premiumSemanticColors = {
  // Success - Emerald (Luxury green)
  success: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
    950: '#022c22'
  },

  // Warning - Amber (Premium gold)
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03'
  },

  // Danger - Rose (Sophisticated red)
  danger: {
    50: '#fff1f2',
    100: '#ffe4e6',
    200: '#fecdd3',
    300: '#fda4af',
    400: '#fb7185',
    500: '#f43f5e',
    600: '#e11d48',
    700: '#be123c',
    800: '#9f1239',
    900: '#881337',
    950: '#4c0519'
  },

  // Premium E-commerce Colors
  ecommerce: {
    // Primary Shopping Blue
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554'
    },
    
    // Luxury Purple for Premium Products
    luxury: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7c3aed',
      800: '#6b21a8',
      900: '#581c87',
      950: '#3b0764'
    },
    
    // Trust Green for Security/Success
    trust: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
      950: '#052e16'
    },

    // Premium Gold for Special Offers
    gold: {
      50: '#fffdf2',
      100: '#fffbeb',
      200: '#fef3c7',
      300: '#fde68a',
      400: '#fcd34d',
      500: '#fbbf24',
      600: '#f59e0b',
      700: '#d97706',
      800: '#b45309',
      900: '#92400e',
      950: '#451a03'
    }
  },

  // Info - Sky (Premium blue)
  info: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49'
  }
} as const;

// Premium Gradient System - S-Tier Visual Appeal
export const premiumGradients = {
  // Hero gradients (subtle, professional)
  'hero-light': 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 25%, #e2e8f0 100%)',
  'hero-dark': 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 100%)',

  // Glass morphism backgrounds
  'glass-light': 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)',
  'glass-dark': 'linear-gradient(135deg, rgba(15,23,42,0.25) 0%, rgba(15,23,42,0.1) 100%)',

  // Elevation gradients
  'surface-1': 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
  'surface-2': 'linear-gradient(135deg, #fefefe 0%, #fdfdfd 100%)',
  'surface-3': 'linear-gradient(135deg, #fdfdfd 0%, #fcfcfc 100%)',

  // Brand gradients (very subtle)
  'brand-primary': 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
  'brand-secondary': 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)',

  // Action gradients
  'cta-primary': 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
  'cta-success': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  'cta-warning': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  'cta-danger': 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)'
} as const;

// Premium Shadow System - Apple/Linear Inspired
export const premiumShadows = {
  // Elevation shadows
  'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',

  // Colored shadows (for premium feel)
  'blue': '0 10px 15px -3px rgba(59, 130, 246, 0.1), 0 4px 6px -2px rgba(59, 130, 246, 0.05)',
  'green': '0 10px 15px -3px rgba(16, 185, 129, 0.1), 0 4px 6px -2px rgba(16, 185, 129, 0.05)',
  'purple': '0 10px 15px -3px rgba(139, 92, 246, 0.1), 0 4px 6px -2px rgba(139, 92, 246, 0.05)',

  // Inner shadows (for depth)
  'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  'inner-lg': 'inset 0 4px 8px 0 rgba(0, 0, 0, 0.12)'
} as const;

// Premium Typography Colors - Perfect Contrast
export const premiumTextColors = {
  // Primary hierarchy
  primary: '#0f172a',      // Perfect black-blue
  'primary-soft': '#1e293b',

  // Secondary hierarchy
  secondary: '#334155',
  'secondary-soft': '#475569',

  // Tertiary hierarchy
  tertiary: '#64748b',
  'tertiary-soft': '#94a3b8',

  // Muted hierarchy
  muted: '#cbd5e1',
  'muted-soft': '#e2e8f0',

  // Disabled
  disabled: '#f1f5f9',

  // Inverse (for dark backgrounds)
  inverse: '#ffffff',
  'inverse-soft': '#f8fafc',
  'inverse-muted': '#e2e8f0'
} as const;

// Premium Surface System - Multi-layer Depth
export const premiumSurfaces = {
  // Base surfaces
  base: '#ffffff',
  'base-soft': '#fefefe',

  // Elevated surfaces (cards, modals, etc.)
  elevated: {
    1: '#ffffff',        // Cards
    2: '#fefefe',        // Modals
    3: '#fdfdfd',        // Dropdowns
    4: '#fcfcfc'         // Tooltips
  },

  // Background surfaces
  background: {
    primary: '#ffffff',
    secondary: '#f8fafc',
    tertiary: '#f1f5f9'
  },

  // Dark mode surfaces
  dark: {
    base: '#0f172a',
    elevated: {
      1: '#1e293b',
      2: '#334155',
      3: '#475569',
      4: '#64748b'
    },
    background: {
      primary: '#020617',
      secondary: '#0f172a',
      tertiary: '#1e293b'
    }
  }
} as const;

// Premium Border System - Subtle & Sophisticated
export const premiumBorders = {
  // Standard borders
  light: '#f1f5f9',
  default: '#e2e8f0',
  medium: '#cbd5e1',
  strong: '#94a3b8',

  // Colored borders (very subtle)
  blue: '#dbeafe',
  green: '#d1fae5',
  yellow: '#fef3c7',
  red: '#ffe4e6',

  // Interactive borders
  focus: '#3b82f6',
  error: '#f43f5e',
  success: '#10b981',
  warning: '#f59e0b'
} as const;

// Export premium color system
export const premiumColors = {
  brand: premiumBrandColors,
  semantic: premiumSemanticColors,
  gradients: premiumGradients,
  shadows: premiumShadows,
  text: premiumTextColors,
  surface: premiumSurfaces,
  border: premiumBorders
} as const;

// Premium color utilities
export const premiumColorUtils = {
  // Add alpha channel
  alpha: (color: string, alpha: number) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  },

  // Create glass morphism effect
  glass: (opacity: number = 0.1) => ({
    background: `rgba(255, 255, 255, ${opacity})`,
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  }),

  // Create premium card effect
  card: (elevation: 1 | 2 | 3 | 4 = 1) => ({
    background: premiumSurfaces.elevated[elevation],
    boxShadow: premiumShadows[elevation === 1 ? 'sm' : elevation === 2 ? 'md' : elevation === 3 ? 'lg' : 'xl'],
    border: `1px solid ${premiumBorders.light}`
  })
} as const;