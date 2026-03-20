import fs from 'node:fs';

const products = JSON.parse(fs.readFileSync('all_products.json', 'utf-8'));

const veneto = {
  name: 'Eucafloor New Evidênce Veneto',
  slug: 'piso-laminado-eucafloor-new-evidence-veneto',
  category: 'Laminado',
  tone: 'Claros',
  imageUrl: '/images/produtos/piso-laminado-eucafloor-new-evidence-veneto.jpeg',
  techSpecsMisc: JSON.stringify({
    'Descrição': 'O Piso Laminado Eucafloor New Evidênce Veneto é a escolha perfeita para ambientes que buscam elegância, conforto termoacústico e alta durabilidade.'
  })
};

if (!products.some((p: any) => p.slug === veneto.slug)) {
  products.push(veneto);
}

// Clean products for the seed (remove ids, dates)
const cleanProducts = products.map(({ id, createdAt, updatedAt, ...rest }: any) => rest);

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
console.log('✅ prisma/seed.ts gerado com sucesso.');
