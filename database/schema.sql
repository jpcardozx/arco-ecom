/**
 * ARCO Database Schema
 * Secure PostgreSQL schema with RLS and OAuth2 integration
 * 5 essential tables for initial e-commerce control
 */

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ========================================
-- 1. USERS TABLE - Core user management
-- ========================================
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,
  full_name VARCHAR(255),
  avatar_url TEXT,
  phone VARCHAR(20),
  
  -- OAuth providers
  auth_provider VARCHAR(50) DEFAULT 'email', -- 'email', 'google', 'github', 'apple'
  provider_id VARCHAR(255),
  
  -- Security
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT TRUE,
  
  -- Role-based access
  role VARCHAR(20) DEFAULT 'customer', -- 'customer', 'affiliate', 'admin'
  
  -- Metadata
  metadata JSONB DEFAULT '{}',
  
  CONSTRAINT users_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT users_role_check CHECK (role IN ('customer', 'affiliate', 'admin'))
);

-- RLS Policy for users
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own data (except sensitive fields)
CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- ========================================
-- 2. PRODUCTS TABLE - E-commerce catalog
-- ========================================
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(500) NOT NULL,
  description TEXT,
  price DECIMAL(12,2) NOT NULL,
  original_price DECIMAL(12,2),
  discount_percentage INTEGER DEFAULT 0,
  
  -- Product details
  category VARCHAR(100) NOT NULL,
  sku VARCHAR(100) UNIQUE,
  brand VARCHAR(100),
  
  -- Affiliate data
  platform VARCHAR(50) NOT NULL, -- 'amazon', 'mercado_livre', 'shopee'
  affiliate_link TEXT NOT NULL,
  commission_rate DECIMAL(5,2) DEFAULT 0,
  
  -- Media
  images JSONB DEFAULT '[]', -- Array of image URLs
  thumbnail_url TEXT,
  
  -- Inventory
  stock_quantity INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  
  -- Metadata
  features JSONB DEFAULT '[]',
  specifications JSONB DEFAULT '{}',
  tags JSONB DEFAULT '[]',
  
  -- SEO
  slug VARCHAR(255) UNIQUE,
  meta_title VARCHAR(255),
  meta_description TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Created by (admin/affiliate)
  created_by UUID REFERENCES public.users(id),
  
  CONSTRAINT products_price_check CHECK (price >= 0),
  CONSTRAINT products_commission_check CHECK (commission_rate >= 0 AND commission_rate <= 100),
  CONSTRAINT products_platform_check CHECK (platform IN ('amazon', 'mercado_livre', 'shopee', 'aliexpress'))
);

-- RLS Policy for products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Everyone can view active products
CREATE POLICY "Anyone can view active products" ON public.products
  FOR SELECT USING (is_active = TRUE);

-- Only admins and product creators can modify
CREATE POLICY "Admins can manage products" ON public.products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('admin', 'affiliate')
    )
  );

-- ========================================
-- 3. ORDERS TABLE - Purchase tracking
-- ========================================
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  
  -- Order details
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'
  total_amount DECIMAL(12,2) NOT NULL,
  commission_earned DECIMAL(12,2) DEFAULT 0,
  
  -- Shipping
  shipping_address JSONB,
  tracking_code VARCHAR(100),
  
  -- Payment
  payment_method VARCHAR(50),
  payment_status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'paid', 'failed', 'refunded'
  
  -- External reference (from affiliate platform)
  external_order_id VARCHAR(255),
  platform VARCHAR(50),
  
  -- Metadata
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  shipped_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  
  CONSTRAINT orders_status_check CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  CONSTRAINT orders_payment_status_check CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  CONSTRAINT orders_total_check CHECK (total_amount >= 0)
);

-- RLS Policy for orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Users can only see their own orders
CREATE POLICY "Users can view own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);

-- Users can create their own orders
CREATE POLICY "Users can create own orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admins can view all orders
CREATE POLICY "Admins can view all orders" ON public.orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- ========================================
-- 4. USER_SESSIONS - Security tracking
-- ========================================
CREATE TABLE public.user_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  
  -- Session data
  session_token VARCHAR(255) UNIQUE NOT NULL,
  ip_address INET,
  user_agent TEXT,
  device_info JSONB DEFAULT '{}',
  
  -- Location (optional)
  country VARCHAR(2),
  city VARCHAR(100),
  
  -- Security flags
  is_suspicious BOOLEAN DEFAULT FALSE,
  login_method VARCHAR(50), -- 'email', 'oauth_google', 'oauth_github'
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Metadata
  metadata JSONB DEFAULT '{}'
);

-- RLS Policy for user_sessions
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

-- Users can only see their own sessions
CREATE POLICY "Users can view own sessions" ON public.user_sessions
  FOR SELECT USING (auth.uid() = user_id);

-- Admins can view sessions for security monitoring
CREATE POLICY "Admins can view all sessions" ON public.user_sessions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- ========================================
-- 5. AUDIT_LOGS - Security & compliance
-- ========================================
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Who did what
  user_id UUID REFERENCES public.users(id),
  action VARCHAR(100) NOT NULL, -- 'login', 'logout', 'create_product', 'update_order', etc.
  resource_type VARCHAR(50), -- 'user', 'product', 'order', 'session'
  resource_id UUID,
  
  -- Context
  ip_address INET,
  user_agent TEXT,
  
  -- Change tracking
  old_values JSONB,
  new_values JSONB,
  
  -- Metadata
  details JSONB DEFAULT '{}',
  severity VARCHAR(20) DEFAULT 'info', -- 'info', 'warning', 'error', 'critical'
  
  -- Timestamp
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policy for audit_logs - Admin only
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can view audit logs" ON public.audit_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- ========================================
-- INDEXES for Performance
-- ========================================

-- Users indexes
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_provider ON public.users(auth_provider, provider_id);
CREATE INDEX idx_users_role ON public.users(role);

-- Products indexes
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_platform ON public.products(platform);
CREATE INDEX idx_products_active ON public.products(is_active);
CREATE INDEX idx_products_featured ON public.products(is_featured);
CREATE INDEX idx_products_slug ON public.products(slug);
CREATE INDEX idx_products_created_by ON public.products(created_by);

-- Orders indexes
CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_created_at ON public.orders(created_at);
CREATE INDEX idx_orders_platform ON public.orders(platform);

-- Sessions indexes
CREATE INDEX idx_sessions_user_id ON public.user_sessions(user_id);
CREATE INDEX idx_sessions_token ON public.user_sessions(session_token);
CREATE INDEX idx_sessions_expires ON public.user_sessions(expires_at);
CREATE INDEX idx_sessions_suspicious ON public.user_sessions(is_suspicious);

-- Audit logs indexes
CREATE INDEX idx_audit_user_id ON public.audit_logs(user_id);
CREATE INDEX idx_audit_action ON public.audit_logs(action);
CREATE INDEX idx_audit_resource ON public.audit_logs(resource_type, resource_id);
CREATE INDEX idx_audit_created_at ON public.audit_logs(created_at);
CREATE INDEX idx_audit_severity ON public.audit_logs(severity);

-- ========================================
-- TRIGGERS for auto-updating timestamps
-- ========================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- AUDIT TRIGGER - Log all changes
-- ========================================

CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.audit_logs (
        user_id,
        action,
        resource_type,
        resource_id,
        old_values,
        new_values,
        ip_address
    ) VALUES (
        auth.uid(),
        CASE 
            WHEN TG_OP = 'INSERT' THEN 'create'
            WHEN TG_OP = 'UPDATE' THEN 'update'
            WHEN TG_OP = 'DELETE' THEN 'delete'
        END,
        TG_TABLE_NAME,
        COALESCE(NEW.id, OLD.id),
        CASE WHEN TG_OP = 'DELETE' THEN to_jsonb(OLD) ELSE NULL END,
        CASE WHEN TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN to_jsonb(NEW) ELSE NULL END,
        inet_client_addr()
    );
    
    RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

-- Apply audit trigger to sensitive tables
CREATE TRIGGER audit_users_trigger AFTER INSERT OR UPDATE OR DELETE ON public.users FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
CREATE TRIGGER audit_products_trigger AFTER INSERT OR UPDATE OR DELETE ON public.products FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
CREATE TRIGGER audit_orders_trigger AFTER INSERT OR UPDATE OR DELETE ON public.orders FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();