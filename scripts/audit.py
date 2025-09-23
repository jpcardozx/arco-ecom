#!/usr/bin/env python3
"""
ARCO Project Audit & Cleanup
Systematic analysis and organization without overengineering
"""

import os
import json
from pathlib import Path
from collections import defaultdict

class ARCOAuditor:
    def __init__(self):
        self.root = Path.cwd()
        self.duplicates = defaultdict(list)
        self.redundant_folders = []
        self.broken_files = []
        self.empty_folders = []
        
    def scan_directory_structure(self):
        """Map complete project structure"""
        print("🔍 SCANNING PROJECT STRUCTURE")
        print("=" * 50)
        
        structure = {}
        for root, dirs, files in os.walk(self.root):
            rel_path = os.path.relpath(root, self.root)
            if rel_path.startswith('.'):
                continue
                
            structure[rel_path] = {
                'dirs': dirs,
                'files': files,
                'file_count': len(files),
                'purpose': self.identify_folder_purpose(rel_path, files)
            }
            
        return structure
    
    def identify_folder_purpose(self, path, files):
        """Identify what each folder is supposed to do"""
        if 'components' in path.lower():
            return 'COMPONENTS'
        elif 'design-system' in path.lower():
            return 'DESIGN_SYSTEM'
        elif 'pages' in path.lower() or 'app' in path.lower():
            return 'PAGES'
        elif 'scripts' in path.lower():
            return 'SCRIPTS'
        elif 'docs' in path.lower():
            return 'DOCUMENTATION'
        elif any(f.endswith('.tsx') for f in files):
            return 'REACT_COMPONENTS'
        elif any(f.endswith('.ts') for f in files):
            return 'TYPESCRIPT'
        elif any(f.endswith('.md') for f in files):
            return 'MARKDOWN'
        else:
            return 'UNKNOWN'
    
    def find_duplicate_files(self):
        """Find duplicate and similar files"""
        print("\n🔍 FINDING DUPLICATES & REDUNDANCIES")
        print("=" * 50)
        
        file_map = defaultdict(list)
        
        for root, dirs, files in os.walk(self.root):
            if any(skip in root for skip in ['.next', 'node_modules', '.git']):
                continue
                
            for file in files:
                if file.endswith(('.tsx', '.ts', '.js', '.jsx')):
                    full_path = os.path.join(root, file)
                    file_map[file].append(full_path)
        
        # Find actual duplicates
        duplicates = {name: paths for name, paths in file_map.items() if len(paths) > 1}
        
        for name, paths in duplicates.items():
            print(f"🔄 DUPLICATE: {name}")
            for path in paths:
                print(f"   └─ {path}")
        
        return duplicates
    
    def find_empty_folders(self):
        """Find empty or useless folders"""
        print("\n🗂️ FINDING EMPTY/USELESS FOLDERS")
        print("=" * 50)
        
        empty = []
        for root, dirs, files in os.walk(self.root):
            if any(skip in root for skip in ['.next', 'node_modules', '.git']):
                continue
                
            if not dirs and not files:
                empty.append(root)
                print(f"📁 EMPTY: {root}")
            elif not files and all(not os.listdir(os.path.join(root, d)) for d in dirs):
                empty.append(root)
                print(f"📁 USELESS: {root}")
        
        return empty
    
    def analyze_design_system(self):
        """Specific analysis of design system structure"""
        print("\n🎨 DESIGN SYSTEM ANALYSIS")
        print("=" * 50)
        
        design_paths = []
        for root, dirs, files in os.walk(self.root):
            if 'design-system' in root.lower() or 'components' in root.lower():
                design_paths.append({
                    'path': root,
                    'files': [f for f in files if f.endswith(('.tsx', '.ts'))],
                    'type': self.classify_component_folder(root, files)
                })
        
        # Group by type
        by_type = defaultdict(list)
        for item in design_paths:
            by_type[item['type']].append(item)
        
        for comp_type, items in by_type.items():
            print(f"\n📦 {comp_type.upper()}:")
            for item in items:
                print(f"   └─ {item['path']} ({len(item['files'])} files)")
        
        return by_type
    
    def classify_component_folder(self, path, files):
        """Classify what type of component folder this is"""
        path_lower = path.lower()
        
        if 'primitive' in path_lower:
            return 'primitives'
        elif 'layout' in path_lower:
            return 'layout'
        elif 'ui' in path_lower:
            return 'ui_components'
        elif 'section' in path_lower:
            return 'sections'
        elif 'navigation' in path_lower:
            return 'navigation'
        elif any(f == 'index.ts' for f in files):
            return 'barrel_exports'
        else:
            return 'uncategorized'
    
    def find_broken_imports(self):
        """Find files with likely broken imports"""
        print("\n🔗 ANALYZING IMPORT ISSUES")
        print("=" * 50)
        
        broken = []
        for root, dirs, files in os.walk(self.root):
            if any(skip in root for skip in ['.next', 'node_modules', '.git']):
                continue
                
            for file in files:
                if file.endswith(('.tsx', '.ts', '.js', '.jsx')):
                    file_path = os.path.join(root, file)
                    try:
                        with open(file_path, 'r', encoding='utf-8') as f:
                            content = f.read()
                            
                        # Look for common broken import patterns
                        if any(pattern in content for pattern in [
                            'from "@/design-system"',
                            'from "../design-system"',
                            'from "./components"'
                        ]):
                            broken.append(file_path)
                            print(f"⚠️  SUSPICIOUS IMPORTS: {file_path}")
                    except:
                        pass
        
        return broken
    
    def generate_cleanup_plan(self):
        """Generate systematic cleanup plan"""
        print("\n📋 CLEANUP PLAN")
        print("=" * 50)
        
        plan = {
            "immediate_removal": [],
            "consolidation": [],
            "restructure": [],
            "priority": "HIGH"
        }
        
        # Immediate removal candidates
        removal_patterns = [
            "*.bak",
            "*backup*",
            "*old*",
            "*temp*",
            "*test*" 
        ]
        
        for pattern in removal_patterns:
            for path in self.root.rglob(pattern):
                if path.is_file() or path.is_dir():
                    plan["immediate_removal"].append(str(path))
        
        print("🗑️  IMMEDIATE REMOVAL:")
        for item in plan["immediate_removal"]:
            print(f"   └─ {item}")
        
        return plan
    
    def generate_restructure_recommendation(self):
        """Recommend new structure"""
        print("\n🏗️ RECOMMENDED STRUCTURE")
        print("=" * 50)
        
        recommended = {
            "src/": {
                "design-system/": {
                    "tokens/": ["colors.ts", "typography.ts", "spacing.ts"],
                    "primitives/": ["Button/", "Card/", "Typography/", "Container/"],
                    "components/": ["Input/", "Select/", "Dialog/", "Alert/"],
                    "layouts/": ["Grid/", "Header/", "Footer/", "MainLayout/"],
                    "index.ts": "// Main exports"
                },
                "app/": {
                    "page.tsx": "// Homepage",
                    "layout.tsx": "// Root layout",
                    "about/": ["page.tsx"],
                    "services/": ["page.tsx"]
                },
                "lib/": ["utils.ts"]
            }
        }
        
        def print_structure(struct, indent=0):
            for key, value in struct.items():
                print("  " * indent + f"📁 {key}")
                if isinstance(value, dict):
                    print_structure(value, indent + 1)
                elif isinstance(value, list):
                    for item in value:
                        print("  " * (indent + 1) + f"📄 {item}")
                else:
                    print("  " * (indent + 1) + f"📄 {value}")
        
        print_structure(recommended)
        
        return recommended

def main():
    auditor = ARCOAuditor()
    
    print("🎯 ARCO PROJECT AUDIT")
    print("=" * 50)
    print("Purpose: Clean up messy structure, remove redundancies")
    print()
    
    # 1. Structure analysis
    structure = auditor.scan_directory_structure()
    
    # 2. Find problems
    duplicates = auditor.find_duplicate_files()
    empty_folders = auditor.find_empty_folders()
    design_analysis = auditor.analyze_design_system()
    broken_imports = auditor.find_broken_imports()
    
    # 3. Generate action plan
    cleanup_plan = auditor.generate_cleanup_plan()
    recommendations = auditor.generate_restructure_recommendation()
    
    # 4. Summary
    print("\n📊 AUDIT SUMMARY")
    print("=" * 50)
    print(f"📁 Total folders scanned: {len(structure)}")
    print(f"🔄 Duplicate files found: {len(duplicates)}")
    print(f"📂 Empty folders: {len(empty_folders)}")
    print(f"⚠️  Files with suspicious imports: {len(broken_imports)}")
    print(f"🗑️  Items for immediate removal: {len(cleanup_plan['immediate_removal'])}")
    
    print("\n🎯 NEXT STEPS:")
    print("1. Run cleanup commands for immediate removal")
    print("2. Consolidate duplicate components")
    print("3. Restructure design system")
    print("4. Fix broken imports")
    print("5. Implement recommended structure")

if __name__ == "__main__":
    main()
