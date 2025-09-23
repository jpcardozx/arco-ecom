/**
 * ARCO Footer Component - Backward Compatibility
 * Redirects to the modern footer component
 */

'use client';

import React from 'react';
import { ModernFooter } from './footer/ModernFooter';

interface FooterProps {
  variant?: 'default' | 'dark' | 'minimal';
  showNewsletter?: boolean;
  showSocial?: boolean;
  showTrustBadges?: boolean;
  className?: string;
}

export const Footer: React.FC<FooterProps> = (props) => {
  return <ModernFooter {...props} />;
};