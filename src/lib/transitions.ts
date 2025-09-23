'use client'

import { Variants } from 'framer-motion'

/**
 * Refined transition presets for ARCO
 * 
 * Visual-first, performance-optimized transitions for critical UI components.
 * Prioritizing visual design with minimal animation overhead.
 */

export const easings = {
  // Clean, professional easings
  standard: [0.3, 0.1, 0.3, 1], // More subtle cubic bezier
  smooth: [0.4, 0.1, 0.2, 1], // Simplified smooth entrance, no overshoot
  bounce: [0.25, 0.46, 0.45, 1.02], // Reduced bounce effect
  precise: [0.4, 0.0, 0.2, 1], // Material acceleration curve
}

export const durations = {
  fast: 0.3, // Reduced from 0.4
  medium: 0.5, // Reduced from 0.65
  slow: 0.7, // Reduced from 0.85
}

/**
 * Section transition variants - minimalist approach with focus on visual quality
 */
export const sectionTransitions: Record<string, Variants> = {
  // Clean fade transition - subtle and quick
  fade: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: durations.fast, // Faster transition
        ease: easings.standard 
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: durations.fast, 
        ease: easings.standard 
      }
    }
  },
  
  // Subtle vertical slide - minimal movement
  slideUp: {
    hidden: { opacity: 0, y: 15 }, // Reduced movement from 30 to 15
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: durations.medium, 
        ease: easings.smooth,
      }
    },
    exit: { 
      opacity: 0,
      transition: { // Removed y movement on exit
        duration: durations.fast, 
        ease: easings.standard 
      }
    }
  },
  
  // Clean reveal transition - more subtle
  reveal: {
    hidden: { 
      opacity: 0, 
      y: 20 // Reduced movement from 50 to 20, removed clipPath for simpler animation
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: durations.medium, // Faster
        ease: easings.precise
      }
    }
  }
}

/**
 * Container transitions - minimal, visually refined animations
 */
export const containerTransitions: Record<string, Variants> = {
  // Subtle stagger with reduced timing
  staggerChildren: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Reduced from 0.08
        delayChildren: 0.05, // Reduced from 0.1
        ease: easings.standard,
      }
    }
  },
  
  // Clean reveal without scaling
  cleanReveal: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: durations.fast,
        ease: easings.standard,
      }
    }
  }
}

/**
 * Header transitions - minimal animations focusing on visual hierarchy
 */
export const headerTransitions: Record<string, Variants> = {
  // Clean title reveal
  titleFade: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: durations.medium,
        ease: easings.standard,
      }
    }
  },
  
  // Subtle accent text reveal
  accentText: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: durations.medium,
        delay: 0.1, // Reduced from 0.15
        ease: easings.smooth,
      }
    }
  }
}

/**
 * Badge transitions - refined with minimal animation
 */
export const badgeTransitions: Record<string, Variants> = {
  // Minimal fade for badges
  minimal: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: durations.fast,
        ease: easings.standard,
      }
    },
    hover: {
      y: -2,
      transition: {
        duration: 0.2,
        ease: easings.precise
      }
    }
  },
  
  // Simple entry with subtle hover for important badges
  premium: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: durations.fast,
        ease: easings.standard
      }
    },
    hover: {
      y: -2, // More subtle than scaling
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.2
      }
    }
  }
}

/**
 * Create a subtle section transition sequence
 */
export function createSectionSequence(delay: number = 0) {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.08, // Reduced from 0.15
        delayChildren: delay,
        ease: easings.standard,
      }
    }
  }
}

/**
 * Create a minimal item transition for sequence children
 */
export function createItemTransition(customDelay: number = 0) {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: durations.fast,
        delay: customDelay,
        ease: easings.standard,
      }
    }
  }
}

/**
 * Divider transition variants - focused on visual refinement
 */
export const dividerTransitions: Record<string, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: durations.fast,
        ease: easings.standard 
      }
    }
  },
  
  // Simplified width expansion for dividers
  expandWidth: {
    hidden: { width: "0%", opacity: 0 },
    visible: {
      width: "100%", 
      opacity: 1,
      transition: { 
        duration: durations.medium, // Reduced from slow
        ease: easings.standard 
      }
    }
  }
}
