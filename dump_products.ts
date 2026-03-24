import { PrismaClient } from '@prisma/client';
import fs from 'node:fs';

const prisma = new PrismaClient();

try {
  const products = await prisma.product.findMany();
  fs.writeFileSync('all_products.json', JSON.stringify(products, null, 2));
} catch (e) {
  console.error(e);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
