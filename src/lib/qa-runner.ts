/**
 * QA Progressive Test Runner
 * Executa testes automatizados durante desenvolvimento
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);

interface QAResult {
  step: string;
  status: 'PASS' | 'FAIL' | 'SKIP';
  message: string;
  duration: number;
}

class QARunner {
  private results: QAResult[] = [];

  async runStep(step: string, testFn: () => Promise<void>): Promise<void> {
    const start = Date.now();
    
    try {
      await testFn();
      this.results.push({
        step,
        status: 'PASS',
        message: 'Test passed successfully',
        duration: Date.now() - start
      });
      console.log(`✅ ${step} - PASS (${Date.now() - start}ms)`);
    } catch (error) {
      this.results.push({
        step,
        status: 'FAIL',
        message: error instanceof Error ? error.message : 'Unknown error',
        duration: Date.now() - start
      });
      console.log(`❌ ${step} - FAIL (${Date.now() - start}ms)`);
      console.log(`   Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async runAllTests(): Promise<void> {
    console.log('🚀 Starting QA Progressive Tests...\n');

    // Test 1: TypeScript Compilation
    await this.runStep('TypeScript Compilation', async () => {
      try {
        await execAsync('npx tsc --noEmit');
      } catch (error) {
        throw new Error('TypeScript compilation failed');
      }
    });

    // Test 2: Design System Components
    await this.runStep('Design System Components', async () => {
      const componentsPath = path.join(process.cwd(), 'src/design-system/glass-components.tsx');
      if (!fs.existsSync(componentsPath)) {
        throw new Error('Design system components not found');
      }
      
      const content = fs.readFileSync(componentsPath, 'utf8');
      if (!content.includes('GlassCard') || !content.includes('GlassButton')) {
        throw new Error('Required glass components not found');
      }
    });

    // Test 3: Page Structure
    await this.runStep('Page Structure', async () => {
      const pagePath = path.join(process.cwd(), 'src/app/page.tsx');
      if (!fs.existsSync(pagePath)) {
        throw new Error('Main page not found');
      }
      
      const content = fs.readFileSync(pagePath, 'utf8');
      if (!content.includes('GlassSection') || !content.includes('dynamic')) {
        throw new Error('Required page structure not found');
      }
    });

    // Test 4: Partner Components
    await this.runStep('Partner Components', async () => {
      const partnerPath = path.join(process.cwd(), 'src/components/partner/PartnerComponents.tsx');
      if (!fs.existsSync(partnerPath)) {
        throw new Error('Partner components not found');
      }
      
      const content = fs.readFileSync(partnerPath, 'utf8');
      if (!content.includes('PartnerHero') || !content.includes('ProjectPortfolio')) {
        throw new Error('Required partner components not found');
      }
    });

    // Test 5: Build Test
    await this.runStep('Build Test', async () => {
      try {
        await execAsync('npm run build');
      } catch (error) {
        throw new Error('Build failed');
      }
    });

    // Summary
    console.log('\n📊 QA Results Summary:');
    const passed = this.results.filter(r => r.status === 'PASS').length;
    const failed = this.results.filter(r => r.status === 'FAIL').length;
    const total = this.results.length;

    console.log(`✅ Passed: ${passed}/${total}`);
    console.log(`❌ Failed: ${failed}/${total}`);
    console.log(`⏱️ Total Duration: ${this.results.reduce((acc, r) => acc + r.duration, 0)}ms`);

    if (failed > 0) {
      console.log('\n🔧 Failed Tests:');
      this.results.filter(r => r.status === 'FAIL').forEach(r => {
        console.log(`   - ${r.step}: ${r.message}`);
      });
    }

    // Save results to file
    const resultsPath = path.join(process.cwd(), 'qa-results.json');
    fs.writeFileSync(resultsPath, JSON.stringify(this.results, null, 2));
    console.log(`\n📄 Results saved to: ${resultsPath}`);
  }
}

// Run tests if called directly
const isMain = import.meta.url === `file://${process.argv[1]}`;
if (isMain) {
  const runner = new QARunner();
  runner.runAllTests().catch(console.error);
}

export default QARunner;
