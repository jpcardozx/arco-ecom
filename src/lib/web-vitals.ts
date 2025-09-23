import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals'

/**
 * Real Web Vitals Implementation - Enterprise Grade
 * 
 * Tracks real performance metrics for ARCO website
 * Sends data to analytics for monitoring and optimization
 */

interface WebVitalMetric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  id: string
  navigationType: string
}

interface AnalyticsData {
  metric_name: string
  metric_value: number
  metric_rating: string
  page_url: string
  user_agent: string
  timestamp: number
  session_id: string
}

// Session ID for tracking user journey
const sessionId = crypto.randomUUID()

/**
 * Send metric to analytics endpoint
 */
async function sendToAnalytics(metric: WebVitalMetric) {
  try {
    const analyticsData: AnalyticsData = {
      metric_name: metric.name,
      metric_value: metric.value,
      metric_rating: metric.rating,
      page_url: window.location.href,
      user_agent: navigator.userAgent,
      timestamp: Date.now(),
      session_id: sessionId
    }

    // Send to API endpoint
    await fetch('/api/web-vitals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(analyticsData)
    })

    // Also send to Vercel Analytics if available
    if (typeof window !== 'undefined' && (window as any).va) {
      (window as any).va('track', 'web-vital', {
        name: metric.name,
        value: metric.value,
        rating: metric.rating
      })
    }

    // Console log for development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Web Vital:', {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        url: window.location.pathname
      })
    }
  } catch (error) {
    console.error('Failed to send web vital metric:', error)
  }
}

/**
 * Get rating based on metric value and thresholds
 */
function getMetricRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = {
    LCP: { good: 2.5, poor: 4.0 },
    CLS: { good: 0.1, poor: 0.25 },
    INP: { good: 200, poor: 500 },
    FCP: { good: 1.8, poor: 3.0 },
    TTFB: { good: 800, poor: 1800 }
  }

  const threshold = thresholds[name as keyof typeof thresholds]
  if (!threshold) return 'good'

  if (value <= threshold.good) return 'good'
  if (value <= threshold.poor) return 'needs-improvement'
  return 'poor'
}

/**
 * Initialize Web Vitals monitoring
 */
export function initWebVitals() {
  // Only run in browser
  if (typeof window === 'undefined') return

  // Track all Core Web Vitals
  onLCP((metric) => {
    sendToAnalytics({
      ...metric,
      rating: getMetricRating('LCP', metric.value)
    })
  })

  onCLS((metric) => {
    sendToAnalytics({
      ...metric,
      rating: getMetricRating('CLS', metric.value)
    })
  })

  onINP((metric) => {
    sendToAnalytics({
      ...metric,
      rating: getMetricRating('INP', metric.value)
    })
  })

  onFCP((metric) => {
    sendToAnalytics({
      ...metric,
      rating: getMetricRating('FCP', metric.value)
    })
  })

  onTTFB((metric) => {
    sendToAnalytics({
      ...metric,
      rating: getMetricRating('TTFB', metric.value)
    })
  })
}

/**
 * Get current Web Vitals snapshot
 */
export async function getWebVitalsSnapshot(): Promise<Record<string, any>> {
  return new Promise((resolve) => {
    const metrics: Record<string, any> = {}
    let collected = 0
    const total = 5

    const collectMetric = (name: string, metric: any) => {
      metrics[name] = {
        value: metric.value,
        rating: getMetricRating(name, metric.value)
      }
      collected++
      if (collected === total) {
        resolve(metrics)
      }
    }

    onLCP((metric) => collectMetric('LCP', metric))
    onCLS((metric) => collectMetric('CLS', metric))
    onINP((metric) => collectMetric('INP', metric))
    onFCP((metric) => collectMetric('FCP', metric))
    onTTFB((metric) => collectMetric('TTFB', metric))

    // Timeout after 5 seconds
    setTimeout(() => {
      resolve(metrics)
    }, 5000)
  })
}

/**
 * Performance budget alerts
 */
export function checkPerformanceBudget(metrics: Record<string, any>) {
  const budgets = {
    LCP: 1.2, // seconds
    CLS: 0.1,
    INP: 200, // milliseconds
    FCP: 1.8, // seconds
    TTFB: 600 // milliseconds
  }

  const violations: string[] = []

  Object.entries(budgets).forEach(([metric, budget]) => {
    if (metrics[metric] && metrics[metric].value > budget) {
      violations.push(`${metric}: ${metrics[metric].value} > ${budget}`)
    }
  })

  if (violations.length > 0 && process.env.NODE_ENV === 'development') {
    console.warn('⚠️ Performance Budget Violations:', violations)
  }

  return violations
}

// Export for Next.js reportWebVitals
export function reportWebVitals(metric: any) {
  sendToAnalytics({
    ...metric,
    rating: getMetricRating(metric.name, metric.value)
  })
}
