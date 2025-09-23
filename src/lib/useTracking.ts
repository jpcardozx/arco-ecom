/**
 * Simple tracking hook for analytics
 */

export const useTracking = () => {
    const trackEvent = (event: string, data?: any) => {
        // Simple console tracking for now
        console.log('Track Event:', event, data);
        
        // In a real implementation, this would send to analytics service
        // e.g., Google Analytics, Mixpanel, etc.
    };
    
    return { trackEvent };
};