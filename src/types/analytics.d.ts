// types/analytics.d.ts
type AnalyticsEvent = {
  category: string;
  action: string;
  label?: string;
  value?: number;
  metadata?: Record<string, any>;
};

type FunnelStep = {
  step: string;
  action: string;
  metadata?: Record<string, any>;
};

interface TrackingEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

declare module '@/lib/analytics' {
  export function trackEvent(params: TrackingEvent): void;
  export function trackPageView(path: string, metadata?: Record<string, any>): void;
  export function trackFunnelStep(
    step: string,
    action: string,
    metadata?: Record<string, any>
  ): void;
  export function getConnectionSpeed(): 'slow' | 'medium' | 'fast';
}
