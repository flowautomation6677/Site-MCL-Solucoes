import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const prisma = new PrismaClient()

function slugify(text: string) {
  return text.toString().toLowerCase()
    .replace(/[àáâãäå]/g,"a")
    .replace(/æ/g,"ae")
    .replace(/ç/g,"c")
    .replace(/[èéêë]/g,"e")
    .replace(/[ìíîï]/g,"i")
    .replace(/ñ/g,"n")
    .replace(/[òóôõö]/g,"o")
    .replace(/œ/g,"oe")
    .replace(/[ùúûü]/g,"u")
    .replace(/[ýÿ]/g,"y")
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

async function main() {
  const currentDir = process.cwd();
  const sourceDir = path.join(currentDir, 'produtos_colocar_site');
  const destDir = path.join(currentDir, 'public', 'images', 'produtos');

  if (!fs.existsSync(destDir)) {
      // If folder is gone, we just skip image copying part but we want to regenerate the data
      console.log("Pasta de origem não encontrada, pulando cópia de imagens.");
  } else {
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
  }

  const files = fs.existsSync(sourceDir) ? fs.readdirSync(sourceDir) : [];

  for (const file of files) {
    if (!file.match(/\.(jpe?g|png|gif|webp)$/i)) continue;
    
    let category = "Laminado";
    let nameRaw = path.parse(file).name;
    
    if (nameRaw.toLowerCase().includes("vinílico") || nameRaw.toLowerCase().includes("vinilico")) {
        category = "Vinilico"; // REMOVED ACCENT TO MATCH FRONTEND BETTER
    }

    let cleanName = nameRaw
        .replace(/Piso(?:s)?\s+/i, '')
        .replace(/(?:Laminado|vin[ií]lico(?: colado)?)(?:\s+|-)?/i, '')
        .trim();
    
    cleanName = cleanName.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

    let slug = slugify(cleanName);
    if (!slug) slug = `produto-${Date.now()}`;
    
    const ext = path.extname(file);
    const newFileName = `${slug}${ext}`;

    if (fs.existsSync(sourceDir)) {
        const sourcePath = path.join(sourceDir, file);
        const destPath = path.join(destDir, newFileName);
        fs.copyFileSync(sourcePath, destPath);
    }

    const imageUrl = `/images/produtos/${newFileName}`;

    let tone = "Amadeirados Quentes";
    if (cleanName.toLowerCase().includes("claro") || cleanName.toLowerCase().includes("nóorica") || cleanName.toLowerCase().includes("nórdica") || cleanName.toLowerCase().includes("vanilla") || cleanName.toLowerCase().includes("prata")) {
        tone = "Claros";
    } else if (cleanName.toLowerCase().includes("escuro") || cleanName.toLowerCase().includes("antigo") || cleanName.toLowerCase().includes("moka") || cleanName.toLowerCase().includes("preto")) {
        tone = "Escuros";
    }

    const techSpecsMisc = JSON.stringify({
        "Descrição": `O Piso ${category} ${cleanName} é a escolha perfeita para ambientes que buscam elegância, conforto termoacústico e alta durabilidade, combinando perfeitamente com projetos contemporâneos e clássicos.`
    });

    console.log(`Inserindo produto: ${cleanName} | Categoria: ${category} | Slug: ${slug}`);
    
    await prisma.product.upsert({
        where: { slug },
        update: {
            name: cleanName,
            category,
            tone,
            imageUrl,
            techSpecsMisc
        },
        create: {
            name: cleanName,
            slug,
            category,
            tone,
            imageUrl,
            techSpecsMisc
        }
    });
  }

  console.log("Importação concluída.");
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error("Erro:", e)
    await prisma.$disconnect()
    process.exit(1)
  })
