/**
 * ARCO Navigation Component - Backward Compatibility
 * Redirects to UnifiedNavigation for consistency
 */

'use client';

import React from 'react';
import { UnifiedNavigation } from './UnifiedNavigationStier';

interface NavigationProps {
  variant?: 'dark' | 'light';
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = ({ variant, className }) => {
  return <UnifiedNavigation className={className} />;
};