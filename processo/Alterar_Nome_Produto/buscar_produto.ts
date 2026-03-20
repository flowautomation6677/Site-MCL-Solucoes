import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Pega o termo de busca dos argumentos da linha de comando
  const searchTerm = process.argv[2];

  if (!searchTerm) {
    console.log('Uso: npx tsx processo/buscar_produto.ts "termo de busca"');
    process.exit(1);
  }

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
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
