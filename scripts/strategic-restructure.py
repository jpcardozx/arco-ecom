#!/usr/bin/env python3
"""
🚀 ARCO S-TIER RESTRUCTURE EXECUTOR
Strategic batch operations for clean architecture
"""

import os
import shutil
import sys
from pathlib import Path

def log_action(action, status="✅"):
    print(f"{status} {action}")

def safe_remove(path):
    """Remove file/folder safely"""
    try:
        if os.path.isfile(path):
            os.remove(path)
            log_action(f"Removed file: {path}")
        elif os.path.isdir(path):
            shutil.rmtree(path)
            log_action(f"Removed directory: {path}")
        else:
            log_action(f"Not found (OK): {path}", "⚠️")
    except Exception as e:
        log_action(f"Error removing {path}: {e}", "❌")

def safe_move(src, dst):
    """Move file/folder safely"""
    try:
        if os.path.exists(src):
            # Create destination parent if needed
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            shutil.move(src, dst)
            log_action(f"Moved: {src} → {dst}")
        else:
            log_action(f"Source not found: {src}", "⚠️")
    except Exception as e:
        log_action(f"Error moving {src} → {dst}: {e}", "❌")

def main():
    print("🏗️ ARCO S-TIER ARCHITECTURE RESTRUCTURE")
    print("=" * 50)
    
    # Base paths
    base = Path(".")
    src = base / "src"
    
    print("\n🔥 PHASE 1: ELIMINATE REDUNDANCIES")
    print("-" * 30)
    
    # Remove duplicate components from design-system root
    safe_remove(src / "design-system" / "Button.tsx")
    safe_remove(src / "design-system" / "Typography.tsx")
    safe_remove(src / "design-system" / "Avatar.tsx")
    
    # Remove redundant atoms folder
    safe_remove(src / "design-system" / "atoms")
    
    # Remove conflicting pages folder (using App Router)
    safe_remove(src / "pages")
    
    # Move MCP out of src (development tools shouldn't be in app src)
    if (src / "mcp").exists():
        safe_move(str(src / "mcp"), str(base / "mcp"))
    
    print("\n🎯 PHASE 2: VERIFY CLEAN STRUCTURE")
    print("-" * 30)
    
    # Check design-system structure
    ds_path = src / "design-system"
    if ds_path.exists():
        log_action(f"Design system folder exists: {ds_path}")
        
        # List remaining structure
        for item in ds_path.iterdir():
            if item.is_dir():
                log_action(f"  📁 {item.name}/")
            else:
                log_action(f"  📄 {item.name}")
    
    # Check components structure  
    comp_path = src / "components"
    if comp_path.exists():
        log_action(f"Components folder exists: {comp_path}")
        
        for item in comp_path.iterdir():
            if item.is_dir():
                log_action(f"  📁 {item.name}/")
    
    print("\n✅ RESTRUCTURE COMPLETE!")
    print("🎯 Next: Create unified design-system exports")

if __name__ == "__main__":
    main()
