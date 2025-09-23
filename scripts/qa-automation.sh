#!/bin/bash

# =================================================================
# ARCO QA Automation Suite
# Automated testing and validation for UI/UX improvements
# =================================================================

set -e  # Exit on any error

echo "🎯 ARCO QA AUTOMATION SUITE"
echo "=========================="
echo "Starting comprehensive QA validation..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test results tracking
TESTS_PASSED=0
TESTS_FAILED=0
WARNINGS=0

# =================================================================
# UTILITY FUNCTIONS
# =================================================================

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
    ((TESTS_PASSED++))
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
    ((TESTS_FAILED++))
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
    ((WARNINGS++))
}

log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# =================================================================
# PHASE 1: FOUNDATION VALIDATION
# =================================================================

echo "🏗️  PHASE 1: FOUNDATION SYSTEMS VALIDATION"
echo "=========================================="

# Check Design Tokens
echo "Validating Design Tokens..."
if [ -f "src/tokens/design-tokens.ts" ]; then
    log_success "Design tokens file exists"
    
    # Check if exports are valid
    if npm run type-check 2>/dev/null | grep -q "src/tokens/design-tokens.ts"; then
        log_error "Design tokens have TypeScript errors"
    else
        log_success "Design tokens TypeScript validation passed"
    fi
else
    log_error "Design tokens file missing"
fi

# Check Glassmorphism System
echo "Validating Glassmorphism System..."
if [ -f "src/styles/system/glassmorphism.css" ]; then
    log_success "Glassmorphism CSS file exists"
    
    # Check for required classes
    if grep -q "\.glass-premium" "src/styles/system/glassmorphism.css"; then
        log_success "Glass premium class found"
    else
        log_error "Glass premium class missing"
    fi
    
    if grep -q "\.depth-" "src/styles/system/glassmorphism.css"; then
        log_success "Depth system classes found"
    else
        log_error "Depth system classes missing"
    fi
else
    log_error "Glassmorphism CSS file missing"
fi

# Check Spacing System
echo "Validating Spacing System..."
if [ -f "src/styles/system/spacing.css" ]; then
    log_success "Spacing CSS file exists"
    
    if grep -q "\.section-spacing" "src/styles/system/spacing.css"; then
        log_success "Section spacing classes found"
    else
        log_error "Section spacing classes missing"
    fi
else
    log_error "Spacing CSS file missing"
fi

echo ""

# =================================================================
# PHASE 2: COMPONENT VALIDATION
# =================================================================

echo "🧩 PHASE 2: COMPONENT VALIDATION"
echo "==============================="

# Check InteractiveAssessmentExperience
echo "Validating InteractiveAssessmentExperience..."
if [ -f "src/components/sections/InteractiveAssessmentExperience.tsx" ]; then
    log_success "InteractiveAssessmentExperience component exists"
    
    # Check for updated copy
    if grep -q "Simule Sua Transformação Digital" "src/components/sections/InteractiveAssessmentExperience.tsx"; then
        log_success "Updated copy found in component"
    else
        log_warning "Updated copy not found - may need manual verification"
    fi
    
    # Check for container classes
    if grep -q "container-centered" "src/components/sections/InteractiveAssessmentExperience.tsx"; then
        log_success "Container spacing applied"
    else
        log_warning "Container spacing may not be applied"
    fi
else
    log_error "InteractiveAssessmentExperience component missing"
fi

# Check SuperiorNavigation
echo "Validating SuperiorNavigation..."
if [ -f "src/components/layout/SuperiorNavigation.tsx" ]; then
    log_success "SuperiorNavigation component exists"
    
    # Check for glassmorphism classes (this will likely fail initially)
    if grep -q "glass-" "src/components/layout/SuperiorNavigation.tsx"; then
        log_success "Glassmorphism classes applied to navigation"
    else
        log_warning "Navigation needs glassmorphism classes - pending implementation"
    fi
else
    log_error "SuperiorNavigation component missing"
fi

echo ""

# =================================================================
# PHASE 3: BUILD VALIDATION
# =================================================================

echo "🔧 PHASE 3: BUILD & COMPILATION VALIDATION"
echo "========================================="

# TypeScript compilation
echo "Running TypeScript compilation..."
if npm run build 2>/dev/null; then
    log_success "Build compilation successful"
else
    log_error "Build compilation failed"
    echo "Running type check for detailed errors..."
    npm run type-check || true
fi

# ESLint validation
echo "Running ESLint validation..."
if npm run lint 2>/dev/null; then
    log_success "ESLint validation passed"
else
    log_warning "ESLint issues found - review required"
fi

echo ""

# =================================================================
# PHASE 4: PERFORMANCE VALIDATION
# =================================================================

echo "⚡ PHASE 4: PERFORMANCE VALIDATION"
echo "================================"

# Check if dev server is running
echo "Checking development server status..."
if curl -s http://localhost:3001 > /dev/null 2>&1; then
    log_success "Development server is running on port 3001"
    
    # Basic performance check
    echo "Running basic performance check..."
    RESPONSE_TIME=$(curl -o /dev/null -s -w '%{time_total}\n' http://localhost:3001)
    RESPONSE_MS=$(echo "$RESPONSE_TIME * 1000" | bc)
    
    if (( $(echo "$RESPONSE_TIME < 1.0" | bc -l) )); then
        log_success "Response time: ${RESPONSE_MS}ms (Good)"
    elif (( $(echo "$RESPONSE_TIME < 3.0" | bc -l) )); then
        log_warning "Response time: ${RESPONSE_MS}ms (Acceptable)"
    else
        log_error "Response time: ${RESPONSE_MS}ms (Poor - Needs optimization)"
    fi
else
    log_warning "Development server not running - performance tests skipped"
fi

echo ""

# =================================================================
# PHASE 5: ASSET VALIDATION
# =================================================================

echo "📦 PHASE 5: ASSET & DEPENDENCY VALIDATION"
echo "========================================"

# Check for missing assets
echo "Checking for critical assets..."
if [ -f "public/icons/logo-v2-192.png" ]; then
    log_success "PWA icon found"
else
    log_warning "PWA icon missing - will cause 404 errors"
fi

# Check package.json for redundant dependencies
echo "Checking for redundant animation libraries..."
if grep -q '"gsap"' package.json; then
    log_warning "GSAP still in dependencies - should be removed"
else
    log_success "GSAP not found in dependencies"
fi

if grep -q '"react-spring"' package.json; then
    log_warning "React Spring still in dependencies - should be removed"
else
    log_success "React Spring not found in dependencies"
fi

echo ""

# =================================================================
# PHASE 6: ACCESSIBILITY VALIDATION
# =================================================================

echo "♿ PHASE 6: ACCESSIBILITY VALIDATION"
echo "=================================="

# Check for accessibility best practices in components
echo "Checking accessibility patterns..."

# Check for alt texts, aria labels, etc.
if find src/components -name "*.tsx" -exec grep -l "alt=" {} \; | wc -l | grep -q "[1-9]"; then
    log_success "Alt texts found in components"
else
    log_warning "No alt texts found - review image accessibility"
fi

if find src/components -name "*.tsx" -exec grep -l "aria-" {} \; | wc -l | grep -q "[1-9]"; then
    log_success "ARIA attributes found in components"
else
    log_warning "Limited ARIA attributes - review accessibility"
fi

echo ""

# =================================================================
# RESULTS SUMMARY
# =================================================================

echo "📊 QA VALIDATION RESULTS"
echo "======================="
echo -e "${GREEN}Tests Passed: $TESTS_PASSED${NC}"
echo -e "${RED}Tests Failed: $TESTS_FAILED${NC}"
echo -e "${YELLOW}Warnings: $WARNINGS${NC}"
echo ""

# Calculate pass rate
TOTAL_TESTS=$((TESTS_PASSED + TESTS_FAILED))
if [ $TOTAL_TESTS -gt 0 ]; then
    PASS_RATE=$(echo "scale=1; $TESTS_PASSED * 100 / $TOTAL_TESTS" | bc)
    echo "Pass Rate: ${PASS_RATE}%"
else
    echo "Pass Rate: N/A"
fi

echo ""

# =================================================================
# RECOMMENDATIONS
# =================================================================

echo "🎯 IMMEDIATE ACTIONS REQUIRED"
echo "============================="

if [ $TESTS_FAILED -gt 0 ]; then
    echo -e "${RED}CRITICAL: $TESTS_FAILED tests failed - immediate attention required${NC}"
fi

if [ $WARNINGS -gt 3 ]; then
    echo -e "${YELLOW}HIGH: $WARNINGS warnings found - review and fix recommended${NC}"
fi

echo ""
echo "Priority Actions:"
echo "1. Fix any failed tests above"
echo "2. Address performance issues (LCP > 4s)"
echo "3. Apply glassmorphism to navigation"
echo "4. Remove redundant animation libraries"
echo "5. Add missing PWA assets"

echo ""
echo "🚀 Ready for next phase of implementation!"

# Exit with appropriate code
if [ $TESTS_FAILED -gt 0 ]; then
    exit 1
else
    exit 0
fi
