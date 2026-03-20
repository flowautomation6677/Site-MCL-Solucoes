import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Pega o termo de busca dos argumentos da linha de comando
const searchTerm = process.argv[2];

if (!searchTerm) {
  console.log('Uso: npx tsx processo/Alterar_Nome_Produto/buscar_produto.ts "termo de busca"');
  process.exit(1);
}

try {
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: 'insensitive'
      }
    }
  })

  if (products.length === 0) {
    console.log(`Nenhum produto encontrado com o termo: "${searchTerm}"`);
  } else {
    console.log(JSON.stringify(products, null, 2));
  }
} catch (error) {
  console.error(error);
} finally {
  await prisma.$disconnect();
}
