/**
 * Validate whether required patches for Tailwind CSS v4 compatibility are applied
 */

const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function validatePatches() {
  console.log('\n🔍 VALIDATING PATCH CONFIGURATION\n');

  // Check for patch-package as a dependency
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    console.log('❌ Error: package.json not found!');
    return;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const devDeps = packageJson.devDependencies || {};

  // Check if patch-package is installed
  if (!devDeps['patch-package']) {
    console.log('❌ patch-package is not installed as a dev dependency');
    console.log('   Run: pnpm add -D patch-package postinstall-postinstall');
    return;
  } else {
    console.log('✅ patch-package is installed');
  }

  // Check for postinstall script
  const scripts = packageJson.scripts || {};
  if (!scripts.postinstall || !scripts.postinstall.includes('patch-package')) {
    console.log('❌ No postinstall script found for applying patches');
    console.log('   Add to package.json scripts: "postinstall": "patch-package"');
  } else {
    console.log('✅ postinstall script configured correctly');
  }

  // Check if patches directory exists
  const patchesDir = path.join(process.cwd(), 'patches');
  if (!fs.existsSync(patchesDir)) {
    console.log('❌ patches directory does not exist');
    console.log('   Create it with: mkdir patches');
    return;
  } else {
    console.log('✅ patches directory exists');
  }

  // Check for NextUI patches
  const nextUiPatches = fs.readdirSync(patchesDir)
    .filter(file => file.startsWith('@nextui-org+') || file.startsWith('nextui-org+'));

  if (nextUiPatches.length === 0) {
    console.log('❌ No patches found for NextUI components');
    console.log('   Follow instructions in TAILWIND_V4_COMPATIBILITY_STEPS.md to create patches');
  } else {
    console.log(`✅ Found ${nextUiPatches.length} patches for NextUI components:`);
    nextUiPatches.forEach(patch => {
      console.log(`   - ${patch}`);
    });
  }

  // Look for NextUI in node_modules and check package.json
  try {
    const result = await exec('find node_modules -path "*nextui*theme*package.json" | head -n 1');
    if (result.stdout.trim()) {
      const themePackageJsonPath = result.stdout.trim();
      console.log(`✅ Found NextUI theme package at: ${themePackageJsonPath}`);

      // Check if it's been patched
      const themePackageJson = JSON.parse(fs.readFileSync(themePackageJsonPath, 'utf8'));
      const tailwindPeerDep = themePackageJson.peerDependencies?.tailwindcss;
      
      if (tailwindPeerDep && tailwindPeerDep.includes('4.0.0')) {
        console.log('✅ NextUI theme package.json has been patched to support Tailwind v4');
      } else {
        console.log('❌ NextUI theme package.json has not been patched:');
        console.log(`   Current tailwindcss peer dependency: ${tailwindPeerDep}`);
        console.log('   Should be: ">=3.4.0 || ^4.0.0"');
      }
    } else {
      console.log('❌ Could not locate NextUI theme package in node_modules');
    }
  } catch (error) {
    console.log('❌ Error checking NextUI package.json:', error.message);
  }
  
  console.log('\n🔍 PATCH VALIDATION COMPLETE\n');
}

validatePatches().catch(console.error);
