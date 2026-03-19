import { PrismaClient } from "@prisma/client"
import Image from "next/image"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { ProductFilter } from "../components/ProductFilter"
import { ProductGrid } from "../components/ProductGrid"
import { DollarSign, ShieldCheck, Volume2 } from "lucide-react"

const prisma = new PrismaClient()

export const metadata = {
    title: "Pisos Laminados | MCL Soluções",
    description: "O conforto da madeira com a praticidade que sua rotina exige.",
}

type SearchParamsProps = {
    readonly searchParams: Promise<{ readonly tone?: string; readonly q?: string }>
}

export const dynamic = 'force-dynamic'

export default async function LaminadosPage(props: SearchParamsProps) {
    const params = await props.searchParams
    const toneFilter = params?.tone
    const searchQuery = params?.q

    // Query construction for category = 'Laminado' and optional tone
    const whereClause: any = {
        category: { contains: 'Laminado', mode: 'insensitive' }
    }

    if (toneFilter && toneFilter !== 'todos') {
        // Basic mapping from URL slug to DB values (adjust based on your actual data)
        if (toneFilter === 'tons-claros') whereClause.tone = { contains: 'Claro' }
        if (toneFilter === 'tons-escuros') whereClause.tone = { contains: 'Escuro' }
        if (toneFilter === 'amadeirados-quentes') whereClause.tone = { contains: 'Quente' }
    }

    if (searchQuery) {
        whereClause.name = { contains: searchQuery, mode: 'insensitive' }
    }

    const rawProducts = await prisma.product.findMany({ where: whereClause })

    // Mapping string dates to allow passage to Client Components safely
    const products = rawProducts.map((p) => ({
        ...p,
        createdAt: undefined,
        updatedAt: undefined
    }))

    return (
        <main className="min-h-screen bg-white flex flex-col font-sans">
            <Header />

            {/* HERO SECTION FOR LAMINADOS */}
            <section className="w-full relative min-h-[350px] md:min-h-[400px] flex items-center bg-[#f8f9fa] overflow-hidden">
                {/* Background Image on the right */}
                <div className="absolute inset-0 z-0 flex justify-end">
                    <div className="relative w-full lg:w-3/5 h-full">
                        <Image
                            src="/hero_laminados.jpg"
                            alt="Ambiente com piso laminado"
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* Gradient fade to blend with the left side desktop only */}
                        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#f8f9fa] to-transparent hidden md:block"></div>
                        <div className="absolute inset-0 bg-[#f8f9fa]/80 md:hidden"></div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 w-full">
                    <div className="max-w-2xl py-12 md:py-20 md:bg-gradient-to-r from-[#f8f9fa] via-[#f8f9fa]/90 to-transparent pr-4 md:pr-8 text-center md:text-left">
                        <h1 className="text-2xl sm:text-3xl md:text-[42px] font-extrabold text-mcl-blue leading-[1.2] md:leading-[1.15] mb-6 md:mb-8 uppercase tracking-wide">
                            Pisos Laminados: <br className="hidden md:block" />
                            <span className="font-semibold text-gray-700 text-lg sm:text-xl md:text-[32px] block mt-2">
                                O conforto da madeira com a praticidade que sua rotina exige.
                            </span>
                        </h1>

                        <div className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-8 md:gap-12 mt-8 md:mt-10">
                            <div className="flex flex-col items-center gap-2 md:gap-3">
                                <DollarSign className="w-6 h-6 md:w-8 md:h-8 text-mcl-gold" strokeWidth={1.5} />
                                <span className="text-[11px] md:text-[13px] font-bold text-gray-800 tracking-wider">Custo-benefício</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 md:gap-3">
                                <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-mcl-gold" strokeWidth={1.5} />
                                <span className="text-[11px] md:text-[13px] font-bold text-gray-800 tracking-wider">Instalação rápida</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 md:gap-3">
                                <Volume2 className="w-6 h-6 md:w-8 md:h-8 text-mcl-gold" strokeWidth={1.5} />
                                <span className="text-[11px] md:text-[13px] font-bold text-gray-800 tracking-wider">Conforto acústico</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FILTERS & PRODUCT GRID */}
            <section className="w-full py-8">
                <div className="max-w-7xl mx-auto">
                    {/* Filters Top */}
                    <div className="mb-12 border-b border-gray-100 pb-4">
                        <ProductFilter basePath="/laminados" />
                    </div>

                    {/* Grid */}
                    <ProductGrid products={products} />
                </div>
            </section>

            <Footer />
        </main>
    )
}
