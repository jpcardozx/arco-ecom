"""
Script para limpar e arquivar documentação legada no projeto ARCO
"""

import os
import shutil
from datetime import datetime

# Diretório base do projeto
base_dir = r"c:\Users\João Pedro Cardozo\projetos\arco"
docs_dir = os.path.join(base_dir, "docs")
archive_dir = os.path.join(docs_dir, "archived")

# Criar pasta de arquivos se não existir
if not os.path.exists(archive_dir):
    os.makedirs(archive_dir)
    print(f"Pasta de arquivamento criada: {archive_dir}")

# Adicionar timestamp ao arquivo de log
timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
log_file = os.path.join(base_dir, f"docs-cleanup-log_{timestamp}.txt")

# Função para registrar ações
def log_action(message):
    print(message)
    with open(log_file, 'a', encoding='utf-8') as f:
        f.write(f"{message}\n")

# Pastas legadas para mover para o arquivo
legacy_folders = [
    os.path.join(docs_dir, "legacy"),
    os.path.join(docs_dir, "workflows")
]

# Arquivos legados na raiz para mover para o arquivo
legacy_files = [
    "homepage-narrativa-estrategica.md",
    "homepage-real-analysis.md",
    "homepage-refactoring-report.md",
    "jpcardozx-narrativa-estrategica.md",
    "portfolio-sections-analysis.md",
    "portfolio-sections-improvements-report.md"
]

# Mover pastas legadas
for folder in legacy_folders:
    if os.path.exists(folder):
        folder_name = os.path.basename(folder)
        target_dir = os.path.join(archive_dir, folder_name)
        
        # Garantir que não há conflito no destino
        if os.path.exists(target_dir):
            target_dir = f"{target_dir}_{timestamp}"
            
        try:
            shutil.move(folder, target_dir)
            log_action(f"✅ Pasta movida com sucesso: {folder} -> {target_dir}")
        except Exception as e:
            log_action(f"❌ Erro ao mover pasta {folder}: {str(e)}")
    else:
        log_action(f"⚠️ Pasta não encontrada: {folder}")

# Mover arquivos legados
for file in legacy_files:
    file_path = os.path.join(docs_dir, file)
    if os.path.exists(file_path):
        try:
            target_path = os.path.join(archive_dir, file)
            shutil.move(file_path, target_path)
            log_action(f"✅ Arquivo movido com sucesso: {file_path} -> {target_path}")
        except Exception as e:
            log_action(f"❌ Erro ao mover arquivo {file_path}: {str(e)}")
    else:
        log_action(f"⚠️ Arquivo não encontrado: {file_path}")

# Atualizar o README.md para refletir a nova estrutura
log_action("\n=== Resumo da Limpeza de Documentação ===")
log_action(f"Data: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
log_action(f"Arquivos e pastas legadas movidos para: {archive_dir}")
log_action("Documentação limpa e organizada com sucesso!")
