/**
 * Real Performance Data Types
 */

export interface RealPerformanceData {
  metrics: {
    lcp: number;
    fid: number;
    cls: number;
    ttfb: number;
  };
  scores: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
  timing: {
    domContentLoaded: number;
    firstPaint: number;
    firstContentfulPaint: number;
    largestContentfulPaint: number;
  };
  resources: {
    totalSize: number;
    imageSize: number;
    scriptSize: number;
    styleSize: number;
  };
  coreWebVitals: {
    lcp: number;
    fid: number;
    cls: number;
    ttfb: number;
  };
  analyticsData: {
    sessions: number;
    pageViews: number;
    bounceRate: number;
    avgSessionDuration: number;
  };
}