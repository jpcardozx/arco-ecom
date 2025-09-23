/**
 * ARCO Header Component
 * Layout header with navigation integration
 */

'use client';

import React from 'react';
import { ProfessionalNavigation } from '@/components/business/sections/ProfessionalNavigation';

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
            <ProfessionalNavigation />
        </header>
    );
};

export type { HeaderProps };
