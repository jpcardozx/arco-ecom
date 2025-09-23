#!/usr/bin/env npx tsx

/**
 * Start Simplified ARCO MCP Server
 * 
 * Loads configuration from environment variables and starts the simplified server
 */

import SimplifiedARCOMCPServer from '../core/simplified-mcp-server.js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

interface ServerConfig {
  ga4PropertyId: string;
  ga4ServiceAccountPath?: string;
  ga4ClientId?: string;
  ga4ClientSecret?: string;
  searchConsoleUrl: string;
  cruxApiKey?: string;
  arcoBaselines: {
    conversionRate: number;
    averageDealSize: number;
    leadToClientRate: number;
    monthlySessions: number;
    bounceRate?: number;
    avgSessionDuration?: number;
  };
}

function loadConfiguration(): ServerConfig {
  console.log('🔧 Loading ARCO MCP Configuration...');
  
  // Required variables
  const ga4PropertyId = process.env.GA4_PROPERTY_ID;
  if (!ga4PropertyId) {
    console.error('❌ GA4_PROPERTY_ID is required but not set');
    console.log('💡 Add GA4_PROPERTY_ID=your-property-id to .env.local');
    process.exit(1);
  }

  // Authentication setup
  const ga4ServiceAccountPath = process.env.GA4_SERVICE_ACCOUNT_PATH;
  const ga4ClientId = process.env.GA4_CLIENT_ID;
  const ga4ClientSecret = process.env.GA4_CLIENT_SECRET;

  if (!ga4ServiceAccountPath && (!ga4ClientId || !ga4ClientSecret)) {
    console.warn('⚠️ No GA4 authentication configured');
    console.log('💡 Set either GA4_SERVICE_ACCOUNT_PATH or GA4_CLIENT_ID + GA4_CLIENT_SECRET');
    console.log('📖 Server will run with fallback data only');
  }

  // Business baselines with validation
  const conversionRate = parseFloat(process.env.ARCO_CONVERSION_RATE || '0.032');
  const averageDealSize = parseInt(process.env.ARCO_AVERAGE_DEAL_SIZE || '15000');
  const leadToClientRate = parseFloat(process.env.ARCO_LEAD_TO_CLIENT_RATE || '0.08');
  const monthlySessions = parseInt(process.env.ARCO_MONTHLY_SESSIONS || '1500');

  if (conversionRate <= 0 || conversionRate > 1) {
    console.warn('⚠️ Invalid ARCO_CONVERSION_RATE, using default (3.2%)');
  }

  if (averageDealSize <= 0) {
    console.warn('⚠️ Invalid ARCO_AVERAGE_DEAL_SIZE, using default ($15,000)');
  }

  const config: ServerConfig = {
    ga4PropertyId,
    ga4ServiceAccountPath,
    ga4ClientId,
    ga4ClientSecret,
    searchConsoleUrl: process.env.SEARCH_CONSOLE_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://arco-consulting.com',
    cruxApiKey: process.env.CRUX_API_KEY,
    arcoBaselines: {
      conversionRate,
      averageDealSize,
      leadToClientRate,
      monthlySessions,
      bounceRate: parseFloat(process.env.ARCO_BOUNCE_RATE || '0.32'),
      avgSessionDuration: parseInt(process.env.ARCO_AVG_SESSION_DURATION || '245')
    }
  };

  // Log configuration status
  console.log('✅ Configuration loaded:');
  console.log(`   📊 GA4 Property: ${config.ga4PropertyId}`);
  console.log(`   🔐 Auth Method: ${config.ga4ServiceAccountPath ? 'Service Account' : config.ga4ClientId ? 'OAuth' : 'None (fallback only)'}`);
  console.log(`   💼 Conversion Rate: ${(config.arcoBaselines.conversionRate * 100).toFixed(1)}%`);
  console.log(`   💰 Average Deal: $${config.arcoBaselines.averageDealSize.toLocaleString()}`);
  console.log(`   📈 Monthly Sessions: ${config.arcoBaselines.monthlySessions.toLocaleString()}`);
  console.log(`   🌐 Site URL: ${config.searchConsoleUrl}`);

  return config;
}

async function startServer() {
  try {
    console.log('🚀 Starting ARCO Simplified MCP Server...\n');
    
    const config = loadConfiguration();
    const server = new SimplifiedARCOMCPServer(config);
    
    console.log('\n🔄 Initializing server components...');
    
    // Start the server
    await server.run();
    
    console.log('\n✅ ARCO MCP Server is running!');
    console.log('📋 Available tools:');
    console.log('   • get_real_analytics - Real GA4 data with business intelligence');
    console.log('   • analyze_component_performance - Web Vitals correlation analysis');
    console.log('   • calculate_business_impact - ROI and revenue projections');
    console.log('\n💡 Test with your MCP client or use npm run mcp:test:simple');
    
  } catch (error) {
    console.error('\n❌ Failed to start ARCO MCP Server:');
    console.error(error);
    
    if (error instanceof Error) {
      if (error.message.includes('GA4')) {
        console.log('\n🔧 GA4 Setup Help:');
        console.log('1. Get your GA4 Property ID from Google Analytics');
        console.log('2. Create a service account in Google Cloud Console');
        console.log('3. Enable Analytics API for your project');
        console.log('4. Add your service account to GA4 with Viewer permissions');
        console.log('5. Download service account JSON key');
        console.log('6. Set GA4_SERVICE_ACCOUNT_PATH in .env.local');
      }
      
      if (error.message.includes('baseline')) {
        console.log('\n📊 Business Data Setup:');
        console.log('1. Set ARCO_CONVERSION_RATE (current conversion rate as decimal)');
        console.log('2. Set ARCO_AVERAGE_DEAL_SIZE (average deal size in USD)');
        console.log('3. Set ARCO_LEAD_TO_CLIENT_RATE (lead to client conversion as decimal)');
        console.log('4. Set ARCO_MONTHLY_SESSIONS (current monthly website sessions)');
      }
    }
    
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 ARCO MCP Server shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n👋 ARCO MCP Server terminated');
  process.exit(0);
});

// Start the server
if (import.meta.url === `file://${process.argv[1]}`) {
  startServer();
}

export default startServer;