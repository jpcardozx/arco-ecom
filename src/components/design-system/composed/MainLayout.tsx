/**
 * ARCO Main Layout
 * Core application layout with header and footer
 */

'use client';

import React from 'react';
import { SimplifiedNavigation } from './SimplifiedNavigation';
import { Footer } from '@/components/common/footer/Footer';

interface MainLayoutProps {
    children: React.ReactNode;
    showHeader?: boolean;
    showFooter?: boolean;
    headerVariant?: 'default' | 'transparent' | 'solid';
    footerVariant?: 'default' | 'minimal';
    className?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
    children,
    showHeader = true,
    showFooter = true,
    headerVariant = 'default',
    footerVariant = 'default',
    className = ''
}) => {
    return (
        <div className={`min-h-screen flex flex-col ${className}`}>
            {showHeader && (
                <SimplifiedNavigation />
            )}

            <main className="flex-1">
                {children}
            </main>

            {showFooter && (
                <Footer
                    variant={footerVariant}
                    showSocial={true}
                />
            )}
        </div>
    );
};

export type { MainLayoutProps };
