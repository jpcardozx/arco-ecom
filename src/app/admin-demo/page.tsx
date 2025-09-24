import { Metadata } from 'next'
import EnhancedAdminDemo from '@/components/examples/enhanced-admin-demo'

export const metadata: Metadata = {
  title: 'Admin Dashboard - Demonstração Avançada',
  description: 'Demonstração do sistema de componentes avançados com shadcn/ui e funcionalidades premium',
}

export default function AdminDemoPage() {
  return <EnhancedAdminDemo />
}