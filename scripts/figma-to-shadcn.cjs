#!/usr/bin/env node

/**
 * Figma to Shadcn/UI Converter
 * Converts figma.txt export to proper Shadcn components
 * Zero copy/paste workflow
 */

const fs = require('fs')
const path = require('path')

class FigmaToShadcn {
  constructor() {
    this.figmaContent = ''
    this.components = new Map()
    this.designTokens = {
      colors: new Map(),
      typography: new Map(),
      spacing: new Map()
    }
  }

  async loadFigmaFile() {
    try {
      this.figmaContent = fs.readFileSync('figma.txt', 'utf-8')
      console.log('✅ Figma file loaded')
    } catch (error) {
      console.error('❌ Error loading figma.txt:', error.message)
      process.exit(1)
    }
  }

  extractDesignTokens() {
    console.log('🎨 Extracting design tokens...')

    // Extract colors
    const colorMatches = this.figmaContent.match(/Color-Scheme-\d+-\w+/g) || []
    const uniqueColors = [...new Set(colorMatches)]

    uniqueColors.forEach(color => {
      const [scheme, type] = color.replace('Color-', '').split('-')
      if (!this.designTokens.colors.has(scheme)) {
        this.designTokens.colors.set(scheme, new Set())
      }
      this.designTokens.colors.get(scheme).add(type)
    })

    // Extract typography
    const fontMatches = this.figmaContent.match(/font-\['([^']+)'\]/g) || []
    fontMatches.forEach(match => {
      const font = match.match(/font-\['([^']+)'\]/)[1]
      this.designTokens.typography.set(font, true)
    })

    // Extract text sizes
    const sizeMatches = this.figmaContent.match(/text-\w+/g) || []
    sizeMatches.forEach(size => this.designTokens.typography.set(size, true))

    console.log(`   📐 Found ${this.designTokens.colors.size} color schemes`)
    console.log(`   🔤 Found ${this.designTokens.typography.size} typography tokens`)
  }

  identifyComponents() {
    console.log('🔍 Identifying reusable components...')

    // Split content into logical sections
    const sections = this.figmaContent.split(/(?=<div className="[^"]*(?:section|container|wrapper))/g)

    sections.forEach((section, index) => {
      if (section.trim().length < 100) return

      // Identify component type
      let componentType = 'Unknown'

      if (section.includes('text-5xl') || section.includes('text-7xl')) {
        componentType = 'HeroSection'
      } else if (section.includes('justify-between') && section.includes('h-16')) {
        componentType = 'Header'
      } else if (section.includes('py-3') && section.includes('gap-2')) {
        componentType = 'Navigation'
      } else if (section.includes('text-4xl')) {
        componentType = 'SectionHeader'
      } else if (section.includes('border') && section.includes('rounded')) {
        componentType = 'Card'
      } else if (section.includes('bg-') && section.includes('text-center')) {
        componentType = 'CTASection'
      }

      this.components.set(`${componentType}_${index}`, {
        type: componentType,
        content: section.trim(),
        hasText: section.includes('text-'),
        hasButton: section.includes('button') || section.includes('cursor-pointer'),
        hasImage: section.includes('src=') || section.includes('placehold.co'),
        colorScheme: this.extractColorScheme(section)
      })
    })

    console.log(`   🧩 Identified ${this.components.size} components`)
  }

  extractColorScheme(content) {
    const colorMatch = content.match(/Color-Scheme-(\d+)/);
    return colorMatch ? `scheme${colorMatch[1]}` : 'default'
  }

  generateShadcnComponents() {
    console.log('⚡ Generating Shadcn/UI components...')

    // Ensure output directory exists
    const outputDir = 'src/components/figma-generated'
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    // Generate design tokens
    this.generateDesignTokens(outputDir)

    // Generate components
    this.components.forEach((component, name) => {
      const shadcnComponent = this.convertToShadcn(component, name)
      const fileName = `${name.replace(/_\d+$/, '')}.tsx`
      const filePath = path.join(outputDir, fileName)

      fs.writeFileSync(filePath, shadcnComponent)
      console.log(`   📝 Generated ${fileName}`)
    })
  }

  generateDesignTokens(outputDir) {
    // Generate Tailwind config extension
    const tailwindConfig = this.generateTailwindConfig()
    fs.writeFileSync(path.join(outputDir, 'tailwind-extension.js'), tailwindConfig)

    // Generate CSS variables
    const cssVariables = this.generateCSSVariables()
    fs.writeFileSync(path.join(outputDir, 'design-tokens.css'), cssVariables)

    console.log('   🎨 Generated design tokens')
  }

  generateTailwindConfig() {
    return `// Auto-generated Tailwind config extension
module.exports = {
  theme: {
    extend: {
      colors: {
        ${Array.from(this.designTokens.colors.entries()).map(([scheme, types]) => `
        '${scheme.toLowerCase()}': {
          ${Array.from(types).map(type => `'${type.toLowerCase()}': 'hsl(var(--${scheme.toLowerCase()}-${type.toLowerCase()}))'`).join(',\n          ')}
        }`).join(',\n        ')}
      },
      fontFamily: {
        ${Array.from(this.designTokens.typography.keys())
          .filter(key => !key.startsWith('text-'))
          .map(font => `'${font.toLowerCase()}': ['${font}', 'serif']`)
          .join(',\n        ')}
      }
    }
  }
}`
  }

  generateCSSVariables() {
    return `/* Auto-generated CSS variables from Figma */
:root {
  /* Color Schemes */
  ${Array.from(this.designTokens.colors.entries()).map(([scheme, types]) =>
    Array.from(types).map(type =>
      `--${scheme.toLowerCase()}-${type.toLowerCase()}: 210 40% 12%;`
    ).join('\n  ')
  ).join('\n  ')}
}

/* Dark mode variants */
.dark {
  ${Array.from(this.designTokens.colors.entries()).map(([scheme, types]) =>
    Array.from(types).map(type =>
      `--${scheme.toLowerCase()}-${type.toLowerCase()}: 210 40% 98%;`
    ).join('\n  ')
  ).join('\n  ')}
}
`
  }

  convertToShadcn(component, name) {
    const componentName = name.replace(/_\d+$/, '')

    // Convert Figma classes to Shadcn patterns
    let content = component.content
      // Replace Figma color classes
      .replace(/Color-Scheme-(\d+)-(\w+)/g, (match, scheme, type) =>
        `${type.toLowerCase() === 'background' ? 'bg' : 'text'}-scheme${scheme}-${type.toLowerCase()}`
      )
      // Replace font classes
      .replace(/font-\['([^']+)'\]/g, (match, font) => `font-${font.toLowerCase()}`)
      // Clean up unnecessary classes
      .replace(/justify-start/g, 'text-left')
      .replace(/self-stretch/g, 'w-full')
      // Add Shadcn component imports where needed
      .replace(/<div className="([^"]*border[^"]*)">/g, '<Card className="$1">')
      .replace(/<\/div>(?=\s*<\/div>)/g, '</Card>')

    return `'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ${componentName}Props {
  className?: string
}

export default function ${componentName}({ className }: ${componentName}Props) {
  return (
    <div className={cn("${component.colorScheme}", className)}>
      ${content.replace(/className="/g, 'className={cn("').replace(/"/g, '", className)}')}
    </div>
  )
}
`
  }

  async run() {
    console.log('🚀 Starting Figma to Shadcn conversion...\n')

    await this.loadFigmaFile()
    this.extractDesignTokens()
    this.identifyComponents()
    this.generateShadcnComponents()

    console.log('\n✨ Conversion complete!')
    console.log('📁 Generated files in: src/components/figma-generated/')
    console.log('🎯 Next steps:')
    console.log('   1. Import tailwind-extension.js in your tailwind.config.js')
    console.log('   2. Import design-tokens.css in your globals.css')
    console.log('   3. Use generated components in your pages')
  }
}

// Run the converter
const converter = new FigmaToShadcn()
converter.run().catch(console.error)