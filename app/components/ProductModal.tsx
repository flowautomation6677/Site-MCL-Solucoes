import { X } from "lucide-react"
import Image from "next/image"
import type { ProductProps } from "./ProductCard"
import { WhatsAppLink } from "./WhatsAppLink"

interface ProductModalProps {
    readonly product: ProductProps
    readonly onClose: () => void
}

export function ProductModal({ product, onClose }: ProductModalProps) {
    // Extração das especificações técnicas se existirem
    let techSpecs: Record<string, string> = {}
    if (product.techSpecsMisc) {
        try {
            techSpecs = JSON.parse(product.techSpecsMisc)
        } catch {
            // Falha silenciosa no fallback
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            {/* Backdrop clickável */}
            <button
                type="button"
                aria-label="Fechar modal"
                className="absolute inset-0 bg-black/60 backdrop-blur-sm w-full h-full cursor-default"
                onClick={onClose}
            />
            <dialog
                open
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row animate-in zoom-in-95 duration-200 m-0 p-0 z-10"
            >
                {/* Botão Fechar Mobile */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full text-gray-500 hover:bg-gray-100 hover:text-black transition-colors md:hidden"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Imagem do Produto Expandida */}
                <div className="relative w-full h-64 md:h-auto md:w-[45%] rounded-l-2xl overflow-hidden">
                    <Image
                        src={product.imageUrl || "/placeholder.jpg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Detalhes do Produto */}
                <div className="p-6 md:p-8 md:w-[55%] flex flex-col relative bg-white rounded-r-2xl">
                    {/* Botão Fechar Desktop */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-1.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-black transition-colors hidden md:block"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <h2 className="text-xl md:text-[22px] font-extrabold text-[#081B3A] mb-4 uppercase tracking-[0.05em] pr-8">
                        {product.name}
                    </h2>

                    {/* Especificações Técnicas */}
                    <div className="space-y-1 mt-2 text-[13px] text-[#404040]">
                        <div>
                            <span className="font-bold">Produto:</span> <span className="font-medium">Pisos {product.category}</span>
                        </div>

                        {/* Dynamic Tech Specs */}
                        {Object.entries(techSpecs).map(([key, value]) => (
                            <div key={key}>
                                <span className="font-bold">{key}:</span> <span className="font-medium">{value}</span>
                            </div>
                        ))}
                    </div>

                    {/* Call to Action Orçamento */}
                    <div className="mt-8 pt-4">
                        <WhatsAppLink
                            href={`https://wa.me/5521996749001?text=Olá! Tenho interesse no produto: ${encodeURIComponent(product.name)}. Gostaria de solicitar um orçamento.`}
                            className="block w-full py-4 bg-[#B48466] text-white rounded-[24px] font-bold text-[13px] tracking-widest shadow-md hover:bg-[#8F684C] hover:shadow-lg transition-colors active:scale-[0.98] text-center"
                        >
                            SOLICITAR ORÇAMENTO <br className="hidden md:block" /> DESTE PADRÃO
                        </WhatsAppLink>
                    </div>
                </div>
            </dialog>
        </div>
    )
}
