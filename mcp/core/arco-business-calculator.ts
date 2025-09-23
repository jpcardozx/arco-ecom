/**
 * ARCO Business Calculator - Real Business Impact Analysis
 * 
 * Calculates real business impact using ARCO baseline data
 * Correlates performance improvements with revenue projections
 */

interface ARCOBaselines {
  conversionRate: number;      // Current conversion rate (e.g., 0.032 = 3.2%)
  averageDealSize: number;     // Average deal size in USD
  leadToClientRate: number;    // Lead to paying client rate
  monthlySessions: number;     // Current monthly website sessions
  bounceRate?: number;         // Current bounce rate
  avgSessionDuration?: number; // Average session duration in seconds
}

interface BusinessImpact {
  currentRevenue: number;
  projectedRevenue: number;
  revenueIncrease: number;
  percentageIncrease: number;
  paybackPeriod: number; // Months to recoup investment
  confidence: number;    // 0-1 confidence in projections
}

interface PerformanceBusinessCorrelation {
  revenueCorrelation: number;  // How strongly performance affects revenue
  conversionImpact: number;    // Expected conversion improvement
  userExperienceScore: number; // Overall UX score impact
  competitiveAdvantage: number; // Relative competitive position
}

export class ARCOBusinessCalculator {
  private baselines: ARCOBaselines;

  constructor(baselines: ARCOBaselines) {
    this.baselines = baselines;
    this.validateBaselines();
  }

  private validateBaselines(): void {
    if (this.baselines.conversionRate <= 0 || this.baselines.conversionRate > 1) {
      console.warn('Invalid conversion rate, using industry default (3.2%)');
      this.baselines.conversionRate = 0.032;
    }
    
    if (this.baselines.averageDealSize <= 0) {
      console.warn('Invalid deal size, using consulting industry default ($15,000)');
      this.baselines.averageDealSize = 15000;
    }
    
    if (this.baselines.leadToClientRate <= 0 || this.baselines.leadToClientRate > 1) {
      console.warn('Invalid lead-to-client rate, using default (8%)');
      this.baselines.leadToClientRate = 0.08;
    }
  }

  async getCurrentBaselines(): Promise<ARCOBaselines> {
    return { ...this.baselines };
  }

  async analyzeBusinessMetrics(analyticsData: any): Promise<{
    currentPerformance: BusinessImpact;
    optimizationPotential: BusinessImpact;
    keyInsights: string[];
  }> {
    const current = this.calculateCurrentRevenue(analyticsData);
    const potential = this.calculateOptimizationPotential(analyticsData);
    const insights = this.generateBusinessInsights(analyticsData, current, potential);

    return {
      currentPerformance: current,
      optimizationPotential: potential,
      keyInsights: insights
    };
  }

  private calculateCurrentRevenue(analyticsData: any): BusinessImpact {
    const sessions = analyticsData.sessions || this.baselines.monthlySessions;
    const conversionRate = analyticsData.conversionRate || this.baselines.conversionRate;
    
    const monthlyLeads = sessions * conversionRate;
    const monthlyClients = monthlyLeads * this.baselines.leadToClientRate;
    const currentRevenue = monthlyClients * this.baselines.averageDealSize;

    return {
      currentRevenue,
      projectedRevenue: currentRevenue,
      revenueIncrease: 0,
      percentageIncrease: 0,
      paybackPeriod: 0,
      confidence: 0.9 // High confidence in current baseline
    };
  }

  private calculateOptimizationPotential(analyticsData: any): BusinessImpact {
    // Conservative optimization estimates based on industry data
    const conversionImprovement = 0.25; // 25% improvement potential
    const bounceRateImprovement = 0.15; // 15% bounce rate reduction
    const sessionDurationImprovement = 0.20; // 20% engagement improvement

    const currentRevenue = this.calculateCurrentRevenue(analyticsData).currentRevenue;
    
    // Calculate compound improvement effect
    const totalImprovement = 1 + (conversionImprovement * 0.6) + (bounceRateImprovement * 0.2) + (sessionDurationImprovement * 0.2);
    const projectedRevenue = currentRevenue * totalImprovement;
    const revenueIncrease = projectedRevenue - currentRevenue;

    return {
      currentRevenue,
      projectedRevenue,
      revenueIncrease,
      percentageIncrease: (revenueIncrease / currentRevenue) * 100,
      paybackPeriod: this.calculatePaybackPeriod(revenueIncrease),
      confidence: 0.75 // Medium confidence in projections
    };
  }

  private calculatePaybackPeriod(monthlyIncrease: number): number {
    // Assume optimization investment of $10-20K (2-4 months of work)
    const estimatedInvestment = 15000;
    return monthlyIncrease > 0 ? Math.ceil(estimatedInvestment / monthlyIncrease) : 0;
  }

  private generateBusinessInsights(analyticsData: any, current: BusinessImpact, potential: BusinessImpact): string[] {
    const insights = [];
    
    if (potential.percentageIncrease > 30) {
      insights.push(`High optimization potential: ${potential.percentageIncrease.toFixed(1)}% revenue increase possible`);
    }
    
    if (potential.paybackPeriod <= 6) {
      insights.push(`Fast ROI: Investment payback in ${potential.paybackPeriod} months`);
    }
    
    if (analyticsData.bounceRate > 0.5) {
      insights.push('High bounce rate indicates UX optimization opportunity');
    }
    
    if (analyticsData.conversionRate < this.baselines.conversionRate * 0.8) {
      insights.push('Conversion rate below baseline - funnel optimization recommended');
    }
    
    const currentMonthlyRevenue = current.currentRevenue;
    if (currentMonthlyRevenue < 50000) {
      insights.push('Revenue growth potential through traffic and conversion optimization');
    } else if (currentMonthlyRevenue > 200000) {
      insights.push('Focus on conversion optimization over traffic growth');
    }

    return insights;
  }

  async correlatePerformanceWithBusiness(vitalsData: any, component: string): Promise<PerformanceBusinessCorrelation> {
    // Calculate correlation based on component importance and performance impact
    const componentImportance = this.getComponentBusinessImportance(component);
    const performanceScore = this.calculatePerformanceScore(vitalsData);
    
    return {
      revenueCorrelation: componentImportance * (performanceScore / 100),
      conversionImpact: this.estimateConversionImpact(vitalsData, componentImportance),
      userExperienceScore: performanceScore,
      competitiveAdvantage: this.estimateCompetitiveAdvantage(performanceScore)
    };
  }

  private getComponentBusinessImportance(component: string): number {
    // Business importance multipliers based on component role
    const importanceMap: Record<string, number> = {
      'hero': 0.9,           // High impact - first impression
      'hero-section': 0.9,
      'homepage': 0.9,
      'contact': 0.8,        // High impact - conversion point
      'services': 0.7,       // Medium-high - value prop
      'pricing': 0.8,        // High impact - decision point
      'about': 0.5,          // Medium impact
      'case-studies': 0.6,   // Medium impact - social proof
      'footer': 0.3,         // Lower impact
    };

    const componentLower = component.toLowerCase();
    
    for (const [key, importance] of Object.entries(importanceMap)) {
      if (componentLower.includes(key)) {
        return importance;
      }
    }
    
    return 0.5; // Default medium importance
  }

  private calculatePerformanceScore(vitalsData: any): number {
    // Convert Web Vitals to business performance score
    let score = 100;
    
    // LCP penalty
    if (vitalsData.lcp > 4000) score -= 30;
    else if (vitalsData.lcp > 2500) score -= 15;
    
    // FID penalty
    if (vitalsData.fid > 300) score -= 25;
    else if (vitalsData.fid > 100) score -= 10;
    
    // CLS penalty
    if (vitalsData.cls > 0.25) score -= 20;
    else if (vitalsData.cls > 0.1) score -= 10;
    
    return Math.max(score, 0);
  }

  private estimateConversionImpact(vitalsData: any, importance: number): number {
    const performanceScore = this.calculatePerformanceScore(vitalsData);
    
    // Poor performance can significantly hurt conversions
    if (performanceScore < 50) {
      return -0.2 * importance; // Up to 20% negative impact
    } else if (performanceScore < 75) {
      return -0.1 * importance; // Up to 10% negative impact
    } else if (performanceScore > 90) {
      return 0.05 * importance; // Up to 5% positive impact
    }
    
    return 0; // Neutral impact
  }

  private estimateCompetitiveAdvantage(performanceScore: number): number {
    // Industry average performance score is ~65-70
    const industryAverage = 67;
    const advantage = (performanceScore - industryAverage) / 100;
    
    return Math.max(-0.3, Math.min(0.3, advantage)); // Cap at ±30%
  }

  async calculateRealImpact(
    changes: string[],
    expectedImprovements: any,
    currentMetrics: ARCOBaselines
  ): Promise<BusinessImpact> {
    // Base calculation on expected improvements and current metrics
    const {
      conversionRateIncrease = 0,
      performanceImprovement = 0,
      bounceRateReduction = 0
    } = expectedImprovements;

    // Calculate compound effect of improvements
    const conversionMultiplier = 1 + (conversionRateIncrease / 100);
    const performanceMultiplier = 1 + (performanceImprovement / 100 * 0.3); // Performance has 30% weight on conversion
    const bounceMultiplier = 1 + (bounceRateReduction / 100 * 0.2); // Bounce reduction has 20% weight

    const totalMultiplier = conversionMultiplier * performanceMultiplier * bounceMultiplier;
    
    const currentRevenue = currentMetrics.monthlySessions * 
                          currentMetrics.conversionRate * 
                          currentMetrics.leadToClientRate * 
                          currentMetrics.averageDealSize;

    const projectedRevenue = currentRevenue * totalMultiplier;
    const revenueIncrease = projectedRevenue - currentRevenue;

    // Calculate confidence based on realism of expectations
    const confidence = this.calculateProjectionConfidence(expectedImprovements);

    return {
      currentRevenue,
      projectedRevenue,
      revenueIncrease,
      percentageIncrease: (revenueIncrease / currentRevenue) * 100,
      paybackPeriod: this.calculatePaybackPeriod(revenueIncrease),
      confidence
    };
  }

  private calculateProjectionConfidence(improvements: any): number {
    const {
      conversionRateIncrease = 0,
      performanceImprovement = 0,
      bounceRateReduction = 0
    } = improvements;

    // Reduce confidence for overly optimistic projections
    let confidence = 0.8;
    
    if (conversionRateIncrease > 50) confidence -= 0.3; // Very optimistic
    else if (conversionRateIncrease > 25) confidence -= 0.1;
    
    if (performanceImprovement > 50) confidence -= 0.2;
    else if (performanceImprovement > 25) confidence -= 0.05;
    
    if (bounceRateReduction > 50) confidence -= 0.2;
    else if (bounceRateReduction > 30) confidence -= 0.1;

    return Math.max(0.2, confidence); // Minimum 20% confidence
  }

  // Update baselines with new data
  updateBaselines(newBaselines: Partial<ARCOBaselines>): void {
    this.baselines = { ...this.baselines, ...newBaselines };
    this.validateBaselines();
  }

  // Health check
  async healthCheck(): Promise<{ status: string; message: string }> {
    try {
      // Validate that baselines are reasonable
      if (this.baselines.conversionRate > 0 && 
          this.baselines.averageDealSize > 0 && 
          this.baselines.leadToClientRate > 0) {
        return { status: 'healthy', message: 'Business calculator ready with valid baselines' };
      } else {
        return { status: 'warning', message: 'Some baseline data may be invalid' };
      }
    } catch (error) {
      return { status: 'error', message: `Business calculator error: ${error}` };
    }
  }
}

export default ARCOBusinessCalculator;