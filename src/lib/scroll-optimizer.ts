// src/lib/scroll-optimizer.ts - Advanced scroll optimization and reveal animations

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
}

class ScrollOptimizer {
  private observers: Map<string, IntersectionObserver> = new Map();
  private animatedElements: Set<Element> = new Set();

  constructor() {
    this.init();
  }

  private init() {
    // Preload critical CSS variables for better performance
    document.documentElement.style.setProperty('--scroll-behavior', 'smooth');
    
    // Setup performance monitoring
    this.setupPerformanceMonitoring();
    
    // Initialize scroll animations
    this.initializeScrollAnimations();
  }

  private setupPerformanceMonitoring() {
    // Monitor scroll performance
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.optimizeScrollPerformance();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  private optimizeScrollPerformance() {
    // Throttle expensive operations during scroll
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    
    // Update CSS custom properties for scroll-dependent animations
    document.documentElement.style.setProperty(
      '--scroll-progress', 
      String(scrollY / (document.documentElement.scrollHeight - viewportHeight))
    );
  }

  initializeScrollAnimations() {
    const defaultOptions: Required<ScrollRevealOptions> = {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px',
      once: true,
      delay: 0,
      duration: 800,
      direction: 'up'
    };

    // Create intersection observer for scroll reveals
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target as HTMLElement);
        }
      });
    }, {
      threshold: defaultOptions.threshold,
      rootMargin: defaultOptions.rootMargin
    });

    // Observe all scroll-reveal elements
    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((element) => {
      observer.observe(element);
    });

    this.observers.set('scroll-reveal', observer);
  }

  private animateElement(element: HTMLElement) {
    if (this.animatedElements.has(element)) return;

    const delay = parseInt(element.dataset.delay || '0');
    const direction = element.dataset.direction || 'up';
    
    // Add performance optimization classes
    element.classList.add('performance-optimized');
    
    setTimeout(() => {
      element.classList.add('in-view');
      this.animatedElements.add(element);
      
      // Remove performance optimization after animation
      setTimeout(() => {
        element.classList.remove('performance-optimized');
      }, 1000);
    }, delay);
  }

  // Enhanced smooth scrolling with easing
  smoothScrollTo(target: string | Element, options: ScrollIntoViewOptions = {}) {
    const element = typeof target === 'string' 
      ? document.querySelector(target) 
      : target;
    
    if (!element) return;

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
      ...options
    });
  }

  // Optimize images for scroll performance
  optimizeImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src!;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    }, { rootMargin: '50px' });

    images.forEach((img) => imageObserver.observe(img));
  }

  // Parallax scrolling optimization
  initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    const handleParallax = () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach((element) => {
        const rate = parseFloat((element as HTMLElement).dataset.parallax || '0.5');
        const yPos = -(scrolled * rate);
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleParallax();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // Clean up observers
  destroy() {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers.clear();
    this.animatedElements.clear();
  }
}

// Export singleton instance
export const scrollOptimizer = new ScrollOptimizer();

// Auto-initialize on DOM content loaded
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      scrollOptimizer.initializeScrollAnimations();
      scrollOptimizer.optimizeImages();
    });
  } else {
    scrollOptimizer.initializeScrollAnimations();
    scrollOptimizer.optimizeImages();
  }
}
