/**
 * Clean CSS - Remove unused executive classes
 */

const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../src/styles/globals.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

console.log('Starting CSS cleanup...');

// Remove the entire executive design system components section
const executiveStart = cssContent.indexOf('/* ========================================');
const executiveEnd = cssContent.indexOf('/* Existing code continued... */}');

if (executiveStart !== -1 && executiveEnd !== -1) {
    const before = cssContent.substring(0, executiveStart);
    const after = cssContent.substring(executiveEnd + '/* Existing code continued... */}'.length);
    
    cssContent = before + after;
    console.log('Removed executive design system section');
}

// Clean up any remaining executive classes that might be scattered
const executiveClassRegex = /^\s*\/\*.*executive.*\*\/\s*$|^\s*\.executive-[\w-]+[^}]*\{[^}]*\}\s*$/gmi;
cssContent = cssContent.replace(executiveClassRegex, '');

// Clean up multiple empty lines
cssContent = cssContent.replace(/\n\s*\n\s*\n/g, '\n\n');

// Clean up any remaining comments about executive system
cssContent = cssContent.replace(/\/\*[^*]*EXECUTIVE[^*]*\*\/\s*/gi, '');

// Write the cleaned CSS back
fs.writeFileSync(cssPath, cssContent);

console.log('CSS cleanup completed successfully!');
console.log('All executive classes have been removed.');
console.log('Components now use only Tailwind utility classes.');
