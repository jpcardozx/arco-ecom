'use client'

/**
 * ARCO Premium Transition System
 * 
 * This file exports a unified API for all ARCO transition modules,
 * allowing components to import from a single entry point.
 */

// Re-export everything from individual modules
export * from './transitions'
export * from './micro-transitions'
export * from './ui/badge-animations'

// Main module
import { easings, durations } from './transitions'
import { hoverTransforms, feedbackAnimations, focusAnimations } from './micro-transitions'
import { statusBadgeAnimations, createLayeredBadge } from './ui/badge-animations'

// Create preset combinations
export const presets = {
  buttons: {
    primary: {
      initial: { opacity: 0, y: 10 },
      animate: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: durations.medium,
          ease: easings.smooth
        }
      },
      hover: hoverTransforms.subtle,
      tap: feedbackAnimations.tap,
      focus: focusAnimations.standard
    },
    secondary: {
      initial: { opacity: 0, y: 10 },
      animate: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: durations.medium,
          ease: easings.smooth
        }
      },
      hover: hoverTransforms.subtle,
      tap: feedbackAnimations.tap,
      focus: focusAnimations.standard
    },
    tertiary: {
      initial: { opacity: 0 },
      animate: { 
        opacity: 1,
        transition: {
          duration: durations.fast
        }
      },
      hover: hoverTransforms.highlight,
      tap: feedbackAnimations.tap,
      focus: focusAnimations.standard
    }
  },
  
  cards: {
    premium: {
      initial: { opacity: 0, y: 20 },
      animate: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: durations.medium,
          ease: easings.smooth
        }
      },
      hover: hoverTransforms.elevate,
      focus: focusAnimations.standard
    },
    standard: {
      initial: { opacity: 0, y: 20 },
      animate: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: durations.medium,
          ease: easings.standard
        }
      },
      hover: hoverTransforms.subtle,
      focus: focusAnimations.standard
    }
  }
}

// Helper functions
export const getStaggerConfig = (childrenCount: number, staggerAmount = 0.05, initialDelay = 0) => {
  return {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: staggerAmount,
        delayChildren: initialDelay
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: staggerAmount / 2,
        staggerDirection: -1
      }
    }
  }
}

// Export everything in a convenient object for selective importing
const arcoMotion = {
  easings,
  durations,
  hoverTransforms,
  feedbackAnimations,
  focusAnimations,
  statusBadgeAnimations,
  createLayeredBadge,
  presets,
  getStaggerConfig
}

export default arcoMotion
