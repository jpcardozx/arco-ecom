/**
 * Badge Animation Utilities
 */

export const badgeVariants = {
  default: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  },
  bounce: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4 } },
    exit: { opacity: 0, y: -20 }
  },
  slide: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  }
};

export const getBadgeAnimation = (variant: keyof typeof badgeVariants = 'default') => {
  return badgeVariants[variant] || badgeVariants.default;
};

export const statusBadgeAnimations = {
  success: badgeVariants.bounce,
  error: badgeVariants.default,
  warning: badgeVariants.slide,
  info: badgeVariants.default
};

export const createLayeredBadge = (layers: string[] = []) => {
  return layers.map((_, index) => ({
    ...badgeVariants.default,
    transition: { delay: index * 0.1 }
  }));
};