// Portfolio analytics utilities

export interface PortfolioEventOptions {
  action: string;
  label?: string;
  value?: number;
}

export function trackPortfolioEvent(action: string, label?: string): void {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    const gtag = (window as any).gtag;
    if (typeof gtag === 'function') {
      gtag('event', action, {
        event_category: 'portfolio',
        event_label: label,
      });
    }
  }
}
