#!/usr/bin/env npx tsx

/**
 * ARCO MCP Health Check
 * 
 * Validates configuration and tests all components before full server start
 */

import dotenv from 'dotenv';
import GoogleAnalytics4Client from '../core/real-analytics-client.js';
import WebVitalsAnalyzer from '../core/web-vitals-analyzer.js';
import ARCOBusinessCalculator from '../core/arco-business-calculator.js';

// Load environment variables
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

interface HealthCheckResult {
  component: string;
  status: 'healthy' | 'warning' | 'error';
  message: string;
  details?: any;
}

class HealthChecker {
  private results: HealthCheckResult[] = [];

  async runAllChecks(): Promise<void> {
    console.log('🏥 ARCO MCP Health Check Starting...\n');

    await this.checkEnvironmentVariables();
    await this.checkGoogleAnalytics();
    await this.checkWebVitalsAnalyzer();
    await this.checkBusinessCalculator();
    await this.checkNetworkConnectivity();

    this.displayResults();
    this.provideTroubleshootingGuidance();
  }

  private async checkEnvironmentVariables(): Promise<void> {
    console.log('🔧 Checking Environment Variables...');

    const requiredVars = [
      'GA4_PROPERTY_ID',
      'ARCO_CONVERSION_RATE',
      'ARCO_AVERAGE_DEAL_SIZE',
      'ARCO_LEAD_TO_CLIENT_RATE',
      'ARCO_MONTHLY_SESSIONS'
    ];

    const optionalVars = [
      'GA4_SERVICE_ACCOUNT_PATH',
      'GA4_CLIENT_ID',
      'CRUX_API_KEY',
      'NEXT_PUBLIC_SITE_URL'
    ];

    const missing = requiredVars.filter(varName => !process.env[varName]);
    const present = optionalVars.filter(varName => process.env[varName]);

    if (missing.length === 0) {
      this.results.push({
        component: 'Environment Variables',
        status: 'healthy',
        message: `All required variables present. ${present.length} optional variables configured.`,
        details: { missing: [], present }
      });
    } else {
      this.results.push({
        component: 'Environment Variables',
        status: 'error',
        message: `Missing required variables: ${missing.join(', ')}`,
        details: { missing, present }
      });
    }
  }

  private async checkGoogleAnalytics(): Promise<void> {
    console.log('📊 Checking Google Analytics Integration...');

    try {
      const ga4Client = new GoogleAnalytics4Client({
        ga4PropertyId: process.env.GA4_PROPERTY_ID || '',
        ga4ServiceAccountPath: process.env.GA4_SERVICE_ACCOUNT_PATH,
        ga4ClientId: process.env.GA4_CLIENT_ID,
        ga4ClientSecret: process.env.GA4_CLIENT_SECRET
      });

      const healthResult = await ga4Client.healthCheck();
      
      this.results.push({
        component: 'Google Analytics 4',
        status: healthResult.status === 'healthy' ? 'healthy' : 
                healthResult.status === 'error' ? 'error' : 'warning',
        message: healthResult.message,
        details: {
          propertyId: process.env.GA4_PROPERTY_ID,
          authMethod: process.env.GA4_SERVICE_ACCOUNT_PATH ? 'Service Account' : 
                     process.env.GA4_CLIENT_ID ? 'OAuth' : 'None'
        }
      });

    } catch (error) {
      this.results.push({
        component: 'Google Analytics 4',
        status: 'error',
        message: `Failed to initialize GA4 client: ${error instanceof Error ? error.message : 'Unknown error'}`,
        details: { error: error instanceof Error ? error.message : 'Unknown error' }
      });
    }
  }

  private async checkWebVitalsAnalyzer(): Promise<void> {
    console.log('⚡ Checking Web Vitals Analyzer...');

    try {
      const webVitals = new WebVitalsAnalyzer(process.env.CRUX_API_KEY);
      const healthResult = await webVitals.healthCheck();

      this.results.push({
        component: 'Web Vitals Analyzer',
        status: healthResult.status === 'healthy' ? 'healthy' :
                healthResult.status === 'error' ? 'error' : 'warning',
        message: healthResult.message,
        details: {
          cruxApiKey: process.env.CRUX_API_KEY ? 'Configured' : 'Not configured (using estimates)',
          siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'Not configured'
        }
      });

    } catch (error) {
      this.results.push({
        component: 'Web Vitals Analyzer',
        status: 'error',
        message: `Web Vitals analyzer error: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    }
  }

  private async checkBusinessCalculator(): Promise<void> {
    console.log('💼 Checking Business Calculator...');

    try {
      const baselines = {
        conversionRate: parseFloat(process.env.ARCO_CONVERSION_RATE || '0.032'),
        averageDealSize: parseInt(process.env.ARCO_AVERAGE_DEAL_SIZE || '15000'),
        leadToClientRate: parseFloat(process.env.ARCO_LEAD_TO_CLIENT_RATE || '0.08'),
        monthlySessions: parseInt(process.env.ARCO_MONTHLY_SESSIONS || '1500')
      };

      const calculator = new ARCOBusinessCalculator(baselines);
      const healthResult = await calculator.healthCheck();

      // Test a calculation
      const testMetrics = await calculator.getCurrentBaselines();
      const currentRevenue = testMetrics.monthlySessions * 
                           testMetrics.conversionRate * 
                           testMetrics.leadToClientRate * 
                           testMetrics.averageDealSize;

      this.results.push({
        component: 'Business Calculator',
        status: healthResult.status === 'healthy' ? 'healthy' : 'warning',
        message: healthResult.message,
        details: {
          baselines: testMetrics,
          estimatedMonthlyRevenue: Math.round(currentRevenue),
          calculationWorking: currentRevenue > 0
        }
      });

    } catch (error) {
      this.results.push({
        component: 'Business Calculator',
        status: 'error',
        message: `Business calculator error: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    }
  }

  private async checkNetworkConnectivity(): Promise<void> {
    console.log('🌐 Checking Network Connectivity...');

    const testUrls = [
      'https://analyticsdata.googleapis.com',
      'https://chromeuxreport.googleapis.com',
      'https://www.google.com'
    ];

    const results = [];

    for (const url of testUrls) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(url, {
          method: 'HEAD',
          signal: controller.signal
        });

        clearTimeout(timeoutId);
        results.push({ url, status: response.status, success: true });
      } catch (error) {
        results.push({ 
          url, 
          status: 0, 
          success: false, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        });
      }
    }

    const successCount = results.filter(r => r.success).length;
    const status = successCount === testUrls.length ? 'healthy' : 
                  successCount > 0 ? 'warning' : 'error';

    this.results.push({
      component: 'Network Connectivity',
      status,
      message: `${successCount}/${testUrls.length} external services reachable`,
      details: { results }
    });
  }

  private displayResults(): void {
    console.log('\n📋 HEALTH CHECK RESULTS');
    console.log('=======================\n');

    let healthyCount = 0;
    let warningCount = 0;
    let errorCount = 0;

    for (const result of this.results) {
      const statusIcon = result.status === 'healthy' ? '✅' : 
                        result.status === 'warning' ? '⚠️' : '❌';
      
      console.log(`${statusIcon} ${result.component}: ${result.message}`);
      
      if (result.details) {
        console.log(`   Details: ${JSON.stringify(result.details, null, 2).replace(/\n/g, '\n   ')}`);
      }
      
      if (result.status === 'healthy') healthyCount++;
      else if (result.status === 'warning') warningCount++;
      else errorCount++;
      
      console.log();
    }

    // Summary
    console.log('📊 SUMMARY');
    console.log('==========');
    console.log(`✅ Healthy: ${healthyCount}`);
    console.log(`⚠️ Warnings: ${warningCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    
    const overallStatus = errorCount > 0 ? 'ERRORS DETECTED' : 
                         warningCount > 0 ? 'WARNINGS PRESENT' : 'ALL SYSTEMS HEALTHY';
    
    console.log(`\n🎯 Overall Status: ${overallStatus}\n`);
  }

  private provideTroubleshootingGuidance(): void {
    const errors = this.results.filter(r => r.status === 'error');
    const warnings = this.results.filter(r => r.status === 'warning');

    if (errors.length > 0) {
      console.log('🔧 TROUBLESHOOTING GUIDE - ERRORS');
      console.log('=================================\n');

      for (const error of errors) {
        console.log(`❌ ${error.component}:`);
        
        if (error.component === 'Environment Variables') {
          console.log('   1. Copy .env.example to .env.local');
          console.log('   2. Fill in all required values');
          console.log('   3. Ensure no typos in variable names');
        }
        
        if (error.component === 'Google Analytics 4') {
          console.log('   1. Verify GA4_PROPERTY_ID is correct (numeric)');
          console.log('   2. Set up service account authentication:');
          console.log('      • Create service account in Google Cloud Console');
          console.log('      • Enable Analytics API');
          console.log('      • Add service account to GA4 with Viewer access');
          console.log('      • Download JSON key and set GA4_SERVICE_ACCOUNT_PATH');
        }
        
        console.log();
      }
    }

    if (warnings.length > 0) {
      console.log('⚠️ OPTIMIZATION SUGGESTIONS - WARNINGS');
      console.log('======================================\n');

      for (const warning of warnings) {
        console.log(`⚠️ ${warning.component}:`);
        
        if (warning.component === 'Web Vitals Analyzer') {
          console.log('   • Get Chrome UX Report API key for real Web Vitals data');
          console.log('   • Set CRUX_API_KEY in .env.local');
          console.log('   • Current implementation uses estimates');
        }
        
        console.log();
      }
    }

    // Deployment guidance
    console.log('🚀 DEPLOYMENT READINESS');
    console.log('=======================');
    
    const errorCount = errors.length;
    const warningCount = warnings.length;
    
    if (errorCount === 0) {
      if (warningCount === 0) {
        console.log('✅ PRODUCTION READY: All systems healthy, ready for deployment');
        console.log('   Next steps:');
        console.log('   • Run: npm run mcp:simple');
        console.log('   • Test tools with real data');
        console.log('   • Deploy to Vercel');
      } else {
        console.log('🟡 DEPLOYMENT READY: Core functionality working, optimizations available');
        console.log('   • Can deploy with current configuration');
        console.log('   • Address warnings for enhanced functionality');
      }
    } else {
      console.log('🔴 NOT READY: Fix errors before deployment');
      console.log('   • Address configuration issues');
      console.log('   • Re-run health check');
    }
    
    console.log('\n💡 Quick Start:');
    console.log('   1. Fix any errors above');
    console.log('   2. Run: npm run mcp:simple');
    console.log('   3. Test tools with: npm run mcp:test:unit');
    console.log('   4. Deploy with: vercel deploy');
  }
}

// Main execution
async function main() {
  const checker = new HealthChecker();
  await checker.runAllChecks();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('❌ Health check failed:', error);
    process.exit(1);
  });
}

export default HealthChecker;