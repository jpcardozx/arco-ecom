-- ARCO Products Management Schema
-- Tabela para gerenciar produtos e links de anúncios

-- Enable RLS
ALTER DATABASE postgres SET row_level_security = on;

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2),
    original_price DECIMAL(10,2),
    discount_percentage INTEGER DEFAULT 0,
    
    -- Link and source info
    affiliate_link TEXT NOT NULL,
    source_platform VARCHAR(50) NOT NULL, -- 'mercadolivre', 'amazon', 'shopee', etc
    external_id VARCHAR(255), -- ID do produto na plataforma
    
    -- Images
    main_image TEXT,
    additional_images JSONB DEFAULT '[]',
    
    -- Product details
    category VARCHAR(100),
    brand VARCHAR(100),
    rating DECIMAL(3,2) DEFAULT 0,
    reviews_count INTEGER DEFAULT 0,
    
    -- Availability
    in_stock BOOLEAN DEFAULT true,
    stock_quantity INTEGER DEFAULT 0,
    
    -- SEO and display
    slug VARCHAR(255) UNIQUE,
    tags JSONB DEFAULT '[]',
    featured BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT true,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Indexes
    CONSTRAINT products_slug_unique UNIQUE(slug),
    CONSTRAINT products_price_positive CHECK (price >= 0),
    CONSTRAINT products_discount_valid CHECK (discount_percentage >= 0 AND discount_percentage <= 100)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(active);
CREATE INDEX IF NOT EXISTS idx_products_source_platform ON products(source_platform);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);

-- RLS Policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active products
CREATE POLICY "Public read access to active products" ON products
    FOR SELECT USING (active = true);

-- Only authenticated users can manage products
CREATE POLICY "Authenticated users can manage products" ON products
    FOR ALL USING (auth.role() = 'authenticated');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at
CREATE TRIGGER update_products_updated_at 
    BEFORE UPDATE ON products 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Function to generate slug from title
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN lower(
        regexp_replace(
            regexp_replace(
                unaccent(title), 
                '[^a-zA-Z0-9\s-]', '', 'g'
            ),
            '\s+', '-', 'g'
        )
    );
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate slug if not provided
CREATE OR REPLACE FUNCTION set_product_slug()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        NEW.slug = generate_slug(NEW.title);
        
        -- Handle duplicates by appending a number
        DECLARE
            base_slug TEXT := NEW.slug;
            counter INTEGER := 1;
        BEGIN
            WHILE EXISTS (SELECT 1 FROM products WHERE slug = NEW.slug AND id != NEW.id) LOOP
                NEW.slug = base_slug || '-' || counter;
                counter = counter + 1;
            END LOOP;
        END;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_product_slug_trigger
    BEFORE INSERT OR UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION set_product_slug();

-- Insert some sample data for testing
INSERT INTO products (
    title, 
    description, 
    price, 
    original_price, 
    discount_percentage,
    affiliate_link,
    source_platform,
    category,
    brand,
    rating,
    reviews_count,
    main_image,
    featured,
    tags
) VALUES 
(
    'Smartphone Samsung Galaxy A54 5G 128GB',
    'Smartphone com tela de 6.4" Super AMOLED, câmera tripla de 50MP + 12MP + 5MP, bateria de 5000mAh e processador Exynos 1380.',
    1899.99,
    2299.99,
    17,
    'https://mercadolivre.com/sec/example1',
    'mercadolivre',
    'Smartphones',
    'Samsung',
    4.5,
    2847,
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    true,
    '["smartphone", "5g", "samsung", "galaxy"]'
),
(
    'Notebook Lenovo IdeaPad 3i Intel Core i5',
    'Notebook com processador Intel Core i5-1135G7, 8GB RAM, SSD 256GB, tela 15.6" Full HD e Windows 11.',
    2499.99,
    2999.99,
    17,
    'https://mercadolivre.com/sec/example2',
    'mercadolivre',
    'Notebooks',
    'Lenovo',
    4.3,
    1524,
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
    true,
    '["notebook", "lenovo", "intel", "core-i5"]'
),
(
    'Fone de Ouvido Sony WH-1000XM4',
    'Fone de ouvido wireless com cancelamento de ruído, autonomia de 30h, tecnologia LDAC e controles touch.',
    1299.99,
    1599.99,
    19,
    'https://amazon.com.br/example3',
    'amazon',
    'Audio',
    'Sony',
    4.7,
    8932,
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    false,
    '["fone", "wireless", "sony", "cancelamento-ruido"]'
);