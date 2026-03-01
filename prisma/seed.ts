import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const products = [
    // === LAMINADOS PRIME CLICK ===
    {
        name: 'Kalahari (Prime Click)',
        slug: 'kalahari-prime-click',
        category: 'Laminado',
        tone: 'Tons Claros',
        imageUrl: '/textura_kalahari_claro.png',
        benefits: JSON.stringify(['Sistema Click - Instalação rápida', 'Proteção Bacterban', 'Uso: AC3']),
        thickness: '7mm',
        resistance: 'AC3',
        warranty: '12 anos res. / 2 anos com.',
        techSpecsMisc: JSON.stringify({ 'Dimensões': '217 x 1357mm', 'Espessura': '7mm', 'Caixa': '2,36 m²', 'Sistema': 'CLICK' })
    },
    {
        name: 'Carvalho Coimbra (Prime Click)',
        slug: 'carvalho-coimbra-prime-click',
        category: 'Laminado',
        tone: 'Tons Claros',
        imageUrl: '/textura_kalahari_claro.png',
        benefits: JSON.stringify(['Sistema Click - Instalação rápida', 'Proteção Bacterban', 'Uso: AC3']),
        thickness: '7mm',
        resistance: 'AC3',
        warranty: '12 anos res. / 2 anos com.',
        techSpecsMisc: JSON.stringify({ 'Dimensões': '217 x 1357mm', 'Espessura': '7mm', 'Caixa': '2,36 m²', 'Sistema': 'CLICK' })
    },
    {
        name: 'Decapê (Prime Click)',
        slug: 'decape-prime-click',
        category: 'Laminado',
        tone: 'Tons Claros',
        imageUrl: '/textura_decape_acinzentado.png',
        benefits: JSON.stringify(['Sistema Click - Instalação rápida', 'Proteção Bacterban', 'Uso: AC3']),
        thickness: '7mm',
        resistance: 'AC3',
        warranty: '12 anos res. / 2 anos com.',
        techSpecsMisc: JSON.stringify({ 'Dimensões': '217 x 1357mm', 'Espessura': '7mm', 'Caixa': '2,36 m²', 'Sistema': 'CLICK' })
    },
    {
        name: 'Carvalho Canela (Prime Click)',
        slug: 'carvalho-canela-prime-click',
        category: 'Laminado',
        tone: 'Amadeirados Quentes',
        imageUrl: '/textura_carvalho_quente.png',
        benefits: JSON.stringify(['Sistema Click - Instalação rápida', 'Proteção Bacterban', 'Uso: AC3']),
        thickness: '7mm',
        resistance: 'AC3',
        warranty: '12 anos res. / 2 anos com.',
        techSpecsMisc: JSON.stringify({ 'Dimensões': '217 x 1357mm', 'Espessura': '7mm', 'Caixa': '2,36 m²', 'Sistema': 'CLICK' })
    },
    {
        name: 'Lâmina Amêndoa (Prime Click)',
        slug: 'lamina-amendoa-prime-click',
        category: 'Laminado',
        tone: 'Amadeirados Quentes',
        imageUrl: '/textura_carvalho_quente.png',
        benefits: JSON.stringify(['Sistema Click - Instalação rápida', 'Proteção Bacterban', 'Uso: AC3']),
        thickness: '7mm',
        resistance: 'AC3',
        warranty: '12 anos res. / 2 anos com.',
        techSpecsMisc: JSON.stringify({ 'Dimensões': '217 x 1357mm', 'Espessura': '7mm', 'Caixa': '2,36 m²', 'Sistema': 'CLICK' })
    },
    {
        name: 'Italian Noce (Prime Click)',
        slug: 'italian-noce-prime-click',
        category: 'Laminado',
        tone: 'Tons Escuros',
        imageUrl: '/textura_nogueira_escuro.png',
        benefits: JSON.stringify(['Sistema Click - Instalação rápida', 'Proteção Bacterban', 'Uso: AC3']),
        thickness: '7mm',
        resistance: 'AC3',
        warranty: '12 anos res. / 2 anos com.',
        techSpecsMisc: JSON.stringify({ 'Dimensões': '217 x 1357mm', 'Espessura': '7mm', 'Caixa': '2,36 m²', 'Sistema': 'CLICK' })
    },
    {
        name: 'Carvalho Rústico (Prime Click)',
        slug: 'carvalho-rustico-prime-click',
        category: 'Laminado',
        tone: 'Amadeirados Quentes',
        imageUrl: '/textura_carvalho_quente.png',
        benefits: JSON.stringify(['Sistema Click - Instalação rápida', 'Proteção Bacterban', 'Uso: AC3']),
        thickness: '7mm',
        resistance: 'AC3',
        warranty: '12 anos res. / 2 anos com.',
        techSpecsMisc: JSON.stringify({ 'Dimensões': '217 x 1357mm', 'Espessura': '7mm', 'Caixa': '2,36 m²', 'Sistema': 'CLICK' })
    },
    {
        name: 'Andorra New (Prime Click)',
        slug: 'andorra-new-prime-click',
        category: 'Laminado',
        tone: 'Tons Claros',
        imageUrl: '/textura_kalahari_claro.png',
        benefits: JSON.stringify(['Sistema Click - Instalação rápida', 'Proteção Bacterban', 'Uso: AC3']),
        thickness: '7mm',
        resistance: 'AC3',
        warranty: '12 anos res. / 2 anos com.',
        techSpecsMisc: JSON.stringify({ 'Dimensões': '217 x 1357mm', 'Espessura': '7mm', 'Caixa': '2,36 m²', 'Sistema': 'CLICK' })
    },
    {
        name: 'Nogueira Málaga (Prime Click)',
        slug: 'nogueira-malaga-prime-click',
        category: 'Laminado',
        tone: 'Tons Escuros',
        imageUrl: '/textura_nogueira_escuro.png',
        benefits: JSON.stringify(['Sistema Click - Instalação rápida', 'Proteção Bacterban', 'Uso: AC3']),
        thickness: '7mm',
        resistance: 'AC3',
        warranty: '12 anos res. / 2 anos com.',
        techSpecsMisc: JSON.stringify({ 'Dimensões': '217 x 1357mm', 'Espessura': '7mm', 'Caixa': '2,36 m²', 'Sistema': 'CLICK' })
    },

    // === LAMINADOS PRIME (COLADO) ===
    {
        name: 'Nogueira Natural (Prime)',
        slug: 'nogueira-natural-prime',
        category: 'Laminado',
        tone: 'Amadeirados Quentes',
        imageUrl: '/textura_carvalho_quente.png',
        benefits: JSON.stringify(['Tradicional Sistema Colado', 'Proteção Bacterban', 'Uso: AC3']),
        thickness: '7mm',
        resistance: 'AC3',
        warranty: '12 anos res.',
        techSpecsMisc: JSON.stringify({ 'Dimensões': '197 x 1357mm', 'Espessura': '7mm', 'Caixa': '2,14 m²', 'Sistema': 'COLADO' })
    },
    {
        name: 'Elmo Natural (Prime)',
        slug: 'elmo-natural-prime',
        category: 'Laminado',
        tone: 'Tons Claros',
        imageUrl: '/textura_kalahari_claro.png',
        benefits: JSON.stringify(['Tradicional Sistema Colado', 'Proteção Bacterban', 'Uso: AC3']),
        thickness: '7mm',
        resistance: 'AC3',
        warranty: '12 anos res.',
        techSpecsMisc: JSON.stringify({ 'Dimensões': '197 x 1357mm', 'Espessura': '7mm', 'Caixa': '2,14 m²', 'Sistema': 'COLADO' })
    },
    {
        name: 'Noce Oro (Prime)',
        slug: 'noce-oro-prime',
        category: 'Laminado',
        tone: 'Amadeirados Quentes',
        imageUrl: '/textura_carvalho_quente.png',
        benefits: JSON.stringify(['Tradicional Sistema Colado', 'Proteção Bacterban', 'Uso: AC3']),
        thickness: '7mm',
        resistance: 'AC3',
        warranty: '12 anos res.',
        techSpecsMisc: JSON.stringify({ 'Dimensões': '197 x 1357mm', 'Espessura': '7mm', 'Caixa': '2,14 m²', 'Sistema': 'COLADO' })
    },
    {
        name: 'Castanho Terracota (Prime)',
        slug: 'castanho-terracota-prime',
        category: 'Laminado',
        tone: 'Tons Escuros',
        imageUrl: '/textura_nogueira_escuro.png',
        benefits: JSON.stringify(['Tradicional Sistema Colado', 'Proteção Bacterban', 'Uso: AC3']),
        thickness: '7mm',
        resistance: 'AC3',
        warranty: '12 anos res.',
        techSpecsMisc: JSON.stringify({ 'Dimensões': '197 x 1357mm', 'Espessura': '7mm', 'Caixa': '2,14 m²', 'Sistema': 'COLADO' })
    },
    {
        name: 'Valência (Prime)',
        slug: 'valencia-prime',
        category: 'Laminado',
        tone: 'Tons Claros',
        imageUrl: '/textura_kalahari_claro.png',
        benefits: JSON.stringify(['Tradicional Sistema Colado', 'Proteção Bacterban', 'Uso: AC3']),
        thickness: '7mm',
        resistance: 'AC3',
        warranty: '12 anos res.',
        techSpecsMisc: JSON.stringify({ 'Dimensões': '197 x 1357mm', 'Espessura': '7mm', 'Caixa': '2,14 m²', 'Sistema': 'COLADO' })
    },
    {
        name: 'Cacau (Prime)',
        slug: 'cacau-prime',
        category: 'Laminado',
        tone: 'Tons Escuros',
        imageUrl: '/textura_nogueira_escuro.png',
        benefits: JSON.stringify(['Tradicional Sistema Colado', 'Proteção Bacterban', 'Uso: AC3']),
        thickness: '7mm',
        resistance: 'AC3',
        warranty: '12 anos res.',
        techSpecsMisc: JSON.stringify({ 'Dimensões': '197 x 1357mm', 'Espessura': '7mm', 'Caixa': '2,14 m²', 'Sistema': 'COLADO' })
    },
    {
        name: 'Fresno Decapê New (Prime)',
        slug: 'fresno-decape-new-prime',
        category: 'Laminado',
        tone: 'Tons Claros',
        imageUrl: '/textura_decape_acinzentado.png',
        benefits: JSON.stringify(['Tradicional Sistema Colado', 'Proteção Bacterban', 'Uso: AC3']),
        thickness: '7mm',
        resistance: 'AC3',
        warranty: '12 anos res.',
        techSpecsMisc: JSON.stringify({ 'Dimensões': '197 x 1357mm', 'Espessura': '7mm', 'Caixa': '2,14 m²', 'Sistema': 'COLADO' })
    },
    {
        name: 'Carvalho Maiorca (Prime)',
        slug: 'carvalho-maiorca-prime',
        category: 'Laminado',
        tone: 'Tons Claros',
        imageUrl: '/textura_kalahari_claro.png',
        benefits: JSON.stringify(['Tradicional Sistema Colado', 'Proteção Bacterban', 'Uso: AC3']),
        thickness: '7mm',
        resistance: 'AC3',
        warranty: '12 anos res.',
        techSpecsMisc: JSON.stringify({ 'Dimensões': '197 x 1357mm', 'Espessura': '7mm', 'Caixa': '2,14 m²', 'Sistema': 'COLADO' })
    },
    {
        name: 'Carvalho New (Prime)',
        slug: 'carvalho-new-prime',
        category: 'Laminado',
        tone: 'Amadeirados Quentes',
        imageUrl: '/textura_carvalho_quente.png',
        benefits: JSON.stringify(['Tradicional Sistema Colado', 'Proteção Bacterban', 'Uso: AC3']),
        thickness: '7mm',
        resistance: 'AC3',
        warranty: '12 anos res.',
        techSpecsMisc: JSON.stringify({ 'Dimensões': '197 x 1357mm', 'Espessura': '7mm', 'Caixa': '2,14 m²', 'Sistema': 'COLADO' })
    },
    {
        name: 'Cappuccino (Prime)',
        slug: 'cappuccino-prime',
        category: 'Laminado',
        tone: 'Amadeirados Quentes',
        imageUrl: '/textura_carvalho_quente.png',
        benefits: JSON.stringify(['Tradicional Sistema Colado', 'Proteção Bacterban', 'Uso: AC3']),
        thickness: '7mm',
        resistance: 'AC3',
        warranty: '12 anos res.',
        techSpecsMisc: JSON.stringify({ 'Dimensões': '197 x 1357mm', 'Espessura': '7mm', 'Caixa': '2,14 m²', 'Sistema': 'COLADO' })
    },

    // === VINÍLICOS (MOCK) ===
    {
        name: 'Carvalho Natural SPC',
        slug: 'carvalho-natural-spc',
        category: 'Vinilico',
        tone: 'Tons Claros',
        imageUrl: '/textura_kalahari_claro.png',
        benefits: JSON.stringify(['Resistente a água', 'Conforto térmico']),
        thickness: '5mm',
        resistance: '0.30mm (Capa)',
        warranty: '10 anos',
        techSpecsMisc: JSON.stringify({ 'Espessura': '5mm', 'Camada de Uso': '0.30mm', 'Instalação': 'Click' })
    },
    {
        name: 'Nogueira Rústica SPC',
        slug: 'nogueira-rustica-spc',
        category: 'Vinilico',
        tone: 'Tons Escuros',
        imageUrl: '/textura_nogueira_escuro.png',
        benefits: JSON.stringify(['Resistente a água', 'Conforto térmico', 'Fácil limpeza']),
        thickness: '6mm',
        resistance: '0.50mm (Capa)',
        warranty: '15 anos',
        techSpecsMisc: JSON.stringify({ 'Espessura': '6mm', 'Camada de Uso': '0.50mm', 'Instalação': 'Colado' })
    },
    {
        name: 'Ipê Amadeirado',
        slug: 'ipe-amadeirado-vinilico',
        category: 'Vinilico',
        tone: 'Amadeirados Quentes',
        imageUrl: '/textura_carvalho_quente.png',
        benefits: JSON.stringify(['Resistente a água', 'Conforto térmico']),
        thickness: '4mm',
        resistance: '0.20mm (Capa)',
        warranty: '5 anos',
        techSpecsMisc: JSON.stringify({ 'Espessura': '4mm', 'Camada de Uso': '0.20mm', 'Instalação': 'Colado' })
    }
]

async function main() {
    // Delete existing records to avoid duplicates/old test data
    await prisma.product.deleteMany({})

    for (const prod of products) {
        await prisma.product.create({
            data: prod
        })
    }
    console.log('Seed completo. 19 linhas Prime/Prime Click inseridas + 3 vinílicos.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
