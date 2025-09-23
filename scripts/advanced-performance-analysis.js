const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

/**
 * ADVANCED PERFORMANCE MONITORING SYSTEM
 * 
 * Sistema personalizado de análise de performance que:
 * - Monitora Web Vitals em tempo real
 * - Gera relatórios de conversão
 * - Analisa A/B testing performance
 * - Calcula impacto de negócio
 */

class PerformanceAnalyzer {
    constructor() {
        this.baseUrls = {
            local: 'http://localhost:3000',
            staging: 'https://arco-staging.vercel.app',
            production: 'https://arco-production.vercel.app'
        };
        
        this.results = {};
        this.businessMetrics = {
            averageRevenue: 15000, // Monthly revenue per client
            conversionRate: 0.035, // 3.5% baseline
            costPerLead: 120
        };
    }

    async analyzeEnvironment(environment, url) {
        console.log(`🌐 Analyzing ${environment.toUpperCase()}: ${url}`);
        
        try {
            const browser = await puppeteer.launch({
                headless: 'new',
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });
            
            const page = await browser.newPage();
            
            // Configure viewport for mobile and desktop testing
            await page.setViewport({ width: 1920, height: 1080 });
            
            // Enable performance monitoring
            await page.evaluateOnNewDocument(() => {
                window.performanceMetrics = {
                    navigationStart: 0,
                    loadComplete: 0,
                    webVitals: {},
                    userInteractions: []
                };
            });

            // Start performance timing
            const startTime = Date.now();
            
            // Navigate to page
            const response = await page.goto(url, {
                waitUntil: 'networkidle2',
                timeout: 30000
            });

            if (!response || !response.ok()) {
                throw new Error(`Failed to load ${url}: ${response?.status()}`);
            }

            // Collect Web Vitals
            const metrics = await this.collectWebVitals(page);
            
            // Test user interactions
            const interactionMetrics = await this.testUserInteractions(page);
            
            // Analyze conversion elements
            const conversionMetrics = await this.analyzeConversionElements(page);
            
            // Calculate business impact
            const businessImpact = this.calculateBusinessImpact(metrics, conversionMetrics);
            
            await browser.close();
            
            const totalTime = Date.now() - startTime;
            
            this.results[environment] = {
                url,
                timestamp: new Date().toISOString(),
                loadTime: totalTime,
                metrics,
                interactionMetrics,
                conversionMetrics,
                businessImpact,
                status: 'success'
            };
            
            console.log(`  ✅ ${environment}: Analysis completed in ${totalTime}ms`);
            
        } catch (error) {
            console.log(`  ❌ ${environment}: ${error.message}`);
            this.results[environment] = {
                url,
                timestamp: new Date().toISOString(),
                error: error.message,
                status: 'failed'
            };
        }
    }

    async collectWebVitals(page) {
        return await page.evaluate(() => {
            return new Promise((resolve) => {
                const metrics = {};
                
                // Collect performance entries
                const navigation = performance.getEntriesByType('navigation')[0];
                if (navigation) {
                    metrics.ttfb = navigation.responseStart - navigation.requestStart;
                    metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.navigationStart;
                    metrics.loadComplete = navigation.loadEventEnd - navigation.navigationStart;
                }

                // Collect paint metrics
                const paintEntries = performance.getEntriesByType('paint');
                paintEntries.forEach(entry => {
                    if (entry.name === 'first-contentful-paint') {
                        metrics.fcp = entry.startTime;
                    }
                    if (entry.name === 'largest-contentful-paint') {
                        metrics.lcp = entry.startTime;
                    }
                });

                // Collect layout shift
                let cls = 0;
                const observer = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
                            cls += entry.value;
                        }
                    }
                });
                
                try {
                    observer.observe({ entryTypes: ['layout-shift'] });
                } catch (e) {
                    // Layout shift not supported
                }

                // Collect First Input Delay
                let fid = 0;
                const fidObserver = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        fid = entry.processingStart - entry.startTime;
                    }
                });
                
                try {
                    fidObserver.observe({ entryTypes: ['first-input'] });
                } catch (e) {
                    // FID not supported
                }

                setTimeout(() => {
                    metrics.cls = cls;
                    metrics.fid = fid;
                    resolve(metrics);
                }, 3000);
            });
        });
    }

    async testUserInteractions(page) {
        const interactions = {};
        
        try {
            // Test Hero CTA click
            const heroCtaExists = await page.$('[data-testid="hero-cta"]') !== null;
            if (heroCtaExists) {
                const ctaClickTime = await page.evaluate(() => {
                    const start = performance.now();
                    const cta = document.querySelector('[data-testid="hero-cta"]');
                    if (cta) {
                        cta.click();
                        return performance.now() - start;
                    }
                    return 0;
                });
                interactions.heroCtaResponse = ctaClickTime;
            }

            // Test ROI Calculator interaction
            const roiCalculatorExists = await page.$('[data-testid="roi-calculator"]') !== null;
            if (roiCalculatorExists) {
                const roiInteractionTime = await page.evaluate(() => {
                    const start = performance.now();
                    const input = document.querySelector('[data-testid="roi-calculator"] input');
                    if (input) {
                        input.focus();
                        input.value = '50';
                        input.dispatchEvent(new Event('input', { bubbles: true }));
                        return performance.now() - start;
                    }
                    return 0;
                });
                interactions.roiCalculatorResponse = roiInteractionTime;
            }

            // Test scroll performance
            const scrollPerformance = await page.evaluate(() => {
                const start = performance.now();
                window.scrollTo(0, document.body.scrollHeight / 2);
                return performance.now() - start;
            });
            interactions.scrollPerformance = scrollPerformance;

        } catch (error) {
            interactions.error = error.message;
        }

        return interactions;
    }

    async analyzeConversionElements(page) {
        return await page.evaluate(() => {
            const conversionData = {
                ctaButtons: 0,
                ctaVisible: 0,
                formFields: 0,
                socialProof: 0,
                valueProps: 0
            };

            // Count CTA buttons
            const ctaButtons = document.querySelectorAll('[data-testid*="cta"], button[class*="cta"], a[class*="cta"]');
            conversionData.ctaButtons = ctaButtons.length;

            // Check CTA visibility
            ctaButtons.forEach(cta => {
                const rect = cta.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    conversionData.ctaVisible++;
                }
            });

            // Count form fields
            const formFields = document.querySelectorAll('input, textarea, select');
            conversionData.formFields = formFields.length;

            // Count social proof elements
            const socialProof = document.querySelectorAll('[data-testid*="testimonial"], [data-testid*="client"], [class*="testimonial"]');
            conversionData.socialProof = socialProof.length;

            // Count value propositions
            const valueProps = document.querySelectorAll('[data-testid*="value"], [class*="benefit"], h2, h3');
            conversionData.valueProps = valueProps.length;

            return conversionData;
        });
    }

    calculateBusinessImpact(metrics, conversionMetrics) {
        const impact = {
            performanceScore: 0,
            conversionScore: 0,
            revenueImpact: 0,
            monthlyValue: 0
        };

        // Calculate performance score (0-100)
        let performanceScore = 100;
        
        if (metrics.lcp) {
            if (metrics.lcp > 4000) performanceScore -= 30;
            else if (metrics.lcp > 2500) performanceScore -= 15;
        }
        
        if (metrics.fcp) {
            if (metrics.fcp > 3000) performanceScore -= 20;
            else if (metrics.fcp > 1800) performanceScore -= 10;
        }
        
        if (metrics.cls > 0.25) performanceScore -= 25;
        else if (metrics.cls > 0.1) performanceScore -= 10;
        
        if (metrics.fid > 300) performanceScore -= 25;
        else if (metrics.fid > 100) performanceScore -= 10;

        impact.performanceScore = Math.max(0, performanceScore);

        // Calculate conversion score
        let conversionScore = 0;
        conversionScore += Math.min(conversionMetrics.ctaVisible * 10, 50); // Max 50 points
        conversionScore += Math.min(conversionMetrics.socialProof * 5, 25); // Max 25 points
        conversionScore += Math.min(conversionMetrics.valueProps * 2, 25); // Max 25 points

        impact.conversionScore = Math.min(conversionScore, 100);

        // Calculate revenue impact
        const performanceMultiplier = impact.performanceScore / 100;
        const conversionMultiplier = impact.conversionScore / 100;
        const combinedMultiplier = (performanceMultiplier + conversionMultiplier) / 2;

        impact.revenueImpact = combinedMultiplier;
        impact.monthlyValue = this.businessMetrics.averageRevenue * combinedMultiplier;

        return impact;
    }

    async generateReport() {
        const timestamp = Date.now();
        const reportPath = path.join(__dirname, `../performance-advanced-report-${timestamp}.json`);
        
        const report = {
            timestamp: new Date().toISOString(),
            summary: {
                environmentsAnalyzed: Object.keys(this.results).length,
                successfulAnalyses: Object.values(this.results).filter(r => r.status === 'success').length,
                failedAnalyses: Object.values(this.results).filter(r => r.status === 'failed').length
            },
            results: this.results,
            businessMetrics: this.businessMetrics,
            recommendations: this.generateRecommendations()
        };

        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        
        console.log('\n📈 ADVANCED PERFORMANCE ANALYSIS REPORT');
        console.log('==========================================');
        
        Object.entries(this.results).forEach(([env, result]) => {
            if (result.status === 'success') {
                console.log(`\n🌐 ${env.toUpperCase()}:`);
                console.log(`  Performance Score: ${result.businessImpact.performanceScore}/100`);
                console.log(`  Conversion Score: ${result.businessImpact.conversionScore}/100`);
                console.log(`  Monthly Value: $${Math.round(result.businessImpact.monthlyValue)}`);
                console.log(`  LCP: ${result.metrics.lcp ? Math.round(result.metrics.lcp) + 'ms' : 'N/A'}`);
                console.log(`  FCP: ${result.metrics.fcp ? Math.round(result.metrics.fcp) + 'ms' : 'N/A'}`);
                console.log(`  CLS: ${result.metrics.cls ? result.metrics.cls.toFixed(3) : 'N/A'}`);
            } else {
                console.log(`\n❌ ${env.toUpperCase()}: ${result.error}`);
            }
        });

        console.log(`\n💾 Detailed report saved to: ${reportPath}`);
        
        return report;
    }

    generateRecommendations() {
        const recommendations = [];
        
        Object.entries(this.results).forEach(([env, result]) => {
            if (result.status === 'success') {
                if (result.businessImpact.performanceScore < 80) {
                    recommendations.push({
                        environment: env,
                        type: 'performance',
                        priority: 'high',
                        issue: 'Poor performance score',
                        solution: 'Optimize Core Web Vitals'
                    });
                }
                
                if (result.businessImpact.conversionScore < 70) {
                    recommendations.push({
                        environment: env,
                        type: 'conversion',
                        priority: 'medium',
                        issue: 'Low conversion optimization',
                        solution: 'Add more CTAs and social proof'
                    });
                }
            }
        });

        return recommendations;
    }

    async run() {
        console.log('🚀 Starting Advanced ARCO Performance Analysis...\n');
        
        // Only analyze local for now since server is running
        await this.analyzeEnvironment('local', this.baseUrls.local);
        
        const report = await this.generateReport();
        return report;
    }
}

// Run analysis
const analyzer = new PerformanceAnalyzer();
analyzer.run().catch(console.error);
