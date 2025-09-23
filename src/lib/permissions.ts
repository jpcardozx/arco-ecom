/**
 * ARCO Advanced Permission System
 * Sistema de permissões granulares para máxima segurança
 */

// ===========================================
// DEFINIÇÃO DE PERMISSÕES
// ===========================================
export const PERMISSIONS = {
  // Produtos
  'products:read': 'Visualizar produtos',
  'products:create': 'Criar produtos',
  'products:update': 'Editar produtos',
  'products:delete': 'Deletar produtos',
  'products:feature': 'Destacar produtos',
  
  // Usuários
  'users:read': 'Visualizar usuários',
  'users:create': 'Criar usuários',
  'users:update': 'Editar usuários',
  'users:delete': 'Deletar usuários',
  'users:impersonate': 'Fazer login como outro usuário',
  
  // Links de Afiliado
  'affiliates:read': 'Visualizar links de afiliado',
  'affiliates:create': 'Criar links de afiliado',
  'affiliates:update': 'Editar links de afiliado',
  'affiliates:delete': 'Deletar links de afiliado',
  'affiliates:analytics': 'Ver analytics de afiliado',
  
  // Pedidos
  'orders:read': 'Visualizar pedidos',
  'orders:update': 'Atualizar status de pedidos',
  'orders:refund': 'Processar reembolsos',
  
  // Comissões
  'commissions:read': 'Visualizar comissões',
  'commissions:approve': 'Aprovar comissões',
  'commissions:pay': 'Pagar comissões',
  
  // Analytics
  'analytics:read': 'Visualizar analytics',
  'analytics:export': 'Exportar dados',
  
  // Sistema
  'system:settings': 'Configurar sistema',
  'system:logs': 'Ver logs do sistema',
  'system:backup': 'Fazer backup',
  
  // Admin
  'admin:dashboard': 'Acessar dashboard admin',
  'admin:reports': 'Gerar relatórios',
  'admin:moderate': 'Moderar conteúdo'
} as const;

// ===========================================
// ROLES E SUAS PERMISSÕES
// ===========================================
export const ROLE_PERMISSIONS = {
  customer: [
    'products:read',
    'affiliates:read',
    'orders:read'
  ],
  
  affiliate: [
    'products:read',
    'affiliates:read',
    'affiliates:create',
    'affiliates:update',
    'affiliates:analytics',
    'orders:read',
    'commissions:read'
  ],
  
  moderator: [
    'products:read',
    'products:update',
    'products:feature',
    'users:read',
    'affiliates:read',
    'affiliates:update',
    'orders:read',
    'orders:update',
    'admin:moderate'
  ],
  
  admin: [
    'products:read',
    'products:create',
    'products:update',
    'products:delete',
    'products:feature',
    'users:read',
    'users:create',
    'users:update',
    'affiliates:read',
    'affiliates:create',
    'affiliates:update',
    'affiliates:delete',
    'affiliates:analytics',
    'orders:read',
    'orders:update',
    'orders:refund',
    'commissions:read',
    'commissions:approve',
    'commissions:pay',
    'analytics:read',
    'analytics:export',
    'admin:dashboard',
    'admin:reports',
    'admin:moderate'
  ],
  
  super_admin: Object.keys(PERMISSIONS), // Todas as permissões
  
  developer: [
    ...Object.keys(PERMISSIONS), // Todas as permissões
    'system:settings',
    'system:logs',
    'system:backup'
  ]
} as const;

// ===========================================
// FUNÇÕES UTILITÁRIAS
// ===========================================
export function hasPermission(
  userRole: string, 
  userPermissions: string[], 
  requiredPermission: string
): boolean {
  // Verifica permissões personalizadas do usuário
  if (userPermissions.includes(requiredPermission)) {
    return true;
  }
  
  // Verifica permissões do role
  const rolePermissions = ROLE_PERMISSIONS[userRole as keyof typeof ROLE_PERMISSIONS] || [];
  return rolePermissions.includes(requiredPermission as any);
}

export function getRolePermissions(role: string): string[] {
  return [...(ROLE_PERMISSIONS[role as keyof typeof ROLE_PERMISSIONS] || [])];
}

export function canAccessAdminPanel(userRole: string, userPermissions: string[]): boolean {
  return hasPermission(userRole, userPermissions, 'admin:dashboard');
}

// ===========================================
// MIDDLEWARE DE AUTORIZAÇÃO
// ===========================================
export function requirePermission(permission: string) {
  return (user: any) => {
    if (!user) return false;
    return hasPermission(user.role, user.permissions || [], permission);
  };
}

// ===========================================
// INTERFACE ESTENDIDA DE USUÁRIO
// ===========================================
export interface ExtendedUser {
  _id?: string;
  id: string;
  email: string;
  password: string;
  name: string;
  avatar?: string;
  
  // Sistema de Roles Avançado
  role: 'customer' | 'affiliate' | 'moderator' | 'admin' | 'super_admin' | 'developer';
  permissions: string[]; // Permissões customizadas além do role
  
  // Profile Data
  company?: string;
  phone?: string;
  bio?: string;
  
  // Configurações
  timezone: string;
  locale: string;
  theme: 'light' | 'dark' | 'auto';
  email_notifications: boolean;
  push_notifications: boolean;
  
  // Security
  email_verified: boolean;
  phone_verified: boolean;
  two_factor_enabled: boolean;
  two_factor_secret?: string;
  backup_codes?: string[];
  
  // Activity
  last_login_at?: Date;
  login_count: number;
  failed_login_attempts: number;
  locked_until?: Date;
  
  // Affiliate Data (se for afiliado)
  affiliate_data?: {
    commission_rate: number; // %
    total_earnings: number;
    total_referrals: number;
    payout_method: 'pix' | 'bank_transfer' | 'paypal';
    tax_id?: string; // CPF/CNPJ
  };
  
  // Status
  active: boolean;
  deleted_at?: Date;
  
  // Timestamps
  created_at: Date;
  updated_at: Date;
}