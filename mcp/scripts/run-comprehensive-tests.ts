#!/usr/bin/env npx tsx

/**
 * ARCO MCP Comprehensive Test Runner
 * 
 * Executes all MCP tests and generates detailed reports
 */

import ComprehensiveTestFramework from '../testing/comprehensive-test-framework.js';
import fs from 'fs/promises';
import path from 'path';

interface TestExecutionConfig {
  runUnitTests: boolean;
  runIntegrationTests: boolean;
  runPerformanceTests: boolean;
  runSecurityTests: boolean;
  generateReport: boolean;
  outputFormat: 'console' | 'json' | 'html' | 'all';
  outputDirectory: string;
}

class TestRunner {
  private config: TestExecutionConfig;
  private framework: ComprehensiveTestFramework;

  constructor(config: Partial<TestExecutionConfig> = {}) {
    this.config = {
      runUnitTests: true,
      runIntegrationTests: true,
      runPerformanceTests: true,
      runSecurityTests: true,
      generateReport: true,
      outputFormat: 'all',
      outputDirectory: './test-results',
      ...config
    };
    
    this.framework = new ComprehensiveTestFramework();
  }

  async run(): Promise<void> {
    console.log('🚀 ARCO MCP Comprehensive Test Runner');
    console.log('=====================================\n');
    
    // Ensure output directory exists
    await this.ensureOutputDirectory();
    
    // Run tests
    const results = await this.framework.runAllTests();
    
    // Generate reports
    if (this.config.generateReport) {
      await this.generateReports(results);
    }
    
    // Display summary
    this.displaySummary(results.summary);
    
    // Exit with appropriate code
    const exitCode = results.summary.failed > 0 ? 1 : 0;
    console.log(`\n🏁 Tests completed with exit code: ${exitCode}`);
    process.exit(exitCode);
  }

  private async ensureOutputDirectory(): Promise<void> {
    try {
      await fs.mkdir(this.config.outputDirectory, { recursive: true });
    } catch (error) {
      console.error('❌ Failed to create output directory:', error);
      throw error;
    }
  }

  private async generateReports(results: any): Promise<void> {
    console.log('\n📊 Generating test reports...');
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const baseFilename = `arco-mcp-test-report-${timestamp}`;
    
    if (this.config.outputFormat === 'console' || this.config.outputFormat === 'all') {
      this.generateConsoleReport(results);
    }
    
    if (this.config.outputFormat === 'json' || this.config.outputFormat === 'all') {
      await this.generateJSONReport(results, `${baseFilename}.json`);
    }
    
    if (this.config.outputFormat === 'html' || this.config.outputFormat === 'all') {
      await this.generateHTMLReport(results, `${baseFilename}.html`);
    }
  }

  private generateConsoleReport(results: any): void {
    console.log('\n📋 DETAILED TEST RESULTS');
    console.log('========================\n');
    
    // Test suite results
    for (const [suiteName, suiteResults] of results.results.entries()) {
      console.log(`\n🧪 ${suiteName}`);
      console.log('-'.repeat(suiteName.length + 3));
      
      for (const result of suiteResults as any[]) {
        const statusIcon = result.status === 'passed' ? '✅' : 
                          result.status === 'warning' ? '⚠️' : '❌';
        console.log(`${statusIcon} ${result.testName} (${result.duration}ms)`);
        
        if (result.error) {
          console.log(`   ❌ Error: ${result.error}`);
        }
        
        if (result.recommendations && result.recommendations.length > 0) {
          console.log(`   💡 Recommendations:`);
          result.recommendations.forEach((rec: string) => {
            console.log(`      • ${rec}`);
          });
        }
      }
    }
    
    // Performance benchmarks
    if (results.performance.length > 0) {
      console.log('\n⚡ PERFORMANCE BENCHMARKS');
      console.log('========================\n');
      
      results.performance.forEach((benchmark: any) => {
        const status = benchmark.passed ? '✅' : '❌';
        console.log(`${status} ${benchmark.operation}: ${benchmark.actualTime}ms (max: ${benchmark.expectedMaxTime}ms)`);
      });
    }
    
    // Security results
    if (results.security.length > 0) {
      console.log('\n🔒 SECURITY TEST RESULTS');
      console.log('========================\n');
      
      results.security.forEach((security: any) => {
        const status = security.detected ? '❌' : '✅';
        const severity = security.severity.toUpperCase();
        console.log(`${status} ${security.vulnerability} [${severity}]`);
        
        if (security.mitigation) {
          console.log(`   🛡️ Mitigation: ${security.mitigation}`);
        }
      });
    }
  }

  private async generateJSONReport(results: any, filename: string): Promise<void> {
    const reportPath = path.join(this.config.outputDirectory, filename);
    
    const jsonReport = {
      metadata: {
        timestamp: new Date().toISOString(),
        version: '4.0.0',
        testFramework: 'ARCO MCP Comprehensive Test Framework'
      },
      summary: results.summary,
      testResults: Object.fromEntries(results.results),
      performance: results.performance,
      security: results.security,
      recommendations: this.generateOverallRecommendations(results)
    };
    
    try {
      await fs.writeFile(reportPath, JSON.stringify(jsonReport, null, 2));
      console.log(`📄 JSON report saved: ${reportPath}`);
    } catch (error) {
      console.error('❌ Failed to generate JSON report:', error);
    }
  }

  private async generateHTMLReport(results: any, filename: string): Promise<void> {
    const reportPath = path.join(this.config.outputDirectory, filename);
    
    const htmlContent = this.generateHTMLContent(results);
    
    try {
      await fs.writeFile(reportPath, htmlContent);
      console.log(`📄 HTML report saved: ${reportPath}`);
    } catch (error) {
      console.error('❌ Failed to generate HTML report:', error);
    }
  }

  private generateHTMLContent(results: any): string {
    const summary = results.summary;
    const timestamp = new Date().toISOString();
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ARCO MCP Test Report</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
        .content { padding: 30px; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .metric { background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; border-left: 4px solid #667eea; }
        .metric-value { font-size: 2em; font-weight: bold; color: #2c3e50; }
        .metric-label { color: #7f8c8d; margin-top: 5px; }
        .test-suite { margin-bottom: 30px; }
        .test-suite h3 { color: #2c3e50; border-bottom: 2px solid #ecf0f1; padding-bottom: 10px; }
        .test-result { display: flex; align-items: center; padding: 10px; margin: 5px 0; border-radius: 4px; }
        .test-result.passed { background: #d4edda; border-left: 4px solid #28a745; }
        .test-result.failed { background: #f8d7da; border-left: 4px solid #dc3545; }
        .test-result.warning { background: #fff3cd; border-left: 4px solid #ffc107; }
        .status-icon { margin-right: 10px; font-size: 1.2em; }
        .performance-chart { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .benchmark { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #ecf0f1; }
        .security-section { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .vulnerability { padding: 10px; margin: 5px 0; border-radius: 4px; }
        .vulnerability.safe { background: #d4edda; }
        .vulnerability.detected { background: #f8d7da; }
        .recommendations { background: #e8f4f8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #17a2b8; }
        .footer { text-align: center; padding: 20px; color: #7f8c8d; border-top: 1px solid #ecf0f1; margin-top: 30px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🧪 ARCO MCP Test Report</h1>
            <p>Comprehensive test results for ARCO Model Context Protocol Intelligence Platform</p>
            <p><strong>Generated:</strong> ${timestamp}</p>
        </div>
        
        <div class="content">
            <div class="summary">
                <div class="metric">
                    <div class="metric-value">${summary.total}</div>
                    <div class="metric-label">Total Tests</div>
                </div>
                <div class="metric">
                    <div class="metric-value" style="color: #28a745;">${summary.passed}</div>
                    <div class="metric-label">Passed</div>
                </div>
                <div class="metric">
                    <div class="metric-value" style="color: #dc3545;">${summary.failed}</div>
                    <div class="metric-label">Failed</div>
                </div>
                <div class="metric">
                    <div class="metric-value" style="color: #ffc107;">${summary.warnings}</div>
                    <div class="metric-label">Warnings</div>
                </div>
                <div class="metric">
                    <div class="metric-value">${summary.successRate}</div>
                    <div class="metric-label">Success Rate</div>
                </div>
                <div class="metric">
                    <div class="metric-value">${summary.totalTime}</div>
                    <div class="metric-label">Total Time</div>
                </div>
            </div>

            ${this.generateTestSuitesHTML(results.results)}
            ${this.generatePerformanceHTML(results.performance)}
            ${this.generateSecurityHTML(results.security)}
            ${this.generateRecommendationsHTML(results)}
        </div>
        
        <div class="footer">
            <p>Generated by ARCO MCP Comprehensive Test Framework v4.0.0</p>
        </div>
    </div>
</body>
</html>`;
  }

  private generateTestSuitesHTML(results: Map<string, any[]>): string {
    let html = '<h2>📋 Test Results by Suite</h2>';
    
    for (const [suiteName, suiteResults] of results.entries()) {
      html += `<div class="test-suite">`;
      html += `<h3>🧪 ${suiteName}</h3>`;
      
      for (const result of suiteResults) {
        const statusClass = result.status;
        const statusIcon = result.status === 'passed' ? '✅' : 
                          result.status === 'warning' ? '⚠️' : '❌';
        
        html += `<div class="test-result ${statusClass}">`;
        html += `<span class="status-icon">${statusIcon}</span>`;
        html += `<div style="flex-grow: 1;">`;
        html += `<strong>${result.testName}</strong> (${result.duration}ms)`;
        
        if (result.error) {
          html += `<br><small style="color: #dc3545;">Error: ${result.error}</small>`;
        }
        
        html += `</div></div>`;
      }
      
      html += `</div>`;
    }
    
    return html;
  }

  private generatePerformanceHTML(performance: any[]): string {
    if (performance.length === 0) return '';
    
    let html = '<div class="performance-chart">';
    html += '<h2>⚡ Performance Benchmarks</h2>';
    
    for (const benchmark of performance) {
      const status = benchmark.passed ? '✅' : '❌';
      html += `<div class="benchmark">`;
      html += `<span>${status} ${benchmark.operation}</span>`;
      html += `<span>${benchmark.actualTime}ms / ${benchmark.expectedMaxTime}ms</span>`;
      html += `</div>`;
    }
    
    html += '</div>';
    return html;
  }

  private generateSecurityHTML(security: any[]): string {
    if (security.length === 0) return '';
    
    let html = '<div class="security-section">';
    html += '<h2>🔒 Security Test Results</h2>';
    
    for (const result of security) {
      const className = result.detected ? 'detected' : 'safe';
      const status = result.detected ? '❌' : '✅';
      
      html += `<div class="vulnerability ${className}">`;
      html += `${status} <strong>${result.vulnerability}</strong> [${result.severity.toUpperCase()}]`;
      
      if (result.mitigation) {
        html += `<br><small>🛡️ ${result.mitigation}</small>`;
      }
      
      html += `</div>`;
    }
    
    html += '</div>';
    return html;
  }

  private generateRecommendationsHTML(results: any): string {
    const recommendations = this.generateOverallRecommendations(results);
    
    if (recommendations.length === 0) return '';
    
    let html = '<div class="recommendations">';
    html += '<h2>💡 Overall Recommendations</h2>';
    html += '<ul>';
    
    for (const recommendation of recommendations) {
      html += `<li>${recommendation}</li>`;
    }
    
    html += '</ul></div>';
    return html;
  }

  private generateOverallRecommendations(results: any): string[] {
    const recommendations: string[] = [];
    
    // Performance recommendations
    if (results.performance.some((p: any) => !p.passed)) {
      recommendations.push('Optimize slow-performing tools for better user experience');
    }
    
    // Security recommendations
    const criticalVulns = results.security.filter((s: any) => s.detected && s.severity === 'critical');
    if (criticalVulns.length > 0) {
      recommendations.push('Address critical security vulnerabilities immediately');
    }
    
    // Test failure recommendations
    if (results.summary.failed > 0) {
      recommendations.push('Investigate and fix failing tests to ensure system reliability');
    }
    
    // Success recommendations
    if (results.summary.successRate === '100.0%') {
      recommendations.push('Excellent test coverage! Consider adding edge case tests');
    }
    
    return recommendations;
  }

  private displaySummary(summary: any): void {
    console.log('\n🎯 TEST EXECUTION SUMMARY');
    console.log('========================');
    console.log(`📊 Total Tests: ${summary.total}`);
    console.log(`✅ Passed: ${summary.passed}`);
    console.log(`❌ Failed: ${summary.failed}`);
    console.log(`⚠️ Warnings: ${summary.warnings}`);
    console.log(`🎯 Success Rate: ${summary.successRate}`);
    console.log(`⏱️ Total Time: ${summary.totalTime}`);
    
    if (summary.performance.benchmarks > 0) {
      console.log(`⚡ Performance: ${summary.performance.averageResponseTime}ms avg`);
    }
    
    if (summary.security.vulnerabilities > 0) {
      console.log(`🔒 Security: ${summary.security.vulnerabilities} vulnerabilities detected`);
    }
  }
}

// CLI execution
async function main() {
  const args = process.argv.slice(2);
  const config: Partial<TestExecutionConfig> = {};
  
  // Parse command line arguments
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--unit-only':
        config.runIntegrationTests = false;
        config.runPerformanceTests = false;
        config.runSecurityTests = false;
        break;
      case '--integration-only':
        config.runUnitTests = false;
        config.runPerformanceTests = false;
        config.runSecurityTests = false;
        break;
      case '--performance-only':
        config.runUnitTests = false;
        config.runIntegrationTests = false;
        config.runSecurityTests = false;
        break;
      case '--security-only':
        config.runUnitTests = false;
        config.runIntegrationTests = false;
        config.runPerformanceTests = false;
        break;
      case '--format':
        config.outputFormat = args[++i] as any;
        break;
      case '--output':
        config.outputDirectory = args[++i];
        break;
      case '--no-report':
        config.generateReport = false;
        break;
      case '--help':
        console.log(`
ARCO MCP Comprehensive Test Runner

Usage: npx tsx run-comprehensive-tests.ts [options]

Options:
  --unit-only         Run only unit tests
  --integration-only  Run only integration tests
  --performance-only  Run only performance tests
  --security-only     Run only security tests
  --format FORMAT     Output format: console, json, html, all (default: all)
  --output DIR        Output directory (default: ./test-results)
  --no-report         Skip report generation
  --help              Show this help message

Examples:
  npx tsx run-comprehensive-tests.ts
  npx tsx run-comprehensive-tests.ts --unit-only --format json
  npx tsx run-comprehensive-tests.ts --performance-only --output ./perf-results
        `);
        process.exit(0);
        break;
    }
  }
  
  const runner = new TestRunner(config);
  await runner.run();
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('❌ Test runner failed:', error);
    process.exit(1);
  });
}

export default TestRunner;