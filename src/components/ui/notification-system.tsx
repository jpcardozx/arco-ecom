'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface NotificationProps {
  id: string
  title: string
  description?: string
  type?: 'info' | 'success' | 'warning' | 'error'
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
  onDismiss?: (id: string) => void
}

const icons = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
}

const variants = {
  info: 'bg-blue-50 border-blue-200 text-blue-800',
  success: 'bg-green-50 border-green-200 text-green-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  error: 'bg-red-50 border-red-200 text-red-800',
}

export function Notification({
  id,
  title,
  description,
  type = 'info',
  duration = 5000,
  action,
  onDismiss,
}: NotificationProps) {
  const Icon = icons[type]

  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onDismiss?.(id)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, id, onDismiss])

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={cn(
        'relative flex items-start gap-3 rounded-lg border p-4 shadow-lg backdrop-blur-sm',
        variants[type]
      )}
    >
      <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1 space-y-1">
        <h4 className="font-semibold text-sm">{title}</h4>
        {description && (
          <p className="text-sm opacity-90">{description}</p>
        )}
        {action && (
          <button
            onClick={action.onClick}
            className="text-sm font-medium underline hover:no-underline"
          >
            {action.label}
          </button>
        )}
      </div>
      {onDismiss && (
        <button
          onClick={() => onDismiss(id)}
          className="flex-shrink-0 rounded-full p-1 hover:bg-black/10 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </motion.div>
  )
}

export interface NotificationSystemProps {
  notifications: NotificationProps[]
  onDismiss: (id: string) => void
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  maxNotifications?: number
}

const positionClasses = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4', 
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
}

export function NotificationSystem({
  notifications,
  onDismiss,
  position = 'top-right',
  maxNotifications = 5,
}: NotificationSystemProps) {
  const displayedNotifications = notifications.slice(0, maxNotifications)

  return (
    <div className={cn(
      'fixed z-50 flex flex-col gap-2 w-96 max-w-[calc(100vw-2rem)]',
      positionClasses[position]
    )}>
      <AnimatePresence mode="popLayout">
        {displayedNotifications.map((notification) => (
          <Notification
            key={notification.id}
            {...notification}
            onDismiss={onDismiss}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

// Hook para gerenciar notificações
export function useNotifications() {
  const [notifications, setNotifications] = React.useState<NotificationProps[]>([])

  const addNotification = React.useCallback((notification: Omit<NotificationProps, 'id'>) => {
    const id = Date.now().toString()
    setNotifications(prev => [...prev, { ...notification, id }])
    return id
  }, [])

  const dismissNotification = React.useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  const clearAll = React.useCallback(() => {
    setNotifications([])
  }, [])

  return {
    notifications,
    addNotification,
    dismissNotification,
    clearAll,
  }
}

// Funções de conveniência
export const createNotification = {
  success: (title: string, description?: string, options?: Partial<NotificationProps>) => ({
    title,
    description,
    type: 'success' as const,
    ...options,
  }),
  error: (title: string, description?: string, options?: Partial<NotificationProps>) => ({
    title,
    description,
    type: 'error' as const,
    ...options,
  }),
  warning: (title: string, description?: string, options?: Partial<NotificationProps>) => ({
    title,
    description,
    type: 'warning' as const,
    ...options,
  }),
  info: (title: string, description?: string, options?: Partial<NotificationProps>) => ({
    title,
    description,
    type: 'info' as const,
    ...options,
  }),
}