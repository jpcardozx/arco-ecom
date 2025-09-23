/**
 * Web Vitals Optimizer para conversão B2B
 * Foca em métricas reais que impactam conversão
 */

'use client';

import { useEffect, useCallback } from 'react';
import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';

interface ConversionMetrics {
  vitals: {
    lcp: number;
    inp: number;
    cls: number;
    fcp: number;
    ttfb: number;
  };
  conversions: {
    pageViews: number;
    scrollDepth: number;
    ctaClicks: number;
    formStarts: number;
    formCompletions: number;
  };
}

class WebVitalsOptimizer {
  private metrics: ConversionMetrics = {
    vitals: { lcp: 0, inp: 0, cls: 0, fcp: 0, ttfb: 0 },
    conversions: { pageViews: 0, scrollDepth: 0, ctaClicks: 0, formStarts: 0, formCompletions: 0 }
  };

  constructor() {
    this.initializeTracking();
  }

  private initializeTracking() {
    // Core Web Vitals - v3 API
    onCLS(this.handleCLS);
    onFCP(this.handleFCP);
    onINP(this.handleINP); // INP substitui FID
    onLCP(this.handleLCP);
    onTTFB(this.handleTTFB);

    // Conversion tracking
    this.trackPageView();
    this.trackScrollDepth();
    this.trackCTAClicks();
    this.trackFormInteractions();
  }

  private handleLCP = (metric: any) => {
    this.metrics.vitals.lcp = metric.value;
    this.sendToAnalytics('lcp', metric.value);
    
    // Se LCP > 2.5s, otimizar automaticamente
    if (metric.value > 2500) {
      this.optimizeLCP();
    }
  };

  private handleINP = (metric: any) => {
    this.metrics.vitals.inp = metric.value;
    this.sendToAnalytics('inp', metric.value);
  };

  private handleCLS = (metric: any) => {
    this.metrics.vitals.cls = metric.value;
    this.sendToAnalytics('cls', metric.value);
    
    // Se CLS > 0.1, corrigir layout shifts
    if (metric.value > 0.1) {
      this.fixLayoutShifts();
    }
  };

  private handleFCP = (metric: any) => {
    this.metrics.vitals.fcp = metric.value;
    this.sendToAnalytics('fcp', metric.value);
  };

  private handleTTFB = (metric: any) => {
    this.metrics.vitals.ttfb = metric.value;
    this.sendToAnalytics('ttfb', metric.value);
  };

  private optimizeLCP() {
    // Preload critical resources
    this.preloadCriticalImages();
    
    // Defer non-critical JavaScript
    this.deferNonCriticalJS();
    
    // Optimize hero section rendering
    this.optimizeHeroRendering();
  }

  private fixLayoutShifts() {
    // Set explicit dimensions for images
    this.setImageDimensions();
    
    // Reserve space for dynamic content
    this.reserveSpaceForDynamicContent();
  }

  private preloadCriticalImages() {
    const criticalImages = [
      '/hero-case-mosaic-1.png',
      '/hero-case-mosaic-2.png', 
      '/hero-case-mosaic-3.png',
      '/profile.webp'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }

  private deferNonCriticalJS() {
    // Defer analytics scripts
    const scripts = document.querySelectorAll('script[src*="analytics"], script[src*="gtag"]');
    scripts.forEach(script => {
      script.setAttribute('defer', '');
    });
  }

  private optimizeHeroRendering() {
    // Priorizar rendering do hero
    const hero = document.querySelector('[data-hero]');
    if (hero) {
      (hero as HTMLElement).style.contentVisibility = 'auto';
      (hero as HTMLElement).style.containIntrinsicSize = '100vw 100vh';
    }
  }

  private setImageDimensions() {
    const images = document.querySelectorAll('img:not([width]):not([height])');
    images.forEach(img => {
      const element = img as HTMLImageElement;
      element.style.width = element.style.width || 'auto';
      element.style.height = element.style.height || 'auto';
      element.style.aspectRatio = '16/9'; // Default aspect ratio
    });
  }

  private reserveSpaceForDynamicContent() {
    const dynamicSections = document.querySelectorAll('[data-dynamic]');
    dynamicSections.forEach(section => {
      const element = section as HTMLElement;
      if (!element.style.minHeight) {
        element.style.minHeight = '200px'; // Reserve minimum space
      }
    });
  }

  private trackPageView() {
    this.metrics.conversions.pageViews++;
    this.sendConversionEvent('page_view', { timestamp: Date.now() });
  }

  private trackScrollDepth() {
    let maxScroll = 0;
    
    const handleScroll = () => {
      const scrolled = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
      
      if (scrolled > maxScroll) {
        maxScroll = scrolled;
        this.metrics.conversions.scrollDepth = scrolled;
        
        // Track milestone scrolls
        if ([25, 50, 75, 90].includes(scrolled)) {
          this.sendConversionEvent('scroll_depth', { depth: scrolled });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  private trackCTAClicks() {
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const cta = target.closest('[data-cta], .cta-button, button[type="submit"]');
      
      if (cta) {
        this.metrics.conversions.ctaClicks++;
        this.sendConversionEvent('cta_click', {
          element: cta.textContent?.trim(),
          section: cta.closest('section')?.id || 'unknown'
        });
      }
    });
  }

  private trackFormInteractions() {
    // Track form starts
    document.addEventListener('focusin', (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        const form = target.closest('form');
        if (form && !form.hasAttribute('data-tracked')) {
          form.setAttribute('data-tracked', 'true');
          this.metrics.conversions.formStarts++;
          this.sendConversionEvent('form_start', {
            formId: form.id || 'unknown'
          });
        }
      }
    });

    // Track form completions
    document.addEventListener('submit', (e) => {
      const form = e.target as HTMLFormElement;
      this.metrics.conversions.formCompletions++;
      this.sendConversionEvent('form_completion', {
        formId: form.id || 'unknown'
      });
    });
  }

  private sendToAnalytics(metric: string, value: number) {
    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'web_vitals', {
        metric_name: metric,
        metric_value: value,
        custom_map: { metric_name: 'custom_metric' }
      });
    }

    // Console log para desenvolvimento
    console.log(`Web Vital - ${metric.toUpperCase()}:`, value);
  }

  private sendConversionEvent(event: string, data: any) {
    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event, data);
    }

    // Console log para desenvolvimento
    console.log(`Conversion Event - ${event}:`, data);
  }

  getMetrics(): ConversionMetrics {
    return this.metrics;
  }
}

// Hook para usar no React
export function useWebVitalsOptimizer() {
  useEffect(() => {
    const optimizer = new WebVitalsOptimizer();
    
    return () => {
      // Cleanup if needed
    };
  }, []);
}

export default WebVitalsOptimizer;
