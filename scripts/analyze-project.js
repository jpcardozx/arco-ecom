const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// Configuration
const config = {
  componentsDir: path.join(__dirname, '../components'),
  srcDir: path.join(__dirname, '../src'),
  hooksDir: path.join(__dirname, '../hooks'),
  libDir: path.join(__dirname, '../lib'),
  maxDuplicateThreshold: 0.8,
  requiredTests: true,
  requiredDocs: true,
};

// Helper to read file content
const readFileContent = filePath => {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return '';
  }
};

// Check for similar components
const findSimilarComponents = () => {
  const components = fs.readdirSync(config.componentsDir).filter(file => file.endsWith('.tsx'));

  const similarities = [];

  components.forEach((comp1, i) => {
    const content1 = readFileContent(path.join(config.componentsDir, comp1));

    components.slice(i + 1).forEach(comp2 => {
      const content2 = readFileContent(path.join(config.componentsDir, comp2));

      // Simple similarity check (can be improved)
      const similarity = calculateSimilarity(content1, content2);

      if (similarity > config.maxDuplicateThreshold) {
        similarities.push({
          component1: comp1,
          component2: comp2,
          similarity,
        });
      }
    });
  });

  return similarities;
};

// Check test coverage
const checkTestCoverage = () => {
  const components = fs.readdirSync(config.componentsDir).filter(file => file.endsWith('.tsx'));

  const missingTests = components.filter(comp => {
    const testFile = comp.replace('.tsx', '.test.tsx');
    return !fs.existsSync(path.join(config.componentsDir, 'tests', testFile));
  });

  return missingTests;
};

// Check documentation
const checkDocumentation = () => {
  const components = fs.readdirSync(config.componentsDir).filter(file => file.endsWith('.tsx'));

  const missingDocs = components.filter(comp => {
    const content = readFileContent(path.join(config.componentsDir, comp));
    return !hasProperDocumentation(content);
  });

  return missingDocs;
};

// Main analysis function
const analyzeProject = () => {
  console.log(chalk.blue('Starting project analysis...\n'));

  // Check for similar components
  const similarities = findSimilarComponents();
  if (similarities.length > 0) {
    console.log(chalk.yellow('Found potentially similar components:'));
    similarities.forEach(({ component1, component2, similarity }) => {
      console.log(
        chalk.yellow(`  ${component1} and ${component2} (${Math.round(similarity * 100)}% similar)`)
      );
    });
  }

  // Check test coverage
  const missingTests = checkTestCoverage();
  if (missingTests.length > 0) {
    console.log(chalk.red('\nComponents missing tests:'));
    missingTests.forEach(comp => console.log(chalk.red(`  ${comp}`)));
  }

  // Check documentation
  const missingDocs = checkDocumentation();
  if (missingDocs.length > 0) {
    console.log(chalk.red('\nComponents missing proper documentation:'));
    missingDocs.forEach(comp => console.log(chalk.red(`  ${comp}`)));
  }

  console.log(chalk.blue('\nAnalysis complete!'));
};

// Helper functions
const calculateSimilarity = (str1, str2) => {
  // Implement a proper similarity algorithm here
  // This is a simple placeholder
  const length1 = str1.length;
  const length2 = str2.length;
  const maxLength = Math.max(length1, length2);
  const minLength = Math.min(length1, length2);

  return minLength / maxLength;
};

const hasProperDocumentation = content => {
  // Check for JSDoc-style documentation
  return content.includes('/**') && content.includes('*/');
};

// Run analysis
analyzeProject();
