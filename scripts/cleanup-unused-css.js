/**
 * Script to identify unused executive CSS classes
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Read globals.css
const cssPath = path.join(__dirname, '../src/styles/globals.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');

// Extract all executive class definitions
const executiveClasses = [];
const classMatches = cssContent.match(/\.executive-[\w-]+/g);
if (classMatches) {
    classMatches.forEach(match => {
        const className = match.substring(1); // Remove the '.'
        if (!executiveClasses.includes(className)) {
            executiveClasses.push(className);
        }
    });
}

console.log(`Found ${executiveClasses.length} executive classes in CSS`);

// Search for usage in TypeScript/JSX files
const componentsPattern = path.join(__dirname, '../src/**/*.{tsx,ts,jsx,js}');
const componentFiles = glob.sync(componentsPattern);

const usedClasses = new Set();
const unusedClasses = [];

componentFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    executiveClasses.forEach(className => {
        if (content.includes(className)) {
            usedClasses.add(className);
        }
    });
});

executiveClasses.forEach(className => {
    if (!usedClasses.has(className)) {
        unusedClasses.push(className);
    }
});

console.log('\n=== UNUSED EXECUTIVE CLASSES ===');
console.log(`Unused: ${unusedClasses.length}`);
console.log(`Used: ${usedClasses.size}`);

if (unusedClasses.length > 0) {
    console.log('\nUnused classes:');
    unusedClasses.forEach(className => {
        console.log(`- ${className}`);
    });
}

console.log('\n=== USED EXECUTIVE CLASSES ===');
if (usedClasses.size > 0) {
    console.log('Still used classes:');
    [...usedClasses].forEach(className => {
        console.log(`- ${className}`);
    });
}
