'use client';

/**
 * ROI CALCULATOR - INTERACTIVE VALUE DEMONSTRATION
 * 
 * Calculates potential revenue recovery based on user inputs
 * Makes the value proposition tangible and personal
 */

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/design-system/primitives/card';
import { Button } from '@/components/design-system/primitives/button';
import { useTracking } from '@/lib/useTracking';

interface CalculatorInputs {
    monthlyRevenue: number;
    currentLoadTime: number;
    mobileTrafficPercentage: number;
    industry: string;
}

interface ROIResults {
    currentLoss: number;
    potentialRecovery: number;
    annualRecovery: number;
    roi: number;
    paybackPeriod: number;
}

export const ROICalculator: React.FC = () => {
    const { trackEvent } = useTracking();
    const [inputs, setInputs] = useState<CalculatorInputs>({
        monthlyRevenue: 100000,
        currentLoadTime: 3.2,
        mobileTrafficPercentage: 60,
        industry: 'ecommerce'
    });
    const [results, setResults] = useState<ROIResults | null>(null);
    const [showResults, setShowResults] = useState(false);

    const industryMultipliers = {
        ecommerce: { base: 1.2, mobile: 1.4 },
        saas: { base: 1.0, mobile: 1.1 },
        finance: { base: 1.3, mobile: 1.6 },
        healthcare: { base: 0.9, mobile: 1.2 },
        education: { base: 0.8, mobile: 1.0 },
        real_estate: { base: 1.1, mobile: 1.3 }
    };

    const calculateROI = () => {
        const { monthlyRevenue, currentLoadTime, mobileTrafficPercentage, industry } = inputs;
        const multiplier = industryMultipliers[industry as keyof typeof industryMultipliers] || industryMultipliers.ecommerce;
        
        // Performance impact calculations based on real-world data
        const loadTimeImpact = Math.min((currentLoadTime - 1.8) * 0.07, 0.4); // 7% loss per 100ms over 1.8s
        const mobileImpact = (mobileTrafficPercentage / 100) * multiplier.mobile;
        const desktopImpact = ((100 - mobileTrafficPercentage) / 100) * multiplier.base;
        
        const totalImpactFactor = (loadTimeImpact * (mobileImpact + desktopImpact));
        const currentLoss = monthlyRevenue * totalImpactFactor;
        
        // Recovery calculation (assumes 80% of loss can be recovered)
        const potentialRecovery = currentLoss * 0.8;
        const annualRecovery = potentialRecovery * 12;
        
        // ROI calculation (assuming $15K optimization cost)
        const optimizationCost = 15000;
        const roi = (annualRecovery / optimizationCost) * 100;
        const paybackPeriod = optimizationCost / potentialRecovery;

        return {
            currentLoss: Math.round(currentLoss),
            potentialRecovery: Math.round(potentialRecovery),
            annualRecovery: Math.round(annualRecovery),
            roi: Math.round(roi),
            paybackPeriod: Math.round(paybackPeriod * 10) / 10
        };
    };

    const handleCalculate = () => {
        const calculatedResults = calculateROI();
        setResults(calculatedResults);
        setShowResults(true);
        
        trackEvent('roi_calculated', {
            ...inputs,
            results: calculatedResults
        });
    };

    const handleInputChange = (field: keyof CalculatorInputs, value: number | string) => {
        setInputs(prev => ({
            ...prev,
            [field]: value
        }));
        setShowResults(false);
    };

    // Auto-calculate when inputs change (with debounce)
    useEffect(() => {
        const timer = setTimeout(() => {
            if (inputs.monthlyRevenue > 0) {
                handleCalculate();
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [inputs]);

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">
                        Calculate Your Revenue Recovery Potential
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        See exactly how much money poor website performance is costing your business every month.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    
                    {/* Calculator Inputs */}
                    <Card className="p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                            Your Business Details
                        </h3>
                        
                        <div className="space-y-6">
                            
                            {/* Monthly Revenue */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Monthly Website Revenue
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                    <input
                                        type="number"
                                        value={inputs.monthlyRevenue}
                                        onChange={(e) => handleInputChange('monthlyRevenue', parseInt(e.target.value) || 0)}
                                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="100,000"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Revenue generated through your website monthly</p>
                            </div>

                            {/* Current Load Time */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Current Page Load Time (LCP)
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={inputs.currentLoadTime}
                                        onChange={(e) => handleInputChange('currentLoadTime', parseFloat(e.target.value) || 0)}
                                        className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="3.2"
                                    />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">seconds</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Largest Contentful Paint (LCP) metric from Google PageSpeed</p>
                            </div>

                            {/* Mobile Traffic */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Mobile Traffic Percentage
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={inputs.mobileTrafficPercentage}
                                        onChange={(e) => handleInputChange('mobileTrafficPercentage', parseInt(e.target.value) || 0)}
                                        className="w-full pr-8 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="60"
                                        min="0"
                                        max="100"
                                    />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Percentage of visitors using mobile devices</p>
                            </div>

                            {/* Industry */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Industry
                                </label>
                                <select
                                    value={inputs.industry}
                                    onChange={(e) => handleInputChange('industry', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="ecommerce">E-commerce</option>
                                    <option value="saas">SaaS</option>
                                    <option value="finance">Finance</option>
                                    <option value="healthcare">Healthcare</option>
                                    <option value="education">Education</option>
                                    <option value="real_estate">Real Estate</option>
                                </select>
                                <p className="text-xs text-gray-500 mt-1">Industry affects performance sensitivity</p>
                            </div>

                        </div>
                    </Card>

                    {/* Results */}
                    <Card className="p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                            Your Revenue Recovery Potential
                        </h3>
                        
                        {results && showResults ? (
                            <div className="space-y-6">
                                
                                {/* Current Loss */}
                                <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-red-600 mb-2">
                                            ${results.currentLoss.toLocaleString()}
                                        </div>
                                        <div className="text-sm font-semibold text-red-800">
                                            LOST REVENUE PER MONTH
                                        </div>
                                        <div className="text-xs text-red-600 mt-1">
                                            Due to poor website performance
                                        </div>
                                    </div>
                                </div>

                                {/* Recovery Potential */}
                                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-green-600 mb-2">
                                            ${results.potentialRecovery.toLocaleString()}
                                        </div>
                                        <div className="text-sm font-semibold text-green-800">
                                            RECOVERABLE PER MONTH
                                        </div>
                                        <div className="text-xs text-green-600 mt-1">
                                            With professional optimization
                                        </div>
                                    </div>
                                </div>

                                {/* ROI Metrics */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                                        <div className="text-2xl font-bold text-blue-600">
                                            {results.roi}%
                                        </div>
                                        <div className="text-xs font-semibold text-blue-800">
                                            Annual ROI
                                        </div>
                                    </div>
                                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                                        <div className="text-2xl font-bold text-purple-600">
                                            {results.paybackPeriod}
                                        </div>
                                        <div className="text-xs font-semibold text-purple-800">
                                            Payback (months)
                                        </div>
                                    </div>
                                </div>

                                {/* Annual Projection */}
                                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl text-center">
                                    <div className="text-2xl font-bold mb-2">
                                        ${results.annualRecovery.toLocaleString()}
                                    </div>
                                    <div className="text-sm font-semibold opacity-90">
                                        ANNUAL REVENUE RECOVERY
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="space-y-4">
                                    <Button 
                                        size="lg" 
                                        className="w-full bg-emerald-600 hover:bg-emerald-700"
                                        onClick={() => {
                                            trackEvent('roi_calculator_cta_clicked', { results });
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                    >
                                        Get Free Audit → Recover ${results.potentialRecovery.toLocaleString()}/month
                                    </Button>
                                    <p className="text-xs text-gray-500 text-center">
                                        ✓ No commitment ✓ 15-min consultation ✓ Detailed recovery plan
                                    </p>
                                </div>

                            </div>
                        ) : (
                            <div className="text-center text-gray-500 py-12">
                                <div className="text-lg mb-2">🔍</div>
                                <p>Enter your business details to see your revenue recovery potential</p>
                            </div>
                        )}
                    </Card>

                </div>

                {/* Disclaimer */}
                <div className="text-center mt-12">
                    <p className="text-sm text-gray-500 max-w-2xl mx-auto">
                        * Calculations based on industry benchmarks and real client data. Actual results may vary depending on specific implementation and market conditions. Free audit will provide precise estimates for your specific situation.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default ROICalculator;