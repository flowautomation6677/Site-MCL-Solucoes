"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"

interface ProductFilterProps {
    basePath?: string
}

export function ProductFilter({ basePath }: ProductFilterProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const currentTone = searchParams.get("tone") || "todos"

    const filterOptions = [
        { label: "TODOS", value: "todos" },
        { label: "TONS CLAROS", value: "tons-claros" },
        { label: "TONS ESCUROS", value: "tons-escuros" },
        { label: "AMADEIRADOS QUENTES", value: "amadeirados-quentes" },
    ]

    const handleFilter = (value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (value === "todos") {
            params.delete("tone")
        } else {
            params.set("tone", value)
        }

        const route = basePath ?? pathname
        router.push(`${route}?${params.toString()}`, { scroll: false })
    }

    return (
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 my-8 md:my-12 px-4">
            {filterOptions.map((option) => (
                <button
                    key={option.value}
                    onClick={() => handleFilter(option.value)}
                    className={`
            px-4 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider
            transition-all duration-300 border-2
            ${currentTone === option.value
                            ? "bg-mcl-blue text-white border-mcl-blue shadow-md"
                            : "bg-white text-mcl-blue border-mcl-blue/20 hover:border-mcl-blue/60"}`
                    }
                >
                    {currentTone === option.value ? option.label : `[ ${option.label} ]`}
                </button>
            ))}
        </div>
    )
}
