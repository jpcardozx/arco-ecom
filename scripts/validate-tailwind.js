/**
 * Tailwind CSS Validation Script
 * 
 * This script performs a comprehensive validation of the Tailwind CSS setup
 * in the project, checking for proper configuration files, directives, and integration.
 * 
 * It follows the diagnostic protocol outlined in TAILWIND_DIAGNOSTIC_PROTOCOL.md
 */
const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

/**
 * Validates the complete Tailwind CSS setup
 */
async function validateTailwindSetup() {
  console.log('\n🔍 TAILWIND CSS DIAGNOSTIC VALIDATION\n');
  
  // Keep track of overall validation status
  let allPassed = true;
  
  // Phase 1: Environment & Version Audit
  console.log('📋 PHASE 1: ENVIRONMENT & VERSION AUDIT\n');
  
  try {
    // Get Tailwind and related package versions
    const { stdout: tailwindVersions } = await exec('npm list tailwindcss @tailwindcss/postcss postcss autoprefixer');
    console.log(tailwindVersions);
    
    // Get Next.js and React versions
    const { stdout: nextVersions } = await exec('npm list next react react-dom');
    console.log(nextVersions);
    
    // Check for version conflicts
    const { stdout: conflicts } = await exec('npm ls --depth=0 | findstr /R "tailwind postcss"');
    console.log('\nDependency Conflicts Check:');
    console.log(conflicts);
    
    // Get Node.js and npm versions
    const { stdout: nodeVersion } = await exec('node --version');
    const { stdout: npmVersion } = await exec('npm --version');
    console.log(`\nNode.js version: ${nodeVersion.trim()}`);
    console.log(`npm version: ${npmVersion.trim()}`);
  } catch (error) {
    console.log('⚠️ Error checking versions:', error.message);
  }
  
  console.log('\n📋 PHASE 2: CONFIGURATION ARCHITECTURE ANALYSIS\n');
  
  // Configuration checks
  const checks = [
    {
      name: 'PostCSS Config Exists',
      test: () => fs.existsSync('postcss.config.js'),
    },
    {
      name: 'Tailwind Config Exists',
      test: () => fs.existsSync('tailwind.config.js') || fs.existsSync('tailwind.config.ts'),
    },
    {
      name: 'CSS Files Contain Tailwind Directives',
      test: () => {
        // Check both possible locations for global CSS
        const possiblePaths = [
          'src/app/globals.css',
          'src/styles/globals.css'
        ];
        
        for (const cssPath of possiblePaths) {
          if (fs.existsSync(cssPath)) {
            const content = fs.readFileSync(cssPath, 'utf8');
            return content.includes('@tailwind base') && 
                  content.includes('@tailwind components') && 
                  content.includes('@tailwind utilities');
          }
        }
        return false;
      },
    },
    {
      name: 'Tailwind Config Has Valid Content Paths',
      test: () => {
        try {
          if (!fs.existsSync('tailwind.config.js')) return false;
          
          const configContent = fs.readFileSync('tailwind.config.js', 'utf8');
          // Simple check for content array in config
          return configContent.includes('content:') && 
                 configContent.includes('./src');
        } catch (error) {
          return false;
        }
      }
    },
    {
      name: 'Next.js Config Has Required Settings',
      test: () => {
        try {
          if (!fs.existsSync('next.config.mjs') && !fs.existsSync('next.config.js')) return false;
          
          const configPath = fs.existsSync('next.config.mjs') ? 'next.config.mjs' : 'next.config.js';
          const configContent = fs.readFileSync(configPath, 'utf8');
          
          // Check for common Next.js configuration items
          return configContent.includes('module.exports') || 
                 configContent.includes('export default');
        } catch (error) {
          return false;
        }
      }
    },
    {
      name: 'Package.json Has Required Tailwind Dependencies',
      test: () => {
        try {
          if (!fs.existsSync('package.json')) return false;
          
          const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
          const allDeps = { 
            ...packageJson.dependencies, 
            ...packageJson.devDependencies 
          };
          
          return allDeps.tailwindcss !== undefined && 
                 allDeps.postcss !== undefined && 
                 allDeps.autoprefixer !== undefined;
        } catch (error) {
          return false;
        }
      }
    }
  ];

  // Run each check
  for (const check of checks) {
    const passed = check.test();
    console.log(`${check.name}: ${passed ? '✅ PASS' : '❌ FAIL'}`);
    if (!passed) allPassed = false;
  }

  console.log('\n📋 PHASE 3: BUILD PIPELINE INSPECTION\n');
  console.log('To perform a build pipeline inspection, run:');
  console.log('npm run build | findstr /R "tailwind css error warning"');
  console.log('\nTo examine CSS output files:');
  console.log('dir build\\static\\css /s');

  console.log('\n📋 RECOMMENDATIONS:\n');
  if (!allPassed) {
    console.log('❗ Issues were found with your Tailwind CSS configuration.');
    console.log('🔧 Please refer to the TAILWIND_DIAGNOSTIC_PROTOCOL.md document for detailed resolution steps.');
  } else {
    console.log('✅ Basic Tailwind CSS configuration appears valid.');
    console.log('🔍 For a more comprehensive analysis, run a build and examine the output.');
  }
  
  console.log('\n🔍 TAILWIND CSS DIAGNOSTIC COMPLETE\n');
}

// Execute the validation
validateTailwindSetup();
