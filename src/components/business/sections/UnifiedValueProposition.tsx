'use client';

/**
 * UNIFIED VALUE PROPOSITION - PROBLEM/SOLUTION FIT
 * 
 * Clear value communication focused on revenue recovery
 * Technical authority + business impact
 */

import React from 'react';
import { Card } from '@/components/design-system/primitives/card';
import { Button } from '@/components/design-system/primitives/button';
import { useTracking } from '@/lib/useTracking';

export const UnifiedValueProposition: React.FC = () => {
    const { trackEvent } = useTracking();

    const painPoints = [
        {
            problem: "Slow checkout = 35% revenue loss",
            solution: "Sub-1.8s LCP optimization",
            impact: "Recovery: $15-50K/month"
        },
        {
            problem: "Mobile bounce rate > 60%",
            solution: "Progressive enhancement strategy", 
            impact: "Engagement: +127% average"
        },
        {
            problem: "SEO penalties from Core Web Vitals",
            solution: "Technical optimization roadmap",
            impact: "Traffic: +45% organic"
        }
    ];

    const methodology = [
        {
            step: "01",
            title: "Performance Audit",
            description: "Deep technical analysis of Core Web Vitals, user flows, and revenue impact",
            deliverable: "Comprehensive audit report with prioritized fixes"
        },
        {
            step: "02", 
            title: "Optimization Implementation",
            description: "Systematic performance improvements with real-time monitoring",
            deliverable: "LCP &lt; 1.8s, CLS &lt; 0.1, INP &lt; 200ms guaranteed"
        },
        {
            step: "03",
            title: "Revenue Recovery",
            description: "Conversion tracking and revenue attribution measurement",
            deliverable: "Monthly recovery reports with ROI documentation"
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">
                        Why Your Website Bleeds Revenue
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Every 100ms delay costs 1% conversion. We identify exactly where your money is being lost and recover it systematically.
                    </p>
                </div>

                {/* Pain Points Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {painPoints.map((point, index) => (
                        <Card 
                            key={index} 
                            className="p-6 border-l-4 border-red-500 hover:shadow-lg transition-shadow cursor-pointer"
                        >
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-red-600 mb-2">Problem:</h3>
                                    <p className="text-gray-800">{point.problem}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-blue-600 mb-2">Solution:</h3>
                                    <p className="text-gray-800">{point.solution}</p>
                                </div>
                                <div className="bg-green-50 p-3 rounded">
                                    <h3 className="font-semibold text-green-600 mb-1">Impact:</h3>
                                    <p className="text-green-800 font-medium">{point.impact}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Methodology */}
                <div className="bg-slate-50 rounded-2xl p-12">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Proven 3-Step Recovery Method
                        </h2>
                        <p className="text-lg text-gray-600">
                            Systematic approach that guarantees measurable results in 47 days or less
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {methodology.map((step, index) => (
                            <div key={index} className="relative">
                                {/* Step Number */}
                                <div className="text-6xl font-bold text-blue-100 mb-4">
                                    {step.step}
                                </div>
                                
                                {/* Content */}
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-gray-900">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {step.description}
                                    </p>
                                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                                        <p className="text-sm font-medium text-blue-800">
                                            Deliverable: {step.deliverable}
                                        </p>
                                    </div>
                                </div>

                                {/* Arrow (except for last item) */}
                                {index < methodology.length - 1 && (
                                    <div className="hidden lg:block absolute top-16 -right-4 text-blue-300">
                                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="text-center mt-12">
                        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white p-8 rounded-xl">
                            <h3 className="text-2xl font-bold mb-4">
                                Ready to Stop Losing Revenue?
                            </h3>
                            <p className="text-lg mb-6 opacity-90">
                                Get your free audit and see exactly how much money you're losing to poor performance
                            </p>
                            <Button
                                variant="outline"
                                size="lg"
                                className="bg-white text-blue-600 hover:bg-blue-50 border-white"
                                onClick={() => {
                                    trackEvent('value_prop_cta_clicked');
                                    document.querySelector('input[type="url"]')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                Start Free Audit → Recover Revenue Now
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default UnifiedValueProposition;