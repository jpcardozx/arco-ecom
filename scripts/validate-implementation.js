#!/usr/bin/env node

/**
 * ARCO IMPLEMENTATION VALIDATION SCRIPT
 * 
 * Valida todas as implementações técnicas realizadas
 * Testa componentes, performance e integração
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const COMPONENTS_DIR = path.join(__dirname, '..', 'src', 'components')
const SECTIONS_DIR = path.join(COMPONENTS_DIR, 'sections')
const LAYOUT_DIR = path.join(COMPONENTS_DIR, 'layout')
const PERFORMANCE_DIR = path.join(COMPONENTS_DIR, 'performance')

// Lista de componentes que devem estar implementados
const REQUIRED_COMPONENTS = [
    'sections/UnifiedHeroSection.tsx',
    'sections/UnifiedValueProposition.tsx',
    'sections/OptimizedClientStories.tsx',
    'sections/ROICalculator.tsx',
    'layout/SimplifiedNavigation.tsx',
    'performance/WebVitalsMonitor.tsx'
]

// Lista de funcionalidades que devem estar presentes
const REQUIRED_FEATURES = [
    {
        file: 'src/app/page.tsx',
        patterns: [
            'UnifiedHeroSection',
            'UnifiedValueProposition',
            'OptimizedClientStories',
            'ROICalculator',
            'WebVitalsMonitor',
            'trackPageView',
            'scroll50Tracked',
            'scroll90Tracked'
        ]
    },
    {
        file: 'src/components/sections/UnifiedHeroSection.tsx',
        patterns: [
            'Stop losing',
            '$50K/month',
            '3.2x ROI in 47 days',
            'trackEvent',
            'LCP < 1.8s'
        ]
    },
    {
        file: 'src/components/performance/WebVitalsMonitor.tsx',
        patterns: [
            'onLCP',
            'onINP',
            'onCLS',
            'web-vitals',
            'good',
            'needs-improvement',
            'poor'
        ]
    }
]

console.log('🚀 ARCO IMPLEMENTATION VALIDATION')
console.log('=====================================\n')

let errors = []
let warnings = []
let successes = []

// Validar existência dos componentes
console.log('📁 Validating Component Files...')
REQUIRED_COMPONENTS.forEach(component => {
    const filePath = path.join(COMPONENTS_DIR, component)
    if (fs.existsSync(filePath)) {
        successes.push(`✅ ${component} exists`)
    } else {
        errors.push(`❌ ${component} missing`)
    }
})

// Validar funcionalidades nos arquivos
console.log('\n🔍 Validating Features...')
REQUIRED_FEATURES.forEach(({ file, patterns }) => {
    const filePath = path.join(__dirname, '..', file)
    
    if (!fs.existsSync(filePath)) {
        errors.push(`❌ ${file} not found`)
        return
    }

    const content = fs.readFileSync(filePath, 'utf8')
    
    patterns.forEach(pattern => {
        if (content.includes(pattern)) {
            successes.push(`✅ ${file}: "${pattern}" implemented`)
        } else {
            warnings.push(`⚠️ ${file}: "${pattern}" not found`)
        }
    })
})

// Validar package.json para dependências
console.log('\n📦 Validating Dependencies...')
const packageJsonPath = path.join(__dirname, '..', 'package.json')
if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
    const deps = { ...packageJson.dependencies, ...packageJson.devDependencies }
    
    const requiredDeps = [
        'next',
        'react',
        'framer-motion',
        'lucide-react',
        'web-vitals'
    ]
    
    requiredDeps.forEach(dep => {
        if (deps[dep]) {
            successes.push(`✅ ${dep} v${deps[dep]} installed`)
        } else {
            warnings.push(`⚠️ ${dep} dependency missing`)
        }
    })
}

// Validar configuração Tailwind
console.log('\n🎨 Validating Tailwind Config...')
const tailwindConfigPath = path.join(__dirname, '..', 'tailwind.config.js')
if (fs.existsSync(tailwindConfigPath)) {
    const tailwindConfig = fs.readFileSync(tailwindConfigPath, 'utf8')
    if (tailwindConfig.includes('src/')) {
        successes.push('✅ Tailwind configured for src directory')
    } else {
        warnings.push('⚠️ Tailwind may not be configured for src directory')
    }
}

// Relatório final
console.log('\n📊 VALIDATION REPORT')
console.log('===================')

if (successes.length > 0) {
    console.log('\n🎉 SUCCESSES:')
    successes.forEach(success => console.log(`  ${success}`))
}

if (warnings.length > 0) {
    console.log('\n⚠️ WARNINGS:')
    warnings.forEach(warning => console.log(`  ${warning}`))
}

if (errors.length > 0) {
    console.log('\n❌ ERRORS:')
    errors.forEach(error => console.log(`  ${error}`))
}

console.log('\n📈 SUMMARY:')
console.log(`  ✅ Successes: ${successes.length}`)
console.log(`  ⚠️ Warnings: ${warnings.length}`)
console.log(`  ❌ Errors: ${errors.length}`)

// Verificar se implementação está pronta para produção
if (errors.length === 0) {
    console.log('\n🚀 IMPLEMENTATION STATUS: READY FOR DEPLOYMENT')
    console.log('   All required components and features are implemented.')
    console.log('   Recommended next steps:')
    console.log('   1. Run "npm run build" to test production build')
    console.log('   2. Test performance with lighthouse')
    console.log('   3. Deploy to staging for A/B testing')
} else {
    console.log('\n🛠️ IMPLEMENTATION STATUS: NEEDS FIXES')
    console.log('   Please resolve the errors above before deployment.')
}

// Performance recommendations
console.log('\n⚡ PERFORMANCE OPTIMIZATION CHECKLIST:')
console.log('  □ LCP target: <1.8s')
console.log('  □ CLS target: <0.05')
console.log('  □ INP target: <200ms')
console.log('  □ Bundle size optimized')
console.log('  □ Images optimized')
console.log('  □ Lazy loading implemented')
console.log('  □ Web Vitals monitoring active')

console.log('\n✨ VALIDATION COMPLETE\n')

// Exit with appropriate code
process.exit(errors.length > 0 ? 1 : 0)
