'use client'

import { easings, durations } from './transitions'

/**
 * Visual-first micro-transitions for ARCO
 * 
 * These refined visual enhancements focus on subtle feedback and quality
 * without excessive animation. Designed for a premium visual experience
 * that prioritizes design over motion.
 */

// Refined hover effects focused on subtle visual feedback
export const hoverTransforms = {
  subtle: {
    y: -1, // Reduced from -2
    transition: {
      duration: 0.15, // Reduced from 0.2
      ease: easings.precise
    }
  },
  
  elevate: {
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    transition: {
      duration: 0.15,
      ease: easings.standard
    }
  },
  
  highlight: {
    backgroundColor: "rgba(16, 185, 129, 0.05)", // Reduced opacity from 0.1
    transition: {
      duration: 0.15,
      ease: easings.precise
    }
  }
}

// Minimal feedback animations for user interactions
export const feedbackAnimations = {
  tap: {
    opacity: 0.9, // Instead of scaling, just change opacity
    transition: {
      duration: 0.1,
      ease: easings.precise
    }
  },
  
  success: {
    borderColor: "rgba(16, 185, 129, 0.5)",
    boxShadow: "0 0 0 2px rgba(16, 185, 129, 0.3)",
    transition: {
      duration: 0.3, // Reduced from 0.4
      ease: easings.standard
    }
  },
  
  error: {
    borderColor: "rgba(220, 38, 38, 0.5)",
    boxShadow: "0 0 0 2px rgba(220, 38, 38, 0.3)",
    transition: {
      duration: 0.3,
      ease: easings.standard
    }
  },
  
  loading: {
    opacity: [1, 0.8, 1],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// Focus state animations for accessibility - simplified but still accessible
export const focusAnimations = {
  standard: {
    boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.4)",
    transition: {
      duration: 0.15,
      ease: easings.precise
    }
  }
}

// Helper to apply proper reduced motion settings
export const getMotionSafeAnimations = (animationStyle: any, enableAnimation: boolean) => {
  if (!enableAnimation) {
    // Return no-motion version
    return {
      ...animationStyle,
      y: undefined,
      x: undefined,
      scale: undefined,
      transition: {
        duration: 0,
      }
    }
  }
  
  return animationStyle
}

// Clean scroll-triggered animations
export const scrollAnimations = {
  fadeIn: {
    opacity: [0, 1],
    transition: {
      duration: durations.fast,
      ease: easings.standard
    }
  },
  
  // More subtle fade in
  subtleFade: {
    opacity: [0.6, 1], // Start at 0.6 instead of 0 for more subtlety
    transition: {
      duration: durations.fast,
      ease: easings.standard
    }
  }
}
