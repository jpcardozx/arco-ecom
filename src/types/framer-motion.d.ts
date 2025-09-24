
// Custom type definition for framer-motion to expand its types
import { UseInViewOptions } from "framer-motion";
import React from "react";

declare module "framer-motion" {
  // Add missing properties to UseInViewOptions
  interface UseInViewOptions {
    threshold?: number;
    margin?: string;
  }

  // Fix motion.div props conflict with React HTML attributes
  interface HTMLMotionProps<T> extends React.HTMLAttributes<T> {
    onAnimationStart?: ((definition: AnimationDefinition) => void) | AnimationEventHandler<T>;
    // Add any other conflicting properties here
  }

  // Ensure SVGProps can be used with Component element
  interface SVGMotionProps<T> extends React.SVGProps<T> {
    // Add any SVG-specific props that might be causing conflicts
    animate?: any;
    initial?: any;
  }
}
