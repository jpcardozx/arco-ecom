/**
 * Validates compatibility between Tailwind CSS v4 and UI component libraries
 * Based on the diagnostic protocol from docs/TAILWIND_DIAGNOSTIC_PROTOCOL.md
 */
const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

/**
 * Validates compatibility between Tailwind CSS v4 and UI component libraries
 */
async function validateTailwindV4Compatibility() {
  console.log('\n🔍 TAILWIND CSS V4 COMPATIBILITY CHECK\n');
  
  // Known problematic dependencies for Tailwind v4
  const potentialProblems = [
    '@nextui-org/react', 
    '@nextui-org/theme',
    '@tailwindcss/forms',
    '@tailwindcss/typography',
    '@tailwindcss/container-queries',
    'tailwindcss-animate',
    'shadcn-ui',
    'tailwind-variants'
  ];
  
  // Get package.json content
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    console.log('❌ Error: package.json not found!');
    return;
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const allDeps = { 
    ...packageJson.dependencies || {}, 
    ...packageJson.devDependencies || {} 
  };
    // Check if using Tailwind v4
  const tailwindVersion = allDeps.tailwindcss;
  const usingTailwindV4 = tailwindVersion && 
    (tailwindVersion.startsWith('4') || 
     tailwindVersion.startsWith('^4') || 
     tailwindVersion.match(/^[~^]?4\.\d+\.\d+/));

  if (!usingTailwindV4) {
    console.log(`ℹ️ Not using Tailwind CSS v4. Current version: ${tailwindVersion}. No compatibility check needed.`);
    return;
  }
  console.log(`✅ Using Tailwind CSS v4 (${tailwindVersion})`);
  console.log('\nChecking for potentially incompatible dependencies:');
  
  const problematicDeps = [];
  potentialProblems.forEach(dep => {
    if (allDeps[dep]) {
      console.log(`⚠️ Found ${dep}: ${allDeps[dep]} - may require compatibility patch`);
      problematicDeps.push(dep);
    }
  });
  
  // Check PostCSS configuration
  const postcssPath = path.join(process.cwd(), 'postcss.config.js');
  if (fs.existsSync(postcssPath)) {
    const postcssContent = fs.readFileSync(postcssPath, 'utf8');
    const hasCorrectV4Config = postcssContent.includes('@tailwindcss/postcss');
    
    if (hasCorrectV4Config) {
      console.log('\n✅ PostCSS configuration appears correct for Tailwind CSS v4');
    } else {
      console.log('\n❌ PostCSS configuration may be incorrect for Tailwind CSS v4');
      console.log('   Should use @tailwindcss/postcss instead of tailwindcss in plugins');
    }
  }
    // Check for resolution strategies
  const hasResolutions = packageJson.resolutions || packageJson.overrides;
  const hasPnpmOverrides = packageJson.pnpm && packageJson.pnpm.overrides;
  
  if (problematicDeps.length > 0) {
    if (hasResolutions) {
      console.log('\n✅ Found resolution strategy in package.json (overrides or resolutions)');
      
      // Check if the resolutions contain our problematic dependencies
      let hasRelevantOverrides = false;
      
      if (packageJson.overrides) {
        const overrideKeys = Object.keys(packageJson.overrides);
        const relevantKeys = overrideKeys.filter(key => potentialProblems.includes(key));
        if (relevantKeys.length > 0) {
          console.log(`   ✅ Found relevant overrides for: ${relevantKeys.join(', ')}`);
          hasRelevantOverrides = true;
        }
      }
      
      if (packageJson.resolutions) {
        const resolutionKeys = Object.keys(packageJson.resolutions);
        const relevantResolutions = resolutionKeys.filter(key => 
          potentialProblems.some(prob => key.includes(prob)));
        
        if (relevantResolutions.length > 0) {
          console.log(`   ✅ Found relevant resolutions for: ${relevantResolutions.join(', ')}`);
          hasRelevantOverrides = true;
        }
      }
      
      if (!hasRelevantOverrides) {
        console.log('   ⚠️ Overrides/resolutions found but may not cover all problematic dependencies');
      }
    } else if (!hasResolutions && !hasPnpmOverrides) {
      console.log('\n⚠️ You have potentially incompatible dependencies but no resolution strategy');
      console.log('   Consider adding resolutions or overrides to package.json');
    }
    
    // Check for pnpm-specific overrides
    if (hasPnpmOverrides) {
      console.log('\n✅ Found pnpm-specific overrides in package.json');
      
      const pnpmOverrideKeys = Object.keys(packageJson.pnpm.overrides);
      const relevantPnpmOverrides = pnpmOverrideKeys.filter(key => 
        potentialProblems.some(prob => key.includes(prob)));
      
      if (relevantPnpmOverrides.length > 0) {
        console.log(`   ✅ Found relevant pnpm overrides for: ${relevantPnpmOverrides.join(', ')}`);
      } else {
        console.log('   ⚠️ pnpm overrides found but may not cover all problematic dependencies');
      }
    }
  }
    // Check if using pnpm
  const isPnpm = fs.existsSync(path.join(process.cwd(), 'pnpm-lock.yaml'));
  if (isPnpm) {
    const npmrcPath = path.join(process.cwd(), '.npmrc');
    const hasNpmrc = fs.existsSync(npmrcPath);
    
    if (hasNpmrc) {
      console.log('\n✅ Found .npmrc file for pnpm configuration');
      
      const npmrcContent = fs.readFileSync(npmrcPath, 'utf8');
      const requiredSettings = [
        'strict-peer-dependencies=false',
        'resolution-mode=highest',
        'auto-install-peers=true',
        'shamefully-hoist=true'
      ];
      
      const missingSettings = [];
      for (const setting of requiredSettings) {
        if (!npmrcContent.includes(setting)) {
          missingSettings.push(setting);
        }
      }
      
      if (missingSettings.length === 0) {
        console.log('   ✅ .npmrc contains all recommended settings for Tailwind v4 compatibility');
      } else {
        console.log(`   ⚠️ .npmrc is missing recommended settings: ${missingSettings.join(', ')}`);
      }
      
    } else if (problematicDeps.length > 0) {
      console.log('\n⚠️ Using pnpm with incompatible dependencies but no .npmrc file');
      console.log('   Consider creating .npmrc with needed configurations');
    }
  }
  
  // Check for specific NextUI version incompatibility
  if (allDeps['@nextui-org/react']) {
    const nextUIVersion = allDeps['@nextui-org/react'];
    if (nextUIVersion.startsWith('2.')) {
      console.log('\n⚠️ NextUI v2 may have compatibility issues with Tailwind CSS v4');
      console.log('   Consider the following strategies:');
      console.log('   1. Use patch-package to modify @nextui-org/theme peer dependencies');
      console.log('   2. Add resolutions/overrides in package.json');
      console.log('   3. Check if NextUI has a beta version supporting Tailwind v4');
    }
  }
    // Determine what has been configured already
  const hasCompleteResolutions = packageJson.overrides && 
    Object.keys(packageJson.overrides).some(key => key.includes('@nextui-org'));
  const hasCompletePnpmConfig = packageJson.pnpm && packageJson.pnpm.overrides &&
    Object.keys(packageJson.pnpm.overrides).some(key => key.includes('@nextui-org'));
  
  const npmrcPath = path.join(process.cwd(), '.npmrc');
  const hasCompleteNpmrc = fs.existsSync(npmrcPath) && 
    fs.readFileSync(npmrcPath, 'utf8').includes('strict-peer-dependencies=false');
  
  console.log('\n🔍 COMPATIBILITY CHECK COMPLETE\n');
  
  if (problematicDeps.length > 0) {
    console.log('RECOMMENDATIONS:');
    
    // Dynamic recommendations based on current state
    const pendingRecommendations = [];
    pendingRecommendations.push('Check for updated versions of incompatible libraries that support Tailwind v4');
    
    if (!hasCompleteResolutions) {
      pendingRecommendations.push('Use package.json resolutions/overrides to force dependency versions');
    }
    
    pendingRecommendations.push('Consider using patch-package to manually patch incompatible dependencies');
    
    if (isPnpm && !hasCompleteNpmrc) {
      pendingRecommendations.push('For pnpm, add appropriate configuration to .npmrc');
    }
    
    // Output numbered recommendations
    pendingRecommendations.forEach((rec, idx) => {
      console.log(`${idx + 1}. ${rec}`);
    });
    
    // Show .npmrc recommendations only if needed
    if (isPnpm && !hasCompleteNpmrc) {
      console.log(`
# Suggested .npmrc configuration
strict-peer-dependencies=false
resolution-mode=highest
auto-install-peers=true
shamefully-hoist=true`);
    }
    
    // Only show package.json recommendations if not already configured
    if (!hasCompleteResolutions || !hasCompletePnpmConfig) {
      // Generate template for package.json resolutions
      console.log('\nSuggested package.json modifications:');
      
      const resolutionsTemplate = {};
      const overridesTemplate = {};
      const pnpmOverridesTemplate = {};
      
      problematicDeps.forEach(dep => {
        if (dep === '@nextui-org/theme' || dep === '@nextui-org/react') {
          const tailwindVersion = allDeps.tailwindcss.replace(/[\^~]/g, '');
          
          if (!hasCompleteResolutions) {
            resolutionsTemplate[`${dep}/tailwindcss`] = tailwindVersion;
            overridesTemplate[dep] = {
              "tailwindcss": tailwindVersion
            };
          }
          
          if (isPnpm && !hasCompletePnpmConfig) {
            pnpmOverridesTemplate[`${dep}>tailwindcss`] = tailwindVersion;
          }
        }
      });
      
      const suggestions = {};
      
      if (!hasCompleteResolutions) {
        suggestions.resolutions = resolutionsTemplate;
        suggestions.overrides = overridesTemplate;
      }
      
      if (isPnpm && !hasCompletePnpmConfig) {
        suggestions.pnpm = { overrides: pnpmOverridesTemplate };
      }
      
      if (Object.keys(suggestions).length > 0) {
        console.log(JSON.stringify(suggestions, null, 2));
      }
    }
    
    // Always show patch-package recommendation for NextUI
    if (problematicDeps.includes('@nextui-org/react') || problematicDeps.includes('@nextui-org/theme')) {
      console.log('\nSuggested patch-package example for NextUI:');
      console.log(`
// First, modify the node_modules/@nextui-org/theme/package.json file
// Change: "tailwindcss": "^3.4.0"
// To:     "tailwindcss": ">=3.4.0 || ^4.0.0"
// Then run:
npx patch-package @nextui-org/theme
`);
    }
    
    // Add reference to the detailed guides
    console.log('\nNOTE: For complete step-by-step instructions, refer to:');
    console.log('- docs/TAILWIND_DIAGNOSTIC_PROTOCOL.md');
    console.log('- TAILWIND_V4_COMPATIBILITY_STEPS.md');
  }
}

validateTailwindV4Compatibility();
