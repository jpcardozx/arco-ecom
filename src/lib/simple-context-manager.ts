/**
 * ARCO SIMPLE CONTEXT MANAGER
 * Minimal implementation to test if context injection solves the core problem
 * NO overengineering - just basic context retrieval and formatting
 */
import fs from 'fs'
import path from 'path'

interface ArcoContext {
  project: {
    name: string
    goal: string
    currentPhase: string
    constraints: string[]
  }
  technical: {
    stack: string[]
    patterns: string[]
    decisions: Record<string, string>
    architecture: string[]
  }
  business: {
    target: string
    positioning: string
    valueProposition: string
    kpis: string[]
  }
  current: {
    workingOn: string
    lastDecisions: string[]
    blockers: string[]
  }
}

export class SimpleContextManager {
  private context: ArcoContext

  constructor() {
    this.context = this.initializeContext()
  }

  /**
   * Get relevant context for a specific query/task
   * Simple keyword matching - no AI/ML complexity
   */
  getContextFor(query: string): string {
    const keywords = query.toLowerCase().split(' ')
    const relevantSections = this.findRelevantSections(keywords)
    return this.formatContextForAI(relevantSections, query)
  }

  /**
   * Update context when significant decisions are made
   */
  updateContext(section: keyof ArcoContext, key: string, value: any): void {
    if (this.context[section] && typeof this.context[section] === 'object') {
      (this.context[section] as any)[key] = value
      this.persistContext()
    }
  }

  /**
   * Add a decision to track
   */
  addDecision(decision: string, reasoning: string): void {
    this.context.technical.decisions[decision] = reasoning
    this.context.current.lastDecisions.unshift(`${decision}: ${reasoning}`)
    
    // Keep only last 5 decisions
    if (this.context.current.lastDecisions.length > 5) {
      this.context.current.lastDecisions = this.context.current.lastDecisions.slice(0, 5)
    }
    
    this.persistContext()
  }

  /**
   * Set current work focus
   */
  setCurrentWork(description: string): void {
    this.context.current.workingOn = description
    this.persistContext()
  }

  /**
   * Get full context dump for complex queries
   */
  getFullContext(): string {
    return this.formatContextForAI(this.context, "comprehensive analysis")
  }

  private initializeContext(): ArcoContext {
    // Try to load from existing files/localStorage, fallback to default
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('arco-context')
      if (stored) {
        try {
          return JSON.parse(stored)
        } catch (e) {
          console.warn('Failed to parse stored context, using default')
        }
      }
    }

    return {
      project: {
        name: "ARCO",
        goal: "Plataforma competitiva que rompe barreiras PF vs PJ no mercado B2B",
        currentPhase: "MVP Development & Validation",
        constraints: [
          "Solo development with AI assistance",
          "Budget conscious (free/low-cost tools priority)",
          "Speed to market critical",
          "Must demonstrate competence vs agencies"
        ]
      },
      technical: {
        stack: ["Next.js 15", "TypeScript", "React", "Tailwind CSS", "Python scripts"],
        patterns: ["App Router", "Server Components", "TypeScript-first", "Mobile-first design"],
        decisions: {
          "Frontend Framework": "Next.js 15 for SSR/SSG capabilities and performance",
          "Styling": "Tailwind CSS for rapid development and consistency",
          "Language": "TypeScript for type safety and developer experience",
          "Architecture": "Monorepo structure for scalability"
        },
        architecture: ["Monorepo", "Component-based", "Performance-first", "SEO-optimized"]
      },
      business: {
        target: "Empresas 10-50 funcionários com stack WordPress/Shopify/HubSpot caro e lento",
        positioning: "Performance-first development com ROI mensurável vs agências tradicionais",
        valueProposition: "Entregamos em dias o que agências fazem em semanas, com melhor performance",
        kpis: ["Conversion rate", "Core Web Vitals", "Time to first contract", "Lead quality"]
      },
      current: {
        workingOn: "Context management system to improve AI collaboration",
        lastDecisions: [],
        blockers: []
      }
    }
  }

  private findRelevantSections(keywords: string[]): Partial<ArcoContext> {
    const relevant: Partial<ArcoContext> = {}

    // Technical keywords
    if (this.hasKeywords(keywords, ['component', 'react', 'ui', 'frontend', 'technical', 'code', 'performance'])) {
      relevant.technical = this.context.technical
    }

    // Business keywords  
    if (this.hasKeywords(keywords, ['conversion', 'lead', 'business', 'client', 'pricing', 'marketing'])) {
      relevant.business = this.context.business
    }

    // Project keywords
    if (this.hasKeywords(keywords, ['goal', 'strategy', 'project', 'phase', 'constraint'])) {
      relevant.project = this.context.project
    }

    // Always include current work context
    relevant.current = this.context.current

    // If no specific match, include everything (better safe than sorry)
    if (Object.keys(relevant).length === 1) { // Only 'current' was added
      return this.context
    }

    return relevant
  }

  private hasKeywords(queryKeywords: string[], targetKeywords: string[]): boolean {
    return queryKeywords.some(keyword => 
      targetKeywords.some(target => 
        keyword.includes(target) || target.includes(keyword)
      )
    )
  }

  private formatContextForAI(context: Partial<ArcoContext>, query: string): string {
    const sections: string[] = []

    sections.push("# ARCO PROJECT CONTEXT")
    sections.push(`Query: ${query}`)
    sections.push("")

    if (context.project) {
      sections.push("## PROJECT")
      sections.push(`Goal: ${context.project.goal}`)
      sections.push(`Current Phase: ${context.project.currentPhase}`)
      sections.push(`Constraints: ${context.project.constraints.join(', ')}`)
      sections.push("")
    }

    if (context.technical) {
      sections.push("## TECHNICAL")
      sections.push(`Stack: ${context.technical.stack.join(', ')}`)
      sections.push(`Patterns: ${context.technical.patterns.join(', ')}`)
      sections.push("### Key Decisions:")
      for (const [decision, reasoning] of Object.entries(context.technical.decisions)) {
        sections.push(`- ${decision}: ${reasoning}`)
      }
      sections.push("")
    }

    if (context.business) {
      sections.push("## BUSINESS")
      sections.push(`Target: ${context.business.target}`)
      sections.push(`Positioning: ${context.business.positioning}`)
      sections.push(`Value Proposition: ${context.business.valueProposition}`)
      sections.push(`KPIs: ${context.business.kpis.join(', ')}`)
      sections.push("")
    }

    if (context.current) {
      sections.push("## CURRENT CONTEXT")
      sections.push(`Working On: ${context.current.workingOn}`)
      if (context.current.lastDecisions.length > 0) {
        sections.push("Recent Decisions:")
        context.current.lastDecisions.forEach(decision => {
          sections.push(`- ${decision}`)
        })
      }
      if (context.current.blockers.length > 0) {
        sections.push("Current Blockers:")
        context.current.blockers.forEach(blocker => {
          sections.push(`- ${blocker}`)
        })
      }
    }

    sections.push("")
    sections.push("---")
    sections.push("Use this context to provide specific, actionable advice aligned with ARCO's goals and constraints.")

    return sections.join('\n')
  }

  private persistContext(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('arco-context', JSON.stringify(this.context))
    }
    
    // Could also save to file in Node.js environment
    if (typeof process !== 'undefined' && process.env.NODE_ENV === 'development') {
      // File persistence for development
      this.saveToFile()
    }
  }

  private saveToFile(): void {
    // Simple file save for development environment
    try {
      const contextPath = path.join(process.cwd(), 'arco-context.json')
      fs.writeFileSync(contextPath, JSON.stringify(this.context, null, 2))
    } catch (error) {
      console.warn('Could not save context to file:', error)
    }
  }
}

// Singleton instance for easy access
export const arcoContext = new SimpleContextManager()

// Helper function for quick context injection
export function getArcoContext(query: string): string {
  return arcoContext.getContextFor(query)
}

// Helper for updating context after decisions
export function recordDecision(decision: string, reasoning: string): void {
  arcoContext.addDecision(decision, reasoning)
}

// Helper for setting current work
export function setCurrentWork(description: string): void {
  arcoContext.setCurrentWork(description)
}
