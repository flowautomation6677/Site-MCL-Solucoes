"use client"

import { useState } from "react"
import type { ProductProps } from "./ProductCard"
import { ProductCard } from "./ProductCard"
import { ProductModal } from "./ProductModal"

interface ProductGridProps {
    products: ProductProps[]
}

export function ProductGrid({ products }: ProductGridProps) {
    const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(null)

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto">
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onOpenModal={setSelectedProduct}
                        />
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center">
                        <h3 className="text-xl font-medium text-mcl-blue mb-2">
                            Nenhum produto encontrado.
                        </h3>
                        <p className="text-gray-500">
                            Tente selecionar outro filtro de tonalidade.
                        </p>
                    </div>
                )}
            </div>

            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </>
    )
}
