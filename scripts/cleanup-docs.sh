#!/bin/bash

# ARCO Documentation Cleanup and Reorganization Script
# Removes redundant files and organizes structure

cd "$(dirname "$0")"

echo "🧹 Starting ARCO Documentation Cleanup..."

# Create organized structure
echo "📁 Creating organized folder structure..."
mkdir -p docs/core
mkdir -p docs/technical
mkdir -p docs/business
mkdir -p docs/archive

echo "🗑️ Removing redundant and outdated files..."

# Remove clearly redundant files
rm -f docs/AUDITORIA_DOCUMENTACAO_CONCLUIDA.md
rm -f docs/cleanup-report.md
rm -f docs/final-qa-report.md
rm -f docs/QA_PROCESS.md
rm -f docs/CRITICAL_QUALITY_ASSESSMENT.md
rm -f docs/FUNDAMENTAL_IMPROVEMENTS_PLAN.md

# Remove redundant implementation files (keep only the most recent/relevant)
cd docs/implementation
rm -f design-system-maturation-plan.md
rm -f homepage-enhancement-strategic-guide.md
rm -f homepage-refactoring-roadmap.md
rm -f HERO-MIGRATION-ANALYSIS.md
rm -f HERO-MIGRATION-COMPLETE.md
rm -f implementation-status.md
rm -f layout-improvements-analysis.md
rm -f PROGRESS-TRACKING.md
rm -f progressive-ux-implementation-report.md
rm -f s-tier-integration-plan.md
rm -f s-tier-section-implementation-summary.md
rm -f section-refactoring-plan.md
rm -f section-refactoring-progress.md
rm -f strategic-consolidation-plan.md
rm -f strategic-implementation-guide.md
rm -f strategic-value-proposition-implementation.md
rm -f ui-ux-optimization-workflow.md

cd ..

# Remove redundant analysis files
cd analysis
rm -f HOMEPAGE-ARCHITECTURAL-REFACTOR-2025.md
rm -f HOMEPAGE-CRITICAL-AUDIT-2025.md
cd ..

# Remove redundant architecture files
cd architecture
rm -f cleanup-summary.md
cd ..

echo "📋 Keeping essential files and organizing..."

# List of files to keep (most important/recent)
echo "✅ Essential files preserved:"
echo "  - README.md (main documentation index)"
echo "  - STRATEGIC_OVERVIEW.md (business overview)"
echo "  - STRATEGIC_VISION_2025.md (future roadmap)"
echo "  - implementation/qa-architecture-enhancement-report.md (latest QA report)"
echo "  - implementation/professional-design-system-report.md (design system)"
echo "  - analysis/bundle-analysis-report.md (performance analysis)"
echo "  - setup/ (environment setup guides)"
echo "  - deprecated/ (archived components)"

echo "🎯 Cleanup completed! Documentation is now organized and streamlined."
