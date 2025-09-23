/**
 * Type definitions for the ARCO Section components
 */

import { ReactNode } from 'react'

/**
 * Variant configuration for sections
 */
export interface VariantConfig {
  background: string
  textColor: string
  decorations?: Array<{
    type: string
    position: string
    intensity: string
    animated: boolean
  }>
}

/**
 * Options for intersection observer hook
 */
export interface UseIntersectionObserverOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
  root?: Element | null
  freezeOnceVisible?: boolean
  skipIfInvisible?: boolean
}

/**
 * Props for the ARCOSection component
 */
export interface ARCOSectionProps {
  children: ReactNode
  id?: string
  variant?: 'light' | 'dark' | 'accent' | 'subtle'
  background?: 'none' | 'gradient' | 'subtle'
  spacing?: 'sm' | 'md' | 'lg' | 'xl'
  divider?: {
    position?: 'top' | 'bottom' | 'both'
    className?: string
  }
  className?: string
  animated?: boolean
  withContainer?: boolean
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl' | 'full'
  'aria-label'?: string
  'aria-labelledby'?: string
}

/**
 * Props for the ARCOSectionHeader component
 */
export interface ARCOSectionHeaderProps {
  badge?: string
  title: string
  description?: string
  align?: 'left' | 'center' | 'right'
  theme?: 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
  badgeVariant?: 'default' | 'outline' | 'accent'
  className?: string
  priority?: boolean
  titleId?: string
  subtitle?: string
}

/**
 * Props for the ARCOPageClient component
 */
export interface ARCOPageClientProps {
  children: ReactNode
  className?: string
  animated?: boolean
}

