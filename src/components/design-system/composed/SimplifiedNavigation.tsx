'use client';

/**
 * SIMPLIFIED NAVIGATION - CONVERSION FOCUSED
 * 
 * Minimal, distraction-free navigation that drives focus to CTA
 * Removes friction from the conversion path
 */

import React from 'react';
import { Button } from '@/components/design-system/primitives/button';
import { useTracking } from '@/lib/useTracking';

export const SimplifiedNavigation: React.FC = () => {
    const { trackEvent } = useTracking();

    const handleCtaClick = () => {
        trackEvent('nav_cta_clicked');
        // Scroll to audit form
        const auditForm = document.querySelector('input[type="url"]');
        auditForm?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    
                    {/* Logo */}
                    <div className="flex items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">A</span>
                            </div>
                            <span className="font-bold text-xl text-gray-900">ARCO</span>
                        </div>
                    </div>

                    {/* Simplified Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <a 
                            href="#audit" 
                            className="text-gray-600 hover:text-gray-900 font-medium"
                            onClick={() => trackEvent('nav_audit_clicked')}
                        >
                            Free Audit
                        </a>
                        <a 
                            href="#cases" 
                            className="text-gray-600 hover:text-gray-900 font-medium"
                            onClick={() => trackEvent('nav_cases_clicked')}
                        >
                            Success Stories
                        </a>
                        <a 
                            href="#calculator" 
                            className="text-gray-600 hover:text-gray-900 font-medium"
                            onClick={() => trackEvent('nav_calculator_clicked')}
                        >
                            ROI Calculator
                        </a>
                    </div>

                    {/* CTA Button */}
                    <Button
                        size="sm"
                        onClick={handleCtaClick}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                        Get Free Audit
                    </Button>

                </div>
            </div>
        </nav>
    );
};

export default SimplifiedNavigation;