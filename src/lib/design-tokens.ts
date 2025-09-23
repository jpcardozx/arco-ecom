/**
 * ARCO Premium Design Tokens
 * Professional design system with sophisticated aesthetics
 */

export const designTokens = {
  // Premium Color Palette
  colors: {
    // Primary - Sophisticated Blue
    primary: {
      50: 'rgb(239, 246, 255)',
      100: 'rgb(219, 234, 254)',
      200: 'rgb(191, 219, 254)',
      300: 'rgb(147, 197, 253)',
      400: 'rgb(96, 165, 250)',
      500: 'rgb(59, 130, 246)',
      600: 'rgb(37, 99, 235)',
      700: 'rgb(29, 78, 216)',
      800: 'rgb(30, 64, 175)',
      900: 'rgb(30, 58, 138)',
      950: 'rgb(23, 37, 84)'
    },

    // Secondary - Elegant Purple
    secondary: {
      50: 'rgb(250, 245, 255)',
      100: 'rgb(243, 232, 255)',
      200: 'rgb(233, 213, 255)',
      300: 'rgb(196, 181, 253)',
      400: 'rgb(167, 139, 250)',
      500: 'rgb(139, 92, 246)',
      600: 'rgb(124, 58, 237)',
      700: 'rgb(109, 40, 217)',
      800: 'rgb(91, 33, 182)',
      900: 'rgb(76, 29, 149)',
      950: 'rgb(46, 16, 101)'
    },

    // Accent - Premium Gold
    accent: {
      50: 'rgb(255, 251, 235)',
      100: 'rgb(254, 243, 199)',
      200: 'rgb(253, 230, 138)',
      300: 'rgb(252, 211, 77)',
      400: 'rgb(251, 191, 36)',
      500: 'rgb(245, 158, 11)',
      600: 'rgb(217, 119, 6)',
      700: 'rgb(180, 83, 9)',
      800: 'rgb(146, 64, 14)',
      900: 'rgb(120, 53, 15)',
      950: 'rgb(69, 26, 3)'
    },

    // Neutral - Sophisticated Grays
    neutral: {
      0: 'rgb(255, 255, 255)',
      50: 'rgb(249, 250, 251)',
      100: 'rgb(243, 244, 246)',
      200: 'rgb(229, 231, 235)',
      300: 'rgb(209, 213, 219)',
      400: 'rgb(156, 163, 175)',
      500: 'rgb(107, 114, 128)',
      600: 'rgb(75, 85, 99)',
      700: 'rgb(55, 65, 81)',
      800: 'rgb(31, 41, 55)',
      900: 'rgb(17, 24, 39)',
      950: 'rgb(3, 7, 18)'
    },

    // Semantic Colors
    success: {
      50: 'rgb(240, 253, 244)',
      500: 'rgb(34, 197, 94)',
      600: 'rgb(22, 163, 74)',
      700: 'rgb(21, 128, 61)',
      900: 'rgb(20, 83, 45)'
    },

    error: {
      50: 'rgb(254, 242, 242)',
      500: 'rgb(239, 68, 68)',
      600: 'rgb(220, 38, 38)',
      700: 'rgb(185, 28, 28)',
      900: 'rgb(127, 29, 29)'
    },

    warning: {
      50: 'rgb(255, 251, 235)',
      500: 'rgb(245, 158, 11)',
      600: 'rgb(217, 119, 6)',
      700: 'rgb(180, 83, 9)',
      900: 'rgb(120, 53, 15)'
    }
  },

  // Typography Scale
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      display: ['Cal Sans', 'Inter', 'sans-serif']
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }]
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900'
    }
  },

  // Spacing Scale (8pt grid)
  spacing: {
    px: '1px',
    0: '0px',
    0.5: '0.125rem', // 2px
    1: '0.25rem',    // 4px
    1.5: '0.375rem', // 6px
    2: '0.5rem',     // 8px
    2.5: '0.625rem', // 10px
    3: '0.75rem',    // 12px
    3.5: '0.875rem', // 14px
    4: '1rem',       // 16px
    5: '1.25rem',    // 20px
    6: '1.5rem',     // 24px
    7: '1.75rem',    // 28px
    8: '2rem',       // 32px
    9: '2.25rem',    // 36px
    10: '2.5rem',    // 40px
    11: '2.75rem',   // 44px
    12: '3rem',      // 48px
    14: '3.5rem',    // 56px
    16: '4rem',      // 64px
    20: '5rem',      // 80px
    24: '6rem',      // 96px
    28: '7rem',      // 112px
    32: '8rem',      // 128px
    36: '9rem',      // 144px
    40: '10rem',     // 160px
    44: '11rem',     // 176px
    48: '12rem',     // 192px
    52: '13rem',     // 208px
    56: '14rem',     // 224px
    60: '15rem',     // 240px
    64: '16rem',     // 256px
    72: '18rem',     // 288px
    80: '20rem',     // 320px
    96: '24rem'      // 384px
  },

  // Border Radius
  borderRadius: {
    none: '0px',
    sm: '0.125rem',   // 2px
    DEFAULT: '0.25rem', // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px'
  },

  // Shadows
  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: '0 0 #0000',
    
    // Premium shadows
    'soft': '0 2px 8px 0 rgb(0 0 0 / 0.06)',
    'medium': '0 4px 16px 0 rgb(0 0 0 / 0.08)',
    'strong': '0 8px 32px 0 rgb(0 0 0 / 0.12)',
    'glow': '0 0 20px rgb(59 130 246 / 0.3)',
    'glow-purple': '0 0 20px rgb(139 92 246 / 0.3)',
    'glow-gold': '0 0 20px rgb(245 158 11 / 0.3)'
  },

  // Animation
  animation: {
    duration: {
      fast: '150ms',
      normal: '200ms',
      slow: '300ms',
      slower: '500ms'
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    }
  },

  // Glassmorphism
  glass: {
    light: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.18)'
    },
    medium: {
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(15px)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    strong: {
      background: 'rgba(255, 255, 255, 0.25)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.3)'
    }
  }
};

// CSS Custom Properties Generator
export const generateCSSVariables = () => {
  const cssVars: Record<string, string> = {};
  
  // Colors
  Object.entries(designTokens.colors).forEach(([colorName, colorValues]) => {
    if (typeof colorValues === 'object') {
      Object.entries(colorValues).forEach(([shade, value]) => {
        cssVars[`--color-${colorName}-${shade}`] = value;
      });
    }
  });

  // Spacing
  Object.entries(designTokens.spacing).forEach(([key, value]) => {
    cssVars[`--spacing-${key}`] = value;
  });

  // Border Radius
  Object.entries(designTokens.borderRadius).forEach(([key, value]) => {
    cssVars[`--border-radius-${key}`] = value;
  });

  return cssVars;
};

// Utility Classes
export const utilityClasses = {
  // Glass morphism utilities
  glass: {
    light: `bg-white/10 backdrop-blur-[10px] border border-white/18`,
    medium: `bg-white/15 backdrop-blur-[15px] border border-white/20`,
    strong: `bg-white/25 backdrop-blur-[20px] border border-white/30`
  },

  // Gradient utilities
  gradients: {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-700',
    secondary: 'bg-gradient-to-r from-secondary-500 to-secondary-700',
    accent: 'bg-gradient-to-r from-accent-400 to-accent-600',
    sunset: 'bg-gradient-to-r from-accent-400 via-primary-500 to-secondary-600',
    ocean: 'bg-gradient-to-r from-primary-400 to-secondary-600',
    forest: 'bg-gradient-to-r from-success-400 to-primary-600'
  },

  // Shadow utilities
  shadows: {
    soft: 'shadow-soft',
    medium: 'shadow-medium',
    strong: 'shadow-strong',
    glow: 'shadow-glow',
    glowPurple: 'shadow-glow-purple',
    glowGold: 'shadow-glow-gold'
  }
};