#!/usr/bin/env python3
"""
⚡ ARCO RADICAL FUSION
Fusão radical para atingir 20 pastas - sem piedade
"""

import os
import shutil
from pathlib import Path

def radical_lib_fusion():
    """Funde lib/ em apenas 3 pastas: core/, ui/, utils/"""
    print("⚡ RADICAL LIB FUSION")
    print("-" * 25)
    
    lib_path = Path("src/lib")
    if not lib_path.exists():
        return
    
    # Mega-fusion plan: 11 folders → 3 folders
    fusion_plan = {
        # CORE: Business logic, config, types
        'core/': ['business-logic/', 'content/', 'api/', 'performance/', 'monitoring/'],
        
        # UI: Hooks, animations, i18n
        'ui/': ['hooks/', 'animation/', 'i18n/'],
        
        # UTILS: Everything else
        'utils/': ['analytics/', 'utils/']
    }
    
    # Execute radical fusion
    for target_folder, source_folders in fusion_plan.items():
        target_path = lib_path / target_folder.rstrip('/')
        target_path.mkdir(exist_ok=True)
        
        for source_folder in source_folders:
            source_path = lib_path / source_folder.rstrip('/')
            
            if source_path.exists() and source_path.is_dir():
                # Move all files from source to target
                for item in source_path.iterdir():
                    if item.is_file():
                        target_file = target_path / item.name
                        
                        # Handle name conflicts
                        if target_file.exists():
                            stem = item.stem
                            suffix = item.suffix
                            target_file = target_path / f"{source_folder.rstrip('/')}-{stem}{suffix}"
                        
                        shutil.move(str(item), str(target_file))
                        print(f"🔄 Fused: {source_folder}{item.name} → {target_folder}")
                
                # Remove empty source folder
                try:
                    source_path.rmdir()
                    print(f"🗑️ Removed: {source_folder}")
                except:
                    pass

def radical_design_system_fusion():
    """Funde design-system/primitives/ em single components/"""
    print("\n⚡ RADICAL DESIGN SYSTEM FUSION")
    print("-" * 35)
    
    primitives_path = Path("src/design-system/primitives")
    if not primitives_path.exists():
        return
    
    # Move all primitive components to single folder
    components_path = Path("src/design-system/components")
    components_path.mkdir(exist_ok=True)
    
    primitive_folders = ["Badge", "Button", "Card", "Container", "Typography"]
    
    for folder in primitive_folders:
        source_folder = primitives_path / folder
        if source_folder.exists():
            # Move all files
            for item in source_folder.iterdir():
                if item.is_file():
                    target = components_path / item.name
                    shutil.move(str(item), str(target))
                    print(f"🔄 Fused primitive: {folder}/{item.name} → components/")
            
            # Remove empty folder
            try:
                source_folder.rmdir()
            except:
                pass
    
    # Remove primitives folder if empty
    try:
        primitives_path.rmdir()
        print("🗑️ Removed empty primitives/ folder")
    except:
        pass

def remove_near_empty_folders():
    """Remove folders with ≤2 files moving content to parent"""
    print("\n🗑️ REMOVING NEAR-EMPTY FOLDERS")
    print("-" * 30)
    
    src_path = Path("src")
    
    # Find folders with ≤2 files
    candidates = []
    for root, dirs, files in os.walk(src_path):
        if len(files) <= 2 and len(dirs) == 0:
            level = root.replace(str(src_path), '').count(os.sep)
            if level > 1:  # Don't touch top-level folders
                candidates.append(Path(root))
    
    # Process candidates
    for folder in candidates:
        if not folder.exists():
            continue
            
        parent = folder.parent
        files = list(folder.glob("*"))
        
        if len(files) <= 2:
            # Move files to parent
            for file in files:
                if file.is_file():
                    target = parent / f"{folder.name}-{file.name}"
                    if target.exists():
                        target = parent / f"{folder.name}-{file.stem}-merged{file.suffix}"
                    
                    shutil.move(str(file), str(target))
                    print(f"🔄 Merged: {folder.name}/{file.name} → {parent.name}/")
            
            # Remove empty folder
            try:
                folder.rmdir()
                print(f"🗑️ Removed: {folder}")
            except:
                pass

def final_structure_report():
    """Generate final structure report"""
    print("\n📊 FINAL STRUCTURE REPORT")
    print("=" * 30)
    
    src_path = Path("src")
    total_folders = sum(1 for _ in src_path.rglob('*') if _.is_dir())
    total_files = sum(1 for _ in src_path.rglob('*') if _.is_file())
    
    print(f"📁 Total folders: {total_folders}")
    print(f"📄 Total files: {total_files}")
    
    if total_folders <= 20:
        print("🎯 SUCCESS: ≤20 folders achieved!")
        print("✅ S-tier structure ready!")
    else:
        print(f"⚠️ Still {total_folders - 20} folders over target")
        print("🔧 Manual intervention needed")
    
    # Show structure tree
    print(f"\n🌳 STRUCTURE TREE:")
    for root, dirs, files in os.walk(src_path):
        level = root.replace(str(src_path), '').count(os.sep)
        if level <= 2:
            indent = '  ' * level
            folder_name = os.path.basename(root)
            if level == 0:
                print(f"📁 {folder_name}/ ({len(files)} files)")
            else:
                print(f"{indent}├── {folder_name}/ ({len(files)} files)")

if __name__ == "__main__":
    print("⚡ ARCO RADICAL FUSION")
    print("=" * 25)
    print("🎯 GOAL: 34 → 20 folders (radical reduction)")
    print()
    
    radical_lib_fusion()
    radical_design_system_fusion()
    remove_near_empty_folders()
    final_structure_report()
    
    print(f"\n🚀 RADICAL FUSION COMPLETE!")
    print("Ready for S-tier development workflow")
