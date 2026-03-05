import fs from 'fs';

const htmlContent = fs.readFileSync('C:\\Users\\luiza\\Downloads\\projeto site mcl\\projeto.html', 'utf-8');

const match = htmlContent.match(/const products = \[([\s\S]*?)\];/);

let productsStr = `[${match[1]}]`;
const productsArray = Function('"use strict";return (' + productsStr + ')')();

const newProducts = productsArray.filter(p => p.category === 'laminados' || p.category === 'vinilicos').map(p => {
    const category = p.category === 'laminados' ? 'Laminado' : 'Vinilico';
    const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + p.id;

    // Attempt to guess tone
    let tone = 'Tons Claros';
    const nameLower = p.name.toLowerCase();
    if (nameLower.includes('escuro') || nameLower.includes('noce') || nameLower.includes('cacau') || nameLower.includes('castanho') || nameLower.includes('malaga') || nameLower.includes('chocolate')) {
        tone = 'Tons Escuros';
    } else if (nameLower.includes('carvalho') || nameLower.includes('amendoa') || nameLower.includes('rustico') || nameLower.includes('natural') || nameLower.includes('quente')) {
        tone = 'Amadeirados Quentes';
    } else if (nameLower.includes('claro') || nameLower.includes('kalahari') || nameLower.includes('decape') || nameLower.includes('andorra') || nameLower.includes('cinza') || nameLower.includes('prata')) {
        tone = 'Tons Claros';
    }

    // Generate an appropriate description
    let description = '';
    if (category === 'Laminado') {
        description = `O piso laminado ${p.name} oferece o equilíbrio ideal entre durabilidade e sofisticação. Sua tecnologia avançada garante alta resistência a riscos e facilidade de limpeza, tornando-o perfeito para ambientes residenciais e comerciais de tráfego moderado. Transforme seu espaço com o conforto e a estética acolhedora da madeira.`;
    } else {
        description = `O piso vinílico ${p.name} é a solução inteligente para quem busca praticidade sem abrir mão da elegância. 100% resistente à água, é ideal para todos os ambientes internos. Este padrão confere um visual contemporâneo, somado a um excelente conforto acústico e térmico.`;
    }

    // Slugify image URL to match safely on Linux
    const imgParts = p.image.split('/');
    const imgFile = imgParts.pop();
    const extMatch = imgFile.match(/\.([^.]+)$/);
    const ext = extMatch ? extMatch[0].toLowerCase() : '';
    const rawBase = imgFile.replace(extMatch ? extMatch[0] : '', '');
    let cleanBase = rawBase.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    cleanBase = cleanBase.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '').toLowerCase();
    const safeImageUrl = '/' + imgParts.join('/') + '/' + cleanBase + ext;

    return {
        name: p.name,
        slug: slug,
        category: category,
        tone: tone,
        imageUrl: safeImageUrl,
        benefits: JSON.stringify(['Instalação rápida', 'Acabamento impecável', category === 'Laminado' ? 'Conforto Térmico' : 'Resistente à Água']),
        thickness: category === 'Laminado' ? '7mm' : '5mm',
        resistance: category === 'Laminado' ? 'AC3' : '0.30mm (Capa)',
        warranty: '10 anos',
        techSpecsMisc: JSON.stringify({
            'Descrição': description
        })
    };
});

const seedContent = `import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const products = ${JSON.stringify(newProducts, null, 4)}

async function main() {
    await prisma.product.deleteMany({})

    for (const prod of products) {
        await prisma.product.create({
            data: prod
        })
    }
    console.log('Seed completo. ' + products.length + ' produtos inseridos.')
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

fs.writeFileSync('C:\\Users\\luiza\\OneDrive\\Documentos\\Antigravity\\Site MCL Soluções\\prisma\\seed.ts', seedContent);

const apiRouteContent = `import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const products = ${JSON.stringify(newProducts, null, 4)};

export async function GET() {
    try {
        await prisma.product.deleteMany({});
        for (const prod of products) {
            await prisma.product.create({
                data: prod
            });
        }
        return NextResponse.json({ message: 'Database seeded successfully', count: products.length });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
`;

const apiDir = 'C:\\Users\\luiza\\OneDrive\\Documentos\\Antigravity\\Site MCL Soluções\\app\\api\\seed';
if (!fs.existsSync(apiDir)) {
    fs.mkdirSync(apiDir, { recursive: true });
}
fs.writeFileSync(apiDir + '\\route.ts', apiRouteContent);

console.log("Updated seed.ts and generated app/api/seed/route.ts for production.");
