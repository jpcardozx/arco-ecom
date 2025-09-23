/**
 * ARCO Design System - Premium S-Tier Spacing System
 * Mathematical spacing scale based on 8px grid with premium ratios
 */

// Base unit for all spacing calculations
export const SPACING_UNIT = 8;

// Premium spacing scale - Based on mathematical ratios for perfect visual harmony
export const premiumSpacing = {
  // Micro spacing (0-8px)
  '0': '0rem',                    // 0px
  'px': '0.0625rem',              // 1px - for borders
  '0.5': '0.125rem',              // 2px
  '1': '0.25rem',                 // 4px
  '2': '0.5rem',                  // 8px - base unit

  // Small spacing (12-24px)
  '3': '0.75rem',                 // 12px
  '4': '1rem',                    // 16px
  '5': '1.25rem',                 // 20px
  '6': '1.5rem',                  // 24px

  // Medium spacing (28-48px)
  '7': '1.75rem',                 // 28px
  '8': '2rem',                    // 32px
  '9': '2.25rem',                 // 36px
  '10': '2.5rem',                 // 40px
  '11': '2.75rem',                // 44px
  '12': '3rem',                   // 48px

  // Large spacing (56-96px)
  '14': '3.5rem',                 // 56px
  '16': '4rem',                   // 64px
  '18': '4.5rem',                 // 72px
  '20': '5rem',                   // 80px
  '24': '6rem',                   // 96px

  // Extra large spacing (112-192px)
  '28': '7rem',                   // 112px
  '32': '8rem',                   // 128px
  '36': '9rem',                   // 144px
  '40': '10rem',                  // 160px
  '44': '11rem',                  // 176px
  '48': '12rem',                  // 192px

  // Massive spacing (224-384px)
  '56': '14rem',                  // 224px
  '64': '16rem',                  // 256px
  '72': '18rem',                  // 288px
  '80': '20rem',                  // 320px
  '96': '24rem',                  // 384px
} as const;

// Semantic spacing aliases for common use cases
export const semanticSpacing = {
  // Component spacing
  component: {
    'xs': premiumSpacing['2'],      // 8px
    'sm': premiumSpacing['4'],      // 16px
    'md': premiumSpacing['6'],      // 24px
    'lg': premiumSpacing['8'],      // 32px
    'xl': premiumSpacing['12'],     // 48px
    '2xl': premiumSpacing['16'],    // 64px
    '3xl': premiumSpacing['24'],    // 96px
  },

  // Section spacing
  section: {
    'xs': premiumSpacing['12'],     // 48px
    'sm': premiumSpacing['16'],     // 64px
    'md': premiumSpacing['24'],     // 96px
    'lg': premiumSpacing['32'],     // 128px
    'xl': premiumSpacing['48'],     // 192px
    '2xl': premiumSpacing['64'],    // 256px
    '3xl': premiumSpacing['96'],    // 384px
  },

  // Layout spacing
  layout: {
    'xs': premiumSpacing['16'],     // 64px
    'sm': premiumSpacing['20'],     // 80px
    'md': premiumSpacing['24'],     // 96px
    'lg': premiumSpacing['32'],     // 128px
    'xl': premiumSpacing['40'],     // 160px
    '2xl': premiumSpacing['56'],    // 224px
    '3xl': premiumSpacing['80'],    // 320px
  }
} as const;

// Container sizes for different content types
export const containerSizes = {
  // Text containers (optimal reading width)
  text: {
    'sm': '36rem',                  // 576px - for narrow content
    'md': '42rem',                  // 672px - for articles
    'lg': '48rem',                  // 768px - for long form
    'xl': '56rem',                  // 896px - for wide content
  },

  // Content containers
  content: {
    'sm': '640px',
    'md': '768px',
    'lg': '1024px',
    'xl': '1280px',
    '2xl': '1536px',
    '3xl': '1728px',
    '4xl': '1920px',
  },

  // Component containers
  component: {
    'xs': '20rem',                  // 320px - mobile cards
    'sm': '24rem',                  // 384px - small cards
    'md': '28rem',                  // 448px - medium cards
    'lg': '32rem',                  // 512px - large cards
    'xl': '36rem',                  // 576px - extra large cards
    '2xl': '42rem',                 // 672px - modals
    '3xl': '48rem',                 // 768px - large modals
  }
} as const;

// Responsive spacing helpers
export const responsiveSpacing = {
  // Mobile-first spacing that scales up
  mobile: {
    'xs': premiumSpacing['2'],      // 8px on mobile
    'sm': premiumSpacing['4'],      // 16px on mobile
    'md': premiumSpacing['6'],      // 24px on mobile
    'lg': premiumSpacing['8'],      // 32px on mobile
    'xl': premiumSpacing['12'],     // 48px on mobile
  },

  tablet: {
    'xs': premiumSpacing['3'],      // 12px on tablet
    'sm': premiumSpacing['6'],      // 24px on tablet
    'md': premiumSpacing['8'],      // 32px on tablet
    'lg': premiumSpacing['12'],     // 48px on tablet
    'xl': premiumSpacing['16'],     // 64px on tablet
  },

  desktop: {
    'xs': premiumSpacing['4'],      // 16px on desktop
    'sm': premiumSpacing['8'],      // 32px on desktop
    'md': premiumSpacing['12'],     // 48px on desktop
    'lg': premiumSpacing['16'],     // 64px on desktop
    'xl': premiumSpacing['24'],     // 96px on desktop
  }
} as const;

// Negative spacing for overlaps and offsets
export const negativeSpacing = Object.entries(premiumSpacing).reduce((acc, [key, value]) => {
  if (key !== '0') {
    acc[`-${key}`] = `-${value}`;
  }
  return acc;
}, {} as Record<string, string>);

// Grid system based on premium spacing
export const gridSpacing = {
  // Gap sizes for CSS Grid and Flexbox
  gap: {
    'none': '0',
    'xs': premiumSpacing['1'],      // 4px
    'sm': premiumSpacing['2'],      // 8px
    'md': premiumSpacing['4'],      // 16px
    'lg': premiumSpacing['6'],      // 24px
    'xl': premiumSpacing['8'],      // 32px
    '2xl': premiumSpacing['12'],    // 48px
    '3xl': premiumSpacing['16'],    // 64px
  },

  // Column gaps specifically
  columnGap: {
    'xs': premiumSpacing['4'],      // 16px
    'sm': premiumSpacing['6'],      // 24px
    'md': premiumSpacing['8'],      // 32px
    'lg': premiumSpacing['12'],     // 48px
    'xl': premiumSpacing['16'],     // 64px
  },

  // Row gaps specifically
  rowGap: {
    'xs': premiumSpacing['6'],      // 24px
    'sm': premiumSpacing['8'],      // 32px
    'md': premiumSpacing['12'],     // 48px
    'lg': premiumSpacing['16'],     // 64px
    'xl': premiumSpacing['24'],     // 96px
  }
} as const;

// Spacing utilities for common patterns
export const spacingUtils = {
  // Generate CSS custom properties
  generateCSSProperties: () => {
    const properties: Record<string, string> = {};

    // Basic spacing
    Object.entries(premiumSpacing).forEach(([key, value]) => {
      properties[`--spacing-${key}`] = value;
    });

    // Semantic spacing
    Object.entries(semanticSpacing).forEach(([category, sizes]) => {
      Object.entries(sizes).forEach(([size, value]) => {
        properties[`--spacing-${category}-${size}`] = value;
      });
    });

    return properties;
  },

  // Get spacing value
  get: (key: keyof typeof premiumSpacing) => premiumSpacing[key],

  // Get semantic spacing
  getSemantic: (category: keyof typeof semanticSpacing, size: string) => {
    return semanticSpacing[category][size as keyof typeof semanticSpacing[typeof category]];
  },

  // Create responsive spacing object for CSS-in-JS
  responsive: (mobile: string, tablet?: string, desktop?: string) => ({
    '@media (min-width: 768px)': {
      padding: tablet || mobile,
      margin: tablet || mobile,
    },
    '@media (min-width: 1024px)': {
      padding: desktop || tablet || mobile,
      margin: desktop || tablet || mobile,
    }
  }),

  // Common spacing patterns
  patterns: {
    // Card padding
    cardPadding: {
      'sm': premiumSpacing['4'],
      'md': premiumSpacing['6'],
      'lg': premiumSpacing['8'],
    },

    // Button padding
    buttonPadding: {
      'sm': `${premiumSpacing['2']} ${premiumSpacing['3']}`,
      'md': `${premiumSpacing['3']} ${premiumSpacing['4']}`,
      'lg': `${premiumSpacing['4']} ${premiumSpacing['6']}`,
    },

    // Input padding
    inputPadding: {
      'sm': `${premiumSpacing['2']} ${premiumSpacing['3']}`,
      'md': `${premiumSpacing['3']} ${premiumSpacing['4']}`,
      'lg': `${premiumSpacing['4']} ${premiumSpacing['5']}`,
    },

    // Stack spacing (vertical rhythm)
    stack: {
      'tight': premiumSpacing['2'],
      'normal': premiumSpacing['4'],
      'loose': premiumSpacing['6'],
      'relaxed': premiumSpacing['8'],
    }
  }
} as const;

// Export complete spacing system
export const spacing = {
  base: premiumSpacing,
  semantic: semanticSpacing,
  containers: containerSizes,
  responsive: responsiveSpacing,
  negative: negativeSpacing,
  grid: gridSpacing,
  utils: spacingUtils
} as const;