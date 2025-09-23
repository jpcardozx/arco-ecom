Write-Host "Iniciando a análise e resolução de problemas do projeto ARCO..." -ForegroundColor Cyan

# Função para verificar se existe arquivo específico
function Test-FileOrDirExists($path) {
    return Test-Path $path
}

# Lista de possíveis problemas a serem verificados
$possibleIssues = @(
    @{
        Name = "Diretório Build Corrompido";
        Check = { Test-FileOrDirExists ".next" -or Test-FileOrDirExists "build" };
        Fix = {
            Write-Host "  - Removendo diretórios de build..." -ForegroundColor Yellow
            if (Test-Path ".next") { Remove-Item -Recurse -Force .next }
            if (Test-Path "build") { Remove-Item -Recurse -Force build }
        }
    },
    @{
        Name = "Configuração PostCSS incorreta para Tailwind v4";
        Check = { 
            $postcssContent = Get-Content -Raw .\postcss.config.js
            -not $postcssContent.Contains('@tailwindcss/postcss')
        };
        Fix = {
            Write-Host "  - Corrigindo configuração do PostCSS..." -ForegroundColor Yellow
            $postcssContent = @"
// Next.js requires a CommonJS format for PostCSS config
// Configured for Tailwind CSS v4
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {
      config: './tailwind.config.ts',
      showDiagnostics: true,
    },
    autoprefixer: {},
  },
};
"@
            Set-Content -Path .\postcss.config.js -Value $postcssContent
        }
    },
    @{
        Name = "Imports incorretos do Tailwind";
        Check = { 
            $globalsContent = Get-Content -Raw .\src\app\globals.css
            -not $globalsContent.Contains('@import')
        };
        Fix = {
            Write-Host "  - Corrigindo imports do Tailwind no globals.css..." -ForegroundColor Yellow
            $cssContent = @"
/* 
   Tailwind CSS v4 imports 
   In v4, @import is recommended over @tailwind
*/
@import 'tailwindcss/preflight';
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/**
 * ARCO - Sistema de Design de Classe Mundial
 * Configuração de estilos globais com suporte a temas claro/escuro
 * e otimizações de renderização
 * Compatível com Tailwind CSS v4
 */

@layer base {
  /* Resto do conteúdo permanece igual */
"@
            (Get-Content .\src\app\globals.css) | 
                Select-Object -Skip 13 | 
                ForEach-Object { if ($_ -match "@layer base \{") { $cssContent } else { $_ } } |
                Set-Content .\src\app\globals.css.temp
            Move-Item -Force .\src\app\globals.css.temp .\src\app\globals.css
        }
    }
)

# Verificar e corrigir problemas
$problemsFound = $false
foreach ($issue in $possibleIssues) {
    Write-Host "Verificando: $($issue.Name)" -ForegroundColor Gray
    if (& $issue.Check) {
        Write-Host "✗ Problema encontrado: $($issue.Name)" -ForegroundColor Red
        & $issue.Fix
        $problemsFound = $true
    } else {
        Write-Host "✓ $($issue.Name) está OK" -ForegroundColor Green
    }
    Write-Host ""
}

if ($problemsFound) {
    Write-Host "Problemas foram encontrados e corrigidos. Reconstruindo o projeto..." -ForegroundColor Yellow
    pnpm run deep-clean
} else {
    Write-Host "Nenhum problema conhecido foi encontrado!" -ForegroundColor Green
}

Write-Host "Verificando conflitos de dependências..." -ForegroundColor Cyan
pnpm install

Write-Host "Análise e correção concluídas!" -ForegroundColor Green
Write-Host "Para iniciar o servidor de desenvolvimento, execute: pnpm run dev" -ForegroundColor Magenta
