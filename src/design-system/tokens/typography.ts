/**
 * ARCO Design System - Professional Typography System
 * Enterprise-grade typography for business applications
 */

// Professional Font Stack
export const fontFamilies = {
  // Primary - Modern Professional Sans-Serif
  sans: [
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif'
  ],

  // Secondary - Elegant Serif for Headlines
  serif: [
    'Charter',
    'Bitstream Charter',
    'Sitka Text',
    'Cambria',
    'serif'
  ],

  // Monospace - Professional Code/Data Display
  mono: [
    'JetBrains Mono',
    'SF Mono',
    'Monaco',
    'Cascadia Code',
    'Roboto Mono',
    'Courier New',
    'monospace'
  ]
} as const;

// Professional Font Weights
export const fontWeights = {
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

// Professional Type Scale - Based on Major Third (1.25)
export const fontSizes = {
  // Small text
  xs: {
    fontSize: '0.75rem',    // 12px
    lineHeight: '1rem'      // 16px
  },
  sm: {
    fontSize: '0.875rem',   // 14px
    lineHeight: '1.25rem'   // 20px
  },

  // Body text
  base: {
    fontSize: '1rem',       // 16px
    lineHeight: '1.5rem'    // 24px
  },
  lg: {
    fontSize: '1.125rem',   // 18px
    lineHeight: '1.75rem'   // 28px
  },

  // Headlines
  xl: {
    fontSize: '1.25rem',    // 20px
    lineHeight: '1.75rem'   // 28px
  },
  '2xl': {
    fontSize: '1.5rem',     // 24px
    lineHeight: '2rem'      // 32px
  },
  '3xl': {
    fontSize: '1.875rem',   // 30px
    lineHeight: '2.25rem'   // 36px
  },
  '4xl': {
    fontSize: '2.25rem',    // 36px
    lineHeight: '2.5rem'    // 40px
  },

  // Display sizes
  '5xl': {
    fontSize: '3rem',       // 48px
    lineHeight: '1'         // 48px
  },
  '6xl': {
    fontSize: '3.75rem',    // 60px
    lineHeight: '1'         // 60px
  },
  '7xl': {
    fontSize: '4.5rem',     // 72px
    lineHeight: '1'         // 72px
  },
  '8xl': {
    fontSize: '6rem',       // 96px
    lineHeight: '1'         // 96px
  },
  '9xl': {
    fontSize: '8rem',       // 128px
    lineHeight: '1'         // 128px
  }
} as const;

// Professional Text Styles - Semantic Typography
export const textStyles = {
  // Display styles - For major headlines
  'display-large': {
    fontSize: fontSizes['6xl'].fontSize,
    lineHeight: fontSizes['6xl'].lineHeight,
    fontWeight: fontWeights.bold,
    fontFamily: fontFamilies.serif.join(', '),
    letterSpacing: '-0.02em'
  },
  'display-medium': {
    fontSize: fontSizes['5xl'].fontSize,
    lineHeight: fontSizes['5xl'].lineHeight,
    fontWeight: fontWeights.bold,
    fontFamily: fontFamilies.serif.join(', '),
    letterSpacing: '-0.02em'
  },
  'display-small': {
    fontSize: fontSizes['4xl'].fontSize,
    lineHeight: fontSizes['4xl'].lineHeight,
    fontWeight: fontWeights.semibold,
    fontFamily: fontFamilies.serif.join(', '),
    letterSpacing: '-0.01em'
  },

  // Headline styles
  'headline-large': {
    fontSize: fontSizes['3xl'].fontSize,
    lineHeight: fontSizes['3xl'].lineHeight,
    fontWeight: fontWeights.semibold,
    fontFamily: fontFamilies.sans.join(', '),
    letterSpacing: '-0.01em'
  },
  'headline-medium': {
    fontSize: fontSizes['2xl'].fontSize,
    lineHeight: fontSizes['2xl'].lineHeight,
    fontWeight: fontWeights.semibold,
    fontFamily: fontFamilies.sans.join(', ')
  },
  'headline-small': {
    fontSize: fontSizes.xl.fontSize,
    lineHeight: fontSizes.xl.lineHeight,
    fontWeight: fontWeights.semibold,
    fontFamily: fontFamilies.sans.join(', ')
  },

  // Title styles
  'title-large': {
    fontSize: fontSizes.lg.fontSize,
    lineHeight: fontSizes.lg.lineHeight,
    fontWeight: fontWeights.medium,
    fontFamily: fontFamilies.sans.join(', ')
  },
  'title-medium': {
    fontSize: fontSizes.base.fontSize,
    lineHeight: fontSizes.base.lineHeight,
    fontWeight: fontWeights.medium,
    fontFamily: fontFamilies.sans.join(', ')
  },
  'title-small': {
    fontSize: fontSizes.sm.fontSize,
    lineHeight: fontSizes.sm.lineHeight,
    fontWeight: fontWeights.medium,
    fontFamily: fontFamilies.sans.join(', ')
  },

  // Body styles
  'body-large': {
    fontSize: fontSizes.lg.fontSize,
    lineHeight: fontSizes.lg.lineHeight,
    fontWeight: fontWeights.normal,
    fontFamily: fontFamilies.sans.join(', ')
  },
  'body-medium': {
    fontSize: fontSizes.base.fontSize,
    lineHeight: fontSizes.base.lineHeight,
    fontWeight: fontWeights.normal,
    fontFamily: fontFamilies.sans.join(', ')
  },
  'body-small': {
    fontSize: fontSizes.sm.fontSize,
    lineHeight: fontSizes.sm.lineHeight,
    fontWeight: fontWeights.normal,
    fontFamily: fontFamilies.sans.join(', ')
  },

  // Label styles
  'label-large': {
    fontSize: fontSizes.base.fontSize,
    lineHeight: fontSizes.base.lineHeight,
    fontWeight: fontWeights.medium,
    fontFamily: fontFamilies.sans.join(', ')
  },
  'label-medium': {
    fontSize: fontSizes.sm.fontSize,
    lineHeight: fontSizes.sm.lineHeight,
    fontWeight: fontWeights.medium,
    fontFamily: fontFamilies.sans.join(', ')
  },
  'label-small': {
    fontSize: fontSizes.xs.fontSize,
    lineHeight: fontSizes.xs.lineHeight,
    fontWeight: fontWeights.medium,
    fontFamily: fontFamilies.sans.join(', '),
    letterSpacing: '0.01em'
  },

  // Code styles
  'code-large': {
    fontSize: fontSizes.base.fontSize,
    lineHeight: fontSizes.base.lineHeight,
    fontWeight: fontWeights.normal,
    fontFamily: fontFamilies.mono.join(', ')
  },
  'code-medium': {
    fontSize: fontSizes.sm.fontSize,
    lineHeight: fontSizes.sm.lineHeight,
    fontWeight: fontWeights.normal,
    fontFamily: fontFamilies.mono.join(', ')
  },
  'code-small': {
    fontSize: fontSizes.xs.fontSize,
    lineHeight: fontSizes.xs.lineHeight,
    fontWeight: fontWeights.normal,
    fontFamily: fontFamilies.mono.join(', ')
  }
} as const;

// Professional Letter Spacing
export const letterSpacing = {
  tighter: '-0.02em',
  tight: '-0.01em',
  normal: '0em',
  wide: '0.01em',
  wider: '0.02em',
  widest: '0.04em'
} as const;

// Export everything
export const typography = {
  fontFamilies,
  fontWeights,
  fontSizes,
  textStyles,
  letterSpacing
} as const;

// Type definitions
export type FontFamily = keyof typeof fontFamilies;
export type FontWeight = keyof typeof fontWeights;
export type FontSize = keyof typeof fontSizes;
export type TextStyle = keyof typeof textStyles;
export type LetterSpacing = keyof typeof letterSpacing;