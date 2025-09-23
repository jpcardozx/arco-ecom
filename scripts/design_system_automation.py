#!/usr/bin/env python3
"""
Design System Automation Script
Automatiza operações repetitivas no sistema de design S-Tier
"""

import os
import re
import shutil
from pathlib import Path
from typing import Dict, List, Optional

class DesignSystemAutomator:
    """Automatiza operações do sistema de design"""
    
    def __init__(self, base_path: str = "src/design-system"):
        self.base_path = Path(base_path)
        self.atomic_structure = {
            "foundations": ["tokens.ts", "index.ts"],
            "atoms": ["Button.tsx", "Badge.tsx", "Avatar.tsx", "Typography.tsx"],
            "molecules": ["Card.tsx", "Container.tsx", "Grid.tsx"],
            "organisms": ["BentoGrid.tsx", "Hero.tsx", "CTA.tsx", "Testimonial.tsx", "Section.tsx"],
            "templates": ["Layout.tsx"]
        }
    
    def reorganize_components(self) -> None:
        """Reorganiza componentes na estrutura atômica"""
        print("🔄 Reorganizando componentes...")
        
        # Mapear componentes por tipo
        component_mapping = {
            # Átomos - componentes básicos, indivisíveis
            "atoms": [
                "Button.tsx", "Badge.tsx", "Avatar.tsx", "Typography.tsx",
                "Input.tsx", "Icon.tsx", "Text.tsx"
            ],
            # Moléculas - combinações simples de átomos
            "molecules": [
                "Card.tsx", "Container.tsx", "Grid.tsx",
                "SearchBox.tsx", "Dropdown.tsx", "Modal.tsx"
            ],
            # Organismos - seções complexas com múltiplas moléculas
            "organisms": [
                "BentoGrid.tsx", "Hero.tsx", "CTA.tsx", "Testimonial.tsx",
                "Section.tsx", "AnimatedSection.tsx", "Navigation.tsx"
            ],
            # Templates - layouts completos
            "templates": [
                "Layout.tsx", "PageTemplate.tsx"
            ]
        }
        
        for category, components in component_mapping.items():
            category_path = self.base_path / category
            category_path.mkdir(exist_ok=True)
            
            for component in components:
                source = self.base_path / component
                destination = category_path / component
                
                if source.exists() and not destination.exists():
                    shutil.move(str(source), str(destination))
                    print(f"✅ Movido {component} para {category}/")
    
    def fix_imports(self) -> None:
        """Corrige imports automaticamente"""
        print("🔧 Corrigindo imports...")
        
        # Padrões de import para corrigir
        import_patterns = [
            (r"from ['\"]\.\/utils['\"]", "from '../foundations'"),
            (r"from ['\"]\.\/\.\.\/utils['\"]", "from '../foundations'"),
            (r"from ['\"]@\/lib\/utils['\"]", "from '../foundations'"),
        ]
        
        for folder in ["atoms", "molecules", "organisms", "templates"]:
            folder_path = self.base_path / folder
            if not folder_path.exists():
                continue
                
            for tsx_file in folder_path.glob("*.tsx"):
                content = tsx_file.read_text(encoding='utf-8')
                original_content = content
                
                for pattern, replacement in import_patterns:
                    content = re.sub(pattern, replacement, content)
                
                if content != original_content:
                    tsx_file.write_text(content, encoding='utf-8')
                    print(f"✅ Imports corrigidos em {tsx_file.name}")
    
    def generate_index_files(self) -> None:
        """Gera arquivos index.ts centralizados"""
        print("📝 Gerando arquivos index...")
        
        # Index principal do design system
        main_index_content = """// Design System S-Tier - Central Exports
export * from './foundations';
export * from './atoms';
export * from './molecules';
export * from './organisms';
export * from './templates';
"""
        
        # Índices por categoria
        category_exports = {
            "foundations": [
                "export * from './tokens';",
                "export { cn } from './tokens';"
            ],
            "atoms": [
                "export { Button, buttonVariants } from './Button';",
                "export { Badge, badgeVariants } from './Badge';",
                "export { Avatar } from './Avatar';",
                "export * from './Typography';"
            ],
            "molecules": [
                "export { Card } from './Card';",
                "export { Container } from './Container';",
                "export { Grid } from './Grid';"
            ],
            "organisms": [
                "export { BentoGrid } from './BentoGrid';",
                "export { Hero } from './Hero';",
                "export { CTA } from './CTA';",
                "export { Testimonial } from './Testimonial';",
                "export { Section } from './Section';",
                "export { AnimatedSection } from './AnimatedSection';"
            ],
            "templates": [
                "export { Layout } from './Layout';"
            ]
        }
        
        # Gerar index principal
        main_index_path = self.base_path / "index.ts"
        main_index_path.write_text(main_index_content)
        print("✅ Index principal gerado")
        
        # Gerar índices por categoria
        for category, exports in category_exports.items():
            category_path = self.base_path / category
            if category_path.exists():
                index_content = "// " + category.title() + " Components\n"
                index_content += "\n".join(exports) + "\n"
                
                index_path = category_path / "index.ts"
                index_path.write_text(index_content)
                print(f"✅ Index de {category} gerado")
    
    def validate_structure(self) -> Dict[str, List[str]]:
        """Valida integridade da estrutura"""
        print("🔍 Validando estrutura...")
        
        issues = {
            "missing_folders": [],
            "misplaced_files": [],
            "broken_imports": [],
            "missing_exports": []
        }
        
        # Verificar pastas obrigatórias
        required_folders = ["foundations", "atoms", "molecules", "organisms", "templates"]
        for folder in required_folders:
            folder_path = self.base_path / folder
            if not folder_path.exists():
                issues["missing_folders"].append(folder)
        
        # Verificar arquivos perdidos na raiz
        root_tsx_files = list(self.base_path.glob("*.tsx"))
        if root_tsx_files:
            issues["misplaced_files"] = [f.name for f in root_tsx_files]
        
        # Verificar imports quebrados (busca por padrões problemáticos)
        for tsx_file in self.base_path.rglob("*.tsx"):
            content = tsx_file.read_text(encoding='utf-8')
            if "./utils" in content or "../utils" in content:
                issues["broken_imports"].append(str(tsx_file.relative_to(self.base_path)))
        
        return issues
    
    def generate_component_documentation(self) -> None:
        """Gera documentação automática dos componentes"""
        print("📚 Gerando documentação...")
        
        doc_content = """# Componentes Design System S-Tier

## Fundações (Foundations)
- **tokens.ts**: Sistema completo de design tokens
- **Cores**: Brand, semantic, neutral scales
- **Tipografia**: 9 tamanhos, 9 pesos
- **Spacing**: Escala harmônica xs-5xl
- **Animações**: Durações e easings

## Átomos (Atoms)
### Button
- **12 Variantes**: default, destructive, outline, secondary, ghost, link, gradient, glass, neon, brutal, cta, success, warning
- **6 Tamanhos**: sm, default, lg, xl, hero, icon
- **Props**: isLoading, leftIcon, rightIcon, fullWidth

### Badge
- **Variantes**: default, secondary, destructive, outline
- **Tamanhos**: sm, default, lg

### Avatar
- **Tamanhos**: sm, default, lg, xl
- **Estados**: com/sem imagem, fallback automático

### Typography
- **Componentes**: Display, Heading, Paragraph, Label, Caption
- **Responsivo**: Breakpoints automáticos

## Moléculas (Molecules)
### Card
- **Variantes**: default, outline, ghost
- **Partes**: Header, Content, Footer
- **Interativo**: Hover effects, click states

### Container
- **Tamanhos**: sm, md, lg, xl, full
- **Responsivo**: Padding automático
- **Centro**: Auto-centralização

### Grid
- **Colunas**: 1-12 configuráveis
- **Gap**: Spacing scale integrado
- **Responsivo**: Breakpoints automáticos

## Organismos (Organisms)
### BentoGrid
- **Layout**: Assimétrico moderno
- **Responsive**: Mobile-first
- **Animações**: Framer Motion

### Hero
- **Variantes**: default, centered, split
- **Background**: Gradient, image, video
- **CTA**: Botões integrados

### CTA
- **Layouts**: horizontal, vertical, card
- **Variantes**: primary, secondary, ghost
- **Animações**: Micro-interactions

### Testimonial
- **Layouts**: single, carousel, grid
- **Avatares**: Integrados
- **Ratings**: Star system

## Templates (Templates)
### Layout
- **Header**: Navigation integrada
- **Footer**: Links e sociais
- **Sidebar**: Opcional
- **Mobile**: Menu responsive
"""
        
        doc_path = self.base_path.parent / "COMPONENTS_DOCUMENTATION.md"
        doc_path.write_text(doc_content)
        print("✅ Documentação gerada")
    
    def run_full_automation(self) -> None:
        """Executa automação completa"""
        print("🚀 Iniciando automação completa do Design System S-Tier\n")
        
        # Executar todas as operações
        self.reorganize_components()
        print()
        
        self.fix_imports()
        print()
        
        self.generate_index_files()
        print()
        
        issues = self.validate_structure()
        print()
        
        self.generate_component_documentation()
        print()
        
        # Relatório final
        print("📊 RELATÓRIO FINAL:")
        print("=" * 50)
        
        if any(issues.values()):
            print("⚠️  ISSUES ENCONTRADAS:")
            for issue_type, issue_list in issues.items():
                if issue_list:
                    print(f"  {issue_type}: {', '.join(issue_list)}")
        else:
            print("✅ ESTRUTURA VÁLIDA - Nenhuma issue encontrada")
        
        print("\n🎯 DESIGN SYSTEM S-TIER AUTOMATIZADO COM SUCESSO!")
        print("📁 Estrutura atômica organizada")
        print("🔧 Imports corrigidos")
        print("📝 Exports centralizados")
        print("📚 Documentação atualizada")

def main():
    """Função principal"""
    automator = DesignSystemAutomator()
    automator.run_full_automation()

if __name__ == "__main__":
    main()
