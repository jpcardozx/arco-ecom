#!/usr/bin/env python3
"""
🔍 ARCO PROJECT STRUCTURE ANALYZER
Real Python analysis to see the actual chaos
"""

import os
from pathlib import Path
import json

def analyze_folder_structure():
    print("🔍 ARCO REAL STRUCTURE ANALYSIS")
    print("=" * 50)
    
    base = Path(".")
    src = base / "src"
    
    # Count everything
    total_folders = 0
    total_files = 0
    structure_issues = []
    
    print("\n📊 FOLDER POLLUTION ANALYSIS:")
    print("-" * 30)
    
    # Analyze src/ structure
    if src.exists():
        for root, dirs, files in os.walk(src):
            total_folders += len(dirs)
            total_files += len(files)
            
            level = root.replace(str(src), '').count(os.sep)
            indent = '  ' * level
            folder_name = os.path.basename(root)
            
            # Flag suspicious patterns
            if level > 4:  # Too deep nesting
                structure_issues.append(f"TOO DEEP: {root} (level {level})")
            
            if len(dirs) > 10:  # Too many subfolders
                structure_issues.append(f"TOO MANY SUBFOLDERS: {root} ({len(dirs)} folders)")
            
            # Show structure
            print(f"{indent}📁 {folder_name}/ ({len(files)} files, {len(dirs)} folders)")
            
            # Show files in important folders
            if level <= 2 and files:
                for file in sorted(files)[:5]:  # Show first 5 files
                    print(f"{indent}  📄 {file}")
                if len(files) > 5:
                    print(f"{indent}  ... +{len(files)-5} more files")
    
    print(f"\n📈 POLLUTION METRICS:")
    print("-" * 20)
    print(f"Total folders in src/: {total_folders}")
    print(f"Total files in src/: {total_files}")
    print(f"Average folders per level: {total_folders / max(1, total_files//10):.1f}")
    
    # Identify specific problems
    print(f"\n🚨 STRUCTURE PROBLEMS:")
    print("-" * 25)
    
    # Check for duplicate component patterns
    component_files = []
    for root, dirs, files in os.walk(src):
        for file in files:
            if file.endswith('.tsx') and any(comp in file for comp in ['Button', 'Typography', 'Card', 'Avatar']):
                component_files.append(os.path.join(root, file))
    
    print(f"Component duplicates found: {len(component_files)}")
    for comp in component_files:
        print(f"  📄 {comp.replace(str(src), 'src')}")
    
    # Check for empty or near-empty folders
    empty_folders = []
    for root, dirs, files in os.walk(src):
        if len(files) == 0 and len(dirs) == 0:
            empty_folders.append(root)
        elif len(files) <= 1 and len(dirs) == 0:  # Near empty
            empty_folders.append(f"{root} (only {len(files)} file)")
    
    print(f"\nEmpty/near-empty folders: {len(empty_folders)}")
    for folder in empty_folders[:10]:  # Show first 10
        print(f"  📁 {folder.replace(str(src), 'src')}")
    
    # Show structure issues
    if structure_issues:
        print(f"\nStructure issues: {len(structure_issues)}")
        for issue in structure_issues[:10]:
            print(f"  ⚠️ {issue}")
    
    return {
        'total_folders': total_folders,
        'total_files': total_files,
        'component_duplicates': len(component_files),
        'empty_folders': len(empty_folders),
        'structure_issues': len(structure_issues)
    }

def recommend_cleanup():
    print(f"\n🎯 CLEANUP RECOMMENDATIONS:")
    print("=" * 30)
    
    print("1. 🗑️ DELETE empty folders")
    print("2. 🔄 MERGE duplicate components") 
    print("3. 📁 FLATTEN deep nesting (>3 levels)")
    print("4. 🎯 CONSOLIDATE into clear hierarchy:")
    print("   src/")
    print("   ├── design-system/ (ONLY design components)")
    print("   ├── components/ (ONLY app-specific)")
    print("   ├── app/ (ONLY pages)")
    print("   └── lib/ (ONLY utilities)")
    
    print(f"\n💡 GOAL: Maximum 20 folders in src/, clear purpose for each")

if __name__ == "__main__":
    metrics = analyze_folder_structure()
    recommend_cleanup()
    
    print(f"\n📊 SUMMARY:")
    print(f"Current complexity: {metrics['total_folders']} folders")
    print(f"Target complexity: ~20 folders")
    print(f"Reduction needed: {max(0, metrics['total_folders'] - 20)} folders")
