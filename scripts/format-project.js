#!/usr/bin/env node

/**
 * Script para automatizar a formatação de código e verificação de erros no projeto
 * Este script executa:
 * 1. Verificação de tipagem
 * 2. Lint com correção automática
 * 3. Formatação de código com Prettier
 * 4. Relatório de erros restantes
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Cores para o terminal
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
};

console.log(`${colors.bright}${colors.blue}=== ARCO PROJECT FORMATTER ===${colors.reset}\n`);

// Função para executar comandos com tratamento de erro
function runCommand(command, description) {
  console.log(`${colors.yellow}→ ${description}${colors.reset}`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`${colors.green}✓ Concluído com sucesso${colors.reset}\n`);
    return true;
  } catch (error) {
    console.error(`${colors.red}✗ Falha na execução: ${error.message}${colors.reset}\n`);
    return false;
  }
}

// Verifica se temos o pnpm disponível
const usePnpm = fs.existsSync(path.join(process.cwd(), 'pnpm-lock.yaml'));
const packageManager = usePnpm ? 'pnpm' : 'npm';

// Execução dos comandos na ordem correta
console.log(
  `${colors.bright}${colors.magenta}Utilizando ${packageManager} como gerenciador de pacotes${colors.reset}\n`
);

// Verificar tipos
runCommand(`${packageManager} run type-check`, 'Verificando tipagem TypeScript');

// Executar lint com correção
runCommand(`${packageManager} run lint:fix`, 'Executando ESLint com correção automática');

// Formatar código
runCommand(`${packageManager} run format`, 'Formatando código com Prettier');

console.log(`${colors.bright}${colors.blue}=== FORMATAÇÃO CONCLUÍDA ===${colors.reset}`);
