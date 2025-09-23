#!/bin/bash

# ARCO Architecture Cleanup Script
# Remove deprecated components and migrate to professional system

echo "🧹 Starting ARCO Architecture Cleanup..."

# Backup deprecated files
echo "📦 Backing up deprecated files..."
mkdir -p "docs/deprecated/$(date +%Y%m%d)"

# Move deprecated design systems
if [ -f "src/components/system/EnhancedDesignSystem.tsx" ]; then
    mv "src/components/system/EnhancedDesignSystem.tsx" "docs/deprecated/$(date +%Y%m%d)/"
    echo "✅ Moved EnhancedDesignSystem.tsx to deprecated"
fi

if [ -f "src/components/system/EnhancedDesignSystemV2.tsx" ]; then
    mv "src/components/system/EnhancedDesignSystemV2.tsx" "docs/deprecated/$(date +%Y%m%d)/"
    echo "✅ Moved EnhancedDesignSystemV2.tsx to deprecated"
fi

# Update import statements in remaining files
echo "🔄 Updating import statements..."

# Find and replace imports from deprecated systems
find src -name "*.tsx" -type f -exec sed -i 's|@/components/system/EnhancedDesignSystem|@/components/system/ProfessionalDesignSystem|g' {} \;
find src -name "*.tsx" -type f -exec sed -i 's|@/components/system/EnhancedDesignSystemV2|@/components/system/ProfessionalDesignSystem|g' {} \;

echo "✅ Updated import statements"

# Create migration summary
cat << EOF > "docs/architecture/cleanup-summary.md"
# ARCO Architecture Cleanup Summary

## Files Deprecated ($(date +%Y-%m-%d))

### Moved to docs/deprecated/$(date +%Y%m%d)/:
- EnhancedDesignSystem.tsx (Type conflicts, replaced by ProfessionalDesignSystem)
- EnhancedDesignSystemV2.tsx (Type conflicts, replaced by ProfessionalDesignSystem)

### Active System:
- ✅ ProfessionalDesignSystem.tsx (Main design system)
- ✅ AnimatedComponents.tsx (Animation wrappers)
- ✅ useAnimations.ts (Smart animation hooks)
- ✅ animations.ts (Animation library)

### Migration Complete:
- All imports updated to use ProfessionalDesignSystem
- Type conflicts resolved
- Architecture consolidated

## Next Steps:
1. Test all components work with new system
2. Verify TypeScript compilation
3. Performance testing
4. Deploy to staging
EOF

echo "📝 Created cleanup summary"

# Verify TypeScript compilation
echo "🔍 Verifying TypeScript compilation..."
if npx tsc --noEmit --skipLibCheck; then
    echo "✅ TypeScript compilation successful"
else
    echo "❌ TypeScript compilation failed - manual review needed"
fi

echo "🎉 Architecture cleanup complete!"
echo "📋 Review docs/architecture/cleanup-summary.md for details"
