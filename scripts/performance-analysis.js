#!/usr/bin/env node

/**
 * ARCO PERFORMANCE ANALYSIS SCRIPT
 * 
 * Script para análise automatizada de performance em produção
 * Coleta métricas, gera relatórios e monitora KPIs de negócio
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {  urls: {
    production: process.env.PRODUCTION_URL || 'https://arco-production.vercel.app',
    staging: process.env.STAGING_URL || 'https://arco-staging.vercel.app',
    local: 'http://localhost:3000'
  },
  lighthouse: {
    desktop: {
      formFactor: 'desktop',
      screenEmulation: { mobile: false, width: 1350, height: 940 }
    },
    mobile: {
      formFactor: 'mobile',
      screenEmulation: { mobile: true, width: 360, height: 640 }
    }
  },
  thresholds: {
    lcp: { good: 2500, poor: 4000 },
    cls: { good: 0.1, poor: 0.25 },
    inp: { good: 200, poor: 500 },
    performance: { good: 90, poor: 70 },
    accessibility: { good: 95, poor: 85 },
    seo: { good: 95, poor: 85 }
  }
};

class PerformanceAnalyzer {
  constructor() {
    this.results = {};
    this.timestamp = new Date().toISOString();
  }

  async runLighthouseAudit(url, device = 'desktop') {
    console.log(`📊 Running Lighthouse audit for ${url} (${device})...`);
    
    try {      const config = CONFIG.lighthouse[device];
      const command = [
        'npx lighthouse',
        `"${url}"`,
        '--only-categories=performance,accessibility,seo',
        '--output=json',
        '--output-path=./lighthouse-report.json',
        '--chrome-flags="--headless --no-sandbox"',
        `--form-factor=${config.formFactor}`,
        '--throttling-method=devtools'
      ].join(' ');

      execSync(command, { stdio: 'pipe' });
      
      const reportPath = './lighthouse-report.json';
      if (fs.existsSync(reportPath)) {
        const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
        return this.parseLighthouseReport(report);
      }
    } catch (error) {
      console.error(`❌ Lighthouse audit failed for ${url}:`, error.message);
      return null;
    }
  }

  parseLighthouseReport(report) {
    const audits = report.audits;
    const categories = report.categories;

    return {
      performance: {
        score: Math.round(categories.performance.score * 100),
        metrics: {
          lcp: audits['largest-contentful-paint']?.numericValue || 0,
          cls: audits['cumulative-layout-shift']?.numericValue || 0,
          inp: audits['max-potential-fid']?.numericValue || 0, // Fallback for INP
          fcp: audits['first-contentful-paint']?.numericValue || 0,
          ttfb: audits['server-response-time']?.numericValue || 0
        }
      },
      accessibility: {
        score: Math.round(categories.accessibility.score * 100)
      },
      seo: {
        score: Math.round(categories.seo.score * 100)
      },
      timestamp: this.timestamp
    };
  }

  calculateBusinessImpact(performanceData) {
    const { lcp, cls } = performanceData.performance.metrics;
    
    // ROI calculations based on research
    const lcpImprovementMs = Math.max(0, lcp - 1800); // Target: 1.8s
    const conversionImpact = (lcpImprovementMs / 100) * 0.07; // 7% per 100ms
    const revenueImpact = conversionImpact * 180000; // Average client monthly revenue
    
    const clsImpact = cls > 0.1 ? (cls - 0.1) * 0.05 : 0; // CLS penalty
    
    return {
      potentialMonthlyRevenue: Math.round(revenueImpact),
      conversionIncrease: Math.round(conversionImpact * 100 * 10) / 10,
      clsPenalty: Math.round(clsImpact * 100 * 10) / 10,
      overallHealthScore: this.calculateHealthScore(performanceData)
    };
  }

  calculateHealthScore(data) {
    const { performance, accessibility, seo } = data;
    const weights = { performance: 0.5, accessibility: 0.25, seo: 0.25 };
    
    return Math.round(
      performance.score * weights.performance +
      accessibility.score * weights.accessibility +
      seo.score * weights.seo
    );
  }

  async runFullAnalysis() {
    console.log('🚀 Starting ARCO Performance Analysis...\n');
    
    const environments = ['local', 'staging', 'production'];
    const devices = ['desktop', 'mobile'];
    
    for (const env of environments) {
      const url = CONFIG.urls[env];
      console.log(`\n🌐 Analyzing ${env.toUpperCase()}: ${url}`);
      
      this.results[env] = {};
      
      for (const device of devices) {
        const auditResult = await this.runLighthouseAudit(url, device);
        
        if (auditResult) {
          this.results[env][device] = {
            ...auditResult,
            businessImpact: this.calculateBusinessImpact(auditResult)
          };
          
          console.log(`  ✅ ${device}: Performance ${auditResult.performance.score}/100`);
        } else {
          console.log(`  ❌ ${device}: Audit failed`);
        }
      }
    }
    
    this.generateReport();
  }

  generateReport() {
    console.log('\n📈 ARCO PERFORMANCE ANALYSIS REPORT');
    console.log('=====================================\n');
    
    const reportData = {
      timestamp: this.timestamp,
      summary: this.generateSummary(),
      detailed: this.results,
      recommendations: this.generateRecommendations()
    };
    
    // Console output
    this.printConsoleReport(reportData);
    
    // Save to file
    const reportPath = path.join(process.cwd(), `performance-report-${Date.now()}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
    console.log(`\n💾 Detailed report saved to: ${reportPath}`);
  }

  generateSummary() {
    const summary = {};
    
    Object.keys(this.results).forEach(env => {
      const envData = this.results[env];
      summary[env] = {};
      
      Object.keys(envData).forEach(device => {
        const data = envData[device];
        summary[env][device] = {
          performanceScore: data.performance.score,
          healthScore: data.businessImpact.overallHealthScore,
          lcpMs: Math.round(data.performance.metrics.lcp),
          revenueImpact: data.businessImpact.potentialMonthlyRevenue
        };
      });
    });
    
    return summary;
  }

  generateRecommendations() {
    const recommendations = [];
    
    Object.keys(this.results).forEach(env => {
      Object.keys(this.results[env]).forEach(device => {
        const data = this.results[env][device];
        const metrics = data.performance.metrics;
        
        if (metrics.lcp > CONFIG.thresholds.lcp.good) {
          recommendations.push({
            priority: 'high',
            environment: env,
            device,
            issue: 'LCP exceeds threshold',
            current: `${Math.round(metrics.lcp)}ms`,
            target: `${CONFIG.thresholds.lcp.good}ms`,
            impact: `$${data.businessImpact.potentialMonthlyRevenue}/month potential revenue`
          });
        }
        
        if (metrics.cls > CONFIG.thresholds.cls.good) {
          recommendations.push({
            priority: 'medium',
            environment: env,
            device,
            issue: 'CLS needs improvement',
            current: metrics.cls.toFixed(3),
            target: CONFIG.thresholds.cls.good.toFixed(3),
            impact: `${data.businessImpact.clsPenalty}% conversion penalty`
          });
        }
        
        if (data.performance.score < CONFIG.thresholds.performance.good) {
          recommendations.push({
            priority: 'medium',
            environment: env,
            device,
            issue: 'Performance score below target',
            current: `${data.performance.score}/100`,
            target: `${CONFIG.thresholds.performance.good}/100`,
            impact: 'Overall user experience degradation'
          });
        }
      });
    });
    
    return recommendations.sort((a, b) => {
      const priority = { high: 3, medium: 2, low: 1 };
      return priority[b.priority] - priority[a.priority];
    });
  }

  printConsoleReport(reportData) {
    // Performance Summary
    console.log('📊 PERFORMANCE SUMMARY:');
    Object.keys(reportData.summary).forEach(env => {
      console.log(`\n${env.toUpperCase()}:`);
      Object.keys(reportData.summary[env]).forEach(device => {
        const data = reportData.summary[env][device];
        const status = data.performanceScore >= 90 ? '🟢' : data.performanceScore >= 70 ? '🟡' : '🔴';
        console.log(`  ${status} ${device}: ${data.performanceScore}/100 (LCP: ${data.lcpMs}ms, Revenue Impact: $${data.revenueImpact}/mo)`);
      });
    });
    
    // Recommendations
    if (reportData.recommendations.length > 0) {
      console.log('\n🎯 TOP RECOMMENDATIONS:');
      reportData.recommendations.slice(0, 5).forEach((rec, index) => {
        const priority = rec.priority === 'high' ? '🔴' : rec.priority === 'medium' ? '🟡' : '🟢';
        console.log(`  ${priority} ${index + 1}. ${rec.issue} (${rec.environment}/${rec.device})`);
        console.log(`     Current: ${rec.current} → Target: ${rec.target}`);
        console.log(`     Impact: ${rec.impact}\n`);
      });
    } else {
      console.log('\n🎉 NO CRITICAL ISSUES FOUND! All metrics within targets.');
    }
    
    // Business Impact
    console.log('💰 BUSINESS IMPACT ANALYSIS:');
    const totalRevenuePotential = Object.values(reportData.summary)
      .flatMap(env => Object.values(env))
      .reduce((sum, data) => sum + data.revenueImpact, 0) / 6; // Average across all tests
    
    console.log(`  • Average Revenue Opportunity: $${Math.round(totalRevenuePotential)}/month per client`);
    console.log(`  • Annual Value Potential: $${Math.round(totalRevenuePotential * 12)}/year per client`);
    console.log(`  • Performance optimization = Direct ROI increase`);
  }
}

// Main execution
async function main() {
  try {
    const analyzer = new PerformanceAnalyzer();
    await analyzer.runFullAnalysis();
  } catch (error) {
    console.error('❌ Analysis failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = PerformanceAnalyzer;
