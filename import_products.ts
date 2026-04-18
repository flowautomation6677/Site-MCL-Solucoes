import { PrismaClient } from '@prisma/client'
import fs from 'node:fs'
import path from 'node:path'

const prisma = new PrismaClient()

function slugify(text: string) {
  return text.toString().toLowerCase()
    .replaceAll(/[àáâãäå]/g,"a")
    .replaceAll("æ","ae")
    .replaceAll("ç","c")
    .replaceAll(/[èéêë]/g,"e")
    .replaceAll(/[ìíîï]/g,"i")
    .replaceAll("ñ","n")
    .replaceAll(/[òóôõö]/g,"o")
    .replaceAll("œ","oe")
    .replaceAll(/[ùúûü]/g,"u")
    .replaceAll(/[ýÿ]/g,"y")
    .replaceAll(/\s+/g, '-')
    .replaceAll(/[^\w-]+/g, '')
    .replaceAll(/--+/g, '-')
    .replaceAll(/^-+/g, '')
    .replaceAll(/-+$/g, '');
}

function classifyTone(name: string): string {
    const lowerName = name.toLowerCase();
    
    // Palavras-chave para tons claros
    const claros = ['nórdica', 'vanilla', 'prata', 'algodão', 'areia', 'ouro branco', 'cinza', 'nevoeiro', 'luz', 'veneto', 'cimento', 'nice', 'claro', 'bolonha', 'chamonix', 'calais', 'nagoya', 'álamo'];
    
    // Palavras-chave para tons escuros
    const escuros = ['moka', 'preto', 'antigo', 'chocolate', 'cosmos', 'terra', 'escuro', 'belgrado', 'petrópolis', 'versalhes'];
    
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
    
    // Removemos os campos não necessários ou que serão gerados de novo
    const cleanProducts = allProducts.map(({ id, createdAt, updatedAt, ...rest }: any) => rest);

    const seedContent = `
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const productsData = ${JSON.stringify(cleanProducts, null, 2)};

  console.log('🌱 Semeando banco de dados com ' + productsData.length + ' produtos...')

  // Limpeza de produtos duplicados gerados previamente (se necessário)
  await prisma.product.deleteMany({
    where: { slug: 'piso-laminado-eucafloor-new-evidence-veneto' }
  });

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
    console.log('✅ prisma/seed.ts gerado com todos os ' + cleanProducts.length + ' produtos auto-contidos.');
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
    if (!/\.(jpe?g|png|gif|webp)$/i.test(file)) continue;
    
    const nameRaw = path.parse(file).name;
    const parts = nameRaw.split('-').map(s => s.trim());
    
    let parsedCategory = "Laminado";
    let parsedTone = "";
    let parsedName = nameRaw;

    if (parts.length >= 3) {
        parsedCategory = parts[0];
        parsedTone = parts[1];
        parsedName = parts.slice(2).join(' '); // Junta o resto caso tenha mais hífens
    } else if (parts.length === 2) {
        parsedCategory = parts[0];
        parsedName = parts[1];
    } else {
        parsedCategory = parts[0];
        parsedName = parts[0];
    }

    let category = "Laminado";
    if (parsedCategory.toLowerCase().includes("vinílico") || parsedCategory.toLowerCase().includes("vinilico")) {
        category = "Vinílico";
    }

    // Tratamento para montar o nome final do produto
    let fullProductName = parsedName;
    if (parts.length === 2) {
        let extraLineInfo = parsedCategory.replace(/Piso(?:s)?\s+/i, '').replace(/(?:Laminado|vin[ií]lico(?: colado)?)(?:\s+|-)?/i, '').trim();
        if (extraLineInfo.length > 0) {
            fullProductName = `${extraLineInfo} ${parsedName}`;
        }
    }

    // Remove eventuais hífens residuais e aplica o Capitalize a cada palavra
    let cleanName = fullProductName.replace(/-/g, ' ').replace(/\s+/g, ' ').trim();
    cleanName = cleanName.replaceAll(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());

    // Gera o slug limpo (URL-friendly)
    let slug = slugify(cleanName);
    if (!slug) slug = `produto-${Date.now()}`;
    
    const ext = path.extname(file).toLowerCase();
    const newFileName = `${slug}${ext}`;

    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(destDir, newFileName);
    
    // Copia e salva a imagem do produto usando o slug configurado
    fs.copyFileSync(sourcePath, destPath);

    const imageUrl = `/images/produtos/${newFileName}`;
    
    let finalTone = classifyTone(cleanName);
    if (parsedTone && (parsedTone.toLowerCase().includes('claro') || parsedTone.toLowerCase().includes('escuro') || parsedTone.toLowerCase().includes('quente'))) {
        if (parsedTone.toLowerCase().includes('claro')) finalTone = "Claros";
        else if (parsedTone.toLowerCase().includes('escuro')) finalTone = "Escuros";
        else finalTone = "Amadeirados Quentes";
    }

    // Formata o copy do JSON de Description
    const techSpecsMisc = JSON.stringify({
        "Descrição": `O piso ${category.toLowerCase()} ${cleanName} proporciona uma experiência de ambiente elevada. Com excelente conforto termoacústico, ele absorve impactos e transforma qualquer cômodo em um espaço mais silencioso e aconchegante. Seu design elegante traz modernidade aos projetos, e sua superfície facilita a limpeza rápida do dia a dia, simplificando a rotina com máxima praticidade.`
    });

    console.log(`🔨 Inserindo: ${cleanName} | Categoria: ${category} | Tom: ${finalTone} | Slug: ${slug}`);
    
    await prisma.product.upsert({
        where: { slug },
        update: {
            name: cleanName,
            category,
            tone: finalTone,
            imageUrl,
            techSpecsMisc
        },
        create: {
            name: cleanName,
            slug,
            category,
            tone: finalTone,
            imageUrl,
            techSpecsMisc
        }
    });
  }

  console.log("✅ Importação no Banco de Dados concluída com sucesso.");
  
  console.log("🔄 Gerando nova Semente (Seed) do Prisma para o Coolify...");
  await updateSeed();
}

void (async () => {
  try {
      await main();
  } catch (e) {
      console.error("Erro na importação final:", e);
      await prisma.$disconnect();
      process.exit(1);
  } finally {
      await prisma.$disconnect();
  }
})();
