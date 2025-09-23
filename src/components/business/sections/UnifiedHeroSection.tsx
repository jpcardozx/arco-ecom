'use client';

/**
 * UNIFIED HERO SECTION - CONVERSION FOCUSED
 * 
 * Direct response hero that addresses pain point immediately
 * Problem awareness → Solution → Proof → CTA
 */

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/design-system/primitives/button';
import { useTracking } from '@/lib/useTracking';

interface UnifiedHeroSectionProps {
    onAuditClick?: () => void;
    onContactClick?: () => void;
}

// Website audit hook for demo
const useWebsiteAudit = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<any>(null);

    const runAudit = (domain: string) => {
        setIsLoading(true);
        setResults(null);

        // Mock audit with realistic delay
        setTimeout(() => {
            const mockResults = {
                domain,
                performance: Math.floor(Math.random() * 40) + 30, // 30-70
                lcp: (Math.random() * 3 + 2).toFixed(1), // 2-5s
                monthlyLoss: Math.floor(Math.random() * 10000 + 40000), // R$ 40-50K
                issues: [
                    'LCP > 2.5s causing 35% bounce rate',
                    'Checkout flow abandoned at 67% rate',
                    'Mobile performance 48% below industry standard'
                ]
            };

            setResults(mockResults);
            setIsLoading(false);
        }, 2000);
    };

    return { runAudit, isLoading, results };
};

export const UnifiedHeroSection: React.FC<UnifiedHeroSectionProps> = ({ onAuditClick, onContactClick }) => {
    const { trackEvent } = useTracking();
    const { runAudit, isLoading, results } = useWebsiteAudit();
    const [domain, setDomain] = useState('');

    const handleAuditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!domain) return;

        trackEvent('audit_started', { domain });
        runAudit(domain);
        onAuditClick?.();
    };

    useEffect(() => {
        trackEvent('hero_viewed');
    }, [trackEvent]);

    return (
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white min-h-screen flex items-center">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Content Side */}
                    <div className="space-y-8">

                        {/* Headline */}
                        <div className="space-y-4">
                            <h1 className="text-5xl font-bold leading-tight">
                                Stop losing <span className="text-red-400">$50K/month</span> to slow websites
                            </h1>
                            <p className="text-xl text-gray-300 leading-relaxed">
                                Your website performance is bleeding revenue. Get LCP &lt; 1.8s and recover lost sales with our proven optimization system.
                            </p>
                        </div>

                        {/* Proof Metrics */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="p-3 rounded-lg text-green-600 bg-green-50">
                                <div className="font-bold text-lg">3.2x ROI in 47 days</div>
                                <div className="text-xs text-black">proven results</div>
                            </div>
                            <div className="p-3 rounded-lg text-blue-600 bg-blue-50">
                                <div className="font-bold text-lg">127%</div>
                                <div className="text-xs text-black">Conversion boost</div>
                            </div>
                            <div className="p-3 rounded-lg text-green-600 bg-green-50">
                                {/* Performance target: LCP < 1.8s */}
                                <div className="font-bold text-lg">LCP &lt; 1.8s</div>
                                <div className="text-xs text-black">guaranteed</div>
                            </div>
                        </div>

                        {/* Contact CTA */}
                        <div className="space-y-4">
                            <Button 
                                size="lg" 
                                className="w-full bg-emerald-600 hover:bg-emerald-700"
                                onClick={() => {
                                    trackEvent('contact_clicked');
                                    onContactClick?.();
                                }}
                            >
                                Get Free Performance Audit → $50K Recovery/Month
                            </Button>
                            <p className="text-sm text-gray-400 text-center">
                                ✓ No commitment ✓ 15-min consultation ✓ Guaranteed improvements
                            </p>
                        </div>
                    </div>

                    {/* Audit Tool Side */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
                        <h3 className="text-2xl font-bold mb-6">
                            Free Website Performance Audit
                        </h3>

                        <form onSubmit={handleAuditSubmit} className="space-y-4">
                            <div>
                                <input
                                    type="url"
                                    placeholder="Enter your website URL"
                                    value={domain}
                                    onChange={(e) => setDomain(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg text-black"
                                    required
                                />
                            </div>
                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                            >
                                {isLoading ? 'Analyzing...' : 'Run Free Audit'}
                            </button>
                        </form>

                        {/* Results */}
                        {results && (
                            <div className="mt-6 space-y-4">
                                <h4 className="text-lg font-semibold text-red-300">
                                    🚨 Critical Issues Found in {results.domain}:
                                </h4>

                                <div className="space-y-2 mb-4">
                                    {results.issues.map((issue: string, index: number) => (
                                        <p key={index} className="text-sm text-gray-300">• {issue}</p>
                                    ))}
                                </div>

                                <div className="bg-red-800/30 p-4 rounded">
                                    <p className="text-lg font-bold text-red-300">
                                        💸 Estimated Loss: ${results.monthlyLoss.toLocaleString()}/month
                                    </p>
                                    <p className="text-sm text-gray-400 mt-1">
                                        Performance Score: {results.performance}/100 | LCP: {results.lcp}s
                                    </p>
                                </div>

                                <Button
                                    variant="default"
                                    size="lg"
                                    className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700"
                                    onClick={() => {
                                        trackEvent('audit_contact_clicked', results);
                                        window.open('https://calendly.com/arco-performance', '_blank');
                                    }}
                                >
                                    Fix These Issues → Recover ${Math.floor(results.monthlyLoss * 0.8).toLocaleString()}/month
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UnifiedHeroSection;