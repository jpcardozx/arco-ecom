#!/usr/bin/env python3
"""
ARCO Cleanup Executor - Systematic project cleanup
"""

import os
import shutil
from pathlib import Path

class ARCOCleaner:
    def __init__(self):
        self.root = Path.cwd()
        self.removed_count = 0
        
    def remove_backup_files(self):
        """Remove all backup and temporary files"""
        print("🗑️ REMOVING BACKUP & TEMP FILES")
        print("=" * 50)
        
        patterns = [
            "*.bak", "*.backup", "*backup*", "*old*", 
            "*temp*", "*tmp*", "*.orig", "*~"
        ]
        
        for pattern in patterns:
            for path in self.root.rglob(pattern):
                if path.exists():
                    try:
                        if path.is_file():
                            path.unlink()
                        else:
                            shutil.rmtree(path)
                        print(f"✅ Removed: {path}")
                        self.removed_count += 1
                    except Exception as e:
                        print(f"❌ Failed to remove {path}: {e}")
    
    def remove_node_modules_artifacts(self):
        """Clean node_modules and build artifacts"""
        print("\n🧹 CLEANING BUILD ARTIFACTS")
        print("=" * 50)
        
        artifacts = [".next", "dist", "build", ".turbo"]
        
        for artifact in artifacts:
            path = self.root / artifact
            if path.exists():
                try:
                    shutil.rmtree(path)
                    print(f"✅ Cleaned: {artifact}")
                    self.removed_count += 1
                except Exception as e:
                    print(f"❌ Failed to clean {artifact}: {e}")
    
    def remove_empty_folders(self):
        """Remove empty folders"""
        print("\n📁 REMOVING EMPTY FOLDERS")
        print("=" * 50)
        
        # Walk bottom-up to handle nested empty folders
        for root, dirs, files in os.walk(self.root, topdown=False):
            if any(skip in root for skip in ['node_modules', '.git']):
                continue
                
            try:
                if not dirs and not files:
                    os.rmdir(root)
                    print(f"✅ Removed empty: {root}")
                    self.removed_count += 1
            except:
                pass
    
    def consolidate_duplicates(self):
        """Identify and remove duplicate files"""
        print("\n🔄 HANDLING DUPLICATES")
        print("=" * 50)
        
        # Focus on known duplicates
        known_duplicates = [
            "src/components/sections.bak",
            "src/app/about.bak", 
            "src/app/services.bak",
            "src/app/page-old.tsx",
            "src/app/page-clean.tsx"
        ]
        
        for dup in known_duplicates:
            path = self.root / dup
            if path.exists():
                try:
                    if path.is_file():
                        path.unlink()
                    else:
                        shutil.rmtree(path)
                    print(f"✅ Removed duplicate: {dup}")
                    self.removed_count += 1
                except Exception as e:
                    print(f"❌ Failed to remove {dup}: {e}")
    
    def organize_design_system(self):
        """Reorganize design system structure"""
        print("\n🎨 ORGANIZING DESIGN SYSTEM")
        print("=" * 50)
        
        # Create clean structure
        ds_root = self.root / "src" / "design-system"
        
        # Ensure proper folder structure
        folders = ["core", "primitives", "components", "layouts"]
        
        for folder in folders:
            folder_path = ds_root / folder
            folder_path.mkdir(parents=True, exist_ok=True)
            print(f"✅ Ensured folder: {folder}")
    
    def clean_documentation(self):
        """Clean up redundant documentation"""
        print("\n📚 CLEANING DOCUMENTATION")
        print("=" * 50)
        
        docs_patterns = [
            "docs-new", "docs/archive", "maintenance", 
            "*COMPLETE.md", "*ANALYSIS.md", "*AUDIT*.md"
        ]
        
        for pattern in docs_patterns:
            for path in self.root.rglob(pattern):
                if path.exists() and "node_modules" not in str(path):
                    try:
                        if path.is_file():
                            path.unlink()
                        else:
                            shutil.rmtree(path)
                        print(f"✅ Cleaned docs: {path}")
                        self.removed_count += 1
                    except Exception as e:
                        print(f"❌ Failed to clean {path}: {e}")

def main():
    cleaner = ARCOCleaner()
    
    print("🧹 ARCO PROJECT CLEANUP")
    print("=" * 50)
    print("Starting systematic cleanup...")
    print()
    
    # Execute cleanup phases
    cleaner.remove_backup_files()
    cleaner.remove_node_modules_artifacts()
    cleaner.consolidate_duplicates()
    cleaner.remove_empty_folders()
    cleaner.organize_design_system()
    cleaner.clean_documentation()
    
    print(f"\n🎯 CLEANUP COMPLETE")
    print("=" * 50)
    print(f"Total items removed: {cleaner.removed_count}")
    print("Project should now be cleaner and more organized")

if __name__ == "__main__":
    main()
