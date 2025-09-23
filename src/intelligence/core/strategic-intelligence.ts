/**
 * ARCO MCP Strategic Intelligence Types
 * 
 * Core type definitions for the strategic intelligence platform
 */

// Strategic Intelligence Analysis Types

export interface CrossDimensionalImpact {
  technicalImpact: {
    performance: number;        // 1-10 performance impact
    maintainability: number;    // 1-10 maintainability impact
    scalability: number;        // 1-10 scalability impact
    riskLevel: number;         // 1-10 implementation risk
  };
  businessImpact: {
    conversionLikely: number;   // 1-10 conversion improvement likelihood
    leadQuality: number;        // 1-10 lead quality impact
    revenueProjection: number;  // Projected revenue impact (%)
    timeToValue: number;        // Days to business value realization
  };
  competitiveImpact: {
    marketPosition: number;     // 1-10 competitive positioning improvement
    differentiation: number;    // 1-10 market differentiation creation
    defensibility: number;      // 1-10 competitive moat strength
    responseTime: number;       // Hours for competitive response capability
  };
  resourceImpact: {
    developmentHours: number;   // Estimated development time
    opportunityCost: number;    // 1-10 opportunity cost assessment
    riskAdjustedROI: number;   // Expected ROI adjusted for risk
    priorityScore: number;      // 1-100 overall priority score
  };
}

export interface OptimizationStrategy {
  immediate: {
    actions: string[];
    expectedImpact: number;     // 1-10 immediate impact
    implementationTime: number; // Hours to implement
    riskLevel: number;         // 1-10 risk level
  };
  shortTerm: {
    actions: string[];
    expectedImpact: number;
    implementationTime: number;
    dependencies: string[];
  };
  longTerm: {
    actions: string[];
    expectedImpact: number;
    strategicValue: number;     // 1-10 long-term strategic value
    competitiveAdvantage: number; // 1-10 competitive advantage creation
  };
}

export interface PositioningAdjustment {
  currentPosition: {
    strengths: string[];
    weaknesses: string[];
    marketPerception: number;   // 1-10 current market position
  };
  recommendedPosition: {
    messaging: string[];
    differentiators: string[];
    targetMarketSegment: string;
    competitiveAdvantages: string[];
  };
  transitionStrategy: {
    phases: Array<{
      phase: string;
      actions: string[];
      timeline: number;         // Days
      successMetrics: string[];
    }>;
    riskMitigation: string[];
    expectedOutcome: number;    // 1-10 expected positioning improvement
  };
}

export interface AllocationPlan {
  immediate: {
    development: number;        // % of resources
    businessDevelopment: number;
    clientWork: number;
    platformOptimization: number;
  };
  rationale: {
    businessJustification: string;
    competitiveAdvantage: string;
    riskConsiderations: string[];
    expectedROI: number;
  };
  adjustmentTriggers: {
    increaseInvestment: string[];  // Conditions to increase platform investment
    decreaseInvestment: string[];  // Conditions to decrease platform investment
    pivotSignals: string[];        // Signals to change strategy
  };
}

// Intelligence Context Types

export interface PlatformChange {
  type: 'feature' | 'optimization' | 'architecture' | 'design' | 'content';
  description: string;
  scope: 'component' | 'page' | 'system' | 'platform';
  context: {
    currentPerformance?: Record<string, number>;
    businessGoals?: string[];
    competitiveContext?: string;
    resourceConstraints?: string[];
  };
}

export interface BusinessContext {
  metrics: {
    conversionRate: number;
    leadQuality: number;
    customerLifetimeValue: number;
    acquisitionCost: number;
  };
  goals: {
    targetConversionRate: number;
    targetLeadQuality: number;
    growthTargets: number[];
    timeframes: number[];
  };
  constraints: {
    budget: number;
    timeframe: number;
    resourceAvailability: number;
    technicalLimitations: string[];
  };
}

export interface MarketIntelligence {
  competitorAnalysis: {
    directCompetitors: Array<{
      name: string;
      strengths: string[];
      weaknesses: string[];
      marketPosition: number;
    }>;
    indirectCompetitors: string[];
    marketGaps: string[];
  };
  marketTrends: {
    emergingTechnologies: string[];
    clientExpectations: string[];
    pricingTrends: string[];
    serviceEvolution: string[];
  };
  opportunities: {
    underservedSegments: string[];
    technologyAdvantages: string[];
    marketTimingFactors: string[];
    partnershipOpportunities: string[];
  };
}

export interface ResourceConstraints {
  timeAvailable: number;          // Hours per week
  budgetConstraints: number;      // Available budget
  skillConstraints: string[];     // Technical limitations
  clientCommitments: number;      // % time committed to client work
  marketPressures: string[];      // External pressures affecting allocation
}

// Validation and Measurement Types

export interface BaselineDecisionMetrics {
  decisionId: string;
  decisionType: 'technical' | 'business' | 'strategic' | 'cross-dimensional';
  context: string;                       // What decision was being made
  informationSources: string[];          // What data/context was used
  timeToDecision: number;               // Minutes from question to confident choice
  crossDimensionalConsideration: number; // 1-10: Did decision consider tech + business + competitive?
  confidenceScore: number;              // 1-10: How confident was the final decision
  implementationSuccess?: number;       // Retroactive assessment (post-implementation)
  competitiveAwareness: number;         // 1-10: Was competitive impact considered
  resourceImpact: number;              // 1-10: Was resource allocation optimized
}

export interface FoundationValidation {
  baselineDecisionTime: number[];        // Current time-to-decision for 10 decisions
  baselineConfidence: number[];          // Current confidence scores (1-10)
  potentialImprovement: number;          // Estimated improvement with integration
  competitiveGaps: string[];            // Specific advantages agencies cannot replicate
  proceedDecision: 'build' | 'iterate' | 'stop';
}

export interface MCPValidation {
  postMCPConfidence: number[];          // Decision confidence with MCP support
  postMCPDecisionTime: number[];        // Time-to-decision with MCP support  
  improvementConfidence: number;        // % improvement vs baseline
  improvementSpeed: number;             // % improvement vs baseline
  platformIntegration: boolean;         // Successful data integration
  performanceTargets: boolean;          // <100ms response time achieved
}

// Strategic Intelligence Capabilities

export interface ArcoIntelligenceCapabilities {
  // Cross-dimensional analysis (CORE COMPETITIVE DIFFERENTIATOR)
  analyzePlatformEvolution(change: PlatformChange): Promise<CrossDimensionalImpact>;
  
  // Real-time optimization (FASTER THAN AGENCIES CAN RESPOND)
  optimizeConversionFunnel(context: BusinessContext): Promise<OptimizationStrategy>;
  
  // Competitive positioning (MARKET INTELLIGENCE INTEGRATION)
  generateCompetitiveStrategy(market: MarketIntelligence): Promise<PositioningAdjustment>;
  
  // Resource optimization (EFFICIENCY ADVANTAGE OVER TRADITIONAL CONSULTING)
  prioritizeResourceAllocation(constraints: ResourceConstraints): Promise<AllocationPlan>;
}

// MCP Resource Types

export interface PlatformContext {
  currentState: {
    performance: Record<string, number>;
    capabilities: string[];
    integrations: string[];
    lastUpdate: string;
  };
  intelligence: {
    crossDimensionalConnections: number;
    automationLevel: number;
    learningEffectiveness: number;
    competitiveAdvantage: number;
  };
}

export interface LeadIntelligence {
  behaviorPatterns: {
    conversionPathways: string[];
    engagementMetrics: { average: number; trend: string };
    qualificationScores: { average: number; distribution: number[] };
  };
  optimizationOpportunities: string[];
}

export interface CompetitiveAnalysis {
  marketPosition: {
    current: string;
    target: string;
    gapAnalysis: string[];
  };
  competitiveAdvantages: string[];
  threatAssessment: {
    immediate: string;
    mediumTerm: string;
    longTerm: string;
  };
}

export interface PerformanceMetrics {
  platform: {
    responseTime: number;
    reliability: number;
    conversionRate: number;
    leadQuality: number;
  };
  business: {
    clientSatisfaction: number;
    projectSuccessRate: number;
    revenueGrowth: number;
    marketPosition: number;
  };
  competitive: {
    responseSpeed: number;
    analysisCompleteness: number;
    clientOutcomes: number;
    platformAdvantage: number;
  };
}

export interface EvolutionOpportunities {
  immediate: Array<{
    opportunity: string;
    impact: number;
    effort: number;
    roi: number;
  }>;
  strategic: Array<{
    opportunity: string;
    impact: number;
    effort: number;
    roi: number;
  }>;
}

export interface DecisionBaseline {
  week1aProgress: {
    decisionsDocumented: number;
    targetDecisions: number;
    averageConfidenceBaseline: number;
    averageTimeBaseline: number;
    completionStatus: 'complete' | 'in-progress';
  };
  validationResults: {
    improvementPotential: string;
    competitiveGaps: string[];
    proceedRecommendation: 'proceed' | 'iterate' | 'stop' | 'insufficient-data';
  };
}
