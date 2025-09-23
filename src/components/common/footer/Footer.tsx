/**
 * ARCO Footer Component - S-tier UI/UX
 * Redirects to ModernFooter for consistency
 */

'use client';

import React from 'react';
import { ModernFooter } from './ModernFooter';

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

export default Footer;