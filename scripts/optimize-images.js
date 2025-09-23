#!/usr/bin/env node

/**
 * Script de otimização de imagens para performance crítica
 * Converte e otimiza imagens para WebP/AVIF
 */

const sharp = require('sharp')
const fs = require('fs').promises
const path = require('path')

const PUBLIC_DIR = path.join(process.cwd(), 'public')
const QUALITY = {
  webp: 85,
  avif: 70,
  jpeg: 85
}

async function optimizeImage(inputPath, outputDir) {
  const filename = path.basename(inputPath, path.extname(inputPath))
  const outputWebP = path.join(outputDir, `${filename}.webp`)
  const outputAVIF = path.join(outputDir, `${filename}.avif`)
  
  try {
    // Generate WebP
    await sharp(inputPath)
      .webp({ quality: QUALITY.webp, effort: 6 })
      .toFile(outputWebP)
    
    // Generate AVIF (mais eficiente)
    await sharp(inputPath)
      .avif({ quality: QUALITY.avif, effort: 9 })
      .toFile(outputAVIF)
      
    console.log(`✅ Optimized: ${filename}`)
    
    // Get file sizes for comparison
    const original = await fs.stat(inputPath)
    const webp = await fs.stat(outputWebP)
    const avif = await fs.stat(outputAVIF)
    
    console.log(`   Original: ${(original.size / 1024).toFixed(1)}KB`)
    console.log(`   WebP: ${(webp.size / 1024).toFixed(1)}KB (${Math.round((1 - webp.size/original.size) * 100)}% smaller)`)
    console.log(`   AVIF: ${(avif.size / 1024).toFixed(1)}KB (${Math.round((1 - avif.size/original.size) * 100)}% smaller)`)
    
  } catch (error) {
    console.error(`❌ Error optimizing ${filename}:`, error.message)
  }
}

async function findImages(dir) {
  const files = await fs.readdir(dir, { withFileTypes: true })
  const images = []
  
  for (const file of files) {
    const fullPath = path.join(dir, file.name)
    
    if (file.isDirectory() && file.name !== 'optimized') {
      images.push(...await findImages(fullPath))
    } else if (file.isFile()) {
      const ext = path.extname(file.name).toLowerCase()
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        images.push(fullPath)
      }
    }
  }
  
  return images
}

async function main() {
  console.log('🚀 Iniciando otimização de imagens...')
  
  // Criar diretório de saída
  const optimizedDir = path.join(PUBLIC_DIR, 'optimized')
  await fs.mkdir(optimizedDir, { recursive: true })
  
  // Encontrar todas as imagens
  const images = await findImages(PUBLIC_DIR)
  console.log(`📸 Encontradas ${images.length} imagens para otimizar`)
  
  // Otimizar cada imagem
  for (const imagePath of images) {
    await optimizeImage(imagePath, optimizedDir)
  }
  
  console.log('✨ Otimização concluída!')
  console.log(`📁 Imagens otimizadas salvas em: ${optimizedDir}`)
}

if (require.main === module) {
  main().catch(console.error)
}
