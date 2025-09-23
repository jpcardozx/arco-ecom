/**
 * ARCO Project - Tailwind Usage Analyzer
 * 
 * Este script analisa componentes React para identificar os que não estão
 * usando classes do Tailwind adequadamente.
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// ANSI color codes for output formatting
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bright: '\x1b[1m',
};

console.log(`${colors.magenta}${colors.bright}==== ARCO Project Tailwind Usage Analyzer ====${colors.reset}\n`);

// Directories to scan
const directories = [
  './components',
  './src/components',
];

// Regex patterns for detecting Tailwind usage
const patterns = {
  // Looking for className props with tailwind classes
  tailwindClasses: /className=["'`]([^"'`]*(?:text-|bg-|flex|grid|p-|m-|rounded|border|shadow)[^"'`]*)["'`]/g,
  // Looking for JSX/TSX components that should have styling
  jsxComponents: /<([A-Z][A-Za-z0-9]*|div|span|p|h[1-6]|ul|li|section|main|header|footer|nav)[^>]*>/g,
  // Flag components using direct style attributes instead of Tailwind
  inlineStyles: /style=\{?\{[^}]+\}\}?/g,
};

// Track statistics
const stats = {
  totalFiles: 0,
  usingTailwind: 0,
  notUsingTailwind: 0,
  usingInlineStyles: 0,
};

// Results storage
const results = {
  noTailwindClasses: [],
  usingInlineStyles: [],
  goodExamples: [],
};

// Function to analyze a file for Tailwind usage
function analyzeFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath);
    
    stats.totalFiles++;
    
    // Check if file contains Tailwind classes
    const tailwindMatches = content.match(patterns.tailwindClasses) || [];
    const jsxMatches = content.match(patterns.jsxComponents) || [];
    const inlineStyleMatches = content.match(patterns.inlineStyles) || [];
    
    // Components with JSX but no Tailwind classes may have styling issues
    if (jsxMatches.length > 0 && tailwindMatches.length === 0) {
      stats.notUsingTailwind++;
      results.noTailwindClasses.push({
        file: filePath,
        jsxCount: jsxMatches.length,
      });
    } 
    
    // Flag components using inline styles instead of Tailwind
    if (inlineStyleMatches.length > 0) {
      stats.usingInlineStyles++;
      results.usingInlineStyles.push({
        file: filePath,
        inlineStyleCount: inlineStyleMatches.length,
      });
    }
    
    // Track good examples of Tailwind usage
    if (tailwindMatches.length > 0 && inlineStyleMatches.length === 0) {
      stats.usingTailwind++;
      
      // Save some good examples for reference
      if (results.goodExamples.length < 5) {
        const tailwindClassSamples = tailwindMatches.slice(0, 3).map(match => {
          // Extract just the class name from the match
          return match.replace(/className=["'`]([^"'`]*)["'`]/, '$1');
        });
        
        results.goodExamples.push({
          file: filePath,
          examples: tailwindClassSamples,
        });
      }
    }
  } catch (err) {
    console.error(`${colors.red}Error analyzing file ${filePath}:${colors.reset}`, err);
  }
}

// Process all directories
directories.forEach(directory => {
  if (fs.existsSync(directory)) {
    const files = glob.sync(`${directory}/**/*.{tsx,jsx}`);
    
    console.log(`${colors.blue}Scanning ${files.length} files in ${directory}...${colors.reset}`);
    
    files.forEach(file => {
      analyzeFile(file);
    });
  }
});

// Display results
console.log(`\n${colors.bright}${colors.cyan}==== Analysis Results ====${colors.reset}`);
console.log(`\n${colors.yellow}Stats:${colors.reset}`);
console.log(`Total files scanned: ${stats.totalFiles}`);
console.log(`Files using Tailwind properly: ${colors.green}${stats.usingTailwind}${colors.reset}`);
console.log(`Files not using Tailwind classes: ${colors.red}${stats.notUsingTailwind}${colors.reset}`);
console.log(`Files using inline styles: ${colors.yellow}${stats.usingInlineStyles}${colors.reset}`);

if (results.noTailwindClasses.length > 0) {
  console.log(`\n${colors.yellow}Components without Tailwind classes:${colors.reset}`);
  results.noTailwindClasses.forEach(item => {
    console.log(`- ${item.file} (${item.jsxCount} JSX elements)`);
  });
}

if (results.usingInlineStyles.length > 0) {
  console.log(`\n${colors.yellow}Components using inline styles:${colors.reset}`);
  results.usingInlineStyles.forEach(item => {
    console.log(`- ${item.file} (${item.inlineStyleCount} inline styles)`);
  });
}

if (results.goodExamples.length > 0) {
  console.log(`\n${colors.green}Good examples of Tailwind usage:${colors.reset}`);
  results.goodExamples.forEach(item => {
    console.log(`- ${item.file}:`);
    item.examples.forEach((example, i) => {
      console.log(`  ${i+1}. className="${example}"`);
    });
  });
}

// Save results to a file for easier reference
const outputFile = './tailwind-analysis.json';
fs.writeFileSync(outputFile, JSON.stringify({
  stats,
  results,
}, null, 2));

console.log(`\n${colors.green}Analysis complete! Results saved to ${outputFile}${colors.reset}`);
console.log(`\n${colors.cyan}Recommendations:${colors.reset}`);
console.log(`1. Replace inline styles with equivalent Tailwind classes`);
console.log(`2. Add appropriate Tailwind classes to components currently not using any`);
console.log(`3. For complex styling, consider creating custom Tailwind components using @apply`);
