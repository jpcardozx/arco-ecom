#!/usr/bin/env node

/**
 * Simple ARCO Expert MCP Test
 * Direct test of MCP server functionality
 */

import { spawn } from 'child_process'
import { ArcoExpertIntelligenceServer } from '../servers/arco-expert-intelligence-server.js'

console.log('🧠 Testing ARCO Expert MCP Server Directly')
console.log('=' .repeat(50))

async function testDirectly() {
  try {
    console.log('📡 Initializing ARCO Expert Intelligence Server...')
    
    const server = new ArcoExpertIntelligenceServer()
    
    console.log('🧪 Testing Component Analysis Tool...')
    
    // Test the analyze_arco_component tool directly
    const componentAnalysis = await server.analyzeARCOComponent(
      'src/components/homepage/TrojanHorseHero.tsx',
      'expert',
      'Optimizing conversion from 2.1% to 3.5%'
    )
    
    console.log('✅ Component Analysis Result:')
    console.log(componentAnalysis.content[0].text)
    
    console.log('\n🧪 Testing Optimization Suggestions...')
    
    // Test optimization suggestions
    const optimization = await server.suggestARCOOptimization(
      'conversion',
      'Increase lead quality and conversion rate',
      ['Performance budget', 'Mobile optimization']
    )
    
    console.log('✅ Optimization Suggestions:')
    console.log(optimization.content[0].text)
    
    console.log('\n🎯 ARCO Expert MCP Direct Test: SUCCESS')
    
  } catch (error) {
    console.error('❌ Direct test failed:', error)
  }
}

testDirectly()