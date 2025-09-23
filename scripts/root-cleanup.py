#!/usr/bin/env python3
"""
🧹 ARCO ROOT CLEANUP
Limpa poluição na raiz e organiza arquivos soltos
"""

import os
import shutil
from pathlib import Path

def clean_src_root():
    """Remove poluição da raiz src/"""
    print("🧹 CLEANING SRC ROOT")
    print("-" * 25)
    
    src_path = Path("src")
    
    # Files that should stay in root
    essential_files = {
        "middleware.ts"
    }
    
    # Move documentation to docs
    docs_files = [
        "COMPONENTS_DOCUMENTATION.md",
        "quality_report.json"
    ]
    
    docs_path = Path("docs/cleanup")
    docs_path.mkdir(parents=True, exist_ok=True)
    
    for doc_file in docs_files:
        source = src_path / doc_file
        if source.exists():
            target = docs_path / doc_file
            shutil.move(str(source), str(target))
            print(f"📁 Moved doc: {doc_file} → docs/cleanup/")

def clean_lib_root():
    """Limpa 24 arquivos da raiz lib/"""
    print("\n🧹 CLEANING LIB ROOT")
    print("-" * 25)
    
    lib_path = Path("src/lib")
    if not lib_path.exists():
        return
    
    # Categorize and move files
    file_categories = {
        'core/': [
            'config.ts', 'arco-intelligence.ts', 'content.ts', 
            'context-tester.ts', 'domain-intelligence.ts',
            'enhanced-domain-intelligence.ts', 'lead-scoring.ts',
            'optimization.ts', 'performance-insights.ts',
            'seo-optimizer.ts', 'context-manager.ts'
        ],
        'ui/': [
            'badge-animations.ts', 'motion-config.ts', 
            'user-preferences-context.tsx'
        ],
        'utils/': [
            'enhanced-analytics.ts', 'conversion-tracking.ts',
            'lead-analytics.ts', 'enhanced-lead-analytics.ts',
            'api-config.ts', 'api-response-handler.ts'
        ]
    }
    
    # Execute categorization
    for category, files in file_categories.items():
        target_folder = lib_path / category.rstrip('/')
        target_folder.mkdir(exist_ok=True)
        
        for file in files:
            source = lib_path / file
            if source.exists() and source.is_file():
                target = target_folder / file
                shutil.move(str(source), str(target))
                print(f"📁 Categorized: {file} → lib/{category}")

def clean_duplicate_files():
    """Remove arquivos duplicados com nomes estranhos"""
    print("\n🗑️ REMOVING DUPLICATES")
    print("-" * 25)
    
    # Remove obvious duplicates in lib/utils/
    utils_path = Path("src/lib/utils")
    if utils_path.exists():
        duplicates = [
            "analytics-analytics.ts",
            "utils-analytics-analytics.ts", 
            "utils-analytics.ts",
            "analytics-index.ts"
        ]
        
        for dup in duplicates:
            dup_path = utils_path / dup
            if dup_path.exists():
                os.remove(dup_path)
                print(f"🗑️ Removed duplicate: {dup}")

def clean_app_structure():
    """Limpa estrutura /app"""
    print("\n🧹 CLEANING APP STRUCTURE")
    print("-" * 25)
    
    app_path = Path("src/app")
    if not app_path.exists():
        return
    
    # Move globals.css to styles
    globals_css = app_path / "globals.css"
    if globals_css.exists():
        styles_path = Path("src/styles")
        styles_path.mkdir(exist_ok=True)
        target = styles_path / "app-globals.css"
        shutil.move(str(globals_css), str(target))
        print(f"📁 Moved: globals.css → styles/app-globals.css")
    
    # Fix API file names
    api_path = app_path / "api"
    if api_path.exists():
        weird_files = {
            "shared-analytics-route.ts": "analytics.ts",
            "shared-auth-auth-options.ts": "auth.ts"
        }
        
        for old_name, new_name in weird_files.items():
            old_file = api_path / old_name
            if old_file.exists():
                new_file = api_path / new_name
                shutil.move(str(old_file), str(new_file))
                print(f"📁 Renamed API: {old_name} → {new_name}")

def remove_single_file_folders():
    """Remove pasta architecture com 1 arquivo"""
    print("\n🗑️ REMOVING SINGLE-FILE FOLDERS")
    print("-" * 30)
    
    architecture_path = Path("src/architecture")
    if architecture_path.exists():
        files = list(architecture_path.glob("*"))
        if len(files) == 1 and files[0].is_file():
            # Move to docs
            docs_path = Path("docs")
            docs_path.mkdir(exist_ok=True)
            
            target = docs_path / files[0].name
            shutil.move(str(files[0]), str(target))
            print(f"📁 Moved: {files[0].name} → docs/")
            
            # Remove empty folder
            try:
                architecture_path.rmdir()
                print("🗑️ Removed empty architecture/ folder")
            except:
                pass

def final_structure_validation():
    """Valida estrutura final"""
    print("\n✅ FINAL STRUCTURE VALIDATION")
    print("-" * 30)
    
    src_path = Path("src")
    
    # Count files in root
    root_files = [f for f in src_path.iterdir() if f.is_file()]
    print(f"📄 Files in src/ root: {len(root_files)}")
    for f in root_files:
        print(f"   📄 {f.name}")
    
    # Count lib root files
    lib_path = src_path / "lib"
    if lib_path.exists():
        lib_root_files = [f for f in lib_path.iterdir() if f.is_file()]
        print(f"📄 Files in lib/ root: {len(lib_root_files)}")
    
    # Show clean structure
    print(f"\n🌳 CLEAN STRUCTURE:")
    for root, dirs, files in os.walk(src_path):
        level = root.replace(str(src_path), '').count(os.sep)
        if level <= 1:
            indent = '  ' * level
            folder_name = os.path.basename(root)
            print(f"{indent}📁 {folder_name}/ ({len(files)} files, {len(dirs)} folders)")

if __name__ == "__main__":
    print("🧹 ARCO ROOT CLEANUP")
    print("=" * 25)
    print("🎯 Goal: Clean root pollution, organize loose files")
    print()
    
    clean_src_root()
    clean_lib_root()
    clean_duplicate_files()
    clean_app_structure()
    remove_single_file_folders()
    final_structure_validation()
    
    print(f"\n🎯 ROOT CLEANUP COMPLETE!")
    print("✅ Clean structure achieved")
    print("🚀 Ready for productive development")
