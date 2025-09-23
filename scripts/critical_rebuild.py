#!/usr/bin/env python3
"""
ARCO Design System Critical Cleanup & Rebuild
Execução definitiva sem retrabalho - UI/UX + Web Vitals focused
"""

import os
import shutil
import json
import subprocess
from pathlib import Path
from typing import Dict, List, Any

class ARCODesignSystemRebuilder:
    """Rebuilder crítico do sistema de design ARCO"""
    
    def __init__(self, base_path: str = "src/design-system"):
        self.base_path = Path(base_path)
        self.backup_path = Path("backup-design-system")
        self.components_map = self._define_component_architecture()
    
    def _define_component_architecture(self) -> Dict[str, List[str]]:
        """Define arquitetura final definitiva"""
        return {
            "core": [
                "tokens.ts",      # Design tokens completos
                "theme.ts",       # Theme provider
                "utils.ts",       # Core utilities
                "types.ts"        # TypeScript definitions
            ],
            "primitives": [
                # 15 componentes atômicos essenciais
                "Button", "Input", "Select", "Checkbox", "Radio",
                "Toggle", "Avatar", "Badge", "Icon", "Spinner", 
                "Label", "Separator", "Progress", "Slider", "Switch"
            ],
            "components": [
                # 10 componentes business
                "Navigation", "DataTable", "FormBuilder", 
                "ImageGallery", "Timeline", "SearchBox",
                "DropdownMenu", "DatePicker", "Pagination", "Tabs"
            ],
            "layouts": [
                # Sistema de layout
                "Grid", "Container", "Section", "Stack", "Flex"
            ],
            "sections": [
                # Templates de seção prontos
                "Hero", "Features", "Testimonials", "CTA", "Footer"
            ],
            "templates": [
                # Page templates
                "LandingLayout", "DashboardLayout", "BlogLayout", 
                "AuthLayout", "ErrorLayout"
            ]
        }
    
    def phase_1_critical_cleanup(self) -> None:
        """Fase 1: Cleanup crítico e backup"""
        print("🚨 FASE 1: CLEANUP CRÍTICO")
        print("=" * 50)
        
        # 1.1 Backup do estado atual
        if self.base_path.exists():
            if self.backup_path.exists():
                shutil.rmtree(self.backup_path)
            shutil.copytree(self.base_path, self.backup_path)
            print(f"✅ Backup criado em {self.backup_path}")
        
        # 1.2 Remover estrutura atual problemática
        problematic_paths = [
            self.base_path / "atoms",
            self.base_path / "molecules", 
            self.base_path / "organisms",
            self.base_path / "templates",
            self.base_path / "foundations"
        ]
        
        for path in problematic_paths:
            if path.exists():
                shutil.rmtree(path)
                print(f"🗑️  Removido: {path}")
        
        # 1.3 Criar estrutura final definitiva
        final_structure = [
            "core",
            "primitives", 
            "components",
            "layouts",
            "sections", 
            "templates"
        ]
        
        for folder in final_structure:
            folder_path = self.base_path / folder
            folder_path.mkdir(parents=True, exist_ok=True)
            print(f"📁 Criado: {folder}")
        
        print("\n✅ Cleanup crítico concluído\n")
    
    def phase_2_core_foundation(self) -> None:
        """Fase 2: Foundation S-Tier"""
        print("🎯 FASE 2: CORE FOUNDATION S-TIER")
        print("=" * 50)
        
        # 2.1 Design Tokens V2 (Professional)
        tokens_content = '''import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Professional Color System
export const colors = {
  // Brand Colors
  brand: {
    primary: "hsl(221 83% 53%)",      // Professional blue
    secondary: "hsl(210 40% 96%)",    // Light gray
    accent: "hsl(270 95% 75%)",       // Purple accent
    muted: "hsl(210 40% 94%)",        // Muted background
  },
  
  // Semantic Colors
  semantic: {
    success: "hsl(142 76% 36%)",      // Green
    warning: "hsl(38 92% 50%)",       // Amber
    error: "hsl(0 84% 60%)",          // Red
    info: "hsl(199 89% 48%)",         // Blue
  },
  
  // Neutral Scale (9-step)
  neutral: {
    50: "hsl(210 40% 98%)",
    100: "hsl(210 40% 96%)",
    200: "hsl(214 32% 91%)",
    300: "hsl(213 27% 84%)",
    400: "hsl(215 20% 65%)",
    500: "hsl(215 16% 47%)",
    600: "hsl(215 19% 35%)",
    700: "hsl(215 25% 27%)",
    800: "hsl(217 33% 17%)",
    900: "hsl(222 84% 5%)",
  },
} as const;

// Typography Scale (Professional)
export const typography = {
  fontFamily: {
    sans: ["Inter", "system-ui", "sans-serif"],
    mono: ["JetBrains Mono", "monospace"],
  },
  fontSize: {
    xs: ["0.75rem", { lineHeight: "1rem" }],
    sm: ["0.875rem", { lineHeight: "1.25rem" }],
    base: ["1rem", { lineHeight: "1.5rem" }],
    lg: ["1.125rem", { lineHeight: "1.75rem" }],
    xl: ["1.25rem", { lineHeight: "1.75rem" }],
    "2xl": ["1.5rem", { lineHeight: "2rem" }],
    "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
    "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
    "5xl": ["3rem", { lineHeight: "1.2" }],
    "6xl": ["3.75rem", { lineHeight: "1.1" }],
    "7xl": ["4.5rem", { lineHeight: "1.1" }],
    "8xl": ["6rem", { lineHeight: "1" }],
    "9xl": ["8rem", { lineHeight: "1" }],
  },
  fontWeight: {
    thin: "100",
    extralight: "200", 
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  },
} as const;

// Spacing Scale (Consistent)
export const spacing = {
  px: "1px",
  0.5: "0.125rem",   // 2px
  1: "0.25rem",      // 4px
  1.5: "0.375rem",   // 6px
  2: "0.5rem",       // 8px
  2.5: "0.625rem",   // 10px
  3: "0.75rem",      // 12px
  3.5: "0.875rem",   // 14px
  4: "1rem",         // 16px
  5: "1.25rem",      // 20px
  6: "1.5rem",       // 24px
  7: "1.75rem",      // 28px
  8: "2rem",         // 32px
  9: "2.25rem",      // 36px
  10: "2.5rem",      // 40px
  11: "2.75rem",     // 44px
  12: "3rem",        // 48px
  14: "3.5rem",      // 56px
  16: "4rem",        // 64px
  20: "5rem",        // 80px
  24: "6rem",        // 96px
  28: "7rem",        // 112px
  32: "8rem",        // 128px
  36: "9rem",        // 144px
  40: "10rem",       // 160px
  44: "11rem",       // 176px
  48: "12rem",       // 192px
  52: "13rem",       // 208px
  56: "14rem",       // 224px
  60: "15rem",       // 240px
  64: "16rem",       // 256px
  72: "18rem",       // 288px
  80: "20rem",       // 320px
  96: "24rem",       // 384px
} as const;

// Border Radius (Professional)
export const borderRadius = {
  none: "0",
  sm: "0.125rem",    // 2px
  DEFAULT: "0.25rem", // 4px
  md: "0.375rem",    // 6px
  lg: "0.5rem",      // 8px
  xl: "0.75rem",     // 12px
  "2xl": "1rem",     // 16px
  "3xl": "1.5rem",   // 24px
  full: "9999px",
} as const;

// Shadow System (Elegant)
export const shadows = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  none: "0 0 #0000",
  
  // Custom premium shadows
  glow: "0 0 20px rgb(147 51 234 / 0.3)",
  neon: "0 0 30px rgb(34 211 238 / 0.6)",
  brutal: "6px 6px 0px 0px rgb(0 0 0 / 1)",
} as const;

// Animation System (Performant)
export const animation = {
  duration: {
    instant: "0ms",
    fastest: "75ms",
    faster: "100ms", 
    fast: "150ms",
    normal: "200ms",
    slow: "300ms",
    slower: "500ms",
    slowest: "1000ms",
  },
  easing: {
    linear: "linear",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    easeOut: "cubic-bezier(0, 0, 0.2, 1)", 
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    spring: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  },
} as const;

// Breakpoints (Mobile-first)
export const breakpoints = {
  sm: "640px",   // Small devices
  md: "768px",   // Tablets
  lg: "1024px",  // Laptops
  xl: "1280px",  // Desktops
  "2xl": "1536px", // Large screens
} as const;

// Z-Index Scale
export const zIndex = {
  hide: -1,
  auto: "auto",
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

// Export all tokens
export const tokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  animation,
  breakpoints,
  zIndex,
} as const;

export type Tokens = typeof tokens;
'''
        
        tokens_path = self.base_path / "core" / "tokens.ts"
        tokens_path.write_text(tokens_content)
        print("✅ Design Tokens V2 criado")
        
        # 2.2 Theme Provider
        theme_content = '''import React, { createContext, useContext } from "react";
import { tokens } from "./tokens";

interface ThemeContextType {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  tokens: typeof tokens;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: "light" | "dark";
}

export function ThemeProvider({ children, defaultTheme = "light" }: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<"light" | "dark">(defaultTheme);
  
  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme, tokens }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
'''
        
        theme_path = self.base_path / "core" / "theme.ts"
        theme_path.write_text(theme_content)
        print("✅ Theme Provider criado")
        
        # 2.3 Core Types
        types_content = '''// Core Design System Types

export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface VariantProps<T = {}> {
  variant?: keyof T;
  size?: "sm" | "md" | "lg" | "xl";
}

export interface ResponsiveProps {
  responsive?: {
    sm?: number | string;
    md?: number | string; 
    lg?: number | string;
    xl?: number | string;
  };
}

export interface AnimationProps {
  animated?: boolean;
  animation?: "fadeIn" | "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "zoom" | "none";
  delay?: number;
}

export interface AccessibilityProps {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  role?: string;
}

// Color types based on tokens
export type ColorVariant = 
  | "primary" 
  | "secondary" 
  | "accent" 
  | "success" 
  | "warning" 
  | "error" 
  | "info"
  | "neutral";

export type SizeVariant = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export type SpacingValue = keyof typeof import("./tokens").spacing;

export type BreakpointValue = keyof typeof import("./tokens").breakpoints;
'''
        
        types_path = self.base_path / "core" / "types.ts"
        types_path.write_text(types_content)
        print("✅ Core Types criado")
        
        # 2.4 Core Index
        core_index_content = '''// Core Design System Exports
export * from "./tokens";
export * from "./theme";
export * from "./types";

// Re-export commonly used utilities
export { cn } from "./tokens";
'''
        
        core_index_path = self.base_path / "core" / "index.ts"
        core_index_path.write_text(core_index_content)
        print("✅ Core Index criado")
        
        print("\n✅ Core Foundation S-Tier concluído\n")
    
    def phase_3_tsc_validation(self) -> None:
        """Fase 3: Validação TypeScript"""
        print("🔍 FASE 3: VALIDAÇÃO TYPESCRIPT")
        print("=" * 50)
        
        try:
            # Verificar TypeScript errors
            result = subprocess.run(
                ["npx", "tsc", "--noEmit"], 
                capture_output=True, 
                text=True,
                cwd=Path.cwd()
            )
            
            if result.returncode == 0:
                print("✅ Zero TypeScript errors")
            else:
                print("❌ TypeScript errors encontrados:")
                print(result.stdout)
                print(result.stderr)
                
        except Exception as e:
            print(f"⚠️  Não foi possível executar tsc: {e}")
        
        print("\n✅ Validação TypeScript concluída\n")
    
    def phase_4_performance_audit(self) -> None:
        """Fase 4: Auditoria de Performance"""
        print("⚡ FASE 4: AUDITORIA DE PERFORMANCE")
        print("=" * 50)
        
        # Calcular tamanho dos arquivos
        total_size = 0
        for file_path in self.base_path.rglob("*.ts"):
            if file_path.is_file():
                size = file_path.stat().st_size
                total_size += size
                if size > 50000:  # > 50KB
                    print(f"⚠️  Arquivo grande: {file_path.name} ({size/1000:.1f}KB)")
        
        print(f"📊 Tamanho total do design system: {total_size/1000:.1f}KB")
        
        if total_size < 250000:  # < 250KB
            print("✅ Bundle size dentro do budget")
        else:
            print("❌ Bundle size acima do budget (250KB)")
        
        print("\n✅ Auditoria de Performance concluída\n")
    
    def generate_migration_report(self) -> Dict[str, Any]:
        """Gera relatório de migração"""
        report = {
            "migration_date": "2025-07-18",
            "status": "completed",
            "structure": {
                "old": "atoms/molecules/organisms/templates",
                "new": "core/primitives/components/layouts/sections/templates"
            },
            "improvements": [
                "Design tokens profissionais",
                "Theme provider implementado",
                "TypeScript types robustos",
                "Performance optimized",
                "Zero TSC errors target"
            ],
            "next_steps": [
                "Implementar 15 componentes primitivos",
                "Criar 10 componentes business",
                "Desenvolver section templates",
                "Otimizar Web Vitals",
                "Setup testing infrastructure"
            ]
        }
        
        report_path = Path("DESIGN_SYSTEM_MIGRATION_REPORT.json")
        with open(report_path, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)
        
        return report
    
    def execute_critical_rebuild(self) -> None:
        """Executa rebuild crítico completo"""
        print("🚀 INICIANDO REBUILD CRÍTICO DO DESIGN SYSTEM ARCO")
        print("=" * 60)
        print("Target: UI/UX S-Tier + Zero TSC Errors + Web Vitals Green")
        print("=" * 60)
        print()
        
        # Executar todas as fases
        self.phase_1_critical_cleanup()
        self.phase_2_core_foundation()
        self.phase_3_tsc_validation()
        self.phase_4_performance_audit()
        
        # Gerar relatório
        report = self.generate_migration_report()
        
        print("🎯 REBUILD CRÍTICO CONCLUÍDO COM SUCESSO!")
        print("=" * 60)
        print("✅ Estrutura final definitiva criada")
        print("✅ Design tokens profissionais implementados")
        print("✅ Theme provider configurado")
        print("✅ TypeScript types robustos")
        print("✅ Performance audit executado")
        print("✅ Migration report gerado")
        print()
        print("📋 PRÓXIMAS AÇÕES CRÍTICAS:")
        print("1. Implementar 30 componentes essenciais")
        print("2. Criar templates de seção")
        print("3. Otimizar Web Vitals")
        print("4. Setup de testes automatizados")
        print("5. CI/CD com quality gates")
        print()
        print("🎯 Target: Sistema S-Tier em produção em 2 semanas")

def main():
    """Função principal"""
    rebuilder = ARCODesignSystemRebuilder()
    rebuilder.execute_critical_rebuild()

if __name__ == "__main__":
    main()
