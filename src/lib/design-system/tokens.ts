/**
 * ARCO Design System Tokens - S-Tier Consistent Design
 * Centralizes all design decisions to eliminate hardcoded styles
 */

export interface DesignTokens {
  colors: {
    primary: Record<string, string>;
    secondary: Record<string, string>;
    accent: Record<string, string>;
    neutral: Record<string, string>;
    semantic: {
      success: Record<string, string>;
      warning: Record<string, string>;
      error: Record<string, string>;
      info: Record<string, string>;
    };
  };
  
  typography: {
    fonts: {
      sans: string;
      serif: string;
      mono: string;
    };
    sizes: Record<string, { size: string; lineHeight: string }>;
    weights: Record<string, string>;
  };
  
  spacing: Record<string, string>;
  shadows: Record<string, string>;
  borderRadius: Record<string, string>;
  transitions: Record<string, string>;
  zIndex: Record<string, number>;
  
  breakpoints: Record<string, string>;
  
  components: {
    button: {
      sizes: Record<string, { height: string; padding: string; fontSize: string }>;
      variants: Record<string, { background: string; color: string; border: string }>;
    };
    card: {
      variants: Record<string, { background: string; border: string; shadow: string }>;
    };
    input: {
      sizes: Record<string, { height: string; padding: string; fontSize: string }>;
      states: Record<string, { border: string; background: string; color: string }>;
    };
  };
}

/**
 * S-Tier Design Tokens - Professional Design System
 */
export const designTokens: DesignTokens = {
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',  // Base primary
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      950: '#082f49'
    },
    
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',  // Base secondary
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617'
    },
    
    accent: {
      50: '#fdf4ff',
      100: '#fae8ff',
      200: '#f5d0fe',
      300: '#f0abfc',
      400: '#e879f9',
      500: '#d946ef',  // Base accent
      600: '#c026d3',
      700: '#a21caf',
      800: '#86198f',
      900: '#701a75',
      950: '#4a044e'
    },
    
    neutral: {
      50: '#fafafa',
      100: '#f4f4f5',
      200: '#e4e4e7',
      300: '#d4d4d8',
      400: '#a1a1aa',
      500: '#71717a',  // Base neutral
      600: '#52525b',
      700: '#3f3f46',
      800: '#27272a',
      900: '#18181b',
      950: '#09090b'
    },
    
    semantic: {
      success: {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#22c55e',  // Base success
        600: '#16a34a',
        700: '#15803d',
        800: '#166534',
        900: '#14532d'
      },
      
      warning: {
        50: '#fffbeb',
        100: '#fef3c7',
        200: '#fde68a',
        300: '#fcd34d',
        400: '#fbbf24',
        500: '#f59e0b',  // Base warning
        600: '#d97706',
        700: '#b45309',
        800: '#92400e',
        900: '#78350f'
      },
      
      error: {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',  // Base error
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d'
      },
      
      info: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',  // Base info
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a'
      }
    }
  },
  
  typography: {
    fonts: {
      sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      serif: 'Charter, "Bitstream Charter", "Sitka Text", Cambria, serif',
      mono: '"Fira Code", "JetBrains Mono", Menlo, Monaco, Consolas, monospace'
    },
    
    sizes: {
      xs: { size: '0.75rem', lineHeight: '1rem' },      // 12px
      sm: { size: '0.875rem', lineHeight: '1.25rem' },   // 14px
      base: { size: '1rem', lineHeight: '1.5rem' },      // 16px
      lg: { size: '1.125rem', lineHeight: '1.75rem' },   // 18px
      xl: { size: '1.25rem', lineHeight: '1.75rem' },    // 20px
      '2xl': { size: '1.5rem', lineHeight: '2rem' },     // 24px
      '3xl': { size: '1.875rem', lineHeight: '2.25rem' }, // 30px
      '4xl': { size: '2.25rem', lineHeight: '2.5rem' },  // 36px
      '5xl': { size: '3rem', lineHeight: '1' },          // 48px
      '6xl': { size: '3.75rem', lineHeight: '1' },       // 60px
      '7xl': { size: '4.5rem', lineHeight: '1' },        // 72px
      '8xl': { size: '6rem', lineHeight: '1' },          // 96px
      '9xl': { size: '8rem', lineHeight: '1' }           // 128px
    },
    
    weights: {
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
  
  spacing: {
    0: '0px',
    px: '1px',
    0.5: '0.125rem',   // 2px
    1: '0.25rem',      // 4px
    1.5: '0.375rem',   // 6px
    2: '0.5rem',       // 8px
    2.5: '0.625rem',   // 10px
    3: '0.75rem',      // 12px
    3.5: '0.875rem',   // 14px
    4: '1rem',         // 16px
    5: '1.25rem',      // 20px
    6: '1.5rem',       // 24px
    7: '1.75rem',      // 28px
    8: '2rem',         // 32px
    9: '2.25rem',      // 36px
    10: '2.5rem',      // 40px
    11: '2.75rem',     // 44px
    12: '3rem',        // 48px
    14: '3.5rem',      // 56px
    16: '4rem',        // 64px
    20: '5rem',        // 80px
    24: '6rem',        // 96px
    28: '7rem',        // 112px
    32: '8rem',        // 128px
    36: '9rem',        // 144px
    40: '10rem',       // 160px
    44: '11rem',       // 176px
    48: '12rem',       // 192px
    52: '13rem',       // 208px
    56: '14rem',       // 224px
    60: '15rem',       // 240px
    64: '16rem',       // 256px
    72: '18rem',       // 288px
    80: '20rem',       // 320px
    96: '24rem'        // 384px
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: '0 0 #0000'
  },
  
  borderRadius: {
    none: '0px',
    sm: '0.125rem',    // 2px
    base: '0.25rem',   // 4px
    md: '0.375rem',    // 6px
    lg: '0.5rem',      // 8px
    xl: '0.75rem',     // 12px
    '2xl': '1rem',     // 16px
    '3xl': '1.5rem',   // 24px
    full: '9999px'
  },
  
  transitions: {
    fast: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'all 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  },
  
  zIndex: {
    auto: 0,
    base: 1,
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
  },
  
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },
  
  components: {
    button: {
      sizes: {
        sm: { height: '2rem', padding: '0 0.75rem', fontSize: '0.875rem' },
        md: { height: '2.5rem', padding: '0 1rem', fontSize: '1rem' },
        lg: { height: '3rem', padding: '0 1.5rem', fontSize: '1.125rem' },
        xl: { height: '3.5rem', padding: '0 2rem', fontSize: '1.25rem' }
      },
      
      variants: {
        primary: {
          background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
          color: '#ffffff',
          border: '1px solid transparent'
        },
        secondary: {
          background: '#f8fafc',
          color: '#334155',
          border: '1px solid #e2e8f0'
        },
        accent: {
          background: 'linear-gradient(135deg, #d946ef 0%, #c026d3 100%)',
          color: '#ffffff',
          border: '1px solid transparent'
        },
        outline: {
          background: 'transparent',
          color: '#0ea5e9',
          border: '1px solid #0ea5e9'
        },
        ghost: {
          background: 'transparent',
          color: '#334155',
          border: '1px solid transparent'
        }
      }
    },
    
    card: {
      variants: {
        default: {
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        },
        elevated: {
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
        },
        outlined: {
          background: 'transparent',
          border: '2px solid #e2e8f0',
          shadow: 'none'
        },
        glass: {
          background: 'rgba(255, 255, 255, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          shadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }
      }
    },
    
    input: {
      sizes: {
        sm: { height: '2rem', padding: '0 0.75rem', fontSize: '0.875rem' },
        md: { height: '2.5rem', padding: '0 1rem', fontSize: '1rem' },
        lg: { height: '3rem', padding: '0 1.25rem', fontSize: '1.125rem' }
      },
      
      states: {
        default: {
          border: '1px solid #d4d4d8',
          background: '#ffffff',
          color: '#18181b'
        },
        focus: {
          border: '1px solid #0ea5e9',
          background: '#ffffff',
          color: '#18181b'
        },
        error: {
          border: '1px solid #ef4444',
          background: '#ffffff',
          color: '#18181b'
        },
        disabled: {
          border: '1px solid #e4e4e7',
          background: '#f4f4f5',
          color: '#a1a1aa'
        }
      }
    }
  }
};

/**
 * CSS Custom Properties Generator
 * Generates CSS variables for design tokens
 */
export function generateCSSVariables(): string {
  const vars: string[] = [];
  
  // Colors
  Object.entries(designTokens.colors.primary).forEach(([key, value]) => {
    vars.push(`--color-primary-${key}: ${value};`);
  });
  
  Object.entries(designTokens.colors.secondary).forEach(([key, value]) => {
    vars.push(`--color-secondary-${key}: ${value};`);
  });
  
  Object.entries(designTokens.colors.accent).forEach(([key, value]) => {
    vars.push(`--color-accent-${key}: ${value};`);
  });
  
  Object.entries(designTokens.colors.neutral).forEach(([key, value]) => {
    vars.push(`--color-neutral-${key}: ${value};`);
  });
  
  // Spacing
  Object.entries(designTokens.spacing).forEach(([key, value]) => {
    vars.push(`--spacing-${key}: ${value};`);
  });
  
  // Typography
  Object.entries(designTokens.typography.sizes).forEach(([key, value]) => {
    vars.push(`--text-${key}-size: ${value.size};`);
    vars.push(`--text-${key}-line-height: ${value.lineHeight};`);
  });
  
  // Shadows
  Object.entries(designTokens.shadows).forEach(([key, value]) => {
    vars.push(`--shadow-${key}: ${value};`);
  });
  
  // Border radius
  Object.entries(designTokens.borderRadius).forEach(([key, value]) => {
    vars.push(`--radius-${key}: ${value};`);
  });
  
  return `:root {\n  ${vars.join('\n  ')}\n}`;
}

/**
 * Utility functions for accessing tokens
 */
export const tokens = {
  color: {
    primary: (shade: keyof typeof designTokens.colors.primary = '500') => 
      designTokens.colors.primary[shade],
    secondary: (shade: keyof typeof designTokens.colors.secondary = '500') => 
      designTokens.colors.secondary[shade],
    accent: (shade: keyof typeof designTokens.colors.accent = '500') => 
      designTokens.colors.accent[shade],
    neutral: (shade: keyof typeof designTokens.colors.neutral = '500') => 
      designTokens.colors.neutral[shade],
    success: (shade: keyof typeof designTokens.colors.semantic.success = '500') => 
      designTokens.colors.semantic.success[shade],
    warning: (shade: keyof typeof designTokens.colors.semantic.warning = '500') => 
      designTokens.colors.semantic.warning[shade],
    error: (shade: keyof typeof designTokens.colors.semantic.error = '500') => 
      designTokens.colors.semantic.error[shade],
    info: (shade: keyof typeof designTokens.colors.semantic.info = '500') => 
      designTokens.colors.semantic.info[shade]
  },
  
  spacing: (size: keyof typeof designTokens.spacing) => designTokens.spacing[size],
  
  typography: {
    size: (size: keyof typeof designTokens.typography.sizes) => 
      designTokens.typography.sizes[size],
    weight: (weight: keyof typeof designTokens.typography.weights) => 
      designTokens.typography.weights[weight],
    font: (family: keyof typeof designTokens.typography.fonts) => 
      designTokens.typography.fonts[family]
  },
  
  shadow: (level: keyof typeof designTokens.shadows) => designTokens.shadows[level],
  radius: (size: keyof typeof designTokens.borderRadius) => designTokens.borderRadius[size],
  transition: (speed: keyof typeof designTokens.transitions) => designTokens.transitions[speed],
  zIndex: (layer: keyof typeof designTokens.zIndex) => designTokens.zIndex[layer],
  
  breakpoint: (size: keyof typeof designTokens.breakpoints) => designTokens.breakpoints[size]
};