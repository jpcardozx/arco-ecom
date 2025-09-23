/**
 * ARCO Database Setup Script
 * Cria todas as collections e índices necessários
 */

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config({ path: '.env.local' });

import { MongoClient } from 'mongodb';

async function setupDatabase() {
  console.log('🚀 Configurando banco de dados ARCO...');
  
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DB || 'arco-development');
    
    // ===========================================
    // 1. PRODUCTS COLLECTION (já existe)
    // ===========================================
    const productsCollection = db.collection('products');
    
    await productsCollection.createIndex(
      { active: 1, featured: -1, created_at: -1 },
      { name: 'active_featured_created_idx', background: true }
    );
    
    await productsCollection.createIndex(
      { title: 'text', description: 'text' },
      { name: 'text_search_idx', background: true }
    );
    
    await productsCollection.createIndex(
      { slug: 1 },
      { name: 'slug_unique_idx', unique: true, background: true }
    );
    
    await productsCollection.createIndex(
      { category: 1, price: 1 },
      { name: 'category_price_idx', background: true }
    );
    
    console.log('✅ Products collection configurada');
    
    // ===========================================
    // 2. USERS COLLECTION (nova estrutura)
    // ===========================================
    const usersCollection = db.collection('users');
    
    await usersCollection.createIndex(
      { email: 1 },
      { name: 'email_unique_idx', unique: true, background: true }
    );
    
    await usersCollection.createIndex(
      { role: 1, active: 1 },
      { name: 'role_active_idx', background: true }
    );
    
    await usersCollection.createIndex(
      { 'affiliate_data.total_earnings': -1 },
      { name: 'affiliate_earnings_idx', background: true, sparse: true }
    );
    
    console.log('✅ Users collection configurada');
    
    // ===========================================
    // 3. AFFILIATE_LINKS COLLECTION
    // ===========================================
    const affiliateLinksCollection = db.collection('affiliate_links');
    
    await affiliateLinksCollection.createIndex(
      { user_id: 1, active: 1 },
      { name: 'user_active_idx', background: true }
    );
    
    await affiliateLinksCollection.createIndex(
      { short_code: 1 },
      { name: 'short_code_unique_idx', unique: true, background: true }
    );
    
    await affiliateLinksCollection.createIndex(
      { clicks: -1, conversions: -1 },
      { name: 'performance_idx', background: true }
    );
    
    console.log('✅ Affiliate Links collection configurada');
    
    // ===========================================
    // 4. ANALYTICS COLLECTION
    // ===========================================
    const analyticsCollection = db.collection('analytics');
    
    await analyticsCollection.createIndex(
      { created_at: -1 },
      { name: 'created_at_idx', background: true }
    );
    
    await analyticsCollection.createIndex(
      { user_id: 1, event_type: 1, created_at: -1 },
      { name: 'user_event_time_idx', background: true }
    );
    
    await analyticsCollection.createIndex(
      { affiliate_link_id: 1, created_at: -1 },
      { name: 'affiliate_time_idx', background: true, sparse: true }
    );
    
    // TTL index para cleanup automático (dados > 2 anos)
    await analyticsCollection.createIndex(
      { created_at: 1 },
      { name: 'ttl_idx', expireAfterSeconds: 63072000, background: true } // 2 anos
    );
    
    console.log('✅ Analytics collection configurada');
    
    // ===========================================
    // 5. ORDERS COLLECTION
    // ===========================================
    const ordersCollection = db.collection('orders');
    
    await ordersCollection.createIndex(
      { user_id: 1, status: 1, created_at: -1 },
      { name: 'user_status_time_idx', background: true }
    );
    
    await ordersCollection.createIndex(
      { affiliate_link_id: 1 },
      { name: 'affiliate_link_idx', background: true, sparse: true }
    );
    
    await ordersCollection.createIndex(
      { status: 1, created_at: -1 },
      { name: 'status_time_idx', background: true }
    );
    
    console.log('✅ Orders collection configurada');
    
    // ===========================================
    // 6. COMMISSIONS COLLECTION
    // ===========================================
    const commissionsCollection = db.collection('commissions');
    
    await commissionsCollection.createIndex(
      { user_id: 1, status: 1, created_at: -1 },
      { name: 'user_status_time_idx', background: true }
    );
    
    await commissionsCollection.createIndex(
      { status: 1, commission_amount: -1 },
      { name: 'status_amount_idx', background: true }
    );
    
    console.log('✅ Commissions collection configurada');
    
    // ===========================================
    // 7. CATEGORIES COLLECTION
    // ===========================================
    const categoriesCollection = db.collection('categories');
    
    await categoriesCollection.createIndex(
      { slug: 1 },
      { name: 'slug_unique_idx', unique: true, background: true }
    );
    
    await categoriesCollection.createIndex(
      { parent_id: 1, sort_order: 1 },
      { name: 'parent_sort_idx', background: true }
    );
    
    console.log('✅ Categories collection configurada');
    
    // ===========================================
    // 8. NOTIFICATIONS COLLECTION
    // ===========================================
    const notificationsCollection = db.collection('notifications');
    
    await notificationsCollection.createIndex(
      { user_id: 1, read: 1, created_at: -1 },
      { name: 'user_read_time_idx', background: true }
    );
    
    // TTL index para cleanup automático (notificações > 90 dias)
    await notificationsCollection.createIndex(
      { expires_at: 1 },
      { name: 'ttl_idx', expireAfterSeconds: 0, background: true }
    );
    
    console.log('✅ Notifications collection configurada');
    
    // ===========================================
    // 9. AUDIT_LOGS COLLECTION
    // ===========================================
    const auditLogsCollection = db.collection('audit_logs');
    
    await auditLogsCollection.createIndex(
      { user_id: 1, created_at: -1 },
      { name: 'user_time_idx', background: true }
    );
    
    await auditLogsCollection.createIndex(
      { resource: 1, resource_id: 1, created_at: -1 },
      { name: 'resource_time_idx', background: true }
    );
    
    // TTL index para cleanup automático (logs > 1 ano)
    await auditLogsCollection.createIndex(
      { created_at: 1 },
      { name: 'ttl_idx', expireAfterSeconds: 31536000, background: true } // 1 ano
    );
    
    console.log('✅ Audit Logs collection configurada');
    
    // ===========================================
    // CRIAR USUÁRIO ADMIN INICIAL
    // ===========================================
    const existingAdmin = await usersCollection.findOne({ role: 'super_admin' });
    
    if (!existingAdmin) {
      const adminUser = {
        id: 'admin-' + Date.now(),
        email: 'admin@arco.com',
        password: '$2b$12$LQv3c1yqBwEHxPar6MuGguc5tC96hRRiSIK6xdtqo5Vf2xC/oJC8q', // admin123
        name: 'Administrador ARCO',
        avatar: null,
        role: 'super_admin',
        permissions: [],
        company: 'ARCO Platform',
        phone: null,
        bio: 'Administrador principal do sistema ARCO',
        timezone: 'America/Sao_Paulo',
        locale: 'pt-BR',
        theme: 'dark',
        email_notifications: true,
        push_notifications: true,
        email_verified: true,
        phone_verified: false,
        two_factor_enabled: false,
        last_login_at: null,
        login_count: 0,
        failed_login_attempts: 0,
        active: true,
        created_at: new Date(),
        updated_at: new Date()
      };
      
      await usersCollection.insertOne(adminUser);
      console.log('👤 Usuário admin criado (admin@arco.com / admin123)');
    }
    
    // ===========================================
    // CRIAR CATEGORIAS INICIAIS
    // ===========================================
    const existingCategories = await categoriesCollection.countDocuments();
    
    if (existingCategories === 0) {
      const initialCategories = [
        {
          id: 'cat-' + Date.now() + '-1',
          name: 'Eletrônicos',
          slug: 'eletronicos',
          description: 'Produtos eletrônicos e gadgets',
          parent_id: null,
          icon: '📱',
          sort_order: 1,
          active: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 'cat-' + Date.now() + '-2',
          name: 'Casa e Decoração',
          slug: 'casa-decoracao',
          description: 'Produtos para casa e decoração',
          parent_id: null,
          icon: '🏠',
          sort_order: 2,
          active: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 'cat-' + Date.now() + '-3',
          name: 'Moda e Beleza',
          slug: 'moda-beleza',
          description: 'Roupas, acessórios e produtos de beleza',
          parent_id: null,
          icon: '👗',
          sort_order: 3,
          active: true,
          created_at: new Date(),
          updated_at: new Date()
        }
      ];
      
      await categoriesCollection.insertMany(initialCategories);
      console.log('📂 Categorias iniciais criadas');
    }
    
    console.log('\n🎉 Setup do banco de dados concluído com sucesso!');
    console.log('📊 Collections criadas: 9');
    console.log('🔧 Índices criados: 25+');
    console.log('👤 Admin: admin@arco.com / admin123');
    
  } catch (error) {
    console.error('❌ Erro no setup:', error.message);
  } finally {
    await client.close();
  }
}

setupDatabase();