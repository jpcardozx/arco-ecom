/**
 * Technical Analysis API - Real integrations with performance monitoring services
 * Provides actual data for the Technical Analysis System
 */

export interface WebVitalsData {
  url: string
  timestamp: number
  lcp: number // Largest Contentful Paint
  fid: number // First Input Delay
  cls: number // Cumulative Layout Shift
  ttfb: number // Time to First Byte
  fcp: number // First Contentful Paint
}

export interface LighthouseData {
  performance: number
  accessibility: number
  bestPractices: number
  seo: number
  pwa: number
}

export interface SecurityScanResult {
  vulnerabilities: {
    critical: number
    high: number
    medium: number
    low: number
  }
  httpsStatus: boolean
  headersSecurity: {
    hsts: boolean
    csp: boolean
    xssProtection: boolean
  }
  sslGrade: string
}

export interface TechnicalIssue {
  id: string
  category: 'performance' | 'security' | 'accessibility' | 'seo' | 'mobile'
  severity: 'critical' | 'high' | 'medium' | 'low'
  title: string
  description: string
  impact: string
  solution: string
  effort: 'low' | 'medium' | 'high'
  estimatedValue: number
  technicalDetails: {
    code?: string
    file?: string
    line?: number
    metric?: string
    threshold?: number
    current?: number
  }
}

export interface CompetitorAnalysis {
  competitor: string
  performanceScore: number
  loadTime: number
  mobileScore: number
  features: string[]
}

export interface ROICalculation {
  currentConversionRate: number
  projectedConversionRate: number
  monthlyTraffic: number
  averageOrderValue: number
  potentialRevenue: number
  implementationCost: number
  roi: number
  paybackPeriod: number
  confidenceScore: number
}

// Real API integrations
export class TechnicalAnalysisAPI {
  private readonly apiKey: string
  private readonly baseUrl: string

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_ANALYSIS_API_KEY || ''
    this.baseUrl = process.env.NEXT_PUBLIC_ANALYSIS_API_URL || 'https://api.arco-tech.com'
  }

  /**
   * Get real-time Web Vitals using Google PageSpeed Insights API
   */
  async getWebVitals(url: string): Promise<WebVitalsData> {
    try {
      const response = await fetch(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&category=performance&strategy=mobile`,
        {
          headers: {
            'X-API-Key': process.env.GOOGLE_PAGESPEED_API_KEY || ''
          }
        }
      )

      if (!response.ok) {
        throw new Error(`PageSpeed API error: ${response.status}`)
      }

      const data = await response.json()
      const metrics = data.loadingExperience?.metrics || {}

      return {
        url,
        timestamp: Date.now(),
        lcp: metrics.LARGEST_CONTENTFUL_PAINT_MS?.percentile || 0,
        fid: metrics.FIRST_INPUT_DELAY_MS?.percentile || 0,
        cls: metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile || 0,
        ttfb: metrics.EXPERIMENTAL_TIME_TO_FIRST_BYTE?.percentile || 0,
        fcp: metrics.FIRST_CONTENTFUL_PAINT_MS?.percentile || 0
      }
    } catch (error) {
      console.error('Error fetching Web Vitals:', error)
      throw new Error('Failed to fetch Web Vitals data')
    }
  }

  /**
   * Run Lighthouse analysis using Google PageSpeed Insights
   */
  async getLighthouseData(url: string): Promise<LighthouseData> {
    try {
      const response = await fetch(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&category=performance&category=accessibility&category=best-practices&category=seo&category=pwa`,
        {
          headers: {
            'X-API-Key': process.env.GOOGLE_PAGESPEED_API_KEY || ''
          }
        }
      )

      if (!response.ok) {
        throw new Error(`Lighthouse API error: ${response.status}`)
      }

      const data = await response.json()
      const categories = data.lighthouseResult?.categories || {}

      return {
        performance: Math.round((categories.performance?.score || 0) * 100),
        accessibility: Math.round((categories.accessibility?.score || 0) * 100),
        bestPractices: Math.round((categories['best-practices']?.score || 0) * 100),
        seo: Math.round((categories.seo?.score || 0) * 100),
        pwa: Math.round((categories.pwa?.score || 0) * 100)
      }
    } catch (error) {
      console.error('Error fetching Lighthouse data:', error)
      throw new Error('Failed to fetch Lighthouse data')
    }
  }

  /**
   * Security scan using SSL Labs API and custom security checks
   */
  async getSecurityScan(url: string): Promise<SecurityScanResult> {
    try {
      const domain = new URL(url).hostname

      // SSL Labs API for SSL analysis
      const sslResponse = await fetch(
        `https://api.ssllabs.com/api/v3/analyze?host=${domain}&publish=off&all=done`,
        {
          method: 'GET',
          headers: {
            'User-Agent': 'ARCO Technical Analysis System'
          }
        }
      )

      const sslData = await sslResponse.json()
      const sslGrade = sslData.endpoints?.[0]?.grade || 'Unknown'

      // Security headers check
      const headersResponse = await fetch(url, { method: 'HEAD' })
      const headers = headersResponse.headers

      return {
        vulnerabilities: {
          critical: 0,
          high: headers.get('strict-transport-security') ? 0 : 1,
          medium: headers.get('content-security-policy') ? 0 : 1,
          low: headers.get('x-content-type-options') ? 0 : 1
        },
        httpsStatus: url.startsWith('https://'),
        headersSecurity: {
          hsts: !!headers.get('strict-transport-security'),
          csp: !!headers.get('content-security-policy'),
          xssProtection: !!headers.get('x-xss-protection')
        },
        sslGrade
      }
    } catch (error) {
      console.error('Error in security scan:', error)
      throw new Error('Failed to perform security scan')
    }
  }

  /**
   * Analyze technical issues using multiple data sources
   */
  async analyzeTechnicalIssues(url: string): Promise<TechnicalIssue[]> {
    try {
      const [webVitals, lighthouse, security] = await Promise.all([
        this.getWebVitals(url),
        this.getLighthouseData(url),
        this.getSecurityScan(url)
      ])

      const issues: TechnicalIssue[] = []

      // Performance issues
      if (webVitals.lcp > 2500) {
        issues.push({
          id: 'lcp-slow',
          category: 'performance',
          severity: webVitals.lcp > 4000 ? 'critical' : 'high',
          title: 'Slow Largest Contentful Paint',
          description: `LCP is ${webVitals.lcp}ms, significantly above the 2.5s threshold`,
          impact: 'Users experience slow page loading, leading to increased bounce rates',
          solution: 'Optimize images, implement critical CSS, use CDN, preload key resources',
          effort: 'medium',
          estimatedValue: Math.round((webVitals.lcp - 2500) * 5),
          technicalDetails: {
            metric: 'LCP',
            threshold: 2500,
            current: webVitals.lcp
          }
        })
      }

      if (webVitals.cls > 0.1) {
        issues.push({
          id: 'cls-high',
          category: 'performance',
          severity: webVitals.cls > 0.25 ? 'critical' : 'high',
          title: 'High Cumulative Layout Shift',
          description: `CLS score of ${webVitals.cls} causes visual instability`,
          impact: 'Poor user experience, difficulty interacting with page elements',
          solution: 'Add size attributes to images, reserve space for ads, use font-display: swap',
          effort: 'low',
          estimatedValue: Math.round(webVitals.cls * 10000),
          technicalDetails: {
            metric: 'CLS',
            threshold: 0.1,
            current: webVitals.cls
          }
        })
      }

      // Security issues
      if (!security.httpsStatus) {
        issues.push({
          id: 'no-https',
          category: 'security',
          severity: 'critical',
          title: 'Missing HTTPS',
          description: 'Website is not served over HTTPS',
          impact: 'Data transmission is not encrypted, browser warnings, SEO penalties',
          solution: 'Install SSL certificate and redirect all HTTP traffic to HTTPS',
          effort: 'low',
          estimatedValue: 5000,
          technicalDetails: {
            code: 'Redirect 301 / https://example.com/'
          }
        })
      }

      if (!security.headersSecurity.hsts) {
        issues.push({
          id: 'missing-hsts',
          category: 'security',
          severity: 'medium',
          title: 'Missing HSTS Header',
          description: 'Strict-Transport-Security header not implemented',
          impact: 'Vulnerability to man-in-the-middle attacks',
          solution: 'Add HSTS header to force HTTPS connections',
          effort: 'low',
          estimatedValue: 1000,
          technicalDetails: {
            code: 'Strict-Transport-Security: max-age=31536000; includeSubDomains'
          }
        })
      }

      // Accessibility issues based on Lighthouse score
      if (lighthouse.accessibility < 90) {
        issues.push({
          id: 'accessibility-low',
          category: 'accessibility',
          severity: lighthouse.accessibility < 70 ? 'high' : 'medium',
          title: 'Accessibility Issues',
          description: `Accessibility score is ${lighthouse.accessibility}/100`,
          impact: 'Excludes users with disabilities, potential legal compliance issues',
          solution: 'Add alt text, improve color contrast, implement ARIA labels',
          effort: 'medium',
          estimatedValue: (90 - lighthouse.accessibility) * 100,
          technicalDetails: {
            metric: 'Accessibility Score',
            threshold: 90,
            current: lighthouse.accessibility
          }
        })
      }

      return issues
    } catch (error) {
      console.error('Error analyzing technical issues:', error)
      throw new Error('Failed to analyze technical issues')
    }
  }

  /**
   * Get competitor analysis using third-party APIs
   */
  async getCompetitorAnalysis(url: string, competitors: string[]): Promise<CompetitorAnalysis[]> {
    try {
      const results = await Promise.all(
        competitors.map(async (competitor) => {
          const lighthouse = await this.getLighthouseData(competitor)
          const webVitals = await this.getWebVitals(competitor)

          return {
            competitor,
            performanceScore: lighthouse.performance,
            loadTime: webVitals.lcp,
            mobileScore: lighthouse.performance,
            features: [] // Would be populated by feature detection
          }
        })
      )

      return results
    } catch (error) {
      console.error('Error in competitor analysis:', error)
      throw new Error('Failed to perform competitor analysis')
    }
  }

  /**
   * Calculate ROI based on real traffic and conversion data
   */
  async calculateROI(
    url: string,
    currentConversionRate: number,
    monthlyTraffic: number,
    averageOrderValue: number,
    issues: TechnicalIssue[]
  ): Promise<ROICalculation> {
    try {
      // Calculate potential conversion rate improvement
      const performanceImpact = issues
        .filter(issue => issue.category === 'performance')
        .reduce((sum, issue) => {
          switch (issue.severity) {
            case 'critical': return sum + 0.3
            case 'high': return sum + 0.2
            case 'medium': return sum + 0.1
            default: return sum + 0.05
          }
        }, 0)

      const projectedConversionRate = Math.min(
        currentConversionRate * (1 + performanceImpact),
        currentConversionRate * 2 // Cap at 100% improvement
      )

      const additionalConversions = (projectedConversionRate - currentConversionRate) / 100 * monthlyTraffic
      const monthlyAdditionalRevenue = additionalConversions * averageOrderValue
      const annualAdditionalRevenue = monthlyAdditionalRevenue * 12

      const implementationCost = issues.reduce((sum, issue) => {
        switch (issue.effort) {
          case 'low': return sum + 1000
          case 'medium': return sum + 5000
          case 'high': return sum + 15000
          default: return sum
        }
      }, 0)

      const roi = ((annualAdditionalRevenue - implementationCost) / implementationCost) * 100
      const paybackPeriod = implementationCost / monthlyAdditionalRevenue

      return {
        currentConversionRate,
        projectedConversionRate,
        monthlyTraffic,
        averageOrderValue,
        potentialRevenue: annualAdditionalRevenue,
        implementationCost,
        roi,
        paybackPeriod,
        confidenceScore: Math.min(95, 60 + (issues.length * 5)) // Higher confidence with more issues found
      }
    } catch (error) {
      console.error('Error calculating ROI:', error)
      throw new Error('Failed to calculate ROI')
    }
  }

  /**
   * Complete technical analysis - main entry point
   */
  async runCompleteAnalysis(
    url: string,
    trafficData?: {
      monthlyTraffic: number
      conversionRate: number
      averageOrderValue: number
    }
  ) {
    try {
      console.log(`Starting complete technical analysis for: ${url}`)

      const [webVitals, lighthouse, security, issues] = await Promise.all([
        this.getWebVitals(url),
        this.getLighthouseData(url),
        this.getSecurityScan(url),
        this.analyzeTechnicalIssues(url)
      ])

      // Calculate overall health score
      const healthScore = Math.round(
        (lighthouse.performance * 0.4 +
         lighthouse.accessibility * 0.2 +
         lighthouse.bestPractices * 0.2 +
         lighthouse.seo * 0.2) *
        (security.httpsStatus ? 1 : 0.7) // Penalize non-HTTPS sites
      )

      // Calculate ROI if traffic data provided
      let roi: ROICalculation | null = null
      if (trafficData) {
        roi = await this.calculateROI(
          url,
          trafficData.conversionRate,
          trafficData.monthlyTraffic,
          trafficData.averageOrderValue,
          issues
        )
      }

      return {
        url,
        timestamp: new Date(),
        healthScore,
        webVitals,
        lighthouse,
        security,
        issues,
        roi,
        recommendations: this.generateRecommendations(issues, lighthouse)
      }
    } catch (error) {
      console.error('Error in complete analysis:', error)
      throw error
    }
  }

  /**
   * Generate prioritized recommendations based on issues
   */
  private generateRecommendations(issues: TechnicalIssue[], lighthouse: LighthouseData) {
    const recommendations = []

    // Performance recommendations
    const performanceIssues = issues.filter(i => i.category === 'performance')
    if (performanceIssues.length > 0) {
      recommendations.push({
        id: 'performance-optimization',
        priority: 1,
        title: 'Performance Optimization',
        description: 'Address critical performance bottlenecks',
        implementation: performanceIssues.map(i => i.solution).join(', '),
        businessImpact: `Improve user experience and potentially increase conversions by ${performanceIssues.length * 3}%`,
        technicalComplexity: 7,
        expectedLift: performanceIssues.length * 3,
        timeframe: '2-4 weeks'
      })
    }

    // Security recommendations
    const securityIssues = issues.filter(i => i.category === 'security')
    if (securityIssues.length > 0) {
      recommendations.push({
        id: 'security-hardening',
        priority: 2,
        title: 'Security Hardening',
        description: 'Implement security best practices',
        implementation: securityIssues.map(i => i.solution).join(', '),
        businessImpact: 'Protect user data and build trust',
        technicalComplexity: 4,
        expectedLift: 2,
        timeframe: '1-2 weeks'
      })
    }

    return recommendations
  }
}

// Export singleton instance
export const technicalAnalysisAPI = new TechnicalAnalysisAPI()