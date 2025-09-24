/**
 * ARCO UI/UX Adornments System
 * Decorative elements, indicators, and visual enhancements
 */

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Badge } from './badge';
import {
  Sparkles, Star, Zap, Award, Shield, Target,
  TrendingUp, Flame, Crown, Gem, Heart,
  CheckCircle, AlertCircle, Info, ArrowRight
} from 'lucide-react';

// Floating elements
export const FloatingElement = ({
  children,
  delay = 0,
  className
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    className={cn('absolute', className)}
    initial={{ opacity: 0, y: 20, rotate: -5 }}
    animate={{
      opacity: [0, 1, 1, 0.8],
      y: [20, 0, -5, 0],
      rotate: [-5, 0, 2, 0],
    }}
    transition={{
      duration: 6,
      delay,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut'
    }}
  >
    {children}
  </motion.div>
);

// Pulsing indicator
export const PulsingIndicator = ({
  variant = 'primary',
  size = 'md',
  className
}: {
  variant?: 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) => {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  const variantClasses = {
    primary: 'bg-primary',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
  };

  return (
    <div className={cn('relative inline-block', className)}>
      <div className={cn(
        'rounded-full',
        sizeClasses[size],
        variantClasses[variant]
      )} />
      <motion.div
        className={cn(
          'absolute inset-0 rounded-full',
          variantClasses[variant],
          'opacity-30'
        )}
        animate={{
          scale: [1, 2, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

// Premium badges with icons
const iconMap = {
  sparkles: Sparkles,
  star: Star,
  zap: Zap,
  award: Award,
  shield: Shield,
  target: Target,
  trending: TrendingUp,
  flame: Flame,
  crown: Crown,
  gem: Gem,
  heart: Heart,
  check: CheckCircle,
  alert: AlertCircle,
  info: Info,
  arrow: ArrowRight,
};

export const PremiumBadge = ({
  text,
  icon,
  variant = 'default',
  glow = false,
  animate = false,
  className
}: {
  text: string;
  icon?: keyof typeof iconMap;
  variant?: 'default' | 'success' | 'warning' | 'premium' | 'gradient';
  glow?: boolean;
  animate?: boolean;
  className?: string;
}) => {
  const IconComponent = icon ? iconMap[icon] : null;

  const variantClasses = {
    default: 'bg-primary text-primary-foreground',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-white',
    premium: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
    gradient: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white',
  };

  const MotionBadge = animate ? motion.div : 'div';
  const animationProps = animate ? {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    whileHover: { scale: 1.05 },
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  } : {};

  return (
    <MotionBadge
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium',
        variantClasses[variant],
        glow && 'shadow-lg shadow-current/25',
        className
      )}
      {...animationProps}
    >
      {IconComponent && <IconComponent className="w-3.5 h-3.5" />}
      {text}
    </MotionBadge>
  );
};

// Status indicators
export const StatusIndicator = ({
  status,
  text,
  showPulse = true,
  className
}: {
  status: 'online' | 'offline' | 'busy' | 'away';
  text?: string;
  showPulse?: boolean;
  className?: string;
}) => {
  const statusConfig = {
    online: { color: 'bg-green-500', text: text || 'Online' },
    offline: { color: 'bg-gray-500', text: text || 'Offline' },
    busy: { color: 'bg-red-500', text: text || 'Busy' },
    away: { color: 'bg-yellow-500', text: text || 'Away' },
  };

  const config = statusConfig[status];

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative">
        <div className={cn('w-2 h-2 rounded-full', config.color)} />
        {showPulse && (
          <motion.div
            className={cn('absolute inset-0 rounded-full opacity-30', config.color)}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
      </div>
      {text && <span className="text-sm text-muted-foreground">{config.text}</span>}
    </div>
  );
};

// Progress indicators with animations
export const AnimatedProgress = ({
  value,
  max = 100,
  label,
  showValue = true,
  variant = 'default',
  className
}: {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  variant?: 'default' | 'success' | 'warning' | 'gradient';
  className?: string;
}) => {
  const percentage = Math.round((value / max) * 100);

  const variantClasses = {
    default: 'bg-primary',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    gradient: 'bg-gradient-to-r from-blue-500 to-cyan-500',
  };

  return (
    <div className={cn('space-y-2', className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center text-sm">
          {label && <span className="font-medium">{label}</span>}
          {showValue && <span className="text-muted-foreground">{percentage}%</span>}
        </div>
      )}
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <motion.div
          className={cn('h-full rounded-full', variantClasses[variant])}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

// Decorative arrows
export const DecorativeArrow = ({
  direction = 'right',
  variant = 'default',
  size = 'md',
  animated = true,
  className
}: {
  direction?: 'up' | 'down' | 'left' | 'right';
  variant?: 'default' | 'accent' | 'muted';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const variantClasses = {
    default: 'text-primary',
    accent: 'text-accent',
    muted: 'text-muted-foreground',
  };

  const rotationClasses = {
    up: 'rotate-[-90deg]',
    down: 'rotate-90',
    left: 'rotate-180',
    right: 'rotate-0',
  };

  const MotionArrow = animated ? motion.div : 'div';
  const animationProps = animated ? {
    animate: { x: [0, 4, 0] },
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    }
  } : {};

  return (
    <MotionArrow
      className={cn(
        'inline-block',
        sizeClasses[size],
        variantClasses[variant],
        rotationClasses[direction],
        className
      )}
      {...animationProps}
    >
      <ArrowRight className="w-full h-full" />
    </MotionArrow>
  );
};

// Gradient text
export const GradientText = ({
  children,
  variant = 'primary',
  className
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'rainbow' | 'sunset';
  className?: string;
}) => {
  const gradientClasses = {
    primary: 'bg-gradient-to-r from-primary to-blue-600',
    secondary: 'bg-gradient-to-r from-purple-500 to-pink-500',
    rainbow: 'bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500',
    sunset: 'bg-gradient-to-r from-orange-500 to-pink-500',
  };

  return (
    <span className={cn(
      'bg-clip-text text-transparent font-bold',
      gradientClasses[variant],
      className
    )}>
      {children}
    </span>
  );
};