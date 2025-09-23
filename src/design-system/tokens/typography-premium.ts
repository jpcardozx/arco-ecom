/**
 * ARCO Design System - Premium S-Tier Typography
 * Apple/Linear/Stripe inspired typography system with perfect scaling
 */

// Premium Font Stacks - Optimized for readability and elegance
export const premiumFontFamilies = {
  // Sans-serif stack (primary)
  sans: [
    'Inter Variable',
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI Variable',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif'
  ].join(', '),

  // Mono stack (code/technical)
  mono: [
    'JetBrains Mono Variable',
    'JetBrains Mono',
    'SF Mono',
    'Monaco',
    'Inconsolata',
    'Roboto Mono',
    'Consolas',
    'monospace'
  ].join(', '),

  // Display stack (headings/branding)
  display: [
    'Cal Sans',
    'Inter Variable',
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    'sans-serif'
  ].join(', ')
} as const;

// Premium Font Weights - Carefully selected for hierarchy
export const premiumFontWeights = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900
} as const;

// Premium Font Sizes - Perfect Scale (1.125 - Major Second)
export const premiumFontSizes = {
  // Micro text
  xs: {
    fontSize: '0.75rem',    // 12px
    lineHeight: '1rem'      // 16px
  },

  // Small text
  sm: {
    fontSize: '0.875rem',   // 14px
    lineHeight: '1.25rem'   // 20px
  },

  // Base text
  base: {
    fontSize: '1rem',       // 16px
    lineHeight: '1.5rem'    // 24px
  },

  // Large text
  lg: {
    fontSize: '1.125rem',   // 18px
    lineHeight: '1.75rem'   // 28px
  },

  // Extra large text
  xl: {
    fontSize: '1.25rem',    // 20px
    lineHeight: '1.75rem'   // 28px
  },

  // 2x large
  '2xl': {
    fontSize: '1.5rem',     // 24px
    lineHeight: '2rem'      // 32px
  },

  // 3x large
  '3xl': {
    fontSize: '1.875rem',   // 30px
    lineHeight: '2.25rem'   // 36px
  },

  // 4x large
  '4xl': {
    fontSize: '2.25rem',    // 36px
    lineHeight: '2.5rem'    // 40px
  },

  // 5x large
  '5xl': {
    fontSize: '3rem',       // 48px
    lineHeight: '1'         // 48px
  },

  // 6x large
  '6xl': {
    fontSize: '3.75rem',    // 60px
    lineHeight: '1'         // 60px
  },

  // 7x large
  '7xl': {
    fontSize: '4.5rem',     // 72px
    lineHeight: '1'         // 72px
  },

  // 8x large
  '8xl': {
    fontSize: '6rem',       // 96px
    lineHeight: '1'         // 96px
  },

  // 9x large
  '9xl': {
    fontSize: '8rem',       // 128px
    lineHeight: '1'         // 128px
  }
} as const;

// Premium Letter Spacing - Optical adjustments
export const premiumLetterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em'
} as const;

// Premium Typography Styles - Semantic hierarchy
export const premiumTypographyStyles = {
  // Display styles (hero sections, large headings)
  display: {
    '2xl': {
      fontFamily: premiumFontFamilies.display,
      fontSize: premiumFontSizes['7xl'].fontSize,
      lineHeight: premiumFontSizes['7xl'].lineHeight,
      fontWeight: premiumFontWeights.bold,
      letterSpacing: premiumLetterSpacing.tighter
    },
    xl: {
      fontFamily: premiumFontFamilies.display,
      fontSize: premiumFontSizes['6xl'].fontSize,
      lineHeight: premiumFontSizes['6xl'].lineHeight,
      fontWeight: premiumFontWeights.bold,
      letterSpacing: premiumLetterSpacing.tighter
    },
    lg: {
      fontFamily: premiumFontFamilies.display,
      fontSize: premiumFontSizes['5xl'].fontSize,
      lineHeight: premiumFontSizes['5xl'].lineHeight,
      fontWeight: premiumFontWeights.semibold,
      letterSpacing: premiumLetterSpacing.tight
    },
    md: {
      fontFamily: premiumFontFamilies.display,
      fontSize: premiumFontSizes['4xl'].fontSize,
      lineHeight: premiumFontSizes['4xl'].lineHeight,
      fontWeight: premiumFontWeights.semibold,
      letterSpacing: premiumLetterSpacing.tight
    },
    sm: {
      fontFamily: premiumFontFamilies.display,
      fontSize: premiumFontSizes['3xl'].fontSize,
      lineHeight: premiumFontSizes['3xl'].lineHeight,
      fontWeight: premiumFontWeights.medium,
      letterSpacing: premiumLetterSpacing.normal
    }
  },

  // Heading styles (section headings, page titles)
  heading: {
    h1: {
      fontFamily: premiumFontFamilies.sans,
      fontSize: premiumFontSizes['3xl'].fontSize,
      lineHeight: premiumFontSizes['3xl'].lineHeight,
      fontWeight: premiumFontWeights.bold,
      letterSpacing: premiumLetterSpacing.tight
    },
    h2: {
      fontFamily: premiumFontFamilies.sans,
      fontSize: premiumFontSizes['2xl'].fontSize,
      lineHeight: premiumFontSizes['2xl'].lineHeight,
      fontWeight: premiumFontWeights.semibold,
      letterSpacing: premiumLetterSpacing.tight
    },
    h3: {
      fontFamily: premiumFontFamilies.sans,
      fontSize: premiumFontSizes.xl.fontSize,
      lineHeight: premiumFontSizes.xl.lineHeight,
      fontWeight: premiumFontWeights.semibold,
      letterSpacing: premiumLetterSpacing.normal
    },
    h4: {
      fontFamily: premiumFontFamilies.sans,
      fontSize: premiumFontSizes.lg.fontSize,
      lineHeight: premiumFontSizes.lg.lineHeight,
      fontWeight: premiumFontWeights.medium,
      letterSpacing: premiumLetterSpacing.normal
    },
    h5: {
      fontFamily: premiumFontFamilies.sans,
      fontSize: premiumFontSizes.base.fontSize,
      lineHeight: premiumFontSizes.base.lineHeight,
      fontWeight: premiumFontWeights.medium,
      letterSpacing: premiumLetterSpacing.normal
    },
    h6: {
      fontFamily: premiumFontFamilies.sans,
      fontSize: premiumFontSizes.sm.fontSize,
      lineHeight: premiumFontSizes.sm.lineHeight,
      fontWeight: premiumFontWeights.medium,
      letterSpacing: premiumLetterSpacing.wide
    }
  },

  // Body text styles
  body: {
    xl: {
      fontFamily: premiumFontFamilies.sans,
      fontSize: premiumFontSizes.xl.fontSize,
      lineHeight: premiumFontSizes.xl.lineHeight,
      fontWeight: premiumFontWeights.normal,
      letterSpacing: premiumLetterSpacing.normal
    },
    lg: {
      fontFamily: premiumFontFamilies.sans,
      fontSize: premiumFontSizes.lg.fontSize,
      lineHeight: premiumFontSizes.lg.lineHeight,
      fontWeight: premiumFontWeights.normal,
      letterSpacing: premiumLetterSpacing.normal
    },
    base: {
      fontFamily: premiumFontFamilies.sans,
      fontSize: premiumFontSizes.base.fontSize,
      lineHeight: premiumFontSizes.base.lineHeight,
      fontWeight: premiumFontWeights.normal,
      letterSpacing: premiumLetterSpacing.normal
    },
    sm: {
      fontFamily: premiumFontFamilies.sans,
      fontSize: premiumFontSizes.sm.fontSize,
      lineHeight: premiumFontSizes.sm.lineHeight,
      fontWeight: premiumFontWeights.normal,
      letterSpacing: premiumLetterSpacing.normal
    },
    xs: {
      fontFamily: premiumFontFamilies.sans,
      fontSize: premiumFontSizes.xs.fontSize,
      lineHeight: premiumFontSizes.xs.lineHeight,
      fontWeight: premiumFontWeights.normal,
      letterSpacing: premiumLetterSpacing.wide
    }
  },

  // Code styles
  code: {
    xl: {
      fontFamily: premiumFontFamilies.mono,
      fontSize: premiumFontSizes.xl.fontSize,
      lineHeight: premiumFontSizes.xl.lineHeight,
      fontWeight: premiumFontWeights.normal,
      letterSpacing: premiumLetterSpacing.normal
    },
    lg: {
      fontFamily: premiumFontFamilies.mono,
      fontSize: premiumFontSizes.lg.fontSize,
      lineHeight: premiumFontSizes.lg.lineHeight,
      fontWeight: premiumFontWeights.normal,
      letterSpacing: premiumLetterSpacing.normal
    },
    base: {
      fontFamily: premiumFontFamilies.mono,
      fontSize: premiumFontSizes.base.fontSize,
      lineHeight: premiumFontSizes.base.lineHeight,
      fontWeight: premiumFontWeights.normal,
      letterSpacing: premiumLetterSpacing.normal
    },
    sm: {
      fontFamily: premiumFontFamilies.mono,
      fontSize: premiumFontSizes.sm.fontSize,
      lineHeight: premiumFontSizes.sm.lineHeight,
      fontWeight: premiumFontWeights.normal,
      letterSpacing: premiumLetterSpacing.normal
    },
    xs: {
      fontFamily: premiumFontFamilies.mono,
      fontSize: premiumFontSizes.xs.fontSize,
      lineHeight: premiumFontSizes.xs.lineHeight,
      fontWeight: premiumFontWeights.normal,
      letterSpacing: premiumLetterSpacing.normal
    }
  },

  // Label styles (forms, UI elements)
  label: {
    lg: {
      fontFamily: premiumFontFamilies.sans,
      fontSize: premiumFontSizes.lg.fontSize,
      lineHeight: premiumFontSizes.lg.lineHeight,
      fontWeight: premiumFontWeights.medium,
      letterSpacing: premiumLetterSpacing.normal
    },
    base: {
      fontFamily: premiumFontFamilies.sans,
      fontSize: premiumFontSizes.base.fontSize,
      lineHeight: premiumFontSizes.base.lineHeight,
      fontWeight: premiumFontWeights.medium,
      letterSpacing: premiumLetterSpacing.normal
    },
    sm: {
      fontFamily: premiumFontFamilies.sans,
      fontSize: premiumFontSizes.sm.fontSize,
      lineHeight: premiumFontSizes.sm.lineHeight,
      fontWeight: premiumFontWeights.medium,
      letterSpacing: premiumLetterSpacing.wide
    },
    xs: {
      fontFamily: premiumFontFamilies.sans,
      fontSize: premiumFontSizes.xs.fontSize,
      lineHeight: premiumFontSizes.xs.lineHeight,
      fontWeight: premiumFontWeights.medium,
      letterSpacing: premiumLetterSpacing.wider
    }
  }
} as const;

// Export premium typography system
export const premiumTypography = {
  families: premiumFontFamilies,
  weights: premiumFontWeights,
  sizes: premiumFontSizes,
  letterSpacing: premiumLetterSpacing,
  styles: premiumTypographyStyles
} as const;

// Typography utility functions
export const typographyUtils = {
  // Generate CSS custom properties
  generateCSSProperties: () => {
    const properties: Record<string, string> = {};

    // Font families
    Object.entries(premiumFontFamilies).forEach(([key, value]) => {
      properties[`--font-${key}`] = value;
    });

    // Font weights
    Object.entries(premiumFontWeights).forEach(([key, value]) => {
      properties[`--font-weight-${key}`] = value.toString();
    });

    // Font sizes
    Object.entries(premiumFontSizes).forEach(([key, value]) => {
      properties[`--font-size-${key}`] = value.fontSize;
      properties[`--line-height-${key}`] = value.lineHeight;
    });

    return properties;
  },

  // Get responsive typography
  responsive: (baseSize: keyof typeof premiumFontSizes, scale: number = 1.2) => ({
    mobile: premiumFontSizes[baseSize],
    tablet: {
      fontSize: `calc(${premiumFontSizes[baseSize].fontSize} * ${scale})`,
      lineHeight: `calc(${premiumFontSizes[baseSize].lineHeight} * ${scale})`
    },
    desktop: {
      fontSize: `calc(${premiumFontSizes[baseSize].fontSize} * ${scale * scale})`,
      lineHeight: `calc(${premiumFontSizes[baseSize].lineHeight} * ${scale * scale})`
    }
  })
} as const;