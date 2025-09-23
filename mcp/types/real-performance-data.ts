// Unified RealPerformanceData interface for all MCP modules

export interface RealPerformanceData {
  coreWebVitals?: {
    lcp?: number;
    cls?: number;
    inp?: number;
    fcp?: number;
    ttfb?: number;
    ratings?: Record<string, string>;
    trend?: 'improving' | 'declining' | 'stable';
    measurementTimestamp?: string;
    fid?: number;
  };
  analyticsData?: {
    bounceRate?: number;
    sessionDuration?: number;
    pageViews?: number;
    uniqueVisitors?: number;
    conversionEvents?: number;
    leadQuality?: number;
    trafficSources?: any[];
  };
  analytics?: {
    pageViews?: any[];
    conversionEvents?: any[];
    userJourney?: any[];
    source?: string;
  };
  buildMetrics?: {
    buildTime?: number;
    bundleSize?: number;
    dependencyCount?: number;
    codeComplexity?: number;
    lastBuildTimestamp?: string;
  };
  performanceScore?: number;
  lighthouse?: {
    performance?: number;
    accessibility?: number;
    bestPractices?: number;
    seo?: number;
  };
  realTimeMetrics?: {
    timestamp?: number;
    activeUsers?: number;
    conversionRate?: number;
    bounceRate?: number;
    averageSessionDuration?: number;
  };
  timestamp?: string;
  source?: string;
}
