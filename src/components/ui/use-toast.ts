// Simple toast hook for demo purposes
import { useState } from 'react';

interface Toast {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
  duration?: number;
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (options: Toast) => {
    console.log('Toast:', options);
    setToasts(prev => [...prev, options]);

    // Auto remove after duration
    setTimeout(() => {
      setToasts(prev => prev.slice(1));
    }, options.duration || 3000);
  };

  return { toast, toasts };
}