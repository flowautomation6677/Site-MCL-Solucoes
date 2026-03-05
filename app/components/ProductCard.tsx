import Image from "next/image"

export type ProductProps = {
    readonly id: string
    readonly name: string
    readonly slug: string
    readonly category: string
    readonly tone: string
    readonly imageUrl: string
    readonly benefits: string | null
    readonly thickness: string | null
    readonly resistance: string | null
    readonly warranty: string | null
    readonly techSpecsMisc: string | null
}

interface ProductCardProps {
    readonly product: ProductProps
    readonly onOpenModal?: (product: ProductProps) => void
}

export function ProductCard({ product, onOpenModal }: ProductCardProps) {
    // Parsing tech specs to show a mock property line if available
    let mockedSpec = "Espessura: 7mm"
    if (product.techSpecsMisc) {
        try {
            const parsed = JSON.parse(product.techSpecsMisc)
            if (parsed && typeof parsed === 'object') {
                const desc = parsed['Descrição'] || parsed['Descrição Original']
                if (desc) {
                    mockedSpec = desc.length > 80 ? desc.substring(0, 80) + '...' : desc
                }
            }
        } catch (e) {
            // Ignore
        }
    }

    return (
        <div className="bg-white rounded-[24px] shadow-[0_2px_10px_rgba(0,0,0,0.06)] hover:shadow-lg transition-transform hover:-translate-y-1 overflow-hidden flex flex-col border border-gray-50 h-full p-2">
            {/* Imagem do Produto */}
            <div className="relative h-56 w-full rounded-t-[16px] overflow-hidden">
                <Image
                    src={product.imageUrl || "/placeholder.jpg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Text Area */}
            <div className="p-4 md:p-5 flex-1 flex flex-col items-start text-left bg-white">
                <h3 className="font-extrabold text-[15px] md:text-[17px] text-[#081B3A] mb-1 tracking-[0.05em] uppercase">
                    {product.name}
                </h3>
                <p className="text-[10px] md:text-[11px] text-gray-500 font-semibold mb-2 uppercase tracking-widest">
                    {product.name.split(' ')[0]}
                </p>
                <p className="text-[11px] md:text-xs text-gray-800 font-medium mb-5">
                    {mockedSpec}
                </p>

                {/* Ação */}
                <button
                    onClick={() => onOpenModal?.(product)}
                    className="w-full py-3.5 bg-[#122442] text-white rounded-full text-[11px] md:text-xs font-bold tracking-[0.1em] hover:bg-[#0a1526] transition-colors mt-auto shadow-sm"
                >
                    VER PADRÃO
                </button>
            </div>
        </div>
    )
}
