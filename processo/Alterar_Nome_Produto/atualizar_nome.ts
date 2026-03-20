import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const oldTerm = process.argv[2];
  const newName = process.argv[3];

  if (!oldTerm || !newName) {
    console.log('Uso: npx tsx processo/atualizar_nome.ts "termo antigo" "novo nome completo"');
    process.exit(1);
  }

  const result = await prisma.product.updateMany({
    where: {
      name: {
        contains: oldTerm,
        mode: 'insensitive'
      }
    },
    data: {
      name: newName
    }
  })

  console.log(`✅ Sucesso! Foram atualizados ${result.count} produto(s).`);
  console.log(`Novo nome: "${newName}"`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
