#!/usr/bin/env python3
"""
ARCO Project - Empty Files Cleanup
Remove all empty files from the project structure
"""

import os
import sys
from pathlib import Path

def is_file_empty(file_path):
    """Check if a file is empty or contains only whitespace"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read().strip()
            return len(content) == 0
    except (UnicodeDecodeError, PermissionError):
        # If we can't read the file, don't delete it
        return False

def find_empty_files(root_dir):
    """Find all empty files in the project"""
    empty_files = []
    
    # Directories to skip
    skip_dirs = {
        'node_modules', '.git', '.next', 'dist', 'build', 
        '__pycache__', '.vscode', '.idea', 'coverage'
    }
    
    # File extensions to check
    check_extensions = {
        '.ts', '.tsx', '.js', '.jsx', '.md', '.json', 
        '.css', '.scss', '.sass', '.less', '.html', 
        '.txt', '.yaml', '.yml', '.xml'
    }
    
    for root, dirs, files in os.walk(root_dir):
        # Skip certain directories
        dirs[:] = [d for d in dirs if d not in skip_dirs]
        
        for file in files:
            file_path = Path(root) / file
            
            # Only check certain file types
            if file_path.suffix in check_extensions:
                if is_file_empty(file_path):
                    empty_files.append(file_path)
    
    return empty_files

def main():
    """Main cleanup function"""
    project_root = Path(__file__).parent.parent
    print(f"🔍 Scanning for empty files in: {project_root}")
    
    empty_files = find_empty_files(project_root)
    
    if not empty_files:
        print("✅ No empty files found!")
        return
    
    print(f"\n📋 Found {len(empty_files)} empty files:")
    for file_path in empty_files:
        rel_path = file_path.relative_to(project_root)
        print(f"  - {rel_path}")
    
    # Ask for confirmation
    response = input(f"\n🗑️  Delete {len(empty_files)} empty files? (y/N): ").strip().lower()
    
    if response in ['y', 'yes']:
        deleted_count = 0
        for file_path in empty_files:
            try:
                file_path.unlink()
                deleted_count += 1
                rel_path = file_path.relative_to(project_root)
                print(f"  ✓ Deleted: {rel_path}")
            except Exception as e:
                rel_path = file_path.relative_to(project_root)
                print(f"  ✗ Failed to delete {rel_path}: {e}")
        
        print(f"\n🎉 Cleanup complete! Deleted {deleted_count} empty files.")
    else:
        print("🚫 Cleanup cancelled.")

if __name__ == "__main__":
    main()
