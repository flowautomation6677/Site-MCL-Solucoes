import { PrismaClient } from '@prisma/client'
import fs from 'node:fs'
import path from 'node:path'

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

function classifyTone(name: string): string {
    const lowerName = name.toLowerCase();
    
    // Palavras-chave para tons claros
    const claros = ['nórdica', 'vanilla', 'prata', 'algodão', 'areia', 'ouro branco', 'cinza', 'nevoeiro', 'luz', 'veneto', 'cimento', 'nice', 'claro', 'bolonha'];
    
    // Palavras-chave para tons escuros
    const escuros = ['moka', 'preto', 'antigo', 'chocolate', 'cosmos', 'terra', 'escuro'];
    
    for (const kw of claros) {
        if (lowerName.includes(kw)) return "Claros";
    }
    for (const kw of escuros) {
        if (lowerName.includes(kw)) return "Escuros";
    }
    
    // Fallback padrão para a grande maioria das madeiras tradicionais
    return "Amadeirados Quentes"; 
}

async function updateSeed() {
    const allProducts = await prisma.product.findMany();
    
    const cleanProducts = allProducts.map(({ id, createdAt, updatedAt, ...rest }: any) => rest);

    const seedContent = `
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const productsData = ${JSON.stringify(cleanProducts, null, 2)};

  console.log('🌱 Semeando banco de dados com ' + productsData.length + ' produtos...')

  for (const data of productsData) {
    await prisma.product.upsert({
      where: { slug: data.slug },
      update: data,
      create: data,
    })
  }

  console.log('✅ Semeadura concluída com sucesso.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
`;

    fs.writeFileSync('prisma/seed.ts', seedContent.trim());
    console.log('✅ prisma/seed.ts gerado com todos os ' + cleanProducts.length + ' produtos.');
}

async function main() {
  const currentDir = process.cwd();
  const sourceDir = path.join(currentDir, 'produtos_cadastrar');
  const destDir = path.join(currentDir, 'public', 'images', 'produtos');

  if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
  }

  if (!fs.existsSync(sourceDir)) {
      console.log(`❌ Pasta ${sourceDir} não encontrada.`);
      return;
  }

  const files = fs.readdirSync(sourceDir);

  for (const file of files) {
    if (!file.match(/\.(jpe?g|png|gif|webp)$/i)) continue;
    
    let category = "Laminado";
    let nameRaw = path.parse(file).name;
    
    if (nameRaw.toLowerCase().includes("vinílico") || nameRaw.toLowerCase().includes("vinilico")) {
        category = "Vinilico";
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

    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(destDir, newFileName);
    fs.copyFileSync(sourcePath, destPath);

    const imageUrl = `/images/produtos/${newFileName}`;
    const tone = classifyTone(cleanName);

    const catLabel = category === 'Vinilico' ? 'Vinílico' : 'Laminado';
    const techSpecsMisc = JSON.stringify({
        "Descrição": `O Piso ${catLabel} ${cleanName} é a escolha perfeita para ambientes que buscam elegância, conforto termoacústico e alta durabilidade, combinando perfeitamente com projetos contemporâneos e clássicos.`
    });

    console.log(`Inserindo: ${cleanName} | Cat: ${category} | Tom: ${tone}`);
    
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

  console.log("✅ Importação no Banco de Dados concluída.");
  
  console.log("🔄 Gerando nova Semente (Seed) para o Coolify...");
  await updateSeed();
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
