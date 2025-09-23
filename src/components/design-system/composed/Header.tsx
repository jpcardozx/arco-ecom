/**
 * ARCO Header Component
 * Layout header with navigation integration
 */

'use client';

import React from 'react';
import { UnifiedNavigation } from '@/components/common/navigation/UnifiedNavigationStier';

interface HeaderProps {
    variant?: 'default' | 'transparent' | 'solid';
    showNavigation?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
    variant = 'default',
    showNavigation = true
}) => {
    if (!showNavigation) {
        return null;
    }

    return (
        <header className="relative">
            <UnifiedNavigation />
        </header>
    );
};

export type { HeaderProps };
