import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const result = await prisma.product.updateMany({
    where: {
      name: {
        contains: 'Belmonte',
        mode: 'insensitive'
      }
    },
    data: {
      name: 'Piso Laminado Gran Elegance Belmonte'
    }
  })
  console.log(`Updated ${result.count} product(s).`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
