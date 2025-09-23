/**
 * Strategic Intelligence Types
 */

export enum PlatformChange {
  MIGRATION = 'migration',
  OPTIMIZATION = 'optimization',
  INTEGRATION = 'integration'
}

export enum BusinessContext {
  STARTUP = 'startup',
  ENTERPRISE = 'enterprise',
  SCALING = 'scaling'
}

export enum OptimizationStrategy {
  PERFORMANCE = 'performance',
  CONVERSION = 'conversion',
  USER_EXPERIENCE = 'user_experience'
}

export enum PositioningAdjustment {
  REPOSITION = 'reposition',
  ENHANCE = 'enhance',
  PIVOT = 'pivot'
}

export enum CrossDimensionalImpact {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}

// Interfaces for complex types
export interface PlatformChangeType {
  type: 'feature' | 'optimization' | 'architecture' | 'design' | 'content';
  scope: 'component' | 'page' | 'system' | 'platform';
  description: string;
}

export interface BusinessContextType {
  type: BusinessContext;
  metrics: {
    conversionRate: number;
    revenue: number;
    users: number;
  };
  goals: {
    targetConversionRate: number;
    targetRevenue: number;
  };
}

export interface CrossDimensionalImpactType {
  technicalImpact: {
    performance: number;
    maintainability: number;
    scalability: number;
    riskLevel: number;
  };
  businessImpact: {
    conversionLikely: number;
    leadQuality: number;
    revenueProjection: number;
    timeToValue: number;
  };
  competitiveImpact: {
    marketPosition: number;
    differentiation: number;
    defensibility: number;
    responseTime: number;
  };
  resourceImpact: {
    developmentHours: number;
    opportunityCost: number;
    riskAdjustedROI: number;
    priorityScore: number;
  };
}

export interface OptimizationStrategyType {
  immediate: {
    actions: string[];
    expectedImpact: number;
    implementationTime: number;
    riskLevel: number;
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
    strategicValue?: number;
    competitiveAdvantage?: number;
    implementationTime: number;
    dependencies: string[];
  };
}

export type PositioningAdjustmentType = PositioningAdjustment;