/**
 * ARCO Enhanced Button Component
 * Componente de botão com design system premium
 */

'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { premiumDesignTokens } from '../tokens/premium-ui-tokens';

interface EnhancedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const EnhancedButton = forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    children, 
    disabled,
    ...props 
  }, ref) => {
    
    // Variantes de estilo baseadas nos tokens premium
    const variants = {
      primary: `
        bg-gradient-to-r from-blue-600 to-blue-700 
        hover:from-blue-700 hover:to-blue-800
        focus:ring-4 focus:ring-blue-200
        text-white shadow-lg hover:shadow-xl
        border-0
      `,
      secondary: `
        bg-gray-100 hover:bg-gray-200
        focus:ring-4 focus:ring-gray-100
        text-gray-900 
        border border-gray-300
      `,
      ghost: `
        bg-transparent hover:bg-gray-100
        focus:ring-4 focus:ring-gray-100
        text-gray-700 hover:text-gray-900
        border-0
      `,
      destructive: `
        bg-gradient-to-r from-red-600 to-red-700 
        hover:from-red-700 hover:to-red-800
        focus:ring-4 focus:ring-red-200
        text-white shadow-lg hover:shadow-xl
        border-0
      `,
      success: `
        bg-gradient-to-r from-green-600 to-green-700 
        hover:from-green-700 hover:to-green-800
        focus:ring-4 focus:ring-green-200
        text-white shadow-lg hover:shadow-xl
        border-0
      `
    };

    // Tamanhos baseados nos tokens
    const sizes = {
      sm: `px-3 py-1.5 text-sm font-medium`,
      md: `px-4 py-2 text-base font-medium`,
      lg: `px-6 py-2.5 text-lg font-semibold`,
      xl: `px-8 py-3 text-xl font-semibold`
    };

    return (
      <button
        className={cn(
          // Estilos base com tokens premium
          `
            inline-flex items-center justify-center
            rounded-lg font-medium
            transition-all duration-200 ease-in-out
            transform active:scale-98
            disabled:opacity-50 disabled:cursor-not-allowed
            focus:outline-none focus:ring-offset-2
            select-none relative overflow-hidden
          `,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          isLoading && 'cursor-wait',
          className
        )}
        disabled={disabled || isLoading}
        ref={ref}
        {...props}
      >
        {/* Loading state */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        
        {/* Conteúdo do botão */}
        <span className={cn(isLoading && 'opacity-0', 'flex items-center gap-2')}>
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </span>

        {/* Efeito ripple premium */}
        <span className="absolute inset-0 overflow-hidden">
          <span className="absolute inset-0 rounded-lg bg-white opacity-0 transition-opacity duration-200 hover:opacity-10" />
        </span>
      </button>
    );
  }
);

EnhancedButton.displayName = 'EnhancedButton';

export { EnhancedButton, type EnhancedButtonProps };