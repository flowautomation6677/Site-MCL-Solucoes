import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const oldTerm = process.argv[2];
const newName = process.argv[3];

if (!oldTerm || !newName) {
  console.log('Uso: npx tsx processo/Alterar_Nome_Produto/atualizar_nome.ts "termo antigo" "novo nome completo"');
  process.exit(1);
}

void (async () => {
  try {
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
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
})();
