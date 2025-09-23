/**
 * Validates that necessary patches for Tailwind CSS v4 compatibility 
 * have been applied correctly
 */
const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

/**
 * Validates that necessary patches are in place
 */
async function validateTailwindPatches() {
  console.log('\n🔍 TAILWIND CSS V4 PATCH VALIDATION\n');
  
  // Check for patch-package installation
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    console.log('❌ Error: package.json not found!');
    return;
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const devDeps = packageJson.devDependencies || {};
  const scripts = packageJson.scripts || {};
  
  // Check for patch-package
  if (!devDeps['patch-package']) {
    console.log('❌ patch-package not installed. Run:');
    console.log('   npm install --save-dev patch-package postinstall-postinstall');
    console.log('   or');
    console.log('   pnpm add -D patch-package postinstall-postinstall');
    return;
  } else {
    console.log('✅ patch-package is installed');
  }
  
  // Check for postinstall script
  if (!scripts.postinstall || !scripts.postinstall.includes('patch-package')) {
    console.log('⚠️ No postinstall script found for patch-package. Add to package.json:');
    console.log('   "scripts": {');
    console.log('     "postinstall": "patch-package"');
    console.log('   }');
  } else {
    console.log('✅ postinstall script is configured');
  }
  
  // Check for patches directory and NextUI patches
  const patchesDir = path.join(process.cwd(), 'patches');
  if (!fs.existsSync(patchesDir)) {
    console.log('⚠️ No patches directory found. Patches may not be created yet.');
  } else {
    console.log('✅ patches directory exists');
    
    // Check specifically for NextUI patches
    const files = fs.readdirSync(patchesDir);
    
    // For pnpm-style patches (using directories)
    const nextUIPatches = files.filter(file => file.startsWith('@nextui-org'));
    const hasPnpmStylePatches = nextUIPatches.length > 0;
    
    // For npm-style patches (using files)
    const directPatches = files.filter(file => file.includes('@nextui-org') && file.endsWith('.patch'));
    const hasDirectPatches = directPatches.length > 0;
    
    if (!hasPnpmStylePatches && !hasDirectPatches) {
      console.log('❌ No NextUI patches found. Follow these steps:');
      console.log('   1. Find your NextUI theme package:');
      console.log('      - Look in node_modules/@nextui-org/theme');
      console.log('      - For pnpm, try: pnpm list @nextui-org/theme --parseable');
      console.log('   2. Edit package.json within that directory:');
      console.log('      Change: "tailwindcss": "^3.4.0"');
      console.log('      To:     "tailwindcss": ">=3.4.0 || ^4.0.0"');
      console.log('   3. Create the patch:');
      console.log('      npx patch-package @nextui-org/theme');
    } else {
      if (hasPnpmStylePatches) {
        console.log(`✅ Found ${nextUIPatches.length} NextUI patch directories: ${nextUIPatches.join(', ')}`);
        
        // Verify patch content for pnpm-style patches
        let foundValidPatch = false;
        
        for (const patchDir of nextUIPatches) {
          const patchDirPath = path.join(patchesDir, patchDir);
          
          if (fs.statSync(patchDirPath).isDirectory()) {
            const themeVersions = fs.readdirSync(patchDirPath);
            
            for (const version of themeVersions) {
              const versionDirPath = path.join(patchDirPath, version);
              
              if (fs.statSync(versionDirPath).isDirectory()) {
                const patchFiles = fs.readdirSync(versionDirPath);
                
                for (const patchFile of patchFiles) {
                  if (patchFile.endsWith('.patch')) {
                    const fullPatchPath = path.join(versionDirPath, patchFile);
                    const patchContent = fs.readFileSync(fullPatchPath, 'utf8');
                    
                    if (patchContent.includes('>=3.4.0 || ^4.0.0') || 
                        patchContent.includes('>=3.4.0 || ^4') ||
                        patchContent.includes('^4.0.0')) {
                      console.log(`✅ Patch ${patchFile} contains correct Tailwind compatibility fix`);
                      foundValidPatch = true;
                    } else {
                      console.log(`⚠️ Patch ${patchFile} may not contain the proper Tailwind v4 compatibility fix`);
                      console.log('   The patch should modify the tailwindcss peer dependency to include v4');
                    }
                  }
                }
              }
            }
          }
        }
        
        if (!foundValidPatch) {
          console.log('⚠️ Found patch directories but no valid patch files with Tailwind v4 compatibility fixes');
        }
      }
      
      if (hasDirectPatches) {
        console.log(`✅ Found ${directPatches.length} direct NextUI patches: ${directPatches.join(', ')}`);
        
        // Verify patch content for npm-style patches
        for (const patchFile of directPatches) {
          const patchPath = path.join(patchesDir, patchFile);
          const patchContent = fs.readFileSync(patchPath, 'utf8');
          
          if (patchContent.includes('>=3.4.0 || ^4.0.0') || 
              patchContent.includes('>=3.4.0 || ^4') ||
              patchContent.includes('^4.0.0')) {
            console.log(`✅ Patch ${patchFile} contains correct Tailwind compatibility fix`);
          } else {
            console.log(`⚠️ Patch ${patchFile} may not contain the proper Tailwind v4 compatibility fix`);
            console.log('   The patch should modify the tailwindcss peer dependency to include v4');
          }
        }
      }
    }
  }
  
  // Check if NextUI modules are installed
  try {
    const { stdout: nextUIPath } = await exec('pnpm list @nextui-org/theme --parseable');
    console.log('✅ Found @nextui-org/theme at:', nextUIPath.trim());
  } catch (e) {
    console.log('⚠️ Could not find @nextui-org/theme using pnpm list');
    console.log('   Make sure dependencies are installed properly');
  }
  
  console.log('\n🔍 PATCH VALIDATION COMPLETE\n');
  
  // Summary and next steps
  console.log('SUMMARY:');
  console.log('1. patch-package: ' + (devDeps['patch-package'] ? '✅ Installed' : '❌ Missing'));
  console.log('2. postinstall script: ' + (scripts.postinstall && scripts.postinstall.includes('patch-package') ? '✅ Configured' : '❌ Missing'));
  
  // Check for patches in various formats
  const hasNextUIPatch = fs.existsSync(patchesDir) && (
    fs.readdirSync(patchesDir).some(file => file.startsWith('@nextui-org')) ||
    fs.readdirSync(patchesDir).some(file => file.includes('@nextui-org') && file.endsWith('.patch'))
  );
  
  console.log('3. NextUI patches: ' + (hasNextUIPatch ? '✅ Created' : '❌ Missing'));
  
  console.log('\nNext steps:');
  if (!devDeps['patch-package']) {
    console.log('- Install patch-package and postinstall-postinstall');
  }
  if (!scripts.postinstall || !scripts.postinstall.includes('patch-package')) {
    console.log('- Add postinstall script to package.json');
  }
  if (!fs.existsSync(patchesDir) || !hasNextUIPatch) {
    console.log('- Create patches for NextUI theme package');
  }
  console.log('- Run pnpm install to apply patches');
  console.log('- Test your application with Tailwind v4 and NextUI');
}

validateTailwindPatches();
