/**
 * ARCO ENTERPRISE - Class Diagnostic Tool
 * Verifica se todas as classes executivas estão sendo reconhecidas
 */

const fs = require('fs');
const path = require('path');

// Lista de classes executivas que devem estar presentes
const EXECUTIVE_CLASSES = [
  'executive-container',
  'executive-section',
  'executive-grid-2',
  'executive-grid-3',
  'executive-grid-4',
  'executive-headline-hero',
  'executive-headline-section',
  'executive-headline-secondary',
  'executive-subheadline',
  'executive-body-hero',
  'executive-body-section',
  'executive-text-gradient',
  'executive-button-primary',
  'executive-button-secondary',
  'executive-card',
  'executive-badge',
  'py-executive-4xl',
  'py-executive-5xl',
  'px-executive-xl',
  'px-executive-2xl',
  'gap-executive-lg',
  'gap-executive-xl',
  'gap-executive-2xl',
  'text-executive-base',
  'text-executive-lg',
  'text-executive-xl',
  'text-executive-2xl',
  'text-executive-3xl',
  'text-executive-4xl',
  'text-executive-5xl',
  'text-executive-6xl',
  'rounded-executive-lg',
  'shadow-executive-md',
  'shadow-executive-lg',
];

async function diagnoseTailwindOutput() {
  console.log('🔍 ARCO ENTERPRISE - Class Diagnostic Tool');
  console.log('============================================\n');

  // Verifica se o arquivo de teste existe
  const testFile = path.join(__dirname, '..', 'test-robust-config.css');
  
  if (!fs.existsSync(testFile)) {
    console.log('❌ Test CSS file not found. Run: npx tailwindcss -i ./src/styles/globals.css -o ./test-robust-config.css');
    return;
  }

  const cssContent = fs.readFileSync(testFile, 'utf8');
  console.log(`📄 CSS file size: ${(cssContent.length / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📊 Total characters: ${cssContent.length.toLocaleString()}\n`);

  let foundClasses = 0;
  let missingClasses = [];

  console.log('🎯 Checking Executive Classes:');
  console.log('──────────────────────────────\n');

  EXECUTIVE_CLASSES.forEach((className) => {
    const regex = new RegExp(`\\.${className}\\s*\\{`, 'g');
    const matches = cssContent.match(regex);
    
    if (matches && matches.length > 0) {
      console.log(`✅ ${className} - Found ${matches.length} instances`);
      foundClasses++;
    } else {
      console.log(`❌ ${className} - NOT FOUND`);
      missingClasses.push(className);
    }
  });

  console.log('\n📊 SUMMARY');
  console.log('───────────');
  console.log(`✅ Found: ${foundClasses}/${EXECUTIVE_CLASSES.length} classes`);
  console.log(`❌ Missing: ${missingClasses.length} classes`);
  console.log(`📈 Success Rate: ${((foundClasses / EXECUTIVE_CLASSES.length) * 100).toFixed(1)}%\n`);

  if (missingClasses.length > 0) {
    console.log('❌ MISSING CLASSES:');
    missingClasses.forEach(cls => console.log(`   - ${cls}`));
    console.log('\n💡 Add missing classes to safelist in tailwind.config.js');
  } else {
    console.log('🎉 All executive classes are present in the compiled CSS!');
    console.log('🚀 Your Tailwind configuration is working correctly.');
  }

  // Verifica padrões específicos
  console.log('\n🔍 PATTERN ANALYSIS:');
  console.log('────────────────────');
  
  const executivePatterns = [
    { name: 'Executive Typography', pattern: /text-executive-\w+/g },
    { name: 'Executive Spacing', pattern: /p[xy]?-executive-\w+/g },
    { name: 'Executive Gaps', pattern: /gap-executive-\w+/g },
    { name: 'Executive Borders', pattern: /rounded-executive-\w+/g },
    { name: 'Executive Shadows', pattern: /shadow-executive-\w+/g },
  ];

  executivePatterns.forEach(({ name, pattern }) => {
    const matches = cssContent.match(pattern);
    const uniqueMatches = matches ? [...new Set(matches)] : [];
    console.log(`${name}: ${uniqueMatches.length} unique classes`);
  });
}

// Execute diagnostic
diagnoseTailwindOutput().catch(console.error);
