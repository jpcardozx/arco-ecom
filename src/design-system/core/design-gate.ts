/**
 * ARCO Design System Gate - Mandatory Design System Enforcement
 * Ensures all components follow professional design standards
 */

import React from 'react';
import { premiumColors as colors } from '../tokens/colors-premium';
import { typography } from '../tokens/typography';

// Design System Validation Types
interface DesignToken {
  value: string | number;
  category: 'color' | 'typography' | 'spacing' | 'elevation';
  tier: 'base' | 'semantic' | 'component';
}

interface ComponentProps {
  [key: string]: any;
}

// Design System Gate Class
export class DesignSystemGate {
  private static instance: DesignSystemGate;
  private validatedComponents = new Set<string>();
  private enforceStrict = process.env.NODE_ENV === 'production';

  static getInstance(): DesignSystemGate {
    if (!DesignSystemGate.instance) {
      DesignSystemGate.instance = new DesignSystemGate();
    }
    return DesignSystemGate.instance;
  }

  /**
   * Validates that a component uses only approved design tokens
   */
  validateComponent(componentName: string, props: ComponentProps): void {
    if (this.validatedComponents.has(componentName)) {
      return;
    }

    const violations: string[] = [];

    // Check for banned inline styles
    if (props.style && this.enforceStrict) {
      violations.push(`Component "${componentName}" uses banned inline styles. Use design tokens instead.`);
    }

    // Check for banned CSS classes (magic colors/sizes)
    if (props.className) {
      const bannedPatterns = [
        /bg-\[#[0-9a-fA-F]{6}\]/, // Arbitrary color values
        /text-\[#[0-9a-fA-F]{6}\]/, // Arbitrary text colors
        /w-\[[0-9]+px\]/, // Arbitrary pixel widths
        /h-\[[0-9]+px\]/, // Arbitrary pixel heights
        /p-\[[0-9]+px\]/, // Arbitrary pixel padding
        /m-\[[0-9]+px\]/, // Arbitrary pixel margins
      ];

      bannedPatterns.forEach((pattern, index) => {
        if (pattern.test(props.className)) {
          violations.push(`Component "${componentName}" uses banned arbitrary values. Use design tokens instead.`);
        }
      });
    }

    if (violations.length > 0 && this.enforceStrict) {
      throw new Error(`Design System Violations:\n${violations.join('\n')}`);
    }

    if (violations.length > 0) {
      console.warn(`Design System Warnings for "${componentName}":\n${violations.join('\n')}`);
    }

    this.validatedComponents.add(componentName);
  }

  /**
   * Validates color usage against approved palette
   */
  validateColor(color: string, context?: string): boolean {
    // Função auxiliar para achatar objetos aninhados de cores
    const flattenColors = (obj: any): string[] => {
      const result: string[] = [];
      for (const value of Object.values(obj)) {
        if (typeof value === 'string') {
          result.push(value);
        } else if (typeof value === 'object' && value !== null) {
          result.push(...flattenColors(value));
        }
      }
      return result;
    };

    const approvedColors: string[] = [
      ...flattenColors(colors.brand),
      ...flattenColors(colors.semantic),
      ...flattenColors(colors.surface),
      ...flattenColors(colors.text),
      ...flattenColors(colors.border)
    ];

    const isApproved = approvedColors.includes(color);

    if (!isApproved && this.enforceStrict) {
      throw new Error(`Unapproved color "${color}" used${context ? ` in ${context}` : ''}. Use design system colors only.`);
    }

    return isApproved;
  }

  /**
   * Recursively flattens the color token object into a flat array of hex strings.
   */
  private flattenColorValues(obj: any): string[] {
    let values: string[] = [];
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        values.push(obj[key]);
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        values = values.concat(this.flattenColorValues(obj[key]));
      }
    }
    return values;
  }

  /**
   * Validates typography usage
   */
  validateTypography(fontSize: string, fontWeight?: string, fontFamily?: string): boolean {
    const approvedSizes = Object.keys(typography.fontSizes);
    const approvedWeights = Object.keys(typography.fontWeights);
    const approvedFamilies = Object.keys(typography.fontFamilies);

    const violations: string[] = [];

    if (!approvedSizes.includes(fontSize)) {
      violations.push(`Unapproved font size "${fontSize}"`);
    }

    if (fontWeight && !approvedWeights.includes(fontWeight)) {
      violations.push(`Unapproved font weight "${fontWeight}"`);
    }

    if (fontFamily && !approvedFamilies.includes(fontFamily)) {
      violations.push(`Unapproved font family "${fontFamily}"`);
    }

    if (violations.length > 0 && this.enforceStrict) {
      throw new Error(`Typography violations: ${violations.join(', ')}`);
    }

    return violations.length === 0;
  }

  /**
   * Get approved design tokens for development tools
   */
  getApprovedTokens() {
    return {
      colors: colors,
      typography: typography,
      spacing: this.getSpacingScale(),
      elevation: this.getElevationScale()
    };
  }

  private getSpacingScale() {
    return {
      0: '0',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      6: '1.5rem',
      8: '2rem',
      12: '3rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      32: '8rem'
    };
  }

  private getElevationScale() {
    return {
      none: '0 0 #0000',
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)'
    };
  }
}

// Singleton instance
export const designGate = DesignSystemGate.getInstance();

// React Hook for component validation
export function useDesignGate(componentName: string, props: ComponentProps) {
  if (process.env.NODE_ENV !== 'production') {
    designGate.validateComponent(componentName, props);
  }
}

// HOC for automatic validation
export function withDesignGate<T extends ComponentProps>(
  Component: React.ComponentType<T>,
  componentName?: string
) {
  return function ValidatedComponent(props: T) {
    const name = componentName || Component.displayName || Component.name || 'UnknownComponent';

    if (process.env.NODE_ENV !== 'production') {
      designGate.validateComponent(name, props);
    }

    return React.createElement(Component, props);
  };
}