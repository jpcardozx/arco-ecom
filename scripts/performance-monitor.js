#!/usr/bin/env node

/**
 * ARCO PERFORMANCE MONITOR SCRIPT
 * 
 * Sistema de monitoramento de performance em tempo real
 * Integra métricas técnicas com KPIs de negócio
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class PerformanceMonitor {
  constructor() {
    this.browser = null;
    this.page = null;
    this.metrics = {};
    this.timestamp = Date.now();
  }

  async initialize() {
    console.log('🚀 Inicializando ARCO Performance Monitor...');
    
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    });

    this.page = await this.browser.newPage();
    
    // Configurar viewport
    await this.page.setViewport({ width: 1920, height: 1080 });
    
    console.log('✅ Browser inicializado com sucesso');
  }

  async measurePerformance(url) {
    console.log(`📊 Analisando performance: ${url}`);
    
    const startTime = Date.now();
    
    // Configurar coleta de métricas
    await this.page.setRequestInterception(true);
    
    const resources = [];
    let totalSize = 0;
    
    this.page.on('request', (request) => {
      request.continue();
    });

    this.page.on('response', (response) => {
      const size = parseInt(response.headers()['content-length'] || '0');
      totalSize += size;
      
      resources.push({
        url: response.url(),
        status: response.status(),
        type: response.request().resourceType(),
        size: size,
        timing: response.timing()
      });
    });

    // Navegar para a página
    const navigationStart = Date.now();
    
    try {
      await this.page.goto(url, { 
        waitUntil: 'networkidle2',
        timeout: 30000
      });
    } catch (error) {
      console.error(`❌ Erro ao carregar ${url}:`, error.message);
      return null;
    }

    const navigationEnd = Date.now();
    const loadTime = navigationEnd - navigationStart;

    // Coletar Web Vitals
    const webVitals = await this.collectWebVitals();
    
    // Coletar métricas de performance
    const performanceMetrics = await this.page.evaluate(() => {
      const timing = performance.timing;
      const navigation = performance.getEntriesByType('navigation')[0];
      
      return {
        domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
        loadComplete: timing.loadEventEnd - timing.navigationStart,
        firstPaint: navigation?.loadEventEnd || 0,
        domInteractive: timing.domInteractive - timing.navigationStart,
        ttfb: timing.responseStart - timing.navigationStart
      };
    });

    // Calcular métricas de negócio
    const businessMetrics = this.calculateBusinessImpact(performanceMetrics, webVitals);

    const result = {
      url,
      timestamp: this.timestamp,
      loadTime,
      totalSize: Math.round(totalSize / 1024), // KB
      resourceCount: resources.length,
      performance: performanceMetrics,
      webVitals,
      business: businessMetrics,
      resources: resources.slice(0, 10) // Top 10 recursos
    };

    console.log(`✅ Análise concluída em ${loadTime}ms`);
    return result;
  }

  async collectWebVitals() {
    try {
      const webVitals = await this.page.evaluate(() => {
        return new Promise((resolve) => {
          const vitals = {};
          
          // Simular coleta de Web Vitals (em produção use web-vitals library)
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (entry.entryType === 'largest-contentful-paint') {
                vitals.lcp = Math.round(entry.startTime);
              }
              if (entry.entryType === 'first-input') {
                vitals.fid = Math.round(entry.processingStart - entry.startTime);
              }
              if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
                vitals.cls = (vitals.cls || 0) + entry.value;
              }
            }
          });

          observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
          
          // Timeout para coletar métricas
          setTimeout(() => {
            resolve({
              lcp: vitals.lcp || 0,
              fid: vitals.fid || 0,
              cls: Math.round((vitals.cls || 0) * 1000) / 1000,
              ttfb: performance.timing.responseStart - performance.timing.navigationStart
            });
          }, 3000);
        });
      });

      return webVitals;
    } catch (error) {
      console.warn('⚠️ Erro ao coletar Web Vitals:', error.message);
      return { lcp: 0, fid: 0, cls: 0, ttfb: 0 };
    }
  }

  calculateBusinessImpact(performance, webVitals) {
    // Cálculos baseados em research do Google e benchmarks da indústria
    const { lcp } = webVitals;
    const { loadComplete } = performance;

    // Conversion Rate Impact (Google research: 1s delay = 7% conversion drop)
    const conversionImpact = Math.max(0, (loadComplete - 1000) / 1000 * 0.07);
    
    // Bounce Rate Impact (53% users abandon if load > 3s)
    const bounceRateIncrease = loadComplete > 3000 ? 0.53 : (loadComplete / 3000) * 0.2;
    
    // SEO Score Impact (Core Web Vitals)
    const seoScore = this.calculateSEOScore(webVitals);
    
    // Revenue Impact (exemplo: cliente com $100k revenue/month)
    const monthlyRevenue = 100000;
    const revenueImpact = monthlyRevenue * conversionImpact;

    return {
      conversionImpact: Math.round(conversionImpact * 100 * 100) / 100, // %
      bounceRateIncrease: Math.round(bounceRateIncrease * 100 * 100) / 100, // %
      seoScore: Math.round(seoScore * 100) / 100,
      monthlyRevenueImpact: Math.round(revenueImpact),
      performanceGrade: this.getPerformanceGrade(loadComplete, lcp),
      recommendations: this.generateRecommendations(performance, webVitals)
    };
  }

  calculateSEOScore(webVitals) {
    const { lcp, fid, cls } = webVitals;
    
    // Core Web Vitals thresholds (Good/Needs Improvement/Poor)
    const lcpScore = lcp <= 2500 ? 1 : lcp <= 4000 ? 0.5 : 0;
    const fidScore = fid <= 100 ? 1 : fid <= 300 ? 0.5 : 0;
    const clsScore = cls <= 0.1 ? 1 : cls <= 0.25 ? 0.5 : 0;
    
    return (lcpScore + fidScore + clsScore) / 3;
  }

  getPerformanceGrade(loadTime, lcp) {
    if (loadTime <= 1000 && lcp <= 1500) return 'A+';
    if (loadTime <= 2000 && lcp <= 2500) return 'A';
    if (loadTime <= 3000 && lcp <= 4000) return 'B';
    if (loadTime <= 5000) return 'C';
    return 'D';
  }

  generateRecommendations(performance, webVitals) {
    const recommendations = [];
    
    if (performance.loadComplete > 3000) {
      recommendations.push({
        type: 'CRITICAL',
        issue: 'Slow Page Load',
        impact: 'High bounce rate, poor UX',
        solution: 'Optimize images, minify CSS/JS, enable compression'
      });
    }

    if (webVitals.lcp > 2500) {
      recommendations.push({
        type: 'HIGH',
        issue: 'Poor LCP',
        impact: 'SEO ranking, user experience',
        solution: 'Optimize largest content element, improve server response'
      });
    }

    if (webVitals.cls > 0.1) {
      recommendations.push({
        type: 'MEDIUM',
        issue: 'Layout Instability',
        impact: 'User experience, accessibility',
        solution: 'Set dimensions for images, avoid dynamic content insertion'
      });
    }

    if (performance.ttfb > 600) {
      recommendations.push({
        type: 'HIGH',
        issue: 'Slow Server Response',
        impact: 'Initial load time, user waiting',
        solution: 'Optimize server performance, use CDN, enable caching'
      });
    }

    return recommendations;
  }

  async generateReport(results) {
    console.log('\n📈 ARCO PERFORMANCE REPORT');
    console.log('============================');
    
    for (const result of results) {
      if (!result) continue;
      
      console.log(`\n🌐 ${result.url}`);
      console.log(`⏱️  Load Time: ${result.loadTime}ms`);
      console.log(`📊 Performance Grade: ${result.business.performanceGrade}`);
      console.log(`💰 Revenue Impact: -$${result.business.monthlyRevenueImpact}/month`);
      console.log(`📈 Conversion Impact: -${result.business.conversionImpact}%`);
      console.log(`🔍 SEO Score: ${result.business.seoScore}/1.0`);
      
      if (result.business.recommendations.length > 0) {
        console.log('\n🎯 Priority Actions:');
        result.business.recommendations.forEach((rec, i) => {
          console.log(`  ${i + 1}. [${rec.type}] ${rec.issue}: ${rec.solution}`);
        });
      }
    }

    // Salvar relatório detalhado
    const reportPath = `./performance-monitor-${Date.now()}.json`;
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    console.log(`\n💾 Relatório salvo: ${reportPath}`);
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
      console.log('🧹 Cleanup concluído');
    }
  }
}

// Execução principal
async function main() {
  const monitor = new PerformanceMonitor();
  
  try {
    await monitor.initialize();
    
    const urls = [
      'http://localhost:3000',
      // Adicionar outras URLs quando disponíveis
    ];

    const results = [];
    
    for (const url of urls) {
      const result = await monitor.measurePerformance(url);
      if (result) results.push(result);
    }

    await monitor.generateReport(results);
    
  } catch (error) {
    console.error('❌ Erro durante monitoramento:', error);
  } finally {
    await monitor.cleanup();
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main().catch(console.error);
}

module.exports = PerformanceMonitor;
