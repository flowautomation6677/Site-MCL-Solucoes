import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function main() {
    const products = await prisma.product.findMany({
        where: { name: { contains: 'Veneto', mode: 'insensitive' } }
    });
    
    console.log('Encontrados para deletar:', products.map(p => p.name));

    for (const p of products) {
        await prisma.product.delete({ where: { id: p.id } });
        console.log('Deletado do banco:', p.name);
        
        // delete image
        const imgPath = path.join(process.cwd(), 'public', p.imageUrl);
        if (fs.existsSync(imgPath)) {
            fs.unlinkSync(imgPath);
            console.log('Imagem deletada:', p.imageUrl);
        }
    }
}

main()
  .then(() => console.log('Finalizado'))
  .catch(console.error)
  .finally(() => prisma.$disconnect());
