#!/usr/bin/env python3
"""
ARCO Intelligent Codebase Analyzer & Refactoring Tool
Analyzes existing components and selects the best ones based on real metrics
"""

import os
import re
import json
from pathlib import Path
from typing import Dict, List, Tuple, Any
from dataclasses import dataclass, asdict
import subprocess

@dataclass
class ComponentMetrics:
    file_path: str
    name: str
    lines_of_code: int
    complexity_score: int
    typescript_errors: int
    import_count: int
    export_type: str
    has_tests: bool
    has_types: bool
    has_documentation: bool
    performance_score: int
    reusability_score: int
    maturity_score: int

class ARCOCodebaseAnalyzer:
    def __init__(self, root_path: str):
        self.root = Path(root_path)
        self.components = []
        self.hero_components = []
        self.navigation_components = []
        self.container_components = []
        
    def analyze_file(self, file_path: Path) -> ComponentMetrics:
        """Analyze a single TypeScript/JSX file for quality metrics"""
        try:
            content = file_path.read_text(encoding='utf-8')
            
            # Basic metrics
            lines = content.split('\n')
            loc = len([line for line in lines if line.strip() and not line.strip().startswith('//')])
            
            # Complexity analysis
            complexity = self._calculate_complexity(content)
            
            # TypeScript analysis
            ts_errors = self._check_typescript_errors(file_path)
            
            # Import/export analysis
            imports = len(re.findall(r'^import\s+.*from', content, re.MULTILINE))
            export_type = self._analyze_exports(content)
            
            # Quality indicators
            has_tests = self._has_tests(file_path)
            has_types = self._has_proper_types(content)
            has_docs = self._has_documentation(content)
            
            # Performance indicators
            perf_score = self._calculate_performance_score(content)
            
            # Reusability score
            reuse_score = self._calculate_reusability_score(content)
            
            # Overall maturity
            maturity = self._calculate_maturity_score(
                complexity, ts_errors, has_tests, has_types, has_docs, perf_score
            )
            
            return ComponentMetrics(
                file_path=str(file_path),
                name=file_path.stem,
                lines_of_code=loc,
                complexity_score=complexity,
                typescript_errors=ts_errors,
                import_count=imports,
                export_type=export_type,
                has_tests=has_tests,
                has_types=has_types,
                has_documentation=has_docs,
                performance_score=perf_score,
                reusability_score=reuse_score,
                maturity_score=maturity
            )
            
        except Exception as e:
            print(f"Error analyzing {file_path}: {e}")
            return None
    
    def _calculate_complexity(self, content: str) -> int:
        """Calculate cyclomatic complexity"""
        complexity_indicators = [
            r'\bif\b', r'\belse\b', r'\bswitch\b', r'\bcase\b',
            r'\bfor\b', r'\bwhile\b', r'\btry\b', r'\bcatch\b',
            r'\?\s*.*:', r'&&', r'\|\|'
        ]
        
        complexity = 1  # Base complexity
        for pattern in complexity_indicators:
            complexity += len(re.findall(pattern, content))
        
        return min(complexity, 100)  # Cap at 100
    
    def _check_typescript_errors(self, file_path: Path) -> int:
        """Check TypeScript errors using tsc"""
        try:
            result = subprocess.run([
                'npx', 'tsc', '--noEmit', '--skipLibCheck', str(file_path)
            ], capture_output=True, text=True, cwd=self.root)
            
            if result.returncode == 0:
                return 0
            
            errors = len(re.findall(r'error TS\d+:', result.stderr))
            return errors
        except:
            return 0  # Assume no errors if can't check
    
    def _analyze_exports(self, content: str) -> str:
        """Analyze export patterns"""
        if 'export default' in content:
            return 'default'
        elif 'export {' in content or 'export const' in content:
            return 'named'
        else:
            return 'none'
    
    def _has_tests(self, file_path: Path) -> bool:
        """Check if component has tests"""
        test_patterns = [
            f"{file_path.stem}.test.tsx",
            f"{file_path.stem}.test.ts",
            f"__tests__/{file_path.stem}.test.tsx"
        ]
        
        return any((file_path.parent / pattern).exists() for pattern in test_patterns)
    
    def _has_proper_types(self, content: str) -> bool:
        """Check for proper TypeScript usage"""
        type_indicators = [
            r'interface\s+\w+', r'type\s+\w+\s*=', r':\s*\w+',
            r'React\.FC', r'React\.Component', r'React\.ReactNode'
        ]
        
        return any(re.search(pattern, content) for pattern in type_indicators)
    
    def _has_documentation(self, content: str) -> bool:
        """Check for JSDoc or other documentation"""
        doc_patterns = [
            r'/\*\*[\s\S]*?\*/', r'@param', r'@returns', r'@example'
        ]
        
        return any(re.search(pattern, content) for pattern in doc_patterns)
    
    def _calculate_performance_score(self, content: str) -> int:
        """Calculate performance score based on best practices"""
        score = 50  # Base score
        
        # Performance indicators
        perf_good = [
            r'React\.memo', r'useMemo', r'useCallback', r'lazy\(',
            r'Suspense', r'dynamic\(', r'loading.*=.*>'
        ]
        
        perf_bad = [
            r'console\.log', r'debugger', r'alert\(',
            r'document\.write', r'eval\('
        ]
        
        for pattern in perf_good:
            if re.search(pattern, content):
                score += 10
        
        for pattern in perf_bad:
            if re.search(pattern, content):
                score -= 15
        
        return max(0, min(100, score))
    
    def _calculate_reusability_score(self, content: str) -> int:
        """Calculate how reusable the component is"""
        score = 50  # Base score
        
        # Reusability indicators
        if 'interface' in content or 'type' in content:
            score += 15
        
        if 'Props' in content:
            score += 10
        
        if 'className' in content:
            score += 10
        
        if re.search(r'children.*React\.ReactNode', content):
            score += 15
        
        # Negative indicators
        if 'hardcoded' in content.lower() or 'TODO' in content:
            score -= 10
        
        if len(re.findall(r'specific|custom|hack', content, re.IGNORECASE)) > 0:
            score -= 5
        
        return max(0, min(100, score))
    
    def _calculate_maturity_score(self, complexity: int, errors: int, has_tests: bool,
                                has_types: bool, has_docs: bool, perf_score: int) -> int:
        """Calculate overall maturity score"""
        score = 0
        
        # Complexity (lower is better)
        if complexity < 10:
            score += 25
        elif complexity < 20:
            score += 15
        elif complexity < 30:
            score += 5
        
        # TypeScript errors (fewer is better)
        score += max(0, 20 - errors * 5)
        
        # Quality indicators
        if has_tests:
            score += 20
        if has_types:
            score += 15
        if has_docs:
            score += 10
        
        # Performance
        score += perf_score * 0.1
        
        return max(0, min(100, score))

    def scan_components(self):
        """Scan all components and categorize them"""
        component_patterns = [
            "src/components/**/*.tsx",
            "src/design-system/**/*.tsx",
            "src/sections/**/*.tsx"
        ]
        
        all_files = []
        for pattern in component_patterns:
            all_files.extend(self.root.glob(pattern))
        
        print(f"Found {len(all_files)} component files to analyze...")
        
        for file_path in all_files:
            if file_path.is_file():
                metrics = self.analyze_file(file_path)
                if metrics:
                    self.components.append(metrics)
                    
                    # Categorize components
                    name_lower = metrics.name.lower()
                    if 'hero' in name_lower:
                        self.hero_components.append(metrics)
                    elif 'nav' in name_lower or 'header' in name_lower:
                        self.navigation_components.append(metrics)
                    elif 'container' in name_lower:
                        self.container_components.append(metrics)
    
    def find_best_components(self) -> Dict[str, List[ComponentMetrics]]:
        """Find the best components in each category"""
        categories = {
            'hero': self.hero_components,
            'navigation': self.navigation_components,
            'container': self.container_components
        }
        
        results = {}
        
        for category, components in categories.items():
            if not components:
                results[category] = []
                continue
            
            # Sort by maturity score (descending)
            sorted_components = sorted(
                components, 
                key=lambda x: x.maturity_score, 
                reverse=True
            )
            
            # Take only the top 2-3 components
            results[category] = sorted_components[:3]
            
        return results
    
    def generate_cleanup_plan(self, best_components: Dict[str, List[ComponentMetrics]]) -> Dict[str, Any]:
        """Generate intelligent cleanup plan"""
        plan = {
            'keep': [],
            'remove': [],
            'refactor': [],
            'statistics': {}
        }
        
        # Components to keep (best ones)
        for category, components in best_components.items():
            for comp in components:
                plan['keep'].append({
                    'file': comp.file_path,
                    'reason': f'Best {category} component (maturity: {comp.maturity_score})',
                    'category': category
                })
        
        # Components to remove (duplicates and low quality)
        keep_files = {comp['file'] for comp in plan['keep']}
        
        for category, all_components in [
            ('hero', self.hero_components),
            ('navigation', self.navigation_components),
            ('container', self.container_components)
        ]:
            for comp in all_components:
                if comp.file_path not in keep_files:
                    if comp.maturity_score < 30 or comp.typescript_errors > 3:
                        plan['remove'].append({
                            'file': comp.file_path,
                            'reason': f'Low quality {category} component (maturity: {comp.maturity_score}, errors: {comp.typescript_errors})',
                            'category': category
                        })
                    else:
                        plan['refactor'].append({
                            'file': comp.file_path,
                            'reason': f'Good {category} component but needs refactoring',
                            'category': category
                        })
        
        # Statistics
        plan['statistics'] = {
            'total_components': len(self.components),
            'components_to_keep': len(plan['keep']),
            'components_to_remove': len(plan['remove']),
            'components_to_refactor': len(plan['refactor']),
            'cleanup_percentage': round((len(plan['remove']) / len(self.components)) * 100, 1)
        }
        
        return plan
    
    def execute_cleanup(self, plan: Dict[str, Any], dry_run: bool = True):
        """Execute the cleanup plan"""
        print(f"\n{'=== DRY RUN ===' if dry_run else '=== EXECUTING CLEANUP ==='}")
        print(f"Total components: {plan['statistics']['total_components']}")
        print(f"Keeping: {plan['statistics']['components_to_keep']}")
        print(f"Removing: {plan['statistics']['components_to_remove']}")
        print(f"Refactoring: {plan['statistics']['components_to_refactor']}")
        print(f"Cleanup percentage: {plan['statistics']['cleanup_percentage']}%")
        
        if not dry_run:
            # Remove files
            for item in plan['remove']:
                file_path = Path(item['file'])
                if file_path.exists():
                    file_path.unlink()
                    print(f"Removed: {item['file']}")
        
        return plan

def main():
    """Main execution function"""
    analyzer = ARCOCodebaseAnalyzer(".")
    
    print("ARCO Intelligent Codebase Analysis Starting...")
    print("=" * 50)
    
    # Step 1: Scan all components
    analyzer.scan_components()
    
    # Step 2: Find best components
    best_components = analyzer.find_best_components()
    
    print("\nBest Components Found:")
    for category, components in best_components.items():
        print(f"\n{category.upper()}:")
        for i, comp in enumerate(components, 1):
            print(f"  {i}. {comp.name} (maturity: {comp.maturity_score}, loc: {comp.lines_of_code})")
    
    # Step 3: Generate cleanup plan
    cleanup_plan = analyzer.generate_cleanup_plan(best_components)
    
    # Step 4: Save analysis results
    with open('arco_analysis_results.json', 'w') as f:
        json.dump({
            'best_components': {k: [asdict(comp) for comp in v] for k, v in best_components.items()},
            'cleanup_plan': cleanup_plan
        }, f, indent=2)
    
    print(f"\nAnalysis complete! Results saved to arco_analysis_results.json")
    
    # Step 5: Execute cleanup (dry run first)
    analyzer.execute_cleanup(cleanup_plan, dry_run=True)
    
    print("\nTo execute the cleanup for real, run:")
    print("python scripts/arco_analyzer.py --execute")

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == "--execute":
        analyzer = ARCOCodebaseAnalyzer(".")
        analyzer.scan_components()
        best_components = analyzer.find_best_components()
        cleanup_plan = analyzer.generate_cleanup_plan(best_components)
        analyzer.execute_cleanup(cleanup_plan, dry_run=False)
    else:
        main()
