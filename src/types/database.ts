/**
 * ARCO Database Types
 * Generated TypeScript types for Supabase schema
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          email_verified: boolean
          full_name: string | null
          avatar_url: string | null
          phone: string | null
          auth_provider: string
          provider_id: string | null
          created_at: string
          updated_at: string
          last_login_at: string | null
          is_active: boolean
          role: 'customer' | 'affiliate' | 'admin'
          metadata: Json
        }
        Insert: {
          id?: string
          email: string
          email_verified?: boolean
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          auth_provider?: string
          provider_id?: string | null
          created_at?: string
          updated_at?: string
          last_login_at?: string | null
          is_active?: boolean
          role?: 'customer' | 'affiliate' | 'admin'
          metadata?: Json
        }
        Update: {
          id?: string
          email?: string
          email_verified?: boolean
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          auth_provider?: string
          provider_id?: string | null
          created_at?: string
          updated_at?: string
          last_login_at?: string | null
          is_active?: boolean
          role?: 'customer' | 'affiliate' | 'admin'
          metadata?: Json
        }
      }
      products: {
        Row: {
          id: string
          title: string
          description: string | null
          price: number
          original_price: number | null
          discount_percentage: number
          category: string
          sku: string | null
          brand: string | null
          platform: 'amazon' | 'mercado_livre' | 'shopee' | 'aliexpress'
          affiliate_link: string
          commission_rate: number
          images: Json
          thumbnail_url: string | null
          stock_quantity: number
          is_active: boolean
          is_featured: boolean
          features: Json
          specifications: Json
          tags: Json
          slug: string | null
          meta_title: string | null
          meta_description: string | null
          created_at: string
          updated_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          price: number
          original_price?: number | null
          discount_percentage?: number
          category: string
          sku?: string | null
          brand?: string | null
          platform: 'amazon' | 'mercado_livre' | 'shopee' | 'aliexpress'
          affiliate_link: string
          commission_rate?: number
          images?: Json
          thumbnail_url?: string | null
          stock_quantity?: number
          is_active?: boolean
          is_featured?: boolean
          features?: Json
          specifications?: Json
          tags?: Json
          slug?: string | null
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          price?: number
          original_price?: number | null
          discount_percentage?: number
          category?: string
          sku?: string | null
          brand?: string | null
          platform?: 'amazon' | 'mercado_livre' | 'shopee' | 'aliexpress'
          affiliate_link?: string
          commission_rate?: number
          images?: Json
          thumbnail_url?: string | null
          stock_quantity?: number
          is_active?: boolean
          is_featured?: boolean
          features?: Json
          specifications?: Json
          tags?: Json
          slug?: string | null
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
          total_amount: number
          commission_earned: number
          shipping_address: Json | null
          tracking_code: string | null
          payment_method: string | null
          payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
          external_order_id: string | null
          platform: string | null
          notes: string | null
          metadata: Json
          created_at: string
          updated_at: string
          confirmed_at: string | null
          shipped_at: string | null
          delivered_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          status?: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
          total_amount: number
          commission_earned?: number
          shipping_address?: Json | null
          tracking_code?: string | null
          payment_method?: string | null
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded'
          external_order_id?: string | null
          platform?: string | null
          notes?: string | null
          metadata?: Json
          created_at?: string
          updated_at?: string
          confirmed_at?: string | null
          shipped_at?: string | null
          delivered_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          status?: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
          total_amount?: number
          commission_earned?: number
          shipping_address?: Json | null
          tracking_code?: string | null
          payment_method?: string | null
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded'
          external_order_id?: string | null
          platform?: string | null
          notes?: string | null
          metadata?: Json
          created_at?: string
          updated_at?: string
          confirmed_at?: string | null
          shipped_at?: string | null
          delivered_at?: string | null
        }
      }
      user_sessions: {
        Row: {
          id: string
          user_id: string
          session_token: string
          ip_address: string | null
          user_agent: string | null
          device_info: Json
          country: string | null
          city: string | null
          is_suspicious: boolean
          login_method: string | null
          created_at: string
          expires_at: string
          last_activity_at: string
          metadata: Json
        }
        Insert: {
          id?: string
          user_id: string
          session_token: string
          ip_address?: string | null
          user_agent?: string | null
          device_info?: Json
          country?: string | null
          city?: string | null
          is_suspicious?: boolean
          login_method?: string | null
          created_at?: string
          expires_at: string
          last_activity_at?: string
          metadata?: Json
        }
        Update: {
          id?: string
          user_id?: string
          session_token?: string
          ip_address?: string | null
          user_agent?: string | null
          device_info?: Json
          country?: string | null
          city?: string | null
          is_suspicious?: boolean
          login_method?: string | null
          created_at?: string
          expires_at?: string
          last_activity_at?: string
          metadata?: Json
        }
      }
      audit_logs: {
        Row: {
          id: string
          user_id: string | null
          action: string
          resource_type: string | null
          resource_id: string | null
          ip_address: string | null
          user_agent: string | null
          old_values: Json | null
          new_values: Json | null
          details: Json
          severity: 'info' | 'warning' | 'error' | 'critical'
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          action: string
          resource_type?: string | null
          resource_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
          old_values?: Json | null
          new_values?: Json | null
          details?: Json
          severity?: 'info' | 'warning' | 'error' | 'critical'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          action?: string
          resource_type?: string | null
          resource_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
          old_values?: Json | null
          new_values?: Json | null
          details?: Json
          severity?: 'info' | 'warning' | 'error' | 'critical'
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Helper types for application use
export type User = Database['public']['Tables']['users']['Row']
export type Product = Database['public']['Tables']['products']['Row']
export type Order = Database['public']['Tables']['orders']['Row']
export type UserSession = Database['public']['Tables']['user_sessions']['Row']
export type AuditLog = Database['public']['Tables']['audit_logs']['Row']

export type InsertUser = Database['public']['Tables']['users']['Insert']
export type InsertProduct = Database['public']['Tables']['products']['Insert']
export type InsertOrder = Database['public']['Tables']['orders']['Insert']
export type InsertUserSession = Database['public']['Tables']['user_sessions']['Insert']
export type InsertAuditLog = Database['public']['Tables']['audit_logs']['Insert']

export type UpdateUser = Database['public']['Tables']['users']['Update']
export type UpdateProduct = Database['public']['Tables']['products']['Update']
export type UpdateOrder = Database['public']['Tables']['orders']['Update']
export type UpdateUserSession = Database['public']['Tables']['user_sessions']['Update']
export type UpdateAuditLog = Database['public']['Tables']['audit_logs']['Update']